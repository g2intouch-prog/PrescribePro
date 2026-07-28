import initSqlJs, { Database } from 'sql.js';

export interface SqliteTask {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}

let dbInstance: Database | null = null;
const STORAGE_KEY = 'sqlite_pwa_db_binary';

export async function getSqliteDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  // Initialize sql.js WASM
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  // Try loading saved SQLite database binary from local storage
  const savedData = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  
  if (savedData) {
    try {
      const uInt8Array = new Uint8Array(JSON.parse(savedData));
      dbInstance = new SQL.Database(uInt8Array);
    } catch (e) {
      console.warn('Failed to parse saved SQLite DB binary, initializing new DB', e);
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
  }

  // Ensure table exists
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS pwa_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT DEFAULT 'General',
      completed INTEGER DEFAULT 0,
      synced INTEGER DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    );
  `);

  saveSqliteDb();
  return dbInstance;
}

function saveSqliteDb() {
  if (!dbInstance || typeof window === 'undefined') return;
  try {
    const data = dbInstance.export();
    const array = Array.from(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
  } catch (err) {
    console.error('Error saving SQLite database binary locally:', err);
  }
}

export async function getSqliteTasks(): Promise<SqliteTask[]> {
  const db = await getSqliteDb();
  const res = db.exec('SELECT * FROM pwa_tasks ORDER BY id DESC');
  
  if (res.length === 0) return [];
  
  const columns = res[0].columns;
  const values = res[0].values;

  return values.map((row) => {
    const obj: any = {};
    columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });
    return {
      id: obj.id,
      title: obj.title,
      category: obj.category,
      completed: Boolean(obj.completed),
      synced: Boolean(obj.synced),
      createdAt: obj.created_at || new Date().toISOString(),
      updatedAt: obj.updated_at || new Date().toISOString(),
    };
  });
}

export async function addSqliteTask(title: string, category: string, isOnline: boolean): Promise<void> {
  const db = await getSqliteDb();
  const now = new Date().toISOString();
  db.run(
    'INSERT INTO pwa_tasks (title, category, completed, synced, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [title, category, 0, isOnline ? 1 : 0, now, now]
  );
  saveSqliteDb();
}

export async function toggleSqliteTask(id: number, currentCompleted: boolean): Promise<void> {
  const db = await getSqliteDb();
  const now = new Date().toISOString();
  db.run(
    'UPDATE pwa_tasks SET completed = ?, updated_at = ? WHERE id = ?',
    [currentCompleted ? 0 : 1, now, id]
  );
  saveSqliteDb();
}

export async function deleteSqliteTask(id: number): Promise<void> {
  const db = await getSqliteDb();
  db.run('DELETE FROM pwa_tasks WHERE id = ?', [id]);
  saveSqliteDb();
}

export async function markSqliteTasksSynced(): Promise<void> {
  const db = await getSqliteDb();
  db.run('UPDATE pwa_tasks SET synced = 1');
  saveSqliteDb();
}
