import type { Pet } from '../../types/api';
import type { PetType } from '../../types/pet';
import { getPetBaseSvg } from './petSvgData';

interface PetCanvasProps {
  pet: Pet;
  animation?: string;
  size?: number;
}

export default function PetCanvas({ pet, animation, size = 280 }: PetCanvasProps) {
  const baseSvg = getPetBaseSvg(pet.type as PetType);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        width={size}
        height={size * 1.25}
        className={animation || 'anim-bounce'}
        style={{ maxWidth: '100%' }}
        dangerouslySetInnerHTML={{ __html: baseSvg }}
      />
    </div>
  );
}
