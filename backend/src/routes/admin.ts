import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { adminMiddleware } from '../middleware/admin';

const router = Router();
router.use(authMiddleware);
router.use(adminMiddleware);

// ---- Checkin types CRUD ----
router.get('/checkin-types', (_req, res: Response) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM checkin_types ORDER BY id').all());
});

router.post('/checkin-types', (req: AuthRequest, res: Response) => {
  const { name, icon, points } = req.body;
  if (!name || !points) { res.status(400).json({ error: '名称和积分不能为空' }); return; }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO checkin_types (name, icon, points) VALUES (?, ?, ?)'
  ).run(name, icon || '📝', points);
  res.status(201).json(db.prepare('SELECT * FROM checkin_types WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/checkin-types/:id', (req: AuthRequest, res: Response) => {
  const { name, icon, points, is_active } = req.body;
  const db = getDb();
  db.prepare(
    'UPDATE checkin_types SET name = COALESCE(?, name), icon = COALESCE(?, icon), points = COALESCE(?, points), is_active = COALESCE(?, is_active) WHERE id = ?'
  ).run(name, icon, points, is_active, req.params.id);
  res.json(db.prepare('SELECT * FROM checkin_types WHERE id = ?').get(req.params.id));
});

router.delete('/checkin-types/:id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  db.prepare('UPDATE checkin_types SET is_active = 0 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ---- Shop items CRUD ----
router.get('/shop-items', (_req, res: Response) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM shop_items ORDER BY category, price').all());
});

router.post('/shop-items', (req: AuthRequest, res: Response) => {
  const { name, category, slot, price, description, svg_data, thumbnail } = req.body;
  if (!name || !category || !price) { res.status(400).json({ error: '名称、分类和价格不能为空' }); return; }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO shop_items (name, category, slot, price, description, svg_data, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(name, category, slot || null, price, description || null, svg_data || null, thumbnail || null);
  res.status(201).json(db.prepare('SELECT * FROM shop_items WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/shop-items/:id', (req: AuthRequest, res: Response) => {
  const { name, category, slot, price, description, svg_data, thumbnail, is_active } = req.body;
  const db = getDb();
  db.prepare(`
    UPDATE shop_items SET
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      slot = COALESCE(?, slot),
      price = COALESCE(?, price),
      description = COALESCE(?, description),
      svg_data = COALESCE(?, svg_data),
      thumbnail = COALESCE(?, thumbnail),
      is_active = COALESCE(?, is_active)
    WHERE id = ?
  `).run(name, category, slot, price, description, svg_data, thumbnail, is_active, req.params.id);
  res.json(db.prepare('SELECT * FROM shop_items WHERE id = ?').get(req.params.id));
});

router.delete('/shop-items/:id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  db.prepare('UPDATE shop_items SET is_active = 0 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ---- Users ----
router.get('/users', (_req, res: Response) => {
  const db = getDb();
  res.json(db.prepare('SELECT id, username, role, points, avatar_url, created_at FROM users ORDER BY created_at DESC').all());
});

router.put('/users/:id/points', (req: AuthRequest, res: Response) => {
  const { points } = req.body;
  if (points === undefined) { res.status(400).json({ error: '请提供积分值' }); return; }
  const db = getDb();
  db.prepare('UPDATE users SET points = ? WHERE id = ?').run(points, req.params.id);
  res.json({ success: true });
});

export default router;
