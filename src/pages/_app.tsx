import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClient } from '~/hooks/useClient';
import useMediaQuery from '~/hooks/useMediaQuery';
import GlobalStyle from '~/styles/globalstyles';
import { size } from '~/styles/utils';

function MyApp({ Component, pageProps }: AppProps) {
  const isMoreThanTablet = useMediaQuery(
    `(min-width: ${size.breakpoint.TABLET}px)`,
  );
  const isCSR = useClient();

  if (isCSR && !isMoreThanTablet) {
    return <div>PCでの閲覧をお願いします。</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        newestOnTop={false}
        draggable={false}
        icon={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
