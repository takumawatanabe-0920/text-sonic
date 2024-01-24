import { useMediaQuery } from '@mui/material';
import styled, { css } from 'styled-components';
import { breakPoint, breakPointBetween, color, size } from '~/styles/utils';

const TopSection = () => {
  const isMoreThanTablet = useMediaQuery(
    `(min-width: ${size.breakpoint.TABLET}px)`,
  );

  return (
    <TopSectionWrapper>
      <ImageTitle>Your Pathway to Fluent English</ImageTitle>
      {isMoreThanTablet && (
        <ImageDescription>
          Elevate Your English with Every Sentence. Our pioneering platform
          enables you to pen daily sentences and seamlessly transforms them into
          spoken words through our advanced text-to-speech technology. Listen to
          the natural intonation, and follow along with interactive subtitles to
          sharpen your comprehension and pronunciation. With Speechify Scripts,
          each interaction is a step toward language mastery, immersing you in
          an enriching journey to English fluency.
        </ImageDescription>
      )}
    </TopSectionWrapper>
  );
};

const TopSectionWrapper = styled.div`
  background-image: url('/images/top-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  color: ${color.WHITE};
  text-shadow: 2px 2px 4px #000000;
  display: flex;
  flex-direction: column;
  justify-content: end;

  ${breakPoint.SP(css`
    padding: 20px 0;
    height: 50vh;
  `)}

  ${breakPoint.TABLET(css`
    padding: 20px;
    height: 60vh;
  `)}

  ${breakPoint.PC(css`
    padding: 40px;
    height: 70vh;
  `)}
`;

const ImageTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 0 20px;

  ${breakPointBetween(
    size.breakpoint.SP,
    size.breakpoint.TABLET,
    css`
      font-size: 28px;
    `,
  )}
`;

const ImageDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin: 20px;
  max-width: 800px;
`;

export default TopSection;
