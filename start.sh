#!/bin/bash
# 宠物打卡 App 启动脚本

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "🐾 启动宠物打卡 App..."

# 清理可能残留的进程
lsof -ti :4000 | xargs kill -9 2>/dev/null
lsof -ti :3000 | xargs kill -9 2>/dev/null

# Start backend
echo "📡 启动后端 (端口 4000)..."
cd "$ROOT/backend"
npm run dev &
BACKEND_PID=$!

sleep 3

# Start frontend
echo "🌐 启动前端 (端口 3000)..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ 启动完成！"
echo "   前端: http://localhost:3000"
echo "   后端: http://localhost:4000"
echo ""
echo "管理员账号: admin / admin123"
echo ""
echo "按 Ctrl+C 停止..."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
