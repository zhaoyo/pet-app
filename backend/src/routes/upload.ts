import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();
router.use(authMiddleware);

// Upload user avatar
router.post('/avatar', upload.single('avatar'), (req: AuthRequest, res: Response) => {
  if (!req.file) { res.status(400).json({ error: '请上传图片' }); return; }
  const avatarUrl = `/uploads/${req.file.filename}`;
  const db = getDb();
  db.prepare('UPDATE users SET avatar_url = ? WHERE id = ?').run(avatarUrl, req.user!.id);
  res.json({ avatar_url: avatarUrl });
});

export default router;
