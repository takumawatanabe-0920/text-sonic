import { ApiClient } from '~/lib/apiClient';

export type SearchSuggestions = {
  string: string;
  volume: number;
}[];

export async function searchSuggestions({
  keyword,
}: {
  keyword: string | undefined;
}): Promise<SearchSuggestions> {
  const response = await ApiClient.post('/search-suggestions', { keyword });
  return await response.json();
}
