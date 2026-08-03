import {
  DrugInteractionRule,
  INDIAN_BRAND_TO_GENERIC_MAP,
  getInteractionRules
} from './drug-interactions-db';

export interface DetectedInteraction {
  rule: DrugInteractionRule;
  foundDrugA: string;
  foundDrugB: string;
  type: 'interaction' | 'allergy' | 'cdsco-alert';
}

/**
 * Verified dictionary of actual generic active ingredient salt names.
 * Dynamic duplicate checking ONLY triggers if a shared keyword is in this whitelist.
 */
export const KNOWN_GENERIC_SALTS = new Set([
  'paracetamol', 'acetaminophen', 'pantoprazole', 'rabeprazole', 'esomeprazole', 'omeprazole', 'lansoprazole', 'dexlansoprazole', 'ilaprazole',
  'domperidone', 'metoclopramide', 'levosulpiride', 'itopride', 'cinitapride', 'ondansetron', 'granisetron', 'palonosetron',
  'amoxicillin', 'clavulanate', 'clavulanic acid', 'ampicillin', 'cloxacillin', 'penicillin',
  'cefixime', 'cefpodoxime', 'cefuroxime', 'ceftriaxone', 'cephalexin', 'cefotaxime', 'cefepime', 'cefoperazone',
  'ciprofloxacin', 'ofloxacin', 'levofloxacin', 'moxifloxacin', 'norfloxacin',
  'azithromycin', 'clarithromycin', 'erythromycin', 'roxithromycin',
  'doxycycline', 'tetracycline', 'minocycline', 'tigecycline',
  'metronidazole', 'tinidazole', 'ornidazole', 'secnidazole',
  'nitrofurantoin', 'cotrimoxazole', 'trimethoprim', 'sulfamethoxazole',
  'fluconazole', 'itraconazole', 'voriconazole', 'posaconazole', 'ketoconazole', 'clotrimazole', 'terbinafine',
  'acyclovir', 'valacyclovir', 'oseltamivir', 'favipiravir', 'remdesivir',
  'diclofenac', 'aceclofenac', 'ibuprofen', 'naproxen', 'piroxicam', 'mefenamic acid', 'indomethacin', 'etoricoxib', 'celecoxib', 'nimesulide', 'aspirin',
  'tramadol', 'codeine', 'morphine', 'fentanyl', 'tapentadol', 'buprenorphine',
  'drotaverine', 'dicyclomine', 'hyoscine', 'flavoxate',
  'telmisartan', 'losartan', 'valsartan', 'olmesartan', 'irbesartan', 'candesartan',
  'enalapril', 'ramipril', 'lisinopril', 'perindopril', 'benazepril',
  'amlodipine', 'cilnidipine', 'nifedipine', 'felodipine', 'verapamil', 'diltiazem',
  'metoprolol', 'atenolol', 'bisoprolol', 'carvedilol', 'labetalol', 'propranolol', 'nebivolol',
  'furosemide', 'torsemide', 'spironolactone', 'eplerenone', 'hydrochlorothiazide', 'chlorthalidone', 'indapamide',
  'atorvastatin', 'rosuvastatin', 'simvastatin', 'pravastatin', 'lovastatin', 'fenofibrate', 'gemfibrozil',
  'metformin', 'glimepiride', 'gliclazide', 'glipizide', 'glibenclamide', 'pioglitazone',
  'sitagliptin', 'vildagliptin', 'teneligliptin', 'linagliptin', 'saxagliptin',
  'dapagliflozin', 'empagliflozin', 'canagliflozin', 'remogliflozin',
  'alprazolam', 'clonazepam', 'diazepam', 'lorazepam', 'clobazam', 'chlordiazepoxide', 'nitrazepam', 'zolpidem',
  'escitalopram', 'sertraline', 'fluoxetine', 'paroxetine', 'citalopram', 'fluvoxamine',
  'duloxetine', 'venlafaxine', 'desvenlafaxine', 'mirtazapine', 'amitriptyline', 'nortriptyline',
  'phenytoin', 'levetiracetam', 'valproic acid', 'valproate', 'carbamazepine', 'oxcarbazepine', 'gabapentin', 'pregabalin', 'lamotrigine', 'topiramate',
  'hydrocortisone', 'dexamethasone', 'prednisolone', 'defcort', 'deflazacort', 'triamcinolone', 'methylprednisolone', 'betamethasone',
  'deriphyllin', 'theophylline', 'etofylline', 'doxofylline', 'salbutamol', 'albuterol', 'levosalbutamol', 'terbutaline',
  'budesonide', 'fluticasone', 'beclomethasone', 'ciclesonide', 'formoterol', 'salmeterol', 'tiotropium', 'ipratropium',
  'montelukast', 'zafirlukast',
  'allopurinol', 'febuxostat', 'colchicine',
  'methotrexate', 'azathioprine', 'hydroxychloroquine', 'sulfasalazine', 'leflunomide', 'cyclosporine', 'tacrolimus',
  'artesunate', 'artemether', 'lumefantrine', 'chloroquine', 'primaquine', 'quinine',
  'iron sucrose', 'ferrous ascorbate', 'ferrous sulfate', 'folic acid', 'cyanocobalamin', 'methylcobalamin',
  'ranitidine', 'famotidine', 'cimetidine',
  'thiocolchicoside', 'tizanidine', 'baclofen', 'chlorzoxazone',
  'hydroxyzine', 'cetirizine', 'levocetirizine', 'fexofenadine', 'loratadine', 'desloratadine', 'bilastine', 'chlorpheniramine', 'pheniramine',
  'thyroxine', 'levothyroxine', 'carbimazole', 'methimazole',
  'pralidoxime', 'atropine', 'neostigmine', 'physostigmine', 'pyridostigmine',
  'lincomycin', 'clindamycin', 'vancomycin', 'linezolid', 'faropenem', 'meropenem', 'colistin',
  'sucralfate', 'xylometazoline', 'oxymetazoline', 'oxytetracycline', 'oxybutynin', 'oxytocin',
  'gliclazide', 'semaglutide', 'tirzepatide', 'dulaglutide', 'liraglutide', 'alendronate', 'risedronate', 'zoledronic acid', 'teriparatide', 'denosumab', 'bromocriptine', 'octreotide', 'pasireotide', 'lanreotide', 'cinacalcet', 'myo-inositol',
  'magnesium sulfate', 'sodium bicarbonate', 'potassium chloride', 'calcium gluconate'
]);

/**
 * Resolves a drug input string into all generic active ingredients, brand keywords, and drug class names.
 */
export function resolveDrugKeywords(drugStr: string): string[] {
  const normalized = drugStr.toLowerCase().trim();
  const keywords = new Set<string>();

  // Split on spaces, punctuation, dashes, slashes, and dots (so 0.5ml becomes 0, 5ml or 5, ml)
  const words = normalized.split(/[\s,()/\.\-]+/);
  words.forEach((w) => {
    // Exclude words that are purely numbers or contain digits (e.g. 500mg, 0.5ml, d0, 650)
    if (w.length > 2 && !/\d/.test(w)) {
      keywords.add(w);
    }
  });

  // Check Indian Brand Resolution Map (use whole word regex to avoid substring false matches)
  for (const [brand, generics] of Object.entries(INDIAN_BRAND_TO_GENERIC_MAP)) {
    if (brand.length >= 3) {
      const regex = new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalized)) {
        keywords.add(brand);
        generics.forEach((g) => keywords.add(g));
      }
    }
  }

  return Array.from(keywords);
}

/**
 * Checks prescribed drugs, patient allergies, and conditions against the offline DDI rules.
 */
export function checkPrescriptionSafety(
  prescribedDrugs: string[],
  patientAllergies: string = '',
  patientConditions: string = '',
  ignoredRuleIds: string[] = []
): DetectedInteraction[] {
  const detected: DetectedInteraction[] = [];
  const rules = getInteractionRules();
  const ignoredSet = new Set(ignoredRuleIds);

  if (!prescribedDrugs || prescribedDrugs.length === 0) return detected;

  // Resolve keywords for each prescribed drug line item
  const parsedDrugs = prescribedDrugs.map((d) => ({
    original: d,
    keywords: resolveDrugKeywords(d)
  }));

  // 1. DRUG-DRUG INTERACTION CHECK (Static Rules Database)
  for (const rule of rules) {
    if (ignoredSet.has(rule.id)) continue;

    // Check single-drug alerts (e.g. IPC Mefenamic Acid DRESS Alert)
    if (rule.drugB.length === 1 && rule.drugB[0] === 'all') {
      const matchA = parsedDrugs.find((item) =>
        rule.drugA.some((k) => item.keywords.includes(k))
      );
      if (matchA) {
        detected.push({
          rule,
          foundDrugA: matchA.original,
          foundDrugB: 'Patient Safety Alert',
          type: rule.category === 'CDSCO Alert' ? 'cdsco-alert' : 'interaction'
        });
      }
      continue;
    }

    // Check pair interactions (Drug A + Drug B)
    for (let i = 0; i < parsedDrugs.length; i++) {
      const drugItemA = parsedDrugs[i];
      const matchesRuleA = rule.drugA.some((k) => drugItemA.keywords.includes(k));

      if (matchesRuleA) {
        for (let j = 0; j < parsedDrugs.length; j++) {
          if (i === j) continue;
          const drugItemB = parsedDrugs[j];
          const matchesRuleB = rule.drugB.some((k) => drugItemB.keywords.includes(k));

          if (matchesRuleB) {
            // Avoid duplicate reverse pair reports for the same rule
            const alreadyReported = detected.some(
              (d) =>
                d.rule.id === rule.id &&
                ((d.foundDrugA === drugItemA.original && d.foundDrugB === drugItemB.original) ||
                  (d.foundDrugA === drugItemB.original && d.foundDrugB === drugItemA.original))
            );

            if (!alreadyReported) {
              detected.push({
                rule,
                foundDrugA: drugItemA.original,
                foundDrugB: drugItemB.original,
                type: 'interaction'
              });
            }
          }
        }
      }
    }
  }

  // 1.5 DYNAMIC DUPLICATE GENERIC ACTIVE INGREDIENT CHECK
  // (ONLY triggers if a shared keyword is a verified generic salt in KNOWN_GENERIC_SALTS)
  for (let i = 0; i < parsedDrugs.length; i++) {
    for (let j = i + 1; j < parsedDrugs.length; j++) {
      const drugA = parsedDrugs[i];
      const drugB = parsedDrugs[j];

      // Skip dynamic check if a static DDI rule already triggered for this exact pair of drug items
      const alreadyHasStaticRule = detected.some(
        (d) =>
          (d.foundDrugA === drugA.original && d.foundDrugB === drugB.original) ||
          (d.foundDrugA === drugB.original && d.foundDrugB === drugA.original)
      );

      if (alreadyHasStaticRule) continue;

      // Find common active generic salt keywords in KNOWN_GENERIC_SALTS
      const commonGenerics = drugA.keywords.filter(
        (k) =>
          drugB.keywords.includes(k) &&
          KNOWN_GENERIC_SALTS.has(k)
      );

      if (commonGenerics.length > 0) {
        const primarySalt = commonGenerics[0].toUpperCase();
        const ruleId = `dynamic-duplicate-${commonGenerics[0]}-${i}-${j}`;

        if (!ignoredSet.has(ruleId)) {
          detected.push({
            rule: {
              id: ruleId,
              drugA: [commonGenerics[0]],
              drugB: [commonGenerics[0]],
              severity: 'high',
              title: `🚨 Duplicate Generic Active Ingredient: ${primarySalt}`,
              description: `Co-prescribing multiple formulations containing the exact same active generic salt "${primarySalt}" (${drugA.original} and ${drugB.original}) causes accidental toxicity, severe cumulative overdose, and redundant therapy.`,
              recommendation: `Discontinue one of the redundant ${primarySalt} line items and select a single dosage formulation.`,
              source: 'CDSCO / NLEM India & WHO EML Safety Advisory',
              category: 'Antimicrobial'
            },
            foundDrugA: drugA.original,
            foundDrugB: drugB.original,
            type: 'interaction'
          });
        }
      }
    }
  }

  // 2. PATIENT ALLERGY CHECK
  if (patientAllergies && patientAllergies.trim().length > 0) {
    const allergyKeywords = patientAllergies
      .toLowerCase()
      .split(/[\s,;]+/)
      .filter((k) => k.length > 2 && KNOWN_GENERIC_SALTS.has(k));

    if (allergyKeywords.length > 0) {
      for (const item of parsedDrugs) {
        for (const kw of allergyKeywords) {
          const isAllergicMatch = item.keywords.some(
            (dk) => dk.includes(kw) || kw.includes(dk)
          );

          if (isAllergicMatch && !ignoredSet.has(`allergy-${kw}-${item.original}`)) {
            detected.push({
              rule: {
                id: `allergy-${kw}-${item.original}`,
                drugA: [kw],
                drugB: [item.original],
                severity: 'high',
                title: `🔴 Patient Allergy Warning: ${kw.toUpperCase()}`,
                description: `Patient has a documented allergy to "${kw}". The prescribed medication "${item.original}" contains or belongs to the ${kw} class.`,
                recommendation: 'Do NOT administer this drug. Switch to an alternative non-allergic medication class.',
                source: 'CDSCO / NLEM Patient Safety & Hospital EMR',
                category: 'Allergy'
              },
              foundDrugA: `Patient Allergy: ${kw}`,
              foundDrugB: item.original,
              type: 'allergy'
            });
          }
        }
      }
    }
  }

  // 3. PAIR DEDUPLICATION
  // Ensure no two red alerts target the exact same pair of prescribed drug lines
  const uniqueAlerts: DetectedInteraction[] = [];
  const seenPairKeys = new Set<string>();

  for (const item of detected) {
    if (item.foundDrugB === 'Patient Safety Alert' || item.type === 'allergy') {
      uniqueAlerts.push(item);
      continue;
    }

    const pairKey = [item.foundDrugA.toLowerCase().trim(), item.foundDrugB.toLowerCase().trim()].sort().join('___');
    if (!seenPairKeys.has(pairKey)) {
      seenPairKeys.add(pairKey);
      uniqueAlerts.push(item);
    }
  }

  return uniqueAlerts;
}
