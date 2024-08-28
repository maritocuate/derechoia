import { getPineconeClient } from '@/lib/pinecone'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from '@langchain/pinecone'
import { OpenAIEmbeddings } from '@langchain/openai'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) return new Response('Unauthorized', { status: 401 })
  const { id: userId } = user
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { message } = body

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  const pinecone = await getPineconeClient()
  const pineconeIndex = pinecone.Index('pdfbuddy')

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: 'codigo_penal_1724865652531',
  })

  const results = await vectorStore.similaritySearch(message, 4)

  return new Response('OK', { status: 200 })
}
