interface Props {
  size?: number;
  color?: string;
}

function Edit({ size = 25, color = '#353535' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 13.3334H14"
        stroke={color}
        strokeWidth="1.35417"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2.33353C11.2652 2.06831 11.6249 1.91931 12 1.91931C12.1857 1.91931 12.3696 1.95589 12.5412 2.02696C12.7128 2.09803 12.8687 2.2022 13 2.33353C13.1313 2.46485 13.2355 2.62075 13.3066 2.79233C13.3776 2.96391 13.4142 3.14781 13.4142 3.33353C13.4142 3.51924 13.3776 3.70314 13.3066 3.87472C13.2355 4.0463 13.1313 4.2022 13 4.33353L4.66667 12.6669L2 13.3335L2.66667 10.6669L11 2.33353Z"
        stroke={color}
        strokeWidth="1.35417"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Edit;
