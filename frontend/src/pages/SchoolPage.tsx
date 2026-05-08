import { useEffect, useState } from 'react';
import { schoolApi } from '../api/schoolApi';
import { useAuthStore } from '../store/authStore';
import { usePetStore } from '../store/petStore';
import type { Course } from '../types/api';

export default function SchoolPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmCourse, setConfirmCourse] = useState<Course | null>(null);
  const [buying, setBuying] = useState(false);
  const { user, updateUser } = useAuthStore();
  const { activePet, updatePet: _updatePet } = usePetStore();

  const loadCourses = () => {
    const petId = activePet?.id;
    schoolApi.getCourses(petId).then(r => {
      setCourses(r.data);
      setLoading(false);
    });
  };

  useEffect(() => { loadCourses(); }, [activePet?.id]);

  const handleBuy = async (course: Course) => {
    if (!activePet) { alert('请先创建宠物'); return; }
    setBuying(true);
    try {
      const res = await schoolApi.buy(course.id, activePet.id);
      const updatedUser = JSON.parse(localStorage.getItem('pet_user') || '{}');
      updateUser({ ...updatedUser, points: res.data.new_points });
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, learned: 1 } : c));
      setConfirmCourse(null);
      alert(`🎉 ${activePet.name} 学会了${course.name}！`);
    } catch (err: any) {
      alert(err.response?.data?.error || '购买失败');
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-2xl animate-spin">🐾</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-700">🎓 宠物学校</h1>
        {activePet && <p className="text-sm text-gray-500 mt-1">为 {activePet.name} 报名课程</p>}
      </div>

      <div className="space-y-3">
        {courses.map(course => (
          <div
            key={course.id}
            className={`bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 ${
              !course.learned ? 'cursor-pointer hover:shadow-md active:scale-95 transition-all' : ''
            }`}
            onClick={() => !course.learned && setConfirmCourse(course)}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              {course.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-700">{course.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{course.description}</div>
              <div className="text-xs text-yellow-600 font-bold mt-1">⭐ {course.price} 积分</div>
            </div>
            {course.learned ? (
              <div className="flex-shrink-0 bg-green-100 text-green-600 text-xs px-3 py-1.5 rounded-full font-medium">
                ✓ 已学会
              </div>
            ) : (
              <div className="flex-shrink-0 bg-purple-400 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                报名 →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm modal */}
      {confirmCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{confirmCourse.icon}</div>
              <h3 className="text-lg font-bold text-gray-700">为 {activePet?.name} 报名</h3>
              <h2 className="text-xl font-bold text-purple-600 mt-1">{confirmCourse.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{confirmCourse.description}</p>
              <div className="text-2xl font-bold text-yellow-500 mt-3">⭐ {confirmCourse.price} 积分</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmCourse(null)} className="flex-1 py-3 border border-gray-200 rounded-2xl text-gray-600">
                取消
              </button>
              <button
                onClick={() => handleBuy(confirmCourse)}
                disabled={buying || (user?.points ?? 0) < confirmCourse.price}
                className="flex-1 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-2xl disabled:opacity-50"
              >
                {buying ? '报名中...' : '确认报名'}
              </button>
            </div>
            {(user?.points ?? 0) < confirmCourse.price && (
              <p className="text-center text-xs text-red-400 mt-2">积分不足！</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
