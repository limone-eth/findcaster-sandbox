interface TokenTransferSocial {
  userId: string;
  profileName: string;
}

interface TokenTransferFromTo {
  addresses: string[];
  socials: TokenTransferSocial[];
  domains?: {
    dappName: string;
  }[];
}

interface TokenTransfer {
  from: TokenTransferFromTo;
  to: TokenTransferFromTo;
}

interface TokenTransfersByBlockchain {
  TokenTransfer: TokenTransfer[];
}

interface GetTokenTransfersByFarcasterUserResult {
  ethereum: TokenTransfersByBlockchain;
  polygon: TokenTransfersByBlockchain;
}

interface GetTokenTransfersByFarcasterUserVariables {
  farcasterUser: string; // Change the type accordingly if Identity is not a string
}

export {
  TokenTransferSocial,
  TokenTransferFromTo,
  TokenTransfer,
  TokenTransfersByBlockchain,
  GetTokenTransfersByFarcasterUserResult,
  GetTokenTransfersByFarcasterUserVariables,
};
