import { PineconeClient } from '@pinecone-database/pinecone';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { findCastsByAuthorFid } from '../supabase/casts.js';
import SupabaseProfile from '../supabase/interfaces/profile.js';
import { findAllFarcasterProfiles } from '../supabase/profiles.js';

const PINECONE_INDEX = 'findcaster';

export const searchPinecone = async (query: string) => {
  console.log('Searching...');
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });
  const pineconeIndex = pinecone.Index(PINECONE_INDEX);

  // const embeddings = new CohereEmbeddings({
  //   apiKey: process.env.COHERE_API_KEY, // In Node.js defaults to process.env.COHERE_API_KEY
  //   batchSize: 48, // Default value if omitted is 48. Max value is 96
  // });
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGING_FACE_API_KEY,
  });
  const queryEmbedding = await embeddings.embedQuery(query);

  // Query Pinecone index and return top 10 document matches
  const { matches } = await pineconeIndex.query({
    queryRequest: {
      topK: 2,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });

  console.log(matches);
};

export const syncProfilesOnPinecone = async (page = 1, pageSize = 10, chunkSize = 10) => {
  try {
    const data = await findAllFarcasterProfiles((page - 1) * pageSize, page * pageSize);
    if (data && data.length > 0) {
      await Promise.all(
        chunkArray(data, chunkSize).map(async (chunk) => {
          await Promise.all(chunk.map((profile) => syncProfileToPinecone(profile)));
        })
      );

      // Recursively call the function for the next page
      await syncProfilesOnPinecone(page + 1, pageSize, chunkSize);

      console.log('done');
      return;
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
};

// Helper function to chunk an array into smaller arrays
function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

export const syncProfileToPinecone = async (profile: SupabaseProfile) => {
  const casts = await findCastsByAuthorFid(profile.id);
  const castArray = casts?.map((cast) => cast.text);
  if (!profile.bio && (!castArray || castArray.length === 0)) {
    return;
  }

  // Get Pinecone index
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });

  // Split text into docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const docs = await textSplitter.createDocuments(castArray.concat([profile.bio]).filter(Boolean), []);

  const pineconeIndex = pinecone.Index(PINECONE_INDEX);

  // const embeddings = new CohereEmbeddings({
  //   apiKey: process.env.COHERE_API_KEY, // In Node.js defaults to process.env.COHERE_API_KEY
  //   batchSize: 48, // Default value if omitted is 48. Max value is 96
  // });
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGING_FACE_API_KEY,
  });
  const embeddingArrays = await embeddings.embedDocuments(docs.map((doc) => doc.pageContent));

  console.log('embeddings created', docs.length);

  // Upsert the generated vectors
  const batch = [];
  for (let index = 0; index < docs.length; index++) {
    console.log('start');
    const chunk = docs[index];
    const vector = {
      id: `${profile.id}_${index}`,
      values: embeddingArrays[index],
      metadata: {
        ...chunk.metadata,
        loc: JSON.stringify(chunk.metadata.loc),
        pageContent: chunk.pageContent,
        profileId: profile.id,
      },
    };
    batch.push(vector);
    await pineconeIndex.upsert({
      upsertRequest: {
        vectors: batch,
      },
    });

    console.log('inserted', profile.id);
  }
};
