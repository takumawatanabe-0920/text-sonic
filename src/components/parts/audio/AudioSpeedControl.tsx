import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

type AudioSpeedControlProps = {
  playbackRate: number;
  handleSpeedChange: (playbackRate: number) => void;
};

const AudioSpeedControl: React.FC<AudioSpeedControlProps> = (props) => {
  const { playbackRate, handleSpeedChange } = props;

  return (
    <FormControl>
      <FormLabel id="speed-radio-buttons-group-label">Playback speed</FormLabel>
      <RadioGroup
        row
        aria-labelledby="speed-radio-buttons-group-label"
        name="speed-radio-buttons-group"
        value={playbackRate}
        onChange={(e) => handleSpeedChange(Number(e.target.value))}
      >
        <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
        <FormControlLabel value="0.75" control={<Radio />} label="0.75" />
        <FormControlLabel value="1" control={<Radio />} label="normal" />
        <FormControlLabel value="1.25" control={<Radio />} label="1.25" />
        <FormControlLabel value="1.5" control={<Radio />} label="1.5" />
        <FormControlLabel value="1.75" control={<Radio />} label="1.75" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
      </RadioGroup>
    </FormControl>
  );
};

export default AudioSpeedControl;
