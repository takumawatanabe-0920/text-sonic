import styled, { css } from 'styled-components';
import { breakPointLessThan, color } from '~/styles/utils';

const SpeechifyScriptsDescription = () => {
  return (
    <Cards>
      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Advanced Features:
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Our service, equipped with advanced text-to-speech technology, offers
          a dynamic way to improve your English speaking and listening skills,
          pronunciation, and comprehension. Perfect for learners at all levels
          seeking a comprehensive tool for English mastery.
        </Description>
      </SpeechifyScriptsDescriptionCard>

      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Customizable Audio Playback:
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Adjust the speech speed to suit your learning pace.
        </Description>
      </SpeechifyScriptsDescriptionCard>

      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Diverse Voice Options:
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Choose between male and female voices for a varied listening
          experience.
        </Description>
      </SpeechifyScriptsDescriptionCard>

      <SpeechifyScriptsDescriptionCard>
        <SpeechifyScriptsDescriptionTitle>
          Subtitles in 10 Languages:
        </SpeechifyScriptsDescriptionTitle>
        <Description>
          Enhance understanding for non-native speakers.
        </Description>
      </SpeechifyScriptsDescriptionCard>
    </Cards>
  );
};

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  ${breakPointLessThan.SP(css`
    grid-template-columns: 1fr;
  `)}
`;

const SpeechifyScriptsDescriptionCard = styled.div`
  background-color: ${color.BLUE};
  border-radius: 10px;
  padding: 2em;
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
