import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', icon: '🏠', label: '首页' },
  { to: '/checkin', icon: '✅', label: '打卡' },
  { to: '/draw', icon: '🎰', label: '抽卡' },
  { to: '/cards', icon: '📖', label: '图鉴' },
  { to: '/shop', icon: '🛒', label: '商店' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 flex items-center z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
              isActive ? 'text-[var(--color-nav-active)]' : 'text-gray-400'
            }`
          }
        >
          <span className="text-xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
