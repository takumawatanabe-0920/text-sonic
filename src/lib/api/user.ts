import { ApiClient } from '~/lib/apiClient';

export async function loginByEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await ApiClient.post('/auth/login', { email, password });

  return;
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
