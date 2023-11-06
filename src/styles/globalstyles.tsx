import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { color, size } from '~/styles/utils';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html,
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${color.font.MAIN};
    font-weight: ${size.fontWeight.W3};
    font-size: ${size.font.base};
    padding: 0;
    margin: 0;
    line-height: 1.5;
    font-family: Roboto;
    background-color: #F5F5F5;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
  .hide {
    display: none!important;
  }
  a {
    cursor: pointer;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
