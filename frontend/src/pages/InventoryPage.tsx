import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../api/shopApi';
import { petApi } from '../api/petApi';
import { usePetStore } from '../store/petStore';
import type { ShopItem } from '../types/api';
import { SHOP_CATEGORIES } from '../types/pet';

const SLOT_ICONS: Record<string, string> = {
  hat: '🎩', glasses: '👓', top: '👕', bottom: '👖',
  shoes: '👟', jewelry: '💍', bag: '👜', flower: '🌸',
};

export default function InventoryPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [equipping, setEquipping] = useState<number | null>(null);
  const [equipped, setEquipped] = useState<Set<number>>(new Set());
  const { activePet, updatePet } = usePetStore();
  const navigate = useNavigate();

  useEffect(() => {
    inventoryApi.getAll().then(r => {
      setItems(r.data);
      setLoading(false);
    });
    // Track currently equipped items
    if (activePet) {
      petApi.get(activePet.id).then(r => {
        const ids = new Set<number>((r.data as any).equipment?.map((e: any) => e.id) ?? []);
        setEquipped(ids);
      });
    }
  }, [activePet?.id]);

  const handleEquip = async (item: ShopItem) => {
    if (!activePet || !item.slot) return;
    setEquipping(item.id);
    try {
      if (equipped.has(item.id)) {
        // Unequip
        await petApi.equip(activePet.id, item.slot, null);
        setEquipped(prev => { const s = new Set(prev); s.delete(item.id); return s; });
      } else {
        await petApi.equip(activePet.id, item.slot, item.id);
        setEquipped(prev => new Set([...prev, item.id]));
      }
      const res = await petApi.get(activePet.id);
      updatePet(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || '装备失败');
    } finally {
      setEquipping(null);
    }
  };

  const filtered = category === 'all' ? items : items.filter(i => i.category === category);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-700">🎒 我的背包</h1>
        {activePet && (
          <span className="text-sm text-gray-500">
            为 <span className="text-pink-500 font-medium">{activePet.name}</span> 装备
          </span>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {SHOP_CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat.key
                ? 'bg-purple-400 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-2xl animate-spin">🐾</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <div className="text-4xl mb-3">🎒</div>
          <p>背包空空的，去商店买点东西吧！</p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-3 px-4 py-2 bg-pink-400 text-white text-sm rounded-xl"
          >
            去商店
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {filtered.map(item => {
            const isEquipped = equipped.has(item.id);
            return (
              <div key={item.id} className={`bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center relative ${isEquipped ? 'ring-2 ring-pink-400' : ''}`}>
                {isEquipped && (
                  <div className="absolute top-1.5 right-1.5 bg-pink-400 text-white text-xs rounded-full px-1.5 py-0.5">已穿</div>
                )}
                {item.thumbnail ? (
                  <img src={item.thumbnail} className="w-14 h-14 object-contain mb-2" alt={item.name} />
                ) : (
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-2">
                    {item.slot ? SLOT_ICONS[item.slot] : (item.category === 'furniture' ? '🪑' : '🎁')}
                  </div>
                )}
                <div className="text-xs font-medium text-gray-700 text-center truncate w-full">{item.name}</div>
                {item.slot && activePet && (
                  <button
                    onClick={() => handleEquip(item)}
                    disabled={equipping === item.id}
                    className={`mt-2 w-full py-1.5 text-white text-xs rounded-xl font-medium transition-all ${
                      isEquipped
                        ? 'bg-gray-400'
                        : 'bg-gradient-to-r from-pink-400 to-purple-400'
                    }`}
                  >
                    {equipping === item.id ? '...' : isEquipped ? '卸下' : '穿上'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Hint to go to home to see effect */}
      {items.length > 0 && (
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 py-3 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 font-medium rounded-2xl text-sm"
        >
          🏠 回到首页查看装扮效果
        </button>
      )}
    </div>
  );
}
