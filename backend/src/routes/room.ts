import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/:pet_id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.pet_id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const layout = db.prepare('SELECT layout_json FROM room_layouts WHERE pet_id = ?')
    .get(req.params.pet_id) as any;

  const layoutData = layout ? JSON.parse(layout.layout_json) : [];

  // Enrich with item data
  if (layoutData.length > 0) {
    const itemIds = [...new Set(layoutData.map((l: any) => l.item_id))];
    const placeholders = itemIds.map(() => '?').join(',');
    const items = db.prepare(
      `SELECT id, name, thumbnail FROM shop_items WHERE id IN (${placeholders})`
    ).all(...itemIds) as any[];
    const itemMap = new Map(items.map(i => [i.id, i]));
    const enriched = layoutData.map((l: any) => ({ ...l, item: itemMap.get(l.item_id) }));
    res.json(enriched);
    return;
  }
  res.json([]);
});

router.put('/:pet_id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.pet_id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const { layout } = req.body;
  if (!Array.isArray(layout)) { res.status(400).json({ error: '无效的布局数据' }); return; }

  const json = JSON.stringify(layout);
  db.prepare(`
    INSERT INTO room_layouts (pet_id, layout_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(pet_id) DO UPDATE SET layout_json = excluded.layout_json, updated_at = excluded.updated_at
  `).run(req.params.pet_id, json);
  res.json({ success: true });
});

export default router;
