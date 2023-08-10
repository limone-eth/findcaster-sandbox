import { TokenBalance } from '../airstack/nfts/interfaces';
import { Poap } from '../airstack/poaps/interfaces';
import { FarcasterUser } from '../searchcaster/interfaces';

export interface EnrichedUserProfile extends FarcasterUser {
  poaps: Poap[];
  tokenTransfers: string[];
  nfts: {
    ethereum: TokenBalance[];
    polygon: TokenBalance[];
  };
}
