import { useState, useEffect } from 'react';
import client from '../../api/client';

interface ShopItem {
  id: number;
  name: string;
  category: string;
  slot?: string;
  price: number;
  description?: string;
  is_active: number;
  thumbnail?: string;
}

const CATEGORIES = ['clothes', 'pants', 'shoes', 'hat', 'glasses', 'jewelry', 'bag', 'flower', 'furniture'];
const CAT_LABELS: Record<string, string> = {
  clothes: '上衣', pants: '裤子', shoes: '鞋子', hat: '帽子',
  glasses: '眼镜', jewelry: '饰品', bag: '包包', flower: '鲜花', furniture: '家具',
};
const SLOT_FOR_CAT: Record<string, string> = {
  clothes: 'top', pants: 'bottom', shoes: 'shoes', hat: 'hat',
  glasses: 'glasses', jewelry: 'jewelry', bag: 'bag', flower: 'flower',
};

export default function AdminItemsPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ShopItem | null>(null);
  const [form, setForm] = useState({ name: '', category: 'hat', price: 30, description: '' });

  const load = () => client.get('/admin/shop-items').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, slot: SLOT_FOR_CAT[form.category] || null };
    if (editing) {
      await client.put(`/admin/shop-items/${editing.id}`, payload);
    } else {
      await client.post('/admin/shop-items', payload);
    }
    load();
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', category: 'hat', price: 30, description: '' });
  };

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-700">商品管理</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="px-4 py-2 bg-pink-400 text-white text-sm rounded-xl"
        >
          + 新增商品
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        <button onClick={() => setFilterCat('all')} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm ${filterCat === 'all' ? 'bg-pink-400 text-white' : 'bg-white border border-gray-200'}`}>全部</button>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm ${filterCat === c ? 'bg-pink-400 text-white' : 'bg-white border border-gray-200'}`}>
            {CAT_LABELS[c]}
          </button>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 mb-4 shadow-sm space-y-3">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl" placeholder="商品名称" required />
          <div className="flex gap-2">
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl">
              {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
            </select>
            <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border border-gray-200 rounded-xl" placeholder="积分" min={1} />
          </div>
          <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl" placeholder="描述（可选）" />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 bg-pink-400 text-white rounded-xl">保存</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border border-gray-200 rounded-xl">取消</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {filtered.map(item => (
          <div key={item.id} className={`bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 ${!item.is_active ? 'opacity-50' : ''}`}>
            {item.thumbnail ? (
              <img src={item.thumbnail} className="w-12 h-12 object-contain rounded-lg" alt={item.name} />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🛍️</div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-700 text-sm">{item.name}</div>
              <div className="text-xs text-gray-400">{CAT_LABELS[item.category]} · ⭐ {item.price}</div>
            </div>
            <button
              onClick={() => { setEditing(item); setForm({ name: item.name, category: item.category, price: item.price, description: item.description || '' }); setShowForm(true); }}
              className="text-xs text-blue-500 px-2 py-1 border border-blue-200 rounded-lg"
            >
              编辑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
