import { ApiClient } from '~/lib/apiClient';

export type Writing = {
  id: string;
  title: string;
  description: string;
  script?: string | undefined;
  scripts: string[];

  created_at: string;
  updated_at: string;
};

export type StatusResponse = 'OK' | 'NG';

export async function createWriting({
  title,
  description,
}: {
  description: string;
  title: string;
}): Promise<Writing | undefined> {
  const res = await ApiClient.post(`/writings`, {
    title,
    description,
  });
  return (await res.json()).message;
}

export async function updateWriting({
  id,
  title,
  description,
  scripts,
}: {
  id: string;
  description: string;
  title: string;
  scripts: string[];
}): Promise<Writing | undefined> {
  const res = await ApiClient.put(`/writings/${id}`, {
    title,
    description,
    scripts,
  });
  return (await res.json()).message;
}

export async function getWritings({
  userId,
}: {
  userId?: string | undefined;
}): Promise<Writing[]> {
  if (!userId) {
    return [];
  }
  try {
    const res = await ApiClient.get(`/writings`, { user_id: userId });
    const writings: Writing[] = (await res.json()).message || [];
    return writings;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getWriting({
  id,
}: {
  id: string;
}): Promise<Writing | undefined> {
  const res = await ApiClient.get(`/writings/${id}`);
  return (await res.json()).message;
}

export async function deleteWriting({
  id,
}: {
  id: string;
}): Promise<StatusResponse> {
  const res = await ApiClient.delete(`/writings/${id}`, {});
  return (await res.json()).message;
}
