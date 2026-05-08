import { useEffect, useState, useCallback } from 'react';
import { checkinApi } from '../api/checkinApi';
import { useAuthStore } from '../store/authStore';
import { usePetStore } from '../store/petStore';
import { petApi } from '../api/petApi';
import type { CheckinType, UserStreak, CheckinRecord } from '../types/api';

interface PointsPopup {
  id: number;
  points: number;
  bonus: number;
}

function toLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function CheckinPage() {
  const [tasks, setTasks] = useState<CheckinType[]>([]);
  const [streaks, setStreaks] = useState<UserStreak[]>([]);
  const [history, setHistory] = useState<CheckinRecord[]>([]);
  const [popups, setPopups] = useState<PointsPopup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { updateUser } = useAuthStore();
  const { activePet, updatePet } = usePetStore();

  const loadData = useCallback(async () => {
    const [todayRes, streakRes, histRes] = await Promise.all([
      checkinApi.getToday(),
      checkinApi.getStreaks(),
      checkinApi.getHistory(30),
    ]);
    setTasks(todayRes.data);
    setStreaks(streakRes.data);
    setHistory(histRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, []);

  const handleCheckin = async (type: CheckinType) => {
    if (type.checked) return;
    try {
      const res = await checkinApi.checkin(type.id);
      const { points_earned, streak_bonus, new_total_points } = res.data;

      setTasks(prev => prev.map(t => t.id === type.id ? { ...t, checked: true } : t));
      updateUser({ ...JSON.parse(localStorage.getItem('pet_user') || '{}'), points: new_total_points });

      const id = Date.now();
      setPopups(prev => [...prev, { id, points: points_earned, bonus: streak_bonus }]);
      setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 2000);

      // Boost active pet's mood on checkin
      if (activePet) {
        petApi.boostMood(activePet.id, 10).then(r => {
          updatePet({ ...activePet, mood: r.data.mood });
        }).catch(() => {});
      }

      // Refresh streaks and history
      const [streakRes, histRes] = await Promise.all([
        checkinApi.getStreaks(),
        checkinApi.getHistory(30),
      ]);
      setStreaks(streakRes.data);
      setHistory(histRes.data);
    } catch (err: any) {
      alert(err.response?.data?.error || '打卡失败');
    }
  };

  // Build calendar: date → list of records
  const calendarMap: Record<string, CheckinRecord[]> = {};
  history.forEach(r => {
    if (!calendarMap[r.checked_date]) calendarMap[r.checked_date] = [];
    calendarMap[r.checked_date].push(r);
  });

  // Last 30 days in LOCAL time
  const today = toLocalDate(new Date());
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return toLocalDate(d);
  });

  if (loading) return <div className="flex justify-center items-center h-40"><div className="text-2xl animate-spin">🐾</div></div>;

  const todayCount = tasks.filter(t => t.checked).length;
  // Show max streak among all tasks
  const maxStreak = streaks.reduce((max, s) => Math.max(max, s.current_streak), 0);

  const selectedRecords = selectedDate ? (calendarMap[selectedDate] || []) : [];

  return (
    <div className="p-4 max-w-lg mx-auto relative">
      {/* Points popups */}
      {popups.map(p => (
        <div key={p.id} className="points-float fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
          <span className="text-2xl font-bold text-yellow-500">+{p.points}</span>
          {p.bonus > 0 && <span className="text-sm font-bold text-orange-400">🔥 连击 +{p.bonus}</span>}
        </div>
      ))}

      {/* Header stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-pink-500">{todayCount}</div>
          <div className="text-xs text-gray-500">今日完成</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-orange-400">🔥{maxStreak}</div>
          <div className="text-xs text-gray-500">最长连续</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-purple-500">{tasks.length}</div>
          <div className="text-xs text-gray-500">任务总数</div>
        </div>
      </div>

      {/* Today's tasks */}
      <h2 className="text-base font-bold text-gray-700 mb-3">📋 今日打卡任务</h2>
      <div className="space-y-2 mb-6">
        {tasks.map(task => {
          const streak = streaks.find(s => s.checkin_type_id === task.id);
          return (
            <div
              key={task.id}
              onClick={() => handleCheckin(task)}
              className={`flex items-center gap-3 p-4 rounded-2xl shadow-sm cursor-pointer transition-all active:scale-95 ${
                task.checked
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                  : 'bg-white border border-gray-100 hover:border-pink-200'
              }`}
            >
              <span className="text-2xl">{task.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-700">{task.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span>+{task.points} 积分</span>
                  {streak && streak.current_streak > 0 && (
                    <span className="text-orange-400">🔥 连续{streak.current_streak}天</span>
                  )}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                task.checked ? 'bg-green-400 text-white' : 'bg-gray-100'
              }`}>
                {task.checked ? '✓' : '○'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak details per task */}
      {streaks.length > 0 && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-600 mb-3">🔥 各项连续天数</h3>
          <div className="space-y-2">
            {streaks.map(s => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="text-base">{s.icon}</span>
                <span className="flex-1 text-sm text-gray-700">{s.name}</span>
                <span className={`text-sm font-bold ${s.current_streak > 0 ? 'text-orange-400' : 'text-gray-300'}`}>
                  🔥 {s.current_streak} 天
                </span>
                <span className="text-xs text-gray-400">最长 {s.longest_streak} 天</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak bonus info */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 mb-6 border border-orange-100">
        <h3 className="text-sm font-bold text-orange-600 mb-2">🔥 连续打卡奖励</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>连续 7 天：额外 +10 积分</div>
          <div>连续 30 天：额外 +30 积分</div>
          <div>30天后每增加10天：额外 +10 积分</div>
        </div>
      </div>

      {/* Calendar heatmap with dates */}
      <h2 className="text-base font-bold text-gray-700 mb-3">📅 最近30天打卡记录</h2>
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-2">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div key={d} className="text-center text-xs text-gray-400">{d}</div>
          ))}
        </div>

        {/* Day offset padding — align first day to correct weekday */}
        {(() => {
          const firstDate = new Date(last30Days[0]);
          const firstWeekday = firstDate.getDay(); // 0=Sun
          const cells: React.ReactNode[] = [];

          // Padding cells
          for (let i = 0; i < firstWeekday; i++) {
            cells.push(<div key={`pad-${i}`} />);
          }

          last30Days.forEach(date => {
            const records = calendarMap[date] || [];
            const count = records.length;
            const isToday = date === today;
            const isSelected = date === selectedDate;

            let bgClass = 'bg-gray-100 text-gray-400';
            if (count === 1) bgClass = 'bg-green-200 text-green-800';
            else if (count >= 2 && count < 4) bgClass = 'bg-green-400 text-white';
            else if (count >= 4) bgClass = 'bg-green-600 text-white';

            const dayNum = parseInt(date.slice(8), 10);

            cells.push(
              <button
                key={date}
                onClick={() => setSelectedDate(isSelected ? null : date)}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium
                  transition-all active:scale-90
                  ${bgClass}
                  ${isToday ? 'ring-2 ring-pink-400' : ''}
                  ${isSelected ? 'ring-2 ring-purple-400 scale-105' : ''}
                `}
              >
                <span className="leading-none">{dayNum}</span>
                {count > 0 && <span className="text-xs leading-none mt-0.5">{count}</span>}
              </button>
            );
          });

          return <div className="grid grid-cols-7 gap-1">{cells}</div>;
        })()}
      </div>

      {/* Color legend */}
      <div className="flex items-center gap-3 text-xs text-gray-400 px-1 mb-4">
        <span>打卡数量：</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-100 inline-block" /> 0</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block" /> 1</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> 2-3</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> 4+</span>
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">
            {selectedDate} 的打卡记录
          </h3>
          {selectedRecords.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-2">这天没有打卡记录</p>
          ) : (
            <div className="space-y-2">
              {selectedRecords.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-green-50 rounded-xl">
                  <span className="text-xl">{r.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{r.name}</div>
                    <div className="text-xs text-gray-400">
                      +{r.points_earned} 积分
                      {r.streak_bonus > 0 && <span className="text-orange-400 ml-1">+{r.streak_bonus} 连击奖励</span>}
                    </div>
                  </div>
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
