import styled, { css } from 'styled-components';
import { breakPoint, color, size } from '~/styles/utils';

const Button = styled.button<{
  variant?: string;
  fontSize?: string;
  isSharp?: boolean;
}>`
  width: 100%;
  border-radius: ${({ isSharp }) => (isSharp ? '4px' : '30px')};
  background: ${color.PRIMARY};
  border: none;
  padding: 10px;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : `${size.font.L}`)};

  color: white;
  font-weight: ${size.fontWeight.W6};

  ${({ variant }) => variantStyles(variant)}

  ${breakPoint.SP(css`
    width: 100%;
  `)}

  ${breakPoint.TABLET(css`
    max-width: 340px;
  `)}
`;

const variantStyles = (variant = 'primary') =>
  ({
    primary: css`
      background: ${color.PRIMARY};
      color: ${color.font.WHITE};
    `,
    secondary: css`
      background: ${color.bg.WHITE};
      color: ${color.PRIMARY};
      border: ${color.PRIMARY} 1px solid;
    `,
    tertiary: css`
      background: ${color.bg.WHITE};
      color: ${color.font.DARK_GRAY};
      border: none;
    `,
  }[variant]);

export default Button;
