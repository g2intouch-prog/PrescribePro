'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  LogOut, 
  Layers, 
  Sparkles, 
  DatabaseZap, 
  KeyRound,
  ShieldCheck,
  ShieldAlert,
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
  CheckCircle2,
  BookmarkPlus,
  AlertTriangle,
  Calculator,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getAdminPresets, saveAdminPresets, AdminPresets } from '@/lib/db/admin-presets';
import { checkPrescriptionSafety, DetectedInteraction } from '@/lib/data/interaction-checker';
import { 
  getInteractionRules, 
  addCustomInteractionRule, 
  deleteCustomInteractionRule,
  resetRulesToDefault, 
  importRulesFromCSVText, 
  DrugInteractionRule 
} from '@/lib/data/drug-interactions-db';
import { 
  savePrescriptionToSqlite, 
  getPatientPrescriptionsFromSqlite, 
  getAllPrescriptionsFromSqlite,
  downloadSqliteBackupFile,
  importSqliteBackupFile,
  connectLocalHardDriveFolder,
  restoreConnectedFolderHandle,
  syncSqliteToConnectedFolder,
  saveSqliteDbWithFilePicker,
  checkForGitHubUpdates,
  GitHubReleaseInfo,
  SavedPrescriptionRecord 
} from '@/lib/db/sqlite';
import { 
  getSpecialties, 
  saveSpecialties, 
  getClinicalProtocols,
  saveClinicalProtocols,
  ClinicalProtocol,
  getDrugCatalog, 
  saveDrugCatalog, 
  calculatePediatricDose,
  calculateBsaDose,
  calculateBsa,
  searchClinicalDrugs,
  CLINICAL_PROCEDURES_PRESETS,
  Specialty, 
  PrescriptionTemplate, 
  DrugItem 
} from '@/lib/db/clinical-templates';

const PROTOCOL_CATEGORIES = [
  { key: 'all', label: 'All Protocols', icon: '📋' },
  { key: 'personal', label: 'My Personal Templates', icon: '⭐' },
  { key: 'bites', label: 'Animal Bites & Rabies', icon: '🐾' },
  { key: 'cardio', label: 'Cardio & Hypertension', icon: '❤️' },
  { key: 'dermatology', label: 'Dermatology & Skin Care', icon: '🧴' },
  { key: 'endocrine', label: 'Endocrinology & Diabetes', icon: '🩸' },
  { key: 'ent', label: 'ENT (Ear, Nose, Throat)', icon: '👂' },
  { key: 'emergency', label: 'ER / Emergency & Critical Care', icon: '🚨' },
  { key: 'gastro', label: 'Gastroenterology & Hepatology', icon: '🤢' },
  { key: 'general', label: 'General Medicine', icon: '🩺' },
  { key: 'gynae', label: 'Gynaecology & Obstetrics', icon: '🤰' },
  { key: 'infectious', label: 'Infectious Diseases', icon: '🦠' },
  { key: 'nephrology', label: 'Nephrology & Renal Care', icon: '🫘' },
  { key: 'neurology', label: 'Neurology & Seizures', icon: '⚡' },
  { key: 'ophthalmology', label: 'Ophthalmology & Eye Care', icon: '👁️' },
  { key: 'ortho', label: 'Orthopedics & Joint Care', icon: '🦴' },
  { key: 'pediatric', label: 'Pediatrics & Child Health', icon: '👶' },
  { key: 'psychiatry', label: 'Psychiatry & Mental Health', icon: '🧠' },
  { key: 'respiratory', label: 'Respiratory Care & Pulmonology', icon: '🫁' },
  { key: 'toxicology', label: 'Toxicology & Poisoning', icon: '🧪' },
  { key: 'trauma', label: 'Trauma & Burns', icon: '🔥' },
];


interface MedicalRecord {
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export interface PatientRecord {
  regNo: string;
  mobile: string;
  name: string;
  age: string;
  gender: string;
  careOf?: string;
  address?: string;
  chronicDiseases?: string;
  vitals?: { height: string; weight: string; bp: string; pulse: string; temp: string };
  medicalHistory?: MedicalRecord[];
  lastDrugs?: string[];
  lastTests?: string[];
}

const PRESET_PATIENTS: PatientRecord[] = [
  {
    regNo: 'REG-2026-089',
    mobile: '9876543210',
    name: 'John Doe',
    age: '34',
    gender: 'Male',
    careOf: 'Robert Doe (Father)',
    address: '123 Health Ave, Cityville',
    chronicDiseases: 'Type 2 Diabetes Mellitus x 4 yrs, Mild Hypertension, NKDA',
    vitals: { height: '172', weight: '68', bp: '120/80', pulse: '72', temp: '98.6' },
    medicalHistory: [
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
    ],
    lastDrugs: [
      'Cap Amoxicillin 500mg (1-0-1 after food) x 5 days',
      'Tab Paracetamol 650mg (1-0-1 S.O.S for fever)',
      'Tab Pantoprazole 40mg (1-0-0 B/F)',
    ],
    lastTests: [
      'CBC (Complete Blood Count with Differential)',
      'HbA1c (Glycated Hemoglobin)',
    ],
  },
  {
    regNo: 'REG-2026-142',
    mobile: '9812345678',
    name: 'Ramesh Sharma',
    age: '58',
    gender: 'Male',
    careOf: 'Late S.N. Sharma',
    address: 'Plot 42, Civil Lines, Bhubaneswar',
    chronicDiseases: 'Type 2 Diabetes x 8 yrs, Essential HTN, Dyslipidemia. On Tab Metformin 500mg bd & Tab Telmisartan 40mg od.',
    vitals: { height: '168', weight: '74', bp: '138/86', pulse: '76', temp: '98.4' },
    medicalHistory: [
      {
        date: '2026-05-20',
        diagnosis: 'Diabetic Health Review & Mild Dyspepsia',
        prescription: 'Metformin 500mg, Telmisartan 40mg, Rabeprazole 20mg',
        notes: 'Fasting sugar 118 mg/dL, HbA1c 6.8%.',
      },
    ],
    lastDrugs: [
      'Tab Metformin 500mg (1-0-1 after food)',
      'Tab Telmisartan 40mg (1-0-0 morning)',
      'Tab Rosuvastatin 10mg (0-0-1 at night)',
    ],
    lastTests: [
      'Fasting Blood Sugar (FBS)',
      'HbA1c (Glycated Hemoglobin)',
      'KFT (Kidney Function Test Full Panel)',
      'Lipid Profile (Full Panel)',
    ],
  },
  {
    regNo: 'REG-2026-305',
    mobile: '9776543210',
    name: 'Ananya Das',
    age: '29',
    gender: 'Female',
    careOf: 'Pradeep Das (Husband)',
    address: 'Sector 5, CDA, Cuttack',
    chronicDiseases: 'Bronchial Asthma x 3 yrs (uses Salbutamol inhaler S.O.S). No drug allergies.',
    vitals: { height: '158', weight: '54', bp: '110/70', pulse: '80', temp: '99.1' },
    medicalHistory: [
      {
        date: '2026-07-02',
        diagnosis: 'Acute Asthma Exacerbation & Viral Fever',
        prescription: 'Levosalbutamol Inhaler, Tab Montelukast 10mg',
        notes: 'SPO2 98% on room air.',
      },
    ],
    lastDrugs: [
      'Tab Montelukast 10mg (0-0-1 at night)',
      'Levosalbutamol Inhaler (2 puffs S.O.S for dyspnea)',
    ],
    lastTests: [
      'Absolute Eosinophil Count (AEC)',
      'Serum IgE (Total)',
      'Chest X-Ray (PA View)',
    ],
  },
];

interface BrandSuggestionItem {
  brandName: string;
  formulation: string;
  calculatedDose: string;
  frequency: string;
  isPediatric: boolean;
}

function getClinicalBrandSuggestions(
  genericFullName: string,
  weightKg: number,
  ageYears: number,
  bsaM2: number,
  customBrandMap: Record<string, string[]>
): BrandSuggestionItem[] {
  const lower = genericFullName.toLowerCase();
  const isPediatricPatient = (weightKg > 0 && weightKg < 35) || (ageYears > 0 && ageYears < 12);
  const results: BrandSuggestionItem[] = [];

  // 1. AZITHROMYCIN
  if (lower.includes('azithromycin')) {
    if (isPediatricPatient && weightKg > 0) {
      const targetMg = Math.round(weightKg * 10);
      const ml200 = (targetMg / 40).toFixed(1);
      const ml100 = (targetMg / 20).toFixed(1);
      results.push({
        brandName: 'Azithral XL 200 Liquid',
        formulation: 'Syrup 200mg/5ml',
        calculatedDose: `${ml200} ml OD (Target: 10mg/kg = ${targetMg}mg)`,
        frequency: '1 OD for 3-5 days 1 hr before food',
        isPediatric: true,
      });
      results.push({
        brandName: 'Aziwok 200 ReadyMix',
        formulation: 'Syrup 200mg/5ml',
        calculatedDose: `${ml200} ml OD (Target: 10mg/kg = ${targetMg}mg)`,
        frequency: '1 OD for 3-5 days 1 hr before food',
        isPediatric: true,
      });
      results.push({
        brandName: 'Zady 100 Dry Syrup',
        formulation: 'Syrup 100mg/5ml',
        calculatedDose: `${ml100} ml OD (Target: 10mg/kg = ${targetMg}mg)`,
        frequency: '1 OD for 3-5 days 1 hr before food',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Aziwok 500mg Tablet',
        formulation: 'Tablet 500mg',
        calculatedDose: '1 Tab OD (500mg)',
        frequency: '1 OD for 3 days 1 hr before food',
        isPediatric: false,
      });
      results.push({
        brandName: 'Azithral 500mg Tablet',
        formulation: 'Tablet 500mg',
        calculatedDose: '1 Tab OD (500mg)',
        frequency: '1 OD for 3 days 1 hr before food',
        isPediatric: false,
      });
      results.push({
        brandName: 'Zady 500mg Tablet',
        formulation: 'Tablet 500mg',
        calculatedDose: '1 Tab OD (500mg)',
        frequency: '1 OD for 3 days 1 hr before food',
        isPediatric: false,
      });
    }
  }

  // 2. PARACETAMOL
  else if (lower.includes('paracetamol') || lower.includes('acetaminophen')) {
    if (isPediatricPatient && weightKg > 0) {
      const targetMg = Math.round(weightKg * 15);
      const ml250 = (targetMg / 50).toFixed(1);
      const ml120 = (targetMg / 24).toFixed(1);
      results.push({
        brandName: 'Calpol 250 Peadiatric Suspension',
        formulation: 'Syrup 250mg/5ml',
        calculatedDose: `${ml250} ml Q6H / SOS (${targetMg}mg)`,
        frequency: 'Stat & Q6H SOS after food',
        isPediatric: true,
      });
      results.push({
        brandName: 'Dolo 120 Suspension',
        formulation: 'Syrup 120mg/5ml',
        calculatedDose: `${ml120} ml Q6H / SOS (${targetMg}mg)`,
        frequency: 'Stat & Q6H SOS after food',
        isPediatric: true,
      });
      results.push({
        brandName: 'Pacimol 250 Syrup',
        formulation: 'Syrup 250mg/5ml',
        calculatedDose: `${ml250} ml Q6H / SOS (${targetMg}mg)`,
        frequency: 'Stat & Q6H SOS after food',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Calpol 650 Tablet',
        formulation: 'Tablet 650mg',
        calculatedDose: '1 Tab TDS / SOS',
        frequency: '1-0-1 after food (Max 4g/day)',
        isPediatric: false,
      });
      results.push({
        brandName: 'Dolo 650 Tablet',
        formulation: 'Tablet 650mg',
        calculatedDose: '1 Tab TDS / SOS',
        frequency: '1-0-1 after food (Max 4g/day)',
        isPediatric: false,
      });
      results.push({
        brandName: 'Crocin 650 Advance',
        formulation: 'Tablet 650mg',
        calculatedDose: '1 Tab TDS / SOS',
        frequency: '1-0-1 after food',
        isPediatric: false,
      });
    }
  }

  // 3. PANTOPRAZOLE
  else if (lower.includes('pantoprazole')) {
    if (isPediatricPatient && weightKg < 30) {
      results.push({
        brandName: 'Junior Pan 20 Dispersible Tab',
        formulation: 'Tablet 20mg',
        calculatedDose: '1 Tab OD morning',
        frequency: '1 OD 30 min before breakfast',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Pan-40 Tablet',
        formulation: 'Tablet 40mg',
        calculatedDose: '1 Tab OD (40mg)',
        frequency: '1 OD 30 min B/F (before food)',
        isPediatric: false,
      });
      results.push({
        brandName: 'Pantocid 40 Tablet',
        formulation: 'Tablet 40mg',
        calculatedDose: '1 Tab OD (40mg)',
        frequency: '1 OD 30 min B/F',
        isPediatric: false,
      });
      results.push({
        brandName: 'Pan-D SR Capsule',
        formulation: 'Capsule (Pan 40 + Dom 30)',
        calculatedDose: '1 Cap OD SR',
        frequency: '1 OD 30 min B/F',
        isPediatric: false,
      });
    }
  }

  // 4. AMOXICILLIN + CLAVULANIC ACID
  else if (lower.includes('amoxicillin') || lower.includes('clavulan')) {
    if (isPediatricPatient && weightKg > 0) {
      const targetMg = Math.round(weightKg * 15);
      const ml228 = (targetMg / 40).toFixed(1);
      const ml457 = (targetMg / 80).toFixed(1);
      results.push({
        brandName: 'Augmentin Duo Dry Syrup',
        formulation: 'Syrup 228.5mg/5ml',
        calculatedDose: `${ml228} ml BD (${targetMg}mg)`,
        frequency: '1-0-1 for 5 days after food',
        isPediatric: true,
      });
      results.push({
        brandName: 'Clavam Forte Syrup',
        formulation: 'Syrup 457mg/5ml',
        calculatedDose: `${ml457} ml BD (${targetMg}mg)`,
        frequency: '1-0-1 for 5 days after food',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Augmentin 625 Tablet',
        formulation: 'Tablet 625mg',
        calculatedDose: '1 Tab BD (625mg)',
        frequency: '1-0-1 for 5 days after food',
        isPediatric: false,
      });
      results.push({
        brandName: 'Moxkind-CV 625 Tablet',
        formulation: 'Tablet 625mg',
        calculatedDose: '1 Tab BD (625mg)',
        frequency: '1-0-1 for 5 days after food',
        isPediatric: false,
      });
      results.push({
        brandName: 'Clavam 625 Tablet',
        formulation: 'Tablet 625mg',
        calculatedDose: '1 Tab BD (625mg)',
        frequency: '1-0-1 for 5 days after food',
        isPediatric: false,
      });
    }
  }

  // 5. CEFIXIME
  else if (lower.includes('cefixime')) {
    if (isPediatricPatient && weightKg > 0) {
      const targetMg = Math.round(weightKg * 4);
      const ml50 = (targetMg / 10).toFixed(1);
      const ml100 = (targetMg / 20).toFixed(1);
      results.push({
        brandName: 'Taxim-O 50 Dry Syrup',
        formulation: 'Syrup 50mg/5ml',
        calculatedDose: `${ml50} ml BD (${targetMg}mg)`,
        frequency: '1-0-1 for 5 days',
        isPediatric: true,
      });
      results.push({
        brandName: 'Zifi 100 Dry Syrup',
        formulation: 'Syrup 100mg/5ml',
        calculatedDose: `${ml100} ml BD (${targetMg}mg)`,
        frequency: '1-0-1 for 5 days',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Zifi 200 Tablet',
        formulation: 'Tablet 200mg',
        calculatedDose: '1 Tab BD (200mg)',
        frequency: '1-0-1 for 5 days',
        isPediatric: false,
      });
      results.push({
        brandName: 'Taxim-O 200 Tablet',
        formulation: 'Tablet 200mg',
        calculatedDose: '1 Tab BD (200mg)',
        frequency: '1-0-1 for 5 days',
        isPediatric: false,
      });
      results.push({
        brandName: 'Ceftas 200 Tablet',
        formulation: 'Tablet 200mg',
        calculatedDose: '1 Tab BD (200mg)',
        frequency: '1-0-1 for 5 days',
        isPediatric: false,
      });
    }
  }

  // 6. ONDANSETRON (BSA / WEIGHT CALCULATED)
  else if (lower.includes('ondansetron')) {
    if (isPediatricPatient && weightKg > 0) {
      const mgDose = (weightKg * 0.15).toFixed(1);
      const ml = (parseFloat(mgDose) / 0.4).toFixed(1);
      results.push({
        brandName: 'Emeset Syrup',
        formulation: 'Syrup 2mg/5ml',
        calculatedDose: `${ml} ml S.O.S (BSA: ${bsaM2.toFixed(2)}m²)`,
        frequency: 'S.O.S for nausea/vomiting',
        isPediatric: true,
      });
      results.push({
        brandName: 'Vomikind Syrup',
        formulation: 'Syrup 2mg/5ml',
        calculatedDose: `${ml} ml S.O.S (BSA: ${bsaM2.toFixed(2)}m²)`,
        frequency: 'S.O.S for nausea/vomiting',
        isPediatric: true,
      });
    } else {
      results.push({
        brandName: 'Emeset 4 MD Tablet',
        formulation: 'Tablet 4mg MD',
        calculatedDose: '1 Tab S.O.S',
        frequency: 'Dissolve on tongue S.O.S',
        isPediatric: false,
      });
      results.push({
        brandName: 'Vomikind 4 MD Tablet',
        formulation: 'Tablet 4mg MD',
        calculatedDose: '1 Tab S.O.S',
        frequency: 'Dissolve on tongue S.O.S',
        isPediatric: false,
      });
    }
  }

  // Check custom brands dictionary
  const key = genericFullName.toLowerCase().split(' ')[0];
  const customList = customBrandMap[key] || [];
  customList.forEach((c) => {
    if (!results.some((r) => r.brandName.toLowerCase() === c.toLowerCase())) {
      results.push({
        brandName: c,
        formulation: isPediatricPatient ? 'Custom Pediatric Dose' : 'Custom Adult Dose',
        calculatedDose: isPediatricPatient ? `${(weightKg * 10 / 20).toFixed(1)} ml` : '1 Unit',
        frequency: 'As Prescribed',
        isPediatric: isPediatricPatient,
      });
    }
  });

  if (results.length === 0) {
    results.push({
      brandName: `Generic ${genericFullName}`,
      formulation: isPediatricPatient ? 'Pediatric Liquid' : 'Adult Oral Form',
      calculatedDose: isPediatricPatient ? `${(weightKg * 10 / 20).toFixed(1)} ml` : '1 Unit',
      frequency: 'Standard Clinical Regimen',
      isPediatric: isPediatricPatient,
    });
  }

  return results;
}

export default function UserWorkspacePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Theme State: 'dark' vs 'day'
  const [theme, setTheme] = useState<'dark' | 'day'>('day');

  // Admin Presets State
  const [presets, setPresets] = useState<AdminPresets>(getAdminPresets());

  // Specialties & Templates State
  const [specialties, setSpecialties] = useState<Specialty[]>(getSpecialties());
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>(getSpecialties()[0]?.id || 'gen-med');
  const [drugCatalog, setDrugCatalog] = useState<DrugItem[]>(getDrugCatalog());

  // Modals State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [isPharmacopeiaModalOpen, setIsPharmacopeiaModalOpen] = useState(false);
  const [drugSearchQuery, setDrugSearchQuery] = useState('');
  const [drugFormulationFilter, setDrugFormulationFilter] = useState<'all' | 'inj' | 'tab' | 'cap' | 'syp' | 'drops' | 'topical'>('all');
  const [pharmaCategoryFilter, setPharmaCategoryFilter] = useState<string | null>(null);
  const [isPharmaSidebarCollapsed, setIsPharmaSidebarCollapsed] = useState(false);
  const [isPediatricModalOpen, setIsPediatricModalOpen] = useState(false);
  const [pediatricSearchQuery, setPediatricSearchQuery] = useState('');

  // Offline Drug Safety Rules Modal State
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [rulesList, setRulesList] = useState<DrugInteractionRule[]>([]);
  const [searchRuleQuery, setSearchRuleQuery] = useState('');
  const [newRuleA, setNewRuleA] = useState('');
  const [newRuleB, setNewRuleB] = useState('');
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleRec, setNewRuleRec] = useState('');
  const [newRuleSource, setNewRuleSource] = useState('Physician Custom Rule');
  const [newRuleSeverity, setNewRuleSeverity] = useState<'high' | 'moderate'>('high');

  const refreshRulesList = () => {
    setRulesList(getInteractionRules());
  };

  const handleOpenRulesModal = () => {
    refreshRulesList();
    setIsRulesModalOpen(true);
  };

  const handleAddCustomRuleInWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleA.trim() || !newRuleB.trim() || !newRuleTitle.trim()) {
      alert('Please fill in Drug A, Drug B, and Warning Title.');
      return;
    }

    addCustomInteractionRule({
      drugA: newRuleA.split(',').map((s) => s.trim().toLowerCase()),
      drugB: newRuleB.split(',').map((s) => s.trim().toLowerCase()),
      title: newRuleTitle.trim(),
      description: newRuleDesc.trim() || 'Custom drug interaction warning.',
      recommendation: newRuleRec.trim() || 'Exercise clinical judgment.',
      severity: newRuleSeverity,
      source: newRuleSource.trim() || 'Physician Custom Rule',
      category: 'CDSCO Alert'
    });

    setNewRuleA('');
    setNewRuleB('');
    setNewRuleTitle('');
    setNewRuleDesc('');
    setNewRuleRec('');
    refreshRulesList();
    setSaveStatus('Custom interaction rule saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Clinical Protocols & Order Sets State
  const [protocols, setProtocols] = useState<ClinicalProtocol[]>(getClinicalProtocols());
  const [isProtocolsModalOpen, setIsProtocolsModalOpen] = useState(false);
  const [protocolSearchTerm, setProtocolSearchTerm] = useState('');
  const [protocolCategoryFilter, setProtocolCategoryFilter] = useState<string | null>(null);
  const [isProtocolSidebarCollapsed, setIsProtocolSidebarCollapsed] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<any | null>(null);

  // Template Editor Popup State
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = useState(false);
  const [templateEditorSpecialtyId, setTemplateEditorSpecialtyId] = useState('');
  const [editingTemplate, setEditingTemplate] = useState<{
    id?: string;
    name: string;
    complaints: string;
    diagnosis: string;
    drugsText: string;
    testsText: string;
    advice: string;
  }>({
    name: '',
    complaints: '',
    diagnosis: '',
    drugsText: '',
    testsText: '',
    advice: '',
  });

  // Protocol Editor Popup State
  const [isProtocolEditorOpen, setIsProtocolEditorOpen] = useState(false);
  const [editingProtocol, setEditingProtocol] = useState<ClinicalProtocol>({
    id: '',
    title: '',
    category: 'general',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: '',
    redFlags: '',
    diagnosis: '',
    chiefComplaints: [],
    drugs: [],
    tests: [],
    advice: '',
  });

  // Drug Catalog Editor Popup State
  const [isDrugEditorOpen, setIsDrugEditorOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<{
    id?: string;
    genericName: string;
    category: 'adult' | 'pediatric' | 'infant' | 'all';
    dosage: string;
    duration: string;
    keywords: string;
  }>({
    genericName: '',
    category: 'adult',
    dosage: '',
    duration: '5 days',
    keywords: '',
  });

  const handleOpenAddDrug = () => {
    setEditingDrug({
      genericName: '',
      category: 'adult',
      dosage: '',
      duration: '5 days',
      keywords: '',
    });
    setIsDrugEditorOpen(true);
  };

  const handleOpenEditDrug = (drug: DrugItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingDrug({
      id: drug.id,
      genericName: drug.genericName || '',
      category: drug.category || 'adult',
      dosage: drug.dosage || '',
      duration: drug.duration || '5 days',
      keywords: drug.keywords || '',
    });
    setIsDrugEditorOpen(true);
  };

  const handleSaveDrugEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDrug.genericName || !editingDrug.genericName.trim()) {
      alert('Please enter a generic drug name.');
      return;
    }

    const newDrugItem: DrugItem = {
      id: editingDrug.id || `custom_drug_${Date.now()}`,
      genericName: editingDrug.genericName.trim(),
      category: editingDrug.category || 'adult',
      dosage: editingDrug.dosage?.trim() || '1 tablet once daily',
      duration: editingDrug.duration?.trim() || '5 days',
      keywords: editingDrug.keywords?.trim() || '',
    };

    let updatedCatalog: DrugItem[];
    if (editingDrug.id) {
      updatedCatalog = drugCatalog.map((d) => (d.id === editingDrug.id ? newDrugItem : d));
    } else {
      updatedCatalog = [newDrugItem, ...drugCatalog];
    }

    saveDrugCatalog(updatedCatalog);
    setDrugCatalog(getDrugCatalog());
    setIsDrugEditorOpen(false);
  };

  const handleDeleteDrug = (drugId: string, drugName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${drugName}" from your drug catalog?`)) {
      const updatedCatalog = drugCatalog.filter((d) => d.id !== drugId);
      saveDrugCatalog(updatedCatalog);
      setDrugCatalog(getDrugCatalog());
    }
  };

  const handleResetDrugCatalogToDefault = () => {
    if (confirm('Are you sure you want to reset your generic drug catalog back to original default database? Any custom added/edited drugs will be cleared.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('prescribepro_drugs_v1');
      }
      setDrugCatalog(getDrugCatalog());
    }
  };

  const handleOpenNewProtocolEditorForSpecialty = (specialtyId: string) => {
    setTemplateEditorSpecialtyId(specialtyId);
    const specName = specialties.find((s) => s.id === specialtyId)?.name || 'General';
    setEditingProtocol({
      id: '',
      title: '',
      category: (specName.toLowerCase() as any),
      targetGroup: 'Adult & Pediatric',
      guidelinesSummary: '',
      redFlags: '',
      diagnosis: '',
      chiefComplaints: [],
      drugs: [],
      tests: [],
      advice: '',
    });
    setIsProtocolEditorOpen(true);
  };

  const handleOpenEditProtocolEditorFromTemplate = (specialtyId: string, tpl: PrescriptionTemplate) => {
    setTemplateEditorSpecialtyId(specialtyId);
    const advStr = Array.isArray(tpl.advice) ? tpl.advice.join('\n') : (tpl.advice || '');
    setEditingProtocol({
      id: tpl.id,
      title: tpl.name,
      category: (specialties.find((s) => s.id === specialtyId)?.name?.toLowerCase() as any) || 'general',
      targetGroup: 'Adult & Pediatric',
      guidelinesSummary: tpl.notes || '',
      redFlags: '',
      diagnosis: tpl.diagnosis || '',
      chiefComplaints: tpl.complaints || [],
      drugs: tpl.drugs || [],
      tests: tpl.tests || [],
      advice: advStr,
    });
    setIsProtocolEditorOpen(true);
  };

  const handleSaveTemplateEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate.name.trim() || !templateEditorSpecialtyId) return;

    const complaintsArr = editingTemplate.complaints
      ? editingTemplate.complaints.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const drugsArr = editingTemplate.drugsText
      ? editingTemplate.drugsText.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];
    const testsArr = editingTemplate.testsText
      ? editingTemplate.testsText.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const adviceArr = editingTemplate.advice
      ? editingTemplate.advice.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    const updatedSpecialties = specialties.map((sp) => {
      if (sp.id !== templateEditorSpecialtyId) return sp;

      let updatedTemplates = [...sp.templates];
      if (editingTemplate.id) {
        updatedTemplates = updatedTemplates.map((t) =>
          t.id === editingTemplate.id
            ? {
                ...t,
                name: editingTemplate.name.trim(),
                complaints: complaintsArr,
                diagnosis: editingTemplate.diagnosis.trim(),
                drugs: drugsArr,
                tests: testsArr,
                advice: adviceArr,
              }
            : t
        );
      } else {
        const newTpl: PrescriptionTemplate = {
          id: `tpl-${Date.now()}`,
          name: editingTemplate.name.trim(),
          complaints: complaintsArr,
          diagnosis: editingTemplate.diagnosis.trim(),
          drugs: drugsArr,
          tests: testsArr,
          advice: adviceArr,
        };
        updatedTemplates.push(newTpl);
      }

      return {
        ...sp,
        templates: updatedTemplates,
      };
    });

    setSpecialties(updatedSpecialties);
    saveSpecialties(updatedSpecialties);
    setIsTemplateEditorOpen(false);
  };

  const handleApplyProtocol = (proto: ClinicalProtocol) => {
    if (proto.diagnosis) setProvisionalDiagnosis(proto.diagnosis);
    if (proto.chiefComplaints && proto.chiefComplaints.length > 0) setChiefComplaints(proto.chiefComplaints.join(', '));
    if (proto.drugs && proto.drugs.length > 0) {
      setSelectedDrugs(proto.drugs);
    }
    if (proto.tests && proto.tests.length > 0) setSelectedTests(proto.tests);
    if (proto.advice) setSpecificAdviceText(proto.advice);
    setIsProtocolsModalOpen(false);
    setSaveStatus(`Applied Clinical Protocol: "${proto.title}"`);
    setMobilePage('section2');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleOpenNewProtocolEditor = () => {
    setEditingProtocol({
      id: '',
      title: '',
      category: 'general',
      targetGroup: 'Adult & Pediatric',
      guidelinesSummary: '',
      redFlags: '',
      diagnosis: '',
      chiefComplaints: [],
      drugs: [],
      tests: [],
      advice: '',
    });
    setIsProtocolEditorOpen(true);
  };

  const handleOpenEditProtocolEditor = (proto: ClinicalProtocol) => {
    setEditingProtocol({ ...proto });
    setIsProtocolEditorOpen(true);
  };

  const handleSaveProtocolEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProtocol.title.trim()) return;

    let updatedProtocols = [...protocols];
    if (editingProtocol.id) {
      updatedProtocols = updatedProtocols.map((p) =>
        p.id === editingProtocol.id ? editingProtocol : p
      );
    } else {
      const newProto: ClinicalProtocol = {
        ...editingProtocol,
        id: `proto-${Date.now()}`,
      };
      updatedProtocols.push(newProto);
    }

    setProtocols(updatedProtocols);
    saveClinicalProtocols(updatedProtocols);

    if (templateEditorSpecialtyId) {
      const advArr = typeof editingProtocol.advice === 'string'
        ? editingProtocol.advice.split('\n').map(s => s.trim()).filter(Boolean)
        : editingProtocol.advice;

      const newTpl: PrescriptionTemplate = {
        id: editingProtocol.id || `tpl-${Date.now()}`,
        name: editingProtocol.title.trim(),
        complaints: editingProtocol.chiefComplaints || [],
        diagnosis: editingProtocol.diagnosis || '',
        drugs: editingProtocol.drugs || [],
        tests: editingProtocol.tests || [],
        advice: advArr,
        notes: editingProtocol.guidelinesSummary || '',
      };

      const updatedSpecialties = specialties.map((sp) => {
        if (sp.id !== templateEditorSpecialtyId) return sp;
        let updatedTemplates = [...sp.templates];
        const existingIdx = updatedTemplates.findIndex(t => t.id === newTpl.id);
        if (existingIdx >= 0) {
          updatedTemplates[existingIdx] = newTpl;
        } else {
          updatedTemplates.push(newTpl);
        }
        return { ...sp, templates: updatedTemplates };
      });

      setSpecialties(updatedSpecialties);
      saveSpecialties(updatedSpecialties);
    }

    setIsProtocolEditorOpen(false);
  };

  const handleDeleteProtocol = (protoId: string) => {
    if (!confirm('Are you sure you want to delete this clinical protocol?')) return;
    const updated = protocols.filter((p) => p.id !== protoId);
    setProtocols(updated);
    saveClinicalProtocols(updated);
  };

  // Doctor Rabies/ERIG Preference State
  const [preferredErigKey, setPreferredErigKey] = useState<string>('erig-300');

  // Prescribing Mode State: 'generic' vs 'brand'
  const [prescribingMode, setPrescribingMode] = useState<'generic' | 'brand'>('generic');

  // Generic ↔ Brand Picker Modal State
  const [isBrandPickerModalOpen, setIsBrandPickerModalOpen] = useState(false);
  const [activeGenericDrugForBrands, setActiveGenericDrugForBrands] = useState<DrugItem | null>(null);
  const [activeItemIndexForBrand, setActiveItemIndexForBrand] = useState<number | null>(null);
  const [newCustomBrandInput, setNewCustomBrandInput] = useState('');

  const handleOpenBrandPickerForItem = (index: number, fullDrugString: string) => {
    setActiveItemIndexForBrand(index);
    const cleanName = fullDrugString.split('(')[0].trim();
    setActiveGenericDrugForBrands({
      id: `item-${index}`,
      genericName: cleanName,
      category: 'all',
      dosage: '',
      duration: '',
    });
    setIsBrandPickerModalOpen(true);
  };

  // Custom Brand Map State (Generic Name -> Brand Names[])
  const [customBrandMap, setCustomBrandMap] = useState<Record<string, string[]>>({
    'paracetamol': ['Calpol 650mg', 'Dolo 650mg', 'Crocin 650mg', 'Pacimol 650mg', 'Febrinil 650', 'Sumo L 650'],
    'pantoprazole': ['Pan-40', 'Pantocid 40', 'Pantop 40', 'Pan-D SR', 'Pantocid-D SR'],
    'rabeprazole': ['Rabeloc 20', 'Rabekind 20', 'Razo 20', 'Rabium 20', 'Cyra-D'],
    'esomeprazole': ['Esomac 40', 'Nexpro 40', 'NEXPRO-RD', 'Sompraz 40'],
    'omeprazole': ['Omez 20', 'Omee 20', 'Omez-D'],
    'ranitidine': ['Aciloc 150', 'Rantac 150', 'Zinetac 150'],
    'amoxicillin': ['Mox 500', 'Novamox 500', 'Augmentin 625', 'Moxkind-CV 625', 'Clavam 625'],
    'cefuroxime': ['Ceftum 500', 'Forcef 500', 'Oratil 500', 'Cetil 500'],
    'ceftriaxone': ['Monocef 1g IV', 'Cefaxone 1g', 'Oframax 1g', 'Monocef 500mg'],
    'cefixime': ['Zifi 200', 'Taxim-O 200', 'Ceftas 200', 'Mahashaf 200', 'Omnicef 200'],
    'cefpodoxime': ['Gudcef 200', 'Cepodem 200', 'Doxcef 200', 'Monocef-O 200'],
    'azithromycin': ['Azithral 500', 'Aziwok 500', 'Zady 500', 'Azithro 500'],
    'ciprofloxacin': ['Ciplox 500', 'Cifran 500', 'Ciprolet 500'],
    'ofloxacin': ['Oflox 200', 'Zanocin 200', 'Oflox-OZ', 'Zenflox 200'],
    'levofloxacin': ['Levomac 500', 'Loxof 500', 'Factiv 500'],
    'doxycycline': ['Microdox-100', 'Dox-SL 100', 'Doxy-1 100'],
    'metronidazole': ['Metrogyl 400', 'Flagyl 400', 'Aristogyl 400'],
    'nitrofurantoin': ['Niftran 100 SR', 'Martifur 100 SR'],
    'fluconazole': ['Forcan 150', 'Zocon 150', 'Syscan 150'],
    'itraconazole': ['Itraspor 100', 'Canditral 100', 'IT-Mac 200'],
    'diclofenac': ['Voveran SR 100', 'Voveran AQ IM', 'Reactin 50', 'Dynapar AQ'],
    'aceclofenac': ['Zerodol-SP', 'Hifenac-P', 'Zerodol 100', 'Aceclo-100'],
    'ibuprofen': ['Brufen 400', 'Combiflam', 'Ibugesic Plus'],
    'tramadol': ['Tramazac 50', 'Ultracet', 'Contramal 100', 'Tramasure 100'],
    'drotaverine': ['Drotin 40', 'Drotaver 40', 'Drotin-M'],
    'dicyclomine': ['Cyclopam', 'Meftal-Spas', 'Spasmo-Proxyvon'],
    'ondansetron': ['Emeset 4mg', 'Vomikind 4mg', 'Ondem 4mg'],
    'metoclopramide': ['Perinorm 10mg', 'Reglan 10mg'],
    'domperidone': ['Domstal 10', 'Vomistop 10'],
    'deriphyllin': ['Deriphyllin 150mg', 'Deriphyllin Retard', 'Deriphyllin 2ml Inj'],
    'etofylline': ['Deriphyllin 150mg', 'Deriphyllin 2ml Inj'],
    'salbutamol': ['Asthalin 4mg', 'Asthalin Inhaler', 'Ventorlin'],
    'levosalbutamol': ['Levolin 1mg', 'Levolin Inhaler'],
    'budesonide': ['Budecort 200', 'Budecort Respules'],
    'montelukast': ['Telekast 10', 'Romilast 10', 'Monticope'],
    'furosemide': ['Lasix 40mg', 'Lasix 20mg Inj'],
    'torsemide': ['Dytor 10', 'Torsine 10'],
    'telmisartan': ['Telma 40', 'Telmikind 40', 'Tazloc 40', 'Telma-H'],
    'amlodipine': ['Amlong 5', 'Stamlo 5', 'Amlopin 5'],
    'metoprolol': ['Betaloc XR 25', 'Metolar 50'],
    'atenolol': ['Aten 50', 'Tenormin 50'],
    'ramipril': ['Cardace 2.5', 'Ramcor 5'],
    'rosuvastatin': ['Rosuvas 10', 'Rosulip 10', 'Crestor 10'],
    'atorvastatin': ['Atorva 10', 'Lipivas 10', 'Storvas 10'],
    'metformin': ['Glycomet 500 SR', 'Obimet 500', 'Riomet 500'],
    'teneligliptin': ['Tenepure 20', 'Zita-Plus 20'],
    'dapagliflozin': ['Forxiga 10', 'Dapa-10'],
    'empagliflozin': ['Jardiance 10', 'Gibo-10'],
    'glimepiride': ['Amaryl 1mg', 'Amaryl 2mg', 'Amaryl 3mg', 'Amaryl 4mg', 'Glimestar 1mg', 'Glimestar 2mg', 'Glimestar M1', 'Glimestar M2', 'Glycomet-GP 1', 'Glycomet-GP 2'],
    'clonazepam': ['Clonotril 0.5', 'Zapiz 0.5', 'Epitril 0.5'],
    'alprazolam': ['Alprax 0.25', 'Restyl 0.25', 'Trika 0.25'],
    'lorazepam': ['Ativan 1mg', 'Lopez 2mg'],
    'escitalopram': ['Nexito 10', 'Cilentra 10', 'Depran 10'],
    'phenytoin': ['Eptoin 100', 'Dilantin 100'],
    'levetiracetam': ['Levipil 500', 'Levepsy 500'],
    'valproate': ['Encorate Chrono 300', 'Valparin 200'],
    'hydrocortisone': ['Efcorlin 100mg IV', 'Cort-S 100mg'],
    'dexamethasone': ['Decadron 8mg Inj', 'Dexona 4mg'],
    'prednisolone': ['Wysolone 5mg', 'Omnacortil 10mg'],
    'defcort': ['Defcort 6mg', 'Defza 6mg'],
    'iron sucrose': ['Encifer 100mg IV', 'Orofer 100mg IV', 'Ferium 100mg'],
    'artesunate': ['Falcinil 60mg IV', 'Larinate 60mg'],
    'normal saline': ['NS 0.9% 500ml IV', 'NS 100ml Infusion'],
    'ringer lactate': ['RL 500ml IV Infusion'],
    'dextrose 5%': ['D5W 500ml IV Infusion'],
    'dextrose 10%': ['D10W 500ml IV Infusion'],
    'dextrose 25%': ['D25W 100ml IV Stat Bolus'],
    'dextrose 50%': ['D50W 100ml IV Emergency'],
    'dextrose normal saline': ['DNS 500ml IV Infusion'],
    'isolyte': ['Isolyte-P 500ml', 'Isolyte-M 500ml'],
    'mannitol': ['Osmitrol 20% 100ml', 'Mannitol 20% Infusion'],
    'xylometazoline': ['Otrivin 0.1% Adult Nasal Spray', 'Otrivin 0.05% Pediatric Drops', 'Nasoclear Saline Spray'],
    'oxymetazoline': ['Nasivion 0.05% Adult Nasal Spray', 'Nasivion 0.025% Pediatric Drops', 'Nasivion Mini Drops'],
    'oxy': ['Nasivion 0.05% Adult Nasal Spray', 'Trileptal 300mg', 'Terramycin 250mg', 'Drytop 5mg'],
    'sucralfate': ['Sucrafil 1g/5ml Suspension', 'Sucrafil-O Suspension', 'Sucral Suspension'],
    'erythromycin': ['Erythrocin 250mg Tablet', 'Erythrocin 500mg Tablet', 'Erytop Lotion'],
    'roxithromycin': ['Roxid 150mg Tablet', 'Roxid 300mg Tablet', 'Roxibact 150'],
    'clarithromycin': ['Claribid 250mg Tablet', 'Claribid 500mg Tablet', 'Clariwin 500'],
    'lincomycin': ['Lincocin 500mg Capsule', 'Lincocin 600mg/2ml Inj'],
    'clindamycin': ['Dalacin C 300mg Capsule', 'Dalacin C 600mg/4ml Inj', 'Clindac A Gel'],
    'vancomycin': ['Vancocin 500mg IV Inj', 'Vancocin 1g IV Inj'],
    'linezolid': ['Lizoforce 600mg Tablet', 'Lizoforce 600mg/300ml IV Infusion', 'Linospan 600'],
    'faropenem': ['Farobact 200mg Tablet', 'Farozet 200'],
    'meropenem': ['Meroplan 1g IV Inj', 'Meropen 1g IV Inj'],
    'colistin': ['Colistimethate 3 Million IU IV', 'Colistin 1 Million IU'],
    'pralidoxime': ['Pam 500mg Inj', 'Pralidoxime 500mg IV'],
    'atropine': ['Atropine 0.6mg/1ml Inj', 'Atropine 1% Eye Drops'],
    'gliclazide': ['Diamicron 60mg MR', 'Glycinorm 60mg', 'Diamicron Mex 500'],
    'vildagliptin': ['Galvus 50mg', 'Jalra 50mg', 'Galvus Met 50/500', 'Zomelis 50mg'],
    'semaglutide': ['Rybelsus 3mg', 'Rybelsus 7mg', 'Rybelsus 14mg', 'Ozempic 1mg Pen'],
    'tirzepatide': ['Mounjaro 2.5mg Pen', 'Mounjaro 5mg Pen', 'Mounjaro 10mg Pen'],
    'levothyroxine': ['Thyronorm 25mcg', 'Thyronorm 50mcg', 'Thyronorm 75mcg', 'Thyronorm 100mcg', 'Eltroxin 100mcg'],
    'carbimazole': ['Neomercazole 5mg', 'Neomercazole 10mg', 'Neomercazole 20mg'],
    'alendronate': ['Fosamax 70mg Weekly', 'Osteofos 70mg'],
    'sacubitril': ['Vymada 50mg', 'Vymada 100mg', 'Cidmus 50mg'],
    'risperidone': ['Respidon 2mg', 'Risperdal 2mg'],
    'olanzapine': ['Oleanz 5mg', 'Oleanz 10mg', 'Zapiz 5mg'],
    'haloperidol': ['Serenace 5mg', 'Serenace 1.5mg'],
    'lithium': ['Lithosun 300mg SR', 'Lithosun 400mg SR'],
    'flunarizine': ['Sibelium 5mg', 'Sibelium 10mg', 'Vasograin'],
    'sumatriptan': ['Suminat 50mg', 'Suminat 100mg'],
    'rifaximin': ['Rifagut 400mg', 'Rifagut 550mg'],
    'lactulose': ['Duphalac 15ml Syrup', 'Looz Syrup'],
    'k-bind': ['K-Bind 15g Sachet'],
    'orofer': ['Orofer XT Tablet', 'Orofer XT Syrup'],
    'venofer': ['Venofer 100mg IV Inj', 'Encrate 100mg IV'],
    'pletal': ['Pletal 50mg', 'Pletal 100mg', 'Pletoz 100mg'],
    'trental': ['Trental 400mg SR'],
    'refresh tears': ['Refresh Tears Eye Drops 10ml', 'Tears Naturale Drops'],
  });

  // Hard Drive Folder & GitHub Updates State
  const [connectedFolderName, setConnectedFolderName] = useState<string | null>(null);
  const [githubReleaseInfo, setGithubReleaseInfo] = useState<GitHubReleaseInfo | null>(null);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateStatusMsg, setUpdateStatusMsg] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    setSpecialties(getSpecialties());
    setDrugCatalog(getDrugCatalog());
    setProtocols(getClinicalProtocols());

    const savedPref = localStorage.getItem('prescribepro_erig_pref');
    if (savedPref) setPreferredErigKey(savedPref);

    const savedRxMode = localStorage.getItem('prescribepro_rx_mode');
    if (savedRxMode === 'generic' || savedRxMode === 'brand') {
      setPrescribingMode(savedRxMode);
    }

    const savedBrands = localStorage.getItem('prescribepro_custom_brands');
    if (savedBrands) {
      try {
        setCustomBrandMap(JSON.parse(savedBrands));
      } catch (e) {
        console.error(e);
      }
    }

    if (typeof window !== 'undefined') {
      restoreConnectedFolderHandle().then(({ folderName, active }) => {
        if (folderName) setConnectedFolderName(folderName);
      });
      // Automatically search for updates on every login / page load
      handleCheckGitHubRelease();
    }
  }, []);

  const handleConnectFolder = async () => {
    const res = await connectLocalHardDriveFolder();
    if (res.folderName) {
      setConnectedFolderName(res.folderName);
      if (res.success) {
        setSaveStatus(`✓ Connected & Saved: prescribepro_database.sqlite updated in "${res.folderName}"!`);
      } else {
        setSaveStatus(`⚠️ Connected to "${res.folderName}" but initial file write failed: ${res.error}`);
      }
      setTimeout(() => setSaveStatus(null), 5000);
    }
  };

  const handleSyncDatabaseToFolderNow = async () => {
    const res = await syncSqliteToConnectedFolder();
    if (res.success) {
      setSaveStatus(`✓ Success: prescribepro_database.sqlite saved in "${connectedFolderName || 'Connected Folder'}"!`);
    } else {
      alert(`Folder write message: ${res.error || 'Please click Connect Folder to re-grant permission.'}`);
      setSaveStatus(`⚠️ Folder write failed: ${res.error || 'Please click Connect Folder to re-grant permission.'}`);
    }
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleSaveDbToChosenFolder = async () => {
    const res = await saveSqliteDbWithFilePicker();
    if (res.success && res.fileName) {
      setSaveStatus(`✓ Saved SQLite Database file "${res.fileName}" directly to your selected location!`);
      setTimeout(() => setSaveStatus(null), 5000);
    } else if (res.error) {
      alert(`Could not save file: ${res.error}`);
    }
  };

  const handleCheckGitHubRelease = async () => {
    setIsCheckingUpdate(true);
    setUpdateStatusMsg('Checking GitHub repository for updates...');
    const release = await checkForGitHubUpdates('1.0.0');
    setIsCheckingUpdate(false);
    if (release) {
      setGithubReleaseInfo(release);
      if (release.hasUpdate) {
        setUpdateStatusMsg(`✨ New update available: ${release.tagName}!`);
      } else {
        setUpdateStatusMsg(`You are using the latest version (${release.tagName})!`);
      }
    } else {
      setUpdateStatusMsg('Unable to reach GitHub. Please check internet connection.');
    }
  };

  const matchDrugFormulation = (
    drug: { genericName: string; dosage?: string; keywords?: string },
    filter: 'all' | 'inj' | 'tab' | 'cap' | 'syp' | 'drops' | 'topical'
  ): boolean => {
    if (!filter || filter === 'all') return true;

    const name = (drug.genericName || '').toLowerCase();
    const dose = (drug.dosage || '').toLowerCase();
    const fullText = `${name} ${dose}`;

    if (filter === 'inj') {
      return (
        name.startsWith('inj') ||
        /\b(inj|inj\.|injection|infusion|vial|ampoule|amp|iv|im|iv\/im)\b/i.test(fullText)
      );
    }

    if (filter === 'tab') {
      if (name.startsWith('inj') || /\b(inj|inj\.|injection|infusion|vial|ampoule)\b/i.test(name)) return false;
      return (
        name.startsWith('tab') ||
        /\b(tab|tab\.|tablet|tablets|dt|md|dispersible|chewable|sr|xl|er|cr|mr)\b/i.test(fullText)
      );
    }

    if (filter === 'cap') {
      if (name.startsWith('inj') || /\b(inj|inj\.|injection|infusion|vial)\b/i.test(name)) return false;
      return (
        name.startsWith('cap') ||
        /\b(cap|cap\.|capsule|capsules|softgel)\b/i.test(fullText)
      );
    }

    if (filter === 'syp') {
      return (
        name.startsWith('syp') ||
        /\b(syp|syp\.|syrup|suspension|linctus|expectorant|elixir|liquid)\b/i.test(fullText)
      );
    }

    if (filter === 'drops') {
      if (name.startsWith('inj') || /\b(inj|inj\.|injection|infusion|vial)\b/i.test(name)) return false;
      return (
        /\b(drop|drops|drop\.|drops\.|eyedrop|eardrop|nasaldrop)\b/i.test(fullText) ||
        fullText.includes('eye drop') || fullText.includes('ear drop') || fullText.includes('nasal drop')
      );
    }

    if (filter === 'topical') {
      return (
        /\b(cream|ointment|oint|oint\.|gel|lotion|shampoo|mouthwash|gargle|spray|patch|paste)\b/i.test(fullText)
      );
    }

    return true;
  };

  const applyBrandToPrescribedLine = (
    originalLine: string,
    brandName: string,
    formulation?: string
  ): string => {
    const text = originalLine.trim();
    const lower = text.toLowerCase();

    const hasWord = (...words: string[]) => {
      return words.some((w) => new RegExp(`\\b${w.replace('.', '\\.')}\\b`, 'i').test(lower));
    };

    let prefix = 'Tab.';

    if (lower.startsWith('inj') || hasWord('inj', 'inj.', 'injection', 'infusion', 'vial', 'ampoule', 'iv', 'im', 'stat iv', 'iv/im')) {
      prefix = 'Inj.';
    } else if (lower.startsWith('cap') || hasWord('cap', 'cap.', 'capsule', 'capsules', 'softgel')) {
      prefix = 'Cap.';
    } else if (lower.startsWith('syp') || hasWord('syp', 'syp.', 'syrup', 'suspension', 'linctus', 'expectorant', 'elixir')) {
      prefix = 'Syp.';
    } else if (lower.startsWith('drop') || lower.startsWith('drops') || hasWord('drop', 'drops', 'drop.', 'drops.', 'ophthalmic', 'otic')) {
      prefix = 'Drops.';
    } else if (lower.startsWith('oint') || lower.startsWith('cream') || lower.startsWith('gel') || hasWord('ointment', 'cream', 'gel', 'lotion', 'patch')) {
      prefix = 'Oint.';
    } else if (lower.startsWith('tab') || hasWord('tab', 'tab.', 'tablet', 'tablets', 'dt', 'md')) {
      prefix = 'Tab.';
    } else if (formulation) {
      const f = formulation.toLowerCase();
      if (f.includes('inj') || f.includes('vial') || f.includes('amp') || f.includes('infusion')) prefix = 'Inj.';
      else if (f.includes('cap') || f.includes('capsule')) prefix = 'Cap.';
      else if (f.includes('susp') || f.includes('suspension')) prefix = 'Susp.';
      else if (f.includes('syp') || f.includes('syrup')) prefix = 'Syp.';
      else if (f.includes('eye')) prefix = 'Drop. (Eye)';
      else if (f.includes('ear') || f.includes('nasal') || f.includes('ent')) prefix = 'Drop. (ENT)';
      else if (f.includes('drop')) prefix = 'Drop.';
      else if (f.includes('oint') || f.includes('cream') || f.includes('gel')) prefix = 'Oint.';
      else prefix = 'Tab.';
    }

    let cleanBrand = brandName
      .replace(/^(inj\.|tab\.|cap\.|syp\.|susp\.|drop\.|drops\.|oint\.|inj|tab|cap|syp|susp|drop|drops|oint)\s+/i, '')
      .replace(/\b(tablet|tablets|capsule|capsules|syrup|suspension|injection)\b/gi, '')
      .trim();

    const matchInst = text.match(/\(.*\).*/);
    const inst = matchInst ? ` ${matchInst[0].trim()}` : '';

    return `${prefix} ${cleanBrand}${inst}`;
  };

  const handleSetPrescribingMode = (mode: 'generic' | 'brand') => {
    setPrescribingMode(mode);
    localStorage.setItem('prescribepro_rx_mode', mode);
  };

  const handleSetErigPreference = (key: string) => {
    setPreferredErigKey(key);
    localStorage.setItem('prescribepro_erig_pref', key);
  };

  const formatDrugLineForDisplay = (line: string): string => {
    const trimmed = line.trim();
    if (!trimmed) return trimmed;

    const lower = trimmed.toLowerCase();

    // OPTION 3 FOR TOPICAL: NO PREFIX (Keep exact formulation name without prepending Oint. or Top.)
    if (/\b(topical solution|skin solution|cutaneous solution|oint|oint\.|ointment|cream|gel|lotion|shampoo|mouthwash|gargle|patch|paste|toothpaste)\b/i.test(lower)) {
      return trimmed.replace(/^(Oint\.|Top\.|oint\.|top\.)\s+/i, '').trim();
    }

    let prefix = 'Tab.';

    if (/\b(inj|inj\.|injection|infusion|vial|ampoule|amp|iv|im)\b/i.test(lower)) {
      prefix = 'Inj.';
    } else if (/\b(cap|cap\.|capsule|capsules|softgel)\b/i.test(lower)) {
      prefix = 'Cap.';
    } else if (/\b(susp|susp\.|suspension|oral suspension)\b/i.test(lower)) {
      prefix = 'Susp.';
    } else if (/\b(syp|syp\.|syrup|elixir|liquid|linctus|expectorant)\b/i.test(lower)) {
      prefix = 'Syp.';
    } else if (/\b(eyedrop|eyedrops|eye drop|eye drops|ophthalmic|opthalmic|ophthalmic solution|opthalmic solution|eye solution|eye)\b/i.test(lower)) {
      prefix = 'Drop. (Eye)';
    } else if (/\b(eardrop|eardrops|ear drop|ear drops|nasaldrop|nasaldrops|nasal drop|nasal drops|nasal spray|spray|ent solution|ear solution|nasal solution|otic|ear|nasal)\b/i.test(lower)) {
      prefix = 'Drop. (ENT)';
    } else if (/\b(drop|drops|drop\.|drops\.|oral drop|oral drops|pediatric drop|pediatric drops)\b/i.test(lower)) {
      prefix = 'Drop.';
    } else if (/\b(tab|tab\.|tablet|tablets|dt|md|dispersible)\b/i.test(lower)) {
      prefix = 'Tab.';
    }

    let clean = trimmed
      .replace(/^(Tab\.|Cap\.|Syp\.|Susp\.|Inj\.|Drop\.\s*\(Eye\)|Drop\.\s*\(ENT\)|Drop\.|Drops\.|Oint\.|tablet|tablets|capsule|capsules|syrup|suspension|injection|inj\.|tab\.|cap\.|syp\.|susp\.|drop\.|drops\.|oint\.)\s+/i, '')
      .trim();

    clean = clean
      .replace(/\b(tablet|tablets|capsule|capsules|syrup|suspension|injection|eye drops|ear drops|nasal drops|eyedrops|eardrops|eye drop|ear drop|nasal drop|nasal spray|spray|oral drops|oral drop|ophthalmic solution|opthalmic solution|ent solution|eye solution|ear solution|nasal solution)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `${prefix} ${clean}`;
  };

  const isDrugInSelectedList = (rawName: string) => {
    if (!rawName) return false;
    const cleanRaw = rawName
      .split('(')[0]
      .toLowerCase()
      .replace(/^(tab\.|cap\.|syp\.|susp\.|inj\.|drop\.\s*\(eye\)|drop\.\s*\(ent\)|drop\.|drops\.|oint\.|inj|tab|cap|syp|susp|drop|drops|oint)\s+/g, '')
      .replace(/\b(tablet|tablets|capsule|capsules|syrup|suspension|injection|eye drops|ear drops|nasal drops|eyedrops|eardrops|eye drop|ear drop|nasal drop|nasal spray|spray|oral drops|oral drop|ophthalmic solution|opthalmic solution|ent solution|eye solution|ear solution|nasal solution|topical solution|skin solution|cutaneous solution)\b/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();

    if (!cleanRaw) return false;

    return selectedDrugs.some((s) => {
      const cleanS = s
        .split('(')[0]
        .toLowerCase()
        .replace(/^(tab\.|cap\.|syp\.|susp\.|inj\.|drop\.\s*\(eye\)|drop\.\s*\(ent\)|drop\.|drops\.|oint\.|inj|tab|cap|syp|susp|drop|drops|oint)\s+/g, '')
        .replace(/\b(tablet|tablets|capsule|capsules|syrup|suspension|injection|eye drops|ear drops|nasal drops|eyedrops|eardrops|eye drop|ear drop|nasal drop|nasal spray|spray|oral drops|oral drop|ophthalmic solution|opthalmic solution|ent solution|eye solution|ear solution|nasal solution|topical solution|skin solution|cutaneous solution)\b/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();

      if (!cleanS) return false;
      return cleanS === cleanRaw;
    });
  };

  const getDynamicDosageForPatient = (d: DrugItem, weightKg: number): string => {
    if (weightKg <= 0) return d.dosage;

    const lowerName = d.genericName.toLowerCase();

    if (lowerName.includes('paracetamol') && lowerName.includes('250mg')) {
      const mg = Math.round(weightKg * 15);
      const ml = (mg / 50).toFixed(1);
      return `${ml} ml (${mg}mg @ 15mg/kg) 3-4 times daily S.O.S`;
    }

    if (lowerName.includes('paracetamol') && lowerName.includes('125mg')) {
      const mg = Math.round(weightKg * 15);
      const ml = (mg / 25).toFixed(1);
      return `${ml} ml (${mg}mg @ 15mg/kg) 3-4 times daily S.O.S`;
    }

    if (lowerName.includes('paracetamol') && lowerName.includes('120mg')) {
      const mg = Math.round(weightKg * 15);
      const ml = (mg / 24).toFixed(1);
      return `${ml} ml (${mg}mg @ 15mg/kg) 3-4 times daily S.O.S`;
    }

    if (lowerName.includes('paracetamol') && (lowerName.includes('100mg/ml') || lowerName.includes('drops'))) {
      const mg = Math.round(weightKg * 15);
      const ml = (mg / 100).toFixed(1);
      const drops = Math.round(parseFloat(ml) * 20);
      return `${ml} ml (${drops} drops, ${mg}mg @ 15mg/kg) 3-4 times daily S.O.S`;
    }

    if (lowerName.includes('ibuprofen') && lowerName.includes('100mg')) {
      const mg = Math.round(weightKg * 10);
      const ml = (mg / 20).toFixed(1);
      return `${ml} ml (${mg}mg @ 10mg/kg) 3 times daily after food`;
    }

    if ((lowerName.includes('mefenamic') || lowerName.includes('meftal')) && lowerName.includes('100mg')) {
      const mg = Math.round(weightKg * 6.5);
      const ml = (mg / 20).toFixed(1);
      return `${ml} ml (${mg}mg @ 6.5mg/kg) 2-3 times daily`;
    }

    if ((lowerName.includes('amoxicillin') || lowerName.includes('amox')) && lowerName.includes('228')) {
      const mg = Math.round(weightKg * 15);
      const ml = (mg / 40).toFixed(1);
      return `${ml} ml (${mg}mg @ 15mg/kg) twice daily (1-0-1 for 5 days)`;
    }

    if (lowerName.includes('cefixime') && lowerName.includes('50mg')) {
      const mg = Math.round(weightKg * 4);
      const ml = (mg / 10).toFixed(1);
      return `${ml} ml (${mg}mg @ 4mg/kg) twice daily (1-0-1 for 5 days)`;
    }

    // 9. Ambroxol + Terbutaline + Guaifenesin Syrup (Ascoril LS / Mucolite / Ambrolite)
    if (lowerName.includes('ambroxol') && (lowerName.includes('terbutaline') || lowerName.includes('guaifenesin'))) {
      const ml = Math.min(5, Math.max(1.25, parseFloat((weightKg * 0.3).toFixed(1))));
      return `${ml} ml (0.3 ml/kg) 3 times daily after food`;
    }

    // 10. Levosalbutamol + Ambroxol + Guaifenesin Syrup
    if (lowerName.includes('levosalbutamol') || (lowerName.includes('salbutamol') && lowerName.includes('ambroxol'))) {
      const ml = Math.min(5, Math.max(1.25, parseFloat((weightKg * 0.25).toFixed(1))));
      return `${ml} ml (0.25 ml/kg) 3 times daily after food`;
    }

    // 11. Salbutamol 2mg/5ml Syrup
    if (lowerName.includes('salbutamol') && lowerName.includes('2mg')) {
      const ml = Math.min(5, Math.max(1.25, parseFloat((weightKg * 0.25).toFixed(1))));
      return `${ml} ml (0.1mg/kg) 3 times daily`;
    }

    // 13. Cetirizine 5mg/5ml Syrup
    if (lowerName.includes('cetirizine') && (lowerName.includes('syrup') || lowerName.includes('5mg/5ml'))) {
      const ml = Math.min(5, Math.max(1.25, parseFloat((weightKg * 0.25).toFixed(1))));
      return `${ml} ml once daily at bedtime`;
    }

    // 14. Cefpodoxime Proxetil 50mg/5ml & 100mg/5ml Dry Syrup (5 mg/kg/dose BD)
    if (lowerName.includes('cefpodoxime')) {
      const mg = Math.round(weightKg * 5);
      const is100 = lowerName.includes('100mg');
      const ml = (mg / (is100 ? 20 : 10)).toFixed(1);
      return `${ml} ml (${mg}mg @ 5mg/kg) twice daily (1-0-1 for 5 days)`;
    }

    // 15. Amoxicillin 125mg/5ml & 250mg/5ml Syrup (13.3 mg/kg/dose TDS)
    if (lowerName.includes('amoxicillin') && !lowerName.includes('clav')) {
      const mg = Math.round(weightKg * 13.3);
      const is250 = lowerName.includes('250mg');
      const ml = (mg / (is250 ? 50 : 25)).toFixed(1);
      return `${ml} ml (${mg}mg @ 13.3mg/kg) 3 times daily (1-1-1 for 7 days)`;
    }

    // 16. Metronidazole 100mg/5ml Suspension (10 mg/kg/dose TDS)
    if (lowerName.includes('metronidazole') || lowerName.includes('flagyl')) {
      const mg = Math.round(weightKg * 10);
      const ml = (mg / 20).toFixed(1);
      return `${ml} ml (${mg}mg @ 10mg/kg) 3 times daily after food`;
    }

    // 17. Ofloxacin 50mg/5ml Suspension (5 mg/kg/dose BD)
    if (lowerName.includes('ofloxacin') || lowerName.includes('oflox')) {
      const mg = Math.round(weightKg * 5);
      const ml = (mg / 10).toFixed(1);
      return `${ml} ml (${mg}mg @ 5mg/kg) twice daily after food`;
    }

    // 18. Co-trimoxazole Syrup (4 mg TMP / kg / dose BD)
    if (lowerName.includes('trimethoprim') || lowerName.includes('cotrimoxazole') || lowerName.includes('co-trimoxazole') || lowerName.includes('septran')) {
      const mg = Math.round(weightKg * 4);
      const ml = (mg / 8).toFixed(1);
      return `${ml} ml (${mg}mg TMP @ 4mg/kg) twice daily after food`;
    }

    // 19. Prednisolone 5mg/5ml Syrup (1 mg/kg/day OD)
    if (lowerName.includes('prednisolone') || lowerName.includes('wysolone')) {
      const mg = Math.round(weightKg * 1);
      const ml = (mg / 1).toFixed(1);
      return `${ml} ml (${mg}mg @ 1mg/kg) once daily after breakfast`;
    }

    // 20. Deflazacort 6mg/5ml Suspension (0.25 mg/kg/dose BD)
    if (lowerName.includes('deflazacort') || lowerName.includes('defcort')) {
      const mg = (weightKg * 0.25).toFixed(1);
      const ml = (parseFloat(mg) / 1.2).toFixed(1);
      return `${ml} ml (${mg}mg @ 0.25mg/kg) twice daily after meals`;
    }

    // 21. Zinc Sulfate Syrup (20mg/5ml)
    if (lowerName.includes('zinc') && (lowerName.includes('syrup') || lowerName.includes('solution') || lowerName.includes('20mg'))) {
      const ml = weightKg < 7 ? '2.5 ml (10mg)' : '5.0 ml (20mg)';
      return `${ml} once daily for 14 days during/after diarrhea`;
    }

    // 22. General Pediatric Cough Syrup / Liquid Safety Override for Weight < 30kg:
    // If dosage contains adult 10ml, recalculate to safe pediatric dose (0.25-0.3 ml/kg)
    if (weightKg < 30 && (d.category === 'pediatric' || lowerName.includes('syrup') || lowerName.includes('suspension')) && /\b(10\s*ml|10ml)\b/i.test(d.dosage)) {
      const safeMl = Math.min(5, Math.max(1.25, parseFloat((weightKg * 0.3).toFixed(1))));
      return `${safeMl} ml (Calculated for ${weightKg}kg) 3 times daily S.O.S`;
    }

    return d.dosage;
  };

  const handleEditableFocus = (e: React.FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent || '';
    if (text.trim().startsWith('Click to edit')) {
      e.currentTarget.textContent = '';
    } else if (text.trim().length > 0) {
      setTimeout(() => {
        const range = document.createRange();
        range.selectNodeContents(e.currentTarget);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }, 10);
    }
  };

  const getClinicalBrandSuggestionsList = (genericFullName: string) => {
    const w = parseFloat(vitals.weight) || 0;
    const a = parseFloat(patient.age) || 30;
    const bsa = calculateBsa(parseFloat(vitals.height) || 0, w);
    return getClinicalBrandSuggestions(genericFullName, w, a, bsa, customBrandMap);
  };

  const getBrandsForGeneric = (genericFullName: string): string[] => {
    const lower = genericFullName.toLowerCase();
    const matches: string[] = [];

    for (const [key, brands] of Object.entries(customBrandMap)) {
      if (lower.includes(key.toLowerCase())) {
        brands.forEach((b) => {
          if (!matches.includes(b)) matches.push(b);
        });
      }
    }

    if (matches.length > 0) return matches;

    const words = genericFullName.split(' ');
    const mainWord = words[0] || 'Medication';
    return [
      `Brand ${mainWord} 500mg`,
      `Brand ${mainWord} Forte`,
      `Generic ${genericFullName}`,
    ];
  };

  const handleAddCustomBrand = (genericFullName: string) => {
    if (!newCustomBrandInput.trim()) return;
    const key = genericFullName.toLowerCase().split(' ')[0];
    const current = customBrandMap[key] || [];
    const updated = {
      ...customBrandMap,
      [key]: [...current, newCustomBrandInput.trim()]
    };
    setCustomBrandMap(updated);
    localStorage.setItem('prescribepro_custom_brands', JSON.stringify(updated));
    setNewCustomBrandInput('');
  };

  const handleDeleteBrand = (genericFullName: string, brandToDelete: string) => {
    const key = genericFullName.toLowerCase().split(' ')[0];
    const current = customBrandMap[key] || [];
    const updatedList = current.filter((b) => b !== brandToDelete);
    const updatedMap = { ...customBrandMap, [key]: updatedList };
    setCustomBrandMap(updatedMap);
    localStorage.setItem('prescribepro_custom_brands', JSON.stringify(updatedMap));
  };

  // Modal Editing Forms
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newDrugName, setNewDrugName] = useState('');
  const [newDrugDosage, setNewDrugDosage] = useState('');
  const [newDrugDuration, setNewDrugDuration] = useState('');

  // Selected Ticked Drugs on Prescription
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);

  // Patient Registration Form State
  const [patient, setPatient] = useState({
    regNo: '',
    mobile: '',
    name: '',
    age: '',
    gender: 'Male',
    careOf: '',
    address: '',
    allergies: '',
  });

  // Medical History State
  const [medicalHistory, setMedicalHistory] = useState<MedicalRecord[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Vitals State
  const [vitals, setVitals] = useState({
    height: '',
    weight: '',
    bp: '',
    pulse: '',
    temp: '',
  });

  // Diagnostic Tests & Results State
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testFilterQuery, setTestFilterQuery] = useState('');
  const [newCustomTestInput, setNewCustomTestInput] = useState('');
  const [testResultsText, setTestResultsText] = useState('');
  const [customLabTestsText, setCustomLabTestsText] = useState('');

  // Additional Advice State
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([]);
  const [customAdviceText, setCustomAdviceText] = useState('');

  // Clinical Examination & Diagnostic History States
  const [chiefComplaints, setChiefComplaints] = useState('');
  const [signsSymptoms, setSignsSymptoms] = useState('');
  const [clinicalHistory, setClinicalHistory] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [drugHistory, setDrugHistory] = useState('');
  const [examinationFindings, setExaminationFindings] = useState('');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('');
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState('');
  const [specificAdviceText, setSpecificAdviceText] = useState('');

  // Surgical Procedures, Maneuvers & Non-Drug Care State
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [customProcedureText, setCustomProcedureText] = useState('');

  // Offline Drug Safety Warnings & Physician Override State
  const [ignoredWarningIds, setIgnoredWarningIds] = useState<string[]>([]);

  const detectedSafetyWarnings = useMemo(() => {
    return checkPrescriptionSafety(selectedDrugs, patient.allergies, '', ignoredWarningIds);
  }, [selectedDrugs, patient.allergies, ignoredWarningIds]);

  const handleDismissWarning = (warningId: string) => {
    setIgnoredWarningIds((prev) => [...prev, warningId]);
  };

  const handleRemoveConflictingDrug = (drugName: string) => {
    setSelectedDrugs((prev) => prev.filter((d) => d !== drugName));
  };

  const handleAutoDeduplicateAllRx = () => {
    if (detectedSafetyWarnings.length === 0) return;
    const drugsToRemove = new Set<string>();
    detectedSafetyWarnings.forEach((w) => {
      if (w.foundDrugB && w.foundDrugB !== 'Patient Safety Alert') {
        drugsToRemove.add(w.foundDrugB);
      }
    });
    setSelectedDrugs((prev) => prev.filter((d) => !drugsToRemove.has(d)));
  };

  // Mobile View 3-Page Fullscreen State ('section1' | 'section2' | 'section3')
  const [mobilePage, setMobilePage] = useState<'section1' | 'section2' | 'section3'>('section1');

  // Pad Config & Millimeter Spacing Calibration
  const [padMode, setPadMode] = useState<'digital' | 'preprinted'>('digital');
  const [pageSize, setPageSize] = useState<'A4' | 'A5'>('A4');
  const [headerImg, setHeaderImg] = useState<string>('');
  const [footerImg, setFooterImg] = useState<string>('');
  const [headerMarginMm, setHeaderMarginMm] = useState<number>(35);
  const [footerMarginMm, setFooterMarginMm] = useState<number>(10);
  const [footerImgHeight, setFooterImgHeight] = useState<number>(45);

  // Active Left Sub-Tab
  const [activeLeftTab, setActiveLeftTab] = useState<'patient' | 'vitals' | 'clinical' | 'procedures' | 'tests' | 'advice'>('patient');

  // Doctor Profile State (Name, Regd No, Qualification, Designation, RegNo Format Preferences)
  const [doctorProfile, setDoctorProfile] = useState<{
    name: string;
    regNo: string;
    qualification: string;
    designation: string;
    regNoMode?: 'blank' | 'custom_prefix' | 'auto_year';
    customRegNoPrefix?: string;
  }>({
    name: 'Dr. Alexander Fleming',
    regNo: 'MCI-REG-89472',
    qualification: 'MBBS, MD (Internal Medicine)',
    designation: 'Senior Consultant Physician & Diabetologist',
    regNoMode: 'custom_prefix',
    customRegNoPrefix: 'Tangi-',
  });
  const [isDoctorProfileModalOpen, setIsDoctorProfileModalOpen] = useState(false);

  // Auto-Incrementing Patient Reg No Generator (e.g. Tangi-1, Tangi-2, Tangi-3...)
  const generateNextPatientRegNo = (docProf?: typeof doctorProfile): string => {
    const prof = docProf || doctorProfile;
    const mode = prof?.regNoMode || 'custom_prefix';
    let prefix = (prof?.customRegNoPrefix || '').trim();

    if (mode === 'blank' && !prefix) return '';

    if (!prefix && mode === 'custom_prefix') prefix = 'Tangi-';
    if (mode === 'auto_year') {
      const year = new Date().getFullYear();
      prefix = prefix ? `${prefix}${year}-` : `Tangi-${year}-`;
    }

    let highestSeq = 0;

    // Scan SQLite backup records in localStorage
    try {
      const savedHistory = localStorage.getItem('prescribepro_sqlite_prescriptions_backup_v1');
      if (savedHistory) {
        const records = JSON.parse(savedHistory);
        records.forEach((r: any) => {
          if (r.patientRegNo && prefix && r.patientRegNo.toLowerCase().startsWith(prefix.toLowerCase())) {
            const numStr = r.patientRegNo.slice(prefix.length);
            const match = numStr.match(/^(\d+)/);
            if (match) {
              const num = parseInt(match[1], 10);
              if (!isNaN(num) && num > highestSeq) highestSeq = num;
            }
          }
        });
      }
    } catch (e) {}

    // Scan Patient DB records in localStorage
    try {
      const savedPatients = localStorage.getItem('prescribepro_patients_db');
      if (savedPatients) {
        const patients = JSON.parse(savedPatients);
        patients.forEach((p: any) => {
          if (p.regNo && prefix && p.regNo.toLowerCase().startsWith(prefix.toLowerCase())) {
            const numStr = p.regNo.slice(prefix.length);
            const match = numStr.match(/^(\d+)/);
            if (match) {
              const num = parseInt(match[1], 10);
              if (!isNaN(num) && num > highestSeq) highestSeq = num;
            }
          }
        });
      }
    } catch (e) {}

    const savedSeq = localStorage.getItem('prescribepro_last_reg_seq');
    if (savedSeq) {
      const s = parseInt(savedSeq, 10);
      if (!isNaN(s) && s > highestSeq) highestSeq = s;
    }

    const nextSeq = highestSeq + 1;
    return `${prefix}${nextSeq}`;
  };

  // Past Patients / History Modal State (with Date Filter)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyDateFilter, setHistoryDateFilter] = useState<'all' | 'today' | '7days' | '30days' | 'custom'>('all');
  const [historyCustomDate, setHistoryCustomDate] = useState('');
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [allHistoryRecords, setAllHistoryRecords] = useState<SavedPrescriptionRecord[]>([]);

  useEffect(() => {
    if (isHistoryModalOpen) {
      getAllPrescriptionsFromSqlite().then((records) => {
        setAllHistoryRecords(records);
      });
    }
  }, [isHistoryModalOpen]);

  // SQLite Prescription History Timeline State
  const [sqliteHistory, setSqliteHistory] = useState<SavedPrescriptionRecord[]>([]);

  useEffect(() => {
    const key = patient?.regNo || patient?.mobile || patient?.name;
    if (key && key.trim()) {
      getPatientPrescriptionsFromSqlite(key).then((records) => {
        setSqliteHistory(records);
      });
    } else {
      setSqliteHistory([]);
    }
  }, [patient?.regNo, patient?.mobile, patient?.name]);

  const autoSavePrescription = async (actionSource: 'print' | 'pdf' | 'whatsapp' | 'email' | 'manual_save') => {
    if (!patient.name || !patient.name.trim()) return;

    const prescriptionId = `RX-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const record: SavedPrescriptionRecord = {
      prescriptionId,
      patientRegNo: patient.regNo || `REG-${Date.now().toString().slice(-4)}`,
      patientName: patient.name || 'Patient',
      patientMobile: patient.mobile || '',
      patientAge: patient.age || '',
      patientGender: patient.gender || 'Male',
      actionSource,
      createdAt: nowIso,
      vitalsJson: JSON.stringify(vitals),
      clinicalExamJson: JSON.stringify({
        chiefComplaints,
        signsSymptoms,
        clinicalHistory,
        familyHistory,
        drugHistory,
        examinationFindings,
        provisionalDiagnosis,
        differentialDiagnosis,
        specificAdviceText,
      }),
      selectedDrugsJson: JSON.stringify(selectedDrugs),
      selectedTestsJson: JSON.stringify(selectedTests),
      testResultsText: testResultsText || '',
      customLabTestsText: customLabTestsText || '',
      selectedAdviceJson: JSON.stringify(selectedAdvice),
      customAdviceText: customAdviceText || '',
      selectedProceduresJson: JSON.stringify(selectedProcedures),
      doctorProfileJson: JSON.stringify(doctorProfile),
      padMode,
      pageSize,
    };

    await savePrescriptionToSqlite(record);

    if (patient.regNo) {
      const prefix = (doctorProfile.customRegNoPrefix || '').trim() || 'Tangi-';
      if (prefix && patient.regNo.toLowerCase().startsWith(prefix.toLowerCase())) {
        const numStr = patient.regNo.slice(prefix.length);
        const match = numStr.match(/^(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num)) {
            localStorage.setItem('prescribepro_last_reg_seq', String(num));
          }
        }
      }
    }

    const pastRecords = await getPatientPrescriptionsFromSqlite(patient.regNo || patient.mobile || patient.name);
    setSqliteHistory(pastRecords);
  };

  const handleRestoreSqlitePrescription = (rec: SavedPrescriptionRecord) => {
    try {
      if (rec.selectedDrugsJson) setSelectedDrugs(JSON.parse(rec.selectedDrugsJson));
      if (rec.selectedTestsJson) setSelectedTests(JSON.parse(rec.selectedTestsJson));
      if (rec.testResultsText) setTestResultsText(rec.testResultsText);
      if ((rec as any).customLabTestsText) setCustomLabTestsText((rec as any).customLabTestsText);
      if (rec.selectedAdviceJson) setSelectedAdvice(JSON.parse(rec.selectedAdviceJson));
      if (rec.customAdviceText) setCustomAdviceText(rec.customAdviceText);
      if (rec.selectedProceduresJson) setSelectedProcedures(JSON.parse(rec.selectedProceduresJson));

      if (rec.vitalsJson) {
        setVitals(JSON.parse(rec.vitalsJson));
      }

      if (rec.clinicalExamJson) {
        const parsedE = JSON.parse(rec.clinicalExamJson);
        if (parsedE.chiefComplaints !== undefined) setChiefComplaints(parsedE.chiefComplaints);
        if (parsedE.signsSymptoms !== undefined) setSignsSymptoms(parsedE.signsSymptoms);
        if (parsedE.clinicalHistory !== undefined) setClinicalHistory(parsedE.clinicalHistory);
        if (parsedE.familyHistory !== undefined) setFamilyHistory(parsedE.familyHistory);
        if (parsedE.drugHistory !== undefined) setDrugHistory(parsedE.drugHistory);
        if (parsedE.examinationFindings !== undefined) setExaminationFindings(parsedE.examinationFindings);
        if (parsedE.provisionalDiagnosis !== undefined) setProvisionalDiagnosis(parsedE.provisionalDiagnosis);
        if (parsedE.differentialDiagnosis !== undefined) setDifferentialDiagnosis(parsedE.differentialDiagnosis);
        if (parsedE.specificAdviceText !== undefined) setSpecificAdviceText(parsedE.specificAdviceText);
      }

      setSaveStatus(`Restored SQLite Rx (${rec.actionSource.toUpperCase()}) from ${new Date(rec.createdAt).toLocaleDateString('en-GB')}!`);
      setMobilePage('section2');
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      console.error('Error restoring prescription from SQLite:', err);
    }
  };

  // PWA Installation State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert('PrescribePro App Installation Instructions:\n\n1. In Chrome / Edge (Desktop/Android): Click the Install icon (+) in your browser address bar.\n2. On iPhone / iPad Safari: Tap the Share button and select "Add to Home Screen".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      const userEmail = data?.user?.email || localStorage.getItem('prescribepro_session_email');
      if (userEmail) {
        setEmail(userEmail);
      } else {
        router.push('/');
        return;
      }
      const loadedPresets = getAdminPresets();
      setPresets(loadedPresets);
      setPadMode(loadedPresets.padType || 'digital');
      const savedHeaderImg = localStorage.getItem('prescribepro_header_img');
      setHeaderImg(savedHeaderImg || loadedPresets.headerImage || '');
      const savedFooterImg = localStorage.getItem('prescribepro_footer_img');
      setFooterImg(savedFooterImg || loadedPresets.footerImage || '');
      setHeaderMarginMm(loadedPresets.headerMarginMm ?? 35);
      setFooterMarginMm(loadedPresets.footerMarginMm ?? 10);
      const savedFooterImgHeight = localStorage.getItem('prescribepro_footer_img_height');
      if (savedFooterImgHeight) {
        setFooterImgHeight(Number(savedFooterImgHeight) || 45);
      }

      const specs = getSpecialties();
      setSpecialties(specs);
      if (specs.length > 0) setSelectedSpecialtyId(specs[0].id);

      setDrugCatalog(getDrugCatalog());
      setProtocols(getClinicalProtocols());

      const savedDocProfile = localStorage.getItem('prescribepro_doctor_profile');
      let activeDocProf = doctorProfile;
      if (savedDocProfile) {
        try {
          activeDocProf = JSON.parse(savedDocProfile);
          setDoctorProfile(activeDocProf);
        } catch (err) {
          console.error(err);
        }
      } else {
        activeDocProf = { ...doctorProfile, regNoMode: 'custom_prefix' as const, customRegNoPrefix: 'Tangi-' };
        setDoctorProfile(activeDocProf);
      }
      setPatient((prev) => (prev.regNo ? prev : { ...prev, regNo: generateNextPatientRegNo(activeDocProf) }));

      const savedPageSize = localStorage.getItem('prescribepro_page_size');
      if (savedPageSize === 'A4' || savedPageSize === 'A5') {
        setPageSize(savedPageSize as 'A4' | 'A5');
      }

      const savedTheme = localStorage.getItem('prescribepro_theme');
      if (savedTheme === 'dark' || savedTheme === 'day') {
        setTheme(savedTheme as 'dark' | 'day');
      }

      setLoading(false);
    }
    checkUser();
  }, []);

  const handleSetPageSize = (size: 'A4' | 'A5') => {
    setPageSize(size);
    localStorage.setItem('prescribepro_page_size', size);
  };

  const handleHeaderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setHeaderImg(dataUrl);
        localStorage.setItem('prescribepro_header_img', dataUrl);
        const p = getAdminPresets();
        saveAdminPresets({ ...p, headerImage: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHeaderImage = () => {
    setHeaderImg('');
    localStorage.removeItem('prescribepro_header_img');
    const p = getAdminPresets();
    saveAdminPresets({ ...p, headerImage: '' });
  };

  const handleFooterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setFooterImg(dataUrl);
        localStorage.setItem('prescribepro_footer_img', dataUrl);
        const p = getAdminPresets();
        saveAdminPresets({ ...p, footerImage: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFooterImage = () => {
    setFooterImg('');
    localStorage.removeItem('prescribepro_footer_img');
    const p = getAdminPresets();
    saveAdminPresets({ ...p, footerImage: '' });
  };

  const handleApplyOdiaShantiMantraFooter = () => {
    const odiaUrl = '/odia_footer_banner.svg';
    setFooterImg(odiaUrl);
    localStorage.setItem('prescribepro_footer_img', odiaUrl);
    const p = getAdminPresets();
    saveAdminPresets({ ...p, footerImage: odiaUrl });
  };

  const handleAdjustFooterHeight = (delta: number) => {
    setFooterImgHeight((prev) => {
      const next = Math.min(120, Math.max(18, prev + delta));
      localStorage.setItem('prescribepro_footer_img_height', String(next));
      return next;
    });
  };

  const handleAddCustomTest = (e: React.FormEvent) => {
    e.preventDefault();
    const testName = newCustomTestInput.trim();
    if (!testName) return;

    if (!selectedTests.includes(testName)) {
      setSelectedTests((prev) => [...prev, testName]);
    }

    if (!presets.diagnosticTests.includes(testName)) {
      const updatedList = [testName, ...presets.diagnosticTests];
      const updatedPresets = { ...presets, diagnosticTests: updatedList };
      setPresets(updatedPresets);
      saveAdminPresets(updatedPresets);
    }

    setNewCustomTestInput('');
    setSaveStatus(`Added "${testName}" to tests list & prescription!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveDoctorProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('prescribepro_doctor_profile', JSON.stringify(doctorProfile));
    const nextReg = generateNextPatientRegNo(doctorProfile);
    setPatient((prev) => ({ ...prev, regNo: nextReg }));
    setIsDoctorProfileModalOpen(false);
    setSaveStatus(`Saved Doctor Settings! Next Patient Reg No: "${nextReg}"`);
    setTimeout(() => setSaveStatus(null), 4000);
  };

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
    if (!patient.name.trim()) {
      alert('Please enter patient name before saving.');
      return;
    }

    autoSavePrescription('manual_save');

    const newRecord: PatientRecord = {
      regNo: patient.regNo || `REG-${Date.now().toString().slice(-4)}`,
      mobile: patient.mobile,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      careOf: patient.careOf,
      address: patient.address,
      chronicDiseases: clinicalHistory || undefined,
      vitals,
      lastDrugs: selectedDrugs,
      lastTests: selectedTests,
      medicalHistory: [
        {
          date: new Date().toISOString().slice(0, 10),
          diagnosis: provisionalDiagnosis || 'General Consultation',
          prescription: selectedDrugs.join(', ') || 'Consultation advice given',
          notes: specificAdviceText || customAdviceText || 'Follow-up as needed.',
        },
        ...medicalHistory,
      ],
    };

    try {
      const saved = localStorage.getItem('prescribepro_patients_db');
      const customDb: PatientRecord[] = saved ? JSON.parse(saved) : [];
      const updatedDb = [newRecord, ...customDb.filter((p) => p.regNo !== newRecord.regNo)];
      localStorage.setItem('prescribepro_patients_db', JSON.stringify(updatedDb));
    } catch (err) {}

    setSaveStatus(`Saved record for "${patient.name}" to patient database & SQLite!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleClearForm = () => {
    const nextReg = generateNextPatientRegNo(doctorProfile);
    setPatient({
      regNo: nextReg,
      mobile: '',
      name: '',
      age: '',
      gender: 'Male',
      careOf: '',
      address: '',
      allergies: '',
    });

    setVitals({
      height: '',
      weight: '',
      bp: '',
      pulse: '',
      temp: '',
    });

    setChiefComplaints('');
    setSignsSymptoms('');
    setClinicalHistory('');
    setFamilyHistory('');
    setDrugHistory('');
    setExaminationFindings('');
    setProvisionalDiagnosis('');
    setDifferentialDiagnosis('');
    setSpecificAdviceText('');

    setSelectedProcedures([]);
    setCustomProcedureText('');

    setSelectedTests([]);
    setTestResultsText('');
    setTestFilterQuery('');
    setNewCustomTestInput('');

    setSelectedDrugs([]);
    setSelectedAdvice([]);
    setCustomAdviceText('');

    setMedicalHistory([]);
    setSearchQuery('');

    setSaveStatus('Cleared prescription pad for new consultation.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleLookupPatient = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    let customDb: PatientRecord[] = [];
    try {
      const saved = localStorage.getItem('prescribepro_patients_db');
      if (saved) customDb = JSON.parse(saved);
    } catch (e) {}

    const allPatients = [...customDb, ...PRESET_PATIENTS];
    const found = allPatients.find(
      (p) =>
        (p.mobile && p.mobile.includes(q)) ||
        (p.regNo && p.regNo.toLowerCase().includes(q)) ||
        (p.name && p.name.toLowerCase().includes(q))
    );

    if (found) {
      setPatient({
        regNo: found.regNo,
        mobile: found.mobile,
        name: found.name,
        age: found.age,
        gender: found.gender,
        careOf: found.careOf || '',
        address: found.address || '',
        allergies: (found as any).allergies || '',
      });

      if (found.vitals) {
        setVitals(found.vitals);
      }

      if (found.chronicDiseases) {
        setClinicalHistory(`Chronic / Long-Term Diseases: ${found.chronicDiseases}`);
        setDrugHistory(`Long-Term Drugs & Allergies: ${found.chronicDiseases}`);
      } else {
        setClinicalHistory('No major chronic illnesses reported.');
        setDrugHistory('NKDA (No Known Drug Allergies).');
      }

      if (found.medicalHistory) {
        setMedicalHistory(found.medicalHistory);
      }

      setSaveStatus(`Auto-filled record & chronic diseases for ${found.name}`);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus(`No record found for "${q}". Enter details for new patient.`);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleLoadLastRx = () => {
    const q = (patient.mobile || patient.regNo || patient.name).trim().toLowerCase();
    let customDb: PatientRecord[] = [];
    try {
      const saved = localStorage.getItem('prescribepro_patients_db');
      if (saved) customDb = JSON.parse(saved);
    } catch (e) {}

    const allPatients = [...customDb, ...PRESET_PATIENTS];
    const found = allPatients.find(
      (p) =>
        (p.mobile && p.mobile.includes(q)) ||
        (p.regNo && p.regNo.toLowerCase().includes(q)) ||
        (p.name && p.name.toLowerCase().includes(q))
    );

    if (found && (found.lastDrugs?.length || found.lastTests?.length)) {
      if (found.lastDrugs?.length) setSelectedDrugs(found.lastDrugs);
      if (found.lastTests?.length) setSelectedTests(found.lastTests);
      setSaveStatus(`Loaded previous Rx medications & tests for ${found.name}!`);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('No previous prescription medications found for this patient.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
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

  const toggleProcedureSelection = (procName: string) => {
    if (selectedProcedures.includes(procName)) {
      setSelectedProcedures(selectedProcedures.filter((p) => p !== procName));
    } else {
      setSelectedProcedures([...selectedProcedures, procName]);
    }
  };

  const toggleDrugSelection = (label: string) => {
    const baseFormatted = (label.includes('(') && label.includes(')')) ? label : applyBrandToPrescribedLine(label, label);
    const formatted = formatDrugLineForDisplay(baseFormatted);
    const cleanGeneric = label.split('(')[0].trim().replace(/^(inj\.|tab\.|cap\.|syp\.|drops\.|oint\.|inj|tab|cap|syp|drops|oint)\s+/i, '').toLowerCase();

    const existingIndex = selectedDrugs.findIndex((s) => {
      if (s === formatted || s === label) return true;
      if (cleanGeneric.length >= 4) {
        const cleanS = s.split('(')[0].trim().replace(/^(inj\.|tab\.|cap\.|syp\.|drops\.|oint\.)\s*/i, '').toLowerCase();
        return cleanS === cleanGeneric || cleanS.includes(cleanGeneric) || cleanGeneric.includes(cleanS);
      }
      return false;
    });

    if (existingIndex >= 0) {
      setSelectedDrugs(selectedDrugs.filter((_, idx) => idx !== existingIndex));
    } else {
      setSelectedDrugs([...selectedDrugs, formatted]);
    }
  };

  const handleUpdateDrugItem = (index: number, newText: string) => {
    const updated = [...selectedDrugs];
    updated[index] = newText;
    setSelectedDrugs(updated);
  };

  const handleRemoveDrugItem = (index: number) => {
    const updated = selectedDrugs.filter((_, i) => i !== index);
    setSelectedDrugs(updated);
  };

  const handleAddCustomDrugItem = () => {
    setSelectedDrugs([...selectedDrugs, 'Tab. Custom Generic Medication (1-0-1 after food) x 5 days']);
  };

  const handlePrint = (actionType: 'print' | 'pdf' = 'print') => {
    autoSavePrescription(actionType);
    const printArea = document.getElementById('printable-prescription-pad');
    if (!printArea) {
      window.print();
      return;
    }

    const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) {
      window.print();
      return;
    }

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((s) => s.outerHTML)
      .join('\n');

    const isA5 = pageSize === 'A5';
    const paperWidth = isA5 ? '148mm' : '210mm';
    const paperHeight = isA5 ? '210mm' : '297mm';

    // Clone Section 2 live canvas DOM node
    const clonedPad = printArea.cloneNode(true) as HTMLElement;
    
    // Remove UI interactive action buttons from cloned document
    const hiddenEls = clonedPad.querySelectorAll('.print\\:hidden');
    hiddenEls.forEach((el) => el.remove());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription Pad (${pageSize}) - ${patient.name || 'Patient'}</title>
          ${styles}
          <style>
            @page { size: ${pageSize} portrait; margin: 0; }
            html, body {
              width: ${paperWidth} !important;
              height: ${paperHeight} !important;
              min-height: ${paperHeight} !important;
              background: white !important;
              color: #0f172a !important;
              padding: 0 !important;
              margin: 0 !important;
              font-family: system-ui, -apple-system, sans-serif !important;
              overflow: hidden !important;
              box-sizing: border-box !important;
            }
            .section2-print-container {
              width: ${paperWidth} !important;
              height: ${paperHeight} !important;
              min-height: ${paperHeight} !important;
              max-width: none !important;
              aspect-ratio: auto !important;
              margin: 0 auto !important;
              padding-top: ${headerMarginMm}mm !important;
              padding-bottom: ${footerMarginMm}mm !important;
              padding-left: ${isA5 ? '5mm' : '7mm'} !important;
              padding-right: ${isA5 ? '5mm' : '7mm'} !important;
              box-sizing: border-box !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              box-shadow: none !important;
              border: 2px solid #1e293b !important;
              border-radius: 8px !important;
              background: white !important;
              color: #0f172a !important;
              font-size: ${isA5 ? '11.5px' : '13.5px'} !important;
            }
            .section2-print-container * {
              visibility: visible !important;
            }
            [contenteditable] { outline: none !important; }
          </style>
        </head>
        <body class="bg-white text-slate-900 font-sans">
          <div class="section2-print-container">
            ${clonedPad.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

  const calcBmi = () => {
    const h = parseFloat(vitals.height) / 100;
    const w = parseFloat(vitals.weight);
    if (h > 0 && w > 0) return (w / (h * h)).toFixed(1);
    return '--';
  };

  // Apply Template
  const applyTemplate = (tpl: PrescriptionTemplate) => {
    if (tpl.complaints) {
      const ccStr = Array.isArray(tpl.complaints) ? tpl.complaints.join(', ') : tpl.complaints;
      setChiefComplaints(ccStr);
    }
    if (tpl.diagnosis) {
      setProvisionalDiagnosis(tpl.diagnosis);
    }
    if (tpl.drugs && tpl.drugs.length > 0) {
      setSelectedDrugs(tpl.drugs.map((d) => formatDrugLineForDisplay(d)));
    }
    if (tpl.tests && tpl.tests.length > 0) {
      setSelectedTests(tpl.tests);
    }
    if (tpl.advice) {
      if (Array.isArray(tpl.advice)) {
        setSelectedAdvice(tpl.advice);
      } else {
        setSpecificAdviceText(tpl.advice);
      }
    }
    if (tpl.notes) {
      setSpecificAdviceText(tpl.notes);
    }
    setSaveStatus(`Template "${tpl.name}" applied to prescription!`);
    setMobilePage('section2');
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

  const handleWhatsAppSend = () => {
    autoSavePrescription('whatsapp');
    const phone = patient.mobile.replace(/[^0-9]/g, '') || '919876543210';
    const text = encodeURIComponent(
      `*PrescribePro Prescription Summary*\nPatient: ${patient.name} (${patient.regNo})\nRx Medications: ${selectedDrugs.join(', ')}\nDiagnostics: ${selectedTests.join(', ')}\nAdvice: ${selectedAdvice.join(', ')}\n\nView Digital Prescription at: https://prescribepro.vercel.app/`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    autoSavePrescription('email');
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

  // High-Contrast Night Mode & Seamless Glassmorphism Styling
  const containerBg = theme === 'day' 
    ? 'bg-transparent text-slate-900' 
    : 'bg-black text-slate-100';

  const headerBg = theme === 'day' 
    ? 'bg-white/65 backdrop-blur-xl border-b border-white/60 shadow-sm relative z-10' 
    : 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 text-white relative z-10 shadow-lg';

  const cardBg = theme === 'day' 
    ? 'bg-white/65 backdrop-blur-xl border border-white/70 shadow-2xl shadow-slate-300/40 text-slate-900 relative z-10' 
    : 'bg-slate-950/95 backdrop-blur-xl border border-slate-800/90 text-slate-100 shadow-2xl shadow-black relative z-10';

  const inputBg = theme === 'day' 
    ? 'bg-white/80 backdrop-blur-md border border-slate-300/80 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20' 
    : 'bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20';

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${containerBg}`}>
      
      {/* 1. COMPACT TOP BANNER WITH RESPONSIVE LAYOUT */}
      <header className={`py-1.5 px-3 sm:px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shrink-0 gap-1.5 ${headerBg}`}>
        {/* LINE 1 ON MOBILE: LOGO, NAME, DAY/NIGHT TOGGLE, LOGIN ID, CHANGE PASS KEY & LOGOUT ICON */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <img src="/icon.png" alt="PrescribePro Logo" className="h-6 w-6 rounded-lg shadow-md border border-slate-200/50" />
            <h1 className="font-extrabold text-xs tracking-wide text-slate-900 dark:text-white">
              PrescribePro
            </h1>
          </div>

          {/* MOBILE ONLY (LINE 1 RIGHT SIDE): DAY/NIGHT TOGGLE, LOGIN ID, CHANGE PASS KEY & LOGOUT */}
          <div className="flex items-center gap-1 sm:hidden">
            {/* DAY/NIGHT ICON */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'day' : 'dark')}
              className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 transition shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'Day Light' : 'Night Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-indigo-600" />}
            </button>

            {/* LOGIN ID (MOBILE) */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] bg-white/80 dark:bg-slate-800/90 border border-white/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm max-w-[100px] truncate">
              <User className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-mono font-bold truncate">{email}</span>
            </div>

            {/* CHANGE PASSWORD KEY (MOBILE) */}
            <button
              type="button"
              onClick={() => {
                router.push('/change-password');
                window.location.href = '/change-password';
              }}
              className="p-1 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-white text-slate-600 dark:text-slate-300 transition shadow-sm"
              title="Change Password"
            >
              <KeyRound className="h-3.5 w-3.5" />
            </button>

            {/* LOG OUT (MOBILE) */}
            <button
              type="button"
              onClick={handleSignOut}
              className="p-1 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 transition shadow-sm"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* LINE 2 ON MOBILE (OTHER BUTTONS ARRANGED TO AVOID OVERFLOW) / DESKTOP RIGHT CONTAINER */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto text-[10px]">
          {/* DAY / NIGHT MODE TOGGLE BUTTON (DESKTOP VIEW) */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'day' : 'dark')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-lg font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-300 transition shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Day Light' : 'Night Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="h-3 w-3 text-amber-400" /> : <Moon className="h-3 w-3 text-indigo-600" />}
            <span>{theme === 'dark' ? 'Day Mode' : 'Night Mode'}</span>
          </button>

          {/* SOFTWARE UPDATE CHECKER / UPDATE AVAILABLE BUTTON */}
          <button
            type="button"
            onClick={() => {
              if (githubReleaseInfo?.hasUpdate) {
                setIsUpdateModalOpen(true);
              } else {
                handleCheckGitHubRelease();
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold shadow transition transform active:scale-95 ${
              githubReleaseInfo?.hasUpdate
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white animate-pulse shadow-orange-500/40 ring-2 ring-amber-300'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title={githubReleaseInfo?.hasUpdate ? 'Update Available! Click to inspect changes and update.' : 'Check for software updates'}
          >
            <Sparkles className="h-3 w-3" />
            <span>{githubReleaseInfo?.hasUpdate ? `⚡ Update Available (${githubReleaseInfo.tagName || 'v1.1.0'})` : (isCheckingUpdate ? 'Checking...' : 'Check Updates')}</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow transition"
            >
              <ShieldCheck className="h-3 w-3" />
              Admin
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsDoctorProfileModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md transition transform active:scale-95"
            title="Edit Doctor Credentials & Clinic Settings"
          >
            <UserCheck className="h-3 w-3" />
            <span>Doctor Profile</span>
          </button>

          <button
            type="button"
            onClick={handleInstallApp}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white shadow-md transition transform active:scale-95"
            title="Install PrescribePro as a Standalone App on your Desktop or Phone"
          >
            <Download className="h-3 w-3" />
            <span>Install App</span>
          </button>

          {/* GLOBAL STICKY SAFETY WARNING ALERT BADGE */}
          {detectedSafetyWarnings.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMobilePage('section2');
                const el = document.getElementById('top-safety-warning-banner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/50 animate-pulse border border-red-300 transition shrink-0 cursor-pointer"
              title="Click to view live Drug Safety Alerts"
            >
              <ShieldAlert className="h-4 w-4 text-white shrink-0 animate-bounce" />
              <span>🚨 {detectedSafetyWarnings.length} SAFETY ALERTS</span>
            </button>
          )}

          {/* LOGIN ID (DESKTOP VIEW) */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-white/80 dark:bg-slate-800/90 border border-white/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm">
            <User className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono font-bold truncate max-w-[110px]">{email}</span>
          </div>

          {/* CHANGE PASSWORD KEY (DESKTOP VIEW) */}
          <button
            type="button"
            onClick={() => {
              router.push('/change-password');
              window.location.href = '/change-password';
            }}
            className="hidden sm:flex p-1 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-white text-slate-600 dark:text-slate-300 transition shadow-sm"
            title="Change Password"
          >
            <KeyRound className="h-3 w-3" />
          </button>

          {/* SIGN OUT BUTTON (DESKTOP VIEW) */}
          <button
            type="button"
            onClick={handleSignOut}
            className="hidden sm:flex p-1 rounded-lg bg-white/80 dark:bg-slate-800 hover:bg-red-50 text-red-600 transition shadow-sm"
            title="Sign Out"
          >
            <LogOut className="h-3 w-3" />
          </button>
        </div>
      </header>

      {/* MOBILE 3-PAGE FULLSCREEN TAB RIBBON (VISIBLE ON MOBILE ONLY) */}
      <div className="lg:hidden shrink-0 px-2 py-1 bg-white/75 backdrop-blur-xl border-b border-white/60 flex items-center justify-between gap-1 z-20 text-xs shadow-sm">
        <button
          type="button"
          onClick={() => setMobilePage('section1')}
          className={`flex-1 py-1.5 px-1.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition text-[11px] ${
            mobilePage === 'section1'
              ? (theme === 'day' ? 'bg-blue-600 text-white shadow-md' : 'bg-emerald-500 text-gray-950 shadow-md')
              : (theme === 'day' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-gray-900 text-gray-400 hover:text-white')
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>1. Patient Inputs</span>
        </button>

        <button
          type="button"
          onClick={() => setMobilePage('section2')}
          className={`flex-1 py-1.5 px-1.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition text-[11px] relative ${
            mobilePage === 'section2'
              ? (theme === 'day' ? 'bg-blue-600 text-white shadow-md' : 'bg-emerald-500 text-gray-950 shadow-md')
              : (theme === 'day' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-gray-900 text-gray-400 hover:text-white')
          }`}
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>2. Rx Pad</span>
          {detectedSafetyWarnings.length > 0 && (
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping absolute top-1 right-1" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobilePage('section3')}
          className={`flex-1 py-1.5 px-1.5 rounded-xl font-extrabold flex items-center justify-center gap-1.5 transition text-[11px] ${
            mobilePage === 'section3'
              ? (theme === 'day' ? 'bg-blue-600 text-white shadow-md' : 'bg-emerald-500 text-gray-950 shadow-md')
              : (theme === 'day' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-gray-900 text-gray-400 hover:text-white')
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>3. Catalog & Tpl</span>
        </button>
      </div>

      {/* 2. THREE SECTIONS (FULLSCREEN PAGES ON MOBILE, 3-COLUMN GRID ON DESKTOP) */}
      <main className="flex-1 p-2 sm:p-2.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 overflow-hidden relative">

        {/* SECTION 1 (LEFT COLUMN - 3 COLS): PATIENT REGISTRATION & INPUT SUB-PANES */}
        <section className={`lg:col-span-3 rounded-xl lg:rounded-2xl p-3.5 flex-col justify-between overflow-hidden h-full ${cardBg} ${
          mobilePage === 'section1' ? 'flex w-full' : 'hidden lg:flex'
        }`}>
          <div className="flex flex-col h-full space-y-3">
            
            <div className={`flex items-center justify-between border-b pb-2 shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800/80'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
                <UserCheck className="h-4 w-4" />
                Section 1: Patient Details & Inputs
              </div>
              <div className="flex items-center gap-2">
                {saveStatus && (
                  <span className="text-[10px] text-emerald-600 font-mono font-bold animate-pulse">{saveStatus}</span>
                )}
                <button
                  type="button"
                  onClick={() => setMobilePage('section2')}
                  className="lg:hidden text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold shadow flex items-center gap-1 transition"
                  title="Proceed to Rx Pad"
                >
                  <span>View Rx Pad</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Sub-Tab Selector */}
            <div className={`grid grid-cols-5 gap-0.5 p-0.5 rounded-xl text-[9px] sm:text-[10px] shrink-0 border min-w-0 overflow-hidden ${
              theme === 'day' ? 'bg-slate-100/90 border-slate-200' : 'bg-gray-950 border-gray-800'
            }`}>
              <button
                type="button"
                onClick={() => setActiveLeftTab('patient')}
                className={`py-1 px-0.5 rounded-lg font-bold transition truncate text-center ${
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
                className={`py-1 px-0.5 rounded-lg font-bold transition truncate text-center ${
                  activeLeftTab === 'vitals' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Vitals
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('clinical')}
                className={`py-1 px-0.5 rounded-lg font-bold transition truncate text-center ${
                  activeLeftTab === 'clinical' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Exam/Hx
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('procedures')}
                className={`py-1 px-0.5 rounded-lg font-bold transition truncate text-center ${
                  activeLeftTab === 'procedures' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Proc
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('tests')}
                className={`py-1 px-0.5 rounded-lg font-bold transition truncate text-center ${
                  activeLeftTab === 'tests' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Tests
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              
              {/* TAB 1: PATIENT REGISTRATION */}
              {activeLeftTab === 'patient' && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLookupPatient(); }}
                        placeholder="Lookup Reg No / Mobile..."
                        className={`w-full rounded-xl pl-3 pr-8 py-1.5 text-xs ${inputBg}`}
                      />
                      <button
                        type="button"
                        onClick={handleLookupPatient}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-blue-100 text-blue-600 dark:hover:bg-slate-700 dark:text-blue-400 transition"
                        title="Search Patient Record"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow shrink-0 flex items-center gap-1 transition active:scale-95"
                      title="Open Past Patients & Prescriptions History with Date Filter"
                    >
                      <History className="h-3.5 w-3.5" />
                      <span>History</span>
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

                  {/* Medical History & Quick Load Previous Rx */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-[10px] font-bold uppercase tracking-wider block ${theme === 'day' ? 'text-pink-700' : 'text-teal-400'}`}>
                        Previous Consultations
                      </label>
                      <button
                        type="button"
                        onClick={handleLoadLastRx}
                        className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[9.5px] font-bold shadow transition flex items-center gap-1"
                        title="Load previous prescription drugs and lab tests onto pad"
                      >
                        📋 Load Past Rx
                      </button>
                    </div>

                    {medicalHistory.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No past consultation records on file.</p>
                    ) : (
                      medicalHistory.map((rec, idx) => (
                        <div key={idx} className={`p-2 rounded-lg text-[10px] space-y-0.5 border ${
                          theme === 'day' ? 'bg-white/90 border-slate-200 text-slate-800' : 'glass-card border-gray-800 text-gray-300'
                        }`}>
                          <div className="flex justify-between font-bold text-blue-600">
                            <span>{rec.diagnosis}</span>
                            <span className="font-mono text-slate-500">{rec.date}</span>
                          </div>
                          <p className="font-mono text-slate-700">Rx: {rec.prescription}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* SQLITE SAVED PRESCRIPTIONS HISTORY TIMELINE */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider text-emerald-700">
                        <DatabaseZap className="h-3.5 w-3.5 text-emerald-600" />
                        SQLite Saved Prescriptions ({sqliteHistory.length})
                      </div>
                    </div>

                    {sqliteHistory.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No saved SQLite prescriptions for this patient yet. Print, PDF, WhatsApp, or Email to auto-save!</p>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {sqliteHistory.map((rec) => {
                          const dateFormatted = new Date(rec.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          });

                          const drugsArr: string[] = rec.selectedDrugsJson ? JSON.parse(rec.selectedDrugsJson) : [];
                          const testsArr: string[] = rec.selectedTestsJson ? JSON.parse(rec.selectedTestsJson) : [];
                          const examObj = rec.clinicalExamJson ? JSON.parse(rec.clinicalExamJson) : {};

                          const actionBadgeClass =
                            rec.actionSource === 'print' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                            rec.actionSource === 'pdf' ? 'bg-teal-100 text-teal-800 border-teal-300' :
                            rec.actionSource === 'whatsapp' ? 'bg-green-100 text-green-800 border-green-300' :
                            rec.actionSource === 'email' ? 'bg-pink-100 text-pink-800 border-pink-300' :
                            'bg-purple-100 text-purple-800 border-purple-300';

                          return (
                            <div
                              key={rec.prescriptionId}
                              className={`p-2 rounded-xl text-[10px] space-y-1 border shadow-sm transition ${
                                theme === 'day' ? 'bg-white/95 border-slate-200 hover:border-emerald-400' : 'bg-gray-900 border-gray-800 text-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${actionBadgeClass}`}>
                                  {rec.actionSource}
                                </span>
                                <span className="font-mono text-[9px] text-slate-500">{dateFormatted}</span>
                              </div>

                              {examObj.provisionalDiagnosis && (
                                <p className="font-bold text-slate-900 text-[10.5px]">
                                  Diagnosis: {examObj.provisionalDiagnosis}
                                </p>
                              )}

                              {drugsArr.length > 0 && (
                                <p className="text-slate-700 font-mono text-[9.5px] truncate">
                                  Rx ({drugsArr.length}): {drugsArr.join(', ')}
                                </p>
                              )}

                              {testsArr.length > 0 && (
                                <p className="text-blue-700 font-mono text-[9px] truncate">
                                  Tests ({testsArr.length}): {testsArr.join(', ')}
                                </p>
                              )}

                              <div className="pt-1 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleRestoreSqlitePrescription(rec)}
                                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] shadow transition flex items-center gap-1"
                                >
                                  <RotateCcw className="h-3 w-3" /> Restore Rx to Pad
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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

                  <button
                    type="button"
                    onClick={() => setIsPediatricModalOpen(true)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:brightness-110 text-gray-950 font-extrabold text-[11px] shadow flex items-center justify-center gap-1.5 transition transform active:scale-95 border border-amber-300"
                    title="Open Pediatric Weight & BSA m² Dosage Calculator"
                  >
                    <Calculator className="h-4 w-4 shrink-0" />
                    <span>👶 Pediatric & BSA m² Dosing Assistant</span>
                  </button>

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

              {/* TAB 3: CLINICAL EXAMINATION & DIAGNOSIS HISTORY */}
              {activeLeftTab === 'clinical' && (
                <div className="space-y-2 text-xs overflow-y-auto max-h-[380px] pr-1">
                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">1. Chief Complaints (C/O)</label>
                    <input
                      type="text"
                      value={chiefComplaints}
                      onChange={(e) => setChiefComplaints(e.target.value)}
                      placeholder="e.g. Fever x 3 days, Dry Cough, Bodyache"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">2. Signs & Symptoms</label>
                    <input
                      type="text"
                      value={signsSymptoms}
                      onChange={(e) => setSignsSymptoms(e.target.value)}
                      placeholder="e.g. Pharyngeal erythema, Low-grade fever, Fatigue"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">3. Clinical History (H/O)</label>
                    <input
                      type="text"
                      value={clinicalHistory}
                      onChange={(e) => setClinicalHistory(e.target.value)}
                      placeholder="e.g. No prior hospitalizations or major surgeries."
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">4. Family History</label>
                    <input
                      type="text"
                      value={familyHistory}
                      onChange={(e) => setFamilyHistory(e.target.value)}
                      placeholder="e.g. Father: HTN | Mother: Type 2 Diabetes"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">5. Drug History / Allergies</label>
                    <input
                      type="text"
                      value={drugHistory}
                      onChange={(e) => setDrugHistory(e.target.value)}
                      placeholder="e.g. Tab PCM 500mg taken yesterday. NKDA."
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">6. Clinical & Exam Findings</label>
                    <input
                      type="text"
                      value={examinationFindings}
                      onChange={(e) => setExaminationFindings(e.target.value)}
                      placeholder="e.g. Chest: Clear bilateral breath sounds. Abdomen: Soft"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">7. Provisional Diagnosis</label>
                    <input
                      type="text"
                      value={provisionalDiagnosis}
                      onChange={(e) => setProvisionalDiagnosis(e.target.value)}
                      placeholder="e.g. Acute Upper Respiratory Tract Infection (URTI)"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">8. Differential Diagnosis (D/D)</label>
                    <input
                      type="text"
                      value={differentialDiagnosis}
                      onChange={(e) => setDifferentialDiagnosis(e.target.value)}
                      placeholder="e.g. 1. Viral Bronchitis  2. Influenza A"
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">10. Specific Clinical Advice</label>
                    <textarea
                      value={specificAdviceText}
                      onChange={(e) => setSpecificAdviceText(e.target.value)}
                      placeholder="Specific clinical instructions for the patient..."
                      rows={2}
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: SURGICAL PROCEDURES & PHYSIOTHERAPY REHAB */}
              {activeLeftTab === 'procedures' && (
                <div className="space-y-2 text-xs overflow-y-auto max-h-[380px] pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700">Surgical Procedures & Physiotherapy</span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">
                      {CLINICAL_PROCEDURES_PRESETS.length} Protocols
                    </span>
                  </div>

                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {CLINICAL_PROCEDURES_PRESETS.map((proc, idx) => {
                      const isChecked = selectedProcedures.includes(proc);
                      return (
                        <label
                          key={idx}
                          className={`p-1.5 rounded-lg border flex items-center justify-between cursor-pointer transition text-[11px] ${
                            isChecked
                              ? 'bg-indigo-100/80 border-indigo-400 font-bold text-indigo-950'
                              : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate pr-2">{proc}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleProcedureSelection(proc)}
                            className="h-3.5 w-3.5 text-indigo-600 rounded"
                          />
                        </label>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block mb-0.5 font-bold text-slate-700">Custom Procedure / Rehab Protocol</label>
                    <textarea
                      value={customProcedureText}
                      onChange={(e) => setCustomProcedureText(e.target.value)}
                      placeholder="e.g. Quadriceps isometric exercises 10 reps t.d.s..."
                      rows={2}
                      className={`w-full rounded-lg px-2 py-1 text-xs ${inputBg}`}
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: DIAGNOSTIC TESTS */}
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
                      placeholder="Search lab tests (e.g. Malaria, Scrub Typhus, Dengue, CBC)..."
                      className={`w-full rounded-lg pl-8 pr-2.5 py-1 text-xs ${inputBg}`}
                    />
                  </div>

                  {/* ADD CUSTOM TEST ROW ("ADD AS WE USE") */}
                  <form onSubmit={handleAddCustomTest} className="flex items-center gap-1.5 pt-0.5">
                    <input
                      type="text"
                      value={newCustomTestInput}
                      onChange={(e) => setNewCustomTestInput(e.target.value)}
                      placeholder="+ Add new custom test (e.g. Malaria Slide, Scrub Typhus)..."
                      className={`flex-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${inputBg}`}
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition shrink-0 flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add
                    </button>
                  </form>

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

        {/* SECTION 2 (CENTER COLUMN - 6 COLS): PRESCRIPTION PREVIEW IN CENTER & BOTTOM ACTION BAR */}
        <section className={`lg:col-span-6 rounded-xl lg:rounded-2xl p-2 sm:p-3.5 flex-col justify-between overflow-hidden h-full w-full ${cardBg} ${
          mobilePage === 'section2' ? 'flex w-full' : 'hidden lg:flex'
        }`}>

          {/* ULTRA-COMPACT ADAPTIVE TOP CONTROL STRIP (NO HORIZONTAL SCROLL) */}
          <div className={`px-2 py-1 rounded-xl text-[10px] shrink-0 mb-1.5 border flex flex-wrap items-center justify-between gap-1.5 ${
            theme === 'day' ? 'bg-slate-100/90 border-slate-200' : 'bg-gray-950 border-gray-800'
          }`}>
            {/* LEFT SIDE: TITLE + PAPER SIZE + PAD MODE */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className={`flex items-center gap-1 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span className="font-extrabold text-[11px] whitespace-nowrap">Section 2</span>
              </div>

              {/* PAPER SIZE TOGGLE */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[9.5px]">
                <button
                  type="button"
                  onClick={() => handleSetPageSize('A4')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-extrabold transition ${
                    pageSize === 'A4' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                  title="A4 Standard (210mm x 297mm)"
                >
                  📄 A4
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPageSize('A5')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-extrabold transition ${
                    pageSize === 'A5' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                  title="A5 Compact (148mm x 210mm)"
                >
                  📃 A5
                </button>
              </div>

              {/* PAD MODE TOGGLE */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[9.5px]">
                <button
                  type="button"
                  onClick={() => setPadMode('digital')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition ${
                    padMode === 'digital' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Digital
                </button>
                <button
                  type="button"
                  onClick={() => setPadMode('preprinted')}
                  className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition ${
                    padMode === 'preprinted' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Pre-printed
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: MARGIN CONTROLS + SAVE TEMPLATE */}
            <div className="flex items-center gap-1.5 flex-wrap text-[9.5px]">
              <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-900 px-1.5 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
                <span className="text-slate-600 font-extrabold" title="Top Letterhead Page Margin (mm)">Top:</span>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={headerMarginMm}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    setHeaderMarginMm(val);
                    const p = getAdminPresets();
                    saveAdminPresets({ ...p, headerMarginMm: val });
                  }}
                  className={`w-10 sm:w-11 px-1 py-0.5 rounded border text-center font-mono font-black text-blue-600 text-xs ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-emerald-400'
                  }`}
                  title="Top Letterhead Page Margin (in mm)"
                />
                <span className="text-slate-500 font-mono text-[9px]">mm</span>

                <span className="text-slate-400 px-0.5">|</span>

                <span className="text-slate-600 font-extrabold" title="Bottom Letterhead Page Margin (mm)">Btm:</span>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={footerMarginMm}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    setFooterMarginMm(val);
                    const p = getAdminPresets();
                    saveAdminPresets({ ...p, footerMarginMm: val });
                  }}
                  className={`w-10 sm:w-11 px-1 py-0.5 rounded border text-center font-mono font-black text-pink-600 text-xs ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-pink-400'
                  }`}
                  title="Bottom Letterhead Page Margin (in mm)"
                />
                <span className="text-slate-500 font-mono text-[9px]">mm</span>

                <span className="text-slate-400 px-0.5">|</span>

                <span className="text-slate-600 font-extrabold" title="Footer Image Banner Height (px)">Footer Ht:</span>
                <input
                  type="number"
                  min={18}
                  max={120}
                  value={footerImgHeight}
                  onChange={(e) => {
                    const val = Math.min(120, Math.max(18, parseInt(e.target.value) || 45));
                    setFooterImgHeight(val);
                    localStorage.setItem('prescribepro_footer_img_height', String(val));
                  }}
                  className={`w-10 sm:w-11 px-1 py-0.5 rounded border text-center font-mono font-black text-purple-600 text-xs ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-purple-400'
                  }`}
                  title="Footer Banner Height (in pixels)"
                />
                <span className="text-slate-500 font-mono text-[9px]">px</span>
              </div>

              <button
                type="button"
                onClick={handleSaveCurrentAsTemplate}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-600 text-white text-[9.5px] font-extrabold shadow hover:bg-pink-700 transition shrink-0"
                title="Save Template"
              >
                <BookmarkPlus className="h-3 w-3" /> Save Template
              </button>
            </div>
          </div>

          {/* DYNAMIC PRINT CSS FOR CALIBRATED MILLIMETER MARGINS */}
          <style jsx global>{`
            @media print {
              #printable-prescription-pad {
                padding-top: ${headerMarginMm}mm !important;
                padding-bottom: ${footerMarginMm}mm !important;
              }
            }
          `}</style>

          {/* CENTERED LIVE PRESCRIPTION PAD PREVIEW CARD (A4 / A5 DYNAMIC PORTRAIT MODE) */}
          <div
            id="printable-prescription-pad"
            className={`flex-1 bg-white text-gray-900 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-3 font-sans border-2 border-slate-800 dark:border-slate-600 overflow-y-auto flex flex-col justify-between w-full max-w-full lg:mx-auto transition-all duration-300 ${
              pageSize === 'A5'
                ? 'lg:aspect-[148/210] lg:max-w-[440px] text-[10px]'
                : 'lg:aspect-[210/297] lg:max-w-[560px] text-[11px]'
            }`}
          >
            
            {/* PAD HEADER WITH DIRECT IMAGE UPLOAD & LOGO CONTROLS */}
            <div className="relative group">
              {padMode === 'digital' ? (
                headerImg ? (
                  <div className="relative border-b border-gray-200 pb-1 mb-2">
                    <img src={headerImg} alt="Clinic Header" className="w-full h-12 object-contain" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition rounded flex items-center justify-center gap-2 print:hidden">
                      <label className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg cursor-pointer shadow hover:bg-emerald-500">
                        🖼️ Change Header Logo
                        <input type="file" accept="image/*" onChange={handleHeaderImageUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveHeaderImage}
                        className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg shadow hover:bg-red-500"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-b-2 border-emerald-600 pb-2 text-center space-y-0.5 relative rounded p-1 hover:bg-emerald-50/60 transition">
                    <h3 className="font-extrabold text-sm text-emerald-800 uppercase tracking-wide">
                      PRESCRIBEPRO CLINIC & HEALTH CENTER
                    </h3>
                    <p className="text-[9px] text-gray-600">Multi-Specialty Healthcare • Reg No: 89745-MC</p>
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition rounded flex items-center justify-center print:hidden">
                      <label className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-extrabold rounded-lg cursor-pointer shadow hover:bg-emerald-500">
                        🖼️ Upload Clinic Header Image / Logo
                        <input type="file" accept="image/*" onChange={handleHeaderImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                )
              ) : (
                <div
                  style={{ height: `${Math.max(20, headerMarginMm * 1.2)}px` }}
                  className="border-b border-dashed border-gray-300 flex items-center justify-center text-[9px] text-gray-400 font-mono bg-gray-50/50 rounded"
                >
                  [Pre-printed Letterhead Header Space: {headerMarginMm}mm]
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

            {/* PAD BODY: TWO-COLUMN CANVAS (LEFT PANE = LABS & ADVICE, RIGHT PANE = CLINICAL ASSESSMENT, RX & SPECIFIC ADVICE) */}
            <div className="flex-1 py-1 space-y-1.5 overflow-y-auto">
              
              {/* HUMAN JUDGMENT MODE ACTIVE BANNER */}
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 rounded-lg p-1.5 text-[8.5px] text-amber-950 dark:text-amber-200 print:hidden shrink-0 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[9px] text-amber-900 dark:text-amber-300 flex items-center gap-1">
                    🛡️ HUMAN JUDGMENT MODE ACTIVE
                  </span>
                  <span className="text-[7.5px] bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                    Advisory Decision Support
                  </span>
                </div>
                <p className="text-[8px] text-amber-900 dark:text-amber-300 leading-tight">
                  ✏️ <strong>Editable Canvas:</strong> Click any text directly on pad to edit. Clinical decision support & drug safety checks are advisory — ultimate prescribing authority remains strictly with the attending physician.
                </p>
              </div>

              {/* VITALS DEMOGRAPHY STRIP */}
              <div className="text-[8.5px] bg-emerald-50/80 p-1 rounded border border-emerald-200 text-emerald-950 font-mono flex flex-wrap gap-1.5 justify-between">
                <span><strong>Ht:</strong> {vitals.height}cm</span>
                <span><strong>Wt:</strong> {vitals.weight}kg</span>
                <span><strong>BP:</strong> {vitals.bp}</span>
                <span><strong>Pulse:</strong> {vitals.pulse}</span>
                <span><strong>Temp:</strong> {vitals.temp}°F</span>
                <span><strong>BMI:</strong> {calcBmi()}</span>
              </div>

              {/* TWO PANES CONTAINER WITH PERMANENT TOP-TO-BOTTOM VERTICAL DIVIDING LINE */}
              <div className="grid grid-cols-12 gap-1.5 pt-1 border-t border-gray-300 text-[9px] flex-1 min-h-[350px]">
                
                {/* LEFT PANE: LAB TEST REPORTS & ADDITIONAL ADVICE (4 COLUMNS - PERMANENT RIGHT BORDER) */}
                <div className="col-span-4 border-r-2 border-slate-300 dark:border-slate-600 pr-1.5 space-y-2 text-[8.5px] h-full min-h-full">
                  {/* LAB TEST ORDERS & REPORTS */}
                  <div className={`space-y-1 ${selectedTests.length === 0 && !customLabTestsText.trim() && !testResultsText.trim() ? 'print:hidden' : ''}`}>
                    <div className="flex items-center justify-between border-b border-teal-200 pb-0.5 mb-1">
                      <strong className="text-teal-900 block font-extrabold text-[9px] uppercase tracking-tighter">
                        🔬 Lab Test Orders & Reports:
                      </strong>
                      {(selectedTests.length > 0 || customLabTestsText.trim() !== '') && (
                        <button
                          type="button"
                          onClick={() => { setSelectedTests([]); setCustomLabTestsText(''); }}
                          className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1"
                          title="Clear lab test orders"
                        >
                          ✕ Clear
                        </button>
                      )}
                    </div>
                    {selectedTests.length > 0 && (
                      <ul className="list-disc pl-3 text-gray-800 space-y-0.5 font-medium text-[8.5px]">
                        {selectedTests.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setCustomLabTestsText('');
                          e.currentTarget.textContent = 'Click to edit or add custom lab test orders (e.g. CBC, LFT, Lipid Profile, Chest X-Ray)...';
                        } else {
                          setCustomLabTestsText(val);
                        }
                      }}
                      className={`text-gray-800 font-medium text-[8.5px] outline-none hover:bg-teal-100/50 p-0.5 rounded cursor-text ${
                        !customLabTestsText.trim() && selectedTests.length > 0 ? 'print:hidden' : ''
                      }`}
                    >
                      {customLabTestsText || 'Click to edit or add custom lab test orders (e.g. CBC, LFT, Lipid Profile, Chest X-Ray)...'}
                    </p>
                    <div className={`bg-teal-50/80 p-1 rounded border border-teal-200 mt-1 font-mono text-[8px] ${!testResultsText.trim() ? 'print:hidden' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-950 block">Results:</span>
                        <button
                          type="button"
                          onClick={() => setTestResultsText('')}
                          className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1"
                          title="Clear test results"
                        >
                          ✕ Clear
                        </button>
                      </div>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onFocus={(e) => {
                          if (e.currentTarget.textContent?.startsWith('Click to')) {
                            e.currentTarget.textContent = '';
                          }
                        }}
                        onBlur={(e) => {
                          const val = e.currentTarget.textContent?.trim() || '';
                          if (!val || val.startsWith('Click to')) {
                            setTestResultsText('');
                            e.currentTarget.textContent = 'Click to type test results...';
                          } else {
                            setTestResultsText(val);
                          }
                        }}
                        className="whitespace-pre-wrap text-gray-800 outline-none hover:bg-teal-100/50 p-0.5 rounded cursor-text"
                      >
                        {testResultsText || 'Click to type test results...'}
                      </p>
                    </div>
                  </div>

                  {/* PROCEDURES (ALL NON-DRUG CARE, MANEUVERS & REHAB) */}
                  <div className={selectedProcedures.length === 0 && selectedAdvice.length === 0 && !customProcedureText.trim() ? 'print:hidden' : ''}>
                    <div className="flex items-center justify-between border-b border-indigo-200 pb-0.5 mb-1">
                      <strong className="text-indigo-900 font-bold uppercase tracking-tighter">
                        🛠️ Procedures & Non-Drug Care:
                      </strong>
                      <button
                        type="button"
                        onClick={() => setCustomProcedureText('')}
                        className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1"
                        title="Clear procedures"
                      >
                        ✕ Clear
                      </button>
                    </div>
                    {selectedProcedures.length > 0 && (
                      <ul className="list-disc pl-2.5 text-gray-800 space-y-0.5 font-medium">
                        {selectedProcedures.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    )}
                    {selectedAdvice.length > 0 && (
                      <ul className="list-disc pl-2.5 text-gray-800 space-y-0.5 font-medium">
                        {selectedAdvice.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    )}
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setCustomProcedureText('');
                          e.currentTarget.textContent = 'Click to edit procedures (e.g. Valsalva maneuver, Sitz bath, Physio)...';
                        } else {
                          setCustomProcedureText(val);
                        }
                      }}
                      className={`text-gray-700 italic mt-0.5 text-[8px] outline-none hover:bg-indigo-100/50 p-0.5 rounded cursor-text ${
                        !customProcedureText.trim() ? 'print:hidden' : ''
                      }`}
                    >
                      {customProcedureText || 'Click to edit procedures (e.g. Valsalva maneuver, Sitz bath, Physio)...'}
                    </p>
                  </div>
                </div>

                {/* RIGHT PANE: CLINICAL ASSESSMENT, RX DRUGS & SPECIFIC ADVICE (8 COLUMNS) */}
                <div className="col-span-8 pl-1 space-y-1 text-[9px] h-full min-h-full">
                  {/* 1. CHIEF COMPLAINT */}
                  <div className={`flex items-center gap-1 group ${!chiefComplaints.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">C/O (Chief Complaints): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setChiefComplaints('');
                          e.currentTarget.textContent = 'Click to edit chief complaints...';
                        } else {
                          setChiefComplaints(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {chiefComplaints || 'Click to edit chief complaints...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChiefComplaints('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Chief Complaints"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 2. SIGNS & SYMPTOMS */}
                  <div className={`flex items-center gap-1 group ${!signsSymptoms.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">Signs & Symptoms: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setSignsSymptoms('');
                          e.currentTarget.textContent = 'Click to edit signs & symptoms...';
                        } else {
                          setSignsSymptoms(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {signsSymptoms || 'Click to edit signs & symptoms...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSignsSymptoms('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Signs & Symptoms"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 3. CLINICAL HISTORY */}
                  <div className={`flex items-center gap-1 group ${!clinicalHistory.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">H/O (Clinical History): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setClinicalHistory('');
                          e.currentTarget.textContent = 'Click to edit clinical history...';
                        } else {
                          setClinicalHistory(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {clinicalHistory || 'Click to edit clinical history...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setClinicalHistory('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Clinical History"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 4. FAMILY HISTORY */}
                  <div className={`flex items-center gap-1 group ${!familyHistory.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">Family History: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setFamilyHistory('');
                          e.currentTarget.textContent = 'Click to edit family history...';
                        } else {
                          setFamilyHistory(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {familyHistory || 'Click to edit family history...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFamilyHistory('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Family History"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 5. DRUG HISTORY */}
                  <div className={`flex items-center gap-1 group ${!drugHistory.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">Drug History / Allergies: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setDrugHistory('');
                          e.currentTarget.textContent = 'Click to edit drug history...';
                        } else {
                          setDrugHistory(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {drugHistory || 'Click to edit drug history...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDrugHistory('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Drug History"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 6. CLINICAL & EXAMINATION FINDINGS */}
                  <div className={`flex items-center gap-1 group ${!examinationFindings.trim() ? 'print:hidden' : ''}`}>
                    <strong className="text-gray-900 font-bold shrink-0">Clinical & Exam Findings: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setExaminationFindings('');
                          e.currentTarget.textContent = 'Click to edit exam findings...';
                        } else {
                          setExaminationFindings(val);
                        }
                      }}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {examinationFindings || 'Click to edit exam findings...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExaminationFindings('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Exam Findings"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 7. PROVISIONAL DIAGNOSIS */}
                  <div className={`bg-gray-100/90 p-1 rounded font-bold text-gray-900 flex items-center gap-1 group ${!provisionalDiagnosis.trim() ? 'print:hidden' : ''}`}>
                    <strong className="shrink-0">Provisional Diagnosis: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setProvisionalDiagnosis('');
                          e.currentTarget.textContent = 'Click to edit provisional diagnosis...';
                        } else {
                          setProvisionalDiagnosis(val);
                        }
                      }}
                      className="outline-none hover:bg-yellow-200/70 p-0.5 rounded cursor-text flex-1"
                    >
                      {provisionalDiagnosis || 'Click to edit provisional diagnosis...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setProvisionalDiagnosis('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Diagnosis"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 8. DIFFERENTIAL DIAGNOSIS */}
                  <div className={`text-gray-700 italic text-[8.5px] flex items-center gap-1 group ${!differentialDiagnosis.trim() ? 'print:hidden' : ''}`}>
                    <strong className="shrink-0">Differential Diagnosis (D/D): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setDifferentialDiagnosis('');
                          e.currentTarget.textContent = 'Click to edit differential diagnosis...';
                        } else {
                          setDifferentialDiagnosis(val);
                        }
                      }}
                      className="outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text flex-1"
                    >
                      {differentialDiagnosis || 'Click to edit differential diagnosis...'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDifferentialDiagnosis('')}
                      className="text-[8px] text-gray-400 hover:text-red-500 print:hidden font-mono px-1 shrink-0 opacity-0 group-hover:opacity-100 transition"
                      title="Clear Differential Diagnosis"
                    >
                      ✕
                    </button>
                  </div>

                  {/* LIVE DRUG SAFETY & INTERACTION WARNING BANNER (PRINT-HIDDEN) */}
                  {detectedSafetyWarnings.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 space-y-1.5 shadow-md print:hidden my-1">
                      <div className="flex items-center justify-between border-b border-red-200 pb-1">
                        <div className="flex items-center gap-1.5 text-red-900 font-extrabold text-[9.5px]">
                          <ShieldAlert className="h-4 w-4 text-red-600 shrink-0" />
                          <span>🚨 DRUG SAFETY & INTERACTION ALERT ({detectedSafetyWarnings.length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleOpenRulesModal}
                            className="text-[8px] bg-red-700 hover:bg-red-800 text-white font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow transition"
                            title="Add, edit or import custom drug safety rules"
                          >
                            <span>🛡️ Manage Safety Rules</span>
                          </button>
                          <span className="text-[7.5px] bg-red-600 text-white font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                            Physician Judgment Mode
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                        {detectedSafetyWarnings.map((warning) => (
                          <div key={warning.rule.id} className="bg-white p-1.5 rounded border border-red-300 text-[8.5px] space-y-0.5 shadow-sm">
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-extrabold text-red-900 text-[9px] flex items-center gap-1">
                                ⚠️ {warning.rule.title}
                              </span>
                              <span className="text-[7.5px] bg-amber-100 text-amber-900 font-mono px-1 rounded font-bold border border-amber-300 shrink-0">
                                🏛️ Source: {warning.rule.source}
                              </span>
                            </div>

                            <p className="text-gray-800 leading-tight">
                              <strong>Conflict:</strong> <span className="text-red-700 font-semibold">{warning.foundDrugA}</span> ↔ <span className="text-red-700 font-semibold">{warning.foundDrugB}</span>
                            </p>
                            <p className="text-gray-700 text-[8px] italic">{warning.rule.description}</p>
                            <div className="bg-emerald-50 p-1 rounded border border-emerald-200 text-emerald-950 text-[8px]">
                              <strong>Recommendation:</strong> {warning.rule.recommendation}
                            </div>

                            <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-gray-100">
                              {warning.foundDrugB !== 'Patient Safety Alert' && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveConflictingDrug(warning.foundDrugB)}
                                  className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[8px] rounded transition"
                                >
                                  🗑️ Remove Medication
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDismissWarning(warning.rule.id)}
                                className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[8px] rounded transition"
                                title="Acknowledge clinical judgment and dismiss warning"
                              >
                                👁️‍🗨️ Dismiss / Override Warning
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 9. PRESCRIPTION DRUGS (Rx) - FULLY EDITABLE PER ITEM */}
                  <div className="bg-blue-50/80 p-1.5 rounded border border-blue-200 space-y-0.5 mt-1">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-0.5 mb-1">
                      <strong className="text-blue-950 font-extrabold text-[9.5px]">Rx Prescribed Medications:</strong>
                      <button
                        onClick={handleAddCustomDrugItem}
                        className="text-[8px] bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 rounded font-bold transition print:hidden"
                        title="Add Custom Rx Line"
                      >
                        + Add Drug Line
                      </button>
                    </div>

                    {selectedDrugs.length > 0 ? (
                      <ol className="list-decimal pl-3.5 text-gray-900 font-bold space-y-0.5">
                        {selectedDrugs.map((d, i) => (
                          <li key={i} className="group relative">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleUpdateDrugItem(i, e.currentTarget.textContent || '')}
                                className="outline-none hover:bg-blue-200/60 p-0.5 rounded transition cursor-text flex-1"
                              >
                                {formatDrugLineForDisplay(d)}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenBrandPickerForItem(i, d)}
                                className="text-[8.5px] bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition print:hidden shrink-0 flex items-center gap-0.5 cursor-pointer"
                                title="Find & choose brand name for this medication (e.g. Calpol, Dolo, Pan-40)"
                              >
                                🏷️ <span>Choose Brand</span>
                              </button>
                              <button
                                onClick={() => handleRemoveDrugItem(i)}
                                className="text-red-500 hover:text-red-700 font-bold text-[10px] opacity-0 group-hover:opacity-100 transition px-1 print:hidden shrink-0"
                                title="Delete line"
                              >
                                ✕
                              </button>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p
                        onClick={handleAddCustomDrugItem}
                        className="text-[8.5px] text-gray-500 italic cursor-pointer hover:text-blue-700"
                      >
                        [No Rx drugs selected. Click here to add a medication line]
                      </p>
                    )}
                  </div>

                  {/* 10. SPECIFIC ADVICE */}
                  <div className={`bg-amber-50 p-1 rounded border border-amber-200 text-amber-950 mt-1 text-[8.5px] ${!specificAdviceText.trim() ? 'print:hidden' : ''}`}>
                    <strong className="font-bold text-amber-900 block">Specific Clinical Advice:</strong>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        if (e.currentTarget.textContent?.startsWith('Click to')) {
                          e.currentTarget.textContent = '';
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.currentTarget.textContent?.trim() || '';
                        if (!val || val.startsWith('Click to')) {
                          setSpecificAdviceText('');
                          e.currentTarget.textContent = 'Click to edit specific clinical advice...';
                        } else {
                          setSpecificAdviceText(val);
                        }
                      }}
                      className="whitespace-pre-wrap outline-none hover:bg-amber-100/70 p-0.5 rounded cursor-text"
                    >
                      {specificAdviceText || 'Click to edit specific clinical advice...'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* PAD FOOTER - SIDE-BY-SIDE FLEX: RESIZABLE BANNER ON LEFT, DOCTOR NAME & DESIGNATION ON RIGHT */}
            <div className="mt-auto shrink-0 pt-2 border-t border-gray-200">
              {padMode === 'digital' ? (
                <div className="flex items-end justify-between text-[8px] text-gray-700">
                  {/* LEFT SIDE: RESIZABLE BANNER OR UPLOAD CONTAINER */}
                  {footerImg ? (
                    <div className="relative group flex-1 mr-3 flex items-end">
                      <img
                        src={footerImg}
                        alt="Clinic Footer Banner"
                        style={{ height: `${footerImgHeight}px` }}
                        className="w-full object-contain object-left max-h-[120px] transition-all duration-150"
                      />
                      <div className="absolute inset-0 bg-slate-900/75 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-1.5 print:hidden p-1">
                        <button
                          type="button"
                          onClick={() => handleAdjustFooterHeight(-5)}
                          className="px-2 py-0.5 bg-slate-700 text-white text-[9px] font-bold rounded hover:bg-slate-600"
                          title="Decrease Banner Height"
                        >
                          - Ht
                        </button>
                        <span className="text-[9px] text-emerald-300 font-mono font-bold">{footerImgHeight}px</span>
                        <button
                          type="button"
                          onClick={() => handleAdjustFooterHeight(5)}
                          className="px-2 py-0.5 bg-slate-700 text-white text-[9px] font-bold rounded hover:bg-slate-600"
                          title="Increase Banner Height"
                        >
                          + Ht
                        </button>
                        <label className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded cursor-pointer hover:bg-emerald-500">
                          🖼️ Change
                          <input type="file" accept="image/*" onChange={handleFooterImageUpload} className="hidden" />
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveFooterImage}
                          className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded hover:bg-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{ height: `${Math.max(20, footerMarginMm * 1.5)}px` }}
                      className="group relative flex-1 mr-3 border border-dashed border-slate-300 hover:border-emerald-400 rounded bg-slate-50/50 flex items-center justify-center transition"
                    >
                      <span className="text-[8.5px] text-slate-400 font-mono group-hover:hidden">
                        [Left Footer Space: {footerMarginMm}mm]
                      </span>
                      <label className="hidden group-hover:flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white text-[8.5px] font-bold rounded cursor-pointer shadow hover:bg-emerald-500 print:hidden">
                        🖼️ Upload Left Banner
                        <input type="file" accept="image/*" onChange={handleFooterImageUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {/* RIGHT SIDE: DOCTOR NAME, DESIGNATION & CREDENTIALS */}
                  <div className="text-right space-y-0.5 shrink-0">
                    <p className="font-extrabold text-[9.5px] text-gray-900 border-t border-gray-400 pt-0.5 inline-block">
                      {doctorProfile.name || 'Dr. Attending Physician'}
                    </p>
                    {doctorProfile.qualification && (
                      <p className="text-[8.5px] text-gray-700 font-semibold">{doctorProfile.qualification}</p>
                    )}
                    {doctorProfile.designation && (
                      <p className="text-[8px] text-gray-600 italic">{doctorProfile.designation}</p>
                    )}
                    {doctorProfile.regNo && (
                      <p className="text-[7.5px] font-mono text-gray-500">Regd No: {doctorProfile.regNo}</p>
                    )}
                    <p className="text-[7.5px] font-mono text-gray-500 pt-0.5 border-t border-gray-200 mt-0.5">
                      Date & Time: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-between">
                  <div
                    style={{ height: `${Math.max(16, footerMarginMm * 1.5)}px` }}
                    className="border-t border-dashed border-gray-300 flex items-center justify-center text-[9px] text-gray-400 font-mono bg-gray-50/50 rounded flex-1 mr-2"
                  >
                    [Pre-printed Footer Space: {footerMarginMm}mm ({footerMarginMm / 10} cm)]
                  </div>
                  <div className="text-right space-y-0.5 shrink-0">
                    <p className="font-extrabold text-[9.5px] text-gray-900 border-t border-gray-400 pt-0.5 inline-block">
                      {doctorProfile.name || 'Dr. Attending Physician'}
                    </p>
                    {doctorProfile.qualification && (
                      <p className="text-[8.5px] text-gray-700 font-semibold">{doctorProfile.qualification}</p>
                    )}
                    {doctorProfile.designation && (
                      <p className="text-[8px] text-gray-600 italic">{doctorProfile.designation}</p>
                    )}
                    {doctorProfile.regNo && (
                      <p className="text-[7.5px] font-mono text-gray-500">Regd No: {doctorProfile.regNo}</p>
                    )}
                    <p className="text-[7.5px] font-mono text-gray-500 pt-0.5 border-t border-gray-200 mt-0.5">
                      Date & Time: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* BOTTOM ACTION BAR AT BOTTOM OF CENTER PREVIEW: PRINT, PDF, WHATSAPP, EMAIL */}
          <div className={`grid grid-cols-4 gap-2 pt-2 border-t shrink-0 mt-2 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
            <button
              onClick={() => handlePrint('print')}
              className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow transition"
              title="Print Prescription"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>

            <button
              onClick={() => handlePrint('pdf')}
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
        <section className={`lg:col-span-3 rounded-xl lg:rounded-2xl p-3.5 flex-col justify-between overflow-hidden h-full ${cardBg} ${
          mobilePage === 'section3' ? 'flex w-full' : 'hidden lg:flex'
        }`}>
          <div className="flex flex-col h-full space-y-3 overflow-hidden">
            
            {/* Header */}
            <div className={`flex items-center justify-between pb-2 border-b shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-cyan-400'}`}>
                <Clock className="h-4 w-4" />
                Section 3: Clinical Templates & Drugs
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMobilePage('section2')}
                  className="lg:hidden text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold shadow flex items-center gap-1 transition"
                  title="Return to Rx Pad"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Back to Rx Pad</span>
                </button>
              </div>
            </div>

            {/* MODAL POPUP LAUNCHER BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsProtocolsModalOpen(true)}
                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:brightness-110 text-white text-[11px] font-black shadow-md flex items-center justify-center gap-1.5 transition transform active:scale-98"
              >
                <span>📜</span>
                <span>Clinical Protocols</span>
              </button>

              <button
                type="button"
                onClick={handleOpenRulesModal}
                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-700 to-rose-700 hover:brightness-110 text-white text-[11px] font-black shadow-md flex items-center justify-center gap-1.5 transition transform active:scale-98"
                title="Add, edit or import custom drug safety rules"
              >
                <span>🛡️</span>
                <span>Safety Rules Manager</span>
              </button>
            </div>

            {/* TEMPLATE QUICK APPLIER */}
            <div className="space-y-1.5 shrink-0 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <span>⚡ Quick-Load Templates</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                  title="Manage & Add Custom Templates"
                >
                  <span>⚙️ Manage</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <select
                  value={selectedSpecialtyId}
                  onChange={(e) => {
                    const specId = e.target.value;
                    setSelectedSpecialtyId(specId);
                    const specName = specialties.find((s) => s.id === specId)?.name || '';
                    if (specName) {
                      setDrugSearchQuery(specName.toLowerCase().split(' ')[0]);
                    }
                  }}
                  className={`flex-1 rounded-xl px-2.5 py-1.5 text-xs font-extrabold border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none ${inputBg}`}
                >
                  {specialties.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      🏥 {sp.name} ({sp.templates.length} tpls)
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleOpenNewProtocolEditorForSpecialty(selectedSpecialtyId)}
                  className="px-2 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] shadow transition flex items-center gap-1 shrink-0"
                  title="Add new template via Clinical Protocol Editor"
                >
                  <Plus className="h-3 w-3" />
                  <span>+ New</span>
                </button>
              </div>

              {currentSpecialty && currentSpecialty.templates.length > 0 ? (
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {currentSpecialty.templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className={`w-full p-2 rounded-xl border text-left text-[10px] transition flex items-center justify-between gap-1.5 ${
                        theme === 'day' 
                          ? 'bg-white hover:bg-blue-50/80 border-slate-200 text-slate-900 shadow-sm' 
                          : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-100'
                      }`}
                    >
                      <div className="truncate flex-1">
                        <span className="font-extrabold truncate block">{tpl.name}</span>
                        <span className="text-[8.5px] text-slate-500 font-medium truncate block">
                          {tpl.diagnosis ? `Dx: ${tpl.diagnosis} • ` : ''}{tpl.drugs?.length || 0} Rx • {tpl.tests?.length || 0} Tests
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => applyTemplate(tpl)}
                          className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-extrabold shadow transition flex items-center gap-0.5"
                          title="Apply template to live prescription pad"
                        >
                          <span>⚡ Apply</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditProtocolEditorFromTemplate(currentSpecialty.id, tpl)}
                          className="p-1 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 hover:bg-amber-500/30 text-[9.5px] font-bold"
                          title="Edit template via Clinical Protocol Editor"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-1 bg-white/50 dark:bg-slate-900/50">
                  <p className="text-[10px] text-slate-500 font-medium">No templates created under {currentSpecialty?.name || 'this category'} yet.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenNewProtocolEditorForSpecialty(selectedSpecialtyId)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] shadow inline-flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Create First Template
                  </button>
                </div>
              )}
            </div>

            {/* INTERACTIVE ADDITIONAL DRUGS CHECKLIST (TICK TO APPEND TO RX) */}
            <div className="flex-1 overflow-hidden flex flex-col space-y-1.5 pt-1 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPharmacopeiaModalOpen(true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition transform active:scale-98 shrink-0"
                >
                  <Pill className="h-4 w-4" />
                  <span>💊 Open Pharmacopeia</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenAddDrug}
                  className="py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow transition shrink-0 flex items-center gap-1"
                  title="Manually Add New Generic Drug to Catalog"
                >
                  <span>➕ Add Drug</span>
                </button>
              </div>

              {/* PRESCRIBING MODE TOGGLE STRIP (GENERIC VS BRAND) */}
              <div className={`p-1.5 rounded-xl border text-[10px] shrink-0 space-y-1 ${
                theme === 'day' ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-gray-800 text-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[10px] uppercase tracking-wider text-emerald-600">Prescribing Mode:</span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {prescribingMode === 'generic' ? 'Direct 1-Tap Generic' : 'Brand Picker Popup'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-slate-900/40">
                  <button
                    type="button"
                    onClick={() => handleSetPrescribingMode('generic')}
                    className={`py-1 px-2 rounded-lg font-extrabold text-[10px] transition flex items-center justify-center gap-1 ${
                      prescribingMode === 'generic'
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                        : (theme === 'day' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white')
                    }`}
                  >
                    <span>💊 Generic Mode</span>
                    <span className="text-[8.5px] bg-emerald-950/40 px-1 rounded text-emerald-950 font-bold">(No Popup)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetPrescribingMode('brand')}
                    className={`py-1 px-2 rounded-lg font-extrabold text-[10px] transition flex items-center justify-center gap-1 ${
                      prescribingMode === 'brand'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : (theme === 'day' ? 'text-slate-600 hover:text-slate-900' : 'text-gray-400 hover:text-white')
                    }`}
                  >
                    <span>🏷️ Brand Mode</span>
                    <span className="text-[8.5px] bg-amber-950/40 px-1 rounded text-amber-950 font-bold">(Picker)</span>
                  </button>
                </div>
              </div>

              {/* SEARCH & AGE/WEIGHT SMART SUGGESTION STRIP */}
              <div className="space-y-1.5 shrink-0">
                <div className="relative">
                  <Search className="h-3 w-3 text-slate-400 absolute left-2 top-1.5" />
                  <input
                    type="text"
                    value={drugSearchQuery}
                    onChange={(e) => setDrugSearchQuery(e.target.value)}
                    placeholder="Search specialty drugs (A-Z)..."
                    className={`w-full rounded-lg pl-7 pr-12 py-0.5 text-[10px] ${inputBg}`}
                  />
                  {(drugSearchQuery || drugFormulationFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setDrugSearchQuery('');
                        setDrugFormulationFilter('all');
                      }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-extrabold text-[8.5px] hover:bg-red-200 transition"
                      title="Clear search and formulation filters"
                    >
                      ✕ Reset
                    </button>
                  )}
                </div>

                {/* FORMULATION FILTER PILLS (ALL, INJ, TAB, CAP, SYP, DROPS, TOPICAL) */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] shrink-0 no-scrollbar">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'inj', label: '💉 Inj' },
                    { key: 'tab', label: '💊 Tab' },
                    { key: 'cap', label: '💊 Cap' },
                    { key: 'syp', label: '🧪 Syp' },
                    { key: 'drops', label: '💧 Drops' },
                    { key: 'topical', label: '🧴 Topical' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setDrugFormulationFilter(item.key as any)}
                      className={`px-2 py-0.5 rounded-lg font-extrabold transition shrink-0 text-[9.5px] ${
                        drugFormulationFilter === item.key
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : (theme === 'day' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700')
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-TIER ALPHABETICALLY SORTED SPECIALTY DRUGS CHECKLIST */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {(() => {
                  let matched = searchClinicalDrugs(drugSearchQuery, drugCatalog, '', drugFormulationFilter);

                  const w = parseFloat(vitals.weight) || 0;
                  const ageNum = parseFloat(patient.age) || 30;
                  const isAdultPatient = (w >= 35) || (ageNum >= 12 && w === 0);
                  const isPediatricPatient = (w > 0 && w < 35) || (ageNum > 0 && ageNum < 12);

                  // Demographically Filter Drug List per Weight, Age & BSA
                  const filteredMatched = matched.filter((d) => {
                    const lower = d.genericName.toLowerCase();
                    // If formulation filter is 'all', apply default demographic exclusions
                    if (isAdultPatient && drugFormulationFilter === 'all') {
                      if (lower.includes('azithromycin') && lower.includes('250mg')) return false;
                      if (lower.includes('syrup') || lower.includes('suspension') || lower.includes('drops') || lower.includes('dry syrup')) return false;
                      if (d.category === 'pediatric' || d.category === 'infant') return false;
                    }
                    if (isPediatricPatient && drugFormulationFilter === 'all') {
                      if (d.category === 'adult' && (lower.includes('500mg') || lower.includes('625mg') || lower.includes('650mg') || lower.includes('40mg'))) return false;
                    }
                    return true;
                  });

                  // Display all matching generic drugs sorted A-Z without truncation
                  const sortedList = [...filteredMatched].sort((a, b) => a.genericName.localeCompare(b.genericName));

                  const renderDrugItem = (d: DrugItem) => {
                    const w = parseFloat(vitals.weight) || 0;
                    const isContraindicated = w > 0 && w < 30 && d.category === 'adult';
                    const dynamicDosage = getDynamicDosageForPatient(d, w);
                    const label = `${d.genericName} (${dynamicDosage})`;
                    const isChecked = isDrugInSelectedList(d.genericName);

                    return (
                      <div
                        key={d.id}
                        onClick={() => {
                          if (isContraindicated) {
                            alert(`⚠️ SAFETY CONTRAINDICATION WARNING:\n\nA ${w} kg child cannot take ${d.genericName} (${d.dosage}) adult dose!\n\nPlease select calculated Pediatric Syrup dosage.`);
                            return;
                          }

                          if (prescribingMode === 'generic') {
                            // Direct 1-tap addition without popup!
                            toggleDrugSelection(label);
                          } else {
                            // Brand Mode -> Open Brand Picker Modal!
                            setActiveGenericDrugForBrands(d);
                            setIsBrandPickerModalOpen(true);
                          }
                        }}
                        className={`flex items-start gap-2 p-2 rounded-xl border text-[10.5px] cursor-pointer transition ${
                          isContraindicated
                            ? 'bg-red-50 border-red-300 text-red-900 opacity-60'
                            : isChecked
                            ? (theme === 'day' ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-semibold')
                            : (theme === 'day' ? 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300' : 'bg-gray-950/40 border-gray-800/80 text-gray-300')
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
                          <span className="text-[9px] text-slate-500 block truncate pt-0.5">
                            {isContraindicated ? `⚠️ Adult dose unsafe for ${w}kg child` : `${dynamicDosage} • ${d.duration}`}
                          </span>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 pb-0.5 border-b border-emerald-500/20">
                        <span>💊 Available Generic Prescriptions (A-Z)</span>
                        <span className="font-mono text-[9px] text-slate-400">{sortedList.length} drugs</span>
                      </div>
                      {sortedList.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs font-bold">
                          No generic drugs match your search or formulation filter.
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {sortedList.map(renderDrugItem)}
                        </div>
                      )}
                    </div>
                  );
                })()}
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
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenNewProtocolEditorForSpecialty(sp.id)}
                        className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] shadow transition flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add Template
                      </button>
                      <button
                        onClick={() => handleDeleteSpecialty(sp.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                        title="Delete Specialty"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { applyTemplate(tpl); setIsTemplateModalOpen(false); }}
                            className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow transition"
                          >
                            Apply Now
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditProtocolEditorFromTemplate(sp.id, tpl)}
                            className="px-2 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-extrabold shadow transition flex items-center gap-0.5"
                            title="Edit Template"
                          >
                            <span>✏️ Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(sp.id, tpl.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Delete Template"
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

      {/* DOCTOR PROFILE CREDENTIALS MODAL POPUP */}
      {isDoctorProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-base">
                  👨‍⚕️
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Physician Profile, Credentials & Settings
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Manage doctor details, reg no format, digital header/footer, and HDD backup options
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDoctorProfileModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
              >
                ✕
              </button>
            </div>

            {/* FORM CONTAINER: RESPONSIVE 2-COLUMN GRID */}
            <form onSubmit={handleSaveDoctorProfile} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                
                {/* LEFT COLUMN: BOXES 6 TO 8 (LOGO BANNERS & HARD DRIVE SYNC) */}
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-1.5">
                    <label className="block font-bold text-emerald-950">6. Digital Pad Header Banner / Logo (Optional)</label>
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow transition flex items-center gap-1">
                        <span>🖼️ Upload Logo</span>
                        <input type="file" accept="image/*" onChange={handleHeaderImageUpload} className="hidden" />
                      </label>
                      {headerImg && (
                        <button
                          type="button"
                          onClick={handleRemoveHeaderImage}
                          className="px-2.5 py-1 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 font-bold text-xs transition"
                        >
                          ✕ Remove Logo
                        </button>
                      )}
                    </div>
                    {headerImg ? (
                      <div className="mt-1 border rounded-lg p-1 bg-white flex items-center justify-center">
                        <img src={headerImg} alt="Header Preview" className="h-8 object-contain" />
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 italic">No image uploaded. Digital pad displays default clinic text header.</p>
                    )}
                  </div>

                  <div className="p-2.5 bg-purple-50/80 rounded-xl border border-purple-200 space-y-1.5">
                    <label className="block font-bold text-purple-950">7. Digital Pad Footer Banner (Optional)</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow transition flex items-center gap-1">
                        <span>🖼️ Custom Footer</span>
                        <input type="file" accept="image/*" onChange={handleFooterImageUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={handleApplyOdiaShantiMantraFooter}
                        className="px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center gap-1"
                      >
                        <span>🕉️ Odia Mantra Banner</span>
                      </button>
                      {footerImg && (
                        <button
                          type="button"
                          onClick={handleRemoveFooterImage}
                          className="px-2.5 py-1 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 font-bold text-xs transition"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>
                    {footerImg ? (
                      <div className="mt-1 border rounded-lg p-1 bg-white flex items-center justify-center">
                        <img src={footerImg} alt="Footer Preview" className="h-7 object-contain" />
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 italic">No footer banner set. Displays default 1cm signature spacing.</p>
                    )}
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
                    <label className="block font-bold text-amber-950">8. Offline Database Safeguards & Hard Drive Sync</label>
                    <p className="text-[11px] text-slate-600">
                      Connect a folder on your local hard drive (e.g. <code>D:\Clinic_Data\</code>) for live auto-syncing every time you prescribe, or download manual backups.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                      <button
                        type="button"
                        onClick={handleConnectFolder}
                        className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow transition flex items-center gap-1.5"
                        title="Auto sync: PrescribePro DB after connecting to Local HDD"
                      >
                        <span>💾</span>
                        <span>{connectedFolderName ? `Connected: ${connectedFolderName}` : 'Connect Database'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={downloadSqliteBackupFile}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow transition flex items-center gap-1.5"
                      >
                        <span>⬇️</span>
                        <span>Download Backup</span>
                      </button>
                      <label className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs shadow transition cursor-pointer flex items-center gap-1.5">
                        <span>📥</span>
                        <span>Restore Database</span>
                        <input
                          type="file"
                          accept=".sqlite,.db,.json"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) importSqliteBackupFile(file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {connectedFolderName && (
                      <div className="p-2.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-[11px] leading-relaxed text-justify space-y-1">
                        <div className="flex items-center gap-1.5 font-black text-emerald-900 text-xs">
                          <span className="text-emerald-700 font-bold">✓</span> Live Auto-Sync Active
                        </div>
                        <p className="text-justify leading-snug font-medium text-emerald-900">
                          Saving prescriptions automatically updates your SQLite database<br />
                          <code className="bg-emerald-200/90 text-emerald-950 px-1.5 py-0.5 rounded font-mono font-bold text-[10.5px]">
                            {connectedFolderName}/prescribepro_database.sqlite
                          </code><br />
                          directly on your local hard drive in real-time.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: BOXES 1 TO 5 (DOCTOR CREDENTIALS & REG NO FORMAT) */}
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div>
                      <label className="block mb-1 font-bold text-slate-800">1. Full Name & Title</label>
                      <input
                        type="text"
                        required
                        value={doctorProfile.name}
                        onChange={(e) => setDoctorProfile({ ...doctorProfile, name: e.target.value })}
                        placeholder="e.g. Dr. Alexander Fleming, MD"
                        className="w-full rounded-xl px-3 py-1.5 border border-slate-300 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold text-slate-800">2. Medical Registration No. (Regd. No)</label>
                      <input
                        type="text"
                        required
                        value={doctorProfile.regNo}
                        onChange={(e) => setDoctorProfile({ ...doctorProfile, regNo: e.target.value })}
                        placeholder="e.g. MCI/2026/89472"
                        className="w-full rounded-xl px-3 py-1.5 border border-slate-300 bg-white text-slate-900 font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold text-slate-800">3. Medical Qualification</label>
                      <input
                        type="text"
                        required
                        value={doctorProfile.qualification}
                        onChange={(e) => setDoctorProfile({ ...doctorProfile, qualification: e.target.value })}
                        placeholder="e.g. MBBS, MD (Internal Medicine), DNB"
                        className="w-full rounded-xl px-3 py-1.5 border border-slate-300 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-bold text-slate-800">4. Designation & Specialty</label>
                      <input
                        type="text"
                        required
                        value={doctorProfile.designation}
                        onChange={(e) => setDoctorProfile({ ...doctorProfile, designation: e.target.value })}
                        placeholder="e.g. Senior Consultant Physician & Diabetologist"
                        className="w-full rounded-xl px-3 py-1.5 border border-slate-300 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2">
                    <label className="block font-bold text-blue-950">5. Patient Reg. No. Sequential Format Preference</label>
                    <select
                      value={doctorProfile.regNoMode || 'custom_prefix'}
                      onChange={(e: any) => setDoctorProfile({ ...doctorProfile, regNoMode: e.target.value })}
                      className="w-full rounded-xl px-3 py-1.5 border border-blue-300 bg-white text-slate-900 font-semibold outline-none text-xs"
                    >
                      <option value="custom_prefix">Custom Auto-Incrementing Prefix (e.g. Tangi-1, Tangi-2...)</option>
                      <option value="auto_year">Auto Year Sequential Format (e.g. Tangi-2026-1, Tangi-2026-2...)</option>
                      <option value="blank">Blank / Custom Free Typing (No Auto Prefix)</option>
                    </select>
                    {doctorProfile.regNoMode !== 'blank' && (
                      <div className="space-y-1 pt-0.5">
                        <label className="block text-[11px] font-bold text-blue-900">Custom Prefix Identifier:</label>
                        <input
                          type="text"
                          value={doctorProfile.customRegNoPrefix ?? 'Tangi-'}
                          onChange={(e) => setDoctorProfile({ ...doctorProfile, customRegNoPrefix: e.target.value })}
                          placeholder="e.g. Tangi- or OPD-"
                          className="w-full rounded-xl px-3 py-1.5 border border-blue-300 bg-white text-xs font-mono font-bold"
                        />
                      </div>
                    )}
                    <p className="text-[10.5px] text-emerald-800 font-bold bg-emerald-100/60 p-1.5 rounded-lg border border-emerald-200">
                      ✨ Progression Preview: <code>{generateNextPatientRegNo(doctorProfile)}</code> → <code>{doctorProfile.customRegNoPrefix || 'Tangi-'}2</code> → <code>{doctorProfile.customRegNoPrefix || 'Tangi-'}3</code>...
                    </p>
                  </div>
                </div>

              </div>

              {/* FOOTER ACTIONS: ONE LINE ALIGNED RIGHT */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDoctorProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
                >
                  Save Physician Profile & Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOFTWARE UPDATE CONFIRMATION POPUP MODAL */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🚀</span>
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    Software Update Available ({githubReleaseInfo?.tagName || 'v1.1.0'})
                  </h3>
                  <p className="text-[11px] text-indigo-200 font-medium">
                    A new update is available for PrescribePro
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 rounded-lg bg-indigo-800/80 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 space-y-2">
                <strong className="text-indigo-950 dark:text-indigo-200 block font-extrabold text-xs">
                  📋 Release Highlights & Improvements:
                </strong>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Alphabetical Specialty Navigation & Master-Detail Protocol View</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Deterministic Diuretic & Multi-Indication Specialty Tagging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Real-Time Local HDD Offline Database Safeguards & Auto-Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Pediatric & Body Surface Area (BSA m²) Dosing Assistant</span>
                  </li>
                </ul>
              </div>

              {githubReleaseInfo?.releaseNotes && (
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 whitespace-pre-line max-h-28 overflow-y-auto">
                  {githubReleaseInfo.releaseNotes}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  if (githubReleaseInfo?.downloadUrl) {
                    window.open(githubReleaseInfo.downloadUrl, '_blank');
                  } else {
                    window.location.reload();
                  }
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-md transition flex items-center gap-1.5"
              >
                <span>⚡ Update Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAST PATIENTS HISTORY & PRESCRIPTIONS MODAL POPUP */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900">
            {/* MODAL HEADER */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-base">
                  📋
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Past Patients & Prescription Records
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Filter by date or search by Reg No, Mobile, or Name
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
              >
                ✕ Close
              </button>
            </div>

            {/* CONTROLS: SEARCH BAR & DATE FILTERS */}
            <div className="p-4 border-b border-slate-200 bg-slate-100/60 space-y-3">
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={historySearchTerm}
                    onChange={(e) => setHistorySearchTerm(e.target.value)}
                    placeholder="Search Reg No, Mobile, Name, or Diagnosis..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                {historySearchTerm && (
                  <button
                    onClick={() => setHistorySearchTerm('')}
                    className="text-xs text-slate-500 hover:text-slate-700 font-bold px-2 py-1 bg-slate-200 rounded-lg"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* DATE FILTER BUTTONS */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-200 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setHistoryDateFilter('all')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                      historyDateFilter === 'all' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    All Time ({allHistoryRecords.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryDateFilter('today')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                      historyDateFilter === 'today' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryDateFilter('7days')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                      historyDateFilter === '7days' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Past 7 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryDateFilter('30days')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                      historyDateFilter === '30days' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Past 30 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryDateFilter('custom')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-[11px] ${
                      historyDateFilter === 'custom' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Custom Date
                  </button>
                </div>

                {historyDateFilter === 'custom' && (
                  <input
                    type="date"
                    value={historyCustomDate}
                    onChange={(e) => setHistoryCustomDate(e.target.value)}
                    className="px-2.5 py-1 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                  />
                )}
              </div>
            </div>

            {/* LIST OF FILTERED RECORDS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[55vh]">
              {(() => {
                const now = new Date();
                const todayStr = now.toISOString().slice(0, 10);
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

                const filtered = allHistoryRecords.filter((rec) => {
                  const searchMatch = !historySearchTerm.trim() || 
                    (rec.patientName || '').toLowerCase().includes(historySearchTerm.toLowerCase()) ||
                    (rec.patientRegNo || '').toLowerCase().includes(historySearchTerm.toLowerCase()) ||
                    (rec.patientMobile || '').includes(historySearchTerm) ||
                    (rec.clinicalExamJson || '').toLowerCase().includes(historySearchTerm.toLowerCase());

                  if (!searchMatch) return false;

                  const recDate = new Date(rec.createdAt);
                  if (historyDateFilter === 'today') {
                    return rec.createdAt.slice(0, 10) === todayStr;
                  } else if (historyDateFilter === '7days') {
                    return recDate >= sevenDaysAgo;
                  } else if (historyDateFilter === '30days') {
                    return recDate >= thirtyDaysAgo;
                  } else if (historyDateFilter === 'custom') {
                    if (!historyCustomDate) return true;
                    return rec.createdAt.slice(0, 10) === historyCustomDate;
                  }
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <FileText className="h-10 w-10 mx-auto text-slate-300 animate-bounce" />
                      <p className="font-bold text-xs text-slate-600">No prescription records match the selected filter.</p>
                    </div>
                  );
                }

                return filtered.map((rec) => {
                  let drugs: string[] = [];
                  let diag = '';
                  try {
                    if (rec.selectedDrugsJson) drugs = JSON.parse(rec.selectedDrugsJson);
                    if (rec.clinicalExamJson) diag = JSON.parse(rec.clinicalExamJson).provisionalDiagnosis || '';
                  } catch (e) {}

                  return (
                    <div
                      key={rec.prescriptionId}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-slate-900 text-sm">{rec.patientName || 'Unnamed Patient'}</span>
                          {rec.patientRegNo && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-[10px] border border-blue-200">
                              Reg: {rec.patientRegNo}
                            </span>
                          )}
                          {rec.patientMobile && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono font-medium text-[10px]">
                              📱 {rec.patientMobile}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[10px] ml-auto">
                            {new Date(rec.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>

                        {diag && (
                          <p className="text-slate-700 font-medium text-[11px]">
                            <strong className="text-slate-900">Diagnosis:</strong> {diag}
                          </p>
                        )}

                        {drugs.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap pt-0.5">
                            <span className="text-[10px] font-bold text-slate-500">Drugs:</span>
                            {drugs.slice(0, 3).map((d, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-medium">
                                {d}
                              </span>
                            ))}
                            {drugs.length > 3 && (
                              <span className="text-[10px] text-emerald-600 font-bold">+{drugs.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPatient({
                            regNo: rec.patientRegNo || '',
                            mobile: rec.patientMobile || '',
                            name: rec.patientName || '',
                            age: rec.patientAge || '',
                            gender: rec.patientGender || 'Male',
                            careOf: '',
                            address: '',
                            allergies: '',
                          });
                          handleRestoreSqlitePrescription(rec);
                          setIsHistoryModalOpen(false);
                        }}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition shrink-0 self-center"
                      >
                        Restore to Pad
                      </button>
                    </div>
                  );
                });
              })()}
            </div>

            {/* FOOTER */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs">
              <span className="text-slate-500 text-[11px]">Total Prescriptions Saved: {allHistoryRecords.length}</span>
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL PHARMACOPEIA GENERIC DRUG SELECTOR MODAL POPUP (REDESIGNED 2-COLUMN SIDEBAR LAYOUT MATCHING CLINICAL PROTOCOLS) */}
      {isPharmacopeiaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[88vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
            {/* MODAL HEADER - LAPTOP SINGLE LINE WITH DESCRIPTION, MOBILE 2 LINES */}
            <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-2 shrink-0">
              {/* TITLE & DESCRIPTION */}
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-600 text-white font-extrabold text-base shadow shrink-0">
                  💊
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    Universal USFDA & IP Generic Drug Pharmacopeia
                  </h3>
                  <p className="hidden md:block text-xs text-slate-300 font-medium">
                    100% Pure Generic Preparations • Tick or click to append to Live Prescription Pad ({drugCatalog.length} loaded)
                  </p>
                </div>
              </div>

              {/* BUTTONS IN 1 SINGLE ROW */}
              <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenAddDrug}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] sm:text-xs shadow flex items-center gap-1 transition shrink-0 whitespace-nowrap"
                >
                  <span>➕ Add New Drug</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetDrugCatalogToDefault}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] sm:text-xs transition shrink-0 whitespace-nowrap"
                  title="Restore default database catalog"
                >
                  <span>🔄 Reset Catalog</span>
                </button>
                <button
                  onClick={() => {
                    setIsPharmacopeiaModalOpen(false);
                    setPharmaCategoryFilter(null);
                  }}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] sm:text-xs transition shrink-0 whitespace-nowrap"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* MAIN 2-COLUMN SIDEBAR LAYOUT MATCHING CLINICAL PROTOCOLS */}
            <div className="flex-1 flex overflow-hidden min-h-0 bg-white dark:bg-slate-950">
              {/* LEFT SIDEBAR: ALPHABETICALLY SORTED SPECIALTIES WITH DRUG COUNTS */}
              <div className={`${
                isPharmaSidebarCollapsed ? 'w-14 sm:w-16 md:w-72' : 'w-64 md:w-72'
              } shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 p-1.5 sm:p-2.5 overflow-y-auto space-y-1 transition-all duration-200`}>
                <div className="flex items-center justify-between px-1 py-1 border-b border-slate-200/60 dark:border-slate-800/60 mb-1">
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Specialties (A-Z)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPharmaSidebarCollapsed(!isPharmaSidebarCollapsed)}
                    className="md:hidden p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition text-xs flex items-center justify-center ml-auto"
                    title={isPharmaSidebarCollapsed ? "Expand specialty list" : "Shrink specialty list to icons"}
                  >
                    {isPharmaSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </button>
                </div>

                {PROTOCOL_CATEGORIES.filter((c) => c.key !== 'personal').map((cat) => {
                  const isActive = pharmaCategoryFilter === cat.key || (!pharmaCategoryFilter && cat.key === 'all' && !drugSearchQuery);
                  let catCount = 0;
                  if (cat.key === 'all') {
                    catCount = drugCatalog.length;
                  } else {
                    catCount = searchClinicalDrugs(cat.key, drugCatalog, '', 'all').length;
                  }

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setPharmaCategoryFilter(cat.key === 'all' ? null : cat.key);
                        if (cat.key !== 'all') {
                          setDrugSearchQuery('');
                          if (typeof window !== 'undefined' && window.innerWidth < 768) {
                            setIsPharmaSidebarCollapsed(true);
                          }
                        }
                      }}
                      title={`${cat.label} (${catCount} drugs)`}
                      className={`w-full text-left rounded-xl font-bold transition flex items-center justify-between px-3 py-2 text-xs ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-sm shrink-0">{cat.icon}</span>
                        <span className={`truncate ${isPharmaSidebarCollapsed ? 'hidden md:inline' : 'inline'}`}>{cat.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold transition ${
                        isPharmaSidebarCollapsed ? 'hidden md:inline-block' : 'inline-block'
                      } ${
                        isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {catCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT MAIN PANEL */}
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-slate-900">
                {/* SEARCH & FORMULATION CONTROLS STRIP */}
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2 bg-slate-100/60 dark:bg-slate-900/60 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={drugSearchQuery}
                        onChange={(e) => setDrugSearchQuery(e.target.value)}
                        placeholder="Search generic drug name, symptom or alias (e.g. Cefixime, Toothache, Fits, Asthma)..."
                        className="w-full rounded-xl pl-9 pr-24 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                      {(drugSearchQuery || drugFormulationFilter !== 'all' || pharmaCategoryFilter) && (
                        <button
                          type="button"
                          onClick={() => {
                            setDrugSearchQuery('');
                            setDrugFormulationFilter('all');
                            setPharmaCategoryFilter(null);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 hover:bg-red-200 font-extrabold text-[10px] transition shadow-sm"
                        >
                          ✕ Clear Filters
                        </button>
                      )}
                    </div>

                    {/* PRESCRIBING MODE TOGGLE BUTTON */}
                    <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => {
                          setPrescribingMode('generic');
                          localStorage.setItem('prescribepro_rx_mode', 'generic');
                        }}
                        className={`px-2 py-1 rounded-lg transition ${prescribingMode === 'generic' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        Generic Rx
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPrescribingMode('brand');
                          localStorage.setItem('prescribepro_rx_mode', 'brand');
                        }}
                        className={`px-2 py-1 rounded-lg transition ${prescribingMode === 'brand' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        Brand Rx
                      </button>
                    </div>
                  </div>

                  {/* FORMULATION SELECTOR: MOBILE DROPDOWN SELECT + DESKTOP PILLS */}
                  <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
                    <span className="text-slate-500 font-bold shrink-0 text-[10px] uppercase tracking-wider">Formulation:</span>
                    
                    {/* MOBILE DROPDOWN (< SELECT > ON MOBILE VIEW TO PREVENT HORIZONTAL SCROLLING) */}
                    <select
                      value={drugFormulationFilter}
                      onChange={(e) => setDrugFormulationFilter(e.target.value as any)}
                      className="sm:hidden flex-1 rounded-xl border border-slate-300 dark:border-slate-700 p-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {[
                        { key: 'all', label: 'All Formulations' },
                        { key: 'inj', label: '💉 Injectables' },
                        { key: 'tab', label: '💊 Tablets' },
                        { key: 'cap', label: '💊 Capsules' },
                        { key: 'syp', label: '🧪 Syrups' },
                        { key: 'drops', label: '💧 Drops' },
                        { key: 'topical', label: '🧴 Topical' },
                      ].map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.label}
                        </option>
                      ))}
                    </select>

                    {/* DESKTOP PILL BADGES (HIDDEN ON MOBILE) */}
                    <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
                      {[
                        { key: 'all', label: 'All Formulations' },
                        { key: 'inj', label: '💉 Injectables' },
                        { key: 'tab', label: '💊 Tablets' },
                        { key: 'cap', label: '💊 Capsules' },
                        { key: 'syp', label: '🧪 Syrups' },
                        { key: 'drops', label: '💧 Drops' },
                        { key: 'topical', label: '🧴 Topical' },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setDrugFormulationFilter(item.key as any)}
                          className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition text-[10px] ${
                            drugFormulationFilter === item.key
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* INITIATION BLANK STATE */}
                {!pharmaCategoryFilter && !drugSearchQuery && drugFormulationFilter === 'all' ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500 space-y-3">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-3xl shadow-sm animate-pulse">
                      👈
                    </div>
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-200">Select a Specialty from the Left Panel</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                      Click any specialty in the left panel or type in the search bar above to browse generic preparations. ({drugCatalog.length} generic drugs available)
                    </p>
                  </div>
                ) : (
                  /* DRUGS GRID BODY */
                  <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-950">
                    {(() => {
                      const effectiveQuery = drugSearchQuery || (pharmaCategoryFilter || '');
                      const matched = searchClinicalDrugs(effectiveQuery, drugCatalog, '', drugFormulationFilter);

                      if (matched.length === 0) {
                        return (
                          <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
                            <p className="font-bold text-xs text-slate-600 dark:text-slate-400">
                              No generic drugs found matching the selected filters.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setDrugSearchQuery('');
                                setDrugFormulationFilter('all');
                                setPharmaCategoryFilter(null);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                            >
                              Reset Filters
                            </button>
                          </div>
                        );
                      }

                      return matched.map((drug) => {
                        const w = parseFloat(vitals.weight) || 0;
                        const dynamicDosage = getDynamicDosageForPatient(drug, w);
                        const doseLabel = `${drug.genericName} - ${dynamicDosage} for ${drug.duration}`;
                        const isChecked = isDrugInSelectedList(drug.genericName);
                        return (
                          <div
                            key={drug.id}
                            onClick={() => toggleDrugSelection(doseLabel)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                              isChecked
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1.5 mb-1">
                                <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 leading-snug">
                                  {drug.genericName}
                                </h4>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => handleOpenEditDrug(drug, e)}
                                    className="p-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-[10px] font-bold transition"
                                    title="Edit this generic drug"
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteDrug(drug.id, drug.genericName, e)}
                                    className="p-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-950 dark:text-red-200 text-[10px] font-bold transition"
                                    title="Delete this generic drug"
                                  >
                                    🗑️
                                  </button>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                                    isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                  }`}>
                                    {isChecked ? '✓ Added' : '+ Add'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                                Dose: <strong className="text-slate-800 dark:text-slate-200">{getDynamicDosageForPatient(drug, parseFloat(vitals.weight) || 0)}</strong>
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-500">
                                Standard Duration: {drug.duration}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
                              <span className="uppercase font-bold tracking-wider">{drug.category}</span>
                              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">100% Pure Generic</span>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">
                {selectedDrugs.length} medications selected on live prescription pad
              </span>
              <button
                onClick={() => {
                  setIsPharmacopeiaModalOpen(false);
                  setPharmaCategoryFilter(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                Done / Back to Prescription Pad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DRUG SAFETY & INTERACTION RULES MANAGER MODAL POPUP (DOCTOR WORKSPACE) */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
            {/* HEADER */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-red-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-red-600 text-white font-extrabold text-base shadow">
                  🛡️
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Drug Safety & Offline Interaction Rules Manager
                  </h3>
                  <p className="text-xs text-red-200 font-medium">
                    Add custom interaction alerts, import CSV rules or review pre-bundled CDSCO/WHO databases ({rulesList.length} active rules)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow flex items-center gap-1 cursor-pointer transition shrink-0">
                  <span>📥 Import CSV</span>
                  <input
                    type="file"
                    accept=".csv,.json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const text = event.target?.result as string;
                        if (text) {
                          const res = importRulesFromCSVText(text);
                          refreshRulesList();
                          alert(`Imported ${res.successCount} custom rules successfully!`);
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset custom rules and restore default pre-bundled medical dataset?')) {
                      resetRulesToDefault();
                      refreshRulesList();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition shrink-0"
                  title="Restore default pre-bundled open dataset"
                >
                  <span>🔄 Reset to Default</span>
                </button>
                <button
                  onClick={() => setIsRulesModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {/* ADD CUSTOM RULE FORM */}
              <form onSubmit={handleAddCustomRuleInWorkspace} className="p-4 rounded-xl border border-red-200 dark:border-red-950 bg-red-50/40 dark:bg-red-950/20 space-y-3">
                <h4 className="text-xs font-extrabold text-red-800 dark:text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                  ➕ Add Custom Drug Interaction / Safety Alert Rule
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Drug A Keywords (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. diazepam, valium, calmpose"
                      value={newRuleA}
                      onChange={(e) => setNewRuleA(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Drug B Keywords (or 'all' for single drug safety alert)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. clonazepam, clonotril, petril"
                      value={newRuleB}
                      onChange={(e) => setNewRuleB(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Warning Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dual Benzodiazepine Sedation Hazard"
                      value={newRuleTitle}
                      onChange={(e) => setNewRuleTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Medical Source Citation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CDSCO / NLEM India, Physician Custom Rule"
                      value={newRuleSource}
                      onChange={(e) => setNewRuleSource(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Severity Level
                    </label>
                    <select
                      value={newRuleSeverity}
                      onChange={(e) => setNewRuleSeverity(e.target.value as 'high' | 'moderate')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-bold"
                    >
                      <option value="high">🔴 High Severity</option>
                      <option value="moderate">🟡 Moderate Severity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Clinical Conflict Explanation
                    </label>
                    <input
                      type="text"
                      placeholder="Detailed mechanism explanation..."
                      value={newRuleDesc}
                      onChange={(e) => setNewRuleDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Clinical Recommendation
                    </label>
                    <input
                      type="text"
                      placeholder="Recommended physician action..."
                      value={newRuleRec}
                      onChange={(e) => setNewRuleRec(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1"
                  >
                    ➕ Save Custom Rule
                  </button>
                </div>
              </form>

              {/* SEARCHABLE ACTIVE RULES TABLE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Active Safety Rules Database Table
                  </span>
                  <div className="relative w-72">
                    <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Filter rules by drug, title or source..."
                      value={searchRuleQuery}
                      onChange={(e) => setSearchRuleQuery(e.target.value)}
                      className="w-full rounded-xl pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold"
                    />
                  </div>
                </div>

                <div className="max-h-[320px] overflow-y-auto space-y-2 pr-1">
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
                      <div
                        key={r.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {r.severity === 'high' ? '🔴' : '🟡'} {r.title}
                            {r.isCustom ? (
                              <span className="text-[9px] bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.5 rounded font-extrabold border border-purple-300 dark:border-purple-800">
                                Custom Rule
                              </span>
                            ) : (
                              <span className="text-[9px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">
                                Pre-bundled
                              </span>
                            )}
                          </span>
                          <div className="flex items-center gap-2">
                            {r.isCustom && (
                              <button
                                type="button"
                                onClick={() => {
                                  deleteCustomInteractionRule(r.id);
                                  refreshRulesList();
                                }}
                                className="px-2 py-0.5 bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-950 dark:text-red-200 border border-red-300 dark:border-red-800 text-[10px] font-bold rounded-lg transition"
                                title="Delete this custom rule"
                              >
                                🗑️ Delete
                              </button>
                            )}
                            <span className="text-[10px] bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-mono px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800 font-semibold">
                              🏛️ {r.source}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                          <strong className="text-slate-900 dark:text-slate-100">Conflict:</strong> [{r.drugA.join(', ')}] ↔ [{r.drugB.join(', ')}]
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-[10.5px] italic leading-snug">{r.description}</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-[10.5px]">
                          <strong>Recommendation:</strong> {r.recommendation}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">
                {rulesList.filter((r) => r.isCustom).length} custom physician rules configured
              </span>
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 font-bold text-xs shadow transition"
              >
                Close Manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE EDITOR POPUP MODAL */}
      {isTemplateEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">✏️</span>
                <h3 className="font-extrabold text-sm">
                  {editingTemplate.id ? 'Edit Prescription Template' : 'Create New Prescription Template'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTemplateEditorOpen(false)}
                className="p-1 rounded-lg bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveTemplateEditor} className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Target Specialty</label>
                <select
                  value={templateEditorSpecialtyId}
                  onChange={(e) => setTemplateEditorSpecialtyId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                  required
                >
                  <option value="" disabled>Select Specialty...</option>
                  {specialties.map((sp) => (
                    <option key={sp.id} value={sp.id}>{sp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Template Name</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  placeholder="e.g. Acute Gastroenteritis, Dengue OPD, Toothache, Follow-Up..."
                  className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Chief Complaints (Comma-separated)</label>
                <input
                  type="text"
                  value={editingTemplate.complaints}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, complaints: e.target.value })}
                  placeholder="e.g. High fever, Loose stools, Vomiting, Abdominal pain"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Provisional Diagnosis</label>
                <input
                  type="text"
                  value={editingTemplate.diagnosis}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, diagnosis: e.target.value })}
                  placeholder="e.g. Acute Gastroenteritis with Mild Dehydration"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Prescribed Medications (Rx) - One per line</label>
                <textarea
                  rows={4}
                  value={editingTemplate.drugsText}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, drugsText: e.target.value })}
                  placeholder="e.g.&#10;Tab Ofloxacin 200mg (1-0-1 after food) x 5 days&#10;Tab Paracetamol 650mg (1-0-1) S.O.S&#10;Cap Pantoprazole 40mg (1-0-0 on empty stomach)"
                  className="w-full rounded-xl border border-slate-300 p-2 font-mono text-xs bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Prescribed Diagnostic & Lab Tests (Comma-separated)</label>
                <input
                  type="text"
                  value={editingTemplate.testsText}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, testsText: e.target.value })}
                  placeholder="e.g. Complete Blood Count (CBC), Stool Routine & Microscopy, Widal Test"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Diet & Specific Patient Advice</label>
                <textarea
                  rows={2}
                  value={editingTemplate.advice}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, advice: e.target.value })}
                  placeholder="e.g. Drink 3L fluids daily (ORS, coconut water). Avoid oily and spicy foods."
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTemplateEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GENERIC DRUG EDITOR MODAL */}
      {isDrugEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-emerald-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">💊</span>
                <h3 className="font-extrabold text-sm">
                  {editingDrug.id ? 'Edit Generic Drug Details' : 'Add New Generic Drug'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrugEditorOpen(false)}
                className="p-1 rounded-lg bg-emerald-800 hover:bg-emerald-600 text-white font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveDrugEditor} className="p-4 space-y-3 overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Generic Drug Name & Brand Alias *</label>
                <input
                  type="text"
                  required
                  value={editingDrug.genericName || ''}
                  onChange={(e) => setEditingDrug({ ...editingDrug, genericName: e.target.value })}
                  placeholder="e.g. Cefixime 200mg Tablet (Taxim-O)"
                  className="w-full rounded-xl border border-slate-300 p-2 font-bold bg-white text-slate-900"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Target Patient Category</label>
                  <select
                    value={editingDrug.category || 'adult'}
                    onChange={(e) => setEditingDrug({ ...editingDrug, category: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                  >
                    <option value="adult">Adult</option>
                    <option value="pediatric">Pediatric</option>
                    <option value="infant">Infant</option>
                    <option value="all">Universal / All</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Standard Duration</label>
                  <input
                    type="text"
                    value={editingDrug.duration || ''}
                    onChange={(e) => setEditingDrug({ ...editingDrug, duration: e.target.value })}
                    placeholder="e.g. 5 days or 30 days"
                    className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Standard Regimen & Directions</label>
                <input
                  type="text"
                  value={editingDrug.dosage || ''}
                  onChange={(e) => setEditingDrug({ ...editingDrug, dosage: e.target.value })}
                  placeholder="e.g. 1 tablet twice daily after food (1-0-1)"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Search Keywords / Symptom Aliases</label>
                <input
                  type="text"
                  value={editingDrug.keywords || ''}
                  onChange={(e) => setEditingDrug({ ...editingDrug, keywords: e.target.value })}
                  placeholder="e.g. cefixime taxim-o antibiotic fever infection dysuria"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDrugEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
                >
                  Save Generic Drug
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLINICAL PROTOCOLS & ER ORDER SETS LIST VIEW MODAL */}
      {isProtocolsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[88vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
            {/* HEADER - LAPTOP SINGLE LINE WITH DESCRIPTION, MOBILE 2 LINES */}
            <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-2 shrink-0">
              {/* TITLE & DESCRIPTION */}
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-600 text-white font-extrabold text-base shadow shrink-0">
                  📜
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    Clinical Practice Protocols & ER Order Sets
                  </h3>
                  <p className="hidden md:block text-xs text-slate-300 font-medium">
                    Evidence-based clinical protocols, emergency guidelines, and 1-click prescription order sets
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleOpenNewProtocolEditor}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow flex items-center gap-1 transition shrink-0"
                >
                  <Plus className="h-4 w-4" /> + Create New Protocol
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProtocolsModalOpen(false);
                    setSelectedProtocol(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition shrink-0"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* MAIN 2-COLUMN SIDEBAR LAYOUT */}
            <div className="flex-1 flex overflow-hidden min-h-0 bg-white dark:bg-slate-950">
              {/* LEFT SIDEBAR: ALPHABETICALLY SORTED SPECIALTIES WITH PROTOCOL COUNTS */}
              <div className={`${
                isProtocolSidebarCollapsed ? 'w-14 sm:w-16 md:w-72' : 'w-64 md:w-72'
              } shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 p-1.5 sm:p-2.5 overflow-y-auto space-y-1 transition-all duration-200`}>
                <div className="flex items-center justify-between px-1 py-1 border-b border-slate-200/60 dark:border-slate-800/60 mb-1">
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Specialties (A-Z)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsProtocolSidebarCollapsed(!isProtocolSidebarCollapsed)}
                    className="md:hidden p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition text-xs flex items-center justify-center ml-auto"
                    title={isProtocolSidebarCollapsed ? "Expand specialty list" : "Shrink specialty list to icons"}
                  >
                    {isProtocolSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </button>
                </div>

                {PROTOCOL_CATEGORIES.map((cat) => {
                  const isActive = protocolCategoryFilter === cat.key;
                  let catCount = 0;
                  if (cat.key === 'all') {
                    catCount = protocols.length + specialties.reduce((acc, sp) => acc + (sp.templates?.length || 0), 0);
                  } else if (cat.key === 'personal') {
                    catCount = specialties.reduce((acc, sp) => acc + (sp.templates?.length || 0), 0);
                  } else {
                    catCount = protocols.filter((p) => p.category === cat.key).length;
                  }

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setProtocolCategoryFilter(cat.key);
                        setSelectedProtocol(null);
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          setIsProtocolSidebarCollapsed(true);
                        }
                      }}
                      title={`${cat.label} (${catCount} items)`}
                      className={`w-full text-left rounded-xl font-bold transition flex items-center justify-between px-3 py-2 text-xs ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-sm shrink-0">{cat.icon}</span>
                        <span className={`truncate ${isProtocolSidebarCollapsed ? 'hidden md:inline' : 'inline'}`}>{cat.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold transition ${
                        isProtocolSidebarCollapsed ? 'hidden md:inline-block' : 'inline-block'
                      } ${
                        isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {catCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT MAIN PANEL */}
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-slate-900">
                {/* INITIATION BLANK STATE */}
                {!protocolCategoryFilter && !selectedProtocol && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500 space-y-3">
                    <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-3xl shadow-sm animate-pulse">
                      👈
                    </div>
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-200">Select a Specialty from the Left Panel</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                      Click any specialty or <strong className="text-indigo-600 dark:text-indigo-400">"All Protocols"</strong> in the left panel to browse protocols. Click any protocol to view its full order set details.
                    </p>
                  </div>
                )}

                {/* DETAILED VIEW FOR SELECTED PROTOCOL / TEMPLATE */}
                {selectedProtocol && (
                  <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-slate-900">
                    {/* DETAIL CONTENT BODY (TOP RIBBON REMOVED FOR MAXIMUM SCREEN REAL ESTATE) */}

                    {/* DETAIL CONTENT BODY */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="font-black text-lg text-slate-900">{selectedProtocol.title || selectedProtocol.name}</h2>
                          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs uppercase border border-indigo-200">
                            {selectedProtocol.category || selectedProtocol.specialtyName || 'General'}
                          </span>
                          {selectedProtocol.targetGroup && (
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                              👥 {selectedProtocol.targetGroup}
                            </span>
                          )}
                        </div>
                        {selectedProtocol.guidelinesSummary && (
                          <p className="text-slate-700 font-medium text-xs leading-relaxed mt-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                            {selectedProtocol.guidelinesSummary}
                          </p>
                        )}
                      </div>

                      {/* RED FLAGS ALERT BAR */}
                      {selectedProtocol.redFlags && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-950 font-medium text-xs flex items-start gap-2.5 shadow-sm">
                          <span className="font-extrabold text-red-600 text-base leading-none">⚠️ EMERGENCY RED FLAGS:</span>
                          <span className="leading-relaxed">{selectedProtocol.redFlags}</span>
                        </div>
                      )}

                      {/* PROVISIONAL DIAGNOSIS & COMPLAINTS */}
                      {(selectedProtocol.diagnosis || (selectedProtocol.chiefComplaints && selectedProtocol.chiefComplaints.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          {selectedProtocol.diagnosis && (
                            <div>
                              <strong className="text-slate-900 block mb-0.5 font-extrabold">Provisional Diagnosis:</strong>
                              <p className="text-slate-800 font-bold">{selectedProtocol.diagnosis}</p>
                            </div>
                          )}
                          {selectedProtocol.chiefComplaints && selectedProtocol.chiefComplaints.length > 0 && (
                            <div>
                              <strong className="text-slate-900 block mb-0.5 font-extrabold">Chief Complaints:</strong>
                              <p className="text-slate-700">{selectedProtocol.chiefComplaints.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* PRESCRIBED MEDICATIONS */}
                      {selectedProtocol.drugs && selectedProtocol.drugs.length > 0 && (
                        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                          <h4 className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                            💊 Prescribed Order Set Medications (Rx)
                          </h4>
                          <ul className="space-y-1.5">
                            {selectedProtocol.drugs.map((drugStr: string, idx: number) => (
                              <li key={idx} className="p-2 rounded-lg bg-white border border-emerald-200 text-slate-900 font-mono text-xs font-semibold shadow-sm flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                <span>{drugStr}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* DIAGNOSTIC TESTS & ADVICE */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProtocol.tests && selectedProtocol.tests.length > 0 && (
                          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                            <strong className="text-slate-900 block font-extrabold text-xs">🧪 Recommended Diagnostic Tests:</strong>
                            <ul className="list-disc pl-4 text-slate-700 space-y-1 font-medium">
                              {selectedProtocol.tests.map((t: string, i: number) => (
                                <li key={i}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedProtocol.advice && (
                          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                            <strong className="text-slate-900 block font-extrabold text-xs">📝 Specific Advice & Follow-Up:</strong>
                            <p className="text-slate-700 italic leading-relaxed">
                              {Array.isArray(selectedProtocol.advice) ? selectedProtocol.advice.join('\n') : selectedProtocol.advice}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DETAIL FOOTER */}
                    <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedProtocol(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-300 transition text-center"
                      >
                        ← Back to Protocols List
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedProtocol.specialtyId) {
                            if (selectedProtocol.complaints && selectedProtocol.complaints.length > 0) setChiefComplaints(selectedProtocol.complaints.join(', '));
                            if (selectedProtocol.diagnosis) setProvisionalDiagnosis(selectedProtocol.diagnosis);
                            if (selectedProtocol.drugs && selectedProtocol.drugs.length > 0) setSelectedDrugs(selectedProtocol.drugs);
                            if (selectedProtocol.tests && selectedProtocol.tests.length > 0) setSelectedTests(selectedProtocol.tests);
                            if (selectedProtocol.advice) setSpecificAdviceText(Array.isArray(selectedProtocol.advice) ? selectedProtocol.advice.join('\n') : selectedProtocol.advice);
                            setIsProtocolsModalOpen(false);
                            setSelectedProtocol(null);
                            setSaveStatus(`Applied Template: "${selectedProtocol.name}"`);
                            setTimeout(() => setSaveStatus(null), 3500);
                          } else {
                            handleApplyProtocol(selectedProtocol);
                            setSelectedProtocol(null);
                          }
                        }}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <span>⚡ Apply Order Set to Prescription Pad</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* PROTOCOLS LIST VIEW FOR SELECTED CATEGORY */}
                {protocolCategoryFilter && !selectedProtocol && (
                  <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                    {/* TOP SEARCH BAR */}
                    <div className="p-3 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2 shrink-0">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={protocolSearchTerm}
                          onChange={(e) => setProtocolSearchTerm(e.target.value)}
                          placeholder="Search clinical protocols by disease, symptom, or keyword..."
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* SCROLLABLE CARDS CONTAINER */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {(() => {
                        if (protocolCategoryFilter === 'personal') {
                          const personalList: Array<{
                            id: string;
                            name: string;
                            specialtyId: string;
                            specialtyName: string;
                            complaints?: string[];
                            diagnosis?: string;
                            drugs: string[];
                            tests: string[];
                            advice: string[];
                          }> = [];

                          specialties.forEach((sp) => {
                            sp.templates.forEach((tpl) => {
                              personalList.push({
                                ...tpl,
                                specialtyId: sp.id,
                                specialtyName: sp.name,
                                advice: Array.isArray(tpl.advice) ? tpl.advice : [tpl.advice || ''],
                              });
                            });
                          });

                          const filteredPersonal = personalList.filter((p) => {
                            if (!protocolSearchTerm.trim()) return true;
                            const q = protocolSearchTerm.toLowerCase();
                            return (
                              p.name.toLowerCase().includes(q) ||
                              (p.diagnosis || '').toLowerCase().includes(q) ||
                              p.specialtyName.toLowerCase().includes(q)
                            );
                          });

                          if (filteredPersonal.length === 0) {
                            return (
                              <div className="text-center py-12 text-slate-400 space-y-2">
                                <FileText className="h-10 w-10 mx-auto text-slate-300 animate-bounce" />
                                <p className="font-bold text-xs text-slate-600">No personal templates saved yet.</p>
                                <button
                                  type="button"
                                  onClick={() => handleOpenNewProtocolEditorForSpecialty(specialties[0]?.id || 'spec-1')}
                                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow"
                                >
                                  + Create Custom Template
                                </button>
                              </div>
                            );
                          }

                          return filteredPersonal.map((tpl) => (
                            <div
                              key={tpl.id}
                              onClick={() => setSelectedProtocol(tpl)}
                              className="p-3.5 rounded-2xl border border-amber-300/80 bg-amber-50/40 hover:border-amber-500 hover:shadow-md cursor-pointer transition space-y-2 text-xs"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h4 className="font-black text-sm text-slate-900 hover:text-indigo-600 transition">{tpl.name}</h4>
                                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase border border-amber-300">
                                      ⭐ Personal Template • {tpl.specialtyName}
                                    </span>
                                  </div>
                                  {tpl.diagnosis && (
                                    <p className="text-slate-700 font-bold text-xs">
                                      Diagnosis: <span className="text-blue-900">{tpl.diagnosis}</span>
                                    </p>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-amber-200/60" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedProtocol(tpl)}
                                    className="px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs transition"
                                  >
                                    📄 Details
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (tpl.complaints && tpl.complaints.length > 0) setChiefComplaints(tpl.complaints.join(', '));
                                      if (tpl.diagnosis) setProvisionalDiagnosis(tpl.diagnosis);
                                      if (tpl.drugs && tpl.drugs.length > 0) setSelectedDrugs(tpl.drugs);
                                      if (tpl.tests && tpl.tests.length > 0) setSelectedTests(tpl.tests);
                                      if (tpl.advice) setSpecificAdviceText(Array.isArray(tpl.advice) ? tpl.advice.join('\n') : tpl.advice);
                                      setIsProtocolsModalOpen(false);
                                      setSaveStatus(`Applied Template: "${tpl.name}"`);
                                      setTimeout(() => setSaveStatus(null), 3500);
                                    }}
                                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition flex items-center gap-1"
                                  >
                                    <span>⚡ Apply</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditProtocolEditorFromTemplate(tpl.specialtyId, tpl as any)}
                                    className="px-2 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow transition"
                                    title="Edit Personal Template"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTemplate(tpl.specialtyId, tpl.id)}
                                    className="px-2 py-1 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition"
                                    title="Delete Personal Template"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                          ));
                        }

                        const filtered = protocols.filter((p) => {
                          const matchesCat = protocolCategoryFilter === 'all' || p.category === protocolCategoryFilter;
                          const matchesSearch = !protocolSearchTerm.trim() ||
                            p.title.toLowerCase().includes(protocolSearchTerm.toLowerCase()) ||
                            p.diagnosis.toLowerCase().includes(protocolSearchTerm.toLowerCase()) ||
                            p.guidelinesSummary.toLowerCase().includes(protocolSearchTerm.toLowerCase());
                          return matchesCat && matchesSearch;
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="text-center py-12 text-slate-400 space-y-2">
                              <FileText className="h-10 w-10 mx-auto text-slate-300 animate-bounce" />
                              <p className="font-bold text-xs text-slate-600">No clinical protocols found for this specialty.</p>
                            </div>
                          );
                        }

                        return filtered.map((proto) => (
                          <div
                            key={proto.id}
                            onClick={() => setSelectedProtocol(proto)}
                            className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-md cursor-pointer transition space-y-2 text-xs"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h4 className="font-black text-sm text-slate-900 hover:text-indigo-600 transition">{proto.title}</h4>
                                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-[10px] uppercase">
                                    {proto.category}
                                  </span>
                                  {proto.targetGroup && (
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                                      👥 {proto.targetGroup}
                                    </span>
                                  )}
                                </div>
                                <p className="text-slate-600 font-medium text-xs line-clamp-2 leading-relaxed">
                                  {proto.guidelinesSummary}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedProtocol(proto)}
                                  className="px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs transition"
                                >
                                  📄 Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleApplyProtocol(proto)}
                                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition flex items-center gap-1"
                                >
                                  <span>⚡ Apply</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditProtocolEditor(proto)}
                                  className="px-2 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow transition"
                                  title="Edit Protocol"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProtocol(proto.id)}
                                  className="px-2 py-1 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition"
                                  title="Delete Protocol"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>

                            {/* RED FLAGS SHORT BADGE */}
                            {proto.redFlags && (
                              <div className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-950 font-semibold text-[10.5px] truncate">
                                ⚠️ Red Flags: {proto.redFlags}
                              </div>
                            )}
                          </div>
                        ));
                      })()}
                    </div>

                    {/* FOOTER */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-xs shrink-0 text-slate-700 dark:text-slate-300 font-bold">
                      <span>
                        {protocolCategoryFilter ? (
                          <>
                            Protocols in <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{PROTOCOL_CATEGORIES.find(c => c.key === protocolCategoryFilter)?.label || 'Specialty'}</span>: {' '}
                            <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-mono font-black border border-indigo-200 dark:border-indigo-800">
                              {protocolCategoryFilter === 'all' 
                                ? (protocols.length + specialties.reduce((acc, sp) => acc + (sp.templates?.length || 0), 0))
                                : protocolCategoryFilter === 'personal'
                                ? specialties.reduce((acc, sp) => acc + (sp.templates?.length || 0), 0)
                                : protocols.filter(p => p.category === protocolCategoryFilter).length
                              }
                            </span>
                          </>
                        ) : (
                          `Total Protocols System Library: ${protocols.length}`
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsProtocolsModalOpen(false)}
                        className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                      >
                        Close Screen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROTOCOL EDITOR POPUP MODAL */}
      {isProtocolEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📜</span>
                <h3 className="font-extrabold text-sm">
                  {editingProtocol.id ? 'Edit Clinical Protocol' : 'Create New Clinical Protocol'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProtocolEditorOpen(false)}
                className="p-1 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProtocolEditor} className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Protocol Title</label>
                  <input
                    type="text"
                    required
                    value={editingProtocol.title}
                    onChange={(e) => setEditingProtocol({ ...editingProtocol, title: e.target.value })}
                    placeholder="e.g. Typhoid Fever Protocol, Dengue Outpatient..."
                    className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Category</label>
                  <select
                    value={editingProtocol.category}
                    onChange={(e: any) => setEditingProtocol({ ...editingProtocol, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 font-semibold bg-white text-slate-900"
                  >
                    {PROTOCOL_CATEGORIES.filter((c) => c.key !== 'all' && c.key !== 'personal').map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Target Group / Age</label>
                  <input
                    type="text"
                    value={editingProtocol.targetGroup}
                    onChange={(e) => setEditingProtocol({ ...editingProtocol, targetGroup: e.target.value })}
                    placeholder="e.g. Adult & Pediatric, Infants < 2 yrs..."
                    className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Provisional Diagnosis</label>
                  <input
                    type="text"
                    value={editingProtocol.diagnosis}
                    onChange={(e) => setEditingProtocol({ ...editingProtocol, diagnosis: e.target.value })}
                    placeholder="e.g. Enteric Fever (Typhoid)"
                    className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Clinical Guidelines Summary</label>
                <textarea
                  rows={2}
                  value={editingProtocol.guidelinesSummary}
                  onChange={(e) => setEditingProtocol({ ...editingProtocol, guidelinesSummary: e.target.value })}
                  placeholder="e.g. Hydration management guidelines, dosage schedule and monitoring timeline..."
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-red-950 mb-1">🚨 Danger Signs & Emergency Red Flags</label>
                <textarea
                  rows={2}
                  value={editingProtocol.redFlags}
                  onChange={(e) => setEditingProtocol({ ...editingProtocol, redFlags: e.target.value })}
                  placeholder="e.g. Persistent vomiting, cold extremities, mucosal bleeding, SpO2 < 90%..."
                  className="w-full rounded-xl border border-red-300 bg-red-50/50 p-2 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Prescribed Order Set Medications (Rx) - One per line</label>
                <textarea
                  rows={4}
                  value={editingProtocol.drugs ? editingProtocol.drugs.join('\n') : ''}
                  onChange={(e) => setEditingProtocol({ ...editingProtocol, drugs: e.target.value.split('\n').filter(Boolean) })}
                  placeholder="e.g.&#10;Tab Cefixime 200mg (1-0-1) x 10 days&#10;Tab Paracetamol 650mg (1-0-1) S.O.S"
                  className="w-full rounded-xl border border-slate-300 p-2 font-mono text-xs bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Diagnostic / Lab Tests (Comma-separated)</label>
                <input
                  type="text"
                  value={editingProtocol.tests ? editingProtocol.tests.join(', ') : ''}
                  onChange={(e) => setEditingProtocol({ ...editingProtocol, tests: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })}
                  placeholder="e.g. TyphiDot IgM, CBC with ESR, Blood Culture"
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Patient Advice & Follow-Up Instructions</label>
                <textarea
                  rows={2}
                  value={editingProtocol.advice}
                  onChange={(e) => setEditingProtocol({ ...editingProtocol, advice: e.target.value })}
                  placeholder="e.g. Boiled water, light diet, recheck after 3 days..."
                  className="w-full rounded-xl border border-slate-300 p-2 font-medium bg-white text-slate-900"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProtocolEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md"
                >
                  Save Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    {/* ISOLATED TOP-LEVEL A4 PRINT AREA FOR WINDOW.PRINT() */}
    <div id="isolated-print-area" className="hidden print:block">
      <div
        style={{
          paddingTop: `${headerMarginMm}mm`,
          paddingBottom: `${footerMarginMm}mm`,
          boxSizing: 'border-box',
        }}
        className={`w-full bg-white text-slate-900 font-sans p-6 text-xs flex flex-col justify-between ${pageSize === 'A5' ? 'min-h-[210mm]' : 'min-h-[297mm]'}`}
      >
        <div>
          {/* DIGITAL CLINIC HEADER */}
          {padMode === 'digital' && (
            headerImg ? (
              <img src={headerImg} alt="Clinic Header" className="w-full h-16 object-contain mb-3" />
            ) : (
              <div className="border-b-2 border-slate-900 pb-3 mb-3 text-center">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                  PRESCRIBEPRO CLINIC & HEALTH CENTER
                </h1>
                <p className="text-xs text-slate-700 font-semibold">Multi-Specialty Healthcare • Reg No: 89745-MC</p>
                <p className="text-[10px] text-slate-600">Primary Care, Telemedicine & Clinical Diagnostics</p>
              </div>
            )
          )}

          {/* PREPRINTED SPACER HEADER */}
          {padMode === 'preprinted' && (
            <div style={{ height: `${headerMarginMm}mm` }} className="w-full" />
          )}

          {/* PATIENT INFO STRIP */}
          <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-300 mb-3 grid grid-cols-4 gap-2 text-[11px]">
            <div><strong>Patient Name:</strong> {patient.name || '—'}</div>
            <div><strong>Age / Sex:</strong> {patient.age || '—'} Y / {patient.gender || '—'}</div>
            <div><strong>Weight / Height:</strong> {vitals.weight ? `${vitals.weight} kg` : '—'} / {vitals.height ? `${vitals.height} cm` : '—'}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</div>
          </div>

          {/* VITALS DEMOGRAPHICS */}
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 mb-3 flex flex-wrap gap-4 text-[10px] text-slate-700">
            {vitals.bp && <span><strong>BP:</strong> {vitals.bp} mmHg</span>}
            {vitals.pulse && <span><strong>Pulse:</strong> {vitals.pulse} bpm</span>}
            {vitals.temp && <span><strong>Temp:</strong> {vitals.temp} °F</span>}
            {vitals.weight && <span><strong>Weight:</strong> {vitals.weight} kg</span>}
            {vitals.height && <span><strong>Height:</strong> {vitals.height} cm</span>}
          </div>

          {/* 2-COLUMN SIDE-BY-SIDE FLEX PRINT ENGINE */}
          <div className="print-grid w-full">
            {/* LEFT COLUMN: LABS & PROCEDURES */}
            <div className="print-left-pane">
              {selectedTests.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-slate-900 text-xs border-b pb-1 mb-1 uppercase tracking-wider">🔬 Diagnostic Tests & Labs</h4>
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                    {selectedTests.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                  {testResultsText && (
                    <p className="text-[9.5px] italic text-slate-600 mt-1">{testResultsText}</p>
                  )}
                </div>
              )}

              {selectedProcedures.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-slate-900 text-xs border-b pb-1 mb-1 uppercase tracking-wider">🛠️ Procedures & Non-Drug Care</h4>
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                    {selectedProcedures.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: CLINICAL ASSESSMENT, DIAGNOSIS, RX MEDICATIONS & ADVICE */}
            <div className="print-right-pane">
              {chiefComplaints && (
                <div className="mb-2">
                  <strong className="text-slate-900 block text-xs">Chief Complaints:</strong>
                  <p className="text-[11px] text-slate-800">{chiefComplaints}</p>
                </div>
              )}

              {provisionalDiagnosis && (
                <div className="mb-3 p-1.5 bg-slate-100 border border-slate-300 rounded font-bold text-slate-900 text-xs">
                  Diagnosis: {provisionalDiagnosis}
                </div>
              )}

              {/* RX PRESCRIBED MEDICATIONS */}
              <div className="mb-4">
                <h3 className="text-sm font-extrabold text-slate-900 border-b-2 border-slate-900 pb-1 mb-2 flex items-center justify-between">
                  <span>Rx - Prescribed Generic Medications</span>
                </h3>
                {selectedDrugs.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-900 font-medium">
                    {selectedDrugs.map((drug, index) => (
                      <li key={index} className="pl-1">
                        <span className="font-bold">{drug}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-slate-400 italic text-xs">No medications prescribed.</p>
                )}
              </div>

              {/* SPECIFIC ADVICE & LIFESTYLE */}
              {(specificAdviceText || selectedAdvice.length > 0) && (
                <div className="mt-4 pt-2 border-t border-slate-300">
                  <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wider">📌 Patient Advice & Follow-Up</h4>
                  <p className="text-[11px] text-slate-800 mb-1">{specificAdviceText}</p>
                  {selectedAdvice.length > 0 && (
                    <ul className="list-disc pl-4 text-[10px] text-slate-700 space-y-0.5">
                      {selectedAdvice.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DIGITAL & PREPRINTED CLINIC FOOTER - PINNED TO ABSOLUTE BOTTOM */}
        <div className="mt-auto shrink-0 pt-6">
          {padMode === 'digital' ? (
            footerImg ? (
              <div className="pt-2 border-t border-slate-300 flex items-end justify-between text-[10px] text-slate-600">
                <div className="flex-1 mr-4 flex items-end">
                  <img
                    src={footerImg}
                    alt="Clinic Footer Banner"
                    style={{ height: `${footerImgHeight}px` }}
                    className="w-full object-contain object-left max-h-[120px]"
                  />
                </div>
                <div className="text-right text-slate-900 space-y-0.5 shrink-0">
                  <p className="font-extrabold text-xs text-slate-900 border-t border-slate-400 pt-0.5 inline-block">
                    {doctorProfile.name || 'Dr. Attending Physician'}
                  </p>
                  {doctorProfile.qualification && <p className="font-semibold text-[10px] text-slate-700">{doctorProfile.qualification}</p>}
                  {doctorProfile.designation && <p className="italic text-[9.5px] text-slate-600">{doctorProfile.designation}</p>}
                  {doctorProfile.regNo && <p className="font-mono text-[9px] text-slate-500">Regd. No: {doctorProfile.regNo}</p>}
                  <p className="text-[9px] font-mono text-slate-500 pt-0.5 border-t border-slate-200 mt-0.5">
                    Date & Time: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-300 flex items-end justify-between text-[10px] text-slate-600">
                <div className="flex-1" />
                <div className="text-right text-slate-900 space-y-0.5">
                  <p className="font-extrabold text-xs text-slate-900 border-t border-slate-400 pt-0.5 inline-block">
                    {doctorProfile.name || 'Dr. Attending Physician'}
                  </p>
                  {doctorProfile.qualification && (
                    <p className="font-semibold text-[10px] text-slate-700">{doctorProfile.qualification}</p>
                  )}
                  {doctorProfile.designation && (
                    <p className="italic text-[9.5px] text-slate-600">{doctorProfile.designation}</p>
                  )}
                  {doctorProfile.regNo && (
                    <p className="font-mono text-[9px] text-slate-500">Regd. No: {doctorProfile.regNo}</p>
                  )}
                  <p className="text-[9px] font-mono text-slate-500 pt-0.5 border-t border-slate-200 mt-0.5">
                    Date & Time: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-end justify-between pt-2">
              <div style={{ height: `${footerMarginMm}mm` }} className="flex-1" />
              <div className="text-right text-slate-900 space-y-0.5">
                <p className="font-extrabold text-xs text-slate-900 border-t border-slate-400 pt-0.5 inline-block">
                  {doctorProfile.name || 'Dr. Attending Physician'}
                </p>
                {doctorProfile.qualification && (
                  <p className="font-semibold text-[10px] text-slate-700">{doctorProfile.qualification}</p>
                )}
                {doctorProfile.designation && (
                  <p className="italic text-[9.5px] text-slate-600">{doctorProfile.designation}</p>
                )}
                {doctorProfile.regNo && (
                  <p className="font-mono text-[9px] text-slate-500">Regd. No: {doctorProfile.regNo}</p>
                )}
                <p className="text-[9px] font-mono text-slate-500 pt-0.5 border-t border-slate-200 mt-0.5">
                  Date & Time: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* PEDIATRIC & BSA DOSING ASSISTANT MODAL POPUP */}
      {isPediatricModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 max-w-2xl w-full rounded-2xl p-5 shadow-2xl space-y-4 text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2.5 shrink-0">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Calculator className="h-5 w-5 text-amber-400 shrink-0" />
                <span>👶 Pediatric Weight & Body Surface Area (BSA m²) Dosing Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPediatricModalOpen(false)}
                className="text-gray-400 hover:text-white font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>

            {/* INPUTS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-xl border border-gray-800 shrink-0">
              <div>
                <label className="text-[10px] text-gray-400 font-bold block mb-1">Child Weight (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="60"
                  value={vitals.weight || '10'}
                  onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                  className="w-full bg-slate-900 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 font-bold block mb-1">Child Height (cm) (Optional)</label>
                <input
                  type="number"
                  step="1"
                  min="30"
                  max="180"
                  value={vitals.height || ''}
                  onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                  placeholder="Height in cm..."
                  className="w-full bg-slate-900 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex flex-col justify-center bg-amber-950/40 p-2 rounded-lg border border-amber-500/30 text-amber-300">
                <span className="text-[9.5px] uppercase font-bold text-amber-400">Calculated BSA (m²)</span>
                <span className="font-mono font-extrabold text-sm text-white">
                  {calculateBsa(parseFloat(vitals.height) || 0, parseFloat(vitals.weight) || 10).toFixed(2)} m²
                </span>
                <span className="text-[8.5px] text-gray-400 italic">
                  {parseFloat(vitals.height) > 0 ? 'Mosteller Formula' : 'Weight-Estimated BSA'}
                </span>
              </div>
            </div>

            {/* REAL-TIME PEDIATRIC DRUG SEARCH BAR */}
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                value={pediatricSearchQuery}
                onChange={(e) => setPediatricSearchQuery(e.target.value)}
                placeholder="🔍 Search pediatric drug or calculation (e.g. Paracetamol, Rabies, HRIG, Cefixime)..."
                className="w-full bg-slate-950 border border-gray-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white font-medium outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* SCROLLABLE DOSAGE CARDS */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1">
              {/* SECTION 1: WEIGHT-BASED DOSES */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <h4 className="font-extrabold text-amber-400 text-xs flex items-center gap-1.5">
                    <span>⚖️ Weight-Based Pediatric & Immunoglobulin Dosage ({vitals.weight || 10} kg Child)</span>
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono font-bold bg-slate-800 px-2 py-0.5 rounded-full border border-gray-700">
                    1-Tap Add to Rx Pad
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {calculatePediatricDose(parseFloat(vitals.weight) || 10)
                    .filter((pd) => {
                      if (!pediatricSearchQuery.trim()) return true;
                      const q = pediatricSearchQuery.toLowerCase();
                      return (
                        pd.drugName.toLowerCase().includes(q) ||
                        pd.calculatedVolumeMl.toLowerCase().includes(q) ||
                        pd.notes.toLowerCase().includes(q)
                      );
                    })
                    .map((pd, idx) => {
                      const isSyrup = pd.formulation.toLowerCase().includes('syrup') || pd.formulation.toLowerCase().includes('liquid') || pd.formulation.toLowerCase().includes('suspension');
                      const isInj = pd.formulation.toLowerCase().includes('injectable') || pd.formulation.toLowerCase().includes('vial') || pd.formulation.toLowerCase().includes('ampoule');
                      const prefix = isSyrup ? 'Syp.' : isInj ? 'Inj.' : 'Tab.';
                      const doseLabel = `${prefix} ${pd.drugName} (${pd.calculatedVolumeMl}) - ${pd.frequency}`;
                      const isChecked = selectedDrugs.includes(doseLabel);
                    
                    // Categorize badge colors for instant recognition
                    const isRabies = pd.drugName.toLowerCase().includes('rabies') || pd.drugName.toLowerCase().includes('erig') || pd.drugName.toLowerCase().includes('hrig');
                    const isAntibiotic = pd.drugName.toLowerCase().includes('cefixime') || pd.drugName.toLowerCase().includes('amoxiclav') || pd.drugName.toLowerCase().includes('azithromycin');
                    const isFever = pd.drugName.toLowerCase().includes('paracetamol') || pd.drugName.toLowerCase().includes('meftal') || pd.drugName.toLowerCase().includes('ibuprofen');

                    const categoryBadge = isRabies
                      ? 'bg-purple-900/80 text-purple-200 border-purple-500/50'
                      : isAntibiotic
                      ? 'bg-cyan-900/80 text-cyan-200 border-cyan-500/50'
                      : isFever
                      ? 'bg-amber-900/80 text-amber-200 border-amber-500/50'
                      : 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50';

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-slate-900 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                            : 'bg-slate-950/90 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-white text-xs tracking-wide">{pd.drugName}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${categoryBadge}`}>
                              {isRabies ? '💉 Immunoglobulin' : isAntibiotic ? '💊 Antibiotic' : isFever ? '🌡️ Antipyretic' : '🤢 Gastro'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap pt-0.5">
                            <span className="text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-lg font-mono text-xs font-black">
                              Calculated Volume: {pd.calculatedVolumeMl}
                            </span>
                            <span className="text-gray-300 font-mono text-[11px] font-semibold bg-slate-900 px-2 py-0.5 rounded border border-gray-800">
                              ⏰ {pd.frequency}
                            </span>
                          </div>

                          <div className="text-gray-400 text-[10.5px] italic pt-0.5 leading-relaxed">
                            💡 {pd.notes}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleDrugSelection(doseLabel)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 shadow flex items-center justify-center gap-1 ${
                            isChecked
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-amber-500/20'
                              : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 active:scale-95'
                          }`}
                        >
                          {isChecked ? '✓ Added to Rx' : '+ Add Dose to Rx'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: BSA-BASED DOSES */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                  <h4 className="font-extrabold text-blue-400 text-xs flex items-center gap-1.5">
                    <span>📐 Body Surface Area (BSA m²) Specialized Protocols</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800">
                    BSA: {calculateBsa(parseFloat(vitals.height) || 0, parseFloat(vitals.weight) || 10).toFixed(2)} m²
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {calculateBsaDose(
                    parseFloat(vitals.height) || 0,
                    parseFloat(vitals.weight) || 10,
                    parseFloat(patient.age) || 5
                  )
                    .filter((bd) => {
                      if (!pediatricSearchQuery.trim()) return true;
                      const q = pediatricSearchQuery.toLowerCase();
                      return (
                        bd.drugName.toLowerCase().includes(q) ||
                        bd.totalCalculatedDose.toLowerCase().includes(q) ||
                        bd.dosePerBsa.toLowerCase().includes(q)
                      );
                    })
                    .map((bd, idx) => {
                      const doseLabel = `Inj. ${bd.drugName} (${bd.totalCalculatedDose}) - ${bd.dosePerBsa}`;
                      const isChecked = selectedDrugs.includes(doseLabel);
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-slate-900 border-blue-400 shadow-md ring-1 ring-blue-400/50'
                            : 'bg-slate-950/90 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-white text-xs tracking-wide">{bd.drugName}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-900/60 text-blue-200 border border-blue-500/40">
                              📐 BSA Protocol
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap pt-0.5">
                            <span className="text-blue-300 bg-blue-950/60 border border-blue-500/40 px-2 py-0.5 rounded-lg font-mono text-xs font-black">
                              Calculated Total: {bd.totalCalculatedDose}
                            </span>
                            <span className="text-gray-300 font-mono text-[11px] font-semibold bg-slate-900 px-2 py-0.5 rounded border border-gray-800">
                              ({bd.dosePerBsa})
                            </span>
                          </div>

                          <div className="text-gray-400 text-[10.5px] italic pt-0.5 leading-relaxed">
                            💡 Indication: {bd.clinicalIndication} | {bd.frequency}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleDrugSelection(doseLabel)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 shadow flex items-center justify-center gap-1 ${
                            isChecked
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/20'
                              : 'bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 active:scale-95'
                          }`}
                        >
                          {isChecked ? '✓ Added to Rx' : '+ Add Dose to Rx'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsPediatricModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Assistant
              </button>
            </div>
          </div>
        </div>
      )}
      {/* GENERIC ↔ BRAND PICKER & CUSTOMIZER POPUP MODAL */}
      {isBrandPickerModalOpen && activeGenericDrugForBrands && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 max-w-md w-full rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                <Pill className="h-5 w-5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-white font-bold text-xs truncate">{activeGenericDrugForBrands.genericName}</span>
                  <span className="text-[10px] text-gray-400 font-normal">Choose Generic vs Brand Name to prescribe</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsBrandPickerModalOpen(false);
                  setActiveGenericDrugForBrands(null);
                }}
                className="text-gray-400 hover:text-white font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>

            {/* PATIENT AGE/WEIGHT/BSA CLINICAL CONTEXT STRIP */}
            <div className="p-2 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between text-[10px]">
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                {(parseFloat(vitals.weight) > 0 && parseFloat(vitals.weight) < 35) || (parseFloat(patient.age) > 0 && parseFloat(patient.age) < 12)
                  ? '👶 Pediatric Clinical Calculations Active'
                  : '👨 Adult Standard Dosage Active'}
              </span>
              <span className="font-mono text-gray-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-gray-800">
                {parseFloat(vitals.weight) > 0
                  ? `Wt: ${vitals.weight}kg • BSA: ${calculateBsa(parseFloat(vitals.height) || 0, parseFloat(vitals.weight)).toFixed(2)}m²`
                  : `Patient Age: ${patient.age || 'Adult'} Y`}
              </span>
            </div>

            {/* ROW 1: #1 DEFAULT CHOICE - PURE GENERIC NAME */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 block">
                ⭐ #1 Choice (Standard Generic Prescription):
              </span>
              <div
                onClick={() => {
                  const label = `${activeGenericDrugForBrands.genericName} (${activeGenericDrugForBrands.dosage})`;
                  toggleDrugSelection(label);
                  setIsBrandPickerModalOpen(false);
                  setActiveGenericDrugForBrands(null);
                }}
                className="p-3 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition flex items-center justify-between shadow-md"
              >
                <div className="space-y-0.5">
                  <span className="font-extrabold text-amber-300 text-xs block">
                    {activeGenericDrugForBrands.genericName}
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono">
                    {activeGenericDrugForBrands.dosage} • {activeGenericDrugForBrands.duration}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-[10px] shrink-0 shadow">
                  + Add Generic
                </span>
              </div>
            </div>

            {/* SECTION B: CLINICALLY MATCHED BRAND FORMULATIONS */}
            <div className="space-y-2 pt-1 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 block">
                  🏷️ Age / Weight / BSA Matched Brands:
                </span>
                <span className="text-[9.5px] text-gray-400 font-mono">
                  {getClinicalBrandSuggestionsList(activeGenericDrugForBrands.genericName).length} Formulations
                </span>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {getClinicalBrandSuggestionsList(activeGenericDrugForBrands.genericName).map((brandItem, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-2.5 rounded-xl bg-slate-950 border border-gray-800 hover:border-emerald-500/40 flex items-center justify-between gap-2 transition"
                  >
                    <div
                      onClick={() => {
                        if (activeItemIndexForBrand !== null && activeItemIndexForBrand >= 0) {
                          const original = selectedDrugs[activeItemIndexForBrand] || '';
                          const formattedLine = applyBrandToPrescribedLine(original, brandItem.brandName, brandItem.formulation);
                          const updated = [...selectedDrugs];
                          updated[activeItemIndexForBrand] = formattedLine;
                          setSelectedDrugs(updated);
                          setIsBrandPickerModalOpen(false);
                          setActiveGenericDrugForBrands(null);
                          setActiveItemIndexForBrand(null);
                        } else {
                          const formattedLine = applyBrandToPrescribedLine(
                            brandItem.brandName,
                            brandItem.brandName,
                            brandItem.formulation
                          ) + ` (${brandItem.calculatedDose} • ${brandItem.frequency})`;
                          toggleDrugSelection(formattedLine);
                          setIsBrandPickerModalOpen(false);
                          setActiveGenericDrugForBrands(null);
                        }
                      }}
                      className="flex-1 cursor-pointer min-w-0 space-y-0.5"
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-white text-xs truncate">{brandItem.brandName}</span>
                        <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                          brandItem.isPediatric
                            ? 'bg-purple-900/80 text-purple-200 border-purple-500/40'
                            : 'bg-blue-900/80 text-blue-200 border-blue-500/40'
                        }`}>
                          {brandItem.formulation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[9.5px] flex-wrap">
                        <span className="text-amber-300 font-mono font-bold">
                          Dose: {brandItem.calculatedDose}
                        </span>
                        <span className="text-gray-400 font-mono">
                          ⏰ {brandItem.frequency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const label = `${brandItem.brandName} (${brandItem.calculatedDose} • ${brandItem.frequency})`;
                          if (activeItemIndexForBrand !== null && activeItemIndexForBrand >= 0) {
                            const original = selectedDrugs[activeItemIndexForBrand] || '';
                            const matchInst = original.match(/\(.*\)/);
                            const inst = matchInst ? ` ${matchInst[0]}` : '';
                            const updated = [...selectedDrugs];
                            updated[activeItemIndexForBrand] = `${brandItem.brandName}${inst}`;
                            setSelectedDrugs(updated);
                            setIsBrandPickerModalOpen(false);
                            setActiveGenericDrugForBrands(null);
                            setActiveItemIndexForBrand(null);
                          } else {
                            toggleDrugSelection(label);
                            setIsBrandPickerModalOpen(false);
                            setActiveGenericDrugForBrands(null);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] shadow"
                      >
                        {activeItemIndexForBrand !== null ? '✓ Select Brand' : '+ Add Brand'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBrand(activeGenericDrugForBrands.genericName, brandItem.brandName)}
                        className="px-2 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 text-[10px] font-bold"
                        title="Delete Brand"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD NEW CUSTOM BRAND INPUT */}
              <div className="pt-2 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  value={newCustomBrandInput}
                  onChange={(e) => setNewCustomBrandInput(e.target.value)}
                  placeholder="Add custom brand name (e.g. Aziwok 200, Dolo 120)..."
                  className="flex-1 bg-slate-950 border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddCustomBrand(activeGenericDrugForBrands.genericName)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shrink-0 shadow"
                >
                  + Add Brand
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsBrandPickerModalOpen(false);
                  setActiveGenericDrugForBrands(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
);
}
