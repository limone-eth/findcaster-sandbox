import { fetchFarcasterUserData } from './index';

import EnrichedUserProfileModel from '../mongodb/models/user';
import { Profile } from '../searchcaster/interfaces';
import supabase from '../supabase';
import SupabaseProfile from '../supabase/interfaces/profile';

export function mapSupabaseProfileToProfile(supabaseProfile: SupabaseProfile): Profile {
  return {
    id: supabaseProfile.id,
    username: supabaseProfile.username,
    displayName: supabaseProfile.display_name,
    bio: supabaseProfile.bio,
    followers: supabaseProfile.followers,
    following: supabaseProfile.following,
    avatarUrl: supabaseProfile.avatar_url,
    address: supabaseProfile.owner,
    isVerifiedAvatar: supabaseProfile.avatar_verified,
    registeredAt: supabaseProfile.registered_at ? Date.parse(supabaseProfile.registered_at) : undefined,
  };
}

export const syncProfilesOnMongoDB = async (page = 1, pageSize = 100, chunkSize = 10) => {
  const { data, error } = await supabase
    .from('profile')
    .select()
    .range((page - 1) * pageSize, page * pageSize);

  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }

  if (data && data.length > 0) {
    await Promise.all(
      chunkArray(data, chunkSize).map(async (chunk) => {
        await Promise.all(chunk.map((profile) => syncProfileOnMongoDB(profile)));
      })
    );

    // Recursively call the function for the next page
    await syncProfilesOnMongoDB(page + 1, pageSize, chunkSize);
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

export const syncProfileOnMongoDB = async (profile: SupabaseProfile) => {
  const userToPush = await fetchFarcasterUserData(profile.username);
  await EnrichedUserProfileModel.updateOne({ 'body.id': userToPush.body.id }, userToPush, {
    upsert: true,
  });
};
