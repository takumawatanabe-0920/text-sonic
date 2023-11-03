import React from 'react';

interface Props {
  size?: number;
  color?: string;
}

export default function SlashIcon({ size = 15 }: Props) {
  return (
    <svg
      width={size}
      height="auto"
      viewBox="0 0 7 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 16.0176L6.47232 0.982496" stroke="#B5B5B5" />
    </svg>
  );
}
