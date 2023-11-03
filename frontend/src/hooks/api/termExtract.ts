import useSWR from 'swr';
import { termExtracts } from '~/lib/api/termExtract';

export function useTermExtract({ text }: { text: string }) {
  const { data, isLoading, mutate, isValidating } = useSWR(
    'termExtracts',
    async () => termExtracts({ text }),
  );
  const terms = data || [];

  return { terms, isLoading, mutate, isValidating };
}
