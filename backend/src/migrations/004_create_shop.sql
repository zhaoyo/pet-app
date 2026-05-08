CREATE TABLE IF NOT EXISTS shop_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL,
  slot        TEXT,
  price       INTEGER NOT NULL,
  description TEXT,
  svg_data    TEXT,
  thumbnail   TEXT,
  is_active   INTEGER NOT NULL DEFAULT 1
);
