import { ApolloCache } from '@apollo/client';

export const removeEvent = (cache: ApolloCache<any>, id: string) => {
  const normalizedId = cache.identify({ id, __typename: 'EventFull' });
  cache.evict({ id: normalizedId });
  cache.gc();
};
