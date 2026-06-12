import { useState } from 'react';
import axios from '../api/client';
import { useAuthStore } from '../store/authStore';
import { usePetStore } from '../store/petStore';
import { RARITY_LABEL, RARITY_COLOR, RARITY_COST, type Rarity } from '../data/pikachuCards';
import { CARDS_BY_TYPE, isPokemonType } from '../data/allCards';
import { PET_NAMES } from '../types/pet';

const RARITY_ORDER: Rarity[] = [1, 2, 3, 4, 5];
const RARITY_EMOJI: Record<Rarity, string> = { 1: '⭐', 2: '⭐⭐', 3: '⭐⭐⭐', 4: '✨', 5: '👑' };

const RARITY_DESC: Record<string, Record<Rarity, string>> = {
  default: {
    1: '各世代像素图 · 15种',
    2: '动态 GIF · 4种',
    3: 'HOME 3D高清 · 2种',
    4: '官方高清插图 · 3种',
    5: 'Dream World · 1种',
  },
  pikachu: {
    1: '各世代像素图 · 15种',
    2: '动态 GIF · 6种',
    3: 'HOME 3D高清 · 4种',
    4: '官方高清插图 · 3种',
    5: 'Dream World · 1种',
  },
};

interface DrawResult {
  card_id: string;
  rarity: number;
  is_new: boolean;
  fragments_gained: number;
  remaining_points: number;
  mood_bonus?: boolean;
}

export default function DrawPage() {
  const { user, updateUser } = useAuthStore();
  const { activePet } = usePetStore();
  const [drawing, setDrawing] = useState(false);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [showAnim, setShowAnim] = useState(false);

  const petType = activePet && isPokemonType(activePet.type) ? activePet.type : null;
  const cards = petType ? (CARDS_BY_TYPE[petType] ?? []) : [];
  const petName = petType ? PET_NAMES[petType as keyof typeof PET_NAMES] : null;
  const rarityDesc = RARITY_DESC[petType ?? 'default'] ?? RARITY_DESC.default;

  const handleDraw = async (rarity: Rarity) => {
    if (drawing || !petType) return;
    const cost = RARITY_COST[rarity];
    if ((user?.points ?? 0) < cost) return;

    setDrawing(true);
    setResult(null);
    setShowAnim(true);

    try {
      const res = await axios.post('/cards/draw', { rarity, pet_type: petType });
      const data: DrawResult = res.data;
      await new Promise(r => setTimeout(r, 1200));
      setResult(data);
      setShowAnim(false);
      if (user) updateUser({ ...user, points: data.remaining_points });
    } catch (e: any) {
      setShowAnim(false);
      alert(e.response?.data?.error || '抽卡失败');
    } finally {
      setDrawing(false);
    }
  };

  const card = result ? cards.find(c => c.id === result.card_id) : null;

  if (!petType) {
    return (
      <div className="p-4 max-w-lg mx-auto pb-24 text-center">
        <div className="text-6xl mb-4 mt-20">🎰</div>
        <h2 className="text-lg font-bold text-gray-600 mb-2">请先领养一只神奇宝贝</h2>
        <p className="text-sm text-gray-400">抽卡系统仅适用于皮卡丘、小火龙、小乌龟</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-500">为「{petName}」抽卡</h1>
        <div className="mt-2 inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full">
          <span className="text-yellow-500">⭐</span>
          <span className="font-bold text-gray-700">{user?.points?.toLocaleString() ?? 0}</span>
          <span className="text-gray-400 text-sm">积分</span>
        </div>
      </div>

      {/* 抽卡动画覆盖层 */}
      {showAnim && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
          <div className="text-8xl animate-spin" style={{ animationDuration: '0.6s' }}>⚡</div>
          <p className="text-white text-lg mt-4 font-bold">正在抽卡...</p>
        </div>
      )}

      {/* 抽卡结果 */}
      {result && card && !showAnim && (
        <div className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-5 text-center border-2 border-yellow-200 shadow-lg">
          <p className="text-sm text-gray-500 mb-1">
            {result.mood_bonus ? '🌟 心情加成！稀有度提升！' : result.is_new ? '🎉 新卡！' : '已有重复 · 获得 💎5 碎片'}
          </p>
          <div className="flex justify-center my-3">
            <img src={card.image} alt={card.name} className="w-32 h-32 object-contain drop-shadow-lg" />
          </div>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-2"
            style={{ backgroundColor: RARITY_COLOR[card.rarity as Rarity] }}>
            {RARITY_EMOJI[card.rarity as Rarity]} {RARITY_LABEL[card.rarity as Rarity]}
          </span>
          <h3 className="font-bold text-lg text-gray-800">{card.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          <button onClick={() => setResult(null)}
            className="mt-4 px-6 py-2 bg-yellow-400 text-white font-bold rounded-xl text-sm">
            继续抽卡
          </button>
        </div>
      )}

      {/* 各稀有度抽卡入口 */}
      <div className="flex flex-col gap-3">
        {RARITY_ORDER.map(rarity => {
          const cost = RARITY_COST[rarity];
          const canAfford = (user?.points ?? 0) >= cost;
          const sample = cards.find(c => c.rarity === rarity);
          return (
            <button
              key={rarity}
              onClick={() => handleDraw(rarity)}
              disabled={!canAfford || drawing}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-95 text-left ${
                canAfford
                  ? 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
                  : 'bg-gray-50 border-gray-100 opacity-50'
              }`}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ background: `${RARITY_COLOR[rarity]}20` }}>
                {sample && <img src={sample.image} alt="" className="w-14 h-14 object-contain" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold" style={{ color: RARITY_COLOR[rarity] }}>
                    {RARITY_EMOJI[rarity]} {RARITY_LABEL[rarity]}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{rarityDesc[rarity]}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-gray-700">{cost.toLocaleString()}</div>
                <div className="text-xs text-gray-400">积分</div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">重复卡片将转化为 💎 碎片</p>
    </div>
  );
}
