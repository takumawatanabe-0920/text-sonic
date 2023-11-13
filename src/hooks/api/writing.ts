import useSWR from 'swr';
import { getWriting, getWritings } from '~/lib/api/writing';

export function useWritings({ userId }: { userId?: string | undefined }) {
  const { data, isLoading, mutate, isValidating } = useSWR(
    'getWritings',
    async () => getWritings({ userId }),
  );
  const writings = data || [];

  return { writings, isLoading, mutate, isValidating };
}

export function useWriting(id: string) {
  const { data, isLoading, mutate, isValidating } = useSWR(
    `getWriting`,
    async () =>
      getWriting({
        id,
      }),
  );
  const writing = data || {};
  return { writing, isLoading, mutate, isValidating };
}
