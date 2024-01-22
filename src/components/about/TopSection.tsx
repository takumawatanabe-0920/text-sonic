import styled, { css } from 'styled-components';
import { breakPoint, breakPointBetween, color, size } from '~/styles/utils';

const TopSection = () => {
  return (
    <TopSectionWrapper>
      <ImageTitle>About Speechify Scripts</ImageTitle>
    </TopSectionWrapper>
  );
};

const TopSectionWrapper = styled.div`
  background-image: url('/images/about.jpg');
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
    padding: 40px 20px;
    height: 60vh;
  `)}

  ${breakPoint.PC(css`
    padding: 80px 40px;
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

export default TopSection;
