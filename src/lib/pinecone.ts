import { Pinecone } from '@pinecone-database/pinecone'

export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })

  /* await client.createIndex({
    name: 'pdfbuddy',
    dimension: 1536,
    metric: 'euclidean',
    spec: {
      serverless: {
        cloud: 'gcp',
        region: 'gcp-starter',
      },
    },
  }) */

  return client
}
