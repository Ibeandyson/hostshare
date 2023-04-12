import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 6000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}
