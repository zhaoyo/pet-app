CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  username    TEXT    NOT NULL UNIQUE,
  password    TEXT    NOT NULL,
  role        TEXT    NOT NULL DEFAULT 'user',
  points      INTEGER NOT NULL DEFAULT 0,
  avatar_url  TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
