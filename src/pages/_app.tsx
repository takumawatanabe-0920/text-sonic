import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '~/styles/globalstyles';

function MyApp({ Component, pageProps }: AppProps) {
  console.log({
    NEXT_PUBLIC_API_HOST_KEY: process.env.NEXT_PUBLIC_API_HOST_KEY,
  });
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
