import { color as colors } from '~/styles/utils';

interface Props {
  size?: number;
  color?: string;
}

export default function LogoutIcon({
  size = 15,
  color = colors.border.GRAY_PRIMARY,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1667 4.66764L10.9917 5.84264L12.3083 7.16764H5.5V8.83431H12.3083L10.9917 10.151L12.1667 11.3343L15.5 8.00098L12.1667 4.66764ZM2.16667 2.16764H8V0.500977H2.16667C1.25 0.500977 0.5 1.25098 0.5 2.16764V13.8343C0.5 14.751 1.25 15.501 2.16667 15.501H8V13.8343H2.16667V2.16764Z"
        fill="black"
        stroke={color}
      />
    </svg>
  );
}
