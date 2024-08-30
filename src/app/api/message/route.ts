import { getPineconeClient } from '@/lib/pinecone'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from '@langchain/pinecone'
import { OpenAIEmbeddings } from '@langchain/openai'
import { openai } from '@/lib/openai'
import { NextRequest } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { db } from '@/db'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) return new Response('Unauthorized', { status: 401 })
  const { id: userId } = user
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { message } = body

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
    },
  })

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  const pinecone = await getPineconeClient()

  // Codigo Penal
  const pineconeIndex = pinecone.Index('pdfbuddy')
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: 'codigo_penal_1724865652531',
  })
  const results = await vectorStore.similaritySearch(message, 4)

  // Conceptos Basicos del Derecho - Eduardo Antironi
  const pineconeIndex2 = pinecone.Index('pdfbuddy')
  const vectorStore2 = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndex2,
    namespace: 'conceptos_basicos_del_derecho_e_antironi',
  })
  const results2 = await vectorStore2.similaritySearch(message, 4)

  // Total results
  const combinedResults = [...results, ...results2]

  const prevMessages = await db.message.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map(msg => ({
    role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
    content: msg.text,
  }))

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          "You are Legsibot, a virtual assistant specialized in legal matters. Answer the user's questions in markdown format. Always be polite, concise, and provide helpful legal information. If you don't know the answer, simply state that you don't know.",
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
      \n----------------\n
      
      PREVIOUS CONVERSATION:
      ${formattedPrevMessages.map(message => {
        if (message.role === 'user') return `User: ${message.content}\n`
        return `Assistant: ${message.content}\n`
      })}
      
      \n----------------\n
      
      CONTEXT:
      ${combinedResults.map(r => r.pageContent).join('\n\n')}

      USER INPUT: ${message}`,
      },
    ],
  })

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          userId,
        },
      })
    },
  })

  return new StreamingTextResponse(stream)
}
