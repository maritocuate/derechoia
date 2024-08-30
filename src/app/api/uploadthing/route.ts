import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from '@langchain/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { PineconeStore } from '@langchain/pinecone'
import fs from 'fs/promises'
import path from 'path'

export const POST = async () => {
  try {
    const response = await fetch(
      `http://www.saij.gob.ar/docs-f/dossier-f/accidentes_transito.pdf`
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
        namespace: `accidentes_transito`,
      }
    )

    if (result) {
      console.log('PDF processing and indexing successful')
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Data successfully uploaded to Pinecone',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } else {
      throw new Error('Failed to upload data to Pinecone')
    }
  } catch (err) {
    console.log(err, 'derechoai: error')

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing the PDF',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
