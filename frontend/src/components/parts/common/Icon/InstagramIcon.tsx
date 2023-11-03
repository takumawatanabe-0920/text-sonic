import { color as colors } from '~/styles/utils';

type InstagramIconProps = {
  color: string;
};
const InstagramIcon: React.FC<InstagramIconProps> = ({
  color = colors.WHITE,
}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 2.73438H7C4.23858 2.73438 2 4.97295 2 7.73438V17.7344C2 20.4958 4.23858 22.7344 7 22.7344H17C19.7614 22.7344 22 20.4958 22 17.7344V7.73438C22 4.97295 19.7614 2.73438 17 2.73438Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9997 12.1047C16.1231 12.9369 15.981 13.7869 15.5935 14.5337C15.206 15.2805 14.5929 15.8861 13.8413 16.2643C13.0898 16.6426 12.2382 16.7743 11.4075 16.6406C10.5768 16.5069 9.80947 16.1148 9.21455 15.5198C8.61962 14.9249 8.22744 14.1576 8.09377 13.3269C7.96011 12.4962 8.09177 11.6446 8.47003 10.8931C8.84829 10.1415 9.45389 9.52842 10.2007 9.14092C10.9475 8.75342 11.7975 8.61126 12.6297 8.73468C13.4786 8.86056 14.2646 9.25614 14.8714 9.86298C15.4782 10.4698 15.8738 11.2558 15.9997 12.1047Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.23438H17.51"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InstagramIcon;
