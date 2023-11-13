import { Box, Button, Container, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
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
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);

  const handleGenerateSpeech = async () => {
    try {
      const url = await writingToSpeech({ writingId: writing.id });
      if (!url || !audioRef.current) {
        return;
      }
      (audioRef.current as any).src = url;
      setIsGenerated(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetCurrentPlaying = (time: number) => {
    setCurrentPlaying(time);
  };

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
          onTimeUpdate={(e) => setCurrentPlaying((e.target as any).currentTime)}
        />
      </Box>
      <Transcript
        handleSetCurrentPlaying={handleSetCurrentPlaying}
        currentPlaying={currentPlaying}
        writing={writing}
        audioRef={audioRef}
      />
    </Container>
  );
};

export default WritingDetail;
