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
  savePrescriptionToSqlite, 
  getPatientPrescriptionsFromSqlite, 
  SavedPrescriptionRecord 
} from '@/lib/db/sqlite';
import { 
  getSpecialties, 
  saveSpecialties, 
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
    allergies: 'NKDA (No Known Drug Allergies)',
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
    'CBC (Complete Blood Count with Differential)',
    'HbA1c (Glycated Hemoglobin)',
  ]);
  const [testFilterQuery, setTestFilterQuery] = useState('');
  const [newCustomTestInput, setNewCustomTestInput] = useState('');
  const [testResultsText, setTestResultsText] = useState(
    'Hemoglobin: 14.2 g/dL | Fasting Sugar: 98 mg/dL | HbA1c: 5.6%'
  );

  // Additional Advice State
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([]);
  const [customAdviceText, setCustomAdviceText] = useState('');

  // Clinical Examination & Diagnostic History States
  const [chiefComplaints, setChiefComplaints] = useState('Fever x 3 days, Dry Cough, Bodyache');
  const [signsSymptoms, setSignsSymptoms] = useState('Mild pharyngeal erythema, Low-grade fever, Fatigue');
  const [clinicalHistory, setClinicalHistory] = useState('No prior hospitalizations or major surgeries.');
  const [familyHistory, setFamilyHistory] = useState('Father: Hypertension | Mother: Type 2 Diabetes');
  const [drugHistory, setDrugHistory] = useState('Tab Paracetamol 500mg S.O.S. NKDA (No Known Drug Allergies).');
  const [examinationFindings, setExaminationFindings] = useState('Chest: Clear bilateral breath sounds. Abdomen: Soft.');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('Acute Upper Respiratory Tract Infection (URTI)');
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState('1. Viral Bronchitis  2. Influenza A');
  const [specificAdviceText, setSpecificAdviceText] = useState('Take medications strictly after meals. Return if fever persists >3 days.');

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

  // Mobile View Slide-Over Drawer State ('none' | 'left' | 'right')
  const [mobileDrawer, setMobileDrawer] = useState<'none' | 'left' | 'right'>('none');

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

  // Pharmacopeia Selector Modal State
  const [isPharmacopeiaModalOpen, setIsPharmacopeiaModalOpen] = useState<boolean>(false);

  // Doctor Profile State (Name, Regd No, Qualification, Designation)
  const [doctorProfile, setDoctorProfile] = useState({
    name: 'Dr. Alexander Fleming',
    regNo: 'MCI-REG-89472',
    qualification: 'MBBS, MD (Internal Medicine)',
    designation: 'Senior Consultant Physician & Diabetologist',
  });
  const [isDoctorProfileModalOpen, setIsDoctorProfileModalOpen] = useState(false);

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
      selectedAdviceJson: JSON.stringify(selectedAdvice),
      customAdviceText: customAdviceText || '',
      selectedProceduresJson: JSON.stringify(selectedProcedures),
      doctorProfileJson: JSON.stringify(doctorProfile),
      padMode,
      pageSize,
    };

    await savePrescriptionToSqlite(record);

    const pastRecords = await getPatientPrescriptionsFromSqlite(patient.regNo || patient.mobile || patient.name);
    setSqliteHistory(pastRecords);
  };

  const handleRestoreSqlitePrescription = (rec: SavedPrescriptionRecord) => {
    try {
      if (rec.selectedDrugsJson) setSelectedDrugs(JSON.parse(rec.selectedDrugsJson));
      if (rec.selectedTestsJson) setSelectedTests(JSON.parse(rec.selectedTestsJson));
      if (rec.testResultsText) setTestResultsText(rec.testResultsText);
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

      const savedDocProfile = localStorage.getItem('prescribepro_doctor_profile');
      if (savedDocProfile) {
        try {
          setDoctorProfile(JSON.parse(savedDocProfile));
        } catch (err) {
          console.error(err);
        }
      }

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
    setIsDoctorProfileModalOpen(false);
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
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);

    setPatient({
      regNo: `REG-${todayStr}-${randNum}`,
      mobile: '',
      name: '',
      age: '',
      gender: 'Male',
      careOf: '',
      address: '',
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

    setSaveStatus('Wiped prescription pad & generated new Reg No for consultation.');
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

  const toggleDrugSelection = (drugLabel: string) => {
    if (selectedDrugs.includes(drugLabel)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d !== drugLabel));
    } else {
      setSelectedDrugs([...selectedDrugs, drugLabel]);
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
    setSelectedDrugs([...selectedDrugs, 'Tab Custom Generic Medication (1-0-1 after food) x 5 days']);
  };

  const handlePrint = (actionType: 'print' | 'pdf' = 'print') => {
    autoSavePrescription(actionType);
    const printArea = document.getElementById('printable-prescription-pad');
    if (!printArea) {
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
              border: none !important;
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

  // Seamless Glassmorphism Styling over Green, Pink & Blue Smudged Oval Background
  const containerBg = "bg-transparent text-slate-900";

  const headerBg = 'bg-white/65 backdrop-blur-xl border-b border-white/60 shadow-sm relative z-10';

  const cardBg = 'bg-white/65 backdrop-blur-xl border border-white/70 shadow-2xl shadow-slate-300/40 text-slate-900 relative z-10';

  const inputBg = 'bg-white/80 backdrop-blur-md border border-slate-300/80 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20';

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${containerBg}`}>
      
      {/* 1. ULTRA-COMPACT TOP BANNER (~5PX PADDING / ~38PX HEIGHT) */}
      <header className={`h-[38px] px-3 sm:px-4 py-1 flex items-center justify-between shrink-0 ${headerBg}`}>
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="PrescribePro Logo" className="h-6 w-6 rounded-lg shadow-md border border-slate-200/50" />
          <h1 className="font-extrabold text-xs tracking-wide text-slate-900">
            PrescribePro
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
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
            title="Edit Doctor Credentials (Name, Regd No, Qualification, Designation)"
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
                setMobileDrawer('none');
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

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-white/80 border border-white/70 text-slate-700 shadow-sm">
            <User className="h-3 w-3 text-emerald-600" />
            <span className="font-mono font-bold truncate max-w-[110px]">{email}</span>
          </div>

          <button
            onClick={() => router.push('/change-password')}
            className="p-1 rounded-lg bg-white/80 hover:bg-white text-slate-600 transition shadow-sm"
            title="Change Password"
          >
            <KeyRound className="h-3 w-3" />
          </button>

          <button
            onClick={handleSignOut}
            className="p-1 rounded-lg bg-white/80 hover:bg-red-50 text-red-600 transition shadow-sm"
            title="Sign Out"
          >
            <LogOut className="h-3 w-3" />
          </button>
        </div>
      </header>

      {/* 2. THREE VERTICAL SECTIONS (WITH RESPONSIVE MOBILE DRAWERS) */}
      <main className="flex-1 p-2.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 overflow-hidden h-[calc(100vh-38px)] relative">
        
        {/* MOBILE BACKDROP OVERLAY FOR SLIDE-OVER DRAWERS */}
        {mobileDrawer !== 'none' && (
          <div 
            onClick={() => setMobileDrawer('none')} 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          />
        )}

        {/* LEFT FLOATING EDGE TOGGLE BUTTON (MOBILE ONLY) */}
        <button
          type="button"
          onClick={() => setMobileDrawer(mobileDrawer === 'left' ? 'none' : 'left')}
          className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 lg:hidden font-extrabold text-[11px] py-4 px-2 rounded-r-2xl shadow-2xl flex flex-col items-center gap-1.5 border-r-2 border-y-2 transition-all transform active:scale-95 cursor-pointer ${
            mobileDrawer === 'left'
              ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-600/60'
              : 'bg-blue-600 hover:bg-blue-700 border-blue-300 text-white shadow-blue-600/60 animate-pulse'
          }`}
          title="Slide Open Section 1 (Patient Details & Inputs)"
        >
          <ChevronRight className={`h-5 w-5 transition-transform ${mobileDrawer === 'left' ? 'rotate-180' : ''}`} />
          <span className="[writing-mode:vertical-lr] tracking-widest uppercase font-mono text-[10px] font-extrabold">
            {mobileDrawer === 'left' ? '✕ Close' : '◀ Inputs'}
          </span>
        </button>

        {/* RIGHT FLOATING EDGE TOGGLE BUTTON (MOBILE ONLY) */}
        <button
          type="button"
          onClick={() => setMobileDrawer(mobileDrawer === 'right' ? 'none' : 'right')}
          className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 lg:hidden font-extrabold text-[11px] py-4 px-2 rounded-l-2xl shadow-2xl flex flex-col items-center gap-1.5 border-l-2 border-y-2 transition-all transform active:scale-95 cursor-pointer ${
            mobileDrawer === 'right'
              ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-600/60'
              : 'bg-purple-600 hover:bg-purple-700 border-purple-300 text-white shadow-purple-600/60 animate-pulse'
          }`}
          title="Slide Open Section 3 (Clinical Templates & Drug Catalog)"
        >
          <ChevronLeft className={`h-5 w-5 transition-transform ${mobileDrawer === 'right' ? 'rotate-180' : ''}`} />
          <span className="[writing-mode:vertical-lr] tracking-widest uppercase font-mono text-[10px] font-extrabold">
            {mobileDrawer === 'right' ? '✕ Close' : 'Drugs ▶'}
          </span>
        </button>

        {/* SECTION 1 (LEFT COLUMN - 3 COLS): PATIENT REGISTRATION & INPUT SUB-PANES */}
        <section className={`fixed lg:static inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] lg:w-auto lg:col-span-3 rounded-r-2xl lg:rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full shadow-2xl lg:shadow-none transition-transform duration-300 ${cardBg} ${mobileDrawer === 'left' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
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
                  onClick={() => setMobileDrawer('none')}
                  className="lg:hidden text-xs bg-slate-800 text-white hover:bg-slate-700 px-2 py-0.5 rounded-lg font-extrabold transition"
                  title="Close Drawer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Quick Sub-Tab Selector */}
            <div className={`grid grid-cols-5 p-1 rounded-xl text-[10px] shrink-0 border ${
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
                onClick={() => setActiveLeftTab('clinical')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'clinical' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Exam & Hx
              </button>
              <button
                type="button"
                onClick={() => setActiveLeftTab('procedures')}
                className={`py-1 rounded-lg font-semibold transition ${
                  activeLeftTab === 'procedures' 
                    ? (theme === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-emerald-500 text-gray-950')
                    : (theme === 'day' ? 'text-slate-600' : 'text-gray-400')
                }`}
              >
                Procedures
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
        <section className={`lg:col-span-6 rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full ${cardBg}`}>
          
          {/* LIVE DRUG SAFETY & INTERACTION ALERT BANNER (VERY TOP OF SECTION 2) */}
          {detectedSafetyWarnings.length > 0 && (
            <div id="top-safety-warning-banner" className="bg-red-950/95 border-2 border-red-500 rounded-2xl p-3 space-y-2 shadow-2xl shrink-0 mb-2">
              <div className="flex items-center justify-between border-b border-red-500/40 pb-1.5 flex-wrap gap-1">
                <div className="flex items-center gap-2 text-red-300 font-extrabold text-xs">
                  <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 animate-bounce" />
                  <span>🚨 DRUG SAFETY & INTERACTION ALERT ({detectedSafetyWarnings.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoDeduplicateAllRx}
                    className="text-[10.5px] bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-gray-950 font-extrabold px-3 py-1 rounded-xl shadow-lg transition flex items-center gap-1.5 transform active:scale-95 border border-amber-300 cursor-pointer"
                    title="Automatically remove redundant duplicate drug line items in 1 tap"
                  >
                    ⚡ 1-Tap Auto-Deduplicate Rx
                  </button>
                  <span className="text-[10px] bg-red-600 text-white font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline-block">
                    Physician Judgment Mode
                  </span>
                </div>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {detectedSafetyWarnings.map((warning) => (
                  <div key={warning.rule.id} className="bg-slate-900/90 p-2.5 rounded-xl border border-red-500/40 text-xs space-y-1 shadow">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-red-400 text-xs flex items-center gap-1.5">
                        ⚠️ {warning.rule.title}
                      </span>
                      <span className="text-[9px] bg-amber-950 text-amber-300 font-mono px-2 py-0.5 rounded font-bold border border-amber-500/40 shrink-0">
                        🏛️ Source: {warning.rule.source}
                      </span>
                    </div>

                    <p className="text-gray-200 leading-snug">
                      <strong className="text-white">Conflict:</strong> <span className="text-red-300 font-bold">{warning.foundDrugA}</span> ↔ <span className="text-red-300 font-bold">{warning.foundDrugB}</span>
                    </p>
                    <p className="text-gray-400 text-[11px] italic">{warning.rule.description}</p>
                    <div className="bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 text-[11px]">
                      <strong>Recommendation:</strong> {warning.rule.recommendation}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-gray-800">
                      {warning.foundDrugB !== 'Patient Safety Alert' && (
                        <button
                          type="button"
                          onClick={() => handleRemoveConflictingDrug(warning.foundDrugB)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          🗑️ Remove Medication
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDismissWarning(warning.rule.id)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] rounded-lg transition cursor-pointer"
                        title="Acknowledge clinical judgment and dismiss warning"
                      >
                        🛡️ Dismiss / Override Warning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MOBILE TOP SECTION SWITCHER BAR (MOBILE ONLY) */}
          <div className="lg:hidden flex items-center justify-between gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-[10px] mb-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileDrawer('left')}
              className={`flex-1 py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 shadow transition ${
                mobileDrawer === 'left' ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="h-3 w-3" /> Section 1 (Inputs)
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawer('none')}
              className={`py-1 px-3 rounded-lg font-extrabold flex items-center justify-center gap-1 transition ${
                mobileDrawer === 'none' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-400'
              }`}
            >
              📄 Pad
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawer('right')}
              className={`flex-1 py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 shadow transition ${
                mobileDrawer === 'right' ? 'bg-purple-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              Section 3 (Drugs) <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* ULTRA-COMPACT SINGLE-LINE CONTROL STRIP */}
          <div className={`px-2.5 py-1 rounded-xl text-[10px] shrink-0 mb-1.5 border flex items-center justify-between gap-2 overflow-x-auto ${
            theme === 'day' ? 'bg-slate-100/90 border-slate-200' : 'bg-gray-950 border-gray-800'
          }`}>
            {/* LEFT SIDE: TITLE + PAPER SIZE + PAD MODE */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className={`flex items-center gap-1 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-emerald-400'}`}>
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">Section 2: Preview</span>
              </div>

              {/* PAPER SIZE TOGGLE */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => handleSetPageSize('A4')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${
                    pageSize === 'A4' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                  title="A4 Standard (210mm x 297mm)"
                >
                  📄 A4
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPageSize('A5')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${
                    pageSize === 'A5' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                  title="A5 Compact (148mm x 210mm)"
                >
                  📃 A5
                </button>
              </div>

              {/* PAD MODE TOGGLE */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPadMode('digital')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                    padMode === 'digital' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Digital
                </button>
                <button
                  type="button"
                  onClick={() => setPadMode('preprinted')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                    padMode === 'preprinted' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Pre-printed
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: MARGIN INPUTS + BANNER HEIGHT + SAVE TEMPLATE */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-medium">Top:</span>
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
                  className={`w-10 px-1 py-0.5 rounded border text-center font-mono font-bold text-blue-600 text-[10px] ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-emerald-400'
                  }`}
                />
                <span className="text-slate-500 font-mono">mm</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-medium">Btm:</span>
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
                  className={`w-10 px-1 py-0.5 rounded border text-center font-mono font-bold text-pink-600 text-[10px] ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-pink-400'
                  }`}
                />
                <span className="text-slate-500 font-mono">mm</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-medium">Ht:</span>
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
                  className={`w-10 px-1 py-0.5 rounded border text-center font-mono font-bold text-purple-600 text-[10px] ${
                    theme === 'day' ? 'bg-white border-slate-300' : 'bg-gray-900 border-gray-700 text-purple-400'
                  }`}
                />
                <span className="text-slate-500 font-mono">px</span>
              </div>

              <button
                type="button"
                onClick={handleSaveCurrentAsTemplate}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-600 text-white text-[10px] font-bold shadow hover:bg-pink-700 transition shrink-0 ml-1"
                title="Save Template"
              >
                <BookmarkPlus className="h-3.5 w-3.5" /> Save Template
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
            className={`flex-1 bg-white text-gray-900 rounded-xl p-4 shadow-2xl space-y-3 font-sans border border-gray-200 overflow-y-auto flex flex-col justify-between w-full mx-auto transition-all duration-300 ${
              pageSize === 'A5'
                ? 'aspect-[148/210] max-w-[440px] text-[10px]'
                : 'aspect-[210/297] max-w-[560px] text-[11px]'
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
              
              {/* EDITABLE NOTICE BANNER */}
              <div className="text-[8px] bg-amber-100/90 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300 font-bold flex items-center justify-between print:hidden shrink-0">
                <span>✏️ Editable Canvas: Click any text directly on pad to edit</span>
                <span className="text-[7.5px] text-amber-800 font-mono">Human Judgment Mode Active</span>
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

              {/* TWO PANES CONTAINER */}
              <div className="grid grid-cols-12 gap-1.5 pt-1 border-t border-gray-200 text-[9px]">
                
                {/* LEFT PANE: LAB TEST REPORTS & ADDITIONAL ADVICE (4 COLUMNS) */}
                <div className="col-span-4 border-r border-gray-200 pr-1.5 space-y-2 text-[8.5px]">
                  {/* LAB TEST REPORTS & RESULTS */}
                  <div>
                    <strong className="text-teal-900 block font-bold border-b border-teal-200 pb-0.5 mb-1 uppercase tracking-tighter">
                      🔬 Lab Tests & Reports:
                    </strong>
                    {selectedTests.length > 0 && (
                      <ul className="list-disc pl-2.5 text-gray-800 space-y-0.5">
                        {selectedTests.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <div className="bg-teal-50/80 p-1 rounded border border-teal-200 mt-1 font-mono text-[8px]">
                      <span className="font-bold text-teal-950 block">Results:</span>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setTestResultsText(e.currentTarget.textContent || '')}
                        className="whitespace-pre-wrap text-gray-800 outline-none hover:bg-teal-100/50 p-0.5 rounded cursor-text"
                      >
                        {testResultsText || 'Click to type test results...'}
                      </p>
                    </div>
                  </div>

                  {/* PROCEDURES (ALL NON-DRUG CARE, MANEUVERS & REHAB - ONLY SHOW IF CHECKED OR TYPED) */}
                  {(selectedProcedures.length > 0 || selectedAdvice.length > 0 || customProcedureText.trim() !== '') && (
                    <div>
                      <strong className="text-indigo-900 block font-bold border-b border-indigo-200 pb-0.5 mb-1 uppercase tracking-tighter">
                        🛠️ Procedures & Non-Drug Care:
                      </strong>
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
                        onBlur={(e) => setCustomProcedureText(e.currentTarget.textContent || '')}
                        className={`text-gray-700 italic mt-0.5 text-[8px] outline-none hover:bg-indigo-100/50 p-0.5 rounded cursor-text ${
                          !customProcedureText ? 'print:hidden' : ''
                        }`}
                      >
                        {customProcedureText || 'Click to edit procedures (e.g. Valsalva maneuver, Sitz bath, Physio)...'}
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT PANE: CLINICAL ASSESSMENT, RX DRUGS & SPECIFIC ADVICE (8 COLUMNS) */}
                <div className="col-span-8 pl-1 space-y-1 text-[9px]">
                  {/* 1. CHIEF COMPLAINT */}
                  <div>
                    <strong className="text-gray-900 font-bold">C/O (Chief Complaints): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setChiefComplaints(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {chiefComplaints || 'Click to edit chief complaints...'}
                    </span>
                  </div>

                  {/* 2. SIGNS & SYMPTOMS */}
                  <div>
                    <strong className="text-gray-900 font-bold">Signs & Symptoms: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setSignsSymptoms(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {signsSymptoms || 'Click to edit signs & symptoms...'}
                    </span>
                  </div>

                  {/* 3. CLINICAL HISTORY */}
                  <div>
                    <strong className="text-gray-900 font-bold">H/O (Clinical History): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setClinicalHistory(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {clinicalHistory || 'Click to edit clinical history...'}
                    </span>
                  </div>

                  {/* 4. FAMILY HISTORY */}
                  <div>
                    <strong className="text-gray-900 font-bold">Family History: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setFamilyHistory(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {familyHistory || 'Click to edit family history...'}
                    </span>
                  </div>

                  {/* 5. DRUG HISTORY */}
                  <div>
                    <strong className="text-gray-900 font-bold">Drug History / Allergies: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setDrugHistory(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {drugHistory || 'Click to edit drug history...'}
                    </span>
                  </div>

                  {/* 6. CLINICAL & EXAMINATION FINDINGS */}
                  <div>
                    <strong className="text-gray-900 font-bold">Clinical & Exam Findings: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setExaminationFindings(e.currentTarget.textContent || '')}
                      className="text-gray-800 outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {examinationFindings || 'Click to edit exam findings...'}
                    </span>
                  </div>

                  {/* 7. PROVISIONAL DIAGNOSIS */}
                  <div className="bg-gray-100/90 p-1 rounded font-bold text-gray-900">
                    <strong>Provisional Diagnosis: </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setProvisionalDiagnosis(e.currentTarget.textContent || '')}
                      className="outline-none hover:bg-yellow-200/70 p-0.5 rounded cursor-text"
                    >
                      {provisionalDiagnosis || 'Click to edit provisional diagnosis...'}
                    </span>
                  </div>

                  {/* 8. DIFFERENTIAL DIAGNOSIS */}
                  <div className="text-gray-700 italic text-[8.5px]">
                    <strong>Differential Diagnosis (D/D): </strong>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setDifferentialDiagnosis(e.currentTarget.textContent || '')}
                      className="outline-none hover:bg-yellow-100/60 p-0.5 rounded cursor-text"
                    >
                      {differentialDiagnosis || 'Click to edit differential diagnosis...'}
                    </span>
                  </div>

                  {/* LIVE DRUG SAFETY & INTERACTION WARNING BANNER (PRINT-HIDDEN) */}
                  {detectedSafetyWarnings.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 space-y-1.5 shadow-md print:hidden my-1">
                      <div className="flex items-center justify-between border-b border-red-200 pb-1">
                        <div className="flex items-center gap-1.5 text-red-900 font-extrabold text-[9.5px]">
                          <ShieldAlert className="h-4 w-4 text-red-600 shrink-0" />
                          <span>🚨 DRUG SAFETY & INTERACTION ALERT ({detectedSafetyWarnings.length})</span>
                        </div>
                        <span className="text-[7.5px] bg-red-600 text-white font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                          Physician Judgment Mode
                        </span>
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
                                {d}
                              </span>
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
                  <div className="bg-amber-50 p-1 rounded border border-amber-200 text-amber-950 mt-1 text-[8.5px]">
                    <strong className="font-bold text-amber-900 block">Specific Clinical Advice:</strong>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setSpecificAdviceText(e.currentTarget.textContent || '')}
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
        <section className={`fixed lg:static inset-y-0 right-0 z-50 w-[88vw] max-w-[360px] lg:w-auto lg:col-span-3 rounded-l-2xl lg:rounded-2xl p-3.5 flex flex-col justify-between overflow-hidden h-full shadow-2xl lg:shadow-none transition-transform duration-300 ${cardBg} ${mobileDrawer === 'right' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="flex flex-col h-full space-y-3 overflow-hidden">
            
            {/* Header */}
            <div className={`flex items-center justify-between pb-2 border-b shrink-0 ${theme === 'day' ? 'border-pink-200' : 'border-gray-800'}`}>
              <div className={`flex items-center gap-1.5 font-bold text-xs ${theme === 'day' ? 'text-blue-700' : 'text-cyan-400'}`}>
                <Clock className="h-4 w-4" />
                Section 3: Clinical Templates & Drugs
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  theme === 'day' ? 'bg-pink-100 text-pink-800 border border-pink-300' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                }`}>
                  Module 3
                </span>
                <button
                  type="button"
                  onClick={() => setMobileDrawer('none')}
                  className="lg:hidden text-xs bg-slate-800 text-white hover:bg-slate-700 px-2 py-0.5 rounded-lg font-extrabold transition"
                  title="Close Drawer"
                >
                  ✕ Close
                </button>
              </div>
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
                onChange={(e) => {
                  const specId = e.target.value;
                  setSelectedSpecialtyId(specId);
                  const specName = specialties.find((s) => s.id === specId)?.name || '';
                  if (specName) {
                    setDrugSearchQuery(specName.toLowerCase().split(' ')[0]);
                  }
                }}
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
              <button
                type="button"
                onClick={() => setIsPharmacopeiaModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition transform active:scale-98 shrink-0"
              >
                <Pill className="h-4 w-4" />
                <span>💊 Open Full Generic Drug Pharmacopeia (Popup Modal)</span>
              </button>

              <div className="flex items-center justify-between shrink-0 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5 text-emerald-600" /> Generic Quick List
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
                    placeholder="Search specialty drugs (e.g. Orthopedics, Psychiatry, Eye)..."
                    className={`w-full rounded-lg pl-7 pr-2 py-0.5 text-[10px] ${inputBg}`}
                  />
                </div>

                <div className="flex items-center gap-1 text-[9px] overflow-x-auto py-0.5">
                  <span className="text-slate-500 font-bold shrink-0">Filter:</span>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('')}
                    className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold hover:bg-blue-200 shrink-0"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('dental')}
                    className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 font-bold hover:bg-amber-200 shrink-0"
                  >
                    Dental
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('hepatology')}
                    className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 shrink-0"
                  >
                    Hepatology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('nephrology')}
                    className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-950 font-bold hover:bg-sky-200 shrink-0"
                  >
                    Nephrology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('gynae')}
                    className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-950 font-bold hover:bg-pink-200 shrink-0"
                  >
                    Gynecology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('ortho')}
                    className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-950 font-bold hover:bg-indigo-200 shrink-0"
                  >
                    Orthopedics
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('psych')}
                    className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-950 font-bold hover:bg-violet-200 shrink-0"
                  >
                    Psychiatry
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('cardio')}
                    className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-950 font-bold hover:bg-rose-200 shrink-0"
                  >
                    Cardiology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('gastro')}
                    className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 font-bold hover:bg-amber-200 shrink-0"
                  >
                    Gastroenterology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('eye')}
                    className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-950 font-bold hover:bg-cyan-200 shrink-0"
                  >
                    Eye Drops
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('ent')}
                    className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-950 font-bold hover:bg-teal-200 shrink-0"
                  >
                    ENT / Nasal
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('derma')}
                    className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-950 font-bold hover:bg-orange-200 shrink-0"
                  >
                    Dermatology
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('cough')}
                    className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 shrink-0"
                  >
                    Cough Syrups
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('alkaliser')}
                    className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-900 font-bold hover:bg-pink-200 shrink-0"
                  >
                    Alkalisers
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('Injection')}
                    className="px-1.5 py-0.5 rounded bg-red-100 text-red-900 font-bold hover:bg-red-200 shrink-0"
                  >
                    ER / Injectables
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrugSearchQuery('Anesthetic')}
                    className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 font-bold hover:bg-purple-200 shrink-0"
                  >
                    Anesthetics
                  </button>
                </div>
              </div>

              {/* CHECKLIST OF GENERIC MEDICATIONS WITH CONTRAINDICATION SAFETY GAURDS */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {searchClinicalDrugs(drugSearchQuery, drugCatalog).map((d) => {
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

      {/* DOCTOR PROFILE CREDENTIALS MODAL POPUP */}
      {isDoctorProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 overflow-hidden">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-base">
                  👨‍⚕️
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Physician Profile & Credentials
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Displayed at bottom right of every prescription pad & print output
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDoctorProfileModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDoctorProfile} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-800">1. Full Name & Title</label>
                <input
                  type="text"
                  required
                  value={doctorProfile.name}
                  onChange={(e) => setDoctorProfile({ ...doctorProfile, name: e.target.value })}
                  placeholder="e.g. Dr. Alexander Fleming, MD"
                  className="w-full rounded-xl px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full rounded-xl px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full rounded-xl px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  className="w-full rounded-xl px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <label className="block font-bold text-emerald-950">5. Digital Pad Header Banner / Logo (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow transition flex items-center gap-1">
                    <span>🖼️ Upload Logo File</span>
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
                  <div className="mt-1 border rounded-lg p-2 bg-white flex items-center justify-center">
                    <img src={headerImg} alt="Header Preview" className="h-10 object-contain" />
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">No image uploaded. Digital pad displays default clinic text header.</p>
                )}
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-2">
                <label className="block font-bold text-purple-950">6. Digital Pad Footer Banner (Optional)</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow transition flex items-center gap-1">
                    <span>🖼️ Upload Custom Footer</span>
                    <input type="file" accept="image/*" onChange={handleFooterImageUpload} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={handleApplyOdiaShantiMantraFooter}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center gap-1"
                  >
                    <span>🕉️ Apply Odia Mantra Banner</span>
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
                  <div className="mt-1 border rounded-lg p-2 bg-white flex items-center justify-center">
                    <img src={footerImg} alt="Footer Preview" className="h-8 object-contain" />
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">No footer banner set. Displays default 1cm signature spacing.</p>
                )}
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
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
                  Save Physician Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL PHARMACOPEIA GENERIC DRUG SELECTOR MODAL POPUP */}
      {isPharmacopeiaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* MODAL HEADER */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-bold">
                  💊
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    Universal USFDA & IP Generic Drug Pharmacopeia
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    100% Pure Generic Preparations • Tick or click to append to Live Prescription Pad ({drugCatalog.length} loaded)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPharmacopeiaModalOpen(false)}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 hover:text-slate-900 font-bold text-xs transition"
              >
                ✕ Close
              </button>
            </div>

            {/* MODAL SEARCH & SPECIALTY FILTER STRIP */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-slate-100/50 dark:bg-slate-900/50">
              <div className="relative">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={drugSearchQuery}
                  onChange={(e) => setDrugSearchQuery(e.target.value)}
                  placeholder="Type generic drug name, symptom or condition (e.g. Cefixime, Azithromycin, Toothache, Fits, Asthma)..."
                  className="w-full rounded-xl pl-9 pr-4 py-2.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-bold shrink-0 text-[11px]">Filter Specialty:</span>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('')}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition ${!drugSearchQuery ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'}`}
                >
                  All Generics
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('dental')}
                  className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold hover:bg-amber-200 shrink-0"
                >
                  🦷 Dental
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('hepatology')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 shrink-0"
                >
                  🫀 Hepatology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('nephrology')}
                  className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-950 font-bold hover:bg-sky-200 shrink-0"
                >
                  🫘 Nephrology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('gynae')}
                  className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-950 font-bold hover:bg-pink-200 shrink-0"
                >
                  🤰 Gynecology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('ortho')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-950 font-bold hover:bg-indigo-200 shrink-0"
                >
                  🦴 Orthopedics
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('psych')}
                  className="px-2.5 py-1 rounded-lg bg-violet-100 text-violet-950 font-bold hover:bg-violet-200 shrink-0"
                >
                  🧠 Psychiatry
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('cardio')}
                  className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-950 font-bold hover:bg-rose-200 shrink-0"
                >
                  ❤️ Cardiology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('gastro')}
                  className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold hover:bg-amber-200 shrink-0"
                >
                  🫁 Gastroenterology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('eye')}
                  className="px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-950 font-bold hover:bg-cyan-200 shrink-0"
                >
                  👁️ Ophthalmology
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('ent')}
                  className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-950 font-bold hover:bg-teal-200 shrink-0"
                >
                  👂 ENT Care
                </button>
                <button
                  type="button"
                  onClick={() => setDrugSearchQuery('derma')}
                  className="px-2.5 py-1 rounded-lg bg-fuchsia-100 text-fuchsia-950 font-bold hover:bg-fuchsia-200 shrink-0"
                >
                  🧴 Dermatology
                </button>
              </div>
            </div>

            {/* MODAL DRUGS CARDS GRID BODY */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-950">
              {searchClinicalDrugs(drugSearchQuery, drugCatalog).map((drug) => {
                const doseLabel = `${drug.genericName} - ${drug.dosage} for ${drug.duration}`;
                const isChecked = selectedDrugs.includes(doseLabel);
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
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                          isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {isChecked ? '✓ Added' : '+ Add'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        Dose: <strong className="text-slate-800 dark:text-slate-200">{drug.dosage}</strong>
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
              })}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">
                {selectedDrugs.length} medications selected on prescription pad
              </span>
              <button
                onClick={() => setIsPharmacopeiaModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                Done / Back to Prescription Pad
              </button>
            </div>
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
  </div>
);
}
