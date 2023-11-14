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
    const sentences = originalScript.replace(/-/g, ' ').split('.');
    return sentences
      .map((sentence) => {
        if (!sentence || sentence === '' || sentence === ' ') {
          return;
        }
        const regex = /^[\s\u3000]+/;
        // remove space at the beginning of the sentence
        const replacedSentence = sentence.replace(regex, '');
        return replacedSentence.split(' ');
      })
      .filter((sentence): sentence is string[] => sentence != undefined);
  };

  const checkTranscriptAndWords = (
    transcriptInfo: TranscriptInfo[],
    googleWordsIndex: number,
    words: string[],
  ) => {
    if (
      transcriptInfo[googleWordsIndex] == undefined ||
      transcriptInfo[googleWordsIndex]?.word === '' ||
      transcriptInfo[googleWordsIndex]?.start == undefined ||
      words.length === 0
    ) {
      return false;
    }
    return true;
  };

  const iterateWordsAndGetTime = (
    words: string[],
    transcriptInfo: TranscriptInfo[],
    googleWordsIndex: number,
  ) => {
    const startTime = transcriptInfo[googleWordsIndex]?.start;

    for (let word of words) {
      let _word = transcriptInfo[googleWordsIndex]?.word.toLowerCase() || '';
      // .と,とかの記号を削除
      _word = _word.replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      if (
        googleWordsIndex < transcriptInfo.length &&
        word.toLowerCase() === _word.toLowerCase()
      ) {
        googleWordsIndex += 1;
      }
    }

    const endTime = transcriptInfo[googleWordsIndex]?.end;

    return { startTime, endTime, googleWordsIndex };
  };

  const mapSentences = (
    sentences: string[][],
    transcriptInfo: TranscriptInfo[],
  ) => {
    let googleWordsIndex = 0;

    console.log({ sentences, transcriptInfo });

    return sentences
      .map((words) => {
        if (!checkTranscriptAndWords(transcriptInfo, googleWordsIndex, words)) {
          return;
        }

        const {
          startTime,
          endTime,
          googleWordsIndex: newGoogleWordsIndex,
        } = iterateWordsAndGetTime(words, transcriptInfo, googleWordsIndex);

        googleWordsIndex = newGoogleWordsIndex;

        console.log({ startTime, endTime, googleWordsIndex, words });

        return {
          sentence: words.join(' '),
          startTime,
          endTime,
        };
      })
      .filter((sentence): sentence is SentenceInfo => sentence !== undefined);
  };

  useEffect(() => {
    const sentences = processSentences(writing.script || writing.description);
    const mappedSentences = mapSentences(sentences, transcriptInfo);
    setMappedSentences(mappedSentences);
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
