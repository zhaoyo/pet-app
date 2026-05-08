import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('两次密码不一致'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await authApi.register(username, password);
      setAuth(res.data.user, res.data.token);
      navigate('/create-pet');
    } catch (err: any) {
      setError(err.response?.data?.error || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🐣</div>
          <h1 className="text-3xl font-bold text-purple-600">创建账号</h1>
          <p className="text-gray-500 mt-1">加入宠物打卡大家庭！</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">用户名</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="2-20个字符"
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="至少4个字符"
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">确认密码</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="再次输入密码"
                className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? '注册中...' : '立即注册 🎉'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            已有账号？
            <Link to="/login" className="text-purple-500 font-medium ml-1">去登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
