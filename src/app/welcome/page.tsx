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
  Send,
  MessageCircle,
  Mail,
  FileDown,
  Sun,
  Moon
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

  // Theme State: 'dark' vs 'day'
  const [theme, setTheme] = useState<'dark' | 'day'>('day');

  // Admin Presets State
  const [presets, setPresets] = useState<AdminPresets>(getAdminPresets());

  // Patient Registration Form State
  const [patient, setPatient] = useState({
    regNo: 'REG-2026-089',
    mobile: '9876543210',
    name: 'John Doe',
    age: '34',
    gender: 'Male',
    careOf: 'Robert Doe (Father)',
    address: '123 Health Ave, Cityville',
  });

  // Medical History State
  const [medicalHistory, setMedicalHistory] = useState<MedicalRecord[]>([
    {
      date: '2026-06-14',
      diagnosis: 'Acute Upper Respiratory Infection',
      prescription: 'Amoxicillin 500mg, Paracetamol 650mg',
      notes: 'Advised rest and fluids.',
    },
    {
      date: '2026-03-02',
      diagnosis: 'Seasonal Allergic Rhinitis',
      prescription: 'Cetirizine 10mg',
      notes: 'Avoid outdoor allergens.',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Vitals State
  const [vitals, setVitals] = useState({
    height: '172',
    weight: '68',
    bp: '120/80',
    pulse: '72',
    temp: '98.6',
  });

  // Diagnostic Tests & Results State
  const [selectedTests, setSelectedTests] = useState<string[]>([
    'CBC (Complete Blood Count)',
    'HbA1c (Glycated Hemoglobin)',
  ]);
  const [testFilterQuery, setTestFilterQuery] = useState('');
  const [testResultsText, setTestResultsText] = useState(
    'Hemoglobin: 14.2 g/dL | Fasting Sugar: 98 mg/dL | HbA1c: 5.6%'
  );

  // Additional Advice State
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([
    'Cold Sponging for High Fever',
    'Warm Salt Water Gargle 3x daily',
  ]);
  const [customAdviceText, setCustomAdviceText] = useState('Maintain light diet and rest.');

  // Pad Config
  const [padMode, setPadMode] = useState<'digital' | 'preprinted'>('digital');
  const [headerImg, setHeaderImg] = useState<string>('');
  const [footerImg, setFooterImg] = useState<string>('');

  // Active Left Sub-Tab
  const [activeLeftTab, setActiveLeftTab] = useState<'patient' | 'vitals' | 'tests' | 'advice'>('patient');

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

      const savedTheme = localStorage.getItem('prescribepro_theme');
      if (savedTheme === 'dark' || savedTheme === 'day') {
        setTheme(savedTheme as 'dark' | 'day');
      }

      setLoading(false);
    }
    checkUser();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'day' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('prescribepro_theme', nextTheme);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.removeItem('prescribepro_session_email');
    router.push('/');
  };

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Patient registration saved!');
    setTimeout(() => setSaveStatus(null), 2500);
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
    setSaveStatus('Form reset.');
    setTimeout(() => setSaveStatus(null), 2000);
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
      address: '123 Health Ave, Cityville',
    });
    setSaveStatus(`Loaded record for "${searchQuery}"`);
    setTimeout(() => setSaveStatus(null), 2500);
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

  const calcBmi = () => {
    const h = parseFloat(vitals.height) / 100;
    const w = parseFloat(vitals.weight);
    if (h > 0 && w > 0) return (w / (h * h)).toFixed(1);
    return '--';
  };

  const handlePrint = () => window.print();

  const handleWhatsAppSend = () => {
    const phone = patient.mobile.replace(/[^0-9]/g, '') || '919876543210';
    const text = encodeURIComponent(
      `*PrescribePro Prescription Summary*\nPatient: ${patient.name} (${patient.regNo})\nRx/Diagnostics: ${selectedTests.join(', ')}\nAdvice: ${selectedAdvice.join(', ')}\n\nView Digital Prescription at: https://prescribepro.vercel.app/`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Prescription Summary - ${patient.name} (${patient.regNo})`);
    const body = encodeURIComponent(
      `PrescribePro Prescription Summary\n\nPatient Name: ${patient.name}\nReg No: ${patient.regNo}\nVitals: Ht ${vitals.height}cm, Wt ${vitals.weight}kg, BP ${vitals.bp}\n\nRecommended Tests:\n${selectedTests.join('\n')}\n\nTest Results:\n${testResultsText}\n\nAdvice:\n${selectedAdvice.join('\n')}\n${customAdviceText}`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400 text-xs font-mono">
        Loading User Workspace...
      </div>
    );
  }

  const isAdmin = email.toLowerCase() === 'g2intouch@gmail.com';

  // Dynamic Theme Container Styling
  const containerBg = theme === 'day'
    ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100 via-pink-100 to-emerald-100 text-slate-900'
    : 'bg-gradient-to-b from-[#0b0f19] via-[#090d16] to-[#05070d] text-gray-100';

  const headerBg = theme === 'day'
    ? 'bg-white/80 backdrop-blur-md border-b border-pink-200/80'
    : 'glass-nav border-b border-gray-800/80';

  const cardBg = theme === 'day'
    ? 'bg-white/75 backdrop-blur-md border border-pink-200/60 shadow-xl shadow-slate-200/50 text-slate-800'
    : 'glass-card border border-gray-800 text-gray-100';

  const inputBg = theme === 'day'
    ? 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
    : 'bg-gray-950 border border-gray-800 text-white placeholder-gray-600 focus:border-emerald-500';

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${containerBg}`}>
      
      {/* 1. ULTRA-COMPACT TOP BANNER (~5PX PADDING / ~38PX HEIGHT) */}
      <header className={`h-[38px] px-3 sm:px-4 py-1 flex items-center justify-between shrink-0 ${headerBg}`}>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 via-pink-500 to-emerald-500 flex items-center justify-center shadow-md">
            <Layers className="h-3.5 w-3.5 text-white font-bold" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className={`font-extrabold text-xs tracking-wide ${
              theme === 'day' ? 'text-slate-900' : 'bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent'
            }`}>
              PrescribePro
            </h1>
            <span className={`text-[9px] font-mono hidden sm:inline ${theme === 'day' ? 'text-emerald-700 font-bold' : 'text-emerald-400'}`}>
              • Day/Night Workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* DAY / NIGHT MODE TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition shadow ${
              theme === 'day'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950'
                : 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
            }`}
            title="Toggle Day / Dark Mode"
          >
            {theme === 'day' ? <Sun className="h-3 w-3 text-slate-950" /> : <Moon className="h-3 w-3 text-indigo-400" />}
            <span>{theme === 'day' ? 'Day Mode' : 'Dark Mode'}</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => router.push('/admin')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold transition ${
                theme === 'day'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              Admin
            </button>
          )}

          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] border ${
            theme === 'day' ? 'bg-white/90 border-slate-200 text-slate-700' : 'glass-card border-gray-800 text-gray-200'
          }`}>
            <User className="h-3 w-3 text-emerald-500" />
            <span className="font-mono truncate max-w-[110px]">{email}</span>
          </div>

          <button
            onClick={() => router.push('/change-password')}
            className={`p-1 rounded-lg transition ${
              theme === 'day' ? 'bg-white/90 hover:bg-slate-100 text-slate-600' : 'glass-card hover:bg-gray-800 text-gray-400 hover:text-emerald-400'
            }`}
            title="Change Password"
          >
            <KeyRound className="h-3 w-3" />
          </button>

          <button
            onClick={handleSignOut}
            className={`p-1 rounded-lg transition ${
              theme === 'day' ? 'bg-white/90 hover:bg-red-50 text-red-600' : 'glass-card hover:bg-gray-800 text-gray-400 hover:text-red-400'
            }`}
            title="Sign Out"
          >
            <LogOut className="h-3 w-3" />
          </button>
        </div>
      </header>

      {/* 2. THREE VERTICAL SECTIONS (MAXIMIZED WORKING CANVAS) */}
      <main className="flex-1 p-2.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 overflow-hidden h-[calc(100vh-38px)]">
        
        {/* SECTION 1 (LEFT COLUMN - 4 COLS): PATIENT REGISTRATION & INPUT SUB-PANES */}
        <section className={`lg:col-span-4 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          <div className="flex flex-col h-full space-y-3">
            
            {/* Header & Sub-Tabs Switcher */}
            <div className={`flex items-center justify-between border-b pb-2 shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800/80'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
                <UserCheck className="h-4 w-4" />
                Section 1: Patient Registration & Inputs
              </div>
              {saveStatus && (
                <span className="text-[10px] text-emerald-600 font-mono font-bold animate-pulse">{saveStatus}</span>
              )}
            </div>

            {/* Quick Sub-Tab Selector */}
            <div className={`grid grid-cols-4 p-1 rounded-xl text-[10px] shrink-0 border ${
              theme === 'day' ? 'bg-slate-100/90 border-slate-200' : 'bg-gray-950 border-gray-800'
            }`}>
              <button
                type="button"
                onClick={() => setActiveLeftTab('patient')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'patient' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('vitals')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'vitals' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Vitals
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('tests')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'tests' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Tests
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('advice')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'advice' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Advice
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              
              {/* TAB 1: PATIENT REGISTRATION */}
              {activeLeftTab === 'patient' && (
                <div className="space-y-3 text-xs">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Lookup Reg No / Mobile..."
                      className={`flex-1 rounded-xl px-3 py-1.5 text-xs ${inputBg}`}
                    />
                    <button
                      onClick={handleLookupPatient}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
                        theme === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      Lookup
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Reg. No</label>
                      <input
                        type="text"
                        value={patient.regNo}
                        onChange={(e) => setPatient({ ...patient, regNo: e.target.value })}
                        className={`w-full rounded-lg px-2 py-1 text-xs font-mono ${inputBg}`}
                      />
                    </div>
                    <div>
                      <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Mobile</label>
                      <input
                        type="tel"
                        value={patient.mobile}
                        onChange={(e) => setPatient({ ...patient, mobile: e.target.value })}
                        className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Full Name</label>
                    <input
                      type="text"
                      value={patient.name}
                      onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Age</label>
                      <input
                        type="text"
                        value={patient.age}
                        onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                        className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                      />
                    </div>
                    <div>
                      <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Gender</label>
                      <select
                        value={patient.gender}
                        onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                        className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>C/O (Guardian)</label>
                    <input
                      type="text"
                      value={patient.careOf}
                      onChange={(e) => setPatient({ ...patient, careOf: e.target.value })}
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] block mb-0.5 ${theme === 'day' ? 'text-slate-600 font-medium' : 'text-gray-400'}`}>Address</label>
                    <input
                      type="text"
                      value={patient.address}
                      onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  {/* Medical History Cards */}
                  <div className="pt-2 space-y-1.5">
                    <label className={`text-[10px] font-bold uppercase tracking-wider block ${theme === 'day' ? 'text-pink-700' : 'text-teal-400'}`}>
                      Previous Consultation History
                    </label>
                    {medicalHistory.map((rec, idx) => (
                      <div key={idx} className={`p-2 rounded-lg text-[10px] space-y-0.5 border ${
                        theme === 'day' ? 'bg-white/90 border-slate-200 text-slate-800' : 'glass-card border-gray-800 text-gray-300'
                      }`}>
                        <div className="flex justify-between font-bold text-blue-600">
                          <span>{rec.diagnosis}</span>
                          <span className="font-mono text-slate-500">{rec.date}</span>
                        </div>
                        <p className="font-mono text-slate-700">Rx: {rec.prescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: VITALS */}
              {activeLeftTab === 'vitals' && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between font-bold text-xs text-blue-600">
                    <span>Patient Vitals</span>
                    <span className="text-[10px] font-mono text-slate-600">BMI: {calcBmi()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <label className="block mb-0.5 font-medium text-slate-600">Height (cm)</label>
                      <input
                        type="text"
                        value={vitals.height}
                        onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                        className={`w-full rounded px-2 py-1 ${inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="block mb-0.5 font-medium text-slate-600">Weight (kg)</label>
                      <input
                        type="text"
                        value={vitals.weight}
                        onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                        className={`w-full rounded px-2 py-1 ${inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="block mb-0.5 font-medium text-slate-600">BP (mmHg)</label>
                      <input
                        type="text"
                        value={vitals.bp}
                        onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                        className={`w-full rounded px-2 py-1 ${inputBg}`}
                      />
                    </div>
                    <div>
                      <label className="block mb-0.5 font-medium text-slate-600">Pulse (bpm)</label>
                      <input
                        type="text"
                        value={vitals.pulse}
                        onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                        className={`w-full rounded px-2 py-1 ${inputBg}`}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-0.5 font-medium text-slate-600">Temperature (°F)</label>
                      <input
                        type="text"
                        value={vitals.temp}
                        onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                        className={`w-full rounded px-2 py-1 ${inputBg}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DIAGNOSTIC TESTS & SEARCH */}
              {activeLeftTab === 'tests' && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">Recommended Diagnostics</span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">
                      {presets.diagnosticTests.length} Tests
                    </span>
                  </div>

                  {/* REAL-TIME LAB TEST SEARCH BOX */}
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2" />
                    <input
                      type="text"
                      value={testFilterQuery}
                      onChange={(e) => setTestFilterQuery(e.target.value)}
                      placeholder="Search lab tests (e.g. CBC, Lipid, Thyroid, X-Ray)..."
                      className={`w-full rounded-lg pl-8 pr-2.5 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {presets.diagnosticTests
                      .filter((t) => t.toLowerCase().includes(testFilterQuery.toLowerCase()))
                      .map((t) => {
                        const isChecked = selectedTests.includes(t);
                        return (
                          <label
                            key={t}
                            onClick={() => toggleTestSelection(t)}
                            className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] cursor-pointer transition ${
                              isChecked
                                ? (theme === 'day' ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' : 'bg-teal-950/60 border-teal-500/40 text-teal-300 font-semibold')
                                : (theme === 'day' ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-300' : 'bg-gray-950/40 border-gray-800/80 text-gray-400')
                            }`}
                          >
                            <input type="checkbox" checked={isChecked} onChange={() => {}} className="rounded text-blue-600" />
                            <span className="truncate">{t}</span>
                          </label>
                        );
                      })}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Test Results Entry</label>
                    <textarea
                      rows={3}
                      value={testResultsText}
                      onChange={(e) => setTestResultsText(e.target.value)}
                      className={`w-full rounded-xl px-2.5 py-1.5 text-xs ${inputBg}`}
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: ADDITIONAL ADVICE */}
              {activeLeftTab === 'advice' && (
                <div className="space-y-3 text-xs">
                  <span className="text-xs font-bold text-emerald-700 block">Additional Advice & Special Instructions</span>
                  <div className="space-y-1 max-h-44 overflow-y-auto">
                    {presets.additionalAdviceList.map((adv) => {
                      const isChecked = selectedAdvice.includes(adv);
                      return (
                        <label
                          key={adv}
                          onClick={() => toggleAdviceSelection(adv)}
                          className={`flex items-center gap-2 p-1.5 rounded-lg border text-[11px] cursor-pointer transition ${
                            isChecked
                              ? (theme === 'day' ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300')
                              : (theme === 'day' ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300' : 'bg-gray-950/40 border-gray-800/80 text-gray-400')
                          }`}
                        >
                          <input type="checkbox" checked={isChecked} onChange={() => {}} className="rounded text-emerald-600" />
                          <span>{adv}</span>
                        </label>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={customAdviceText}
                    onChange={(e) => setCustomAdviceText(e.target.value)}
                    placeholder="Custom advice..."
                    className={`w-full rounded-xl px-2.5 py-1.5 text-xs ${inputBg}`}
                  />
                </div>
              )}

            </div>

            {/* ACTION BUTTONS (BOTTOM OF LEFT PANE) */}
            <div className={`flex gap-2 pt-2 border-t shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
              <button
                onClick={handleSavePatient}
                className={`flex-1 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow transition ${
                  theme === 'day' ? 'bg-gradient-to-r from-blue-600 via-pink-600 to-emerald-600 text-white' : 'bg-emerald-500 text-gray-950'
                }`}
              >
                <Save className="h-3.5 w-3.5" /> Save
              </button>
              <button
                onClick={handleClearForm}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  theme === 'day' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'glass-card text-gray-400 hover:text-white'
                }`}
              >
                Reset
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2 (CENTER COLUMN - 5 COLS): PRESCRIPTION PREVIEW IN CENTER & BOTTOM ACTION BAR */}
        <section className={`lg:col-span-5 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          
          {/* Section Header */}
          <div className={`flex items-center justify-between pb-2 border-b shrink-0 mb-2 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
            <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
              <FileSpreadsheet className="h-4 w-4" />
              Section 2: Live Prescription Preview
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              theme === 'day' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
            }`}>
              Module 2
            </span>
          </div>

          {/* TOP ROW WITHIN 5PX: PAD MODE TOGGLE */}
          <div className={`flex items-center justify-between p-2 rounded-xl text-xs shrink-0 mb-2 border ${
            theme === 'day' ? 'bg-slate-100/90 border-slate-200' : 'bg-gray-950 border-gray-800'
          }`}>
            <span className={`font-semibold text-[11px] ${theme === 'day' ? 'text-slate-700' : 'text-gray-300'}`}>Clinic Pad Mode:</span>
            <div className={`flex items-center gap-1 p-0.5 rounded-lg border text-[10px] ${
              theme === 'day' ? 'bg-white border-slate-200' : 'bg-gray-900 border-gray-800'
            }`}>
              <button
                onClick={() => setPadMode('digital')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  padMode === 'digital' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white font-bold shadow' : 'bg-emerald-500 text-gray-950 font-bold') 
                    : 'text-gray-500'
                }`}
              >
                Digital Pad
              </button>
              <button
                onClick={() => setPadMode('preprinted')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  padMode === 'preprinted' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white font-bold shadow' : 'bg-emerald-500 text-gray-950 font-bold') 
                    : 'text-gray-500'
                }`}
              >
                Pre-printed Pad
              </button>
            </div>
          </div>

          {/* CENTERED LIVE PRESCRIPTION PAD PREVIEW CARD */}
          <div className="flex-1 bg-white text-gray-900 rounded-xl p-4 shadow-2xl space-y-3 text-[11px] font-sans border border-gray-200 overflow-y-auto flex flex-col justify-between">
            
            {/* PAD HEADER */}
            <div>
              {padMode === 'digital' ? (
                headerImg ? (
                  <img src={headerImg} alt="Clinic Header" className="w-full h-12 object-contain mb-2" />
                ) : (
                  <div className="border-b-2 border-emerald-600 pb-2 text-center space-y-0.5">
                    <h3 className="font-extrabold text-sm text-emerald-800 uppercase tracking-wide">
                      PRESCRIBEPRO CLINIC & HEALTH CENTER
                    </h3>
                    <p className="text-[9px] text-gray-600">Multi-Specialty Healthcare • Reg No: 89745-MC</p>
                  </div>
                )
              ) : (
                <div className="h-12 border-b border-dashed border-gray-300 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                  [Pre-printed Letterhead Pad Space]
                </div>
              )}

              {/* PATIENT INFO STRIP */}
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 mt-2 grid grid-cols-2 gap-1 text-[9px]">
                <div><strong>Patient:</strong> {patient.name || 'John Doe'}</div>
                <div><strong>Reg No:</strong> {patient.regNo}</div>
                <div><strong>Age/Sex:</strong> {patient.age} Yrs / {patient.gender}</div>
                <div><strong>Mobile:</strong> {patient.mobile}</div>
              </div>
            </div>

            {/* PAD BODY */}
            <div className="space-y-2.5 flex-1 py-1">
              <div className="text-[9px] bg-emerald-50 p-1.5 rounded border border-emerald-200 text-emerald-950 font-mono flex flex-wrap gap-2">
                <span><strong>Ht:</strong> {vitals.height}cm</span>
                <span><strong>Wt:</strong> {vitals.weight}kg</span>
                <span><strong>BP:</strong> {vitals.bp}</span>
                <span><strong>Pulse:</strong> {vitals.pulse}</span>
                <span><strong>BMI:</strong> {calcBmi()}</span>
              </div>

              {selectedTests.length > 0 && (
                <div className="text-[9px] space-y-0.5">
                  <strong className="text-teal-800 block">Recommended Diagnostics:</strong>
                  <ul className="list-disc pl-3 text-gray-700 space-y-0.5">
                    {selectedTests.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {testResultsText && (
                <div className="text-[9px] bg-gray-50 p-1.5 rounded border border-gray-200">
                  <strong className="text-gray-700 block mb-0.5">Test Results:</strong>
                  <p className="text-gray-800 font-mono whitespace-pre-wrap">{testResultsText}</p>
                </div>
              )}

              {selectedAdvice.length > 0 && (
                <div className="text-[9px] space-y-0.5">
                  <strong className="text-emerald-800 block">Special Advice & Instructions:</strong>
                  <ul className="list-disc pl-3 text-gray-700 space-y-0.5">
                    {selectedAdvice.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                    {customAdviceText && <li>{customAdviceText}</li>}
                  </ul>
                </div>
              )}
            </div>

            {/* PAD FOOTER */}
            <div>
              {padMode === 'digital' ? (
                footerImg ? (
                  <img src={footerImg} alt="Clinic Footer" className="w-full h-8 object-contain mt-1" />
                ) : (
                  <div className="border-t border-gray-200 pt-1 text-center text-[8px] text-gray-500 flex justify-between items-center">
                    <span>PrescribePro Digital Pad</span>
                    <span>Physician Signature: ______________</span>
                  </div>
                )
              ) : (
                <div className="h-8 border-t border-dashed border-gray-300 flex items-center justify-center text-[9px] text-gray-400 font-mono">
                  [Pre-printed Footer Space]
                </div>
              )}
            </div>

          </div>

          {/* BOTTOM ACTION BAR AT BOTTOM OF CENTER PREVIEW: PRINT, PDF, WHATSAPP, EMAIL */}
          <div className={`grid grid-cols-4 gap-2 pt-2 border-t shrink-0 mt-2 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
            <button
              onClick={handlePrint}
              className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow transition"
              title="Print Prescription"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>

            <button
              onClick={handlePrint}
              className="py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow transition"
              title="Export PDF"
            >
              <FileDown className="h-3.5 w-3.5" /> PDF
            </button>

            <button
              onClick={handleWhatsAppSend}
              className="py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow transition"
              title="Send via WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </button>

            <button
              onClick={handleEmailSend}
              className="py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow transition"
              title="Send via Email"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
          </div>

        </section>

        {/* SECTION 3 (RIGHT COLUMN - 3 COLS): ACTIVITY LOG & QUICK TOOLS */}
        <section className={`lg:col-span-3 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          <div className="space-y-3">
            <div className={`flex items-center justify-between pb-2 border-b ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-cyan-400'}`}>
                <Clock className="h-4 w-4" />
                Section 3: Activity & Tools
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                theme === 'day' ? 'bg-pink-100 text-pink-800 border border-pink-300' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
              }`}>
                Module 3
              </span>
            </div>

            {/* Quick Actions Stack */}
            <div className="space-y-2 text-xs">
              <div className={`p-2.5 rounded-xl space-y-1 border ${
                theme === 'day' ? 'bg-white/90 border-slate-200 text-slate-800' : 'glass-card border-gray-800 text-gray-300'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>Session Info</span>
                <p className="text-[11px]">Logged in: <code className="font-mono font-bold text-blue-600">{email}</code></p>
                <p className="text-[10px] text-slate-500">Storage: SQLite WASM Active</p>
              </div>

              <div className={`p-2.5 rounded-xl space-y-1 border ${
                theme === 'day' ? 'bg-white/90 border-slate-200 text-slate-800' : 'glass-card border-gray-800 text-gray-300'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${theme === 'day' ? 'text-pink-700' : 'text-teal-400'}`}>Recent Activity</span>
                <p className="text-[11px]">• Saved prescription for John Doe</p>
                <p className="text-[11px]">• Added HbA1c to lab test checklist</p>
              </div>
            </div>
          </div>

          <div className={`pt-2 border-t text-center text-[10px] font-mono ${theme === 'day' ? 'border-pink-200 text-slate-500' : 'border-gray-900 text-gray-500'}`}>
            Elliptical Blue-Pink-Green Theme Active
          </div>
        </section>

      </main>
    </div>
  );
}
