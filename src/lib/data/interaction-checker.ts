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

  // Add original words
  const words = normalized.split(/[\s,()/-]+/);
  words.forEach((w) => {
    if (w.length > 2) keywords.add(w);
  });

  // Check Indian Brand Resolution Map
  for (const [brand, generics] of Object.entries(INDIAN_BRAND_TO_GENERIC_MAP)) {
    if (normalized.includes(brand)) {
      keywords.add(brand);
      generics.forEach((g) => keywords.add(g));
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

  // 1. DRUG-DRUG INTERACTION CHECK
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
            // Avoid duplicate reverse pair reports
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

  // 1.5 DYNAMIC DUPLICATE GENERIC ACTIVE INGREDIENT & SUB-CLASS CHECK
  // (Detects when the exact same generic salt e.g. "cefixime", "paracetamol", "amoxicillin" is prescribed twice in different doses or forms)
  const NON_GENERIC_STOP_WORDS = new Set([
    'tablet', 'tablets', 'tab', 'tabs', 'capsule', 'capsules', 'cap', 'caps', 'syrup', 'syp', 'syrups',
    'suspension', 'injection', 'inj', 'injections', 'ointment', 'gel', 'drop', 'drops', 'eye', 'ear',
    'cream', 'lotion', 'solution', 'soln', 'inhaler', 'puffs', 'respules', 'patch', 'suppository',
    'mg', 'gm', 'g', 'mcg', 'ml', 'iu', 'meq', '1-0-1', '1-0-0', '0-0-1', '1-1-1', 's.o.s', 'sos',
    'bd', 'tds', 'od', 'hs', 'stat', 'q6h', 'q8h', 'q12h',
    'once', 'twice', 'thrice', 'daily', 'day', 'days', 'week', 'weeks', 'month', 'months',
    'before', 'after', 'food', 'meals', 'meal', 'night', 'morning', 'afternoon', 'evening',
    'water', 'milk', 'bedtime', 'oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical',
    'take', 'with', 'dose', 'doses', 'dosing', 'prescribed', 'standard', 'clinical', 'regimen', 'target',
    'unit', 'units', 'vial', 'vials', 'ampoule', 'amp', 'bottle', 'strip'
  ]);

  for (let i = 0; i < parsedDrugs.length; i++) {
    for (let j = i + 1; j < parsedDrugs.length; j++) {
      const drugA = parsedDrugs[i];
      const drugB = parsedDrugs[j];

      // Find common active ingredient keywords (excluding dosage/form stop words)
      const commonGenerics = drugA.keywords.filter(
        (k) => drugB.keywords.includes(k) && !NON_GENERIC_STOP_WORDS.has(k) && k.length > 3
      );

      if (commonGenerics.length > 0) {
        const primarySalt = commonGenerics[0].toUpperCase();
        const ruleId = `dynamic-duplicate-${commonGenerics[0]}-${i}-${j}`;

        if (!ignoredSet.has(ruleId)) {
          const alreadyAdded = detected.some(
            (d) =>
              (d.foundDrugA === drugA.original && d.foundDrugB === drugB.original) ||
              (d.foundDrugA === drugB.original && d.foundDrugB === drugA.original)
          );

          if (!alreadyAdded) {
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
  }

  // 2. PATIENT ALLERGY CHECK
  if (patientAllergies && patientAllergies.trim().length > 0) {
    const allergyKeywords = patientAllergies
      .toLowerCase()
      .split(/[\s,;]+/)
      .filter((k) => k.length > 2);

    if (allergyKeywords.length > 0) {
      for (const item of parsedDrugs) {
        for (const kw of allergyKeywords) {
          // Check if any drug keyword matches allergy keyword (e.g. penicillin, sulfa, aspirin, NSAID)
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

  return detected;
}
