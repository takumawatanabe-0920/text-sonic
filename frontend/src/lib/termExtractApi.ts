import pickQueryParams from '~/lib/pickQueryParams';

const SERVER_ROOT = process.env.NEXT_PUBLIC_TERM_EXTRACT_API_HOST_KEY || '';

async function get(path: string, params: Record<string, any> = {}) {
  const queryParams = pickQueryParams(params);
  const isEmpty = queryParams.toString() === '';
  const response = await fetch(
    // eslint-disable-next-line
    `${SERVER_ROOT}${path}${isEmpty ? '' : `?${queryParams}`}`,
    {
      headers: {
        'Content-Type': 'application/json',
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

export const TermExtractApiClient = {
  get,
};
