import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { petApi } from '../api/petApi';
import { eggApi } from '../api/eggApi';
import { usePetStore } from '../store/petStore';
import { useAuthStore } from '../store/authStore';
import { PET_NAMES, type PetType } from '../types/pet';

const POKEMON_ARTWORK: Record<PetType, string> = {
  pikachu: '/pikachu/other/official-artwork/25.png',
  charmander: '/charmander/other/official-artwork/4.png',
  squirtle: '/squirtle/other/official-artwork/7.png',
};

const PET_TYPES = Object.keys(PET_NAMES) as PetType[];

export default function CreatePetPage() {
  const [selectedType, setSelectedType] = useState<PetType | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [buyingEgg, setBuyingEgg] = useState(false);
  const { setPets, pets } = usePetStore();
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const needsEgg = pets.length >= 3;
  const hasEgg = (user?.pet_eggs ?? 0) > 0;
  const canAffordEgg = (user?.points ?? 0) >= 500;

  const handleBuyEgg = async () => {
    setBuyingEgg(true);
    setError('');
    try {
      const res = await eggApi.buy();
      if (user) updateUser({ ...user, pet_eggs: res.data.pet_eggs, points: res.data.points });
    } catch (err: any) {
      setError(err.response?.data?.error || '购买失败');
    } finally {
      setBuyingEgg(false);
    }
  };

  const handleCreate = async () => {
    if (!selectedType || !name.trim()) {
      setError('请选择宠物类型并填写名字');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await petApi.create(name.trim(), selectedType);
      const newPets = [...pets, res.data];
      setPets(newPets);
      if (needsEgg && user) {
        updateUser({ ...user, pet_eggs: Math.max(0, (user.pet_eggs ?? 1) - 1) });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">选择你的宝可梦 🎮</h1>
        <p className="text-gray-500 text-sm mt-1">选择你的起始精灵吧！</p>
      </div>

      {/* 宠物蛋状态提示 */}
      {needsEgg && (
        <div className={`rounded-2xl p-4 mb-5 border-2 ${
          hasEgg ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-700">
                🥚 宠物蛋 × {user?.pet_eggs ?? 0}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {hasEgg
                  ? '领养后将消耗 1 个宠物蛋'
                  : '你已有 3 只宠物，领养更多需要宠物蛋'}
              </p>
            </div>
            {!hasEgg && (
              <button
                onClick={handleBuyEgg}
                disabled={buyingEgg || !canAffordEgg}
                className="px-4 py-2 bg-orange-400 text-white text-sm font-bold rounded-xl disabled:opacity-50 flex-shrink-0 ml-3"
              >
                {buyingEgg ? '购买中...' : '购买 ⭐500'}
              </button>
            )}
          </div>
          {!hasEgg && !canAffordEgg && (
            <p className="text-xs text-red-400 mt-2">
              积分不足（当前 {user?.points ?? 0} 积分，需要 500）
            </p>
          )}
        </div>
      )}

      {/* Pet type grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {PET_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            disabled={needsEgg && !hasEgg}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              selectedType === type
                ? 'border-pink-400 bg-pink-50 scale-105 shadow-md'
                : 'border-gray-100 bg-white hover:border-pink-200'
            } disabled:opacity-40`}
          >
            <img
              src={POKEMON_ARTWORK[type]}
              alt={PET_NAMES[type]}
              style={{ width: 80, height: 80, objectFit: 'contain' }}
              draggable={false}
            />
            <span className="text-sm font-medium text-gray-700 mt-2">{PET_NAMES[type]}</span>
          </button>
        ))}
      </div>

      {/* Name input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          给宝可梦起个名字 ✏️
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
          placeholder={selectedType ? `我的${PET_NAMES[selectedType]}...` : '先选择宝可梦'}
          maxLength={20}
          disabled={needsEgg && !hasEgg}
          className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50 disabled:opacity-40"
        />
      </div>

      {/* Preview */}
      {selectedType && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mb-4 text-center">
          <div className="flex justify-center mb-2">
            <img
              src={POKEMON_ARTWORK[selectedType]}
              alt={PET_NAMES[selectedType]}
              style={{ width: 100, height: 100, objectFit: 'contain' }}
              draggable={false}
            />
          </div>
          <p className="text-gray-600 text-sm font-medium">
            {name || '(还没有名字)'} · {PET_NAMES[selectedType]}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

      <button
        onClick={handleCreate}
        disabled={loading || !selectedType || !name.trim() || (needsEgg && !hasEgg)}
        className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-40"
      >
        {loading ? '创建中...' : needsEgg ? '消耗宠物蛋领养 🥚' : '领养宝可梦 🎉'}
      </button>

      {pets.length > 0 && (
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-3 text-gray-500 text-sm"
        >
          取消，回到首页
        </button>
      )}
    </div>
  );
}
