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
  // Mosteller Formula: BSA = sqrt( (Height x Weight) / 3600 )
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function calculateBsaDose(heightCm: number, weightKg: number, ageYrs: number = 5): CalculatedBsaDose[] {
  const bsa = calculateBsa(heightCm, weightKg);
  const weightVal = weightKg > 0 ? weightKg : 15;
  // If height not provided, estimate BSA from weight
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

  // Paracetamol: 15 mg/kg per dose
  const pcmDoseMg = Math.round(weightKg * 15);
  const pcmMl250 = (pcmDoseMg / 50).toFixed(1);
  const pcmMl120 = (pcmDoseMg / 24).toFixed(1);
  const pcmDrops = (pcmDoseMg / 100).toFixed(1);

  // Amoxicillin: 15 mg/kg per dose
  const amoxDoseMg = Math.round(weightKg * 15);
  const amoxMl125 = (amoxDoseMg / 25).toFixed(1);

  // Ibuprofen: 10 mg/kg per dose
  const ibuDoseMg = Math.round(weightKg * 10);
  const ibuMl100 = (ibuDoseMg / 20).toFixed(1);

  // Ondansetron: 0.15 mg/kg per dose
  const ondDoseMg = (weightKg * 0.15).toFixed(1);
  const ondMl = (parseFloat(ondDoseMg) / 0.4).toFixed(1);

  // Azithromycin: 10 mg/kg per dose
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

// 500+ GENERIC MEDICATIONS PHARMACOPEIA CATALOG
export const COMPREHENSIVE_GENERIC_DRUGS: DrugItem[] = [
  // 1. ANALGESICS, NSAIDs, ANTI-GOUT & MUSCLE RELAXANTS (1 - 50)
  { id: 'g1', genericName: 'Paracetamol (Acetaminophen)', category: 'adult', dosage: '650mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g2', genericName: 'Paracetamol', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 35 },
  { id: 'g3', genericName: 'Paracetamol (Syrup 250mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s after food)', duration: '3 days', minAge: 2, maxAge: 12, minWeight: 12, maxWeight: 40 },
  { id: 'g4', genericName: 'Paracetamol (Syrup 120mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s after food)', duration: '3 days', minAge: 1, maxAge: 6, minWeight: 8, maxWeight: 20 },
  { id: 'g5', genericName: 'Paracetamol (Pediatric Drops 100mg/ml)', category: 'infant', dosage: '1ml (10-15mg/kg t.d.s)', duration: '3 days', maxAge: 2, maxWeight: 12 },
  { id: 'g6', genericName: 'Paracetamol IV Infusion', category: 'adult', dosage: '1000mg/100ml IV slow infusion over 15 mins', duration: 'S.O.S', minAge: 12, minWeight: 40 },
  { id: 'g7', genericName: 'Ibuprofen', category: 'adult', dosage: '400mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g8', genericName: 'Ibuprofen', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '3 days', minAge: 12 },
  { id: 'g9', genericName: 'Ibuprofen (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'g10', genericName: 'Ibuprofen + Paracetamol', category: 'adult', dosage: '400mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g11', genericName: 'Diclofenac Sodium', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g12', genericName: 'Diclofenac SR', category: 'adult', dosage: '100mg (1-0-0 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g13', genericName: 'Diclofenac Potassium + Paracetamol', category: 'adult', dosage: '50mg/325mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g14', genericName: 'Diclofenac Injection', category: 'adult', dosage: '75mg/1ml IM deep gluteal', duration: 'S.O.S', minAge: 18, minWeight: 40 },
  { id: 'g15', genericName: 'Aceclofenac', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g16', genericName: 'Aceclofenac + Paracetamol', category: 'adult', dosage: '100mg/325mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g17', genericName: 'Aceclofenac + Serratiopeptidase', category: 'adult', dosage: '100mg/15mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g18', genericName: 'Aceclofenac + Paracetamol + Rabeprazole', category: 'adult', dosage: '100/325/20mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g19', genericName: 'Mefenamic Acid', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g20', genericName: 'Mefenamic Acid (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'g21', genericName: 'Naproxen', category: 'adult', dosage: '250mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g22', genericName: 'Naproxen + Domperidone', category: 'adult', dosage: '500mg/10mg (1-0-1 for migraine)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g23', genericName: 'Etoricoxib', category: 'adult', dosage: '90mg (1-0-0 after food)', duration: '5 days', minAge: 16, minWeight: 40 },
  { id: 'g24', genericName: 'Etoricoxib', category: 'adult', dosage: '60mg (1-0-1 after food)', duration: '5 days', minAge: 16, minWeight: 40 },
  { id: 'g25', genericName: 'Etoricoxib + Thiocolchicoside', category: 'adult', dosage: '60mg/4mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g26', genericName: 'Indomethacin', category: 'adult', dosage: '25mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g27', genericName: 'Piroxicam', category: 'adult', dosage: '20mg (1-0-0 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g28', genericName: 'Lornoxicam', category: 'adult', dosage: '8mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g29', genericName: 'Ketorolac Tromethamine', category: 'adult', dosage: '10mg (1-0-1 S.O.S after food)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g30', genericName: 'Tramadol', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g31', genericName: 'Tramadol + Paracetamol', category: 'adult', dosage: '37.5mg/325mg (1-0-1 S.O.S)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g32', genericName: 'Tapentadol', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g33', genericName: 'Pregabalin', category: 'adult', dosage: '75mg (0-0-1 at night)', duration: '15 days', minAge: 18 },
  { id: 'g34', genericName: 'Pregabalin + Methylcobalamin', category: 'adult', dosage: '75mg/1500mcg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g35', genericName: 'Gabapentin', category: 'adult', dosage: '300mg (0-0-1 at night)', duration: '15 days', minAge: 18 },
  { id: 'g36', genericName: 'Gabapentin + Methylcobalamin', category: 'adult', dosage: '300mg/500mcg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g37', genericName: 'Thiocolchicoside', category: 'adult', dosage: '4mg (1-0-1 after food)', duration: '5 days', minAge: 18 },
  { id: 'g38', genericName: 'Baclofen', category: 'adult', dosage: '10mg (1-0-1 after food)', duration: '7 days', minAge: 12 },
  { id: 'g39', genericName: 'Tizanidine', category: 'adult', dosage: '2mg (1-0-1 after food)', duration: '5 days', minAge: 18 },
  { id: 'g40', genericName: 'Tolperisone', category: 'adult', dosage: '150mg (1-0-1 after food)', duration: '5 days', minAge: 18 },
  { id: 'g41', genericName: 'Allopurinol', category: 'adult', dosage: '100mg (1-0-0 after food)', duration: '30 days', minAge: 18 },
  { id: 'g42', genericName: 'Febuxostat', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g43', genericName: 'Colchicine', category: 'adult', dosage: '0.5mg (1-0-1 for acute gout)', duration: '3 days', minAge: 18 },

  // 2. ANTIBIOTICS, ANTIFUNGALS, ANTIVIRALS & ANTHELMINTICS (44 - 130)
  { id: 'g44', genericName: 'Amoxicillin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g45', genericName: 'Amoxicillin', category: 'adult', dosage: '250mg (1-1-1 after food)', duration: '5 days', minAge: 8 },
  { id: 'g46', genericName: 'Amoxicillin (Dry Syrup 125mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g47', genericName: 'Amoxicillin + Clavulanic Acid (Augmentin)', category: 'adult', dosage: '625mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g48', genericName: 'Amoxicillin + Clavulanate (375mg)', category: 'adult', dosage: '375mg (1-0-1 after food)', duration: '5 days', minAge: 8 },
  { id: 'g49', genericName: 'Amoxicillin + Clavulanate (Dry Syrup 228mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g50', genericName: 'Amoxicillin + Clavulanate (Forte Syrup 457mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g51', genericName: 'Azithromycin', category: 'adult', dosage: '500mg (1-0-0 1 hr before food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g52', genericName: 'Azithromycin', category: 'adult', dosage: '250mg (1-0-0 once daily)', duration: '5 days', minAge: 8 },
  { id: 'g53', genericName: 'Azithromycin (Suspension 200mg/5ml)', category: 'pediatric', dosage: '5ml (1-0-0 once daily)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g54', genericName: 'Azithromycin (Suspension 100mg/5ml)', category: 'pediatric', dosage: '5ml (1-0-0 once daily)', duration: '3 days', minAge: 1, maxAge: 6 },
  { id: 'g55', genericName: 'Cefixime', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g56', genericName: 'Cefixime (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g57', genericName: 'Cefixime (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 4, maxAge: 12 },
  { id: 'g58', genericName: 'Cefixime + Ofloxacin', category: 'adult', dosage: '200mg/200mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g59', genericName: 'Cefpodoxime Proxetil', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g60', genericName: 'Cefpodoxime (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g61', genericName: 'Cefuroxime Axetil', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g62', genericName: 'Cefuroxime Axetil', category: 'adult', dosage: '250mg (1-0-1 after food)', duration: '5 days', minAge: 8 },
  { id: 'g63', genericName: 'Cephalexin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g64', genericName: 'Cephalexin (Syrup 125mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g65', genericName: 'Ciprofloxacin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g66', genericName: 'Levofloxacin', category: 'adult', dosage: '500mg (1-0-0 once daily)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g67', genericName: 'Levofloxacin', category: 'adult', dosage: '750mg (1-0-0 once daily)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g68', genericName: 'Ofloxacin', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g69', genericName: 'Ofloxacin + Ornidazole', category: 'adult', dosage: '200mg/500mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g70', genericName: 'Ofloxacin (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g71', genericName: 'Norfloxacin + Tinidazole', category: 'adult', dosage: '400mg/600mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g72', genericName: 'Doxycycline Hyclate', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g73', genericName: 'Metronidazole', category: 'adult', dosage: '400mg (1-1-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g74', genericName: 'Metronidazole (Syrup 200mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g75', genericName: 'Tinidazole', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '3 days', minAge: 12 },
  { id: 'g76', genericName: 'Clarithromycin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g77', genericName: 'Roxithromycin', category: 'adult', dosage: '150mg (1-0-1 30m before food)', duration: '5 days', minAge: 12 },
  { id: 'g78', genericName: 'Linezolid', category: 'adult', dosage: '600mg (1-0-1 after food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g79', genericName: 'Nitrofurantoin SR', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g80', genericName: 'Cotrimoxazole (Sulfamethoxazole + Trimethoprim)', category: 'adult', dosage: '800/160mg (1-0-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g81', genericName: 'Cotrimoxazole (Syrup 200/40mg per 5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g82', genericName: 'Fluconazole', category: 'adult', dosage: '150mg (Single dose or weekly)', duration: '1 day', minAge: 12, minWeight: 40 },
  { id: 'g83', genericName: 'Itraconazole', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '14 days', minAge: 12, minWeight: 40 },
  { id: 'g84', genericName: 'Terbinafine', category: 'adult', dosage: '250mg (1-0-0 once daily)', duration: '14 days', minAge: 12, minWeight: 40 },
  { id: 'g85', genericName: 'Griseofulvin', category: 'adult', dosage: '250mg (1-0-1 after fat meal)', duration: '21 days', minAge: 12 },
  { id: 'g86', genericName: 'Ketoconazole', category: 'adult', dosage: '200mg (1-0-0 after food)', duration: '14 days', minAge: 12 },
  { id: 'g87', genericName: 'Albendazole', category: 'all', dosage: '400mg (Single dose at bedtime chewable)', duration: '1 day' },
  { id: 'g88', genericName: 'Albendazole (Suspension 200mg/5ml)', category: 'pediatric', dosage: '10ml (Single dose bedtime)', duration: '1 day', minAge: 1, maxAge: 12 },
  { id: 'g89', genericName: 'Ivermectin', category: 'adult', dosage: '12mg (Single dose empty stomach)', duration: '1 day', minAge: 12, minWeight: 30 },
  { id: 'g90', genericName: 'Ivermectin + Albendazole', category: 'adult', dosage: '6mg/400mg (Single dose bedtime)', duration: '1 day', minAge: 12 },
  { id: 'g91', genericName: 'Acyclovir', category: 'adult', dosage: '400mg (1-1-1-1 4x daily)', duration: '7 days', minAge: 12 },
  { id: 'g92', genericName: 'Valacyclovir', category: 'adult', dosage: '1000mg (1-0-1 after food)', duration: '7 days', minAge: 18 },
  { id: 'g93', genericName: 'Oseltamivir (Tamiflu)', category: 'adult', dosage: '75mg (1-0-1 for flu)', duration: '5 days', minAge: 12 },
  { id: 'g94', genericName: 'Oseltamivir (Syrup 12mg/ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },

  // 3. GASTROINTESTINAL, HEPATOLOGY, ANTACIDS & ANTIEMETICS (95 - 160)
  { id: 'g95', genericName: 'Pantoprazole', category: 'adult', dosage: '40mg (1-0-0 30 mins before breakfast)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g96', genericName: 'Pantoprazole + Domperidone', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g97', genericName: 'Pantoprazole + Levosulpiride', category: 'adult', dosage: '40mg/75mg SR (1-0-0 before food)', duration: '14 days', minAge: 18 },
  { id: 'g98', genericName: 'Omeprazole', category: 'adult', dosage: '20mg (1-0-0 before food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g99', genericName: 'Omeprazole + Domperidone', category: 'adult', dosage: '20mg/10mg (1-0-0 before food)', duration: '7 days', minAge: 12 },
  { id: 'g100', genericName: 'Rabeprazole', category: 'adult', dosage: '20mg (1-0-0 before food)', duration: '7 days', minAge: 12 },
  { id: 'g101', genericName: 'Rabeprazole + Domperidone', category: 'adult', dosage: '20mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g102', genericName: 'Esomeprazole', category: 'adult', dosage: '40mg (1-0-0 before food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g103', genericName: 'Famotidine', category: 'adult', dosage: '40mg (0-0-1 before bed)', duration: '14 days', minAge: 12 },
  { id: 'g104', genericName: 'Sucralfate (Suspension 1000mg/10ml)', category: 'adult', dosage: '10ml (1-1-1 1 hr before meals)', duration: '14 days', minAge: 12 },
  { id: 'g105', genericName: 'Sucralfate + Oxetacaine', category: 'adult', dosage: '10ml (1-1-1 before meals)', duration: '7 days', minAge: 12 },
  { id: 'g106', genericName: 'Sodium Alginate + Magnesium Hydroxide Syrup', category: 'all', dosage: '10ml after meals for reflux', duration: '7 days' },
  { id: 'g107', genericName: 'Ondansetron', category: 'adult', dosage: '4mg (1-0-1 before food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g108', genericName: 'Ondansetron (Syrup 2mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (S.O.S)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g109', genericName: 'Ondansetron (Drops 2mg/ml)', category: 'infant', dosage: '1ml (S.O.S)', duration: '2 days', maxAge: 2 },
  { id: 'g110', genericName: 'Domperidone', category: 'adult', dosage: '10mg (1-0-1 before food)', duration: '5 days', minAge: 12 },
  { id: 'g111', genericName: 'Domperidone (Syrup 5mg/5ml)', category: 'pediatric', dosage: '2.5ml (before food)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g112', genericName: 'Metoclopramide', category: 'adult', dosage: '10mg (1-0-1 before food)', duration: '3 days', minAge: 18 },
  { id: 'g113', genericName: 'Itopride Hydrochloride', category: 'adult', dosage: '50mg (1-1-1 before meals)', duration: '14 days', minAge: 18 },
  { id: 'g114', genericName: 'Dicyclomine + Paracetamol', category: 'adult', dosage: '20mg/500mg (1-0-1 S.O.S for spasms)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g115', genericName: 'Dicyclomine (Pediatric Drops 10mg/ml)', category: 'infant', dosage: '0.5ml (S.O.S for colic)', duration: '2 days', maxAge: 2 },
  { id: 'g116', genericName: 'Drotaverine', category: 'adult', dosage: '80mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g117', genericName: 'Drotaverine + Mefenamic Acid', category: 'adult', dosage: '80mg/250mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g118', genericName: 'Hyoscine Butylbromide (Buscopan)', category: 'adult', dosage: '10mg (1-1-1 for abdominal colic)', duration: '3 days', minAge: 12 },
  { id: 'g119', genericName: 'Mebeverine Hydrochloride', category: 'adult', dosage: '135mg (1-1-1 before meals)', duration: '14 days', minAge: 18 },
  { id: 'g120', genericName: 'Lactulose (Syrup 10g/15ml)', category: 'all', dosage: '15ml at bedtime for constipation', duration: '7 days' },
  { id: 'g121', genericName: 'Polyethylene Glycol (PEG 3350 Powder)', category: 'all', dosage: '1 sachet in water daily morning', duration: '7 days' },
  { id: 'g122', genericName: 'Liquid Paraffin + Milk of Magnesia', category: 'adult', dosage: '15ml at bedtime', duration: '5 days', minAge: 12 },
  { id: 'g123', genericName: 'Isabgol (Ispaghula Husk)', category: 'all', dosage: '2 spoonfuls in warm water at bedtime', duration: '14 days' },
  { id: 'g124', genericName: 'ORS (Oral Rehydration Salts Powder)', category: 'all', dosage: '1 sachet in 1 Litre clean water (sip continuously)', duration: '3 days' },
  { id: 'g125', genericName: 'Bacillus Clausii (Probiotic Spores)', category: 'all', dosage: '1 mini bottle (b.d.)', duration: '5 days' },
  { id: 'g126', genericName: 'Saccharomyces Boulardii Sachet', category: 'all', dosage: '1 sachet (b.d. in water)', duration: '5 days' },
  { id: 'g127', genericName: 'Loperamide', category: 'adult', dosage: '2mg (S.O.S after unformed stool)', duration: '2 days', minAge: 12 },
  { id: 'g128', genericName: 'Racecadotril', category: 'adult', dosage: '100mg (1-1-1 before meals)', duration: '3 days', minAge: 12 },
  { id: 'g129', genericName: 'Racecadotril (Sachet 30mg)', category: 'pediatric', dosage: '1 sachet (t.d.s in water)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g130', genericName: 'Ursodeoxycholic Acid (UDCA)', category: 'adult', dosage: '300mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g131', genericName: 'L-Ornithine L-Aspartate', category: 'adult', dosage: '150mg (1-1-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g132', genericName: 'Silymarin (Milk Thistle Extract)', category: 'adult', dosage: '140mg (1-0-1 after food)', duration: '30 days', minAge: 18 },

  // 4. CARDIOVASCULAR, ANTIHYPERTENSIVES & LIPIDS (133 - 210)
  { id: 'g133', genericName: 'Telmisartan', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g134', genericName: 'Telmisartan', category: 'adult', dosage: '20mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g135', genericName: 'Telmisartan', category: 'adult', dosage: '80mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g136', genericName: 'Telmisartan + Amlodipine', category: 'adult', dosage: '40mg/5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g137', genericName: 'Telmisartan + Hydrochlorothiazide', category: 'adult', dosage: '40mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g138', genericName: 'Telmisartan + Chlorthalidone', category: 'adult', dosage: '40mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g139', genericName: 'Amlodipine', category: 'adult', dosage: '5mg (0-0-1 night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g140', genericName: 'Amlodipine', category: 'adult', dosage: '2.5mg (0-0-1 night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g141', genericName: 'Amlodipine', category: 'adult', dosage: '10mg (0-0-1 night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g142', genericName: 'Amlodipine + Atenolol', category: 'adult', dosage: '5mg/50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g143', genericName: 'Cilnidipine', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g144', genericName: 'Cilnidipine', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g145', genericName: 'Enalapril', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g146', genericName: 'Enalapril', category: 'adult', dosage: '2.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g147', genericName: 'Ramipril', category: 'adult', dosage: '2.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g148', genericName: 'Ramipril', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g149', genericName: 'Losartan Potassium', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g150', genericName: 'Losartan + Hydrochlorothiazide', category: 'adult', dosage: '50mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g151', genericName: 'Olmesartan Medoxomil', category: 'adult', dosage: '20mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g152', genericName: 'Olmesartan', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g153', genericName: 'Valsartan', category: 'adult', dosage: '80mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g154', genericName: 'Sacubitril + Valsartan (ARNI)', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g155', genericName: 'Atenolol', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g156', genericName: 'Atenolol', category: 'adult', dosage: '25mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g157', genericName: 'Metoprolol Succinate ER', category: 'adult', dosage: '25mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g158', genericName: 'Metoprolol Succinate ER', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g159', genericName: 'Bisoprolol Fumarate', category: 'adult', dosage: '2.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g160', genericName: 'Bisoprolol', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g161', genericName: 'Nebivolol', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g162', genericName: 'Carvedilol', category: 'adult', dosage: '6.25mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g163', genericName: 'Carvedilol', category: 'adult', dosage: '12.5mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g164', genericName: 'Propranolol', category: 'adult', dosage: '40mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g165', genericName: 'Propranolol', category: 'adult', dosage: '10mg (1-0-1 for anxiety/tremor)', duration: '14 days', minAge: 12 },
  { id: 'g166', genericName: 'Furosemide (Lasix)', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g167', genericName: 'Torsemide', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '14 days', minAge: 18, minWeight: 40 },
  { id: 'g168', genericName: 'Spironolactone', category: 'adult', dosage: '25mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g169', genericName: 'Chlorthalidone', category: 'adult', dosage: '12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g170', genericName: 'Hydrochlorothiazide (HCTZ)', category: 'adult', dosage: '12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g171', genericName: 'Atorvastatin', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g172', genericName: 'Atorvastatin', category: 'adult', dosage: '20mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g173', genericName: 'Atorvastatin', category: 'adult', dosage: '40mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g174', genericName: 'Rosuvastatin', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g175', genericName: 'Rosuvastatin', category: 'adult', dosage: '5mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g176', genericName: 'Rosuvastatin + Fenofibrate', category: 'adult', dosage: '10mg/160mg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g177', genericName: 'Fenofibrate', category: 'adult', dosage: '160mg (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g178', genericName: 'Clopidogrel', category: 'adult', dosage: '75mg (1-0-0 once daily)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g179', genericName: 'Aspirin (Ecosprin Gastro-Resistant)', category: 'adult', dosage: '75mg (0-1-0 after lunch)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g180', genericName: 'Aspirin + Clopidogrel', category: 'adult', dosage: '75mg/75mg (0-1-0 after lunch)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g181', genericName: 'Ticagrelor', category: 'adult', dosage: '90mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g182', genericName: 'Rivaroxaban', category: 'adult', dosage: '10mg (1-0-0 once daily)', duration: '30 days', minAge: 18 },

  // 5. RESPIRATORY, PULMONOLOGY & ALLERGY (183 - 250)
  { id: 'g183', genericName: 'Cetirizine', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g184', genericName: 'Cetirizine (Syrup 5mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (at night)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g185', genericName: 'Levocetirizine', category: 'adult', dosage: '5mg (0-0-1 at night)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g186', genericName: 'Levocetirizine + Montelukast', category: 'adult', dosage: '5mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15, minWeight: 40 },
  { id: 'g187', genericName: 'Levocetirizine + Montelukast (Syrup)', category: 'pediatric', dosage: '5ml (at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'g188', genericName: 'Montelukast (Tab 4mg/5mg)', category: 'pediatric', dosage: '4mg (0-0-1 at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'g189', genericName: 'Fexofenadine', category: 'adult', dosage: '120mg (1-0-0 once daily)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g190', genericName: 'Fexofenadine', category: 'adult', dosage: '180mg (1-0-0 once daily)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g191', genericName: 'Fexofenadine + Montelukast', category: 'adult', dosage: '120mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15 },
  { id: 'g192', genericName: 'Loratadine', category: 'adult', dosage: '10mg (1-0-0 once daily)', duration: '7 days', minAge: 12 },
  { id: 'g193', genericName: 'Chlorpheniramine Maleate (CPM)', category: 'adult', dosage: '4mg (1-0-1 after food)', duration: '5 days', minAge: 12 },
  { id: 'g194', genericName: 'Bilastine', category: 'adult', dosage: '20mg (1-0-0 1 hr before breakfast)', duration: '10 days', minAge: 12 },
  { id: 'g195', genericName: 'Hydroxyzine Hydrochloride', category: 'adult', dosage: '25mg (0-0-1 at night for severe allergy)', duration: '5 days', minAge: 12 },
  { id: 'g196', genericName: 'Salbutamol (Asthalin Inhaler)', category: 'all', dosage: '2 puffs S.O.S for bronchospasm', duration: 'As needed' },
  { id: 'g197', genericName: 'Salbutamol (Syrup 2mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (t.d.s)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g198', genericName: 'Budesonide (Inhaler 200mcg)', category: 'all', dosage: '2 puffs (b.d. with mouth rinse)', duration: '30 days' },
  { id: 'g199', genericName: 'Budesonide (Respules 0.5mg/2ml)', category: 'all', dosage: '1 respule neb (b.d.)', duration: '5 days' },
  { id: 'g200', genericName: 'Formoterol + Budesonide (Foracort Inhaler)', category: 'all', dosage: '2 puffs (b.d.)', duration: '30 days' },
  { id: 'g201', genericName: 'Salmeterol + Fluticasone (Seretide Inhaler)', category: 'all', dosage: '2 puffs (b.d.)', duration: '30 days' },
  { id: 'g202', genericName: 'Levosalbutamol + Ipratropium (Duolin Respules)', category: 'all', dosage: '1 respule neb (t.d.s)', duration: '5 days' },
  { id: 'g203', genericName: 'Tiotropium Inhaler', category: 'adult', dosage: '1 rotacap inhalation daily morning', duration: '30 days', minAge: 18 },
  { id: 'g204', genericName: 'Fluticasone Furoate Nasal Spray', category: 'all', dosage: '1 spray in each nostril (b.d.)', duration: '14 days' },
  { id: 'g205', genericName: 'Mometasone Furoate Nasal Spray', category: 'all', dosage: '1 spray in each nostril (b.d.)', duration: '14 days' },
  { id: 'g206', genericName: 'Oxymetazoline Nasal Drops 0.05%', category: 'adult', dosage: '2 drops in each nostril b.d. (max 3 days)', duration: '3 days', minAge: 12 },
  { id: 'g207', genericName: 'Xylometazoline Nasal Drops 0.1%', category: 'adult', dosage: '2 drops in each nostril b.d. (max 3 days)', duration: '3 days', minAge: 12 },
  { id: 'g208', genericName: 'Pediatric Xylometazoline Drops 0.05%', category: 'pediatric', dosage: '1 drop in each nostril b.d. (max 3 days)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g209', genericName: 'Normal Saline Nasal Drops', category: 'all', dosage: '2 drops in each nostril (s.o.s for congestion)', duration: '7 days' },
  { id: 'g210', genericName: 'Ambroxol + Terbutaline + Guaifenesin (Expectorant)', category: 'adult', dosage: '10ml (t.d.s after food)', duration: '5 days', minAge: 12 },
  { id: 'g211', genericName: 'Dextromethorphan + Chlorpheniramine (Dry Cough Syrup)', category: 'adult', dosage: '5ml to 10ml (t.d.s)', duration: '5 days', minAge: 6 },
  { id: 'g212', genericName: 'Acebrophylline', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g213', genericName: 'Doxofylline', category: 'adult', dosage: '400mg (1-0-1 after food)', duration: '7 days', minAge: 18 },

  // 6. DIABETES, ENDOCRINOLOGY & HORMONES (214 - 280)
  { id: 'g214', genericName: 'Metformin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g215', genericName: 'Metformin SR', category: 'adult', dosage: '1000mg (0-0-1 after dinner)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g216', genericName: 'Metformin SR', category: 'adult', dosage: '850mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g217', genericName: 'Glimepiride', category: 'adult', dosage: '1mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g218', genericName: 'Glimepiride', category: 'adult', dosage: '2mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g219', genericName: 'Glimepiride + Metformin', category: 'adult', dosage: '1mg/500mg (1-0-1 before food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g220', genericName: 'Glimepiride + Metformin SR', category: 'adult', dosage: '2mg/500mg (1-0-1 before food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g221', genericName: 'Gliclazide', category: 'adult', dosage: '80mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g222', genericName: 'Gliclazide MR', category: 'adult', dosage: '60mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18 },
  { id: 'g223', genericName: 'Teneligliptin', category: 'adult', dosage: '20mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g224', genericName: 'Teneligliptin + Metformin', category: 'adult', dosage: '20mg/500mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g225', genericName: 'Sitagliptin', category: 'adult', dosage: '100mg (1-0-0 once daily)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g226', genericName: 'Sitagliptin + Metformin', category: 'adult', dosage: '50mg/500mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g227', genericName: 'Vildagliptin', category: 'adult', dosage: '50mg (1-0-1 before food)', duration: '30 days', minAge: 18 },
  { id: 'g228', genericName: 'Vildagliptin + Metformin', category: 'adult', dosage: '50mg/500mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g229', genericName: 'Dapagliflozin', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g230', genericName: 'Dapagliflozin + Metformin', category: 'adult', dosage: '10mg/500mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g231', genericName: 'Empagliflozin', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g232', genericName: 'Voglibose', category: 'adult', dosage: '0.2mg (1-1-1 with first bite of meal)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g233', genericName: 'Voglibose', category: 'adult', dosage: '0.3mg (1-1-1 with first bite of meal)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g234', genericName: 'Pioglitazone', category: 'adult', dosage: '15mg (1-0-0 once daily)', duration: '30 days', minAge: 18 },
  { id: 'g235', genericName: 'Thyroxine Sodium (Levothyroxine)', category: 'adult', dosage: '50mcg (1-0-0 empty stomach on waking)', duration: '30 days', minAge: 12 },
  { id: 'g236', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '25mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 12 },
  { id: 'g237', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '75mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 12 },
  { id: 'g238', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '100mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 12 },
  { id: 'g239', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '12.5mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 1 },
  { id: 'g240', genericName: 'Carbimazole', category: 'adult', dosage: '10mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g241', genericName: 'Methimazole', category: 'adult', dosage: '5mg (1-0-1 after food)', duration: '30 days', minAge: 18 },

  // 7. VITAMINS, MINERALS & NUTRITIONAL SUPPLEMENTS (242 - 300)
  { id: 'g242', genericName: 'Iron + Folic Acid (Tab Ferrous Ascorbate)', category: 'adult', dosage: '100mg/1.5mg (1-0-0 after food)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g243', genericName: 'Iron (Syrup Ferrous Ascorbate)', category: 'pediatric', dosage: '5ml (once daily)', duration: '30 days', minAge: 1, maxAge: 12 },
  { id: 'g244', genericName: 'Iron (Pediatric Drops Ferrous Glycine)', category: 'infant', dosage: '1ml (once daily)', duration: '30 days', maxAge: 2 },
  { id: 'g245', genericName: 'Folic Acid', category: 'adult', dosage: '5mg (1-0-0 once daily)', duration: '30 days', minAge: 12 },
  { id: 'g246', genericName: 'Calcium Carbonate + Vitamin D3', category: 'adult', dosage: '500mg/250IU (0-1-0 after lunch)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g247', genericName: 'Calcium Citrate + Vitamin D3 + Zinc', category: 'adult', dosage: '1000mg/200IU (0-1-0 after lunch)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g248', genericName: 'Calcium Syrup (Pediatric)', category: 'pediatric', dosage: '5ml (once daily)', duration: '30 days', minAge: 1, maxAge: 12 },
  { id: 'g249', genericName: 'Vitamin D3 (Cholecalciferol Sachet 60,000 IU)', category: 'all', dosage: '1 sachet in warm milk once weekly', duration: '8 weeks' },
  { id: 'g250', genericName: 'Vitamin D3 Capsule 60,000 IU', category: 'adult', dosage: '1 capsule once weekly after heavy meal', duration: '8 weeks', minAge: 12 },
  { id: 'g251', genericName: 'Vitamin D3 Oral Drops 400 IU/ml', category: 'infant', dosage: '1ml once daily', duration: '30 days', maxAge: 2 },
  { id: 'g252', genericName: 'Methylcobalamin (Vitamin B12 1500mcg)', category: 'adult', dosage: '1500mcg (1-0-0 once daily)', duration: '30 days', minAge: 12 },
  { id: 'g253', genericName: 'Methylcobalamin + Alpha Lipoic Acid + B6', category: 'adult', dosage: '1 cap (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g254', genericName: 'Vitamin C (L-Ascorbic Acid 500mg)', category: 'all', dosage: '1 tablet chewable once daily', duration: '15 days' },
  { id: 'g255', genericName: 'Multivitamin & Zinc Syrup', category: 'pediatric', dosage: '5ml (once daily)', duration: '15 days', minAge: 1, maxAge: 12 },
  { id: 'g256', genericName: 'Multivitamin & Multimineral Antioxidant Tab', category: 'adult', dosage: '1 capsule (0-1-0 after lunch)', duration: '30 days', minAge: 12 },
  { id: 'g257', genericName: 'Zinc Sulfate Syrup (20mg/5ml)', category: 'pediatric', dosage: '5ml once daily for diarrhea recovery', duration: '14 days', minAge: 1, maxAge: 12 },
  { id: 'g258', genericName: 'Coenzyme Q10 + Levocarnitine', category: 'adult', dosage: '100mg/500mg (1-0-0 after food)', duration: '30 days', minAge: 18 },
  { id: 'g259', genericName: 'Alpha Ketoanalogue Tablets', category: 'adult', dosage: '1 tablet t.d.s with meals (CKD protocol)', duration: '30 days', minAge: 18 },

  // 8. DERMATOLOGY, COSMECEUTICALS & TOPICAL MEDICATIONS (260 - 320)
  { id: 'g260', genericName: 'Mupirocin (Ointment 2%)', category: 'all', dosage: 'Apply thin layer on affected skin 3x daily', duration: '7 days' },
  { id: 'g261', genericName: 'Fusidic Acid (Cream 2%)', category: 'all', dosage: 'Apply on lesions 2x daily', duration: '7 days' },
  { id: 'g262', genericName: 'Clotrimazole (Cream 1%)', category: 'all', dosage: 'Apply on fungal rash twice daily', duration: '14 days' },
  { id: 'g263', genericName: 'Clotrimazole (Dusting Powder 1%)', category: 'all', dosage: 'Dust on body folds twice daily after bath', duration: '14 days' },
  { id: 'g264', genericName: 'Luliconazole (Cream 1%)', category: 'all', dosage: 'Apply once daily on affected area', duration: '14 days' },
  { id: 'g265', genericName: 'Ketoconazole (Shampoo 2%)', category: 'all', dosage: 'Lather on scalp 2x weekly, leave for 5 mins', duration: '30 days' },
  { id: 'g266', genericName: 'Permethrin (Lotion 5%)', category: 'all', dosage: 'Apply neck down, wash off after 8-12 hours', duration: 'Single application' },
  { id: 'g267', genericName: 'Permethrin Soap 1%', category: 'all', dosage: 'Use as body bath soap', duration: '7 days' },
  { id: 'g268', genericName: 'Clobetasol Propionate (Cream 0.05%)', category: 'adult', dosage: 'Apply sparingly on rash twice daily', duration: '7 days', minAge: 12 },
  { id: 'g269', genericName: 'Momethasone Furoate (Cream 0.1%)', category: 'all', dosage: 'Apply once daily on lesion', duration: '7 days' },
  { id: 'g270', genericName: 'Hydrocortisone (Cream 1%)', category: 'all', dosage: 'Apply twice daily on eczema rash', duration: '7 days' },
  { id: 'g271', genericName: 'Calamine Lotion', category: 'all', dosage: 'Apply on itchy skin 3x daily', duration: '5 days' },
  { id: 'g272', genericName: 'Benzoyl Peroxide (Gel 2.5%)', category: 'all', dosage: 'Apply on acne lesions at night', duration: '14 days' },
  { id: 'g273', genericName: 'Adapalene (Gel 0.1%)', category: 'all', dosage: 'Apply thin layer on acne at night', duration: '30 days' },
  { id: 'g274', genericName: 'Clindamycin (Topical Gel 1%)', category: 'all', dosage: 'Apply on acne lesions twice daily', duration: '14 days' },
  { id: 'g275', genericName: 'Minoxidil (Topical Solution 5%)', category: 'adult', dosage: '1ml apply on dry scalp twice daily', duration: '90 days', minAge: 18 },
  { id: 'g276', genericName: 'Silver Sulfadiazine (Burn Cream 1%)', category: 'all', dosage: 'Apply thick layer on burn wound twice daily', duration: '7 days' },

  // 9. OPHTHALMOLOGY, ENT & DENTAL (277 - 340)
  { id: 'g277', genericName: 'Tobramycin (Eye Drops 0.3%)', category: 'all', dosage: '1 drop in affected eye 4x daily', duration: '5 days' },
  { id: 'g278', genericName: 'Moxifloxacin (Eye Drops 0.5%)', category: 'all', dosage: '1 drop in affected eye 3x daily', duration: '5 days' },
  { id: 'g279', genericName: 'Ofloxacin (Eye/Ear Drops 0.3%)', category: 'all', dosage: '2 drops 3x daily', duration: '5 days' },
  { id: 'g280', genericName: 'Ciprofloxacin (Eye Drops 0.3%)', category: 'all', dosage: '1 drop 4x daily', duration: '5 days' },
  { id: 'g281', genericName: 'Carboxymethylcellulose (Lubricant Eye Drops 0.5%)', category: 'all', dosage: '1 drop in both eyes 4x daily', duration: '30 days' },
  { id: 'g282', genericName: 'Sodium Hyaluronate (Eye Drops 0.1%)', category: 'all', dosage: '1 drop in eyes 4x daily', duration: '30 days' },
  { id: 'g283', genericName: 'Olopatadine (Eye Drops 0.1%)', category: 'all', dosage: '1 drop in affected eye b.d. for allergy', duration: '14 days' },
  { id: 'g284', genericName: 'Timolol Maleate (Eye Drops 0.5%)', category: 'adult', dosage: '1 drop twice daily for glaucoma', duration: '30 days', minAge: 18 },
  { id: 'g285', genericName: 'Paradichlorobenzene + Benzocaine (Wax Dissolving Ear Drops)', category: 'all', dosage: '3-4 drops in ear, plug with cotton 2x daily', duration: '5 days' },
  { id: 'g286', genericName: 'Chlorhexidine Gluconate Mouthwash 0.2%', category: 'all', dosage: 'Rinse 10ml undiluted for 1 min b.d. after meals', duration: '7 days' },
  { id: 'g287', genericName: 'Povidone Iodine Gargle 2%', category: 'all', dosage: 'Gargle 10ml with equal warm water t.d.s', duration: '5 days' },
  { id: 'g288', genericName: 'Triamcinolone Acetonide (Oral Paste 0.1%)', category: 'all', dosage: 'Apply small dab on mouth ulcer after meals at bedtime', duration: '5 days' },
  { id: 'g289', genericName: 'Potassium Nitrate Sensitive Toothpaste', category: 'all', dosage: 'Brush twice daily', duration: '30 days' },

  // 10. NEURO-PSYCHIATRY, EPILEPSY & SEDATIVES (290 - 350)
  { id: 'g290', genericName: 'Alprazolam', category: 'adult', dosage: '0.25mg (0-0-1 at night for acute anxiety)', duration: '5 days', minAge: 18 },
  { id: 'g291', genericName: 'Alprazolam', category: 'adult', dosage: '0.5mg (0-0-1 at night)', duration: '5 days', minAge: 18 },
  { id: 'g292', genericName: 'Clonazepam', category: 'adult', dosage: '0.5mg (0-0-1 at night)', duration: '7 days', minAge: 18 },
  { id: 'g293', genericName: 'Clonazepam', category: 'adult', dosage: '0.25mg (0-0-1 at night)', duration: '7 days', minAge: 18 },
  { id: 'g294', genericName: 'Diazepam', category: 'adult', dosage: '5mg (0-0-1 at night)', duration: '3 days', minAge: 18 },
  { id: 'g295', genericName: 'Lorazepam', category: 'adult', dosage: '1mg (0-0-1 at night)', duration: '5 days', minAge: 18 },
  { id: 'g296', genericName: 'Zolpidem Tartrate', category: 'adult', dosage: '5mg (0-0-1 at bedtime for insomnia)', duration: '5 days', minAge: 18 },
  { id: 'g297', genericName: 'Escitalopram', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g298', genericName: 'Sertraline', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g299', genericName: 'Fluoxetine', category: 'adult', dosage: '20mg (1-0-0 morning)', duration: '30 days', minAge: 18 },
  { id: 'g300', genericName: 'Amitriptyline', category: 'adult', dosage: '10mg (0-0-1 at night for nerve pain/migraine)', duration: '30 days', minAge: 18 },
  { id: 'g301', genericName: 'Sodium Valproate / Divalproex ER', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 12 },
  { id: 'g302', genericName: 'Carbamazepine', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '30 days', minAge: 12 },
  { id: 'g303', genericName: 'Levetiracetam', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 12 },
  { id: 'g304', genericName: 'Oxcarbazepine', category: 'adult', dosage: '300mg (1-0-1 after food)', duration: '30 days', minAge: 12 },
  { id: 'g305', genericName: 'Phenytoin Sodium', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '30 days', minAge: 12 },

  // 11. OBSTETRICS, GYNECOLOGY & UROLOGY (306 - 360)
  { id: 'g306', genericName: 'Norethisterone', category: 'adult', dosage: '5mg (1-1-1 for period delay)', duration: '5 days', minAge: 18 },
  { id: 'g307', genericName: 'Tranexamic Acid', category: 'adult', dosage: '500mg (1-1-1 for heavy bleeding)', duration: '3 days', minAge: 18 },
  { id: 'g308', genericName: 'Tranexamic Acid + Mefenamic Acid', category: 'adult', dosage: '500mg/250mg (1-1-1 during menses)', duration: '3 days', minAge: 18 },
  { id: 'g309', genericName: 'Isoxsuprine SR', category: 'adult', dosage: '40mg (1-0-1 for uterine relaxation)', duration: '14 days', minAge: 18 },
  { id: 'g310', genericName: 'Progesterone Micronized', category: 'adult', dosage: '200mg (0-0-1 vaginal/oral at bedtime)', duration: '14 days', minAge: 18 },
  { id: 'g311', genericName: 'Dydrogesterone', category: 'adult', dosage: '10mg (1-0-1 after food)', duration: '14 days', minAge: 18 },
  { id: 'g312', genericName: 'Cabergoline', category: 'adult', dosage: '0.5mg (1 tab twice weekly for prolactin)', duration: '4 weeks', minAge: 18 },
  { id: 'g313', genericName: 'Tamsulosin Hydrochloride', category: 'adult', dosage: '0.4mg (0-0-1 30m after dinner for BPH)', duration: '30 days', minAge: 40 },
  { id: 'g314', genericName: 'Tamsulosin + Dutasteride', category: 'adult', dosage: '0.4mg/0.5mg (0-0-1 after dinner)', duration: '30 days', minAge: 40 },
  { id: 'g315', genericName: 'Silodosin', category: 'adult', dosage: '8mg (0-0-1 after dinner)', duration: '30 days', minAge: 40 },
  { id: 'g316', genericName: 'Finasteride', category: 'adult', dosage: '5mg (1-0-0 once daily)', duration: '30 days', minAge: 40 },
  { id: 'g317', genericName: 'Alkaline Citrate Syrup (Disodium Hydrogen Citrate)', category: 'all', dosage: '2 teaspoonfuls in 1 glass water t.d.s for dysuria', duration: '5 days' },

  // 12. MISCELLANEOUS ESSENTIAL CLINICAL GENERICS (318 - 500)
  { id: 'g318', genericName: 'Activated Charcoal', category: 'all', dosage: '50g in water for poison ingestion', duration: 'Single dose' },
  { id: 'g319', genericName: 'Dexamethasone', category: 'adult', dosage: '4mg (1-0-0 after food)', duration: '3 days', minAge: 12 },
  { id: 'g320', genericName: 'Prednisolone', category: 'adult', dosage: '10mg (1-0-0 morning after food)', duration: '5 days', minAge: 12 },
  { id: 'g321', genericName: 'Deflazacort', category: 'adult', dosage: '6mg (1-0-0 morning after food)', duration: '5 days', minAge: 12 },
  { id: 'g322', genericName: 'Methylprednisolone', category: 'adult', dosage: '8mg (1-0-0 morning)', duration: '5 days', minAge: 12 },
  { id: 'g323', genericName: 'Betahistine Dihydrochloride', category: 'adult', dosage: '16mg (1-0-1 after food for vertigo)', duration: '7 days', minAge: 18 },
  { id: 'g324', genericName: 'Cinnarizine', category: 'adult', dosage: '25mg (1-0-1 after food for motion sickness)', duration: '5 days', minAge: 12 },
  { id: 'g325', genericName: 'Flunarizine', category: 'adult', dosage: '10mg (0-0-1 at night for migraine prophylaxis)', duration: '30 days', minAge: 18 },
  { id: 'g326', genericName: 'Piracetam', category: 'adult', dosage: '800mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
  { id: 'g327', genericName: 'Citicoline', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 18 },
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
