import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Get all courses (with learned flag per pet)
router.get('/courses', (req: AuthRequest, res: Response) => {
  const { pet_id } = req.query;
  const db = getDb();

  if (pet_id) {
    const courses = db.prepare(`
      SELECT c.*, CASE WHEN pc.id IS NOT NULL THEN 1 ELSE 0 END as learned
      FROM courses c
      LEFT JOIN pet_courses pc ON pc.course_id = c.id AND pc.pet_id = ?
      WHERE c.is_active = 1
      ORDER BY c.price ASC
    `).all(pet_id);
    res.json(courses);
    return;
  }

  const courses = db.prepare('SELECT * FROM courses WHERE is_active = 1 ORDER BY price ASC').all();
  res.json(courses);
});

// Buy course for a pet
router.post('/buy', (req: AuthRequest, res: Response) => {
  const { course_id, pet_id } = req.body;
  if (!course_id || !pet_id) {
    res.status(400).json({ error: '请指定课程和宠物' });
    return;
  }

  const db = getDb();
  const course = db.prepare('SELECT * FROM courses WHERE id = ? AND is_active = 1').get(course_id) as any;
  if (!course) { res.status(404).json({ error: '课程不存在' }); return; }

  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(pet_id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const already = db.prepare('SELECT id FROM pet_courses WHERE pet_id = ? AND course_id = ?')
    .get(pet_id, course_id);
  if (already) { res.status(409).json({ error: '宠物已经学会这个技能了' }); return; }

  const user = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  if (user.points < course.price) {
    res.status(400).json({ error: `积分不足，还差 ${course.price - user.points} 积分` });
    return;
  }

  const buy = db.transaction(() => {
    db.prepare('UPDATE users SET points = points - ? WHERE id = ?').run(course.price, req.user!.id);
    db.prepare('INSERT INTO pet_courses (pet_id, course_id) VALUES (?, ?)').run(pet_id, course_id);
  });
  buy();

  const newUser = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({ success: true, new_points: newUser.points });
});

export default router;
