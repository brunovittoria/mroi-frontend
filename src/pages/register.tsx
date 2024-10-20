import { useForm } from 'react-hook-form';
import { Button, TextField, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { register as registerUser } from '../services/api';

interface RegisterFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data.name, data.email, data.password, data.phone);
      router.push('/perfil');
    } catch (err) {
      console.error('Erro no registro:', err);
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
          backgroundColor: '#282A36',
          padding: 3,
          borderRadius: 2,
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
          {...register('name')}
          label="Nome"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('email')}
          label="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('phone')}
          label="Número"
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Registrar
        </Button>

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <span>
            Já tem uma conta?{' '}
            <a
              href="/login"
              style={{
                color: '#FFD700',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Clique aqui!
            </a>
          </span>
        </Box>
      </Box>
    </Box>
  );
}
