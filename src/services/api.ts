import api from './axios';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

interface ProfileResponse {
  user: {
    name: string;
    email: string;
    phone: string;
    youtubeAccesses?: number;
    githubAccesses?: number;
  };
}

interface Share {
  id: number;
  user_id: number;
  destination: string;
  click_count: number;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', {
      email,
      password
    });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Erro ao tentar fazer login';
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  phone: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/register', {
      name,
      email,
      password,
      phone
    });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Erro ao tentar registrar o usuário';
  }
};

export const handleLogin = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const result = await login(email, password);
    console.log('Login bem-sucedido:', result);
  } catch (error: any) {
    console.error('Erro no login:', error);
  }
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
};

export const updateShare = async (destination: string): Promise<void> => {
  try {
    await api.put('/shares', { destination });
  } catch (error: any) {
    console.error('Erro ao atualizar compartilhamento:', error);
  }
};

export const getShares = async (): Promise<{ shares: Share[] }> => {
  try {
    const response = await api.get<{ shares: Share[] }>('/shares');
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || 'Erro ao buscar shares';
  }
};
