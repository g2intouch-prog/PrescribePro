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

export interface SavedPrescriptionRecord {
  id?: number;
  prescriptionId: string;
  patientRegNo: string;
  patientName: string;
  patientMobile: string;
  patientAge: string;
  patientGender: string;
  actionSource: 'print' | 'pdf' | 'whatsapp' | 'email' | 'manual_save';
  createdAt: string;
  vitalsJson: string;
  clinicalExamJson: string;
  selectedDrugsJson: string;
  selectedTestsJson: string;
  testResultsText: string;
  selectedAdviceJson: string;
  customAdviceText: string;
  selectedProceduresJson: string;
  doctorProfileJson: string;
  padMode: string;
  pageSize: string;
}

let dbInstance: Database | null = null;
const STORAGE_KEY = 'sqlite_pwa_db_binary';
const PRESCRIPTIONS_BACKUP_KEY = 'prescribepro_sqlite_prescriptions_backup_v1';

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

  // Ensure tables exist
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

    CREATE TABLE IF NOT EXISTS patient_prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prescription_id TEXT UNIQUE NOT NULL,
      patient_reg_no TEXT NOT NULL,
      patient_name TEXT NOT NULL,
      patient_mobile TEXT,
      patient_age TEXT,
      patient_gender TEXT,
      action_source TEXT,
      created_at TEXT,
      vitals_json TEXT,
      clinical_exam_json TEXT,
      selected_drugs_json TEXT,
      selected_tests_json TEXT,
      test_results_text TEXT,
      selected_advice_json TEXT,
      custom_advice_text TEXT,
      selected_procedures_json TEXT,
      doctor_profile_json TEXT,
      pad_mode TEXT,
      page_size TEXT
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

// ----------------------------------------------------
// SQLITE PRESCRIPTION PERSISTENCE & RETRIEVAL FUNCTIONS
// ----------------------------------------------------

export async function savePrescriptionToSqlite(rec: SavedPrescriptionRecord): Promise<void> {
  try {
    const db = await getSqliteDb();
    db.run(
      `INSERT OR REPLACE INTO patient_prescriptions (
        prescription_id, patient_reg_no, patient_name, patient_mobile, patient_age, patient_gender,
        action_source, created_at, vitals_json, clinical_exam_json, selected_drugs_json,
        selected_tests_json, test_results_text, selected_advice_json, custom_advice_text,
        selected_procedures_json, doctor_profile_json, pad_mode, page_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        rec.prescriptionId,
        rec.patientRegNo,
        rec.patientName,
        rec.patientMobile,
        rec.patientAge,
        rec.patientGender,
        rec.actionSource,
        rec.createdAt,
        rec.vitalsJson,
        rec.clinicalExamJson,
        rec.selectedDrugsJson,
        rec.selectedTestsJson,
        rec.testResultsText,
        rec.selectedAdviceJson,
        rec.customAdviceText,
        rec.selectedProceduresJson,
        rec.doctorProfileJson,
        rec.padMode,
        rec.pageSize,
      ]
    );
    saveSqliteDb();

    // Also mirror into backup key for high availability
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
      const filtered = existing.filter((p: any) => p.prescriptionId !== rec.prescriptionId);
      localStorage.setItem(PRESCRIPTIONS_BACKUP_KEY, JSON.stringify([rec, ...filtered]));
    }
  } catch (err) {
    console.error('Failed to save prescription to SQLite:', err);
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
      const filtered = existing.filter((p: any) => p.prescriptionId !== rec.prescriptionId);
      localStorage.setItem(PRESCRIPTIONS_BACKUP_KEY, JSON.stringify([rec, ...filtered]));
    }
  }
}

export async function getAllPrescriptionsFromSqlite(): Promise<SavedPrescriptionRecord[]> {
  try {
    const db = await getSqliteDb();
    const res = db.exec(`SELECT * FROM patient_prescriptions ORDER BY id DESC`);
    let sqliteResults: SavedPrescriptionRecord[] = [];
    if (res.length > 0) {
      const columns = res[0].columns;
      const values = res[0].values;
      sqliteResults = values.map((row) => {
        const obj: any = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return {
          id: obj.id,
          prescriptionId: obj.prescription_id,
          patientRegNo: obj.patient_reg_no,
          patientName: obj.patient_name,
          patientMobile: obj.patient_mobile,
          patientAge: obj.patient_age,
          patientGender: obj.patient_gender,
          actionSource: obj.action_source,
          createdAt: obj.created_at,
          vitalsJson: obj.vitals_json,
          clinicalExamJson: obj.clinical_exam_json,
          selectedDrugsJson: obj.selected_drugs_json,
          selectedTestsJson: obj.selected_tests_json,
          testResultsText: obj.test_results_text,
          selectedAdviceJson: obj.selected_advice_json,
          customAdviceText: obj.custom_advice_text,
          selectedProceduresJson: obj.selected_procedures_json,
          doctorProfileJson: obj.doctor_profile_json,
          padMode: obj.pad_mode,
          pageSize: obj.page_size,
        };
      });
    }

    let backupResults: SavedPrescriptionRecord[] = [];
    if (typeof window !== 'undefined') {
      backupResults = JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
    }

    const map = new Map<string, SavedPrescriptionRecord>();
    [...sqliteResults, ...backupResults].forEach((item) => {
      if (item && item.prescriptionId && !map.has(item.prescriptionId)) map.set(item.prescriptionId, item);
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
    }
    return [];
  }
}

export async function getPatientPrescriptionsFromSqlite(queryKey: string): Promise<SavedPrescriptionRecord[]> {
  const q = queryKey.trim().toLowerCase();
  if (!q) return getAllPrescriptionsFromSqlite();

  try {
    const db = await getSqliteDb();
    const res = db.exec(
      `SELECT * FROM patient_prescriptions 
       WHERE LOWER(patient_reg_no) = LOWER(?) OR LOWER(patient_mobile) = LOWER(?) OR LOWER(patient_name) LIKE LOWER(?)
       ORDER BY id DESC`,
      [q, q, `%${q}%`]
    );

    let sqliteResults: SavedPrescriptionRecord[] = [];
    if (res.length > 0) {
      const columns = res[0].columns;
      const values = res[0].values;
      sqliteResults = values.map((row) => {
        const obj: any = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return {
          id: obj.id,
          prescriptionId: obj.prescription_id,
          patientRegNo: obj.patient_reg_no,
          patientName: obj.patient_name,
          patientMobile: obj.patient_mobile,
          patientAge: obj.patient_age,
          patientGender: obj.patient_gender,
          actionSource: obj.action_source,
          createdAt: obj.created_at,
          vitalsJson: obj.vitals_json,
          clinicalExamJson: obj.clinical_exam_json,
          selectedDrugsJson: obj.selected_drugs_json,
          selectedTestsJson: obj.selected_tests_json,
          testResultsText: obj.test_results_text,
          selectedAdviceJson: obj.selected_advice_json,
          customAdviceText: obj.custom_advice_text,
          selectedProceduresJson: obj.selected_procedures_json,
          doctorProfileJson: obj.doctor_profile_json,
          padMode: obj.pad_mode,
          pageSize: obj.page_size,
        };
      });
    }

    // Backup check
    let backupResults: SavedPrescriptionRecord[] = [];
    if (typeof window !== 'undefined') {
      const backup = JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
      backupResults = backup.filter(
        (p: SavedPrescriptionRecord) =>
          p.patientRegNo.toLowerCase() === q ||
          p.patientMobile.toLowerCase() === q ||
          p.patientName.toLowerCase().includes(q)
      );
    }

    // Merge and deduplicate by prescriptionId
    const map = new Map<string, SavedPrescriptionRecord>();
    [...sqliteResults, ...backupResults].forEach((item) => {
      if (!map.has(item.prescriptionId)) map.set(item.prescriptionId, item);
    });

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error('Error fetching SQLite prescriptions:', err);
    if (typeof window !== 'undefined') {
      const backup = JSON.parse(localStorage.getItem(PRESCRIPTIONS_BACKUP_KEY) || '[]');
      return backup.filter(
        (p: SavedPrescriptionRecord) =>
          p.patientRegNo.toLowerCase() === q ||
          p.patientMobile.toLowerCase() === q ||
          p.patientName.toLowerCase().includes(q)
      );
    }
    return [];
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
