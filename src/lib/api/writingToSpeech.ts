import { ApiClient } from '~/lib/apiClient';

export type Writing = {
  id: string;
  title: string;
  description: string;

  created_at: string;
  updated_at: string;
};

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
