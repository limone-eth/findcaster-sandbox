import supabase from './index.js';
import SupabaseCast from './interfaces/cast.js';

export const findCastByHash = async (hash: string): Promise<SupabaseCast> => {
  const { data, error } = await supabase.from('casts').select('*').eq('hash', hash).single();
  if (error) {
    throw error;
  }
  return data;
};

export const findCastsByAuthorFid = async (authorFid: number): Promise<SupabaseCast[]> => {
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

export const findCasts = async (query: { authorFid?: number; authorUsername?: string }): Promise<SupabaseCast[]> => {
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
