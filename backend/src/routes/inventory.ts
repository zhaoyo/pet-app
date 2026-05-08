import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const items = db.prepare(`
    SELECT si.*, ui.purchased_at
    FROM user_inventory ui
    JOIN shop_items si ON ui.item_id = si.id
    WHERE ui.user_id = ?
    ORDER BY ui.purchased_at DESC
  `).all(req.user!.id);
  res.json(items);
});

export default router;
