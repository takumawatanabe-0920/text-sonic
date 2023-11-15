import { Box, Button, Typography } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import { SpeechToText } from '~/lib/api/speechToText';
import { Writing } from '~/lib/api/writing';
import { color } from '~/styles/utils';

type TranscriptInfo = {
  start: number;
  end: number | undefined;
  word: string;
};

type SentenceInfo = {
  sentence: string;
  startTime: number;
  endTime: number | undefined;
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
  const [isLoadTranscript, setIsLoadTranscript] = useState(false);

  const handleClickTranscript = async () => {
    setIsLoadTranscript(true);
    try {
      const data = await SpeechToText({ writingId: writing.id });
      setTranscriptInfo(data.speech_word_list);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadTranscript(false);
    }
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
      .reduce((acc: string[], val, idx, array) => {
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

  const mapSentences = (
    sentences: string[][],
    transcriptInfo: TranscriptInfo[],
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
          const transcript = transcriptInfo[i];
          if (!transcript) {
            continue;
          }
          const isPartialMatch = isCheckPartialMatch(
            transcript.word,
            firstWord,
          );
          const nextTranscript = transcriptInfo[i + 1];
          const isNextMatch = isCheckPartialMatch(
            nextTranscript?.word,
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
              const transcript = transcriptInfo[j];
              const nextTranscript = transcriptInfo[j + 1];
              const lastWord = subList[subList.length - 1];
              const isPartialMatch = isCheckPartialMatch(
                transcript?.word,
                lastWord,
              );
              const isNextMatch = isCheckPartialMatch(
                nextTranscript?.word,
                lastWord,
              );
              if (isNextMatch || isPartialMatch) {
                endIndex = j;
                break;
              }
            }

            const endTime = transcriptInfo[endIndex]?.end;

            mappedSentences.push({
              sentence: subList.join(' '),
              startTime: startTime,
              endTime: endTime,
            });

            startTime = endTime || 0;
            break; // マッチしたらループを終了
          }
        }
      }
    });

    return mappedSentences;
  };

  const isCheckPartialMatch = (
    word1: string | undefined,
    word2: string | undefined,
  ) => {
    if (!word1 || !word2) {
      return false;
    }
    const lowerWord1 = word1.toLowerCase();
    const lowerWord2 = word2.toLowerCase();
    // 一致したらtrue
    return lowerWord1.includes(lowerWord2) || lowerWord2.includes(lowerWord1);
  };

  useEffect(() => {
    const sentences = processSentences(writing.description);
    const mappedSentences = mapSentences(sentences, transcriptInfo);
    console.log({ mappedSentences });
    setMappedSentences(mappedSentences);
  }, [writing.script, writing.description, transcriptInfo]);

  return (
    <TranscriptWrapper>
      <Button onClick={handleClickTranscript} disabled={!isGenerated}>
        Read transcript
      </Button>
      {isLoadTranscript && <SpinnerForInner />}
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
                  <HighlightSpan
                    onClick={() => handleWordClick(info.startTime)}
                    currentPlaying={currentPlaying}
                    info={info}
                  >
                    {info.sentence}
                  </HighlightSpan>
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

const HighlightSpan = styled.span`
  color: ${({
    currentPlaying,
    info,
  }: {
    currentPlaying: number;
    info: SentenceInfo;
  }) =>
    currentPlaying > info.startTime && currentPlaying < (info?.endTime || 0)
      ? red[500]
      : color.BLACK};
  cursor: pointer;

  &:hover {
    background-color: ${yellow[500]};
  }
`;

export default Transcript;
