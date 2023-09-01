import { init } from '@airstack/node';

import 'dotenv/config';
import { searchPinecone, syncProfilesOnPinecone } from './pinecone/utils.js';

async function main() {
  console.log('Starting script...');
  init(process.env.AIRSTACK_API_KEY, 'dev');
  await syncProfilesOnPinecone();
  await searchPinecone('Animals');
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
