import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { calculateStreakBonus, getTodayDate, getYesterdayDate } from '../utils/points';

const router = Router();
router.use(authMiddleware);

// Get active checkin types
router.get('/types', (_req, res: Response) => {
  const db = getDb();
  const types = db.prepare('SELECT * FROM checkin_types WHERE is_active = 1 ORDER BY id').all();
  res.json(types);
});

// Get today's checkin status
router.get('/today', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const today = getTodayDate();
  const types = db.prepare('SELECT * FROM checkin_types WHERE is_active = 1').all() as any[];
  const records = db.prepare(
    "SELECT checkin_type_id FROM checkin_records WHERE user_id = ? AND checked_date = ?"
  ).all(req.user!.id, today) as any[];

  const checkedIds = new Set(records.map((r: any) => r.checkin_type_id));
  const result = types.map(t => ({ ...t, checked: checkedIds.has(t.id) }));
  res.json(result);
});

// Do checkin
router.post('/', (req: AuthRequest, res: Response) => {
  const { checkin_type_id } = req.body;
  if (!checkin_type_id) {
    res.status(400).json({ error: '请指定打卡类型' });
    return;
  }

  const db = getDb();
  const type = db.prepare('SELECT * FROM checkin_types WHERE id = ? AND is_active = 1')
    .get(checkin_type_id) as any;
  if (!type) { res.status(404).json({ error: '打卡类型不存在' }); return; }

  const today = getTodayDate();
  const yesterday = getYesterdayDate();

  // Prevent duplicate
  const existing = db.prepare(
    'SELECT id FROM checkin_records WHERE user_id = ? AND checkin_type_id = ? AND checked_date = ?'
  ).get(req.user!.id, checkin_type_id, today);
  if (existing) {
    res.status(409).json({ error: '今天已经打过卡了' });
    return;
  }

  // Get/update streak
  let streak = db.prepare(
    'SELECT * FROM user_streaks WHERE user_id = ? AND checkin_type_id = ?'
  ).get(req.user!.id, checkin_type_id) as any;

  let newStreak = 1;
  if (streak) {
    if (streak.last_checkin === yesterday) {
      newStreak = streak.current_streak + 1;
    } else if (streak.last_checkin === today) {
      res.status(409).json({ error: '今天已经打过卡了' });
      return;
    }
    // else streak resets to 1
  }

  const bonus = calculateStreakBonus(newStreak);
  const totalEarned = type.points + bonus;

  const insertCheckin = db.transaction(() => {
    db.prepare(
      'INSERT INTO checkin_records (user_id, checkin_type_id, checked_date, points_earned, streak_bonus) VALUES (?, ?, ?, ?, ?)'
    ).run(req.user!.id, checkin_type_id, today, type.points, bonus);

    if (streak) {
      db.prepare(
        'UPDATE user_streaks SET current_streak = ?, longest_streak = MAX(longest_streak, ?), last_checkin = ? WHERE id = ?'
      ).run(newStreak, newStreak, today, streak.id);
    } else {
      db.prepare(
        'INSERT INTO user_streaks (user_id, checkin_type_id, current_streak, longest_streak, last_checkin) VALUES (?, ?, ?, ?, ?)'
      ).run(req.user!.id, checkin_type_id, newStreak, newStreak, today);
    }

    db.prepare('UPDATE users SET points = points + ? WHERE id = ?')
      .run(totalEarned, req.user!.id);
  });

  insertCheckin();

  const user = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({
    success: true,
    points_earned: type.points,
    streak_bonus: bonus,
    total_earned: totalEarned,
    new_streak: newStreak,
    new_total_points: user.points,
  });
});

// Get streaks
router.get('/streaks', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const streaks = db.prepare(`
    SELECT us.*, ct.name, ct.icon
    FROM user_streaks us
    JOIN checkin_types ct ON us.checkin_type_id = ct.id
    WHERE us.user_id = ?
  `).all(req.user!.id);
  res.json(streaks);
});

// Get history (calendar data)
router.get('/history', (req: AuthRequest, res: Response) => {
  const days = Number(req.query.days) || 30;
  const db = getDb();
  // Compute cutoff date in local time
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth()+1).padStart(2,'0')}-${String(cutoff.getDate()).padStart(2,'0')}`;
  const records = db.prepare(`
    SELECT cr.checked_date, cr.checkin_type_id, cr.points_earned, cr.streak_bonus, ct.name, ct.icon
    FROM checkin_records cr
    JOIN checkin_types ct ON cr.checkin_type_id = ct.id
    WHERE cr.user_id = ? AND cr.checked_date >= ?
    ORDER BY cr.checked_date DESC
  `).all(req.user!.id, cutoffStr);
  res.json(records);
});

export default router;
