export interface PrescriptionTemplate {
  id: string;
  name: string;
  tests: string[];
  advice: string[];
  drugs: string[];
  notes: string;
}

export interface Specialty {
  id: string;
  name: string;
  templates: PrescriptionTemplate[];
}

export interface DrugItem {
  id: string;
  name: string;
  dosage: string;
  duration: string;
}

const DEFAULT_SPECIALTIES: Specialty[] = [
  {
    id: 'gen-med',
    name: 'General Medicine',
    templates: [
      {
        id: 'fever-cold',
        name: 'Acute Fever & Cold Protocol',
        tests: ['CBC (Complete Blood Count)', 'ESR (Erythrocyte Sedimentation Rate)'],
        advice: ['Cold Sponging for High Fever', 'Warm Salt Water Gargle 3x daily', 'Increase Fluid & Water Intake (3L/day)'],
        drugs: ['Paracetamol 650mg (1-0-1 after food)', 'Cetirizine 10mg (0-0-1 at night)', 'Pantoprazole 40mg (1-0-0 before food)'],
        notes: 'Advised 3 days rest.',
      },
      {
        id: 'hypertension-std',
        name: 'Hypertension Starter Pack',
        tests: ['ECG (12-Lead)', 'KFT (Kidney Function Test)', 'Lipid Profile (Full Panel)'],
        advice: ['Low Salt / Low Sodium Diet', 'Regular Morning Walk 30 mins'],
        drugs: ['Telmisartan 40mg (1-0-0 morning)', 'Amlodipine 5mg (0-0-1 night)'],
        notes: 'Monitor BP daily.',
      },
    ],
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    templates: [
      {
        id: 'peds-fever',
        name: 'Pediatric Viral Fever',
        tests: ['CBC (Complete Blood Count)'],
        advice: ['Tepid Sponging', 'Abundant Fluids'],
        drugs: ['Syrup Paracetamol 125mg/5ml (5ml t.d.s)', 'Syrup Ondansetron (2.5ml b.d.)'],
        notes: 'Review if fever persists > 48 hrs.',
      },
    ],
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    templates: [
      {
        id: 'fungal-rash',
        name: 'Superficial Fungal Infection',
        tests: [],
        advice: ['Keep area dry', 'Wear loose cotton clothes'],
        drugs: ['Itraconazole 100mg (1-0-1)', 'Luliconazole 1% Cream (Apply b.d.)'],
        notes: 'Continue cream for 2 weeks.',
      },
    ],
  },
];

const DEFAULT_DRUGS: DrugItem[] = [
  { id: 'd1', name: 'Paracetamol 650mg', dosage: '1-0-1', duration: '5 days' },
  { id: 'd2', name: 'Amoxicillin 500mg', dosage: '1-0-1', duration: '5 days' },
  { id: 'd3', name: 'Pantoprazole 40mg', dosage: '1-0-0 (B/F)', duration: '7 days' },
  { id: 'd4', name: 'Cetirizine 10mg', dosage: '0-0-1 (Night)', duration: '5 days' },
  { id: 'd5', name: 'Azithromycin 500mg', dosage: '1-0-0', duration: '3 days' },
  { id: 'd6', name: 'Metformin 500mg', dosage: '1-0-1 (A/F)', duration: '30 days' },
  { id: 'd7', name: 'Telmisartan 40mg', dosage: '1-0-0 (Morning)', duration: '30 days' },
  { id: 'd8', name: 'Multivitamin & Zinc Tab', dosage: '0-1-0 (Afternoon)', duration: '15 days' },
];

const SPECIALTIES_STORAGE_KEY = 'prescribepro_specialties_v1';
const DRUGS_STORAGE_KEY = 'prescribepro_drugs_v1';

export function getSpecialties(): Specialty[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SPECIALTIES_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  return DEFAULT_SPECIALTIES;
}

export function saveSpecialties(data: Specialty[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SPECIALTIES_STORAGE_KEY, JSON.stringify(data));
  }
}

export function getDrugCatalog(): DrugItem[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(DRUGS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  return DEFAULT_DRUGS;
}

export function saveDrugCatalog(data: DrugItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRUGS_STORAGE_KEY, JSON.stringify(data));
  }
}
