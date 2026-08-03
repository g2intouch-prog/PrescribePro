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

export type FormulationType = 'tab' | 'cap' | 'inj' | 'syp' | 'drops' | 'topical';

export type ClinicalSpecialty =
  | 'endocrinology'
  | 'diabetes'
  | 'thyroid'
  | 'cardiology'
  | 'hypertension'
  | 'neurology'
  | 'psychiatry'
  | 'gastroenterology'
  | 'pulmonology'
  | 'nephrology'
  | 'urology'
  | 'dermatology'
  | 'orthopedics'
  | 'gynecology'
  | 'dental'
  | 'ent'
  | 'ophthalmology'
  | 'hepatology'
  | 'emergency'
  | 'pediatric'
  | 'general';

export interface DrugItem {
  id: string;
  genericName: string;
  brandName?: string;
  category: 'adult' | 'pediatric' | 'infant' | 'all';
  dosage: string;
  duration: string;
  keywords?: string; // Search aliases (e.g. cough, alkaliser, acidity, pain, fever)
  formulation?: FormulationType;
  specialties?: ClinicalSpecialty[];
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
  bp: ['telmisartan', 'amlodipine', 'cilnidipine', 'benidipine', 'enalapril', 'ramipril', 'atenolol', 'metoprolol', 'nebivolol', 'methyldopa', 'sacubitril', 'valsartan', 'chlorthalidone', 'hydrochlorothiazide', 'lasix', 'furosemide'],
  hypertension: ['telmisartan', 'amlodipine', 'cilnidipine', 'benidipine', 'enalapril', 'ramipril', 'atenolol', 'metoprolol', 'nebivolol', 'methyldopa', 'sacubitril', 'valsartan', 'chlorthalidone', 'hydrochlorothiazide', 'lasix', 'furosemide'],
  htn: ['telmisartan', 'amlodipine', 'cilnidipine', 'benidipine', 'enalapril', 'ramipril', 'atenolol', 'metoprolol', 'nebivolol', 'methyldopa', 'sacubitril', 'valsartan', 'chlorthalidone', 'hydrochlorothiazide', 'lasix', 'furosemide'],
  diabetes: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'insulin', 'lantus', 'actrapid', 'mixtard'],
  diabetic: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'insulin', 'lantus', 'actrapid', 'mixtard'],
  'diabetes type 2': ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'insulin', 'lantus'],
  'type 2': ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'insulin', 'lantus'],
  t2dm: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'insulin', 'lantus'],
  sugar: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'insulin'],
  thyroid: ['levothyroxine', 'thyronorm', 'eltroxin', 'carbimazole', 'neomercazole', 'methimazole', 'propylthiouracil'],
  sleep: ['alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'zolpidem', 'melatonin', 'quetiapine'],
  insomnia: ['zolpidem', 'clonazepam', 'alprazolam', 'lorazepam', 'melatonin', 'quetiapine'],
  anxiety: ['alprazolam', 'clonazepam', 'diazepam', 'propranolol', 'escitalopram', 'sertraline', 'buspirone'],
  depression: ['escitalopram', 'sertraline', 'fluoxetine', 'duloxetine', 'amitriptyline', 'mirtazapine'],
  'mood swing': ['divalproex', 'valproate', 'quetiapine', 'olanzapine', 'lithium', 'carbamazepine'],
  'mood swings': ['divalproex', 'valproate', 'quetiapine', 'olanzapine', 'lithium', 'carbamazepine'],
  bipolar: ['divalproex', 'valproate', 'quetiapine', 'olanzapine', 'lithium', 'lamotrigine'],

  migraine: ['flunarizine', 'sumatriptan', 'naproxen', 'propranolol', 'domperidone', 'paracetamol', 'amitriptyline'],
  neuropathy: ['pregabalin', 'gabapentin', 'methylcobalamin', 'amitriptyline', 'alpha lipoic acid', 'benfotiamine'],
  epilepsy: ['levetiracetam', 'phenytoin', 'valproate', 'carbamazepine', 'clobazam', 'clonazepam', 'oxcarbazepine'],
  seizure: ['levetiracetam', 'phenytoin', 'valproate', 'carbamazepine', 'clobazam', 'clonazepam', 'diazepam', 'midazolam'],

  emergency: ['adrenaline', 'epinephrine', 'atropine', 'dextrose', 'hydrocortisone', 'pheniramine', 'avil', 'noradrenaline', 'dopamine', 'furosemide', 'lasix', 'tramadol', 'ondansetron', 'deriphylline', 'iv fluids', 'normal saline', 'ringer lactate', 'ors', 'diazepam'],
  er: ['adrenaline', 'epinephrine', 'atropine', 'dextrose', 'hydrocortisone', 'pheniramine', 'avil', 'noradrenaline', 'dopamine', 'furosemide', 'lasix', 'tramadol', 'ondansetron', 'deriphylline', 'iv fluids', 'normal saline', 'ringer lactate', 'ors', 'diazepam'],
  hypoglycemia: ['dextrose', 'dextrose 25%', 'dextrose 10%', 'glucagon', 'glucose', 'ors'],
  hypothermia: ['normal saline', 'warmed ns', 'thiamine', 'hydrocortisone'],
  'heat exhaustion': ['normal saline', 'ors', 'diazepam', 'paracetamol', 'iv fluids'],
  'heat stroke': ['normal saline', 'ors', 'diazepam', 'paracetamol', 'iv fluids'],
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
  nasal: ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline', 'oxymetazoline', 'nasivion', 'oxy'],
  'nasal drop': ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline', 'oxymetazoline', 'nasivion', 'oxy'],
  'nasal spray': ['nasal spray', 'nasal drops', 'fluticasone', 'otrivin', 'nasoclear', 'xylometazoline', 'oxymetazoline', 'nasivion', 'oxy'],
  oxy: ['oxymetazoline', 'nasivion', 'otrivin', 'oxygen', 'oxycodone', 'oxytetracycline', 'oxytocin', 'oxybutynin', 'oxcarbazepine'],
  xylometazoline: ['xylometazoline', 'otrivin', 'nasoclear', 'nasal drops', 'decongestant'],
  oxymetazoline: ['oxymetazoline', 'nasivion', 'oxy', 'nasal drops', 'decongestant'],
  sucralfate: ['sucralfate', 'sucrafil', 'sucral', 'carafate', 'ulcer', 'gastritis', 'gerd'],
  erythromycin: ['erythromycin', 'erythrocin', 'macrolide', 'antibiotic'],
  roxithromycin: ['roxithromycin', 'roxid', 'macrolide', 'antibiotic'],
  clarithromycin: ['clarithromycin', 'claribid', 'macrolide', 'antibiotic', 'h pylori'],
  lincomycin: ['lincomycin', 'lincocin', 'lincosamide', 'antibiotic'],
  clindamycin: ['clindamycin', 'dalacin', 'cleocin', 'lincosamide', 'antibiotic'],
  vancomycin: ['vancomycin', 'vancocin', 'glycopeptide', 'antibiotic'],
  linezolid: ['linezolid', 'lizoforce', 'linospan', 'oxazolidinone', 'antibiotic'],

  dermatology: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  derma: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  skin: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole', 'permethrin', 'calamine'],
  cream: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'lotion', 'mupirocin', 'fucidin', 'tenovate', 'elocon', 'luliconazole'],
  ointment: ['dermatology', 'derma', 'skin', 'cream', 'ointment', 'mupirocin', 'burnol', 'silver sulfadiazine'],

  orthopedics: ['aceclofenac', 'diclofenac', 'etoricoxib', 'thiocolchicoside', 'chymoral', 'tramadol', 'pregabalin', 'gabapentin', 'glucosamine', 'diacerein', 'methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'tizanidine', 'baclofen', 'calcium carbonate', 'calcium citrate', 'calcitriol'],
  ortho: ['aceclofenac', 'diclofenac', 'etoricoxib', 'thiocolchicoside', 'chymoral', 'tramadol', 'pregabalin', 'gabapentin', 'glucosamine', 'diacerein', 'methotrexate', 'sulfasalazine', 'hydroxychloroquine', 'tizanidine', 'baclofen', 'calcium carbonate', 'calcium citrate', 'calcitriol'],
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

  endocrinology: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'levothyroxine', 'carbimazole', 'insulin', 'lantus', 'saroglitazar'],
  endo: ['metformin', 'glimepiride', 'gliclazide', 'vildagliptin', 'teneligliptin', 'sitagliptin', 'dapagliflozin', 'empagliflozin', 'voglibose', 'pioglitazone', 'semaglutide', 'tirzepatide', 'levothyroxine', 'carbimazole', 'insulin', 'lantus', 'saroglitazar'],

  urology: ['disodium hydrogen citrate', 'potassium citrate', 'tamsulosin', 'flavoxate', 'finasteride', 'darifenacin', 'solifenacin', 'furosemide'],
  nephrology: ['ketoanalogues', 'erythropoietin', 'epo', 'sevelamer', 'calcium acetate', 'furosemide', 'lasix', 'torsemide', 'sodium bicarbonate', 'prograf', 'mycophenolate', 'potassium citrate'],
  renal: ['ketoanalogues', 'erythropoietin', 'epo', 'sevelamer', 'calcium acetate', 'furosemide', 'lasix', 'torsemide', 'sodium bicarbonate', 'prograf', 'mycophenolate', 'potassium citrate'],

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

export function normalizeDrugItem(drug: DrugItem): DrugItem & { formulation: FormulationType; specialties: ClinicalSpecialty[] } {
  // 1. Determine formulation dynamically (ALWAYS recompute to purge any stale/corrupted values from localStorage)
  const name = (drug.genericName || '').toLowerCase();
  const dose = (drug.dosage || '').toLowerCase();
  const kw = (drug.keywords || '').toLowerCase();
  const full = `${name} ${dose} ${kw}`;

  let formulation: FormulationType = 'tab';

  if (
    name.startsWith('inj') ||
    /\b(inj|inj\.|injection|infusion|vial|ampoule|amp|iv|im|iv\/im|sc|s\.c\.|subcutaneous|pen|cartridge|syringe|auto-injector|iu\/ml|units\/ml|insulin|glargine|lantus|basalog|humalog|novorapid|actrapid|mixtard|victoza|trulicity|ozempic|mounjaro|clexane|enoxaparin|heparin|epo|erythropoietin|tetanus|arv|erig|hrig|asv)\b/i.test(full)
  ) {
    formulation = 'inj';
  } else if (name.startsWith('cap') || /\b(cap|cap\.|capsule|capsules|softgel)\b/i.test(full)) {
    formulation = 'cap';
  } else if (name.startsWith('syp') || /\b(syp|syp\.|syrup|suspension|linctus|expectorant|elixir|liquid|solution|oral solution|ors|respules)\b/i.test(full)) {
    formulation = 'syp';
  } else if (/\b(drop|drops|drop\.|drops\.|eyedrop|eardrop|nasaldrop)\b/i.test(full) || full.includes('eye drop') || full.includes('ear drop') || full.includes('nasal drop')) {
    formulation = 'drops';
  } else if (/\b(cream|ointment|oint|oint\.|gel|lotion|shampoo|mouthwash|gargle|spray|patch|paste|toothpaste)\b/i.test(full)) {
    formulation = 'topical';
  } else {
    formulation = 'tab';
  }

  // 2. Determine specialties
  let specialties: ClinicalSpecialty[] = drug.specialties ? [...drug.specialties] : [];
  if (specialties.length === 0) {
    const name = (drug.genericName || '').toLowerCase();
    const kw = (drug.keywords || '').toLowerCase();
    const text = `${name} ${kw}`;

    const addIf = (spec: ClinicalSpecialty, ...patterns: (string | RegExp)[]) => {
      const match = patterns.some((p) => (typeof p === 'string' ? text.includes(p) : p.test(text)));
      if (match && !specialties.includes(spec)) {
        specialties.push(spec);
      }
    };

    // Diuretics
    addIf('cardiology', /\b(furosemide|frusemide|lasix|torsemide|torsem|spironolactone|lasilactone)\b/i);
    addIf('hypertension', /\b(furosemide|frusemide|lasix|torsemide|torsem|spironolactone|lasilactone)\b/i);
    addIf('nephrology', /\b(furosemide|frusemide|lasix|torsemide|torsem|spironolactone|lasilactone)\b/i);
    addIf('emergency', /\b(furosemide|frusemide|lasix|torsemide)\b/i);
    addIf('general', /\b(furosemide|frusemide|lasix|torsemide)\b/i);

    // Antidiabetics
    addIf('endocrinology', /\b(metformin|glimepiride|gliclazide|vildagliptin|teneligliptin|sitagliptin|dapagliflozin|empagliflozin|voglibose|pioglitazone|semaglutide|tirzepatide|insulin|lantus|saroglitazar|glibenclamide|glipizide)\b/i);
    addIf('diabetes', /\b(metformin|glimepiride|gliclazide|vildagliptin|teneligliptin|sitagliptin|dapagliflozin|empagliflozin|voglibose|pioglitazone|semaglutide|tirzepatide|insulin|lantus|saroglitazar|glibenclamide|glipizide)\b/i);
    addIf('nephrology', /\b(dapagliflozin|empagliflozin)\b/i); // SGLT2i renal protection
    addIf('cardiology', /\b(dapagliflozin|empagliflozin)\b/i); // SGLT2i heart failure

    // Thyroid
    addIf('endocrinology', /\b(thyroid|levothyroxine|thyronorm|eltroxin|carbimazole|neomercazole|methimazole|propylthiouracil)\b/i);
    addIf('thyroid', /\b(thyroid|levothyroxine|thyronorm|eltroxin|carbimazole|neomercazole|methimazole|propylthiouracil)\b/i);

    // Antihypertensives & Cardiac
    addIf('hypertension', /\b(telmisartan|amlodipine|cilnidipine|benidipine|enalapril|ramipril|atenolol|metoprolol|nebivolol|methyldopa|sacubitril|valsartan|chlorthalidone|hydrochlorothiazide|nifedipine|prazosin|clonidine|losartan)\b/i);
    addIf('cardiology', /\b(telmisartan|amlodipine|cilnidipine|benidipine|enalapril|ramipril|atenolol|metoprolol|nebivolol|sacubitril|valsartan|chlorthalidone|hydrochlorothiazide|aspirin|clopidogrel|rosuvastatin|atorvastatin|amiodarone|nitroglycerin|isosorbide|digoxin|diltiazem|verapamil|fenofibrate)\b/i);
    addIf('nephrology', /\b(telmisartan|amlodipine|cilnidipine|benidipine|enalapril|ramipril|losartan)\b/i); // Diabetic nephropathy & BP control

    // Neurology & Nerve Pain
    addIf('neurology', /\b(levetiracetam|phenytoin|valproate|divalproex|carbamazepine|clobazam|clonazepam|oxcarbazepine|pregabalin|gabapentin|flunarizine|sumatriptan|methylcobalamin|donepezil|trihexyphenidyl|l-dopa|baclofen|tizanidine)\b/i);
    addIf('endocrinology', /\b(pregabalin|gabapentin|methylcobalamin|alpha lipoic)\b/i); // Diabetic neuropathy
    addIf('orthopedics', /\b(pregabalin|gabapentin|methylcobalamin|baclofen|tizanidine)\b/i); // Spine & nerve pain

    // Psychiatry
    addIf('psychiatry', /\b(alprazolam|clonazepam|diazepam|lorazepam|zolpidem|escitalopram|sertraline|fluoxetine|duloxetine|amitriptyline|quetiapine|olanzapine|risperidone|valproate|divalproex|lithium|lamotrigine|mirtazapine|haloperidol|trihexyphenidyl|melatonin)\b/i);

    // Gastroenterology & Hepatology
    addIf('gastroenterology', /\b(pantoprazole|rabeprazole|omeprazole|esomeprazole|sucralfate|ranitidine|famotidine|dicyclomine|drotaverine|ondansetron|domperidone|metoclopramide|bacillus clausii|saccharomyces|ors|racecadotril|loperamide|lactulose|peg 3350|itopride|l-ornithine|silymarin|ursodeoxycholic|udca|rifaximin)\b/i);
    addIf('hepatology', /\b(silymarin|l-ornithine|ornithine|ursodeoxycholic|udca|same|metadoxine|lactulose|rifaximin|tenofovir|entecavir|vitamin k|silybon|hepamerz|ursocol|spironolactone)\b/i);

    // Pulmonology & Allergy
    addIf('pulmonology', /\b(salbutamol|budesonide|formoterol|fluticasone|ipratropium|duolin|foracort|seretide|montelukast|acebrophylline|doxofylline|dextromethorphan|ambroxol|terbutaline|guaifenesin|codeine|astalin|deriphylline)\b/i);

    // Dermatology
    addIf('dermatology', /\b(mupirocin|fusidic|silver sulfadiazine|clobetasol|momethasone|clotrimazole|luliconazole|terbinafine|ketoconazole|permethrin|calamine|adapalene|benzoyl peroxide|burnol)\b/i);

    // Orthopedics & Rheumatology
    addIf('orthopedics', /\b(aceclofenac|diclofenac|etoricoxib|thiocolchicoside|chymoral|tramadol|glucosamine|diacerein|methotrexate|sulfasalazine|hydroxychloroquine|calcium carbonate|calcium citrate|calcitriol|zerodol)\b/i);

    // Gynecology & OBGYN
    addIf('gynecology', /\b(dydrogesterone|progesterone|tranexamic|norethisterone|ferrous ascorbate|folic acid|clomiphene|cabergoline|isoxsuprine|candid v|clindamycin vaginal|miconazole|oxytocin)\b/i);

    // Dental
    addIf('dental', /\b(ketorolac|amoxicillin|metronidazole|chlorhexidine|mouthwash|kenacort|oral gel|lignocaine gel|toothpaste|toothache)\b/i);

    // ENT
    addIf('ent', /\b(ear drop|eardrop|nasal spray|nasal drop|gargle|mouthwash|waxpol|candibiotic|fluticasone|otrivin|betadine|chlorhexidine|xylometazoline|oxymetazoline|nasivion)\b/i);

    // Ophthalmology
    addIf('ophthalmology', /\b(eye drop|eyedrop|opthalmic|ophthalmic|moxifloxacin|tobramycin|ofloxacin eye|carboxymethylcellulose|olopatadine|timolol|brimonidine|atropine|nepafenac)\b/i);

    // Emergency & Critical Care
    addIf('emergency', /\b(adrenaline|epinephrine|atropine|dextrose|hydrocortisone|avil|pheniramine|noradrenaline|dopamine|furosemide|lasix|tramadol|ondansetron|deriphylline|normal saline|ringer lactate|ors|diazepam|artesunate|anti-snake|asv|hrig|erig|arv|tetanus|colistin|meropenem|vancomycin)\b/i);

    // Default general fallback if no specific specialty matched
    if (specialties.length === 0) {
      specialties.push('general');
    }
  }

  return {
    ...drug,
    formulation,
    specialties,
  };
}

export function searchClinicalDrugs(
  query: string,
  catalog: DrugItem[],
  specialtyFilter?: string,
  formulationFilter?: string
): DrugItem[] {
  const q = query.trim().toLowerCase();
  const specFilter = specialtyFilter ? specialtyFilter.trim().toLowerCase() : '';
  const formFilter = formulationFilter ? formulationFilter.trim().toLowerCase() : '';

  const filtered = catalog.filter((rawDrug) => {
    const drug = normalizeDrugItem(rawDrug);

    // 1. Specialty Filter check
    if (specFilter && specFilter !== 'all') {
      const matchesSpec = drug.specialties.some((s) => s.toLowerCase() === specFilter);
      if (!matchesSpec) return false;
    }

    // 2. Formulation Filter check (CRITICAL: Must strictly filter formulation!)
    if (formFilter && formFilter !== 'all') {
      if (drug.formulation !== formFilter) return false;
    }

    // 3. Search text query check (if user typed something)
    if (!q) return true;

    // Direct Specialty Key Match (e.g. 'ent', 'eye', 'optha', 'dental', 'cardio', 'nephrology')
    const directSpecialtyKeys: Record<string, string> = {
      ent: 'ent',
      eye: 'ophthalmology',
      optha: 'ophthalmology',
      ophthalmology: 'ophthalmology',
      cardio: 'cardiology',
      hypertension: 'hypertension',
      nephrology: 'nephrology',
      endocrinology: 'endocrinology',
      diabetes: 'diabetes',
      gastro: 'gastroenterology',
      hepatology: 'hepatology',
      derma: 'dermatology',
      dermatology: 'dermatology',
      ortho: 'orthopedics',
      psych: 'psychiatry',
      psychiatry: 'psychiatry',
      neurology: 'neurology',
      dental: 'dental',
      emergency: 'emergency',
      pulmonology: 'pulmonology',
      respiratory: 'pulmonology',
      gynecology: 'gynecology',
      gynae: 'gynecology',
    };

    if (directSpecialtyKeys[q]) {
      const targetSpec = directSpecialtyKeys[q];
      const matchesSpec = drug.specialties.some((s) => s.toLowerCase() === targetSpec);
      if (matchesSpec) return true;
    }

    // Check if query matches specialty key directly in CLINICAL_SYMPTOM_MAP
    if (Object.prototype.hasOwnProperty.call(CLINICAL_SYMPTOM_MAP, q)) {
      const targetAliases = CLINICAL_SYMPTOM_MAP[q] || [];
      const name = drug.genericName.toLowerCase();
      const kw = (drug.keywords || '').toLowerCase();
      const matchesAlias = targetAliases.some((alias) => {
        const escaped = alias.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
        return pattern.test(name) || pattern.test(kw);
      });
      if (matchesAlias) return true;
    }

    const name = drug.genericName.toLowerCase();
    const dosage = drug.dosage.toLowerCase();
    const cat = drug.category.toLowerCase();
    const kw = (drug.keywords || '').toLowerCase();
    const brand = (drug.brandName || '').toLowerCase();
    const fullText = `${name} ${dosage} ${cat} ${kw} ${brand}`;

    const tokens = q.split(/\s+/).filter(Boolean);
    // Token matching: use word boundaries for short tokens (<= 3 chars) to avoid matching "fENTanyl", "thiopENTal", "treatmENT", "OrganOPing"
    const allTokensMatch = tokens.every((t) => {
      if (t.length <= 3) {
        const escaped = t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
        return pattern.test(fullText);
      }
      return fullText.includes(t);
    });

    if (allTokensMatch) {
      return true;
    }

    const aliasKeywords = CLINICAL_SYMPTOM_MAP[q] || [];
    return aliasKeywords.some((alias) => {
      const escaped = alias.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
      return pattern.test(name) || pattern.test(kw) || pattern.test(brand);
    });
  });

  // Deduplicate by normalized genericName & dosage
  const seen = new Set<string>();
  const deduplicated: DrugItem[] = [];
  for (const rawItem of filtered) {
    const item = normalizeDrugItem(rawItem);
    const key = `${item.genericName.trim().toLowerCase()}_${item.dosage.trim().toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(item);
    }
  }

  return deduplicated;
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
  { id: 'gen_azee500', genericName: 'Azithromycin 500mg Tablet', category: 'adult', dosage: '1 tablet once daily 1 hour before or 2 hours after meals', duration: '3 days', keywords: 'azithromycin azee azithral macrolide antibiotic throat chest infection urti pharyngitis tonsillitis', minAge: 12 },
  { id: 'gen_azee250', genericName: 'Azithromycin 250mg Tablet', category: 'all', dosage: '1 tablet once daily', duration: '5 days', keywords: 'azithromycin azee azithral macrolide antibiotic urti' },
  { id: 'gen_azee_syp', genericName: 'Azithromycin 100mg/5ml Oral Suspension', category: 'pediatric', dosage: '5ml once daily for 3 days', duration: '3 days', keywords: 'azithromycin azee liquid syrup pediatric macrolide antibiotic', maxAge: 12 },
  { id: 'gen_erythro500', genericName: 'Erythromycin 500mg Tablet', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '7 days', keywords: 'erythromycin erythrocin macrolide antibiotic acne throat skin infection RTI', minAge: 12 },
  { id: 'gen_roxi150', genericName: 'Roxithromycin 150mg Tablet (Roxid 150)', category: 'adult', dosage: '1 tablet twice daily 15 mins before meals', duration: '7 days', keywords: 'roxithromycin roxid 150 macrolide antibiotic throat infection pharyngitis RTI', minAge: 12 },
  { id: 'gen_roxi300', genericName: 'Roxithromycin 300mg Tablet (Roxid 300)', category: 'adult', dosage: '1 tablet once daily 15 mins before meals', duration: '7 days', keywords: 'roxithromycin roxid 300 macrolide antibiotic RTI', minAge: 12 },
  { id: 'gen_clari500', genericName: 'Clarithromycin 500mg Tablet (Claribid 500)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '7 days', keywords: 'clarithromycin claribid 500 macrolide antibiotic h pylori pneumonia bronchitis RTI', minAge: 12 },
  { id: 'gen_clari250', genericName: 'Clarithromycin 250mg Tablet (Claribid 250)', category: 'all', dosage: '1 tablet twice daily', duration: '7 days', keywords: 'clarithromycin claribid 250 macrolide antibiotic RTI' },
  { id: 'gen_linco500', genericName: 'Lincomycin 500mg Capsule (Lincocin 500)', category: 'adult', dosage: '1 capsule 3 to 4 times daily on empty stomach', duration: '7 days', keywords: 'lincomycin lincocin 500 lincosamide antibiotic bone joint soft tissue infection', minAge: 12 },
  { id: 'gen_linco_inj', genericName: 'Inj Lincomycin 600mg / 2ml IV/IM (Lincocin Inj)', category: 'adult', dosage: '600mg (2ml) IM / slow IV infusion every 8 hours', duration: '5 days', keywords: 'inj lincomycin lincocin 600mg 2ml iv im injection lincosamide antibiotic' },
  { id: 'gen_clinda300', genericName: 'Clindamycin 300mg Capsule (Dalacin C 300)', category: 'adult', dosage: '1 capsule 4 times daily with glass of water', duration: '7 days', keywords: 'clindamycin dalacin c 300 lincosamide antibiotic dental pelvic bone anaerobic skin', minAge: 12 },
  { id: 'gen_clinda_inj', genericName: 'Inj Clindamycin 600mg / 4ml IV/IM (Dalacin Inj)', category: 'adult', dosage: '600mg (4ml) in 100ml NS IV infusion over 30 mins every 8 hours', duration: '5 days', keywords: 'inj clindamycin dalacin 600mg 4ml iv im injection lincosamide antibiotic pelvic anaerobic sepsis' },
  { id: 'gen_vanco500_inj', genericName: 'Inj Vancomycin 500mg IV Infusion Vial (Vancocin)', category: 'adult', dosage: '500mg in 100ml NS IV infusion over 60 mins every 6 hours', duration: '7 days', keywords: 'inj vancomycin vancocin 500mg iv infusion vial glycopeptide antibiotic mrsa endocarditis sepsis' },
  { id: 'gen_linezolid600', genericName: 'Linezolid 600mg Tablet (Lizoforce 600 / Linospan)', category: 'adult', dosage: '1 tablet twice daily', duration: '7 days', keywords: 'linezolid lizoforce linospan 600mg oxazolidinone antibiotic mrsa vre pneumonia skin', minAge: 12 },
  { id: 'gen_linezolid_iv', genericName: 'Inj Linezolid 600mg / 300ml IV Infusion (Lizoforce IV)', category: 'adult', dosage: '300ml (600mg) IV infusion over 60 mins twice daily', duration: '7 days', keywords: 'inj linezolid lizoforce linospan 600mg 300ml iv infusion injection oxazolidinone antibiotic mrsa vre' },
  { id: 'gen_faropenem200', genericName: 'Faropenem 200mg Tablet (Farobact 200)', category: 'adult', dosage: '1 tablet 3 times daily', duration: '7 days', keywords: 'faropenem farobact 200 penem carbapenem antibiotic uti rti skin ENT', minAge: 18 },
  { id: 'gen_meropenem1g', genericName: 'Inj Meropenem 1g IV Infusion Vial (Meroplan / Meropen)', category: 'adult', dosage: '1g IV reconstituted in 100ml NS infusion over 30 mins every 8 hours', duration: '7 days', keywords: 'inj meropenem meroplan 1g iv infusion vial carbapenem antibiotic severe sepsis meningitis pneumonia intra-abdominal' },
  { id: 'gen_colistin3m', genericName: 'Inj Colistimethate Sodium 3 Million IU IV Vial (Colistin)', category: 'adult', dosage: '3 Million IU IV infusion over 60 mins 8 hourly', duration: '7 days', keywords: 'inj colistin colistimethate 3m iu iv infusion vial polymyxin antibiotic multidrug resistant mdr pseudomonas acinetobacter' },
  { id: 'gen_sucralfate1g', genericName: 'Sucralfate 1g / 5ml Suspension (Sucrafil / Carafate)', category: 'all', dosage: '10ml 4 times daily 1 hour before meals and bedtime', duration: '14 days', keywords: 'sucralfate sucrafil carafate stomach ulcer gastritis burn gerd heartburn peptic ulcer' },
  { id: 'gen_sucral_oxe', genericName: 'Sucralfate 1g + Oxetacaine 20mg Suspension (Sucrafil-O)', category: 'adult', dosage: '10ml 3-4 times daily 15 mins before meals', duration: '14 days', keywords: 'sucralfate oxetacaine sucrafil-o stomach ulcer burn gastritis gerd' },
  { id: 'gen_xylomet01', genericName: 'Xylometazoline 0.1% Adult Nasal Drops / Spray (Otrivin)', category: 'adult', dosage: '2 to 3 drops / sprays in each nostril twice daily (max 5 days)', duration: '3 days', keywords: 'xylometazoline otrivin nasal spray nasal drops blocked nose decongestant rhinitis sinusitis', minAge: 12 },
  { id: 'gen_xylomet005', genericName: 'Xylometazoline 0.05% Pediatric Nasal Drops (Otrivin Pediatric)', category: 'pediatric', dosage: '1 to 2 drops in each nostril twice daily (max 5 days)', duration: '3 days', keywords: 'xylometazoline otrivin pediatric nasal drops blocked nose decongestant', maxAge: 12 },
  { id: 'gen_oxymet005', genericName: 'Oxymetazoline 0.05% Nasal Drops / Spray (Nasivion / Oxy)', category: 'adult', dosage: '2 to 3 drops / sprays in each nostril twice daily (max 5 days)', duration: '3 days', keywords: 'oxymetazoline nasivion oxy nasal drops nasal spray blocked nose decongestant' },
  { id: 'gen_oxymet0025', genericName: 'Oxymetazoline 0.025% Pediatric Nasal Drops (Nasivion Pediatric / Oxy)', category: 'pediatric', dosage: '1 to 2 drops in each nostril twice daily', duration: '3 days', keywords: 'oxymetazoline nasivion oxy pediatric nasal drops blocked nose decongestant' },
  { id: 'gen_oxytetr250', genericName: 'Oxytetracycline 250mg Capsule (Terramycin / Oxy)', category: 'adult', dosage: '1 capsule 4 times daily 1 hour before meals', duration: '7 days', keywords: 'oxytetracycline terramycin oxy tetracycline antibiotic acne infection', minAge: 12 },
  { id: 'gen_oxybutynin5', genericName: 'Oxybutynin 5mg Tablet (Drytop / Oxy)', category: 'adult', dosage: '1 tablet 2 to 3 times daily', duration: '14 days', keywords: 'oxybutynin drytop oxy urinary urge incontinence bladder spasm anticholinergic', minAge: 12 },
  { id: 'gen_oxcarba300', genericName: 'Oxcarbazepine 300mg Tablet (Trileptal / Oxy)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'oxcarbazepine trileptal oxy anticonvulsant seizure epilepsy trigeminal neuralgia', minAge: 12 },
  { id: 'gen_oxytocin10_inj', genericName: 'Inj Oxytocin 10 IU / 1ml IV/IM (Pitocin / Oxy)', category: 'adult', dosage: '10 IU IM or in 500ml RL IV infusion at 10-40 drops/min', duration: 'Stat post-partum', keywords: 'inj oxytocin pitocin oxy 10 iu 1ml iv im injection labor induction post-partum hemorrhage pph uterus contraction', minAge: 15 },
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

  { id: 'gen_lantus_pen', genericName: 'Insulin Glargine 100 IU/ml Subcutaneous Pen 3ml (Lantus / Basalog Pen)', category: 'all', formulation: 'inj', dosage: 'Subcutaneous injection once daily at fixed bedtime hour (0-0-1)', duration: '30 days', keywords: 'insulin glargine lantus basalog basal insulin pen long acting diabetes t1dm t2dm' },
  { id: 'gen_cilacar10', genericName: 'Cilnidipine 10mg Tablet (Cilacar 10)', category: 'adult', formulation: 'tab', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'cilnidipine cilacar 10 ccb n-type calcium blocker hypertension high bp pedal edema free', minAge: 18 },
  { id: 'gen_telmi_cl', genericName: 'Telmisartan 40mg + Cilnidipine 10mg Tablet (Telma-CL)', category: 'adult', formulation: 'tab', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan cilnidipine telma cl arb ccb hypertension high bp edema free', minAge: 18 },
  { id: 'gen_nebicard5', genericName: 'Nebivolol 5mg Tablet (Nebicard 5)', category: 'adult', formulation: 'tab', dosage: '1 tablet once daily morning after food (1-0-0)', duration: '30 days', keywords: 'nebivolol nebicard 5 beta 1 blocker nitric oxide hypertension high bp', minAge: 18 },
  { id: 'gen_vymada50', genericName: 'Sacubitril 24mg + Valsartan 26mg Tablet (Vymada 50mg)', category: 'adult', formulation: 'tab', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'sacubitril valsartan vymada 50 arni heart failure hfref ejection fraction hypertension', minAge: 18 },
  { id: 'fdc42', genericName: 'Sacubitril + Valsartan (ARNI)', category: 'adult', formulation: 'tab', dosage: '50mg (1-0-1 after food)', duration: '30 days', keywords: 'sacubitril valsartan vymada arni heart failure hypertension high bp cardiology', minAge: 18, minWeight: 40 },

  // ==========================================
  // ENDOCRINOLOGY, DIABETES & METABOLIC DRUGS
  // ==========================================
  { id: 'gen_glimepiride1', genericName: 'Glimepiride 1mg Tablet (Amaryl 1 / Glimestar 1)', category: 'adult', dosage: '1 tablet once daily strictly before breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride 1mg amaryl 1 glimestar 1 sulfonylurea diabetes blood sugar t2dm hypoglycemia', minAge: 18 },
  { id: 'gen_glimepiride2', genericName: 'Glimepiride 2mg Tablet (Amaryl 2 / Glimestar 2)', category: 'adult', dosage: '1 tablet once daily strictly before breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride 2mg amaryl 2 glimestar 2 sulfonylurea diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_glimepiride3', genericName: 'Glimepiride 3mg Tablet (Amaryl 3 / Glimestar 3)', category: 'adult', dosage: '1 tablet once daily strictly before breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride 3mg amaryl 3 glimestar 3 sulfonylurea diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_glimepiride4', genericName: 'Glimepiride 4mg Tablet (Amaryl 4 / Glimestar 4)', category: 'adult', dosage: '1 tablet once daily strictly before breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride 4mg amaryl 4 glimestar 4 sulfonylurea diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_glimepiride1_met500', genericName: 'Glimepiride 1mg + Metformin 500mg SR Tablet (Amaryl M1 / Glimestar M1)', category: 'adult', dosage: '1 tablet once daily after breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride metformin 1mg 500mg amaryl m1 glimestar m1 glycomet gp 1 diabetes t2dm', minAge: 18 },
  { id: 'gen_glimepiride2_met500', genericName: 'Glimepiride 2mg + Metformin 500mg SR Tablet (Amaryl M2 / Glimestar M2)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'glimepiride metformin 2mg 500mg amaryl m2 glimestar m2 glycomet gp 2 diabetes t2dm', minAge: 18 },
  { id: 'gen_glimepiride1_met1000', genericName: 'Glimepiride 1mg + Metformin 1000mg SR Tablet (Amaryl M1 Forte)', category: 'adult', dosage: '1 tablet once daily after breakfast (1-0-0)', duration: '30 days', keywords: 'glimepiride metformin 1mg 1000mg amaryl m1 forte glimestar m1 forte diabetes t2dm', minAge: 18 },
  { id: 'gen_glimepiride2_met1000', genericName: 'Glimepiride 2mg + Metformin 1000mg SR Tablet (Amaryl M2 Forte)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'glimepiride metformin 2mg 1000mg amaryl m2 forte glimestar m2 forte diabetes t2dm', minAge: 18 },
  { id: 'gen_glimepiride_met_pio', genericName: 'Glimepiride 2mg + Metformin 500mg + Pioglitazone 15mg Tablet (Tripride 2)', category: 'adult', dosage: '1 tablet once daily after breakfast', duration: '30 days', keywords: 'glimepiride metformin pioglitazone tripride senform trio triple drug diabetes t2dm', minAge: 18 },
  { id: 'gen_glimepiride_met_vog', genericName: 'Glimepiride 2mg + Metformin 500mg + Voglibose 0.2mg Tablet (Amaryl MV 2)', category: 'adult', dosage: '1 tablet twice daily before meals (1-0-1)', duration: '30 days', keywords: 'glimepiride metformin voglibose amaryl mv2 glimestar pm2 triple combination diabetes t2dm', minAge: 18 },
  { id: 'gen_gliclazide30_mr', genericName: 'Gliclazide 30mg MR Tablet (Diamicron MR 30)', category: 'adult', dosage: '1 tablet once daily with breakfast (1-0-0)', duration: '30 days', keywords: 'gliclazide 30mg diamicron mr sulfonylurea diabetes sugar t2dm', minAge: 18 },
  { id: 'gen_gliclazide60_mr', genericName: 'Gliclazide 60mg MR Tablet (Diamicron MR 60 / Glycinorm 60)', category: 'adult', dosage: '1 tablet once daily with breakfast (1-0-0)', duration: '30 days', keywords: 'gliclazide 60mg diamicron mr glycinorm 60 sulfonylurea diabetes sugar t2dm', minAge: 18 },
  { id: 'gen_gliclazide_met500', genericName: 'Gliclazide 60mg + Metformin 500mg SR Tablet (Diamicron Mex 500)', category: 'adult', dosage: '1 tablet once daily with breakfast (1-0-0)', duration: '30 days', keywords: 'gliclazide metformin 60mg 500mg diamicron mex glycinorm m60 diabetes t2dm', minAge: 18 },
  { id: 'gen_vildagliptin50', genericName: 'Vildagliptin 50mg Tablet (Galvus 50 / Jalra 50 / Zomelis 50)', category: 'adult', dosage: '1 tablet twice daily before food (1-0-1)', duration: '30 days', keywords: 'vildagliptin galvus jalra zomelis dpp4 inhibitor diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_vilda_met500', genericName: 'Vildagliptin 50mg + Metformin 500mg Tablet (Galvus Met 50/500)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'vildagliptin metformin galvus met jalra m zomelis met dpp4 biguanide diabetes t2dm', minAge: 18 },
  { id: 'gen_sitagliptin100', genericName: 'Sitagliptin 100mg Tablet (Januvia 100)', category: 'adult', dosage: '1 tablet once daily after food (1-0-0)', duration: '30 days', keywords: 'sitagliptin januvia dpp4 inhibitor diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_sita_met500', genericName: 'Sitagliptin 50mg + Metformin 500mg Tablet (Janumet 50/500)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'sitagliptin metformin janumet dpp4 biguanide diabetes t2dm', minAge: 18 },
  { id: 'gen_teneligliptin20', genericName: 'Teneligliptin 20mg Tablet (Tenepure 20 / Zita Plus 20)', category: 'adult', dosage: '1 tablet once daily before breakfast (1-0-0)', duration: '30 days', keywords: 'teneligliptin tenepure zita plus dpp4 inhibitor diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_teneli_met500', genericName: 'Teneligliptin 20mg + Metformin 500mg SR Tablet (Tenepure-M 20)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'teneligliptin metformin tenepure m zita plus m dpp4 biguanide diabetes t2dm', minAge: 18 },
  { id: 'gen_dapagliflozin10', genericName: 'Dapagliflozin 10mg Tablet (Forxiga 10)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'dapagliflozin forxiga sglt2 inhibitor kidney heart failure diabetes blood sugar t2dm', minAge: 18 },
  { id: 'gen_dapa_met500', genericName: 'Dapagliflozin 10mg + Metformin 500mg SR Tablet (Forxiga-M 10/500)', category: 'adult', dosage: '1 tablet once daily after breakfast (1-0-0)', duration: '30 days', keywords: 'dapagliflozin metformin forxiga m dapa m sglt2 biguanide diabetes t2dm', minAge: 18 },
  { id: 'gen_empagliflozin25', genericName: 'Empagliflozin 25mg Tablet (Jardiance 25)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'empagliflozin jardiance sglt2 inhibitor heart failure ckd diabetes t2dm', minAge: 18 },
  { id: 'gen_semaglutide_oral', genericName: 'Semaglutide 7mg Oral Tablet (Rybelsus 7mg)', category: 'adult', dosage: '1 tablet once daily strictly empty stomach morning with 120ml water 30 mins before tea/food', duration: '30 days', keywords: 'semaglutide rybelsus glp1 agonist weight loss obesity diabetes sugar t2dm', minAge: 18 },
  { id: 'gen_tirzepatide_pen', genericName: 'Tirzepatide 5mg Subcutaneous Pen Injection (Mounjaro 5mg)', category: 'adult', formulation: 'inj', dosage: '0.5ml subcutaneous injection once weekly in abdomen/thigh', duration: '4 weeks (4 pens)', keywords: 'tirzepatide mounjaro zepbound glp1 gip dual agonist weight loss obesity diabetes', minAge: 18 },
  { id: 'gen_saroglitazar4', genericName: 'Saroglitazar 4mg Tablet (Lipaglyn 4mg)', category: 'adult', dosage: '1 tablet once daily at bedtime (0-0-1)', duration: '30 days', keywords: 'saroglitazar lipaglyn ppar agonist diabetic dyslipidemia hypertriglyceridemia fatty liver nafld', minAge: 18 },

  // ==========================================
  // HYPERTENSION & CARDIAC DRUGS
  // ==========================================
  { id: 'gen_telmi40', genericName: 'Telmisartan 40mg Tablet (Telma 40 / Micardis)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan telma 40 micardis arb hypertension high bp blood pressure ckd', minAge: 18 },
  { id: 'gen_telmi80', genericName: 'Telmisartan 80mg Tablet (Telma 80)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan telma 80 arb hypertension high bp blood pressure ckd', minAge: 18 },
  { id: 'gen_telmi_am', genericName: 'Telmisartan 40mg + Amlodipine 5mg Tablet (Telma-AM)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan amlodipine telma am arb ccb dual therapy hypertension high bp', minAge: 18 },
  { id: 'gen_telmi_h', genericName: 'Telmisartan 40mg + Hydrochlorothiazide 12.5mg Tablet (Telma-H)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan hydrochlorothiazide telma h arb diuretic hypertension high bp', minAge: 18 },
  { id: 'gen_telmi_ct', genericName: 'Telmisartan 40mg + Chlorthalidone 12.5mg Tablet (Telma-CT)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'telmisartan chlorthalidone telma ct arb diuretic hypertension high bp', minAge: 18 },
  { id: 'gen_amlong5', genericName: 'Amlodipine 5mg Tablet (Amlong 5 / Stamlo 5)', category: 'adult', dosage: '1 tablet once daily morning after breakfast (1-0-0)', duration: '30 days', keywords: 'amlodipine amlong 5 stamlo 5 ccb calcium channel blocker hypertension high bp angina', minAge: 18 },
  { id: 'gen_benidipine4', genericName: 'Benidipine 4mg Tablet (Benitowa 4)', category: 'adult', dosage: '1 tablet twice daily after meals (1-0-1)', duration: '30 days', keywords: 'benidipine benitowa ccb renal protective hypertension high bp ckd', minAge: 18 },
  { id: 'gen_metoprolol_xl25', genericName: 'Metoprolol Succinate XL 25mg Tablet (Betaloc XL 25)', category: 'adult', dosage: '1 tablet once daily morning after food (1-0-0)', duration: '30 days', keywords: 'metoprolol betaloc xl 25 beta blocker hypertension high bp angina CAD heart failure', minAge: 18 },
  { id: 'gen_metoprolol_xl50', genericName: 'Metoprolol Succinate XL 50mg Tablet (Betaloc XL 50)', category: 'adult', dosage: '1 tablet once daily morning after food (1-0-0)', duration: '30 days', keywords: 'metoprolol betaloc xl 50 beta blocker hypertension high bp angina CAD heart failure', minAge: 18 },
  { id: 'gen_methyldopa250', genericName: 'Methyldopa 250mg Tablet (Alphadopa 250)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '30 days', keywords: 'methyldopa alphadopa pregnancy hypertension preeclampsia gestational high bp safe in pregnancy', minAge: 18 },
  { id: 'fdc39', genericName: 'Telmisartan + Hydrochlorothiazide', category: 'adult', dosage: '40mg/12.5mg (1-0-0 morning)', duration: '30 days', keywords: 'telmisartan hydrochlorothiazide telma-h hypertension high bp blood pressure antihypertensive', minAge: 18, minWeight: 40 },
  { id: 'fdc40', genericName: 'Amlodipine + Atenolol', category: 'adult', dosage: '5mg/50mg (1-0-0 morning)', duration: '30 days', keywords: 'amlodipine atenolol amcard-at hypertension high bp blood pressure antihypertensive', minAge: 18, minWeight: 40 },
  { id: 'fdc41', genericName: 'Losartan + Hydrochlorothiazide', category: 'adult', dosage: '50mg/12.5mg (1-0-0 morning)', duration: '30 days', keywords: 'losartan hydrochlorothiazide covance-d hypertension high bp blood pressure antihypertensive', minAge: 18, minWeight: 40 },
  { id: 'fdc43', genericName: 'Aspirin + Clopidogrel', category: 'adult', dosage: '75mg/75mg (0-1-0 after lunch)', duration: '30 days', keywords: 'aspirin clopidogrel ecosprin-av antiplatelet CAD stroke heart cardiology', minAge: 18, minWeight: 40 },
  { id: 'fdc44', genericName: 'Rosuvastatin + Fenofibrate', category: 'adult', dosage: '10mg/160mg (0-0-1 at night)', duration: '30 days', keywords: 'rosuvastatin fenofibrate lipid cholesterol triglycerides cardiology', minAge: 18 },
  { id: 'fdc45', genericName: 'Metformin + Glimepiride', category: 'adult', dosage: '500mg/1mg (1-0-1 before food)', duration: '30 days', keywords: 'metformin glimepiride amaryl-m glycomet-gp diabetes blood sugar t2dm antidiabetic endocrinology', minAge: 18, minWeight: 40 },
  { id: 'fdc46', genericName: 'Metformin + Teneligliptin', category: 'adult', dosage: '500mg/20mg (1-0-1 after food)', duration: '30 days', keywords: 'metformin teneligliptin tenepure-m zita-plus-m diabetes blood sugar t2dm antidiabetic endocrinology', minAge: 18 },
  { id: 'fdc47', genericName: 'Metformin + Sitagliptin', category: 'adult', dosage: '500mg/50mg (1-0-1 after food)', duration: '30 days', keywords: 'metformin sitagliptin janumet diabetes blood sugar t2dm antidiabetic endocrinology', minAge: 18 },
  { id: 'fdc48', genericName: 'Metformin + Dapagliflozin', category: 'adult', dosage: '500mg/10mg (1-0-0 morning)', duration: '30 days', keywords: 'metformin dapagliflozin forxiga-m diabetes blood sugar t2dm antidiabetic endocrinology', minAge: 18 },
  { id: 'fdc49', genericName: 'Pregabalin + Methylcobalamin', category: 'adult', dosage: '75mg/1500mcg (0-0-1 at night)', duration: '30 days', keywords: 'pregabalin methylcobalamin maxgalin-m neuropathy nerve pain diabetic neuropathy neurology', minAge: 18 },
  { id: 'fdc50', genericName: 'Gabapentin + Methylcobalamin', category: 'adult', dosage: '300mg/500mcg (0-0-1 at night)', duration: '30 days', keywords: 'gabapentin methylcobalamin gabapin-m neuropathy nerve pain diabetic neuropathy neurology', minAge: 18 },

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

  // ==========================================
  // 9. ADDITIONAL CARDIOLOGY, NEPHROLOGY & VASCULAR DRUGS
  // ==========================================
  { id: 'gen_vymada50', genericName: 'Sacubitril 24mg + Valsartan 26mg Tablet (Vymada 50mg / Cidmus)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'sacubitril valsartan vymada cidmus arni heart failure cardiac cardio', minAge: 18 },
  { id: 'gen_vymada100', genericName: 'Sacubitril 49mg + Valsartan 51mg Tablet (Vymada 100mg)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'sacubitril valsartan vymada cidmus arni heart failure', minAge: 18 },
  { id: 'gen_dytor_plus10', genericName: 'Torsemide 10mg + Spironolactone 50mg Tablet (Dytor Plus 10)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'torsemide spironolactone dytor plus edema ascites heart failure diuretic', minAge: 18 },
  { id: 'gen_chlorthal12', genericName: 'Chlorthalidone 12.5mg Tablet (Thalitone / CTD)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'chlorthalidone ctd thalitone diuretic hypertension bp', minAge: 18 },
  { id: 'gen_chlorthal25', genericName: 'Chlorthalidone 25mg Tablet (Thalitone 25)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'chlorthalidone ctd thalitone diuretic bp hypertension', minAge: 18 },
  { id: 'gen_indapamide15', genericName: 'Indapamide 1.5mg SR Tablet (Natrilix SR)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'indapamide natrilix sr diuretic hypertension bp', minAge: 18 },
  { id: 'gen_cilacar10', genericName: 'Cilnidipine 10mg Tablet (Cilacar 10)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'cilnidipine cilacar 10 ccb calcium channel blocker bp hypertension', minAge: 18 },
  { id: 'gen_cilacar5', genericName: 'Cilnidipine 5mg Tablet (Cilacar 5)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'cilnidipine cilacar 5 ccb hypertension bp', minAge: 18 },
  { id: 'gen_depin20', genericName: 'Nifedipine 20mg SR Tablet (Depin SR 20)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'nifedipine depin ccb hypertension angina bp preeclampsia', minAge: 18 },
  { id: 'gen_isoptin40', genericName: 'Verapamil 40mg Tablet (Isoptin 40)', category: 'adult', dosage: '1 tablet 3 times daily', duration: '30 days', keywords: 'verapamil isoptin ccb arrhythmia angina svt hypertension', minAge: 18 },
  { id: 'gen_dilzem60', genericName: 'Diltiazem 60mg Tablet (Dilzem 60)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '30 days', keywords: 'diltiazem dilzem ccb rate control atrial fibrillation angina hypertension', minAge: 18 },
  { id: 'gen_olmy20', genericName: 'Olmesartan Medoxomil 20mg Tablet (Olmy 20 / Olmetime)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'olmesartan olmy olmetime arb bp hypertension', minAge: 18 },
  { id: 'gen_olmy40', genericName: 'Olmesartan Medoxomil 40mg Tablet (Olmy 40)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'olmesartan olmy arb bp hypertension', minAge: 18 },
  { id: 'gen_irovel150', genericName: 'Irbesartan 150mg Tablet (Irovel 150)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'irbesartan irovel arb diabetic nephropathy bp hypertension', minAge: 18 },
  { id: 'gen_nebicard5', genericName: 'Nebivolol 5mg Tablet (Nebicard 5)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'nebivolol nebicard beta blocker vasodilator hypertension heart failure', minAge: 18 },
  { id: 'gen_normadate100', genericName: 'Labetalol 100mg Tablet (Normadate 100 / Labebet)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '30 days', keywords: 'labetalol normadate labebet beta blocker pregnancy hypertension preeclampsia bp', minAge: 18 },
  { id: 'gen_cardivas625', genericName: 'Carvedilol 6.25mg Tablet (Cardivas 6.25)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '30 days', keywords: 'carvedilol cardivas beta blocker heart failure post mi hypertension', minAge: 18 },
  { id: 'gen_cardivas125', genericName: 'Carvedilol 12.5mg Tablet (Cardivas 12.5)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '30 days', keywords: 'carvedilol cardivas beta blocker heart failure hypertension', minAge: 18 },
  { id: 'gen_ciplar10', genericName: 'Propranolol 10mg Tablet (Ciplar 10 / Inderal)', category: 'adult', dosage: '1 tablet 2 to 3 times daily', duration: '30 days', keywords: 'propranolol ciplar inderal tremor anxiety migraine portal hypertension', minAge: 12 },
  { id: 'gen_ciplar40', genericName: 'Propranolol 40mg Tablet (Ciplar 40)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'propranolol ciplar inderal migraine prophylaxis portal hypertension arrhythmia', minAge: 18 },
  { id: 'gen_concor25', genericName: 'Bisoprolol 2.5mg Tablet (Concor 2.5)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'bisoprolol concor beta blocker heart failure hypertension', minAge: 18 },
  { id: 'gen_concor5', genericName: 'Bisoprolol 5mg Tablet (Concor 5)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'bisoprolol concor beta blocker hypertension angina', minAge: 18 },
  { id: 'gen_coralan5', genericName: 'Ivabradine 5mg Tablet (Coralan 5 / Ivabrad)', category: 'adult', dosage: '1 tablet twice daily with meals', duration: '30 days', keywords: 'ivabradine coralan ivabrad sinus node inhibitor heart failure angina', minAge: 18 },
  { id: 'gen_angispan26', genericName: 'Nitroglycerin 2.6mg SR Tablet (Angispan 2.6)', category: 'adult', dosage: '1 tablet twice daily before meals', duration: '30 days', keywords: 'nitroglycerin ntg angispan angina chest pain coronary artery', minAge: 18 },
  { id: 'gen_sorbitrate10', genericName: 'Isosorbide Dinitrate 10mg Sublingual Tablet (Sorbitrate 10)', category: 'adult', dosage: '1 tablet dissolved under tongue stat for acute angina S.O.S', duration: 'Stat S.O.S', keywords: 'sorbitrate isosorbide sublingual stat angina chest pain acute MI', minAge: 18 },
  { id: 'gen_ismo20', genericName: 'Isosorbide Mononitrate 20mg Tablet (Ismo 20 / Monotrate)', category: 'adult', dosage: '1 tablet twice daily 7 hours apart', duration: '30 days', keywords: 'isosorbide mononitrate ismo monotrate angina prophylaxis chest pain', minAge: 18 },
  { id: 'gen_ranozex500', genericName: 'Ranolazine 500mg SR Tablet (Ranozex 500 / Ranx)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'ranolazine ranozex ranx antianginal chronic angina', minAge: 18 },
  { id: 'gen_vastarel_mr', genericName: 'Trimetazidine 35mg MR Tablet (Vastarel MR / Carvidon)', category: 'adult', dosage: '1 tablet twice daily with meals', duration: '30 days', keywords: 'trimetazidine vastarel carvidon antianginal ischemia metabolic', minAge: 18 },
  { id: 'gen_clopivas75', genericName: 'Clopidogrel 75mg Tablet (Plavix / Clopivas)', category: 'adult', dosage: '1 tablet once daily after lunch', duration: '30 days', keywords: 'clopidogrel plavix clopivas antiplatelet stent cad stroke pvd', minAge: 18 },
  { id: 'gen_prasita10', genericName: 'Prasugrel 10mg Tablet (Prasita 10 / Effient)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'prasugrel prasita effient antiplatelet pci stenting acs', minAge: 18 },
  { id: 'gen_brilinta90', genericName: 'Ticagrelor 90mg Tablet (Brilinta 90 / Axcer)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'ticagrelor brilinta axcer antiplatelet acs pci stenting', minAge: 18 },
  { id: 'gen_eliquis25', genericName: 'Apixaban 2.5mg Tablet (Eliquis 2.5)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'apixaban eliquis doac noac anticoagulant afib dvt pe', minAge: 18 },
  { id: 'gen_eliquis5', genericName: 'Apixaban 5mg Tablet (Eliquis 5)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'apixaban eliquis doac noac anticoagulant afib dvt pe', minAge: 18 },
  { id: 'gen_xarelto10', genericName: 'Rivaroxaban 10mg Tablet (Xarelto 10 / Xabira)', category: 'adult', dosage: '1 tablet once daily with food', duration: '30 days', keywords: 'rivaroxaban xarelto xabira doac noac anticoagulant dvt pe prophylaxis', minAge: 18 },
  { id: 'gen_xarelto20', genericName: 'Rivaroxaban 20mg Tablet (Xarelto 20)', category: 'adult', dosage: '1 tablet once daily with main evening meal', duration: '30 days', keywords: 'rivaroxaban xarelto doac noac anticoagulant afib dvt treatment', minAge: 18 },
  { id: 'gen_pradaxa110', genericName: 'Dabigatran Etexilate 110mg Capsule (Pradaxa 110)', category: 'adult', dosage: '1 capsule twice daily', duration: '30 days', keywords: 'dabigatran pradaxa direct thrombin inhibitor anticoagulant afib dvt', minAge: 18 },
  { id: 'gen_acitrom2', genericName: 'Acenocoumarol 2mg Tablet (Acitrom 2)', category: 'adult', dosage: '1 tablet once daily at 6 PM (monitor INR 2.0-3.0)', duration: '30 days', keywords: 'acenocoumarol acitrom anticoagulant warfarin inr mechanical valve dvt', minAge: 18 },
  { id: 'gen_lipicard160', genericName: 'Fenofibrate 160mg Tablet (Lipicard 160 / Stanlip)', category: 'adult', dosage: '1 tablet once daily with food', duration: '30 days', keywords: 'fenofibrate lipicard stanlip fibrate hypertriglyceridemia triglycerides cholesterol', minAge: 18 },
  { id: 'gen_brillo180', genericName: 'Bempedoic Acid 180mg Tablet (Brillo 180 / Bemdac)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'bempedoic acid brillo bemdac ldl cholesterol lowering statin intolerant', minAge: 18 },

  // ==========================================
  // 10. ADDITIONAL ENDOCRINOLOGY, DIABETES & METABOLIC DRUGS
  // ==========================================
  { id: 'gen_glycomet1g', genericName: 'Metformin 1000mg SR Tablet (Glycomet 1g SR)', category: 'adult', dosage: '1 tablet twice daily with meals', duration: '30 days', keywords: 'metformin glycomet 1g biguanide diabetes sugar pcos', minAge: 18 },
  { id: 'gen_galvus50', genericName: 'Vildagliptin 50mg Tablet (Galvus 50 / Jalra)', category: 'adult', dosage: '1 tablet twice daily', duration: '30 days', keywords: 'vildagliptin galvus jalra dpp4 inhibitor diabetes sugar', minAge: 18 },
  { id: 'gen_januvia100', genericName: 'Sitagliptin 100mg Tablet (Januvia 100 / Istavel)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'sitagliptin januvia istavel dpp4 inhibitor diabetes sugar', minAge: 18 },
  { id: 'gen_trajenta5', genericName: 'Linagliptin 5mg Tablet (Trajenta 5 / Ondero)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'linagliptin trajenta ondero dpp4 inhibitor diabetes renal safe', minAge: 18 },
  { id: 'gen_forxiga5', genericName: 'Dapagliflozin 5mg Tablet (Forxiga 5 / Oxra)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'dapagliflozin forxiga oxra sglt2 inhibitor diabetes heart failure ckd', minAge: 18 },
  { id: 'gen_jardiance25', genericName: 'Empagliflozin 25mg Tablet (Jardiance 25)', category: 'adult', dosage: '1 tablet once daily in morning', duration: '30 days', keywords: 'empagliflozin jardiance sglt2 inhibitor diabetes cardioprotective', minAge: 18 },
  { id: 'gen_invokana100', genericName: 'Canagliflozin 100mg Tablet (Invokana 100 / Sulisent)', category: 'adult', dosage: '1 tablet once daily before first meal of day', duration: '30 days', keywords: 'canagliflozin invokana sulisent sglt2 inhibitor diabetes ckd', minAge: 18 },
  { id: 'gen_remo100', genericName: 'Remogliflozin Etabonate 100mg Tablet (Remo 100 / Zita-Plus R)', category: 'adult', dosage: '1 tablet twice daily with meals', duration: '30 days', keywords: 'remogliflozin remo sglt2 inhibitor diabetes sugar', minAge: 18 },
  { id: 'gen_diamicron_mr60', genericName: 'Gliclazide 60mg MR Tablet (Diamicron MR 60)', category: 'adult', dosage: '1 tablet once daily with breakfast', duration: '30 days', keywords: 'gliclazide diamicron sulfonylurea diabetes sugar', minAge: 18 },
  { id: 'gen_daonil5', genericName: 'Glibenclamide / Glyburide 5mg Tablet (Daonil 5)', category: 'adult', dosage: '1 tablet once daily before breakfast', duration: '30 days', keywords: 'glibenclamide glyburide daonil sulfonylurea diabetes sugar', minAge: 18 },
  { id: 'gen_vobose02', genericName: 'Voglibose 0.2mg Tablet (Vobose 0.2 / Volibo)', category: 'adult', dosage: '1 tablet 3 times daily immediately before meals', duration: '30 days', keywords: 'voglibose vobose volibo alpha glucosidase inhibitor postprandial hyperglycemia', minAge: 18 },
  { id: 'gen_vobose03', genericName: 'Voglibose 0.3mg Tablet (Vobose 0.3)', category: 'adult', dosage: '1 tablet 3 times daily immediately before meals', duration: '30 days', keywords: 'voglibose vobose alpha glucosidase inhibitor postprandial sugar', minAge: 18 },
  { id: 'gen_glucobay50', genericName: 'Acarbose 50mg Tablet (Glucobay 50)', category: 'adult', dosage: '1 tablet 3 times daily with first bite of meal', duration: '30 days', keywords: 'acarbose glucobay alpha glucosidase inhibitor postprandial sugar', minAge: 18 },

  // ==========================================
  // 11. PEDIATRIC VACCINES & IMMUNIZATION
  // ==========================================
  { id: 'vax_bcg', genericName: 'BCG Vaccine 0.05ml Injection (Intradermal Birth Dose)', category: 'pediatric', formulation: 'inj', dosage: '0.05ml intradermal left upper arm stat at birth', duration: 'Stat dose', keywords: 'bcg vaccine tuberculosis birth dose pediatric immunization' },
  { id: 'vax_hepb_birth', genericName: 'Hepatitis B Birth Dose Vaccine 0.5ml Injection (IM)', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM anterolateral thigh stat within 24h of birth', duration: 'Stat dose', keywords: 'hepatitis b birth dose vaccine pediatric immunization' },
  { id: 'vax_bopv', genericName: 'bOPV (Bivalent Oral Polio Vaccine) Drops', category: 'pediatric', formulation: 'drops', dosage: '2 drops oral stat', duration: 'Stat dose', keywords: 'bopv opv oral polio vaccine drops immunization polio' },
  { id: 'vax_penta', genericName: 'Pentavalent Vaccine (DTP + Hep-B + Hib) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM anterolateral thigh stat (at 6w, 10w, 14w)', duration: 'Stat dose', keywords: 'pentavalent dtp hepb hib 5-in-1 vaccine pediatric immunization' },
  { id: 'vax_hexa', genericName: 'Hexavalent Vaccine (DTaP + IPV + Hep-B + Hib) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM anterolateral thigh stat (6-in-1 vaccine)', duration: 'Stat dose', keywords: 'hexavalent dtap ipv hepb hib 6-in-1 vaccine pediatric immunization' },
  { id: 'vax_ipv', genericName: 'IPV (Inactivated Polio Vaccine) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM or 0.1ml intradermal stat', duration: 'Stat dose', keywords: 'ipv inactivated polio vaccine injection pediatric' },
  { id: 'vax_pcv', genericName: 'PCV (Pneumococcal Conjugate Vaccine) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM anterolateral thigh stat', duration: 'Stat dose', keywords: 'pcv pneumococcal vaccine pneumonia pediatric' },
  { id: 'vax_rotavirus', genericName: 'Rotavirus Oral Vaccine (Rotasiil / Rotavac)', category: 'pediatric', formulation: 'drops', dosage: '5 drops / 1.5ml oral stat (at 6w, 10w, 14w)', duration: 'Stat dose', keywords: 'rotavirus rotavac rotasiil diarrhea vaccine oral pediatric' },
  { id: 'vax_mr', genericName: 'MR (Measles-Rubella) Vaccine 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml Subcutaneous right upper arm stat at 9 months', duration: 'Stat dose', keywords: 'mr vaccine measles rubella 9 months pediatric' },
  { id: 'vax_mmr', genericName: 'MMR (Measles-Mumps-Rubella) Vaccine 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml Subcutaneous right upper arm stat at 15 months & 1.5 yrs', duration: 'Stat dose', keywords: 'mmr vaccine measles mumps rubella pediatric' },
  { id: 'vax_je', genericName: 'JE (Japanese Encephalitis) Vaccine 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml Subcutaneous stat at 9 months', duration: 'Stat dose', keywords: 'je vaccine japanese encephalitis pediatric' },
  { id: 'vax_tcv', genericName: 'Typhoid Conjugate Vaccine (TCV / Typbar-TCV) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM stat at 6-9 months', duration: 'Stat dose', keywords: 'tcv typbar typhoid conjugate vaccine pediatric' },
  { id: 'vax_hepa', genericName: 'Hepatitis A Inactivated Vaccine (Havrix / Avaxim) 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM stat at 12 months & booster at 18 months', duration: 'Stat dose', keywords: 'hepatitis a havrix avaxim vaccine pediatric' },
  { id: 'vax_varicella', genericName: 'Varicella (Chickenpox) Vaccine 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml Subcutaneous stat at 15 months & 1.5 yrs', duration: 'Stat dose', keywords: 'varicella chickenpox vaccine pediatric' },
  { id: 'vax_dpt_booster', genericName: 'DPT 1st / 2nd Booster Vaccine 0.5ml Injection', category: 'pediatric', formulation: 'inj', dosage: '0.5ml IM deltoid / anterolateral thigh stat', duration: 'Stat dose', keywords: 'dpt booster diphtheria pertussis tetanus vaccine pediatric' },
  { id: 'vax_vita_sol', genericName: 'Vitamin A Oral Solution (1 Lakh IU / 2 Lakh IU)', category: 'pediatric', formulation: 'syp', dosage: '1ml (1 Lakh IU at 9m) or 2ml (2 Lakh IU every 6m up to 5 yrs)', duration: 'Stat dose', keywords: 'vitamin a syrup oral solution night blindness pediatric' },
  { id: 'gen_pioz15', genericName: 'Pioglitazone 15mg Tablet (Pioz 15 / Glizone)', category: 'adult', dosage: '1 tablet once daily', duration: '30 days', keywords: 'pioglitazone pioz glizone thiazolidinedione tzd insulin sensitizer diabetes', minAge: 18 },
  { id: 'gen_novonorm1', genericName: 'Repaglinide 1mg Tablet (Novonorm 1 / Eurepa)', category: 'adult', dosage: '1 tablet 3 times daily 15 mins before main meals', duration: '30 days', keywords: 'repaglinide novonorm eurepa meglitinide postprandial diabetes', minAge: 18 },
  { id: 'gen_rybelsus7', genericName: 'Semaglutide 7mg Tablet (Rybelsus 7)', category: 'adult', dosage: '1 tablet once daily on empty stomach 30 mins before food', duration: '30 days', keywords: 'semaglutide rybelsus glp-1 agonist oral semaglutide weight loss diabetes Ozempic', minAge: 18 },
  { id: 'gen_rybelsus14', genericName: 'Semaglutide 14mg Tablet (Rybelsus 14)', category: 'adult', dosage: '1 tablet once daily on empty stomach 30 mins before food', duration: '30 days', keywords: 'semaglutide rybelsus glp-1 agonist weight loss obesity diabetes', minAge: 18 },
  { id: 'gen_lantus_pen', genericName: 'Insulin Glargine 100 IU/ml Cartridge / Pen (Lantus / Basalog)', category: 'all', formulation: 'inj', dosage: 'Subcutaneous injection once daily at bedtime', duration: '30 days', keywords: 'insulin glargine lantus basalog long acting basal insulin diabetes' },
  { id: 'gen_mixtard3070', genericName: 'Biphasic Isophane Insulin 30/70 40 IU/ml Vial (Mixtard 30/70)', category: 'all', formulation: 'inj', dosage: 'Subcutaneous injection 30 mins before breakfast and dinner', duration: '30 days', keywords: 'insulin mixtard 30/70 premixed insulin diabetes 40iu vial' },
  { id: 'gen_actrapid_vial', genericName: 'Human Regular Insulin 40 IU/ml Vial (Actrapid)', category: 'all', formulation: 'inj', dosage: 'Subcutaneous / IV injection 30 mins before main meals', duration: '30 days', keywords: 'insulin actrapid regular short acting insulin dka emergency diabetes' },
  { id: 'gen_thyronorm25', genericName: 'Levothyroxine Sodium 25mcg Tablet (Thyronorm 25)', category: 'all', dosage: '1 tablet once daily on empty stomach in morning', duration: '90 days', keywords: 'levothyroxine thyronorm 25 hypothyroidism thyroid eltroxin' },
  { id: 'gen_thyronorm50', genericName: 'Levothyroxine Sodium 50mcg Tablet (Thyronorm 50)', category: 'all', dosage: '1 tablet once daily on empty stomach in morning', duration: '90 days', keywords: 'levothyroxine thyronorm 50 hypothyroidism thyroid eltroxin' },
  { id: 'gen_thyronorm75', genericName: 'Levothyroxine Sodium 75mcg Tablet (Thyronorm 75)', category: 'all', dosage: '1 tablet once daily on empty stomach in morning', duration: '90 days', keywords: 'levothyroxine thyronorm 75 hypothyroidism thyroid' },
  { id: 'gen_thyronorm100', genericName: 'Levothyroxine Sodium 100mcg Tablet (Thyronorm 100 / Eltroxin)', category: 'all', dosage: '1 tablet once daily on empty stomach in morning', duration: '90 days', keywords: 'levothyroxine thyronorm 100 eltroxin hypothyroidism thyroid T4' },
  { id: 'gen_thyronorm125', genericName: 'Levothyroxine Sodium 125mcg Tablet (Thyronorm 125)', category: 'all', dosage: '1 tablet once daily on empty stomach in morning', duration: '90 days', keywords: 'levothyroxine thyronorm 125 hypothyroidism thyroid' },
  { id: 'gen_neomerc5', genericName: 'Carbimazole 5mg Tablet (Neomercazole 5)', category: 'adult', dosage: '1 to 2 tablets 3 times daily after meals', duration: '30 days', keywords: 'carbimazole neomercazole hyperthyroidism graves thyrotoxicosis', minAge: 12 },
  { id: 'gen_neomerc10', genericName: 'Carbimazole 10mg Tablet (Neomercazole 10)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '30 days', keywords: 'carbimazole neomercazole hyperthyroidism graves disease', minAge: 12 },

  // ==========================================
  // 11. ADDITIONAL GASTROENTEROLOGY & LIVER DRUGS
  // ==========================================
  { id: 'gen_dexilant30', genericName: 'Dexlansoprazole 30mg Capsule (Dexilant 30)', category: 'adult', dosage: '1 capsule once daily before breakfast', duration: '14 days', keywords: 'dexlansoprazole dexilant ppi acidity gerd heartburn', minAge: 18 },
  { id: 'gen_izra10', genericName: 'Ilaprazole 10mg Tablet (Izra 10 / Iladac)', category: 'adult', dosage: '1 tablet once daily before breakfast', duration: '14 days', keywords: 'ilaprazole izra iladac ppi acidity ulcer gerd', minAge: 18 },
  { id: 'gen_lanzol30', genericName: 'Lansoprazole 30mg Capsule (Lanzol 30 / Junior Lanzol)', category: 'adult', dosage: '1 capsule once daily 30 mins before breakfast', duration: '14 days', keywords: 'lansoprazole lanzol ppi acidity peptic ulcer', minAge: 12 },
  { id: 'gen_famocid40', genericName: 'Famotidine 40mg Tablet (Famocid 40 / High-Pep)', category: 'adult', dosage: '1 tablet twice daily before meals or bedtime', duration: '14 days', keywords: 'famotidine famocid h2 blocker antacid acidity gerd', minAge: 12 },
  { id: 'gen_gelusil_syp', genericName: 'Magaldrate 540mg + Simethicone 50mg Antacid Syrup (Gelusil 200ml)', category: 'all', dosage: '10ml to 15ml 1 hour after meals and at bedtime S.O.S', duration: '7 days', keywords: 'gelusil magaldrate simethicone antacid syrup acidity gas bloating heartburn' },
  { id: 'gen_gaviscon_syp', genericName: 'Sodium Alginate + Sodium Bicarbonate Liquid (Gaviscon 150ml)', category: 'all', dosage: '10ml to 20ml after meals and at bedtime', duration: '14 days', keywords: 'gaviscon sodium alginate acid reflux barrier heartburn gerd' },
  { id: 'gen_ganaton50', genericName: 'Itopride Hydrochloride 50mg Tablet (Ganaton 50 / Itozure)', category: 'adult', dosage: '1 tablet 3 times daily 15 mins before meals', duration: '14 days', keywords: 'itopride ganaton prokinetic dyspepsia nausea fullness gastroparesis', minAge: 18 },
  { id: 'gen_levazeo25', genericName: 'Levosulpiride 25mg Tablet (Levazeo 25 / Lesuride)', category: 'adult', dosage: '1 tablet 3 times daily 15 mins before meals', duration: '14 days', keywords: 'levosulpiride levazeo lesuride prokinetic gerd dyspepsia anxiety', minAge: 18 },
  { id: 'gen_redotil100', genericName: 'Racecadotril 100mg Capsule (Redotil 100 / Enuff)', category: 'adult', dosage: '1 capsule 3 times daily before meals (max 7 days)', duration: '3 days', keywords: 'racecadotril redotil enuff antisecretory acute watery diarrhea', minAge: 12 },
  { id: 'gen_darolac_cap', genericName: 'Lactobacillus + Bifidobacterium Multi-Strain Probiotic (Darolac)', category: 'all', dosage: '1 capsule twice daily after meals', duration: '7 days', keywords: 'darolac probiotic lactobacillus gut flora diarrhea ibs' },
  { id: 'gen_colospa135', genericName: 'Mebeverine Hydrochloride 135mg Tablet (Colospa 135)', category: 'adult', dosage: '1 tablet 3 times daily 20 mins before meals', duration: '14 days', keywords: 'mebeverine colospa antispasmodic irritable bowel syndrome ibs abdominal cramp', minAge: 18 },
  { id: 'gen_buscopan10', genericName: 'Hyoscine Butylbromide 10mg Tablet (Buscopan 10)', category: 'adult', dosage: '1 to 2 tablets 3 to 4 times daily S.O.S', duration: '3 days', keywords: 'hyoscine buscopan antispasmodic stomach ache abdominal colic renal colic', minAge: 12 },
  { id: 'gen_urispas200', genericName: 'Flavoxate Hydrochloride 200mg Tablet (Urispas 200 / Urikind)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '5 days', keywords: 'flavoxate urispas urikind urinary antispasmodic dysuria pain bladder spasm uti', minAge: 12 },
  { id: 'gen_saaz500', genericName: 'Sulfasalazine 500mg EC Tablet (Saaz 500 / Salazopyrin)', category: 'adult', dosage: '2 tablets 2 to 3 times daily after meals', duration: '30 days', keywords: 'sulfasalazine saaz salazopyrin ulcerative colitis ibd rheumatoid arthritis', minAge: 12 },
  { id: 'gen_mesacol800', genericName: 'Mesalamine / 5-ASA 800mg EC Tablet (Mesacol 800)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '30 days', keywords: 'mesalamine mesacol 5-asa ulcerative colitis crohn ibd anti-inflammatory', minAge: 18 },
  { id: 'gen_dulcolax5', genericName: 'Bisacodyl 5mg EC Tablet (Dulcolax 5)', category: 'adult', dosage: '1 to 2 tablets at bedtime with glass of water', duration: '3 days', keywords: 'bisacodyl dulcolax laxative constipation bowel clearance', minAge: 12 },
  { id: 'gen_cremaffin_syp', genericName: 'Liquid Paraffin + Milk of Magnesia Syrup (Cremaffin 225ml)', category: 'all', dosage: '15ml to 30ml at bedtime with warm water', duration: '5 days', keywords: 'cremaffin liquid paraffin milk of magnesia laxative stool softener constipation' },
  { id: 'gen_fybogel_sachet', genericName: 'Ispaghula Husk / Psyllium 3.5g Effervescent Sachet (Fybogel / Kayam)', category: 'all', dosage: '1 sachet dissolved in glass of cold water twice daily after meals', duration: '14 days', keywords: 'fybogel ispaghula psyllium fiber bulk laxative constipation ibs' },

  // ==========================================
  // 12. ADDITIONAL RESPIRATORY, ANTISTAMINIC & ENT DRUGS
  // ==========================================
  { id: 'gen_bilashine20', genericName: 'Bilastine 20mg Tablet (Bilashine 20 / Bilafav / Ataveo)', category: 'adult', dosage: '1 tablet once daily on empty stomach 1 hour before or 2 hours after food', duration: '10 days', keywords: 'bilastine bilashine bilafav 2nd gen antihistamine non-drowsy allergy hives rhinitis', minAge: 12 },
  { id: 'gen_allegra180', genericName: 'Fexofenadine 180mg Tablet (Allegra 180 / Fexova)', category: 'adult', dosage: '1 tablet once daily', duration: '10 days', keywords: 'fexofenadine allegra 180 antihistamine severe urticaria skin allergy hives', minAge: 12 },
  { id: 'gen_lorfast10', genericName: 'Loratadine 10mg Tablet (Lorfast 10 / Claritin)', category: 'adult', dosage: '1 tablet once daily', duration: '7 days', keywords: 'loratadine lorfast claritin non-drowsy antihistamine allergy sneezing runny nose', minAge: 12 },
  { id: 'gen_ebast20', genericName: 'Ebastine 20mg Tablet (Ebast 20 / Ebasil)', category: 'adult', dosage: '1 tablet once daily', duration: '7 days', keywords: 'ebastine ebast ebasil antihistamine allergic rhinitis urticaria', minAge: 12 },
  { id: 'gen_avil25', genericName: 'Pheniramine Maleate 25mg Tablet (Avil 25)', category: 'all', dosage: '1 tablet 2 to 3 times daily after meals', duration: '3 days', keywords: 'pheniramine avil 25 antihistamine allergy motion sickness itching sedative' },
  { id: 'gen_ciplactin4', genericName: 'Cyproheptadine Hydrochloride 4mg Tablet (Ciplactin 4)', category: 'all', dosage: '1 tablet 3 times daily 30 mins before meals', duration: '14 days', keywords: 'cyproheptadine ciplactin appetite stimulant weight gain antihistamine allergy' },
  { id: 'gen_benadryl_dr', genericName: 'Dextromethorphan 15mg + Chlorpheniramine 2mg Syrup (Benadryl DR 100ml)', category: 'all', dosage: '10ml 3 times daily after food', duration: '5 days', keywords: 'benadryl dr dextromethorphan dry cough syrup cold throat tickle' },
  { id: 'gen_mucolite75', genericName: 'Ambroxol Hydrochloride 75mg SR Capsule (Mucolite SR)', category: 'adult', dosage: '1 capsule once daily after food', duration: '5 days', keywords: 'ambroxol mucolite mucolytic wet productive cough phlegm bronchitis', minAge: 18 },
  { id: 'gen_nac600', genericName: 'N-Acetylcysteine 600mg Effervescent Tablet (Nac 600 / Mucinac)', category: 'adult', dosage: '1 tablet dissolved in 1 glass water once or twice daily after food', duration: '7 days', keywords: 'acetylcysteine nac 600 mucinac effervescent mucolytic copd paracetamol antidote chest congestion', minAge: 12 },
  { id: 'gen_doxolin400', genericName: 'Doxofylline 400mg Tablet (Doxolin 400 / Doxovent)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '14 days', keywords: 'doxofylline doxolin bronchodilator xanthine asthma copd wheezing breathlessness', minAge: 18 },
  { id: 'gen_mucobron100', genericName: 'Acebrophylline 100mg Capsule (Mucobron 100 / AB-Flo)', category: 'adult', dosage: '1 capsule twice daily after meals', duration: '14 days', keywords: 'acebrophylline mucobron ab-flo bronchodilator mucoregulator asthma copd', minAge: 18 },
  { id: 'gen_asthalin4', genericName: 'Salbutamol 4mg Tablet (Asthalin 4)', category: 'adult', dosage: '1 tablet 3 times daily', duration: '5 days', keywords: 'salbutamol asthalin albuterol bronchodilator asthma wheezing bronchospasm', minAge: 12 },
  { id: 'gen_levolin2', genericName: 'Levosalbutamol 2mg Tablet (Levolin 2)', category: 'adult', dosage: '1 tablet 3 times daily', duration: '5 days', keywords: 'levosalbutamol levolin bronchodilator asthma wheezing', minAge: 12 },
  { id: 'gen_budecort200_inh', genericName: 'Budesonide 200mcg Inhaler (Budecort 200 Inhaler)', category: 'all', dosage: '2 puffs twice daily (rinse mouth thoroughly with water after use)', duration: '30 days', keywords: 'budesonide budecort inhaled corticosteroid ics asthma copd preventative' },
  { id: 'gen_flixonase125_inh', genericName: 'Fluticasone Propionate 125mcg Inhaler (Flixonase Inhaler)', category: 'all', dosage: '2 puffs twice daily with mouth rinse', duration: '30 days', keywords: 'fluticasone flixonase inhaled steroid ics asthma COPD' },
  { id: 'gen_tiova_rotacap', genericName: 'Tiotropium Bromide 18mcg Rotacaps (Tiova Rotacaps)', category: 'adult', dosage: '1 rotacap inhaled once daily via Rotahaler device', duration: '30 days', keywords: 'tiotropium tiova lama anticholinergic copd emphysema chronic bronchitis', minAge: 18 },
  { id: 'gen_ipravent_neb', genericName: 'Ipratropium Bromide 500mcg Nebuliser Solution (Ipravent Respules)', category: 'all', dosage: '1 respule nebulized 3 to 4 times daily', duration: '5 days', keywords: 'ipratropium ipravent lama anticholinergic nebulization asthma copd' },
  { id: 'gen_foracort400_inh', genericName: 'Formoterol 12mcg + Budesonide 400mcg Inhaler (Foracort 400)', category: 'adult', dosage: '1 to 2 puffs twice daily with mouth rinse', duration: '30 days', keywords: 'formoterol budesonide foracort 400 laba ics asthma copd maintenance', minAge: 12 },
  { id: 'gen_seretide250_inh', genericName: 'Salmeterol 50mcg + Fluticasone 250mcg Evohaler (Seretide 250)', category: 'adult', dosage: '2 puffs twice daily with mouth rinse', duration: '30 days', keywords: 'salmeterol fluticasone seretide 250 laba ics asthma copd', minAge: 12 },
  { id: 'gen_azelast_spray', genericName: 'Azelastine Hydrochloride 0.1% Nasal Spray (Azelast Nasal)', category: 'adult', dosage: '1 to 2 sprays in each nostril twice daily', duration: '14 days', keywords: 'azelastine azelast antihistamine nasal spray allergic rhinitis sneezing', minAge: 12 },
  { id: 'gen_avamys_spray', genericName: 'Fluticasone Furoate 27.5mcg Nasal Spray (Avamys 120 Doses)', category: 'all', dosage: '2 sprays in each nostril once daily', duration: '30 days', keywords: 'fluticasone avamys steroid nasal spray allergic rhinitis sinusitis' },
  { id: 'gen_nasonex_spray', genericName: 'Mometasone Furoate 50mcg Nasal Spray (Nasonex)', category: 'all', dosage: '2 sprays in each nostril once daily', duration: '30 days', keywords: 'mometasone nasonex steroid nasal spray nasal polyps allergic rhinitis' },

  // ==========================================
  // 13. ADDITIONAL RHEUMATOLOGY, NEUROPATHIC & ANALGESIC DRUGS
  // ==========================================
  { id: 'gen_nucoxia90', genericName: 'Etoricoxib 90mg Tablet (Nucoxia 90 / Arcoxia)', category: 'adult', dosage: '1 tablet once daily after food', duration: '5 days', keywords: 'etoricoxib nucoxia arcoxia cox-2 selective nsaid arthritis gout severe joint pain', minAge: 18 },
  { id: 'gen_nucoxia60', genericName: 'Etoricoxib 60mg Tablet (Nucoxia 60)', category: 'adult', dosage: '1 tablet once daily after food', duration: '7 days', keywords: 'etoricoxib nucoxia cox-2 nsaid osteoarthritis joint pain backache', minAge: 18 },
  { id: 'gen_naprosyn500', genericName: 'Naproxen 500mg Tablet (Naprosyn 500 / Xenobid)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'naproxen naprosyn nsaid migraine joint pain ankylosing spondylitis fever', minAge: 12 },
  { id: 'gen_dolonex20', genericName: 'Piroxicam 20mg Dispersible Tablet (Dolonex DT 20)', category: 'adult', dosage: '1 tablet dissolved in 15ml water once daily after meals', duration: '5 days', keywords: 'piroxicam dolonex nsaid acute gout joint pain arthritis', minAge: 18 },
  { id: 'gen_indocap25', genericName: 'Indomethacin 25mg Capsule (Indocap 25)', category: 'adult', dosage: '1 capsule 2 to 3 times daily after meals', duration: '5 days', keywords: 'indomethacin indocap potent nsaid gout pericarditis joint pain', minAge: 18 },
  { id: 'gen_celebrex200', genericName: 'Celecoxib 200mg Capsule (Celebrex 200 / Celact)', category: 'adult', dosage: '1 capsule once or twice daily after meals', duration: '7 days', keywords: 'celecoxib celebrex celact cox-2 nsaid osteoarthritis rheumatoid arthritis', minAge: 18 },
  { id: 'gen_nise100', genericName: 'Nimesulide 100mg Tablet (Nise 100 / Nimulid)', category: 'adult', dosage: '1 tablet twice daily after meals (max 5 days)', duration: '3 days', keywords: 'nimesulide nise nimulid nsaid acute pain fever dental pain', minAge: 12 },
  { id: 'gen_tydol50', genericName: 'Tapentadol 50mg Tablet (Tydol 50 / Topcet)', category: 'adult', dosage: '1 tablet 3 to 4 times daily S.O.S', duration: '3 days', keywords: 'tapentadol tydol topcet central analgesic severe neuropathic postop pain', minAge: 18 },
  { id: 'gen_folitrax15', genericName: 'Methotrexate 15mg Weekly Tablet (Folitrax 15)', category: 'adult', dosage: '15mg single weekly dose on fixed day with Folic Acid 5mg next day', duration: 'Weekly (60 days)', keywords: 'methotrexate folitrax dmard rheumatoid arthritis psoriasis arthritis immunosuppressant', minAge: 18 },
  { id: 'gen_folitrax75', genericName: 'Methotrexate 7.5mg Weekly Tablet (Folitrax 7.5)', category: 'adult', dosage: '7.5mg single weekly dose on fixed day', duration: 'Weekly (60 days)', keywords: 'methotrexate folitrax dmard rheumatoid arthritis jia', minAge: 12 },
  { id: 'gen_hcqs200', genericName: 'Hydroxychloroquine Sulfate 200mg Tablet (HCQS 200)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '60 days', keywords: 'hydroxychloroquine hcqs dmard sle lupus rheumatoid arthritis malaria', minAge: 18 },
  { id: 'gen_hcqs400', genericName: 'Hydroxychloroquine Sulfate 400mg Tablet (HCQS 400)', category: 'adult', dosage: '1 tablet once daily after food', duration: '60 days', keywords: 'hydroxychloroquine hcqs dmard sle lupus rheumatoid arthritis', minAge: 18 },
  { id: 'gen_lefno20', genericName: 'Leflunomide 20mg Tablet (Lefno 20 / Arava)', category: 'adult', dosage: '1 tablet once daily', duration: '60 days', keywords: 'leflunomide lefno arava dmard rheumatoid arthritis psoriatic arthritis', minAge: 18 },
  { id: 'gen_neoral50', genericName: 'Cyclosporine 50mg Softgel Capsule (Neoral 50 / Panimun)', category: 'adult', dosage: '1 capsule twice daily on empty stomach', duration: '60 days', keywords: 'cyclosporine neoral panimun immunosuppressant transplant nephrotic syndrome psoriasis', minAge: 18 },
  { id: 'gen_jointace_dn', genericName: 'Glucosamine Sulfate 750mg + Diacerein 50mg Tablet (Jointace DN)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '60 days', keywords: 'glucosamine diacerein jointace cartilage osteoarthritis knee pain joint supplement', minAge: 18 },
  { id: 'gen_zyloric100', genericName: 'Allopurinol 100mg Tablet (Zyloric 100)', category: 'adult', dosage: '1 tablet once or twice daily after meals', duration: '60 days', keywords: 'allopurinol zyloric xanthine oxidase inhibitor gout hyperuricemia uric acid stone', minAge: 18 },
  { id: 'gen_feburic40', genericName: 'Febuxostat 40mg Tablet (Feburic 40 / Zurig 40)', category: 'adult', dosage: '1 tablet once daily', duration: '60 days', keywords: 'febuxostat feburic zurig gout hyperuricemia uric acid lowering', minAge: 18 },
  { id: 'gen_myotop150', genericName: 'Tolperisone Hydrochloride 150mg Tablet (Myotop 150 / Myocalm)', category: 'adult', dosage: '1 tablet 3 times daily after meals', duration: '7 days', keywords: 'tolperisone myotop myocalm muscle relaxant back pain muscle spasm non-drowsy', minAge: 18 },
  { id: 'gen_flexilor8', genericName: 'Lornoxicam 8mg Tablet (Flexilor 8 / Lorcam)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'lornoxicam flexilor lorcam nsaid severe joint acute pain postop', minAge: 18 },

  // ==========================================
  // 14. ADDITIONAL ANTI-INFECTIVES, ANTIFUNGALS & ANTIVIRALS
  // ==========================================
  { id: 'gen_droxyl500', genericName: 'Cefadroxil 500mg Tablet (Droxyl 500 / Odoxil)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '5 days', keywords: 'cefadroxil droxyl odoxil 1st gen cephalosporin skin throat ssti antibiotic', minAge: 12 },
  { id: 'gen_taxim1g_inj', genericName: 'Inj Cefotaxime 1g IV/IM Vial (Taxim 1g)', category: 'all', dosage: '1g IV/IM 8 to 12 hourly', duration: '5 days', keywords: 'inj cefotaxime taxim 1g iv im vial 3rd gen cephalosporin antibiotic pediatric meningitis sepsis' },
  { id: 'gen_maxipime1g_inj', genericName: 'Inj Cefepime 1g IV Infusion Vial (Maxipime 1g)', category: 'adult', dosage: '1g to 2g IV infusion over 30 mins 12 hourly', duration: '7 days', keywords: 'inj cefepime maxipime 4th gen cephalosporin febrile neutropenia severe nosocomial', minAge: 12 },
  { id: 'gen_fortum1g_inj', genericName: 'Inj Ceftazidime 1g IV/IM Vial (Fortum 1g)', category: 'all', dosage: '1g IV infusion 8 hourly', duration: '7 days', keywords: 'inj ceftazidime fortum antipseudomonal 3rd gen cephalosporin sepsis burns uti' },
  { id: 'gen_ampiclox500', genericName: 'Ampicillin 250mg + Cloxacillin 250mg Capsule (Ampiclox / Megapen)', category: 'adult', dosage: '1 capsule 4 times daily 30 mins before food', duration: '5 days', keywords: 'ampicillin cloxacillin ampiclox megapen penicillin staph strep skin wound RTI', minAge: 12 },
  { id: 'gen_penidure_12', genericName: 'Inj Benzathine Penicillin G 1.2 Million Units IM (Penidure LA 12)', category: 'all', dosage: '1.2 MIU deep IM in gluteal stat after skin test (every 3 weeks for rheumatic fever)', duration: 'Stat / Rheumatic Prophylaxis', keywords: 'penidure benzathine penicillin g 1.2 miu rheumatic fever syphilis prophylaxis im' },
  { id: 'gen_unasyn15_inj', genericName: 'Inj Ampicillin 1g + Sulbactam 0.5g IV Vial (Unasyn 1.5g)', category: 'adult', dosage: '1.5g IV reconstituted 6 to 8 hourly', duration: '7 days', keywords: 'inj ampicillin sulbactam unasyn beta lactamase inhibitor intra-abdominal gynaec ssti', minAge: 12 },
  { id: 'gen_moxicip400', genericName: 'Moxifloxacin 400mg Tablet (Moxicip 400 / Avalox)', category: 'adult', dosage: '1 tablet once daily', duration: '7 days', keywords: 'moxifloxacin moxicip avalox respiratory fluoroquinolone community acquired pneumonia sinusitis', minAge: 18 },
  { id: 'gen_norflox400', genericName: 'Norfloxacin 400mg Tablet (Norflox 400 / Bacigyl)', category: 'adult', dosage: '1 tablet twice daily 1 hour before or 2 hours after meals', duration: '5 days', keywords: 'norfloxacin norflox fluoroquinolone uti bacterial gastroenteritis traveler diarrhea', minAge: 18 },
  { id: 'gen_tygacil50_inj', genericName: 'Inj Tigecycline 50mg IV Infusion Vial (Tygacil)', category: 'adult', dosage: '100mg IV loading infusion over 60m, then 50mg IV 12 hourly', duration: '7 to 14 days', keywords: 'inj tigecycline tygacil glycylcycline mrsa vre intra-abdominal skin mdr', minAge: 18 },
  { id: 'gen_hostacycline250', genericName: 'Tetracycline 250mg Capsule (Hostacycline 250)', category: 'adult', dosage: '1 capsule 4 times daily on empty stomach', duration: '7 days', keywords: 'tetracycline hostacycline acne rickettsia cholera chlamydia antibiotic', minAge: 12 },
  { id: 'gen_dazolic500', genericName: 'Ornidazole 500mg Tablet (Dazolic 500 / Orni)', category: 'adult', dosage: '1 tablet twice daily after food', duration: '5 days', keywords: 'ornidazole dazolic nitroimidazole amoebiasis giardiasis trichomoniasis anaerobic', minAge: 12 },
  { id: 'gen_nizonide500', genericName: 'Nitazoxanide 500mg Tablet (Nizonide 500)', category: 'adult', dosage: '1 tablet twice daily with food', duration: '3 days', keywords: 'nitazoxanide nizonide antiprotozoal cryptosporidium giardia viral gastroenteritis', minAge: 12 },
  { id: 'gen_vfend200', genericName: 'Voriconazole 200mg Tablet (Vfend 200 / Vorizef)', category: 'adult', dosage: '1 tablet twice daily 1 hour before or 1 hour after meals', duration: '14 days', keywords: 'voriconazole vfend triazole antifungal invasive aspergillosis candidemia', minAge: 12 },
  { id: 'gen_fluvir75', genericName: 'Oseltamivir 75mg Capsule (FluVir 75 / Tamiflu)', category: 'adult', dosage: '1 capsule twice daily for 5 days', duration: '5 days', keywords: 'oseltamivir fluvir tamiflu influenza h1n1 flu antiviral neuraminidase inhibitor', minAge: 12 },
  { id: 'gen_fabiflu400', genericName: 'Favipiravir 400mg Tablet (FabiFlu 400)', category: 'adult', dosage: '1800mg BD Day 1, then 800mg BD Days 2-14', duration: '14 days', keywords: 'favipiravir fabiflu antiviral influenza covid RNA polymerase inhibitor', minAge: 18 },

  // ==========================================
  // 15. ADDITIONAL DERMATOLOGY, UROLOGY & OPHTHALMOLOGY DRUGS
  // ==========================================
  { id: 'gen_lulifin_cream', genericName: 'Luliconazole 1% w/w Cream 30g (Lulifin / Lulican)', category: 'all', dosage: 'Apply thin layer once daily on clean dry affected area for 2 weeks', duration: '14 days', keywords: 'luliconazole lulifin lulican antifungal cream ringworm tinea cruris tinea corporis jock itch' },
  { id: 'gen_loceryl_lacquer', genericName: 'Amorolfine 5% w/v Nail Lacquer (Loceryl 5ml)', category: 'all', dosage: 'Apply to affected fingernails / toenails once or twice weekly', duration: '6 months', keywords: 'amorolfine loceryl nail lacquer antifungal fungal nail infection onychomycosis' },
  { id: 'gen_nadoxin_cream', genericName: 'Nadifloxacin 1% Cream (Nadoxin 10g)', category: 'all', dosage: 'Apply twice daily on acne / folliculitis lesions', duration: '14 days', keywords: 'nadifloxacin nadoxin topical fluoroquinolone antibacterial acne pimples folliculitis' },
  { id: 'gen_retino_a', genericName: 'Tretinoin 0.05% w/w Cream (Retino-A 20g)', category: 'adult', dosage: 'Apply pea-sized amount over face at bedtime (use sunscreen in morning)', duration: '60 days', keywords: 'tretinoin retino-a retinoid acne anti-aging comedones wrinkle', minAge: 12 },
  { id: 'gen_isotroin20', genericName: 'Isotretinoin 20mg Softgel Capsule (Isotroin 20 / Sotret)', category: 'adult', dosage: '1 capsule once daily with fatty meal (monitor LFT & lipids)', duration: '60 days', keywords: 'isotretinoin isotroin sotret retinoid severe nodulocystic acne teratogenic', minAge: 18 },
  { id: 'gen_tacroz01', genericName: 'Tacrolimus 0.1% Ointment (Tacroz 0.1 / Tacroz Fort)', category: 'adult', dosage: 'Apply thin layer twice daily on eczema / vitiligo lesions', duration: '30 days', keywords: 'tacrolimus tacroz calcineurin inhibitor non-steroid eczema vitiligo atopic dermatitis', minAge: 16 },
  { id: 'gen_daivobet_oint', genericName: 'Calcipotriol 0.005% + Clobetasol 0.05% Ointment (Daivobet)', category: 'adult', dosage: 'Apply thin layer once daily on scalp / plaque psoriasis (max 4 weeks)', duration: '28 days', keywords: 'calcipotriol clobetasol daivobet vitamin d analog steroid psoriasis plaques', minAge: 18 },
  { id: 'gen_tugain5', genericName: 'Minoxidil 5% Topical Solution 60ml (Tugain 5 / Mintop)', category: 'adult', dosage: '1ml applied to dry scalp twice daily', duration: '90 days', keywords: 'minoxidil tugain mintop hair loss androgenetic alopecia hair growth male pattern baldness', minAge: 18 },
  { id: 'gen_finast1', genericName: 'Finasteride 1mg Tablet (Finast 1 / Finpecia)', category: 'adult', dosage: '1 tablet once daily', duration: '90 days', keywords: 'finasteride finast finpecia 5-alpha reductase inhibitor hair loss androgenetic alopecia', minAge: 18 },
  { id: 'gen_scalpe_plus', genericName: 'Ketoconazole 2% + Zinc Pyrithione (ZPTO) Shampoo (Scalpe Plus 100ml)', category: 'all', dosage: 'Apply to wet scalp twice weekly, massage 3 mins, rinse thoroughly', duration: '30 days', keywords: 'ketoconazole zpto scalpe plus shampoo dandruff seborrheic dermatitis scalp itching' },
  { id: 'gen_urimax_d', genericName: 'Tamsulosin 0.4mg + Dutasteride 0.5mg MR Capsule (Urimax-D)', category: 'adult', dosage: '1 capsule once daily 30 mins after same meal each day', duration: '60 days', keywords: 'tamsulosin dutasteride urimax-d bph benign prostatic hyperplasia urinary hesitancy prostate', minAge: 18 },
  { id: 'gen_silofast8', genericName: 'Silodosin 8mg Capsule (Silofast 8 / Rapilif)', category: 'adult', dosage: '1 capsule once daily with meal', duration: '30 days', keywords: 'silodosin silofast rapilif alpha blocker uroselective bph prostate urinary flow', minAge: 18 },
  { id: 'gen_alfoo10', genericName: 'Alfuzosin Hydrochloride 10mg ER Tablet (Alfoo 10)', category: 'adult', dosage: '1 tablet once daily immediately after same meal', duration: '30 days', keywords: 'alfuzosin alfoo alpha blocker bph prostate urine retention', minAge: 18 },
  { id: 'gen_minipress5', genericName: 'Prazosin Hydrochloride 5mg XL Tablet (Minipress XL 5)', category: 'adult', dosage: '1 tablet once or twice daily', duration: '30 days', keywords: 'prazosin minipress alpha blocker hypertension raynaud bph PTSD nightmares', minAge: 18 },
  { id: 'gen_solicept5', genericName: 'Solifenacin Succinate 5mg Tablet (Solicept 5 / Vesigard)', category: 'adult', dosage: '1 tablet once daily with water', duration: '30 days', keywords: 'solifenacin solicept vesigard antimuscarinic overactive bladder oab urinary urge frequency incontinence', minAge: 18 },
  { id: 'gen_mirago50', genericName: 'Mirabegron 50mg ER Tablet (Mirago 50 / Bladmir)', category: 'adult', dosage: '1 tablet once daily with or without food', duration: '30 days', keywords: 'mirabegron mirago bladmir beta-3 agonist overactive bladder oab urge incontinence', minAge: 18 },
  { id: 'gen_alfa_ketolog', genericName: 'Ketoanalogues of Essential Amino Acids Tablet (Alfa-Ketolog / Renagard)', category: 'adult', dosage: '1 to 2 tablets 3 times daily with meals', duration: '60 days', keywords: 'ketoanalogues alfa-ketolog renagard ckd chronic kidney disease low protein diet uremia nephrology', minAge: 18 },
  { id: 'gen_eprex4000', genericName: 'Inj Erythropoietin / Epoetin Alfa 4000 IU Prefilled Syringe (Eprex / Epofit)', category: 'adult', dosage: '4000 IU Subcutaneous 1 to 3 times weekly (target Hb 10-11 g/dl)', duration: '30 days', keywords: 'erythropoietin epo eprex epofit ckd anemia erythropoiesis subcutaneous dialysis', minAge: 18 },
  { id: 'gen_renvela800', genericName: 'Sevelamer Carbonate 800mg Tablet (Renvela 800 / Sevcar)', category: 'adult', dosage: '1 to 2 tablets 3 times daily with meals', duration: '30 days', keywords: 'sevelamer renvela sevcar phosphate binder ckd hyperphosphatemia hemodialysis', minAge: 18 },
  { id: 'gen_uprise_60k', genericName: 'Cholecalciferol (Vitamin D3) 60,000 IU Capsule / Sachet (Uprise-D3 60K)', category: 'all', dosage: '1 capsule / sachet once weekly with milk for 8 weeks', duration: '8 weeks', keywords: 'cholecalciferol vitamin d3 uprise-d3 60k bone density rickets osteomalacia deficiency' },
  { id: 'gen_aricept10', genericName: 'Donepezil Hydrochloride 10mg Tablet (Aricept 10 / Donep)', category: 'adult', dosage: '1 tablet at bedtime', duration: '60 days', keywords: 'donepezil aricept donep acetylcholinesterase inhibitor alzheimer dementia memory loss', minAge: 18 },
  { id: 'gen_admenta10', genericName: 'Memantine Hydrochloride 10mg Tablet (Admenta 10)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '60 days', keywords: 'memantine admenta nmda receptor antagonist alzheimer moderate severe dementia', minAge: 18 },
  { id: 'gen_syndopa110', genericName: 'Levodopa 100mg + Carbidopa 10mg Tablet (Syndopa 110)', category: 'adult', dosage: '1 tablet 3 to 4 times daily', duration: '60 days', keywords: 'levodopa carbidopa syndopa 110 parkinson disease tremor rigidity bradykinesia', minAge: 18 },
  { id: 'gen_pacitane2', genericName: 'Trihexyphenidyl / Benzhexol 2mg Tablet (Pacitane 2)', category: 'adult', dosage: '1 tablet 2 to 3 times daily after meals', duration: '30 days', keywords: 'trihexyphenidyl pacitane anticholinergic parkinson drug induced eps tremor', minAge: 18 },
  { id: 'gen_strocit500', genericName: 'Citicoline Sodium 500mg Tablet (Strocit 500 / Somazina)', category: 'adult', dosage: '1 tablet twice daily after meals', duration: '30 days', keywords: 'citicoline strocit somazina neuroprotective ischemic stroke head injury memory cognitive', minAge: 18 },
  { id: 'gen_xalatan_drops', genericName: 'Latanoprost 0.005% w/v Ophthalmic Solution 2.5ml (Xalatan)', category: 'adult', dosage: '1 drop in affected eye once daily in evening', duration: '30 days', keywords: 'latanoprost xalatan prostaglandin analog glaucoma iop ocular hypertension eye drops', minAge: 18 },
  { id: 'gen_travatan_drops', genericName: 'Travoprost 0.004% Ophthalmic Solution 2.5ml (Travatan)', category: 'adult', dosage: '1 drop in affected eye once daily in evening', duration: '30 days', keywords: 'travoprost travatan prostaglandin glaucoma iop eye drops', minAge: 18 },
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
  {
    id: 'endocrinology-diabetology',
    name: 'Endocrinology & Diabetology',
    templates: [
      {
        id: 't2dm-dual-triple-therapy',
        name: 'Type 2 Diabetes Mellitus (Oral Dual/Triple Combination Regimen)',
        tests: [
          'HbA1c (Glycated Hemoglobin)',
          'Fasting Blood Sugar (FBS) & Post-Prandial (PPBS)',
          'Serum Creatinine & eGFR',
          'Urine Microalbumin / Creatinine Ratio',
          'Lipid Profile (Full Panel)',
        ],
        advice: [
          'Low Glycemic Index / High Fiber Diabetic Diet',
          'Daily 45-minute Brisk Walk or Aerobic Exercise',
          'Self-Monitoring of Blood Glucose (SMBG) Charting',
          'Foot Care Protocol & Soft Cushioned Footwear',
        ],
        drugs: [
          'Metformin 500mg + Teneligliptin 20mg Tablet (Tenepure-M) (1-0-1 after food) x 30 days',
          'Dapagliflozin 10mg Tablet (Forxiga) (1-0-0 morning after breakfast) x 30 days',
          'Vildagliptin 50mg Tablet (Galvus) (1-0-1 before meals) x 30 days',
          'Gliclazide 60mg MR Tablet (Diamicron MR) (1-0-0 with breakfast) x 30 days',
        ],
        notes: 'Target HbA1c < 7.0%. Re-evaluate kidney function every 6 months.',
      },
      {
        id: 'hypothyroidism-thyronorm-protocol',
        name: 'Primary Hypothyroidism Replacement & Titration Protocol',
        tests: [
          'Serum TSH (Thyroid Stimulating Hormone)',
          'Free T3 & Free T4 Panel',
          'Anti-TPO Antibodies (if autoimmune etiology suspected)',
        ],
        advice: [
          'Take Levothyroxine strictly on empty stomach 30-45 minutes before morning tea/breakfast with full glass of water',
          'Do not take Calcium, Iron, or Antacid tablets within 4 hours of Levothyroxine',
        ],
        drugs: [
          'Levothyroxine Sodium 50mcg / 75mcg / 100mcg Tablet (Thyronorm / Eltroxin) (1-0-0 empty stomach in morning) x 90 days',
        ],
        notes: 'Re-check serum TSH after 6-8 weeks of dose adjustment. Target TSH 0.5 - 2.5 mIU/L.',
      },
      {
        id: 'hyperthyroidism-carbimazole-protocol',
        name: 'Hyperthyroidism & Thyrotoxicosis Management Protocol',
        tests: [
          'Serum TSH, Free T3 & Free T4',
          'Anti-TSH Receptor Antibodies (TRAb)',
          'CBC with Differential (Baseline Neutrophil Count)',
          'Liver Function Test (LFT)',
        ],
        advice: [
          'Avoid excess iodine / seafood diet',
          'Report immediately if fever, sore throat, or mouth ulcers occur (risk of agranulocytosis)',
        ],
        drugs: [
          'Carbimazole 10mg / 20mg Tablet (Neomercazole) (1-0-1 after food) x 30 days',
          'Propranolol 10mg / 20mg Tablet (Ciplar) (1-0-1 after food) x 30 days',
        ],
        notes: 'Monitor CBC & LFT monthly. Taper Carbimazole as Free T4 normalizes.',
      },
      {
        id: 'diabetic-neuropathy-care',
        name: 'Diabetic Peripheral Neuropathy & Pain Protocol',
        tests: [
          'Fasting & PP Blood Glucose',
          'HbA1c',
          'Serum Vitamin B12 level',
          'Monofilament Foot Sensation Testing',
        ],
        advice: [
          'Inspect feet daily for cuts, blisters, or redness',
          'Never walk barefoot; wear comfortable diabetic footwear',
          'Maintain tight blood glucose control (HbA1c < 7.0%)',
        ],
        drugs: [
          'Pregabalin 75mg + Methylcobalamin 1500mcg Capsule (Maxgalin-M) (0-0-1 at bedtime) x 30 days',
          'Gabapentin 300mg + Methylcobalamin 500mcg Tablet (0-0-1 at bedtime) x 30 days',
          'Duloxetine 30mg Capsule (Duzela) (1-0-0 morning) x 30 days',
        ],
        notes: 'Assess symptom improvement on visual analog pain scale after 4 weeks.',
      },
      {
        id: 'osteoporosis-vit-d-protocol',
        name: 'Osteoporosis & Vitamin D3 Deficiency Protocol',
        tests: [
          'DEXA Bone Mineral Density Scan (T-score)',
          'Serum 25-Hydroxy Vitamin D',
          'Serum Calcium, Phosphate & Alkaline Phosphatase',
        ],
        advice: [
          'Daily 20-minute morning sun exposure (10 AM - 2 PM)',
          'Weight-bearing exercise (30 mins walk 5x/week)',
          'Diet rich in dairy products, sesame seeds, green leafy vegetables',
        ],
        drugs: [
          'Cholecalciferol (Vitamin D3) 60,000 IU Capsule / Sachet (Uprise-D3 60K) (1 sachet/week with milk for 8 weeks)',
          'Calcium Carbonate 500mg + Vitamin D3 250 IU Tablet (Shelcal 500) (0-1-0 after lunch) x 60 days',
          'Calcitriol 0.25mcg Softgel Capsule (Calcirol) (1-0-0 after food) x 30 days',
          'Alendronate 70mg Weekly Tablet (Fosamax) (1 tab once weekly on empty stomach with 250ml water, remain upright 30m)',
        ],
        notes: 'Re-evaluate DEXA scan after 1-2 years of bisphosphonate therapy.',
      },
      {
        id: 'pcos-endocrine-protocol',
        name: 'Polycystic Ovary Syndrome (PCOS) Endocrine Protocol',
        tests: [
          'Pelvic Ultrasound (Ovarian Follicle Count)',
          'Fasting Insulin & Glucose Tolerance Test (GTT)',
          'LH, FSH, Total Testosterone & DHEAS',
          'Lipid Profile & Thyroid Profile (TSH)',
        ],
        advice: [
          'Low Glycemic Index / Mediterranean Diet',
          'Weight reduction 5-10% improves ovulation and insulin sensitivity',
          '30-45 mins moderate intensity exercise 5 days a week',
        ],
        drugs: [
          'Metformin 500mg SR Tablet (Glycomet) (1-0-1 with main meals) x 60 days',
          'Myo-inositol 1000mg + D-Chiro-inositol 25mg Sachet (Folvite PCOS) (1 sachet in water twice daily) x 60 days',
          'Spironolactone 50mg Tablet (Aldactone) (1-0-0 morning) x 60 days',
        ],
        notes: 'Advised lifestyle modification & monthly menstrual cycle tracking.',
      },
    ],
  },
  {
    id: 'psychiatry-mental-health',
    name: 'Psychiatry & Mental Health',
    templates: [
      {
        id: 'major-depression-anxiety',
        name: 'Major Depressive Disorder & Generalized Anxiety Protocol',
        tests: [
          'Thyroid Profile (TSH - rule out organic hypothyroidism)',
          'Serum Vitamin B12 & Vitamin D3 Levels',
          'Baseline CBC & Electrolytes',
        ],
        advice: [
          'Cognitive Behavioral Therapy (CBT) & Counseling Referral',
          'Daily 30-minute outdoor physical activity & sleep hygiene',
          'Avoid abrupt drug discontinuation (risk of withdrawal/relapse)',
        ],
        drugs: [
          'Escitalopram 10mg Tablet (Nexito) (1-0-0 morning after food) x 30 days',
          'Sertraline 50mg Tablet (Zosert) (1-0-0 morning) x 30 days',
          'Clonazepam 0.25mg Tablet (Zapiz) (0-0-1 SOS for severe panic/insomnia) x 10 days',
        ],
        notes: 'Antidepressant therapeutic onset takes 2-4 weeks. Follow-up after 14 days.',
      },
      {
        id: 'schizophrenia-psychosis-care',
        name: 'Schizophrenia & Acute Psychosis Protocol',
        tests: [
          'Fasting Blood Sugar & Lipid Profile (Metabolic Monitoring)',
          'Baseline ECG (QTc Interval Assessment)',
          'Serum Prolactin Level',
        ],
        advice: [
          'Caregiver education on strict medication compliance',
          'Regular monitoring for extrapyramidal symptoms or weight gain',
        ],
        drugs: [
          'Risperidone 2mg Tablet (Respidon) (1-0-1 after food) x 30 days',
          'Olanzapine 5mg Tablet (Oleanz) (0-0-1 bedtime) x 30 days',
          'Trihexyphenidyl 2mg Tablet (Pacitane) (1-0-1 SOS for stiffness/tremors) x 30 days',
        ],
        notes: 'Monitor metabolic parameters (weight, blood sugar, lipids) every 3 months.',
      },
      {
        id: 'bipolar-mood-stabilization',
        name: 'Bipolar Affective Disorder Mood Stabilization Protocol',
        tests: [
          'Serum Lithium Level (Target 0.6 - 1.2 mEq/L)',
          'Serum Creatinine, BUN & Thyroid Function Tests',
          'Liver Function Test (LFT) & CBC (for Sodium Valproate)',
        ],
        advice: [
          'Maintain steady fluid and salt intake (dehydration increases lithium toxicity)',
          'Promptly report nausea, coarse tremors, diarrhea, or confusion',
        ],
        drugs: [
          'Lithium Carbonate 300mg SR Tablet (Lithosun SR) (1-0-1 after food) x 30 days',
          'Sodium Valproate 500mg SR Tablet (Encorate Chrono) (1-0-1 after food) x 30 days',
        ],
        notes: 'Check 12-hour trough serum lithium level 5-7 days after initiating or changing dose.',
      },
    ],
  },
  {
    id: 'neurology-headache-care',
    name: 'Neurology & Neuro-Vascular Care',
    templates: [
      {
        id: 'migraine-prophylaxis-protocol',
        name: 'Acute Migraine Attack & Prophylaxis Protocol',
        tests: [
          'Non-Contrast CT / MRI Brain (if red flags: thunderclap onset, focal neurological deficit, >50 yrs onset)',
        ],
        advice: [
          'Maintain a Migraine Diary to identify triggers (bright light, skipped meals, stress, caffeine)',
          'Adequate hydration (3L water daily) and regular sleep schedule',
        ],
        drugs: [
          'Flunarizine 10mg Tablet (Sibelium) (0-0-1 bedtime) x 30 days',
          'Propranolol 40mg SR Tablet (Ciplar LA) (1-0-0 morning) x 30 days',
          'Sumatriptan 50mg Tablet (Suminat) (1 tab SOS at migraine onset, repeat after 2h if needed, max 100mg/day)',
          'Naproxen 500mg Tablet (Naprosyn) (1 tab SOS after food for severe headache)',
          'Domperidone 10mg Tablet (1 tab SOS for migraine nausea)',
        ],
        notes: 'Prophylactic drugs take 4-8 weeks for full benefit. Re-evaluate monthly.',
      },
      {
        id: 'hepatic-encephalopathy-cirrhosis',
        name: 'Advanced Cirrhosis & Hepatic Encephalopathy Protocol',
        tests: [
          'Serum Ammonia Level',
          'LFT, Serum Albumin & PT/INR',
          'Serum Electrolytes (Sodium & Potassium)',
          'USG Doppler Abdomen with Portal Vein Flow',
        ],
        advice: [
          'Ensure 2-3 soft bowel movements daily (lactulose titrates stool frequency)',
          'Low Sodium Diet (<2g/day) & Moderate High Quality Protein',
        ],
        drugs: [
          'Lactulose 10g/15ml Syrup (Duphalac) (15ml 1-1-1 after food, titrate to 2-3 soft stools/day) x 30 days',
          'Rifaximin 550mg Tablet (Rifagut) (1-0-1 after food) x 30 days',
          'Spironolactone 100mg + Furosemide 40mg Tablet (Lasilactone 100) (1-0-0 morning) x 30 days',
          'L-Ornithine L-Aspartate 500mg Tablet (1-0-1 after food) x 30 days',
        ],
        notes: 'Avoid sedatives & NSAIDs. Monitor for spontaneous bacterial peritonitis (SBP).',
      },
      {
        id: 'ckd-hyperkalemia-anemia',
        name: 'Advanced CKD Hyperkalemia & Renal Anemia Protocol',
        tests: [
          'Serum Potassium (K+) & Electrolytes',
          'Serum Creatinine, eGFR & Blood Urea Nitrogen',
          'Hemoglobin, Serum Ferritin & Transferrin Saturation (TSAT)',
        ],
        advice: [
          'Strict Low Potassium Diet (avoid bananas, citrus fruits, coconut water, green leafy vegetables)',
          'Avoid Potassium-sparing diuretics & OTC pain killers (NSAIDs)',
        ],
        drugs: [
          'Calcium Polystyrene Sulfonate 15g Sachet (K-Bind) (1 sachet in water 1-1-1 after meals) x 14 days',
          'Erythropoietin (rHuEPO) 4000 IU Injection (Eprex) (Subcutaneous twice weekly) x 30 days',
          'Iron Sucrose 100mg IV Infusion (Venofer) (100mg in 100ml NS over 30 mins weekly x 5 doses)',
          'Sevelamer Carbonate 800mg Tablet (Renvela) (1-1-1 with meals) x 30 days',
        ],
        notes: 'Target Hb 10-11 g/dL. Re-check serum potassium every 3-7 days.',
      },
      {
        id: 'pad-claudication-vascular',
        name: 'Peripheral Artery Disease (PAD) & Intermittent Claudication Protocol',
        tests: [
          'Ankle-Brachial Index (ABI Measurement)',
          'Arterial Color Doppler Ultrasound of Lower Limbs',
          'Lipid Profile & HbA1c',
        ],
        advice: [
          'Structured Treadmill Exercise Program (walk to moderate pain threshold, rest, repeat)',
          'Meticulous Foot Care & Complete Tobacco / Smoking Cessation',
        ],
        drugs: [
          'Cilostazol 100mg Tablet (Pletal / Pletoz) (1-0-1 30 mins before breakfast & dinner) x 60 days',
          'Pentoxifylline 400mg SR Tablet (Trental) (1-1-1 after meals) x 60 days',
          'Aspirin 75mg Tablet (Ecosprin) (0-1-0 after lunch) x 60 days',
          'Rosuvastatin 20mg Tablet (Rosuvas) (0-0-1 bedtime) x 60 days',
        ],
        notes: 'Cilostazol is contraindicated in patients with Heart Failure. Assess ABI after 3 months.',
      },
    ],
  },
];

export interface ClinicalProtocol {
  id: string;
  title: string;
  category: 'emergency' | 'general' | 'pediatric' | 'gastro' | 'cardio' | 'respiratory' | 'infectious' | 'endocrine' | 'psychiatry' | 'neurology' | 'nephrology' | 'bites' | 'gynae' | 'ortho' | 'ent' | 'ophthalmology' | 'dermatology' | 'toxicology' | 'trauma';
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
  // ==========================================
  // ENDOCRINOLOGY & DIABETES PROTOCOLS (🩸)
  // ==========================================
  {
    id: 'proto_t2dm_mild_monotherapy',
    title: 'Type 2 Diabetes (Mild / HbA1c < 7.5%) Monotherapy Protocol',
    category: 'endocrine',
    targetGroup: 'Adults',
    guidelinesSummary: 'Newly diagnosed or mild T2DM (HbA1c < 7.5%): First-line Lifestyle modification (Diet + 30m daily walk) plus Metformin 500mg/850mg BD monotherapy.',
    redFlags: 'Unintentional weight loss, polyuria with ketonuria, symptomatic hyperglycemia (FBG > 200 mg/dL).',
    diagnosis: 'Type 2 Diabetes Mellitus (Mild / Stage 1, HbA1c < 7.5%)',
    chiefComplaints: ['Asymptomatic elevated blood sugar on routine checkup', 'Mild fatigue & post-meal lethargy'],
    drugs: [
      'Tab. Metformin 500mg SR (1-0-1 after food) x 30 days',
      'Tab. Teneligliptin 20mg (1-0-0 after breakfast) x 30 days (if Metformin monotherapy insufficient)',
    ],
    tests: ['HbA1c (Target < 7.0%)', 'Fasting & PP Blood Sugar', 'Serum Creatinine & eGFR', 'Lipid Profile'],
    advice: 'Low glycemic index diet (avoid sugar, white rice, sweets). 45 mins daily brisk walk. Self-monitoring of blood glucose (SMBG) twice weekly.',
  },
  {
    id: 'proto_t2dm_moderate_dual',
    title: 'Type 2 Diabetes (Moderate / HbA1c 7.5% - 9.0%) Dual Combination Protocol',
    category: 'endocrine',
    targetGroup: 'Adults',
    guidelinesSummary: 'Moderate T2DM (HbA1c 7.5% - 9.0%): Dual drug combination: Metformin 500mg BD + Teneligliptin 20mg / Vildagliptin 50mg or Dapagliflozin 10mg / Glimepiride 1mg-2mg.',
    redFlags: 'Frequent nocturnal hypoglycemic episodes, severe renal impairment (eGFR < 30), recurrent UTIs / mycotic genital infections.',
    diagnosis: 'Type 2 Diabetes Mellitus (Moderate Uncontrolled, HbA1c 7.5% - 9.0%)',
    chiefComplaints: ['Increased thirst (polydipsia) & increased urination (polyuria)', 'Fatigue and blurred vision'],
    drugs: [
      'Tab. Metformin 500mg + Glimepiride 1mg (1-0-1 15 mins before meals) x 30 days',
      'Tab. Dapagliflozin 10mg (1-0-0 morning after breakfast) x 30 days',
      'Tab. Voglibose 0.2mg (1-1-1 with first bite of meals) x 30 days',
    ],
    tests: ['HbA1c', 'Fasting & 2-Hour Post-Prandial Blood Glucose', 'Urine Microalbumin / Creatinine Ratio', 'Fundus Exam'],
    advice: 'Follow strict diabetic meal planning. Carry 3 sugar cubes/glucose powder for emergency hypoglycemia. Regular foot inspection.',
  },
  {
    id: 'proto_t2dm_severe_triple_insulin',
    title: 'Type 2 Diabetes (Severe / HbA1c > 9.0%) Triple Therapy & Basal Insulin Protocol',
    category: 'endocrine',
    targetGroup: 'Adults',
    guidelinesSummary: 'Severe T2DM (HbA1c > 9.0% or FBG > 200 mg/dL): Triple oral drug therapy (Metformin + Dapagliflozin + Glimepiride) PLUS Basal Insulin Glargine 10 IU at bedtime.',
    redFlags: 'Diabetic Ketoacidosis (DKA signs: Kussmaul breathing, acetone breath, confusion), Hyperosmolar Hyperglycemic State (HHS).',
    diagnosis: 'Type 2 Diabetes Mellitus (Severe Uncontrolled with Glycemic Decompensation, HbA1c > 9.0%)',
    chiefComplaints: ['Severe polyuria, polydipsia & marked weight loss', 'Extreme fatigue & burning sensation in feet'],
    drugs: [
      'Tab. Metformin 1000mg + Glimepiride 2mg (1-0-1 15 mins before meals) x 30 days',
      'Tab. Dapagliflozin 10mg + Teneligliptin 20mg (1-0-0 after breakfast) x 30 days',
      'Inj. Insulin Glargine (Lantus) 100 IU/ml (10 units Subcutaneously at 10 PM bedtime)',
    ],
    tests: ['HbA1c', 'Fasting & PP Glucose Daily Log', 'Serum Electrolytes, Renal Panel', 'Urine Ketone Test'],
    advice: 'Daily SMBG testing (Fasting & PP). Rotate insulin injection sites on abdomen/thighs. Educate on hypoglycemia management (Rule of 15).',
  },
  {
    id: 'proto_hypothyroidism_protocol',
    title: 'Primary Hypothyroidism Replacement & Titration Protocol',
    category: 'endocrine',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'First-line therapy: Levothyroxine 1.6 mcg/kg/day (typically 25mcg to 100mcg) taken strictly on empty stomach 30-45 mins before morning tea/breakfast with plain water.',
    redFlags: 'Myxedema coma (hypothermia, bradycardia, confusion), pericardial effusion, pregnancy (requires immediate 25-30% dose increase).',
    diagnosis: 'Primary Hypothyroidism (Elevated TSH, Low Free T4)',
    chiefComplaints: ['Unexplained weight gain, fatigue & lethargy', 'Cold intolerance, dry skin & hair loss', 'Constipation & puffiness of face'],
    drugs: [
      'Tab. Levothyroxine Sodium 25mcg / 50mcg / 75mcg / 100mcg (1-0-0 empty stomach 45 mins before breakfast) x 90 days',
    ],
    tests: ['Serum TSH (Target 0.5 - 2.5 mIU/L)', 'Free T3 & Free T4 Panel', 'Anti-TPO Antibodies (if autoimmune etiology)'],
    advice: 'TAKE STRICTLY ON EMPTY STOMACH WITH WATER ONLY! Do not take Calcium, Iron, or Antacid tablets within 4 hours of Levothyroxine dose. Re-check TSH after 6-8 weeks.',
  },
  {
    id: 'proto_hyperthyroidism_protocol',
    title: 'Hyperthyroidism & Thyrotoxicosis Control Protocol',
    category: 'endocrine',
    targetGroup: 'Adults',
    guidelinesSummary: 'Antithyroid therapy: Carbimazole 10-20mg BD or Methimazole 10-30mg daily + Propranolol 20-40mg TDS for symptomatic tachycardia & tremors.',
    redFlags: 'Thyroid storm (high fever > 38.5°C, severe tachycardia > 140 bpm, delirium, jaundice), agranulocytosis (sore throat, high fever).',
    diagnosis: 'Hyperthyroidism / Graves Disease / Toxic Multinodular Goiter',
    chiefComplaints: ['Palpitations & fast heart rate', 'Weight loss despite increased appetite', 'Heat intolerance, tremors & anxiety'],
    drugs: [
      'Tab. Carbimazole 10mg / 20mg (1-0-1 after food) x 30 days',
      'Tab. Propranolol Hydrochloride 20mg (1-1-1 after food) x 30 days',
      'Tab. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Serum TSH, Free T3 & Free T4', 'TSH Receptor Antibodies (TRAb)', 'Baseline CBC (Absolute Neutrophil Count) & LFT'],
    advice: 'Report immediately if fever, sore throat, or mouth ulcers develop (agranulocytosis risk!). Avoid high-iodine foods/seafood.',
  },

  // ==========================================
  // CARDIOVASCULAR & HYPERTENSION PROTOCOLS (❤️)
  // ==========================================
  {
    id: 'proto_htn_stage1_mild',
    title: 'Hypertension Stage 1 (Mild / BP 130-139 / 80-89 mmHg) Monotherapy Protocol',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'Stage 1 Mild HTN: First-line Lifestyle modification (DASH diet, salt restriction < 5g/day, exercise) plus ARB (Telmisartan 40mg OD) or CCB (Amlodipine 5mg OD) monotherapy.',
    redFlags: 'Severe headache, chest pain, dyspnea, visual disturbances (hypertensive urgency/emergency).',
    diagnosis: 'Primary Essential Hypertension (Stage 1 Mild)',
    chiefComplaints: ['Asymptomatic elevated blood pressure on routine checkup', 'Occasional mild occipital morning headache'],
    drugs: [
      'Tab. Telmisartan 40mg (1-0-0 after breakfast) x 30 days',
      'Tab. Amlodipine 5mg (1-0-0 after breakfast) x 30 days (alternative monotherapy)',
    ],
    tests: ['ECG 12-Lead', 'Serum Creatinine & Electrolytes (Sodium, Potassium)', 'Urine Routine (Proteinuria Check)', 'Lipid Profile'],
    advice: 'DASH Diet: Limit dietary salt to < 1 teaspoon (5g) per day. Exercise 30 mins daily. Home BP monitoring twice weekly.',
  },
  {
    id: 'proto_htn_stage2_moderate',
    title: 'Hypertension Stage 2 (Moderate / BP 140-159 / 90-99 mmHg) Dual Combination Protocol',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'Stage 2 Moderate HTN: Dual drug combination therapy: ARB + CCB (Telmisartan 40mg + Amlodipine 5mg OD, i.e., Telma-AM) or ARB + Thiazide Diuretic.',
    redFlags: 'Angina, shortness of breath on exertion, ankle edema, BP > 160/100 mmHg.',
    diagnosis: 'Primary Essential Hypertension (Stage 2 Moderate)',
    chiefComplaints: ['Persistent headache, dizziness & neck stiffness', 'Exertional breathlessness'],
    drugs: [
      'Tab. Telmisartan 40mg + Amlodipine 5mg (1-0-0 after breakfast) x 30 days',
      'Tab. Metoprolol Succinate XL 25mg (1-0-0 after breakfast) x 30 days (if resting HR > 80 bpm)',
    ],
    tests: ['ECG 12-Lead', 'Echocardiogram (LVH Assessment)', 'Renal Function Test & Serum Electrolytes', 'Fundoscopy'],
    advice: 'Maintain daily morning & evening BP log chart. Avoid NSAID analgesics which elevate BP. Weight reduction.',
  },
  {
    id: 'proto_htn_severe_resistant',
    title: 'Severe / Resistant Hypertension (BP ≥ 160/100 mmHg) Triple Combination Protocol',
    category: 'cardio',
    targetGroup: 'Adults',
    guidelinesSummary: 'Severe / Resistant HTN: Triple drug combination: ARB + CCB + Thiazide Diuretic (Telmisartan 40mg + Amlodipine 5mg + Chlorthalidone 12.5mg OD) or add Spironolactone 25mg.',
    redFlags: 'Hypertensive Encephalopathy (confusion, seizures), Acute Coronary Syndrome, Acute Heart Failure, Aortic Dissection.',
    diagnosis: 'Severe / Resistant Essential Hypertension',
    chiefComplaints: ['Severe throbbing headache, dizziness & tinnitus', 'Chest tightness & severe exertional breathlessness'],
    drugs: [
      'Tab. Telmisartan 40mg + Amlodipine 5mg + Chlorthalidone 12.5mg (1-0-0 after breakfast) x 30 days',
      'Tab. Cilnidipine 10mg (0-0-1 bedtime) x 30 days (if pedaldema / peripheral edema present)',
      'Tab. Furosemide 40mg + Spironolactone 50mg (1-0-0 morning) x 15 days (if fluid retention present)',
    ],
    tests: ['24-Hour Ambulatory BP Monitoring (ABPM)', 'Renal Doppler / USG (Rule out Secondary HTN)', 'Serum Potassium, Aldosterone & Renin'],
    advice: 'STRICT SALT RESTRICTION! Avoid OTC cough drops/decongestants. Rule out secondary hypertension causes.',
  },

  // ==========================================
  // PSYCHIATRY & MENTAL HEALTH PROTOCOLS (🧠)
  // ==========================================
  {
    id: 'proto_psych_insomnia',
    title: 'Primary Insomnia & Sleep Disturbance Protocol',
    category: 'psychiatry',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'Short-term hypnotic therapy: Zolpidem Tartrate 5mg/10mg bedtime or Clonazepam 0.25mg bedtime x 7-10 days max, combined with strict Sleep Hygiene guidelines.',
    redFlags: 'Suicidal ideation, severe sleep apnea (gasping/snoring), severe daytime somnolence causing motor accidents.',
    diagnosis: 'Primary Sleep Disturbance / Chronic Insomnia',
    chiefComplaints: ['Difficulty initiating or maintaining sleep', 'Frequent nocturnal awakenings & non-restorative sleep', 'Daytime fatigue & irritability'],
    drugs: [
      'Tab. Zolpidem Tartrate 5mg (0-0-1 30 mins before sleep) x 7 days',
      'Tab. Melatonin 3mg (0-0-1 1 hour before bedtime) x 14 days',
      'Tab. Clonazepam 0.25mg (0-0-1 bedtime) x 7 days (short course SOS)',
    ],
    tests: ['Polysomnography (Sleep Study if sleep apnea suspected)', 'Serum TSH & B12'],
    advice: 'STRICT SLEEP HYGIENE: 1. Fixed bed & wake times. 2. No screens/smartphones 1 hour before bed. 3. Avoid caffeine post 4 PM. 4. Use bed only for sleep.',
  },
  {
    id: 'proto_psych_depression_anxiety',
    title: 'Mild-Moderate Depression & Generalized Anxiety Protocol',
    category: 'psychiatry',
    targetGroup: 'Adults',
    guidelinesSummary: 'First-line SSRI: Escitalopram 10mg OD or Sertraline 50mg OD morning + short bridging anxiolytic (Alprazolam 0.25mg BD x 14 days) + CBT referral.',
    redFlags: 'Active suicidal ideation/plan, severe self-neglect, psychotic depression (delusions/hallucinations), bipolar switch.',
    diagnosis: 'Major Depressive Disorder (Mild-Moderate) with Generalized Anxiety',
    chiefComplaints: ['Persistent low mood, loss of interest (anhedonia) & sadness', 'Excessive worry, nervousness & panic attacks', 'Fatigue, poor concentration & appetite change'],
    drugs: [
      'Tab. Escitalopram 10mg (1-0-0 morning after breakfast) x 30 days',
      'Tab. Alprazolam 0.25mg (1-0-1 after food) x 14 days (short bridging anxiolytic)',
      'Cap. Multivitamin + Mineral + Zinc (1-0-0 after lunch) x 30 days',
    ],
    tests: ['Serum TSH (Rule out Hypothyroidism)', 'Serum Vitamin B12 & Vitamin D3', 'Hamilton Depression Rating Scale (HAM-D)'],
    advice: 'Antidepressants take 2 to 3 weeks for noticeable improvement. Do not stop abruptly! Daily 30 mins physical exercise & counseling.',
  },
  {
    id: 'proto_psych_mood_swings',
    title: 'Mood Swings & Cyclothymia / Bipolar Spectrum Protocol',
    category: 'psychiatry',
    targetGroup: 'Adults',
    guidelinesSummary: 'Mood stabilizer: Divalproex Sodium SR 500mg BD or Lithium Carbonate 300mg BD + Low dose atypical antipsychotic (Quetiapine 50mg bedtime / Olanzapine 5mg).',
    redFlags: 'Acute manic excitement, severe impulsivity/recklessness, psychotic features, toxic Lithium levels.',
    diagnosis: 'Cyclothymia / Bipolar Spectrum Mood Instability',
    chiefComplaints: ['Rapid mood swings (alternating euphoric hyperactivity & severe depressive crashes)', 'Irritability, racing thoughts & decreased need for sleep'],
    drugs: [
      'Tab. Divalproex Sodium Extended Release 500mg (0-0-1 after dinner) x 30 days',
      'Tab. Quetiapine 50mg (0-0-1 at bedtime) x 14 days',
      'Tab. Clonazepam 0.5mg (0-0-1 bedtime SOS for severe agitation)',
    ],
    tests: ['Serum Valproate Level / Serum Lithium Level', 'Liver Function Test (LFT) & Complete Blood Count (CBC)', 'Serum TSH & Creatinine'],
    advice: 'Strict medication adherence is vital. Maintain a daily routine for sleep, meals, and activity. Avoid alcohol and illicit substances.',
  },

  // ==========================================
  // NEUROLOGY PROTOCOLS (⚡)
  // ==========================================
  {
    id: 'proto_neuro_migraine',
    title: 'Migraine & Tension Headache Acute & Prophylaxis Protocol',
    category: 'neurology',
    targetGroup: 'Adults & Adolescents',
    guidelinesSummary: 'Acute attack: Sumatriptan 50mg + Naproxen 500mg STAT at onset + Domperidone 10mg. Prophylaxis (for >2 attacks/month): Flunarizine 10mg bedtime or Propranolol 40mg OD.',
    redFlags: 'Sudden "thunderclap" headache (subarachnoid hemorrhage), headache with fever & neck stiffness (meningitis), focal neurological deficit, new onset after 50 yrs.',
    diagnosis: 'Acute Migraine with Aura & Chronic Prophylaxis',
    chiefComplaints: ['Severe throbbing unilateral headache', 'Nausea, vomiting, photophobia & phonophobia', 'Visual aura (zigzag lights / scotoma)'],
    drugs: [
      'Tab. Flunarizine 10mg (0-0-1 at bedtime) x 30 days (prophylaxis)',
      'Tab. Sumatriptan 50mg + Naproxen 500mg (1 tablet STAT at onset of severe headache SOS)',
      'Tab. Domperidone 10mg (1-0-0 30 mins before food) SOS for migraine nausea',
      'Tab. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['MRI Brain with Contrast (if red flag symptoms present)', 'Fundoscopy (check for papilledema)'],
    advice: 'Maintain a Headache Diary. Identify & avoid triggers (aged cheese, dark chocolate, skipped meals, sleep deprivation, loud noise, bright lights).',
  },
  {
    id: 'proto_neuro_neuropathy',
    title: 'Peripheral Diabetic Neuropathy & Nerve Pain Protocol',
    category: 'neurology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Neuropathic pain relief: Pregabalin 75mg + Methylcobalamin 1500mcg bedtime or Gabapentin 300mg TDS + Amitriptyline 10mg bedtime + Alpha Lipoic Acid.',
    redFlags: 'Motor weakness (foot drop), rapid ascending numbness (Guillain-Barré Syndrome), unperceived plantar foot ulceration.',
    diagnosis: 'Diabetic Peripheral Neuropathy / Painful Neuropathic Spasm',
    chiefComplaints: ['Burning, tingling & "pins and needles" sensation in feet & hands', 'Sharp electric shock-like shooting nerve pains worsening at night'],
    drugs: [
      'Cap. Pregabalin 75mg + Methylcobalamin 1500mcg (0-0-1 bedtime) x 30 days',
      'Tab. Amitriptyline 10mg (0-0-1 bedtime) x 30 days',
      'Tab. Alpha Lipoic Acid 300mg + Benfotiamine 100mg (1-0-0 after food) x 30 days',
    ],
    tests: ['Nerve Conduction Velocity (NCV) Study', 'Fasting & PP Blood Glucose, HbA1c', 'Serum Vitamin B12'],
    advice: 'Inspect feet daily for cuts, blisters or calluses. Wear seamless soft diabetic socks & cushioned footwear. Maintain tight blood glucose control.',
  },
  {
    id: 'proto_neuro_epilepsy',
    title: 'Seizure Control & Generalized Epilepsy Protocol',
    category: 'neurology',
    targetGroup: 'Adult & Pediatric',
    guidelinesSummary: 'First-line Antiepileptic: Levetiracetam 500mg BD or Sodium Valproate 500mg BD or Oxcarbazepine 300mg BD + Clobazam 5mg bedtime.',
    redFlags: 'Status Epilepticus (seizure > 5 mins or repeated seizures without recovery), head trauma, post-ictal focal weakness (Todd paralysis).',
    diagnosis: 'Generalized Tonic-Clonic Epilepsy / Focal Seizures with Secondary Generalization',
    chiefComplaints: ['Sudden loss of consciousness with limb jerking (fits)', 'Tongue bite, urinary incontinence & post-ictal confusion'],
    drugs: [
      'Tab. Levetiracetam 500mg (1-0-1 after food) x 90 days',
      'Tab. Clobazam 5mg (0-0-1 bedtime) x 30 days',
      'Tab. Pantoprazole 40mg (1-0-0)',
    ],
    tests: ['Electroencephalogram (EEG)', 'MRI Brain (Epilepsy Protocol)', 'Serum Antiepileptic Drug Levels & LFT'],
    advice: 'STRICT MEDICATION COMPLIANCE! Never skip doses or stop abruptly. Avoid driving, swimming unattended, or working near open fire/heights.',
  },

  // ==========================================
  // EMERGENCY & ER PROTOCOLS (🚨)
  // ==========================================
  {
    id: 'proto_er_hypoglycemia',
    title: 'Severe Hypoglycemia Emergency Protocol',
    category: 'emergency',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'CRITICAL EMERGENCY! STAT Capillary Blood Glucose (CBG < 54 mg/dL): IV Push 25% Dextrose 100ml or 50% Dextrose 50ml over 10 mins + 10% Dextrose IV Infusion. If no IV access: Glucagon 1mg IM stat.',
    redFlags: 'Unresponsiveness/coma, seizures, focal neurological signs, recurrent hypoglycemia post-dextrose (sulfonylurea toxicity).',
    diagnosis: 'Acute Severe Hypoglycemic Crisis (Iatrogenic / Diabetic Emergency)',
    chiefComplaints: ['Sudden onset sweating, tremors, confusion & palpitations', 'Drowsiness, loss of consciousness or seizures in a diabetic patient'],
    drugs: [
      'Inj. 25% Dextrose 100ml IV STAT slow push over 10 minutes',
      'Inj. 10% Dextrose 500ml IV infusion (run at 75-100 ml/hr)',
      'Inj. Glucagon 1mg IM STAT (if IV access impossible)',
      'Syp. Oral Glucose Powder 15-20g in water (once patient regains full consciousness)',
    ],
    tests: ['STAT Capillary Blood Glucose (CBG)', 'Serum Electrolytes & Renal Function Test'],
    advice: 'Recheck CBG 15 minutes post dextrose infusion. Identify cause (skipped meal, overdose of insulin/sulfonylurea, kidney clearance drop). Carry glucose packets always.',
  },
  {
    id: 'proto_er_hypothermia',
    title: 'Accidental Hypothermia Emergency Protocol',
    category: 'emergency',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'Core Temp < 35°C (95°F): Active external rewarming (warm blankets, heated room) + Warmed IV Normal Saline 0.9% (38-40°C) + Thiamine 100mg IV + Continuous cardiac ECG monitoring.',
    redFlags: 'Ventricular Fibrillation (VF), severe bradycardia, Osborn J waves on ECG, core temp < 30°C (severe hypothermia).',
    diagnosis: 'Acute Accidental Hypothermia (Environmental / Exposure)',
    chiefComplaints: ['Cold pale skin, intense shivering or lack of shivering (severe)', 'Slurred speech, lethargy, bradycardia & low BP'],
    drugs: [
      'Inj. Warmed Normal Saline 0.9% 1000ml IV infusion (warmed to 38-40°C)',
      'Inj. Thiamine (Vit B1) 100mg IV STAT',
      'Inj. Hydrocortisone 100mg IV STAT (if adrenal exhaustion suspected)',
    ],
    tests: ['Core Body Temperature (Low-reading rectal/esophageal probe)', 'ECG 12-Lead (Osborn J wave check)', 'ABG & Serum Electrolytes'],
    advice: 'Remove wet clothes immediately. Wrap in warm dry blankets / forced air warming blanket. Handle patient gently (rough handling triggers VF cardiac arrest).',
  },
  {
    id: 'proto_er_heat_exhaustion_stroke',
    title: 'Heat Exhaustion & Heat Stroke Crisis Protocol',
    category: 'emergency',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'LIFE-THREATENING EMERGENCY! Core Temp > 40°C (104°F) + CNS dysfunction: Rapid cooling STAT (cold water immersion, ice packs to neck/axillae/groin, evaporative misting fan) + IV Normal Saline 1000ml rapid infusion.',
    redFlags: 'Anhidrosis (lack of sweating), altered mental status, coma, seizures, rhabdomyolysis (dark urine), DIC.',
    diagnosis: 'Heat Stroke / Severe Heat Exhaustion Crisis',
    chiefComplaints: ['High body temperature (>104°F) following heat exposure / exertion', 'Headache, dizziness, nausea, confusion, delirium or fainting'],
    drugs: [
      'Inj. Normal Saline 0.9% 1000ml IV rapid infusion STAT (room temperature or cooled)',
      'Inj. Diazepam 5mg IV slow push STAT (if severe muscle shivering occurs during cooling)',
      'Syp. Oral Rehydration Salts (ORS) solution (once patient is alert & conscious)',
    ],
    tests: ['Core Temperature Monitoring', 'Serum Electrolytes (Sodium, Potassium)', 'Serum CPK & Urine Myoglobin (Rhabdomyolysis check)', 'LFT & Renal Panel'],
    advice: 'COOL FIRST, TRANSPORT SECOND! Cool body rapidly until core temp drops to 38.5°C. Continuous airway & fluid resuscitation in ICU.',
  },
  {
    id: 'proto_er_anaphylaxis',
    title: 'Anaphylactic Shock Emergency Protocol',
    category: 'emergency',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'FIRST-LINE LIFE SAVING: Inj. Adrenaline (Epinephrine 1:1000) 0.5mg (0.5ml) IM STAT in mid-outer thigh! Repeat Q5-15 mins if needed + IV Hydrocortisone 200mg + IV Avil 25mg + High-flow O2 + IV Fluid bolus.',
    redFlags: 'Stridor, severe laryngeal edema, wheezing, hypotension (SBP < 90), cardiac arrest.',
    diagnosis: 'Acute Anaphylactic Shock (Severe Allergic Reaction)',
    chiefComplaints: ['Sudden breathlessness, stridor & lip/tongue swelling following drug/food/sting', 'Widespread urticarial rash, vomiting & sudden BP crash'],
    drugs: [
      'Inj. Adrenaline (Epinephrine 1:1000) 0.5mg (0.5ml) IM STAT in mid-outer thigh (repeat Q5-15m SOS)',
      'Inj. Hydrocortisone 200mg IV STAT',
      'Inj. Pheniramine Maleate (Avil) 22.75mg IV STAT',
      'Inj. Normal Saline 0.9% 1000ml IV rapid bolus',
      'Inj. Pantoprazole 40mg IV STAT',
    ],
    tests: ['Serum Tryptase (within 2 hours)', 'STAT Pulse Oximetry & BP Monitoring'],
    advice: 'ADRENALINE IM IS THE SINGLE MOST IMPORTANT FIRST-LINE DRUG! Position patient flat with legs elevated. High flow oxygen via mask. Monitor in ER for 12-24 hours for biphasic reaction.',
  },

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
    targetGroup: 'Adult',
    guidelinesSummary: 'Airway support & oxygenation. Specific Antidote: Flumazenil 0.2mg IV slow push (CAUTION in chronic users or co-ingestion with tricyclic antidepressants due to seizure risk).',
    redFlags: 'Respiratory depression, coma, hypotonia, hyporeflexia, co-ingestion with opioids or alcohol.',
    diagnosis: 'Acute Benzodiazepine Toxicity',
    chiefComplaints: ['Ingestion of excessive sleep pills / Alprazolam / Clonazepam', 'Unarousable sleepiness & slurred speech'],
    drugs: [
      'Inj. Flumazenil 0.2mg IV slow push over 30 seconds (repeat 0.1mg Q1M up to 1mg max)',
      'Inj. Normal Saline 0.9% 500ml IV infusion',
      'Inj. Oxygen 4-6 L/min via mask',
    ],
    tests: ['Stat ABG', 'Urine Toxicology Screen', 'Capillary Blood Glucose'],
    advice: 'Continuous pulse oximetry monitoring. Keep bag-valve-mask ready.',
  },

  // ==========================================
  // PEDIATRIC IMMUNIZATION & VACCINATION SCHEDULE PROTOCOLS (👶/💉)
  // ==========================================
  {
    id: 'proto_peds_vax_birth',
    title: 'Pediatric Immunization (Birth Dose Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Newborns (Birth to 15 Days)',
    guidelinesSummary: 'National Immunization Schedule & IAP Birth Doses: Administer BCG 0.05ml ID, Hepatitis B Birth Dose 0.5ml IM within 24h, and bOPV Birth Dose 2 drops oral.',
    redFlags: 'Neonatal jaundice, birth asphyxia, birth weight < 1.8kg (defer BCG/Hep-B as per pediatrician advice).',
    diagnosis: 'Pediatric Routine Immunization (Birth Dose Schedule)',
    chiefComplaints: ['Routine Infant Well-Baby Checkup', 'Birth Immunization Visit'],
    drugs: [
      'Inj. BCG Vaccine 0.05ml (Intradermal left upper arm stat)',
      'Inj. Hepatitis B Birth Dose Vaccine 0.5ml (IM anterolateral thigh stat within 24 hours)',
      'Drops. bOPV (Oral Polio Vaccine Birth Dose) 2 drops (Oral stat)',
    ],
    tests: ['Newborn Clinical Examination', 'Birth Weight & Length Measurement'],
    advice: '1. A small red papule/scar will form at the BCG site after 2-4 weeks; do not squeeze or apply ointment. 2. Keep baby warm and comfortable. 3. Return at 6 weeks for 1.5 month primary vaccines.',
  },
  {
    id: 'proto_peds_vax_6wks',
    title: 'Pediatric Immunization (6 Weeks / 1.5 Months Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Infants (6 Weeks / 1.5 Months)',
    guidelinesSummary: '1.5 Month Primary Doses: Pentavalent-1 (DTP+HepB+Hib) 0.5ml IM, IPV-1 0.5ml IM, PCV-1 0.5ml IM, and Rotavirus-1 5 drops Oral.',
    redFlags: 'High persistent crying > 3 hours, temperature > 102°F, hypotonic hyporesponsive episode (HHE).',
    diagnosis: 'Pediatric Primary Immunization (6 Weeks / 1.5 Months Schedule)',
    chiefComplaints: ['1.5 Month Well-Child Immunization Visit', '6-Week Routine Vaccination'],
    drugs: [
      'Inj. Pentavalent Vaccine (DTP + Hep-B + Hib) 0.5ml (IM anterolateral thigh stat)',
      'Inj. IPV (Inactivated Polio Vaccine) 0.5ml (IM left thigh / 0.1ml ID stat)',
      'Inj. PCV (Pneumococcal Conjugate Vaccine) 0.5ml (IM right thigh stat)',
      'Drops. Rotavirus Oral Vaccine 1st Dose (5 drops / 1.5ml Oral stat)',
      'Drops. Paracetamol 100mg/ml Pediatric Drops (10-15 mg/kg S.O.S for post-vaccine fever)',
    ],
    tests: ['Growth & Developmental Milestone Check', 'Weight & Head Circumference Charting'],
    advice: '1. Give Paracetamol drops (0.5ml to 1ml S.O.S) if fever > 99.5°F or irritability occurs. 2. Apply cold compress on injection site if swollen. 3. Return at 10 weeks (2.5 months) for 2nd primary dose.',
  },
  {
    id: 'proto_peds_vax_10wks',
    title: 'Pediatric Immunization (10 Weeks / 2.5 Months Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Infants (10 Weeks / 2.5 Months)',
    guidelinesSummary: '2.5 Month Primary Doses: Pentavalent-2 0.5ml IM, IPV-2 0.5ml IM, PCV-2 0.5ml IM, and Rotavirus-2 5 drops Oral.',
    redFlags: 'Post-vaccinal seizure, high fever unresponding to antipyretics.',
    diagnosis: 'Pediatric Primary Immunization (10 Weeks / 2.5 Months Schedule)',
    chiefComplaints: ['2.5 Month Well-Child Immunization Visit', '10-Week Routine Vaccination'],
    drugs: [
      'Inj. Pentavalent Vaccine (DTP + Hep-B + Hib) 2nd Dose 0.5ml (IM stat)',
      'Inj. IPV 2nd Dose 0.5ml (IM stat)',
      'Inj. PCV 2nd Dose 0.5ml (IM stat)',
      'Drops. Rotavirus Oral Vaccine 2nd Dose (5 drops / 1.5ml Oral stat)',
      'Drops. Paracetamol 100mg/ml Pediatric Drops (10-15 mg/kg S.O.S for fever)',
    ],
    tests: ['Weight & Length Charting', 'Social Smile & Neck Holding Assessment'],
    advice: '1. Paracetamol drops S.O.S for fever. 2. Cold compress on thigh injection site. 3. Return at 14 weeks (3.5 months) for 3rd primary dose.',
  },
  {
    id: 'proto_peds_vax_14wks',
    title: 'Pediatric Immunization (14 Weeks / 3.5 Months Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Infants (14 Weeks / 3.5 Months)',
    guidelinesSummary: '3.5 Month Primary Doses Completion: Pentavalent-3 0.5ml IM, IPV-3 0.5ml IM, PCV-3 0.5ml IM, and Rotavirus-3 5 drops Oral.',
    redFlags: 'Anaphylaxis suspect, severe leg swelling.',
    diagnosis: 'Pediatric Primary Immunization (14 Weeks / 3.5 Months Schedule)',
    chiefComplaints: ['3.5 Month Well-Child Immunization Visit', '14-Week Primary Series Completion'],
    drugs: [
      'Inj. Pentavalent Vaccine (DTP + Hep-B + Hib) 3rd Dose 0.5ml (IM stat)',
      'Inj. IPV 3rd Dose 0.5ml (IM stat)',
      'Inj. PCV 3rd Dose 0.5ml (IM stat)',
      'Drops. Rotavirus Oral Vaccine 3rd Dose (5 drops / 1.5ml Oral stat)',
      'Drops. Paracetamol 100mg/ml Pediatric Drops S.O.S for fever',
    ],
    tests: ['Primary Series Completion Check', 'Growth Velocity Charting'],
    advice: '1. Primary infant 3-dose series completed successfully. 2. Schedule Influenza vaccine at 6 months. 3. Return at 9 months for MR-1, JE-1, & Vitamin A.',
  },
  {
    id: 'proto_peds_vax_6m_9m',
    title: 'Pediatric Immunization (6 to 9 Months Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Infants (6 to 9 Months)',
    guidelinesSummary: '9 Months Milestone: MR (Measles-Rubella) 1st Dose 0.5ml SC, JE 1st Dose 0.5ml SC, Typhoid Conjugate Vaccine (TCV) 0.5ml IM, and Vitamin A Solution 1 Lakh IU (1ml Oral).',
    redFlags: 'Vitamin A toxicity symptoms (bulging fontanelle, vomiting), high post-measles fever.',
    diagnosis: 'Pediatric Immunization (6 to 9 Months Schedule)',
    chiefComplaints: ['6-9 Month Well-Child Immunization Visit', 'Measles & Vitamin A Vaccination'],
    drugs: [
      'Inj. MR (Measles-Rubella) Vaccine 1st Dose 0.5ml (Subcutaneous right upper arm stat)',
      'Inj. JE (Japanese Encephalitis) Vaccine 1st Dose 0.5ml (Subcutaneous stat)',
      'Inj. Typhoid Conjugate Vaccine (TCV) 0.5ml (IM stat at 6-9 months)',
      'Syp. Vitamin A Oral Solution (1 Lakh IU = 1ml Oral stat)',
      'Inj. Influenza Quadrivalent Vaccine 0.5ml (IM at 6m & 7m 4w apart)',
    ],
    tests: ['Sitting Milestone Check', 'Hemoglobin Screening for Infant Anemia'],
    advice: '1. Ensure Vitamin A liquid dose is administered orally. 2. Complementary weaning diet (soft khichdi, ragi, banana mash 3 times daily). 3. Return at 12-15 months for MMR-1 & PCV Booster.',
  },
  {
    id: 'proto_peds_vax_12m_15m',
    title: 'Pediatric Immunization (12 to 15 Months Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Toddlers (12 to 15 Months)',
    guidelinesSummary: '1-Year Toddler Milestone: MMR-1 0.5ml SC, PCV Booster 0.5ml IM, Hepatitis A 1st Dose 0.5ml IM, and Varicella-1 0.5ml SC.',
    redFlags: 'Post-MMR rash with high fever after 5-10 days (benign post-measles rash vs severe allergic reaction).',
    diagnosis: 'Pediatric Toddler Immunization (12 to 15 Months Schedule)',
    chiefComplaints: ['1-Year Toddler Well-Child Immunization Visit', 'MMR & PCV Booster Vaccination'],
    drugs: [
      'Inj. MMR (Measles-Mumps-Rubella) 1st Dose 0.5ml (Subcutaneous right upper arm stat)',
      'Inj. PCV Booster Dose 0.5ml (IM right anterolateral thigh stat)',
      'Inj. Hepatitis A Inactivated Vaccine 1st Dose 0.5ml (IM stat)',
      'Inj. Varicella (Chickenpox) Vaccine 1st Dose 0.5ml (Subcutaneous stat)',
      'Syp. Paracetamol 250mg/5ml Syrup (5ml S.O.S for fever)',
    ],
    tests: ['Standing & Walking Milestone Assessment', 'Toddler Growth Charting'],
    advice: '1. Paracetamol syrup S.O.S for fever. 2. Continue active toddler feeding & growth monitoring. 3. Return at 16-18 months for DPT Booster-1.',
  },
  {
    id: 'proto_peds_vax_16m_24m',
    title: 'Pediatric Immunization (16 to 24 Months Booster Schedule) Protocol',
    category: 'pediatric',
    targetGroup: 'Toddlers (16 to 24 Months / 1.5 to 2 Years)',
    guidelinesSummary: '1.5 Year Toddler Booster: DPT 1st Booster 0.5ml IM, IPV Booster 0.5ml IM, bOPV Booster 2 drops Oral, MMR-2 0.5ml SC, Varicella-2 0.5ml SC, and Vitamin A 2 Lakh IU (2ml Oral).',
    redFlags: 'Severe deltoid/thigh swelling, sterile abscess at injection site.',
    diagnosis: 'Pediatric Booster Immunization (16 to 24 Months Schedule)',
    chiefComplaints: ['1.5 Year Toddler Booster Immunization Visit', 'DPT-1 & OPV Booster Vaccination'],
    drugs: [
      'Inj. DPT 1st Booster Vaccine 0.5ml (IM anterolateral thigh/deltoid stat)',
      'Inj. IPV Booster Dose 0.5ml (IM stat)',
      'Drops. bOPV Booster 2 drops (Oral stat)',
      'Inj. MMR 2nd Dose 0.5ml (Subcutaneous stat)',
      'Inj. Varicella 2nd Dose 0.5ml (Subcutaneous stat)',
      'Syp. Vitamin A Oral Solution (2 Lakh IU = 2ml Oral stat)',
      'Syp. Paracetamol 250mg/5ml Syrup (5ml S.O.S for fever)',
    ],
    tests: ['Speech & Language Development Check', 'De-Worming Screen (Albendazole 400mg)'],
    advice: '1. DPT booster can cause mild localized swelling and low fever; apply cool compress. 2. Give Vitamin A 2ml orally. 3. Return at 4-6 years for DPT Booster-2.',
  },
  {
    id: 'proto_peds_vax_4y_6y',
    title: 'Pediatric Immunization (4 to 6 Years School Entry Booster) Protocol',
    category: 'pediatric',
    targetGroup: 'Preschoolers (4 to 6 Years)',
    guidelinesSummary: 'School Entry Boosters: DPT 2nd Booster 0.5ml IM deltoid, bOPV Booster 2 drops Oral, MMR 3rd Dose 0.5ml SC.',
    redFlags: 'Large local reaction > 10cm, severe muscle pain.',
    diagnosis: 'Pediatric School Entry Booster Immunization (4 to 6 Years Schedule)',
    chiefComplaints: ['4-6 Year Preschooler / School Entry Immunization Visit', 'DPT-2 Booster Vaccination'],
    drugs: [
      'Inj. DPT 2nd Booster Vaccine 0.5ml (IM deltoid arm stat)',
      'Drops. bOPV Booster 2 drops (Oral stat)',
      'Inj. MMR 3rd Dose / TCV Booster 0.5ml (IM/SC stat)',
      'Syp. Paracetamol 250mg/5ml Syrup (7.5ml S.O.S for fever)',
    ],
    tests: ['Pre-School Vision & Hearing Screening', 'Height & BMI Centile Charting'],
    advice: '1. Local arm soreness is normal for 24-48 hours. 2. Paracetamol syrup/tablet S.O.S for fever. 3. Next Tdap / Tetanus booster scheduled at 10-12 years.',
  },

  // ==========================================
  // 17. ENDOCRINOLOGY & DIABETOLOGY PROTOCOLS (🩸/🦋)
  // ==========================================
  {
    id: 'proto_t2dm_management',
    title: 'Type 2 Diabetes Mellitus Comprehensive Care Protocol',
    category: 'endocrine',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'First-line Metformin + SGLT2 inhibitor (Dapagliflozin/Empagliflozin) or DPP4 inhibitor (Teneligliptin/Vildagliptin) for glycemic control & cardiorenal protection as per ICMR & ADA 2024 Guidelines.',
    redFlags: 'Severe hypoglycemia (sugar < 55 mg/dL), Kussmaul breathing, ketone smell on breath, non-healing foot ulcer.',
    diagnosis: 'Type 2 Diabetes Mellitus (Uncontrolled / New Onset)',
    chiefComplaints: ['Increased thirst (polydipsia) & frequent urination (polyuria)', 'Unexplained weight loss & fatigue', 'Tingling/numbness in feet'],
    drugs: [
      'Tab. Metformin 500mg SR + Teneligliptin 20mg (Tenepure-M) (1-0-1 after food) x 30 days',
      'Tab. Dapagliflozin 10mg (Forxiga) (1-0-0 morning after breakfast) x 30 days',
      'Tab. Vildagliptin 50mg (Galvus) (1-0-1 before food) x 30 days',
      'Tab. Gliclazide 60mg MR (Diamicron MR) (1-0-0 with breakfast) x 30 days',
    ],
    tests: ['HbA1c (Glycated Hemoglobin)', 'Fasting (FBS) & 2-Hour Post-Prandial (PPBS)', 'Serum Creatinine & eGFR', 'Urine Microalbumin/Creatinine Ratio', 'Lipid Profile'],
    advice: 'Low glycemic index diet. Daily 45-minute brisk walk. Self-monitor blood sugar 2-3 times weekly. Inspect feet daily for cuts/cracks.',
  },
  {
    id: 'proto_hypothyroidism_protocol',
    title: 'Primary Hypothyroidism Replacement & TSH Titration Protocol',
    category: 'endocrine',
    targetGroup: 'All Ages',
    guidelinesSummary: 'Full replacement dose ~1.6 mcg/kg/day Levothyroxine Sodium. Take strictly on empty stomach in morning 30-45 mins before tea/breakfast. Recheck serum TSH after 6-8 weeks.',
    redFlags: 'Palpitations, chest pain, irregular pulse (over-replacement hyperthyroidism risk).',
    diagnosis: 'Primary Hypothyroidism (TSH > 10 mIU/L)',
    chiefComplaints: ['Weight gain despite poor appetite', 'Lethargy, generalized weakness & cold intolerance', 'Constipation & dry skin / hair fall'],
    drugs: [
      'Tab. Levothyroxine Sodium 50mcg / 75mcg / 100mcg (Thyronorm / Eltroxin) (1-0-0 strictly on empty stomach in morning with water) x 90 days',
    ],
    tests: ['Serum TSH (Thyroid Stimulating Hormone)', 'Free T3 & Free T4 Panel', 'Anti-TPO Antibodies'],
    advice: 'TAKE LEVOTHYROXINE STRICTLY ON EMPTY STOMACH IN MORNING WITH FULL GLASS OF WATER. Do not take Calcium, Iron, or Antacid tablets within 4 hours of Levothyroxine.',
  },
  {
    id: 'proto_hyperthyroidism_protocol',
    title: 'Hyperthyroidism & Thyrotoxicosis Management Protocol',
    category: 'endocrine',
    targetGroup: 'Adults',
    guidelinesSummary: 'Antithyroid medication Carbimazole 20-40mg daily divided BD/TDS + Beta-blocker Propranolol 20-40mg TDS for symptomatic relief of tremor and tachycardia.',
    redFlags: 'High fever, delirium, severe tachycardia (>140 bpm), heart failure (Thyroid Storm emergency).',
    diagnosis: 'Hyperthyroidism / Graves Disease / Toxic Multinodular Goiter',
    chiefComplaints: ['Unexplained weight loss despite ravenous appetite', 'Heat intolerance & excessive sweating', 'Palpitations, tremors & anxiety'],
    drugs: [
      'Tab. Carbimazole 10mg / 20mg (Neomercazole) (1-0-1 after food) x 30 days',
      'Tab. Propranolol 20mg (Ciplar) (1-0-1 after food) x 30 days',
      'Tab. Pantoprazole 40mg (1-0-0 on empty stomach) x 14 days',
    ],
    tests: ['Serum TSH, Free T3 & Free T4', 'Anti-TSH Receptor Antibodies (TRAb)', 'CBC with Differential (Baseline Neutrophils)', 'Liver Function Test'],
    advice: 'REPORT IMMEDIATELY IF FEVER, SORE THROAT, OR MOUTH ULCERS OCCUR (risk of agranulocytosis). Monitor CBC and LFT monthly.',
  },
  {
    id: 'proto_dka_emergency',
    title: 'Diabetic Ketoacidosis (DKA) Resuscitation Protocol',
    category: 'endocrine',
    targetGroup: 'All Ages Emergency',
    guidelinesSummary: 'HIGH MORTALITY EMERGENCY! 3 Pillars: 1. Aggressive IV Fluid Resuscitation (NS 1-1.5L in 1st hour) -> 2. IV Regular Insulin 0.1 U/kg/hr -> 3. Potassium replacement (20-30 mEq/L IV fluid when K < 5.2).',
    redFlags: 'Kussmaul deep breathing, fruity acetone breath odor, stupor, serum pH < 7.0, blood glucose > 300 mg/dL with severe ketonuria.',
    diagnosis: 'Diabetic Ketoacidosis (DKA)',
    chiefComplaints: ['Nausea, abdominal pain & persistent vomiting', 'Rapid deep breathing (Kussmaul respirations)', 'Altered sensorium & severe dehydration'],
    drugs: [
      'Inj. Normal Saline 0.9% 1000ml IV rapid infusion over 1 hour stat (then 500 ml/hr)',
      'Inj. Regular Human Insulin (Actrapid 40 IU/ml) 0.1 U/kg IV stat bolus followed by 0.1 U/kg/hr continuous IV infusion',
      'Inj. Potassium Chloride (KCl 20 mEq) in 500ml NS IV infusion (if K+ < 5.2 mEq/L)',
      'Inj. Pantoprazole 40mg IV stat',
    ],
    tests: ['Stat Arterial Blood Gas (ABG - pH, HCO3, Anion Gap)', 'Urine & Blood Ketones (Beta-Hydroxybutyrate)', 'Stat Capillary Blood Glucose & Serum Potassium / Electrolytes'],
    advice: 'CRITICAL ICU ADMISSION STAT! Do not drop blood glucose faster than 50-75 mg/dL per hour (risk of cerebral edema). Switch to 5% Dextrose when sugar reaches 250 mg/dL.',
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

  // --- GENERAL MEDICINE PROTOCOLS ---
  {
    id: 'proto_gen_fever_puo',
    title: 'Acute Febrile Illness / PUO OPD Evaluation Protocol',
    category: 'general',
    targetGroup: 'Adults & Elderly',
    guidelinesSummary: 'Empiric evaluation of fever with chills. Rule out Dengue, Malaria, Typhoid & UTI. Paracetamol for fever control. Strictly avoid NSAIDs (Ibuprofen/Mefenamic Acid) until Dengue is ruled out.',
    redFlags: 'Petechial skin rash, persistent vomiting, altered sensorium, SpO2 < 95%, severe abdominal pain or bleeding.',
    diagnosis: 'Acute Febrile Illness (Suspected Viral / Dengue / Typhoid)',
    chiefComplaints: ['High fever with chills & rigors', 'Severe body ache, headache & fatigue', 'Nausea & loss of appetite'],
    drugs: [
      'Tab. Paracetamol 650mg (1-0-1 after food or SOS max 4 tabs/day) x 5 days',
      'Cap. Pantoprazole 40mg (1-0-0 on empty stomach) x 5 days',
      'ORS Sachet (1 sachet dissolved in 1 Liter boiled cool water, sip throughout day)',
      'Tab. Doxycycline 100mg (1-0-1 after food) x 7 days (if rickettsial / leptospirosis endemic)',
    ],
    tests: ['CBC with Complete Platelet Count', 'Dengue NS1 Antigen & IgM/IgG', 'Malaria Smear (MP) & Rapid Antigen Test', 'Urine Routine & Microscopy'],
    advice: 'Maintain high oral fluid intake (>3L daily). Recheck CBC with platelet count in 48 hours if fever persists.',
  },
  {
    id: 'proto_gen_cap_pneumonia',
    title: 'Community Acquired Pneumonia (CAP) Low-Risk OPD Protocol',
    category: 'general',
    targetGroup: 'Adults',
    guidelinesSummary: 'Empiric monotherapy for low-risk CAP (CURB-65 Score 0-1). Amoxicillin-Clavulanate 625mg BD + Macrolide (Azithromycin 500mg OD) for 7 days.',
    redFlags: 'CURB-65 >= 2 (Confusion, Urea >7 mmol/L, RR >= 30, BP < 90/60, Age >= 65), severe dyspnea, SpO2 < 90%.',
    diagnosis: 'Community Acquired Pneumonia (Low Risk)',
    chiefComplaints: ['Cough with rusty or purulent sputum', 'High fever with chills & pleuritic chest pain', 'Shortness of breath on exertion'],
    drugs: [
      'Tab. Amoxicillin + Clavulanate 625mg (1-0-1 after food) x 7 days',
      'Tab. Azithromycin 500mg (1-0-0 after food) x 5 days',
      'Syp. Levosalbutamol + Ambroxol + Guaifenesin 10ml (1-1-1 after food) x 5 days',
      'Tab. Paracetamol 650mg (1-0-1 after food SOS)',
    ],
    tests: ['Chest X-Ray PA View (Check for lobar consolidation)', 'CBC with ESR & CRP', 'Sputum Gram Stain & Culture'],
    advice: 'Steam inhalation twice daily. Return immediately if breathlessness worsens or chest pain intensifies.',
  },
  {
    id: 'proto_gen_typhoid',
    title: 'Typhoid / Enteric Fever Outpatient Treatment Protocol',
    category: 'general',
    targetGroup: 'Adults & Adolescents',
    guidelinesSummary: 'First-line empiric treatment for enteric fever: Cefixime 200mg BD or Azithromycin 500mg OD for 10-14 days. Monitor for intestinal perforation or bleeding.',
    redFlags: 'Sudden severe abdominal pain with rigidity (intestinal perforation), melena (black stools), persistent high delirium.',
    diagnosis: 'Enteric Fever (Salmonella Typhi / Paratyphi Infection)',
    chiefComplaints: ['Step-ladder rising fever with severe headache', 'Abdominal discomfort & constipation followed by diarrhea', 'Coated tongue & loss of appetite'],
    drugs: [
      'Tab. Cefixime 200mg (1-0-1 after food) x 10 days',
      'Tab. Azithromycin 500mg (1-0-0 after food) x 7 days',
      'Tab. Paracetamol 650mg (1-0-1 after food SOS)',
      'Syp. Bacillus Clausii 5ml Spores (1-0-1 after food) x 5 days',
    ],
    tests: ['TyphiDot IgM / Widal Test (after 7 days of fever)', 'Blood Culture & Antibiotic Sensitivity', 'CBC with Peripheral Blood Smear'],
    advice: 'Consume strictly boiled or purified water. Avoid street food, raw salads, and unpeeled fruits.',
  },

  // --- NEPHROLOGY PROTOCOLS ---
  {
    id: 'proto_nephro_dkd_proteinuria',
    title: 'Diabetic Kidney Disease (DKD) & Proteinuria OPD Protocol',
    category: 'nephrology',
    targetGroup: 'Diabetic Patients with Renal Involvement',
    guidelinesSummary: 'First-line renal protection: Telmisartan (ACEi/ARB) + Dapagliflozin 10mg (SGLT2 inhibitor) + BP control target < 130/80 mmHg + Dietary protein restriction.',
    redFlags: 'Serum Potassium > 5.5 mEq/L, Acute eGFR drop > 30% after starting ARB, oliguria, shortness of breath from fluid overload.',
    diagnosis: 'Diabetic Nephropathy / CKD Stage 2-3 with Microalbuminuria',
    chiefComplaints: ['Foamy urine (proteinuria)', 'Bilateral pedal edema (leg swelling)', 'Elevated blood pressure & long-standing diabetes'],
    drugs: [
      'Tab. Telmisartan 40mg (1-0-0 after breakfast) x 30 days',
      'Tab. Dapagliflozin 10mg (1-0-0 after breakfast) x 30 days',
      'Tab. Cilnidipine 10mg (0-0-1 at bedtime) x 30 days',
      'Tab. Torsemide 10mg (1-0-0 morning) x 15 days (if pedal edema present)',
    ],
    tests: ['Urine Albumin-to-Creatinine Ratio (UACR)', 'Serum Creatinine & eGFR (CKD-EPI equation)', 'Serum Electrolytes (Na+, K+)', 'HbA1c & Fasting Blood Sugar'],
    advice: 'Restrict dietary sodium (< 2g/day). Strictly avoid all OTC NSAIDs (Ibuprofen, Diclofenac) which impair renal autoregulation.',
  },
  {
    id: 'proto_nephro_ckd_conservative',
    title: 'CKD Stage 3b-4 Conservative Medical OPD Management Protocol',
    category: 'nephrology',
    targetGroup: 'Adults with Stage 3b-4 CKD',
    guidelinesSummary: 'Medical management of CKD complications: BP control target < 130/80 mmHg + Acidosis correction with Sodium Bicarbonate + Phosphate binders + Anemia management.',
    redFlags: 'Refractory hyperkalemia (K+ > 6.0 mEq/L), uremic pericarditis, fluid overload with pulmonary edema, severe metabolic acidosis (HCO3 < 15).',
    diagnosis: 'Chronic Kidney Disease Stage 3b/4 (eGFR 15-44 ml/min)',
    chiefComplaints: ['Anorexia, morning nausea & metallic taste', 'Bilateral leg edema & generalized weakness', 'Nocturnal leg muscle cramps & dry skin'],
    drugs: [
      'Tab. Sodium Bicarbonate 500mg (1-1-1 after food) x 30 days',
      'Tab. Calcium Carbonate 500mg (1-1-1 with meals as phosphate binder) x 30 days',
      'Tab. Alpha Ketoanalogue 600mg (1-1-1 after food) x 30 days',
      'Tab. Torsemide 20mg (1-0-0 morning) x 30 days',
      'Inj. Erythropoietin (EPO) 4000 IU Subcutaneous Weekly (if Hb < 10 g/dL)',
    ],
    tests: ['Renal Function Test (BUN, Serum Creatinine, eGFR)', 'Serum Electrolytes (K+, Na+, Cl-, HCO3-)', 'Serum Calcium & Inorganic Phosphate', 'Hemoglobin & Serum Ferritin / TSAT'],
    advice: 'Limit high-potassium foods (bananas, citrus fruits, coconut water, dark leafy greens). Fluid intake restricted to 1L + previous day urine volume.',
  },
  {
    id: 'proto_nephro_aki_initial',
    title: 'Acute Kidney Injury (Prerenal vs Intrinsic AKI) OPD Protocol',
    category: 'nephrology',
    targetGroup: 'Adults',
    guidelinesSummary: 'Discontinue all nephrotoxic agents (NSAIDs, ACEi/ARBs, Aminoglycosides). Volume repletion with 0.9% Normal Saline if volume depleted. Monitor hourly urine output.',
    redFlags: 'Anuria (<100ml/24hr), acute pulmonary edema, hyperkalemic ECG changes (peaked T waves), uremic encephalopathy requiring urgent dialysis.',
    diagnosis: 'Acute Kidney Injury (Prerenal Azotemia / Drug-Induced AKI)',
    chiefComplaints: ['Sudden decrease in urine output', 'Nausea & weakness following diarrhea / NSAID overuse', 'Swelling of feet & puffiness of face'],
    drugs: [
      'Infusion Normal Saline 0.9% 500ml IV over 4 hours (volume expansion if prerenal deficit)',
      'Inj. Pantoprazole 40mg IV stat then Tab. Pantoprazole 40mg (1-0-0) x 5 days',
      'Tab. Ondansetron 4mg (1-0-1 after food SOS)',
    ],
    tests: ['Serial Serum Creatinine & BUN (Q24H)', 'Serum Electrolytes (Na+, K+, Cl-)', 'USG KUB (Rule out post-renal urinary obstruction)', 'Urine Sodium & Fractional Excretion of Na (FENa)'],
    advice: 'Strict 24-hour urine output charting. Absolutely NO NSAIDs, aminoglycosides, or IV contrast media.',
  },
  {
    id: 'proto_nephro_uti_pyelo',
    title: 'Acute UTI / Pyelonephritis OPD Management Protocol',
    category: 'nephrology',
    targetGroup: 'Adults & Females',
    guidelinesSummary: 'First-line antibiotic for lower UTI: Nitrofurantoin 100mg SR BD for 7 days or Cefixime 200mg BD. Urinary alkalinizer for symptomatic dysuria relief.',
    redFlags: 'High fever with rigors, severe flank/CVA tenderness (pyelonephritis), urosepsis in diabetic or elderly patients.',
    diagnosis: 'Urinary Tract Infection / Acute Uncomplicated Pyelonephritis',
    chiefComplaints: ['Severe dysuria (burning micturition)', 'Urinary frequency, urgency & suprapubic pain', 'Flank pain with fever (if pyelonephritis)'],
    drugs: [
      'Cap. Nitrofurantoin 100mg SR (1-0-1 after food) x 7 days',
      'Syp. Disodium Hydrogen Citrate 10ml in 1 glass water (1-1-1) x 5 days',
      'Tab. Cefixime 200mg (1-0-1 after food) x 7 days (if pyelonephritis suspected)',
      'Tab. Paracetamol 650mg (1-0-1 after food SOS)',
    ],
    tests: ['Urine Routine & Microscopy (Pus cells, Bacteria, RBCs)', 'Urine Culture & Antibiotic Sensitivity (STAT)', 'USG KUB (Rule out renal calculi or hydronephrosis)'],
    advice: 'Drink 3-4 liters of water daily. Complete full 7-day course of antibiotics even if symptoms resolve earlier.',
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
        const parsed: Specialty[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, Specialty>();
          DEFAULT_SPECIALTIES.forEach((spec) => map.set(spec.id, spec));
          parsed.forEach((spec) => {
            if (spec && spec.id) {
              const existing = map.get(spec.id);
              if (existing) {
                const templateMap = new Map<string, PrescriptionTemplate>();
                existing.templates.forEach((t) => templateMap.set(t.id, t));
                (spec.templates || []).forEach((t) => {
                  if (t && t.id) templateMap.set(t.id, t);
                });
                map.set(spec.id, { ...existing, ...spec, templates: Array.from(templateMap.values()) });
              } else {
                map.set(spec.id, spec);
              }
            }
          });
          return Array.from(map.values());
        }
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
        COMPREHENSIVE_GENERIC_DRUGS.forEach((item) => {
          map.set(item.id, normalizeDrugItem(item));
        });
        parsed.forEach((item) => {
          if (item && item.id) {
            const defaultItem = COMPREHENSIVE_GENERIC_DRUGS.find((d) => d.id === item.id);
            if (defaultItem) {
              map.set(
                item.id,
                normalizeDrugItem({
                  ...defaultItem,
                  dosage: item.dosage || defaultItem.dosage,
                  duration: item.duration || defaultItem.duration,
                })
              );
            } else {
              map.set(item.id, normalizeDrugItem(item));
            }
          }
        });

        // Deduplicate map values by normalized genericName & dosage
        const deduplicatedMap = new Map<string, DrugItem>();
        for (const item of map.values()) {
          const key = `${item.genericName.trim().toLowerCase()}_${item.dosage.trim().toLowerCase()}`;
          if (!deduplicatedMap.has(key)) {
            deduplicatedMap.set(key, item);
          }
        }

        return Array.from(deduplicatedMap.values());
      } catch (e) {}
    }
  }

  // Fallback default catalog deduplicated
  const deduplicatedMap = new Map<string, DrugItem>();
  for (const item of COMPREHENSIVE_GENERIC_DRUGS) {
    const norm = normalizeDrugItem(item);
    const key = `${norm.genericName.trim().toLowerCase()}_${norm.dosage.trim().toLowerCase()}`;
    if (!deduplicatedMap.has(key)) {
      deduplicatedMap.set(key, norm);
    }
  }
  return Array.from(deduplicatedMap.values());
}

export function saveDrugCatalog(data: DrugItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRUGS_STORAGE_KEY, JSON.stringify(data));
  }
}
