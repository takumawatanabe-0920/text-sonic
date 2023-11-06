import React from 'react';
import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

export function Close({
  size = 15,
  color = colors.border.GRAY_PRIMARY,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 15"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill={color}
          d="M13.218.804a.69.69 0 0 1 .979 0 .7.7 0 0 1 0 .985L8.529 7.5l5.668 5.712a.7.7 0 0 1 0 .984.69.69 0 0 1-.978 0L7.5 8.433l-5.718 5.763a.69.69 0 0 1-.893.074l-.086-.074a.7.7 0 0 1 0-.985L6.471 7.5.803 1.788a.7.7 0 0 1 0-.984.69.69 0 0 1 .978 0L7.5 6.566z"
        />
      </g>
    </svg>
  );
}
