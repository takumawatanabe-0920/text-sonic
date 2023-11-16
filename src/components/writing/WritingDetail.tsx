import { Box, Button, Container, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import Transcript from '~/components/writing/transcript/Transcript';
import { Writing } from '~/lib/api/writing';
import { writingToSpeech } from '~/lib/api/writingToSpeech';

type WritingDetailProps = {
  writing: Writing;
};

export const WritingDetail: React.FC<WritingDetailProps> = (props) => {
  const { writing } = props;
  const audioRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoadGenerated, setIsLoadGenerated] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);

  const handleGenerateSpeech = async () => {
    setIsLoadGenerated(true);
    try {
      const url = await writingToSpeech({ writingId: writing.id });
      if (!url || !audioRef.current) {
        return;
      }
      (audioRef.current as any).src = url;
      setIsGenerated(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadGenerated(false);
    }
  };

  const handleSetCurrentPlaying = (time: number) => {
    setCurrentPlaying(time);
  };

  return (
    <Container maxWidth="sm">
      <WritingWrapper>
        <Typography variant="h3" component="h2">
          <WritingTitle>{writing.title}</WritingTitle>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {writing.description}
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateSpeech}
            disabled={isGenerated || isLoadGenerated}
          >
            Generate Speech
          </Button>
        </Box>
        {isLoadGenerated && <SpinnerForInner />}
      </WritingWrapper>
      <Box mt={5}>
        <Typography variant="h4" component="h3">
          <HereTitle>Listen to the Speech here</HereTitle>
        </Typography>
        <audio
          ref={audioRef}
          controls
          onTimeUpdate={(e) => setCurrentPlaying((e.target as any).currentTime)}
        />
      </Box>
      <Transcript
        handleSetCurrentPlaying={handleSetCurrentPlaying}
        currentPlaying={currentPlaying}
        writing={writing}
        audioRef={audioRef}
        isGenerated={isGenerated}
      />
    </Container>
  );
};

const WritingWrapper = styled.div`
  margin-bottom: 80px;
`;

const WritingTitle = styled.p`
  margin-bottom: 24px;
`;

const HereTitle = styled.p`
  margin-bottom: 20px;
`;

export default WritingDetail;
