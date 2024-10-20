import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

import { LoadingScreen } from '../components/LoadingScreen';
import { useRequestSWR } from '../hooks/use-requestSWR';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  youtubeAccesses?: number;
  githubAccesses?: number;
}

export default function Perfil() {
  const { data: profile } = useRequestSWR<UserProfile>({ url: '/profile' });

  if (!profile) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Typography variant="h4">Perfil</Typography>
      <Typography>Nome: {profile?.name}</Typography>
      <Typography>Email: {profile?.email}</Typography>
      <Typography>Número: {profile?.phone}</Typography>

      <Card>
        <CardContent>
          <Typography>
            Youtube: {profile?.youtubeAccesses || 0} acessos
          </Typography>
          <Typography>
            GitHub: {profile?.githubAccesses || 0} acessos
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
