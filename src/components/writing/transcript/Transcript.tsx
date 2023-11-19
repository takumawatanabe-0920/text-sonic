import { Box, Button, Typography } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import { GenderType, genderType } from '~/components/writing/WritingDetail';
import LanguageSelector from '~/components/writing/transcript/TranslateSelect';
import { SpeechToText } from '~/lib/api/speechToText';
import { transcriptToTranslate } from '~/lib/api/transcriptToTranslate';
import { Writing } from '~/lib/api/writing';
import { color } from '~/styles/utils';

type SentenceInfo = {
  sentence: string;
  start_time: number;
  end_time: number | undefined;
};

interface TranscriptProps {
  handleSetCurrentPlaying: (time: number) => void;
  currentPlaying: number;
  writing: Writing;
  audioRef: React.RefObject<HTMLAudioElement>;
  isGenerated: boolean;
  gender: keyof GenderType;
}

const Transcript: React.FC<TranscriptProps> = (prop) => {
  const {
    handleSetCurrentPlaying,
    currentPlaying,
    writing,
    audioRef,
    isGenerated,
    gender,
  } = prop;

  const [mappedSentences, setMappedSentences] = useState<SentenceInfo[]>([]);
  const [isLoadTranscript, setIsLoadTranscript] = useState(false);

  const handleClickTranscript = async () => {
    setIsLoadTranscript(true);
    try {
      const data = await SpeechToText({
        writingId: writing.id,
        gender: genderType[gender],
      });
      setMappedSentences(data.sentences);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadTranscript(false);
    }
  };

  const handleWordClick = (start_time: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = start_time;
    handleSetCurrentPlaying(start_time);
    audio.play();
  };

  const handleTranslate = async (targetLanguage: string) => {
    if (!isGenerated || !audioRef.current || !targetLanguage) {
      return;
    }

    const sentences = await transcriptToTranslate({
      targetLanguage,
      sentences: mappedSentences,
    });

    setMappedSentences(sentences);
  };

  return (
    <TranscriptWrapper>
      {isGenerated && (
        <CareInfo>
          ※ Certain scripts may not generate transcripts correctly. Correcting
          grammar or specialized words might resolve the issue. <br />
          ex. café {`->`} coffee <br />
          ex. I like tennis... {`->`} I like tennis.
        </CareInfo>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          onClick={handleClickTranscript}
          disabled={!isGenerated}
          variant="outlined"
          color="primary"
          style={{ width: '100%' }}
        >
          Read transcript
        </Button>
      </Box>
      {isLoadTranscript && <SpinnerForInner />}
      <LanguageSelector handleTranslate={handleTranslate} />
      {mappedSentences.length > 0 && (
        <Box mt={4}>
          <Typography variant="body1" gutterBottom>
            {mappedSentences.map((info, index) => {
              return (
                <Fragment key={index}>
                  <HighlightSpan
                    onClick={() => handleWordClick(info.start_time)}
                    currentPlaying={currentPlaying}
                    info={info}
                  >
                    {`${info.sentence} `}
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
    currentPlaying >= info.start_time && currentPlaying <= (info?.end_time || 0)
      ? red[500]
      : color.BLACK};
  cursor: pointer;

  &:hover {
    background-color: ${yellow[500]};
  }
`;

const CareInfo = styled.div`
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export default Transcript;
