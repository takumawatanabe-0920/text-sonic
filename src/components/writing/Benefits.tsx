import styled from 'styled-components';
import { color } from '~/styles/utils';

const Benefits: React.FC = () => {
  return (
    <div>
      <BenefitCard>
        <BenefitTitle>Active Writing Practice</BenefitTitle>
        <Description>
          Writing writing sentences is a great way for learners to actively use
          new vocabulary and grammar structures, reinforcing their learning.
        </Description>
      </BenefitCard>

      <BenefitCard>
        <BenefitTitle>Immediate Feedback with TTS</BenefitTitle>
        <Description>
          Hearing the text they wrote read back to them by a TTS engine allows
          learners to hear the natural rhythm, intonation, and pronunciation of
          English, which can improve their listening and speaking skills.
        </Description>
      </BenefitCard>

      <BenefitCard>
        <BenefitTitle>Accessibility of Learning Materials</BenefitTitle>
        <Description>
          By downloading the audio as an MP3 file, learners can practice
          anywhere, which makes it easier to fit into their writing routine.
        </Description>
      </BenefitCard>

      <BenefitCard>
        <BenefitTitle>Integrated Learning Experience</BenefitTitle>
        <Description>
          Playing the audio with subtitles links the written and spoken aspects
          of the language, helping with reading comprehension and listening
          skills simultaneously.
        </Description>
      </BenefitCard>

      <BenefitCard>
        <BenefitTitle>Interactive Subtitles</BenefitTitle>
        <Description>
          The ability to click on subtitles and jump to that point in the audio
          can help learners to focus on specific phrases or vocabulary they want
          to hear again, which is beneficial for detailed learning and
          repetition.
        </Description>
      </BenefitCard>
    </div>
  );
};

const BenefitCard = styled.div`
  background-color: ${color.BLUE};
  border-radius: 10px;
  padding: 2em;
  margin: 1em 0;
`;

const BenefitTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.WHITE};
`;

const Description = styled.p`
  color: ${color.WHITE};
  font-weight: 500;
`;

export default Benefits;
