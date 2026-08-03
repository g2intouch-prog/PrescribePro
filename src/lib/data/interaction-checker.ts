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

const NON_GENERIC_STOP_WORDS = new Set([
  // Formulations & Forms
  'tablet', 'tablets', 'tab', 'tabs', 'capsule', 'capsules', 'cap', 'caps', 'syrup', 'syp', 'syrups',
  'suspension', 'injection', 'inj', 'injections', 'ointment', 'gel', 'drop', 'drops', 'eye', 'ear',
  'cream', 'lotion', 'solution', 'soln', 'inhaler', 'puffs', 'respules', 'patch', 'suppository',
  'vial', 'vials', 'ampoule', 'amp', 'bottle', 'strip', 'pack', 'powder', 'infusion', 'spray',
  'elixir', 'emulsion', 'mouthwash', 'gargle', 'liniment', 'paste', 'soap', 'shampoo',

  // Units, Dosage & Numbers
  'mg', 'gm', 'g', 'mcg', 'ml', 'iu', 'meq', 'mmol', 'mol', 'kg', 'lbs', 'pct', 'percent',

  // Frequencies & Directions
  '1-0-1', '1-0-0', '0-0-1', '1-1-1', 's.o.s', 'sos', 'bd', 'tds', 'od', 'hs', 'stat', 'q6h', 'q8h', 'q12h', 'qid', 'tid', 'bid',
  'once', 'twice', 'thrice', 'daily', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years', 'yrs',
  'before', 'after', 'food', 'meals', 'meal', 'night', 'morning', 'afternoon', 'evening', 'bedtime',
  'water', 'milk', 'oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical', 'sublingual',
  'take', 'with', 'dose', 'doses', 'dosing', 'prescribed', 'standard', 'clinical', 'regimen', 'target',
  'unit', 'units', 'site', 'deltoid', 'gluteal', 'anterolateral', 'thigh', 'im', 'iv', 'sc', 'po',
  'day0', 'day3', 'day7', 'day14', 'day28', 'd0', 'd3', 'd7', 'd14', 'd28',

  // Common Non-Salt English Words & Biological Stop Words
  'plus', 'forte', 'extra', 'sr', 'xl', 'xr', 'er', 'cr', 'dt', 'md', 'la', 'ds', 'sf', 'cz',
  'saline', 'dextrose', 'normal', 'water', 'sterile', 'distilled', 'fluid', 'solution',
  'vaccine', 'vaccines', 'toxoid', 'antiserum', 'antiserums', 'immunoglobulin', 'serum',
  'acid', 'sodium', 'potassium', 'calcium', 'chloride', 'sulfate', 'phosphate', 'acetate',
  'carbonate', 'citrate', 'hydrochloride', 'hcl', 'maleate', 'succinate', 'tartrate', 'fumarate',

  // Drug Class Keywords (Excluded from dynamic generic duplicate check because they are classes, not salts)
  'ppi', 'nsaid', 'ccb', 'macrolide', 'prokinetic', 'statin', 'beta-blocker', 'arb', 'ace-inhibitor',
  'benzodiazepine', 'opioid', 'antidepressant', 'anticonvulsant', 'antihistamine', 'azole-antifungal',
  'fluoroquinolone', 'cephalosporin', 'beta-lactam', 'nitroimidazole', 'corticosteroid',
  'anxiolytic', 'hypnotic', 'sedative', 'anticoagulant', 'antiplatelet', 'diuretic', 'biguanide',
  'sulfonylurea', 'dpp4-inhibitor', 'sglt2-inhibitor', 'neuropathic', 'muscle-relaxant', 'xanthine',
  'beta2-agonist', 'flu-vaccine', 'arv', 'hrig', 'erig', 'tcv', 'rabies-vaccine', 'rabies-immunoglobulin',
  'tetanus-toxoid'
]);

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
  // (Detects when the exact same generic salt e.g. "cefixime", "paracetamol", "amoxicillin" is prescribed twice)
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

      // Find common active ingredient keywords (excluding non-generic stop words, class keywords, & digits)
      const commonGenerics = drugA.keywords.filter(
        (k) =>
          drugB.keywords.includes(k) &&
          !NON_GENERIC_STOP_WORDS.has(k) &&
          k.length > 3 &&
          !/\d/.test(k)
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
      .filter((k) => k.length > 2 && !NON_GENERIC_STOP_WORDS.has(k));

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
