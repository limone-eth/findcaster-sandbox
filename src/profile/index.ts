import { fetchNFTsOwnedByFarcasterUser } from '../airstack/nfts';
import { fetchPOAPsOwnedByFarcasterUser } from '../airstack/poaps';
import { fetchTokenTransfersOwnedByFarcasterUser } from '../airstack/token-transfers';
import { SearchcasterHelper } from '../searchcaster';

export const fetchFarcasterUserData = async (farcasterUser: string) => {
  const poaps = await fetchPOAPsOwnedByFarcasterUser({ farcasterUser });
  const tokenTransfers = await fetchTokenTransfersOwnedByFarcasterUser({ farcasterUser });
  const nfts = await fetchNFTsOwnedByFarcasterUser({ farcasterUser });

  const searchcaster = new SearchcasterHelper();
  const farcasterProfile = await searchcaster.getFarcasterUserProfile({ username: farcasterUser });
  const farcasterCasts = await searchcaster.getAllFarcasterUserCasts({ count: 200, username: farcasterUser });
  console.log({
    tokenTransfers,
    poaps,
    nfts,
    farcasterProfile,
    farcasterCasts,
  });
};
