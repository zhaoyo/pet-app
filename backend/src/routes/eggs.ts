import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

const EGG_COST = 500;

router.get('/', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const user = db.prepare('SELECT pet_eggs, points FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({ pet_eggs: user.pet_eggs, points: user.points });
});

router.post('/buy', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const user = db.prepare('SELECT points, pet_eggs FROM users WHERE id = ?').get(req.user!.id) as any;
  if (user.points < EGG_COST) {
    res.status(400).json({ error: `积分不足，购买宠物蛋需要 ${EGG_COST} 积分` });
    return;
  }
  db.prepare('UPDATE users SET points = points - ?, pet_eggs = pet_eggs + 1 WHERE id = ?')
    .run(EGG_COST, req.user!.id);
  const updated = db.prepare('SELECT points, pet_eggs FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({ pet_eggs: updated.pet_eggs, points: updated.points });
});

export default router;
