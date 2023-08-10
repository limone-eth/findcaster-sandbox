import supabase from './index';
import SupabaseProfile from './interfaces/profile';

export const findFarcasterProfileByUsername = async (username: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from('profile').select('*').eq('username', username).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findFarcasterProfileByAddress = async (address: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from('profile').select('*').eq('address', address).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findFarcasterProfileById = async (id: string): Promise<SupabaseProfile> => {
  const { data, error } = await supabase.from('profile').select('*').eq('id', id).single();
  if (error) {
    throw error;
  }
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
