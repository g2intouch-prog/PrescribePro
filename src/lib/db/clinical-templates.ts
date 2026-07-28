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

export const COMPREHENSIVE_GENERIC_DRUGS: DrugItem[] = [
  // --- ANALGESICS, NSAIDs & PAIN MANAGEMENT ---
  { id: 'g1', genericName: 'Paracetamol (Acetaminophen)', category: 'adult', dosage: '650mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g1b', genericName: 'Paracetamol', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 35 },
  { id: 'g2', genericName: 'Paracetamol (Syrup 250mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s after food)', duration: '3 days', minAge: 2, maxAge: 12, minWeight: 12, maxWeight: 40 },
  { id: 'g2b', genericName: 'Paracetamol (Syrup 120mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s after food)', duration: '3 days', minAge: 1, maxAge: 6, minWeight: 8, maxWeight: 20 },
  { id: 'g3', genericName: 'Paracetamol (Pediatric Drops 100mg/ml)', category: 'infant', dosage: '1ml (10-15mg/kg t.d.s)', duration: '3 days', maxAge: 2, maxWeight: 12 },
  { id: 'g4', genericName: 'Ibuprofen', category: 'adult', dosage: '400mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g4b', genericName: 'Ibuprofen', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '3 days', minAge: 12 },
  { id: 'g5', genericName: 'Ibuprofen (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'g6', genericName: 'Diclofenac Sodium', category: 'adult', dosage: '50mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g6b', genericName: 'Diclofenac SR', category: 'adult', dosage: '100mg (1-0-0 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g6c', genericName: 'Aceclofenac', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g6d', genericName: 'Aceclofenac + Paracetamol', category: 'adult', dosage: '100mg/325mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g6e', genericName: 'Aceclofenac + Serratiopeptidase', category: 'adult', dosage: '100mg/15mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g7', genericName: 'Mefenamic Acid', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g7b', genericName: 'Mefenamic Acid (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '3 days', minAge: 2, maxAge: 12 },
  { id: 'g7c', genericName: 'Naproxen', category: 'adult', dosage: '250mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g7d', genericName: 'Etoricoxib', category: 'adult', dosage: '90mg (1-0-0 after food)', duration: '5 days', minAge: 16, minWeight: 40 },
  { id: 'g8', genericName: 'Tramadol + Paracetamol', category: 'adult', dosage: '37.5mg/325mg (1-0-1 S.O.S)', duration: '3 days', minAge: 18, minWeight: 40 },
  { id: 'g8b', genericName: 'Pregabalin', category: 'adult', dosage: '75mg (0-0-1 at night)', duration: '15 days', minAge: 18 },
  { id: 'g8c', genericName: 'Gabapentin', category: 'adult', dosage: '300mg (0-0-1 at night)', duration: '15 days', minAge: 18 },
  { id: 'g8d', genericName: 'Thiocolchicoside', category: 'adult', dosage: '4mg (1-0-1 after food)', duration: '5 days', minAge: 18 },

  // --- ANTIBIOTICS, ANTIFUNGALS & ANTIVIRALS ---
  { id: 'g9', genericName: 'Amoxicillin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g9b', genericName: 'Amoxicillin', category: 'adult', dosage: '250mg (1-1-1 after food)', duration: '5 days', minAge: 8 },
  { id: 'g10', genericName: 'Amoxicillin (Dry Syrup 125mg/5ml)', category: 'pediatric', dosage: '5ml (b.d. after food)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g11', genericName: 'Amoxicillin + Clavulanic Acid (Augmentin)', category: 'adult', dosage: '625mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g11b', genericName: 'Amoxicillin + Clavulanate (375mg)', category: 'adult', dosage: '375mg (1-0-1 after food)', duration: '5 days', minAge: 8 },
  { id: 'g12', genericName: 'Amoxicillin + Clavulanate (Dry Syrup 228mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g12b', genericName: 'Amoxicillin + Clavulanate (Forte Syrup 457mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g13', genericName: 'Azithromycin', category: 'adult', dosage: '500mg (1-0-0 1 hr before food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g13b', genericName: 'Azithromycin', category: 'adult', dosage: '250mg (1-0-0 once daily)', duration: '5 days', minAge: 8 },
  { id: 'g14', genericName: 'Azithromycin (Suspension 200mg/5ml)', category: 'pediatric', dosage: '5ml (1-0-0 once daily)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g14b', genericName: 'Azithromycin (Suspension 100mg/5ml)', category: 'pediatric', dosage: '5ml (1-0-0 once daily)', duration: '3 days', minAge: 1, maxAge: 6 },
  { id: 'g15', genericName: 'Cefixime', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g16', genericName: 'Cefixime (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g16b', genericName: 'Cefixime (Syrup 100mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 4, maxAge: 12 },
  { id: 'g16c', genericName: 'Cefpodoxime Proxetil', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g16d', genericName: 'Cefpodoxime (Syrup 50mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g16e', genericName: 'Cefuroxime Axetil', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g16f', genericName: 'Cephalexin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g17', genericName: 'Ciprofloxacin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g18', genericName: 'Levofloxacin', category: 'adult', dosage: '500mg (1-0-0 once daily)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g18b', genericName: 'Ofloxacin', category: 'adult', dosage: '200mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g18c', genericName: 'Ofloxacin + Ornidazole', category: 'adult', dosage: '200mg/500mg (1-0-1 after food)', duration: '5 days', minAge: 18, minWeight: 40 },
  { id: 'g18d', genericName: 'Doxycycline', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g19', genericName: 'Metronidazole', category: 'adult', dosage: '400mg (1-1-1 after food)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g20', genericName: 'Metronidazole (Syrup 200mg/5ml)', category: 'pediatric', dosage: '5ml (t.d.s)', duration: '5 days', minAge: 1, maxAge: 12 },
  { id: 'g20b', genericName: 'Nitrofurantoin SR', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g20c', genericName: 'Fluconazole', category: 'adult', dosage: '150mg (Single dose or weekly)', duration: '1 day', minAge: 12, minWeight: 40 },
  { id: 'g20d', genericName: 'Itraconazole', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '14 days', minAge: 12, minWeight: 40 },
  { id: 'g20e', genericName: 'Terbinafine', category: 'adult', dosage: '250mg (1-0-0 once daily)', duration: '14 days', minAge: 12, minWeight: 40 },
  { id: 'g20f', genericName: 'Acyclovir', category: 'adult', dosage: '400mg (1-1-1-1 4x daily)', duration: '7 days', minAge: 12 },

  // --- GASTROINTESTINAL, ANTACIDS & ANTIEMETICS ---
  { id: 'g21', genericName: 'Pantoprazole', category: 'adult', dosage: '40mg (1-0-0 30 mins before breakfast)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g21b', genericName: 'Pantoprazole + Domperidone', category: 'adult', dosage: '40mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g22', genericName: 'Omeprazole', category: 'adult', dosage: '20mg (1-0-0 before food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g22b', genericName: 'Rabeprazole + Domperidone', category: 'adult', dosage: '20mg/30mg SR (1-0-0 before food)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g22c', genericName: 'Esomeprazole', category: 'adult', dosage: '40mg (1-0-0 before food)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g23', genericName: 'Ondansetron', category: 'adult', dosage: '4mg (1-0-1 before food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g24', genericName: 'Ondansetron (Syrup 2mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (S.O.S)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g25', genericName: 'Ondansetron (Drops 2mg/ml)', category: 'infant', dosage: '1ml (S.O.S)', duration: '2 days', maxAge: 2 },
  { id: 'g25b', genericName: 'Domperidone', category: 'adult', dosage: '10mg (1-0-1 before food)', duration: '5 days', minAge: 12 },
  { id: 'g25c', genericName: 'Domperidone (Syrup 5mg/5ml)', category: 'pediatric', dosage: '2.5ml (before food)', duration: '3 days', minAge: 1, maxAge: 12 },
  { id: 'g26', genericName: 'Dicyclomine + Paracetamol', category: 'adult', dosage: '20mg/500mg (1-0-1 S.O.S for abdominal spasms)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g26b', genericName: 'Dicyclomine (Pediatric Drops 10mg/ml)', category: 'infant', dosage: '0.5ml (S.O.S for colic)', duration: '2 days', maxAge: 2 },
  { id: 'g26c', genericName: 'Drotaverine', category: 'adult', dosage: '80mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g26d', genericName: 'Drotaverine + Mefenamic Acid', category: 'adult', dosage: '80mg/250mg (1-0-1 after food)', duration: '3 days', minAge: 12, minWeight: 40 },
  { id: 'g26e', genericName: 'Lactulose (Syrup 10g/15ml)', category: 'all', dosage: '15ml at bedtime for constipation', duration: '7 days' },
  { id: 'g26f', genericName: 'ORS (Oral Rehydration Salts Powder)', category: 'all', dosage: '1 sachet in 1 Litre clean water (sip continuously)', duration: '3 days' },
  { id: 'g26g', genericName: 'Bacillus Clausii (Probiotic Spores)', category: 'all', dosage: '1 mini bottle (b.d.)', duration: '5 days' },
  { id: 'g26h', genericName: 'Racecadotril (Sachet 30mg)', category: 'pediatric', dosage: '1 sachet (t.d.s in water)', duration: '3 days', minAge: 1, maxAge: 12 },

  // --- RESPIRATORY, ANTIHISTAMINES & ALLERGY ---
  { id: 'g27', genericName: 'Cetirizine', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g28', genericName: 'Cetirizine (Syrup 5mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (at night)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g29', genericName: 'Levocetirizine', category: 'adult', dosage: '5mg (0-0-1 at night)', duration: '5 days', minAge: 12, minWeight: 40 },
  { id: 'g30', genericName: 'Levocetirizine + Montelukast', category: 'adult', dosage: '5mg/10mg (0-0-1 at night)', duration: '10 days', minAge: 15, minWeight: 40 },
  { id: 'g30b', genericName: 'Levocetirizine + Montelukast (Syrup)', category: 'pediatric', dosage: '5ml (at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'g31', genericName: 'Montelukast (Tab 4mg/5mg)', category: 'pediatric', dosage: '4mg (0-0-1 at night)', duration: '7 days', minAge: 2, maxAge: 12 },
  { id: 'g31b', genericName: 'Fexofenadine', category: 'adult', dosage: '120mg (1-0-0 once daily)', duration: '7 days', minAge: 12, minWeight: 40 },
  { id: 'g31c', genericName: 'Fexofenadine (Syrup 30mg/5ml)', category: 'pediatric', dosage: '5ml (b.d.)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g32', genericName: 'Salbutamol (Asthalin Inhaler)', category: 'all', dosage: '2 puffs S.O.S for bronchospasm', duration: 'As needed' },
  { id: 'g32b', genericName: 'Salbutamol (Syrup 2mg/5ml)', category: 'pediatric', dosage: '2.5ml to 5ml (t.d.s)', duration: '5 days', minAge: 2, maxAge: 12 },
  { id: 'g33', genericName: 'Budesonide (Inhaler 200mcg)', category: 'all', dosage: '2 puffs (b.d. with mouth rinse)', duration: '30 days' },
  { id: 'g33b', genericName: 'Budesonide (Respules 0.5mg/2ml)', category: 'all', dosage: '1 respule neb (b.d.)', duration: '5 days' },
  { id: 'g33c', genericName: 'Levosalbutamol + Ipratropium (Duolin Respules)', category: 'all', dosage: '1 respule neb (t.d.s)', duration: '5 days' },
  { id: 'g33d', genericName: 'Fluticasone (Furoate Nasal Spray 27.5mcg)', category: 'all', dosage: '1 spray in each nostril (b.d.)', duration: '14 days' },
  { id: 'g33e', genericName: 'Ambroxol + Terbutaline + Guaifenesin (Expectorant)', category: 'adult', dosage: '10ml (t.d.s after food)', duration: '5 days', minAge: 12 },
  { id: 'g33f', genericName: 'Dextromethorphan + Chlorpheniramine (Dry Cough Syrup)', category: 'adult', dosage: '5ml to 10ml (t.d.s)', duration: '5 days', minAge: 6 },
  { id: 'g33g', genericName: 'Acebrophylline', category: 'adult', dosage: '100mg (1-0-1 after food)', duration: '7 days', minAge: 12, minWeight: 40 },

  // --- CARDIOVASCULAR & ANTIHYPERTENSIVES ---
  { id: 'g34', genericName: 'Telmisartan', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g34b', genericName: 'Telmisartan', category: 'adult', dosage: '20mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g34c', genericName: 'Telmisartan + Amlodipine', category: 'adult', dosage: '40mg/5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g34d', genericName: 'Telmisartan + Hydrochlorothiazide', category: 'adult', dosage: '40mg/12.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35', genericName: 'Amlodipine', category: 'adult', dosage: '5mg (0-0-1 night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35b', genericName: 'Amlodipine', category: 'adult', dosage: '2.5mg (0-0-1 night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35c', genericName: 'Cilnidipine', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35d', genericName: 'Enalapril', category: 'adult', dosage: '5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35e', genericName: 'Ramipril', category: 'adult', dosage: '2.5mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35f', genericName: 'Losartan', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35g', genericName: 'Atenolol', category: 'adult', dosage: '50mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35h', genericName: 'Metoprolol Succinate ER', category: 'adult', dosage: '25mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g35i', genericName: 'Furosemide (Lasix)', category: 'adult', dosage: '40mg (1-0-0 morning)', duration: '7 days', minAge: 18, minWeight: 40 },
  { id: 'g35j', genericName: 'Torsemide', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '14 days', minAge: 18, minWeight: 40 },
  { id: 'g35k', genericName: 'Spironolactone', category: 'adult', dosage: '25mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g36', genericName: 'Atorvastatin', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g36b', genericName: 'Atorvastatin', category: 'adult', dosage: '20mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g36c', genericName: 'Rosuvastatin', category: 'adult', dosage: '10mg (0-0-1 at night)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g36d', genericName: 'Clopidogrel', category: 'adult', dosage: '75mg (1-0-0 once daily)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g36e', genericName: 'Aspirin (Ecosprin Gastro-Resistant)', category: 'adult', dosage: '75mg (0-1-0 after lunch)', duration: '30 days', minAge: 18, minWeight: 40 },

  // --- DIABETOLOGY & ENDOCRINOLOGY ---
  { id: 'g37', genericName: 'Metformin', category: 'adult', dosage: '500mg (1-0-1 after food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g37b', genericName: 'Metformin SR', category: 'adult', dosage: '1000mg (0-0-1 after dinner)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38', genericName: 'Glimepiride', category: 'adult', dosage: '1mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38b', genericName: 'Glimepiride + Metformin', category: 'adult', dosage: '1mg/500mg (1-0-1 before food)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38c', genericName: 'Teneligliptin', category: 'adult', dosage: '20mg (1-0-0 before breakfast)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38d', genericName: 'Sitagliptin', category: 'adult', dosage: '100mg (1-0-0 once daily)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38e', genericName: 'Dapagliflozin', category: 'adult', dosage: '10mg (1-0-0 morning)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38f', genericName: 'Voglibose', category: 'adult', dosage: '0.2mg (1-1-1 with first bite of meal)', duration: '30 days', minAge: 18, minWeight: 40 },
  { id: 'g38g', genericName: 'Thyroxine Sodium (Levothyroxine)', category: 'adult', dosage: '50mcg (1-0-0 empty stomach on waking)', duration: '30 days', minAge: 12 },
  { id: 'g38h', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '25mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 12 },
  { id: 'g38i', genericName: 'Thyroxine Sodium', category: 'adult', dosage: '100mcg (1-0-0 empty stomach)', duration: '30 days', minAge: 12 },

  // --- VITAMINS, MINERALS & NUTRITIONAL SUPPLEMENTS ---
  { id: 'g39', genericName: 'Iron + Folic Acid (Tab Ferrous Ascorbate)', category: 'adult', dosage: '100mg/1.5mg (1-0-0 after food)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g40', genericName: 'Iron (Syrup Ferrous Ascorbate)', category: 'pediatric', dosage: '5ml (once daily)', duration: '30 days', minAge: 1, maxAge: 12 },
  { id: 'g41', genericName: 'Calcium Carbonate + Vitamin D3', category: 'adult', dosage: '500mg/250IU (0-1-0 after lunch)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g41b', genericName: 'Calcium Citrate + Vitamin D3 + Zinc', category: 'adult', dosage: '1000mg/200IU (0-1-0 after lunch)', duration: '30 days', minAge: 12, minWeight: 40 },
  { id: 'g42', genericName: 'Vitamin D3 (Cholecalciferol Sachet 60,000 IU)', category: 'all', dosage: '1 sachet in warm milk once weekly', duration: '8 weeks' },
  { id: 'g42b', genericName: 'Methylcobalamin (Vitamin B12 1500mcg)', category: 'adult', dosage: '1500mcg (1-0-0 once daily)', duration: '30 days', minAge: 12 },
  { id: 'g42c', genericName: 'Methylcobalamin + Alpha Lipoic Acid + B6', category: 'adult', dosage: '1 cap (0-0-1 at night)', duration: '30 days', minAge: 18 },
  { id: 'g43', genericName: 'Vitamin C (L-Ascorbic Acid 500mg)', category: 'all', dosage: '1 tablet chewable once daily', duration: '15 days' },
  { id: 'g43b', genericName: 'Multivitamin & Zinc Syrup', category: 'pediatric', dosage: '5ml (once daily)', duration: '15 days', minAge: 1, maxAge: 12 },
  { id: 'g43c', genericName: 'Multivitamin & Multimineral Antioxidant Tab', category: 'adult', dosage: '1 capsule (0-1-0 after lunch)', duration: '30 days', minAge: 12 },

  // --- DERMATOLOGY, OPHTHALMOLOGY & ENT ---
  { id: 'g44', genericName: 'Mupirocin (Ointment 2%)', category: 'all', dosage: 'Apply thin layer on affected skin 3x daily', duration: '7 days' },
  { id: 'g44b', genericName: 'Fusidic Acid (Cream 2%)', category: 'all', dosage: 'Apply on lesions 2x daily', duration: '7 days' },
  { id: 'g44c', genericName: 'Clotrimazole (Cream 1%)', category: 'all', dosage: 'Apply on fungal rash twice daily', duration: '14 days' },
  { id: 'g44d', genericName: 'Clotrimazole (Dusting Powder 1%)', category: 'all', dosage: 'Dust on body folds twice daily after bath', duration: '14 days' },
  { id: 'g44e', genericName: 'Permethrin (Lotion 5%)', category: 'all', dosage: 'Apply neck down, wash off after 8-12 hours', duration: 'Single application' },
  { id: 'g44f', genericName: 'Clobetasol Propionate (Cream 0.05%)', category: 'adult', dosage: 'Apply sparingly on rash twice daily', duration: '7 days', minAge: 12 },
  { id: 'g44g', genericName: 'Calamine Lotion', category: 'all', dosage: 'Apply on itchy skin 3x daily', duration: '5 days' },
  { id: 'g45', genericName: 'Tobramycin (Eye Drops 0.3%)', category: 'all', dosage: '1 drop in affected eye 4x daily', duration: '5 days' },
  { id: 'g45b', genericName: 'Moxifloxacin (Eye Drops 0.5%)', category: 'all', dosage: '1 drop in affected eye 3x daily', duration: '5 days' },
  { id: 'g45c', genericName: 'Carboxymethylcellulose (Lubricant Eye Drops 0.5%)', category: 'all', dosage: '1 drop in both eyes 4x daily', duration: '30 days' },
  { id: 'g45d', genericName: 'Paradichlorobenzene + Benzocaine (Wax Dissolving Ear Drops)', category: 'all', dosage: '3-4 drops in ear, plug with cotton 2x daily', duration: '5 days' },
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
