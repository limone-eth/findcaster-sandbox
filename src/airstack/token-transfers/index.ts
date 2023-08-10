import { fetchQuery } from '@airstack/node';

import { GetTokenTransfersByFarcasterUserResult, GetTokenTransfersByFarcasterUserVariables } from './interfaces';
import { getTokenTransfersByFarcasterUserQuery } from './queries';

import { gqlToString } from '../../utils';

export const fetchTokenTransfersOwnedByFarcasterUser = async (
  variables: GetTokenTransfersByFarcasterUserVariables
): Promise<GetTokenTransfersByFarcasterUserResult> => {
  const { data, error } = await fetchQuery(gqlToString(getTokenTransfersByFarcasterUserQuery), variables);
  if (error) {
    throw error;
  }
  return data;
};
