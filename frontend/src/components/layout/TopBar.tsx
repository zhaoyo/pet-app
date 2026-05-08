import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePetStore } from '../../store/petStore';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const { activePet } = usePetStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 text-white px-4 py-3 flex items-center gap-3 shadow-md" style={{ background: 'linear-gradient(to right, var(--color-topbar-from), var(--color-topbar-to))' }}>
      <div className="flex-1 flex items-center gap-2">
        {user?.avatar_url ? (
          <img src={user.avatar_url} className="w-8 h-8 rounded-full object-cover border-2 border-white" alt="头像" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-lg">
            {user?.username?.[0]?.toUpperCase()}
          </div>
        )}
        <span className="font-bold text-sm">{user?.username}</span>
        {activePet && (
          <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
            🐾 {activePet.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
          <span>⭐</span>
          <span>{user?.points ?? 0}</span>
        </div>
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-xs bg-white/20 rounded px-2 py-1">管理</Link>
        )}
        <button onClick={handleLogout} className="text-xs bg-white/20 rounded px-2 py-1">退出</button>
      </div>
    </header>
  );
}
