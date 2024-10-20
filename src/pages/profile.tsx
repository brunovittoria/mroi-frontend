import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { LoadingScreen } from '../components/LoadingScreen';
import { useRequestSWR } from '../hooks/use-requestSWR';
import { logout, updateShare, getShares } from '../services/api';
import { useRouter } from 'next/router';

interface UserProfile {
  user: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}

interface Share {
  destination: string;
  click_count: number;
}

export default function Perfil() {
  const { data: profile } = useRequestSWR<UserProfile>({ url: '/profile' });
  const router = useRouter();
  const [shares, setShares] = useState<Share[]>();

  const fetchUserShares = async () => {
    try {
      const data = await getShares();
      const shares = data.shares;

      setShares(shares);
    } catch (error) {
      console.error('Erro ao buscar os shares:', error);
    }
  };

  useEffect(() => {
    fetchUserShares();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleShareClick = async (destination: string) => {
    const url = `https://${destination.toLowerCase()}.com`;
    window.open(url, '_blank');

    try {
      await updateShare(destination);
      fetchUserShares();
    } catch (error) {
      console.error(`Erro ao incrementar acesso para ${destination}:`, error);
    }
  };

  if (!profile) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 3
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Perfil
      </Typography>
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
          boxShadow:
            '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)'
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Nome: {profile?.user?.name}
          </Typography>
          <Typography>Email: {profile?.user?.email}</Typography>
          <Typography>Número: {profile?.user?.phone}</Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ marginTop: 3 }}
      >
        Logout
      </Button>
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        {shares?.map((share) => (
          <Box>
            <Typography sx={{ marginTop: 2 }}>
              {share.destination} : {share.click_count} acessos
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleShareClick(share.destination)}
            >
              Acessar {share.destination}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
