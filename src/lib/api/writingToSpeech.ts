import { ApiClient } from '~/lib/apiClient';

export async function writingToSpeech({
  writingId,
  gender,
}: {
  writingId: string;
  gender: number;
}): Promise<string> {
  const res = await ApiClient.post(`/writing_to_speeches/${writingId}`, {
    gender,
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  console.log(url, blob);
  return url;
}
