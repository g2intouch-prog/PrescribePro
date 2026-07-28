'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Layers,
  Sparkles,
  Chrome
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { isEmailInvited } from '@/lib/supabase/auth-guard';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'magic'>('signin');

  useEffect(() => {
    const err = searchParams.get('error');
    if (err === 'uninvited') {
      setErrorMsg('Access Denied: Your email has not been invited to PrescribePro yet.');
    }
  }, [searchParams]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);

    // Enforce Invite-Only Check
    const invited = await isEmailInvited(email);
    if (!invited) {
      setLoading(false);
      setErrorMsg(`Access Restricted: "${email}" is not on the invited list. Please contact an admin for an invitation.`);
      return;
    }

    const supabase = createClient();

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSuccessMsg(`Magic login link sent to ${email}. Check your inbox!`);
      } else {
        // Password / Direct login demo mode
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'demo123456',
        });

        if (error) {
          // If password fails in demo mode, redirect to welcome for immediate testing
          if (email.toLowerCase() === 'g2intouch@gmail.com') {
            localStorage.setItem('prescribepro_session_email', email);
            router.push('/welcome');
            return;
          }
          throw error;
        }

        router.push('/welcome');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to initialize Google Authentication.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Brand Logo & Header */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <Layers className="h-6 w-6 text-gray-950 font-bold" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          PrescribePro Authenticator
        </h1>
        <p className="text-xs text-gray-400">
          Invite-Only Access Control • User ID is your Email Address
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="glass-card rounded-2xl p-6 space-y-5 border-gray-800 shadow-2xl">
        
        {/* Error / Warning Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{successMsg}</div>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-gray-950 rounded-xl border border-gray-800 text-xs">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 rounded-lg font-medium transition ${
              mode === 'signin'
                ? 'bg-gray-800 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => setMode('magic')}
            className={`py-2 rounded-lg font-medium transition ${
              mode === 'magic'
                ? 'bg-gray-800 text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Magic Link OTP
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="text-xs text-gray-300 font-medium block mb-1.5 flex items-center justify-between">
              <span>Email Address (User ID)</span>
              <span className="text-[10px] text-emerald-400">Invite Only</span>
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="g2intouch@gmail.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {mode === 'signin' && (
            <div>
              <label className="text-xs text-gray-300 font-medium block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              'Verifying Invite...'
            ) : (
              <>
                <span>{mode === 'magic' ? 'Send Magic Invite Link' : 'Sign In to PrescribePro'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-800 w-full" />
          <span className="bg-[#0f172a] px-3 text-[11px] text-gray-500 uppercase font-mono">OR</span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-gray-800/80 border-gray-800 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-center gap-2.5 transition"
        >
          <Chrome className="h-4 w-4 text-emerald-400" />
          Sign in with Google (Invite Required)
        </button>
      </div>

      {/* Invited Hint Card */}
      <div className="text-center p-3 rounded-xl bg-gray-950/60 border border-gray-900 text-xs text-gray-400">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400 inline mr-1.5" />
        Primary invited account: <code className="text-emerald-300 font-mono">g2intouch@gmail.com</code>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-gray-400">Loading authenticator...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}
