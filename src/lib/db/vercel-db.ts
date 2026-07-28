import { sql } from '@vercel/postgres';

export async function initVercelDb() {
  try {
    if (!process.env.POSTGRES_URL) {
      console.warn('Vercel Postgres URL not configured. Using local Dexie IndexedDB mode.');
      return { success: false, reason: 'POSTGRES_URL not set' };
    }

    await sql`
      CREATE TABLE IF NOT EXISTS pwa_tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return { success: true };
  } catch (error) {
    console.error('Error initializing Vercel Postgres DB:', error);
    return { success: false, error };
  }
}

export async function fetchServerTasks() {
  try {
    if (!process.env.POSTGRES_URL) return [];
    const { rows } = await sql`SELECT * FROM pwa_tasks ORDER BY created_at DESC;`;
    return rows;
  } catch (error) {
    console.error('Error fetching Vercel DB tasks:', error);
    return [];
  }
}
