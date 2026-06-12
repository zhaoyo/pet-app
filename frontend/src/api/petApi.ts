import client from './client';
import type { Pet } from '../types/api';

export const petApi = {
  list: () => client.get<Pet[]>('/pets'),
  create: (name: string, type: string) => client.post<Pet>('/pets', { name, type }),
  get: (id: number) => client.get<Pet>(`/pets/${id}`),
  update: (id: number, name: string) => client.put(`/pets/${id}`, { name }),
  delete: (id: number) => client.delete(`/pets/${id}`),
  uploadAvatar: (id: number, file: File) => {
    const form = new FormData();
    form.append('avatar', file);
    return client.post<{ avatar_url: string }>(`/pets/${id}/avatar`, form);
  },
  boostMood: (id: number, amount: number) => client.patch<{ mood: number }>(`/pets/${id}/mood`, { amount }),
  setDisplayCard: (id: number, card_id: string | null) =>
    client.patch(`/pets/${id}/display-card`, { card_id }),
};
