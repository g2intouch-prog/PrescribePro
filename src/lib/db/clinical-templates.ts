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
  keywords?: string; // Search aliases (e.g. cough, alkaliser, acidity, pain, fever)
  minAge?: number;
  maxAge?: number;
  minWeight?: number;
  maxWeight?: number;
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

export function calculatePediatricDose(weightKg: number): CalculatedPediatricDose[] {
  if (weightKg <= 0) return [];

  const pcmDoseMg = Math.round(weightKg * 15);
  const pcmMl250 = (pcmDoseMg / 50).toFixed(1);
  const pcmMl120 = (pcmDoseMg / 24).toFixed(1);
  const pcmDrops = (pcmDoseMg / 100).toFixed(1);

  const amoxDoseMg = Math.round(weightKg * 15);
  const amoxMl125 = (amoxDoseMg / 25).toFixed(1);

  const ibuDoseMg = Math.round(weightKg * 10);
  const ibuMl100 = (ibuDoseMg / 20).toFixed(1);

  const ondDoseMg = (weightKg * 0.15).toFixed(1);
  const ondMl = (parseFloat(ondDoseMg) / 0.4).toFixed(1);

  const aziDoseMg = Math.round(weightKg * 10);
  const aziMl200 = (aziDoseMg / 40).toFixed(1);

  return [
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
      drugName: 'Amoxicillin Dry Syrup (125mg/5ml)',
      recommendedDoseMg: amoxDoseMg,
      formulation: 'Syrup 125mg/5ml',
      calculatedVolumeMl: `${amoxMl125} ml`,
      frequency: 'Twice daily (b.d. for 5 days)',
      notes: `Target: 15mg/kg (${amoxDoseMg}mg per dose)`,
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
      drugName: 'Ondansetron Syrup (2mg/5ml)',
      recommendedDoseMg: parseFloat(ondDoseMg),
      formulation: 'Syrup 2mg/5ml',
      calculatedVolumeMl: `${ondMl} ml`,
      frequency: 'As needed for vomiting (S.O.S)',
      notes: `Target: 0.15mg/kg (${ondDoseMg}mg)`,
    },
  ];
}

// UNRESTRICTED USFDA & INDIAN PHARMACOPOEIA (IP) CLINICAL PHARMACOPEIA CATALOG
export const COMPREHENSIVE_GENERIC_DRUGS: DrugItem[] = [
  // ==========================================
  // 1. COMBINATION DRUGS & CLINICAL SEARCH ALIASES (COUGH, ALKALISER, ETC.)
  // ==========================================
  { id: 'cough1', genericName: 'Dextromethorphan + Chlorpheniramine + Phenylephrine (Dry Cough Syrup)', category: 'all', dosage: '10ml (t.d.s after food)', duration: '5 days', keywords: 'cough dry cough linctus cold congestion antihistamine' },
  { id: 'cough2', genericName: 'Ambroxol + Terbutaline + Guaifenesin (Wet / Productive Cough Expectorant)', category: 'all', dosage: '10ml (t.d.s after food)', duration: '5 days', keywords: 'cough wet cough productive cough expectorant phlegm mucus chest congestion' },
  { id: 'cough3', genericName: 'Levosalbutamol + Ambroxol + Guaifenesin Syrup', category: 'all', dosage: '5ml to 10ml (t.d.s)', duration: '5 days', keywords: 'cough bronchospasm asthma wheezing cough syrup expectorant' },
  { id: 'cough4', genericName: 'Codeine Phosphate + Chlorpheniramine Linctus', category: 'adult', dosage: '5ml (t.d.s for painful dry cough)', duration: '3 days', keywords: 'cough dry cough severe cough linctus', minAge: 18 },

  { id: 'alk1', genericName: 'Disodium Hydrogen Citrate (Systemic & Urinary Alkaliser Syrup 1.37g/5ml)', category: 'all', dosage: '2 teaspoonfuls (10ml) in 1 glass water t.d.s after meals', duration: '5 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria burning micturition kidney stone uric acid' },
  { id: 'alk2', genericName: 'Potassium Citrate + Citric Acid Oral Solution (Urinary Alkaliser)', category: 'all', dosage: '15ml in 1 glass water t.d.s after meals', duration: '7 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria stone citrate' },
  { id: 'alk3', genericName: 'Potassium Citrate + Magnesium Citrate + Pyridoxine Syrup (Urolithiasis Alkaliser)', category: 'adult', dosage: '10ml in glass of water b.d.', duration: '30 days', keywords: 'alkaliser alkalizer urinary alkaliser kidney stone urolithiasis citrate', minAge: 18 },
  { id: 'alk4', genericName: 'Disodium Hydrogen Citrate Syrup + Flavoxate 200mg (Alkaliser & Antispasmodic)', category: 'adult', dosage: '10ml syrup t.d.s + 1 tab Flavoxate t.d.s', duration: '5 days', keywords: 'alkaliser alkalizer urinary alkaliser dysuria spasm UTI', minAge: 18 },

  { id: 'fdc1', genericName: 'Aceclofenac + Paracetamol', category: 'adult', dosage: '100mg/325mg (1-0-1 after food)', duration: '5 days', keywords: 'pain fever inflammation', minAge: 12, minWeight: 40 },
  { id: 'fdc2', genericName: 'Aceclofenac + Paracetamol + Serratiopeptidase', category: 'adult', dosage: '100mg/325mg/15mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'fdc3', genericName: 'Aceclofenac + Paracetamol + Chlorzoxazone', category: 'adult', dosage: '100mg/325mg/250mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc4', genericName: 'Diclofenac Potassium + Paracetamol', category: 'adult', dosage: '50mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc5', genericName: 'Diclofenac + Serratiopeptidase', category: 'adult', dosage: '50mg/10mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'fdc6', genericName: 'Ibuprofen + Paracetamol', category: 'adult', dosage: '400mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc7', genericName: 'Mefenamic Acid + Paracetamol', category: 'adult', dosage: '500mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc8', genericName: 'Mefenamic Acid + Paracetamol (Syrup 100/125mg per 5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'fdc9', genericName: 'Tramadol + Paracetamol', category: 'adult', dosage: '37.5mg/325mg (1-0-1 S.O.S)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'fdc10', genericName: 'Etoricoxib + Thiocolchicoside', category: 'adult', dosage: '60mg/4mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'fdc11', genericName: 'Trypsin + Chymotrypsin (Chymoral Forte)', category: 'adult', dosage: '100,000 Armour units (1-1-1 30m before food)', duration: '5 days', minAge: 12 },
  { id: 'fdc12', genericName: 'Pantoprazole + Domperidone SR', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'fdc13', genericName: 'Pantoprazole + Levosulpiride SR', category: 'adult', dosage: '40mg/75mg SR (1-0-0 before food)', duration: '14 days', minAge: 18 },
  { id: 'fdc14', genericName: 'Rabeprazole + Domperidone SR', category: 'adult', dosage: '20mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'fdc15', genericName: 'Rabeprazole + Levosulpiride SR', category: 'adult', dosage: '20mg/75mg SR (1-0-0 before food)', duration: '14 days', minAge: 18 },
  { id: 'fdc16', genericName: 'Omeprazole + Domperidone', category: 'adult', dosage: '20mg/10mg (1-0-0 before food)', duration: '7 days', minAge: 12 },
  { id: 'fdc17', genericName: 'Esomeprazole + Domperidone SR', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'fdc18', genericName: 'Dicyclomine + Paracetamol', category: 'adult', dosage: '20mg/500mg (1-0-1 S.O.S for abdominal spasms)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc19', genericName: 'Drotaverine + Mefenamic Acid', category: 'adult', dosage: '80mg/250mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'fdc20', genericName: 'Amoxicillin + Clavulanic Acid (Augmentin 625mg)', category: 'adult', dosage: '500mg/125mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'fdc21', genericName: 'Amoxicillin + Clavulanate (Dry Syrup 228mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
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
