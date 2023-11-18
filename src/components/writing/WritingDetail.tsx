import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import AudioSpeedControl from '~/components/parts/audio/AudioSpeedControl';
import { SpinnerForInner } from '~/components/parts/common/Loading';
import Transcript from '~/components/writing/transcript/Transcript';
import { Writing } from '~/lib/api/writing';
import { writingToSpeech } from '~/lib/api/writingToSpeech';

type WritingDetailProps = {
  writing: Writing;
};

export type GenderType = {
  MALE: 1;
  FEMALE: 2;
};

export const genderType: GenderType = {
  MALE: 1,
  FEMALE: 2,
};

export const WritingDetail: React.FC<WritingDetailProps> = (props) => {
  const { writing } = props;
  const audioRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoadGenerated, setIsLoadGenerated] = useState(false);
  const [isFirstGenerate, setIsFirstGenerate] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);
  const [gender, setGender] = useState<keyof GenderType>('MALE');
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleGenerateSpeech = async () => {
    setIsLoadGenerated(true);
    try {
      const url = await writingToSpeech({
        writingId: writing.id,
        gender: genderType[gender],
      });
      if (!url || !audioRef.current) {
        return;
      }
      (audioRef.current as any).src = url;
      setIsGenerated(true);
      setIsFirstGenerate(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadGenerated(false);
    }
  };

  const handleSetCurrentPlaying = (time: number) => {
    setCurrentPlaying(time);
  };

  const handleGenderChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setGender((e.target as any).value);
    setIsGenerated(false);
  };

  const handleSpeedChange = (speedRate: number) => {
    setPlaybackRate(speedRate);
    if (!audioRef.current) {
      return;
    }
    (audioRef.current as any).playbackRate = speedRate;
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
        <Box display="flex" mt={3}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="MALE"
              name="radio-buttons-group"
              onClick={handleGenderChange}
            >
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateSpeech}
            disabled={isGenerated || isLoadGenerated}
            style={{ width: '100%' }}
          >
            Generate Speech
          </Button>
        </Box>
        {isFirstGenerate && !isGenerated && (
          <Info>gender setting is changed, please generate again.</Info>
        )}
        {isLoadGenerated && <SpinnerForInner />}
      </WritingWrapper>
      <Box mt={5}>
        <Typography variant="h4" component="h3">
          <HereTitle>Listen to the Speech here</HereTitle>
        </Typography>
        {isGenerated && (
          <AudioSpeedControlWrapper>
            <AudioSpeedControl
              handleSpeedChange={handleSpeedChange}
              playbackRate={playbackRate}
            />
          </AudioSpeedControlWrapper>
        )}
        <StyledAudio
          ref={audioRef}
          controls
          onTimeUpdate={(e) => setCurrentPlaying((e.target as any).currentTime)}
        />
      </Box>
      <Transcript
        handleSetCurrentPlaying={handleSetCurrentPlaying}
        currentPlaying={currentPlaying}
        gender={gender}
        writing={writing}
        audioRef={audioRef}
        isGenerated={isFirstGenerate}
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
  margin-bottom: 24px;
`;

const StyledAudio = styled.audio`
  width: 100%;
`;

const AudioSpeedControlWrapper = styled.div`
  margin-bottom: 16px;
`;

const Info = styled.p`
  margin-top: 12px;
  color: #ff9800;
  font-weight: bold;
`;

export default WritingDetail;
