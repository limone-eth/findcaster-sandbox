import { init } from '@airstack/node';

import 'dotenv/config';
import { connect } from './mongodb/connect';
import { syncProfilesOnMongoDB } from './profile/utils';

async function main() {
  init(process.env.AIRSTACK_API_KEY, 'dev');
  await connect();
  await syncProfilesOnMongoDB();
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
