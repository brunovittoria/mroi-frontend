import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateShare } from '../services/api';

import { LoadingScreen } from '../components/LoadingScreen';

export default function Divulgar() {
  const router = useRouter();

  useEffect(() => {
    const divulgar = async () => {
      try {
        const destino = 'youtube';

        // Atualiza o compartilhamento
        await updateShare(destino);

        // Redireciona com base no destino
        if (destino === 'youtube') {
          window.location.href = 'https://youtube.com';
        } else if (destino === 'github') {
          window.location.href = 'https://github.com';
        }
      } catch (error) {
        console.error('Erro ao redirecionar:', error);
      }
    };

    divulgar();
  }, []);

  return <LoadingScreen />;
}
