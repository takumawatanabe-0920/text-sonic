import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

export default function HelpIcon({
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
      <g clipPath="url(#clip0_1280_20475)">
        <path
          d="M10.0014 18.3348C14.6038 18.3348 18.3348 14.6038 18.3348 10.0014C18.3348 5.39896 14.6038 1.66797 10.0014 1.66797C5.39896 1.66797 1.66797 5.39896 1.66797 10.0014C1.66797 14.6038 5.39896 18.3348 10.0014 18.3348Z"
          stroke={color}
          strokeWidth="1.66668"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.57715 7.50146C7.77307 6.94452 8.15978 6.47488 8.66879 6.17573C9.17779 5.87658 9.77624 5.76723 10.3581 5.86704C10.9401 5.96686 11.4679 6.26939 11.8481 6.72106C12.2283 7.17274 12.4364 7.7444 12.4355 8.3348C12.4355 10.0015 9.9355 10.8348 9.9355 10.8348"
          stroke={color}
          strokeWidth="1.66668"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.001 14.168H10.0098"
          stroke={color}
          strokeWidth="1.66668"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1280_20475">
          <rect
            width="20.0001"
            height="20.0001"
            fill="white"
            transform="translate(0 0.000976562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
