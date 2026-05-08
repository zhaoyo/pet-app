import { useState, useEffect } from 'react';
import client from '../../api/client';

interface CheckinType {
  id: number;
  name: string;
  icon: string;
  points: number;
  is_active: number;
}

export default function AdminCheckinPage() {
  const [types, setTypes] = useState<CheckinType[]>([]);
  const [editing, setEditing] = useState<CheckinType | null>(null);
  const [form, setForm] = useState({ name: '', icon: '📝', points: 10 });
  const [showForm, setShowForm] = useState(false);

  const load = () => client.get('/admin/checkin-types').then(r => setTypes(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await client.put(`/admin/checkin-types/${editing.id}`, form);
    } else {
      await client.post('/admin/checkin-types', form);
    }
    load();
    setEditing(null);
    setShowForm(false);
    setForm({ name: '', icon: '📝', points: 10 });
  };

  const handleToggle = async (type: CheckinType) => {
    await client.put(`/admin/checkin-types/${type.id}`, { is_active: type.is_active ? 0 : 1 });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-700">打卡类型管理</h2>
        <button
          onClick={() => { setEditing(null); setForm({ name: '', icon: '📝', points: 10 }); setShowForm(true); }}
          className="px-4 py-2 bg-pink-400 text-white text-sm rounded-xl"
        >
          + 新增
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 mb-4 shadow-sm space-y-3">
          <div className="flex gap-2">
            <input
              value={form.icon}
              onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
              className="w-16 px-2 py-2 border border-gray-200 rounded-xl text-center"
              placeholder="图标"
            />
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl"
              placeholder="任务名称"
              required
            />
            <input
              type="number"
              value={form.points}
              onChange={e => setForm(f => ({ ...f, points: Number(e.target.value) }))}
              className="w-20 px-2 py-2 border border-gray-200 rounded-xl"
              min={1}
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 bg-pink-400 text-white rounded-xl">保存</button>
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border border-gray-200 rounded-xl">取消</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {types.map(type => (
          <div key={type.id} className={`bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 ${!type.is_active ? 'opacity-50' : ''}`}>
            <span className="text-2xl">{type.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-700">{type.name}</div>
              <div className="text-xs text-gray-400">⭐ {type.points} 积分</div>
            </div>
            <button
              onClick={() => { setEditing(type); setForm({ name: type.name, icon: type.icon, points: type.points }); setShowForm(true); }}
              className="text-xs text-blue-500 px-2 py-1 border border-blue-200 rounded-lg"
            >
              编辑
            </button>
            <button
              onClick={() => handleToggle(type)}
              className={`text-xs px-2 py-1 rounded-lg ${type.is_active ? 'text-red-500 border border-red-200' : 'text-green-500 border border-green-200'}`}
            >
              {type.is_active ? '停用' : '启用'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
