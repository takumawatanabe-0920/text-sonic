import { color as colors } from '~/styles/utils';

type TwitterIconProps = {
  color: string;
};
const TwitterIcon: React.FC<TwitterIconProps> = ({ color = colors.WHITE }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.9997 6.32861C3.05353 6.12045 3.10816 5.93138 3.16006 5.76436C4.13549 6.93166 5.34155 7.88985 6.70621 8.57673C8.35013 9.40417 10.1732 9.8122 12.013 9.7645C12.284 9.75747 12.5 9.53576 12.5 9.26466V8.26467H12.5L12.5 8.25796C12.489 7.44272 12.7287 6.64378 13.1867 5.96921C13.6446 5.29464 14.2987 4.77698 15.0604 4.48625C15.8221 4.19552 16.6547 4.14573 17.4457 4.34364C18.2366 4.54154 18.9477 4.97758 19.4827 5.59278C19.6118 5.74118 19.8159 5.80014 20.0042 5.74343C20.7217 5.52737 21.415 5.24143 22.0745 4.89036C21.7106 5.69251 21.2015 6.42485 20.5689 7.04866C20.4501 7.16585 20.3976 7.33461 20.4289 7.49854C20.4753 7.74155 20.4991 7.98833 20.5 8.23573C20.4997 13.8102 17.8432 17.7598 14.1401 19.7308C10.9236 21.4428 6.87952 21.682 3.02151 20.1434C4.89729 19.9005 6.70027 19.2212 8.28082 18.1484C8.43103 18.0464 8.51417 17.871 8.49802 17.6902C8.48187 17.5094 8.36897 17.3515 8.20307 17.2778C6.03302 16.3133 4.67639 15.0622 3.84428 13.7484C3.01016 12.4314 2.68397 11.0207 2.62448 9.71196C2.5649 8.40102 2.77364 7.20272 2.9997 6.32861Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TwitterIcon;
