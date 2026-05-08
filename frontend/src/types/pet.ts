export type PetType = 'dog' | 'cat' | 'fox' | 'turtle' | 'rabbit' | 'bird' | 'dolphin' | 'tiger' | 'lion' | 'red_panda';

export type EquipSlot = 'hat' | 'glasses' | 'top' | 'bottom' | 'shoes' | 'jewelry' | 'bag' | 'flower';

export const PET_NAMES: Record<PetType, string> = {
  dog: '小狗',
  cat: '小猫',
  fox: '小狐狸',
  turtle: '小乌龟',
  rabbit: '小兔子',
  bird: '小鸟',
  dolphin: '小海豚',
  tiger: '小老虎',
  lion: '小狮子',
  red_panda: '小熊猫',
};

export const PET_EMOJIS: Record<PetType, string> = {
  dog: '🐶',
  cat: '🐱',
  fox: '🦊',
  turtle: '🐢',
  rabbit: '🐰',
  bird: '🐦',
  dolphin: '🐬',
  tiger: '🐯',
  lion: '🦁',
  red_panda: '🐼',
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
