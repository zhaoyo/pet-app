import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

export default function AdminLayout() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') navigate('/');
  }, [user]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/')} className="text-gray-500 text-sm">← 返回</button>
        <h1 className="text-xl font-bold text-gray-700">⚙️ 管理员后台</h1>
      </div>

      <div className="flex gap-2 mb-4">
        <NavLink
          to="/admin/checkin"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl text-sm font-medium ${isActive ? 'bg-pink-400 text-white' : 'bg-white border border-gray-200 text-gray-600'}`
          }
        >
          打卡类型
        </NavLink>
        <NavLink
          to="/admin/items"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl text-sm font-medium ${isActive ? 'bg-pink-400 text-white' : 'bg-white border border-gray-200 text-gray-600'}`
          }
        >
          商品管理
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
