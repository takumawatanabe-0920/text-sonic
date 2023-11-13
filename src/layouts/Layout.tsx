import * as React from 'react';
import styled from 'styled-components';
import GlobalHeader from '~/components/parts/common/GlobalHeader';
import { color } from '~/styles/utils';

export interface LayoutProps {
  children: JSX.Element | React.ReactNode;
}

/**
 * 共通Layout
 */
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <LayoutWrapper>
      <Container>
        <GlobalHeader />
        <BodyContainer>{children}</BodyContainer>
      </Container>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* overflow-x: hidden; */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  background-color: ${color.BLACK_100};

  // // コンテンツの高さを100vhにするために必要。これをしないとフッターに隙間ができる
  // // https://zenn.dev/catnose99/articles/a873bbbe25b15b
  // display: grid;
  // grid-template-rows: 1fr auto;
  // grid-template-columns: 100%;
  // min-height: 100vh;

  // /* overflow: hidden; */
`;

const BodyContainer = styled.div<{
  headerHeight?: number | undefined;
}>`
  background-color: white;
  align-items: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;

  padding-top: ${({ headerHeight }) => headerHeight || '56'}px;
`;

export default Layout;
