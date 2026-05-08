import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Get shop items (optionally filtered by category), with ownership flag
router.get('/items', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const { category } = req.query;

  const sql = category
    ? `SELECT si.*, CASE WHEN ui.id IS NOT NULL THEN 1 ELSE 0 END as owned
       FROM shop_items si
       LEFT JOIN user_inventory ui ON ui.item_id = si.id AND ui.user_id = ?
       WHERE si.is_active = 1 AND si.category = ? ORDER BY si.price ASC`
    : `SELECT si.*, CASE WHEN ui.id IS NOT NULL THEN 1 ELSE 0 END as owned
       FROM shop_items si
       LEFT JOIN user_inventory ui ON ui.item_id = si.id AND ui.user_id = ?
       WHERE si.is_active = 1 ORDER BY si.category, si.price ASC`;

  const items = category
    ? db.prepare(sql).all(req.user!.id, category)
    : db.prepare(sql).all(req.user!.id);

  res.json(items);
});

// Buy item
router.post('/buy', (req: AuthRequest, res: Response) => {
  const { item_id } = req.body;
  if (!item_id) { res.status(400).json({ error: '请指定商品' }); return; }

  const db = getDb();
  const item = db.prepare('SELECT * FROM shop_items WHERE id = ? AND is_active = 1').get(item_id) as any;
  if (!item) { res.status(404).json({ error: '商品不存在' }); return; }

  const user = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  if (user.points < item.price) {
    res.status(400).json({ error: `积分不足，还差 ${item.price - user.points} 积分` });
    return;
  }

  const already = db.prepare('SELECT id FROM user_inventory WHERE user_id = ? AND item_id = ?')
    .get(req.user!.id, item_id);
  if (already) { res.status(409).json({ error: '已经拥有这件物品了' }); return; }

  const buy = db.transaction(() => {
    db.prepare('UPDATE users SET points = points - ? WHERE id = ?').run(item.price, req.user!.id);
    db.prepare('INSERT INTO user_inventory (user_id, item_id) VALUES (?, ?)').run(req.user!.id, item_id);
  });
  buy();

  const newUser = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({ success: true, new_points: newUser.points });
});

export default router;
