'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  ShieldAlert,
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
  DatabaseZap,
  LogOut,
  Activity,
  KeyRound,
  Plus,
  Edit2,
  TestTube,
  HelpCircle,
  Upload,
  RotateCcw,
  Search,
  Image as ImageIcon
} from 'lucide-react';
import { 
  getInvitedUserRecords, 
  addInvitedEmail, 
  togglePauseUserStatus, 
  removeInvitedEmail,
  InvitedUserRecord 
} from '@/lib/supabase/auth-guard';
import { createClient } from '@/lib/supabase/client';
import { getAdminPresets, saveAdminPresets, AdminPresets } from '@/lib/db/admin-presets';
import { 
  getInteractionRules, 
  addCustomInteractionRule, 
  deleteCustomInteractionRule,
  resetRulesToDefault, 
  importRulesFromCSVText, 
  DrugInteractionRule 
} from '@/lib/data/drug-interactions-db';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string>('g2intouch@gmail.com');
  const [users, setUsers] = useState<InvitedUserRecord[]>([]);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Admin Presets State
  const [presets, setPresets] = useState<AdminPresets>(getAdminPresets());
  const [newTestItem, setNewTestItem] = useState('');
  const [newAdviceItem, setNewAdviceItem] = useState('');

  // Offline Drug Safety Rules State
  const [rulesList, setRulesList] = useState<DrugInteractionRule[]>([]);
  const [searchRuleQuery, setSearchRuleQuery] = useState('');
  const [newRuleA, setNewRuleA] = useState('');
  const [newRuleB, setNewRuleB] = useState('');
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleRec, setNewRuleRec] = useState('');
  const [newRuleSource, setNewRuleSource] = useState('CDSCO / NLEM India');
  const [newRuleSeverity, setNewRuleSeverity] = useState<'high' | 'moderate'>('high');

  const refreshRules = () => {
    setRulesList(getInteractionRules());
  };

  useEffect(() => {
    refreshRules();
  }, []);

  const handleAddCustomRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleA || !newRuleB || !newRuleTitle) return;

    addCustomInteractionRule({
      drugA: newRuleA.split(',').map((s) => s.trim().toLowerCase()),
      drugB: newRuleB.split(',').map((s) => s.trim().toLowerCase()),
      title: newRuleTitle.trim(),
      description: newRuleDesc.trim() || 'Custom drug interaction warning.',
      recommendation: newRuleRec.trim() || 'Exercise clinical judgment.',
      severity: newRuleSeverity,
      source: newRuleSource.trim() || 'Custom Physician Rule',
      category: 'CDSCO Alert'
    });

    setNewRuleA('');
    setNewRuleB('');
    setNewRuleTitle('');
    setNewRuleDesc('');
    setNewRuleRec('');
    refreshRules();
    setStatusMsg({ type: 'success', text: 'Custom interaction rule added successfully!' });
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const result = importRulesFromCSVText(text);
        refreshRules();
        setStatusMsg({
          type: 'success',
          text: `Imported ${result.successCount} custom rules from CSV! (${result.errorCount} skipped/failed)`
        });
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaultRules = () => {
    if (confirm('Are you sure you want to reset all custom rules back to the default open dataset?')) {
      resetRulesToDefault();
      refreshRules();
      setStatusMsg({ type: 'success', text: 'Rules reset to default open dataset.' });
    }
  };

  useEffect(() => {
    async function loadAdminData() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      let activeEmail = 'g2intouch@gmail.com';

      if (data?.user?.email) {
        activeEmail = data.user.email;
      } else {
        const local = localStorage.getItem('prescribepro_session_email');
        if (local) activeEmail = local;
      }

      if (activeEmail.toLowerCase() !== 'g2intouch@gmail.com') {
        router.push('/welcome');
        return;
      }

      setCurrentUser(activeEmail);
      const records = await getInvitedUserRecords();
      setUsers(records);
      setPresets(getAdminPresets());
    }
    loadAdminData();
  }, [router]);

  async function handleSendInvite(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);

    if (!newInviteEmail.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    const added = await addInvitedEmail(newInviteEmail);

    try {
      await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newInviteEmail.trim() }),
      });
    } catch (err) {}

    setLoading(false);

    if (added) {
      setStatusMsg({ 
        type: 'success', 
        text: `Invitation pre-approved & sent to "${newInviteEmail.trim()}"! They can now sign in immediately.` 
      });
      setNewInviteEmail('');
      const updated = await getInvitedUserRecords();
      setUsers(updated);
    } else {
      setStatusMsg({ 
        type: 'error', 
        text: `"${newInviteEmail.trim()}" is already on the active invited list.` 
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

  // Diagnostic Test Presets Management
  const handleAddTestItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestItem.trim()) return;
    const updated = {
      ...presets,
      diagnosticTests: [...presets.diagnosticTests, newTestItem.trim()],
    };
    setPresets(updated);
    saveAdminPresets(updated);
    setNewTestItem('');
    setStatusMsg({ type: 'success', text: 'New diagnostic test added to prescription list.' });
  };

  const handleDeleteTestItem = (item: string) => {
    const updated = {
      ...presets,
      diagnosticTests: presets.diagnosticTests.filter((t) => t !== item),
    };
    setPresets(updated);
    saveAdminPresets(updated);
    setStatusMsg({ type: 'success', text: 'Diagnostic test removed.' });
  };

  // Additional Advice Presets Management
  const handleAddAdviceItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdviceItem.trim()) return;
    const updated = {
      ...presets,
      additionalAdviceList: [...presets.additionalAdviceList, newAdviceItem.trim()],
    };
    setPresets(updated);
    saveAdminPresets(updated);
    setNewAdviceItem('');
    setStatusMsg({ type: 'success', text: 'New additional advice preset added.' });
  };

  const handleDeleteAdviceItem = (item: string) => {
    const updated = {
      ...presets,
      additionalAdviceList: presets.additionalAdviceList.filter((a) => a !== item),
    };
    setPresets(updated);
    saveAdminPresets(updated);
    setStatusMsg({ type: 'success', text: 'Advice preset removed.' });
  };

  const handleSavePadConfig = (padType: 'digital' | 'preprinted') => {
    const updated = { ...presets, padType };
    setPresets(updated);
    saveAdminPresets(updated);
    setStatusMsg({ type: 'success', text: `Clinic Pad mode set to ${padType.toUpperCase()}` });
  };

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
            <p className="text-xs text-emerald-400 font-mono">User Management & Clinical Presets</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border-emerald-500/30 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-emerald-300">{currentUser}</span>
          </div>

          <button
            onClick={() => router.push('/change-password')}
            className="p-2 rounded-xl glass-card hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition"
            title="Change Password"
          >
            <KeyRound className="h-4 w-4" />
          </button>

          <button
            onClick={() => router.push('/welcome')}
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
        
        {/* Status Notification */}
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

        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2 border-gray-800">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase font-mono">
              <span>Total Users</span>
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
              <span>Diagnostic Presets</span>
              <Activity className="h-4 w-4 text-teal-400" />
            </div>
            <div className="text-3xl font-extrabold text-teal-400">{presets.diagnosticTests.length}</div>
            <p className="text-[11px] text-gray-500">Checklist items configured</p>
          </div>
        </div>

        {/* CLINICAL PRESETS & PAD CONFIG MANAGER */}
        <section className="glass-card rounded-2xl p-6 space-y-6 border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 to-teal-950/20">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-emerald-400" />
                Prescription Pad & Suggested List Manager
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Customize default diagnostic tests, advice presets, and clinic pad layout.</p>
            </div>
          </div>

          {/* PAD MODE TOGGLE */}
          <div className="p-4 rounded-xl glass-card border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4" /> Default Clinic Pad Type
            </h4>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSavePadConfig('digital')}
                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition ${
                  presets.padType === 'digital'
                    ? 'bg-emerald-500 border-emerald-500 text-gray-950 font-bold'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                Digital Pad (Fills Header & Footer)
              </button>
              <button
                type="button"
                onClick={() => handleSavePadConfig('preprinted')}
                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition ${
                  presets.padType === 'preprinted'
                    ? 'bg-emerald-500 border-emerald-500 text-gray-950 font-bold'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                Pre-printed Pad (Leaves Header & Footer Blank)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. DIAGNOSTIC TESTS MANAGER */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <TestTube className="h-4 w-4" /> Suggested Diagnostic Tests Checklist
              </h4>

              <form onSubmit={handleAddTestItem} className="flex gap-2">
                <input
                  type="text"
                  value={newTestItem}
                  onChange={(e) => setNewTestItem(e.target.value)}
                  placeholder="e.g., Vitamin D3, USG Abdomen..."
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold text-xs shadow flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Test
                </button>
              </form>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {presets.diagnosticTests.map((t) => (
                  <div key={t} className="flex items-center justify-between p-2 rounded-lg glass-card border-gray-800 text-xs">
                    <span className="text-gray-200">{t}</span>
                    <button
                      onClick={() => handleDeleteTestItem(t)}
                      className="p-1 text-gray-500 hover:text-red-400 transition"
                      title="Delete Test"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ADDITIONAL ADVICE PRESETS MANAGER */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" /> Suggested Advice Presets
              </h4>

              <form onSubmit={handleAddAdviceItem} className="flex gap-2">
                <input
                  type="text"
                  value={newAdviceItem}
                  onChange={(e) => setNewAdviceItem(e.target.value)}
                  placeholder="e.g., Cold Sponging, Sitz Bath..."
                  className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Advice
                </button>
              </form>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {presets.additionalAdviceList.map((adv) => (
                  <div key={adv} className="flex items-center justify-between p-2 rounded-lg glass-card border-gray-800 text-xs">
                    <span className="text-gray-200">{adv}</span>
                    <button
                      onClick={() => handleDeleteAdviceItem(adv)}
                      className="p-1 text-gray-500 hover:text-red-400 transition"
                      title="Delete Advice"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Send Invitation Form */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border-gray-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-emerald-400" />
            Send New Email Invitation
          </h3>

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

        {/* DRUG SAFETY & OFFLINE RULES MANAGEMENT */}
        <div className="glass-card rounded-2xl p-6 space-y-6 border-red-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-800 gap-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-400" />
                Drug Safety & Offline Interaction Rules ({rulesList.length} Active Rules)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Pre-bundled open public medical database (CDSCO / NLEM India, IPC / PvPI, NIH RxNorm, WHO). Add custom physician rules or import open dataset CSVs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition">
                <Upload className="h-4 w-4" /> Import CSV Dataset
                <input type="file" accept=".csv,.json" onChange={handleCsvFileUpload} className="hidden" />
              </label>
              <button
                onClick={handleResetDefaultRules}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition"
                title="Restore default pre-bundled open dataset"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restore Default Dataset
              </button>
            </div>
          </div>

          {/* ADD CUSTOM INTERACTION RULE FORM */}
          <form onSubmit={handleAddCustomRule} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Custom Interaction / Safety Alert Rule
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Drug A Keywords (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. aspirin, ecospirin, ibuprofen"
                  value={newRuleA}
                  onChange={(e) => setNewRuleA(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Drug B Keywords / 'all' for single alert</label>
                <input
                  type="text"
                  placeholder="e.g. warfarin, acitrom, heparin"
                  value={newRuleB}
                  onChange={(e) => setNewRuleB(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Warning Title</label>
                <input
                  type="text"
                  placeholder="e.g. Gastrointestinal Bleeding Risk"
                  value={newRuleTitle}
                  onChange={(e) => setNewRuleTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Medical Authority Source</label>
                <input
                  type="text"
                  placeholder="e.g. CDSCO / NLEM India, IPC Safety Alert"
                  value={newRuleSource}
                  onChange={(e) => setNewRuleSource(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Severity Level</label>
                <select
                  value={newRuleSeverity}
                  onChange={(e) => setNewRuleSeverity(e.target.value as 'high' | 'moderate')}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                >
                  <option value="high">🔴 High Severity</option>
                  <option value="moderate">🟡 Moderate Severity</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Clinical Conflict Explanation</label>
                <input
                  type="text"
                  placeholder="Detailed conflict mechanism explanation..."
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-400 block mb-1">Clinical Action Recommendation</label>
                <input
                  type="text"
                  placeholder="Recommended action for prescribing physician..."
                  value={newRuleRec}
                  onChange={(e) => setNewRuleRec(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow flex items-center gap-1 transition"
              >
                <Plus className="h-4 w-4" /> Add Rule to Database
              </button>
            </div>
          </form>

          {/* SEARCHABLE RULES TABLE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Active Rules Database Table</span>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search rules, drugs or sources..."
                  value={searchRuleQuery}
                  onChange={(e) => setSearchRuleQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 rounded-lg bg-gray-950 border border-gray-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto rounded-xl border border-gray-800 bg-gray-950/60 p-2 space-y-2">
              {rulesList
                .filter(
                  (r) =>
                    !searchRuleQuery ||
                    r.title.toLowerCase().includes(searchRuleQuery.toLowerCase()) ||
                    r.drugA.some((d) => d.includes(searchRuleQuery.toLowerCase())) ||
                    r.drugB.some((d) => d.includes(searchRuleQuery.toLowerCase())) ||
                    r.source.toLowerCase().includes(searchRuleQuery.toLowerCase())
                )
                .map((r) => (
                  <div key={r.id} className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {r.severity === 'high' ? '🔴' : '🟡'} {r.title}
                        {r.isCustom && <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-800">Custom</span>}
                      </span>
                      <div className="flex items-center gap-2">
                        {r.isCustom && (
                          <button
                            type="button"
                            onClick={() => {
                              deleteCustomInteractionRule(r.id);
                              refreshRules();
                              setStatusMsg({ type: 'success', text: 'Custom interaction rule deleted.' });
                            }}
                            className="px-1.5 py-0.5 bg-red-950 text-red-400 hover:bg-red-900 border border-red-800 text-[10px] font-bold rounded transition"
                            title="Delete this custom rule"
                          >
                            🗑️ Delete
                          </button>
                        )}
                        <span className="text-[10px] bg-amber-950/80 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-800">
                          🏛️ {r.source}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                      <strong className="text-gray-300">Conflict:</strong> [{r.drugA.join(', ')}] ↔ [{r.drugB.join(', ')}]
                    </p>
                    <p className="text-gray-400 text-[10.5px] italic">{r.description}</p>
                    <p className="text-emerald-400 text-[10.5px]">
                      <strong>Action:</strong> {r.recommendation}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
