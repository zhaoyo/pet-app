import { PIKACHU_CARDS } from './pikachuCards';
import { CHARMANDER_CARDS } from './charmanderCards';
import { SQUIRTLE_CARDS } from './squirtleCards';
import { BULBASAUR_CARDS } from './bulbasaurCards';
import { CHARIZARD_CARDS } from './charizardCards';
import { MEOWTH_CARDS } from './meowthCards';
import { EEVEE_CARDS } from './eeveeCards';
import { SNORLAX_CARDS } from './snorlaxCards';
import type { PokemonCard } from './charmanderCards';

export type { PokemonCard };

export const CARDS_BY_TYPE: Record<string, PokemonCard[]> = {
  pikachu:   PIKACHU_CARDS,
  charmander:CHARMANDER_CARDS,
  squirtle:  SQUIRTLE_CARDS,
  bulbasaur: BULBASAUR_CARDS,
  charizard: CHARIZARD_CARDS,
  meowth:    MEOWTH_CARDS,
  eevee:     EEVEE_CARDS,
  snorlax:   SNORLAX_CARDS,
};

export const POKEMON_TYPES = ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'charizard', 'meowth', 'eevee', 'snorlax'] as const;
export type PokemonPetType = typeof POKEMON_TYPES[number];

export function isPokemonType(type: string): type is PokemonPetType {
  return POKEMON_TYPES.includes(type as PokemonPetType);
}
