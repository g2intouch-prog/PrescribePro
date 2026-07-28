'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  LogOut, 
  Layers, 
  Sparkles, 
  DatabaseZap, 
  KeyRound,
  ShieldCheck,
  Activity,
  FileText,
  Clock,
  ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function UserWorkspacePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('user@prescribepro.com');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data?.user?.email) {
        setEmail(data.user.email);
      } else {
        const localEmail = localStorage.getItem('prescribepro_session_email');
        if (localEmail) {
          setEmail(localEmail);
        }
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.removeItem('prescribepro_session_email');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400 text-xs font-mono">
        Loading User Workspace...
      </div>
    );
  }

  const isAdmin = email.toLowerCase() === 'g2intouch@gmail.com';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col">
      
      {/* 1. TOP BANNER */}
      <header className="sticky top-0 z-40 glass-nav px-4 sm:px-8 py-4 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Layers className="h-5 w-5 text-gray-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg leading-tight tracking-wide bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                  PrescribePro
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono font-medium">
                  User Workspace
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">prescribepro.vercel.app</p>
            </div>
          </div>

          {/* User Profile Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Panel
              </button>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs border-gray-800">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono text-gray-200">{email}</span>
            </div>

            <button
              onClick={() => router.push('/change-password')}
              className="p-2 rounded-xl glass-card hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition"
              title="Change Password"
            >
              <KeyRound className="h-4 w-4" />
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card hover:bg-gray-800 text-xs font-semibold text-gray-400 hover:text-red-400 transition"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Top Welcome Notification Banner */}
      <section className="px-4 sm:px-8 pt-6 max-w-7xl w-full mx-auto">
        <div className="glass-card rounded-2xl p-5 border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/50 to-teal-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
              <Sparkles className="h-3 w-3" />
              Active Session • User ID: {email}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome to your PrescribePro Dashboard 👋
            </h2>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition"
          >
            <DatabaseZap className="h-4 w-4" />
            SQLite Local Store
          </button>
        </div>
      </section>

      {/* 2. THREE VERTICAL SECTIONS (LAYOUT GRID) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* VERTICAL SECTION 1 */}
        <section className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 flex flex-col justify-between hover:border-emerald-500/30 transition group">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <FileText className="h-5 w-5" />
                Section 1: Prescriptions & Records
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                Module 1
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Main module container for patient prescriptions, medical notes, and active treatment history.
            </p>

            {/* Placeholder Content Area 1 */}
            <div className="py-12 px-4 rounded-xl border border-dashed border-gray-800 bg-gray-950/40 text-center space-y-2">
              <FileText className="h-8 w-8 text-gray-700 mx-auto" />
              <p className="text-xs text-gray-500 font-medium">Prescription Module Content Area</p>
              <p className="text-[11px] text-gray-600">Ready to build step-by-step</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500 group-hover:text-emerald-400 transition">
            <span>Configure Module 1</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </section>

        {/* VERTICAL SECTION 2 */}
        <section className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 flex flex-col justify-between hover:border-teal-500/30 transition group">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Activity className="h-5 w-5" />
                Section 2: Diagnostics & SQLite Storage
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                Module 2
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Module container for diagnostic data, offline SQLite database sync status, and storage metrics.
            </p>

            {/* Placeholder Content Area 2 */}
            <div className="py-12 px-4 rounded-xl border border-dashed border-gray-800 bg-gray-950/40 text-center space-y-2">
              <Activity className="h-8 w-8 text-gray-700 mx-auto" />
              <p className="text-xs text-gray-500 font-medium">Diagnostics & SQLite Content Area</p>
              <p className="text-[11px] text-gray-600">Ready to build step-by-step</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500 group-hover:text-teal-400 transition">
            <span>Configure Module 2</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </section>

        {/* VERTICAL SECTION 3 */}
        <section className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 flex flex-col justify-between hover:border-cyan-500/30 transition group">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Clock className="h-5 w-5" />
                Section 3: Activity Log & Quick Tools
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                Module 3
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Module container for recent activity history, quick tools, notifications, and user settings.
            </p>

            {/* Placeholder Content Area 3 */}
            <div className="py-12 px-4 rounded-xl border border-dashed border-gray-800 bg-gray-950/40 text-center space-y-2">
              <Clock className="h-8 w-8 text-gray-700 mx-auto" />
              <p className="text-xs text-gray-500 font-medium">Activity & Tools Content Area</p>
              <p className="text-[11px] text-gray-600">Ready to build step-by-step</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500 group-hover:text-cyan-400 transition">
            <span>Configure Module 3</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-600 border-t border-gray-900 mt-auto">
        PrescribePro User Workspace • Session Active: <span className="font-mono text-gray-400">{email}</span>
      </footer>
    </div>
  );
}
