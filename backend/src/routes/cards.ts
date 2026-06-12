import { Router, Response } from 'express';
import { getDb } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

type CardDef = { id: string; rarity: number; cost: number };

const PIKACHU_CARDS: CardDef[] = [
  { id: 'gen1-red-blue',           rarity: 1, cost: 100   },
  { id: 'gen1-yellow',             rarity: 1, cost: 100   },
  { id: 'gen2-gold',               rarity: 1, cost: 100   },
  { id: 'gen2-silver',             rarity: 1, cost: 100   },
  { id: 'gen2-crystal',            rarity: 1, cost: 100   },
  { id: 'gen3-ruby-sapphire',      rarity: 1, cost: 100   },
  { id: 'gen3-emerald',            rarity: 1, cost: 100   },
  { id: 'gen3-firered',            rarity: 1, cost: 100   },
  { id: 'gen4-diamond-pearl',      rarity: 1, cost: 100   },
  { id: 'gen4-platinum',           rarity: 1, cost: 100   },
  { id: 'gen5-black-white',        rarity: 1, cost: 100   },
  { id: 'gen6-xy',                 rarity: 1, cost: 100   },
  { id: 'gen7-usun',               rarity: 1, cost: 100   },
  { id: 'gen8-bdsp',               rarity: 1, cost: 100   },
  { id: 'gen9-scarlet-violet',     rarity: 1, cost: 100   },
  { id: 'animated-bw',             rarity: 2, cost: 500   },
  { id: 'animated-bw-female',      rarity: 2, cost: 500   },
  { id: 'animated-bw-shiny',       rarity: 2, cost: 500   },
  { id: 'showdown',                rarity: 2, cost: 500   },
  { id: 'showdown-female',         rarity: 2, cost: 500   },
  { id: 'showdown-shiny',          rarity: 2, cost: 500   },
  { id: 'home',                    rarity: 3, cost: 1500  },
  { id: 'home-female',             rarity: 3, cost: 1500  },
  { id: 'home-shiny',              rarity: 3, cost: 1500  },
  { id: 'home-shiny-female',       rarity: 3, cost: 1500  },
  { id: 'official-artwork',        rarity: 4, cost: 5000  },
  { id: 'official-artwork-shiny',  rarity: 4, cost: 5000  },
  { id: 'gen6-oras-shiny',         rarity: 4, cost: 5000  },
  { id: 'dream-world',             rarity: 5, cost: 10000 },
];

const CHARMANDER_CARDS: CardDef[] = [
  { id: 'char-gen1-red-blue',           rarity: 1, cost: 100   },
  { id: 'char-gen1-yellow',             rarity: 1, cost: 100   },
  { id: 'char-gen2-gold',               rarity: 1, cost: 100   },
  { id: 'char-gen2-silver',             rarity: 1, cost: 100   },
  { id: 'char-gen2-crystal',            rarity: 1, cost: 100   },
  { id: 'char-gen3-ruby-sapphire',      rarity: 1, cost: 100   },
  { id: 'char-gen3-emerald',            rarity: 1, cost: 100   },
  { id: 'char-gen3-firered',            rarity: 1, cost: 100   },
  { id: 'char-gen4-diamond-pearl',      rarity: 1, cost: 100   },
  { id: 'char-gen4-platinum',           rarity: 1, cost: 100   },
  { id: 'char-gen5-black-white',        rarity: 1, cost: 100   },
  { id: 'char-gen6-xy',                 rarity: 1, cost: 100   },
  { id: 'char-gen7-usun',               rarity: 1, cost: 100   },
  { id: 'char-gen8-bdsp',               rarity: 1, cost: 100   },
  { id: 'char-gen9-scarlet-violet',     rarity: 1, cost: 100   },
  { id: 'char-animated-bw',             rarity: 2, cost: 500   },
  { id: 'char-animated-bw-shiny',       rarity: 2, cost: 500   },
  { id: 'char-showdown',                rarity: 2, cost: 500   },
  { id: 'char-showdown-shiny',          rarity: 2, cost: 500   },
  { id: 'char-home',                    rarity: 3, cost: 1500  },
  { id: 'char-home-shiny',              rarity: 3, cost: 1500  },
  { id: 'char-official-artwork',        rarity: 4, cost: 5000  },
  { id: 'char-official-artwork-shiny',  rarity: 4, cost: 5000  },
  { id: 'char-gen6-oras-shiny',         rarity: 4, cost: 5000  },
  { id: 'char-dream-world',             rarity: 5, cost: 10000 },
];

const SQUIRTLE_CARDS: CardDef[] = [
  { id: 'squi-gen1-red-blue',           rarity: 1, cost: 100   },
  { id: 'squi-gen1-yellow',             rarity: 1, cost: 100   },
  { id: 'squi-gen2-gold',               rarity: 1, cost: 100   },
  { id: 'squi-gen2-silver',             rarity: 1, cost: 100   },
  { id: 'squi-gen2-crystal',            rarity: 1, cost: 100   },
  { id: 'squi-gen3-ruby-sapphire',      rarity: 1, cost: 100   },
  { id: 'squi-gen3-emerald',            rarity: 1, cost: 100   },
  { id: 'squi-gen3-firered',            rarity: 1, cost: 100   },
  { id: 'squi-gen4-diamond-pearl',      rarity: 1, cost: 100   },
  { id: 'squi-gen4-platinum',           rarity: 1, cost: 100   },
  { id: 'squi-gen5-black-white',        rarity: 1, cost: 100   },
  { id: 'squi-gen6-xy',                 rarity: 1, cost: 100   },
  { id: 'squi-gen7-usun',               rarity: 1, cost: 100   },
  { id: 'squi-gen8-bdsp',               rarity: 1, cost: 100   },
  { id: 'squi-gen9-scarlet-violet',     rarity: 1, cost: 100   },
  { id: 'squi-animated-bw',             rarity: 2, cost: 500   },
  { id: 'squi-animated-bw-shiny',       rarity: 2, cost: 500   },
  { id: 'squi-showdown',                rarity: 2, cost: 500   },
  { id: 'squi-showdown-shiny',          rarity: 2, cost: 500   },
  { id: 'squi-home',                    rarity: 3, cost: 1500  },
  { id: 'squi-home-shiny',              rarity: 3, cost: 1500  },
  { id: 'squi-official-artwork',        rarity: 4, cost: 5000  },
  { id: 'squi-official-artwork-shiny',  rarity: 4, cost: 5000  },
  { id: 'squi-gen6-oras-shiny',         rarity: 4, cost: 5000  },
  { id: 'squi-dream-world',             rarity: 5, cost: 10000 },
];

const BULBASAUR_CARDS: CardDef[] = [
  { id: 'bulba-gen1-red-blue',   rarity: 1, cost: 100   },
  { id: 'bulba-gen1-yellow',     rarity: 1, cost: 100   },
  { id: 'bulba-gen2-gold',       rarity: 1, cost: 100   },
  { id: 'bulba-gen2-silver',     rarity: 1, cost: 100   },
  { id: 'bulba-gen2-crystal',    rarity: 1, cost: 100   },
  { id: 'bulba-gen3-rs',         rarity: 1, cost: 100   },
  { id: 'bulba-gen3-emerald',    rarity: 1, cost: 100   },
  { id: 'bulba-gen3-frlg',       rarity: 1, cost: 100   },
  { id: 'bulba-gen4-dp',         rarity: 1, cost: 100   },
  { id: 'bulba-gen4-pt',         rarity: 1, cost: 100   },
  { id: 'bulba-gen5-bw',         rarity: 1, cost: 100   },
  { id: 'bulba-gen6-xy',         rarity: 1, cost: 100   },
  { id: 'bulba-gen7-usum',       rarity: 1, cost: 100   },
  { id: 'bulba-gen8-bdsp',       rarity: 1, cost: 100   },
  { id: 'bulba-gen9-sv',         rarity: 1, cost: 100   },
  { id: 'bulba-anim-bw',         rarity: 2, cost: 500   },
  { id: 'bulba-anim-bw-shiny',   rarity: 2, cost: 500   },
  { id: 'bulba-showdown',        rarity: 2, cost: 500   },
  { id: 'bulba-showdown-shiny',  rarity: 2, cost: 500   },
  { id: 'bulba-home',            rarity: 3, cost: 1500  },
  { id: 'bulba-home-shiny',      rarity: 3, cost: 1500  },
  { id: 'bulba-artwork',         rarity: 4, cost: 5000  },
  { id: 'bulba-artwork-shiny',   rarity: 4, cost: 5000  },
  { id: 'bulba-oras-shiny',      rarity: 4, cost: 5000  },
  { id: 'bulba-dreamworld',      rarity: 5, cost: 10000 },
];

const CHARIZARD_CARDS: CardDef[] = [
  { id: 'char6-gen1-red-blue',   rarity: 1, cost: 100   },
  { id: 'char6-gen1-yellow',     rarity: 1, cost: 100   },
  { id: 'char6-gen2-gold',       rarity: 1, cost: 100   },
  { id: 'char6-gen2-silver',     rarity: 1, cost: 100   },
  { id: 'char6-gen2-crystal',    rarity: 1, cost: 100   },
  { id: 'char6-gen3-rs',         rarity: 1, cost: 100   },
  { id: 'char6-gen3-emerald',    rarity: 1, cost: 100   },
  { id: 'char6-gen3-frlg',       rarity: 1, cost: 100   },
  { id: 'char6-gen4-dp',         rarity: 1, cost: 100   },
  { id: 'char6-gen4-pt',         rarity: 1, cost: 100   },
  { id: 'char6-gen5-bw',         rarity: 1, cost: 100   },
  { id: 'char6-gen6-xy',         rarity: 1, cost: 100   },
  { id: 'char6-gen7-usum',       rarity: 1, cost: 100   },
  { id: 'char6-gen8-bdsp',       rarity: 1, cost: 100   },
  { id: 'char6-gen9-sv',         rarity: 1, cost: 100   },
  { id: 'char6-anim-bw',         rarity: 2, cost: 500   },
  { id: 'char6-anim-bw-shiny',   rarity: 2, cost: 500   },
  { id: 'char6-showdown',        rarity: 2, cost: 500   },
  { id: 'char6-showdown-shiny',  rarity: 2, cost: 500   },
  { id: 'char6-home',            rarity: 3, cost: 1500  },
  { id: 'char6-home-shiny',      rarity: 3, cost: 1500  },
  { id: 'char6-artwork',         rarity: 4, cost: 5000  },
  { id: 'char6-artwork-shiny',   rarity: 4, cost: 5000  },
  { id: 'char6-oras-shiny',      rarity: 4, cost: 5000  },
  { id: 'char6-dreamworld',      rarity: 5, cost: 10000 },
];

const MEOWTH_CARDS: CardDef[] = [
  { id: 'meowth-gen1-red-blue',  rarity: 1, cost: 100   },
  { id: 'meowth-gen1-yellow',    rarity: 1, cost: 100   },
  { id: 'meowth-gen2-gold',      rarity: 1, cost: 100   },
  { id: 'meowth-gen2-silver',    rarity: 1, cost: 100   },
  { id: 'meowth-gen2-crystal',   rarity: 1, cost: 100   },
  { id: 'meowth-gen3-rs',        rarity: 1, cost: 100   },
  { id: 'meowth-gen3-emerald',   rarity: 1, cost: 100   },
  { id: 'meowth-gen3-frlg',      rarity: 1, cost: 100   },
  { id: 'meowth-gen4-dp',        rarity: 1, cost: 100   },
  { id: 'meowth-gen4-pt',        rarity: 1, cost: 100   },
  { id: 'meowth-gen5-bw',        rarity: 1, cost: 100   },
  { id: 'meowth-gen6-xy',        rarity: 1, cost: 100   },
  { id: 'meowth-gen7-usum',      rarity: 1, cost: 100   },
  { id: 'meowth-gen8-bdsp',      rarity: 1, cost: 100   },
  { id: 'meowth-gen9-sv',        rarity: 1, cost: 100   },
  { id: 'meowth-anim-bw',        rarity: 2, cost: 500   },
  { id: 'meowth-anim-bw-shiny',  rarity: 2, cost: 500   },
  { id: 'meowth-showdown',       rarity: 2, cost: 500   },
  { id: 'meowth-showdown-shiny', rarity: 2, cost: 500   },
  { id: 'meowth-home',           rarity: 3, cost: 1500  },
  { id: 'meowth-home-shiny',     rarity: 3, cost: 1500  },
  { id: 'meowth-artwork',        rarity: 4, cost: 5000  },
  { id: 'meowth-artwork-shiny',  rarity: 4, cost: 5000  },
  { id: 'meowth-oras-shiny',     rarity: 4, cost: 5000  },
  { id: 'meowth-dreamworld',     rarity: 5, cost: 10000 },
];

const EEVEE_CARDS: CardDef[] = [
  { id: 'eevee-gen1-red-blue',   rarity: 1, cost: 100   },
  { id: 'eevee-gen1-yellow',     rarity: 1, cost: 100   },
  { id: 'eevee-gen2-gold',       rarity: 1, cost: 100   },
  { id: 'eevee-gen2-silver',     rarity: 1, cost: 100   },
  { id: 'eevee-gen2-crystal',    rarity: 1, cost: 100   },
  { id: 'eevee-gen3-rs',         rarity: 1, cost: 100   },
  { id: 'eevee-gen3-emerald',    rarity: 1, cost: 100   },
  { id: 'eevee-gen3-frlg',       rarity: 1, cost: 100   },
  { id: 'eevee-gen4-dp',         rarity: 1, cost: 100   },
  { id: 'eevee-gen4-pt',         rarity: 1, cost: 100   },
  { id: 'eevee-gen5-bw',         rarity: 1, cost: 100   },
  { id: 'eevee-gen6-xy',         rarity: 1, cost: 100   },
  { id: 'eevee-gen7-usum',       rarity: 1, cost: 100   },
  { id: 'eevee-gen8-bdsp',       rarity: 1, cost: 100   },
  { id: 'eevee-gen9-sv',         rarity: 1, cost: 100   },
  { id: 'eevee-anim-bw',         rarity: 2, cost: 500   },
  { id: 'eevee-anim-bw-shiny',   rarity: 2, cost: 500   },
  { id: 'eevee-showdown',        rarity: 2, cost: 500   },
  { id: 'eevee-showdown-shiny',  rarity: 2, cost: 500   },
  { id: 'eevee-home',            rarity: 3, cost: 1500  },
  { id: 'eevee-home-female',     rarity: 3, cost: 1500  },
  { id: 'eevee-home-shiny',      rarity: 3, cost: 1500  },
  { id: 'eevee-home-shiny-f',    rarity: 3, cost: 1500  },
  { id: 'eevee-artwork',         rarity: 4, cost: 5000  },
  { id: 'eevee-artwork-shiny',   rarity: 4, cost: 5000  },
  { id: 'eevee-oras-shiny',      rarity: 4, cost: 5000  },
  { id: 'eevee-dreamworld',      rarity: 5, cost: 10000 },
];

const SNORLAX_CARDS: CardDef[] = [
  { id: 'snorlax-gen1-red-blue',  rarity: 1, cost: 100   },
  { id: 'snorlax-gen1-yellow',    rarity: 1, cost: 100   },
  { id: 'snorlax-gen2-gold',      rarity: 1, cost: 100   },
  { id: 'snorlax-gen2-silver',    rarity: 1, cost: 100   },
  { id: 'snorlax-gen2-crystal',   rarity: 1, cost: 100   },
  { id: 'snorlax-gen3-rs',        rarity: 1, cost: 100   },
  { id: 'snorlax-gen3-emerald',   rarity: 1, cost: 100   },
  { id: 'snorlax-gen3-frlg',      rarity: 1, cost: 100   },
  { id: 'snorlax-gen4-dp',        rarity: 1, cost: 100   },
  { id: 'snorlax-gen4-pt',        rarity: 1, cost: 100   },
  { id: 'snorlax-gen5-bw',        rarity: 1, cost: 100   },
  { id: 'snorlax-gen6-xy',        rarity: 1, cost: 100   },
  { id: 'snorlax-gen7-usum',      rarity: 1, cost: 100   },
  { id: 'snorlax-gen8-bdsp',      rarity: 1, cost: 100   },
  { id: 'snorlax-gen9-sv',        rarity: 1, cost: 100   },
  { id: 'snorlax-anim-bw',        rarity: 2, cost: 500   },
  { id: 'snorlax-anim-bw-shiny',  rarity: 2, cost: 500   },
  { id: 'snorlax-showdown',       rarity: 2, cost: 500   },
  { id: 'snorlax-showdown-shiny', rarity: 2, cost: 500   },
  { id: 'snorlax-home',           rarity: 3, cost: 1500  },
  { id: 'snorlax-home-shiny',     rarity: 3, cost: 1500  },
  { id: 'snorlax-artwork',        rarity: 4, cost: 5000  },
  { id: 'snorlax-artwork-shiny',  rarity: 4, cost: 5000  },
  { id: 'snorlax-oras-shiny',     rarity: 4, cost: 5000  },
  { id: 'snorlax-dreamworld',     rarity: 5, cost: 10000 },
];

const ALL_CARD_POOLS: Record<string, CardDef[]> = {
  pikachu:    PIKACHU_CARDS,
  charmander: CHARMANDER_CARDS,
  squirtle:   SQUIRTLE_CARDS,
  bulbasaur:  BULBASAUR_CARDS,
  charizard:  CHARIZARD_CARDS,
  meowth:     MEOWTH_CARDS,
  eevee:      EEVEE_CARDS,
  snorlax:    SNORLAX_CARDS,
};

function buildRarityMap(cards: CardDef[]) {
  const m = new Map<number, CardDef[]>();
  for (const c of cards) {
    if (!m.has(c.rarity)) m.set(c.rarity, []);
    m.get(c.rarity)!.push(c);
  }
  return m;
}

const RARITY_MAPS: Record<string, Map<number, CardDef[]>> = Object.fromEntries(
  Object.entries(ALL_CARD_POOLS).map(([k, v]) => [k, buildRarityMap(v)])
);

// GET /api/v1/cards/mine?pet_type=pikachu
router.get('/mine', (req: AuthRequest, res: Response) => {
  const db = getDb();
  const petType = (req.query.pet_type as string) || 'pikachu';
  const rows = db.prepare(
    'SELECT card_id, count, fragments, obtained_at FROM user_cards WHERE user_id = ? AND pet_type = ?'
  ).all(req.user!.id, petType) as any[];
  res.json(rows);
});

// POST /api/v1/cards/draw  body: { rarity, pet_type }
router.post('/draw', (req: AuthRequest, res: Response) => {
  const { rarity, pet_type = 'pikachu' } = req.body as { rarity: number; pet_type?: string };
  const db = getDb();

  const rarityMap = RARITY_MAPS[pet_type];
  if (!rarityMap) {
    return res.status(400).json({ error: '无效的宠物类型' });
  }

  const pool = rarityMap.get(rarity);
  if (!pool || pool.length === 0) {
    return res.status(400).json({ error: '无效的稀有度' });
  }

  const cost = pool[0].cost;
  const user = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!user || user.points < cost) {
    return res.status(400).json({ error: '积分不足' });
  }

  // Mood bonus: high mood gives extra chances at rare cards within the chosen rarity pool.
  // mood >= 80: 30% chance to upgrade to next rarity; mood >= 60: 15% chance.
  const activePetForMood = db.prepare(
    'SELECT mood FROM pets WHERE user_id = ? AND type = ? ORDER BY created_at ASC LIMIT 1'
  ).get(req.user!.id, pet_type) as any;
  const mood: number = activePetForMood?.mood ?? 0;

  let effectiveRarity = rarity;
  const maxRarity = Math.max(...Array.from(rarityMap.keys()));
  if (effectiveRarity < maxRarity) {
    const roll = Math.random();
    if (mood >= 80 && roll < 0.30) effectiveRarity = Math.min(effectiveRarity + 1, maxRarity);
    else if (mood >= 60 && roll < 0.15) effectiveRarity = Math.min(effectiveRarity + 1, maxRarity);
  }

  const effectivePool = rarityMap.get(effectiveRarity) ?? pool;
  const card = effectivePool[Math.floor(Math.random() * effectivePool.length)];

  const existing = db.prepare(
    'SELECT id, count FROM user_cards WHERE user_id = ? AND card_id = ? AND pet_type = ?'
  ).get(req.user!.id, card.id, pet_type) as any;

  const isNew = !existing;

  db.transaction(() => {
    db.prepare('UPDATE users SET points = points - ? WHERE id = ?').run(cost, req.user!.id);
    if (existing) {
      db.prepare(
        'UPDATE user_cards SET count = count + 1, fragments = fragments + 5 WHERE user_id = ? AND card_id = ? AND pet_type = ?'
      ).run(req.user!.id, card.id, pet_type);
    } else {
      db.prepare(
        'INSERT INTO user_cards (user_id, card_id, pet_type, count) VALUES (?, ?, ?, 1)'
      ).run(req.user!.id, card.id, pet_type);
    }
  })();

  const newPoints = (db.prepare('SELECT points FROM users WHERE id = ?').get(req.user!.id) as any).points;

  res.json({
    card_id: card.id,
    rarity: card.rarity,
    is_new: isNew,
    fragments_gained: isNew ? 0 : 5,
    remaining_points: newPoints,
    mood_bonus: effectiveRarity > rarity,
  });
});

export default router;
