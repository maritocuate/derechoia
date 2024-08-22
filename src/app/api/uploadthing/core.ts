import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from '@langchain/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'

const f = createUploadthing()

const middleware = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user || !user.id) throw new Error('Unauthorized')
  return { userId: user.id }
}

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata?: Awaited<ReturnType<typeof middleware>>
  file?: {
    key: string
    name: string
    url: string
  }
}) => {
  try {
    const response = await fetch(
      `https://www.oas.org/dil/esp/codigo_penal_de_la_republica_argentina.pdf`
    )
    const blob = await response.blob()
    console.log(blob, 'derechoai: blob')
    const loader = new PDFLoader(blob)
    const pageLevelDocs = await loader.load()
    const pagesAmt = pageLevelDocs.length

    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index('pdfbuddy')

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: 'codigo_penal_01',
    })
  } catch (err) {
    console.log(err, 'derechoai: error')
  }
}

export const ourFileRouter = {
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
