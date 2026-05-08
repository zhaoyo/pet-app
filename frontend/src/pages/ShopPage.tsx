import { useEffect, useState } from 'react';
import { shopApi } from '../api/shopApi';
import { useAuthStore } from '../store/authStore';
import type { ShopItem } from '../types/api';
import { SHOP_CATEGORIES } from '../types/pet';

export default function ShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<number | null>(null);
  const [confirmItem, setConfirmItem] = useState<ShopItem | null>(null);
  const { user, updateUser } = useAuthStore();

  const loadItems = async (cat: string) => {
    setLoading(true);
    try {
      const res = await shopApi.getItems(cat === 'all' ? undefined : cat);
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(category); }, [category]);

  const handleBuy = async (item: ShopItem) => {
    if (item.owned) return;
    setBuying(item.id);
    try {
      const res = await shopApi.buy(item.id);
      const updatedUser = JSON.parse(localStorage.getItem('pet_user') || '{}');
      updateUser({ ...updatedUser, points: res.data.new_points });
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, owned: 1 } : i));
      setConfirmItem(null);
    } catch (err: any) {
      alert(err.response?.data?.error || '购买失败');
    } finally {
      setBuying(null);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Balance */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-4 text-white flex items-center justify-between">
        <div>
          <div className="text-sm opacity-80">我的积分</div>
          <div className="text-3xl font-bold">⭐ {user?.points ?? 0}</div>
        </div>
        <div className="text-4xl">🛒</div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {SHOP_CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat.key
                ? 'bg-pink-400 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items grid */}
      {loading ? (
        <div className="text-center py-10 text-2xl animate-spin">🐾</div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => !item.owned && setConfirmItem(item)}
              className={`bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center cursor-pointer transition-all active:scale-95 relative ${
                item.owned ? 'opacity-75' : 'hover:shadow-md'
              }`}
            >
              {item.owned ? (
                <div className="absolute top-1 right-1 bg-green-400 text-white text-xs rounded-full px-1.5 py-0.5">已有</div>
              ) : null}
              {item.thumbnail ? (
                <img src={item.thumbnail} className="w-14 h-14 object-contain mb-2" alt={item.name} />
              ) : (
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-2">
                  {item.category === 'furniture' ? '🪑' : '👒'}
                </div>
              )}
              <div className="text-xs font-medium text-gray-700 text-center truncate w-full">{item.name}</div>
              <div className="text-xs text-yellow-600 font-bold mt-1">⭐ {item.price}</div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase modal */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-4">
              {confirmItem.thumbnail ? (
                <img src={confirmItem.thumbnail} className="w-20 h-20 object-contain mx-auto mb-2" alt={confirmItem.name} />
              ) : (
                <div className="text-5xl mb-2">🛍️</div>
              )}
              <h3 className="text-lg font-bold text-gray-700">{confirmItem.name}</h3>
              {confirmItem.description && (
                <p className="text-sm text-gray-500 mt-1">{confirmItem.description}</p>
              )}
              <div className="text-2xl font-bold text-yellow-500 mt-2">⭐ {confirmItem.price} 积分</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmItem(null)}
                className="flex-1 py-3 border border-gray-200 rounded-2xl text-gray-600"
              >
                取消
              </button>
              <button
                onClick={() => handleBuy(confirmItem)}
                disabled={buying === confirmItem.id || (user?.points ?? 0) < confirmItem.price}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-2xl disabled:opacity-50"
              >
                {buying === confirmItem.id ? '购买中...' : '确认购买'}
              </button>
            </div>
            {(user?.points ?? 0) < confirmItem.price && (
              <p className="text-center text-xs text-red-400 mt-2">积分不足！</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
