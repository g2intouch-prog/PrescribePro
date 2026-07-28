export interface AdminPresets {
  padType: 'digital' | 'preprinted';
  headerImage: string;
  footerImage: string;
  headerMarginMm?: number;
  footerMarginMm?: number;
  diagnosticTests: string[];
  additionalAdviceList: string[];
}

export const COMPREHENSIVE_LAB_TESTS: string[] = [
  // Hematology
  'CBC (Complete Blood Count)',
  'ESR (Erythrocyte Sedimentation Rate)',
  'Hemoglobin (Hb)',
  'Peripheral Blood Smear (PBS)',
  'Blood Grouping & Rh Typing',
  'Reticulocyte Count',
  'PT / INR (Prothrombin Time)',
  'APTT (Activated Partial Thromboplastin Time)',
  'Absolute Eosinophil Count (AEC)',
  'D-Dimer Test',
  'Sickling Test / Hb Electrophoresis',

  // Diabetology & Glucose
  'Fasting Blood Sugar (FBS)',
  'Post Prandial Blood Sugar (PPBS)',
  'Random Blood Sugar (RBS)',
  'HbA1c (Glycated Hemoglobin)',
  'Fasting Serum Insulin',
  'Oral Glucose Tolerance Test (OGTT)',

  // Lipid Profile
  'Lipid Profile (Full Panel)',
  'Total Cholesterol',
  'Serum Triglycerides',
  'HDL Cholesterol',
  'LDL Cholesterol',
  'VLDL Cholesterol',
  'ApoB / ApoA1 Ratio',

  // Liver Function Tests (LFT)
  'LFT (Liver Function Test)',
  'Serum Bilirubin (Total & Direct)',
  'SGOT / AST',
  'SGPT / ALT',
  'Serum Alkaline Phosphatase (ALP)',
  'Serum Albumin & Globulin Ratio',
  'GGT (Gamma-Glutamyl Transferase)',
  'Serum Total Protein',

  // Kidney & Renal Function (KFT)
  'KFT (Kidney Function Test)',
  'Serum Creatinine',
  'Blood Urea Nitrogen (BUN)',
  'Serum Uric Acid',
  'Serum Electrolytes (Na+, K+, Cl-)',
  'Serum Calcium & Phosphorus',
  'eGFR (Estimated GFR)',

  // Thyroid Profile
  'TSH (Thyroid Stimulating Hormone)',
  'Thyroid Profile (Total T3, T4, TSH)',
  'Free T3 & Free T4',
  'Anti-TPO Antibody Test',

  // Cardiac Markers
  'ECG (12-Lead)',
  'Echocardiogram (2D Echo)',
  'Troponin-I / Troponin-T',
  'CK-MB (Creatine Kinase)',
  'hs-CRP (High-Sensitivity CRP)',
  'NT-proBNP',
  'Serum Homocysteine',

  // Vitamins & Minerals
  'Vitamin D3 (25-OH Vitamin D)',
  'Vitamin B12 (Cyanocobalamin)',
  'Serum Iron Profile (Iron, TIBC, Ferritin)',
  'Serum Zinc & Magnesium',

  // Urine & Stool Analysis
  'Urine Routine & Microscopy',
  'Urine Culture & Sensitivity',
  'Urine Microalbumin / Creatinine Ratio',
  '24-Hour Urine Protein',
  'Stool Routine & Microscopy',
  'Stool Occult Blood Test',

  // Infectious Disease & Serology
  'Dengue NS1 Antigen & IgM/IgG',
  'Typhoid (Widal Test / Typhidot)',
  'Malaria Antigen (Pv / Pf)',
  'HIV 1 & 2 Antibody Screen',
  'HBsAg (Hepatitis B Surface Antigen)',
  'Anti-HCV (Hepatitis C)',
  'VDRL / RPR (Syphilis Screen)',
  'RA Factor (Rheumatoid Factor)',
  'Anti-CCP Antibody',
  'ANA (Antinuclear Antibodies by IFA)',
  'CRP (C-Reactive Protein)',

  // Imaging & Radiology
  'Chest X-Ray (PA View)',
  'USG Abdomen & Pelvis',
  'USG KUB & Prostate',
  'USG Whole Abdomen',
  'Mammography (Bilateral)',
  'CT Scan Brain (Plain / Contrast)',
  'CT Scan Abdomen & Pelvis',
  'MRI Brain (Plain / Contrast)',
  'MRI Lumbar Spine',
];

const DEFAULT_PRESETS: AdminPresets = {
  padType: 'digital',
  headerImage: '',
  footerImage: '',
  headerMarginMm: 35,
  footerMarginMm: 20,
  diagnosticTests: COMPREHENSIVE_LAB_TESTS,
  additionalAdviceList: [
    'Cold Sponging for High Fever',
    'Warm Sitz Bath twice daily for 15 mins',
    'Warm Salt Water Gargle 3x daily',
    'Low Salt / Low Sodium Diet',
    'Strict Bed Rest for 3 days',
    'Increase Fluid & Water Intake (3L/day)',
    'Avoid Cold & Oily Foods',
  ],
};

const STORAGE_KEY = 'prescribepro_admin_presets_v1';

export function getAdminPresets(): AdminPresets {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PRESETS,
          ...parsed,
          diagnosticTests: Array.from(
            new Set([...(parsed.diagnosticTests || []), ...COMPREHENSIVE_LAB_TESTS])
          ),
        };
      } catch (e) {}
    }
  }
  return DEFAULT_PRESETS;
}

export function saveAdminPresets(presets: AdminPresets): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }
}
