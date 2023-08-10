export default interface SupabaseProfile {
  id: number;
  owner?: string;
  username: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  // eslint-disable-next-line camelcase
  avatar_url: string;
  // eslint-disable-next-line camelcase
  avatar_verified: boolean;
  followers: number;
  following: number;
  bio: string;
  referrer: string;
  // eslint-disable-next-line camelcase
  registered_at?: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
}
