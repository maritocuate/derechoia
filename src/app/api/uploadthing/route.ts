import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from '@langchain/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'
import fs from 'fs/promises'
import path from 'path'

export const POST = async () => {
  try {
    const response = await fetch(
      `${process.env.KINDE_SITE_URL}/files/codigo_penal.pdf`
    )
    const arrayBuffer = await response.arrayBuffer()
    const tempFilePath = path.join('/tmp', 'codigo_penal.pdf')
    await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer))

    const loader = new PDFLoader(tempFilePath)
    const pageLevelDocs = await loader.load()

    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index('pdfbuddy')

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    const result = await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: 'codigo_penal_01',
      }
    )

    console.log(result)
    return result
  } catch (err) {
    console.log(err, 'derechoai: error')
  }
}
