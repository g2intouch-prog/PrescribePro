'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  UserPlus, 
  Mail, 
  Trash2, 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Send
} from 'lucide-react';
import { getInvitedEmails, addInvitedEmail, removeInvitedEmail } from '@/lib/supabase/auth-guard';
import { createClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string>('g2intouch@gmail.com');
  const [invitedList, setInvitedList] = useState<string[]>([]);
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

      const list = await getInvitedEmails();
      setInvitedList(list);
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
        text: `Invitation successfully sent to "${newInviteEmail.trim()}"! They can now sign in.` 
      });
      setNewInviteEmail('');
      const updated = await getInvitedEmails();
      setInvitedList(updated);
    } else {
      setStatusMsg({ 
        type: 'error', 
        text: `"${newInviteEmail.trim()}" is already on the invited list.` 
      });
    }
  }

  async function handleRevokeInvite(email: string) {
    if (email.toLowerCase() === 'g2intouch@gmail.com') {
      setStatusMsg({ type: 'error', text: 'Cannot revoke the primary admin email address.' });
      return;
    }

    await removeInvitedEmail(email);
    setStatusMsg({ type: 'success', text: `Invitation for "${email}" revoked.` });
    const updated = await getInvitedEmails();
    setInvitedList(updated);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/welcome')}
            className="p-2 rounded-xl glass-card hover:bg-gray-800 text-gray-400 hover:text-white transition"
            title="Back to Welcome Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5 text-gray-950 font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">
              PrescribePro Admin Console
            </h1>
            <p className="text-xs text-emerald-400 font-mono">Invitation & Access Control</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-emerald-500/30 text-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-emerald-300">{currentUser}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Admin Header Card */}
        <div className="glass-card rounded-2xl p-6 border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 to-teal-950/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            System Administrator Access
          </div>
          <h2 className="text-2xl font-bold text-white">Invite & User Management</h2>
          <p className="text-xs text-gray-400">
            PrescribePro is strictly invite-only. Use this console to send new email invitations or revoke existing user access.
          </p>
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

        {/* Invited Users List */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-400" />
              Active Invited Users ({invitedList.length})
            </h3>
            <span className="text-xs text-gray-500">Only listed emails can sign in</span>
          </div>

          <div className="space-y-2">
            {invitedList.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between p-3.5 rounded-xl glass-card hover:bg-gray-800/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold uppercase font-mono">
                    {email[0]}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{email}</span>
                    {email.toLowerCase() === 'g2intouch@gmail.com' && (
                      <span className="ml-2 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                        Primary Admin
                      </span>
                    )}
                  </div>
                </div>

                {email.toLowerCase() !== 'g2intouch@gmail.com' && (
                  <button
                    onClick={() => handleRevokeInvite(email)}
                    className="p-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                    title="Revoke Invitation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
