'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  Trash2, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Send,
  PauseCircle,
  PlayCircle,
  BarChart3,
  DatabaseZap,
  LogOut,
  Activity,
  ArrowRight
} from 'lucide-react';
import { 
  getInvitedUserRecords, 
  addInvitedEmail, 
  togglePauseUserStatus, 
  removeInvitedEmail,
  InvitedUserRecord 
} from '@/lib/supabase/auth-guard';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string>('g2intouch@gmail.com');
  const [users, setUsers] = useState<InvitedUserRecord[]>([]);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAdminData() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setCurrentUser(data.user.email);
      } else {
        const local = localStorage.getItem('prescribepro_session_email');
        if (local) setCurrentUser(local);
      }

      const records = await getInvitedUserRecords();
      setUsers(records);
    }
    loadAdminData();
  }, []);

  async function handleSendInvite(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);

    if (!newInviteEmail.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    const added = await addInvitedEmail(newInviteEmail);
    setLoading(false);

    if (added) {
      setStatusMsg({ 
        type: 'success', 
        text: `Invitation sent to "${newInviteEmail.trim()}"! User is now active.` 
      });
      setNewInviteEmail('');
      const updated = await getInvitedUserRecords();
      setUsers(updated);
    } else {
      setStatusMsg({ 
        type: 'error', 
        text: `"${newInviteEmail.trim()}" is already invited.` 
      });
    }
  }

  async function handleTogglePause(email: string) {
    const updated = await togglePauseUserStatus(email);
    setUsers(updated);
    const target = updated.find((u) => u.email === email.toLowerCase());
    setStatusMsg({ 
      type: 'success', 
      text: `User "${email}" is now ${target?.status === 'paused' ? 'Paused (Suspended)' : 'Active'}.` 
    });
  }

  async function handleDeleteUser(email: string) {
    if (email.toLowerCase() === 'g2intouch@gmail.com') {
      setStatusMsg({ type: 'error', text: 'Cannot delete the primary admin account.' });
      return;
    }

    const updated = await removeInvitedEmail(email);
    setUsers(updated);
    setStatusMsg({ type: 'success', text: `User "${email}" has been completely removed.` });
  }

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.removeItem('prescribepro_session_email');
    router.push('/');
  };

  const activeCount = users.filter((u) => u.status === 'active').length;
  const pausedCount = users.filter((u) => u.status === 'paused').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col">
      {/* Header Navbar */}
      <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5 text-gray-950 font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">
              PrescribePro Admin Dashboard
            </h1>
            <p className="text-xs text-emerald-400 font-mono">User Management & Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-emerald-500/30 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-emerald-300">{currentUser}</span>
          </div>

          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
          >
            <DatabaseZap className="h-3.5 w-3.5" />
            Workspace
          </button>

          <button
            onClick={handleSignOut}
            className="p-2 rounded-xl glass-card hover:bg-gray-800 text-gray-400 hover:text-red-400 transition"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2 border-gray-800">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase font-mono">
              <span>Total Invited Users</span>
              <Users className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{users.length}</div>
            <p className="text-[11px] text-gray-500">Configured in system</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 border-emerald-500/30">
            <div className="flex items-center justify-between text-emerald-400 text-xs uppercase font-mono">
              <span>Active Accounts</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{activeCount}</div>
            <p className="text-[11px] text-gray-500">Authorized to sign in</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 border-amber-500/30">
            <div className="flex items-center justify-between text-amber-400 text-xs uppercase font-mono">
              <span>Paused Accounts</span>
              <PauseCircle className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400">{pausedCount}</div>
            <p className="text-[11px] text-gray-500">Temporarily suspended</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 border-teal-500/30">
            <div className="flex items-center justify-between text-teal-400 text-xs uppercase font-mono">
              <span>System Health</span>
              <Activity className="h-4 w-4 text-teal-400" />
            </div>
            <div className="text-3xl font-extrabold text-teal-400">100%</div>
            <p className="text-[11px] text-gray-500">SQLite WASM & Cloud OK</p>
          </div>
        </div>

        {/* Send Invitation Form */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-emerald-400" />
            Send New Email Invitation
          </h3>

          {statusMsg && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 border ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                : 'bg-red-950/60 border-red-500/40 text-red-300'
            }`}>
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="h-4 w-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
                placeholder="doctor@clinic.com or user@example.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Sending...' : 'Send Invitation'}
            </button>
          </form>
        </div>

        {/* User Access Control Table */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-400" />
                User Access & Management List
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Pause or delete users to control site access in real-time.</p>
            </div>
          </div>

          <div className="space-y-3">
            {users.map((u) => {
              const isAdmin = u.email.toLowerCase() === 'g2intouch@gmail.com';
              return (
                <div
                  key={u.email}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl glass-card hover:bg-gray-800/40 gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono uppercase ${
                      u.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {u.email[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{u.email}</span>
                        {isAdmin && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                            Primary Admin
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                          u.status === 'active' 
                            ? 'bg-emerald-950 text-emerald-400' 
                            : 'bg-amber-950 text-amber-400'
                        }`}>
                          {u.status === 'active' ? 'Active' : 'Paused (Access Blocked)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isAdmin && (
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleTogglePause(u.email)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                          u.status === 'active'
                            ? 'bg-amber-950/60 border-amber-500/40 text-amber-400 hover:bg-amber-950'
                            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-950'
                        }`}
                      >
                        {u.status === 'active' ? (
                          <>
                            <PauseCircle className="h-3.5 w-3.5" /> Pause
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-3.5 w-3.5" /> Resume
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteUser(u.email)}
                        className="p-1.5 rounded-lg bg-red-950/40 border border-red-500/30 hover:bg-red-900/60 text-red-400 transition"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
