import weaviate, { ApiKey } from 'weaviate-ts-client';

export const weaviateClient = weaviate.client({
  scheme: process.env.WEAVIATE_SCHEMA,
  host: process.env.WEAVIATE_HOST,
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY)
});
