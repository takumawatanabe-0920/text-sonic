interface Props {
  color?: string;
  isLiked: boolean;
}

export default function FixedLikeIcon({ isLiked }: Props) {
  if (isLiked) {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1597_6699)">
          <rect x="4" y="2" width="40" height="40" rx="20" fill="white" />
          <path
            d="M31.3664 16.8412C30.9407 16.4154 30.4354 16.0776 29.8792 15.8471C29.3229 15.6167 28.7268 15.498 28.1247 15.498C27.5226 15.498 26.9264 15.6167 26.3702 15.8471C25.814 16.0776 25.3087 16.4154 24.883 16.8412L23.9997 17.7246L23.1164 16.8412C22.2566 15.9815 21.0906 15.4985 19.8747 15.4985C18.6588 15.4985 17.4928 15.9815 16.633 16.8412C15.7733 17.701 15.2903 18.867 15.2903 20.0829C15.2903 21.2988 15.7733 22.4648 16.633 23.3246L17.5164 24.2079L23.9997 30.6912L30.483 24.2079L31.3664 23.3246C31.7922 22.8989 32.13 22.3936 32.3605 21.8374C32.5909 21.2811 32.7095 20.685 32.7095 20.0829C32.7095 19.4808 32.5909 18.8847 32.3605 18.3284C32.13 17.7722 31.7922 17.2669 31.3664 16.8412V16.8412Z"
            fill="#FF658A"
            stroke="#FF658A"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1597_6699"
            x="0"
            y="0"
            width="48"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1597_6699"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1597_6699"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1013_3884)">
        <rect x="4" y="2" width="40" height="40" rx="20" fill="white" />
        <path
          d="M31.3661 16.8412C30.9405 16.4154 30.4351 16.0776 29.8789 15.8471C29.3227 15.6167 28.7265 15.498 28.1244 15.498C27.5224 15.498 26.9262 15.6167 26.37 15.8471C25.8138 16.0776 25.3084 16.4154 24.8828 16.8412L23.9994 17.7246L23.1161 16.8412C22.2564 15.9815 21.0903 15.4985 19.8744 15.4985C18.6586 15.4985 17.4925 15.9815 16.6328 16.8412C15.773 17.701 15.29 18.867 15.29 20.0829C15.29 21.2988 15.773 22.4648 16.6328 23.3246L17.5161 24.2079L23.9994 30.6912L30.4828 24.2079L31.3661 23.3246C31.7919 22.8989 32.1297 22.3936 32.3602 21.8374C32.5907 21.2811 32.7093 20.685 32.7093 20.0829C32.7093 19.4808 32.5907 18.8847 32.3602 18.3284C32.1297 17.7722 31.7919 17.2669 31.3661 16.8412V16.8412Z"
          stroke="black"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1013_3884"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1013_3884"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1013_3884"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
