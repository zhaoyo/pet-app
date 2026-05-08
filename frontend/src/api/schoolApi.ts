import client from './client';
import type { Course } from '../types/api';

export const schoolApi = {
  getCourses: (pet_id?: number) =>
    client.get<Course[]>('/school/courses' + (pet_id ? `?pet_id=${pet_id}` : '')),
  buy: (course_id: number, pet_id: number) =>
    client.post('/school/buy', { course_id, pet_id }),
};
