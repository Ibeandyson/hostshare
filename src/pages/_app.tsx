import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalProvider from '@/context/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </div>
  );
}
