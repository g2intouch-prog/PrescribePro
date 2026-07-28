export interface AdminPresets {
  padType: 'digital' | 'preprinted';
  headerImage: string;
  footerImage: string;
  diagnosticTests: string[];
  additionalAdviceList: string[];
}

const DEFAULT_PRESETS: AdminPresets = {
  padType: 'digital',
  headerImage: '',
  footerImage: '',
  diagnosticTests: [
    'CBC (Complete Blood Count)',
    'LFT (Liver Function Test)',
    'KFT (Kidney Function Test)',
    'Lipid Profile',
    'HbA1c (Glycated Hemoglobin)',
    'Chest X-Ray (PA View)',
    'ECG (12-Lead)',
    'Urine Routine & Microscopy',
    'TSH (Thyroid Profile)',
    'USG Abdomen & Pelvis',
  ],
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
