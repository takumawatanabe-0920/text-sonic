import { ApiClient } from '~/lib/apiClient';

export async function loginByEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await ApiClient.post('/auth/login', { email, password });

  return res.json();
}

export async function logout() {
  // const res = await ApiClient.post('/auth/logout');
  // return res.json();
}

export type GetCurrentUserResultType = {
  id: string;
  email: string;
};

export async function getCurrentUser(): Promise<GetCurrentUserResultType | null> {
  try {
    const res = await ApiClient.get('/users/me');
    const data: GetCurrentUserResultType = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function signUpByEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await ApiClient.post('/users', { email, password });

  return res.json();
}
