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
  // Tropical, Febrile & Infectious Diseases
  'Malaria Peripheral Blood Smear (PBS / MP Slide)',
  'Malaria Rapid Diagnostic Test / ICT (Pf / Pv Ag)',
  'Scrub Typhus IgM Antibody (Rapid Card / ELISA)',
  'Scrub Typhus PCR',
  'Leptospira IgM Antibody (Rapid ICT / ELISA)',
  'Dengue NS1 Antigen Test',
  'Dengue Serology (IgM & IgG Antibodies)',
  'Chikungunya IgM Antibody Test',
  'Widal Test (Typhoid Slide & Tube Agglutination)',
  'Typhidot IgM / IgG Antibody',
  'Blood Culture & Sensitivity (Aerobic & Anaerobic)',
  'Procalcitonin (PCT) Level',
  'Sputum for AFB (Tuberculosis Smear)',
  'GeneXpert / CBNAAT for TB & Rifampicin Resistance',
  'Mantoux Test (Tuberculin Skin Test)',
  'COVID-19 RT-PCR / Rapid Antigen',
  'HIV 1 & 2 Antibody Screen (4th Gen ELISA)',
  'HBsAg (Hepatitis B Surface Antigen)',
  'Anti-HCV (Hepatitis C Antibody)',
  'VDRL / RPR (Syphilis Screen)',

  // Hematology & Coagulation
  'CBC (Complete Blood Count with Differential)',
  'ESR (Erythrocyte Sedimentation Rate)',
  'Hemoglobin (Hb)',
  'Peripheral Blood Smear (PBS)',
  'Platelet Count & MPV',
  'Blood Grouping & Rh Typing',
  'Reticulocyte Count',
  'PT / INR (Prothrombin Time)',
  'APTT (Activated Partial Thromboplastin Time)',
  'Fibrinogen Level',
  'Absolute Eosinophil Count (AEC)',
  'D-Dimer Test',
  'Sickling Test / Hb Electrophoresis',
  'Serum Ferritin & Iron Studies',
  'Bone Marrow Aspiration & Biopsy',

  // Diabetology & Metabolic Panel
  'Fasting Blood Sugar (FBS)',
  'Post Prandial Blood Sugar (PPBS)',
  'Random Blood Sugar (RBS)',
  'HbA1c (Glycated Hemoglobin)',
  'Fasting Serum Insulin',
  'HOMA-IR (Insulin Resistance Index)',
  'Oral Glucose Tolerance Test (OGTT)',
  'Serum C-Peptide (Fasting)',
  'Urine Microalbumin / Creatinine Ratio',

  // Lipid & Cardiovascular Panel
  'Lipid Profile (Full Panel)',
  'Total Serum Cholesterol',
  'Serum Triglycerides',
  'HDL & LDL Cholesterol',
  'VLDL Cholesterol',
  'ApoB / ApoA1 Ratio',
  'Lp(a) - Lipoprotein(a)',
  'ECG (12-Lead Standard)',
  'Echocardiogram (2D Echo with Doppler)',
  'Treadmill Test (TMT / Exercise Stress Test)',
  'Troponin-I / Troponin-T (High-Sensitivity)',
  'CK-MB (Creatine Kinase MB)',
  'hs-CRP (High-Sensitivity C-Reactive Protein)',
  'NT-proBNP Level',
  'Serum Homocysteine',

  // Liver & Gastrointestinal Panel
  'LFT (Liver Function Test Full Panel)',
  'Serum Bilirubin (Total, Direct & Indirect)',
  'SGOT / AST',
  'SGPT / ALT',
  'Serum Alkaline Phosphatase (ALP)',
  'Serum Albumin & Globulin (A/G Ratio)',
  'GGT (Gamma-Glutamyl Transferase)',
  'Serum Total Protein',
  'Serum Amylase & Lipase',
  'Prothrombin Time (PT/INR for Liver)',

  // Kidney, Renal & Electrolytes Panel
  'KFT (Kidney Function Test Full Panel)',
  'Serum Creatinine',
  'Blood Urea Nitrogen (BUN)',
  'Serum Uric Acid',
  'Serum Sodium (Na+)',
  'Serum Potassium (K+)',
  'Serum Chloride (Cl-)',
  'Serum Bicarbonate (HCO3-)',
  'Serum Calcium (Total & Ionized)',
  'Serum Inorganic Phosphorus',
  'Serum Magnesium',
  'eGFR (Estimated Glomerular Filtration Rate)',

  // Endocrinology & Hormones
  'TSH (Thyroid Stimulating Hormone)',
  'Thyroid Profile (Total T3, T4, TSH)',
  'Free T3 & Free T4',
  'Anti-TPO Antibody Test',
  'Serum Cortisol (8 AM)',
  'Serum Prolactin',
  'FSH & LH (Follicle-Stimulating & Luteinizing)',
  'Serum Testosterone (Total & Free)',
  'Serum Estradiol (E2)',
  'Serum Progesterone',
  'Serum AMH (Anti-Müllerian Hormone)',
  'Serum Parathyroid Hormone (PTH)',

  // Rheumatology, Autoimmune & Inflammatory Panel
  'CRP (C-Reactive Protein)',
  'RA Factor (Rheumatoid Factor Quantitative)',
  'Anti-CCP Antibody (Anti-Cyclic Citrullinated)',
  'ANA (Antinuclear Antibodies by IFA Screen)',
  'ANA Profile (Euroline / Immunoblot 16 Antigens)',
  'Anti-dsDNA Antibody',
  'ASO Titre (Anti-Streptolysin O)',
  'HLA-B27 (PCR / Flow Cytometry)',
  'Serum IgE (Total)',

  // Urine, Stool & Microbiology Panel
  'Urine Routine & Microscopy',
  'Urine Culture & Sensitivity',
  'Urine Pregnancy Test (UPT)',
  '24-Hour Urine Protein & Creatinine',
  'Stool Routine & Microscopy',
  'Stool Occult Blood (FOBT)',
  'Stool Culture & Sensitivity',
  'Stool H. Pylori Antigen',
  'Blood Culture (2 Sets Aerobic & Anaerobic)',
  'Pus Culture & Sensitivity',
  'Swab Culture & Sensitivity (Throat/Wound)',

  // Oncology & Tumor Markers
  'PSA (Prostate-Specific Antigen Total & Free)',
  'CEA (Carcinoembryonic Antigen)',
  'AFP (Alpha-Fetoprotein)',
  'CA-125 (Ovarian Cancer Marker)',
  'CA 19-9 (Pancreatic / GI Marker)',
  'CA 15-3 (Breast Cancer Marker)',

  // Radiology & Advanced Imaging Panel
  'Chest X-Ray (PA View)',
  'Chest X-Ray (Lateral View)',
  'X-Ray KUB',
  'X-Ray Spine (Cervical / Lumbar AP & Lat)',
  'USG Abdomen & Pelvis',
  'USG KUB & Prostate',
  'USG Whole Abdomen',
  'USG Neck & Thyroid',
  'USG Scrotum & Doppler',
  'Venous / Arterial Doppler (Lower Limb)',
  'Mammography (Bilateral)',
  'CT Scan Brain (Plain / Contrast)',
  'CT HRCT Chest (High Resolution)',
  'CT Scan Abdomen & Pelvis (Contrast)',
  'MRI Brain (Plain & Contrast)',
  'MRI Lumbar Spine (Plain)',
  'MRI Knee Joint',
  'DEXA Scan (Bone Mineral Density)',
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
