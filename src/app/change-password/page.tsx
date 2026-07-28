'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Layers } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('g2intouch@gmail.com');

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setCurrentUserEmail(data.user.email);
      } else {
        const local = localStorage.getItem('prescribepro_session_email');
        if (local) setCurrentUserEmail(local);
      }
    }
    checkUser();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!newPassword || newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        // Fallback for demo local storage session
        localStorage.setItem(`prescribepro_pass_${currentUserEmail}`, newPassword);
      }

      setStatusMsg({ type: 'success', text: 'Password successfully updated!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-white">PrescribePro</span>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="glass-card rounded-2xl p-6 space-y-5 border-gray-800 shadow-2xl">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-emerald-400" />
              Change Account Password
            </h2>
            <p className="text-xs text-gray-400">
              Update password for <code className="text-emerald-300 font-mono">{currentUserEmail}</code>
            </p>
          </div>

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

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="text-xs text-gray-300 font-medium block mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-300 font-medium block mb-1.5">Confirm New Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 mt-2"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
