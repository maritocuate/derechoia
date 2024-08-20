import { Pinecone } from '@pinecone-database/pinecone'

export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })

  /* await client.createIndex({
    name: 'quickstart',
    dimension: 8,
    metric: 'euclidean',
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-west-2',
      },
    },
  }) */

  return client
}
