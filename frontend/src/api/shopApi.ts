import client from './client';
import type { ShopItem } from '../types/api';

export const shopApi = {
  getItems: (category?: string) =>
    client.get<ShopItem[]>('/shop/items' + (category && category !== 'all' ? `?category=${category}` : '')),
  buy: (item_id: number) => client.post('/shop/buy', { item_id }),
};

export const inventoryApi = {
  getAll: () => client.get<ShopItem[]>('/inventory'),
};
