import { ApiClient } from '~/lib/apiClient';
import { storageClient } from '~/lib/storage';

export type GetCurrentUserResultType = {
  id: string;
  email: string;
};

export async function getCurrentUser(): Promise<GetCurrentUserResultType | null> {
  try {
    const res = await ApiClient.get('/users/me');
    const data: GetCurrentUserResultType = (await res.json()).message;
    return data;
  } catch (e) {
    return null;
  }
}

export type SignUpResultType = {
  access_token: string;
  token_type: string;
};

export type SignInResultType = {
  access_token: string;
  token_type: string;
};

export async function signUpByEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await ApiClient.post('/users', { email, password });
  const data: SignUpResultType = (await res.json()).message;
  storageClient.set('token', data.access_token);
  return;
}

export async function loginByEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await ApiClient.post('/auth/login', { email, password });
  const data: SignInResultType = (await res.json()).message;
  storageClient.set('token', data.access_token);
  return;
}

export async function logout() {
  storageClient.remove('token');
  return;
}
