import styled from 'styled-components';
import { color, zIndex } from '~/styles/utils';

interface PropsType {
  headerTabs?: JSX.Element | undefined;
  rootRef: React.RefObject<HTMLDivElement>;
}

const GlobalHeader = ({ rootRef }: PropsType): JSX.Element => {
  return (
    <Container ref={rootRef}>
      <ContainerLeft>
        <TitleContainer>
          <HeaderTitle>Text Sonic</HeaderTitle>
        </TitleContainer>
      </ContainerLeft>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background-color: ${color.WHITE};
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${zIndex.HEADER};
  padding: 0 20px;
  border-left: 5px solid #ff9900;
  border-bottom: 1px solid #bbbcc7;
`;
const ContainerLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export default GlobalHeader;
