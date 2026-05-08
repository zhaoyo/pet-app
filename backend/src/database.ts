import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Support Railway Volume: /data/pet.db, fallback to local ./pet.db
const DB_PATH = process.env.DATABASE_PATH || (
  process.env.NODE_ENV === 'production' ? '/data/pet.db' : './pet.db'
);

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    runMigrations();
  }
  return db;
}

function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      filename  TEXT NOT NULL UNIQUE,
      run_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  const applied = db.prepare('SELECT filename FROM migrations').all() as { filename: string }[];
  const appliedSet = new Set(applied.map(r => r.filename));

  for (const file of files) {
    if (!appliedSet.has(file)) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      try {
        db.exec(sql);
        db.prepare('INSERT INTO migrations (filename) VALUES (?)').run(file);
        console.log(`✅ Migration applied: ${file}`);
      } catch (err) {
        console.error(`❌ Migration failed: ${file}`, err);
        throw err;
      }
    }
  }
}

export default getDb;
