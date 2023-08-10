import { TokenNft } from '../airstack/nfts/interfaces';
import { Poap } from '../airstack/poaps/interfaces';
import { TokenTransfer } from '../airstack/token-transfers/interfaces';
import { FarcasterUser } from '../searchcaster/interfaces';

export interface EnrichedUserProfile extends FarcasterUser {
  poaps: Poap[];
  tokenTransfers: TokenTransfer[];
  nfts: TokenNft[];
}
