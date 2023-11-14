import { Box, Button, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpeechToText } from '~/lib/api/speechToText';
import { Writing } from '~/lib/api/writing';

type TranscriptInfo = {
  start: number;
  end: number;
  word: string;
};

type SentenceInfo = {
  sentence: string;
  startTime: number;
  endTime: number;
};

interface TranscriptProps {
  handleSetCurrentPlaying: (time: number) => void;
  currentPlaying: number;
  writing: Writing;
  audioRef: React.RefObject<HTMLAudioElement>;
  isGenerated: boolean;
}

const Transcript: React.FC<TranscriptProps> = (prop) => {
  const {
    handleSetCurrentPlaying,
    currentPlaying,
    writing,
    audioRef,
    isGenerated,
  } = prop;

  const [mappedSentences, setMappedSentences] = useState<SentenceInfo[]>([]);
  const [transcriptInfo, setTranscriptInfo] = useState<TranscriptInfo[]>([]);

  const handleClickTranscript = async () => {
    const data = await SpeechToText({ writingId: writing.id });
    setTranscriptInfo(data.speech_word_list);
  };

  const handleWordClick = (startTime: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = startTime;
    handleSetCurrentPlaying(startTime);
    audio.play();
  };

  const processSentences = (originalScript: string) => {
    const sentences = originalScript
      .split(/(\.)/)
      .reduce((acc, val, idx, array) => {
        if (val === '.') {
          // 前の文字列とピリオドを結合
          acc[acc.length - 1] += val;
        } else if (idx < array.length - 1) {
          // ピリオドの直前の文字列を追加
          acc.push(val);
        }
        return acc;
      }, []);
    return sentences
      .map((sentence) => {
        if (!sentence || sentence === '' || sentence === ' ') {
          return;
        }
        // 先頭の空白を削除
        const removeSpace = sentence.replace(/^\s+/, '');
        return removeSpace.split(' ');
      })
      .filter((sentence): sentence is string[] => sentence != undefined);
  };

  const mapSentences2 = (
    sentences: string[][],
    transcriptInfo: TranscriptInfo[],
    writing: Writing,
  ) => {
    console.log({ sentences, transcriptInfo });
    // 一致した要素を追跡するためのセット
    let matchedIndices = new Set();
    // sentenceの先頭文字からtranscriptInfoを検索。ただ一回ヒットしたら次回の探索対象から外す
    sentences.forEach((subList) => {
      if (subList.length > 0) {
        const firstWord = subList[0];

        // 未マッチのTranscriptInfoを検索
        for (let i = 0; i < transcriptInfo.length; i++) {
          console.log({
            i,
            matchedIndices,
            is: transcriptInfo[i].word === firstWord,
          });
          const isPartialMatch =
            transcriptInfo[i].word.includes(firstWord) ||
            firstWord.includes(transcriptInfo[i].word);
          const isNextMatch = transcriptInfo[i + 1]?.word === subList[1];
          console.log({ isPartialMatch, isNextMatch });
          if (!matchedIndices.has(i) && (isPartialMatch || isNextMatch)) {
            console.log(`Match found: ${firstWord} at index ${i}`);
            // マッチしたインデックスを追加
            matchedIndices.add(i);
            break; // マッチしたらループを終了
          }
        }
      }
    });
    const sentenceStarts = findSentenceStarts(
      writing.script || '',
      writing.description,
    );

    sentenceStarts.forEach((sentenceStart) => {
      const { original, generated } = sentenceStart;
      const originalIndex = writing.script?.indexOf(original || '');
      const generatedIndex = writing.description.indexOf(generated || '');
      console.log({ originalIndex, generatedIndex });
    });
  };

  function splitIntoWords(text: string): string[] {
    return text.split(/\s+/);
  }

  function findSentenceStarts(
    originalText: string,
    generatedText: string,
  ): {
    original: string | undefined;
    generated: string | undefined;
  }[] {
    const originalWords = splitIntoWords(originalText);
    const generatedWords = splitIntoWords(generatedText);
    let sentenceStarts: {
      original: string | undefined;
      generated: string | undefined;
    }[] = [];

    console.log({ originalWords, generatedWords });

    for (
      let i = 0, j = 0;
      i < originalWords.length && j < generatedWords.length;
      i++
    ) {
      const originalLower = originalWords[i]?.toLowerCase();
      const generatedLower = generatedWords[j]?.toLowerCase();

      const isPartialMatch =
        originalLower.includes(generatedLower) ||
        generatedLower.includes(originalLower);
      const isNextMatch =
        originalWords[i + 1]?.toLowerCase() ===
        generatedWords[j + 1]?.toLowerCase();

      console.log({
        is: isPartialMatch || isNextMatch,
        original: originalLower,
        generated: generatedLower,
      });

      if (isPartialMatch || isNextMatch) {
        if (originalWords[i - 1]?.endsWith('.') || i === 0) {
          const sentenceStart = {
            original: originalWords[i],
            generated: generatedWords[j],
          };
          sentenceStarts.push(sentenceStart);
        }
        j++;
      }
    }

    console.log({ sentenceStarts });

    return sentenceStarts;
  }

  useEffect(() => {
    const sentences = processSentences(writing.description);
    // const mappedSentences = mapSentences(sentences, transcriptInfo);
    mapSentences2(sentences, transcriptInfo, writing);
    // console.log({ mappedSentences });
    // setMappedSentences(mappedSentences);
    // findSentenceStarts(writing.script || '', writing.description);
  }, [writing.script, writing.description, transcriptInfo]);

  return (
    <TranscriptWrapper>
      <Button onClick={handleClickTranscript} disabled={!isGenerated}>
        Read transcript
      </Button>
      {transcriptInfo.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Transcript
          </Typography>
          <Typography variant="body1" gutterBottom>
            {mappedSentences.map((info, index) => {
              console.log({ info });
              return (
                <Fragment key={index}>
                  <span
                    onClick={() => handleWordClick(info.startTime)}
                    style={{
                      color:
                        currentPlaying > info.startTime &&
                        currentPlaying < info.endTime
                          ? 'red'
                          : 'black',
                      cursor: 'pointer',
                    }}
                  >
                    {`${info.sentence}. `}
                  </span>
                </Fragment>
              );
            })}
          </Typography>
        </Box>
      )}
    </TranscriptWrapper>
  );
};

const TranscriptWrapper = styled.div`
  margin-top: 20px;
`;

export default Transcript;
