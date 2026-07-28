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
  genericName: string;
  brandName?: string;
  category: 'adult' | 'pediatric' | 'infant' | 'all';
  dosage: string;
  duration: string;
  minAge?: number; // in years
  maxAge?: number;
  minWeight?: number; // in kg
  maxWeight?: number;
}

export const COMPREHENSIVE_GENERIC_DRUGS: DrugItem[] = [
  // Analgesics & Antipyretics
  { id: 'g1', genericName: 'Paracetamol (Acetaminophen)', category: 'adult', dosage: '650mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g2', genericName: 'Paracetamol (Syrup 250mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s after food)', duration: '3 days', minAge: 2, maxAge: 12, minWeight: 12, maxWeight: 40 },
  { id: 'g3', genericName: 'Paracetamol (Pediatric Drops 100mg/ml)', category: 'infant', dosage: '1ml (10-15mg/kg t.d.s)', duration: '3 days', maxAge: 2, maxWeight: 12 },
  { id: 'g4', genericName: 'Ibuprofen', category: 'adult', dosage: '400mg (1-0-1 after food)', duration: '3 days', minAge: 12 },
  { id: 'g5', genericName: 'Ibuprofen (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'g6', genericName: 'Mefenamic Acid', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '3 days', minAge: 12 },
  { id: 'g7', genericName: 'Tramadol + Paracetamol', category: 'adult', dosage: '37.5mg/325mg (1-0-1 S.O.S)', duration: '3 days', minAge: 18 },

  // Antibiotics & Antimicrobials
  { id: 'g8', genericName: 'Amoxicillin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g9', genericName: 'Amoxicillin (Dry Syrup 125mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g10', genericName: 'Amoxicillin + Clavulanic Acid (Augmentin)', category: 'adult', dosage: '625mg (1-0-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g11', genericName: 'Amoxicillin + Clavulanate (Dry Syrup 228mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g12', genericName: 'Azithromycin', category: 'adult', dosage: '500mg (1-0-0 1 hr before food)', duration: '3 days', minAge: 12 },
  { id: 'g13', genericName: 'Azithromycin (Suspension 200mg/5ml)', category: 'pediatric', dosage: '5ml (1-0-0 once daily)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g14', genericName: 'Ciprofloxacin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 18 },
  { id: 'g15', genericName: 'Levofloxacin', category: 'adult', dosage: '500mg (1-0-0 once daily)', duration: '5 days', minAge: 18 },
  { id: 'g16', genericName: 'Cefixime', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g17', genericName: 'Cefixime (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g18', genericName: 'Metronidazole', category: 'adult', dosage: '400mg (1-1-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g19', genericName: 'Metronidazole (Syrup 200mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s)', duration: '5 days', minAge: 1, maxAge: 12 },

  // Antacids & Antiemetics (GI System)
  { id: 'g20', genericName: 'Pantoprazole', category: 'adult', dosage: '40mg (1-0-0 30 mins before breakfast)', duration: '7 days', minAge: 12 },
  { id: 'g21', genericName: 'Omeprazole', category: 'adult', dosage: '20mg (1-0-0 before food)', duration: '7 days', minAge: 12 },
  { id: 'g22', genericName: 'Rabeprazole + Domperidone', category: 'adult', dosage: '20mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18 },
  { id: 'g23', genericName: 'Ondansetron', category: 'adult', dosage: '4mg (1-0-1 before food)', duration: '3 days', minAge: 12 },
  { id: 'g24', genericName: 'Ondansetron (Syrup 2mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (S.O.S)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g25', genericName: 'Ondansetron (Drops 2mg/ml)', category: 'infant', dosage: '1ml (S.O.S)', duration: '2 days', maxAge: 2 },
  { id: 'g26', genericName: 'Dicyclomine + Paracetamol', category: 'adult', dosage: '20mg/500mg (1-0-1 S.O.S for spasms)', duration: '3 days', minAge: 12 },

  // Antihistamines & Respiratory
  { id: 'g27', genericName: 'Cetirizine', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '5 days', minAge: 12 },
  { id: 'g28', genericName: 'Cetirizine (Syrup 5mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (at night)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g29', genericName: 'Levocetirizine', category: 'adult', dosage: '5mg (0-0-1 at night)', duration: '5 days', minAge: 12 },
  { id: 'g30', genericName: 'Levocetirizine + Montelukast', category: 'adult', dosage: '5mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15 },
  { id: 'g31', genericName: 'Montelukast (Syrup 4mg)', category: 'pediatric', dosage: '4mg (0-0-1 at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'g32', genericName: 'Salbutamol (Asthalin Inhaler)', category: 'all', dosage: '2 puffs S.O.S for bronchospasm', duration: 'As needed' },
  { id: 'g33', genericName: 'Budesonide (Inhaler 200mcg)', category: 'all', dosage: '2 puffs (b.d. with mouth rinse)', duration: '30 days' },

  // Diabetology & Cardiovascular
  { id: 'g34', genericName: 'Metformin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g35', genericName: 'Glimepiride', category: 'adult', dosage: '1mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18 },
  { id: 'g36', genericName: 'Telmisartan', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g37', genericName: 'Amlodipine', category: 'adult', dosage: '5mg (0-0-1 night)', duration: '30 days', minAge: 18 },
  { id: 'g38', genericName: 'Atorvastatin', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '30 days', minAge: 18 },

  // Vitamins, Minerals & Supplements
  { id: 'g39', genericName: 'Iron + Folic Acid (Tab Ferrous Ascorbate)', category: 'adult', dosage: '100mg/1.5mg (1-0-0 after food)', duration: '30 days', minAge: 12 },
  { id: 'g40', genericName: 'Iron (Syrup Ascorbate)', category: 'pediatric', dosage: '5ml (once daily)', duration: '30 days', minAge: 1, maxAge: 12 },
  { id: 'g41', genericName: 'Calcium Carbonate + Vitamin D3', category: 'adult', dosage: '500mg/250IU (0-1-0 after lunch)', duration: '30 days', minAge: 12 },
  { id: 'g42', genericName: 'Methylcobalamin (Vitamin B12)', category: 'adult', dosage: '1500mcg (1-0-0 once daily)', duration: '30 days', minAge: 12 },
  { id: 'g43', genericName: 'Multivitamin & Zinc Syrup', category: 'pediatric', dosage: '5ml (once daily)', duration: '15 days', minAge: 1, maxAge: 12 },
];

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
        drugs: ['Paracetamol (Acetaminophen) (650mg (1-0-1 after food))', 'Cetirizine (10mg (0-0-1 at night))', 'Pantoprazole (40mg (1-0-0 30 mins before breakfast))'],
        notes: 'Advised 3 days rest.',
      },
    ],
  },
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
        const parsed = JSON.parse(saved);
        return Array.from(new Set([...COMPREHENSIVE_GENERIC_DRUGS, ...parsed]));
      } catch (e) {}
    }
  }
  return COMPREHENSIVE_GENERIC_DRUGS;
}

export function saveDrugCatalog(data: DrugItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRUGS_STORAGE_KEY, JSON.stringify(data));
  }
}
