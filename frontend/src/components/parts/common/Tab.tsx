import styled from 'styled-components';
import { color } from '~/styles/utils';

export const Tabs = styled.div`
  background: #fff;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
`;

export const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  line-height: 20px;
  flex: 0 0;
  flex-basis: content;

  margin-right: 0.1em;
  padding: 0 12px 4px;
  border: ${(props) => (props.active ? 'none' : '')};
  border-bottom: ${(props) =>
    props.active ? `1px solid ${color.font.BLUE}` : ''};
  color: ${(props) => (props.active ? color.font.BLUE : color.font.GRAY)};
  transition: border-bottom 0.5s ease-in-out;
  background-color: white;
  font-size: 16px;
`;

export const Content = styled.div<{ active: boolean }>`
  ${(props) => (props.active ? '' : 'display:none')}
`;
