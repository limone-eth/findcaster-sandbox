interface Profile {
  id: number;
  address: string;
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  avatarUrl: string;
  isVerifiedAvatar: boolean;
  registeredAt: number;
}

export interface FarcasterUser {
  body: Profile;
  connectedAddress: string;
  connectedAddresses: string[];
}

interface CastData {
  text: string;
  image: null | any; // Adjust the type for image as per your requirements
  replyParentMerkleRoot: string;
  threadMerkleRoot: string;
}

interface CastBody {
  publishedAt: number;
  username: string;
  data: CastData;
}

interface CastMetaReactions {
  count: number;
  type: string;
}

interface CastMeta {
  displayName: string;
  avatar: string;
  isVerifiedAvatar: boolean;
  numReplyChildren: number;
  reactions: CastMetaReactions;
  recasts: { count: number };
  watches: { count: number };
  replyParentUsername: { fid: number; username: string };
  mentions: null | any; // Adjust the type for mentions as per your requirements
}

export interface Cast {
  body: CastBody;
  meta: CastMeta;
  merkleRoot: string;
  uri: string;
}

export interface CastResponse {
  casts: Cast[];
  meta: { count: number; responseTime?: number };
}
