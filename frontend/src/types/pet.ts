export type PetType = 'pikachu' | 'charmander' | 'squirtle' | 'bulbasaur' | 'charizard' | 'meowth' | 'eevee' | 'snorlax';

export const PET_NAMES: Record<PetType, string> = {
  pikachu:   '皮卡丘',
  charmander:'小火龙',
  squirtle:  '小乌龟',
  bulbasaur: '妙蛙种子',
  charizard: '喷火龙',
  meowth:    '喵喵',
  eevee:     '伊布',
  snorlax:   '卡比兽',
};

export const PET_EMOJIS: Record<PetType, string> = {
  pikachu:   '⚡',
  charmander:'🔥',
  squirtle:  '💧',
  bulbasaur: '🌿',
  charizard: '🐉',
  meowth:    '🐱',
  eevee:     '🦊',
  snorlax:   '😴',
};
