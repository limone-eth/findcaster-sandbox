interface TokenNftToken {
  name: string;
  projectDetails: {
    collectionName: string;
    externalUrl: string;
    twitterUrl: string;
    imageUrl: string;
  };
}

interface TokenNftContentValueImage {
  medium: string;
}

interface TokenNft {
  address: string;
  type: string;
  token: TokenNftToken;
  contentValue: {
    image: TokenNftContentValueImage;
  };
}

interface TokenBalance {
  tokenAddress: string;
  tokenNfts: TokenNft[];
}

interface TokenBalancesByBlockchain {
  TokenBalance: TokenBalance[];
}

interface GetNFTsOwnedByFarcasterUserResult {
  ethereum: TokenBalancesByBlockchain;
  polygon: TokenBalancesByBlockchain;
}

interface GetNFTsOwnedByFarcasterUserVariables {
  farcasterUser: string; // Change the type accordingly if Identity is not a string
}

export {
  TokenNftToken,
  TokenNftContentValueImage,
  TokenNft,
  TokenBalance,
  TokenBalancesByBlockchain,
  GetNFTsOwnedByFarcasterUserResult,
  GetNFTsOwnedByFarcasterUserVariables,
};
