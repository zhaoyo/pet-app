import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { useAuthStore } from '../../store/authStore';
import { usePetStore } from '../../store/petStore';
import { petApi } from '../../api/petApi';
import { authApi } from '../../api/authApi';

export default function AppLayout() {
  const { user, token, updateUser } = useAuthStore();
  const { setPets } = usePetStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate('/login'); return; }

    // Refresh user data
    authApi.me().then(r => updateUser(r.data)).catch(() => {});

    // Load pets
    petApi.list().then(r => setPets(r.data)).catch(() => {});
  }, [token]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--color-app-from), var(--color-app-to))' }}>
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
