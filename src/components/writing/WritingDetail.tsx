import { Box, Button, Container, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Writing } from '~/lib/api/writing';
import { writingToSpeech } from '~/lib/api/writingToSpeech';

type WritingDetailProps = {
  writing: Writing;
};

export const WritingDetail: React.FC<WritingDetailProps> = (props) => {
  const { writing } = props;
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState('');

  const handleGenerateSpeech = async () => {
    try {
      const url = await writingToSpeech({ writingId: writing.id });
      setAudioSrc(url);
    } catch (e) {
      console.error(e);
    }
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
          disabled={audioSrc !== ''}
        >
          Generate Speech
        </Button>
      </Box>
      {audioSrc && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Listen to the description here:
          </Typography>
          <audio ref={audioRef} controls src={audioSrc} />
        </Box>
      )}
    </Container>
  );
};

export default WritingDetail;
