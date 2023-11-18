import { ApiClient } from '~/lib/apiClient';

export interface SpeechToTextResult {
  audio_time: number;
  sentences: Array<{ sentence: string; start_time: number; end_time: number }>;
}
export async function SpeechToText({
  writingId,
  gender,
}: {
  writingId: string;
  gender: number;
}): Promise<SpeechToTextResult> {
  const res = await ApiClient.post(`/speech_to_texts/${writingId}`, {
    gender,
  });
  const data: SpeechToTextResult = (await res.json()).message;
  return data;
}
