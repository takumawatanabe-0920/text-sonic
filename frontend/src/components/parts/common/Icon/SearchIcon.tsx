import React from 'react';
import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

function SearchIcon({ size = 15, color = colors.font.WHITE }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.52116 11.0833C9.09849 11.0833 11.1878 8.994 11.1878 6.41667C11.1878 3.83934 9.09849 1.75 6.52116 1.75C3.94383 1.75 1.85449 3.83934 1.85449 6.41667C1.85449 8.994 3.94383 11.0833 6.52116 11.0833Z"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3546 12.2499L9.81714 9.7124"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
