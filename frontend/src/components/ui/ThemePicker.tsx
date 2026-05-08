import { useThemeStore, THEMES } from '../../store/themeStore';

export default function ThemePicker() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="bg-white/70 rounded-2xl p-3">
      <p className="text-xs text-gray-400 mb-2 text-center">主题颜色</p>
      <div className="flex justify-center gap-3">
        {THEMES.map(t => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            title={t.label}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className="w-8 h-8 rounded-full shadow flex items-center justify-center transition-transform group-active:scale-90"
              style={{
                background: t.color,
                transform: theme === t.key ? 'scale(1.18)' : 'scale(1)',
                boxShadow: theme === t.key ? `0 0 0 3px white, 0 0 0 4px ${t.color}` : undefined,
              }}
            >
              {theme === t.key && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[10px] text-gray-400">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
