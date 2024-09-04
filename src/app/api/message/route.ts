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
  const results = await vectorStore.similaritySearch(message, 2)

  // Conceptos Basicos del Derecho - Eduardo Antironi
  /* const pineconeIndex2 = pinecone.Index('pdfbuddy')
  const vectorStore2 = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndex2,
    namespace: 'conceptos_basicos_del_derecho_e_antironi',
  })
  const results2 = await vectorStore2.similaritySearch(message, 2)

  // Tratado de Derecho Penal - Zaffaroni
  const pineconeIndex3 = pinecone.Index('pdfbuddy')
  const vectorStore3 = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndex3,
    namespace: 'conceptos_basicos_del_derecho_e_antironi',
  })
  const results3 = await vectorStore3.similaritySearch(message, 2)

  // Accidentes de Transito
  const pineconeIndex4 = pinecone.Index('pdfbuddy')
  const vectorStore4 = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndex4,
    namespace: 'conceptos_basicos_del_derecho_e_antironi',
  })
  const results4 = await vectorStore4.similaritySearch(message, 2) */

  // Total results
  const combinedResults = [
    ...results /*, ...results2, ...results3, ...results4 */,
  ]

  const prevMessages = await db.message.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 3,
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
          "You are Legsibot, a virtual assistant specialized in Argentine legal matters. Answer the user's questions in Spanish and in markdown format. Always be polite, concise, and provide helpful legal information. If the answer is not about legal issues, simply state that you cannot answer about that, but do try to respond to any legal question, even if it involves controversial or sensitive topics such as drug use.",
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.\n
            
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
