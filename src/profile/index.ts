import { EnrichedUserProfile } from './interfaces';

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

  const addressInteractedPolygon = [
    ...new Set(
      tokenTransfers.polygon.TokenTransfer.map((tokenTransfer) => [
        tokenTransfer.from.addresses[0],
        tokenTransfer.to.addresses[0],
      ]).flat()
    ),
  ].filter((a) => a !== farcasterProfile?.connectedAddress.toLowerCase());
  const addressInteractedEthereum = [
    ...new Set(
      tokenTransfers.ethereum.TokenTransfer.map((tokenTransfer) => [
        tokenTransfer.from.addresses[0],
        tokenTransfer.to.addresses[0],
      ]).flat()
    ),
  ].filter((a) => a !== farcasterProfile.connectedAddress?.toLowerCase());
  // const farcasterCasts = await findCasts({ authorUsername: farcasterUser });
  const userToPush: EnrichedUserProfile = {
    ...farcasterProfile,
    nfts: {
      ethereum: nfts.ethereum.TokenBalance,
      polygon: nfts.polygon.TokenBalance,
    },
    poaps: poaps.Poaps.Poap,
    tokenTransfers: [...new Set([...addressInteractedPolygon, ...addressInteractedEthereum])],
  };
  return userToPush;
};
