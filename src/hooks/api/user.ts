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
  // const hasUser = Boolean(user);

  // useEffect(() => {
  //   if (!redirectTo || isLoading) return;
  //   if (
  //     // If redirectTo is set, redirect if the user was not found.
  //     (redirectTo && !redirectIfFound && !hasUser) ||
  //     // If redirectIfFound is also set, redirect if the user was found
  //     (redirectIfFound && hasUser)
  //   ) {
  //     router.push(redirectTo);
  //   }
  // }, [redirectTo, redirectIfFound, isLoading, hasUser]);

  useEffect(() => {
    if (isRequiredAuth && !isLoading && !user) {
      setIsNeedLogin(true);
    }
  }, [user, isLoading, isRequiredAuth]);

  return { user, isLoading, mutateUser: mutate, isNeedLogin };
}
