import { TermExtractApiClient } from '~/lib/termExtractApi';

export type TermExtract = { [key: string]: number } | {};

export async function termExtracts({
  text,
}: {
  text: string | undefined;
}): Promise<TermExtract> {
  if (!text) {
    return {};
  }

  const response = await TermExtractApiClient.get('/termextract', {
    text,
  });
  const res = await response.json();

  return res.message;
}
