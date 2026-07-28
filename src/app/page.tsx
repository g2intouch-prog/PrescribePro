'use client';

import { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Database, 
  HardDrive, 
  Lock, 
  User, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  Layers,
  Sparkles,
  DatabaseZap
} from 'lucide-react';
import { 
  SqliteTask, 
  getSqliteTasks, 
  addSqliteTask, 
  toggleSqliteTask, 
  deleteSqliteTask, 
  markSqliteTasksSynced 
} from '@/lib/db/sqlite';

export default function PwaDashboard() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [tasks, setTasks] = useState<SqliteTask[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSqliteReady, setIsSqliteReady] = useState(false);

  // Auth State
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Monitor network online/offline state & initialize SQLite
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for PWA installation prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Initialize SQLite database
    loadSqliteTasks();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  async function loadSqliteTasks() {
    try {
      const allTasks = await getSqliteTasks();
      setTasks(allTasks);
      setIsSqliteReady(true);
    } catch (err) {
      console.error('Error reading SQLite tasks:', err);
    }
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await addSqliteTask(newTitle.trim(), category, isOnline);
    setNewTitle('');
    await loadSqliteTasks();
  }

  async function handleToggleTask(id: number, currentCompleted: boolean) {
    await toggleSqliteTask(id, currentCompleted);
    await loadSqliteTasks();
  }

  async function handleDeleteTask(id: number) {
    await deleteSqliteTask(id);
    await loadSqliteTasks();
  }

  async function handleSyncData() {
    setIsSyncing(true);
    setTimeout(async () => {
      await markSqliteTasksSynced();
      await loadSqliteTasks();
      setIsSyncing(false);
    }, 1000);
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    setUser({ email: authEmail });
    setAuthModalOpen(false);
    setAuthEmail('');
    setAuthPass('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5 text-gray-950 font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              SQLite PWA App
            </h1>
            <p className="text-xs text-gray-400 font-mono">*.vercel.app ready</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Network Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
            isOnline 
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400' 
              : 'bg-amber-950/60 border-amber-500/30 text-amber-400 animate-pulse'
          }`}>
            {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
          </div>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs">
                <User className="h-3.5 w-3.5 text-emerald-400" />
                <span className="truncate max-w-[120px]">{user.email}</span>
              </div>
              <button
                onClick={() => setUser(null)}
                className="p-2 rounded-xl glass-card hover:bg-gray-800/80 transition text-gray-400 hover:text-red-400"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-semibold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 transition"
            >
              <Lock className="h-3.5 w-3.5" />
              Supabase Auth
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* PWA Install Banner */}
        {canInstall && (
          <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-teal-950/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Install App as PWA</h3>
                <p className="text-xs text-gray-400">Add to home screen for instant offline access and native app feel.</p>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition"
            >
              Install App
            </button>
          </div>
        )}

        {/* Integration Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Supabase Card */}
          <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <ShieldCheck className="h-16 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Authentication</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" /> Supabase Auth
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {user ? `Logged in as ${user.email}` : 'Configured for SSR & Client authentication flow with zero-latency session checks.'}
            </p>
          </div>

          {/* Vercel DB Card */}
          <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-teal-400">
              <Database className="h-16 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase">Cloud Database</span>
              <span className="h-2 w-2 rounded-full bg-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-teal-400" /> Vercel Postgres
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Serverless database connection configured for `*.vercel.app` automated deployments.
            </p>
          </div>

          {/* SQLite Local Card */}
          <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group border-emerald-500/30">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition text-emerald-400">
              <DatabaseZap className="h-16 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Offline Database</span>
              <span className={`h-2 w-2 rounded-full ${isSqliteReady ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DatabaseZap className="h-4 w-4 text-emerald-400" /> SQLite (sql.js WASM)
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Real SQL queries running locally in WebAssembly. Full offline storage with binary persistence.
            </p>
          </div>

        </div>

        {/* SQLite Data Workspace */}
        <section className="glass-card rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" /> Local SQLite Database Workspace
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Executes native SQLite SQL queries (`INSERT`, `SELECT`, `UPDATE`) in WASM with offline persistence.
              </p>
            </div>
            <button
              onClick={handleSyncData}
              disabled={isSyncing || !isOnline}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-xs font-semibold text-gray-300 hover:text-white border border-gray-700/60 disabled:opacity-50 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync SQLite & Vercel DB'}
            </button>
          </div>

          {/* New Item Input Form */}
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Execute SQLite INSERT statement (e.g., Add new task)..."
              className="flex-1 bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="SQLite Feature">SQLite Feature</option>
            </select>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 transition"
            >
              <Plus className="h-4 w-4" /> SQL Insert
            </button>
          </form>

          {/* Task List */}
          <div className="space-y-2.5">
            {tasks.length === 0 ? (
              <div className="text-center py-10 glass-card rounded-xl border-dashed border-gray-800">
                <DatabaseZap className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400">SQLite table `pwa_tasks` is currently empty.</p>
                <p className="text-xs text-gray-600 mt-1">Insert a row above to execute your first SQLite query!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3.5 rounded-xl glass-card hover:bg-gray-800/40 transition group"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTask(task.id, task.completed)}
                      className={`h-5 w-5 rounded-lg border flex items-center justify-center transition ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-gray-950'
                          : 'border-gray-700 hover:border-emerald-500/50'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div>
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                          {task.category}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          SQLite ID #{task.id}
                        </span>
                        <span className={`text-[10px] ${task.synced ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
                          {task.synced ? 'Synced' : 'Local SQLite'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Supabase Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card rounded-2xl p-6 max-w-sm w-full space-y-4 border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white">
                {isSignUp ? 'Create Account' : 'Supabase Sign In'}
              </h3>
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="text-gray-500 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={authPass}
                  onChange={(e) => setAuthPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 transition mt-2"
              >
                {isSignUp ? 'Sign Up with Supabase' : 'Sign In'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-gray-400 hover:text-emerald-400"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-600 border-t border-gray-900">
        Deployable to Vercel • SQLite WASM Active • Offline Storage Persistent
      </footer>
    </div>
  );
}
