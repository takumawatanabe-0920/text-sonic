import styled from 'styled-components';
import { color, size } from '~/styles/utils';

const Input = styled.input<{
  placeholder: string;
  type?: string;
  error?: boolean;
  isDirty?: boolean;
}>`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  placeholder: ${({ placeholder }) => placeholder};
  type: ${({ type }) => type};
  // 16px以下に指定するとiOSの仕様で拡大されてしまう
  // https://taiyosite.com/web-input-dont-expand/
  font-size: ${size.font.M};
  border: 1px ${color.BLACK_800} solid;
`;

export default Input;
