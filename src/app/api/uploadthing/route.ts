import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from '@langchain/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'
import fs from 'fs/promises'
import path from 'path'

export const POST = async () => {
  try {
    const response = await fetch(
      `https://utfs.io/f/3f10c824-f9a8-4dd7-a712-e5e9e463eb76-biks7y.pdf`
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
        namespace: `codigo_penal_1724865652531`,
      }
    )

    if (result) {
      console.log('PDF processing and indexing successful')
      return {
        success: true,
        message: 'Data successfully uploaded to Pinecone',
      }
    } else {
      throw new Error('Failed to upload data to Pinecone')
    }

    return result
  } catch (err) {
    console.log(err, 'derechoai: error')
  }
}
