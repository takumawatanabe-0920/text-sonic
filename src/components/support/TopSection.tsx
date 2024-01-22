import styled, { css } from 'styled-components';
import { breakPoint, breakPointBetween, color, size } from '~/styles/utils';

const TopSection = () => {
  return (
    <TopSectionWrapper>
      <ImageTitle>Help & Support</ImageTitle>
      <ImageDescription>
        If you have any questions or concerns, please check this page.
      </ImageDescription>
    </TopSectionWrapper>
  );
};

const TopSectionWrapper = styled.div`
  background-image: url('/images/support.jpg');
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
