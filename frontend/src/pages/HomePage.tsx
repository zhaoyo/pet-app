import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '../store/petStore';
import { useAuthStore } from '../store/authStore';
import { petApi } from '../api/petApi';
import { inventoryApi } from '../api/shopApi';
import PetCanvas from '../components/pet/PetCanvas';
import { getPetBaseSvg } from '../components/pet/petSvgData';
import ThemePicker from '../components/ui/ThemePicker';
import type { Pet, ShopItem } from '../types/api';
import { PET_NAMES, type PetType } from '../types/pet';

const SLOT_LABELS: Record<string, string> = {
  hat: '帽子', glasses: '眼镜', top: '上衣', bottom: '裤子',
  shoes: '鞋子', jewelry: '饰品', bag: '包包', flower: '鲜花',
};
const SLOT_ICONS: Record<string, string> = {
  hat: '🎩', glasses: '👓', top: '👕', bottom: '👖',
  shoes: '👟', jewelry: '💍', bag: '👜', flower: '🌸',
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

export default function HomePage() {
  const { activePet, pets, setActivePet, updatePet } = usePetStore();
  const { user: _user } = useAuthStore();
  const navigate = useNavigate();
  const [petDetail, setPetDetail] = useState<Pet | null>(null);
  const [animation, setAnimation] = useState<string>('anim-bounce');
  const [petState, setPetState] = useState<PetState>('active');
  const [statusLabel, setStatusLabel] = useState<string>('');
  const [inventory, setInventory] = useState<ShopItem[]>([]);
  const [pickingSlot, setPickingSlot] = useState<string | null>(null);
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
    inventoryApi.getAll().then(r => setInventory(r.data));
  }, [activePet?.id]);

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

    // active: cycle through 5 middle animations
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
  const equipment: ShopItem[] = (pet as any)?.equipment || [];

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !pet) return;
    try {
      const res = await petApi.uploadAvatar(pet.id, e.target.files[0]);
      const updated = { ...pet, avatar_url: res.data.avatar_url } as Pet;
      updatePet(updated);
      setPetDetail(updated);
    } catch {}
  };

  const handlePlayAnimation = (anim: string) => {
    manualOverride.current = true;
    setAnimation(anim);
    setTimeout(() => {
      manualOverride.current = false;
    }, 3000);
  };

  const handleSlotClick = async (slot: string) => {
    if (!pet) return;
    const equipped = equipment.find(e => e.slot === slot);
    if (equipped) {
      await petApi.equip(pet.id, slot, null);
      refreshPet(pet.id);
    } else {
      setPickingSlot(slot);
    }
  };

  const handleEquipItem = async (item: ShopItem) => {
    if (!pet || !pickingSlot) return;
    await petApi.equip(pet.id, pickingSlot, item.id);
    setPickingSlot(null);
    refreshPet(pet.id);
  };

  if (!pet) return null;

  const moodPercent = pet.mood;
  const moodColor = moodPercent > 70 ? 'bg-green-400' : moodPercent > 40 ? 'bg-yellow-400' : 'bg-red-400';

  const slotInventory = pickingSlot
    ? inventory.filter(i => i.slot === pickingSlot)
    : [];

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Pet switcher */}
      {pets.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
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
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white/50 flex items-center justify-center flex-shrink-0">
                <svg viewBox="100 110 200 160" width={24} height={24} dangerouslySetInnerHTML={{ __html: getPetBaseSvg(p.type as PetType) }} />
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

      {/* Pet card */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-4">
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 flex flex-col items-center relative">
          {/* ZZZ overlay for sleeping state */}
          {petState === 'sleeping' && (
            <div className="absolute top-4 right-6 flex flex-col items-end gap-0.5 pointer-events-none">
              {(['z', 'z', 'Z'] as const).map((c, i) => (
                <span
                  key={i}
                  className="zzz-anim text-blue-300 font-bold"
                  style={{ fontSize: 12 + i * 3, animationDelay: `${i * 0.7}s` }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Avatar */}
          <div className="relative mb-2">
            {pet.avatar_url ? (
              <img src={pet.avatar_url} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" alt="头像" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-50 to-pink-100 flex items-center justify-center border-2 border-white shadow overflow-hidden">
                <svg viewBox="100 110 200 160" width={64} height={64} dangerouslySetInnerHTML={{ __html: getPetBaseSvg(pet.type as PetType) }} />
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-400 text-white rounded-full text-xs flex items-center justify-center shadow"
            >
              📷
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          <h2 className="text-xl font-bold text-gray-700">{pet.name}</h2>
          <p className="text-sm text-gray-500">{PET_NAMES[pet.type as PetType]} · Lv.{pet.level}</p>

          {/* Pet SVG with equipment */}
          <PetCanvas pet={pet} equipment={equipment} animation={animation} size={220} />

          {/* Mood bar */}
          <div className="w-full mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>😊 心情</span>
              <span>{moodPercent}/100</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${moodColor} rounded-full transition-all`} style={{ width: `${moodPercent}%` }} />
            </div>
            {statusLabel && (
              <p className="text-xs text-gray-400 mt-1 text-center">{statusLabel}</p>
            )}
          </div>
        </div>

        {/* Equipment slots */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-600">装备槽位</h3>
            <span className="text-xs text-gray-400">点击槽位可装备/卸下</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(SLOT_LABELS).map(([slot, label]) => {
              const item = equipment.find(e => e.slot === slot);
              return (
                <button
                  key={slot}
                  onClick={() => handleSlotClick(slot)}
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all active:scale-95 ${
                    item
                      ? 'border-pink-300 bg-pink-50'
                      : 'border-dashed border-gray-200 bg-gray-50 hover:border-pink-200'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    {item?.thumbnail ? (
                      <img src={item.thumbnail} className="w-10 h-10 object-contain" alt={item.name} />
                    ) : (
                      <span className="text-xl text-gray-300">{SLOT_ICONS[slot]}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-0.5 truncate w-full text-center">
                    {item ? item.name : label}
                  </span>
                  {item && (
                    <span className="text-xs text-red-300 mt-0.5">点击卸下</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Learned skills */}
        {(pet as any).courses?.length > 0 && (
          <div className="px-4 pb-4">
            <h3 className="text-sm font-bold text-gray-600 mb-2">已学技能</h3>
            <div className="flex flex-wrap gap-2">
              {(pet as any).courses.map((course: any) => (
                <button
                  key={course.id}
                  onClick={() => handlePlayAnimation(course.animation_key || 'anim-dance')}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm border border-purple-200 hover:bg-purple-100"
                >
                  {course.icon} {course.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: '✅', label: '打卡', to: '/checkin' },
          { icon: '🛒', label: '商店', to: '/shop' },
          { icon: '🎓', label: '学校', to: '/school' },
          { icon: '🏡', label: '房间', to: '/room' },
        ].map(action => (
          <button
            key={action.to}
            onClick={() => navigate(action.to)}
            className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs text-gray-600 mt-1">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Theme picker */}
      <div className="mt-3">
        <ThemePicker />
      </div>

      {/* Slot picker modal */}
      {pickingSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-700">
                {SLOT_ICONS[pickingSlot]} 选择{SLOT_LABELS[pickingSlot]}
              </h3>
              <button onClick={() => setPickingSlot(null)} className="text-gray-400 text-xl">×</button>
            </div>
            {slotInventory.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="text-4xl mb-2">🎒</div>
                <p className="text-sm">背包里没有{SLOT_LABELS[pickingSlot]}</p>
                <button
                  onClick={() => { setPickingSlot(null); navigate('/shop'); }}
                  className="mt-3 px-4 py-2 bg-pink-400 text-white text-sm rounded-xl"
                >
                  去商店购买
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 p-4">
                {slotInventory.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleEquipItem(item)}
                    className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl hover:bg-pink-50 hover:border-pink-200 border border-transparent active:scale-95 transition-all"
                  >
                    {item.thumbnail ? (
                      <img src={item.thumbnail} className="w-12 h-12 object-contain mb-1" alt={item.name} />
                    ) : (
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-1">
                        {SLOT_ICONS[pickingSlot]}
                      </div>
                    )}
                    <span className="text-xs text-gray-600 text-center">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
