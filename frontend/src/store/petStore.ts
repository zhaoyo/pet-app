import { create } from 'zustand';
import type { Pet } from '../types/api';

interface PetState {
  activePet: Pet | null;
  pets: Pet[];
  setActivePet: (pet: Pet | null) => void;
  setPets: (pets: Pet[]) => void;
  updatePet: (pet: Pet) => void;
}

export const usePetStore = create<PetState>((set) => ({
  activePet: null,
  pets: [],
  setActivePet: (pet) => set({ activePet: pet }),
  setPets: (pets) => {
    set({ pets });
    if (pets.length > 0) {
      set((state) => ({
        activePet: state.activePet
          ? pets.find(p => p.id === state.activePet!.id) || pets[0]
          : pets[0],
      }));
    }
  },
  updatePet: (pet) =>
    set((state) => ({
      pets: state.pets.map(p => p.id === pet.id ? pet : p),
      activePet: state.activePet?.id === pet.id ? pet : state.activePet,
    })),
}));
