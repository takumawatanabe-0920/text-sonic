import React from 'react';
import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

export default function ListIcon({
  size = 15,
  color = colors.border.GRAY_PRIMARY,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1687 8.33398H2.50195"
        stroke={color}
        strokeWidth="1.66668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5021 5H2.50195"
        stroke={color}
        strokeWidth="1.66668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5021 11.668H2.50195"
        stroke={color}
        strokeWidth="1.66668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1687 15H2.50195"
        stroke={color}
        strokeWidth="1.66668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
