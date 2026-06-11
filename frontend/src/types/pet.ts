export type PetType = 'pikachu' | 'charmander' | 'squirtle';

export type EquipSlot = 'hat' | 'glasses' | 'top' | 'bottom' | 'shoes' | 'jewelry' | 'bag' | 'flower';

export const PET_NAMES: Record<PetType, string> = {
  pikachu: '皮卡丘',
  charmander: '小火龙',
  squirtle: '小乌龟',
};

export const PET_EMOJIS: Record<PetType, string> = {
  pikachu: '⚡',
  charmander: '🔥',
  squirtle: '💧',
};

export const SHOP_CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'clothes', label: '上衣' },
  { key: 'pants', label: '裤子' },
  { key: 'shoes', label: '鞋子' },
  { key: 'hat', label: '帽子' },
  { key: 'glasses', label: '眼镜' },
  { key: 'jewelry', label: '饰品' },
  { key: 'bag', label: '包包' },
  { key: 'flower', label: '鲜花' },
  { key: 'furniture', label: '家具' },
];
