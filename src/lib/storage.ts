function isBrowser() {
  return typeof window !== 'undefined';
}

function get(key: string) {
  if (!isBrowser()) return;
  return window.localStorage.getItem(key);
}

function set(key: string, value: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, value);
}

function remove(key: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export const storageClient = { get, set, remove };
