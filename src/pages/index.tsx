import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/user');
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Created by create Andyson" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress size={50} />
        </Box>
      </main>
    </>
  );
}
