import client from './client';
import type { CheckinType, CheckinRecord, UserStreak } from '../types/api';

export const checkinApi = {
  getTypes: () => client.get<CheckinType[]>('/checkin/types'),
  getToday: () => client.get<CheckinType[]>('/checkin/today'),
  checkin: (checkin_type_id: number) => client.post('/checkin', { checkin_type_id }),
  getStreaks: () => client.get<UserStreak[]>('/checkin/streaks'),
  getHistory: (days = 30) => client.get<CheckinRecord[]>(`/checkin/history?days=${days}`),
};
