import type { Pet, ShopItem } from '../../types/api';
import type { PetType } from '../../types/pet';
import { getPetBaseSvg } from './petSvgData';

interface PetCanvasProps {
  pet: Pet;
  equipment?: ShopItem[];
  animation?: string;
  size?: number;
}

const PIKACHU_URL = '/pikachu/other/dream-world/25.svg';

const BODY_LAYERS = [
  { bodyId: 'body-tail',  equipSlots: [] },
  { bodyId: 'body-feet',  equipSlots: ['shoes'] },
  { bodyId: 'body-lower', equipSlots: ['bottom'] },
  { bodyId: 'body-upper', equipSlots: ['top', 'bag'] },
  { bodyId: 'body-neck',  equipSlots: ['jewelry'] },
  { bodyId: 'body-head',  equipSlots: ['hat', 'flower'] },
  { bodyId: 'body-face',  equipSlots: ['glasses'] },
] as const;

export default function PetCanvas({ pet, equipment = [], animation, size = 280 }: PetCanvasProps) {
  if (pet.type === 'pikachu') {
    const equipSvg = equipment
      .filter(item => item.svg_data)
      .map(item => `<g id="equip-${item.slot}">${item.svg_data}</g>`)
      .join('\n');

    return (
      <div
        className={`relative inline-flex items-center justify-center ${animation || 'anim-bounce'}`}
        style={{ width: size, height: size * 1.25 }}
      >
        <img
          src={PIKACHU_URL}
          alt="皮卡丘"
          style={{ width: size, height: size, objectFit: 'contain' }}
          draggable={false}
        />
        {equipSvg && (
          <svg
            viewBox="0 0 400 500"
            width={size}
            height={size * 1.25}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            dangerouslySetInnerHTML={{ __html: equipSvg }}
          />
        )}
      </div>
    );
  }

  const baseSvg = getPetBaseSvg(pet.type as PetType);

  const layerMap = new Map<string, string>();
  const layerRegex = /<g id="(body-[^"]+)">([\s\S]*?)<\/g>/g;
  let match;
  while ((match = layerRegex.exec(baseSvg)) !== null) {
    layerMap.set(match[1], match[0]);
  }

  const equipBySlot = new Map<string, ShopItem>();
  equipment.forEach(item => {
    if (item.slot) equipBySlot.set(item.slot, item);
  });

  const moodColor = pet.mood > 70 ? '#FFD700' : pet.mood > 40 ? '#FFA500' : '#B0C4DE';
  const moodLayer = pet.mood > 70
    ? `<g><circle cx="182" cy="248" r="7" fill="${moodColor}" opacity="0.65"/><circle cx="218" cy="248" r="7" fill="${moodColor}" opacity="0.65"/></g>`
    : pet.mood < 40
    ? `<g><path d="M178,250 Q200,242 222,250" stroke="#B0C4DE" stroke-width="2.5" fill="none"/></g>`
    : '';

  let svgContent = '';
  for (const layer of BODY_LAYERS) {
    const bodyHtml = layerMap.get(layer.bodyId);
    if (bodyHtml) svgContent += bodyHtml + '\n';

    for (const slot of layer.equipSlots) {
      const item = equipBySlot.get(slot);
      if (item?.svg_data) {
        svgContent += `<g id="equip-${slot}">${item.svg_data}</g>\n`;
      }
    }
  }

  svgContent += moodLayer;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        width={size}
        height={size * 1.25}
        className={animation || 'anim-bounce'}
        style={{ maxWidth: '100%' }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
