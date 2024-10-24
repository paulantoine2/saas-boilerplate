import Axios, { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { toast } from '@/hooks/use-toast';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast({ variant: 'destructive', title: 'Error', description: message });

    return Promise.reject(error);
  },
);
