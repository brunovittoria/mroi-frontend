import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { LoadingScreen } from '../components/LoadingScreen';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
    } else {
      router.push('/perfil');
    }
  }, [router]);

  return <LoadingScreen />;
}
