import { fetchQuery } from '@airstack/node';

import { PoapsOwnedByFarcasterUserResult, PoapsOwnedByFarcasterUserVariables } from './interfaces';
import { getPOAPsOwnedByFarcasterUserQuery } from './queries';

import { gqlToString } from '../../utils';

export const fetchPOAPsOwnedByFarcasterUser = async (
  variables: PoapsOwnedByFarcasterUserVariables
): Promise<PoapsOwnedByFarcasterUserResult> => {
  const { data, error } = await fetchQuery(gqlToString(getPOAPsOwnedByFarcasterUserQuery), variables);
  if (error) {
    throw error;
  }
  return data;
};
