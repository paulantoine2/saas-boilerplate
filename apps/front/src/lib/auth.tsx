import { api } from './api-client';
import type { AuthBody, PublicUser } from '@repo/types';
import { configureAuth } from './react-query-auth';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

export const getUser = (): Promise<PublicUser> => {
  return api.get('/auth/me');
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
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

const authConfig = {
  userFn: getUser,
  loginFn: async (data: AuthBody) => {
    const response = await loginWithEmailAndPassword(data);
    return response;
  },
  registerFn: async (data: { email: string; password: string }) => {
    const response = await registerWithEmailAndPassword(data);
    return response;
  },
  logoutFn: logout,
};

export const { useLogin, useLogout, useRegister, AuthLoader, useUser } =
  configureAuth(authConfig);
