import { ApiClient } from '~/lib/apiClient';

export interface SpeechToTextResult {
  audio_time: number;
  speech_word_list: Array<{ word: string; start: number; end: number }>;
}
export async function SpeechToText({
  writingId,
}: {
  writingId: string;
}): Promise<SpeechToTextResult> {
  const res = await ApiClient.post(`/speech_to_texts/${writingId}`, {});
  const data: SpeechToTextResult = (await res.json()).message;
  return data;
}
