import { useEffect, useState } from 'react';

// CSRのみで実行するためのフック
// SSR時には実行されない
// https://zenn.dev/takewell/articles/5ee9530eedbeb82e4de7
export const useClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return isClient;
};
