import { Box, Button, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Writing } from '~/lib/api/writing';

const mockData = {
  audio_time: 11.28,
  speech_word_list: [
    {
      start: 0.0,
      end: 0.5,
      word: 'Elevate',
    },
    {
      start: 0.5,
      end: 0.7,
      word: 'your',
    },
    {
      start: 0.7,
      end: 1.0,
      word: 'English',
    },
    {
      start: 1.0,
      end: 1.2,
      word: 'with',
    },
    {
      start: 1.2,
      end: 1.6,
      word: 'every',
    },
    {
      start: 1.6,
      end: 1.9,
      word: 'sentence',
    },
    {
      start: 1.9,
      end: 2.7,
      word: 'our',
    },
    {
      start: 2.7,
      end: 3.1,
      word: 'pioneering',
    },
    {
      start: 3.1,
      end: 3.6,
      word: 'platform',
    },
    {
      start: 3.6,
      end: 4.2,
      word: 'enables',
    },
    {
      start: 4.2,
      end: 4.4,
      word: 'you',
    },
    {
      start: 4.4,
      end: 4.5,
      word: 'to',
    },
    {
      start: 4.5,
      end: 4.9,
      word: 'Penn',
    },
    {
      start: 4.9,
      end: 5.0,
      word: 'daily',
    },
    {
      start: 5.0,
      end: 5.6,
      word: 'sentences',
    },
    {
      start: 5.6,
      end: 5.9,
      word: 'and',
    },
    {
      start: 5.9,
      end: 6.4,
      word: 'seamlessly',
    },
    {
      start: 6.4,
      end: 7.3,
      word: 'transforms',
    },
    {
      start: 7.3,
      end: 7.4,
      word: 'them',
    },
    {
      start: 7.4,
      end: 7.7,
      word: 'into',
    },
    {
      start: 7.7,
      end: 8.0,
      word: 'spoken',
    },
    {
      start: 8.0,
      end: 8.3,
      word: 'words',
    },
    {
      start: 8.3,
      end: 8.5,
      word: 'through',
    },
    {
      start: 8.5,
      end: 8.8,
      word: 'our',
    },
    {
      start: 8.8,
      end: 9.2,
      word: 'Advanced',
    },
    {
      start: 9.2,
      end: 9.4,
      word: 'text',
    },
    {
      start: 9.4,
      end: 9.8,
      word: 'to',
    },
    {
      start: 9.8,
      end: 10.1,
      word: 'speech',
    },
    {
      start: 10.1,
      end: 10.6,
      word: 'technology.',
    },
  ],
};

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
}

const Transcript: React.FC<TranscriptProps> = (prop) => {
  const { handleSetCurrentPlaying, currentPlaying, writing, audioRef } = prop;

  const [mappedSentences, setMappedSentences] = useState<SentenceInfo[]>([]);
  const [transcriptInfo, setTranscriptInfo] = useState<TranscriptInfo[]>([]);

  const handleClickTranscript = async () => {
    setTranscriptInfo(mockData.speech_word_list);
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
    const sentences = originalScript.replace(/-/g, ' ').split('.');
    return sentences
      .map((sentence) => {
        if (!sentence || sentence === '' || sentence === ' ') {
          return;
        }
        return sentence.replace(/[^\w\s]/g, '').split(' ');
      })
      .filter((sentence): sentence is string[] => sentence !== undefined);
  };

  const mapSentences = (
    sentences: string[][],
    transcriptInfo: TranscriptInfo[],
  ) => {
    let googleWordsIndex = 0;

    return sentences
      .map((words) => {
        if (
          transcriptInfo[googleWordsIndex] == undefined ||
          transcriptInfo[googleWordsIndex]?.word === '' ||
          transcriptInfo[googleWordsIndex]?.start == undefined ||
          words.length === 0
        ) {
          return;
        }

        const startTime = transcriptInfo[googleWordsIndex]?.start;

        for (let word of words) {
          if (
            googleWordsIndex < transcriptInfo.length &&
            word.toLowerCase() ===
              transcriptInfo[googleWordsIndex]?.word.toLowerCase()
          ) {
            googleWordsIndex += 1;
          }
        }

        const endTime = transcriptInfo[googleWordsIndex]?.end;

        return {
          sentence: words.join(' '),
          startTime,
          endTime,
        };
      })
      .filter((sentence): sentence is SentenceInfo => sentence !== undefined);
  };

  useEffect(() => {
    const sentences = processSentences(writing.description);

    const mappedSentences = mapSentences(sentences, transcriptInfo);
    setMappedSentences(mappedSentences);
  }, [writing.description, transcriptInfo]);

  return (
    <TranscriptWrapper>
      <Button onClick={handleClickTranscript}>Read transcript</Button>
      {transcriptInfo.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Transcript
          </Typography>
          <Typography variant="body1" gutterBottom>
            {mappedSentences.map((info, index) => {
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
