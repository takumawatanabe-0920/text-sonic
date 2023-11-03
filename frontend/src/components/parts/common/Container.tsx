import * as React from 'react';
import styled, { css } from 'styled-components';
import { breakPointBetween, contentsMaxWidth, size } from '~/styles/utils';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props): JSX.Element => (
  <ContainerComponent>{children}</ContainerComponent>
);

const ContainerComponent = styled.div`
  padding: 0 16px;
  width: 100%;

  ${contentsMaxWidth()}
  ${breakPointBetween(
    size.breakpoint.TABLET,
    size.breakpoint.PC,
    css`
      padding: 0 24px;
    `,
  )}
`;

export default Container;
