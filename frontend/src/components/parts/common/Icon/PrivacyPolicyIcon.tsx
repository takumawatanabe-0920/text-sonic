interface Props {
  size?: number;
}

export default function PrivacyPolicyIcon({ size = 20 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1880_21153)">
        <path
          d="M10 2.65898L15.8333 5.25065V9.16732C15.8333 12.934 13.35 16.409 10 17.4423C6.65 16.409 4.16667 12.934 4.16667 9.16732V5.25065L10 2.65898ZM10 0.833984L2.5 4.16732V9.16732C2.5 13.7923 5.7 18.1173 10 19.1673C14.3 18.1173 17.5 13.7923 17.5 9.16732V4.16732L10 0.833984ZM9.16667 5.83398H10.8333V7.50065H9.16667V5.83398ZM9.16667 9.16732H10.8333V14.1673H9.16667V9.16732Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1880_21153">
          <rect
            width={size}
            height={size}
            fill="white"
            transform="translate(0 0.000976562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
