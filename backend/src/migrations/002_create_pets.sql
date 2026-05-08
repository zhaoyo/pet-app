CREATE TABLE IF NOT EXISTS pets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT    NOT NULL,
  type        TEXT    NOT NULL,
  avatar_url  TEXT,
  level       INTEGER NOT NULL DEFAULT 1,
  experience  INTEGER NOT NULL DEFAULT 0,
  mood        INTEGER NOT NULL DEFAULT 100,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pet_equipment (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  pet_id      INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  slot        TEXT    NOT NULL,
  item_id     INTEGER REFERENCES shop_items(id),
  UNIQUE(pet_id, slot)
);
