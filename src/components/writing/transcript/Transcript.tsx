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
    const mappedSentences: SentenceInfo[] = [];
    let startTime = 0;
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
          const isPartialMatch = isCheckPartialMatch(
            transcriptInfo[i].word,
            firstWord,
          );
          const isNextMatch = isCheckPartialMatch(
            transcriptInfo[i + 1]?.word,
            subList[1],
          );
          console.log({ isPartialMatch, isNextMatch });
          if (!matchedIndices.has(i) && (isPartialMatch || isNextMatch)) {
            console.log(`Match found: ${firstWord} at index ${i}`);
            // マッチしたインデックスを追加
            matchedIndices.add(i);
            // センテンスの先頭の単語がマッチしたら、そのセンテンスの終わりの単語を探す
            let endIndex = i;
            for (let j = i + 1; j < transcriptInfo.length; j++) {
              const isPartialMatch = isCheckPartialMatch(
                transcriptInfo[j].word,
                subList[subList.length - 1],
              );

              const isNextMatch =
                transcriptInfo[j + 1]?.word === subList[subList.length - 1];
              console.log({ isPartialMatch, isNextMatch });
              if (isNextMatch || isPartialMatch) {
                endIndex = j;
                break;
              }
            }

            const endTime = transcriptInfo[endIndex].end;

            mappedSentences.push({
              sentence: subList.join(' '),
              startTime: startTime,
              endTime: endTime,
            });

            startTime = endTime;
            break; // マッチしたらループを終了
          }
        }
      }
    });

    console.log({ mappedSentences });
    return mappedSentences;
  };

  const isCheckPartialMatch = (word1: string, word2: string) => {
    // 大文字小文字も区別しない
    const lowerWord1 = word1.toLowerCase();
    const lowerWord2 = word2.toLowerCase();
    // 一致したらtrue
    return lowerWord1.includes(lowerWord2) || lowerWord2.includes(lowerWord1);
  };

  const isCheckNextMatch = (word1: string, word2: string) => {
    // 大文字小文字も区別しない
    const lowerWord1 = word1.toLowerCase();
    const lowerWord2 = word2.toLowerCase();
    // 一致したらtrue
    return lowerWord1 === lowerWord2;
  };

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
