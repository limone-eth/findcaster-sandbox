import { weaviateClient } from './client';

const profileClass = {
  class: 'FarcasterProfile',
  description: 'Class representing Farcaster profiles',
  moduleConfig: {
    'ref2vec-centroid': {
      referenceProperties: ['casts'],
      method: 'mean'
    }
  },
  properties: [
    {
      name: 'fid',
      description: 'farcaster id',
      dataType: ['int']
    },
    {
      name: 'username',
      description: 'username',
      dataType: ['text']
    },
    {
      name: 'displayName',
      description: 'display name',
      dataType: ['text']
    },
    {
      name: 'owner',
      description: 'ethereum address',
      dataType: ['text']
    },
    {
      name: 'casts',
      description: 'casts created by this user',
      dataType: ['FarcasterCast']
    }
  ]
};

const castClass = {
  class: 'FarcasterCast',
  vectorizer: 'text2vec-huggingface',
  vectorIndexConfig: {
    distance: 'cosine'
  },
  moduleConfig: {
    'text2vec-huggingface': {
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      options: {
        waitForModel: true,
        useGPU: true,
        useCache: true
      },
      vectorizeClassName: 'false'
    }
  },
  properties: [
    {
      name: 'text',
      description: 'text content of this cast',
      dataType: ['text'],
      moduleConfig: {
        'text2vec-huggingface': {
          skip: false,
          vectorizePropertyName: false
        }
      }
    },
    {
      name: 'hash',
      description: 'hash of this cast',
      dataType: ['text'],
      moduleConfig: {
        'text2vec-huggingface': {
          skip: true
        }
      }
    },
    {
      name: 'author',
      description: 'username of the author of this cast',
      dataType: ['text'],
      moduleConfig: {
        'text2vec-huggingface': {
          skip: true
        }
      }
    }
  ]
};

export const createCollections = async () => {
  let classExists = await weaviateClient.schema.exists(castClass.class);
  if (!classExists) {
    console.log(`❓ creating class ${castClass.class}`);
    await weaviateClient.schema.classCreator().withClass(castClass).do();
    console.log(`✅ created class ${castClass.class}`);
  }
  classExists = await weaviateClient.schema.exists(profileClass.class);
  if (!classExists) {
    console.log(`❓ creating class ${profileClass.class}`);
    await weaviateClient.schema.classCreator().withClass(profileClass).do();
    console.log(`✅ created class ${profileClass.class}`);
  }
};
