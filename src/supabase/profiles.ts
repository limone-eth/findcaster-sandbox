import supabase from './index.js';
import SupabaseProfile from './interfaces/profile.js';

const TABLE_NAME_PROFILE = 'profile';

export const findFarcasterProfileByUsername = async (username: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from(TABLE_NAME_PROFILE).select('*').eq('username', username).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findFarcasterProfileByAddress = async (address: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from(TABLE_NAME_PROFILE).select('*').eq('address', address).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findFarcasterProfileById = async (id: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from(TABLE_NAME_PROFILE).select('*').eq('id', id).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findAllFarcasterProfiles = async (from = 0, to = 10): Promise<SupabaseProfile[]> => {
  console.log('Fetching profiles from', from, 'to', to);
  const { data, error } = await supabase.from(TABLE_NAME_PROFILE).select('*').range(from, to);
  if (error) {
    throw error;
  }
  console.log(data.length);
  return data;
};

export const findFarcasterProfile = async (query: {
  username?: string;
  address?: string;
  id?: string;
}): Promise<SupabaseProfile> => {
  if (!query.username && !query.address && !query.id) {
    throw new Error('Must provide username, address, or id');
  }
  if (query.username) {
    return findFarcasterProfileByUsername(query.username);
  }
  if (query.address) {
    return findFarcasterProfileByAddress(query.address);
  }
  if (query.id) {
    return findFarcasterProfileById(query.id);
  }
  return null;
};
