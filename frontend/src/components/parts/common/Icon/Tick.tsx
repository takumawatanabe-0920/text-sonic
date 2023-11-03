import React from 'react';
import { color as colors } from '~/styles/utils';

interface Props {
  color?: string;
}

function TickIcon({ color = colors.bg.NOTIFICATION_SUCCESS }: Props) {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 23 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 6.5L10 14L21.5 1.5" stroke={color} strokeWidth="3" />
    </svg>
  );
}

export default TickIcon;
