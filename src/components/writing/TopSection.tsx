import styled from 'styled-components';
import { color } from '~/styles/utils';

const TopSection = () => {
  return (
    <TopSectionWrapper>
      <ImageTitle>Speechify Scripts: Your Pathway to Fluent English</ImageTitle>
      <ImageDescription>
        Elevate Your English with Every Sentence. Our pioneering platform
        enables you to pen daily sentences and seamlessly transforms them into
        spoken words through our advanced text-to-speech technology. Listen to
        the natural intonation, and follow along with interactive subtitles to
        sharpen your comprehension and pronunciation. With Speechify Scripts,
        each interaction is a step toward language mastery, immersing you in an
        enriching journey to English fluency.
      </ImageDescription>
    </TopSectionWrapper>
  );
};

const TopSectionWrapper = styled.div`
  background-image: url('/images/top-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 30px;
  padding-top: 350px;
  color: ${color.WHITE};
  text-shadow: 2px 2px 4px #000000;
`;

const ImageTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0 20px;
`;

const ImageDescription = styled.p`
  font-size: 20px;
  margin: 20px;
`;

export default TopSection;
