export type PetType = 'pikachu' | 'charmander' | 'squirtle';

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
