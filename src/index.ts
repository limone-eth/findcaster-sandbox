import { init } from '@airstack/node';

import 'dotenv/config';
import { fetchFarcasterUserData } from './profile';

async function main() {
  init(process.env.AIRSTACK_API_KEY, 'dev');

  await fetchFarcasterUserData('limone.eth');
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
