import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getCurrentUser } from '~/lib/api/user';

export function useUser({
  isRequiredAuth = false,
}: {
  isRequiredAuth: boolean;
}) {
  const { data, isLoading, mutate } = useSWR('getCurrentUser', getCurrentUser);
  const user = data;
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const openLoginModalHandler = () => {
    setOpenLoginModal(true);
  };

  const closeLoginModalHandler = () => {
    setOpenLoginModal(false);
  };

  useEffect(() => {
    if (isRequiredAuth && !isLoading && !user) {
      setIsNeedLogin(true);
    }
  }, [user, isLoading, isRequiredAuth]);

  useEffect(() => {
    if (isNeedLogin) {
      setOpenLoginModal(true);
    }
  }, [isNeedLogin]);

  return {
    user,
    isLoading,
    mutateUser: mutate,
    isNeedLogin,
    openLoginModal,
    openLoginModalHandler,
    closeLoginModalHandler,
  };
}
