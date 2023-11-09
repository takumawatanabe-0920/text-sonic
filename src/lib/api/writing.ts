import { ApiClient } from '~/lib/apiClient';

export type Writing = {
  id: string;
  title: string;
  description: string;

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
}: {
  id: string;
  description: string;
  title: string;
}): Promise<Writing | undefined> {
  const res = await ApiClient.put(`/writings/${id}`, {
    title,
    description,
  });
  return (await res.json()).message;
}

export async function getWritings(): Promise<{
  items: Writing[];
  total: number;
}> {
  const res = await ApiClient.get(`/writings`);
  const writings: Writing[] = (await res.json()) || [];

  return {
    items: writings,
    total: writings.length,
  };
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
