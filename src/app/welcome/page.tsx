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
  Moon,
  Pill,
  FolderPlus,
  Trash2,
  Edit2,
  X,
  Check,
  BookmarkPlus,
  AlertTriangle,
  Calculator
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getAdminPresets, AdminPresets } from '@/lib/db/admin-presets';
import { 
  getSpecialties, 
  saveSpecialties, 
  getDrugCatalog, 
  saveDrugCatalog, 
  calculatePediatricDose,
  calculateBsaDose,
  calculateBsa,
  Specialty, 
  PrescriptionTemplate, 
  DrugItem 
} from '@/lib/db/clinical-templates';

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

  // Specialties & Templates State
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('');
  const [drugCatalog, setDrugCatalog] = useState<DrugItem[]>([]);

  // Modals State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);

  // Modal Editing Forms
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newDrugName, setNewDrugName] = useState('');
  const [newDrugDosage, setNewDrugDosage] = useState('');
  const [newDrugDuration, setNewDrugDuration] = useState('');

  // Selected Ticked Drugs on Prescription
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([
    'Paracetamol 650mg (1-0-1)',
    'Pantoprazole 40mg (1-0-0 B/F)',
  ]);
  const [drugSearchQuery, setDrugSearchQuery] = useState('');

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

      const specs = getSpecialties();
      setSpecialties(specs);
      if (specs.length > 0) setSelectedSpecialtyId(specs[0].id);

      setDrugCatalog(getDrugCatalog());

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

  const toggleDrugSelection = (drugLabel: string) => {
    if (selectedDrugs.includes(drugLabel)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d !== drugLabel));
    } else {
      setSelectedDrugs([...selectedDrugs, drugLabel]);
    }
  };

  const calcBmi = () => {
    const h = parseFloat(vitals.height) / 100;
    const w = parseFloat(vitals.weight);
    if (h > 0 && w > 0) return (w / (h * h)).toFixed(1);
    return '--';
  };

  // Apply Template
  const applyTemplate = (tpl: PrescriptionTemplate) => {
    setSelectedTests(tpl.tests || []);
    setSelectedAdvice(tpl.advice || []);
    setSelectedDrugs(tpl.drugs || []);
    if (tpl.notes) setCustomAdviceText(tpl.notes);
    setSaveStatus(`Template "${tpl.name}" applied to prescription!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Save Current as Template
  const handleSaveCurrentAsTemplate = () => {
    if (!selectedSpecialtyId) return;
    const tplName = prompt('Enter a name for this new prescription template:');
    if (!tplName) return;

    const newTpl: PrescriptionTemplate = {
      id: `tpl-${Date.now()}`,
      name: tplName,
      tests: selectedTests,
      advice: selectedAdvice,
      drugs: selectedDrugs,
      notes: customAdviceText,
    };

    const updated = specialties.map((sp) => {
      if (sp.id === selectedSpecialtyId) {
        return {
          ...sp,
          templates: [...sp.templates, newTpl],
        };
      }
      return sp;
    });

    setSpecialties(updated);
    saveSpecialties(updated);
    setSaveStatus(`Template "${tplName}" saved under current specialty!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Specialty Management
  const handleAddSpecialty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpecialtyName.trim()) return;
    const newSp: Specialty = {
      id: `sp-${Date.now()}`,
      name: newSpecialtyName.trim(),
      templates: [],
    };
    const updated = [...specialties, newSp];
    setSpecialties(updated);
    saveSpecialties(updated);
    setSelectedSpecialtyId(newSp.id);
    setNewSpecialtyName('');
  };

  const handleDeleteSpecialty = (id: string) => {
    const updated = specialties.filter((sp) => sp.id !== id);
    setSpecialties(updated);
    saveSpecialties(updated);
    if (selectedSpecialtyId === id && updated.length > 0) {
      setSelectedSpecialtyId(updated[0].id);
    }
  };

  // Template Management under Specialty
  const handleAddTemplateToSpecialty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim() || !selectedSpecialtyId) return;
    const newTpl: PrescriptionTemplate = {
      id: `tpl-${Date.now()}`,
      name: newTemplateName.trim(),
      tests: selectedTests,
      advice: selectedAdvice,
      drugs: selectedDrugs,
      notes: customAdviceText,
    };

    const updated = specialties.map((sp) => {
      if (sp.id === selectedSpecialtyId) {
        return {
          ...sp,
          templates: [...sp.templates, newTpl],
        };
      }
      return sp;
    });

    setSpecialties(updated);
    saveSpecialties(updated);
    setNewTemplateName('');
  };

  const handleDeleteTemplate = (spId: string, tplId: string) => {
    const updated = specialties.map((sp) => {
      if (sp.id === spId) {
        return {
          ...sp,
          templates: sp.templates.filter((t) => t.id !== tplId),
        };
      }
      return sp;
    });
    setSpecialties(updated);
    saveSpecialties(updated);
  };

  // Drug Catalog Management
  const handleAddDrugToCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrugName.trim()) return;
    const newDrug: DrugItem = {
      id: `d-${Date.now()}`,
      genericName: newDrugName.trim(),
      category: 'adult',
      dosage: newDrugDosage.trim() || '1-0-1',
      duration: newDrugDuration.trim() || '5 days',
    };
    const updated = [...drugCatalog, newDrug];
    setDrugCatalog(updated);
    saveDrugCatalog(updated);
    setNewDrugName('');
    setNewDrugDosage('');
    setNewDrugDuration('');
  };

  const handleDeleteDrugFromCatalog = (id: string) => {
    const updated = drugCatalog.filter((d) => d.id !== id);
    setDrugCatalog(updated);
    saveDrugCatalog(updated);
  };

  const handlePrint = () => window.print();

  const handleWhatsAppSend = () => {
    const phone = patient.mobile.replace(/[^0-9]/g, '') || '919876543210';
    const text = encodeURIComponent(
      `*PrescribePro Prescription Summary*\nPatient: ${patient.name} (${patient.regNo})\nRx Medications: ${selectedDrugs.join(', ')}\nDiagnostics: ${selectedTests.join(', ')}\nAdvice: ${selectedAdvice.join(', ')}\n\nView Digital Prescription at: https://prescribepro.vercel.app/`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Prescription Summary - ${patient.name} (${patient.regNo})`);
    const body = encodeURIComponent(
      `PrescribePro Prescription Summary\n\nPatient Name: ${patient.name}\nReg No: ${patient.regNo}\nVitals: Ht ${vitals.height}cm, Wt ${vitals.weight}kg, BP ${vitals.bp}\n\nRx Medications:\n${selectedDrugs.join('\n')}\n\nRecommended Tests:\n${selectedTests.join('\n')}\n\nTest Results:\n${testResultsText}\n\nAdvice:\n${selectedAdvice.join('\n')}\n${customAdviceText}`
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
  const currentSpecialty = specialties.find((sp) => sp.id === selectedSpecialtyId);

  // Dynamic Theme Styling: Elliptical Green -> Pink -> Blue Gradient for Day Mode
  const containerBg = theme === 'day'
    ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-200 via-pink-200 to-sky-200 text-slate-900'
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
          <img src="/icon.png" alt="PrescribePro Logo" className="h-6 w-6 rounded-lg shadow-md border border-slate-200/50" />
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
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition shadow ${
              theme === 'day'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950'
                : 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
            }`}
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

      {/* 2. THREE VERTICAL SECTIONS */}
      <main className="flex-1 p-2.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 overflow-hidden h-[calc(100vh-38px)]">
        
        {/* SECTION 1 (LEFT COLUMN - 4 COLS): PATIENT REGISTRATION & INPUT SUB-PANES */}
        <section className={`lg:col-span-4 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          <div className="flex flex-col h-full space-y-3">
            
            <div className={`flex items-center justify-between border-b pb-2 shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800/80'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
                <UserCheck className="h-4 w-4" />
                Section 1: Patient Details & Inputs
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

              {/* TAB 3: DIAGNOSTIC TESTS */}
              {activeLeftTab === 'tests' && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">Recommended Diagnostics</span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">
                      {presets.diagnosticTests.length} Tests
                    </span>
                  </div>

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
            <button
              onClick={handleSaveCurrentAsTemplate}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-pink-600 text-white text-[10px] font-bold shadow hover:bg-pink-700 transition"
              title="Save current prescription layout & drugs as reusable template"
            >
              <BookmarkPlus className="h-3 w-3" /> Save Template
            </button>
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

          {/* CENTERED LIVE PRESCRIPTION PAD PREVIEW CARD (A4 PORTRAIT MODE) */}
          <div id="printable-prescription-pad" className="flex-1 bg-white text-gray-900 rounded-xl p-4 shadow-2xl space-y-3 text-[11px] font-sans border border-gray-200 overflow-y-auto flex flex-col justify-between aspect-[210/297] max-w-[440px] w-full mx-auto">
            
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

            {/* PAD BODY (VITALS, RX DRUGS, DIAGNOSTICS & ADVICE) */}
            <div className="space-y-2.5 flex-1 py-1">
              <div className="text-[9px] bg-emerald-50 p-1.5 rounded border border-emerald-200 text-emerald-950 font-mono flex flex-wrap gap-2">
                <span><strong>Ht:</strong> {vitals.height}cm</span>
                <span><strong>Wt:</strong> {vitals.weight}kg</span>
                <span><strong>BP:</strong> {vitals.bp}</span>
                <span><strong>Pulse:</strong> {vitals.pulse}</span>
                <span><strong>BMI:</strong> {calcBmi()}</span>
              </div>

              {/* RX MEDICATIONS LIST */}
              {selectedDrugs.length > 0 && (
                <div className="text-[10px] space-y-1 bg-blue-50/70 p-2 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">Rx Prescribed Medications:</strong>
                  <ol className="list-decimal pl-4 text-slate-800 space-y-0.5">
                    {selectedDrugs.map((d, i) => (
                      <li key={i} className="font-semibold">{d}</li>
                    ))}
                  </ol>
                </div>
              )}

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

        {/* SECTION 3 (RIGHT COLUMN - 3 COLS): SPECIALTIES, TEMPLATES & DRUGS CATALOG */}
        <section className={`lg:col-span-3 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          <div className="flex flex-col h-full space-y-3 overflow-hidden">
            
            {/* Header */}
            <div className={`flex items-center justify-between pb-2 border-b shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-cyan-400'}`}>
                <Clock className="h-4 w-4" />
                Section 3: Clinical Templates & Drugs
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                theme === 'day' ? 'bg-pink-100 text-pink-800 border border-pink-300' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
              }`}>
                Module 3
              </span>
            </div>

            {/* MODAL POPUP LAUNCHER BUTTONS */}
            <div className="space-y-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition"
              >
                <FolderPlus className="h-4 w-4" />
                Manage Specialties & Templates
              </button>

              <button
                type="button"
                onClick={() => setIsDrugModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white text-xs font-bold shadow flex items-center justify-center gap-2 transition"
              >
                <Pill className="h-4 w-4" />
                Manage Additional Drugs Catalog
              </button>
            </div>

            {/* TEMPLATE QUICK APPLIER */}
            <div className="space-y-1.5 shrink-0">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Quick Load Specialty Template:
              </label>
              <select
                value={selectedSpecialtyId}
                onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                className={`w-full rounded-lg px-2 py-1 text-xs font-semibold ${inputBg}`}
              >
                {specialties.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name} ({sp.templates.length} templates)
                  </option>
                ))}
              </select>

              {currentSpecialty && currentSpecialty.templates.length > 0 && (
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {currentSpecialty.templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl)}
                      className={`w-full p-1.5 rounded-lg border text-left text-[10px] font-medium transition flex items-center justify-between ${
                        theme === 'day' 
                          ? 'bg-white hover:bg-blue-50 border-slate-200 text-slate-800' 
                          : 'bg-gray-950/60 hover:bg-gray-900 border-gray-800 text-gray-200'
                      }`}
                    >
                      <span className="truncate">{tpl.name}</span>
                      <span className="text-[9px] text-blue-600 font-bold">Apply</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INTERACTIVE ADDITIONAL DRUGS CHECKLIST (TICK TO APPEND TO RX) */}
            <div className="flex-1 overflow-hidden flex flex-col space-y-1.5 pt-1 border-t border-slate-200">
              <div className="flex items-center justify-between shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5 text-emerald-600" /> Generic Medications (Tick to Rx)
                </span>
                <span className="text-[9px] text-slate-500 font-mono font-bold">{drugCatalog.length} Generics</span>
              </div>

              {/* PEDIATRIC WEIGHT-BASED DOSAGE CALCULATOR BOX (FOR CHILDREN <40KG) */}
              {parseFloat(vitals.weight) > 0 && parseFloat(vitals.weight) < 40 && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-[10px] text-amber-950 space-y-1 shrink-0 shadow-sm">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span className="flex items-center gap-1 text-[10px]">
                      <Calculator className="h-3.5 w-3.5 text-amber-700" />
                      Pediatric Weight Calc ({vitals.weight} kg Child)
                    </span>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                      Target: 15mg/kg
                    </span>
                  </div>
                  <div className="space-y-1 max-h-20 overflow-y-auto pr-0.5">
                    {calculatePediatricDose(parseFloat(vitals.weight)).map((pd, idx) => {
                      const doseLabel = `${pd.drugName} - ${pd.calculatedVolumeMl} (${pd.frequency})`;
                      const isChecked = selectedDrugs.includes(doseLabel);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleDrugSelection(doseLabel)}
                          className={`p-1 rounded border cursor-pointer flex items-center justify-between transition ${
                            isChecked ? 'bg-amber-200 border-amber-400 font-bold' : 'bg-white border-amber-200 hover:bg-amber-100/60'
                          }`}
                        >
                          <span className="truncate">{pd.drugName}: <strong className="text-amber-900">{pd.calculatedVolumeMl}</strong></span>
                          <span className="text-[8px] bg-amber-300 px-1 rounded font-bold shrink-0">{isChecked ? 'Added' : '+ Add'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* BODY SURFACE AREA (BSA m²) CLINICAL DOSING PANEL */}
              {parseFloat(vitals.weight) > 0 && (
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-300 text-[10px] text-blue-950 space-y-1 shrink-0 shadow-sm">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span className="flex items-center gap-1 text-[10px]">
                      <Calculator className="h-3.5 w-3.5 text-blue-700" />
                      Body Surface Area (BSA) Calc
                    </span>
                    <span className="text-[9px] bg-blue-200 text-blue-950 px-1.5 py-0.5 rounded font-mono font-bold">
                      BSA: {calculateBsa(parseFloat(vitals.height) || 0, parseFloat(vitals.weight)).toFixed(2)} m²
                    </span>
                  </div>
                  <div className="space-y-1 max-h-20 overflow-y-auto pr-0.5">
                    {calculateBsaDose(
                      parseFloat(vitals.height) || 0,
                      parseFloat(vitals.weight),
                      parseFloat(patient.age) || 5
                    ).map((bd, idx) => {
                      const doseLabel = `${bd.drugName} - ${bd.totalCalculatedDose} (${bd.dosePerBsa})`;
                      const isChecked = selectedDrugs.includes(doseLabel);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleDrugSelection(doseLabel)}
                          className={`p-1 rounded border cursor-pointer flex items-center justify-between transition ${
                            isChecked ? 'bg-blue-200 border-blue-400 font-bold' : 'bg-white border-blue-200 hover:bg-blue-100/60'
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-semibold block truncate text-[9px]">{bd.drugName}</span>
                            <span className="text-[8px] text-blue-800 font-mono">{bd.totalCalculatedDose} ({bd.dosePerBsa})</span>
                          </div>
                          <span className="text-[8px] bg-blue-300 px-1 rounded font-bold shrink-0">{isChecked ? 'Added' : '+ Add'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SEARCH & AGE/WEIGHT SMART SUGGESTION STRIP */}
              <div className="space-y-1 shrink-0">
                <div className="relative">
                  <Search className="h-3 w-3 text-slate-400 absolute left-2 top-1.5" />
                  <input
                    type="text"
                    value={drugSearchQuery}
                    onChange={(e) => setDrugSearchQuery(e.target.value)}
                    placeholder="Search generic names (e.g. Paracetamol, Amoxicillin)..."
                    className={`w-full rounded-lg pl-7 pr-2 py-0.5 text-[10px] ${inputBg}`}
                  />
                </div>

                <div className="flex items-center gap-1 text-[9px]">
                  <span className="text-slate-500 font-bold shrink-0">Filter:</span>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('')}
                    className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold hover:bg-blue-200"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('Paracetamol')}
                    className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200"
                  >
                    Paracetamol
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('Amoxicillin')}
                    className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-900 font-bold hover:bg-pink-200"
                  >
                    Amox
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('Syrup')}
                    className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold hover:bg-amber-200"
                  >
                    Syrups
                  </button>
                </div>
              </div>

              {/* CHECKLIST OF GENERIC MEDICATIONS WITH CONTRAINDICATION SAFETY GAURDS */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {drugCatalog
                  .filter((d) => {
                    const q = drugSearchQuery.toLowerCase();
                    return d.genericName.toLowerCase().includes(q) || d.dosage.toLowerCase().includes(q);
                  })
                  .map((d) => {
                    const w = parseFloat(vitals.weight) || 0;
                    const isContraindicated = w > 0 && w < 30 && d.category === 'adult';
                    const label = `${d.genericName} (${d.dosage})`;
                    const isChecked = selectedDrugs.includes(label);

                    return (
                      <label
                        key={d.id}
                        onClick={() => {
                          if (isContraindicated) {
                            alert(`⚠️ SAFETY CONTRAINDICATION WARNING:\n\nA ${w} kg child cannot take ${d.genericName} (${d.dosage}) adult dose!\n\nPlease select the calculated Pediatric Syrup dosage (${calculatePediatricDose(w)[0]?.calculatedVolumeMl} t.d.s) instead.`);
                            return;
                          }
                          toggleDrugSelection(label);
                        }}
                        className={`flex items-start gap-2 p-1.5 rounded-lg border text-[10px] cursor-pointer transition ${
                          isContraindicated
                            ? 'bg-red-50 border-red-300 text-red-900 opacity-60'
                            : isChecked
                            ? (theme === 'day' ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-semibold')
                            : (theme === 'day' ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300' : 'bg-gray-950/40 border-gray-800/80 text-gray-400')
                        }`}
                      >
                        <input type="checkbox" checked={isChecked} disabled={isContraindicated} onChange={() => {}} className="rounded text-emerald-600 mt-0.5" />
                        <div className="truncate flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 truncate flex items-center gap-1">
                              {isContraindicated && <AlertTriangle className="h-3 w-3 text-red-600 shrink-0" />}
                              {d.genericName}
                            </span>
                            <span className={`text-[8px] px-1 py-0.5 rounded font-mono uppercase font-bold ${
                              isContraindicated ? 'bg-red-100 text-red-800' :
                              d.category === 'adult' ? 'bg-blue-100 text-blue-800' :
                              d.category === 'pediatric' ? 'bg-amber-100 text-amber-800' :
                              d.category === 'infant' ? 'bg-pink-100 text-pink-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {isContraindicated ? 'Unsafe for Weight' : d.category}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-500 block truncate">
                            {isContraindicated ? `⚠️ Adult dose unsafe for ${w}kg child` : `${d.dosage} • ${d.duration}`}
                          </span>
                        </div>
                      </label>
                    );
                  })}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* MODAL 1: SPECIALTIES & TEMPLATES MANAGEMENT SCREEN */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-blue-900 flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-blue-600" />
                Manage Specialties & Templates
              </h3>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CREATE NEW SPECIALTY */}
            <form onSubmit={handleAddSpecialty} className="flex gap-2">
              <input
                type="text"
                value={newSpecialtyName}
                onChange={(e) => setNewSpecialtyName(e.target.value)}
                placeholder="Enter new Specialty name (e.g. Orthopedics, ENT, Neurology)..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Specialty
              </button>
            </form>

            {/* SPECIALTIES LIST & TEMPLATES ACCORDION */}
            <div className="space-y-4">
              {specialties.map((sp) => (
                <div key={sp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="font-extrabold text-sm text-blue-950 flex items-center gap-2">
                      <span>{sp.name}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-mono">
                        {sp.templates.length} Templates
                      </span>
                    </h4>
                    <button
                      onClick={() => handleDeleteSpecialty(sp.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Delete Specialty"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* TEMPLATES UNDER THIS SPECIALTY */}
                  <div className="space-y-2">
                    {sp.templates.map((tpl) => (
                      <div key={tpl.id} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-slate-900 block">{tpl.name}</strong>
                          <span className="text-[10px] text-slate-500">
                            Tests: {tpl.tests?.length || 0} • Drugs: {tpl.drugs?.length || 0} • Advice: {tpl.advice?.length || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { applyTemplate(tpl); setIsTemplateModalOpen(false); }}
                            className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold"
                          >
                            Apply Now
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(sp.id, tpl.id)}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Close Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADDITIONAL DRUGS CATALOG MANAGEMENT SCREEN */}
      {isDrugModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-xl p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-emerald-900 flex items-center gap-2">
                <Pill className="h-5 w-5 text-emerald-600" />
                Manage Additional Drugs Catalog
              </h3>
              <button
                onClick={() => setIsDrugModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CREATE NEW DRUG */}
            <form onSubmit={handleAddDrugToCatalog} className="space-y-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Add New Medication to Catalog</h4>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={newDrugName}
                  onChange={(e) => setNewDrugName(e.target.value)}
                  placeholder="Drug Name (e.g. Paracetamol 650mg)"
                  className="col-span-3 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                />
                <input
                  type="text"
                  value={newDrugDosage}
                  onChange={(e) => setNewDrugDosage(e.target.value)}
                  placeholder="Dosage (e.g. 1-0-1 after food)"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                />
                <input
                  type="text"
                  value={newDrugDuration}
                  onChange={(e) => setNewDrugDuration(e.target.value)}
                  placeholder="Duration (e.g. 5 days)"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Medication
                </button>
              </div>
            </form>

            {/* DRUG CATALOG LIST */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {drugCatalog.map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 block font-bold">{d.genericName}</strong>
                    <span className="text-[11px] text-slate-600">Dosage: {d.dosage} • Duration: {d.duration}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteDrugFromCatalog(d.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition"
                    title="Delete Medication"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setIsDrugModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Close Screen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
