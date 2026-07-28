import Dexie, { Table } from 'dexie';

export interface LocalTask {
  id?: number;
  title: string;
  category: string;
  completed: boolean;
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}

export class AppDatabase extends Dexie {
  tasks!: Table<LocalTask>;

  constructor() {
    super('PwaAppDatabase');
    this.version(1).stores({
      tasks: '++id, title, category, completed, synced, createdAt, updatedAt',
    });
  }
}

export const db = new AppDatabase();
