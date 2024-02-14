import { ApiClient } from '~/lib/apiClient';

export type Contact = {
  id: string;
  title: string;
  description: string;
  script?: string | undefined;
  scripts: string[];

  created_at: string;
  updated_at: string;
};

export type StatusResponse = 'OK' | 'NG';

export async function createContact({
  name,
  email,
  description,
}: {
  description: string;
  name: string;
  email: string;
}): Promise<Contact | undefined> {
  const res = await ApiClient.post(`/contacts`, {
    name,
    email,
    description,
  });
  return (await res.json()).message;
}

export async function getContacts({
  userId,
}: {
  userId?: string | undefined;
}): Promise<Contact[]> {
  if (!userId) {
    return [];
  }
  try {
    const res = await ApiClient.get(`/contacts`, { user_id: userId });
    const contacts: Contact[] = (await res.json()).message || [];
    return contacts;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getContact({
  id,
}: {
  id: string;
}): Promise<Contact | undefined> {
  const res = await ApiClient.get(`/contacts/${id}`);
  return (await res.json()).message;
}
