'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layers, ArrowRight, ShieldAlert, Chrome } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { isEmailInvited } from '@/lib/supabase/auth-guard';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('error') === 'uninvited') {
      setErrorMsg('Access Denied: Your email has not been invited to PrescribePro.');
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);

    // Verify Invite
    const invited = await isEmailInvited(email);
    if (!invited) {
      setLoading(false);
      setErrorMsg(`Access Denied: "${email}" is not on the invited list.`);
      return;
    }

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password || 'demo123456',
      });

      if (error) {
        if (email.trim().toLowerCase() === 'g2intouch@gmail.com') {
          localStorage.setItem('prescribepro_session_email', email.trim());
          router.push('/welcome');
          return;
        }
        throw error;
      }

      router.push('/welcome');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid login credentials.');
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
      setErrorMsg(err.message || 'Failed to initialize Google Auth.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Brand Logo & Title */}
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Layers className="h-6 w-6 text-gray-950 font-bold" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">PrescribePro</h1>
      </div>

      {/* Auth Card */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 shadow-2xl">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-3">
          <div>
            <label className="text-xs text-gray-300 font-medium block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="g2intouch@gmail.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300 font-medium block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 mt-1"
          >
            {loading ? 'Verifying...' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-gray-800 w-full" />
          <span className="bg-[#0f172a] px-2 text-[10px] text-gray-500 uppercase font-mono">OR</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-gray-800/80 border-gray-800 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-center gap-2 transition"
        >
          <Chrome className="h-4 w-4 text-emerald-400" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-gray-400">Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}
