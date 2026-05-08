import { create } from 'zustand';
import type { User } from '../types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

const storedToken = localStorage.getItem('pet_token');
const storedUser = localStorage.getItem('pet_user');

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,

  setAuth: (user, token) => {
    localStorage.setItem('pet_token', token);
    localStorage.setItem('pet_user', JSON.stringify(user));
    set({ user, token });
  },

  updateUser: (user) => {
    localStorage.setItem('pet_user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('pet_token');
    localStorage.removeItem('pet_user');
    set({ user: null, token: null });
  },
}));
