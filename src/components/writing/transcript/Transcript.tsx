import { Box, Button, Typography } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import { SpeechToText } from '~/lib/api/speechToText';
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
  const [isLoadTranscript, setIsLoadTranscript] = useState(false);

  const handleClickTranscript = async () => {
    setIsLoadTranscript(true);
    try {
      const data = await SpeechToText({ writingId: writing.id });
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

  return (
    <TranscriptWrapper>
      <Button onClick={handleClickTranscript} disabled={!isGenerated}>
        Read transcript
      </Button>
      {isLoadTranscript && <SpinnerForInner />}
      {mappedSentences.length > 0 && (
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
                    onClick={() => handleWordClick(info.start_time)}
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
    currentPlaying >= info.start_time && currentPlaying <= (info?.end_time || 0)
      ? red[500]
      : color.BLACK};
  cursor: pointer;

  &:hover {
    background-color: ${yellow[500]};
  }
`;

export default Transcript;
