CREATE TABLE IF NOT EXISTS courses (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  icon          TEXT    NOT NULL DEFAULT '🎓',
  price         INTEGER NOT NULL,
  description   TEXT,
  animation_key TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS pet_courses (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  pet_id     INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  learned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(pet_id, course_id)
);
