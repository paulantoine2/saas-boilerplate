import { api } from './api-client';
import type { AuthBody, PublicUser, User } from '@repo/types';
import { useCallback } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const getUser = (): Promise<PublicUser> => {
  return api.get('/me');
};

const logout = (): Promise<void> => {
  return api.post('/logout');
};

const loginWithEmailAndPassword = (data: AuthBody): Promise<PublicUser> => {
  return api.post('/auth/login', data);
};

const registerWithEmailAndPassword = (data: {
  email: string;
  password: string;
}): Promise<PublicUser> => {
  return api.post('/auth/register', data);
};

const userKey = ['authenticated-user'];

export const useUser = (
  options?: Omit<
    UseQueryOptions<PublicUser, Error, User, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    queryKey: userKey,
    queryFn: getUser,
    ...options,
  });

export const useLogin = (
  options?: Omit<UseMutationOptions<PublicUser, Error, AuthBody>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();

  const setUser = useCallback(
    (data: PublicUser) => queryClient.setQueryData(userKey, data),
    [queryClient],
  );

  return useMutation({
    ...options,
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (user, ...rest) => {
      setUser(user);
      options?.onSuccess?.(user, ...rest);
    },
  });
};

export const useRegister = (
  options?: Omit<UseMutationOptions<PublicUser, Error, AuthBody>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();

  const setUser = useCallback(
    (data: PublicUser) => queryClient.setQueryData(userKey, data),
    [queryClient],
  );

  return useMutation({
    ...options,
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (user, ...rest) => {
      setUser(user);
      options?.onSuccess?.(user, ...rest);
    },
  });
};

export const useLogout = (
  options?: Omit<UseMutationOptions<void, Error>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const setUser = useCallback(
    (data: null) => queryClient.setQueryData(userKey, data),
    [queryClient],
  );

  return useMutation({
    ...options,
    mutationFn: logout,
    onSuccess: (...rest) => {
      setUser(null);
      router.invalidate();
      options?.onSuccess?.(...rest);
    },
  });
};
