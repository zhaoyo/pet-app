import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../database';
import { signToken } from '../utils/jwt';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: '用户名和密码不能为空' });
    return;
  }
  if (username.length < 2 || username.length > 20) {
    res.status(400).json({ error: '用户名长度为2-20个字符' });
    return;
  }
  if (password.length < 4) {
    res.status(400).json({ error: '密码至少4个字符' });
    return;
  }

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    res.status(409).json({ error: '用户名已被使用' });
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare(
    'INSERT INTO users (username, password, points) VALUES (?, ?, 1000)'
  ).run(username, hash);

  const user = db.prepare('SELECT id, username, role, points, avatar_url FROM users WHERE id = ?')
    .get(result.lastInsertRowid) as any;

  const token = signToken({ id: user.id, username: user.username, role: user.role });
  res.status(201).json({ token, user });
});

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: '用户名和密码不能为空' });
    return;
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ error: '用户名或密码错误' });
    return;
  }

  const token = signToken({ id: user.id, username: user.username, role: user.role });
  const { password: _, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const db = getDb();
  const user = db.prepare(
    'SELECT id, username, role, points, avatar_url, created_at FROM users WHERE id = ?'
  ).get(req.user!.id);
  if (!user) {
    res.status(404).json({ error: '用户不存在' });
    return;
  }
  res.json(user);
});

export default router;
