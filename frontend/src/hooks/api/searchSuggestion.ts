import useSWR from 'swr';
import { searchSuggestions } from '~/lib/api/search';

export function useSearchSuggestion({ keyword }: { keyword: string }) {
  const { data, isLoading, mutate, isValidating } = useSWR(
    'searchSuggestions',
    async () => searchSuggestions({ keyword }),
  );
  const suggestions = data || [];

  return { suggestions, isLoading, mutate, isValidating };
}
