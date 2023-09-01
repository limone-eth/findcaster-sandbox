import supabase from '../supabase';
import { weaviateClient } from './client';

export const importCasts = async () => {
  console.log('❓ importing casts');
  const { count } = await supabase.from('casts').select('*', { count: 'exact' }).eq('imported', false);

  if (!count) {
    console.log('❌ no casts to import');
    return;
  }

  const pageSize = 1000;
  const totalPages = Math.ceil(count / pageSize);

  let currentPage = 1;

  while (currentPage < totalPages) {
    console.log(`🔍 fetching casts - page ${currentPage}`);
    const { data } = await supabase
      .from('casts')
      .select('*')
      .eq('imported', false)
      .range(currentPage * pageSize, (currentPage + 1) * pageSize - 1);

    if (!data) {
      console.log(`❌ no casts found at page ${currentPage}`);
      currentPage++;
      continue;
    }

    const profileCastMap: Record<string, string> = {};

    const objects = await Promise.all(
      data.map(async (cast) => {
        const { data: profile } = await supabase.from('profile').select('*').eq('id', cast.author_fid).single();

        profileCastMap[cast.weaviate_id] = profile.weaviate_id;

        return {
          class: 'FarcasterCast',
          properties: {
            author: cast.author_username,
            text: cast.text,
            hash: cast.hash,
            id: cast.weaviate_id
          }
        };
      })
    );

    // create a batcher
    let batcher = weaviateClient.batch.objectsBatcher();
    // add objects to the batcher
    batcher = batcher.withObjects(...objects);
    // execute the batcher
    await batcher.do();

    // create the references
    await Promise.all(
      Object.keys(profileCastMap).map(async (castId) => {
        await weaviateClient.data
          .referenceCreator()
          .withClassName('FarcasterProfile')
          .withId(profileCastMap[castId])
          .withReferenceProperty('casts')
          .withReference(
            weaviateClient.data.referencePayloadBuilder().withClassName('FarcasterCast').withId(castId).payload()
          )
          .do();
      })
    );

    // update the imported flag
    currentPage++;
    console.log(`✅ imported casts - page ${currentPage}`);
  }
  await supabase.from('casts').update({ imported: true });
  console.log('✅ imported casts');
};
