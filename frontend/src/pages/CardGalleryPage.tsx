import { useEffect, useState } from 'react';
import axios from '../api/client';
import { usePetStore } from '../store/petStore';
import { RARITY_LABEL, RARITY_COLOR, type PikachuCard, type Rarity } from '../data/pikachuCards';
import { CARDS_BY_TYPE, isPokemonType } from '../data/allCards';
import { PET_NAMES } from '../types/pet';

interface OwnedCard { card_id: string; count: number; fragments: number; }

const RARITY_ORDER: Rarity[] = [1, 2, 3, 4, 5];
const RARITY_BG: Record<Rarity, string> = {
  1: 'from-gray-100 to-gray-200',
  2: 'from-blue-100 to-blue-200',
  3: 'from-purple-100 to-purple-200',
  4: 'from-yellow-100 to-amber-200',
  5: 'from-pink-100 to-rose-200',
};

export default function CardGalleryPage() {
  const { activePet } = usePetStore();
  const [owned, setOwned] = useState<Map<string, OwnedCard>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PikachuCard | null>(null);

  const petType = activePet && isPokemonType(activePet.type) ? activePet.type : null;
  const cards = petType ? (CARDS_BY_TYPE[petType] ?? []) : [];
  const petName = petType ? PET_NAMES[petType as keyof typeof PET_NAMES] : '神奇宝贝';

  useEffect(() => {
    if (!petType) { setLoading(false); return; }
    setLoading(true);
    axios.get(`/cards/mine?pet_type=${petType}`).then(r => {
      const map = new Map<string, OwnedCard>();
      for (const c of r.data) map.set(c.card_id, c);
      setOwned(map);
    }).finally(() => setLoading(false));
  }, [petType]);

  const total = cards.length;
  const collected = cards.filter(c => owned.has(c.id)).length;

  if (!petType) {
    return (
      <div className="p-4 max-w-lg mx-auto pb-24 text-center">
        <div className="text-6xl mb-4 mt-20">📖</div>
        <h2 className="text-lg font-bold text-gray-600 mb-2">请先领养一只神奇宝贝</h2>
        <p className="text-sm text-gray-400">图鉴功能仅适用于皮卡丘、小火龙、小乌龟</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-yellow-500">「{petName}」图鉴</h1>
        <p className="text-sm text-gray-500 mt-1">
          已收集 <span className="font-bold text-yellow-500">{collected}</span> / {total} 张
        </p>
        <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
            style={{ width: total > 0 ? `${(collected / total) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">加载中...</div>
      ) : (
        RARITY_ORDER.map(rarity => {
          const rarityCards = cards.filter(c => c.rarity === rarity);
          if (rarityCards.length === 0) return null;
          const ownedCount = rarityCards.filter(c => owned.has(c.id)).length;
          return (
            <div key={rarity} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: RARITY_COLOR[rarity] }}>
                  {'⭐'.repeat(rarity === 5 ? 1 : rarity)}{rarity === 5 ? '👑' : ''}
                  {' '}{RARITY_LABEL[rarity]}
                </span>
                <span className="text-xs text-gray-400">{ownedCount}/{rarityCards.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {rarityCards.map(card => {
                  const o = owned.get(card.id);
                  const isOwned = !!o;
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelected(card)}
                      className={`relative flex flex-col items-center p-2 rounded-2xl border-2 transition-all active:scale-95 ${
                        isOwned
                          ? 'border-yellow-300 bg-gradient-to-br ' + RARITY_BG[rarity]
                          : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="w-20 h-20 flex items-center justify-center">
                        <img
                          src={card.image}
                          alt={card.name}
                          className={`max-w-full max-h-full object-contain ${isOwned ? '' : 'grayscale opacity-30'}`}
                        />
                      </div>
                      <span className="text-xs text-center mt-1 font-medium leading-tight"
                        style={{ color: isOwned ? RARITY_COLOR[rarity] : '#9CA3AF' }}>
                        {card.name}
                      </span>
                      {isOwned && o!.count > 1 && (
                        <span className="absolute top-1 right-1 text-xs bg-yellow-400 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {o!.count}
                        </span>
                      )}
                      {isOwned && o!.fragments > 0 && (
                        <span className="text-xs text-gray-400 mt-0.5">💎{o!.fragments}</span>
                      )}
                      {!isOwned && <span className="text-xs text-gray-300 mt-0.5">???</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* 卡片详情弹窗 */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 text-white"
              style={{ backgroundColor: RARITY_COLOR[selected.rarity] }}>
              {'⭐'.repeat(selected.rarity === 5 ? 1 : selected.rarity)}{selected.rarity === 5 ? '👑' : ''}
              {' '}{RARITY_LABEL[selected.rarity]}
            </div>
            <div className="flex justify-center mb-3">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-36 h-36 object-contain"
                style={{ filter: owned.has(selected.id) ? 'none' : 'grayscale(1) opacity(0.3)' }}
              />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{selected.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{selected.description}</p>
            {owned.has(selected.id) ? (
              <div className="text-sm text-green-500 font-medium">
                ✅ 已收集 ×{owned.get(selected.id)!.count}
                {owned.get(selected.id)!.fragments > 0 && ` · 💎${owned.get(selected.id)!.fragments}碎片`}
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                尚未获得 · 需 {selected.cost.toLocaleString()} 积分
              </div>
            )}
            <button onClick={() => setSelected(null)}
              className="mt-4 px-6 py-2 bg-gray-100 rounded-xl text-sm text-gray-600">
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
