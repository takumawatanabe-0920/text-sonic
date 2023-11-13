import { ApiClient } from '~/lib/apiClient';

export async function writingToSpeech({
  writingId,
}: {
  writingId: string;
}): Promise<string> {
  const res = await ApiClient.post(`/writing_to_speeches/${writingId}`, {});
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  console.log(url, blob);
  return url;
}
