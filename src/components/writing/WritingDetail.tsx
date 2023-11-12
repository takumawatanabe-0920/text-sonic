import { Box, Button, Container, Typography } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SpeechToTextResult } from '~/lib/api/speechToText';
import { Writing } from '~/lib/api/writing';
import { writingToSpeech } from '~/lib/api/writingToSpeech';

type WritingDetailProps = {
  writing: Writing;
};

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

export const WritingDetail: React.FC<WritingDetailProps> = (props) => {
  const { writing } = props;
  const audioRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [transcriptInfo, setTranscriptInfo] = useState<
    SpeechToTextResult['speech_word_list']
  >([]);
  const [mappedSentences, setMappedSentences] = useState<
    {
      sentence: string;
      startTime: number;
      endTime: number;
    }[]
  >([]);
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);

  const handleGenerateSpeech = async () => {
    try {
      const url = await writingToSpeech({ writingId: writing.id });
      console.log({ url, current: audioRef.current });
      if (!url || !audioRef.current) {
        return;
      }
      audioRef.current.src = url;
      setIsGenerated(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickTranscript = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    setTranscriptInfo(mockData.speech_word_list);
  };

  const handleWordClick = (startTime: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = startTime;
    setCurrentPlaying(startTime);
    audio.play();
  };

  useEffect(() => {
    if (transcriptInfo.length === 0) {
      return;
    }
    const originalScript = writing.description;
    const generateSpeechScript = transcriptInfo
      .map((info) => info.word)
      .join(' ');
    const originalWords = originalScript.split(' ');
    const generateSpeechWords = generateSpeechScript.split(' ');

    console.log({
      originalScript,
      generateSpeechScript,
      originalWords,
      generateSpeechWords,
    });

    let sentences = originalScript.replace(/-/g, ' ').split('.');
    let googleWordsIndex = 0;
    console.log({ sentences, transcriptInfo });

    const mappedSentences = sentences
      .map((sentence) => {
        if (!sentence || sentence === '' || sentence === ' ') {
          return;
        }
        let words = sentence.replace(/[^\w\s]/g, '').split(' ');
        console.log({
          words,
          googleWordsIndex,
          s: transcriptInfo[googleWordsIndex],
        });

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
          sentence,
          startTime,
          endTime,
        };
      })
      .filter((sentence) => sentence !== undefined) as {
      sentence: string;
      startTime: number;
      endTime: number;
    }[];
    setMappedSentences(mappedSentences);
  }, [writing.description, transcriptInfo]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        {writing.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {writing.description}
      </Typography>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateSpeech}
          disabled={isGenerated}
        >
          Generate Speech
        </Button>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Listen to the description here:
        </Typography>
        <audio
          ref={audioRef}
          controls
          onTimeUpdate={(e) => setCurrentPlaying(e.target.currentTime)}
        />
      </Box>
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
                        currentPlaying >= info.startTime &&
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
    </Container>
  );
};

export default WritingDetail;
