import {
  css,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';

export const zIndex = {
  BASE: 0,
  UPPER: 100,
  FOOTER: 700,
  TAB_BAR: 800,
  HEADER: 900,
  UPPER_MOST: 1000,
};

export const size = {
  font: {
    XS: '10px',
    S: '12px',
    base: '14px',
    M: '16px',
    L: '20px',
    XL: '24px',
    XXL: '32px',
  },
  fontWeight: {
    W3: '300',
    W4: '400',
    W5: '500',
    W6: '600',
    W7: '700',
    W8: '800',
    BOLD: 'bold',
  },
  breakpoint: {
    SP: 320,
    TABLET: 768,
    PC: 1025,
  },
  breakPointMax: {
    SP: 767,
    TABLET: 1024,
  },
  width: {
    CONTENT_MAX_WITH_PADDING: 900,
    CONTENTS_MAX: 1000,
  },
  height: {
    HEADER: 60,
    HEADERWITHMENU: 106,
    TABBAR: 70,
  },
};

export const color = {
  PRIMARY: '#6AB709',
  // PRIMARY: '#3D1593',
  // PRIMARY_LIGHT: '#CBB2FF',
  PRIMARY_DARK: '#9B7ED8',
  TEXT: '#0A0A0A',
  // TEXT_MEDIUM: '#0A0A0A',
  TEXT_LOW: '#B5B5B5',
  // DANGER: '#BE0123',
  // REQUIRED: '#E03939',
  // DARK_BLUE: '#1A202C',
  WHITE: '#FFFFFF',
  LITE_GRAY: '#f5f5f5',
  BLACK_50: '#F8F8FB',
  BLACK_100: '#F2F3F5',
  BLACK_300: '#D8D8DB',
  BLACK_500: '#949797',
  BLACK_800: '#414143',
  BLACK_900: '#222222',
  GREEN: '#A5E259',
  BLUE: '#03a9f4',
  BLACK: '#424242',
  font: {
    PRIMARY: '#3D1593',
    MAIN: '#050505',
    WHITE: '#FFFFFF',
    BLACK: '#222222',
    BLUE: '#1976d2',
    DARK_BLUE: '#002063',
    DARK_GRAY: '#6C6C6C',
    GRAY: '#747474',
    LIGHT_GRAY: '#626264',
    ERROR: '#E03939',
    LINK: '#3264FF',
    QUOTE: '#353535',
    WEIGHTED_GRAY: '#333333',
    SELECTED: '#579507',
    UNSELECTED: 'rgba(53, 53, 53, 0.4)',
  },
  bg: {
    PRIMARY: '#3D1593',
    PRIMARY_DARK: '#9B7ED8',
    GRAY_BASE: '#F1F1F1',
    GRAY_PRIMARY: '#F5F5F5',
    LIGHT_GRAY: '#E8E8E8',
    WHITE: '#FFFFFF',
    NOTIFICATION_SUCCESS: '#069FCF',
    NOTIFICATION_FAILED: '#E03939',
    BLACK: '#1A1A1A',
    REPORT_LIST: 'rgba(0, 13, 57, 0.02)',
  },
  border: {
    PRIMARY: '#3D1593',
    PRIMARY_DARK: '#9B7ED8',
    GRAY_PRIMARY: '#EEEEEE',
    LIGHT_GRAY: '#E8E8E8',
    GRAY: '#353535',
    FORM_GRAY: '#E1E1E1',
    ERROR: '#E03939',
    OKAY: '#069FCF',
  },
  // LIKE: '#FF658A',
  // NOT_LIKE: '#B5B5B5',
};

type ScMediaQuery = Record<
  keyof typeof size.breakpoint,
  (...args: SimpleInterpolation[]) => FlattenSimpleInterpolation
>;

export const breakPoint = (
  Object.keys(size.breakpoint) as (keyof typeof size.breakpoint)[]
).reduce<ScMediaQuery>((accumulator, label) => {
  return {
    ...accumulator,
    [label]: (...args: SimpleInterpolation[]) => css`
      @media (min-width: ${size.breakpoint[label]}px) {
        ${args};
      }
    `,
  };
}, {} as ScMediaQuery);

// ブレークポイントの以下の時のCSSを適用する
export const breakPointLessThan = (
  Object.keys(size.breakpoint) as (keyof typeof size.breakpoint)[]
).reduce<ScMediaQuery>((accumulator, label) => {
  return {
    ...accumulator,
    [label]: (...args: SimpleInterpolation[]) => css`
      @media (max-width: ${size.breakPointMax[label as 'SP' | 'TABLET']}px) {
        ${args};
      }
    `,
  };
}, {} as ScMediaQuery);

// pxを指定して、その範囲でのみCSSを適用する
export const breakPointBetween = (
  min: number,
  max: number,
  ...args: SimpleInterpolation[]
) => css`
  @media (min-width: ${min}px) and (max-width: ${max}px) {
    ${args};
  }
`;

// コンテンツの最大幅を指定する
export const contentsMaxWidth = (width?: number | undefined) => css`
  ${breakPoint.PC(css`
    width: 100%;
    margin: 0 auto;
    max-width: ${width || size.width.CONTENTS_MAX}px;
  `)}
  ${width === size.width.CONTENT_MAX_WITH_PADDING &&
  breakPoint.PC(css`
    padding-left: 50px;
    padding-right: 50px;
  `)}
`;
