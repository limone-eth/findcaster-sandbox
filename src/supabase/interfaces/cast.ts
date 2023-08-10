/* eslint camelcase: 0 */
export default interface SupabaseCast {
  hash: string;
  thread_hash: string;
  parent_hash?: string | null;
  author_fid: number;
  author_username: string;
  author_display_name: string;
  author_pfp_url: string;
  author_pfp_verified: boolean;
  text: string;
  published_at: string;
  mentions?: string | null;
  replies_count: number;
  reactions_count: number;
  recasts_count: number;
  watches_count: number;
  deleted: boolean;
  parent_author_fid?: number | null;
  parent_author_username?: string | null;
  hash_v1?: string | null;
  parent_hash_v1?: string | null;
  thread_hash_v1?: string | null;
  fts: string;
}
