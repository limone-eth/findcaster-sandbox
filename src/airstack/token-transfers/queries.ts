import { gql } from '@apollo/client/core';

export const getTokenTransfersByFarcasterUserQuery = gql`
  query GetTokenTransfersByFarcasterUser($farcasterUser: Identity!) {
    # first query on Ethereum
    ethereum: TokenTransfers(
      input: {
        filter: { _or: { from: { _eq: $farcasterUser }, to: { _eq: $farcasterUser } } }
        blockchain: ethereum
        limit: 50
      }
    ) {
      TokenTransfer {
        from {
          addresses
          socials(input: { filter: { dappName: { _in: farcaster } } }) {
            userId
            profileName
          }
        }
        to {
          addresses
          socials(input: { filter: { dappName: { _in: farcaster } } }) {
            userId
            profileName
          }
        }
      }
    }
    # second query on Polygon
    polygon: TokenTransfers(
      input: {
        filter: { _or: { from: { _eq: $farcasterUser }, to: { _eq: $farcasterUser } } }
        blockchain: ethereum
        limit: 50
      }
    ) {
      TokenTransfer {
        from {
          addresses
          socials(input: { filter: { dappName: { _in: farcaster } } }) {
            userId
            profileName
          }
          domains {
            dappName
          }
        }
        to {
          addresses
          socials(input: { filter: { dappName: { _in: farcaster } } }) {
            userId
            profileName
          }
        }
      }
    }
  }
`;
