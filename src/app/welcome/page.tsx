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
  ChevronRight,
  UserCheck,
  Search,
  History,
  Save,
  RotateCcw,
  Stethoscope,
  Printer,
  FileCheck,
  HeartPulse,
  TestTube,
  FileSpreadsheet,
  HelpCircle,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getAdminPresets, AdminPresets } from '@/lib/db/admin-presets';

interface MedicalRecord {
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export default function UserWorkspacePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('user@prescribepro.com');
  const [loading, setLoading] = useState(true);

  // Admin Presets State
  const [presets, setPresets] = useState<AdminPresets>(getAdminPresets());

  // Section 1: Patient Registration Form State
  const [patient, setPatient] = useState({
    regNo: 'REG-2026-089',
    mobile: '9876543210',
    name: 'John Doe',
    age: '34',
    gender: 'Male',
    careOf: 'Robert Doe (Father)',
    address: '123 Health Ave, Suite 4B, Cityville',
  });

  // Section 1: Auto-populated Medical History State
  const [medicalHistory, setMedicalHistory] = useState<MedicalRecord[]>([
    {
      date: '2026-06-14',
      diagnosis: 'Acute Upper Respiratory Infection',
      prescription: 'Amoxicillin 500mg, Paracetamol 650mg',
      notes: 'Patient advised rest and increased fluid intake. Follow-up in 5 days.',
    },
    {
      date: '2026-03-02',
      diagnosis: 'Seasonal Allergic Rhinitis',
      prescription: 'Cetirizine 10mg, Fluticasone Nasal Spray',
      notes: 'Avoid outdoor allergens. Symptoms controlled.',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Section 2: Vitals State
  const [vitals, setVitals] = useState({
    height: '172',
    weight: '68',
    bp: '120/80',
    pulse: '72',
    temp: '98.6',
  });

  // Section 2: Selected Diagnostic Tests & Results State
  const [selectedTests, setSelectedTests] = useState<string[]>([
    'CBC (Complete Blood Count)',
    'HbA1c (Glycated Hemoglobin)',
  ]);
  const [testResultsText, setTestResultsText] = useState(
    'Hemoglobin: 14.2 g/dL | Fasting Blood Sugar: 98 mg/dL | HbA1c: 5.6%'
  );

  // Section 2: Additional Advice State
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([
    'Cold Sponging for High Fever',
    'Warm Salt Water Gargle 3x daily',
  ]);
  const [customAdviceText, setCustomAdviceText] = useState('Maintain light diet and rest.');

  // Section 2: Pad Config
  const [padMode, setPadMode] = useState<'digital' | 'preprinted'>('digital');
  const [headerImg, setHeaderImg] = useState<string>('');
  const [footerImg, setFooterImg] = useState<string>('');

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
      const loadedPresets = getAdminPresets();
      setPresets(loadedPresets);
      setPadMode(loadedPresets.padType || 'digital');
      setHeaderImg(loadedPresets.headerImage || '');
      setFooterImg(loadedPresets.footerImage || '');
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

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Patient details & registration saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleClearForm = () => {
    setPatient({
      regNo: `REG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      mobile: '',
      name: '',
      age: '',
      gender: 'Male',
      careOf: '',
      address: '',
    });
    setMedicalHistory([]);
    setSaveStatus('Form reset for new registration.');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleLookupPatient = () => {
    if (!searchQuery.trim()) return;
    setPatient({
      regNo: 'REG-2026-089',
      mobile: searchQuery.includes('987') ? searchQuery : '9876543210',
      name: 'John Doe',
      age: '34',
      gender: 'Male',
      careOf: 'Robert Doe (Father)',
      address: '123 Health Ave, Suite 4B, Cityville',
    });
    setMedicalHistory([
      {
        date: '2026-06-14',
        diagnosis: 'Acute Upper Respiratory Infection',
        prescription: 'Amoxicillin 500mg, Paracetamol 650mg',
        notes: 'Patient advised rest and increased fluid intake. Follow-up in 5 days.',
      },
      {
        date: '2026-03-02',
        diagnosis: 'Seasonal Allergic Rhinitis',
        prescription: 'Cetirizine 10mg, Fluticasone Nasal Spray',
        notes: 'Avoid outdoor allergens. Symptoms controlled.',
      },
    ]);
    setSaveStatus(`Patient records auto-populated for search "${searchQuery}"`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const toggleTestSelection = (testName: string) => {
    if (selectedTests.includes(testName)) {
      setSelectedTests(selectedTests.filter((t) => t !== testName));
    } else {
      setSelectedTests([...selectedTests, testName]);
    }
  };

  const toggleAdviceSelection = (adviceName: string) => {
    if (selectedAdvice.includes(adviceName)) {
      setSelectedAdvice(selectedAdvice.filter((a) => a !== adviceName));
    } else {
      setSelectedAdvice([...selectedAdvice, adviceName]);
    }
  };

  // Calculate BMI
  const calcBmi = () => {
    const h = parseFloat(vitals.height) / 100;
    const w = parseFloat(vitals.weight);
    if (h > 0 && w > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '--';
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
              Patient Registration & Medical Workspace 👋
            </h2>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition"
          >
            <DatabaseZap className="h-4 w-4" />
            SQLite Store
          </button>
        </div>
      </section>

      {/* 2. THREE VERTICAL SECTIONS (LAYOUT GRID) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* VERTICAL SECTION 1: PATIENT REGISTRATION & MEDICAL HISTORY */}
        <section className="glass-card rounded-2xl p-6 space-y-6 border-gray-800 flex flex-col justify-between hover:border-emerald-500/40 transition">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <UserCheck className="h-5 w-5" />
                Section 1: Patient Registration & History
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Module 1
              </span>
            </div>

            {saveStatus && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{saveStatus}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                Lookup Patient (Reg No / Mobile)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Reg No or Mobile No..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLookupPatient}
                  className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition flex items-center gap-1"
                >
                  Lookup
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePatient} className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400/90 border-b border-gray-800/80 pb-1.5">
                  1. Patient Registration Details
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Reg. Number</label>
                    <input
                      type="text"
                      required
                      value={patient.regNo}
                      onChange={(e) => setPatient({ ...patient, regNo: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={patient.mobile}
                      onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
                      placeholder="9876543210"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={patient.name}
                    onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                    placeholder="Patient full name"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Age</label>
                    <input
                      type="text"
                      required
                      value={patient.age}
                      onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                      placeholder="e.g. 34"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Gender</label>
                    <select
                      value={patient.gender}
                      onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">C/O (Care Of / Guardian)</label>
                  <input
                    type="text"
                    value={patient.careOf}
                    onChange={(e) => setPatient({ ...patient, careOf: e.target.value })}
                    placeholder="Father / Spouse / Guardian name"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Full Address</label>
                  <textarea
                    rows={2}
                    value={patient.address}
                    onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                    placeholder="Street address, city, state"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Registration
                </button>

                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-3 py-2 rounded-xl glass-card hover:bg-gray-800 text-xs font-semibold text-gray-400 hover:text-white transition flex items-center gap-1"
                  title="Reset Form"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-4 border-t border-gray-800/80">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400/90 flex items-center gap-1.5">
                  <History className="h-4 w-4 text-teal-400" />
                  2. Previous Consultation History
                </h4>
                <span className="text-[10px] text-gray-400 font-mono">Auto-Populated</span>
              </div>

              {medicalHistory.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-gray-800 text-center text-xs text-gray-500">
                  No previous consultation records found for this patient.
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {medicalHistory.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-xl glass-card border-gray-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-emerald-400">{rec.diagnosis}</span>
                        <span className="font-mono text-gray-500">{rec.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 font-mono bg-gray-950/60 p-1.5 rounded border border-gray-900">
                        Rx: {rec.prescription}
                      </p>
                      <p className="text-[10px] text-gray-400">{rec.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-900">
              <button
                type="button"
                onClick={() => setSaveStatus('Consultation notes ready for Section 2 entry.')}
                className="w-full py-2 rounded-xl glass-card hover:bg-gray-800/80 border-gray-800 text-xs font-semibold text-gray-300 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition"
              >
                <Stethoscope className="h-3.5 w-3.5 text-emerald-400" />
                Start New Consultation
              </button>
            </div>

          </div>
        </section>

        {/* VERTICAL SECTION 2: PRESCRIPTION PREVIEW & WORKING AREA */}
        <section className="glass-card rounded-2xl p-6 space-y-6 border-gray-800 flex flex-col justify-between hover:border-teal-500/40 transition">
          <div className="space-y-5">
            
            {/* Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <FileSpreadsheet className="h-5 w-5" />
                Section 2: Prescription & Diagnostics
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-500/30">
                Module 2
              </span>
            </div>

            {/* TOP ROW WITHIN 5PX: PAD CONFIGURATOR */}
            <div className="p-2 rounded-xl bg-gray-950 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 font-semibold text-[11px]">Pad Type & Layout:</span>
                <div className="flex items-center gap-1 bg-gray-900 p-0.5 rounded-lg border border-gray-800 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setPadMode('digital')}
                    className={`px-2.5 py-1 rounded-md font-medium transition ${
                      padMode === 'digital'
                        ? 'bg-teal-500 text-gray-950 font-bold shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Digital Pad
                  </button>
                  <button
                    type="button"
                    onClick={() => setPadMode('preprinted')}
                    className={`px-2.5 py-1 rounded-md font-medium transition ${
                      padMode === 'preprinted'
                        ? 'bg-teal-500 text-gray-950 font-bold shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Pre-printed Pad
                  </button>
                </div>
              </div>

              {padMode === 'digital' && (
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <label className="text-gray-400 block mb-0.5">Header Image URL</label>
                    <input
                      type="text"
                      value={headerImg}
                      onChange={(e) => setHeaderImg(e.target.value)}
                      placeholder="Clinic Header Image URL"
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-white text-[10px]"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-0.5">Footer Image URL</label>
                    <input
                      type="text"
                      value={footerImg}
                      onChange={(e) => setFooterImg(e.target.value)}
                      placeholder="Clinic Footer Image URL"
                      className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-white text-[10px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* MIDDLE WORKING AREA: SUB-PANES */}

            {/* SUB-PANE 1 (TOP): VITALS */}
            <div className="p-3.5 rounded-xl glass-card border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="h-4 w-4 text-teal-400" /> 1. Vitals
                </span>
                <span className="text-[10px] text-gray-400 font-mono">BMI: {calcBmi()}</span>
              </h5>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <label className="text-gray-400 block">Height (cm)</label>
                  <input
                    type="text"
                    value={vitals.height}
                    onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block">Weight (kg)</label>
                  <input
                    type="text"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block">BP (mmHg)</label>
                  <input
                    type="text"
                    value={vitals.bp}
                    onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block">Pulse (bpm)</label>
                  <input
                    type="text"
                    value={vitals.pulse}
                    onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block">Temp (°F)</label>
                  <input
                    type="text"
                    value={vitals.temp}
                    onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white"
                  />
                </div>
              </div>
            </div>

            {/* SUB-PANE 2 (MIDDLE): DIAGNOSTIC TESTS CHECKLIST */}
            <div className="p-3.5 rounded-xl glass-card border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <TestTube className="h-4 w-4 text-teal-400" /> 2. Recommended Tests
                </span>
                <span className="text-[10px] text-gray-400">Tick to include</span>
              </h5>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {presets.diagnosticTests.map((t) => {
                  const isChecked = selectedTests.includes(t);
                  return (
                    <label
                      key={t}
                      onClick={() => toggleTestSelection(t)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] cursor-pointer transition ${
                        isChecked
                          ? 'bg-teal-950/60 border-teal-500/40 text-teal-300'
                          : 'bg-gray-950/40 border-gray-800/80 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-gray-800 text-teal-500 focus:ring-0"
                      />
                      <span className="truncate">{t}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* SUB-PANE 3 (LOWER): TEST RESULTS ENTRY SPACE */}
            <div className="p-3.5 rounded-xl glass-card border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-teal-400" /> 3. Test Results Entry
              </h5>
              <textarea
                rows={2}
                value={testResultsText}
                onChange={(e) => setTestResultsText(e.target.value)}
                placeholder="Enter or paste diagnostic test results..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* SUB-PANE 4 (BOTTOM): ADDITIONAL ADVICE & SPECIAL INSTRUCTIONS */}
            <div className="p-3.5 rounded-xl glass-card border-gray-800 space-y-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-teal-400" /> 4. Additional Advice & Special Care
              </h5>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                {presets.additionalAdviceList.map((adv) => {
                  const isChecked = selectedAdvice.includes(adv);
                  return (
                    <label
                      key={adv}
                      onClick={() => toggleAdviceSelection(adv)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] cursor-pointer transition ${
                        isChecked
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : 'bg-gray-950/40 border-gray-800/80 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-gray-800 text-emerald-500 focus:ring-0"
                      />
                      <span>{adv}</span>
                    </label>
                  );
                })}
              </div>
              <input
                type="text"
                value={customAdviceText}
                onChange={(e) => setCustomAdviceText(e.target.value)}
                placeholder="Custom advice (e.g. Cold sponging, Sitz bath)..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* ACTION BUTTON: PRINT / PREVIEW */}
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:brightness-110 text-gray-950 font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition"
            >
              <Printer className="h-4 w-4" />
              Print / Export Prescription Pad
            </button>

          </div>
        </section>

        {/* VERTICAL SECTION 3: PRESCRIPTION PREVIEW & ACTIVITY LOG */}
        <section className="glass-card rounded-2xl p-6 space-y-4 border-gray-800 flex flex-col justify-between hover:border-cyan-500/40 transition">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Clock className="h-5 w-5" />
                Section 3: Prescription Live Preview
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Module 3
              </span>
            </div>

            {/* LIVE PRESCRIPTION PAD PREVIEW CARD */}
            <div className="bg-white text-gray-900 rounded-xl p-5 shadow-2xl space-y-4 text-xs font-sans border border-gray-200 min-h-[480px] flex flex-col justify-between">
              
              {/* HEADER AREA */}
              <div>
                {padMode === 'digital' ? (
                  headerImg ? (
                    <img src={headerImg} alt="Clinic Header" className="w-full h-16 object-contain mb-3" />
                  ) : (
                    <div className="border-b-2 border-emerald-600 pb-3 text-center space-y-0.5">
                      <h3 className="font-extrabold text-base text-emerald-800 uppercase tracking-wide">
                        PRESCRIBEPRO CLINIC & HEALTH CENTER
                      </h3>
                      <p className="text-[10px] text-gray-600">Multi-Specialty Healthcare • Reg No: 89745-MC</p>
                    </div>
                  )
                ) : (
                  <div className="h-16 border-b border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-mono">
                    [Pre-printed Letterhead Pad Space]
                  </div>
                )}

                {/* PATIENT INFO BANNER */}
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 mt-3 grid grid-cols-2 gap-2 text-[10px]">
                  <div><strong className="text-gray-700">Patient:</strong> {patient.name || 'John Doe'}</div>
                  <div><strong className="text-gray-700">Reg No:</strong> {patient.regNo}</div>
                  <div><strong className="text-gray-700">Age/Sex:</strong> {patient.age} Yrs / {patient.gender}</div>
                  <div><strong className="text-gray-700">Mobile:</strong> {patient.mobile}</div>
                </div>
              </div>

              {/* BODY: VITALS & TESTS */}
              <div className="space-y-3 flex-1 py-2">
                <div className="text-[10px] bg-emerald-50 p-2 rounded border border-emerald-200 text-emerald-950 font-mono flex flex-wrap gap-3">
                  <span><strong>Ht:</strong> {vitals.height}cm</span>
                  <span><strong>Wt:</strong> {vitals.weight}kg</span>
                  <span><strong>BP:</strong> {vitals.bp}</span>
                  <span><strong>Pulse:</strong> {vitals.pulse}bpm</span>
                  <span><strong>BMI:</strong> {calcBmi()}</span>
                </div>

                {selectedTests.length > 0 && (
                  <div className="text-[10px] space-y-1">
                    <strong className="text-teal-800 block">Recommended Diagnostics:</strong>
                    <ul className="list-disc pl-4 text-gray-700 space-y-0.5">
                      {selectedTests.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {testResultsText && (
                  <div className="text-[10px] bg-gray-50 p-2 rounded border border-gray-200">
                    <strong className="text-gray-700 block mb-0.5">Test Results:</strong>
                    <p className="text-gray-800 font-mono whitespace-pre-wrap">{testResultsText}</p>
                  </div>
                )}

                {selectedAdvice.length > 0 && (
                  <div className="text-[10px] space-y-1">
                    <strong className="text-emerald-800 block">Special Advice & Instructions:</strong>
                    <ul className="list-disc pl-4 text-gray-700 space-y-0.5">
                      {selectedAdvice.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                      {customAdviceText && <li>{customAdviceText}</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* FOOTER AREA */}
              <div>
                {padMode === 'digital' ? (
                  footerImg ? (
                    <img src={footerImg} alt="Clinic Footer" className="w-full h-10 object-contain mt-2" />
                  ) : (
                    <div className="border-t border-gray-200 pt-2 text-center text-[9px] text-gray-500 flex justify-between items-center">
                      <span>PrescribePro Digital Pad</span>
                      <span>Physician Signature: ______________</span>
                    </div>
                  )
                ) : (
                  <div className="h-10 border-t border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-mono">
                    [Pre-printed Footer Space]
                  </div>
                )}
              </div>

            </div>
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
