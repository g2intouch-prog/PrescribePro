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
    syncSqliteToConnectedFolder();
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
    await syncSqliteToConnectedFolder();

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

export async function downloadSqliteBackupFile(): Promise<void> {
  const db = await getSqliteDb();
  const binary = db.export();
  const blob = new Blob([binary.buffer as unknown as BlobPart], { type: 'application/x-sqlite3' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `PrescribePro_Clinic_Backup_${new Date().toISOString().slice(0, 10)}.sqlite`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importSqliteBackupFile(file: File): Promise<void> {
  const arrayBuffer = await file.arrayBuffer();
  const uInt8Array = new Uint8Array(arrayBuffer);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(uInt8Array)));
  }
  window.location.reload();
}

// ----------------------------------------------------
// HARD DRIVE FOLDER AUTO-SYNC & GITHUB UPDATE CHECKER
// ----------------------------------------------------

// ----------------------------------------------------
// HARD DRIVE FOLDER AUTO-SYNC & INDEXEDDB HANDLE PERSISTENCE
// ----------------------------------------------------

let dirHandleInstance: any = null;

export async function saveDirHandleToIndexedDB(handle: any): Promise<void> {
  if (typeof window === 'undefined') return;
  return new Promise((resolve) => {
    const req = indexedDB.open('prescribepro_fs_db', 1);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('handles')) {
        db.createObjectStore('handles');
      }
    };
    req.onsuccess = (e: any) => {
      const db = e.target.result;
      const tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, 'connectedDirHandle');
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    };
    req.onerror = () => resolve();
  });
}

export async function getDirHandleFromIndexedDB(): Promise<any> {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    const req = indexedDB.open('prescribepro_fs_db', 1);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('handles')) {
        db.createObjectStore('handles');
      }
    };
    req.onsuccess = (e: any) => {
      const db = e.target.result;
      const tx = db.transaction('handles', 'readonly');
      const getReq = tx.objectStore('handles').get('connectedDirHandle');
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => resolve(null);
    };
    req.onerror = () => resolve(null);
  });
}

export async function clearDirHandleFromIndexedDB(): Promise<void> {
  if (typeof window === 'undefined') return;
  return new Promise((resolve) => {
    const req = indexedDB.open('prescribepro_fs_db', 1);
    req.onsuccess = (e: any) => {
      const db = e.target.result;
      if (db.objectStoreNames.contains('handles')) {
        const tx = db.transaction('handles', 'readwrite');
        tx.objectStore('handles').delete('connectedDirHandle');
        tx.oncomplete = () => resolve();
      } else {
        resolve();
      }
    };
    req.onerror = () => resolve();
  });
}

export async function restoreConnectedFolderHandle(): Promise<{ folderName: string | null; active: boolean }> {
  if (typeof window === 'undefined') return { folderName: null, active: false };
  try {
    const handle = await getDirHandleFromIndexedDB();
    if (handle) {
      let perm = await handle.queryPermission({ mode: 'readwrite' });
      if (perm !== 'granted') {
        try {
          perm = await handle.requestPermission({ mode: 'readwrite' });
        } catch (e) {
          // May require direct user click gesture
        }
      }

      if (perm === 'granted') {
        dirHandleInstance = handle;
        const name = handle.name || 'Connected Folder';
        localStorage.setItem('prescribepro_connected_folder_name', name);
        await syncSqliteToConnectedFolder();
        return { folderName: name, active: true };
      } else {
        const name = localStorage.getItem('prescribepro_connected_folder_name') || handle.name;
        return { folderName: name, active: false };
      }
    }
  } catch (e) {
    console.warn('Error restoring connected folder handle:', e);
  }
  const name = localStorage.getItem('prescribepro_connected_folder_name');
  return { folderName: name, active: false };
}

export async function connectLocalHardDriveFolder(): Promise<{ folderName: string | null; success: boolean; error?: string }> {
  if (typeof window === 'undefined' || !('showDirectoryPicker' in window)) {
    alert('File System Access API is supported in Chrome, Edge, and Brave desktop browsers.');
    return { folderName: null, success: false, error: 'File System Access API not supported' };
  }
  try {
    const handle = await (window as any).showDirectoryPicker({
      mode: 'readwrite',
    });
    dirHandleInstance = handle;
    await saveDirHandleToIndexedDB(handle);
    const folderName = handle.name || 'Connected Folder';
    localStorage.setItem('prescribepro_connected_folder_name', folderName);
    
    // Perform immediate write while user gesture is active
    const syncRes = await syncSqliteToConnectedFolder();
    return { folderName, success: syncRes.success, error: syncRes.error };
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      console.error('Error connecting hard drive folder:', err);
    }
    return { folderName: null, success: false, error: err?.message || String(err) };
  }
}

export async function syncSqliteToConnectedFolder(): Promise<{ success: boolean; error?: string }> {
  if (!dirHandleInstance) return { success: false, error: 'No hard drive folder connected' };
  try {
    let perm = await dirHandleInstance.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      try {
        perm = await dirHandleInstance.requestPermission({ mode: 'readwrite' });
      } catch (e) {
        console.warn('Permission prompt error:', e);
      }
    }
    if (perm !== 'granted') {
      return { success: false, error: 'Folder permission not granted. Please click "Connect Folder" to re-authorize.' };
    }

    const db = await getSqliteDb();
    const binary = db.export();
    
    // Slice exact Uint8Array byte buffer from WASM linear memory
    const u8 = new Uint8Array(binary);
    const safeBuffer = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    const blob = new Blob([safeBuffer], { type: 'application/x-sqlite3' });

    const fileHandle = await dirHandleInstance.getFileHandle('prescribepro_database.sqlite', { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    console.log('✓ Successfully wrote prescribepro_database.sqlite to hard drive folder!');
    return { success: true };
  } catch (err: any) {
    console.error('Failed syncing SQLite to connected folder:', err);
    return { success: false, error: err?.message || String(err) };
  }
}

export async function saveSqliteDbWithFilePicker(): Promise<{ success: boolean; fileName?: string; error?: string }> {
  if (typeof window === 'undefined') return { success: false, error: 'Browser environment required' };
  try {
    const db = await getSqliteDb();
    const binary = db.export();
    const u8 = new Uint8Array(binary);
    const safeBuffer = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    const blob = new Blob([safeBuffer], { type: 'application/x-sqlite3' });

    if ('showSaveFilePicker' in window) {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: 'prescribepro_database.sqlite',
        types: [
          {
            description: 'SQLite Database File',
            accept: { 'application/x-sqlite3': ['.sqlite', '.db'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return { success: true, fileName: handle.name || 'prescribepro_database.sqlite' };
    } else {
      downloadSqliteBackupFile();
      return { success: true, fileName: 'prescribepro_database.sqlite (Downloaded)' };
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      console.error('File picker save error:', err);
      return { success: false, error: err?.message || String(err) };
    }
    return { success: false };
  }
}

export interface GitHubReleaseInfo {
  tagName: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  downloadUrl?: string;
  hasUpdate: boolean;
}

export async function checkForGitHubUpdates(currentVersion = '1.0.0'): Promise<GitHubReleaseInfo | null> {
  try {
    const res = await fetch('https://api.github.com/repos/g2intouch-prog/PrescribePro/releases/latest');
    if (!res.ok) return null;
    const data = await res.json();
    const latestTag = data.tag_name || data.name || 'v1.0.0';
    const cleanTag = latestTag.replace(/^v/, '');
    const hasUpdate = cleanTag !== currentVersion;
    
    let downloadUrl = data.html_url;
    if (data.assets && data.assets.length > 0) {
      const exeAsset = data.assets.find((a: any) => a.name.endsWith('.exe') || a.name.endsWith('.msi'));
      if (exeAsset) downloadUrl = exeAsset.browser_download_url;
    }

    return {
      tagName: latestTag,
      name: data.name || latestTag,
      publishedAt: data.published_at || '',
      htmlUrl: data.html_url,
      downloadUrl,
      hasUpdate,
    };
  } catch (e) {
    console.error('Failed checking for GitHub updates:', e);
    return null;
  }
}
