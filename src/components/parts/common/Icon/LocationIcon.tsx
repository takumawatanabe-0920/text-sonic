import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

export default function LocationIcon({
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
        d="M18.3348 1.66699L12.5014 18.3338L9.16802 10.8337L1.66797 7.50037L18.3348 1.66699Z"
        stroke={color}
        strokeWidth="1.66668"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
