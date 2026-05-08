import { create } from 'zustand';

export type ThemeKey = 'sakura' | 'ocean' | 'forest' | 'sunset' | 'lavender' | 'midnight' | 'peach';

export const THEMES: { key: ThemeKey; label: string; color: string }[] = [
  { key: 'sakura',   label: '粉樱',  color: '#f472b6' },
  { key: 'ocean',    label: '海洋',  color: '#38bdf8' },
  { key: 'forest',   label: '森林',  color: '#4ade80' },
  { key: 'sunset',   label: '日落',  color: '#fb923c' },
  { key: 'lavender', label: '薰衣草', color: '#a78bfa' },
  { key: 'midnight', label: '深夜',  color: '#6366f1' },
  { key: 'peach',    label: '蜜桃',  color: '#fb7185' },
];

interface ThemeState {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
}

function applyTheme(t: ThemeKey) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('pet_theme', t);
}

const stored = (localStorage.getItem('pet_theme') as ThemeKey) || 'sakura';
applyTheme(stored);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: stored,
  setTheme: (t) => {
    applyTheme(t);
    set({ theme: t });
  },
}));
