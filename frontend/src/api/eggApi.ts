import client from './client';

export const eggApi = {
  get: () => client.get<{ pet_eggs: number; points: number }>('/eggs'),
  buy: () => client.post<{ pet_eggs: number; points: number }>('/eggs/buy'),
};
