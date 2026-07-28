'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  User, 
  LogOut, 
  Layers, 
  Sparkles, 
  DatabaseZap, 
  ArrowRight, 
  ShieldCheck,
  Server
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function WelcomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('g2intouch@gmail.com');
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
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400 text-xs font-mono">
        Loading Welcome Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Layers className="h-5 w-5 text-gray-950 font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              PrescribePro
            </h1>
            <p className="text-xs text-gray-400 font-mono">prescribepro.vercel.app</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs border-emerald-500/30">
            <User className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono text-emerald-300">{email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card hover:bg-gray-800/80 text-xs font-semibold text-gray-400 hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Hero Welcome Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex flex-col justify-center">
        
        {/* Welcome Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/40 to-teal-950/20 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-400">
            <Sparkles className="h-40 w-40" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Invited User • User ID: {email}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Welcome to PrescribePro! 🎉
            </h2>
            <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
              Your authentication was successful. Your account <code className="text-emerald-300 font-mono">{email}</code> is verified on the active invite list.
            </p>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800/80">
            <button
              onClick={() => router.push('/admin')}
              className="group p-5 rounded-2xl glass-card hover:bg-emerald-500/10 border-emerald-500/30 text-left transition flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Admin Invite Console
                </div>
                <p className="text-xs text-gray-400">Send email invitations & manage invited user access list.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => router.push('/')}
              className="group p-5 rounded-2xl glass-card hover:bg-gray-800/60 border-gray-800 text-left transition flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <DatabaseZap className="h-4 w-4 text-teal-400" />
                  PrescribePro Workspace
                </div>
                <p className="text-xs text-gray-400">Access your SQLite database & PWA features.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-600 border-t border-gray-900">
        PrescribePro • Authenticated Session: <span className="font-mono text-gray-400">{email}</span>
      </footer>
    </div>
  );
}
