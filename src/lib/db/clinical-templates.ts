export interface PrescriptionTemplate {
  id: string;
  name: string;
  complaints?: string[];
  diagnosis?: string;
  tests: string[];
  advice: string[];
  drugs: string[];
  notes?: string;
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
  keywords?: string; // Search aliases (e.g. cough, alkaliser, acidity, pain, fever)
  minAge?: number;
  maxAge?: number;
  minWeight?: number;
  maxWeight?: number;
}

export const CLINICAL_SYMPTOM_MAP: Record<string, string[]> = {
  cough: ['cough', 'dextromethorphan', 'ambroxol', 'terbutaline', 'guaifenesin', 'levosalbutamol', 'codeine', 'astalin', 'linctus'],
  alkaliser: ['alkaliser', 'alkalizer', 'disodium hydrogen citrate', 'potassium citrate', 'citric acid', 'flavoxate', 'citrate', 'dysuria'],
  alkalizer: ['alkaliser', 'alkalizer', 'disodium hydrogen citrate', 'potassium citrate', 'citric acid', 'flavoxate', 'citrate', 'dysuria'],
  dysuria: ['alkaliser', 'disodium hydrogen citrate', 'flavoxate', 'tamsulosin', 'norfloxacin'],
  burning: ['alkaliser', 'disodium hydrogen citrate', 'pantoprazole', 'sucralfate'],
  fever: ['paracetamol', 'acetaminophen', 'mefenamic', 'ibuprofen', 'cold sponging'],
  pyrexia: ['paracetamol', 'acetaminophen', 'mefenamic', 'ibuprofen'],
  pain: ['paracetamol', 'aceclofenac', 'diclofenac', 'ibuprofen', 'mefenamic', 'tramadol', 'etoricoxib', 'pregabalin', 'thiocolchicoside'],
  headache: ['paracetamol', 'naproxen', 'domperidone', 'diclofenac', 'etoricoxib'],
  acidity: ['pantoprazole', 'omeprazole', 'rabeprazole', 'esomeprazole', 'famotidine', 'sucralfate', 'antacid'],
  gas: ['pantoprazole', 'domperidone', 'rabeprazole', 'simethicone', 'bacillus'],
  reflux: ['pantoprazole', 'domperidone', 'rabeprazole', 'esomeprazole', 'sucralfate'],
  vomiting: ['ondansetron', 'domperidone', 'metoclopramide', 'emesis'],
  nausea: ['ondansetron', 'domperidone', 'metoclopramide'],
  diarrhea: ['ors', 'bacillus clausii', 'saccharomyces', 'ofloxacin + ornidazole', 'racecadotril', 'loperamide'],
  'loose motion': ['ors', 'bacillus clausii', 'saccharomyces', 'ofloxacin + ornidazole', 'racecadotril'],
  constipation: ['lactulose', 'peg 3350', 'liquid paraffin', 'isabgol'],
  asthma: ['salbutamol', 'budesonide', 'duolin', 'foracort', 'seretide', 'montelukast', 'acebrophylline', 'doxofylline'],
  wheezing: ['salbutamol', 'budesonide', 'duolin', 'foracort', 'seretide', 'montelukast'],
  breathlessness: ['salbutamol', 'budesonide', 'duolin', 'oxygen', 'deriphylline'],
  allergy: ['cetirizine', 'levocetirizine', 'montelukast', 'fexofenadine', 'bilastine', 'hydroxyzine'],
  itching: ['cetirizine', 'levocetirizine', 'calamine', 'hydrocortisone', 'permethrin', 'clotrimazole'],
  rash: ['calamine', 'hydrocortisone', 'clobetasol', 'momethasone', 'cetirizine'],
  fungal: ['fluconazole', 'itraconazole', 'terbinafine', 'clotrimazole', 'luliconazole', 'ketoconazole'],
  ringworm: ['clotrimazole', 'luliconazole', 'terbinafine', 'itraconazole'],
  dandruff: ['ketoconazole shampoo'],
  bp: ['telmisartan', 'amlodipine', 'cilnidipine', 'enalapril', 'ramipril', 'atenolol', 'metoprolol', 'lasix', 'furosemide'],
  hypertension: ['telmisartan', 'amlodipine', 'cilnidipine', 'enalapril', 'ramipril', 'atenolol', 'metoprolol'],
  diabetes: ['metformin', 'glimepiride', 'teneligliptin', 'sitagliptin', 'vildagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose'],
  sugar: ['metformin', 'glimepiride', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'voglibose'],
  thyroid: ['thyroxine', 'levothyroxine', 'carbimazole', 'methimazole'],
  sleep: ['alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'zolpidem'],
  insomnia: ['zolpidem', 'alprazolam', 'clonazepam'],
  anxiety: ['alprazolam', 'clonazepam', 'diazepam', 'propranolol', 'escitalopram'],
  infection: ['amoxicillin', 'augmentin', 'azithromycin', 'cefixime', 'ceftriaxone', 'ciprofloxacin', 'levofloxacin', 'metronidazole'],
  eye: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  eyedrop: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  'eye drop': ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  ophthalmic: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  opthalmic: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  ophthalmology: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],
  opthalmology: ['eye drops', 'eyedrop', 'opthalmic', 'ophthalmic', 'moxifloxacin', 'tobramycin', 'ofloxacin', 'carboxymethylcellulose', 'olopatadine', 'timolol', 'brimonidine', 'atropine', 'nepafenac'],

  ent: ['ear drops', 'eardrop', 'nasal spray', 'nasal drops', 'gargle', 'mouthwash', 'waxpol', 'candibiotic', 'fluticasone', 'otrivin', 'betadine', 'chlorhexidine', 'oraivid'],
  ear: ['ear drops', 'eardrop', 'candibiotic', 'waxpol', 'ofloxacin ear'],
  eardrop: ['ear drops', 'eardrop', 'candibiotic', 'waxpol', 'ofloxacin ear'],
  'ear drop': ['ear drops', 'eardrop', 'candibiotic', 'waxpol', 'ofloxacin ear'],
  nasal: ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline'],
  'nasal drop': ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline'],
  'nasal spray': ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline'],

  dermatology: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  derma: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  skin: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  cream: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole'],
  ointment: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'mupirocin', 'burnol', 'silver sulfadiazine'],

  orthopedics: ['aceclofenac', 'diclofenac', 'etoricoxib', 'thiocolchicoside', 'chymoral', 'tramadol', 'pregabalin', 'gabapentin', 'glucosamine', 'diacerein', 'methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'tizanidine', 'baclofen', 'calcium', 'calcitriol'],
  ortho: ['aceclofenac', 'diclofenac', 'etoricoxib', 'thiocolchicoside', 'chymoral', 'tramadol', 'pregabalin', 'gabapentin', 'glucosamine', 'diacerein', 'methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'tizanidine', 'baclofen', 'calcium', 'calcitriol'],
  rheumatology: ['methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'aceclofenac', 'etoricoxib', 'diacerein', 'prednisolone'],

  psychiatry: ['alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'zolpidem', 'escitalopram', 'sertraline', 'fluoxetine', 'duloxetine', 'amitriptyline', 'quetiapine', 'olanzapine', 'risperidone', 'valproate', 'levetiracetam', 'phenytoin', 'carbamazepine', 'donepezil'],
  psych: ['alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'zolpidem', 'escitalopram', 'sertraline', 'fluoxetine', 'duloxetine', 'amitriptyline', 'quetiapine', 'olanzapine', 'risperidone', 'valproate', 'levetiracetam', 'phenytoin', 'carbamazepine', 'donepezil'],
  neurology: ['levetiracetam', 'phenytoin', 'valproate', 'carbamazepine', 'donepezil', 'pregabalin', 'gabapentin', 'clonazepam', 'amitriptyline'],
  neuro: ['levetiracetam', 'phenytoin', 'valproate', 'carbamazepine', 'donepezil', 'pregabalin', 'gabapentin', 'clonazepam', 'amitriptyline'],

  cardiology: ['telmisartan', 'amlodipine', 'atenolol', 'losartan', 'sacubitril', 'aspirin', 'clopidogrel', 'rosuvastatin', 'atorvastatin', 'metoprolol', 'enalapril', 'ramipril', 'lasix', 'furosemide', 'amiodarone', 'nitroglycerin'],
  cardio: ['telmisartan', 'amlodipine', 'atenolol', 'losartan', 'sacubitril', 'aspirin', 'clopidogrel', 'rosuvastatin', 'atorvastatin', 'metoprolol', 'enalapril', 'ramipril', 'lasix', 'furosemide', 'amiodarone', 'nitroglycerin'],

  gastroenterology: ['pantoprazole', 'rabeprazole', 'omeprazole', 'esomeprazole', 'sucralfate', 'dicyclomine', 'drotaverine', 'bacillus clausii', 'saccharomyces', 'ors', 'racecadotril', 'loperamide', 'lactulose', 'peg 3350'],
  gastro: ['pantoprazole', 'rabeprazole', 'omeprazole', 'esomeprazole', 'sucralfate', 'dicyclomine', 'drotaverine', 'bacillus clausii', 'saccharomyces', 'ors', 'racecadotril', 'loperamide', 'lactulose', 'peg 3350'],

  pulmonology: ['foracort', 'seretide', 'duolin', 'levosalbutamol', 'budesonide', 'montelukast', 'acebrophylline', 'doxofylline', 'cough syrup'],
  pulmo: ['foracort', 'seretide', 'duolin', 'levosalbutamol', 'budesonide', 'montelukast', 'acebrophylline', 'doxofylline', 'cough syrup'],

  endocrinology: ['metformin', 'glimepiride', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'voglibose', 'thyroxine', 'carbimazole'],
  endo: ['metformin', 'glimepiride', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'voglibose', 'thyroxine', 'carbimazole'],

  urology: ['disodium hydrogen citrate', 'potassium citrate', 'tamsulosin', 'flavoxate', 'finasteride', 'darifenacin', 'solifenacin', 'furosemide'],
  nephrology: ['ketoanalogues', 'erythropoietin', 'epo', 'sevelamer', 'calcium acetate', 'furosemide', 'lasix', 'torsemide', 'sodium bicarbonate', 'tacrolimus', 'mycophenolate', 'potassium citrate'],
  renal: ['ketoanalogues', 'erythropoietin', 'epo', 'sevelamer', 'calcium acetate', 'furosemide', 'lasix', 'torsemide', 'sodium bicarbonate', 'tacrolimus', 'mycophenolate', 'potassium citrate'],

  hepatology: ['silymarin', 'l-ornithine', 'ornithine', 'ursodeoxycholic', 'udca', 'same', 'sam-e', 'metadoxine', 'lactulose', 'rifaximin', 'tenofovir', 'entecavir', 'vitamin k', 'silybon', 'hepamerz', 'ursocol'],
  hepato: ['silymarin', 'l-ornithine', 'ornithine', 'ursodeoxycholic', 'udca', 'same', 'sam-e', 'metadoxine', 'lactulose', 'rifaximin', 'silybon', 'hepamerz', 'ursocol'],
  liver: ['silymarin', 'l-ornithine', 'ornithine', 'ursodeoxycholic', 'udca', 'same', 'sam-e', 'metadoxine', 'lactulose', 'rifaximin', 'spironolactone', 'silybon', 'hepamerz', 'ursocol'],
  jaundice: ['silymarin', 'ursodeoxycholic', 'l-ornithine', 'udca', 'silybon', 'hepamerz', 'pantoprazole'],
  silymarin: ['silymarin', 'silybon', 'hepamerz', 'l-ornithine', 'ursodeoxycholic', 'udca', 'same'],
  cirrhosis: ['propranolol', 'spironolactone', 'furosemide', 'lactulose', 'rifaximin', 'silymarin', 'ursodeoxycholic', 'lola'],
  'fatty liver': ['silymarin', 'evion', 'vitamin e', 'ursodeoxycholic', 'udca', 'same', 'saroglitazar', 'metformin'],

  gynecology: ['dydrogesterone', 'progesterone', 'tranexamic acid', 'norethisterone', 'ferrous ascorbate', 'folic acid', 'clomiphene', 'cabergoline', 'isoxsuprine', 'candid v', 'clindamycin vaginal', 'miconazole'],
  gynaecology: ['dydrogesterone', 'progesterone', 'tranexamic acid', 'norethisterone', 'ferrous ascorbate', 'folic acid', 'clomiphene', 'cabergoline', 'isoxsuprine', 'candid v', 'clindamycin vaginal', 'miconazole'],
  gynae: ['dydrogesterone', 'progesterone', 'tranexamic acid', 'norethisterone', 'ferrous ascorbate', 'folic acid', 'clomiphene', 'cabergoline', 'isoxsuprine', 'candid v', 'clindamycin vaginal', 'miconazole'],
  obgyn: ['dydrogesterone', 'progesterone', 'tranexamic acid', 'norethisterone', 'ferrous ascorbate', 'folic acid', 'clomiphene', 'cabergoline', 'isoxsuprine', 'candid v', 'clindamycin vaginal', 'miconazole'],
  obstetrics: ['dydrogesterone', 'progesterone', 'tranexamic acid', 'norethisterone', 'ferrous ascorbate', 'folic acid', 'clomiphene', 'cabergoline', 'isoxsuprine'],

  dental: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'mouthwash', 'kenacort', 'oral gel', 'lignocaine gel', 'toothpaste', 'toothache', 'teeth', 'tooth'],
  dentistry: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'mouthwash', 'kenacort', 'oral gel', 'lignocaine gel', 'toothpaste', 'toothache', 'teeth', 'tooth'],
  dentist: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'mouthwash', 'kenacort', 'oral gel', 'lignocaine gel', 'toothpaste', 'toothache', 'teeth', 'tooth'],
  toothache: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'kenacort', 'lignocaine gel'],
  teeth: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'toothpaste'],
  tooth: ['ketorolac', 'ketorol', 'amoxicillin', 'metronidazole', 'flagyl', 'chlorhexidine', 'toothpaste'],

  procedure: ['dressing', 'debridement', 'incision', 'drainage', 'excision', 'pop cast', 'catheterization', 'ryles tube', 'injection', 'valsalva', 'sitz bath', 'epley', 'vagal'],
  valsalva: ['valsalva maneuver', 'expiratory strain', 'vagal maneuver'],
  sitz: ['sitz bath', 'warm sitz bath', 'povidone sitz bath', 'hemorrhoids bath'],
  seitz: ['sitz bath', 'warm sitz bath', 'povidone sitz bath', 'hemorrhoids bath'],
  epley: ['epley maneuver', 'vertigo repositioning', 'bppv'],
  vagal: ['vagal maneuver', 'carotid sinus massage', 'valsalva'],
  surgery: ['debridement', 'incision', 'drainage', 'excision', 'stitching', 'suturing'],
  surgical: ['debridement', 'incision', 'drainage', 'excision', 'stitching', 'suturing'],
  physiotherapy: ['quadriceps', 'range of motion', 'swd', 'tens', 'traction', 'spirometry', 'kegel', 'core stability'],
  physio: ['quadriceps', 'range of motion', 'swd', 'tens', 'traction', 'spirometry', 'kegel', 'core stability'],
  exercise: ['quadriceps', 'range of motion', 'swd', 'tens', 'traction', 'spirometry', 'kegel', 'core stability'],
};

export const CLINICAL_PROCEDURES_PRESETS: string[] = [
  'Valsalva Maneuver (Expiratory strain against closed airway for 10-15s)',
  'Warm Sitz Bath (15-20 mins in tub 3x daily for Hemorrhoids / Fissure / Episiotomy)',
  'Modified Epley Maneuver (Canalith Repositioning Procedure for BPPV Vertigo)',
  'Vagal Maneuvers (Carotid Sinus Massage / Cold Facial Immersion under ECG)',
  'Warm Salt Water Gargle & Steam Inhalation 3x Daily',
  'Cold Sponging for High Fever Protocol',
  'Wound Debridement & Sterile Dressing under Local Anesthesia',
  'Abscess Incision & Drainage (I&D) under Local Anesthesia',
  'Excision of Sebaceous Cyst / Lipoma under Local Anesthesia',
  'Closed Reduction & POP Cast Immobilization for Fracture',
  'Intra-articular Corticosteroid Injection (Knee / Shoulder Joint)',
  'Foley Urinary Catheterization under Aseptic Precautions',
  'Nasogastric Tube (Ryle\'s Tube) Insertion',
  'Quadriceps Strengthening & Knee ROM Exercises (Physiotherapy)',
  'Passive & Active Range of Motion Exercises for Frozen Shoulder',
  'Short Wave Diathermy (SWD) & TENS Therapy for Low Back Pain',
  'Cervical & Lumbar Traction Protocol',
  'Incentive Spirometry & Chest Physiotherapy 4x Daily',
  'Pelvic Floor / Kegel Strengthening Exercises',
  'Postural Correction & Core Stability Exercises'
];

export function searchClinicalDrugs(query: string, catalog: DrugItem[]): DrugItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return catalog;

  const tokens = q.split(/\s+/).filter(Boolean);
  const aliasKeywords = CLINICAL_SYMPTOM_MAP[q] || [q];

  return catalog.filter((drug) => {
    const name = drug.genericName.toLowerCase();
    const dosage = drug.dosage.toLowerCase();
    const cat = drug.category.toLowerCase();
    const kw = (drug.keywords || '').toLowerCase();
    const fullText = `${name} ${dosage} ${cat} ${kw}`;

    if (tokens.every((t) => fullText.includes(t))) {
      return true;
    }

    if (name.includes(q) || dosage.includes(q) || cat.includes(q) || kw.includes(q)) {
      return true;
    }

    return aliasKeywords.some((alias) => name.includes(alias) || dosage.includes(alias) || kw.includes(alias));
  });
}

export interface CalculatedPediatricDose {
  drugName: string;
  recommendedDoseMg: number;
  formulation: string;
  calculatedVolumeMl: string;
  frequency: string;
  notes: string;
}

export interface CalculatedBsaDose {
  drugName: string;
  bsaSquareMeters: number;
  dosePerBsa: string;
  totalCalculatedDose: string;
  dosingMethod: 'BSA (Body Surface Area)' | 'Weight-Based (mg/kg)' | 'Age-Based';
  frequency: string;
  clinicalIndication: string;
}

export function calculateBsa(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function calculateBsaDose(heightCm: number, weightKg: number, ageYrs: number = 5): CalculatedBsaDose[] {
  const bsa = calculateBsa(heightCm, weightKg);
  const weightVal = weightKg > 0 ? weightKg : 15;
  const bsaVal = bsa > 0 ? bsa : Math.pow((weightVal * 4 + 7) / (weightVal + 90), 0.95);

  const pred60DoseMg = Math.round(bsaVal * 60);
  const pred40DoseMg = Math.round(bsaVal * 40);
  const mtxDoseMg = (bsaVal * 15).toFixed(1);
  const cycloDoseMg = Math.round(bsaVal * 500);
  const acyDoseMg = Math.round(bsaVal * 500);

  return [
    {
      drugName: 'Prednisolone (Nephrotic Syndrome Induction)',
      bsaSquareMeters: parseFloat(bsaVal.toFixed(2)),
      dosePerBsa: '60 mg/m²/day',
      totalCalculatedDose: `${pred60DoseMg} mg/day`,
      dosingMethod: 'BSA (Body Surface Area)',
      frequency: 'Single morning dose after breakfast',
      clinicalIndication: 'Pediatric Nephrotic Syndrome Induction',
    },
    {
      drugName: 'Prednisolone (Alternate Day Maintenance)',
      bsaSquareMeters: parseFloat(bsaVal.toFixed(2)),
      dosePerBsa: '40 mg/m²/alt day',
      totalCalculatedDose: `${pred40DoseMg} mg/alt day`,
      dosingMethod: 'BSA (Body Surface Area)',
      frequency: 'Single morning dose on alternate days',
      clinicalIndication: 'Nephrotic Syndrome Remission Maintenance',
    },
    {
      drugName: 'Methotrexate (Immunosuppression)',
      bsaSquareMeters: parseFloat(bsaVal.toFixed(2)),
      dosePerBsa: '15 mg/m²/week',
      totalCalculatedDose: `${mtxDoseMg} mg/week`,
      dosingMethod: 'BSA (Body Surface Area)',
      frequency: 'Once weekly with Folic Acid supplement',
      clinicalIndication: 'Juvenile Idiopathic Arthritis / Psoriasis',
    },
    {
      drugName: 'Acyclovir IV Infusion (Severe Pediatric)',
      bsaSquareMeters: parseFloat(bsaVal.toFixed(2)),
      dosePerBsa: '500 mg/m²/dose',
      totalCalculatedDose: `${acyDoseMg} mg/dose`,
      dosingMethod: 'BSA (Body Surface Area)',
      frequency: 'Every 8 hours IV infusion over 1 hour',
      clinicalIndication: 'Herpes Encephalitis / Severe Mucocutaneous',
    },
    {
      drugName: 'Cyclophosphamide IV Pulse',
      bsaSquareMeters: parseFloat(bsaVal.toFixed(2)),
      dosePerBsa: '500 mg/m²/pulse',
      totalCalculatedDose: `${cycloDoseMg} mg/pulse`,
      dosingMethod: 'BSA (Body Surface Area)',
      frequency: 'Monthly IV Pulse Infusion with hydration',
      clinicalIndication: 'Lupus Nephritis / Oncology Protocol',
    },
  ];
}

export function calculatePediatricDose(
  weightKg: number,
  preferredErigKey: string = 'erig-300'
): CalculatedPediatricDose[] {
  if (weightKg <= 0) return [];

  // 1. Paracetamol (15 mg/kg/dose Q6H)
  const pcmDoseMg = Math.round(weightKg * 15);
  const pcmMl250 = (pcmDoseMg / 50).toFixed(1);
  const pcmMl120 = (pcmDoseMg / 24).toFixed(1);
  const pcmDrops = (pcmDoseMg / 100).toFixed(1);

  // 2. Cefixime (8 mg/kg/day divided BD = 4 mg/kg/dose BD)
  const cefixDoseMg = Math.round(weightKg * 4);
  const cefixMl50 = (cefixDoseMg / 10).toFixed(1);
  const cefixMl100 = (cefixDoseMg / 20).toFixed(1);

  // 3. Amoxicillin + Clavulanate (30 mg/kg/day divided BD = 15 mg/kg/dose BD of Amoxicillin)
  const amoxClavDoseMg = Math.round(weightKg * 15);
  const amoxClavMl228 = (amoxClavDoseMg / 40).toFixed(1); // 200mg Amox/5ml = 40mg/ml
  const amoxClavMl457 = (amoxClavDoseMg / 80).toFixed(1); // 400mg Amox/5ml = 80mg/ml

  // 4. Mefenamic Acid (Meftal-P: 6.5 mg/kg/dose BD/TDS)
  const meftalDoseMg = Math.round(weightKg * 6.5);
  const meftalMl100 = (meftalDoseMg / 20).toFixed(1);

  // 5. Ibuprofen (10 mg/kg/dose TDS)
  const ibuDoseMg = Math.round(weightKg * 10);
  const ibuMl100 = (ibuDoseMg / 20).toFixed(1);

  // 6. Azithromycin (10 mg/kg/day OD)
  const aziDoseMg = Math.round(weightKg * 10);
  const aziMl200 = (aziDoseMg / 40).toFixed(1);
  const aziMl100 = (aziDoseMg / 20).toFixed(1);

  // 7. Ondansetron (0.15 mg/kg/dose S.O.S)
  const ondDoseMg = (weightKg * 0.15).toFixed(1);
  const ondMl = (parseFloat(ondDoseMg) / 0.4).toFixed(1);

  // 8. Cetirizine (0.25 mg/kg/day HS)
  const cetDoseMg = (weightKg * 0.25).toFixed(1);
  const cetMl = (parseFloat(cetDoseMg) / 1).toFixed(1);

  // 9. Domperidone (0.25 mg/kg/dose TDS)
  const dompDoseMg = (weightKg * 0.25).toFixed(1);
  const dompMl = (parseFloat(dompDoseMg) / 1).toFixed(1);

  // 10. Equine Rabies Immunoglobulin (ERIG - Equirab: 40 IU/kg)
  const erigTotalIu = Math.round(weightKg * 40);
  const erigMl300 = (erigTotalIu / 300).toFixed(1); // 300 IU/ml (Equirab / Vinrab 1500 IU / 5ml: Wt * 40 / 300)
  const erigMl200 = (erigTotalIu / 200).toFixed(1); // 200 IU/ml (Govt Supply / CRI Kasauli 1000 IU / 5ml: Wt * 40 / 200)

  // 11. Human Rabies Immunoglobulin (HRIG - Rabigard / Berirab: 20 IU/kg; 300 IU/2ml = 150 IU/ml)
  const hrigTotalIu = Math.round(weightKg * 20);
  const hrigMl = (hrigTotalIu / 150).toFixed(1);

  // Rabies Immunoglobulin items
  const erig300Item: CalculatedPediatricDose = {
    drugName: 'Equine Rabies Immunoglobulin (ERIG 300 IU/ml - Equirab / Vinrab 1500 IU / 5ml)',
    recommendedDoseMg: erigTotalIu,
    formulation: 'Injectable 300 IU/ml (1500 IU/5ml)',
    calculatedVolumeMl: `${erigMl300} ml (${erigTotalIu} IU)`,
    frequency: 'Stat Category III Rabies Bite Infiltration on Day 0',
    notes: `Target: 40 IU/kg (${erigTotalIu} IU). Formula: Wt × 40 / 300. Infiltrate into/around wound after skin test.`,
  };

  const erig200Item: CalculatedPediatricDose = {
    drugName: 'Equine Rabies Immunoglobulin (ERIG 200 IU/ml - Govt. Supply / CRI Kasauli 1000 IU / 5ml)',
    recommendedDoseMg: erigTotalIu,
    formulation: 'Injectable 200 IU/ml (1000 IU/5ml)',
    calculatedVolumeMl: `${erigMl200} ml (${erigTotalIu} IU)`,
    frequency: 'Stat Category III Rabies Bite Infiltration on Day 0',
    notes: `Target: 40 IU/kg (${erigTotalIu} IU). Formula: Wt × 40 / 200. Infiltrate into/around wound after skin test.`,
  };

  const hrig150Item: CalculatedPediatricDose = {
    drugName: 'Human Rabies Immunoglobulin (HRIG / Rabigard / Berirab 20 IU/kg)',
    recommendedDoseMg: hrigTotalIu,
    formulation: 'Injectable 150 IU/ml (300 IU/2ml)',
    calculatedVolumeMl: `${hrigMl} ml (${hrigTotalIu} IU)`,
    frequency: 'Stat Category III Rabies Bite Infiltration on Day 0',
    notes: `Target: 20 IU/kg (${hrigTotalIu} IU). Formula: Wt × 20 / 150. Infiltrate thoroughly into/around wound; rest deep IM.`,
  };

  // Sort rabies immunoglobulin items based on doctor's preferred choice (#1 position)
  let rabiesIgItems: CalculatedPediatricDose[] = [];
  if (preferredErigKey === 'erig-200') {
    rabiesIgItems = [erig200Item, erig300Item, hrig150Item];
  } else if (preferredErigKey === 'hrig-150') {
    rabiesIgItems = [hrig150Item, erig300Item, erig200Item];
  } else {
    // Default 'erig-300'
    rabiesIgItems = [erig300Item, erig200Item, hrig150Item];
  }

  return [
    ...rabiesIgItems,
    {
      drugName: 'Purified Chick Embryo Rabies Vaccine (Rabipur / Abhayrab / Indirab)',
      recommendedDoseMg: 0.5,
      formulation: 'Reconstituted 0.5ml Vial',
      calculatedVolumeMl: '0.5 ml IM (or 0.1 ml ID 2-site)',
      frequency: 'Days 0, 3, 7, 14, 28 (Essen IM) or Days 0, 3, 7, 28 (WHO ID)',
      notes: 'Intramuscular deltoid/anterolateral thigh (Never gluteal!)',
    },
    {
      drugName: 'Cefixime 50mg/5ml Dry Syrup',
      recommendedDoseMg: cefixDoseMg,
      formulation: 'Syrup 50mg/5ml',
      calculatedVolumeMl: `${cefixMl50} ml`,
      frequency: 'Twice daily (1-0-1 for 5 days)',
      notes: `Target: 8mg/kg/day divided BD (${cefixDoseMg}mg per dose)`,
    },
    {
      drugName: 'Cefixime 100mg/5ml Dry Syrup',
      recommendedDoseMg: cefixDoseMg,
      formulation: 'Syrup 100mg/5ml',
      calculatedVolumeMl: `${cefixMl100} ml`,
      frequency: 'Twice daily (1-0-1 for 5 days)',
      notes: `Target: 8mg/kg/day divided BD (${cefixDoseMg}mg per dose)`,
    },
    {
      drugName: 'Paracetamol Syrup (250mg/5ml)',
      recommendedDoseMg: pcmDoseMg,
      formulation: 'Syrup 250mg/5ml',
      calculatedVolumeMl: `${pcmMl250} ml`,
      frequency: '3 times daily (t.d.s after food)',
      notes: `Target: 15mg/kg (${pcmDoseMg}mg per dose)`,
    },
    {
      drugName: 'Paracetamol Syrup (120mg/5ml)',
      recommendedDoseMg: pcmDoseMg,
      formulation: 'Syrup 120mg/5ml',
      calculatedVolumeMl: `${pcmMl120} ml`,
      frequency: '3 times daily (t.d.s after food)',
      notes: `Target: 15mg/kg (${pcmDoseMg}mg per dose)`,
    },
    {
      drugName: 'Paracetamol Oral Drops (100mg/ml)',
      recommendedDoseMg: pcmDoseMg,
      formulation: 'Drops 100mg/ml',
      calculatedVolumeMl: `${pcmDrops} ml (${Math.round(parseFloat(pcmDrops) * 20)} drops)`,
      frequency: '3 times daily (t.d.s)',
      notes: `Target: 15mg/kg (${pcmDoseMg}mg per dose)`,
    },
    {
      drugName: 'Amoxiclav (Augmentin) Dry Syrup 228.5mg/5ml',
      recommendedDoseMg: amoxClavDoseMg,
      formulation: 'Syrup 228.5mg/5ml',
      calculatedVolumeMl: `${amoxClavMl228} ml`,
      frequency: 'Twice daily (1-0-1 for 5-7 days)',
      notes: `Target: 30mg/kg/day divided BD (${amoxClavDoseMg}mg per dose)`,
    },
    {
      drugName: 'Amoxiclav (Augmentin Duo) Dry Syrup 457mg/5ml',
      recommendedDoseMg: amoxClavDoseMg,
      formulation: 'Syrup 457mg/5ml',
      calculatedVolumeMl: `${amoxClavMl457} ml`,
      frequency: 'Twice daily (1-0-1 for 5-7 days)',
      notes: `Target: 30mg/kg/day divided BD (${amoxClavDoseMg}mg per dose)`,
    },
    {
      drugName: 'Mefenamic Acid (Meftal-P) Syrup 100mg/5ml',
      recommendedDoseMg: meftalDoseMg,
      formulation: 'Syrup 100mg/5ml',
      calculatedVolumeMl: `${meftalMl100} ml`,
      frequency: 'Twice daily (1-0-1 after food)',
      notes: `Target: 6.5mg/kg (${meftalDoseMg}mg per dose)`,
    },
    {
      drugName: 'Ibuprofen Syrup (100mg/5ml)',
      recommendedDoseMg: ibuDoseMg,
      formulation: 'Syrup 100mg/5ml',
      calculatedVolumeMl: `${ibuMl100} ml`,
      frequency: 'Twice daily (b.d. after food)',
      notes: `Target: 10mg/kg (${ibuDoseMg}mg per dose)`,
    },
    {
      drugName: 'Azithromycin Suspension (200mg/5ml)',
      recommendedDoseMg: aziDoseMg,
      formulation: 'Suspension 200mg/5ml',
      calculatedVolumeMl: `${aziMl200} ml`,
      frequency: 'Once daily (1-0-0 for 3 days)',
      notes: `Target: 10mg/kg (${aziDoseMg}mg per dose)`,
    },
    {
      drugName: 'Azithromycin Suspension (100mg/5ml)',
      recommendedDoseMg: aziDoseMg,
      formulation: 'Suspension 100mg/5ml',
      calculatedVolumeMl: `${aziMl100} ml`,
      frequency: 'Once daily (1-0-0 for 3 days)',
      notes: `Target: 10mg/kg (${aziDoseMg}mg per dose)`,
    },
    {
      drugName: 'Ondansetron Syrup (2mg/5ml)',
      recommendedDoseMg: parseFloat(ondDoseMg),
      formulation: 'Syrup 2mg/5ml',
      calculatedVolumeMl: `${ondMl} ml`,
      frequency: 'As needed for vomiting (S.O.S)',
      notes: `Target: 0.15mg/kg (${ondDoseMg}mg)`,
    },
    {
      drugName: 'Cetirizine Syrup (5mg/5ml)',
      recommendedDoseMg: parseFloat(cetDoseMg),
      formulation: 'Syrup 5mg/5ml',
      calculatedVolumeMl: `${cetMl} ml`,
      frequency: 'Once daily at bedtime (0-0-1)',
      notes: `Target: 0.25mg/kg (${cetDoseMg}mg per day)`,
    },
    {
      drugName: 'Domperidone Syrup (5mg/5ml)',
      recommendedDoseMg: parseFloat(dompDoseMg),
      formulation: 'Syrup 5mg/5ml',
      calculatedVolumeMl: `${dompMl} ml`,
      frequency: '3 times daily 15 mins before meals',
      notes: `Target: 0.25mg/kg (${dompDoseMg}mg per dose)`,
    },
  ];
}

// UNRESTRICTED USFDA & INDIAN PHARMACOPOEIA (IP) CLINICAL PHARMACOPEIA CATALOG
export const COMPREHENSIVE_GENERIC_DRUGS: DrugItem[] = [
  // ==========================================
  // 0. CORE ESSENTIAL ANTI-INFECTIVES & GENERAL MEDICINE
  // ==========================================
  { id: 'gen_cefix200', genericName: 'Cefixime 200mg Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'cefixime zifi taxim-o antibiotic fever urti uti typhoid respiratory', minAge: 12 },
  { id: 'gen_cefix100', genericName: 'Cefixime 100mg Dispersible Tablet', category: 'all', dosage: '1 tablet dissolved in 15ml water twice daily', duration: '5 days', keywords: 'cefixime zifi dt pediatric antibiotic fever urti' },
  { id: 'gen_cefix_syp', genericName: 'Cefixime 50mg/5ml Dry Syrup', category: 'pediatric', dosage: '5ml twice daily (1-0-1)', duration: '5 days', keywords: 'cefixime zifi syrup pediatric antibiotic fever', maxAge: 12 },
  { id: 'gen_azee500', genericName: 'Azithromycin 500mg Tablet', category: 'adult', dosage: '1 tablet once daily 1 hour before or 2 hours after meals', duration: '3 days', keywords: 'azithromycin azee azithral antibiotic throat chest infection urti pharyngitis tonsillitis', minAge: 12 },
  { id: 'gen_azee250', genericName: 'Azithromycin 250mg Tablet', category: 'all', dosage: '1 tablet once daily', duration: '5 days', keywords: 'azithromycin azee azithral antibiotic urti' },
  { id: 'gen_azee_syp', genericName: 'Azithromycin 100mg/5ml Oral Suspension', category: 'pediatric', dosage: '5ml once daily for 3 days', duration: '3 days', keywords: 'azithromycin azee liquid syrup pediatric antibiotic', maxAge: 12 },
  { id: 'gen_amox500', genericName: 'Amoxicillin 500mg Capsule', category: 'adult', dosage: '1 capsule 3 times daily', duration: '5 days', keywords: 'amoxicillin mox novamox antibiotic throat ear sinus RTI', minAge: 12 },
  { id: 'gen_cipro500', genericName: 'Ciprofloxacin 500mg Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'ciprofloxacin ciplox antibiotic uti diarrhea gastroenteritis dysentery', minAge: 18 },
  { id: 'gen_levo500', genericName: 'Levofloxacin 500mg Tablet', category: 'adult', dosage: '1 tablet once daily', duration: '5 days', keywords: 'levofloxacin levoquin tavanic antibiotic pneumonia sinusitis uti', minAge: 18 },
  { id: 'gen_oflox200', genericName: 'Ofloxacin 200mg Tablet', category: 'adult', dosage: '1 tablet twice daily', duration: '5 days', keywords: 'ofloxacin oflox zanocin antibiotic uti diarrhea gastro', minAge: 18 },
  { id: 'gen_doxy100', genericName: 'Doxycycline 100mg Capsule', category: 'adult', dosage: '1 capsule twice daily with food and glass of water', duration: '7 days', keywords: 'doxycycline microdox acne malaria fever rickettsia chlamydia', minAge: 12 },
  { id: 'gen_ceftum500', genericName: 'Cefuroxime Axetil 500mg Tablet', category: 'adult', dosage: '1 tablet twice daily after food', duration: '5 days', keywords: 'cefuroxime ceftum forcef antibiotic skin soft tissue respiratory RTI', minAge: 12 },
  { id: 'gen_gudcef200', genericName: 'Cefpodoxime Proxetil 200mg Tablet', category: 'adult', dosage: '1 tablet twice daily', duration: '5 days', keywords: 'cefpodoxime gudcef cepodem antibiotic otitis bronchitis RTI', minAge: 12 },
  { id: 'gen_metro400', genericName: 'Metronidazole 400mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '5 days', keywords: 'metronidazole flagyl metrogyl diarrhea amoebiasis dental anaerobic dysentery', minAge: 12 },
  { id: 'gen_niftran100', genericName: 'Nitrofurantoin 100mg SR Capsule', category: 'adult', dosage: '1 capsule twice daily with meals', duration: '7 days', keywords: 'nitrofurantoin niftran uti cystitis urinary tract infection', minAge: 12 },
  { id: 'gen_bactrim', genericName: 'Trimethoprim 160mg + Sulfamethoxazole 800mg Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'bactrim septra cotrimoxazole uti skin infection pneumonia', minAge: 12 },
  { id: 'gen_forcan150', genericName: 'Fluconazole 150mg Tablet', category: 'adult', dosage: '1 tablet single dose (repeat after 1 week if needed)', duration: 'Single dose', keywords: 'fluconazole forcan zocon fungal candidiasis ringworm yeast infection' },

  // ==========================================
  // ESSENTIAL IV / IM INJECTABLES & INFUSIONS
  // ==========================================
  { id: 'inj_oflox200_100ml', genericName: 'Inj Ofloxacin 200mg / 100ml IV Infusion', category: 'adult', dosage: '100ml IV infusion slow over 30 mins twice daily', duration: '5 days', keywords: 'inj ofloxacin oflox 200mg 100ml iv infusion injection antibiotic zanocin gastro uti typhoid', minAge: 18 },
  { id: 'inj_panto40_iv', genericName: 'Inj Pantoprazole 40mg IV Vial', category: 'all', dosage: '40mg IV reconstituted in 10ml NS slow push over 2 mins once daily', duration: '5 days', keywords: 'inj pantoprazole pan 40 iv injection ppi acidity gas gerd stomach ulcer GI bleed' },
  { id: 'inj_ondansetron_4mg', genericName: 'Inj Ondansetron 4mg / 2ml IV/IM', category: 'all', dosage: '4mg (2ml) slow IV/IM stat S.O.S', duration: '3 days', keywords: 'inj ondansetron emeset 4mg 2ml iv im injection vomiting nausea emesis' },
  { id: 'inj_pcm1000_100ml', genericName: 'Inj Paracetamol 1000mg / 100ml IV Infusion', category: 'adult', dosage: '100ml (1000mg) IV infusion over 15 mins S.O.S (max 4g/day)', duration: '3 days', keywords: 'inj paracetamol pcm 1000mg 100ml iv infusion injection fever pain postop high temperature fever' },
  { id: 'inj_pcm150_2ml', genericName: 'Inj Paracetamol 150mg / 2ml IM/IV', category: 'all', dosage: '2ml deep IM / slow IV S.O.S', duration: '3 days', keywords: 'inj paracetamol pcm 150mg 2ml im iv injection fever pain' },
  { id: 'inj_diclo75_1ml', genericName: 'Inj Diclofenac Sodium 75mg / 1ml (Voveran AQ IM)', category: 'adult', dosage: '75mg (1ml) deep IM in gluteal region stat S.O.S', duration: '2 days', keywords: 'inj diclofenac voveran aq 75mg 1ml im injection acute pain renal colic trauma backache', minAge: 12 },
  { id: 'inj_trama100_2ml', genericName: 'Inj Tramadol 100mg / 2ml IV/IM', category: 'adult', dosage: '100mg (2ml) slow IV in 100ml NS over 20 mins or deep IM', duration: '3 days', keywords: 'inj tramadol 100mg 2ml iv im injection severe pain postop pain traumatic pain', minAge: 18 },
  { id: 'inj_amikacin500_2ml', genericName: 'Inj Amikacin 500mg / 2ml IV/IM', category: 'adult', dosage: '500mg (2ml) in 100ml NS IV infusion once daily', duration: '5 days', keywords: 'inj amikacin 500mg 2ml iv im injection aminoglycoside antibiotic severe infection uti', minAge: 12 },
  { id: 'inj_genta80_2ml', genericName: 'Inj Gentamicin 80mg / 2ml IV/IM', category: 'all', dosage: '80mg (2ml) slow IV / IM twice daily', duration: '5 days', keywords: 'inj gentamicin 80mg 2ml iv im injection aminoglycoside antibiotic sepsis uti' },
  { id: 'inj_ceftri1g_vial', genericName: 'Inj Ceftriaxone 1g IV Vial (Monocef 1g)', category: 'adult', dosage: '1g IV reconstituted in 10ml sterile water slow push / in 100ml NS once daily', duration: '5 days', keywords: 'inj ceftriaxone monocef 1g iv vial injection antibiotic fever typhoid pneumonia sepsis meningitis', minAge: 12 },
  { id: 'inj_ceftri500mg_vial', genericName: 'Inj Ceftriaxone 500mg IV/IM Vial (Monocef 500mg)', category: 'all', dosage: '500mg IV/IM once daily', duration: '5 days', keywords: 'inj ceftriaxone monocef 500mg iv im vial injection antibiotic' },
  { id: 'inj_cipro200_100ml', genericName: 'Inj Ciprofloxacin 200mg / 100ml IV Infusion', category: 'adult', dosage: '100ml IV infusion over 30 mins twice daily', duration: '5 days', keywords: 'inj ciprofloxacin ciplox 200mg 100ml iv infusion injection antibiotic gastroenteritis dysentery uti', minAge: 18 },
  { id: 'inj_metro500_100ml', genericName: 'Inj Metronidazole 500mg / 100ml IV Infusion (Metrogyl)', category: 'all', dosage: '100ml (500mg) IV infusion over 20 mins 3 times daily', duration: '5 days', keywords: 'inj metronidazole metrogyl 500mg 100ml iv infusion injection anaerobic diarrhea dysentery intra-abdominal' },
  { id: 'inj_artesunate60_vial', genericName: 'Inj Artesunate 60mg IV/IM Vial', category: 'all', dosage: '2.4 mg/kg IV reconstituted at 0, 12h, and 24h, then daily', duration: '3 days', keywords: 'inj artesunate 60mg iv im vial injection falciparum severe malaria fever' },
  { id: 'inj_hydrocort100_vial', genericName: 'Inj Hydrocortisone 100mg IV Vial (Efcorlin / Cort-S)', category: 'all', dosage: '100mg IV reconstituted slow push stat', duration: '3 days', keywords: 'inj hydrocortisone efcorlin 100mg iv vial injection steroid asthma anaphylaxis shock severe allergy' },
  { id: 'inj_dexa8_2ml', genericName: 'Inj Dexamethasone 8mg / 2ml IV/IM (Decadron)', category: 'all', dosage: '4mg to 8mg IV/IM stat', duration: '3 days', keywords: 'inj dexamethasone decadron 8mg 2ml iv im injection steroid cerebral edema allergy airway croup' },
  { id: 'inj_rani50_2ml', genericName: 'Inj Ranitidine 50mg / 2ml IV/IM (Aciloc / Rantac)', category: 'all', dosage: '50mg (2ml) slow IV / IM twice daily', duration: '5 days', keywords: 'inj ranitidine aciloc rantac 50mg 2ml iv im injection acidity gas h2 blocker heartburn' },
  { id: 'inj_metoclop10_2ml', genericName: 'Inj Metoclopramide 10mg / 2ml IV/IM (Perinorm)', category: 'all', dosage: '10mg (2ml) IM / slow IV 3 times daily', duration: '3 days', keywords: 'inj metoclopramide perinorm 10mg 2ml iv im injection nausea vomiting gastroparesis' },
  { id: 'inj_deriphyllin2ml', genericName: 'Inj Etofylline + Theophylline 2ml IV/IM (Deriphyllin)', category: 'all', dosage: '2ml slow IV in 100ml NS or IM twice daily', duration: '3 days', keywords: 'inj deriphyllin etofylline theophylline 2ml iv im injection asthma bronchospasm COPD wheezing breathlessness' },
  { id: 'inj_furo20_2ml', genericName: 'Inj Furosemide 20mg / 2ml IV (Lasix)', category: 'all', dosage: '20mg to 40mg slow IV push over 2 mins S.O.S', duration: '3 days', keywords: 'inj furosemide frusemide lasix 20mg 2ml iv injection diuretic pulmonary edema fluid overload hypertension acute renal' },
  { id: 'inj_ironsucrose100_5ml', genericName: 'Inj Iron Sucrose 100mg / 5ml IV Infusion (Encifer / Orofer)', category: 'adult', dosage: '100mg (5ml) in 100ml NS IV infusion over 30 mins alternate days', duration: '5 doses', keywords: 'inj iron sucrose encifer orofer 100mg 5ml iv infusion injection severe anemia pregnancy iron deficiency', minAge: 15 },
  { id: 'inj_drota40_2ml', genericName: 'Inj Drotaverine 40mg / 2ml IV/IM (Drotin)', category: 'all', dosage: '40mg (2ml) slow IV / IM stat S.O.S', duration: '2 days', keywords: 'inj drotaverine drotin 40mg 2ml iv im injection antispasmodic abdominal colic renal colic dysmenorrhea pain' },
  { id: 'inj_dicyclo20_2ml', genericName: 'Inj Dicyclomine 20mg / 2ml IM (Cyclopam)', category: 'all', dosage: '20mg (2ml) deep IM stat S.O.S', duration: '2 days', keywords: 'inj dicyclomine cyclopam 20mg 2ml im injection antispasmodic stomach pain cramp abdominal colic' },
  { id: 'inj_ns500ml', genericName: 'Inj Normal Saline 0.9% 500ml IV Infusion (NS)', category: 'all', dosage: '500ml IV infusion at 75-100 ml/hr as clinically indicated', duration: 'Maintenance / Resuscitation', keywords: 'inj normal saline ns 0.9% 500ml iv infusion IV fluids hydration dilution maintenance' },
  { id: 'inj_rl500ml', genericName: 'Inj Ringer Lactate 500ml IV Infusion (RL)', category: 'all', dosage: '500ml IV infusion rapidly or at maintenance rate', duration: 'Resuscitation / Dehydration', keywords: 'inj ringer lactate rl 500ml iv infusion IV fluids resuscitation trauma burn diarrhea dehydration' },
  { id: 'inj_d5w_500ml', genericName: 'Inj Dextrose 5% 500ml IV Infusion (D5W)', category: 'all', dosage: '500ml IV infusion at 75-100 ml/hr', duration: 'IV Fluids', keywords: 'inj dextrose 5% d5w d5 500ml iv infusion IV fluids hypoglycemia energy hydration' },
  { id: 'inj_d10w_500ml', genericName: 'Inj Dextrose 10% 500ml IV Infusion (D10W)', category: 'all', dosage: '500ml IV infusion slow', duration: 'IV Fluids', keywords: 'inj dextrose 10% d10w d10 500ml iv infusion IV fluids hypoglycemia energy' },
  { id: 'inj_d25w_100ml', genericName: 'Inj Dextrose 25% 100ml IV Bolus (D25W Ampoule / Vial)', category: 'all', dosage: '50ml to 100ml IV stat bolus for acute hypoglycemia', duration: 'Stat Hypoglycemia', keywords: 'inj dextrose 25% d25w d25 100ml iv bolus injection hypoglycemia low sugar emergency stat' },
  { id: 'inj_d50w_100ml', genericName: 'Inj Dextrose 50% 100ml IV Bolus (D50W)', category: 'all', dosage: '50ml IV stat push', duration: 'Severe Hypoglycemia Emergency', keywords: 'inj dextrose 50% d50w d50 100ml iv bolus injection hypoglycemia' },
  { id: 'inj_dns_500ml', genericName: 'Inj Dextrose Normal Saline 500ml IV Infusion (DNS)', category: 'all', dosage: '500ml IV infusion at maintenance rate', duration: 'IV Fluids', keywords: 'inj dextrose normal saline dns 500ml iv infusion IV fluids maintenance fluids' },
  { id: 'inj_isolyte_p_500ml', genericName: 'Inj Isolyte-P Pediatric Maintenance Fluid 500ml', category: 'pediatric', dosage: 'IV infusion as per pediatric maintenance calculation', duration: 'Pediatric Maintenance', keywords: 'inj isolyte-p isolyte p pediatric IV fluids maintenance electrolyte' },
  { id: 'inj_isolyte_m_500ml', genericName: 'Inj Isolyte-M Adult Maintenance Fluid 500ml', category: 'adult', dosage: '500ml IV infusion', duration: 'Maintenance Fluids', keywords: 'inj isolyte-m isolyte m adult IV fluids electrolyte maintenance' },
  { id: 'inj_mannitol_20_100ml', genericName: 'Inj Mannitol 20% 100ml IV Infusion (Osmitrol)', category: 'adult', dosage: '100ml IV rapid infusion over 30 mins (repeat 6-8 hourly)', duration: 'Cerebral Edema / Raised ICP', keywords: 'inj mannitol 20% osmitrol 100ml iv infusion osmotic diuretic cerebral edema raised icp glaucoma' },
  { id: 'inj_saline_3_100ml', genericName: 'Inj Hypertonic Saline 3% 100ml IV Infusion', category: 'all', dosage: '100ml IV infusion over 30-60 mins for acute hyponatremia', duration: 'Severe Hyponatremia Stat', keywords: 'inj hypertonic saline 3% NaCl 100ml iv infusion hyponatremia sodium shift raised icp' },

  // ==========================================
  // RABIES BIOLOGICALS, IMMUNOGLOBULINS & VACCINES
  // ==========================================
  { id: 'inj_hrig_300iu', genericName: 'Inj HRIG (Human Rabies Immunoglobulin) 300 IU / 2ml Vial', category: 'all', dosage: '20 IU/kg body weight (Infiltrate thoroughly into & around wound edges stat)', duration: 'Stat wound infiltration', keywords: 'hrig human rabies immunoglobulin hrig 20iu/kg rabies bite animal bite cat 3 bite rabiglob rabigard wound infiltration' },
  { id: 'inj_erig_1000iu', genericName: 'Inj ERIG (Equine Rabies Immunoglobulin) 1000 IU / 5ml Vial', category: 'all', dosage: '40 IU/kg body weight (Infiltrate thoroughly into & around wound edges stat after skin test)', duration: 'Stat wound infiltration', keywords: 'erig equine rabies immunoglobulin erig 40iu/kg rabies bite animal bite cat 3 bite wound infiltration' },
  { id: 'inj_arv_1ml', genericName: 'Inj ARV - Cell Culture Rabies Vaccine 1ml (Rabipur / Abhayrab / Rabivax)', category: 'all', dosage: '1ml IM (deltoid) on Days 0, 3, 7, 14, 28 (Essen 5-dose regimen)', duration: '5 doses (Days 0, 3, 7, 14, 28)', keywords: 'arv rabies vaccine cell culture rabies vaccine rabipur abhayrab rabivax rabies prophylaxis animal bite dog bite cat bite' },
  { id: 'inj_rmab_100iu', genericName: 'Inj Rabies Monoclonal Antibody 100 IU / ml (Rabishield / Twinrab)', category: 'all', dosage: '40 IU/kg body weight (Infiltrate thoroughly into & around wound edges stat)', duration: 'Stat wound infiltration', keywords: 'rabishield twinrab rabies monoclonal antibody rmab rabies immunoglobulin animal bite cat 3 bite' },
  { id: 'inj_tt_05ml', genericName: 'Inj Tetanus Toxoid (TT) 0.5ml IM Ampoule', category: 'all', dosage: '0.5ml deep IM stat (deltoid)', duration: 'Stat single dose', keywords: 'tt tetanus toxoid tetanus vaccine tetvac tetglob wound injury bite 0.5ml im' },
  { id: 'inj_td_05ml', genericName: 'Inj Td (Tetanus-Diphtheria Toxoid) 0.5ml IM Ampoule', category: 'all', dosage: '0.5ml deep IM stat', duration: 'Stat single dose', keywords: 'td tetanus diphtheria toxoid vaccine wound prophylaxis' },
  { id: 'inj_tig_250iu', genericName: 'Inj TIG (Human Tetanus Immunoglobulin) 250 IU / 2ml IM', category: 'all', dosage: '250 IU deep IM stat for dirty tetanus-prone wounds', duration: 'Stat single dose', keywords: 'tig tetanus immunoglobulin human tetanus antibody dirty wound injury tetanus protection' },
  { id: 'inj_asv_10ml', genericName: 'Inj ASV (Polyvalent Anti-Snake Venom) 10ml IV Vial', category: 'all', dosage: '10 vials reconstituted in 500ml NS IV infusion over 1 hour stat', duration: 'Stat infusion', keywords: 'asv anti-snake venom polyvalent snake bite emergency envenomation neurotoxic hemotoxic' },

  { id: 'gen_iver12', genericName: 'Ivermectin 12mg Tablet', category: 'adult', dosage: '1 tablet single dose on empty stomach at bedtime', duration: 'Single dose', keywords: 'ivermectin ivermectol scabies worms antiparasitic lice', minAge: 12 },
  { id: 'gen_zentel400', genericName: 'Albendazole 400mg Chewable Tablet', category: 'all', dosage: '1 tablet chewed thoroughly at bedtime', duration: 'Single dose', keywords: 'albendazole zentel bandy deworming roundworm hookworm pinworm' },

  // ==========================================
  // 0.1 CORE ESSENTIAL ANALGESICS & ANTIPYRETICS
  // ==========================================
  { id: 'gen_dolo650', genericName: 'Paracetamol 650mg Tablet', category: 'adult', dosage: '1 tablet 3 to 4 times daily after meals (S.O.S max 4g/day)', duration: '3 days', keywords: 'paracetamol acetaminophen dolo calpol crocin fever pain headache bodyache temperature', minAge: 12, minWeight: 40 },
  { id: 'gen_pcm500', genericName: 'Paracetamol 500mg Tablet', category: 'all', dosage: '1 tablet 3 to 4 times daily S.O.S', duration: '3 days', keywords: 'paracetamol acetaminophen crocin calpol fever pain' },
  { id: 'gen_calpol_syp', genericName: 'Paracetamol 250mg/5ml Suspension', category: 'pediatric', dosage: '5ml to 7.5ml 3-4 times daily as per weight S.O.S', duration: '3 days', keywords: 'paracetamol calpol dolo syrup pediatric fever pain suspension', maxAge: 12 },
  { id: 'gen_zero100', genericName: 'Aceclofenac 100mg Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'aceclofenac zerodol pain arthritis joint pain backache swelling', minAge: 12, minWeight: 40 },
  { id: 'gen_vov50', genericName: 'Diclofenac Sodium 50mg Tablet', category: 'adult', dosage: '1 tablet 2 to 3 times daily after meals', duration: '3 days', keywords: 'diclofenac voveran pain swelling joint fracture trauma', minAge: 12, minWeight: 40 },
  { id: 'gen_brufen400', genericName: 'Ibuprofen 400mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '3 days', keywords: 'ibuprofen brufen pain fever swelling joint pain toothache', minAge: 12, minWeight: 40 },
  { id: 'gen_meftal500', genericName: 'Mefenamic Acid 500mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '3 days', keywords: 'mefenamic meftal period pain fever dysmenorrhea toothache', minAge: 12, minWeight: 40 },

  // ==========================================
  // 0.2 CORE ESSENTIAL GASTROINTESTINAL & ANTACIDS
  // ==========================================
  { id: 'gen_pan40', genericName: 'Pantoprazole 40mg Tablet', category: 'adult', dosage: '1 tablet once daily 30 minutes before breakfast', duration: '14 days', keywords: 'pantoprazole pan pantocid acidity gas ppi gerd stomach ulcer heartburn', minAge: 12 },
  { id: 'gen_omez20', genericName: 'Omeprazole 20mg Capsule', category: 'adult', dosage: '1 capsule once daily before breakfast', duration: '14 days', keywords: 'omeprazole omez acidity gas ppi gerd stomach ulcer' },
  { id: 'gen_rabeloc20', genericName: 'Rabeprazole 20mg Tablet', category: 'adult', dosage: '1 tablet once daily before breakfast', duration: '14 days', keywords: 'rabeprazole rabeloc acidity gas ppi gerd stomach ulcer' },
  { id: 'gen_sucrafil', genericName: 'Sucralfate 1g/5ml Suspension', category: 'all', dosage: '10ml 4 times daily 1 hour before meals and bedtime', duration: '14 days', keywords: 'sucralfate sucrafil ulcer coating gastritis stomach pain burn heartburn' },
  { id: 'gen_aciloc150', genericName: 'Ranitidine 150mg Tablet', category: 'all', dosage: '1 tablet twice daily before meals', duration: '7 days', keywords: 'ranitidine aciloc rantac acidity h2 blocker gas' },
  { id: 'gen_emeset4', genericName: 'Ondansetron 4mg Mouth Dissolving Tablet', category: 'all', dosage: '1 tablet dissolved on tongue 15 mins before meals S.O.S', duration: '3 days', keywords: 'ondansetron emeset vomitron vomiting nausea md tablet' },
  { id: 'gen_enterogerm', genericName: 'Bacillus Clausii Spores Oral Suspension', category: 'all', dosage: '1 mini bottle orally 2 to 3 times daily', duration: '5 days', keywords: 'bacillus clausii enterogermina probiotic diarrhea loose motion gut health' },
  { id: 'gen_econorm', genericName: 'Saccharomyces Boulardii 250mg Sachet', category: 'all', dosage: '1 sachet dissolved in water twice daily', duration: '5 days', keywords: 'saccharomyces econorm probiotic diarrhea gut health antibiotic diarrhea' },
  { id: 'gen_electral_ors', genericName: 'ORS (Oral Rehydration Salts IP Sachet 21.8g)', category: 'all', dosage: 'Dissolve 1 sachet in 1 liter clean drinking water, sip throughout day', duration: '3 days', keywords: 'ors electral dehydration loose motion diarrhea fluids WHO formula' },
  { id: 'gen_imodium2', genericName: 'Loperamide 2mg Capsule', category: 'adult', dosage: '2 capsules initially, then 1 capsule after each loose stool (max 16mg/day)', duration: '2 days', keywords: 'loperamide imodium acute watery diarrhea loose motion stop diarrhea', minAge: 12 },

  // ==========================================
  // 0.3 CORE ESSENTIAL ALLERGY & RESPIRATORY
  // ==========================================
  { id: 'gen_cetzine10', genericName: 'Cetirizine 10mg Tablet', category: 'all', dosage: '1 tablet once daily at bedtime', duration: '7 days', keywords: 'cetirizine cetzine okacet allergy itching cold runny nose sneezing hives' },
  { id: 'gen_levocet5', genericName: 'Levocetirizine 5mg Tablet', category: 'all', dosage: '1 tablet once daily at bedtime', duration: '7 days', keywords: 'levocetirizine levocet xyzal allergy cold itching rhinitis sneezing' },
  { id: 'gen_allegra120', genericName: 'Fexofenadine 120mg Tablet', category: 'adult', dosage: '1 tablet once daily', duration: '10 days', keywords: 'fexofenadine allegra allergy itching hives urticaria allergic rhinitis', minAge: 12 },
  { id: 'gen_montek10', genericName: 'Montelukast 10mg Tablet', category: 'adult', dosage: '1 tablet once daily at bedtime', duration: '14 days', keywords: 'montelukast montek singulair asthma allergy bronchospasm rhinitis', minAge: 15 },
  { id: 'gen_wysolone20', genericName: 'Prednisolone 20mg Tablet', category: 'adult', dosage: '1 tablet once daily after breakfast (taper as advised)', duration: '5 days', keywords: 'prednisolone wysolone steroid asthma severe allergy inflammation autoimmune', minAge: 12 },
  // ==========================================
  // 1. OPHTHALMOLOGY (EYE DROPS & OPHTHALMIC PREPARATIONS)
  // ==========================================
  { id: 'oph1', genericName: 'Moxifloxacin 0.5% Eye Drops', category: 'all', dosage: '1 drop in affected eye 3 times daily', duration: '7 days', keywords: 'eye drops eyedrop opthalmic ophthalmic eye infection conjunctivitis moxifloxacin' },
  { id: 'oph2', genericName: 'Tobramycin 0.3% + Dexamethasone 0.1% Eye Drops', category: 'all', dosage: '1 drop in affected eye 4 times daily', duration: '5 days', keywords: 'eye drops eyedrop opthalmic ophthalmic Tobramycin Dexamethasone eye inflammation conjunctivitis' },
  { id: 'oph3', genericName: 'Ofloxacin 0.3% Eye Drops', category: 'all', dosage: '1 drop 4 times daily', duration: '7 days', keywords: 'eye drops eyedrop opthalmic ophthalmic ofloxacin corneal ulcer' },
  { id: 'oph4', genericName: 'Carboxymethylcellulose 0.5% Lubricating Eye Drops', category: 'all', dosage: '1 to 2 drops as needed (S.O.S)', duration: '30 days', keywords: 'eye drops eyedrop opthalmic ophthalmic dry eyes artificial tears lubricant' },
  { id: 'oph5', genericName: 'Sodium Hyaluronate 0.1% Eye Drops', category: 'all', dosage: '1 drop 4 times daily for severe dry eyes', duration: '30 days', keywords: 'eye drops eyedrop opthalmic ophthalmic dry eyes artificial tears' },
  { id: 'oph6', genericName: 'Olopatadine 0.1% Ophthalmic Solution', category: 'all', dosage: '1 drop twice daily for allergic conjunctivitis', duration: '14 days', keywords: 'eye drops eyedrop opthalmic ophthalmic allergy itching conjunctivitis' },
  { id: 'oph7', genericName: 'Timolol Maleate 0.5% Ophthalmic Solution', category: 'adult', dosage: '1 drop twice daily in affected eye', duration: '30 days', keywords: 'eye drops eyedrop opthalmic ophthalmic glaucoma iop timolol', minAge: 18 },
  { id: 'oph8', genericName: 'Brimonidine Tartrate 0.2% Eye Drops', category: 'adult', dosage: '1 drop 3 times daily', duration: '30 days', keywords: 'eye drops eyedrop opthalmic ophthalmic glaucoma iop brimonidine', minAge: 18 },
  { id: 'oph9', genericName: 'Nepafenac 0.1% Ophthalmic Suspension', category: 'adult', dosage: '1 drop 3 times daily post cataract surgery', duration: '14 days', keywords: 'eye drops eyedrop opthalmic ophthalmic cataract postop nsaid nepafenac', minAge: 18 },
  { id: 'oph10', genericName: 'Atropine Sulfate 1% Eye Drops', category: 'all', dosage: '1 drop once daily (mydriatic / cycloplegic)', duration: '3 days', keywords: 'eye drops eyedrop opthalmic ophthalmic atropine cycloplegic mydriatic uveitis' },

  // ==========================================
  // 2. ENT (EAR DROPS, NASAL SPRAYS & MOUTHWASHES)
  // ==========================================
  { id: 'ent1', genericName: 'Ofloxacin + Beclomethasone + Clotrimazole + Lignocaine Ear Drops', category: 'all', dosage: '3 to 4 drops in affected ear 3 times daily', duration: '7 days', keywords: 'ear drops eardrop ent otitis externa otomycosis ear infection ear pain candibiotic' },
  { id: 'ent2', genericName: 'Paradichlorobenzene + Benzocaine + Chlorbutol Ear Wax Drops', category: 'all', dosage: '4 to 5 drops 3 times daily for 3 days before syringing', duration: '3 days', keywords: 'ear drops eardrop ent ear wax cerumen wax softener waxpol' },
  { id: 'ent3', genericName: 'Fluticasone Furoate Nasal Spray 50mcg', category: 'all', dosage: '2 puffs in each nostril once daily', duration: '14 days', keywords: 'nasal spray nasal drops ent rhinitis allergic rhinitis fluticasone sinusitis' },
  { id: 'ent4', genericName: 'Xylometazoline 0.1% Adult Nasal Drops', category: 'adult', dosage: '2 drops in each nostril 2-3 times daily (max 5 days)', duration: '3 days', keywords: 'nasal drops nasal spray ent decongestant blocked nose otrivin', minAge: 12 },
  { id: 'ent5', genericName: 'Xylometazoline 0.05% Pediatric Nasal Drops', category: 'pediatric', dosage: '1-2 drops in each nostril b.d.', duration: '3 days', keywords: 'nasal drops ent pediatric blocked nose otrivin', minAge: 1, maxAge: 12 },
  { id: 'ent6', genericName: 'Normal Saline 0.9% Nasal Drops / Spray', category: 'all', dosage: '2-3 drops in each nostril as needed', duration: '7 days', keywords: 'nasal drops nasal spray ent saline dry nose infant nose nasoclear' },
  { id: 'ent7', genericName: 'Povidone Iodine 2% Gargle / Mouthwash', category: 'all', dosage: 'Gargle 10ml diluted with warm water 3 times daily', duration: '5 days', keywords: 'gargle mouthwash ent sore throat tonsillitis throat infection povidone betadine' },
  { id: 'ent8', genericName: 'Chlorhexidine Gluconate 0.2% Mouthwash', category: 'all', dosage: 'Rinse 10ml for 1 minute twice daily after meals', duration: '7 days', keywords: 'mouthwash ent gingivitis oral hygiene mouth ulcer chlorhexidine rexidin' },
  { id: 'ent9', genericName: 'Choline Salicylate + Lignocaine Oral Gel', category: 'all', dosage: 'Apply small amount on mouth ulcers 3-4 times daily before meals', duration: '5 days', keywords: 'mouth gel ent mouth ulcer aphthous stomatitis ulcer pain relief orajel mucopain' },

  // ==========================================
  // 3. DERMATOLOGY (CREAMS, OINTMENTS, LOTIONS & SHAMPOOS)
  // ==========================================
  { id: 'derm1', genericName: 'Mupirocin 2% Ointment', category: 'all', dosage: 'Apply thin layer on affected area 3 times daily', duration: '7 days', keywords: 'dermatology derma skin cream ointment mupirocin impetigo wound infection bactroban t-bact' },
  { id: 'derm2', genericName: 'Fusidic Acid 2% Cream', category: 'all', dosage: 'Apply twice daily', duration: '7 days', keywords: 'dermatology derma skin cream fusidic acid bacterial skin infection fucidin' },
  { id: 'derm3', genericName: 'Silver Sulfadiazine 1% Burn Ointment', category: 'all', dosage: 'Apply sterile layer on burn area twice daily', duration: '7 days', keywords: 'dermatology derma skin cream ointment burn silver sulfadiazine burnol' },
  { id: 'derm4', genericName: 'Clobetasol Propionate 0.05% Cream', category: 'adult', dosage: 'Apply thin layer once daily (max 2 weeks)', duration: '7 days', keywords: 'dermatology derma skin cream steroid clobetasol eczema psoriasis itching tenovate', minAge: 12 },
  { id: 'derm5', genericName: 'Momethasone Furoate 0.1% Cream', category: 'all', dosage: 'Apply thin layer once daily', duration: '7 days', keywords: 'dermatology derma skin cream steroid momethasone eczema rash itching elocon' },
  { id: 'derm6', genericName: 'Clotrimazole 1% Antifungal Cream', category: 'all', dosage: 'Apply twice daily on affected area', duration: '14 days', keywords: 'dermatology derma skin cream antifungal clotrimazole ringworm tinea candid' },
  { id: 'derm7', genericName: 'Luliconazole 1% Cream', category: 'all', dosage: 'Apply once daily for 1 to 2 weeks', duration: '14 days', keywords: 'dermatology derma skin cream antifungal luliconazole ringworm tinea cruris lulifin' },
  { id: 'derm8', genericName: 'Terbinafine 1% Cream', category: 'all', dosage: 'Apply 1-2 times daily', duration: '14 days', keywords: 'dermatology derma skin cream antifungal terbinafine athlete foot tinea lamisil' },
  { id: 'derm9', genericName: 'Ketoconazole 2% Anti-dandruff Shampoo', category: 'all', dosage: 'Apply to scalp twice weekly, leave for 5 minutes then rinse', duration: '30 days', keywords: 'dermatology derma skin shampoo ketoconazole dandruff seborrheic dermatitis scalpe nizoral' },
  { id: 'derm10', genericName: 'Permethrin 5% Lotion', category: 'all', dosage: 'Apply neck down over entire body, wash off after 8-12 hours', duration: 'Single application (repeat in 7 days if needed)', keywords: 'dermatology derma skin lotion permethrin scabies lice scabper' },
  { id: 'derm11', genericName: 'Calamine + Liquid Paraffin Lotion', category: 'all', dosage: 'Apply gently as needed for itching or sunburn', duration: '7 days', keywords: 'dermatology derma skin lotion calamine itching soothing sunburn rash lacto calamine' },
  { id: 'derm12', genericName: 'Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel', category: 'adult', dosage: 'Apply thin layer at bedtime', duration: '30 days', keywords: 'dermatology derma skin gel acne pimples adapalene benzoyl peroxide epiduo', minAge: 12 },

  // ==========================================
  // 4. COMBINATION DRUGS & CLINICAL SEARCH ALIASES (COUGH, ALKALISER, ETC.)
  // ==========================================
  { id: 'cough1', genericName: 'Dextromethorphan + Chlorpheniramine + Phenylephrine Syrup', category: 'all', dosage: '10ml (t.d.s after food)', duration: '5 days', keywords: 'cough dry cough linctus cold congestion antihistamine' },
  { id: 'cough2', genericName: 'Ambroxol + Terbutaline + Guaifenesin Expectorant', category: 'all', dosage: '10ml (t.d.s after food)', duration: '5 days', keywords: 'cough wet cough productive cough expectorant phlegm mucus chest congestion' },
  { id: 'cough3', genericName: 'Levosalbutamol + Ambroxol + Guaifenesin Syrup', category: 'all', dosage: '5ml to 10ml (t.d.s)', duration: '5 days', keywords: 'cough bronchospasm asthma wheezing cough syrup expectorant' },
  { id: 'cough4', genericName: 'Codeine Phosphate + Chlorpheniramine Linctus', category: 'adult', dosage: '5ml (t.d.s for painful dry cough)', duration: '3 days', keywords: 'cough dry cough severe cough linctus', minAge: 18 },

  { id: 'alk1', genericName: 'Disodium Hydrogen Citrate Syrup 1.37g/5ml', category: 'all', dosage: '2 teaspoonfuls (10ml) in 1 glass water t.d.s after meals', duration: '5 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria burning micturition kidney stone uric acid' },
  { id: 'alk2', genericName: 'Potassium Citrate + Citric Acid Oral Solution', category: 'all', dosage: '15ml in 1 glass water t.d.s after meals', duration: '7 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria stone citrate' },
  { id: 'alk3', genericName: 'Potassium Citrate + Magnesium Citrate + Pyridoxine Syrup', category: 'adult', dosage: '10ml in glass of water b.d.', duration: '30 days', keywords: 'alkaliser alkalizer urinary alkaliser kidney stone urolithiasis citrate', minAge: 18 },
  { id: 'alk4', genericName: 'Disodium Hydrogen Citrate Syrup + Flavoxate 200mg', category: 'adult', dosage: '10ml syrup t.d.s + 1 tab Flavoxate t.d.s', duration: '5 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria spasm UTI', minAge: 18 },

  { id: 'fdc1', genericName: 'Aceclofenac + Paracetamol', category: 'adult', dosage: '100mg/325mg (1-0-1 after food)', duration: '5 days', keywords: 'pain fever inflammation zerodol-p', minAge: 12, minWeight: 40 },
  { id: 'fdc2', genericName: 'Aceclofenac + Paracetamol + Serratiopeptidase', category: 'adult', dosage: '100mg/325mg/15mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'fdc3', genericName: 'Aceclofenac + Paracetamol + Chlorzoxazone', category: 'adult', dosage: '100mg/325mg/250mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc4', genericName: 'Diclofenac Potassium + Paracetamol', category: 'adult', dosage: '50mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc5', genericName: 'Diclofenac + Serratiopeptidase', category: 'adult', dosage: '50mg/10mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'fdc6', genericName: 'Ibuprofen + Paracetamol', category: 'adult', dosage: '400mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc7', genericName: 'Mefenamic Acid + Paracetamol', category: 'adult', dosage: '500mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc8', genericName: 'Mefenamic Acid + Paracetamol Syrup 100/125mg per 5ml', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'fdc9', genericName: 'Tramadol + Paracetamol', category: 'adult', dosage: '37.5mg/325mg (1-0-1 S.O.S)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'fdc10', genericName: 'Etoricoxib + Thiocolchicoside', category: 'adult', dosage: '60mg/4mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc11', genericName: 'Trypsin + Chymotrypsin Tablet', category: 'adult', dosage: '100,000 Armour units (1-1-1 30m before food)', duration: '5 days', keywords: 'chymoral forte trypsin chymotrypsin', minAge: 12 },
  { id: 'fdc12', genericName: 'Pantoprazole + Domperidone SR Capsule', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', keywords: 'pan-d pantocid-d', minAge: 18, minWeight: 40 },
  { id: 'fdc13', genericName: 'Pantoprazole + Levosulpiride SR Capsule', category: 'adult', dosage: '40mg/75mg SR (1-0-0 before food)', duration: '14 days', minAge: 18 },
  { id: 'fdc14', genericName: 'Rabeprazole + Domperidone SR Capsule', category: 'adult', dosage: '20mg/30mg SR (1-0-0 before food)', duration: '7 days', keywords: 'rabeloc-d rabekind-d', minAge: 18, minWeight: 40 },
  { id: 'fdc15', genericName: 'Rabeprazole + Levosulpiride SR Capsule', category: 'adult', dosage: '20mg/75mg SR (1-0-0 before food)', duration: '14 days', minAge: 18 },
  { id: 'fdc16', genericName: 'Omeprazole + Domperidone Capsule', category: 'adult', dosage: '20mg/10mg (1-0-0 before food)', duration: '7 days', keywords: 'omez-d', minAge: 12 },
  { id: 'fdc17', genericName: 'Esomeprazole + Domperidone SR Capsule', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'fdc18', genericName: 'Dicyclomine + Paracetamol Tablet', category: 'adult', dosage: '20mg/500mg (1-0-1 S.O.S for abdominal spasms)', duration: '3 days', keywords: 'cyclopam meftal-spas dicyclomine', minAge: 12, minWeight: 40 },
  { id: 'fdc19', genericName: 'Drotaverine + Mefenamic Acid Tablet', category: 'adult', dosage: '80mg/250mg (1-0-1 after food)', duration: '3 days', keywords: 'drotin-m drotaverine', minAge: 12, minWeight: 40 },
  { id: 'fdc20', genericName: 'Amoxicillin + Clavulanic Acid Tablet 625mg', category: 'adult', dosage: '500mg/125mg (1-0-1 after food)', duration: '5 days', keywords: 'moxkind-cv augmentin 625', minAge: 12, minWeight: 40 },
  { id: 'fdc21', genericName: 'Amoxicillin + Clavulanate Dry Syrup 228mg/5ml', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', keywords: 'moxkind-cv augmentin dry syrup', minAge: 1, maxAge: 12 },
  { id: 'fdc22', genericName: 'Cefixime + Ofloxacin', category: 'adult', dosage: '200mg/200mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc23', genericName: 'Ofloxacin + Ornidazole', category: 'adult', dosage: '200mg/500mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc24', genericName: 'Ofloxacin + Ornidazole (Syrup 50/125mg per 5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'fdc25', genericName: 'Ciprofloxacin + Tinidazole', category: 'adult', dosage: '500mg/600mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc26', genericName: 'Piperacillin + Tazobactam IV (Zosyn 4.5g)', category: 'adult', dosage: '4g/0.5g IV infusion over 30 mins 6-8 hourly', duration: '7 days', minAge: 18 },
  { id: 'fdc27', genericName: 'Cefoperazone + Sulbactam IV (Magnex 1.5g)', category: 'adult', dosage: '1g/0.5g IV every 12 hours', duration: '7 days', minAge: 12 },
  { id: 'fdc28', genericName: 'Ceftriaxone + Sulbactam IV (1.5g)', category: 'adult', dosage: '1g/0.5g IV once daily', duration: '7 days', minAge: 12 },
  { id: 'fdc29', genericName: 'Imipenem + Cilastatin IV', category: 'adult', dosage: '500mg/500mg IV 6 hourly', duration: '7 days', minAge: 18 },
  { id: 'fdc30', genericName: 'Levocetirizine + Montelukast', category: 'adult', dosage: '5mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15, minWeight: 40 },
  { id: 'fdc31', genericName: 'Levocetirizine + Montelukast (Syrup)', category: 'pediatric', dosage: '5ml (at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'fdc32', genericName: 'Fexofenadine + Montelukast', category: 'adult', dosage: '120mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15 },
  { id: 'fdc33', genericName: 'Formoterol + Budesonide (Foracort Inhaler)', category: 'all', dosage: '2 puffs (b.d. with mouth rinse)', duration: '30 days' },
  { id: 'fdc34', genericName: 'Salmeterol + Fluticasone (Seretide Inhaler)', category: 'all', dosage: '2 puffs (b.d.)', duration: '30 days' },
  { id: 'fdc35', genericName: 'Levosalbutamol + Ipratropium (Duolin Respules)', category: 'all', dosage: '1 respule neb (t.d.s)', duration: '5 days' },
  { id: 'fdc36', genericName: 'Ambroxol + Terbutaline + Guaifenesin (Expectorant)', category: 'adult', dosage: '10ml (t.d.s after food)', duration: '5 days', minAge: 12 },
  { id: 'fdc37', genericName: 'Dextromethorphan + Chlorpheniramine + Phenylephrine', category: 'adult', dosage: '5ml to 10ml (t.d.s)', duration: '5 days', minAge: 6 },
  { id: 'fdc38', genericName: 'Telmisartan + Amlodipine', category: 'adult', dosage: '40mg/5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc39', genericName: 'Telmisartan + Hydrochlorothiazide', category: 'adult', dosage: '40mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc40', genericName: 'Amlodipine + Atenolol', category: 'adult', dosage: '5mg/50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc41', genericName: 'Losartan + Hydrochlorothiazide', category: 'adult', dosage: '50mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc42', genericName: 'Sacubitril + Valsartan (ARNI)', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc43', genericName: 'Aspirin + Clopidogrel', category: 'adult', dosage: '75mg/75mg (0-1-0 after lunch)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc44', genericName: 'Rosuvastatin + Fenofibrate', category: 'adult', dosage: '10mg/160mg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'fdc45', genericName: 'Metformin + Glimepiride', category: 'adult', dosage: '500mg/1mg (1-0-1 before food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'fdc46', genericName: 'Metformin + Teneligliptin', category: 'adult', dosage: '500mg/20mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'fdc47', genericName: 'Metformin + Sitagliptin', category: 'adult', dosage: '500mg/50mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'fdc48', genericName: 'Metformin + Dapagliflozin', category: 'adult', dosage: '500mg/10mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'fdc49', genericName: 'Pregabalin + Methylcobalamin', category: 'adult', dosage: '75mg/1500mcg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'fdc50', genericName: 'Gabapentin + Methylcobalamin', category: 'adult', dosage: '300mg/500mcg (0-0-1 at night)', duration: '30 days', minAge: 18 },

  // ==========================================
  // 1.5 VACCINES, IMMUNOGLOBULINS & BIOLOGICALS
  // ==========================================
  { id: 'vac1', genericName: 'Purified Chick Embryo Cell Rabies Vaccine (PCECV / Rabipur / Abhayrab)', category: 'all', dosage: '0.5ml IM deltoid (Days 0, 3, 7, 14, 28 Essen) or 0.1ml ID (WHO 2-site Days 0, 3, 7, 28)', duration: 'Post-Exposure Prophylaxis', keywords: 'rabies anti rabies vaccine arv rabipur abhayrab indirab dog bite wound PEP' },
  { id: 'vac2', genericName: 'Human Rabies Immunoglobulin (HRIG 150 IU/ml - Rabigard / Berirab)', category: 'all', dosage: '20 IU/kg infiltrated thoroughly into and around Category III bite wounds on Day 0', duration: 'Stat Category III Rabies Exposure', keywords: 'hrig human rabies immunoglobulin rabigard berirab category III dog bite' },
  { id: 'vac3', genericName: 'Equine Rabies Immunoglobulin (ERIG 1000 IU/5ml - Equirab)', category: 'all', dosage: '40 IU/kg infiltrated thoroughly into and around Category III bite wounds (after skin test)', duration: 'Stat Category III Rabies Exposure', keywords: 'erig equine rabies immunoglobulin equirab category III bite wound' },
  { id: 'vac4', genericName: 'Tetanus Toxoid (TT) / Td Vaccine (0.5ml IM)', category: 'all', dosage: '0.5ml IM deltoid stat for dirty/contaminated wound prophylaxis', duration: 'Stat Wound Prophylaxis', keywords: 'tetanus toxoid tt td vaccine wound injury' },
  { id: 'vac5', genericName: 'Human Tetanus Immunoglobulin (HTIG 250 IU / 500 IU)', category: 'all', dosage: '250 IU (or 500 IU if >24h or heavy contamination) IM stat', duration: 'High-risk Tetanus Wound Prophylaxis', keywords: 'htig human tetanus immunoglobulin wound tetanus' },
  { id: 'vac6', genericName: 'Hepatitis B Vaccine (GeneVac-B / Engerix-B 20mcg/ml Adult)', category: 'adult', dosage: '1ml (20mcg) IM deltoid at 0, 1, and 6 months', duration: '3-Dose Schedule', keywords: 'hepatitis b vaccine engerix genevac b hbv', minAge: 18 },
  { id: 'vac7', genericName: 'Hepatitis B Vaccine Pediatric (10mcg/0.5ml)', category: 'pediatric', dosage: '0.5ml (10mcg) IM at birth, 1, and 6 months', duration: '3-Dose Schedule', keywords: 'hepatitis b pediatric vaccine hbv birth dose', maxAge: 18 },
  { id: 'vac8', genericName: 'Hepatitis B Immunoglobulin (HBIG 100 IU / 0.5ml)', category: 'all', dosage: '0.5ml IM stat within 12 hours of needle-stick or birth to HBsAg+ mother', duration: 'Post-Exposure Prophylaxis', keywords: 'hbig hepatitis b immunoglobulin needle stick perinatal' },
  { id: 'vac9', genericName: 'BCG Vaccine (Tuberculosis 0.05ml Intradermal)', category: 'pediatric', dosage: '0.05ml Intradermal left upper arm at birth', duration: 'Birth Dose', keywords: 'bcg vaccine tuberculosis birth intradermal', maxAge: 1 },
  { id: 'vac10', genericName: 'Bivalent Oral Polio Vaccine (bOPV Drops)', category: 'pediatric', dosage: '2 drops orally at birth, 6, 10, 14 weeks', duration: 'Routine Immunization', keywords: 'opv polio oral drops', maxAge: 5 },
  { id: 'vac11', genericName: 'Inactivated Polio Vaccine (Fractional IPV 0.1ml)', category: 'pediatric', dosage: '0.1ml Intradermal right upper arm at 6 and 14 weeks', duration: 'Routine Immunization', keywords: 'ipv inactivated polio vaccine fractional intradermal', maxAge: 5 },
  { id: 'vac12', genericName: 'Pentavalent Vaccine (DPT + Hep B + Hib)', category: 'pediatric', dosage: '0.5ml IM anterolateral thigh at 6, 10, 14 weeks', duration: 'Primary 3-Dose Series', keywords: 'pentavalent dpt hep b hib pediatric', maxAge: 5 },
  { id: 'vac13', genericName: 'Rotavirus Oral Vaccine (Rotasiil / Rotavac)', category: 'pediatric', dosage: '5 drops / 2.5ml orally at 6, 10, 14 weeks', duration: 'Primary Series', keywords: 'rotavirus rotasiil rotavac diarrhea oral vaccine', maxAge: 2 },
  { id: 'vac14', genericName: 'Pneumococcal Conjugate Vaccine (PCV14 / Prevenar-13 / Synflorix)', category: 'all', dosage: '0.5ml IM at 6, 14 weeks + booster at 9 months', duration: 'Primary + Booster', keywords: 'pcv pneumococcal prevenar synflorix pneumonia', maxAge: 5 },
  { id: 'vac15', genericName: 'Measles-Rubella (MR) / MMR Vaccine (Tresivac)', category: 'all', dosage: '0.5ml Subcutaneous at 9 months and 16-24 months', duration: '2-Dose Series', keywords: 'mr mmr tresivac measles mumps rubella', maxAge: 18 },
  { id: 'vac16', genericName: 'Typhoid Conjugate Vaccine (TCV - Typbar-TCV)', category: 'all', dosage: '0.5ml IM single dose at 6 months or older', duration: 'Single Dose', keywords: 'typhoid tcv typbar conjugate fever' },
  { id: 'vac17', genericName: 'Varicella Vaccine (Chickenpox - Variped)', category: 'all', dosage: '0.5ml Subcutaneous 2 doses 4-8 weeks apart (from 12 months)', duration: '2-Dose Series', keywords: 'varicella chickenpox variped vaccine' },
  { id: 'vac18', genericName: 'Hepatitis A Vaccine (Havrix / Avaxim 0.5ml)', category: 'all', dosage: '0.5ml IM 2 doses 6-12 months apart (from 12 months)', duration: '2-Dose Series', keywords: 'hepatitis a havrix avaxim vaccine' },
  { id: 'vac19', genericName: 'HPV Vaccine (Human Papillomavirus - Cervavac / Gardasil-9)', category: 'all', dosage: '0.5ml IM 2 doses (0, 6 months) for girls 9-14 years; 3 doses for >15 yrs', duration: 'Primary Series', keywords: 'hpv cervavac gardasil cervical cancer vaccine' },
  { id: 'vac20', genericName: 'Influenza Vaccine Quadrivalent (Fluarix / Vaxigrip Tetra)', category: 'all', dosage: '0.5ml IM annually before monsoon/winter', duration: 'Annual Booster', keywords: 'influenza flu fluarix vaxigrip tetra vaccine' },
  { id: 'vac21', genericName: 'Polyvalent Snake Venom Antiserum (ASV Lyophilized 10ml Vials)', category: 'all', dosage: '10 vials (100ml) reconstituted in 200ml Normal Saline IV infusion over 1 hour stat', duration: 'Emergency Envenomation Stat', keywords: 'asv anti snake venom antiserum snake bite' },

  // ==========================================
  // 1.8 OBSTETRIC, EMERGENCY & CLINICAL SPECIALTY REGIMENS
  // ==========================================
  { id: 'reg1', genericName: 'Magnesium Sulfate Pritchard Eclampsia Regimen (4g IV + 10g IM stat)', category: 'all', dosage: 'Loading 4g IV (20% 20ml over 10m) + 10g IM (5g 50% in each buttock with 1ml 2% Lignocaine); Maint 5g IM Q4H', duration: 'Eclampsia / Severe Preeclampsia Protocol', keywords: 'magnesium sulfate mgso4 pritchard eclampsia preeclampsia seizure pritchard' },
  { id: 'reg2', genericName: 'Magnesium Sulfate Zuspan Eclampsia Regimen (4g IV over 20m)', category: 'all', dosage: 'Loading 4g IV in 100ml NS over 20m; Maint 1g/hr to 2g/hr continuous IV infusion for 24h', duration: 'Eclampsia IV Protocol', keywords: 'magnesium sulfate mgso4 zuspan eclampsia preeclampsia' },
  { id: 'reg3', genericName: 'Mennon Lytic Cocktail Regimen (Chlorpromazine + Promethazine + Pethidine)', category: 'all', dosage: 'Chlorpromazine 50mg + Promethazine 50mg + Pethidine 100mg in 500ml 5% Dextrose IV drip', duration: 'Eclampsia Alternative Protocol', keywords: 'lytic cocktail mennon chlorpromazine promethazine pethidine eclampsia' },
  { id: 'reg4', genericName: 'Postpartum Hemorrhage (PPH) Step-Wise Protocol', category: 'all', dosage: 'Oxytocin 10U IM/IV -> Methergine 0.2mg IM -> Carboprost 250mcg IM -> Misoprostol 800mcg SL -> TXA 1g IV', duration: 'Acute PPH Emergency', keywords: 'pph postpartum hemorrhage oxytocin methergine carboprost misoprostol tranexamic acid' },
  { id: 'reg5', genericName: 'Organophosphate (OP) Poisoning Atropinization Protocol', category: 'all', dosage: 'Atropine 2mg IV Q5-10M (double dose up to 16mg if needed until atropinized: dry skin, HR>100, clear lungs) + Pralidoxime 2g IV', duration: 'OP Poisoning Protocol', keywords: 'atropine op poisoning organophosphate pralidoxime 2-pam atropinization' },
  { id: 'reg6', genericName: 'Snake Envenomation ASV National Protocol (10 Vials IV)', category: 'all', dosage: 'Polyvalent ASV 10 vials (100ml) reconstituted in 200ml NS IV over 1h stat; repeat 10 vials after 2h if 20WBCT delayed', duration: 'Emergency Snake Bite', keywords: 'asv snake bite anti snake venom polyvalent envenomation 20wbct' },
  { id: 'reg7', genericName: 'Paracetamol Poisoning NAC 21-Hour IV Protocol', category: 'all', dosage: 'NAC 150mg/kg in 200ml D5W over 1h -> 50mg/kg over 4h -> 100mg/kg over 16h', duration: '21-Hour Infusion Protocol', keywords: 'nac n-acetylcysteine paracetamol acetaminophen toxicity antidote 21 hour' },
  { id: 'reg8', genericName: 'Status Epilepticus 3-Step Emergency Protocol', category: 'all', dosage: 'Step 1 (0-5m): Lorazepam 4mg IV -> Step 2 (5-20m): Levetiracetam 60mg/kg IV or Fosphenytoin 20mg PE/kg IV -> Step 3: Propofol Infusion', duration: 'Status Epilepticus Protocol', keywords: 'status epilepticus seizure lorazepam levetiracetam fosphenytoin propofol' },
  { id: 'reg9', genericName: 'GIK Hyperkalemia Resuscitation Protocol', category: 'all', dosage: 'Calcium Gluconate 10ml 10% IV over 10m + 10U Regular Insulin in 50ml D50W IV over 20m + Salbutamol Nebulization', duration: 'Hyperkalemia Resuscitation', keywords: 'gik hyperkalemia insulin dextrose calcium gluconate potassium shift' },
  { id: 'reg10', genericName: 'NTEP Tuberculosis 2HRZE / 4HRE Fixed-Dose Combination Regimen', category: 'all', dosage: 'Intensive Phase: 2HRZE daily FDC for 2 months -> Continuation Phase: 4HRE daily FDC for 4 months', duration: '6 Months Anti-TB Protocol', keywords: 'tb tuberculosis ntep 2hrze 4hre isoniazid rifampicin pyrazinamide ethambutol' },

  // ==========================================
  // 2. EMERGENCY ROOM (ER), RESUSCITATION & ICU IV INJECTABLES
  // ==========================================
  { id: 'er1', genericName: 'Adrenaline / Epinephrine Injection (1:1000)', category: 'all', dosage: '0.5mg (0.5ml of 1:1000) IM anterolateral thigh', duration: 'Stat in Anaphylaxis' },
  { id: 'er2', genericName: 'Adrenaline / Epinephrine IV (1:10,000)', category: 'all', dosage: '1mg (10ml of 1:10,000) IV bolus every 3-5 mins', duration: 'Cardiac Arrest Protocol' },
  { id: 'er3', genericName: 'Noradrenaline / Norepinephrine IV Infusion', category: 'adult', dosage: '2-4 mcg/min IV infusion titrated to MAP > 65 mmHg', duration: 'Septic / Cardiogenic Shock', minAge: 18 },
  { id: 'er4', genericName: 'Dopamine Hydrochloride IV Infusion', category: 'adult', dosage: '5-10 mcg/kg/min IV in normal saline', duration: 'Inotropic Support', minAge: 18 },
  { id: 'er5', genericName: 'Dobutamine IV Infusion', category: 'adult', dosage: '2.5-15 mcg/kg/min IV infusion', duration: 'Cardiogenic Shock / Heart Failure', minAge: 18 },
  { id: 'er6', genericName: 'Atropine Sulfate Injection', category: 'all', dosage: '0.6mg to 1mg IV bolus (repeat up to 3mg max)', duration: 'Symptomatic Bradycardia / Organophosphate' },
  { id: 'er7', genericName: 'Amiodarone Hydrochloride IV', category: 'adult', dosage: '300mg IV bolus in 20ml D5W over 10 mins', duration: 'VF / Pulseless VT Protocol', minAge: 18 },
  { id: 'er8', genericName: 'Lidocaine / Lignocaine IV 2%', category: 'adult', dosage: '1 to 1.5 mg/kg IV bolus for ventricular arrhythmias', duration: 'Emergency Cardiac Care', minAge: 18 },
  { id: 'er9', genericName: 'Adenosine Injection', category: 'adult', dosage: '6mg rapid IV push followed by 20ml saline flush', duration: 'Paroxysmal SVT Stat', minAge: 18 },
  { id: 'er10', genericName: 'Vasopressin Injection', category: 'adult', dosage: '20-40 units IV bolus', duration: 'Refractory Septic Shock / Arrest', minAge: 18 },
  { id: 'er11', genericName: 'Hydrocortisone Sodium Succinate IV', category: 'all', dosage: '100mg to 200mg IV stat', duration: 'Acute Severe Asthma / Anaphylaxis' },
  { id: 'er12', genericName: 'Methylprednisolone Sodium Succinate IV', category: 'adult', dosage: '1g IV pulse infusion over 1 hour in 100ml NS', duration: 'Acute Spinal Trauma / Severe Pulse', minAge: 18 },
  { id: 'er13', genericName: 'Dexamethasone Sodium Phosphate IV', category: 'all', dosage: '8mg to 16mg IV stat', duration: 'Cerebral Edema / Airway Obstruction' },
  { id: 'er14', genericName: 'Calcium Gluconate Injection 10%', category: 'all', dosage: '10ml (1g) IV slow injection over 10 mins', duration: 'Hyperkalemia / Hypocalcemic Tetany' },
  { id: 'er15', genericName: 'Sodium Bicarbonate Injection 7.5%', category: 'all', dosage: '50ml (50 mEq) IV slow push', duration: 'Severe Metabolic Acidosis (pH < 7.1)' },
  { id: 'er16', genericName: 'Magnesium Sulfate Injection 50%', category: 'all', dosage: '4g to 5g IV slow infusion in 100ml D5W', duration: 'Eclampsia / Torsades de Pointes' },
  { id: 'er17', genericName: 'Potassium Chloride IV Concentrate (KCl)', category: 'all', dosage: '20 mEq in 500ml NS (infuse < 10 mEq/hr via pump)', duration: 'Severe Hypokalemia' },
  { id: 'er18', genericName: 'Unfractionated Heparin Sodium IV Injection', category: 'adult', dosage: '5000 units IV bolus followed by infusion', duration: 'Acute DVT / Pulmonary Embolism', minAge: 18 },
  { id: 'er19', genericName: 'Enoxaparin Sodium (LMWH Prefilled Syringe)', category: 'adult', dosage: '1mg/kg (60mg/0.6ml) Subcutaneous b.d.', duration: '7 days DVT / NSTEMI', minAge: 18 },
  { id: 'er20', genericName: 'Streptokinase Injection', category: 'adult', dosage: '1.5 Million Units IV infusion over 60 mins', duration: 'Acute STEMI Thrombolysis', minAge: 18 },
  { id: 'er21', genericName: 'Alteplase (recombinant tPA IV)', category: 'adult', dosage: '0.9 mg/kg IV (max 90mg; 10% bolus, rest over 60m)', duration: 'Acute Ischemic Stroke (<4.5 hrs)', minAge: 18 },
  { id: 'er22', genericName: 'Tenecteplase IV Injection', category: 'adult', dosage: '30mg to 50mg (0.5mg/kg) rapid single IV bolus', duration: 'Acute STEMI', minAge: 18 },
  { id: 'er23', genericName: 'Nitroglycerin (NTG) IV Infusion', category: 'adult', dosage: '5 to 10 mcg/min IV, titrate by 5 mcg/min', duration: 'Acute Angina / Pulmonary Edema', minAge: 18 },
  { id: 'er24', genericName: 'Sodium Nitroprusside IV Infusion', category: 'adult', dosage: '0.5 to 1.5 mcg/kg/min IV infusion with light cover', duration: 'Hypertensive Crisis', minAge: 18 },
  { id: 'er25', genericName: 'Esmolol Hydrochloride IV Injection', category: 'adult', dosage: '500 mcg/kg IV loading over 1 min', duration: 'Aortic Dissection / SVT', minAge: 18 },
  { id: 'er26', genericName: 'Labetalol Hydrochloride IV Injection', category: 'adult', dosage: '20mg IV slow push over 2 mins (repeat 40-80mg)', duration: 'Severe Hypertensive Emergency', minAge: 18 },
  { id: 'er27', genericName: 'Hydralazine Hydrochloride IV', category: 'adult', dosage: '10mg to 20mg IV slow push', duration: 'Eclampsia Hypertensive Crisis', minAge: 18 },
  { id: 'er28', genericName: 'Furosemide Injection (Lasix 20mg/2ml)', category: 'all', dosage: '40mg to 80mg IV slow push', duration: 'Acute Pulmonary Edema' },
  { id: 'er29', genericName: 'Phenytoin Sodium IV Injection', category: 'adult', dosage: '15-18 mg/kg IV in NS at rate < 50 mg/min', duration: 'Status Epilepticus Protocol', minAge: 12 },
  { id: 'er30', genericName: 'Levetiracetam IV Injection (500mg/5ml)', category: 'all', dosage: '1000mg to 1500mg IV in 100ml NS over 15 mins', duration: 'Status Epilepticus / Seizure' },
  { id: 'er31', genericName: 'Sodium Valproate IV Injection (500mg/5ml)', category: 'all', dosage: '20-30 mg/kg IV loading over 10 mins', duration: 'Status Epilepticus' },
  { id: 'er32', genericName: 'Midazolam Injection (5mg/5ml)', category: 'all', dosage: '5mg to 10mg IM/IV slow push', duration: 'Acute Seizure / Procedural Sedation' },
  { id: 'er33', genericName: 'Lorazepam IV Injection (2mg/ml)', category: 'all', dosage: '4mg IV slow push over 2 mins', duration: 'Status Epilepticus First-line' },
  { id: 'er34', genericName: 'Diazepam Injection (10mg/2ml)', category: 'all', dosage: '10mg IV slow push (or 0.5mg/kg Rectal Gel)', duration: 'Acute Seizure Stat' },

  // ==========================================
  // 3. ANESTHETICS, MUSCLE RELAXANTS & REVERSALS
  // ==========================================
  { id: 'an1', genericName: 'Propofol Injectable Emulsion 1%', category: 'all', dosage: '1.5 to 2.5 mg/kg IV slow induction', duration: 'General Anesthesia Induction' },
  { id: 'an2', genericName: 'Ketamine Hydrochloride Injection (50mg/ml)', category: 'all', dosage: '1 to 2 mg/kg IV or 4 to 10 mg/kg IM', duration: 'Dissociative Anesthesia / Analgesia' },
  { id: 'an3', genericName: 'Etomidate Injection (2mg/ml)', category: 'adult', dosage: '0.3 mg/kg IV slow push', duration: 'Hemodynamically Stable Induction', minAge: 18 },
  { id: 'an4', genericName: 'Thiopental Sodium IV Injection', category: 'adult', dosage: '3 to 5 mg/kg IV slow push', duration: 'General Anesthesia Induction', minAge: 18 },
  { id: 'an5', genericName: 'Sevoflurane Inhalation Anesthetic', category: 'all', dosage: '1% to 4% v/v vaporized with Oxygen/Nitrous', duration: 'Inhalational Anesthesia Maintenance' },
  { id: 'an6', genericName: 'Isoflurane Inhalation Anesthetic', category: 'all', dosage: '0.5% to 3% v/v inhalation', duration: 'General Anesthesia Maintenance' },
  { id: 'an7', genericName: 'Lignocaine / Lidocaine 2% Injection', category: 'all', dosage: 'Local infiltration (max 4.5 mg/kg without adrenaline)', duration: 'Local Anesthesia Procedure' },
  { id: 'an8', genericName: 'Lignocaine 2% + Adrenaline (1:200,000)', category: 'all', dosage: 'Local infiltration (max 7 mg/kg with epinephrine)', duration: 'Surgical Local Anesthesia' },
  { id: 'an9', genericName: 'Bupivacaine Hydrochloride 0.5% Heavy (Spinal)', category: 'adult', dosage: '2ml to 3.5ml (10-17.5mg) Intrathecal at L3-L4', duration: 'Subarachnoid Block / Spinal Anesthesia', minAge: 18 },
  { id: 'an10', genericName: 'Levobupivacaine 0.5% Injection', category: 'adult', dosage: '10ml to 20ml Epidural / Nerve Block', duration: 'Regional Anesthesia / Analgesia', minAge: 18 },
  { id: 'an11', genericName: 'Ropivacaine Hydrochloride 0.75%', category: 'adult', dosage: '15ml to 20ml Epidural block', duration: 'Surgical Epidural Anesthesia', minAge: 18 },
  { id: 'an12', genericName: 'Succinylcholine / Suxamethonium Chloride', category: 'all', dosage: '1 to 1.5 mg/kg IV rapid push', duration: 'Rapid Sequence Intubation (RSI)' },
  { id: 'an13', genericName: 'Rocuronium Bromide Injection', category: 'all', dosage: '0.6 to 1.2 mg/kg IV push', duration: 'Neuromuscular Blockade / Intubation' },
  { id: 'an14', genericName: 'Vecuronium Bromide Injection', category: 'all', dosage: '0.1 mg/kg IV push', duration: 'Surgical Muscle Relaxation' },
  { id: 'an15', genericName: 'Atracurium Besylate Injection', category: 'all', dosage: '0.3 to 0.6 mg/kg IV push', duration: 'Intermediate Muscle Relaxant' },
  { id: 'an16', genericName: 'Cisatracurium Besylate Injection', category: 'all', dosage: '0.15 mg/kg IV push', duration: 'Muscle Relaxation in Renal/Hepatic Failure' },
  { id: 'an17', genericName: 'Neostigmine Metilsulfate + Glycopyrrolate Injection', category: 'all', dosage: '2.5mg Neostigmine + 0.5mg Glycopyrrolate IV slow', duration: 'Neuromuscular Blockade Reversal' },
  { id: 'an18', genericName: 'Sugammadex Injection', category: 'adult', dosage: '2 to 4 mg/kg IV rapid push', duration: 'Rocuronium / Vecuronium Reversal', minAge: 18 },
  { id: 'an19', genericName: 'Naloxone Hydrochloride Injection', category: 'all', dosage: '0.4mg to 2mg IV/IM (repeat every 2-3 mins)', duration: 'Opioid Toxicity Reversal' },
  { id: 'an20', genericName: 'Flumazenil Injection', category: 'all', dosage: '0.2mg IV slow over 30 secs (max 1mg)', duration: 'Benzodiazepine Overdose Reversal' },
  { id: 'an21', genericName: 'Fentanyl Citrate Injection (50mcg/ml)', category: 'all', dosage: '1 to 2 mcg/kg IV slow push', duration: 'Intraoperative Surgical Analgesia' },
  { id: 'an22', genericName: 'Morphine Sulfate Injection (10mg/ml)', category: 'adult', dosage: '2mg to 5mg IV slow push (titrated to pain)', duration: 'Severe Pain / Acute Myocardial Infarction', minAge: 18 },
  { id: 'an23', genericName: 'Pethidine Hydrochloride Injection', category: 'adult', dosage: '50mg to 100mg IM/IV slow', duration: 'Post-operative Shivering / Pain', minAge: 18 },
  { id: 'an24', genericName: 'Dexmedetomidine IV Infusion', category: 'adult', dosage: '0.2 to 0.7 mcg/kg/hr IV infusion via pump', duration: 'ICU Sedation without Respiratory Depression', minAge: 18 },

  // ==========================================
  // 4. INJECTABLE ANTIBIOTICS & CRITICAL CARE ANTI-INFECTIVES
  // ==========================================
  { id: 'ab1', genericName: 'Ceftriaxone Sodium IV Injection', category: 'adult', dosage: '1g to 2g IV once daily (in 10ml sterile water)', duration: '7 days', minAge: 12 },
  { id: 'ab2', genericName: 'Ceftriaxone Sodium (Pediatric Vials 250mg/500mg)', category: 'pediatric', dosage: '50-75 mg/kg IV once daily', duration: '5 days', maxAge: 12 },
  { id: 'ab3', genericName: 'Ceftriaxone + Sulbactam Injection', category: 'adult', dosage: '1.5g (1g/0.5g) IV b.d.', duration: '7 days', minAge: 12 },
  { id: 'ab4', genericName: 'Cefoperazone + Sulbactam Injection (Magnex)', category: 'adult', dosage: '1.5g to 3g IV every 12 hours', duration: '7 days', minAge: 12 },
  { id: 'ab5', genericName: 'Piperacillin + Tazobactam IV (Zosyn 4.5g)', category: 'adult', dosage: '4.5g (4g/0.5g) IV infusion over 30 mins 6-8 hourly', duration: '7-14 days Severe Hospital-Acquired', minAge: 18 },
  { id: 'ab6', genericName: 'Meropenem IV Injection (1g)', category: 'adult', dosage: '1g IV infusion over 30 mins 8 hourly', duration: '7-14 days Severe Sepsis / Meningitis', minAge: 12 },
  { id: 'ab7', genericName: 'Meropenem (Pediatric 500mg Vial)', category: 'pediatric', dosage: '20 mg/kg IV 8 hourly', duration: '7 days', maxAge: 12 },
  { id: 'ab8', genericName: 'Imipenem + Cilastatin IV', category: 'adult', dosage: '500mg/500mg IV 6 hourly', duration: '7 days', minAge: 18 },
  { id: 'ab9', genericName: 'Ertapenem IV Injection', category: 'adult', dosage: '1g IV once daily', duration: '7 days', minAge: 18 },
  { id: 'ab10', genericName: 'Vancomycin Hydrochloride IV (1g)', category: 'adult', dosage: '1g IV slow infusion over 60 mins 12 hourly', duration: '7-14 days MRSA Protocol', minAge: 18 },
  { id: 'ab11', genericName: 'Teicoplanin IV Injection', category: 'adult', dosage: '400mg IV loading 12h x 3 doses, then daily', duration: '7-14 days Severe Gram-Positive', minAge: 18 },
  { id: 'ab12', genericName: 'Colistimethate Sodium (Colistin 3 MIU IV)', category: 'adult', dosage: '9 MIU IV loading dose, then 4.5 MIU 12 hourly', duration: '7-14 days MDR Gram-Negative / Pseudomonas', minAge: 18 },
  { id: 'ab13', genericName: 'Polymyxin B Sulfate IV Injection', category: 'adult', dosage: '500,000 units to 1 Million units IV 12 hourly', duration: '7-14 days Extreme Drug Resistance', minAge: 18 },
  { id: 'ab14', genericName: 'Amikacin Sulfate IV Injection (500mg)', category: 'adult', dosage: '15 mg/kg IV once daily slow infusion', duration: '7 days', minAge: 12 },
  { id: 'ab15', genericName: 'Gentamicin Sulfate IV Injection (80mg/2ml)', category: 'all', dosage: '5 mg/kg IV once daily slow infusion', duration: '5 days' },
  { id: 'ab16', genericName: 'Clindamycin Phosphate Injection (600mg)', category: 'adult', dosage: '600mg IV 8 hourly in 100ml NS', duration: '7 days Anaerobic / Soft Tissue', minAge: 12 },
  { id: 'ab17', genericName: 'Metronidazole IV Infusion (500mg/100ml)', category: 'all', dosage: '500mg/100ml IV infusion over 20 mins 8 hourly', duration: '5 days Intra-abdominal Sepsis' },
  { id: 'ab18', genericName: 'Fluconazole IV Infusion (200mg/100ml)', category: 'adult', dosage: '200mg to 400mg IV infusion once daily', duration: '7-14 days Systemic Candidiasis', minAge: 12 },
  { id: 'ab19', genericName: 'Amphotericin B Liposomal IV (50mg)', category: 'adult', dosage: '3 to 5 mg/kg IV infusion in D5W over 2 hours', duration: '14 days Severe Systemic Fungal', minAge: 12 },
  { id: 'ab20', genericName: 'Caspofungin Acetate IV Injection', category: 'adult', dosage: '70mg IV loading dose, then 50mg daily', duration: '14 days Invasive Candidiasis', minAge: 18 },

  // ==========================================
  // 5. DENTAL & DENTISTRY PREPARATIONS
  // ==========================================
  { id: 'dent1', genericName: 'Ketorolac Tromethamine 10mg Dispersible Tablet (Ketorol-DT)', category: 'adult', dosage: '1 tablet dissolved in 15ml water 3 times daily (max 5 days)', duration: '3 days', keywords: 'dental dentistry toothache teeth tooth pain dispersible ketorolac ketorol', minAge: 12 },
  { id: 'dent2', genericName: 'Amoxicillin 500mg + Clavulanic Acid 125mg (Moxkind-CV 625)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'dental dentistry tooth infection dental abscess teeth amoxicillin clavulanate', minAge: 12 },
  { id: 'dent3', genericName: 'Metronidazole 400mg Tablet (Flagyl Dental)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '5 days', keywords: 'dental dentistry anaerobic infection periapical abscess metronidazole flagyl', minAge: 12 },
  { id: 'dent4', genericName: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P Dental Pain)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'dental dentistry toothache pain relief aceclofenac paracetamol', minAge: 12 },
  { id: 'dent5', genericName: 'Chlorhexidine Gluconate 0.2% Mouthwash (Clohex / Rexidin 150ml)', category: 'all', dosage: 'Rinse with 10ml for 60 seconds twice daily post meals', duration: '7 days', keywords: 'dental mouthwash chlorhexidine oral rinse gingivitis post extraction' },
  { id: 'dent6', genericName: 'Povidone Iodine 1% Oral Gargle & Mouthwash', category: 'all', dosage: 'Dilute with equal warm water and gargle 3 times daily', duration: '5 days', keywords: 'dental mouthwash gargle povidone iodine oral infection' },
  { id: 'dent7', genericName: 'Triamcinolone Acetonide 0.1% Dental Paste (Kenacort Oral Paste)', category: 'all', dosage: 'Apply thin dab over mouth ulcer at bedtime', duration: '5 days', keywords: 'dental mouth ulcer stomatitis triamcinolone oral paste' },
  { id: 'dent8', genericName: 'Choline Salicylate + Lignocaine HCl Gel (Orajel / Mucopain)', category: 'all', dosage: 'Gently rub small amount on affected gum/ulcer 4 times daily', duration: '5 days', keywords: 'dental mouth gel ulcer pain toothache relief lignocaine' },
  { id: 'dent9', genericName: 'Potassium Nitrate 5% + Sodium Monofluorophosphate Sensitivity Toothpaste', category: 'all', dosage: 'Brush gently twice daily for 2 minutes', duration: '30 days', keywords: 'dental toothpaste sensitivity sensitive teeth potassium nitrate thermoseal' },

  // ==========================================
  // 6. GYNECOLOGY & OBSTETRICS (GYNAE & OBGYN)
  // ==========================================
  { id: 'gyn1', genericName: 'Dydrogesterone 10mg Tablet (Duphaston)', category: 'adult', dosage: '1 tablet twice daily from Day 11 to Day 25 of cycle', duration: '14 days', keywords: 'gynecology gynaecology gynae obgyn irregular periods endometriosis dydrogesterone duphaston', minAge: 15 },
  { id: 'gyn2', genericName: 'Progesterone 200mg SR Capsule (Susten / Macgest)', category: 'adult', dosage: '1 capsule at bedtime orally or vaginally', duration: '14 days', keywords: 'gynecology gynaecology gynae obgyn pregnancy support progesterone susten', minAge: 18 },
  { id: 'gyn3', genericName: 'Tranexamic Acid 500mg + Mefenamic Acid 250mg (Pause-MF)', category: 'adult', dosage: '1 tablet 3 times daily during heavy menstrual bleeding', duration: '4 days', keywords: 'gynecology gynaecology gynae obgyn heavy bleeding menorrhagia tranexamic mefenamic', minAge: 12 },
  { id: 'gyn4', genericName: 'Norethisterone 5mg Tablet (Primolut-N)', category: 'adult', dosage: '1 tablet 3 times daily starting 3 days before expected period', duration: '5 days', keywords: 'gynecology gynaecology gynae obgyn delay periods dysmenorrhea norethisterone primolut', minAge: 14 },
  { id: 'gyn5', genericName: 'Ferrous Ascorbate 100mg + Folic Acid 1.5mg (Orofer XT / Autrin)', category: 'adult', dosage: '1 tablet once daily after main meal', duration: '60 days', keywords: 'gynecology gynaecology gynae obgyn pregnancy anemia iron folic acid orofer', minAge: 12 },
  { id: 'gyn6', genericName: 'Isoxsuprine 40mg SR Tablet (Duvadilan SR)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '14 days', keywords: 'gynecology gynaecology gynae obgyn uterine relaxant isoxsuprine duvadilan dysmenorrhea', minAge: 18 },
  { id: 'gyn7', genericName: 'Cabergoline 0.5mg Tablet (Dostinex)', category: 'adult', dosage: '0.25mg twice weekly or 1mg single dose for lactation suppression', duration: 'Single dose / 2 weeks', keywords: 'gynecology gynaecology gynae obgyn cabergoline hyperprolactinemia lactation', minAge: 18 },
  { id: 'gyn8', genericName: 'Clomiphene Citrate 50mg Tablet (Fertomid)', category: 'adult', dosage: '1 tablet once daily for 5 days starting Day 2 of cycle', duration: '5 days', keywords: 'gynecology gynaecology gynae obgyn fertility ovulation clomiphene fertomid', minAge: 18 },
  { id: 'gyn9', genericName: 'Clotrimazole 100mg Vaginal Suppository (Candid V6)', category: 'adult', dosage: '1 vaginal tablet inserted high at bedtime for 6 consecutive nights', duration: '6 days', keywords: 'gynecology gynaecology gynae obgyn vaginal discharge candidiasis clotrimazole candid v', minAge: 18 },
  { id: 'gyn10', genericName: 'Clindamycin 100mg + Clotrimazole 100mg Vaginal Softgel Suppository', category: 'adult', dosage: '1 softgel inserted vaginally at bedtime for 7 nights', duration: '7 days', keywords: 'gynecology gynaecology gynae obgyn bacterial vaginosis vaginal candidiasis clindamycin clotrimazole', minAge: 18 },

  // ==========================================
  // 7. HEPATOLOGY & GASTROENTEROLOGY (LIVER, JAUNDICE & HEPATOPROTECTIVES)
  // ==========================================
  { id: 'hep1', genericName: 'Silymarin 140mg Tablet (Silybon / Hepamerz)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver jaundice silymarin silybon fatty liver hepatitis cirrhosis liver tonic', minAge: 12 },
  { id: 'hep2', genericName: 'Silymarin 70mg Syrup (Silybon 200ml)', category: 'all', dosage: '10ml 2 to 3 times daily after meals', duration: '30 days', keywords: 'hepatology hepato liver jaundice silymarin syrup silybon liver tonic' },
  { id: 'hep3', genericName: 'L-Ornithine L-Aspartate 500mg Tablet (LOLA / Hepamerz)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '15 days', keywords: 'hepatology hepato liver jaundice lola ornithine hepamerz hepatic encephalopathy cirrhosis ammonia', minAge: 12 },
  { id: 'hep4', genericName: 'Ursodeoxycholic Acid 300mg Tablet (UDCA / Ursocol 300)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver jaundice udca ursocol ursodeoxycholic gallstones cholestasis pbc fatty liver', minAge: 12 },
  { id: 'hep5', genericName: 'Ursodeoxycholic Acid 150mg Tablet (Ursocol 150)', category: 'all', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver udca ursocol ursodeoxycholic gallstones cholestasis' },
  { id: 'hep6', genericName: 'S-Adenosyl L-Methionine 400mg Tablet (SAMe / Cirrosam / Samlin)', category: 'adult', dosage: '1 tablet twice daily on empty stomach 1 hour before meals', duration: '30 days', keywords: 'hepatology hepato liver jaundice same adenosyl methionine cirrosam cholestasis alcoholic liver disease', minAge: 18 },
  { id: 'hep7', genericName: 'Metadoxine 500mg Tablet (Metadoxil)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver metadoxine metadoxil alcoholic liver disease steatosis fatty liver', minAge: 18 },
  { id: 'hep8', genericName: 'Essential Phospholipids 300mg Capsule (Essentiale L / Phosfal)', category: 'adult', dosage: '1 capsule 3 times daily after meals', duration: '30 days', keywords: 'hepatology hepato liver phospholipids essentiale fatty liver steatohepatitis', minAge: 12 },
  { id: 'hep9', genericName: 'L-Carnitine 500mg Tablet (Carnitor)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver l-carnitine carnitor hepatic steatosis fat metabolism', minAge: 12 },
  { id: 'hep10', genericName: 'Vitamin E 400 IU Capsule (Evion 400)', category: 'adult', dosage: '1 capsule once daily after lunch', duration: '60 days', keywords: 'hepatology hepato liver vitamin e evion nafld nash fatty liver antioxidant', minAge: 12 },
  { id: 'hep11', genericName: 'Pentoxifylline 400mg SR Tablet (Trental)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '28 days', keywords: 'hepatology hepato liver pentoxifylline severe alcoholic hepatitis trental', minAge: 18 },
  { id: 'hep12', genericName: 'Lactulose 10g/15ml Solution / Syrup (Duphalac / Heptalac 200ml)', category: 'all', dosage: '15ml to 30ml 2 to 3 times daily to produce 2-3 soft stools daily', duration: '30 days', keywords: 'hepatology hepato liver lactulose duphalac hepatic encephalopathy ammonia constipation', minAge: 1 },
  { id: 'hep13', genericName: 'Lactitol Monohydrate 66.67% Syrup (Looz Syrup 200ml)', category: 'all', dosage: '15ml twice daily after meals', duration: '30 days', keywords: 'hepatology hepato liver lactitol looz hepatic encephalopathy constipation', minAge: 1 },
  { id: 'hep14', genericName: 'Rifaximin 550mg Tablet (Rifagut 550 / Xifaxan)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '14 days', keywords: 'hepatology hepato liver rifaximin rifagut hepatic encephalopathy ibs-d gut decontamination', minAge: 12 },
  { id: 'hep15', genericName: 'Rifaximin 400mg Tablet (Rifagut 400)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '14 days', keywords: 'hepatology hepato liver rifaximin rifagut hepatic encephalopathy', minAge: 12 },
  { id: 'hep16', genericName: 'Propranolol 20mg Tablet (Inderal 20 / Ciplar)', category: 'adult', dosage: '1 tablet twice daily (titrate to heart rate 55-60 bpm)', duration: '60 days', keywords: 'hepatology hepato liver propranolol inderal portal hypertension esophageal varices bleeds', minAge: 18 },
  { id: 'hep17', genericName: 'Carvedilol 6.25mg Tablet (Cardivas / Cadell)', category: 'adult', dosage: '1 tablet twice daily', duration: '60 days', keywords: 'hepatology hepato liver carvedilol portal hypertension variceal bleeding prevention', minAge: 18 },
  { id: 'hep18', genericName: 'Spironolactone 50mg + Furosemide 20mg Tablet (Aldactazide / Lasilactone)', category: 'adult', dosage: '1 tablet once daily in the morning', duration: '30 days', keywords: 'hepatology hepato liver spironolactone furosemide lasilactone ascites edema cirrhosis diuretics', minAge: 18 },
  { id: 'hep19', genericName: 'Spironolactone 100mg Tablet (Aldactone 100)', category: 'adult', dosage: '1 tablet once daily in the morning', duration: '30 days', keywords: 'hepatology hepato liver spironolactone aldactone hepatic ascites edema', minAge: 18 },
  { id: 'hep20', genericName: 'Tenofovir Alafenamide 25mg Tablet (HepBest / Vemlidy)', category: 'adult', dosage: '1 tablet once daily with food', duration: '90 days', keywords: 'hepatology hepato liver tenofovir vemlidy hepbest hepatitis b hbv antiviral', minAge: 18 },
  { id: 'hep21', genericName: 'Tenofovir Disoproxil Fumarate 300mg Tablet (Tenvir)', category: 'adult', dosage: '1 tablet once daily', duration: '90 days', keywords: 'hepatology hepato liver tenofovir tenvir hepatitis b hbv antiviral', minAge: 18 },
  { id: 'hep22', genericName: 'Entecavir 0.5mg Tablet (Baraclude / Entavir)', category: 'adult', dosage: '1 tablet once daily on empty stomach 2 hours before or after meals', duration: '90 days', keywords: 'hepatology hepato liver entecavir entavir hepatitis b hbv antiviral', minAge: 18 },
  { id: 'hep23', genericName: 'Sofosbuvir 400mg + Velpatasvir 100mg Tablet (Sofosvel / Epclusa)', category: 'adult', dosage: '1 tablet once daily with or without food', duration: '84 days (12 weeks)', keywords: 'hepatology hepato liver sofosbuvir velpatasvir epclusa hepatitis c hcv pangenotypic antiviral', minAge: 18 },
  { id: 'hep24', genericName: 'Saroglitazar 4mg Tablet (Lipaglyn)', category: 'adult', dosage: '1 tablet once daily at bedtime', duration: '60 days', keywords: 'hepatology hepato liver saroglitazar lipaglyn non-alcoholic fatty liver disease nafld nash diabetic dyslipidemia', minAge: 18 },
  { id: 'hep25', genericName: 'Phytomenadione (Vitamin K1) 10mg Ampoule / Tablet', category: 'adult', dosage: '10mg slow IV / IM injection or 1 tablet daily', duration: '3 days', keywords: 'hepatology hepato liver vitamin k prothrombin time bleeding jaundice coagulopathy', minAge: 12 },

  // ==========================================
  // 8. PSYCHIATRY, NEUROLOGY, ANXIOLYTICS & SEDATIVES (USFDA & INDIAN PHARMACOPOEIA)
  // ==========================================
  { id: 'psych_alprax025', genericName: 'Alprazolam 0.25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime (0-0-1) or S.O.S for acute anxiety', duration: '5 days', keywords: 'alprazolam alprax restyl trika anxit benzodiazepine anxiety panic insomnia sedative', minAge: 18 },
  { id: 'psych_alprax050', genericName: 'Alprazolam 0.5mg Tablet', category: 'adult', dosage: '1 tablet at bedtime (0-0-1)', duration: '5 days', keywords: 'alprazolam alprax restyl trika anxit benzodiazepine anxiety panic sedative', minAge: 18 },
  { id: 'psych_clona025', genericName: 'Clonazepam 0.25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime (0-0-1)', duration: '7 days', keywords: 'clonazepam clonotril zapiz epitril petril benzodiazepine anxiety seizure panic insomnia', minAge: 18 },
  { id: 'psych_clona050', genericName: 'Clonazepam 0.5mg Tablet', category: 'adult', dosage: '1 tablet at bedtime (0-0-1)', duration: '7 days', keywords: 'clonazepam clonotril zapiz epitril petril benzodiazepine anxiety panic epilepsy', minAge: 18 },
  { id: 'psych_clona2', genericName: 'Clonazepam 2mg Tablet', category: 'adult', dosage: '1 tablet at bedtime or divided dose for seizure control', duration: '14 days', keywords: 'clonazepam clonotril zapiz epitril petril benzodiazepine epilepsy seizure', minAge: 18 },
  { id: 'psych_diaz5', genericName: 'Diazepam 5mg Tablet', category: 'adult', dosage: '1 tablet twice daily or at bedtime', duration: '5 days', keywords: 'diazepam valium calmpose benzodiazepine muscle relaxant anxiety spasms insomnia', minAge: 18 },
  { id: 'psych_lora1', genericName: 'Lorazepam 1mg Tablet', category: 'adult', dosage: '1 tablet at bedtime or twice daily', duration: '5 days', keywords: 'lorazepam ativan larpose benzodiazepine anxiety panic sedation catatonia', minAge: 18 },
  { id: 'psych_lora2', genericName: 'Lorazepam 2mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '5 days', keywords: 'lorazepam ativan larpose benzodiazepine severe anxiety panic sedation', minAge: 18 },
  { id: 'psych_cloba5', genericName: 'Clobazam 5mg Tablet', category: 'all', dosage: '1 tablet at bedtime', duration: '14 days', keywords: 'clobazam frisium cloba benzodiazepine epilepsy seizure adjunct' },
  { id: 'psych_cloba10', genericName: 'Clobazam 10mg Tablet', category: 'adult', dosage: '1 tablet twice daily or at bedtime', duration: '14 days', keywords: 'clobazam frisium cloba benzodiazepine epilepsy seizure adjunct', minAge: 12 },
  { id: 'psych_zolp5', genericName: 'Zolpidem 5mg Tablet', category: 'adult', dosage: '1 tablet strictly at bedtime', duration: '5 days', keywords: 'zolpidem zolfresh nitrest non-benzodiazepine hypnotic insomnia sleep aid', minAge: 18 },
  { id: 'psych_zolp10', genericName: 'Zolpidem 10mg Tablet', category: 'adult', dosage: '1 tablet strictly at bedtime', duration: '5 days', keywords: 'zolpidem zolfresh nitrest hypnotic severe insomnia sleep aid', minAge: 18 },
  { id: 'psych_chlordiaz10', genericName: 'Chlordiazepoxide 10mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily', duration: '7 days', keywords: 'chlordiazepoxide librium benzodiazepine alcohol withdrawal anxiety', minAge: 18 },
  { id: 'psych_esct10', genericName: 'Escitalopram 10mg Tablet', category: 'adult', dosage: '1 tablet once daily in morning or bedtime', duration: '30 days', keywords: 'escitalopram nexito cilentra ssri antidepressant anxiety gad panic depression', minAge: 18 },
  { id: 'psych_esct20', genericName: 'Escitalopram 20mg Tablet', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'escitalopram nexito cilentra ssri antidepressant major depression ocd', minAge: 18 },
  { id: 'psych_sert50', genericName: 'Sertraline 50mg Tablet', category: 'adult', dosage: '1 tablet once daily after breakfast', duration: '30 days', keywords: 'sertraline zoloft sertal ssri antidepressant ocd panic ptsd depression', minAge: 18 },
  { id: 'psych_fluox20', genericName: 'Fluoxetine 20mg Capsule', category: 'adult', dosage: '1 capsule once daily in morning', duration: '30 days', keywords: 'fluoxetine prozac fludac ssri antidepressant bulimia ocd depression', minAge: 18 },
  { id: 'psych_parox125', genericName: 'Paroxetine 12.5mg CR Tablet', category: 'adult', dosage: '1 tablet once daily at bedtime', duration: '30 days', keywords: 'paroxetine pexep cr ssri antidepressant anxiety panic social anxiety', minAge: 18 },
  { id: 'psych_dulox30', genericName: 'Duloxetine 30mg Capsule', category: 'adult', dosage: '1 capsule once daily', duration: '30 days', keywords: 'duloxetine duzela cymbalta snri neuropathic pain fibromyalgia depression', minAge: 18 },
  { id: 'psych_venla375', genericName: 'Venlafaxine 37.5mg ER Capsule', category: 'adult', dosage: '1 capsule once daily after food', duration: '30 days', keywords: 'venlafaxine venlor efexor snri antidepressant gad panic', minAge: 18 },
  { id: 'psych_amitr10', genericName: 'Amitriptyline 10mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '30 days', keywords: 'amitriptyline tryptomer tca neuropathic pain tension headache migraine prophylaxis sleep', minAge: 18 },
  { id: 'psych_amitr25', genericName: 'Amitriptyline 25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '30 days', keywords: 'amitriptyline tryptomer tca depression nerve pain nocturnal enuresis', minAge: 18 },
  { id: 'psych_olanz5', genericName: 'Olanzapine 5mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '30 days', keywords: 'olanzapine olanex oleanz atypical antipsychotic schizophrenia bipolar agitation', minAge: 18 },
  { id: 'psych_quet25', genericName: 'Quetiapine 25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '30 days', keywords: 'quetiapine qutan seroquel atypical antipsychotic sleep bipolar schizophrenia', minAge: 18 },
  { id: 'psych_risper1', genericName: 'Risperidone 1mg Tablet', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'risperidone respidon sizodon antipsychotic mania schizophrenia autism irritability', minAge: 18 },
  { id: 'psych_aripi5', genericName: 'Aripiprazole 5mg Tablet', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'aripiprazole asprito abilify atypical antipsychotic schizophrenia bipolar depression adjunct', minAge: 18 },
  { id: 'psych_leve500', genericName: 'Levetiracetam 500mg Tablet', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'levetiracetam levera torleva antiepileptic seizure focal tonic-clonic', minAge: 12 },
  { id: 'psych_valpr500', genericName: 'Sodium Valproate / Valproic Acid 500mg CR Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'valproate encorate chrono valparin antiepileptic seizure mania migraine prophylaxis', minAge: 12 },
  { id: 'psych_pheny100', genericName: 'Phenytoin 100mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '30 days', keywords: 'phenytoin eptoin dilantin antiepileptic seizure tonic-clonic', minAge: 12 },
  { id: 'psych_carba200', genericName: 'Carbamazepine 200mg CR Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'carbamazepine tegretol mazetol antiepileptic trigeminal neuralgia seizure bipolar', minAge: 12 },
  { id: 'psych_oxcarb300', genericName: 'Oxcarbazepine 300mg Tablet', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'oxcarbazepine trileptal oxetol antiepileptic focal seizure', minAge: 12 },
  { id: 'psych_gaba300', genericName: 'Gabapentin 300mg Capsule', category: 'adult', dosage: '1 capsule 3 times daily', duration: '30 days', keywords: 'gabapentin gabapin neurontin neuropathic pain postherpetic neuralgia restless legs', minAge: 18 },
  { id: 'psych_prega75', genericName: 'Pregabalin 75mg Capsule', category: 'adult', dosage: '1 capsule twice daily at bedtime', duration: '30 days', keywords: 'pregabalin maxgalin lyrica neuropathic pain diabetic neuropathy fibromyalgia gad', minAge: 18 },
  { id: 'psych_baclof10', genericName: 'Baclofen 10mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '14 days', keywords: 'baclofen lioresal baclof muscle relaxant spasticity spinal muscle spasm', minAge: 18 },
  { id: 'psych_tizan2', genericName: 'Tizanidine 2mg Tablet', category: 'adult', dosage: '1 tablet 3 times daily', duration: '7 days', keywords: 'tizanidine tizan sirdalud muscle relaxant muscle spasm back pain', minAge: 18 },
  { id: 'psych_thiocol4', genericName: 'Thiocolchicoside 4mg Capsule', category: 'adult', dosage: '1 capsule twice daily after meals', duration: '5 days', keywords: 'thiocolchicoside myoril thioquest muscle relaxant acute backache muscle spasm', minAge: 18 },
  { id: 'psych_hydro10', genericName: 'Hydroxyzine 10mg Tablet', category: 'all', dosage: '1 tablet twice daily or at bedtime', duration: '7 days', keywords: 'hydroxyzine atarax antihistamine anxiety itching sedation urticaria' },
  { id: 'psych_hydro25', genericName: 'Hydroxyzine 25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime', duration: '7 days', keywords: 'hydroxyzine atarax antihistamine severe anxiety itching urticaria sedation', minAge: 12 },
  { id: 'psych_prometh25', genericName: 'Promethazine 25mg Tablet', category: 'adult', dosage: '1 tablet at bedtime S.O.S', duration: '3 days', keywords: 'promethazine phenergan antihistamine motion sickness nausea sedation allergic reaction', minAge: 12 },
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
  {
    id: 'hepatology-gastro',
    name: 'Hepatology & Gastroenterology',
    templates: [
      {
        id: 'nafld-fatty-liver',
        name: 'Fatty Liver (NAFLD / NASH) Protocol',
        tests: [
          'USG Whole Abdomen',
          'LFT (Liver Function Test Full Panel)',
          'Lipid Profile (Full Panel)',
          'HbA1c (Glycated Hemoglobin)',
          'Fasting Blood Sugar (FBS)',
        ],
        advice: [
          'Low Fat & Low Carbohydrate Diet',
          'Daily 45-minute Brisk Walking / Aerobic Exercise',
          'Avoid Alcohol & Hepatotoxic OTC Medications',
          'Weight reduction goal 7-10% over 6 months',
        ],
        drugs: [
          'Silymarin 140mg Tablet (Silybon) (1-0-1 after food) x 30 days',
          'Ursodeoxycholic Acid 300mg Tablet (UDCA) (1-0-1 after food) x 30 days',
          'Vitamin E 400 IU Capsule (Evion) (0-1-0 after lunch) x 60 days',
          'Pantoprazole 40mg Tablet (1-0-0 30 mins B/F) x 14 days',
        ],
        notes: 'Advised repeat LFT and Ultrasound Abdomen after 3 months.',
      },
      {
        id: 'acute-hepatitis-jaundice',
        name: 'Acute Viral Hepatitis & Jaundice Protocol',
        tests: [
          'LFT (Liver Function Test Full Panel)',
          'Serum Bilirubin (Total, Direct & Indirect)',
          'SGOT / AST & SGPT / ALT',
          'HBsAg (Hepatitis B Surface Antigen)',
          'Anti-HCV (Hepatitis C Antibody)',
          'USG Abdomen & Pelvis',
          'PT / INR (Prothrombin Time)',
        ],
        advice: [
          'Strict Bed Rest for 10-14 days',
          'High Carbohydrate / Low Fat Light Diet (Boiled / Soft food)',
          'Avoid Oily & Spicy Foods, Heavy Proteins & Alcohol',
          'Adequate Hydration with Fresh Juices & Glucose Water',
        ],
        drugs: [
          'Silymarin 140mg Tablet (Silybon) (1-0-1 after food) x 30 days',
          'L-Ornithine L-Aspartate 500mg Tablet (LOLA) (1-0-1 after food) x 15 days',
          'Pantoprazole 40mg Tablet (1-0-0 30 mins B/F) x 14 days',
          'Ondansetron 4mg Tablet (1-0-1 S.O.S for Nausea/Vomiting) x 5 days',
        ],
        notes: 'Return immediately if drowsiness, severe vomiting, or dark urine worsens.',
      },
      {
        id: 'alcoholic-liver-disease',
        name: 'Alcoholic Liver Disease & Steatohepatitis',
        tests: [
          'LFT (Liver Function Test Full Panel)',
          'GGT (Gamma-Glutamyl Transferase)',
          'Serum Bilirubin & Albumin',
          'USG Whole Abdomen',
          'CBC & Platelet Count',
        ],
        advice: [
          'COMPLETE & STRICT ABSTINENCE FROM ALCOHOL',
          'High Protein / High Calorie Balanced Diet',
          'Multivitamin & B-Complex Supplementation',
        ],
        drugs: [
          'Silymarin 140mg Tablet (Silybon) (1-0-1 after food) x 30 days',
          'Metadoxine 500mg Tablet (Metadoxil) (1-0-1 after food) x 30 days',
          'S-Adenosyl L-Methionine 400mg Tablet (SAMe) (1-0-1 empty stomach) x 30 days',
          'Thiamine (Vitamin B1) 100mg Tablet (1-0-1 after food) x 30 days',
        ],
        notes: 'Referred to De-addiction Counseling & Monthly LFT monitoring.',
      },
    ],
  },
];

export interface ClinicalProtocol {
  id: string;
  title: string;
  category: 'emergency' | 'general' | 'pediatric' | 'gastro' | 'cardio' | 'respiratory' | 'infectious' | 'endocrine' | 'bites' | 'gynae' | 'ortho' | 'ent' | 'ophthalmology' | 'dermatology' | 'toxicology' | 'trauma';
  targetGroup: string;
  guidelinesSummary: string;
  redFlags: string;
  diagnosis: string;
  chiefComplaints: string[];
  drugs: string[];
  tests: string[];
  advice: string;
}

export const DEFAULT_CLINICAL_PROTOCOLS: ClinicalProtocol[] = [
  // ==========================================
  // 1. RABIES & ANIMAL BITES (🐾)
  // ==========================================
  {
    id: 'proto_animal_bite_cat1',
    title: 'Category I Animal Exposure Protocol (No Skin Break)',
    category: 'bites',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Exposure type: Touching, feeding, or licks on intact skin with no breaks. NO VACCINE OR RIG INDICATED according to WHO & NCDC Guidelines.',
    redFlags: 'Any hidden scratch or micro-abrasion on skin, rabid or unprovoked animal.',
    diagnosis: 'Category I Rabies Exposure (Intact Skin Exposure)',
    chiefComplaints: ['Exposure to animal (dog / cat / monkey) with intact skin contact', 'No visible scratch or bleeding'],
    drugs: [
      'Syp. Soap & Water Wound Wash thoroughly for 15 minutes',
      'Tab. Tetanus Toxoid 0.5ml IM (1 stat dose if >5 yrs since last dose)',
    ],
    tests: ['Clinical Inspection for Micro-scratches & Skin Integrity'],
    advice: 'Wash exposed skin area under running tap water with soap for 15 minutes. Re-examine closely under magnification for micro-scratches. Observe domestic animal for 10 days.',
  },
  {
    id: 'proto_animal_bite_cat2',
    title: 'Category II Animal Bite & Scratch Protocol (Minor Scratch/Nip)',
    category: 'bites',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Minor scratches or abrasions without bleeding. Immediate post-exposure prophylaxis (PEP) with Anti-Rabies Vaccine (ARV) on Days 0, 3, 7, 14, 28 (or WHO ID 2-site regimen on Days 0, 3, 7, 28). NO RIG needed unless immunocompromised.',
    redFlags: 'Oozing blood from scratch, bites on head/neck/fingers (automatically upgrades to Category III).',
    diagnosis: 'Category II Rabies Exposure (Minor Scratch / Abrasion)',
    chiefComplaints: ['Minor dog/cat scratch or nip without frank bleeding', 'Superficial skin abrasion'],
    drugs: [
      'Inj. Anti-Rabies Vaccine (PCECV / Rabipur / Abhayrab 0.5ml IM on Days 0, 3, 7, 14, 28)',
      'Inj. Tetanus Toxoid (TT) 0.5ml IM stat',
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 5 days',
      'Tab. Paracetamol 650mg (1-0-1 after food) S.O.S',
    ],
    tests: ['Wound Inspection & Tetanus Status Check'],
    advice: 'WASH WOUND WITH SOAP AND RUNNING WATER FOR AT LEAST 15 MINUTES IMMEDIATELY! Do not cover with tight bandage. Complete full 5-dose vaccine course on scheduled days.',
  },
  {
    id: 'proto_animal_bite_cat3',
    title: 'Category III Severe Animal Bite Protocol (Bleeding Wounds & Mucosal Exposure)',
    category: 'bites',
    targetGroup: 'All Ages (Weight-Based RIG Calculation)',
    guidelinesSummary: 'Transdermal bites/scratches with bleeding or any exposure to wild animals/bats/bites on face, neck, hands. MANDATORY RIG (Equine ERIG 40 IU/kg or Human HRIG 20 IU/kg) infiltrated into/around wounds PLUS 5-dose ARV schedule.',
    redFlags: 'Severe tissue laceration, bites on face/neck, heavy bleeding, delayed RIG administration.',
    diagnosis: 'Category III High-Risk Rabies Bite (Transdermal Laceration)',
    chiefComplaints: ['Dog / Cat / Animal bite with bleeding and skin laceration', 'Licks on broken skin or mucosa'],
    drugs: [
      'Inj. Equine Rabies Immunoglobulin ERIG 300 IU/ml (40 IU/kg infiltrated thoroughly in & around wounds on Day 0)',
      'Inj. Anti-Rabies Vaccine (Rabipur / Abhayrab 0.5ml IM on Days 0, 3, 7, 14, 28)',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1 after food) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
    ],
    tests: ['Wound Inspection & Weight-based RIG Infiltration Volume Calculation'],
    advice: 'WASH WOUND UNDER RUNNING TAP WATER WITH SOAP FOR 15-20 MINUTES STAT! Infiltrate entire calculated RIG dose into all wound margins. DO NOT SUTURE IMMEDIATELY (suturing increases rabies virus entry).',
  },
  {
    id: 'proto_animal_bite_stitching_dressing',
    title: 'Category III Bite Wound Laceration Care (RIG Infiltration, Dressing & Delayed Primary Closure)',
    category: 'bites',
    targetGroup: 'All Ages (Surgical Care)',
    guidelinesSummary: 'For severe gaping animal bite lacerations requiring closure: 1. Wash 15 mins with soap water & Povidone Iodine 10%. 2. Infiltrate RIG into wound margins FIRST. 3. Delay suturing by 24-48 hours if possible. 4. If suturing is essential for hemostasis/cosmesis, apply LOOSE APPOSITIONAL SUTURES ONLY after RIG infiltration. 5. Daily sterile Povidone Iodine non-adherent dressing.',
    redFlags: 'Tight primary closure without RIG infiltration (contraindicated!), wound infection, necrosis, purulent discharge.',
    diagnosis: 'Severe Animal Bite Laceration requiring Surgical Dressing & Delayed Apposition',
    chiefComplaints: ['Deep animal bite laceration requiring hemorrhage control, sterile dressing & apposition'],
    drugs: [
      'Inj. Equine Rabies Immunoglobulin ERIG 300 IU/ml (40 IU/kg infiltrated into wound base & edges BEFORE suturing)',
      'Inj. Anti-Rabies Vaccine (Rabipur 0.5ml IM on Days 0, 3, 7, 14, 28)',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Oint. Povidone Iodine 10% Ointment & Sterile Non-Adherent Gauze Dressing daily',
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
      'Tab. Metronidazole 400mg (1-0-1) x 5 days',
      'Tab. Paracetamol 650mg + Aceclofenac 100mg (1-0-1) S.O.S',
    ],
    tests: ['Wound Culture & Sensitivity if infected', 'X-Ray for underlying bone injury/foreign body'],
    advice: '1. Wash wound 15 mins under tap water. 2. Infiltrate RIG BEFORE any stitches! 3. Loose apposition sutures only after RIG infiltration. 4. Daily sterile dressing with Povidone Iodine. 5. Keep wound elevated.',
  },
  // ==========================================
  // 1.5 TOXICOLOGY & POISONING (🧪)
  // ==========================================
  {
    id: 'proto_tox_organophosphorus',
    title: 'Organophosphorus & Carbamate Pesticide Poisoning Protocol',
    category: 'toxicology',
    targetGroup: 'Adult & Pediatric Emergency',
    guidelinesSummary: 'Atropinization is LIFE SAVING! Administer Atropine 2-5mg IV push every 5-10 mins until chest is clear of rales and secretions dry. Give Pralidoxime (PAM) 1-2g IV slow infusion over 30 mins.',
    redFlags: 'Pinpoint pupils, profuse bronchorrhea, bronchospasm, cyanosis, muscle fasciculations, respiratory failure.',
    diagnosis: 'Organophosphorus Pesticide Poisoning (Acute Cholinergic Crisis)',
    chiefComplaints: ['Exposure/ingestion of pesticide / insecticide', 'Profuse salivation, sweating, vomiting & diarrhea', 'Breathlessness & wheezing'],
    drugs: [
      'Inj. Atropine Sulfate 2mg IV stat (repeat 2-5mg Q5-10 mins until atropinized: dry mouth, HR>100, clear chest)',
      'Inj. Pralidoxime Chloride (PAM 500mg) 1.5g IV in 100ml NS slow infusion over 30 mins',
      'Inj. Glycopyrrolate 0.2mg IV stat to reduce oral/tracheal secretions',
      'Inj. Pantoprazole 40mg IV stat',
      'Inj. Normal Saline 0.9% 500ml IV infusion',
    ],
    tests: ['Serum Cholinesterase Level', 'Arterial Blood Gas (ABG)', 'ECG 12-Lead', 'Chest X-Ray'],
    advice: 'IMMEDIATE GASTRIC LAVAGE WITH NS IF < 2 HOURS SINCE INGESTION (protect airway!). Decontaminate skin/hair with soap water. Shift to ICU for continuous atropine infusion.',
  },
  {
    id: 'proto_tox_snake_bite',
    title: 'Snake Bite Neurotoxic / Hemotoxic Envenomation Protocol',
    category: 'toxicology',
    targetGroup: 'All Ages (Emergency)',
    guidelinesSummary: 'Administer 10 vials of Polyvalent Anti-Snake Venom (ASV) reconstituted in 500ml NS IV over 1 hour stat if signs of envenomation (ptosis, neuro-paralysis, non-clotting blood, local swelling) present.',
    redFlags: 'Bilateral ptosis, respiratory muscle paralysis, 20-minute whole blood clotting test (20WBCT) non-clotting, compartment syndrome.',
    diagnosis: 'Acute Snake Bite Envenomation (Neurotoxic / Hemotoxic)',
    chiefComplaints: ['History of snake bite on extremity', 'Fang marks, localized severe pain & swelling', 'Drooping of eyelids (ptosis) / difficulty swallowing'],
    drugs: [
      'Inj. ASV (Polyvalent Anti-Snake Venom) 10 vials reconstituted in 500ml NS IV infusion over 1 hour stat',
      'Inj. Neostigmine 0.5mg + Inj. Atropine 0.6mg IV stat (for neurotoxic ptosis/paralysis test)',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Inj. Amoxicillin 500mg + Clavulanate 125mg IV stat',
      'Inj. Paracetamol 1000mg IV infusion S.O.S for pain',
    ],
    tests: ['20-Minute Whole Blood Clotting Test (20WBCT)', 'Prothrombin Time (PT/INR)', 'Serum Creatinine & Urine Output'],
    advice: 'KEEP BITTEN LIMB IMMOBILIZED WITH SPLINT AT HEART LEVEL! DO NOT CUT, SUCTION, OR APPLY TIGHT TOURNIQUET! Recheck 20WBCT after 6 hours.',
  },
  {
    id: 'proto_tox_celphos',
    title: 'Aluminium Phosphide (Celphos Grain Preservative) Poisoning Protocol',
    category: 'toxicology',
    targetGroup: 'Adult Emergency',
    guidelinesSummary: 'HIGH MORTALITY EMERGENCY! NO SPECIFIC ANTIDOTE! Gastric lavage with COCONUT OIL / LIQUID PARAFFIN stat (inhibits phosphine gas release). Intravenous Magnesium Sulfate + Soda Bicarbonate for refractory hypotension/arrhythmia.',
    redFlags: 'Garlic-like breath odor, severe refractory shock, metabolic acidosis, ventricular tachycardia.',
    diagnosis: 'Aluminium Phosphide (Celphos) Poisoning',
    chiefComplaints: ['Ingestion of Celphos / Aluminium Phosphide tablet', 'Severe epigastric pain, recurrent vomiting & garlic breath', 'Refractory BP drop'],
    drugs: [
      'Syp. Coconut Oil 100ml orally / via Ryles tube stat (lavage with Coconut Oil + Potassium Permanganate 1:10000)',
      'Inj. Magnesium Sulfate 50% 2g IV in 100ml D5W slow infusion over 30 mins stat (repeat Q4H x 24h)',
      'Inj. Sodium Bicarbonate 7.5% 50ml IV slow push for severe metabolic acidosis',
      'Inj. Pantoprazole 40mg IV stat',
      'Inj. Hydrocortisone 200mg IV stat',
    ],
    tests: ['ABG (Metabolic Acidosis)', 'ECG 12-Lead (Arrhythmia)', 'Serum Magnesium & Electrolytes'],
    advice: 'CRITICAL ICU CARE STAT! Do not use water alone for lavage as moisture accelerates phosphine gas liberation! Staff must wear protective masks.',
  },
  {
    id: 'proto_tox_paracetamol_overdose',
    title: 'Paracetamol (Acetaminophen) Acute Overdose Toxicity Protocol',
    category: 'toxicology',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'N-Acetylcysteine (NAC) is the SPECIFIC ANTIDOTE! Start NAC within 8 hours of toxic ingestion (>150 mg/kg or >7.5g total). Loading dose 140 mg/kg oral/IV followed by 70 mg/kg Q4H for 17 doses.',
    redFlags: 'Jaundice, right upper quadrant tenderness, INR > 2.0, encephalopathy, acute liver failure.',
    diagnosis: 'Acute Paracetamol Overdose Hepatotoxicity',
    chiefComplaints: ['Acute ingestion of >10-15 Paracetamol tablets (>7.5g)', 'Nausea, vomiting & anorexia', 'Abdominal discomfort'],
    drugs: [
      'Inj. N-Acetylcysteine (NAC 200mg/ml) 150 mg/kg IV in 200ml D5W over 1 hour (Loading), then 50 mg/kg over 4 hrs, then 100 mg/kg over 16 hrs',
      'Tab. Activated Charcoal 50g slurry orally within 2 hours of ingestion',
      'Inj. Ondansetron 4mg IV stat',
      'Inj. Pantoprazole 40mg IV stat',
    ],
    tests: ['Stat Serum Paracetamol Concentration (Rumack-Matthew Nomogram)', 'LFT (SGOT/SGPT, Bilirubin)', 'PT/INR & Kidney Function Test'],
    advice: 'Complete full 21-hour intravenous NAC antidote protocol regardless of initial symptoms if toxic dose ingested.',
  },
  {
    id: 'proto_tox_hydrocarbon',
    title: 'Kerosene & Hydrocarbon Ingestion OPD First Aid Protocol',
    category: 'toxicology',
    targetGroup: 'Pediatric & Adult',
    guidelinesSummary: 'GASTRIC LAVAGE AND INDUCED EMESIS ARE STRICTLY CONTRAINDICATED (high risk of chemical pneumonitis/aspiration!). High flow humidified O2, chest X-ray at 6h, observation for 24h.',
    redFlags: 'Tachypnea, intercostal retractions, fever, coughing fits, drowsiness, lung crepitations.',
    diagnosis: 'Hydrocarbon (Kerosene/Petrol) Ingestion & Chemical Pneumonitis Suspect',
    chiefComplaints: ['Accidental ingestion of kerosene / petrol / lamp oil', 'Coughing & choking during ingestion', 'Kerosene smell on breath'],
    drugs: [
      'Syp. Humidified Oxygen 4-6 L/min via facemask stat',
      'Inj. Amoxicillin 500mg + Clavulanate 125mg IV (if evidence of secondary pulmonary infection/pneumonitis)',
      'Inj. Hydrocortisone 100mg IV stat (if severe chemical airway spasm)',
      'Tab. Paracetamol 650mg S.O.S for fever',
    ],
    tests: ['Chest X-Ray PA View (at 6 hours post ingestion)', 'Pulse Oximetry (SpO2)'],
    advice: 'DO NOT CAUSE VOMITING! DO NOT GIVE MILK OR VEGETABLE OIL! Observe child in clinic/hospital for 24 hours for delayed chemical pneumonitis.',
  },
  {
    id: 'proto_tox_corrosive_acid_alkali',
    title: 'Acid / Alkali Corrosive Ingestion Protocol',
    category: 'toxicology',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'STRICTLY NPO! NO GASTRIC LAVAGE! NO NEUTRALIZING AGENTS (causes exothermic heat reaction & perforation!). IV PPI, IV fluids, early flexible upper GI endoscopy within 12-24 hours.',
    redFlags: 'Severe odynophagia, hematemesis, retrosternal pain, subcutaneous emphysema, peritoneal signs (perforation).',
    diagnosis: 'Corrosive (Acid/Toilet Cleaner) Ingestion & Esophagitis',
    chiefComplaints: ['Ingestion of toilet cleaner / acid / caustic soda', 'Severe burning pain in mouth, throat & stomach', 'Drooling of saliva'],
    drugs: [
      'Inj. Pantoprazole 40mg IV reconstituted slow push twice daily',
      'Inj. Ceftriaxone 1g IV once daily',
      'Inj. Tramadol 100mg IV in 100ml NS over 20 mins for severe esophageal pain',
      'Inj. Normal Saline 0.9% 1000ml IV maintenance infusion',
    ],
    tests: ['Emergency Upper GI Endoscopy (within 12-24h)', 'Chest & Abdomen X-Ray Erect (rule out pneumoperitoneum/pneumomediastinum)'],
    advice: 'KEEP ABSOLUTELY NPO! DO NOT GIVE WATER, MILK, OR VINEGAR! Urgent gastroenterology endoscopy consultation.',
  },
  {
    id: 'proto_tox_rodenticide',
    title: 'Rat Poison (Yellow Phosphorus / Warfarin Rodenticide) Protocol',
    category: 'toxicology',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Yellow phosphorus causes fulminant hepatic necrosis. Anticoagulant rodenticides cause delayed severe coagulopathy. Vitamin K1 (Phytomenadione) 10-20mg IV slow push + FFP if PT/INR prolonged.',
    redFlags: 'Spontaneous bleeding, purpura, melena, prolonged INR > 4.0, jaundice, encephalopathy.',
    diagnosis: 'Rodenticide (Rat Poison) Ingestion Coagulopathy / Hepatotoxicity',
    chiefComplaints: ['Ingestion of rat poison paste / powder / cake', 'Nausea, vomiting & epigastric pain', 'Bleeding gums / epistaxis'],
    drugs: [
      'Inj. Vitamin K1 (Phytomenadione 10mg/ml) 10mg to 20mg IV slow push stat (repeat Q8-12H as per INR)',
      'Tab. Activated Charcoal 50g slurry orally stat',
      'Inj. Pantoprazole 40mg IV twice daily',
      'Inj. Fresh Frozen Plasma (FFP) 2-4 units IV if active bleeding or INR > 5',
    ],
    tests: ['PT / INR (repeat daily for 5 days)', 'LFT (SGOT/SGPT, Bilirubin)', 'Stool Occult Blood'],
    advice: 'Monitor PT/INR daily for at least 5-7 days as superwarfarin rodenticides have long half-lives up to 30 days.',
  },
  {
    id: 'proto_tox_alcohol_intoxication',
    title: 'Acute Severe Alcohol Intoxication & Wernicke Prevention Protocol',
    category: 'toxicology',
    targetGroup: 'Adult',
    guidelinesSummary: 'GIVE THIAMINE 100-500mg IV BEFORE ANY DEXTROSE INFUSION to prevent precipitating acute Wernicke Encephalopathy! IV hydration with Normal Saline, antiemetics, airway protection.',
    redFlags: 'Stupor, coma, hypothermia, slow shallow respirations (<8/min), persistent hypoglycemia.',
    diagnosis: 'Acute Alcohol Intoxication & Hypoglycemia Risk',
    chiefComplaints: ['Heavy binge alcohol drinking', 'Altered sensorium, slurred speech & ataxia', 'Vomiting & lethargy'],
    drugs: [
      'Inj. Thiamine (Vitamin B1 100mg/2ml) 100mg IV slow push stat (BEFORE DEXTROSE!)',
      'Inj. Normal Saline 0.9% 1000ml IV rapid infusion',
      'Inj. Dextrose 25% 100ml IV stat (if blood sugar < 70 mg/dL AFTER Thiamine)',
      'Inj. Ondansetron 4mg IV stat',
      'Inj. Pantoprazole 40mg IV stat',
    ],
    tests: ['Stat Capillary Blood Glucose', 'Serum Electrolytes & Blood Alcohol Level', 'ABG'],
    advice: 'ALWAYS GIVE THIAMINE FIRST BEFORE DEXTROSE! Place patient in lateral recovery position to prevent vomit aspiration.',
  },
  {
    id: 'proto_tox_benzodiazepine_overdose',
    title: 'Benzodiazepine Overdose Emergency OPD Protocol',
    category: 'toxicology',
    targetGroup: 'Adult Emergency',
    guidelinesSummary: 'Airway protection & oxygenation. Specific antagonist Flumazenil 0.2mg IV slow push over 30 secs (max 1mg total). Use with caution in chronic BZD users to avoid withdrawal seizures.',
    redFlags: 'Deep coma, hypoventilation, respiratory arrest, co-ingestion with alcohol/opioids.',
    diagnosis: 'Acute Benzodiazepine Toxicity / Sedative Overdose',
    chiefComplaints: ['Ingestion of multiple sleeping pills / Alprazolam / Diazepam', 'Drowsiness, ataxia & unresponsiveness'],
    drugs: [
      'Inj. Flumazenil 0.2mg IV slow push over 30 seconds (repeat 0.1mg Q1 min up to 1mg max)',
      'Inj. Normal Saline 0.9% 500ml IV infusion',
      'Inj. Oxygen 6 L/min via facemask',
    ],
    tests: ['Continuous ECG & SpO2 Monitoring', 'Urine Toxicology Screen'],
    advice: 'Maintain open airway. If patient is chronic epileptic or chronic BZD user, do not give Flumazenil (risk of status epilepticus). Shift to ICU.',
  },
  {
    id: 'proto_tox_scorpion_sting',
    title: 'Scorpion Sting Envenomation & Myocardial Care Protocol',
    category: 'toxicology',
    targetGroup: 'Pediatric & Adult',
    guidelinesSummary: 'Oral Prazosin (alpha-1 blocker) 30 mcg/kg/dose stat is the SPECIFIC PHYSIOLOGICAL ANTIDOTE for Indian Red Scorpion sting envenomation! Local Lignocaine infiltration for severe pain.',
    redFlags: 'Profuse sweating, cold clammy extremities, priapism in young boys, pulmonary edema, hypertension followed by hypotension.',
    diagnosis: 'Indian Red Scorpion Sting Envenomation & Autonomic Storm',
    chiefComplaints: ['History of scorpion sting on extremity', 'Excruciating localized burning pain', 'Sweating, salivation & priapism'],
    drugs: [
      'Tab. Prazosin 0.5mg (30 mcg/kg) oral stat (repeat after 3 hours if needed)',
      'Inj. Lignocaine 2% Plain 2ml local ring block infiltration around sting site',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Tab. Paracetamol 650mg S.O.S',
    ],
    tests: ['ECG 12-Lead (Check for myocardial injury/arrhythmia)', 'Pulse Oximetry (SpO2)'],
    advice: 'GIVE PRAZOSIN STAT! Apply ice pack locally. DO NOT GIVE ANTIHISTAMINES OR ATROPINE (worsens autonomic storm!).',
  },

  // ==========================================
  // 1.8 TRAUMA, BURNS & ACCIDENTAL INJURIES (⚡)
  // ==========================================
  {
    id: 'proto_trauma_head_rta',
    title: 'Head Trauma & Road Traffic Accident (RTA) Emergency OPD Protocol',
    category: 'trauma',
    targetGroup: 'All Ages (Emergency Trauma)',
    guidelinesSummary: 'ATLS Principles: 1. Airway with C-Spine Collar. 2. Breathing + High Flow O2. 3. Circulation + IV Fluids. 4. Inj Mannitol 20% 100ml IV rapid for raised ICP. 5. Inj Tranexamic Acid 1g IV for bleeding. 6. STAT Non-Contrast CT Brain.',
    redFlags: 'GCS < 13, unequal pupils, vomiting > 2 episodes, post-traumatic seizure, CSF otorhea/rhinorrhea, retrograde amnesia > 30 mins.',
    diagnosis: 'Acute Head Injury & Traumatic Brain Injury (RTA)',
    chiefComplaints: ['Road traffic accident with blow to head', 'Loss of consciousness / vomiting / headache', 'Scalp laceration & bleeding'],
    drugs: [
      'Inj. Mannitol 20% 100ml IV rapid infusion over 20 mins stat (if signs of raised ICP/sluggish pupil)',
      'Inj. Tranexamic Acid 1g IV in 100ml NS over 10 mins stat',
      'Inj. Phenytoin Sodium 100mg/2ml (15 mg/kg IV loading in NS over 30 mins for seizure prophylaxis)',
      'Inj. Paracetamol 1000mg IV infusion for trauma pain',
      'Inj. Pantoprazole 40mg IV stat',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
    ],
    tests: ['Stat Non-Contrast CT Scan Brain & C-Spine', 'X-Ray Cervical Spine AP/Lateral', 'Hemoglobin & Blood Group Crossmatch'],
    advice: 'KEEP CERVICAL SPINE IMMOBILIZED WITH RIGID COLLAR! Keep head end elevated 30 degrees. NPO. Immediate neurosurgery consultation.',
  },
  {
    id: 'proto_trauma_thermal_burns',
    title: 'Thermal Flame & Hot Liquid Scald Burn Protocol',
    category: 'trauma',
    targetGroup: 'All Ages (Burn Care)',
    guidelinesSummary: 'PARKLAND FORMULA RESUSCITATION: 4 ml × Weight(kg) × %TBSA Burn of Ringer Lactate IV (Give 1/2 in first 8h, 1/2 in next 16h). Apply Silver Sulfadiazine 1% cream + sterile non-adherent dressing.',
    redFlags: 'Inhalation burn (facial burns, singed nasal hair, stridor), > 15% TBSA burns in adults (>10% in children), circumferential full-thickness limb burns.',
    diagnosis: 'Thermal Burn / Hot Liquid Scald Injury',
    chiefComplaints: ['Accidental flame / hot water / oil burn injury', 'Severe skin pain, redness, blisters & peeling'],
    drugs: [
      'Inj. Ringer Lactate 500ml IV rapid infusion (Resuscitation as per Parkland Formula)',
      'Oint. Silver Sulfadiazine 1% + Chlorhexidine Burn Cream (apply 2mm sterile layer daily)',
      'Inj. Tramadol 100mg IV in 100ml NS over 20 mins for burn pain',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
    ],
    tests: ['Total Body Surface Area (TBSA Rule of Nines Assessment)', 'Serum Electrolytes & Renal Function', 'Pulse Oximetry'],
    advice: 'COOL BURN AREA WITH CLEAN RUNNING TAP WATER FOR 20 MINUTES IMMEDIATELY! Do not break intact blisters. Do not apply toothpaste/ink/cow dung.',
  },
  {
    id: 'proto_trauma_electrocution',
    title: 'Electrocution & High-Voltage Electrical Injury Protocol',
    category: 'trauma',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'High risk of cardiac arrhythmias, occult deep tissue muscle necrosis, and acute kidney injury from Myoglobinuria! ECG 12-Lead monitoring + High Volume IV RL fluid resuscitation (keep urine output > 100 ml/hr).',
    redFlags: 'Ventricular fibrillation/cardiac arrest, loss of consciousness, dark port-wine urine (myoglobinuria), limb pulselessness (compartment syndrome).',
    diagnosis: 'Electrocution Injury & Electrical Burn',
    chiefComplaints: ['Accidental electric shock from high voltage wire / domestic appliance', 'Entry and exit contact burn wounds', 'Muscle pain & weakness'],
    drugs: [
      'Inj. Ringer Lactate 1000ml IV rapid infusion (target urine output 1-2 ml/kg/hr)',
      'Inj. Sodium Bicarbonate 7.5% 50ml IV in 500ml D5W (alkalinizes urine to prevent myoglobin precipitation)',
      'Inj. Furosemide 20mg IV stat (to maintain renal perfusion)',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Oint. Silver Sulfadiazine 1% Ointment on entry/exit wounds',
    ],
    tests: ['ECG 12-Lead (Continuous cardiac monitoring for 24h)', 'Urine Myoglobin & Routine', 'Serum Creatine Kinase (CK-MB/CPK)', 'KFT'],
    advice: 'MONITOR ECG FOR AT LEAST 24 HOURS! High voltage shock causes deep muscle damage not visible on skin surface. Keep fluid intake high.',
  },
  {
    id: 'proto_trauma_polytrauma_laceration',
    title: 'Polytrauma & Soft Tissue Laceration Accidental Injury Protocol',
    category: 'trauma',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Clean wound thoroughly with 500ml Normal Saline + Povidone Iodine 10%. Local Lignocaine 2% infiltration, primary suture closure with 3-0/4-0 Ethilon, oral Augmentin x 5-7 days + TT.',
    redFlags: 'Active arterial spurting blood, tendon laceration, motor/sensory nerve deficit, fracture underlying wound.',
    diagnosis: 'Accidental Soft Tissue Laceration & Contused Wound',
    chiefComplaints: ['Accidental fall / glass cut / sharp object injury', 'Bleeding gaping skin laceration'],
    drugs: [
      'Inj. Lignocaine 2% Plain 5ml local field block infiltration around wound',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
      'Tab. Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg (1-0-1) x 5 days',
      'Oint. Povidone Iodine 10% Ointment & Sterile Dressing',
    ],
    tests: ['Wound Inspection & Distal Neurovascular Status Check', 'X-Ray affected part if bone injury suspected'],
    advice: 'Keep wound clean and dry. Change sterile dressing every 48 hours. Suture removal on Day 7 to 10.',
  },
  {
    id: 'proto_trauma_concussion',
    title: 'Mild Traumatic Brain Injury (TBI) & Cerebral Concussion Protocol',
    category: 'trauma',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'GCS 14-15 with temporary confusion/amnesia following head impact. Neurological monitoring Q1H x 24h. Inj Emeset 4mg IV, Paracetamol 650mg. Avoid sedatives & NSAIDs (bleeding risk).',
    redFlags: 'Worsening headache, persistent vomiting, drowsiness, anisocoria, seizure, focal weakness.',
    diagnosis: 'Mild Cerebral Concussion / Post-Traumatic Syndrome',
    chiefComplaints: ['Head impact during sports / fall / minor collision', 'Brief dizziness, mild headache & single episode of nausea'],
    drugs: [
      'Tab. Paracetamol 650mg (1-0-1 after food) S.O.S for headache',
      'Tab. Ondansetron 4mg (1-0-1 before food) S.O.S for nausea',
      'Tab. Pantoprazole 40mg (1-0-0) x 5 days',
    ],
    tests: ['Non-Contrast CT Scan Brain (if high risk features present)', 'Neurological GCS Charting Q2H'],
    advice: 'STRICT PHYSICAL & COGNITIVE REST FOR 48 HOURS (NO SCREEN TIME!). Do not take sleeping pills or alcohol. Have family member wake patient Q2H at night.',
  },
  {
    id: 'proto_trauma_fracture_splinting',
    title: 'Closed Extremity Fracture & Joint Dislocation OPD First Aid Protocol',
    category: 'trauma',
    targetGroup: 'All Ages',
    guidelinesSummary: 'IMMEDIATE SPLINT IMMOBILIZATION ABOVE AND BELOW FRACTURE SITE! Analgesia with Inj Diclofenac 75mg IM, limb elevation, ice pack application, urgent orthopedics referral for X-Ray & casting.',
    redFlags: 'Open fracture (bone protruding skin), absent distal pulse (ischemia), progressive numbness, compartment syndrome.',
    diagnosis: 'Closed Limb Fracture / Joint Dislocation Suspect',
    chiefComplaints: ['Accidental fall / twist with severe limb pain', 'Deformity, swelling, bruising & inability to bear weight'],
    drugs: [
      'Inj. Diclofenac Sodium 75mg IM in gluteal region stat S.O.S',
      'Tab. Tramadol 50mg + Paracetamol 325mg (1-0-1 after food) x 5 days',
      'Tab. Pantoprazole 40mg (1-0-0) x 5 days',
      'Inj. Tetanus Toxoid 0.5ml IM (if minor skin abraded)',
    ],
    tests: ['X-Ray Limb AP & Lateral Views (including joint above and below)', 'Distal Pulse & Capillary Refill Check'],
    advice: 'IMMOBILIZE LIMB WITH P.O.P SLAB / SPLINT STAT! Keep limb elevated on 2 pillows. Apply ice packs wrapped in towel for 15 mins Q2H.',
  },
  {
    id: 'proto_trauma_blunt_abdomen',
    title: 'Blunt Abdominal Trauma & Splenic/Liver Injury Suspect Protocol',
    category: 'trauma',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'High risk of occult internal hemorrhage from splenic or liver laceration! KEEP NPO! FAST (Focused Assessment with Sonography for Trauma) Ultrasound stat + IV fluids + Serial Hb monitoring.',
    redFlags: 'Abdominal rigidity, rebound tenderness, hypotension (SBP < 90), tachycardia, Kehr sign (left shoulder pain from splenic bleed).',
    diagnosis: 'Blunt Abdominal Trauma & Intra-Abdominal Hemorrhage Suspect',
    chiefComplaints: ['Direct blow to abdomen / steering wheel impact / fall from height', 'Abdominal pain, distension & faintness'],
    drugs: [
      'Inj. Normal Saline 0.9% 1000ml IV rapid infusion',
      'Inj. Tranexamic Acid 1g IV in 100ml NS over 10 mins stat',
      'Inj. Pantoprazole 40mg IV stat',
      'Inj. Tramadol 100mg IV slow infusion for severe abdominal pain',
    ],
    tests: ['FAST Bedside Ultrasound Abdomen', 'Stat Hemoglobin & Hematocrit', 'Blood Grouping & Rh Typing', 'CT Abdomen Contrast (if stable)'],
    advice: 'KEEP ABSOLUTELY NPO! Insert Foley catheter for urine output monitoring. Immediate general surgery consultation.',
  },
  {
    id: 'proto_trauma_crush_injury',
    title: 'Compartment Syndrome & Extremity Crush Injury Protocol',
    category: 'trauma',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'Crush injury with heavy structural impact. High risk of COMPARTMENT SYNDROME (The 5 Ps: Pain out of proportion, Paresthesia, Pallor, Paralysis, Pulselessness). High volume IV RL fluids + Emergency Fasciotomy evaluation.',
    redFlags: 'Tense woody hard swelling of muscle compartment, severe pain on passive stretch of fingers/toes, pulselessness.',
    diagnosis: 'Crush Injury & Impending Compartment Syndrome',
    chiefComplaints: ['Limb crushed under heavy object / fallen wall', 'Severe muscle pain, tense swelling & numbness'],
    drugs: [
      'Inj. Ringer Lactate 1000ml IV rapid infusion (keep urine output > 100 ml/hr to prevent crush kidney failure)',
      'Inj. Diclofenac Sodium 75mg IM stat',
      'Inj. Ceftriaxone 1g IV stat',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
    ],
    tests: ['Compartment Pressure Measurement', 'Urine Myoglobin (Check for port-wine urine)', 'Serum CPK & Electrolytes (Potassium)'],
    advice: 'DO NOT ELEVATE LIMB ABOVE HEART LEVEL (decreases perfusion pressure!). DO NOT APPLY BANDAGE! Immediate orthopedic/vascular surgery consult for emergency fasciotomy.',
  },
  {
    id: 'proto_trauma_chemical_burn',
    title: 'Ocular & Cutaneous Chemical Burn Flushing Protocol',
    category: 'trauma',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'CONTINUOUS COPIOUS SALINE / WATER IRRIGATION FOR AT LEAST 30 MINUTES STAT! Test pH of eye/skin after flushing. Alkaline burns (caustic soda/lime) penetrate deeper than acid burns.',
    redFlags: 'Corneal haziness, limbal ischemia (blanched white eye), skin necrosis, loss of visual acuity.',
    diagnosis: 'Chemical Burn (Acid / Alkali Splash Injury)',
    chiefComplaints: ['Accidental chemical / acid / battery fluid splash into eye or skin', 'Severe burning pain & blurred vision'],
    drugs: [
      'Drops. Normal Saline 0.9% 1000ml continuous eye/skin flushing for 30-45 minutes',
      'Drops. Moxifloxacin 0.5% Eye Drops (1 drop 4 times daily)',
      'Drops. Carboxymethylcellulose 0.5% Eye Drops (1 drop Q2H)',
      'Oint. Silver Sulfadiazine 1% Cream (for skin chemical burns)',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
    ],
    tests: ['pH Indicator Paper Test of Conjunctival Sac (Target pH 7.0-7.4)', 'Slit Lamp Fluorescein Staining'],
    advice: 'IRRIGATE EYE IMMEDIATELY WITH CLEAN WATER FOR 30 MINUTES BEFORE COMING TO CLINIC! Keep eyelids held open during flushing. Urgent ophthalmology consult.',
  },
  {
    id: 'proto_trauma_blast_barotrauma',
    title: 'Blast Injury & Tympanic Membrane Perforation Protocol',
    category: 'trauma',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Acoustic shock/firecracker blast injury. Tympanic membrane perforation. KEEP EAR ABSOLUTELY DRY! DO NOT INSTILL ANY EAR DROPS! Oral Amoxiclav x 5 days to prevent secondary otitis media.',
    redFlags: 'Tinnitus, conductive hearing loss, vertigo, bloody otorrhea, temporal bone fracture.',
    diagnosis: 'Acoustic Trauma & Blast Tympanic Membrane Perforation',
    chiefComplaints: ['Exposure to loud explosion / firecracker blast', 'Sudden ear pain, ringing sound (tinnitus) & bloody ear discharge'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 5 days',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S for ear pain',
      'Tab. Betahistine 16mg (1-0-1) x 5 days for vertigo/tinnitus',
    ],
    tests: ['Otoscopy Examination of Tympanic Membrane', 'Pure Tone Audiometry (PTA)'],
    advice: 'KEEP EAR STRICTLY DRY! DO NOT PUT ANY EAR DROPS OR WATER IN EAR! Place cotton ball covered with vaseline in outer ear while bathing. ENT review in 4 weeks for spontaneous healing.',
  },
  {
    id: 'proto_snake_bite_firstaid',
    title: 'Snake Bite Emergency OPD First Aid & ASV Referral Protocol',
    category: 'bites',
    targetGroup: 'All Ages (Emergency)',
    guidelinesSummary: 'IMMOBILIZE LIMB WITH SPLINT! DO NOT CUT, SUCTION, OR APPLY TOURNIQUET! Immediate assessment for 20-minute Whole Blood Clotting Test (20WBCT), neurotoxicity, or hemotoxicity.',
    redFlags: 'Non-clotting blood (>20 mins), ptosis, diplopia, respiratory paralysis, dark urine (hemoglobinuria), hypotension.',
    diagnosis: 'Snake Bite Envenomation (Viperine / Elapid Risk)',
    chiefComplaints: ['Fang marks on limb with local swelling and severe pain', 'Bleeding from bite site or gums'],
    drugs: [
      'Inj. Polyvalent Anti-Snake Venom ASV 10 Vials (100ml in 200ml NS IV infusion over 1 hour if envenomated)',
      'Inj. Tetanus Toxoid 0.5ml IM stat',
      'Inj. Hydrocortisone 100mg IV + Inj Avil 1 ampoule IV (pre-ASV anaphylaxis prophylaxis)',
      'Inj. Normal Saline 0.9% 500ml IV Infusion',
    ],
    tests: ['20-Minute Whole Blood Clotting Test (20WBCT)', 'CBC, PT/INR, Urine Hemoglobin, Serum Creatinine'],
    advice: 'STRICT IMMOBILIZATION OF BITTEN LIMB. Do not walk or move limb. Transport to tertiary care ICU immediately if ASV is required.',
  },

  // ==========================================
  // 2. GYNAECOLOGY & OBSTETRICS (🤰)
  // ==========================================
  {
    id: 'proto_dysmenorrhea_gynae',
    title: 'Primary Dysmenorrhea & Heavy Menstrual Bleeding',
    category: 'gynae',
    targetGroup: 'Females (Adolescent & Adult)',
    guidelinesSummary: 'First-line therapy: NSAIDs (Mefenamic Acid / Dicyclomine) started at onset of micturition/bleeding. For heavy bleeding, add Tranexamic Acid.',
    redFlags: 'Severe unremitting pelvic pain, pelvic mass, high fever with foul vaginal discharge (PID signs), severe anemia.',
    diagnosis: 'Primary Dysmenorrhea / Menorrhagia',
    chiefComplaints: ['Severe spasmodic lower abdominal cramps during periods', 'Heavy menstrual bleeding with clots', 'Backache and fatigue'],
    drugs: [
      'Tab. Dicyclomine 20mg + Mefenamic Acid 500mg (1-1-1 after food) x 3 days during period',
      'Tab. Tranexamic Acid 500mg + Mefenamic Acid 250mg (1-1-1) during heavy bleeding days',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
      'Cap. Ferrous Ascorbate 100mg + Folic Acid 1.5mg (0-1-0 after lunch) x 1 month',
    ],
    tests: ['Pelvic Ultrasound (USG Abdomen & Pelvis)', 'Complete Blood Count (CBC / Hb%)', 'Ferritin'],
    advice: 'Apply warm heating pad over lower abdomen. Maintain adequate oral hydration. Rest during peak pain hours.',
  },
  {
    id: 'proto_vaginal_candidiasis',
    title: 'Vulvovaginal Candidiasis & Pelvic Inflammation',
    category: 'gynae',
    targetGroup: 'Adult Females',
    guidelinesSummary: 'Single-dose oral Fluconazole 150mg plus topical/vaginal antifungal cream. For bacterial vaginosis / mixed PID, add oral Metronidazole + Clindamycin.',
    redFlags: 'High fever, severe lower quadrant abdominal rebound tenderness, dyspareunia, cervical motion tenderness.',
    diagnosis: 'Vulvovaginal Candidiasis / Mild PID',
    chiefComplaints: ['Curdy white vaginal discharge', 'Intense vulvar itching and irritation', 'Dysuria and discomfort'],
    drugs: [
      'Tab. Fluconazole 150mg (1 stat dose oral)',
      'Oint. Clotrimazole 1% Vaginal Cream (1 applicator full inserted at bedtime) x 7 days',
      'Tab. Metronidazole 400mg (1-0-1 after food) x 7 days',
      'Cap. Clindamycin 300mg (1-0-1 after food) x 7 days',
    ],
    tests: ['Vaginal Swab Routine & Wet Mount', 'Urine Routine & Microscopy'],
    advice: 'Keep genital area clean and dry. Wear loose cotton undergarments. Avoid scented soaps/douches. Treat partner if symptomatic.',
  },
  {
    id: 'proto_antenatal_anemia',
    title: 'Antenatal Iron Deficiency Anemia Protocol',
    category: 'gynae',
    targetGroup: 'Pregnant Women (2nd & 3rd Trimester)',
    guidelinesSummary: 'Elemental iron 100-200mg daily plus Folic Acid 1.5mg. For Hb < 8g/dl after 20 weeks, IV Iron Sucrose infusion is indicated.',
    redFlags: 'Severe pallor, fatigue on minimal exertion, breathlessness at rest, fetal movement decrease.',
    diagnosis: 'Iron Deficiency Anemia in Pregnancy',
    chiefComplaints: ['Easy fatigability and weakness', 'Dizziness on standing', 'Pale conjunctiva and nail beds'],
    drugs: [
      'Tab. Ferrous Ascorbate 100mg + Folic Acid 1.5mg (1-0-1 after meals) x 3 months',
      'Inj. Iron Sucrose 100mg / 5ml IV Infusion in 100ml NS (if Hb < 8.5 g/dl)',
      'Tab. Calcium Carbonate 500mg + Vitamin D3 250 IU (1-0-0 taken 2 hours apart from Iron)',
    ],
    tests: ['Complete Blood Count (CBC)', 'Serum Ferritin', 'Peripheral Blood Smear (PBS)'],
    advice: 'Take iron tablet with Vitamin C rich juice (orange/lemon) for best absorption. Do not take iron with milk, tea, or calcium tablets.',
  },
  {
    id: 'proto_pcos_management',
    title: 'Polycystic Ovarian Syndrome (PCOS) OPD Protocol',
    category: 'gynae',
    targetGroup: 'Adolescent & Young Adult Females',
    guidelinesSummary: 'Lifestyle modification (weight loss 5-10%), Insulin sensitizers (Metformin 500mg BD), and Cyclic Myo-Inositol for ovulation regularisation.',
    redFlags: 'Severe acanthosis nigricans, sudden rapid weight gain, severe depression or emotional lability.',
    diagnosis: 'Polycystic Ovarian Syndrome (PCOS)',
    chiefComplaints: ['Irregular infrequent periods (oligomenorrhea)', 'Weight gain and difficulty losing weight', 'Acne and facial hirsutism'],
    drugs: [
      'Tab. Metformin 500mg SR (1-0-1 after meals) x 3 months',
      'Sachet Myo-Inositol 2000mg + D-Chiro Inositol 50mg (1 sachet in water BD) x 3 months',
      'Tab. Combined Oral Contraceptive Pill (Medroxyprogesterone 10mg from Day 16-25 if amenorrheic)',
    ],
    tests: ['USG Pelvis (Polycystic Ocular Morphology)', 'Fasting Insulin & Blood Sugar', 'LH/FSH Ratio, Serum Testosterone'],
    advice: 'Exercise 45 minutes daily (brisk walking/aerobics). Follow low glycemic index diet. Limit refined sugars & carbohydrates.',
  },
  {
    id: 'proto_gynae_pid',
    title: 'Pelvic Inflammatory Disease (PID) Outpatient Protocol',
    category: 'gynae',
    targetGroup: 'Adult Females',
    guidelinesSummary: 'Broad spectrum coverage for N. gonorrhoeae, C. trachomatis, and anaerobes: Inj Ceftriaxone 500mg IM stat + Doxycycline 100mg BD x 14 days + Metronidazole 400mg BD x 14 days.',
    redFlags: 'Tubo-ovarian abscess suspect, high fever > 38.3°C, peritoneal signs, pregnancy.',
    diagnosis: 'Acute Pelvic Inflammatory Disease (PID)',
    chiefComplaints: ['Lower abdominal and pelvic pain', 'Abnormal purulent cervical discharge', 'Dyspareunia & intermenstrual spotting'],
    drugs: [
      'Inj. Ceftriaxone 500mg IM single dose stat',
      'Cap. Doxycycline 100mg (1-0-1 after food) x 14 days',
      'Tab. Metronidazole 400mg (1-0-1 after food) x 14 days',
      'Tab. Pantoprazole 40mg (1-0-0) x 14 days',
    ],
    tests: ['High Vaginal Swab Culture & Gram Stain', 'Pelvic USG', 'CRP & ESR'],
    advice: 'Treat male sexual partner simultaneously. Abstain from sexual intercourse until completion of 14-day treatment course.',
  },
  {
    id: 'proto_gynae_aub',
    title: 'Abnormal Uterine Bleeding (AUB) Acute OPD Control Protocol',
    category: 'gynae',
    targetGroup: 'Perimenopausal & Adult Females',
    guidelinesSummary: 'Tranexamic Acid 500mg + Mefenamic Acid 250mg TDS during heavy flow plus Medroxyprogesterone acetate 10mg daily for endometrial stabilization.',
    redFlags: 'Hemodynamic instability (SBP < 90), Hb < 7g/dL, suspected endometrial carcinoma.',
    diagnosis: 'Abnormal Uterine Bleeding (AUB-L / AUB-E)',
    chiefComplaints: ['Prolonged irregular heavy menstrual bleeding (>8 days)', 'Passing large blood clots', 'Weakness & dizziness'],
    drugs: [
      'Tab. Tranexamic Acid 500mg + Mefenamic Acid 250mg (1-1-1 after food) x 5 days',
      'Tab. Medroxyprogesterone Acetate 10mg (1-0-1) x 10 days',
      'Cap. Ferrous Ascorbate 100mg + Folic Acid 1.5mg (1-0-1) x 30 days',
    ],
    tests: ['Pelvic USG Endometrial Thickness (ET)', 'Endometrial Biopsy (if age > 40 yrs)', 'CBC & Thyroid Profile'],
    advice: 'Track daily pad count. Take iron supplements with citrus fruits. Seek immediate emergency care if dizziness or fainting occurs.',
  },
  {
    id: 'proto_gynae_anc_1st_trimester',
    title: 'First Trimester Antenatal Care (ANC) & Morning Sickness Protocol',
    category: 'gynae',
    targetGroup: 'Pregnant Females (<12 Weeks)',
    guidelinesSummary: 'Folic Acid 5mg daily for neural tube defect prevention + Doxylamine 10mg + Pyridoxine 10mg for hyperemesis gravidarum.',
    redFlags: 'Vaginal bleeding / spotting (threatened abortion), severe unilateral lower abdominal pain (ectopic pregnancy), persistent hyperemesis.',
    diagnosis: 'First Trimester Uncomplicated Pregnancy',
    chiefComplaints: ['Amenorrhea x 6-8 weeks', 'Nausea, morning vomiting & breast tenderness', 'Fatigue'],
    drugs: [
      'Tab. Folic Acid 5mg (1-0-0 after breakfast) x first 12 weeks',
      'Tab. Doxylamine Succinate 10mg + Pyridoxine 10mg (0-0-1 bedtime) x 30 days S.O.S',
      'Tab. Ondansetron 4mg (1-0-0 morning before food) S.O.S',
    ],
    tests: ['Routine ANC Blood (Hb, ABO/Rh, HIV, HBsAg, VDRL, TSH, FBS)', 'USG Early Pregnancy Viability & NT Scan'],
    advice: 'Eat small frequent dry meals (biscuits/toast). Avoid spicy, greasy foods. Take Folic Acid strictly daily.',
  },
  {
    id: 'proto_gynae_mastitis',
    title: 'Lactational Mastitis & Breast Abscess Prevention Protocol',
    category: 'gynae',
    targetGroup: 'Lactating Mothers',
    guidelinesSummary: 'Dicloxacillin 500mg QDS or Cloxacillin 500mg QDS x 10 days for Staphylococcus aureus. Continue frequent breast emptying!',
    redFlags: 'Fluctuant tender mass (breast abscess requiring incision & drainage), high spiking fever with rigors, spreading erythema.',
    diagnosis: 'Acute Lactational Mastitis',
    chiefComplaints: ['Painful tender red wedge-shaped area on breast', 'High fever & chills', 'Difficulty breastfeeding'],
    drugs: [
      'Cap. Cloxacillin 500mg (1-1-1-1 empty stomach) x 10 days',
      'Tab. Paracetamol 650mg + Serratiopeptidase 15mg (1-0-1 after food) x 5 days',
      'Oint. Mupirocin 2% Ointment (apply on cracked nipple after feeding)',
    ],
    tests: ['Breast Ultrasound (rule out abscess)', 'Milk Culture & Sensitivity'],
    advice: 'CONTINUE BREASTFEEDING FROM BOTH BREASTS! Apply warm compresses before feeding and cold packs after feeding. Ensure proper infant latching.',
  },
  {
    id: 'proto_gynae_bacterial_vaginosis',
    title: 'Bacterial Vaginosis (BV) OPD Protocol',
    category: 'gynae',
    targetGroup: 'Adult Females',
    guidelinesSummary: 'Oral Metronidazole 500mg BD x 7 days or Clindamycin 300mg BD x 7 days. Amsel criteria: Fishy amine odor on 10% KOH Whiff test + clue cells.',
    redFlags: 'Pelvic pain, fever, pregnancy (BV increases preterm labor risk).',
    diagnosis: 'Bacterial Vaginosis',
    chiefComplaints: ['Thin homogeneous greyish-white vaginal discharge', 'Foul fishy vaginal odor worsening after intercourse'],
    drugs: [
      'Tab. Metronidazole 500mg (1-0-1 after food) x 7 days',
      'Oint. Clindamycin 2% Vaginal Cream (1 applicator full bedtime) x 7 days',
      'Cap. Lactic Acid Bacillus Capsules (1-0-1) x 10 days',
    ],
    tests: ['10% KOH Whiff Test', 'Vaginal Wet Mount (Clue Cells)'],
    advice: 'ABSTAIN FROM ALCOHOL DURING METRONIDAZOLE (causes severe disulfiram-like reaction). Avoid vaginal douching.',
  },
  {
    id: 'proto_gynae_menopause_hot_flashes',
    title: 'Menopausal Vasomotor Symptoms & Bone Care Protocol',
    category: 'gynae',
    targetGroup: 'Perimenopausal & Menopausal Females (>45 yrs)',
    guidelinesSummary: 'Non-hormonal therapy: Isoflavones / Soy Phytoestrogens + Gabapentin / SSRI (Paroxetine 10mg) for severe hot flashes, plus Calcium + Vitamin D3 + Alendronate for osteoporosis.',
    redFlags: 'Post-menopausal vaginal bleeding (mandatory endometrial biopsy!), sudden unilateral calf swelling (DVT risk).',
    diagnosis: 'Menopausal Vasomotor Syndrome & Osteopenia Risk',
    chiefComplaints: ['Sudden episodes of intense upper body heat & sweating (hot flashes)', 'Night sweats & insomnia', 'Joint aches & mood swings'],
    drugs: [
      'Tab. Soy Isoflavones 50mg + Calcium Carbonate 500mg + Vit D3 (1-0-1 after meals) x 3 months',
      'Tab. Gabapentin 100mg (0-0-1 bedtime) x 1 month (for night hot flashes)',
      'Tab. Alendronate 70mg (1 tablet once weekly on empty stomach with full glass water)',
    ],
    tests: ['DEXA Bone Mineral Density Scan', 'Mammography (Screening)', 'Transvaginal Pelvic USG'],
    advice: 'Wear layered breathable clothing. Exercise regularly. Drink plenty of water. Take Alendronate standing up and remain upright for 30 minutes.',
  },

  // ==========================================
  // 3. ORTHOPEDICS & JOINTS (🦴)
  // ==========================================
  {
    id: 'proto_low_back_pain_ortho',
    title: 'Acute Low Back Pain & Lumbar Radiculopathy',
    category: 'ortho',
    targetGroup: 'Adults (>18 yrs)',
    guidelinesSummary: 'Short-course oral NSAID + muscle relaxant (Thiocolchicoside) for acute pain, plus Pregabalin for radicular neuropathic pain.',
    redFlags: 'Cauda equina syndrome (saddle anesthesia, bowel/bladder incontinence), progressive lower limb weakness/foot drop, fever with spine tenderness.',
    diagnosis: 'Acute Lumbar Spondylosis / Disc Radiculopathy',
    chiefComplaints: ['Lower backache radiating to leg (sciatica)', 'Morning stiffness in lumbar region', 'Numbness in foot'],
    drugs: [
      'Tab. Aceclofenac 100mg + Thiocolchicoside 4mg (1-0-1 after food) x 5 days',
      'Cap. Pregabalin 75mg + Methylcobalamin 1500mcg (0-0-1 bedtime) x 10 days',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
      'Oint. Diclofenac 1.16% Gel (gentle local application 3 times daily)',
    ],
    tests: ['Digital X-Ray Lumbar Spine AP & Lateral', 'MRI Lumbar Spine (if radiculopathy persists)'],
    advice: 'Avoid forward bending and heavy weight lifting. Use hard mattress for sleeping. Start core lumbar strengthening exercises after acute pain subsides.',
  },
  {
    id: 'proto_osteoarthritis_knee',
    title: 'Knee Osteoarthritis & Degenerative Joint Pain',
    category: 'ortho',
    targetGroup: 'Elderly & Adults (>45 yrs)',
    guidelinesSummary: 'Etoricoxib 90mg for acute inflammatory flare, combined with Diacerein + Glucosamine for joint cartilage preservation and Calcium + Vit D3.',
    redFlags: 'Hot swollen erythematous joint (septic arthritis), joint deformity with inability to bear weight, locking of knee joint.',
    diagnosis: 'Bilateral Knee Osteoarthritis (Grade II/III)',
    chiefComplaints: ['Bilateral knee pain worsening on walking & climbing stairs', 'Crepitus and morning stiffness', 'Joint swelling'],
    drugs: [
      'Tab. Etoricoxib 90mg (1-0-0 after food) x 7 days',
      'Tab. Diacerein 50mg + Glucosamine 750mg (1-0-1 after food) x 1 month',
      'Cap. Calcium Carbonate 500mg + Vitamin D3 250 IU (1-0-0 after lunch) x 1 month',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
    ],
    tests: ['X-Ray Both Knees Weight Bearing AP & Lateral', 'Serum Uric Acid', 'ESR & CRP'],
    advice: 'Quadriceps isometric strengthening exercises 3 times daily. Avoid squatting and sitting on floor. Use knee cap support while walking.',
  },
  {
    id: 'proto_cervical_spondylosis',
    title: 'Cervical Spondylosis & Neck Pain Protocol',
    category: 'ortho',
    targetGroup: 'Adults (Desk Workers / Drivers)',
    guidelinesSummary: 'Short course NSAID + Muscle Relaxant (Chlorzoxazone / Aceclofenac) combined with Cervical Collar immobilization and posture training.',
    redFlags: 'Upper limb muscle wasting, hyperreflexia / spastic gait (cervical myelopathy), severe vertigo on head rotation.',
    diagnosis: 'Cervical Spondylosis / Muscle Spasm',
    chiefComplaints: ['Stiffness and pain in neck radiating to shoulders', 'Tension headache starting from occiput', 'Tingling in fingers'],
    drugs: [
      'Tab. Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg (1-0-1 after food) x 5 days',
      'Cap. Pregabalin 75mg + Methylcobalamin 1500mcg (0-0-1 bedtime) x 10 days',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
      'Oint. Diclofenac Topical Gel (gentle neck application t.d.s)',
    ],
    tests: ['X-Ray Cervical Spine AP & Lateral', 'MRI Cervical Spine (if severe radiculopathy)'],
    advice: 'Use thin firm pillow while sleeping. Avoid prolonged head flexion while using smartphone/laptop. Perform cervical isometric exercises daily.',
  },
  {
    id: 'proto_ortho_gout',
    title: 'Acute Gouty Arthritis & Hyperuricemia Protocol',
    category: 'ortho',
    targetGroup: 'Adults',
    guidelinesSummary: 'First-line acute attack: Indomethacin 50mg TDS or Etoricoxib 120mg OD + Colchicine 0.5mg BD. Start Febuxostat 40mg AFTER acute inflammation resolves.',
    redFlags: 'Septic arthritis suspect (fever, purulent joint fluid), renal failure.',
    diagnosis: 'Acute Gouty Arthritis (Podagra)',
    chiefComplaints: ['Sudden excruciating pain, swelling & redness of 1st Metatarsophalangeal (big toe) joint', 'Inability to touch or wear shoe'],
    drugs: [
      'Tab. Etoricoxib 120mg (1-0-0 after food) x 5 days',
      'Tab. Colchicine 0.5mg (1-0-1 after food) x 5 days',
      'Tab. Febuxostat 40mg (1-0-0 after food) x 1 month (start after acute pain settles)',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Serum Uric Acid (Target < 6.0 mg/dL)', 'X-Ray Affected Foot/Joint', 'Serum Creatinine'],
    advice: 'Avoid purine-rich foods (red meat, organ meats, shellfish, beer, high fructose corn syrup). Drink 3 Liters of water daily to prevent uric acid kidney stones.',
  },
  {
    id: 'proto_ortho_rheumatoid_arthritis',
    title: 'Rheumatoid Arthritis (RA) DMARD Protocol',
    category: 'ortho',
    targetGroup: 'Adults',
    guidelinesSummary: 'First-line DMARD: Methotrexate 15mg once weekly + Folic Acid 5mg (on non-methotrexate days) + Hydroxychloroquine 200mg BD + short bridging Prednisolone.',
    redFlags: 'Atlantoaxial subluxation (neck stiffness with myelopathy), rheumatoid vasculitis, pulmonary fibrosis.',
    diagnosis: 'Rheumatoid Arthritis (Seropositive)',
    chiefComplaints: ['Symmetrical small joint pain & swelling (MCP/PIP joints of hands)', 'Morning stiffness > 1 hour', 'Fatigue'],
    drugs: [
      'Tab. Methotrexate 15mg (TAKE ONCE WEEKLY ON SUNDAY AFTER MEAL)',
      'Tab. Folic Acid 5mg (1-0-0 on all days EXCEPT Sunday)',
      'Tab. Hydrohydroxychloroquine 200mg (1-0-1 after food) x 3 months',
      'Tab. Deflazacort 6mg (1-0-0 after food) x 14 days (bridging steroid)',
    ],
    tests: ['Rheumatoid Factor (RF)', 'Anti-CCP Antibodies', 'X-Ray Both Hands AP', 'LFT & CBC (Monthly for Methotrexate monitoring)'],
    advice: 'Take Methotrexate strictly ONCE A WEEK! Never take Folic Acid on Methotrexate day. Annual ophthalmology eye exam for Hydroxychloroquine.',
  },
  {
    id: 'proto_ortho_plantar_fasciitis',
    title: 'Plantar Fasciitis & Heel Spur Protocol',
    category: 'ortho',
    targetGroup: 'Adults',
    guidelinesSummary: 'Conservative therapy: Silicone heel cushion cups, plantar fascia stretching exercises, NSAID gel application, short course oral Aceclofenac + Chymoral Forte.',
    redFlags: 'Achilles tendon rupture, calcaneal stress fracture, tarsal tunnel syndrome.',
    diagnosis: 'Plantar Fasciitis / Calcaneal Spur',
    chiefComplaints: ['Sharp heel pain on taking first few steps in morning', 'Pain improves after walking but worsens by end of day'],
    drugs: [
      'Tab. Aceclofenac 100mg + Paracetamol 325mg (1-0-1 after food) x 7 days',
      'Tab. Trypsin Chymoral Forte (1-1-1 30 mins before meals) x 7 days',
      'Oint. Diclofenac Gel (apply over heel 3 times daily)',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['X-Ray Lateral View of Calcaneus Heel'],
    advice: 'Use soft MCR (Micro-Cellular Rubber) footwear or silicone heel cups. Perform calf muscle and plantar fascia towel stretch 3 times daily.',
  },
  {
    id: 'proto_ortho_ankle_sprain',
    title: 'Ankle Ligament Sprain & RICE Protocol',
    category: 'ortho',
    targetGroup: 'All Ages',
    guidelinesSummary: 'RICE Principles: Rest, Ice 15m Q2H, Compression with crepe bandage, Elevation. Oral NSAID + Serratiopeptidase x 5 days.',
    redFlags: 'Inability to bear weight for 4 steps (Ottawa Ankle Rule positive - fracture suspect), severe deformity.',
    diagnosis: 'Acute Lateral Ankle Ligament Sprain (Grade I/II)',
    chiefComplaints: ['Twisting injury to ankle during walking/sports', 'Pain, swelling & bruising over lateral malleolus'],
    drugs: [
      'Tab. Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg (1-0-1 after food) x 5 days',
      'Oint. Diclofenac Spray / Gel local application',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['X-Ray Ankle Joint AP & Lateral (Ottawa Ankle Rule)'],
    advice: 'APPLY R.I.C.E: Rest ankle, Ice packs 15 mins Q2H, Crepe bandage compression, Elevate foot on 2 pillows.',
  },
  {
    id: 'proto_ortho_tennis_elbow',
    title: 'Tennis Elbow (Lateral Epicondylitis) Protocol',
    category: 'ortho',
    targetGroup: 'Adults',
    guidelinesSummary: 'Forearm counterforce brace band + Topical NSAID gel + Eccentric wrist extensor strengthening + Short course oral NSAID.',
    redFlags: 'Radial tunnel syndrome, cervical radiculopathy C6/C7.',
    diagnosis: 'Lateral Epicondylitis (Tennis Elbow)',
    chiefComplaints: ['Pain over lateral outer aspect of elbow', 'Aggravated by gripping objects, twisting doorknobs or wringing clothes'],
    drugs: [
      'Tab. Etoricoxib 60mg (1-0-0 after food) x 7 days',
      'Oint. Diclofenac Gel (apply over lateral elbow twice daily)',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Clinical Cozen Test & Mill Test', 'X-Ray Elbow (rule out osteophytes)'],
    advice: 'Wear Tennis Elbow Counterforce Strap 2 inches below elbow joint during manual work. Apply ice pack for 10 mins post activity.',
  },
  {
    id: 'proto_ortho_frozen_shoulder',
    title: 'Frozen Shoulder (Adhesive Capsulitis) Protocol',
    category: 'ortho',
    targetGroup: 'Adults (Diabetic & Post-Trauma)',
    guidelinesSummary: 'Aggressive physical therapy (Codman pendulum exercises) + Oral NSAID + Short course oral Prednisolone or intra-articular steroid injection.',
    redFlags: 'Rotator cuff tear, shoulder dislocation, Pancoast tumor apical lung mass.',
    diagnosis: 'Adhesive Capsulitis (Frozen Shoulder Phase II)',
    chiefComplaints: ['Severe shoulder pain worsening at night', 'Global restriction of active & passive shoulder movements (abduction/rotation)'],
    drugs: [
      'Tab. Aceclofenac 100mg + Paracetamol 325mg (1-0-1 after food) x 10 days',
      'Tab. Prednisolone 20mg (1-0-0 after breakfast) x 7 days (taper down)',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['X-Ray Shoulder AP View', 'USG Shoulder / MRI (if rotator cuff tear suspected)', 'HbA1c (Strict Diabetes Control)'],
    advice: 'Perform Codman Pendulum exercises and Finger-Ladder wall crawling exercises 3 times daily. Keep blood sugar strictly controlled.',
  },
  {
    id: 'proto_ortho_osteoporosis',
    title: 'Postmenopausal & Senile Osteoporosis Protocol',
    category: 'ortho',
    targetGroup: 'Elderly (>60 yrs) & Postmenopausal',
    guidelinesSummary: 'Weekly Bisphosphonate (Alendronate 70mg) or Monthly Ibandronate 150mg + Daily Calcium 1000mg + Vitamin D3 60,000 IU weekly.',
    redFlags: 'Fragility compression fracture of vertebral spine, hip fracture after minor fall.',
    diagnosis: 'Severe Osteoporosis (T-Score < -2.5)',
    chiefComplaints: ['Diffuse bony aches and back pain', 'Loss of height / stooped posture', 'History of low-energy fall fracture'],
    drugs: [
      'Tab. Alendronate Sodium 70mg (1 tablet once weekly on empty stomach with 250ml water)',
      'Sachet Cholecalciferol (Vitamin D3 60,000 IU) 1 sachet in milk once weekly for 8 weeks',
      'Tab. Calcium Carbonate 1250mg (equiv 500mg elemental Ca) (1-0-1 after meals) x 3 months',
    ],
    tests: ['DEXA Bone Mineral Density (BMD) Scan', 'Serum Calcium, Phosphorus & Alkaline Phosphatase', 'Serum 25-OH Vitamin D'],
    advice: 'Take Alendronate on empty stomach with plain water. Stay upright (sitting/standing) for 30 minutes after taking. Fall prevention home safety.',
  },

  // ==========================================
  // 4. ENT (EAR NOSE THROAT) (👂)
  // ==========================================
  {
    id: 'proto_asom_ent',
    title: 'Acute Suppurative Otitis Media & Otitis Externa',
    category: 'ent',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Oral Amoxicillin-Clavulanate for 5-7 days plus ear drops containing antifungal/antibiotic (Ofloxacin + Clotrimazole). Keep ear dry.',
    redFlags: 'Mastoid tenderness/swelling, facial nerve palsy, vertigo, severe throbbing pain with sudden hearing loss.',
    diagnosis: 'Acute Otitis Media / Otitis Externa',
    chiefComplaints: ['Severe earache and throbbing pain', 'Ear discharge (otorrhea)', 'Hearing hardness and blocked ear feeling'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 5 days',
      'Drops. Ofloxacin 0.3% + Clotrimazole 1% Ear Drops (4 drops 3 times daily) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1 after food) S.O.S for ear pain',
      'Tab. Levocetirizine 5mg (0-0-1 bedtime) x 5 days for eustachian congestion',
    ],
    tests: ['Otoscopy Examination', 'Pure Tone Audiometry (if persistent)'],
    advice: 'STRICTLY KEEP EAR DRY! Do not put ear buds, oil, or water inside ear. Cover ear with cotton while taking bath.',
  },
  {
    id: 'proto_allergic_rhinitis_ent',
    title: 'Allergic Rhinitis & Acute Sinusitis Protocol',
    category: 'ent',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Combination Montelukast + Levocetirizine with Fluticasone steroid nasal spray. Add short course oral decongestant for acute blockage.',
    redFlags: 'Periorbital swelling/redness, severe unilateral facial pain with high fever, neck stiffness, double vision.',
    diagnosis: 'Allergic Rhinosinusitis',
    chiefComplaints: ['Paroxysmal sneezing & clear nasal discharge', 'Nasal blockage & facial heaviness', 'Itching in nose and throat'],
    drugs: [
      'Tab. Montelukast 10mg + Levocetirizine 5mg (0-0-1 at bedtime) x 10 days',
      'Drops. Fluticasone Furoate 27.5mcg Nasal Spray (2 puffs each nostril once daily) x 14 days',
      'Drops. Xylometazoline 0.1% Nasal Drops (2 drops each nostril twice daily MAX 5 DAYS)',
      'Syp. Steam Inhalation & Saline Nasal Rinse twice daily',
    ],
    tests: ['Absolute Eosinophil Count (AEC)', 'CT Scan Paranasal Sinuses (PNS) if chronic'],
    advice: 'Avoid dust, pollen, cold food, and air conditioner draft. Do not use Xylometazoline nasal drops for more than 5 days to prevent rebound congestion.',
  },
  {
    id: 'proto_bppv_vertigo',
    title: 'BPPV & Acute Peripheral Vertigo Protocol',
    category: 'ent',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'Repositioning maneuvers (Epley Maneuver for Posterior Canal BPPV) plus short-term vestibular suppressants (Cinnarizine / Betahistine 16mg TDS).',
    redFlags: 'Central neurological signs (dysarthria, ataxia, vertical nystagmus, diplopia, cranial nerve palsy).',
    diagnosis: 'Benign Paroxysmal Positional Vertigo (BPPV)',
    chiefComplaints: ['Sudden spinning sensation (vertigo) triggered by head movement', 'Nausea and unsteadiness', 'Tinnitus'],
    drugs: [
      'Tab. Betahistine Hydrochloride 16mg (1-1-1 after food) x 7 days',
      'Tab. Cinnarizine 25mg (1-0-1 after food) S.O.S for acute spinning',
      'Tab. Ondansetron 4mg (1-0-1 before food) S.O.S for nausea',
    ],
    tests: ['Dix-Hallpike Test', 'Otoscopy', 'Pure Tone Audiometry'],
    advice: 'Perform Epley Maneuver as instructed by physician. Avoid sudden jerking head movements. Sit down immediately if spinning begins.',
  },
  {
    id: 'proto_ent_tonsillitis',
    title: 'Acute Streptococcal Tonsillopharyngitis Protocol',
    category: 'ent',
    targetGroup: 'Pediatric & Adult',
    guidelinesSummary: 'Centor Criteria for Strep Pharyngitis: Amoxicillin-Clavulanate 625mg BD x 7 days or Azithromycin 500mg OD x 5 days + Chlorhexidine gargle.',
    redFlags: 'Peritonsillar abscess (Quinsy: trismus, hot potato voice, uvula deviation), stridor, drooling.',
    diagnosis: 'Acute Streptococcal Tonsillitis',
    chiefComplaints: ['Severe throat pain & odynophagia (painful swallowing)', 'High fever & chills', 'Swollen neck lymph nodes'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
      'Tab. Paracetamol 650mg + Aceclofenac 100mg (1-0-1 after food) x 5 days',
      'Syp. Chlorhexidine 0.2% Antiseptic Gargle (15ml gargle 3 times daily) x 7 days',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Throat Swab Culture & Sensitivity', 'Rapid Antigen Detection Test (RADT) for Group A Strep'],
    advice: 'Gargle with warm salt water 4 times daily. Soft warm liquids. Complete full 7-day antibiotic course.',
  },
  {
    id: 'proto_ent_otomycosis',
    title: 'Otomycosis (Fungal Ear Infection) Protocol',
    category: 'ent',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Thorough ear canal debridement/aural toilet + Clotrimazole 1% Ear Drops 4 drops TDS x 10 days. NO TOPICAL ANTIBIOTICS OR STEROIDS!',
    redFlags: 'Necrotizing (malignant) otitis externa in diabetic patients, cranial nerve VII palsy.',
    diagnosis: 'Otomycosis (Aspergillus / Candida Ear Infection)',
    chiefComplaints: ['Intense ear itching and discomfort', 'Wet black/white wet-cotton ear discharge', 'Decreased hearing'],
    drugs: [
      'Drops. Clotrimazole 1% Ear Drops (4 drops in ear 3 times daily) x 10 days',
      'Tab. Levocetirizine 5mg (0-0-1 bedtime) x 5 days',
      'Tab. Paracetamol 650mg S.O.S for ear pain',
    ],
    tests: ['Otoscopy (Wet cotton wool appearance)', 'Fungal KOH Mount of Ear Debris'],
    advice: 'KEEP EAR ABSOLUTELY DRY! Do not put hairpins, cotton buds, or water in ear. ENT micro-suctioning required.',
  },
  {
    id: 'proto_ent_csom',
    title: 'Chronic Suppurative Otitis Media (CSOM Tubotympanic) Protocol',
    category: 'ent',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Dry ear toilet + Topical Ciprofloxacin 0.3% ear drops 4 drops TDS x 14 days + Oral Ciprofloxacin for acute purulent flare.',
    redFlags: 'Atticoantral disease (cholesteatoma), vertigo, facial weakness, intracranial abscess suspect.',
    diagnosis: 'CSOM (Safe / Tubotympanic Type)',
    chiefComplaints: ['Recurrent profuse non-foul ear discharge', 'Central tympanic membrane perforation', 'Hearing impairment'],
    drugs: [
      'Drops. Ciprofloxacin 0.3% Ear Drops (4 drops 3 times daily after ear wiping) x 14 days',
      'Tab. Ciprofloxacin 500mg (1-0-1 after food) x 7 days',
      'Tab. Levocetirizine 5mg (0-0-1 bedtime) x 7 days',
    ],
    tests: ['Pure Tone Audiometry (PTA)', 'Otoscopy', 'X-Ray Mastoid / HRCT Temporal Bone'],
    advice: 'STRICT DRY EAR PRECAUTIONS PERMANENTLY! Plan for Tympanoplasty surgical closure of perforation.',
  },
  {
    id: 'proto_ent_epistaxis',
    title: 'Epistaxis (Nosebleed) OPD First Aid Protocol',
    category: 'ent',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Trotter Method: Sit forward, pinch soft anterior nasal septum for 10-15 mins. Topical Oxymetazoline nasal spray + anterior nasal packing if bleeding continues.',
    redFlags: 'Massive posterior bleeding into pharynx, uncorrected hypertension (BP > 180/110), bleeding diathesis / hemophilia.',
    diagnosis: 'Anterior Epistaxis (Kiesselbach Plexus Bleeding)',
    chiefComplaints: ['Spontaneous bleeding from one or both nostrils', 'Nasal dryness'],
    drugs: [
      'Drops. Oxymetazoline 0.05% Nasal Spray (2 puffs in bleeding nostril to constrict vessels)',
      'Oint. Mupirocin 2% Nasal Ointment (apply inside anterior nares BD) x 7 days',
      'Tab. Tranexamic Acid 500mg (1-1-1 after food) x 3 days',
      'Tab. Telmisartan 40mg (if BP elevated)',
    ],
    tests: ['Nasal Endoscopy', 'BP Check', 'CBC, PT/INR, Bleeding Time (BT/CT)'],
    advice: 'PINCH SOFT NOSE FOR 15 MINS CONTINUOUSLY WHILE LEANING FORWARD! Do not blow nose or pick nose. Avoid hot spicy food.',
  },
  {
    id: 'proto_ent_wax_impaction',
    title: 'Impacted Cerumen (Ear Wax) Softening & Irrigation Protocol',
    category: 'ent',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Cerumenolytic ear drops (Paradichlorobenzene + Benzocaine + Turpentine Oil) 4 drops TDS x 5 days followed by warm saline ear syringing.',
    redFlags: 'Perforated tympanic membrane history (syringing CONTRAINDICATED!), acute severe ear infection.',
    diagnosis: 'Impacted Cerumen Ear Wax',
    chiefComplaints: ['Sudden ear blockage after bath', 'Conductive hearing loss & ear fullness', 'Mild ear discomfort'],
    drugs: [
      'Drops. Paradichlorobenzene + Benzocaine + Chlorbutol Wax Dissolving Drops (4 drops TDS) x 5 days',
      'Tab. Paracetamol 500mg S.O.S',
    ],
    tests: ['Otoscopy Examination'],
    advice: 'Instill wax softening drops for 5 days before coming for ear syringing/micro-suctioning. DO NOT use ear buds.',
  },
  {
    id: 'proto_ent_laryngitis',
    title: 'Acute Viral Laryngitis & Hoarseness Protocol',
    category: 'ent',
    targetGroup: 'Adults',
    guidelinesSummary: 'STRICT VOICE REST + Steam inhalation + Hydration. Avoid unnecessary antibiotics for acute viral vocal cord inflammation.',
    redFlags: 'Stridor, dyspnea, hoarseness lasting > 3 weeks (rule out vocal cord malignancy/polyp).',
    diagnosis: 'Acute Viral Laryngitis',
    chiefComplaints: ['Sudden onset hoarseness / loss of voice', 'Dry irritating throat tickle & cough'],
    drugs: [
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Syp. Steam Inhalation with Eucalyptus Oil 3 times daily',
      'Syp. Chlorhexidine 0.2% Mouthwash Gargle twice daily',
      'Tab. Pantoprazole 40mg (1-0-0) (for LPR reflux laryngitis component)',
    ],
    tests: ['Indirect Laryngoscopy / Video Laryngoscopy (if > 3 weeks)'],
    advice: 'STRICT VOICE REST! Do not whisper (whispering strains vocal cords more than normal speech). Avoid alcohol and smoking.',
  },
  {
    id: 'proto_ent_sinusitis_acute',
    title: 'Acute Bacterial Rhinosinusitis (ABRS) Protocol',
    category: 'ent',
    targetGroup: 'Adults',
    guidelinesSummary: 'Symptoms lasting > 10 days: Amoxicillin-Clavulanate 625mg BD x 7 days + Fluticasone nasal spray + Steam inhalation.',
    redFlags: 'Orbital cellulitis, severe frontal headache with fever (Pott puffy tumor / epidural abscess).',
    diagnosis: 'Acute Bacterial Rhinosinusitis',
    chiefComplaints: ['Purulent nasal discharge & nasal congestion', 'Facial pressure/pain over cheekbones & forehead', 'Fever & hyposmia'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 7 days',
      'Drops. Fluticasone Furoate Nasal Spray (2 puffs daily) x 14 days',
      'Tab. Aceclofenac 100mg + Paracetamol 325mg (1-0-1) x 5 days',
      'Syp. Saline Nasal Spray / Rinse (2 puffs 4 times daily)',
    ],
    tests: ['X-Ray PNS Water View', 'CT PNS (if recurrent)'],
    advice: 'Perform steam inhalation 3 times daily. Complete full 7-day antibiotic course.',
  },

  // ==========================================
  // 5. OPHTHALMOLOGY (👁️)
  // ==========================================
  {
    id: 'proto_bacterial_conjunctivitis_ophth',
    title: 'Acute Bacterial Conjunctivitis & Ocular Redness',
    category: 'ophthalmology',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Topical broad-spectrum fluoroquinolone eye drops (Moxifloxacin 0.5%) 4 times daily plus lubricating drops and night ointment.',
    redFlags: 'Severe ocular pain, corneal haze/ulcer, sluggish pupil, marked drop in visual acuity, ciliary flush.',
    diagnosis: 'Acute Bacterial Conjunctivitis',
    chiefComplaints: ['Redness in both eyes', 'Mucopurulent discharge & morning eyelid sticking', 'Foreign body sensation'],
    drugs: [
      'Drops. Moxifloxacin 0.5% Eye Drops (1 drop in affected eye 4 times daily) x 7 days',
      'Oint. Tobramycin 0.3% Eye Ointment (apply small strip inside lower lid at bedtime) x 7 days',
      'Drops. Carboxymethylcellulose 0.5% Lubricating Eye Drops (1 drop 4 times daily) x 14 days',
    ],
    tests: ['Slit Lamp Examination', 'Visual Acuity Testing'],
    advice: 'Wash hands frequently. Do not rub eyes. Use separate clean towels. Discontinue contact lens wear until full recovery.',
  },
  {
    id: 'proto_dry_eye_ophth',
    title: 'Dry Eye Syndrome & Allergic Ocular Irritation',
    category: 'ophthalmology',
    targetGroup: 'Adults (Screen Users / Elderly)',
    guidelinesSummary: 'Preservative-free lubricating tear drops (Carboxymethylcellulose / Sodium Hyaluronate) combined with anti-allergic Olopatadine eye drops.',
    redFlags: 'Corneal ulceration, severe photophobia, sudden blurry vision.',
    diagnosis: 'Dry Eye Disease / Allergic Conjunctivitis',
    chiefComplaints: ['Burning, dryness & grittiness in eyes', 'Eye fatigue after computer screen work', 'Mild redness and tearing'],
    drugs: [
      'Drops. Carboxymethylcellulose 0.5% Lubricating Eye Drops (1 drop 4 to 6 times daily) x 1 month',
      'Drops. Olopatadine 0.1% Anti-allergic Eye Drops (1 drop twice daily) x 14 days',
    ],
    tests: ['Schirmer Test', 'Tear Break-Up Time (TBUT)', 'Slit Lamp Exam'],
    advice: 'Follow 20-20-20 rule during screen use (every 20 mins look 20 feet away for 20 seconds). Wear protective glasses outdoors.',
  },
  {
    id: 'proto_ophth_corneal_abrasion',
    title: 'Corneal Abrasion & Foreign Body Removal Protocol',
    category: 'ophthalmology',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Foreign body removal under topical Proparacaine 0.5% + Moxifloxacin 0.5% eye drops QID + Eye patching / Bandage contact lens.',
    redFlags: 'Corneal infiltrates (fungal/bacterial corneal ulcer), metallic ring, intraocular foreign body.',
    diagnosis: 'Corneal Abrasion / Superficial Foreign Body',
    chiefComplaints: ['Sudden sharp eye pain after dust/welding/branch impact', 'Profuse tearing & extreme photophobia'],
    drugs: [
      'Drops. Moxifloxacin 0.5% Eye Drops (1 drop 4 times daily) x 7 days',
      'Drops. Carboxymethylcellulose 0.5% Eye Drops (1 drop Q2H)',
      'Oint. Tobramycin 0.3% Eye Ointment (nightly)',
      'Tab. Paracetamol 650mg S.O.S for eye pain',
    ],
    tests: ['Fluorescein Stain Slit Lamp Exam (Green defect under cobalt blue light)', 'Visual Acuity'],
    advice: 'DO NOT RUB EYE! Wear eye patch for 24 hours if advised. Immediate ophthalmology review if vision drops.',
  },
  {
    id: 'proto_ophth_stye_hordeolum',
    title: 'Hordeolum Externum (Stye) & Chalazion Protocol',
    category: 'ophthalmology',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Warm compresses 10 mins 4 times daily + Topical Tobramycin/Moxifloxacin Eye Ointment. Incision & curettage for chronic painless chalazion.',
    redFlags: 'Preseptal / Orbital cellulitis (eyelid swelling closing eye with fever).',
    diagnosis: 'Hordeolum Externum (Acute Stye)',
    chiefComplaints: ['Painful red tender lump on eyelid margin', 'Eyelid swelling & tearing'],
    drugs: [
      'Oint. Moxifloxacin 0.5% Eye Ointment (apply over eyelid lump 3 times daily) x 7 days',
      'Drops. Moxifloxacin 0.5% Eye Drops (1 drop 4 times daily)',
      'Tab. Paracetamol 500mg S.O.S',
    ],
    tests: ['External Eyelid Inspection'],
    advice: 'Apply warm moist compresses to eyelid for 10-15 mins 4 times daily. DO NOT SQUEEZE OR POP THE STYE!',
  },
  {
    id: 'proto_ophth_glaucoma_acute',
    title: 'Acute Angle Closure Glaucoma Emergency Protocol',
    category: 'ophthalmology',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'OCULAR EMERGENCY! Stat Timolol 0.5% drops + Brimonidine 0.2% + Oral Acetazolamide 500mg + IV Mannitol 20% 100ml to lower IOP immediately.',
    redFlags: 'Severe ocular pain with head ache, vomiting, mid-dilated fixed pupil, steamy cornea, vision loss.',
    diagnosis: 'Acute Angle Closure Glaucoma',
    chiefComplaints: ['Severe deep eye pain radiating to forehead', 'Rainbow halos around lights', 'Nausea, vomiting & sudden blurred vision'],
    drugs: [
      'Drops. Timolol 0.5% Eye Drops (1 drop stat, then twice daily)',
      'Drops. Brimonidine 0.2% Eye Drops (1 drop stat, then twice daily)',
      'Tab. Acetazolamide 250mg (2 tablets stat oral, then 1-0-1)',
      'Inj. Mannitol 20% 100ml IV rapid infusion over 30 mins stat',
    ],
    tests: ['Stat Tonometry (Intraocular Pressure IOP > 40 mmHg)', 'Gonioscopy & Slit Lamp'],
    advice: 'URGENT OPHTHALMOLOGY EMERGENCY CONSULTATION FOR LASER PERIPHERAL IRIDOTOMY (LPI)!',
  },
  {
    id: 'proto_ophth_anterior_uveitis',
    title: 'Anterior Uveitis (Iritis) Protocol',
    category: 'ophthalmology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Topical Steroid (Prednisolone Acetate 1% drops Q1H to QID) + Cycloplegic (Atropine 1% / Homatropine 2% drops BD) to prevent synechiae.',
    redFlags: 'Hypopyon (pus in anterior chamber), secondary glaucoma.',
    diagnosis: 'Acute Anterior Uveitis',
    chiefComplaints: ['Severe aching eye pain & photophobia', 'Ciliary redness around cornea', 'Blurred vision'],
    drugs: [
      'Drops. Prednisolone Acetate 1% Eye Drops (1 drop Q2H while awake) x 14 days (tapering dose)',
      'Drops. Homatropine 2% Eye Drops (1 drop twice daily) x 7 days',
      'Tab. Paracetamol 650mg S.O.S',
    ],
    tests: ['Slit Lamp Exam (Anterior Chamber cells & flare, KPs)', 'HLA-B27, ANA, X-Ray Sacroiliac Joints'],
    advice: 'Wear dark sunglasses outdoors. Do not stop steroid drops abruptly (taper under ophthalmologist guidance).',
  },
  {
    id: 'proto_ophth_blepharitis',
    title: 'Chronic Blepharitis & Meibomian Gland Dysfunction (MGD)',
    category: 'ophthalmology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Warm eyelid compresses + Eyelid scrub with baby shampoo + Topical Erythromycin / Doxycycline 100mg OD x 30 days for MGD.',
    redFlags: 'Trichiasis (inward lashes scratching cornea), corneal ulceration.',
    diagnosis: 'Chronic Anterior/Posterior Blepharitis',
    chiefComplaints: ['Crusting on eyelashes on waking', 'Red itchy lid margins', 'Burning dry eye sensation'],
    drugs: [
      'Oint. Azithromycin 1% Eye Ointment (apply along eyelid margin bedtime) x 14 days',
      'Cap. Doxycycline 100mg (1-0-0 after food) x 30 days',
      'Drops. Carboxymethylcellulose 0.5% Eye Drops (1 drop 4 times daily)',
    ],
    tests: ['Slit Lamp Lid Margin Exam'],
    advice: 'Perform warm eyelid compresses 10 mins daily followed by gentle lid margin scrub using dilute baby shampoo on cotton bud.',
  },
  {
    id: 'proto_ophth_subconjunctival_hemorrhage',
    title: 'Subconjunctival Hemorrhage Protocol',
    category: 'ophthalmology',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Reassurance! Benign condition resolving spontaneously over 10-14 days. Artificial tears for mild irritation.',
    redFlags: 'Trauma with globe rupture risk, elevated blood pressure, bleeding disorder / anticoagulation.',
    diagnosis: 'Acute Subconjunctival Hemorrhage',
    chiefComplaints: ['Sudden bright red blood patch on white of eye', 'No pain, no vision change'],
    drugs: [
      'Drops. Carboxymethylcellulose 0.5% Lubricating Eye Drops (1 drop 4 times daily) x 7 days',
    ],
    tests: ['Blood Pressure Check', 'Visual Acuity', 'Slit Lamp Exam'],
    advice: 'REASSURE PATIENT: Blood spot will gradually turn yellow/green and clear completely in 2 weeks without any eye permanent damage.',
  },
  {
    id: 'proto_ophth_allergic_conjunctivitis',
    title: 'Vernal Keratoconjunctivitis (VKC) & Seasonal Allergic Eye Protocol',
    category: 'ophthalmology',
    targetGroup: 'Children & Young Adults',
    guidelinesSummary: 'Dual-action Olopatadine 0.1% BD + Fluorometholone 0.1% mild steroid eye drops QID for severe cobble-stone papillae flares.',
    redFlags: 'Shield corneal ulcer, limbal stem cell deficiency.',
    diagnosis: 'Vernal Keratoconjunctivitis (VKC)',
    chiefComplaints: ['Intense eye itching & ropy discharge', 'Photophobia & foreign body sensation', 'Cobblestone papillae under upper lid'],
    drugs: [
      'Drops. Olopatadine 0.1% Eye Drops (1 drop twice daily) x 1 month',
      'Drops. Fluorometholone 0.1% Eye Drops (1 drop 3 times daily) x 7 days (tapering)',
      'Drops. Carboxymethylcellulose 0.5% Eye Drops (1 drop 4 times daily)',
    ],
    tests: ['Slit Lamp Eversion of Upper Eyelid'],
    advice: 'Avoid rubbing eyes (rubbing worsens histamine release & induces keratoconus). Cold compresses 3 times daily.',
  },
  {
    id: 'proto_ophth_episcleritis',
    title: 'Episcleritis & Ocular Sectoral Redness Protocol',
    category: 'ophthalmology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Topical NSAID drops (Nepafenac 0.1% / Ketorolac 0.5%) TDS x 7 days or mild topical steroid drops + oral Ibuprofen.',
    redFlags: 'Scleritis (deep severe boring eye pain, bluish scleral hue, scleral melting).',
    diagnosis: 'Simple / Nodular Episcleritis',
    chiefComplaints: ['Localized sectoral redness in one eye', 'Mild ache and tenderness'],
    drugs: [
      'Drops. Nepafenac 0.1% Eye Drops (1 drop 3 times daily) x 10 days',
      'Tab. Ibuprofen 400mg (1-0-1 after food) x 5 days',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Phenylephrine 2.5% Test (Redness blanches in episcleritis, fails to blanch in scleritis)'],
    advice: 'Condition is self-limiting over 2-3 weeks. Use artificial tears for comfort.',
  },

  // ==========================================
  // 6. DERMATOLOGY & SKIN (🧴)
  // ==========================================
  {
    id: 'proto_tinea_derma',
    title: 'Tinea Corporis / Cruris (Fungal Ringworm)',
    category: 'dermatology',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Oral systemic azole (Itraconazole 100mg BD) for 2 weeks paired with topical Luliconazole 1% cream. Avoid oral steroid combinations!',
    redFlags: 'Erythroderma, secondary bacterial superinfection with cellulitis, immunosuppression.',
    diagnosis: 'Tinea Corporis / Cruris (Dermatophytosis)',
    chiefComplaints: ['Ring-shaped itchy red scaly lesions on groin/body', 'Severe itching worsening with sweat'],
    drugs: [
      'Cap. Itraconazole 100mg (1-0-1 after full meal) x 14 days',
      'Oint. Luliconazole 1% Cream (apply thin layer over lesions twice daily) x 14 days',
      'Tab. Levocetirizine 5mg (0-0-1 at bedtime) x 10 days for itching',
      'Syp. Ketoconazole 2% Soap / Wash for daily bathing',
    ],
    tests: ['KOH Mount Skin Scraping for Fungus'],
    advice: 'DO NOT apply steroid creams (Quadriderm, Panderm, Betnovate)! Wear loose cotton clothes. Wash clothes in hot water and iron inside out.',
  },
  {
    id: 'proto_scabies_derma',
    title: 'Scabies & Parasitic Skin Infestation',
    category: 'dermatology',
    targetGroup: 'All Ages & Family Contacts',
    guidelinesSummary: 'Topical Permethrin 5% lotion applied neck down overnight, repeated after 7 days, paired with oral single-dose Ivermectin for adults.',
    redFlags: 'Crusted (Norwegian) scabies, extensive secondary pustular infection.',
    diagnosis: 'Scabies Infestation',
    chiefComplaints: ['Intense itching worsening at night', 'Small red papules & burrows in finger webs, wrists, waist'],
    drugs: [
      'Oint. Permethrin 5% Lotion (apply neck to toe overnight, wash off after 8-12 hours; repeat on Day 7)',
      'Tab. Ivermectin 12mg (1 stat dose on empty stomach, repeat on Day 14)',
      'Tab. Cetirizine 10mg (0-0-1 at bedtime) x 7 days for night itching',
    ],
    tests: ['Dermoscopy / Skin Burrow Scraping'],
    advice: 'TREAT ALL FAMILY MEMBERS SIMULTANEOUSLY! Wash all clothes, bedsheets, and towels in hot water and sun-dry thoroughly.',
  },
  {
    id: 'proto_acne_vulgaris',
    title: 'Acne Vulgaris (Grade II/III Inflammatory Acne)',
    category: 'dermatology',
    targetGroup: 'Adolescents & Young Adults',
    guidelinesSummary: 'Topical Benzoyl Peroxide 2.5% / Clindamycin 1% Gel plus oral Doxycycline 100mg daily for 4-6 weeks for moderate inflammatory papulopustular acne.',
    redFlags: 'Nodulocystic scarring acne (requires oral Isotretinoin), severe facial edema.',
    diagnosis: 'Acne Vulgaris (Moderate Inflammatory)',
    chiefComplaints: ['Eruptions of red painful pimples on face, forehead and back', 'Oily skin and comedones'],
    drugs: [
      'Cap. Doxycycline 100mg (1-0-0 after full meal with full glass water) x 30 days',
      'Oint. Clindamycin 1% + Benzoyl Peroxide 2.5% Gel (apply thin layer on acne spots in morning)',
      'Oint. Adapalene 0.1% Gel (apply thin layer over face at night)',
      'Syp. Salicylic Acid 2% Face Wash twice daily',
    ],
    tests: ['Hormonal Evaluation (if PCOS features present)'],
    advice: 'Do not squeeze or pop pimples (prevents post-inflammatory hyperpigmentation and scarring). Use non-comedogenic sunscreen.',
  },
  {
    id: 'proto_derma_urticaria',
    title: 'Acute Urticaria & Angioedema Protocol',
    category: 'dermatology',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Second-generation non-sedating H1 antihistamines (Bilastine 20mg / Fexofenadine 180mg OD to QID) + short course oral Prednisolone if angioedema.',
    redFlags: 'Laryngeal edema (stridor/hoarseness), anaphylactic shock.',
    diagnosis: 'Acute Urticaria (Hives)',
    chiefComplaints: ['Sudden onset intensely itchy wheals / hives over body', 'Swallowing/lip swelling'],
    drugs: [
      'Tab. Bilastine 20mg (1-0-0 on empty stomach 1h before breakfast) x 10 days',
      'Tab. Levocetirizine 5mg (0-0-1 bedtime) x 10 days',
      'Oint. Calamine Lotion (apply over itchy wheals 3 times daily)',
      'Tab. Deflazacort 6mg (1-0-0 after food) x 5 days (if angioedema present)',
    ],
    tests: ['CBC with AEC', 'IgE Levels'],
    advice: 'Identify and avoid suspected food allergens/drugs. Avoid hot showers and tight clothing.',
  },
  {
    id: 'proto_derma_eczema',
    title: 'Atopic Dermatitis & Eczema Protocol',
    category: 'dermatology',
    targetGroup: 'Pediatric & Adult',
    guidelinesSummary: 'Liberal bland emollient application (Liquid Paraffin / White Soft Paraffin) + Topical Steroid (Fluticasone 0.05% / Hydrocortisone 1%) for acute flares.',
    redFlags: 'Eczema herpeticum (widespread HSV vesicles), erythroderma.',
    diagnosis: 'Atopic Dermatitis (Eczema)',
    chiefComplaints: ['Dry, intensely itchy skin in flexural folds (elbows/knees)', 'Erythema and lichenification'],
    drugs: [
      'Oint. Fluticasone Propionate 0.05% Cream (apply twice daily to active rash x 7 days)',
      'Oint. Liquid Paraffin + White Soft Paraffin Emollient Cream (apply liberally 4 times daily)',
      'Tab. Hydroxyzine 10mg (0-0-1 bedtime) x 7 days for itch',
    ],
    tests: ['Serum IgE', 'Skin Patch Test'],
    advice: 'Apply emollient cream within 3 minutes of bathing while skin is still damp ("Soak & Seal" technique). Avoid wool and synthetic fabrics.',
  },
  {
    id: 'proto_derma_psoriasis',
    title: 'Psoriasis Vulgaris Chronic Plaque Protocol',
    category: 'dermatology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Topical Clobetasol Propionate 0.05% + Calcipotriol (Vitamin D analogue) ointment twice daily + Coalition tar shampoo for scalp psoriasis.',
    redFlags: 'Generalized pustular psoriasis, psoriatic erythrodermic flare, severe psoriatic arthritis.',
    diagnosis: 'Psoriasis Vulgaris (Plaque Psoriasis)',
    chiefComplaints: ['Well-demarcated silvery scaly red plaques over elbows, knees, scalp', 'Pitting on fingernails'],
    drugs: [
      'Oint. Clobetasol 0.05% + Calcipotriol 0.005% Ointment (apply twice daily) x 14 days',
      'Syp. Coal Tar 1% + Salicylic Acid 3% Shampoo (use 3 times weekly for scalp)',
      'Cap. Methotrexate 7.5mg (once weekly if severe >10% BSA)',
    ],
    tests: ['PASI Score Assessment', 'Rheumatoid Factor & Serum Uric Acid'],
    advice: 'Expose skin to 15 mins morning sunlight. Avoid alcohol and smoking which aggravate psoriasis flares.',
  },
  {
    id: 'proto_derma_pityriasis_versicolor',
    title: 'Pityriasis Versicolor (Tinea Versicolor) Protocol',
    category: 'dermatology',
    targetGroup: 'Young Adults',
    guidelinesSummary: 'Topical Ketoconazole 2% Lotion/Shampoo applied over trunk for 10 mins before washing for 14 days + single dose oral Fluconazole 400mg.',
    redFlags: 'Widespread non-responsive lesions.',
    diagnosis: 'Pityriasis Versicolor (Malassezia Furfur)',
    chiefComplaints: ['Hypopigmented or hyperpigmented fine scaly macules over upper chest, back & neck', 'Mild itching on sweating'],
    drugs: [
      'Syp. Ketoconazole 2% Lotion (apply over body 10 mins before bath twice weekly) x 4 weeks',
      'Tab. Fluconazole 400mg (1 stat dose oral)',
    ],
    tests: ['Wood Lamp Fluorescein (Yellow-gold fluorescence)', 'KOH Scraping (Spaghetti & Meatballs appearance)'],
    advice: 'Hypopigmented spots may take 2-3 months to return to normal skin color after fungal cure. Use ketoconazole soap in hot humid weather.',
  },
  {
    id: 'proto_derma_impetigo',
    title: 'Impetigo Contagiosa Bacterial Skin Infection',
    category: 'dermatology',
    targetGroup: 'Pediatric & Children',
    guidelinesSummary: 'Topical Mupirocin 2% ointment 3 times daily + oral Amoxicillin-Clavulanate or Cephalexin for widespread honey-colored crusted lesions.',
    redFlags: 'Post-streptococcal glomerulonephritis (hematuria, facial puffiness, hypertension), Staphylococcal Scalded Skin Syndrome SSSS.',
    diagnosis: 'Impetigo Contagiosa (Bullous / Non-bullous)',
    chiefComplaints: ['Honey-colored crusted erosions around mouth and nose', 'Fragile blisters breaking easily'],
    drugs: [
      'Oint. Mupirocin 2% Ointment (apply to crusted lesions 3 times daily) x 7 days',
      'Syp. Amoxicillin 200mg + Clavulanate 28.5mg / 5ml (dose as per weight) x 7 days',
      'Syp. Chlorhexidine Skin Cleanser daily',
    ],
    tests: ['Gram Stain & Pus Culture'],
    advice: 'Gently soak off crusts with warm water before applying Mupirocin ointment. Keep child home from school until crusts dry up.',
  },
  {
    id: 'proto_derma_herpes_zoster',
    title: 'Herpes Zoster (Shingles) & Post-Herpetic Neuralgia Protocol',
    category: 'dermatology',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'Oral Valacyclovir 1000mg TDS or Acyclovir 800mg 5 times daily for 7 days (start within 72 hours of rash!) + Pregabalin for neuropathic pain.',
    redFlags: 'Herpes Zoster Ophthalmicus (vesicles on tip of nose - Hutchinson sign indicating corneal involvement), Ramsay Hunt syndrome (facial palsy + ear vesicles).',
    diagnosis: 'Herpes Zoster (Shingles)',
    chiefComplaints: ['Unilateral painful grouped fluid-filled blisters along thoracic dermatome', 'Severe burning pain'],
    drugs: [
      'Tab. Valacyclovir 1000mg (1-1-1 after food) x 7 days (OR Tab Acyclovir 800mg 5 times daily)',
      'Cap. Pregabalin 75mg + Methylcobalamin 1500mcg (0-0-1 bedtime) x 14 days',
      'Oint. Calamine Lotion (apply gently over vesicles twice daily)',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
    ],
    tests: ['Tzanck Smear (Multinucleated giant cells)', 'Fluorescein Eye Exam (if facial zoster)'],
    advice: 'START ANTIVIRAL WITHIN 72 HOURS! Keep vesicles clean and dry. Avoid contact with pregnant women or unvaccinated children.',
  },
  {
    id: 'proto_derma_contact_dermatitis',
    title: 'Contact Dermatitis (Irritant / Allergic) Protocol',
    category: 'dermatology',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Remove offending agent + Topical Clobetasol / Mometasone ointment twice daily x 7 days + Oral Antihistamines.',
    redFlags: 'Widespread erythroderma, secondary bacterial superinfection.',
    diagnosis: 'Allergic / Irritant Contact Dermatitis',
    chiefComplaints: ['Redness, blistering & intense itching at contact site (metal jewelry/cement/hair dye/soaps)'],
    drugs: [
      'Oint. Mometasone Furoate 0.1% Cream (apply twice daily) x 7 days',
      'Tab. Bilastine 20mg (1-0-0 empty stomach) x 10 days',
      'Oint. Calamine Lotion (apply t.d.s)',
    ],
    tests: ['Patch Testing'],
    advice: 'Identify and strictly avoid offending allergen (e.g. nickel in artificial jewelry, paraphenylenediamine PPD in black hair dye, latex).',
  },

  // ==========================================
  // 7. PEDIATRICS (👶)
  // ==========================================
  {
    id: 'proto_dehydration_ped',
    title: 'Pediatric Acute Diarrhea & Dehydration (WHO Plan B)',
    category: 'pediatric',
    targetGroup: 'Pediatric (< 5 years)',
    guidelinesSummary: 'Administer WHO low-osmolarity ORS 75 ml/kg over 4 hours plus Zinc 20mg daily for 14 days. Avoid anti-motility agents in infants.',
    redFlags: 'Sunken eyes, lethargy, skin pinch goes back very slowly (>2s), inability to drink, persistent high fever or blood in stool.',
    diagnosis: 'Acute Gastroenteritis with Moderate Dehydration',
    chiefComplaints: ['Watery stools 5-8 times/day', 'Vomiting 3-4 episodes', 'Decreased urine frequency'],
    drugs: [
      'Syp. WHO ORS Solution 75ml/kg over 4 hours + 50-100ml after each loose stool',
      'Syp. Zinc Sulfate 20mg/5ml (5ml once daily) for 14 days',
      'Syp. Ondansetron 2mg/5ml (2.5ml stat 15 mins before ORS)',
      'Syp. Racecadotril 10mg (1 sachet 3 times daily in water) x 3 days',
    ],
    tests: ['Stool Routine & Microscopy', 'Serum Electrolytes'],
    advice: 'Continue breastfeeding and normal feeding. Prepare ORS in clean boiled water. Watch for danger signs.',
  },
  {
    id: 'proto_ped_fever_paracetamol',
    title: 'Pediatric Acute Febrile Illness & Sponging Protocol',
    category: 'pediatric',
    targetGroup: 'Infants & Children (3m - 12y)',
    guidelinesSummary: 'Paracetamol 15 mg/kg/dose Q4-6H (max 60 mg/kg/day) + Tepid sponging with tap water for temp > 101°F. Avoid Aspirin (Reye Syndrome risk).',
    redFlags: 'Febrile seizure, neck stiffness, non-blanching petechial rash, grunting respirations, extreme lethargy.',
    diagnosis: 'Acute Febrile Illness (Viral Origin)',
    chiefComplaints: ['High grade fever x 2 days', 'Irritability and body pain', 'Decreased appetite'],
    drugs: [
      'Syp. Paracetamol 250mg/5ml (calculated dose 15 mg/kg every 6 hours S.O.S)',
      'Syp. Mefenamic Acid 100mg/5ml (if fever > 102°F despite Paracetamol)',
      'Syp. ORS Fluids frequently',
    ],
    tests: ['CBC, Urine Routine, Malarial Parasite MP Smear'],
    advice: 'TEPID SPONGING WITH TAP WATER (NOT COLD WATER!) OVER FOREHEAD, CHEST & LIMBS FOR HIGH FEVER. Dress child in light cotton clothes.',
  },
  {
    id: 'proto_ped_bronchiolitis',
    title: 'Pediatric Acute Bronchiolitis Protocol',
    category: 'pediatric',
    targetGroup: 'Infants (<2 years)',
    guidelinesSummary: 'Viral RSV infection. Supportive therapy: 3% Hypertonic Saline Nebulization + Nasal suctioning + Hydration. Antibiotics & steroids NOT routinely indicated.',
    redFlags: 'SpO2 < 92%, subcostal/intercostal retractions, grunting, apneic spells, refusal to feed.',
    diagnosis: 'Acute Viral Bronchiolitis (RSV)',
    chiefComplaints: ['Cough, tachypnea & wheezing in infant < 2 yrs', 'Poor feeding & nasal flaring'],
    drugs: [
      'Inj. Nebulization 3% Hypertonic Saline 4ml (repeat Q6H)',
      'Drops. Normal Saline Nasal Drops (2 drops each nostril before feeding)',
      'Syp. Paracetamol 120mg/5ml (calculated dose S.O.S for fever)',
    ],
    tests: ['Pulse Oximetry (SpO2)', 'Chest X-Ray (Hyperinflation)', 'RSV Rapid Antigen'],
    advice: 'Keep infant elevated at 30 degrees. Perform saline nasal drops and gentle bulb suction before feeds.',
  },
  {
    id: 'proto_ped_croup',
    title: 'Pediatric Spasmodic Croup & Laryngotracheobronchitis',
    category: 'pediatric',
    targetGroup: 'Children (6 months - 3 years)',
    guidelinesSummary: 'Single dose oral Dexamethasone 0.15-0.6 mg/kg (or Nebulized Budesonide 2mg stat) + Nebulized L-Epinephrine 1:1000 for stridor at rest.',
    redFlags: 'Stridor at rest, cyanosis, severe subcostal retractions, exhaustion.',
    diagnosis: 'Acute Croup (Laryngotracheobronchitis)',
    chiefComplaints: ['Barking seal-like cough worsening at night', 'Inspiratory stridor & hoarse cry'],
    drugs: [
      'Syp. Dexamethasone 0.5mg/5ml (single oral dose 0.15-0.3 mg/kg stat)',
      'Inj. Nebulization Budesonide 1mg Respules stat',
      'Inj. Nebulization Adrenaline (Epinephrine 1:1000) 2ml + 2ml NS (if stridor at rest)',
    ],
    tests: ['Neck X-Ray AP View (Steeple Sign)', 'SpO2 Monitoring'],
    advice: 'Keep child calm (crying worsens airway obstruction). Expose child to cool night air or steam mist in bathroom.',
  },
  {
    id: 'proto_ped_deworming',
    title: 'Pediatric Helminthiasis & Deworming Protocol',
    category: 'pediatric',
    targetGroup: 'Children (> 1 year)',
    guidelinesSummary: 'Albendazole 400mg single dose chewable tablet at bedtime for children > 2 yrs (200mg for 1-2 yrs), repeated after 2 weeks for pinworms.',
    redFlags: 'Severe anemia, intestinal obstruction symptoms (roundworm mass), rectal prolapse.',
    diagnosis: 'Intestinal Worm Infestation (Ascariasis / Enterobiasis)',
    chiefComplaints: ['Perianal itching worsening at night', 'Abdominal pain around umbilicus', 'Grinding teeth during sleep (bruxism)'],
    drugs: [
      'Tab. Albendazole 400mg (1 chewable tablet stat at bedtime; repeat after 14 days)',
      'Syp. Iron + Folic Acid Syrup 5ml once daily for 1 month',
    ],
    tests: ['Stool Routine & Microscopy for Ova/Cysts'],
    advice: 'Trim child nails short. Wash hands with soap before eating and after toilet use.',
  },
  {
    id: 'proto_ped_aom',
    title: 'Pediatric Acute Otitis Media (AOM) Protocol',
    category: 'pediatric',
    targetGroup: 'Children (>6 months)',
    guidelinesSummary: 'High-dose oral Amoxicillin 80-90 mg/kg/day divided BD x 10 days for infants (or Amoxiclav 45 mg/kg/day) + Paracetamol for otalgia.',
    redFlags: 'Mastoid swelling/erythema, purulent otorrhea with tympanic membrane rupture, high fever.',
    diagnosis: 'Acute Otitis Media (AOM)',
    chiefComplaints: ['Ear pulling / ear rubbing in infant', 'Irritability & excessive crying', 'Fever & bulging red drum'],
    drugs: [
      'Syp. Amoxicillin 200mg + Clavulanate 28.5mg / 5ml (weight-based 45 mg/kg/day in 2 doses) x 10 days',
      'Syp. Paracetamol 250mg/5ml (15 mg/kg Q6H S.O.S)',
    ],
    tests: ['Otoscopy (Bulging opacified tympanic membrane)'],
    advice: 'Do not feed infant lying flat on back (bottle propping increases eustachian tube reflux).',
  },
  {
    id: 'proto_ped_uti',
    title: 'Pediatric Urinary Tract Infection Protocol',
    category: 'pediatric',
    targetGroup: 'Pediatric',
    guidelinesSummary: 'Oral Cefixime 8 mg/kg/day or Amoxiclav 30 mg/kg/day for 7-10 days. Renal USG mandatory for first febrile UTI in young children.',
    redFlags: 'High fever with rigors (pyelonephritis), vomiting, palpable flank mass, hypertension.',
    diagnosis: 'Febrile Urinary Tract Infection',
    chiefComplaints: ['Unexplained fever in toddler', 'Dysuria / crying during micturition', 'Foul-smelling urine'],
    drugs: [
      'Syp. Cefixime 50mg/5ml (weight-based 8 mg/kg/day divided BD) x 7 days',
      'Syp. Paracetamol 250mg/5ml (15 mg/kg Q6H S.O.S)',
    ],
    tests: ['Urine Culture & Sensitivity (Clean catch / catheter)', 'USG Kidney Ureter Bladder (KUB)', 'MCU (if VUR suspected)'],
    advice: 'Ensure adequate fluid intake. Instruct proper front-to-back wiping in female children.',
  },
  {
    id: 'proto_ped_anemia',
    title: 'Pediatric Iron Deficiency Anemia Protocol',
    category: 'pediatric',
    targetGroup: 'Infants & Children (6m - 5y)',
    guidelinesSummary: 'Elemental Iron 3 mg/kg/day in single or divided doses for 3 months. Reticulocyte count rises in 7-10 days.',
    redFlags: 'Severe anemia (Hb < 6 g/dl), pica, splenomegaly, heart failure signs.',
    diagnosis: 'Pediatric Iron Deficiency Anemia',
    chiefComplaints: ['Pallor of palms & conjunctiva', 'Pica (eating dirt, clay, ice, paint chips)', 'Irritability & slow weight gain'],
    drugs: [
      'Syp. Ferrous Ascorbate (Elemental Iron 20mg/5ml) (calculated dose 3 mg/kg/day) x 3 months',
      'Syp. Multivitamin & Folic Acid Drops (1ml daily)',
    ],
    tests: ['CBC with Serum Ferritin & Mentzer Index'],
    advice: 'Give iron syrup on empty stomach or between meals with fruit juice. Do not give with cow milk.',
  },
  {
    id: 'proto_ped_neonatal_jaundice_risk',
    title: 'Neonatal Physiological Jaundice OPD Risk Screening',
    category: 'pediatric',
    targetGroup: 'Neonate (Days 2 to 14)',
    guidelinesSummary: 'Physiological jaundice peaks Day 3-5. Phototherapy indicated if Transcutaneous Bilirubin (TcB) / Total Serum Bilirubin exceeds AAP hour-specific nomogram.',
    redFlags: 'Jaundice in first 24 hours of life (PATHOLOGICAL!), clay-colored stools, dark urine, lethargy, poor sucking.',
    diagnosis: 'Neonatal Physiological Jaundice',
    chiefComplaints: ['Yellowish discoloration of skin & sclera starting Day 3', 'Child active and feeding well'],
    drugs: [
      'Syp. Frequent Breastfeeding (every 2 hours, 10-12 times daily)',
    ],
    tests: ['Total & Direct Serum Bilirubin (TSB)', 'Blood Group & Rh Typing (Mother & Baby)'],
    advice: 'Ensure frequent breastfeeding every 2 hours (frequent stools flush out bilirubin). Expose baby to indirect morning sunlight for 15 mins.',
  },
  {
    id: 'proto_ped_cough_asthma',
    title: 'Pediatric Cough Variant Asthma & Reactive Airway',
    category: 'pediatric',
    targetGroup: 'Children (> 2 years)',
    guidelinesSummary: 'Nebulized Levosalbutamol or Salbutamol MDI with Spacer + Mask + Oral Montelukast chewable 4mg/5mg at bedtime.',
    redFlags: 'Silent chest, tachypnea > 50/min, subcostal retractions, SpO2 < 92%.',
    diagnosis: 'Reactive Airway Disease / Cough Variant Asthma',
    chiefComplaints: ['Recurrent nocturnal dry coughing spells', 'Cough triggered by running/exercise/cold air'],
    drugs: [
      'Tab. Montelukast 4mg Chewable Tablet (0-0-1 bedtime) x 1 month',
      'Cap. Levosalbutamol 50mcg + Budesonide 100mcg Inhaler with Metered Dose Spacer & Mask (2 puffs BD) x 1 month',
    ],
    tests: ['Spirometry / PEFR (for children > 5 yrs)', 'Chest X-Ray PA'],
    advice: 'ALWAYS USE INHALER WITH SPACER AND MASK! Rinse mouth with water after Budesonide inhaler.',
  },

  // ==========================================
  // 8. INFECTIOUS & GENERAL MEDICINE (🦠)
  // ==========================================
  {
    id: 'proto_dengue',
    title: 'Dengue Fever Outpatient Management Protocol',
    category: 'infectious',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Daily fluid therapy (maintain oral fluids at 2-3L/day or NS/RL infusion), daily CBC monitoring for PCV rise & platelet drop. Avoid NSAIDs/Aspirin.',
    redFlags: 'Persistent vomiting, severe abdominal pain, mucosal bleeding, lethargy/restlessness, cold clammy extremities, sudden drop in BP.',
    diagnosis: 'Dengue Fever (Non-severe)',
    chiefComplaints: ['High fever with retro-orbital pain', 'Severe bodyache and joint pain', 'Nausea and loss of appetite'],
    drugs: [
      'Tab. Paracetamol 650mg (1-0-1 after food) for fever S.O.S max 4g/day',
      'Tab. Ondansetron 4mg (1-0-1 before food) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
      'Syp. ORS (Oral Rehydration Salts) 1 sachet in 1L water drink throughout day',
    ],
    tests: ['Dengue NS1 Antigen & IgM/IgG', 'Complete Blood Count (CBC) daily', 'Liver Function Test (LFT)', 'Serum Electrolytes'],
    advice: 'Strict bed rest. Drink 2.5 to 3 Liters of fluid daily (ORS, Coconut water, Fresh juices). DO NOT take Combiflam, Voveran, or Aspirin.',
  },
  {
    id: 'proto_typhoid',
    title: 'Enteric (Typhoid) Fever Protocol',
    category: 'infectious',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Cefixime 400mg BD or Azithromycin 500mg OD for 7-14 days. For severe inpatient cases: Inj Ceftriaxone 2g IV OD.',
    redFlags: 'Severe abdominal distension or guarding (perforation risk), high stepping fever, GI bleed (melena), confusion.',
    diagnosis: 'Enteric (Typhoid) Fever',
    chiefComplaints: ['Step-ladder high fever x 5 days', 'Headache & abdominal discomfort', 'Constipation / diarrhea'],
    drugs: [
      'Tab. Cefixime 200mg (1-0-1 after food) x 10 days',
      'Tab. Azithromycin 500mg (1-0-0 after food) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1 after food) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach)',
    ],
    tests: ['TyphiDot IgM / Widal Test', 'Blood Culture & Sensitivity', 'CBC with ESR'],
    advice: 'Drink boiled/filtered water. Soft, easily digestible diet (khichdi, curd rice). Avoid spicy & fried food.',
  },
  {
    id: 'proto_uti',
    title: 'Acute Uncomplicated Urinary Tract Infection (UTI)',
    category: 'infectious',
    targetGroup: 'Adult Females',
    guidelinesSummary: 'Nitrofurantoin 100mg SR BD x 7 days or Ciprofloxacin 500mg BD x 5 days plus alkalinizing agent.',
    redFlags: 'High fever with chills/rigors, flank pain (CVA tenderness indicating pyelonephritis), nausea/vomiting, pregnancy.',
    diagnosis: 'Acute Uncomplicated Cystitis (UTI)',
    chiefComplaints: ['Dysuria & burning micturition', 'Urinary frequency & urgency', 'Lower abdominal pain'],
    drugs: [
      'Cap. Nitrofurantoin 100mg SR (1-0-1 after meals) x 7 days',
      'Syp. Disodium Hydrogen Citrate 10ml in 1 glass water (1-1-1) x 5 days',
      'Tab. Paracetamol 500mg (1-0-1) S.O.S for lower pain',
    ],
    tests: ['Urine Routine & Microscopy', 'Urine Culture & Sensitivity'],
    advice: 'Drink 3 Liters of water daily. Complete 7-day antibiotic course. Void after intercourse.',
  },
  {
    id: 'proto_infect_malaria',
    title: 'Acute Malaria (P. Vivax / P. Falciparum) Protocol',
    category: 'infectious',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'For P. vivax: Chloroquine 1000mg Day 1, 500mg Days 2-3 + Primaquine 15mg daily x 14 days (radical cure). For P. falciparum: Artemether + Lumefantrine (ACT) x 3 days + single dose Primaquine 0.75 mg/kg.',
    redFlags: 'Altered sensorium (Cerebral Malaria), dark urine (Blackwater fever), severe anemia, jaundice.',
    diagnosis: 'Acute Plasmodium Vivax / Falciparum Malaria',
    chiefComplaints: ['Fever with severe shivering chills & sweating cycle', 'Intense headache and nausea'],
    drugs: [
      'Tab. Chloroquine Phosphate 250mg (4 tabs stat, 2 tabs at 6h, 2 tabs on Day 2 & 3)',
      'Tab. Primaquine 15mg (1-0-0 after food) x 14 days (for P. vivax radical cure after G6PD check)',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
    ],
    tests: ['Rapid Diagnostic Test RDT for Malaria', 'Peripheral Blood Film PBF for Malarial Parasite MP', 'G6PD Enzyme Level'],
    advice: 'COMPLETE FULL 14-DAY PRIMAQUINE COURSE to prevent relapse of dormant liver hypnozoites! Use mosquito nets.',
  },
  {
    id: 'proto_infect_scrub_typhus',
    title: 'Scrub Typhus & Rickettsial Fever Protocol',
    category: 'infectious',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'Doxycycline 100mg BD x 7 days (or Azithromycin 500mg OD x 5 days for pregnant women/children). Search for diagnostic ESCHAR wound!',
    redFlags: 'ARDS pulmonary edema, acute kidney injury, myocarditis, sensorium decline.',
    diagnosis: 'Scrub Typhus (Orientia tsutsugamushi)',
    chiefComplaints: ['High fever with severe headache & muscle pain', 'Painless black cigarette-burn Eschar skin lesion in groin/axilla'],
    drugs: [
      'Cap. Doxycycline 100mg (1-0-1 after meals with full glass water) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Scrub Typhus IgM ELISA', 'Weil-Felix Test', 'CBC, LFT, KFT'],
    advice: 'Inspect body skin folds carefully for eschar lesion. Take Doxycycline with full glass water standing upright.',
  },
  {
    id: 'proto_infect_leptospirosis',
    title: 'Leptospirosis (Weil Disease Risk) OPD Protocol',
    category: 'infectious',
    targetGroup: 'Adults (Post-Monsoon Water Logged)',
    guidelinesSummary: 'Doxycycline 100mg BD x 7 days (or Inj Penicillin G 1.5 MU IV Q6H for severe pulmonary/renal Weil syndrome).',
    redFlags: 'Jaundice + Oliguria + Hemoptysis (Weil Disease triad), conjunctival suffusion without discharge.',
    diagnosis: 'Acute Leptospirosis Infection',
    chiefComplaints: ['High fever after walking in flood/sewage water', 'Severe calf muscle pain & conjunctival redness', 'Jaundice'],
    drugs: [
      'Cap. Doxycycline 100mg (1-0-1 after food) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Leptospira IgM ELISA / MAT', 'Serum Bilirubin & Renal Function', 'Urine Routine'],
    advice: 'Avoid wading through stagnant flood water. Wear protective rubber boots during rainy season work.',
  },
  {
    id: 'proto_infect_chikungunya',
    title: 'Chikungunya Fever & Post-Viral Polyarthritis Protocol',
    category: 'infectious',
    targetGroup: 'Adults',
    guidelinesSummary: 'Symptomatic NSAID therapy (Aceclofenac / Hydroxychloroquine 200mg BD for persistent post-viral joint inflammation) + Hydration.',
    redFlags: 'Severe purpura, bleeding, bullous dermatosis in infants, acute neurological deficit.',
    diagnosis: 'Chikungunya Viral Fever & Arthralgia',
    chiefComplaints: ['High fever with severe crippling joint pain (wrist, ankle, knee)', 'Maculopapular skin rash'],
    drugs: [
      'Tab. Aceclofenac 100mg + Paracetamol 325mg (1-0-1 after food) x 10 days',
      'Tab. Hydroxychloroquine 200mg (1-0-1 after food) x 1 month (if joint pain > 2 weeks)',
      'Oint. Diclofenac Topical Gel over joints',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Chikungunya IgM Serology', 'CBC & ESR'],
    advice: 'Gentle joint mobility exercises. Rest during acute phase. Joint pain may persist for weeks to months.',
  },
  {
    id: 'proto_infect_sepsis_screening',
    title: 'qSOFA Outpatient Sepsis Screening & Early Referral Protocol',
    category: 'infectious',
    targetGroup: 'Adults',
    guidelinesSummary: 'qSOFA Score >= 2 (RR >= 22, Altered Sensorium, SBP <= 100) indicates HIGH RISK SEPSIS! Administer broad spectrum IV antibiotic + 30 ml/kg IV fluids & STAT ICU transfer.',
    redFlags: 'Refractory shock (SBP < 90 despite fluids), Lactate > 4 mmol/L, anuria, cyanosis.',
    diagnosis: 'Sepsis / Severe Systemic Infection Suspect',
    chiefComplaints: ['High fever with shivering chills', 'Confusion & rapid breathing', 'Extreme weakness'],
    drugs: [
      'Inj. Ceftriaxone 2g IV stat in 100ml NS over 20 mins',
      'Inj. Normal Saline 0.9% 1000ml IV rapid infusion (30 ml/kg initial fluid resuscitation)',
      'Inj. Paracetamol 1000mg IV infusion stat',
    ],
    tests: ['Blood Cultures (2 sets BEFORE antibiotics)', 'Stat Serum Lactate, ABG, CBC, LFT, KFT'],
    advice: 'CRITICAL ICU REFERRAL STAT! Time to antibiotic administration within 1 hour improves survival.',
  },
  {
    id: 'proto_infect_influenza',
    title: 'Influenza A (H1N1 / H3N2) Seasonal Flu Protocol',
    category: 'infectious',
    targetGroup: 'High Risk Groups & All Ages',
    guidelinesSummary: 'Oseltamivir (Tamiflu) 75mg BD x 5 days started within 48 hours for high-risk patients (elderly, pregnant, diabetics, asthmatics).',
    redFlags: 'Dyspnea, SpO2 < 93%, hemoptysis, confusion, high persistent fever > 4 days.',
    diagnosis: 'Acute Influenza A (H1N1) Viral Infection',
    chiefComplaints: ['Sudden high fever, severe dry cough & sore throat', 'Profound prostration & muscle aches'],
    drugs: [
      'Cap. Oseltamivir 75mg (1-0-1 after food) x 5 days',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Tab. Levocetirizine 5mg (0-0-1 bedtime) x 5 days',
    ],
    tests: ['Nasal/Throat Swab RT-PCR for Influenza A/B', 'Pulse Oximetry'],
    advice: 'Isolate at home for 5 days. Wear N95 mask around family members. Drink warm liquids.',
  },
  {
    id: 'proto_infect_cellulitis',
    title: 'Acute Limb Cellulitis & Soft Tissue Infection Protocol',
    category: 'infectious',
    targetGroup: 'Adults (Diabetic & Elderly)',
    guidelinesSummary: 'Oral Amoxicillin-Clavulanate 625mg BD or Cefuroxime 500mg BD x 10 days for Group A Strep & S. aureus. Limb elevation mandatory.',
    redFlags: 'Bullae, skin necrosis, crepitus (necrotizing fasciitis emergency!), rapid spreading redness, high fever.',
    diagnosis: 'Acute Lower Limb Cellulitis',
    chiefComplaints: ['Spreading red, hot, painful swollen patch on leg', 'Fever & regional lymph node enlargement'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-0-1 after food) x 10 days',
      'Tab. Aceclofenac 100mg + Serratiopeptidase 15mg (1-0-1) x 5 days',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['CBC with Differential', 'Fasting Blood Sugar / HbA1c', 'USG Soft Tissue (rule out abscess/DVT)'],
    advice: 'KEEP LEG ELEVATED ON 2 PILLOWS! Mark red margin border with pen to monitor daily spreading or recession.',
  },

  // ==========================================
  // 9. RESPIRATORY CARE (🫁)
  // ==========================================
  {
    id: 'proto_asthma_exacerbation',
    title: 'Acute Asthma Exacerbation OPD Protocol',
    category: 'respiratory',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Nebulization with Salbutamol + Ipratropium 3 doses at 20-minute intervals. Short course oral Prednisolone 40mg daily for 5 days.',
    redFlags: 'SpO2 < 90% on room air, inability to complete full sentences, accessory muscle usage, silent chest, cyanosis.',
    diagnosis: 'Acute Bronchial Asthma Exacerbation',
    chiefComplaints: ['Acute breathlessness & wheezing', 'Dry cough worsening at night', 'Chest tightness'],
    drugs: [
      'Inj. Nebulization Levosalbutamol 1.25mg + Ipratropium 500mcg stat (repeat x 3 if needed)',
      'Tab. Prednisolone 40mg (1-0-0 after breakfast) x 5 days',
      'Cap. Inhaler Budesonide + Formoterol 200/6 (2 puffs twice daily with spacer)',
      'Tab. Montelukast 10mg + Levocetirizine 5mg (0-0-1 at bedtime) x 10 days',
    ],
    tests: ['Pulse Oximetry (SpO2 monitoring)', 'Peak Expiratory Flow Rate (PEFR)', 'Chest X-Ray PA View'],
    advice: 'Rinse mouth with water after inhaler use. Avoid cold drinks, dust, smoke, and allergen exposure.',
  },
  {
    id: 'proto_resp_copd_exacerbation',
    title: 'Acute COPD Exacerbation OPD Protocol',
    category: 'respiratory',
    targetGroup: 'Adult Smokers & Elderly (>50 yrs)',
    guidelinesSummary: 'Nebulized Duolin (Levosalbutamol + Ipratropium) + Doxycycline 100mg BD x 7 days or Amoxiclav 625mg BD + Oral Prednisolone 30mg x 5 days.',
    redFlags: 'SpO2 < 88%, hypercapnic encephalopathy (drowsiness/asterixis), acute cor pulmonale right heart failure.',
    diagnosis: 'Acute Exacerbation of COPD (AECOPD)',
    chiefComplaints: ['Increased dyspnea & wheezing', 'Increased sputum volume & purulence', 'Chronic smoker cough'],
    drugs: [
      'Cap. Doxycycline 100mg (1-0-1 after food) x 7 days',
      'Tab. Prednisolone 30mg (1-0-0 after breakfast) x 5 days',
      'Inj. Nebulization Levosalbutamol 1.25mg + Ipratropium 500mcg Q6H',
      'Cap. Tiotropium 18mcg Rotacaps Inhaler (1 capsule daily via Revolizer)',
    ],
    tests: ['Chest X-Ray PA View', 'ABG (Check PaCO2)', 'SpO2'],
    advice: 'SMOKING CESSATION IS MANDATORY! Controlled target SpO2 88-92% (high O2 causes CO2 retention in COPD).',
  },
  {
    id: 'proto_resp_cap_pneumonia',
    title: 'Community Acquired Pneumonia (CAP CURB-65) Protocol',
    category: 'respiratory',
    targetGroup: 'Adults',
    guidelinesSummary: 'CURB-65 Score 0-1 (Outpatient): Amoxicillin-Clavulanate 625mg TDS x 7 days + Azithromycin 500mg OD x 5 days. For CURB-65 >= 2: Inpatient admission.',
    redFlags: 'CURB-65 >= 2 (Confusion, Urea > 7, RR >= 30, SBP < 90, Age >= 65), SpO2 < 90%, bilateral infiltrates.',
    diagnosis: 'Community Acquired Pneumonia (CAP)',
    chiefComplaints: ['High fever with chills & rusty purulent sputum cough', 'Pleuritic chest pain on deep breathing'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-1-1 after food) x 7 days',
      'Tab. Azithromycin 500mg (1-0-0 after food) x 5 days',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Chest X-Ray PA View (Lobar consolidation)', 'Sputum Gram Stain & Culture', 'CBC, Blood Urea, Creatinine'],
    advice: 'Drink plenty of warm fluids. Complete full antibiotic course. Pneumococcal & Flu vaccine after recovery.',
  },
  {
    id: 'proto_resp_bronchitis',
    title: 'Acute Viral Bronchitis Protocol',
    category: 'respiratory',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Self-limiting viral bronchial inflammation (90% non-bacterial). Symptomatic relief: Ambroxol + Levosalbutamol syrup + Steam inhalation. Antibiotics NOT recommended.',
    redFlags: 'High fever > 102°F, purulent sputum with dyspnea, focal crepitations on lung auscultation.',
    diagnosis: 'Acute Bronchitis',
    chiefComplaints: ['Persistent dry to mucoid cough x 5-7 days', 'Substernal chest soreness on coughing', 'Mild low-grade fever'],
    drugs: [
      'Syp. Levosalbutamol 1mg + Ambroxol 30mg + Guaifenesin 50mg / 5ml (10ml 3 times daily) x 5 days',
      'Tab. Paracetamol 500mg (1-0-1) S.O.S',
      'Syp. Steam Inhalation with Karvol Plus capsules twice daily',
    ],
    tests: ['Chest X-Ray PA (Normal bronchial markings)'],
    advice: 'Avoid antibiotics as acute bronchitis is viral. Stay hydrated with warm water. Honey & ginger tea for throat comfort.',
  },
  {
    id: 'proto_resp_tb_screening',
    title: 'Pulmonary Tuberculosis (TB) Screening & NTEP Protocol',
    category: 'respiratory',
    targetGroup: 'All Ages',
    guidelinesSummary: 'NTEP Guidelines: Any patient with cough > 2 weeks, fever > 2 weeks, or unexplained weight loss MUST undergo Sputum GeneXpert / CBNAAT test.',
    redFlags: 'Hemoptysis (coughing blood), massive pleural effusion, severe night sweats, cachexia.',
    diagnosis: 'Pulmonary Tuberculosis Suspect',
    chiefComplaints: ['Cough with sputum > 2 weeks', 'Evening low-grade fever & night sweats', 'Unexplained weight loss & anorexia'],
    drugs: [
      'Tab. NTEP Fixed Dose Combination (FDC-4) 4-Drug Regimen (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol) (weight-based 4 tabs daily on empty stomach)',
      'Tab. Pyridoxine (Vitamin B6) 10mg (1-0-0) x 6 months (prevents INH peripheral neuropathy)',
    ],
    tests: ['Sputum CBNAAT / GeneXpert for M. tuberculosis & Rifampicin Resistance', 'Chest X-Ray PA View', 'HIV & HbA1c'],
    advice: 'DO NOT STOP TB MEDICATIONS MIDWAY (causes drug-resistant MDR-TB!). Free NTEP treatment available at Government DOTS centers.',
  },
  {
    id: 'proto_resp_pleural_effusion',
    title: 'Pleural Effusion OPD Diagnostic Protocol',
    category: 'respiratory',
    targetGroup: 'Adults',
    guidelinesSummary: 'Diagnostic thoracentesis (pleural tap) for Light Criteria (Transudate vs Exudate: Protein & LDH ratio) + Sputum CBNAAT + Anti-TB or Antibiotic therapy.',
    redFlags: 'Massive effusion with tracheal shift, dyspnea at rest, empyema (foul pus tap).',
    diagnosis: 'Pleural Effusion (Tubercular / Synpneumonic)',
    chiefComplaints: ['Pleuritic chest pain worsening on deep breath', 'Progressive breathlessness', 'Dry cough & evening fever'],
    drugs: [
      'Inj. Diagnostic / Therapeutic Pleural Tap under USG guidance',
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Chest X-Ray PA View (Blunting of costophrenic angle / homogeneous opacity)', 'USG Thorax', 'Pleural Fluid Adenosine Deaminase (ADA), Protein, LDH, Cytology'],
    advice: 'Sleep on the affected side to allow better expansion of the healthy lung. Immediate pulmonology consult.',
  },
  {
    id: 'proto_resp_bronchiectasis',
    title: 'Bronchiectasis Infection & Airway Clearance Protocol',
    category: 'respiratory',
    targetGroup: 'Adults',
    guidelinesSummary: 'Postural drainage + Chest physiotherapy + High dose Amoxiclav 625mg TDS or Levofloxacin 500mg OD x 10 days for purulent exacerbation.',
    redFlags: 'Massive hemoptysis (>200 ml/24h), Pseudomonas aeruginosa superinfection.',
    diagnosis: 'Bronchiectasis Exacerbation',
    chiefComplaints: ['Chronic production of voluminous foul purulent sputum', 'Recurrent chest infections & hemoptysis', 'Digital clubbing'],
    drugs: [
      'Tab. Amoxicillin 500mg + Clavulanate 125mg (1-1-1 after food) x 10 days',
      'Cap. Inhaler Tiotropium 18mcg Rotacaps (1 capsule daily)',
      'Syp. Acetylcysteine 600mg Effervescent Tablet (1 tablet in glass water daily) x 14 days',
    ],
    tests: ['HRCT Chest (Diagnostic honeycombing & signet-ring sign)', 'Sputum Culture & Sensitivity'],
    advice: 'Perform Postural Drainage exercises twice daily. Use Acapella / Flutter device for airway mucus clearance.',
  },
  {
    id: 'proto_resp_cough_variant_asthma',
    title: 'Cough Variant Asthma (CVA) Adult Protocol',
    category: 'respiratory',
    targetGroup: 'Adults',
    guidelinesSummary: 'Dry chronic cough as sole manifestation of asthma. Inhaled Corticosteroid (Budesonide 200mcg BD) + Leukotriene Receptor Antagonist (Montelukast 10mg).',
    redFlags: 'Hemoptysis, weight loss, opacity on chest X-ray.',
    diagnosis: 'Cough Variant Asthma (CVA)',
    chiefComplaints: ['Persistent dry hacking cough > 4 weeks worsening at night', 'Cough triggered by cold air, exercise, or laughing'],
    drugs: [
      'Cap. Inhaler Budesonide 200mcg + Formoterol 6mcg (1 puff twice daily with spacer) x 1 month',
      'Tab. Montelukast 10mg (0-0-1 bedtime) x 1 month',
    ],
    tests: ['Spirometry with Reversibility Test (FEV1 > 12% improvement post-salbutamol)', 'Absolute Eosinophil Count'],
    advice: 'Rinse mouth with warm water after inhaler use. Avoid cold beverages and air-conditioner draft.',
  },
  {
    id: 'proto_resp_covid_flu',
    title: 'Viral Respiratory Flu & Post-Viral Hyperreactivity',
    category: 'respiratory',
    targetGroup: 'Adult & Adolescent',
    guidelinesSummary: 'Symptomatic care: Paracetamol 650mg + Inhaled Budesonide 400mcg BD + Oral Azelastine/Levocetirizine nasal spray.',
    redFlags: 'SpO2 < 93%, silent hypoxia, persistent high fever > 5 days, severe chest tightness.',
    diagnosis: 'Post-Viral Airway Hyperreactivity / Influenza',
    chiefComplaints: ['Low grade fever, sore throat & dry tickly cough', 'Fatigue and bodyache'],
    drugs: [
      'Tab. Paracetamol 650mg (1-0-1) S.O.S',
      'Tab. Levocetirizine 5mg + Montelukast 10mg (0-0-1 bedtime) x 10 days',
      'Cap. Inhaler Budesonide 400mcg (1 puff twice daily with spacer) x 14 days',
    ],
    tests: ['Pulse Oximetry SpO2', 'CBC & CRP'],
    advice: 'Monitor oxygen saturation (SpO2) 3 times daily. Hydrate with warm soups and fluids.',
  },
  {
    id: 'proto_resp_allergic_bronchopulmonary_aspergillosis',
    title: 'ABPA (Allergic Bronchopulmonary Aspergillosis) Protocol',
    category: 'respiratory',
    targetGroup: 'Asthmatic Patients',
    guidelinesSummary: 'Oral Itraconazole 200mg BD x 16 weeks + oral Prednisolone 0.5 mg/kg daily tapering x 3 months for hypersensitivity to Aspergillus fungal spores.',
    redFlags: 'Central bronchiectasis progression, steroid-resistant asthma flares.',
    diagnosis: 'Allergic Bronchopulmonary Aspergillosis (ABPA)',
    chiefComplaints: ['Severe steroid-dependent asthma', 'Coughing up brownish mucosal plugs', 'Recurrent low fever'],
    drugs: [
      'Cap. Itraconazole 200mg (1-0-1 after full meal) x 3 months',
      'Tab. Prednisolone 30mg (1-0-0 after breakfast) x 14 days (then taper by 5mg Q2 weeks)',
      'Cap. Inhaler Budesonide 400mcg + Formoterol 12mcg (2 puffs twice daily)',
    ],
    tests: ['Serum Total IgE (> 1000 IU/ml)', 'Aspergillus Specific IgE / IgG', 'HRCT Thorax'],
    advice: 'Take Itraconazole after full meal. Avoid exposure to decaying vegetation, compost, and moldy damp rooms.',
  },

  // ==========================================
  // 10. CARDIOVASCULAR & HYPERTENSION (❤️)
  // ==========================================
  {
    id: 'proto_hypertension_urgency',
    title: 'Hypertensive Urgency OPD Protocol',
    category: 'cardio',
    targetGroup: 'Adult (>18 yrs)',
    guidelinesSummary: 'BP > 180/120 mmHg without acute target organ damage. Reduce BP gradually over 24-48 hours using oral antihypertensives. Avoid sublingual Nifedipine.',
    redFlags: 'Chest pain, shortness of breath, severe headache, visual disturbances, neurological deficit (stroke signs), confusion.',
    diagnosis: 'Hypertensive Urgency (Controlled OPD)',
    chiefComplaints: ['Occipital headache & dizziness', 'Palpitations', 'High blood pressure reading'],
    drugs: [
      'Tab. Amlodipine 5mg (1-0-0 morning)',
      'Tab. Telmisartan 40mg (0-0-1 night)',
      'Tab. Clonidine 0.1mg (1 stat dose if SBP > 180 mmHg)',
    ],
    tests: ['ECG 12-Lead', 'Serum Creatinine & Blood Urea', 'Urine Routine for Albumin', 'Fundoscopy'],
    advice: 'Rest in quiet room for 30 mins. Restrict salt intake to < 5g/day. Recheck BP in 24 hours.',
  },
  {
    id: 'proto_cardio_htn_essential',
    title: 'Essential Stage I/II Hypertension Protocol',
    category: 'cardio',
    targetGroup: 'Adults (>18 yrs)',
    guidelinesSummary: 'First-line monotherapy: Telmisartan 40mg OD or Amlodipine 5mg OD. Target BP < 130/80 mmHg. Add Chlorthalidone 12.5mg if uncontrolled on 2 drugs.',
    redFlags: 'Chest tightness on exertion, bilateral pedal edema, proteinuria, nocturnal dyspnea.',
    diagnosis: 'Essential Hypertension (Stage I/II)',
    chiefComplaints: ['Asymptomatic high BP reading on routine checkup', 'Mild occipital heaviness'],
    drugs: [
      'Tab. Telmisartan 40mg (1-0-0 after breakfast) x 30 days',
      'Tab. Amlodipine 5mg (0-0-1 bedtime) (if SBP > 150 mmHg)',
    ],
    tests: ['ECG 12-Lead', 'Fasting Blood Sugar & Lipid Profile', 'Serum Creatinine & Electrolytes'],
    advice: 'DASH Diet: Low sodium (<2g/day), high potassium (fruits/vegetables). 30 mins daily walking. Avoid smoking.',
  },
  {
    id: 'proto_cardio_angina_stable',
    title: 'Chronic Stable Angina & Ischemic Heart Disease Protocol',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'Dual antiplatelet (Aspirin 75mg + Clopidogrel 75mg) + Statin (Atorvastatin 40mg) + Beta blocker (Metoprolol 25-50mg) + Sublingual Nitroglycerin SOS.',
    redFlags: 'Angina at rest, pain lasting > 20 mins, diaphoresis, radiation to jaw/left arm (Acute Coronary Syndrome!).',
    diagnosis: 'Chronic Stable Angina / Ischemic Heart Disease',
    chiefComplaints: ['Retrosternal squeezing chest heaviness on climbing stairs', 'Relieved by rest within 5 minutes'],
    drugs: [
      'Tab. Aspirin 75mg + Clopidogrel 75mg (0-1-0 after lunch) x 30 days',
      'Tab. Atorvastatin 40mg (0-0-1 bedtime) x 30 days',
      'Tab. Metoprolol Succinate XL 25mg (1-0-0 morning) x 30 days',
      'Tab. Nitroglycerin 2.6mg CR (1-0-1 after food)',
      'Sublingual Nitroglycerin 0.5mg Spray/Tablet S.O.S for chest pain',
    ],
    tests: ['ECG 12-Lead', 'Treadmill Stress Test (TMT) / Stress Echo', 'Coronary Angiography (CAG consult)'],
    advice: 'Keep Sublingual Nitroglycerin tablet always in pocket. If chest pain persists > 10 mins after 2 tablets, call ICU ambulance.',
  },
  {
    id: 'proto_cardio_stemi_firstaid',
    title: 'Acute Coronary Syndrome (STEMI) First Aid OPD Loading Protocol',
    category: 'cardio',
    targetGroup: 'Adult Emergency',
    guidelinesSummary: 'STAT MONA-B LOADING: Aspirin 300mg chewed + Clopidogrel 300mg + Atorvastatin 80mg + Sublingual Nitroglycerin + IV Morphine/Tramadol + STAT Primary PCI / Thrombolysis.',
    redFlags: 'ST-segment elevation on ECG, cardiogenic shock, pulmonary edema, VT/VF arrhythmia.',
    diagnosis: 'Acute Myocardial Infarction (STEMI / NSTEMI)',
    chiefComplaints: ['Crushing substernal chest pain radiating to left arm/jaw x 30 mins', 'Profuse cold sweating & air hunger'],
    drugs: [
      'Tab. Aspirin 300mg (CHEW 4 TABLETS OF 75mg STAT)',
      'Tab. Clopidogrel 300mg (TAKE 4 TABLETS OF 75mg STAT)',
      'Tab. Atorvastatin 80mg (TAKE 2 TABLETS OF 40mg STAT)',
      'Sublingual Nitroglycerin 0.5mg stat under tongue',
      'Inj. Heparin 5000 IU IV stat (or Enoxaparin 60mg SC stat)',
    ],
    tests: ['Stat 12-Lead ECG (Door-to-ECG < 10 mins)', 'Trop-I / Trop-T Quantitative', 'Stat Echocardiogram'],
    advice: 'EMERGENCY CATH LAB TRANSFER STAT FOR PRIMARY PCI! Door-to-Balloon target time < 90 mins.',
  },
  {
    id: 'proto_cardio_heart_failure',
    title: 'Congestive Heart Failure (CHF NYHA II/III) Protocol',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'GDMT 4 Pillars: ARNI (Sacubitril/Valsartan 50mg BD) + Beta blocker (Carvedilol / Bisoprolol) + MRA (Spironolactone 25mg) + SGLT2i (Dapagliflozin 10mg) + Furosemide loop diuretic.',
    redFlags: 'Acute pulmonary edema (pink frothy sputum, orthopnea), severe hypotension, oliguria.',
    diagnosis: 'Congestive Heart Failure (HFrEF / HFpEF)',
    chiefComplaints: ['Bilateral pedal edema & leg swelling', 'Shortness of breath on walking & orthopnea (needs 3 pillows to sleep)', 'Fatigue'],
    drugs: [
      'Tab. Sacubitril 24mg + Valsartan 26mg (1-0-1 after food) x 30 days',
      'Tab. Bisoprolol 2.5mg (1-0-0 morning) x 30 days',
      'Tab. Dapagliflozin 10mg (1-0-0 morning) x 30 days',
      'Tab. Spironolactone 25mg (1-0-0 morning) x 30 days',
      'Tab. Furosemide 40mg + Spironolactone 50mg (Lasix Special) (1-0-0 morning)',
    ],
    tests: ['Echocardiogram (EF% Measurement)', 'NT-proBNP Level', 'Serum Creatinine & Electrolytes'],
    advice: 'STRICT FLUID RESTRICTION < 1.5 LITERS/DAY! Weigh daily on waking up; report weight gain > 2kg in 2 days.',
  },
  {
    id: 'proto_cardio_atrial_fibrillation',
    title: 'Atrial Fibrillation (AF) Rate Control & Anticoagulation',
    category: 'cardio',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'CHA2DS2-VASc Score >= 2: Oral Anticoagulation (Apixaban 5mg BD / Rivaroxaban 20mg OD) + Rate Control (Diltiazem / Metoprolol / Digoxin).',
    redFlags: 'Acute ischemic stroke (FAST signs), hemodynamic instability (SBP < 90), rapid ventricular response > 150 bpm.',
    diagnosis: 'Atrial Fibrillation (Non-valvular)',
    chiefComplaints: ['Irregular racing heart beat (palpitations)', 'Dizziness and exertional dyspnea'],
    drugs: [
      'Tab. Apixaban 5mg (1-0-1 after food) x 30 days',
      'Tab. Diltiazem 60mg (1-0-1 after food) x 30 days',
      'Tab. Metoprolol XL 50mg (1-0-0 morning)',
    ],
    tests: ['ECG 12-Lead (Irregularly irregular rhythm, absent P waves)', '2D Echocardiogram (Left Atrial Size)', 'CHA2DS2-VASc Risk Score'],
    advice: 'Take oral anticoagulant strictly as prescribed to prevent embolic stroke. Avoid sudden alcohol intake.',
  },
  {
    id: 'proto_cardio_hyperlipidemia',
    title: 'Dyslipidemia & Statin Cardiovascular Risk Reduction',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'High-intensity statin (Rosuvastatin 20mg or Atorvastatin 40mg) to reduce LDL-C by > 50% (Target LDL < 70 mg/dL for high risk, <55 mg/dL for post-MI).',
    redFlags: 'Severe muscle pain/weakness with dark urine (statin myopathy / rhabdomyolysis).',
    diagnosis: 'Primary Hypercholesterolemia / Dyslipidemia',
    chiefComplaints: ['Asymptomatic high lipid report', 'Xanthelasma over eyelids'],
    drugs: [
      'Tab. Rosuvastatin 20mg (0-0-1 bedtime) x 3 months',
      'Tab. Ezetimibe 10mg (0-0-1 bedtime) (if LDL remains > 70 mg/dL on statin alone)',
    ],
    tests: ['Fasting Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL)', 'Serum CPK', 'Baseline LFT'],
    advice: 'Avoid saturated fats, trans-fats, and fried foods. Increase dietary soluble fiber. 45 mins exercise 5 days/week.',
  },
  {
    id: 'proto_cardio_psvt',
    title: 'PSVT (Paroxysmal Supraventricular Tachycardia) OPD First Aid',
    category: 'cardio',
    targetGroup: 'Young Adults',
    guidelinesSummary: 'Valsalva Maneuver (modified bearing down) -> Adenosine 6mg rapid IV push with 20ml saline flush if non-responsive.',
    redFlags: 'Syncope, hypotension, angina, wide-complex tachycardia (VT risk).',
    diagnosis: 'Paroxysmal Supraventricular Tachycardia (PSVT)',
    chiefComplaints: ['Sudden onset rapid pounding heart rate (160-220 bpm)', 'Lightheadedness & throat tightness'],
    drugs: [
      'Inj. Adenosine 6mg rapid IV push over 2 seconds via antecubital vein stat (followed by 20ml NS flush)',
      'Inj. Verapamil 5mg IV slow over 3 mins (if Adenosine fails and narrow QRS)',
      'Tab. Metoprolol XL 25mg (1-0-0)',
    ],
    tests: ['Continuous 12-Lead ECG Monitoring during Valsalva/Adenosine', 'Serum Potassium & TSH'],
    advice: 'Learn Modified Valsalva Maneuver: blow forcefully into empty 10ml syringe while lying down then elevate legs for 15 seconds.',
  },
  {
    id: 'proto_cardio_pad',
    title: 'Peripheral Arterial Disease (PAD) & Intermittent Claudication',
    category: 'cardio',
    targetGroup: 'Smokers & Diabetics',
    guidelinesSummary: 'Cilostazol 100mg BD + Aspirin 75mg OD + Atorvastatin 40mg + Supervised exercise walking program.',
    redFlags: 'Rest pain (pain in foot at night), non-healing arterial ulcer, gangrene of toes (critical limb ischemia!).',
    diagnosis: 'Peripheral Arterial Disease (Ankle-Brachial Index ABI < 0.9)',
    chiefComplaints: ['Cramping calf muscle pain while walking 200 meters, relieved by 5 mins rest', 'Cold numb feet'],
    drugs: [
      'Tab. Cilostazol 100mg (1-0-1 30 mins before meals) x 30 days',
      'Tab. Aspirin 75mg (0-1-0 after lunch) x 30 days',
      'Tab. Atorvastatin 40mg (0-0-1 bedtime) x 30 days',
    ],
    tests: ['Ankle-Brachial Index (ABI Measurement)', 'Arterial Doppler Ultrasonography of Lower Limbs'],
    advice: 'ABSOLUTE SMOKING CESSATION IS ESSENTIAL! Walk until pain starts, rest, then resume walking for 30 mins daily.',
  },
  {
    id: 'proto_cardio_dvt',
    title: 'Deep Vein Thrombosis (DVT) & Anticoagulation Protocol',
    category: 'cardio',
    targetGroup: 'Adults (Post-Surgical / Immobilized)',
    guidelinesSummary: 'Enoxaparin 1 mg/kg SC BD stat, transitioning to oral Rivaroxaban 15mg BD x 21 days then 20mg OD x 3-6 months.',
    redFlags: 'Sudden chest pain, dyspnea, hemoptysis, syncope (PULMONARY EMBOLISM EMERGENCY!).',
    diagnosis: 'Acute Lower Limb Deep Vein Thrombosis (DVT)',
    chiefComplaints: ['Unilateral painful swollen calf & thigh muscle', 'Warmth, redness & Homans sign positive'],
    drugs: [
      'Inj. Enoxaparin 60mg (0.6ml) Subcutaneous injection twice daily x 5 days',
      'Tab. Rivaroxaban 15mg (1-0-1 after food) x 21 days (then 20mg 1-0-0 for 3 months)',
    ],
    tests: ['Venous Color Doppler Ultrasound of Legs', 'D-Dimer Level', 'CBC & Platelet Count'],
    advice: 'Wear Graduated Compression Stockings (Class II). Elevate leg above heart level when lying down. DO NOT MASSAGE CALF!',
  },

  // ==========================================
  // 12. GASTROENTEROLOGY & HEPATO (🤢)
  // ==========================================
  {
    id: 'proto_gastro_gerd',
    title: 'Gastroesophageal Reflux Disease (GERD) & Acid Peptic Ulcer',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'Proton Pump Inhibitor (Pantoprazole 40mg / Rabeprazole 20mg) 30 mins before breakfast x 4-8 weeks + Prokinetic (Domperidone 30mg SR) + Sucralfate syrup.',
    redFlags: 'Dysphagia (difficulty swallowing), odynophagia, hematemesis (coffee-ground vomit), melena (black tarry stool), involuntary weight loss.',
    diagnosis: 'Gastroesophageal Reflux Disease (GERD) / Erosive Gastritis',
    chiefComplaints: ['Retrosternal heartburn worsening after meals & lying down', 'Sour acid eructations / regurgitation', 'Epigastric fullness'],
    drugs: [
      'Cap. Pantoprazole 40mg + Domperidone 30mg SR (1-0-0 30 mins before breakfast) x 30 days',
      'Syp. Sucralfate 1g + Oxetacaine (10ml 4 times daily: 1h before meals & bedtime) x 14 days',
      'Tab. Dicyclomine 10mg + Mefenamic Acid 250mg S.O.S for cramps',
    ],
    tests: ['Upper GI Endoscopy (EGD)', 'H. pylori Stool Antigen / Urea Breath Test'],
    advice: 'Do not lie down within 2-3 hours of eating. Elevate head end of bed by 6 inches. Avoid tea, coffee, chocolate, citrus fruits, and spicy fried foods.',
  },
  {
    id: 'proto_gastro_acute_gastroenteritis',
    title: 'Acute Gastroenteritis & Infectious Food Poisoning',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'Oral Rehydration Solution (ORS) + Ondansetron 4mg BD + Bacillus Clausii probiotics. Add Ofloxacin 200mg + Ornidazole 500mg BD x 5 days if dysentery/fever.',
    redFlags: 'Severe dehydration (oliguria, confusion, SBP < 90), high fever > 102°F, gross bloody dysentery.',
    diagnosis: 'Acute Gastroenteritis / Food Poisoning',
    chiefComplaints: ['Frequent watery loose motions 6-10 times/day', 'Nausea, vomiting & abdominal cramps', 'Low fever & thirst'],
    drugs: [
      'Tab. Ofloxacin 200mg + Ornidazole 500mg (1-0-1 after food) x 5 days',
      'Tab. Ondansetron 4mg (1-0-1 before food) S.O.S for vomiting',
      'Cap. Bacillus Clausii Spores (1-0-1 after food) x 5 days',
      'Syp. ORS Solution (sip 200ml after every loose stool)',
      'Tab. Dicyclomine 20mg (1-0-1) S.O.S for abdominal cramps',
    ],
    tests: ['Stool Routine, Microscopy & Culture', 'Serum Electrolytes & Renal Function'],
    advice: 'Drink 3 Liters of fluids daily (ORS, coconut water, rice kanji). Eat light bland diet (curd rice, banana, toast). Avoid milk & raw salads.',
  },
  {
    id: 'proto_gastro_ibs',
    title: 'Irritable Bowel Syndrome (IBS-D / IBS-C) Protocol',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'IBS-D: Mebeverine 135mg TDS / Otilonium + Probiotics + Low FODMAP diet. IBS-C: Isabgol Husk (Psyllium) 2 tsp at bedtime + Prucalopride 2mg.',
    redFlags: 'Nocturnal diarrhea (waking up from sleep to pass stool), rectal bleeding, anemia, onset after age 50.',
    diagnosis: 'Irritable Bowel Syndrome (Rome IV Criteria)',
    chiefComplaints: ['Recurrent abdominal pain relieved by defecation', 'Alternating diarrhea and constipation / mucus in stool', 'Bloating'],
    drugs: [
      'Tab. Mebeverine Hydrochloride 135mg (1-1-1 20 mins before meals) x 30 days',
      'Cap. Saccharomyces Boulardii 250mg (1-0-1 after food) x 14 days',
      'Tab. Chlordiazepoxide 5mg + Clidinium 2.5mg (1-0-1) x 14 days (for stress-related spasm)',
    ],
    tests: ['Complete Blood Count', 'Stool Occult Blood', 'Tissue Transglutaminase tTG IgA (rule out Celiac Disease)', 'Colonoscopy (if >45 yrs)'],
    advice: 'Follow Low-FODMAP Diet (limit onions, garlic, wheat, beans, artificial sweeteners). Stress management & regular sleep schedule.',
  },
  {
    id: 'proto_gastro_acute_gastritis',
    title: 'Acute Alcohol & NSAID-Induced Gastritis Protocol',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'IV/Oral PPI (Rabeprazole 20mg BD) + L-Carnosine Zinc / Rebamipide + Antacid gel for mucosal healing.',
    redFlags: 'Hematemesis (bright red or dark coffee-ground vomit), black tarry stools (melena), orthostatic hypotension.',
    diagnosis: 'Acute Erosive Gastritis',
    chiefComplaints: ['Severe burning epigastric pain', 'Nausea, vomiting & loss of appetite', 'Post-meal fullness'],
    drugs: [
      'Tab. Rabeprazole 20mg (1-0-1 30 mins before meals) x 14 days',
      'Syp. Megaldrate 540mg + Simethicone 50mg (10ml 4 times daily) x 10 days',
      'Cap. Pantoprazole 40mg IV (if vomiting prevents oral intake)',
    ],
    tests: ['Serum Hemoglobin', 'Stool Occult Blood', 'Upper GI Endoscopy'],
    advice: 'STRICTLY STOP NSAID PAINKILLERS AND ALCOHOL! Eat small bland non-spicy meals. Avoid carbonated beverages.',
  },
  {
    id: 'proto_gastro_nafld',
    title: 'Non-Alcoholic Fatty Liver Disease (NAFLD / NASH) Protocol',
    category: 'gastro',
    targetGroup: 'Overweight & Diabetic Adults',
    guidelinesSummary: 'Lifestyle modification (7-10% weight loss) + Vitamin E 800 IU daily + Saroglitazar 4mg OD / Metformin + Ursodeoxycholic Acid (UDCA).',
    redFlags: 'Jaundice, ascites, spider nevi, elevated INR, palmar erythema (cirrhosis signs).',
    diagnosis: 'NAFLD / Non-Alcoholic Steatohepatitis (NASH)',
    chiefComplaints: ['Asymptomatic high liver enzymes (SGOT/SGPT)', 'Mild right upper quadrant heaviness & fatigue'],
    drugs: [
      'Tab. Ursodeoxycholic Acid (UDCA) 300mg (1-0-1 after food) x 3 months',
      'Cap. Vitamin E 400 IU (1-0-1 after meals) x 3 months',
      'Tab. Saroglitazar 4mg (1-0-0 after breakfast) x 3 months (for NASH + dyslipidemia)',
    ],
    tests: ['FibroScan / Transient Elastography', 'Ultrasound Abdomen (Fatty Liver Grade I-III)', 'LFT, Lipid Profile, HbA1c'],
    advice: 'Target 7-10% gradual weight loss (0.5 kg/week). Aerobic exercise 150 mins/week. Avoid alcohol and high-fructose corn syrup beverages.',
  },
  {
    id: 'proto_gastro_cholecystitis',
    title: 'Acute Cholecystitis & Gallstone Biliary Colic Protocol',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'NPO + IV Hydration + IV Ceftriaxone 1g BD + Metronidazole + IV Hyoscine / Drotaverine for acute right upper quadrant pain. Elective Laparoscopic Cholecystectomy consult.',
    redFlags: 'Murphy sign positive, high fever with rigors, jaundice (choledocholithiasis suspect), gall bladder empyema.',
    diagnosis: 'Acute Cholecystitis / Biliary Colic',
    chiefComplaints: ['Severe right upper quadrant / epigastric pain radiating to right shoulder', 'Nausea, vomiting & fever following fatty meal'],
    drugs: [
      'Inj. Ceftriaxone 1g IV twice daily',
      'Inj. Metronidazole 500mg IV 3 times daily',
      'Inj. Drotaverine 40mg IV slow push stat S.O.S for biliary spasm',
      'Inj. Pantoprazole 40mg IV twice daily',
    ],
    tests: ['Ultrasound Abdomen (Gallbladder wall thickening > 4mm, pericholecystic fluid, gallstones)', 'LFT, Serum Amylase, CBC'],
    advice: 'KEEP NPO DURING ACUTE PAIN! Low-fat diet. Surgical consultation for Laparoscopic Cholecystectomy.',
  },
  {
    id: 'proto_gastro_alcoholic_hepatitis',
    title: 'Alcoholic Hepatitis & Liver Protection Protocol',
    category: 'gastro',
    targetGroup: 'Chronic Alcohol Users',
    guidelinesSummary: 'ABSOLUTE ALCOHOL ABSTINENCE! High protein diet + Thiamine 100mg IV + Metadoxine 500mg BD + Silymarin 140mg TDS. For Maddrey DF >= 32: Oral Prednisolone 40mg daily x 28 days.',
    redFlags: 'Maddrey Discriminant Function (DF) >= 32, hepatic encephalopathy, spontaneous bacterial peritonitis (SBP), hematemesis.',
    diagnosis: 'Acute Alcoholic Hepatitis',
    chiefComplaints: ['Jaundice (deep yellow eyes)', 'Right upper quadrant abdominal pain', 'Anorexia, nausea & dark urine'],
    drugs: [
      'Tab. Metadoxine 500mg (1-0-1 after food) x 30 days',
      'Tab. Silymarin 140mg (1-1-1 after food) x 30 days',
      'Tab. Thiamine (Vit B1) 100mg (1-0-1) x 30 days',
      'Tab. S-Adenosyl L-Methionine (SAMe) 400mg (1-0-1 empty stomach) x 30 days',
    ],
    tests: ['Maddrey DF Score (4.6 × [PT - Control PT] + Serum Bilirubin)', 'LFT (AST:ALT ratio > 2:1), INR, Albumin'],
    advice: 'STRICT PERMANENT ALCOHOL ABSTINENCE IS LIFE SAVING! High calorie high protein balanced diet. De-addiction counseling.',
  },
  {
    id: 'proto_gastro_constipation_chronic',
    title: 'Chronic Functional Constipation Protocol',
    category: 'gastro',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'Osmotic laxative (Lactulose 15-30ml / Polyethylene Glycol PEG 3350 17g) at bedtime + Dietary fiber expansion (Isabgol 2 tsp) + Adequate hydration.',
    redFlags: 'New onset constipation in patients > 50 yrs, hematochezia (blood in stool), unintentional weight loss, palpable abdominal mass.',
    diagnosis: 'Chronic Functional Constipation',
    chiefComplaints: ['Infrequent bowel movements (<3 times/week)', 'Hard lumpy stools & excessive straining', 'Sensation of incomplete evacuation'],
    drugs: [
      'Syp. Lactulose 10g/15ml (15 to 30ml bedtime with full glass water) x 14 days',
      'Sachet Polyethylene Glycol PEG 3350 17g (1 sachet in 200ml water once daily morning)',
      'Sachet Psyllium Husk (Isabgol) 2 teaspoons in warm water bedtime',
    ],
    tests: ['Serum Potassium & TSH', 'Colonoscopy (if age > 50 yrs or alarm signs)'],
    advice: 'Drink 2.5 to 3 Liters of water daily. Increase dietary fiber (whole grains, fruits, vegetables). Do not ignore call to stool.',
  },
  {
    id: 'proto_gastro_ulcerative_colitis',
    title: 'Ulcerative Colitis (Mild-Moderate Flare) Protocol',
    category: 'gastro',
    targetGroup: 'Adults',
    guidelinesSummary: 'Oral Mesalamine (5-ASA) 2.4g - 4.8g daily + Mesalamine enema 1g bedtime. Add oral Prednisolone 40mg daily if non-responsive.',
    redFlags: 'Toxic megacolon (severe abdominal distension, fever, tachycardia, leukocytosis), > 6 bloody stools/day with Hb drop.',
    diagnosis: 'Ulcerative Colitis (Mild to Moderate Distal Proctosigmoiditis)',
    chiefComplaints: ['Recurrent bloody diarrhea with rectal tenesmus', 'Crampy lower abdominal pain', 'Passing mucus & blood'],
    drugs: [
      'Tab. Mesalamine (5-ASA) 1.2g (1-1-1 after food) x 3 months',
      'Suppository Mesalamine 1g Vaginal/Rectal Suppository (1 at bedtime) x 4 weeks',
      'Tab. Prednisolone 40mg (1-0-0 after breakfast) x 14 days (then taper by 5mg weekly)',
      'Cap. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Colonoscopy with Mucosal Biopsy', 'Fecal Calprotectin', 'Stool Culture & Clostridium difficile toxin'],
    advice: 'Take Mesalamine consistently even during symptom-free remission to prevent relapse. Avoid NSAIDs which trigger UC flares.',
  },
  {
    id: 'proto_gastro_pancreatitis_acute',
    title: 'Acute Pancreatitis Emergency Initial OPD Protocol',
    category: 'gastro',
    targetGroup: 'Adult Emergency',
    guidelinesSummary: 'CRITICAL EMERGENCY! KEEP STRICTLY NPO! Aggressive IV fluid resuscitation with Ringer Lactate (250-500 ml/hr) + IV Analgesia (Tramadol/Pethidine) + STAT CT Abdomen.',
    redFlags: 'Hemorrhagic pancreatitis (Cullen sign / Grey Turner sign), ARDS, oliguria, hypotension, hypocalcemia.',
    diagnosis: 'Acute Pancreatitis (Gallstone / Alcoholic)',
    chiefComplaints: ['Severe knife-like epigastric pain radiating straight to back', 'Recurrent vomiting, abdominal distension & low fever'],
    drugs: [
      'Inj. Ringer Lactate 1000ml IV rapid infusion (target urine output > 0.5 ml/kg/hr)',
      'Inj. Tramadol 100mg IV in 100ml NS slow infusion Q8H',
      'Inj. Pantoprazole 40mg IV twice daily',
      'Inj. Ondansetron 4mg IV stat',
    ],
    tests: ['Serum Amylase & Lipase (Elevation > 3 times ULN)', 'Contrast-Enhanced CT Abdomen (CECT at 72 hours)', 'USG Abdomen (Check for gallstones)'],
    advice: 'KEEP ABSOLUTELY NPO UNTIL PAIN & VOMITING SUBSIDE! ICU admission for fluid monitoring & nutrition management.',
  },
];

const SPECIALTIES_STORAGE_KEY = 'prescribepro_specialties_v1';
const DRUGS_STORAGE_KEY = 'prescribepro_drugs_v1';
const PROTOCOLS_STORAGE_KEY = 'prescribepro_custom_protocols_v1';

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

export function getClinicalProtocols(): ClinicalProtocol[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(PROTOCOLS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ClinicalProtocol[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, ClinicalProtocol>();
          DEFAULT_CLINICAL_PROTOCOLS.forEach((proto) => map.set(proto.id, proto));
          parsed.forEach((proto) => {
            if (proto && proto.id) {
              map.set(proto.id, proto);
            }
          });
          return Array.from(map.values());
        }
      } catch (e) {}
    }
  }
  return DEFAULT_CLINICAL_PROTOCOLS;
}

export function saveClinicalProtocols(data: ClinicalProtocol[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROTOCOLS_STORAGE_KEY, JSON.stringify(data));
  }
}

export function getDrugCatalog(): DrugItem[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(DRUGS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: DrugItem[] = JSON.parse(saved);
        const map = new Map<string, DrugItem>();
        COMPREHENSIVE_GENERIC_DRUGS.forEach((item) => map.set(item.id, item));
        parsed.forEach((item) => {
          if (item && item.id) {
            const defaultItem = COMPREHENSIVE_GENERIC_DRUGS.find((d) => d.id === item.id);
            map.set(item.id, defaultItem ? { ...item, genericName: defaultItem.genericName } : item);
          }
        });
        return Array.from(map.values());
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
