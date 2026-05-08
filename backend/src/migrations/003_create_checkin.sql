CREATE TABLE IF NOT EXISTS checkin_types (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  icon        TEXT    NOT NULL DEFAULT '📝',
  points      INTEGER NOT NULL DEFAULT 10,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS checkin_records (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  checkin_type_id INTEGER NOT NULL REFERENCES checkin_types(id),
  checked_date    DATE    NOT NULL,
  points_earned   INTEGER NOT NULL,
  streak_bonus    INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, checkin_type_id, checked_date)
);

CREATE TABLE IF NOT EXISTS user_streaks (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  checkin_type_id INTEGER NOT NULL REFERENCES checkin_types(id),
  current_streak  INTEGER NOT NULL DEFAULT 0,
  longest_streak  INTEGER NOT NULL DEFAULT 0,
  last_checkin    DATE,
  UNIQUE(user_id, checkin_type_id)
);
