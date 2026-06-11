import { PIKACHU_CARDS } from './pikachuCards';
import { CHARMANDER_CARDS } from './charmanderCards';
import { SQUIRTLE_CARDS } from './squirtleCards';
import type { PokemonCard } from './charmanderCards';

export type { PokemonCard };

export const CARDS_BY_TYPE: Record<string, PokemonCard[]> = {
  pikachu: PIKACHU_CARDS,
  charmander: CHARMANDER_CARDS,
  squirtle: SQUIRTLE_CARDS,
};

export const POKEMON_TYPES = ['pikachu', 'charmander', 'squirtle'] as const;
export type PokemonPetType = typeof POKEMON_TYPES[number];

export function isPokemonType(type: string): type is PokemonPetType {
  return POKEMON_TYPES.includes(type as PokemonPetType);
}
