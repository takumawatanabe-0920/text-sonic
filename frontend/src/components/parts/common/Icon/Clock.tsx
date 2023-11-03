import React from 'react';
import * as utils from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

function Clock({ size = 25, color = utils.color.TEXT }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99175 1.66663C5.39175 1.66663 1.66675 5.39996 1.66675 9.99996C1.66675 14.6 5.39175 18.3333 9.99175 18.3333C14.6001 18.3333 18.3334 14.6 18.3334 9.99996C18.3334 5.39996 14.6001 1.66663 9.99175 1.66663ZM10.0001 16.6666C6.31675 16.6666 3.33341 13.6833 3.33341 9.99996C3.33341 6.31663 6.31675 3.33329 10.0001 3.33329C13.6834 3.33329 16.6667 6.31663 16.6667 9.99996C16.6667 13.6833 13.6834 16.6666 10.0001 16.6666ZM10.4167 5.83329H9.16675V10.8333L13.5417 13.4583L14.1667 12.4333L10.4167 10.2083V5.83329Z"
        fill={color}
      />
    </svg>
  );
}

export default Clock;
