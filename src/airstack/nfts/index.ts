import { fetchQuery } from '@airstack/node';

import { GetNFTsOwnedByFarcasterUserResult, GetNFTsOwnedByFarcasterUserVariables } from './interfaces';
import { getNFTsOwnedByFarcasterUserQuery } from './queries';

import { gqlToString } from '../../utils';

export const fetchNFTsOwnedByFarcasterUser = async (
  variables: GetNFTsOwnedByFarcasterUserVariables
): Promise<GetNFTsOwnedByFarcasterUserResult> => {
  const { data, error } = await fetchQuery(gqlToString(getNFTsOwnedByFarcasterUserQuery), variables);
  if (error) {
    throw error;
  }
  return data;
};
