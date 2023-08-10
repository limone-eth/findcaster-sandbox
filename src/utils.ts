import { DocumentNode } from '@apollo/client';

export const gqlToString = (gqlQuery: DocumentNode): string => gqlQuery.loc?.source.body || '';
