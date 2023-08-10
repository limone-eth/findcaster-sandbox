import { gql } from '@apollo/client/core';

export const getPOAPsOwnedByFarcasterUserQuery = gql`
  query POAPsOwnedByFarcasterUser($farcasterUser: Identity!) {
    Poaps(input: { filter: { owner: { _eq: $farcasterUser } }, blockchain: ALL }) {
      Poap {
        eventId
        poapEvent {
          eventName
          eventURL
          startDate
          endDate
          country
          city
          contentValue {
            image {
              extraSmall
              large
              medium
              original
              small
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;
