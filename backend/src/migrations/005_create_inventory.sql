CREATE TABLE IF NOT EXISTS user_inventory (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id      INTEGER NOT NULL REFERENCES shop_items(id),
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_id)
);
