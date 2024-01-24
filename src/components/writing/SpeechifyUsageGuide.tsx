import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import styled from 'styled-components';

const SpeechifyUsageGuide = () => {
  return (
    <SpeechifyUsageGuideWrapper>
      <List>
        <ListItem>
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Text Input"
            secondary="Enter your English sentences into the site's form."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText
            primary="Database Storage"
            secondary="The entered text is automatically saved to the database."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AudiotrackIcon />
          </ListItemIcon>
          <ListItemText
            primary="Text-to-Speech Conversion"
            secondary="You need to visit the script's detail page and press a button to initiate the text-to-speech conversion. (The converted audio can be downloaded as MP3 files.)"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SubtitlesIcon />
          </ListItemIcon>
          <ListItemText
            primary="Subtitle-Enabled Audio Playback"
            secondary="Play the audio on the site with simultaneous subtitle display. Clicking a subtitle part will play audio from that point."
          />
        </ListItem>
      </List>
    </SpeechifyUsageGuideWrapper>
  );
};

const SpeechifyUsageGuideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default SpeechifyUsageGuide;
