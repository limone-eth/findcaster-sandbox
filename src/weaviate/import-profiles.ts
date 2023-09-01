import supabase from '../supabase';
import { weaviateClient } from './client';

export const importProfiles = async () => {
  console.log('❓ importing profiles');
  const { count } = await supabase.from('profile').select('*', { count: 'exact' }).eq('imported', false);

  if (!count) {
    console.log('❌ no profiles to import');
    return;
  }

  const pageSize = 1000;
  const totalPages = Math.ceil(count / pageSize);

  let currentPage = 1;

  while (currentPage < totalPages) {
    console.log(`🔍 fetching profiles - page ${currentPage}`);
    // retrieve all profiles
    const { data: profiles, error } = await supabase
      .from('profile')
      .select('*')
      .eq('imported', false)
      .range(currentPage * pageSize, (currentPage + 1) * pageSize - 1);

    if (!profiles) {
      console.log(error);
      console.log('❌ no profiles to import');
      currentPage++;
      continue;
    }

    const objects = await Promise.all(
      profiles.map(async (profile) => ({
        class: 'FarcasterProfile',
        properties: {
          fid: profile.id,
          owner: profile.owner || '',
          username: profile.username,
          displayName: profile.display_name,
          id: profile.weaviate_id
        }
      }))
    );

    if (objects.length === 0) {
      console.log('❌ no profiles to import');
      currentPage++;
      continue;
    }

    // create a batcher
    let batcher = weaviateClient.batch.objectsBatcher();
    // add objects to the batcher
    batcher = batcher.withObjects(...objects);

    // execute the batcher
    await batcher.do();

    currentPage++;
    console.log(`✅ imported profiles - page ${currentPage}`);
  }
  // update the imported flag
  await supabase.from('profile').update({ imported: true });
  console.log('✅ imported profiles');
};
