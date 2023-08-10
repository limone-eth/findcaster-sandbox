import { gql } from '@apollo/client/core';

export const getNFTsOwnedByFarcasterUserQuery = gql`
  query getNFTsOwnedByFarcasterUser($farcasterUser: Identity!) {
    ethereum: TokenBalances(
      input: {
        filter: { owner: { _eq: $farcasterUser }, tokenType: { _in: [ERC1155, ERC721] } }
        blockchain: ethereum
        limit: 200
      }
    ) {
      TokenBalance {
        tokenAddress
        tokenNfts {
          address
          type
          token {
            name
            projectDetails {
              collectionName
              externalUrl
              twitterUrl
              imageUrl
            }
          }
        }
      }
    }
    polygon: TokenBalances(
      input: {
        filter: { owner: { _eq: $farcasterUser }, tokenType: { _in: [ERC1155, ERC721] } }
        blockchain: polygon
        limit: 200
      }
    ) {
      TokenBalance {
        tokenAddress
        tokenNfts {
          address
          type
          token {
            name
            projectDetails {
              collectionName
              externalUrl
              twitterUrl
              imageUrl
            }
          }
        }
      }
    }
  }
`;
