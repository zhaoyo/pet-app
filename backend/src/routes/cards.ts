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

const CARD_POOLS: Record<string, CardDef[]> = {
  pikachu: PIKACHU_CARDS,
  charmander: CHARMANDER_CARDS,
  squirtle: SQUIRTLE_CARDS,
};

function buildRarityMap(cards: CardDef[]) {
  const m = new Map<number, CardDef[]>();
  for (const c of cards) {
    if (!m.has(c.rarity)) m.set(c.rarity, []);
    m.get(c.rarity)!.push(c);
  }
  return m;
}

const RARITY_MAPS: Record<string, Map<number, CardDef[]>> = {
  pikachu: buildRarityMap(PIKACHU_CARDS),
  charmander: buildRarityMap(CHARMANDER_CARDS),
  squirtle: buildRarityMap(SQUIRTLE_CARDS),
};

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

  const card = pool[Math.floor(Math.random() * pool.length)];

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
  });
});

export default router;
