import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from '@langchain/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'

export const POST = async () => {
  console.log('TRY1')
  try {
    const response = await fetch(
      `${process.env.KINDE_SITE_URL}/files/codigo_penal.pdf`
    )
    const blob = await response.blob()

    const loader = new PDFLoader(blob)
    const pageLevelDocs = await loader.load()
    const pagesAmt = pageLevelDocs.length
    console.log(pagesAmt, 'AMT')

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
