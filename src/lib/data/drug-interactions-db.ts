// Exhaustive Offline Drug-Drug Interaction (DDI), Allergy & Safety Warning Database
// Sourced from Open Public Datasets: CDSCO / NLEM India, IPC / PvPI Safety Alerts, NIH RxNorm, WHO EML & FDA

export interface DrugInteractionRule {
  id: string;
  drugA: string[];      // Active generic ingredients, brands, or class keywords for Drug A
  drugB: string[];      // Active generic ingredients, brands, or class keywords for Drug B
  severity: 'high' | 'moderate' | 'mild';
  title: string;        // Clinical title
  description: string;  // Detailed explanation of conflict mechanism
  recommendation: string; // Clinical action recommendation for physician
  source: string;       // Medical authority citation (e.g. "CDSCO / NLEM India", "IPC / PvPI Safety Alert", "NIH RxNorm / NLM", "WHO EML / FDA")
  category: 'Cardiology' | 'Antimicrobial' | 'Analgesic' | 'Endocrine' | 'Psychiatry' | 'Gastroenterology' | 'Nephrology/Rheumatology' | 'CDSCO Alert' | 'Allergy';
  isCustom?: boolean;
}

// INDIAN BRAND TO GENERIC SALT & CLASS RESOLUTION MAP
export const INDIAN_BRAND_TO_GENERIC_MAP: Record<string, string[]> = {
  'augmentin': ['amoxicillin', 'clavulanate', 'clavulanic acid', 'penicillin'],
  'mox': ['amoxicillin', 'penicillin'],
  'novamox': ['amoxicillin', 'penicillin'],
  'calpol': ['paracetamol', 'acetaminophen'],
  'crocin': ['paracetamol', 'acetaminophen'],
  'dolo': ['paracetamol', 'acetaminophen'],
  'pan-d': ['pantoprazole', 'domperidone', 'ppi', 'prokinetic'],
  'pantocid': ['pantoprazole', 'ppi'],
  'pantop': ['pantoprazole', 'ppi'],
  'pan': ['pantoprazole', 'ppi'],
  'razo': ['rabeprazole', 'ppi'],
  'esomep': ['esomeprazole', 'ppi'],
  'esomeprazole': ['esomeprazole', 'ppi'],
  'pantoprazole': ['pantoprazole', 'ppi'],
  'rabeprazole': ['rabeprazole', 'ppi'],
  'omeprazole': ['omeprazole', 'ppi'],
  'lansoprazole': ['lansoprazole', 'ppi'],
  'dexlansoprazole': ['dexlansoprazole', 'ppi'],
  'ilaprazole': ['ilaprazole', 'ppi'],
  'domperidone': ['domperidone', 'prokinetic'],
  'telma': ['telmisartan', 'arb'],
  'telmikind': ['telmisartan', 'arb'],
  'tazloc': ['telmisartan', 'arb'],
  'amlong': ['amlodipine', 'ccb'],
  'stamlo': ['amlodipine', 'ccb'],
  'concor': ['bisoprolol', 'beta-blocker'],
  'metolar': ['metoprolol', 'beta-blocker'],
  'aten': ['atenolol', 'beta-blocker'],
  'envas': ['enalapril', 'ace-inhibitor'],
  'cardace': ['ramipril', 'ace-inhibitor'],
  'acitrom': ['acenocoumarol', 'anticoagulant'],
  'ecospirin': ['aspirin', 'nsaid', 'antiplatelet'],
  'disprin': ['aspirin', 'nsaid'],
  'combiflam': ['ibuprofen', 'paracetamol', 'nsaid'],
  'brufen': ['ibuprofen', 'nsaid'],
  'voveran': ['diclofenac', 'nsaid'],
  'reactin': ['diclofenac', 'nsaid'],
  'meftal': ['mefenamic acid', 'nsaid'],
  'meftal-spas': ['mefenamic acid', 'dicyclomine', 'nsaid'],
  'nise': ['nimesulide', 'nsaid'],
  'cefixime': ['cefixime', 'cephalosporin', 'beta-lactam'],
  'taxim-o': ['cefixime', 'cephalosporin', 'beta-lactam'],
  'ceftas': ['cefixime', 'cephalosporin', 'beta-lactam'],
  'ziprax': ['cefixime', 'cephalosporin', 'beta-lactam'],
  'mahashaf': ['cefixime', 'cephalosporin', 'beta-lactam'],
  'cefpodoxime': ['cefpodoxime', 'cephalosporin', 'beta-lactam'],
  'doxcef': ['cefpodoxime', 'cephalosporin', 'beta-lactam'],
  'monocef-o': ['cefpodoxime', 'cephalosporin', 'beta-lactam'],
  'cefuroxime': ['cefuroxime', 'cephalosporin', 'beta-lactam'],
  'cetil': ['cefuroxime', 'cephalosporin', 'beta-lactam'],
  'ceftriaxone': ['ceftriaxone', 'cephalosporin', 'beta-lactam'],
  'monocef': ['ceftriaxone', 'cephalosporin', 'beta-lactam'],
  'cephalexin': ['cephalexin', 'cephalosporin', 'beta-lactam'],
  'sporidex': ['cephalexin', 'cephalosporin', 'beta-lactam'],
  'ciplox': ['ciprofloxacin', 'fluoroquinolone'],
  'cifran': ['ciprofloxacin', 'fluoroquinolone'],
  'oflox': ['ofloxacin', 'fluoroquinolone'],
  'zanocin': ['ofloxacin', 'fluoroquinolone'],
  'levomac': ['levofloxacin', 'fluoroquinolone'],
  'azithral': ['azithromycin', 'macrolide'],
  'aziwok': ['azithromycin', 'macrolide'],
  'claribid': ['clarithromycin', 'macrolide'],
  'glycomet': ['metformin', 'biguanide'],
  'obimet': ['metformin', 'biguanide'],
  'alprax': ['alprazolam', 'benzodiazepine', 'anxiolytic'],
  'restyl': ['alprazolam', 'benzodiazepine', 'anxiolytic'],
  'trika': ['alprazolam', 'benzodiazepine', 'anxiolytic'],
  'anxit': ['alprazolam', 'benzodiazepine', 'anxiolytic'],
  'clonotril': ['clonazepam', 'benzodiazepine', 'anticonvulsant'],
  'zapiz': ['clonazepam', 'benzodiazepine', 'anticonvulsant'],
  'epitril': ['clonazepam', 'benzodiazepine', 'anticonvulsant'],
  'petril': ['clonazepam', 'benzodiazepine', 'anticonvulsant'],
  'valium': ['diazepam', 'benzodiazepine', 'anxiolytic'],
  'calmpose': ['diazepam', 'benzodiazepine', 'anxiolytic'],
  'ativan': ['lorazepam', 'benzodiazepine', 'anxiolytic'],
  'larpose': ['lorazepam', 'benzodiazepine', 'anxiolytic'],
  'frisium': ['clobazam', 'benzodiazepine', 'anticonvulsant'],
  'cloba': ['clobazam', 'benzodiazepine', 'anticonvulsant'],
  'zolfresh': ['zolpidem', 'hypnotic', 'sedative'],
  'nitrest': ['zolpidem', 'hypnotic', 'sedative'],
  'nexito': ['escitalopram', 'ssri', 'antidepressant'],
  'cilentra': ['escitalopram', 'ssri', 'antidepressant'],
  'zoloft': ['sertraline', 'ssri', 'antidepressant'],
  'prozac': ['fluoxetine', 'ssri', 'antidepressant'],
  'fludac': ['fluoxetine', 'ssri', 'antidepressant'],
  'tryptomer': ['amitriptyline', 'tca', 'antidepressant'],
  'levera': ['levetiracetam', 'anticonvulsant'],
  'torleva': ['levetiracetam', 'anticonvulsant'],
  'encorate': ['valproic acid', 'valproate', 'anticonvulsant'],
  'valparin': ['valproic acid', 'valproate', 'anticonvulsant'],
  'eptoin': ['phenytoin', 'anticonvulsant'],
  'tegretol': ['carbamazepine', 'anticonvulsant'],
  'gabapin': ['gabapentin', 'anticonvulsant', 'neuropathic'],
  'maxgalin': ['pregabalin', 'anticonvulsant', 'neuropathic'],
  'lyrica': ['pregabalin', 'anticonvulsant', 'neuropathic'],
  'myoril': ['thiocolchicoside', 'muscle-relaxant'],
  'atarax': ['hydroxyzine', 'antihistamine', 'anxiolytic'],
  'amaryl': ['glimepiride', 'sulfonylurea'],
  'glympis': ['glimepiride', 'sulfonylurea'],
  'januvia': ['sitagliptin', 'dpp4-inhibitor'],
  'galvus': ['vildagliptin', 'dpp4-inhibitor'],
  'forxiga': ['dapagliflozin', 'sglt2-inhibitor'],
  'jardiance': ['empagliflozin', 'sglt2-inhibitor'],
  'atorva': ['atorvastatin', 'statin'],
  'storvas': ['atorvastatin', 'statin'],
  'rosuvas': ['rosuvastatin', 'statin'],
  'zocon': ['fluconazole', 'azole-antifungal'],
  'forcan': ['fluconazole', 'azole-antifungal'],
  'itrasys': ['itraconazole', 'azole-antifungal'],
  'ultram': ['tramadol', 'opioid'],
  'tramazac': ['tramadol', 'opioid'],
  'depran': ['escitalopram', 'clonazepam', 'ssri'],
  'deriphyllin': ['theophylline', 'etofylline', 'xanthine'],
  'asthalin': ['salbutamol', 'albuterol', 'beta2-agonist'],
  'levolin': ['levosalbutamol', 'beta2-agonist'],
  'budecort': ['budesonide', 'corticosteroid'],
  'omnacortil': ['prednisolone', 'corticosteroid'],
  'wysolone': ['prednisolone', 'corticosteroid'],
  'dexona': ['dexamethasone', 'corticosteroid'],
  'rabipur': ['rabies-vaccine', 'arv', 'vaccine'],
  'abhayrab': ['rabies-vaccine', 'arv', 'vaccine'],
  'indirab': ['rabies-vaccine', 'arv', 'vaccine'],
  'rabigard': ['hrig', 'rabies-immunoglobulin'],
  'berirab': ['hrig', 'rabies-immunoglobulin'],
  'equirab': ['erig', 'rabies-immunoglobulin'],
  'equirab-sd': ['erig', 'rabies-immunoglobulin'],
  'typbar': ['typhoid-vaccine', 'tcv', 'vaccine'],
  'tresivac': ['mmr-vaccine', 'mr-vaccine', 'vaccine'],
  'cervavac': ['hpv-vaccine', 'vaccine'],
  'gardasil': ['hpv-vaccine', 'vaccine'],
  'fluarix': ['influenza-vaccine', 'flu-vaccine'],
  'asv': ['snake-venom-antiserum', 'antiserums'],
  'otrivin': ['xylometazoline', 'decongestant'],
  'nasivion': ['oxymetazoline', 'decongestant'],
  'oxy': ['oxymetazoline', 'oxytetracycline', 'oxycodone', 'oxytocin', 'oxybutynin', 'oxcarbazepine'],
  'sucrafil': ['sucralfate', 'antacid'],
  'sucral': ['sucralfate', 'antacid'],
  'carafate': ['sucralfate', 'antacid'],
  'erythrocin': ['erythromycin', 'macrolide'],
  'erythromycin': ['erythromycin', 'macrolide'],
  'roxid': ['roxithromycin', 'macrolide'],
  'roxithromycin': ['roxithromycin', 'macrolide'],
  'clarithromycin': ['clarithromycin', 'macrolide'],
  'lincocin': ['lincomycin', 'lincosamide'],
  'lincomycin': ['lincomycin', 'lincosamide'],
  'dalacin': ['clindamycin', 'lincosamide'],
  'clindamycin': ['clindamycin', 'lincosamide'],
  'vancocin': ['vancomycin', 'glycopeptide'],
  'vancomycin': ['vancomycin', 'glycopeptide'],
  'lizoforce': ['linezolid', 'oxazolidinone'],
  'linospan': ['linezolid', 'oxazolidinone'],
  'linezolid': ['linezolid', 'oxazolidinone'],
  'farobact': ['faropenem', 'carbapenem'],
  'faropenem': ['faropenem', 'carbapenem'],
  'meroplan': ['meropenem', 'carbapenem'],
  'meropenem': ['meropenem', 'carbapenem'],
  'colistin': ['colistimethate', 'polymyxin'],
  'atropine': ['atropine', 'anticholinergic'],
  'pralidoxime': ['pralidoxime', 'oxime'],
  'gliclazide': ['gliclazide', 'sulfonylurea'],
  'diamicron': ['gliclazide', 'sulfonylurea'],
  'glycinorm': ['gliclazide', 'sulfonylurea'],
  'vildagliptin': ['vildagliptin', 'dpp4-inhibitor'],
  'zomelis': ['vildagliptin', 'dpp4-inhibitor'],
  'galvus-met': ['vildagliptin', 'metformin', 'dpp4-inhibitor', 'biguanide'],
  'janumet': ['sitagliptin', 'metformin', 'dpp4-inhibitor', 'biguanide'],
  'tenepure-m': ['teneligliptin', 'metformin', 'dpp4-inhibitor', 'biguanide'],
  'trajenta-duo': ['linagliptin', 'metformin', 'dpp4-inhibitor', 'biguanide'],
  'rybelsus': ['semaglutide', 'glp1-agonist'],
  'ozempic': ['semaglutide', 'glp1-agonist'],
  'wegovy': ['semaglutide', 'glp1-agonist'],
  'mounjaro': ['tirzepatide', 'glp1-gip-agonist'],
  'zepbound': ['tirzepatide', 'glp1-gip-agonist'],
  'trulicity': ['dulaglutide', 'glp1-agonist'],
  'victoza': ['liraglutide', 'glp1-agonist'],
  'telma-am': ['telmisartan', 'amlodipine', 'arb', 'ccb'],
  'telma-h': ['telmisartan', 'hydrochlorothiazide', 'arb', 'diuretic'],
  'telma-ct': ['telmisartan', 'chlorthalidone', 'arb', 'diuretic'],
  'telma-cl': ['telmisartan', 'cilnidipine', 'arb', 'ccb'],
  'betaloc-xl': ['metoprolol', 'beta-blocker'],
  'eltroxin': ['levothyroxine', 'thyroid'],
  'thyronorm': ['levothyroxine', 'thyroid'],
  'neomercazole': ['carbimazole', 'antithyroid'],
  'thyrozol': ['methimazole', 'antithyroid'],
  'fosamax': ['alendronate', 'bisphosphonate'],
  'reclast': ['zoledronic acid', 'bisphosphonate'],
  'forteo': ['teriparatide', 'parathyroid'],
  'prolia': ['denosumab', 'monoclonal-antibody']
};

// EXHAUSTIVE OFFLINE DRUG-DRUG INTERACTION RULES DATABASE
export const DEFAULT_OFFLINE_DRUG_INTERACTIONS: DrugInteractionRule[] = [
  // 1. CARDIOVASCULAR & HEMATOLOGY
  {
    id: 'ddi-anticoagulant-nsaid',
    drugA: ['warfarin', 'acenocoumarol', 'acitrom', 'heparin', 'apixaban', 'rivaroxaban', 'dabigatran', 'anticoagulant'],
    drugB: ['aspirin', 'ecospirin', 'ibuprofen', 'brufen', 'combiflam', 'diclofenac', 'voveran', 'naproxen', 'piroxicam', 'mefenamic acid', 'meftal', 'nsaid'],
    severity: 'high',
    title: 'Severe Gastrointestinal Bleeding Risk',
    description: 'Combining anticoagulants with NSAIDs drastically impairs platelet aggregation and gastric mucosal barrier, significantly elevating major hemorrhage risk.',
    recommendation: 'Avoid co-prescription. Use Paracetamol/Acetaminophen for pain control or add gastroprotection (PPI) under close INR monitoring.',
    source: 'IPC / PvPI Safety Alert & NIH RxNorm',
    category: 'Cardiology'
  },
  {
    id: 'ddi-acei-arb-potassium',
    drugA: ['enalapril', 'envas', 'ramipril', 'cardace', 'lisinopril', 'perindopril', 'ace-inhibitor', 'telmisartan', 'telma', 'tazloc', 'losartan', 'valsartan', 'arb'],
    drugB: ['spironolactone', 'aldactone', 'eplerenone', 'potassium', 'potassium chloride'],
    severity: 'high',
    title: 'Severe Hyperkalemia Risk',
    description: 'Concurrent inhibition of aldosterone by ACE-I/ARBs combined with potassium-sparing diuretics or potassium supplements can induce lethal hyperkalemia and cardiac arrhythmias.',
    recommendation: 'Monitor serum potassium and renal function within 1 week of co-initiation.',
    source: 'CDSCO / NLEM India & WHO EML',
    category: 'Cardiology'
  },
  {
    id: 'ddi-acei-plus-arb',
    drugA: ['enalapril', 'envas', 'ramipril', 'cardace', 'lisinopril', 'ace-inhibitor'],
    drugB: ['telmisartan', 'telma', 'losartan', 'valsartan', 'arb'],
    severity: 'high',
    title: 'Dual Renin-Angiotensin System Blockade Alert',
    description: 'Combining an ACE Inhibitor with an ARB increases renal failure, hypotension, and hyperkalemia without providing additive cardiovascular mortality benefit.',
    recommendation: 'Avoid dual RAS blockade. Discontinue one of the agents unless explicitly managed by a nephrologist.',
    source: 'CDSCO / NLEM India & FDA Advisory',
    category: 'Cardiology'
  },
  {
    id: 'ddi-beta-blocker-verapamil-diltiazem',
    drugA: ['metoprolol', 'metolar', 'atenolol', 'aten', 'bisoprolol', 'concor', 'carvedilol', 'beta-blocker'],
    drugB: ['verapamil', 'diltiazem', 'ccb'],
    severity: 'high',
    title: 'Severe Bradycardia & AV Block Warning',
    description: 'Co-administration of beta-blockers with non-dihydropyridine calcium channel blockers causes synergistic AV nodal conduction suppression and severe bradycardia or heart block.',
    recommendation: 'Avoid combination. Monitor ECG and heart rate if combination is clinically unavoidable.',
    source: 'NIH RxNorm / NLM & WHO EML',
    category: 'Cardiology'
  },
  {
    id: 'ddi-digoxin-amiodarone',
    drugA: ['digoxin', 'lanoxin'],
    drugB: ['amiodarone', 'verapamil', 'diltiazem'],
    severity: 'high',
    title: 'Digoxin Toxicity Alert',
    description: 'Amiodarone or non-dihydropyridine CCBs reduce renal clearance of Digoxin, doubling serum Digoxin concentrations and triggering fatal digitalis toxicity.',
    recommendation: 'Reduce Digoxin dose by 50% when initiating Amiodarone and check serum digoxin levels.',
    source: 'NIH RxNorm / NLM',
    category: 'Cardiology'
  },
  {
    id: 'ddi-statin-macrolide',
    drugA: ['atorvastatin', 'atorva', 'storvas', 'simvastatin', 'lovastatin', 'statin'],
    drugB: ['erythromycin', 'clarithromycin', 'claribid', 'azithromycin', 'azithral', 'macrolide'],
    severity: 'moderate',
    title: 'Rhabdomyolysis & Myopathy Risk',
    description: 'Macrolides inhibit hepatic CYP3A4 enzyme pathways, raising plasma statin levels and increasing severe skeletal muscle toxicity (rhabdomyolysis).',
    recommendation: 'Temporarily pause statin therapy during the short macrolide antibiotic course.',
    source: 'WHO EML & FDA Drug Safety',
    category: 'Cardiology'
  },
  {
    id: 'ddi-statin-azole-antifungal',
    drugA: ['atorvastatin', 'atorva', 'simvastatin', 'rosuvastatin', 'rosuvas', 'statin'],
    drugB: ['fluconazole', 'zocon', 'forcan', 'itraconazole', 'itrasys', 'canditral', 'ketoconazole', 'azole-antifungal'],
    severity: 'high',
    title: 'Statin Toxicity & Rhabdomyolysis Warning',
    description: 'Azole antifungals potently inhibit CYP3A4 metabolism of statins, causing dramatic increases in statin exposure and acute kidney injury from rhabdomyolysis.',
    recommendation: 'Hold statin during systemic antifungal treatment.',
    source: 'IPC / PvPI India & FDA Advisory',
    category: 'Cardiology'
  },

  // 2. ANTIMICROBIALS & INFECTIOUS DISEASE
  {
    id: 'ddi-fluoroquinolone-antacid-minerals',
    drugA: ['ciprofloxacin', 'ciplox', 'cifran', 'ofloxacin', 'oflox', 'levofloxacin', 'levomac', 'fluoroquinolone'],
    drugB: ['antacid', 'gelusil', 'digene', 'sucralfate', 'iron', 'ferrous', 'calcium', 'zinc', 'multivitamin'],
    severity: 'moderate',
    title: 'Antibiotic Chelation & Treatment Failure',
    description: 'Polyvalent cations (iron, calcium, magnesium, aluminum in antacids) chelate fluoroquinolone molecules in the gut, reducing antibiotic absorption by up to 90%.',
    recommendation: 'Administer fluoroquinolones at least 2 hours before or 6 hours after mineral supplements/antacids.',
    source: 'CDSCO / NLEM India & NIH RxNorm',
    category: 'Antimicrobial'
  },
  {
    id: 'ddi-tetracycline-dairy-iron',
    drugA: ['doxycycline', 'dox-1', 'tetracycline'],
    drugB: ['iron', 'ferrous', 'calcium', 'antacid', 'milk'],
    severity: 'moderate',
    title: 'Tetracycline Inactivation Warning',
    description: 'Divalent and trivalent metal ions form insoluble chelates with tetracyclines, impairing oral bioavailability and antimicrobial efficacy.',
    recommendation: 'Separate oral doses by 2 to 3 hours.',
    source: 'NIH RxNorm / NLM',
    category: 'Antimicrobial'
  },
  {
    id: 'ddi-metronidazole-alcohol',
    drugA: ['metronidazole', 'flagyl', 'metrogyl', 'tinidazole'],
    drugB: ['alcohol', 'ethanol'],
    severity: 'high',
    title: 'Disulfiram-Like Reaction Warning',
    description: 'Metronidazole inhibits aldehyde dehydrogenase, causing toxic acetaldehyde buildup leading to severe nausea, vomiting, flushing, tachycardia, and hypotension upon alcohol ingestion.',
    recommendation: 'Strictly advise patient to refrain from alcohol during and for 48 hours after treatment.',
    source: 'CDSCO / NLEM India & WHO EML',
    category: 'Antimicrobial'
  },
  {
    id: 'ddi-fluoroquinolone-nsaid-seizure',
    drugA: ['ciprofloxacin', 'ciplox', 'ofloxacin', 'levofloxacin', 'fluoroquinolone'],
    drugB: ['ibuprofen', 'brufen', 'combiflam', 'diclofenac', 'voveran', 'mefenamic acid', 'meftal', 'nsaid'],
    severity: 'moderate',
    title: 'Lowered Seizure Threshold Warning',
    description: 'Co-prescribing fluoroquinolones with NSAIDs increases displacement of GABA from central receptor sites, elevating risk of CNS stimulation and convulsions.',
    recommendation: 'Use non-NSAID analgesics (e.g. Paracetamol) during fluoroquinolone therapy in patients with seizure risk.',
    source: 'IPC / PvPI Safety Alert',
    category: 'Antimicrobial'
  },

  // 2.1 GASTROENTEROLOGY & THERAPEUTIC DUPLICATION
  {
    id: 'ddi-duplicate-ppi-therapy',
    drugA: ['esomeprazole', 'pantoprazole', 'rabeprazole', 'omeprazole', 'lansoprazole', 'dexlansoprazole', 'ilaprazole', 'ppi'],
    drugB: ['esomeprazole', 'pantoprazole', 'rabeprazole', 'omeprazole', 'lansoprazole', 'dexlansoprazole', 'ilaprazole', 'ppi'],
    severity: 'high',
    title: 'Duplicate PPI Therapy & Excessive Acid Suppression Warning',
    description: 'Co-prescribing multiple Proton Pump Inhibitors (e.g. Esomeprazole, Pantoprazole, Rabeprazole, Omeprazole) provides zero additional clinical benefit while causing excessive gastric acid suppression, increasing risks of hypomagnesemia, Clostridium difficile diarrhea, bone fractures, and acute interstitial nephritis.',
    recommendation: 'Select a single PPI agent appropriate for the patient indication and discontinue duplicate PPI formulations.',
    source: 'CDSCO / NLEM India & USFDA Safety Alert',
    category: 'Gastroenterology'
  },
  {
    id: 'ddi-duplicate-domperidone-prokinetic',
    drugA: ['domperidone', 'prokinetic'],
    drugB: ['domperidone', 'prokinetic'],
    severity: 'high',
    title: 'Duplicate Domperidone Dosing & Cardiac Arrhythmia Warning',
    description: 'Co-prescribing multiple Domperidone-containing combination drugs (e.g., Pantoprazole+Domperidone with Rabeprazole+Domperidone) causes cumulative daily overdose (>30mg/day), elevating the risk of QT prolongation, ventricular arrhythmias, and sudden cardiac arrest.',
    recommendation: 'Discontinue duplicate Domperidone-containing formulations. Ensure total daily Domperidone intake does not exceed 30mg.',
    source: 'IPC / PvPI Drug Safety Advisory & CDSCO India',
    category: 'Gastroenterology'
  },
  {
    id: 'ddi-duplicate-nsaid-therapy',
    drugA: ['aceclofenac', 'diclofenac', 'ibuprofen', 'mefenamic acid', 'naproxen', 'piroxicam', 'etoricoxib', 'nsaid'],
    drugB: ['aceclofenac', 'diclofenac', 'ibuprofen', 'mefenamic acid', 'naproxen', 'piroxicam', 'etoricoxib', 'nsaid'],
    severity: 'high',
    title: 'Duplicate NSAID Therapy & Severe GI Bleeding Warning',
    description: 'Co-prescribing multiple non-steroidal anti-inflammatory drugs (NSAIDs) simultaneously significantly escalates the risk of gastric mucosal ulceration, GI hemorrhage, acute renal failure, and cardiovascular events without increasing analgesia.',
    recommendation: 'Discontinue duplicate NSAIDs. Prescribe a single NSAID at the lowest effective dose.',
    source: 'CDSCO / NLEM India & WHO EML',
    category: 'Analgesic'
  },
  {
    id: 'ddi-duplicate-nitroimidazole',
    drugA: ['metronidazole', 'metrogyl', 'flagyl', 'ornidazole', 'oflox-oz', 'tinidazole', 'secnidazole', 'nitroimidazole'],
    drugB: ['metronidazole', 'metrogyl', 'flagyl', 'ornidazole', 'oflox-oz', 'tinidazole', 'secnidazole', 'nitroimidazole'],
    severity: 'high',
    title: 'Duplicate Nitroimidazole Therapy & Peripheral Neuropathy Warning',
    description: 'Co-prescribing multiple Nitroimidazole anti-amoebics (e.g. Metronidazole with Ornidazole or Tinidazole) is clinically redundant as both share the exact same mechanism. Combined use causes cumulative neurotoxicity, peripheral neuropathy, and severe nausea.',
    recommendation: 'Discontinue duplicate Nitroimidazole formulations. Select a single agent (Metronidazole OR Ornidazole) for the infection.',
    source: 'CDSCO / NLEM India & WHO EML',
    category: 'Antimicrobial'
  },
  {
    id: 'ddi-duplicate-d2-prokinetic-levo-domp',
    drugA: ['domperidone', 'pan-d', 'pantocid-d', 'razo-d', 'prokinetic'],
    drugB: ['levosulpiride', 'levazeo', 'metoclopramide', 'perinorm', 'itopride', 'ganaton', 'cinitapride', 'prokinetic'],
    severity: 'high',
    title: 'Redundant D2-Receptor Prokinetic & Extrapyramidal Warning',
    description: 'Co-prescribing Domperidone with Levosulpiride, Metoclopramide, or Itopride causes dual D2-receptor antagonism. Combined use significantly escalates risk of Extrapyramidal Symptoms (EPS), acute dystonia, hyperprolactinemia, and severe QT prolongation.',
    recommendation: 'Select a single prokinetic agent (Domperidone OR Levosulpiride) and discontinue redundant D2 antagonists.',
    source: 'IPC / PvPI Drug Safety Advisory & CDSCO India',
    category: 'Gastroenterology'
  },
  {
    id: 'ddi-duplicate-ccb-therapy',
    drugA: ['amlodipine', 'amlong', 'stamlo', 'ccb'],
    drugB: ['cilnidipine', 'cilacar', 'nifedipine', 'depin', 'felodipine', 'ccb'],
    severity: 'high',
    title: 'Duplicate Dihydropyridine CCB & Severe Pedal Edema Warning',
    description: 'Co-prescribing multiple Dihydropyridine Calcium Channel Blockers (e.g. Amlodipine + Cilnidipine) causes excessive arteriolodilation, profound hypotension, reflex tachycardia, and severe peripheral pedal edema.',
    recommendation: 'Prescribe a single Calcium Channel Blocker formulation.',
    source: 'CDSCO / NLEM India',
    category: 'Cardiology'
  },
  {
    id: 'ddi-duplicate-statin-myopathy',
    drugA: ['atorvastatin', 'atorva', 'storvas', 'statin'],
    drugB: ['rosuvastatin', 'rosuvas', 'rozavel', 'simvastatin', 'statin'],
    severity: 'high',
    title: 'Duplicate Statin Therapy & Rhabdomyolysis Hazard',
    description: 'Co-prescribing multiple HMG-CoA Reductase Inhibitors (Atorvastatin + Rosuvastatin) provides no extra lipid benefit while exponentially increasing risks of severe myopathy, elevated creatine kinase, and fatal rhabdomyolysis.',
    recommendation: 'Discontinue duplicate statins. Use a single potent statin at appropriate dose.',
    source: 'USFDA & CDSCO India',
    category: 'Cardiology'
  },
  {
    id: 'ddi-duplicate-macrolide-qt',
    drugA: ['azithromycin', 'azee', 'azithral', 'macrolide'],
    drugB: ['clarithromycin', 'claribid', 'erythromycin', 'macrolide'],
    severity: 'high',
    title: 'Duplicate Macrolide Antibiotic & QT Prolongation Hazard',
    description: 'Co-prescribing multiple Macrolide antibiotics causes redundant antibacterial coverage and severe inhibition of cardiac repolarization, escalating risk of Torsades de Pointes.',
    recommendation: 'Use a single macrolide formulation.',
    source: 'USFDA & CDSCO India',
    category: 'Antimicrobial'
  },
  {
    id: 'ddi-duplicate-antihistamine',
    drugA: ['cetirizine', 'cetzine', 'okacet', 'levocetirizine', 'levocet', 'xyzal', 'antihistamine'],
    drugB: ['fexofenadine', 'allegra', 'loratadine', 'antihistamine'],
    severity: 'moderate',
    title: 'Duplicate H1-Antihistamine Therapy Warning',
    description: 'Co-prescribing multiple H1-antihistamines causes excessive psychomotor impairment, sedation, and anticholinergic side effects.',
    recommendation: 'Use a single H1-antihistamine formulation.',
    source: 'CDSCO / NLEM India',
    category: 'Allergy'
  },

  // 3. PSYCHIATRY & BENZODIAZEPINES
  {
    id: 'ddi-benzo-opioid-respiratory-depression',
    drugA: ['alprazolam', 'alprax', 'clonazepam', 'clonotril', 'diazepam', 'valium', 'lorazepam', 'ativan', 'benzodiazepine'],
    drugB: ['tramadol', 'codeine', 'morphine', 'fentanyl', 'opioid'],
    severity: 'high',
    title: 'Severe CNS & Respiratory Depression Warning',
    description: 'Concomitant use of Benzodiazepines (Alprazolam, Clonazepam, Diazepam, Lorazepam) with Opioids causes profound sedation, respiratory depression, coma, and fatal overdose.',
    recommendation: 'Reserve concomitant prescribing for patients in whom alternative treatment options are inadequate. Limit dosages and duration to minimum required.',
    source: 'USFDA Boxed Warning & IPC / PvPI Alert',
    category: 'Psychiatry'
  },
  {
    id: 'ddi-benzo-alcohol-cns',
    drugA: ['alprazolam', 'alprax', 'clonazepam', 'clonotril', 'diazepam', 'valium', 'lorazepam', 'ativan', 'benzodiazepine'],
    drugB: ['alcohol', 'ethanol', 'zolpidem', 'zolfresh'],
    severity: 'high',
    title: 'Potentiated CNS & Psychomotor Impairment',
    description: 'Benzodiazepines combined with alcohol or non-benzodiazepine hypnotics result in additive central nervous system depression, severe anterograde amnesia, and respiratory arrest.',
    recommendation: 'Warn patient strictly against consuming alcohol or additional sedatives while taking benzodiazepines.',
    source: 'WHO EML & CDSCO India',
    category: 'Psychiatry'
  },

  // 3.1 ANALGESICS, PAIN & RHEUMATOLOGY
  {
    id: 'ddi-ssri-tramadol-serotonin',
    drugA: ['escitalopram', 'nexito', 'sertraline', 'zoloft', 'fluoxetine', 'paroxetine', 'ssri'],
    drugB: ['tramadol', 'ultram', 'tramazac', 'opioid'],
    severity: 'high',
    title: 'Serotonin Syndrome Toxicity Alert',
    description: 'Combined serotonergic activity of SSRIs and Tramadol can precipitate life-threatening Serotonin Syndrome (hyperthermia, clonus, autonomic instability, agitation).',
    recommendation: 'Avoid co-prescription. Consider alternative non-serotonergic analgesics.',
    source: 'NIH RxNorm / NLM & FDA Safety Alert',
    category: 'Analgesic'
  },
  {
    id: 'ddi-methotrexate-nsaid',
    drugA: ['methotrexate', 'metoject', 'neotrexate'],
    drugB: ['ibuprofen', 'diclofenac', 'naproxen', 'aspirin', 'piroxicam', 'nsaid'],
    severity: 'high',
    title: 'Severe Methotrexate Toxicity Alert',
    description: 'NSAIDs reduce renal perfusion and compete for renal tubular secretion of Methotrexate, causing toxic blood levels, severe bone marrow suppression, and nephrotoxicity.',
    recommendation: 'Avoid concomitant NSAIDs with high-dose methotrexate. Monitor CBC and liver enzymes if co-administered in rheumatoid arthritis.',
    source: 'CDSCO / NLEM India & WHO EML',
    category: 'Nephrology/Rheumatology'
  },
  {
    id: 'ddi-allopurinol-azathioprine',
    drugA: ['allopurinol', 'zyloric'],
    drugB: ['azathioprine', 'azoran', 'mercaptopurine'],
    severity: 'high',
    title: 'Fatal Myelosuppression Warning',
    description: 'Allopurinol inhibits xanthine oxidase, the enzyme responsible for detoxifying Azathioprine, leading to massive accumulation and fatal bone marrow toxicity.',
    recommendation: 'Reduce Azathioprine dose to 25%-33% of standard dose if combination is required.',
    source: 'WHO EML & NIH RxNorm',
    category: 'Nephrology/Rheumatology'
  },

  // 4. ENDOCRINE & DIABETES
  {
    id: 'ddi-sulfonylurea-beta-blocker',
    drugA: ['glimepiride', 'amaryl', 'glympis', 'gliclazide', 'glipizide', 'glibenclamide', 'sulfonylurea'],
    drugB: ['propranolol', 'inderal', 'atenolol', 'aten', 'metoprolol', 'beta-blocker'],
    severity: 'moderate',
    title: 'Masked Hypoglycemia Warning',
    description: 'Non-selective beta-blockers mask sympathetic warning signs of hypoglycemia (tachycardia, tremors), leaving diaphoresis as the sole symptom.',
    recommendation: 'Educate patient on recognizing sweating as a sign of hypoglycemia and monitor blood glucose frequently.',
    source: 'CDSCO / NLEM India',
    category: 'Endocrine'
  },
  {
    id: 'ddi-metformin-contrast-media',
    drugA: ['metformin', 'glycomet', 'obimet', 'biguanide'],
    drugB: ['contrast', 'iohexol', 'iopamidol', 'radiocontrast'],
    severity: 'high',
    title: 'Metformin-Induced Lactic Acidosis Alert',
    description: 'Intravascular iodinated contrast media can cause acute kidney injury, leading to Metformin accumulation and life-threatening lactic acidosis.',
    recommendation: 'Withhold Metformin prior to or at time of contrast procedure and resume 48 hours later after verifying normal renal function.',
    source: 'CDSCO / NLEM India & FDA Guidelines',
    category: 'Endocrine'
  },

  // 5. CNS & PSYCHIATRY
  {
    id: 'ddi-ssri-nsaid-gi-bleed',
    drugA: ['escitalopram', 'nexito', 'sertraline', 'zoloft', 'fluoxetine', 'ssri'],
    drugB: ['aspirin', 'ecospirin', 'ibuprofen', 'brufen', 'diclofenac', 'voveran', 'meftal', 'nsaid'],
    severity: 'moderate',
    title: 'Increased GI Bleeding Risk',
    description: 'SSRIs deplete platelet serotonin stores required for hemostasis. Combined with NSAID gastric mucosal erosion, bleeding risk increases 6-fold.',
    recommendation: 'Co-prescribe a Gastro-Protective agent (PPI like Pantoprazole) in high-risk patients.',
    source: 'NIH RxNorm / NLM & WHO EML',
    category: 'Psychiatry'
  },
  {
    id: 'ddi-deriphyllin-ciprofloxacin',
    drugA: ['theophylline', 'etofylline', 'deriphyllin', 'xanthine'],
    drugB: ['ciprofloxacin', 'ciplox', 'cifran', 'enoxacin', 'fluoroquinolone'],
    severity: 'high',
    title: 'Theophylline Toxicity & Convulsion Alert',
    description: 'Ciprofloxacin inhibits CYP1A2 metabolism of Theophylline, elevating plasma levels by 100% and triggering severe nausea, arrhythmias, and seizures.',
    recommendation: 'Avoid combination. Reduce theophylline dose by 50% and monitor plasma levels if ciprofloxacin cannot be substituted.',
    source: 'CDSCO / NLEM India & NIH RxNorm',
    category: 'Cardiology'
  },

  // 6. SPECIAL INDIAN CDSCO SAFETY ALERTS & BANNED COMBINATIONS
  {
    id: 'cdsco-mefenamic-dress-alert',
    drugA: ['mefenamic acid', 'meftal', 'meftal-spas'],
    drugB: ['all'],
    severity: 'moderate',
    title: 'IPC Drug Safety Alert: DRESS Syndrome Risk',
    description: 'The Indian Pharmacopoeia Commission (IPC) issued a Drug Safety Alert for Mefenamic Acid due to reported cases of severe Drug Rash with Eosinophilia and Systemic Symptoms (DRESS Syndrome).',
    recommendation: 'Advise patients to immediately discontinue and report if skin rash, fever, or lymphadenopathy occurs.',
    source: 'IPC / PvPI Safety Alert (India)',
    category: 'CDSCO Alert'
  },
  {
    id: 'cdsco-nimesulide-pediatric-ban',
    drugA: ['nimesulide', 'nise'],
    drugB: ['pediatric', 'child', 'infant'],
    severity: 'high',
    title: 'CDSCO Banned Alert: Nimesulide in Children < 12 Yrs',
    description: 'CDSCO has banned the manufacture and sale of Nimesulide formulations for pediatric use under 12 years due to fatal hepatotoxicity.',
    recommendation: 'Do NOT prescribe Nimesulide for children below 12 years. Use Paracetamol or Ibuprofen instead.',
    source: 'CDSCO Banned FDC List (India)',
    category: 'CDSCO Alert'
  }
];

const LOCAL_STORAGE_RULES_KEY = 'prescribe_pro_custom_interaction_rules_v1';

// RETRIEVE CURRENT RULES (COMBINES DEFAULT + CUSTOM)
export function getInteractionRules(): DrugInteractionRule[] {
  if (typeof window === 'undefined') return DEFAULT_OFFLINE_DRUG_INTERACTIONS;
  try {
    const custom = localStorage.getItem(LOCAL_STORAGE_RULES_KEY);
    if (custom) {
      const parsed: DrugInteractionRule[] = JSON.parse(custom);
      return [...parsed, ...DEFAULT_OFFLINE_DRUG_INTERACTIONS];
    }
  } catch (e) {
    console.error('Failed to parse custom interaction rules', e);
  }
  return DEFAULT_OFFLINE_DRUG_INTERACTIONS;
}

// SAVE CUSTOM RULE
export function addCustomInteractionRule(rule: Omit<DrugInteractionRule, 'id' | 'isCustom'>): DrugInteractionRule {
  const newRule: DrugInteractionRule = {
    ...rule,
    id: `custom-ddi-${Date.now()}`,
    isCustom: true
  };
  
  if (typeof window !== 'undefined') {
    try {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_RULES_KEY);
      const existing: DrugInteractionRule[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newRule, ...existing];
      localStorage.setItem(LOCAL_STORAGE_RULES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom rule to local storage', e);
    }
  }
  
  return newRule;
}

// RESET RULES TO DEFAULT OPEN DATASET
export function resetRulesToDefault(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_RULES_KEY);
  }
}

// PARSE CSV / JSON DATASET IMPORT
export function importRulesFromCSVText(csvText: string): { successCount: number; errorCount: number } {
  let successCount = 0;
  let errorCount = 0;
  const lines = csvText.split('\n');
  const newRules: DrugInteractionRule[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Format: DrugA, DrugB, Severity, Title, Description, Recommendation, Source, Category
    const parts = line.split(',').map(p => p.replace(/^["']|["']$/g, '').trim());
    if (parts.length >= 7) {
      const [drugA, drugB, severity, title, description, recommendation, source, category] = parts;
      newRules.push({
        id: `imported-csv-${Date.now()}-${i}`,
        drugA: drugA.split(';').map(d => d.trim().toLowerCase()),
        drugB: drugB.split(';').map(d => d.trim().toLowerCase()),
        severity: (severity.toLowerCase() === 'high' || severity.toLowerCase() === 'severe') ? 'high' : 'moderate',
        title: title || 'Imported Interaction Warning',
        description: description || 'Clinical interaction detected.',
        recommendation: recommendation || 'Exercise clinical caution.',
        source: source || 'Custom Imported Dataset',
        category: (category as any) || 'CDSCO Alert',
        isCustom: true
      });
      successCount++;
    } else {
      errorCount++;
    }
  }

  if (newRules.length > 0 && typeof window !== 'undefined') {
    try {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_RULES_KEY);
      const existing: DrugInteractionRule[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(LOCAL_STORAGE_RULES_KEY, JSON.stringify([...newRules, ...existing]));
    } catch (e) {
      console.error('Failed to save imported CSV rules', e);
    }
  }

  return { successCount, errorCount };
}
