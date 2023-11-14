import styled, { css } from 'styled-components';
import { breakPointLessThan, color } from '~/styles/utils';

const SpeechifyScriptsDescription = () => {
  return (
    <div>
      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Service Introduction
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Speechify Scripts is an innovative service that transforms your
          written English into a dynamic audio experience. Watch as your daily
          writings come to life as real-time speech.
        </Description>
      </SpeechifyScriptsDescriptionCard>

      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Learning Benefits
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Utilizing this service can enhance your English speaking and listening
          skills in a natural way. Your written texts will be played back as
          clear and fluent speech.
        </Description>
      </SpeechifyScriptsDescriptionCard>

      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Subtitle Functionality and Pronunciation Improvement
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Take advantage of the audio playback with subtitles feature to hear
          how your English really sounds. This can be greatly beneficial for
          improving your pronunciation. Speechify Scripts is your reliable
          partner in the journey of English learning.
        </Description>
      </SpeechifyScriptsDescriptionCard>
    </div>
  );
};

const SpeechifyScriptsDescriptionCard = styled.div`
  background-color: ${color.BLUE};
  border-radius: 10px;
  padding: 2em;
  margin: 1em 0;
`;

const SpeechifyScriptsDescriptionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.WHITE};

  ${breakPointLessThan.SP(css`
    font-size: 18px;
  `)}
`;

const Description = styled.p`
  color: ${color.WHITE};
  font-weight: 500;

  ${breakPointLessThan.SP(css`
    font-size: 13px;
    font-weight: 400;
  `)}
`;

export default SpeechifyScriptsDescription;
