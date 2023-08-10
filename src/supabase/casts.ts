import supabase from './index';
import SupabaseCast from './interfaces/cast';

export const findCastByHash = async (hash: string): Promise<SupabaseCast> => {
  const { data, error } = await supabase.from('casts').select('*').eq('hash', hash).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findCastsByAuthorFid = async (authorFid: string): Promise<SupabaseCast[]> => {
  const { data, error } = await supabase.from('casts').select('*').eq('author_fid', authorFid);
  if (error) {
    throw error;
  }
  return data;
};

export const findCastsByAuthorUsername = async (authorUsername: string): Promise<SupabaseCast[]> => {
  const { data, error } = await supabase.from('casts').select('*').eq('author_username', authorUsername);
  if (error) {
    throw error;
  }
  return data;
};

export const findCasts = async (query: { authorFid?: string; authorUsername?: string }): Promise<SupabaseCast[]> => {
  if (!query.authorFid && !query.authorUsername) {
    throw new Error('Must provide hash, authorFid, or authorUsername');
  }
  if (query.authorFid) {
    return findCastsByAuthorFid(query.authorFid);
  }
  if (query.authorUsername) {
    return findCastsByAuthorUsername(query.authorUsername);
  }
  return null;
};
