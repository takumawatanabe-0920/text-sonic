import React from 'react';
import * as utils from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

function ArrowRight({ size = 25, color = utils.color.font.MAIN }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
    >
      <path
        d="m19.955 11.346a1.5 1.5 0 0 1 0 2.121l-.046.042-9.859 9.859a1.5 1.5 0 0 1 -2.121-2.121l8.842-8.843-8.837-8.836a1.5 1.5 0 0 1 2.122-2.122l9.9 9.9z"
        fill={color}
      />
    </svg>
  );
}

export default ArrowRight;
