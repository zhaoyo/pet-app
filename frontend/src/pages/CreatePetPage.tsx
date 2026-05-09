import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { petApi } from '../api/petApi';
import { usePetStore } from '../store/petStore';
import { PET_NAMES, type PetType } from '../types/pet';
import { getPetBaseSvg } from '../components/pet/petSvgData';

// Shows the full pet body
function PetHeadAvatar({ type, size = 64 }: { type: PetType; size?: number }) {
  return (
    <svg
      viewBox="0 0 400 500"
      width={size}
      height={size * 1.25}
      style={{ display: 'block' }}
      dangerouslySetInnerHTML={{ __html: getPetBaseSvg(type) }}
    />
  );
}

const PET_TYPES = Object.keys(PET_NAMES) as PetType[];


export default function CreatePetPage() {
  const [selectedType, setSelectedType] = useState<PetType | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setPets, pets } = usePetStore();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!selectedType || !name.trim()) {
      setError('请选择宠物类型并填写名字');
      return;
    }
    setLoading(true);
    try {
      const res = await petApi.create(name.trim(), selectedType);
      const newPets = [...pets, res.data];
      setPets(newPets);
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
        <h1 className="text-2xl font-bold text-pink-600">创建你的宠物 🐾</h1>
        <p className="text-gray-500 text-sm mt-1">选择你最喜欢的宠物吧！</p>
      </div>

      {/* Pet type grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {PET_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all ${
              selectedType === type
                ? 'border-pink-400 bg-pink-50 scale-105 shadow-md'
                : 'border-gray-100 bg-white hover:border-pink-200'
            }`}
          >
            <div className="flex items-end justify-center" style={{height: 72}}>
              <PetHeadAvatar type={type} size={52} />
            </div>
            <span className="text-xs text-gray-600 mt-1">{PET_NAMES[type]}</span>
          </button>
        ))}
      </div>

      {/* Name input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          给宠物起个名字 ✏️
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={selectedType ? `我的${PET_NAMES[selectedType]}...` : '先选择宠物类型'}
          maxLength={20}
          className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
        />
      </div>

      {/* Preview */}
      {selectedType && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mb-4 text-center">
          <div className="flex justify-center mb-2">
            <PetHeadAvatar type={selectedType} size={100} />
          </div>
          <p className="text-gray-600 text-sm font-medium">
            {name || '(还没有名字)'} · {PET_NAMES[selectedType]}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

      <button
        onClick={handleCreate}
        disabled={loading || !selectedType || !name.trim()}
        className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-40"
      >
        {loading ? '创建中...' : '创建宠物 🎉'}
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
