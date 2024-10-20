import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { handleLogin } from '../services/api';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await handleLogin(data.email, data.password);
      router.push('/perfil');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
          backgroundColor: '#282A36',
          boxShadow:
            '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)'
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}
        >
          <Image src="/logo-minera.svg" alt="Logo" width={300} height={100} />
        </Box>
        <TextField
          {...register('email')}
          label="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('password')}
          type="password"
          label="Senha"
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <span>
            Ainda não é registrado?{' '}
            <a
              href="/register"
              style={{
                color: '#FFD700',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Cadastre-se aqui!
            </a>
          </span>
        </Box>
      </Box>
    </Box>
  );
}
