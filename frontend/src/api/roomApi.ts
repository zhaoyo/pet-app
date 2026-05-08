import client from './client';
import type { RoomItem } from '../types/api';

export const roomApi = {
  get: (pet_id: number) => client.get<RoomItem[]>(`/room/${pet_id}`),
  save: (pet_id: number, layout: RoomItem[]) => client.put(`/room/${pet_id}`, { layout }),
};
