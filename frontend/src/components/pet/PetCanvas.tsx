import type { Pet, ShopItem } from '../../types/api';
import type { PetType } from '../../types/pet';
import { getPetBaseSvg } from './petSvgData';

interface PetCanvasProps {
  pet: Pet;
  equipment?: ShopItem[];
  animation?: string;
  size?: number;
}

/**
 * 装备slot与身体层的对应关系。
 * 每个装备渲染在对应body层之后（视觉上覆盖在该部位上方）。
 *
 * 渲染顺序（从下到上）：
 *   body-tail
 *   body-feet  → shoes（鞋子）
 *   body-lower → bottom（裤子/裙子）
 *   body-upper → top（上衣）、bag（背包）
 *   body-neck  → jewelry（项链/领结）
 *   body-head  → hat（帽子）
 *   body-face  → glasses（眼镜）
 *   mood layer
 */
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
  const baseSvg = getPetBaseSvg(pet.type as PetType);

  // Parse the base SVG string into individual body layer strings
  const layerMap = new Map<string, string>();
  const layerRegex = /<g id="(body-[^"]+)">([\s\S]*?)<\/g>/g;
  let match;
  while ((match = layerRegex.exec(baseSvg)) !== null) {
    layerMap.set(match[1], match[0]);
  }

  // Map equipment by slot
  const equipBySlot = new Map<string, ShopItem>();
  equipment.forEach(item => {
    if (item.slot) equipBySlot.set(item.slot, item);
  });

  // Mood expression overlay
  const moodColor = pet.mood > 70 ? '#FFD700' : pet.mood > 40 ? '#FFA500' : '#B0C4DE';
  const moodLayer = pet.mood > 70
    ? `<g><circle cx="182" cy="248" r="7" fill="${moodColor}" opacity="0.65"/><circle cx="218" cy="248" r="7" fill="${moodColor}" opacity="0.65"/></g>`
    : pet.mood < 40
    ? `<g><path d="M178,250 Q200,242 222,250" stroke="#B0C4DE" stroke-width="2.5" fill="none"/></g>`
    : '';

  // Build final SVG content: body layers interleaved with equipment
  let svgContent = '';
  for (const layer of BODY_LAYERS) {
    // Body layer
    const bodyHtml = layerMap.get(layer.bodyId);
    if (bodyHtml) svgContent += bodyHtml + '\n';

    // Equipment layers that go on top of this body part
    for (const slot of layer.equipSlots) {
      const item = equipBySlot.get(slot);
      if (item?.svg_data) {
        svgContent += `<g id="equip-${slot}">${item.svg_data}</g>\n`;
      }
    }
  }

  // Mood overlay at the very top
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
