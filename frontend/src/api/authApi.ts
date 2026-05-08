import client from './client';
import type { User } from '../types/api';

export const authApi = {
  register: (username: string, password: string) =>
    client.post<{ token: string; user: User }>('/auth/register', { username, password }),

  login: (username: string, password: string) =>
    client.post<{ token: string; user: User }>('/auth/login', { username, password }),

  me: () => client.get<User>('/auth/me'),
};
