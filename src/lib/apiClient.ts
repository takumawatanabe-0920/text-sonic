import pickQueryParams from '~/lib/pickQueryParams';
import { storageClient } from '~/lib/storage';

const SERVER_ROOT = process.env.NEXT_PUBLIC_API_HOST_KEY || '';

async function get(path: string, params: Record<string, any> = {}) {
  const queryParams = pickQueryParams(params);
  const isEmpty = queryParams.toString() === '';
  const token = storageClient.get('token');
  const response = await fetch(
    // eslint-disable-next-line
    `${SERVER_ROOT}${path}${isEmpty ? '' : `?${queryParams}`}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      mode: 'cors',
    },
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error, err.statusCode);
  }

  return response;
}

async function otherMethods(method: string, endpoint: string, data: any) {
  const token = storageClient.get('token');
  const response = await fetch(`${SERVER_ROOT}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message, err.statusCode);
  }

  return response;
}

async function post(path: string, data: any) {
  return await otherMethods('POST', path, data);
}

async function put(path: string, data: any) {
  return await otherMethods('PUT', path, data);
}

async function _delete(path: string, data: any) {
  return await otherMethods('DELETE', path, data);
}

export const ApiClient = {
  get,
  post,
  put,
  delete: _delete,
};
