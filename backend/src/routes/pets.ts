import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();
router.use(authMiddleware);

// Get all pets for current user
router.get('/', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pets = db.prepare('SELECT * FROM pets WHERE user_id = ? ORDER BY created_at ASC')
    .all(req.user!.id);
  res.json(pets);
});

// Create pet
router.post('/', (req: AuthRequest, res: Response) => {
  const { name, type } = req.body;
  const validTypes = ['pikachu', 'charmander', 'squirtle'];
  if (!name || !type) {
    res.status(400).json({ error: '宠物名字和类型不能为空' });
    return;
  }
  if (!validTypes.includes(type)) {
    res.status(400).json({ error: '无效的宠物类型' });
    return;
  }

  const db = getDb();

  const { count } = db.prepare('SELECT COUNT(*) as count FROM pets WHERE user_id = ?')
    .get(req.user!.id) as { count: number };

  if (count >= 3) {
    const user = db.prepare('SELECT pet_eggs FROM users WHERE id = ?').get(req.user!.id) as any;
    if (!user || user.pet_eggs <= 0) {
      res.status(403).json({ error: '已达到免费宠物上限，需要宠物蛋才能领养更多宠物' });
      return;
    }
    db.prepare('UPDATE users SET pet_eggs = pet_eggs - 1 WHERE id = ?').run(req.user!.id);
  }

  const result = db.prepare(
    'INSERT INTO pets (user_id, name, type) VALUES (?, ?, ?)'
  ).run(req.user!.id, name, type);

  const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(pet);
});

// Get single pet with equipment
router.get('/:id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT * FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id) as any;
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  // Lazy mood decay: 2 points per hour of inactivity
  const now = Date.now();
  const lastUpdate = pet.last_mood_update ? new Date(pet.last_mood_update).getTime() : now;
  const hoursElapsed = (now - lastUpdate) / 3600000;
  const moodLoss = Math.floor(hoursElapsed * 2);
  if (moodLoss > 0) {
    const newMood = Math.max(0, pet.mood - moodLoss);
    db.prepare('UPDATE pets SET mood = ?, last_mood_update = ? WHERE id = ?')
      .run(newMood, new Date().toISOString(), pet.id);
    pet.mood = newMood;
  }

  const equipment = db.prepare(`
    SELECT pe.slot, si.*
    FROM pet_equipment pe
    JOIN shop_items si ON pe.item_id = si.id
    WHERE pe.pet_id = ?
  `).all(pet.id);

  const courses = db.prepare(`
    SELECT c.* FROM pet_courses pc
    JOIN courses c ON pc.course_id = c.id
    WHERE pc.pet_id = ?
  `).all(pet.id);

  res.json({ ...pet, equipment, courses });
});

// Boost pet mood (called after checkin or interaction)
router.patch('/:id/mood', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id, mood FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id) as any;
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const amount = Number(req.body.amount) || 0;
  db.prepare('UPDATE pets SET mood = MIN(100, MAX(0, mood + ?)), last_mood_update = ? WHERE id = ?')
    .run(amount, new Date().toISOString(), pet.id);

  const updated = db.prepare('SELECT mood FROM pets WHERE id = ?').get(pet.id) as any;
  res.json({ success: true, mood: updated.mood });
});

// Update pet name
router.put('/:id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const { name } = req.body;
  if (!name) { res.status(400).json({ error: '名字不能为空' }); return; }
  db.prepare('UPDATE pets SET name = ? WHERE id = ?').run(name, req.params.id);
  res.json({ success: true });
});

// Delete pet
router.delete('/:id', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }
  db.prepare('DELETE FROM pets WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Upload pet avatar
router.post('/:id/avatar', upload.single('avatar'), (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }
  if (!req.file) { res.status(400).json({ error: '请上传图片' }); return; }

  const avatarUrl = `/uploads/${req.file.filename}`;
  db.prepare('UPDATE pets SET avatar_url = ? WHERE id = ?').run(avatarUrl, req.params.id);
  res.json({ avatar_url: avatarUrl });
});

// Equip / unequip item
router.put('/:id/equip', (req: AuthRequest, res: Response) => {
  const { slot, item_id } = req.body;
  const validSlots = ['hat', 'glasses', 'top', 'bottom', 'shoes', 'jewelry', 'bag', 'flower'];
  if (!slot || !validSlots.includes(slot)) {
    res.status(400).json({ error: '无效的装备槽位' });
    return;
  }

  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  if (item_id === null || item_id === undefined) {
    db.prepare('DELETE FROM pet_equipment WHERE pet_id = ? AND slot = ?').run(req.params.id, slot);
    res.json({ success: true, slot, item_id: null });
    return;
  }

  // Check ownership
  const owned = db.prepare(
    'SELECT id FROM user_inventory WHERE user_id = ? AND item_id = ?'
  ).get(req.user!.id, item_id);
  if (!owned) {
    res.status(403).json({ error: '你没有这件物品' });
    return;
  }

  db.prepare(`
    INSERT INTO pet_equipment (pet_id, slot, item_id) VALUES (?, ?, ?)
    ON CONFLICT(pet_id, slot) DO UPDATE SET item_id = excluded.item_id
  `).run(req.params.id, slot, item_id);
  res.json({ success: true, slot, item_id });
});

// Update display card
router.patch('/:id/display-card', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const { card_id } = req.body;

  if (card_id !== null) {
    const owned = db.prepare('SELECT 1 FROM user_cards WHERE user_id = ? AND card_id = ?')
      .get(req.user!.id, card_id);
    if (!owned) { res.status(403).json({ error: '你还没有这张卡片' }); return; }
  }

  db.prepare('UPDATE pets SET display_card_id = ? WHERE id = ?').run(card_id ?? null, req.params.id);
  res.json({ success: true, display_card_id: card_id ?? null });
});

// Get equipment state
router.get('/:id/equipment', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id);
  if (!pet) { res.status(404).json({ error: '宠物不存在' }); return; }

  const equipment = db.prepare(`
    SELECT pe.slot, si.*
    FROM pet_equipment pe
    JOIN shop_items si ON pe.item_id = si.id
    WHERE pe.pet_id = ?
  `).all(req.params.id);
  res.json(equipment);
});

export default router;
