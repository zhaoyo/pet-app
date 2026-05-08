/**
 * Calculate streak bonus points.
 * 7-day streak: +10 pts
 * 30-day streak: +30 pts
 * Every 10 days after 30: +10 pts additional
 */
export function calculateStreakBonus(newStreak: number): number {
  if (newStreak <= 0) return 0;
  if (newStreak >= 30 && (newStreak - 30) % 10 === 0) {
    const extra = Math.floor((newStreak - 30) / 10);
    return 30 + extra * 10;
  }
  if (newStreak % 7 === 0 && newStreak < 30) {
    return 10;
  }
  return 0;
}

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getTodayDate(): string {
  return toLocalDateString(new Date());
}

export function getYesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toLocalDateString(d);
}
