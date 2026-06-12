import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '../store/petStore';
import { useAuthStore } from '../store/authStore';
import { petApi } from '../api/petApi';
import client from '../api/client';
import ThemePicker from '../components/ui/ThemePicker';
import type { Pet } from '../types/api';
import { PET_NAMES, type PetType } from '../types/pet';
import { CARDS_BY_TYPE, isPokemonType } from '../data/allCards';
import { RARITY_LABEL, RARITY_COLOR, type Rarity } from '../data/pikachuCards';

const POKEMON_ARTWORK: Record<string, string> = {
  pikachu: '/pikachu/other/official-artwork/25.png',
  charmander: '/charmander/other/official-artwork/4.png',
  squirtle: '/squirtle/other/official-artwork/7.png',
};

const POKEMON_THEME: Record<string, string> = {
  pikachu: 'from-yellow-100 to-orange-100',
  charmander: 'from-orange-100 to-red-100',
  squirtle: 'from-blue-100 to-cyan-100',
};

type PetState = 'sleeping' | 'active' | 'happy';
const MID_ANIMS = ['anim-walk', 'anim-read', 'anim-jump', 'anim-hum', 'anim-play'] as const;
const MID_LABELS: Record<string, string> = {
  'anim-walk': '正在散步...',
  'anim-read': '坐着看书...',
  'anim-jump': '蹦蹦跳跳~',
  'anim-hum':  '哼着小曲♪',
  'anim-play': '开心玩耍！',
};
const HAPPY_ANIMS = ['anim-sing', 'anim-dance'] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMoodState(mood: number): PetState {
  if (mood < 20) return 'sleeping';
  if (mood > 80) return 'happy';
  return 'active';
}

interface OwnedCard { card_id: string; count: number; fragments: number; }

export default function HomePage() {
  const { activePet, pets, setActivePet, updatePet } = usePetStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [petDetail, setPetDetail] = useState<Pet | null>(null);
  const [animation, setAnimation] = useState<string>('anim-bounce');
  const [petState, setPetState] = useState<PetState>('active');
  const [statusLabel, setStatusLabel] = useState<string>('');
  const [ownedCards, setOwnedCards] = useState<OwnedCard[]>([]);
  const [showCardPicker, setShowCardPicker] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const animInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const manualOverride = useRef(false);
  const animQueue = useRef<string[]>([]);
  const animIdx = useRef(0);

  const refreshPet = useCallback((id: number) => {
    petApi.get(id).then(r => {
      setPetDetail(r.data);
      updatePet(r.data);
    });
  }, [updatePet]);

  useEffect(() => {
    if (!activePet) return;
    refreshPet(activePet.id);
  }, [activePet?.id]);

  useEffect(() => {
    if (!activePet) return;
    const petType = isPokemonType(activePet.type) ? activePet.type : null;
    if (!petType) { setOwnedCards([]); return; }
    client.get(`/cards/mine?pet_type=${petType}`).then(r => setOwnedCards(r.data)).catch(() => {});
  }, [activePet?.id, activePet?.type]);

  // Mood-driven animation state machine
  useEffect(() => {
    const mood = petDetail?.mood ?? activePet?.mood ?? 100;
    const state = getMoodState(mood);
    setPetState(state);
    clearInterval(animInterval.current);

    if (state === 'sleeping') {
      setAnimation('anim-sleep');
      setStatusLabel('💤 深度睡眠中...');
      return;
    }
    if (state === 'happy') {
      animQueue.current = shuffle([...HAPPY_ANIMS]);
      animIdx.current = 0;
      setAnimation(animQueue.current[0]);
      setStatusLabel('🌟 心情超好，想跟你互动！');
      animInterval.current = setInterval(() => {
        if (manualOverride.current) return;
        animIdx.current = (animIdx.current + 1) % animQueue.current.length;
        setAnimation(animQueue.current[animIdx.current]);
      }, 5000);
      return;
    }
    animQueue.current = shuffle([...MID_ANIMS]);
    animIdx.current = 0;
    const first = animQueue.current[0];
    setAnimation(first);
    setStatusLabel(MID_LABELS[first] || '');
    animInterval.current = setInterval(() => {
      if (manualOverride.current) return;
      animIdx.current = (animIdx.current + 1) % animQueue.current.length;
      const next = animQueue.current[animIdx.current];
      setAnimation(next);
      setStatusLabel(MID_LABELS[next] || '');
    }, 4000);
    return () => clearInterval(animInterval.current);
  }, [petDetail?.mood, activePet?.mood]);

  if (!activePet && pets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="text-6xl">🐣</div>
        <p className="text-gray-500">还没有宠物，快去创建一个吧！</p>
        <button
          onClick={() => navigate('/create-pet')}
          className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-2xl shadow-md"
        >
          创建宠物 +
        </button>
      </div>
    );
  }

  const pet = petDetail || activePet;
  if (!pet) return null;

  const isPokemon = isPokemonType(pet.type);
  const pokemonCards = isPokemon ? (CARDS_BY_TYPE[pet.type] ?? []) : [];
  const ownedSet = new Set(ownedCards.map(c => c.card_id));
  const collected = ownedCards.length;
  const total = pokemonCards.length;

  // Best card: use display_card_id if set, otherwise highest rarity owned
  const bestCard = isPokemon
    ? (pet.display_card_id
      ? pokemonCards.find(c => c.id === pet.display_card_id) ?? null
      : [...pokemonCards].reverse().find(c => ownedSet.has(c.id)) ?? null)
    : null;

  // Recent cards (last 3 obtained)
  const recentCards = isPokemon
    ? ownedCards
        .slice(-3)
        .reverse()
        .map(o => pokemonCards.find(c => c.id === o.card_id))
        .filter(Boolean) as typeof pokemonCards
    : [];

  const moodPercent = pet.mood;
  const moodColor = moodPercent > 70 ? 'bg-green-400' : moodPercent > 40 ? 'bg-yellow-400' : 'bg-red-400';

  const handleSelectCard = async (cardId: string | null) => {
    if (!pet) return;
    try {
      await petApi.setDisplayCard(pet.id, cardId);
      const updated = { ...pet, display_card_id: cardId };
      updatePet(updated);
      setPetDetail(updated);
    } catch {}
    setShowCardPicker(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !pet) return;
    try {
      const res = await petApi.uploadAvatar(pet.id, e.target.files[0]);
      const updated = { ...pet, avatar_url: res.data.avatar_url } as Pet;
      updatePet(updated);
      setPetDetail(updated);
    } catch {}
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-28">

      {/* Pet switcher */}
      {pets.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {pets.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePet(p)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                activePet?.id === p.id
                  ? 'bg-pink-400 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-pink-100'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <img src={POKEMON_ARTWORK[p.type]} style={{ width: 24, height: 24, objectFit: 'contain' }} draggable={false} />
              </div>
              <span>{p.name}</span>
            </button>
          ))}
          <button
            onClick={() => navigate('/create-pet')}
            className="flex-shrink-0 px-3 py-2 rounded-full text-sm text-pink-400 border border-dashed border-pink-300"
          >
            + 添加
          </button>
        </div>
      )}

      {/* Main pet card */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-4">
        <div className={`bg-gradient-to-br ${POKEMON_THEME[pet.type] ?? 'from-pink-100 to-purple-100'} p-5 flex flex-col items-center relative`}>
          {petState === 'sleeping' && (
            <div className="absolute top-4 right-6 flex flex-col items-end gap-0.5 pointer-events-none">
              {(['z', 'z', 'Z'] as const).map((c, i) => (
                <span key={i} className="zzz-anim text-blue-300 font-bold"
                  style={{ fontSize: 12 + i * 3, animationDelay: `${i * 0.7}s` }}>
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Avatar */}
          <div className="relative mb-3">
            {pet.avatar_url ? (
              <img src={pet.avatar_url} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" alt="头像" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center border-2 border-white shadow-md">
                <span className="text-2xl">🐾</span>
              </div>
            )}
            <button onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-pink-400 text-white rounded-full text-xs flex items-center justify-center shadow">
              📷
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          <h2 className="text-xl font-bold text-gray-700">{pet.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{PET_NAMES[pet.type as PetType]} · Lv.{pet.level}</p>

          {/* Pet figure — use best owned card image for pikachu */}
          {isPokemon && bestCard ? (
            <div
              className={`relative inline-flex items-center justify-center ${animation || 'anim-bounce'}`}
              style={{ width: 200, height: 200 }}
            >
              <img src={bestCard.image} alt={bestCard.name}
                style={{ width: 200, height: 200, objectFit: 'contain' }} draggable={false} />
            </div>
          ) : (
            <div className={`relative inline-flex items-center justify-center ${animation || 'anim-bounce'}`}
              style={{ width: 200, height: 200 }}>
              <img src={POKEMON_ARTWORK[pet.type]} alt={pet.name}
                style={{ width: 200, height: 200, objectFit: 'contain' }} draggable={false} />
            </div>
          )}

          {/* Mood bar */}
          <div className="w-full mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>😊 心情</span>
              <span>{moodPercent}/100</span>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div className={`h-full ${moodColor} rounded-full transition-all`} style={{ width: `${moodPercent}%` }} />
            </div>
            {statusLabel && <p className="text-xs text-gray-400 mt-1.5 text-center">{statusLabel}</p>}
          </div>
        </div>

        {/* Pikachu card display info */}
        {isPokemon && bestCard && (
          <div className="px-4 py-3 flex items-center gap-3 border-t border-gray-50">
            <img src={bestCard.image} alt={bestCard.name} className="w-10 h-10 object-contain flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: RARITY_COLOR[bestCard.rarity as Rarity] }}>
                  {RARITY_LABEL[bestCard.rarity as Rarity]}
                </span>
                <span className="text-sm font-medium text-gray-700 truncate">{bestCard.name}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">当前展示形态</p>
            </div>
            <button onClick={() => setShowCardPicker(true)}
              className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors">
              切换
            </button>
          </div>
        )}

        {/* No card yet for pikachu */}
        {isPokemon && !bestCard && (
          <div className="px-4 py-4 text-center border-t border-gray-50">
            <p className="text-sm text-gray-400 mb-2">还没有皮卡丘卡片，去抽一张吧！</p>
            <button onClick={() => navigate('/draw')}
              className="px-5 py-2 bg-yellow-400 text-white font-bold rounded-xl text-sm">
              ⚡ 去抽卡
            </button>
          </div>
        )}
      </div>

      {/* Card collection progress — only for pikachu */}
      {isPokemon && (
        <div className="bg-white rounded-3xl shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-700">收藏图鉴</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                已收集 <span className="font-bold text-yellow-500">{collected}</span> / {total} 张
              </p>
            </div>
            <button onClick={() => navigate('/cards')}
              className="text-xs text-yellow-500 font-medium">
              查看全部 →
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all"
              style={{ width: `${(collected / total) * 100}%` }} />
          </div>
          {/* Recent cards */}
          {recentCards.length > 0 ? (
            <div className="flex gap-2">
              {recentCards.map(card => (
                <div key={card.id}
                  className="flex-1 flex flex-col items-center p-2 rounded-2xl border border-gray-100 bg-gray-50">
                  <img src={card.image} alt={card.name} className="w-12 h-12 object-contain" />
                  <span className="text-xs text-center text-gray-500 mt-1 leading-tight">{card.name}</span>
                  <span className="text-xs font-bold mt-0.5"
                    style={{ color: RARITY_COLOR[card.rarity as Rarity] }}>
                    {RARITY_LABEL[card.rarity as Rarity]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-2">抽卡后，最近获得的卡片会在这里展示</p>
          )}
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { icon: '✅', label: '打卡', to: '/checkin' },
          { icon: '🎰', label: '抽卡', to: '/draw' },
          { icon: '📖', label: '图鉴', to: '/cards' },
          { icon: '🛒', label: '商店', to: '/shop' },
        ].map(action => (
          <button key={action.to} onClick={() => navigate(action.to)}
            className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95">
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs text-gray-600 mt-1">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Points banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-white/80 text-xs">当前积分</p>
          <p className="text-white text-2xl font-bold">{user?.points?.toLocaleString() ?? 0}</p>
        </div>
        <div className="text-right">
          <p className="text-white/80 text-xs">每日打卡可获得</p>
          <p className="text-white font-bold">+100 积分</p>
        </div>
        <button onClick={() => navigate('/checkin')}
          className="bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all">
          去打卡
        </button>
      </div>

      {/* Theme picker */}
      <ThemePicker />

      {/* Card picker modal */}
      {showCardPicker && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowCardPicker(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[75vh] flex flex-col"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-700">选择展示形态</h3>
              <button onClick={() => setShowCardPicker(false)} className="text-gray-400 text-xl w-8 h-8 flex items-center justify-center">×</button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              {ownedCards.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-4xl mb-2">🃏</div>
                  <p className="text-sm">还没有收集到卡片</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {pokemonCards.filter(c => ownedSet.has(c.id)).map(card => {
                    const isSelected = pet.display_card_id === card.id ||
                      (!pet.display_card_id && bestCard?.id === card.id);
                    return (
                      <button key={card.id} onClick={() => handleSelectCard(card.id)}
                        className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all active:scale-95 ${
                          isSelected
                            ? 'border-yellow-400 bg-yellow-50'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}>
                        <img src={card.image} alt={card.name} className="w-16 h-16 object-contain" />
                        <span className="text-xs text-center font-medium text-gray-700 mt-1 leading-tight">{card.name}</span>
                        <span className="text-xs mt-0.5 font-bold"
                          style={{ color: RARITY_COLOR[card.rarity as Rarity] }}>
                          {RARITY_LABEL[card.rarity as Rarity]}
                        </span>
                        {isSelected && (
                          <span className="text-xs text-yellow-500 mt-0.5">✓ 当前</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
