import { useEffect } from 'react';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import ThemeProvider from '../theme';

import { MotionLazyContainer } from '../components/animate';
import NotistackProvider from '../components/NotistackProvider';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (
      !authToken &&
      router.pathname !== '/login' &&
      router.pathname !== '/register'
    ) {
      router.push('/login');
    }
  }, [router]);

  return (
    <ThemeProvider>
      <MotionLazyContainer>
        <NotistackProvider>
          <Component {...pageProps} />
        </NotistackProvider>
      </MotionLazyContainer>
    </ThemeProvider>
  );
}
