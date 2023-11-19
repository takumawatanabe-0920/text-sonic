import { ApiClient } from '~/lib/apiClient';

interface SentenceInfo {
  sentence: string;
  start_time: number;
  end_time: number | undefined;
}

export interface SpeechToTextResult {
  sentences: Array<SentenceInfo>;
}
export async function transcriptToTranslate({
  targetLanguage,
  sentences,
}: {
  targetLanguage: string;
  sentences: Array<SentenceInfo>;
}): Promise<SentenceInfo[]> {
  const res = await ApiClient.post(`/transcript_to_translates`, {
    target_language: targetLanguage,
    sentences,
  });
  const data: SentenceInfo[] = (await res.json()).message;
  return data;
}
