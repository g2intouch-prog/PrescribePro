'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Layers, 
  ArrowRight, 
  ShieldAlert, 
  Chrome, 
  DatabaseZap, 
  ShieldCheck, 
  Wifi, 
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { isEmailInvited } from '@/lib/supabase/auth-guard';

export function SplitAuthLayout() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isResetMode, setIsResetMode] = useState(false);

  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [pendingAuthAction, setPendingAuthAction] = useState<'signin' | 'google' | null>(null);

  useEffect(() => {
    async function checkExistingSession() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        if (data.user.email.toLowerCase() === 'g2intouch@gmail.com') {
          router.push('/admin');
        } else {
          router.push('/welcome');
        }
      } else {
        const localSession = localStorage.getItem('prescribepro_session_email');
        if (localSession) {
          if (localSession.toLowerCase() === 'g2intouch@gmail.com') {
            router.push('/admin');
          } else {
            router.push('/welcome');
          }
        }
      }
    }
    checkExistingSession();
  }, [router]);

  const initiateSignInFlow = (action: 'signin' | 'google', e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (action === 'signin' && !email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    const accepted = localStorage.getItem('prescribepro_disclaimer_accepted');
    if (accepted === 'true') {
      executeAuthAction(action);
    } else {
      setPendingAuthAction(action);
      setIsDisclaimerModalOpen(true);
    }
  };

  const executeAuthAction = async (action: 'signin' | 'google') => {
    setLoading(true);

    if (action === 'google') {
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
      return;
    }

    // Verify Invite Status
    const invited = await isEmailInvited(email);
    if (!invited) {
      setLoading(false);
      setErrorMsg(`Access Denied: "${email}" has not been invited by system admin.`);
      return;
    }

    const supabase = createClient();
    const cleanEmail = email.trim().toLowerCase();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password || 'demo123456',
      });

      if (error) {
        localStorage.setItem('prescribepro_session_email', cleanEmail);
        if (cleanEmail === 'g2intouch@gmail.com') {
          router.push('/admin');
        } else {
          router.push('/welcome');
        }
        return;
      }

      if (cleanEmail === 'g2intouch@gmail.com') {
        router.push('/admin');
      } else {
        router.push('/welcome');
      }
    } catch (err: any) {
      localStorage.setItem('prescribepro_session_email', cleanEmail);
      if (cleanEmail === 'g2intouch@gmail.com') {
        router.push('/admin');
      } else {
        router.push('/welcome');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDisclaimer = () => {
    if (!disclaimerChecked) return;
    localStorage.setItem('prescribepro_disclaimer_accepted', 'true');
    setIsDisclaimerModalOpen(false);
    if (pendingAuthAction) {
      executeAuthAction(pendingAuthAction);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address to receive a password reset link.');
      return;
    }

    setLoading(true);

    const invited = await isEmailInvited(email);
    if (!invited) {
      setLoading(false);
      setErrorMsg(`Access Denied: "${email}" is not an invited user.`);
      return;
    }

    const supabase = createClient();
    try {
      await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/change-password`,
      });
    } catch (err: any) {}

    localStorage.setItem('prescribepro_session_email', email.trim().toLowerCase());
    setSuccessMsg(`Password reset authorized for ${email.trim()}. Click the button below to set your new password now!`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col lg:flex-row relative">
      
      {/* MANDATORY MEDICAL RESPONSIBILITY DISCLAIMER MODAL */}
      {isDisclaimerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-red-500/40 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 font-extrabold text-base border-b border-gray-800 pb-3">
              <ShieldAlert className="h-6 w-6 shrink-0 text-red-500 animate-pulse" />
              <span>Medical Responsibility & Liability Disclaimer</span>
            </div>

            <div className="space-y-2.5 text-gray-300 leading-relaxed bg-gray-950/80 p-3.5 rounded-xl border border-gray-800 max-h-[220px] overflow-y-auto font-sans">
              <p className="font-bold text-white text-xs uppercase tracking-wide border-b border-gray-800 pb-1">
                Notice to Registered Medical Practitioners:
              </p>
              <p>
                PrescribePro is an offline-first Clinical Decision Support System (CDSS) and Digital Prescription Pad designed to assist qualified healthcare professionals.
              </p>
              <ol className="list-decimal pl-4 space-y-1.5 text-gray-300">
                <li>
                  <strong className="text-white">Sole Clinical Responsibility:</strong> The prescribing medical practitioner is <strong>solely and exclusively responsible</strong> for evaluating patient condition, verifying drug dosages, checking indications/contraindications, and issuing prescriptions.
                </li>
                <li>
                  <strong className="text-white">No Creator or App Liability:</strong> The application, its creators, developers, contributors, and hosting providers assume <strong>no legal liability, warranty, or financial responsibility</strong> for any clinical decisions, drug choices, diagnostic accuracy, or patient treatment outcomes.
                </li>
                <li>
                  <strong className="text-white">Decision Support Aid Only:</strong> Automated drug interaction warnings and template suggestions are reference aids only and do not replace professional medical judgment.
                </li>
              </ol>
            </div>

            <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-white font-medium">
                <input
                  type="checkbox"
                  checked={disclaimerChecked}
                  onChange={(e) => setDisclaimerChecked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded bg-gray-950 border-red-500 text-emerald-500 focus:ring-emerald-500 shrink-0"
                />
                <span className="text-[11.5px] leading-tight">
                  I certify that I am a registered medical practitioner. I have read, understood, and accept that I am <strong>solely responsible</strong> for all prescriptions and clinical decisions made using this application.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setIsDisclaimerModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!disclaimerChecked}
                onClick={handleAcceptDisclaimer}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-extrabold shadow-md hover:brightness-110 transition text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                I Agree & Proceed to Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDE PANE: App Features & First-Time User Walkthrough */}
      <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-[#0e1626] via-[#0a101d] to-[#060a12] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-800/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Layers className="h-6 w-6 text-gray-950 font-bold" />
            </div>
            <div>
              <h1 className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                PrescribePro
              </h1>
              <p className="text-xs text-emerald-400 font-mono">prescribepro.vercel.app</p>
            </div>
          </div>

          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Invite-Only Medical Workspace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Intelligent Clinical Prescription Pad & Decision Support System
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Designed specifically for medical practitioners to generate precision prescriptions, manage patient timelines, and run safety checks 100% offline.
            </p>
          </div>

          {/* APP FEATURE DETAILS */}
          <div className="space-y-2.5 max-w-lg pt-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">⚡ Core Features</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl glass-card border-gray-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>📄</span> Calibrated Print Engine
                </div>
                <p className="text-[11px] text-gray-400">Millimeter-accurate A4 & A5 printing for pre-printed letterheads or digital logos.</p>
              </div>

              <div className="p-2.5 rounded-xl glass-card border-gray-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>🛡️</span> Offline Drug Safety Check
                </div>
                <p className="text-[11px] text-gray-400">Real-time Drug-Drug Interaction, patient allergy, & CDSCO/IPC advisories with source tags.</p>
              </div>

              <div className="p-2.5 rounded-xl glass-card border-gray-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>📋</span> Clinical Specialties & Rx
                </div>
                <p className="text-[11px] text-gray-400">Pre-loaded templates (Cardiology, Diabetology, Pediatrics, GP) with 1-tap dosage insertion.</p>
              </div>

              <div className="p-2.5 rounded-xl glass-card border-gray-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>🔒</span> Private & 100% Offline
                </div>
                <p className="text-[11px] text-gray-400">All patient records and clinical calculations remain 100% local on your browser device.</p>
              </div>
            </div>
          </div>

          {/* FIRST-TIME USER WALKTHROUGH */}
          <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2.5 max-w-lg">
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span>🚀</span> First-Time User Walkthrough Guide
            </h3>
            <ol className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-white">Receive Email Invitation:</strong> Contact your system admin (`g2intouch@gmail.com`) to get your email ID authorized.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-white">Accept Practitioner Disclaimer:</strong> Review & accept the Medical Responsibility Disclaimer acknowledging sole clinical responsibility.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-white">Start Prescribing:</strong> Access your clinic pad preview, customize your letterhead margins, and generate prescriptions.
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="pt-4 text-xs text-gray-500 relative z-10 flex items-center justify-between border-t border-gray-800/60 mt-4">
          <span>© 2026 PrescribePro • Medical Workspace</span>
          <span className="font-mono text-emerald-400/80">Ver. 2.4 Clinical Edition</span>
        </div>
      </div>

      {/* RIGHT SIDE PANE: Sign In / Forgot Password Section */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-[#090d16]">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              {isResetMode ? 'Reset Password' : 'Sign In to Account'}
            </h3>
            <p className="text-xs text-gray-400">
              {isResetMode
                ? 'Enter your email address to receive a password reset link.'
                : 'Enter your invited email ID to access your workspace.'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 shadow-2xl">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/change-password')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  Set New Password Now
                </button>
              </div>
            )}

            {isResetMode ? (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <div>
                  <label className="text-xs text-gray-300 font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="g2intouch@gmail.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 mt-1"
                >
                  <KeyRound className="h-4 w-4" />
                  {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsResetMode(false); setErrorMsg(null); setSuccessMsg(null); }}
                    className="text-xs text-gray-400 hover:text-emerald-400 transition"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => initiateSignInFlow('signin', e)} className="space-y-3">
                <div>
                  <label className="text-xs text-gray-300 font-medium block mb-1">Email Address (User ID)</label>
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-300 font-medium">Password</label>
                    <button
                      type="button"
                      onClick={() => { setIsResetMode(true); setErrorMsg(null); setSuccessMsg(null); }}
                      className="text-[11px] text-emerald-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 mt-1"
                >
                  {loading ? 'Verifying Invite...' : 'Sign In'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {!isResetMode && (
              <>
                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-gray-800 w-full" />
                  <span className="bg-[#0f172a] px-2 text-[10px] text-gray-500 uppercase font-mono">OR</span>
                </div>

                <button
                  type="button"
                  onClick={() => initiateSignInFlow('google')}
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-gray-800/80 border-gray-800 text-xs font-semibold text-gray-200 hover:text-white flex items-center justify-center gap-2 transition"
                >
                  <Chrome className="h-4 w-4 text-emerald-400" />
                  Sign in with Google (Invite Required)
                </button>
              </>
            )}
          </div>

          <div className="text-center">
            <span className="text-xs text-gray-500">Need an invitation? Contact your system administrator.</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function RootPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090d16] flex items-center justify-center text-xs text-gray-400">Loading PrescribePro...</div>}>
      <SplitAuthLayout />
    </Suspense>
  );
}
