/**
 * ArterioGas Pro - Comprehensive Evidence-Based Therapeutic Strategy Library
 * Concrete, step-by-step clinical management protocols for every clinical scenario.
 * Designed for Federal Medical Licensing Examinations (Staatsexamen, USMLE).
 */

const TherapyProtocols = {
  normal: {
    id: 'normal',
    title: 'Physiological Baseline Maintenance',
    urgency: 'Physiological Homeostasis',
    urgencyColor: 'emerald',
    category: 'Baseline',
    keyConcept: 'No emergency intervention required. Maintain normal physiological fluid, electrolyte, and acid-base homeostasis.',
    steps: [
      {
        step: 1,
        action: 'Maintenance Fluid Requirements (Holiday-Segar 4-2-1 Rule)',
        dosing: '25–30 mL/kg/day balanced crystalloid (e.g., Plasmalyte, Ringer\'s Lactate, or D5 1/2 NS with 20 mEq KCl)',
        why: 'Replaces daily obligatory water losses: ~500 mL insensible perspiration/skin loss, ~400 mL respiratory vapor, ~100 mL stool, and minimum 500–1000 mL urine to excrete daily metabolic solute load (~600 mOsm/day).',
        pitfall: 'Avoid prolonged hypotonic fluids without monitoring sodium to prevent hospital-acquired hyponatremia.'
      },
      {
        step: 2,
        action: 'Electrolyte Homeostasis Maintenance',
        dosing: 'Sodium: 1–2 mmol/kg/day; Potassium: 0.7–1.0 mmol/kg/day; Glucose: 100–150 g/day to minimize muscle proteolysis',
        why: 'Balances obligatory cutaneous and renal electrolyte excretion, maintaining normal membrane potential and cellular volume.',
        pitfall: 'Do not infuse potassium faster than 10–20 mEq/h via peripheral veins to avoid chemical phlebitis.'
      },
      {
        step: 3,
        action: 'Normative Clinical Monitoring Targets',
        dosing: 'Urine output ≥ 0.5 mL/kg/h; Mean Arterial Pressure (MAP) 65–100 mmHg; SpO₂ 95–99% on room air',
        why: 'Confirms adequate cardiac output, renal glomerular filtration pressure, and uncompromised tissue oxygenation.',
        pitfall: 'Remember that healthy resting blood gases show normal PaCO₂ of 4.7–6.0 kPa and PaO₂ > 10.0 kPa on room air.'
      }
    ]
  },

  dka: {
    id: 'dka',
    title: 'Diabetic Ketoacidosis (DKA) Step-by-Step Management Protocol',
    urgency: 'Critical Medical Emergency',
    urgencyColor: 'rose',
    category: 'Metabolic Acidosis',
    keyConcept: '1. Fluids First ➔ 2. Potassium BEFORE or WITH Insulin ➔ 3. Continuous Regular Insulin ➔ 4. Add Dextrose Early ➔ 5. Restrict Bicarbonate.',
    steps: [
      {
        step: 1,
        action: 'Aggressive IV Isotonic Crystalloid Resuscitation',
        dosing: '0.9% NaCl 1000–1500 mL IV over the 1st hour (15–20 mL/kg/h); then 250–500 mL/h (switch to 0.45% NaCl if corrected Na⁺ is normal/high, continue 0.9% NaCl if low)',
        why: 'Osmotic diuresis causes massive water and electrolyte deficits (average 5–8 Liters deficit!). Rapid volume expansion restores intravascular volume, drops counter-regulatory stress hormones (cortisol, epinephrine, glucagon), and re-establishes renal perfusion so the kidneys can excrete glucose and ketoacids.',
        pitfall: '⚠️ Do not start with hypotonic fluids in the first hour. Restore hemodynamic stability and renal filtration pressure first.'
      },
      {
        step: 2,
        action: 'Check & Correct Potassium BEFORE Starting Insulin (The Potassium Paradox)',
        dosing: 'If serum K⁺ < 3.3 mmol/L: HOLD INSULIN and infuse KCl 20–40 mEq/h until K⁺ > 3.3. If K⁺ is 3.3–5.3 mmol/L: add 20–30 mEq KCl per liter of IV fluid (target 4.0–5.0 mmol/L). If K⁺ > 5.3 mmol/L: start insulin, recheck K⁺ every 1–2 hours.',
        why: 'Acidosis and insulin deficiency cause a transcellular shift, pushing K⁺ out of cells into the blood. Even if measured serum K⁺ is normal or high, total-body potassium is severely depleted from osmotic diuresis. Starting insulin drives potassium rapidly back into cells via Na⁺/K⁺-ATPase; if baseline K⁺ is low, this triggers sudden fatal cardiac arrhythmias (VF, asystole) or respiratory muscle arrest!',
        pitfall: '⚠️ Starting insulin while potassium is < 3.3 mmol/L is the deadliest mistake in DKA management. Always verify potassium first!'
      },
      {
        step: 3,
        action: 'Continuous IV Regular Insulin Infusion (Shutting Down Ketogenesis)',
        dosing: 'Regular Insulin 0.1 units/kg/h continuous IV infusion (or 0.14 units/kg/h without bolus). Target blood glucose rate of fall: 3.0–4.0 mmol/L/h (50–75 mg/dL/h).',
        why: 'The primary goal of insulin in DKA is NOT simply to lower blood sugar; it is to suppress hormone-sensitive lipase in adipose tissue and halt hepatic ketogenesis. Without insulin, the liver continues converting fatty acids into acidic beta-hydroxybutyrate.',
        pitfall: '⚠️ Do not give subcutaneous insulin in acute severe DKA—impaired peripheral perfusion causes erratic absorption. Always use continuous IV infusion.'
      },
      {
        step: 4,
        action: 'Add Dextrose (5%–10% Glucose) When Blood Sugar Drops to ~11–14 mmol/L (~200–250 mg/dL)',
        dosing: 'Switch IV fluid to 5% Dextrose in 0.45% NaCl (D5 1/2 NS) while continuing insulin infusion at 0.05–0.1 units/kg/h to keep glucose ~8–12 mmol/L (150–200 mg/dL).',
        why: 'Hyperglycemia clears much faster than ketoacidosis. If you stop the insulin when glucose reaches normal, ketogenesis resumes immediately and the patient relapses. By infusing dextrose, you can keep insulin running safely to clear ketones and close the anion gap without precipitating hypoglycemia.',
        pitfall: '⚠️ Stopping insulin prematurely because "blood sugar is now normal" is the #1 cause of DKA treatment failure. Keep insulin running until anion gap closes and bicarbonate ≥ 18 mmol/L!'
      },
      {
        step: 5,
        action: 'Bicarbonate Therapy — Heavily Restricted (Only if Arterial pH < 6.90)',
        dosing: '100 mmol NaHCO₃ in 400 mL sterile water with 20 mEq KCl over 2 hours only if arterial pH < 6.90.',
        why: 'Routine bicarbonate causes paradoxical central nervous system acidosis (CO₂ crosses the blood-brain barrier into CSF instantly, while bicarbonate penetrates slowly), delays ketone clearance, worsens hypokalemia, and impairs oxygen delivery by shifting the oxyhemoglobin dissociation curve to the left.',
        pitfall: '⚠️ Never give bicarbonate boluses for pH ≥ 6.90. Insulin and fluids alone will allow the liver and kidneys to regenerate natural bicarbonate.'
      },
      {
        step: 6,
        action: 'Identify & Treat Underlying Precipitant ("The 5 I\'s")',
        dosing: 'Infection workup (CXR, urine, blood cultures), ECG and cardiac enzymes, check for missed insulin, medication review.',
        why: 'DKA is almost always triggered by a counter-regulatory surge from an acute stressor: Infection (UTI, pneumonia), Infarction (MI), Inadequacy of insulin, Intra-abdominal pathology (pancreatitis), or Infant (pregnancy).',
        pitfall: 'Failing to identify an underlying silent myocardial infarction or occult sepsis will lead to recurrent arrest.'
      }
    ]
  },

  hyperventilation_acute: {
    id: 'hyperventilation_acute',
    title: 'Acute Hyperventilation / Panic Attack Management Protocol',
    urgency: 'Urgent Symptomatic Relief',
    urgencyColor: 'sky',
    category: 'Respiratory Alkalosis',
    keyConcept: 'Calm Grounding ➔ Paced Abdominal Breathing ➔ Explain Ionized Calcium Mechanism (No IV Calcium!) ➔ Avoid Paper Bag Hypoxia Trap.',
    steps: [
      {
        step: 1,
        action: 'Calm Grounding & Verbal De-escalation (First-Line)',
        dosing: 'Immediate reassurance, direct eye contact in a low-stimulus environment. Paced abdominal breathing: inhale 4 sec, hold 4 sec, exhale 6 sec.',
        why: 'Decreases sympathetic adrenergic surge, breaking the tachypneic panic feedback loop that is driving PaCO₂ down.',
        pitfall: 'Do not leave the patient alone; isolation escalates acute panic.'
      },
      {
        step: 2,
        action: 'Correct Hypocapnia with Paced / Cupped-Hand Breathing (Paper Bag Caution!)',
        dosing: 'Cupped hands over mouth/nose or triangular breathing techniques.',
        why: 'Re-breathing expired air rich in CO₂ raises alveolar PaCO₂ back towards 4.7–6.0 kPa, directly correcting the alkalemia and restoring cerebral arterial caliber.',
        pitfall: '⚠️ NEVER use a closed paper bag if cardiac, pulmonary, or toxic causes of tachypnea (pulmonary embolism, asthma, pneumothorax, aspirin overdose) have not been rigorously excluded. Bag re-breathing in a hypoxic patient can cause fatal asphyxiation!'
      },
      {
        step: 3,
        action: 'Explain Mechanism of Paresthesias & Tetany (No Calcium Injections Needed!)',
        dosing: 'Patient education; no intravenous calcium required.',
        why: 'Explain that tingling lips/fingers and hand spasms (carpopedal spasm / Trousseau sign) are caused by transient binding of ionized Ca²⁺ to albumin in alkaline blood, not permanent nerve damage. As PaCO₂ normalizes and pH returns to 7.40, protons displace calcium from albumin, instantly restoring free ionized calcium without IV calcium infusions.',
        pitfall: 'Do not administer IV calcium for acute respiratory alkalosis tetany—total body calcium is completely normal.'
      },
      {
        step: 4,
        action: 'Judicious Short-Acting Anxiolytic (Only if Refractory)',
        dosing: 'Lorazepam 0.5–1 mg oral/sublingual only if severe refractory hyperventilation persists despite 20 minutes of coaching.',
        why: 'Provides GABA-mediated sedation to break severe refractory panic cycles.',
        pitfall: 'Avoid high doses of sedatives before ruling out medical triggers like pulmonary embolism or acute poisoning.'
      }
    ]
  },

  alcohol_aka: {
    id: 'alcohol_aka',
    title: 'Alcoholic Ketoacidosis (AKA) Step-by-Step Management Protocol',
    urgency: 'High Priority Resuscitation',
    urgencyColor: 'purple',
    category: 'Metabolic Acidosis',
    keyConcept: 'Thiamine BEFORE Glucose ➔ Dextrose + Saline Resuscitation ➔ Replete Potassium & Magnesium ➔ NO Exogenous Insulin Needed.',
    steps: [
      {
        step: 1,
        action: 'Administer High-Dose IV Thiamine (Vitamin B₁) BEFORE ANY Dextrose',
        dosing: 'Thiamine 100–500 mg IV immediately before starting glucose-containing fluids.',
        why: 'Malnourished chronic alcohol users have depleted hepatic thiamine stores. Infusing glucose forces pyruvate down the oxidative pathway, consuming the remaining trace thiamine and precipitating acute, irreversible Wernicke\'s Encephalopathy (confusion, ophthalmoplegia, ataxia) or Korsakoff syndrome!',
        pitfall: '⚠️ Giving glucose before thiamine in a malnourished alcoholic patient is a classic board examination pitfall with catastrophic neurological consequences.'
      },
      {
        step: 2,
        action: 'Dextrose + Isotonic Saline Resuscitation (D5 0.9% NaCl)',
        dosing: '5% Dextrose in 0.9% NaCl (or 0.45% NaCl) at 150–250 mL/h.',
        why: 'AKA patients suffer from starvation, vomiting, and alcohol cessation. Unlike DKA, their insulin is low, but their pancreas works! Dextrose stimulates endogenous insulin release, while saline restores volume to suppress glucagon and cortisol. The combination rapidly halts lipolysis and stops ketoacid generation.',
        pitfall: 'Do not give normal saline alone without dextrose—saline alone will not stimulate insulin release or halt ketogenesis.'
      },
      {
        step: 3,
        action: 'Aggressive Potassium, Magnesium, and Phosphate Replacement',
        dosing: 'Add KCl 20–30 mEq/L and IV Magnesium Sulfate 1–2 g over 1 hour. Monitor serum phosphate.',
        why: 'Chronic alcoholism causes severe renal magnesium wasting. Hypomagnesemia disables the Na⁺/K⁺-ATPase pump and makes ROMK potassium channels leaky, causing refractory hypokalemia. Dextrose also drives phosphate into cells; monitor for refeeding hypophosphatemia.',
        pitfall: 'Refractory hypokalemia will never correct until magnesium deficiency is cured.'
      },
      {
        step: 4,
        action: 'Do NOT Give Exogenous Insulin (Key Difference from DKA!)',
        dosing: 'No insulin needed. Monitor blood glucose every 1–2 hours.',
        why: 'Exogenous insulin is dangerous in AKA because glycogen reserves are exhausted. Giving insulin easily triggers life-threatening hypoglycemia. Dextrose alone is curative.',
        pitfall: 'Treating AKA like DKA with an insulin drip causes severe hypoglycemia and seizure.'
      }
    ]
  },

  toxic_alcohol_methanol: {
    id: 'toxic_alcohol_methanol',
    title: 'Methanol Poisoning Emergency Protocol',
    urgency: 'Critical Toxicological Emergency',
    urgencyColor: 'rose',
    category: 'Toxic Ingestion',
    keyConcept: 'ADH Blockade (Fomepizole) ➔ Sodium Bicarbonate (Formate Ion Trapping) ➔ Folinic Acid ➔ Emergent Hemodialysis.',
    steps: [
      {
        step: 1,
        action: 'Immediate Alcohol Dehydrogenase (ADH) Inhibition with Fomepizole',
        dosing: 'Fomepizole loading dose 15 mg/kg IV over 30 min (or oral/IV ethanol to target blood ethanol 22–33 mmol/L / 100–150 mg/dL).',
        why: 'Methanol itself is relatively non-toxic; its lethal metabolite is Formic Acid, produced by ADH. Fomepizole has 8,000-fold higher affinity for ADH than methanol, completely blocking toxic conversion.',
        pitfall: '⚠️ Do not wait for confirmatory gas chromatography blood levels to start fomepizole if osmolal gap is elevated or clinical suspicion is high!'
      },
      {
        step: 2,
        action: 'Sodium Bicarbonate Infusion (Critical for Retinal Protection)',
        dosing: 'IV NaHCO₃ bolus (1–2 mEq/kg) and continuous infusion to target arterial pH > 7.35.',
        why: 'Formic acid has a pKa of 3.75. In acidic blood, formic acid is non-ionized and rapidly crosses cell membranes into the retina and optic nerve, causing blindness. Alkalinizing the blood converts formic acid into the charged formate anion (Formate⁻), which cannot cross membranes ("ion trapping"), preserving vision!',
        pitfall: 'Do not withhold bicarbonate in methanol poisoning—it is eye-saving therapy.'
      },
      {
        step: 3,
        action: 'Folinic Acid (Leucovorin) or Folic Acid Administration',
        dosing: 'Folinic acid 50 mg IV every 4–6 hours (or Folic acid 50 mg).',
        why: 'In humans, formic acid clearance is limited by folate stores. High-dose folinic acid accelerates endogenous hepatic metabolism of formic acid into non-toxic CO₂ and water.',
        pitfall: 'Folinic acid is preferred over folic acid because it does not require reduction by dihydrofolate reductase.'
      },
      {
        step: 4,
        action: 'Emergent Hemodialysis',
        dosing: 'Urgent nephrology consult for high-flux hemodialysis. Increase fomepizole dosing frequency to every 4 hours during dialysis.',
        why: 'Indications: Visual symptoms, severe metabolic acidosis (pH < 7.25), serum methanol > 15 mmol/L (50 mg/dL), or renal failure. Hemodialysis rapidly clears both circulating methanol and toxic formic acid from the blood within hours.',
        pitfall: 'Remember that hemodialysis clears fomepizole and ethanol; dosing must be increased during dialysis.'
      }
    ]
  },

  toxic_alcohol_ethylene_glycol: {
    id: 'toxic_alcohol_ethylene_glycol',
    title: 'Ethylene Glycol (Antifreeze) Poisoning Protocol',
    urgency: 'Critical Toxicological Emergency',
    urgencyColor: 'rose',
    category: 'Toxic Ingestion',
    keyConcept: 'ADH Blockade (Fomepizole) ➔ Pyridoxine & Thiamine Cofactors ➔ Judicious Calcium ➔ Emergent Hemodialysis.',
    steps: [
      {
        step: 1,
        action: 'Immediate ADH Competitive Blockade with Fomepizole',
        dosing: 'Fomepizole 15 mg/kg IV loading dose over 30 min (or oral/IV ethanol targeting 100–150 mg/dL).',
        why: 'Halts the conversion of ethylene glycol to toxic glycolic acid and oxalic acid by Alcohol Dehydrogenase.',
        pitfall: 'Start antidote immediately if high anion gap acidosis, high osmolal gap, or calcium oxalate crystals (envelope-shaped) in urine are present.'
      },
      {
        step: 2,
        action: 'Pyridoxine (Vitamin B₆) and Thiamine (Vitamin B₁) Cofactor Therapy',
        dosing: 'IV Pyridoxine 100 mg + IV Thiamine 100 mg daily.',
        why: 'Promotes non-toxic clearance shunts: Pyridoxine drives glyoxylic acid into benign glycine; Thiamine converts glyoxylic acid into benign alpha-hydroxy-beta-ketoadipate. This prevents conversion to oxalic acid.',
        pitfall: 'Do not omit vitamin cofactors—they divert metabolism away from nephrotoxic oxalate.'
      },
      {
        step: 3,
        action: 'Calcium Replacement ONLY if Clinically Symptomatic',
        dosing: '10% Calcium Gluconate 10–20 mL IV over 10 min only for tetany, seizures, or dangerous QTc prolongation.',
        why: 'Oxalate binds calcium into insoluble calcium oxalate crystals, causing severe hypocalcemia. However, aggressive calcium replacement can accelerate crystal deposition in renal tubules (ATN) and myocardium; treat only life-threatening hypocalcemia symptoms.',
        pitfall: '⚠️ Do not aggressively normalize asymptomatic calcium levels—excess calcium accelerates crystal precipitation in kidneys!'
      },
      {
        step: 4,
        action: 'Emergent Hemodialysis',
        dosing: 'Indications: Glycolic acid accumulation, acute renal failure, pH < 7.25, or ethylene glycol > 50 mg/dL.',
        why: 'Rapidly clears toxic glycolate and parent ethylene glycol, aborting acute tubular necrosis.',
        pitfall: 'Delaying dialysis in the face of severe acidosis leads to irreversible renal failure.'
      }
    ]
  },

  salicylate_toxicity: {
    id: 'salicylate_toxicity',
    title: 'Salicylate / Aspirin Overdose Management Protocol',
    urgency: 'Critical Toxicological Emergency',
    urgencyColor: 'rose',
    category: 'Toxic Ingestion',
    keyConcept: 'Urine & Serum Alkalinization (Ion Trapping) ➔ Potassium Repletion (Mandatory!) ➔ IV Dextrose ➔ Avoid Intubation Trap ➔ Hemodialysis.',
    steps: [
      {
        step: 1,
        action: 'Urinary and Serum Alkalinization via Sodium Bicarbonate',
        dosing: '100–150 mEq NaHCO₃ in 1 L D5W at 1.5–2x maintenance rate (200–250 mL/h), targeting urine pH 7.5–8.0 and arterial blood pH 7.50–7.55.',
        why: 'Salicylic acid (pKa ≈ 3.0) in alkaline urine converts entirely into charged salicylate anions (Salicylate⁻), which cannot be reabsorbed by renal tubules. This increases urinary excretion by > 20-fold ("ion trapping")!',
        pitfall: 'Do not let arterial blood pH exceed 7.55 to prevent severe hypokalemia and cerebral vasoconstriction.'
      },
      {
        step: 2,
        action: 'Aggressive Potassium Supplementation (The Renal Alkalinization Key)',
        dosing: 'Add 20–40 mEq KCl per liter of bicarbonate infusion, maintaining serum K⁺ at 4.5–5.0 mmol/L.',
        why: 'The kidneys CANNOT alkalinize urine if the patient is hypokalemic! In hypokalemia, renal tubules are forced to excrete H⁺ instead of K⁺ to reabsorb sodium (paradoxical aciduria), locking salicylate inside the body.',
        pitfall: '⚠️ If urine pH remains < 7.0 despite bicarbonate infusion, check and replete potassium immediately! You cannot alkalinize urine in hypokalemia.'
      },
      {
        step: 3,
        action: 'Administer IV Dextrose (Preventing Cerebral Neuroglycopenia)',
        dosing: 'Give D5W or D10W regardless of normal peripheral blood glucose levels.',
        why: 'Salicylates uncouple oxidative phosphorylation in the brain, causing cerebral glucose consumption to skyrocket. Brain cells can starve (neuroglycopenia) leading to coma and seizures even when serum fingerstick glucose is normal!',
        pitfall: 'Do not withhold dextrose based on a normal peripheral glucose reading.'
      },
      {
        step: 4,
        action: 'Avoid Intubation If Possible (The Deadliest Trap!)',
        dosing: 'Avoid mechanical ventilation unless respiratory arrest or severe hypoxemia. If intubation is mandatory, match pre-intubation minute ventilation (extremely high respiratory rate).',
        why: 'The patient\'s spontaneous hyperventilation (PaCO₂ ~15–20 mmHg) is their only defense against acidosis. During sedation and paralysis, ventilation drops; PaCO₂ spikes, blood pH plummets, uncharged salicylic acid rushes across the blood-brain barrier into the brain, causing cardiac arrest on the intubation table!',
        pitfall: '⚠️ Intubating a severe salicylate poisoning patient without hyperventilating them at 25–35 breaths/min causes immediate death.'
      },
      {
        step: 5,
        action: 'Emergent Hemodialysis',
        dosing: 'Indications: Serum salicylate > 7.2 mmol/L (100 mg/dL) acute or > 4.3 mmol/L (60 mg/dL) chronic, pulmonary edema, CNS toxicity (confusion, seizures), or failure of urine alkalinization.',
        why: 'Hemodialysis rapidly clears salicylate and corrects acid-base balance.',
        pitfall: 'Do not delay hemodialysis in patients with altered mental status or refractory acidosis.'
      }
    ]
  },

  lactic_acidosis_sepsis: {
    id: 'lactic_acidosis_sepsis',
    title: 'Septic Shock & Severe Lactic Acidosis (Type A) Protocol',
    urgency: 'Critical Resuscitation (Hour-1 Bundle)',
    urgencyColor: 'rose',
    category: 'Metabolic Acidosis',
    keyConcept: 'Early Balanced Crystalloids (30 mL/kg) ➔ Norepinephrine (MAP ≥ 65) ➔ Antibiotics within 1 Hour ➔ Source Control ➔ Avoid Routine Bicarbonate.',
    steps: [
      {
        step: 1,
        action: 'Immediate Balanced Crystalloid Resuscitation',
        dosing: '30 mL/kg IV balanced crystalloid (Plasmalyte or Ringer\'s Lactate) within the first 3 hours.',
        why: 'Reverses systemic vasodilation, restores microvascular capillary perfusion, and brings oxygen back to struggling mitochondria so cells can convert lactate back into pyruvate.',
        pitfall: 'Avoid large volumes of 0.9% Normal Saline to prevent hyperchloremic metabolic acidosis and renal vasoconstriction.'
      },
      {
        step: 2,
        action: 'Early Vasopressor Support — Norepinephrine First-Line',
        dosing: 'Titrate Norepinephrine to target Mean Arterial Pressure (MAP) ≥ 65 mmHg. Add Vasopressin (0.03 U/min) if norepinephrine requirements escalate.',
        why: 'Restores perfusion pressure to vital organs (brain, kidneys, heart) without excessive beta-1 tachycardia.',
        pitfall: 'Do not delay vasopressors while waiting for fluid infusions to complete in profound hypotension.'
      },
      {
        step: 3,
        action: 'Blood Cultures & Broad-Spectrum Antimicrobial Therapy within 1 Hour',
        dosing: 'Obtain 2 sets of blood cultures, then immediately administer broad-spectrum empiric IV antibiotics (e.g., Piperacillin-Tazobactam + Vancomycin or Meropenem) within 60 minutes.',
        why: 'Treating the underlying microbial infection stops the endotoxin cascade driving tissue hypoperfusion.',
        pitfall: 'Every hour of delay in antibiotic administration in septic shock increases mortality by ~7.6%.'
      },
      {
        step: 4,
        action: 'Avoid Routine Sodium Bicarbonate (Surviving Sepsis Campaign Guideline)',
        dosing: 'Do NOT give NaHCO₃ if pH ≥ 7.15 (only consider if pH < 7.15 and severe AKI).',
        why: 'Bicarbonate does NOT improve hemodynamics in sepsis. It generates dissolved CO₂ which diffuses into cells causing paradoxical intracellular acidosis, shifts the oxygen curve leftward (impairing tissue oxygen unloading), and causes fluid overload.',
        pitfall: 'Blindly pushing bicarbonate amps does not improve cardiac function or survival in lactic acidosis.'
      }
    ]
  },

  copd_acute_on_chronic: {
    id: 'copd_acute_on_chronic',
    title: 'COPD Exacerbation (Acute-on-Chronic Hypoventilation) Protocol',
    urgency: 'High Priority Medical Care',
    urgencyColor: 'amber',
    category: 'Respiratory Acidosis',
    keyConcept: 'Controlled Oxygen (Target 88–92%, NOT 100%!) ➔ Non-Invasive Ventilation (NIV / BiPAP) ➔ Inhaled Bronchodilators ➔ Systemic Steroids.',
    steps: [
      {
        step: 1,
        action: 'Titrated Oxygen Therapy (Strict Target: SpO₂ 88–92%)',
        dosing: 'Venturi mask 24% or 28%, or low-flow nasal cannula 1–2 L/min.',
        why: 'High-flow oxygen in chronic hypercapnia abolishes hypoxic pulmonary vasoconstriction, increasing dead space (V/Q mismatch) and triggering the Haldane effect (deoxygenated Hb binds more CO₂; hyperoxia dumps CO₂ into plasma). This causes acute severe CO₂ narcosis and coma!',
        pitfall: '⚠️ Never give 100% non-rebreather oxygen to a stable COPD patient. Target SpO₂ 88–92% strictly.'
      },
      {
        step: 2,
        action: 'Non-Invasive Positive Pressure Ventilation (NIV / BiPAP)',
        dosing: 'IPAP 10–12 cmH₂O, EPAP 4–5 cmH₂O, titrating to patient comfort. Indications: pH < 7.35 and PaCO₂ > 6.0 kPa despite bronchodilators.',
        why: 'Unloads fatigued respiratory muscles, increases tidal volume to clear CO₂, and reduces intubation rates by > 60% and mortality by > 50%.',
        pitfall: 'Do not delay NIV until the patient is comatose (GCS < 8 is a contraindication to BiPAP requiring intubation).'
      },
      {
        step: 3,
        action: 'Inhaled Bronchodilator Therapy',
        dosing: 'Nebulized Salbutamol 2.5–5 mg + Ipratropium 0.5 mg driven by medical air (NOT high-flow oxygen!).',
        why: 'Reverses reversible bronchoconstriction and dynamic hyperinflation.',
        pitfall: 'Driving nebulizers with 15 L/min 100% O₂ for 20 minutes can induce severe hypercapnic coma.'
      },
      {
        step: 4,
        action: 'Systemic Corticosteroids & Targeted Antibiotics',
        dosing: 'Prednisone 40 mg oral daily for 5 days. Add targeted antibiotics (e.g. Amoxicillin-Clavulanate or Macrolide) if purulent sputum present.',
        why: 'Reduces bronchial mucosal inflammation and shortens recovery time.',
        pitfall: 'Avoid prolonged courses of steroids (> 5 days) which provide no extra benefit and cause steroid myopathy.'
      }
    ]
  },

  opiate_overdose: {
    id: 'opiate_overdose',
    title: 'Acute Opiate / Heroin Overdose Emergency Protocol',
    urgency: 'Immediate Emergency Resuscitation',
    urgencyColor: 'rose',
    category: 'Respiratory Acidosis',
    keyConcept: 'Ventilate First (Bag-Valve-Mask) ➔ Titrated Naloxone (Restore Breathing, NOT Withdrawal) ➔ Continuous Observation.',
    steps: [
      {
        step: 1,
        action: 'Support Airway & Bag-Valve-Mask Ventilation with 100% Oxygen First',
        dosing: 'Deliver rescue breaths (1 breath every 5–6 seconds) with high-flow oxygen.',
        why: 'Reverses life-threatening cerebral hypoxia before the antidote is administered, preventing hypoxic brain damage and cardiac arrest.',
        pitfall: 'Do not search for naloxone while the patient remains apnoeic—ventilate with bag-valve-mask immediately!'
      },
      {
        step: 2,
        action: 'Titrate Naloxone (Narcan) to Restore Breathing, NOT Full Wakefulness',
        dosing: 'Naloxone 0.04–0.4 mg IV/IM (or 2–4 mg intranasal). Repeat every 2–3 minutes until spontaneous respiratory rate ≥ 10 breaths/min.',
        why: 'A competitive mu-opioid receptor antagonist. Titrating slowly restores adequate spontaneous breathing without plunging the chronic user into violent withdrawal (agitation, vomiting with aspiration, pulmonary edema).',
        pitfall: 'Giving 2 mg IV push to a chronic opioid user causes violent acute withdrawal with severe pulmonary edema.'
      },
      {
        step: 3,
        action: 'Continuous Monitoring for Recurrent Toxicity (Half-Life Mismatch)',
        dosing: 'Monitor vital signs and respiratory rate for at least 2–4 hours (longer for Methadone).',
        why: 'Naloxone half-life is only 30–90 minutes, whereas most opioids last 4–8+ hours. The patient will wake up, feel fine, and slip back into fatal hypoventilation once naloxone wears off!',
        pitfall: '⚠️ Do not discharge the patient immediately after they wake up—naloxone wears off much faster than opioids!'
      }
    ]
  },

  severe_vomiting: {
    id: 'severe_vomiting',
    title: 'Severe Vomiting / Pyloric Stenosis (Metabolic Alkalosis) Protocol',
    urgency: 'High Priority Fluid Correction',
    urgencyColor: 'amber',
    category: 'Metabolic Alkalosis',
    keyConcept: '0.9% NaCl Isotonic Resuscitation (Chloride-Responsive) ➔ Aggressive KCl Repletion ➔ Antiemetics.',
    steps: [
      {
        step: 1,
        action: 'Volume Resuscitation with Isotonic Saline (0.9% NaCl)',
        dosing: '0.9% NaCl infusion at 150–250 mL/h.',
        why: 'Vomiting causes hypochloremia and hypovolemia. The kidneys cannot excrete excess bicarbonate because volume depletion triggers aldosterone to reabsorb all sodium, co-reabsorbing bicarbonate. Supplying chloride restores extracellular volume and allows renal pendrin exchangers in the collecting duct to excrete excess bicarbonate!',
        pitfall: 'Do not use balanced fluids with low chloride (like Hartmann\'s) in chloride-responsive alkalosis; 0.9% NaCl is the specific drug of choice.'
      },
      {
        step: 2,
        action: 'Aggressive Potassium Replacement (KCl)',
        dosing: 'Add 20–40 mEq KCl per liter of IV fluid.',
        why: 'Hypokalemia perpetuates metabolic alkalosis! Low K⁺ causes an intracellular shift where cells take in H⁺ in exchange for K⁺. In renal tubular cells, this intracellular acidosis stimulates H⁺ secretion and new bicarbonate generation (paradoxical aciduria). You cannot cure metabolic alkalosis without curing hypokalemia.',
        pitfall: '⚠️ Metabolic alkalosis cannot be corrected until hypokalemia is fully treated.'
      },
      {
        step: 3,
        action: 'Antiemetic Therapy',
        dosing: 'Ondansetron 4–8 mg IV every 8 hours.',
        why: 'Halts further gastric HCl and potassium losses.',
        pitfall: 'Check QTc on ECG before giving antiemetics in severe hypokalemic patients.'
      }
    ]
  },

  severe_diarrhea: {
    id: 'severe_diarrhea',
    title: 'Severe Secretory Diarrhea (NAGMA) Protocol',
    urgency: 'High Priority Rehydration',
    urgencyColor: 'amber',
    category: 'Metabolic Acidosis',
    keyConcept: 'Balanced Crystalloids (Ringer\'s/Plasmalyte, NOT Saline!) ➔ Potassium Repletion ➔ Oral Rehydration.',
    steps: [
      {
        step: 1,
        action: 'Fluid Resuscitation with Balanced Crystalloids (Ringer\'s Lactate or Plasmalyte)',
        dosing: 'Infuse balanced crystalloids at 200–300 mL/h.',
        why: 'Secretory diarrhea loses massive amounts of sodium bicarbonate. Giving 0.9% Normal Saline worsens the acidosis by delivering high chloride loads (iatrogenic hyperchloremic acidosis). Balanced fluids provide bicarbonate precursors (lactate, acetate) that regenerate bicarbonate base.',
        pitfall: '⚠️ Avoid 0.9% Normal Saline in diarrhea NAGMA—it adds a high chloride burden, worsening the hyperchloremic acidosis!'
      },
      {
        step: 2,
        action: 'Aggressive Potassium Repletion',
        dosing: 'Add KCl 20–30 mEq/L (oral or IV).',
        why: 'Diarrhea fluid contains up to 30–50 mmol/L of potassium, leading to profound total-body potassium depletion.',
        pitfall: 'Failing to replace potassium leads to muscle weakness and cardiac arrhythmias.'
      },
      {
        step: 3,
        action: 'Oral Rehydration Solution (ORS) or IV Bicarbonate for Severe Acidosis',
        dosing: 'WHO ORS solution orally, or isotonic sodium bicarbonate (1.26% or 150 mEq in D5W) if arterial pH < 7.15.',
        why: 'Exploits intestinal SGLT1 cotransport of sodium and glucose to maximize water absorption.',
        pitfall: 'Never give antimotility agents (e.g. Loperamide) in inflammatory or bloody diarrhea (dysentery).'
      }
    ]
  },

  ards_severe: {
    id: 'ards_severe',
    title: 'Severe ARDS (Acute Respiratory Distress Syndrome) Protocol',
    urgency: 'Critical ICU Protocol',
    urgencyColor: 'rose',
    category: 'Respiratory Acidosis',
    keyConcept: 'Lung-Protective Ventilation (4–6 mL/kg PBW) ➔ Permissive Hypercapnia ➔ High PEEP ➔ Early Prone Positioning.',
    steps: [
      {
        step: 1,
        action: 'Lung-Protective Mechanical Ventilation (ARDSNet Protocol)',
        dosing: 'Tidal volume 4–6 mL/kg of Predicted Body Weight (PBW) (NOT actual weight!). Target plateau pressure Pplat ≤ 30 cmH₂O and driving pressure ≤ 14 cmH₂O.',
        why: 'ARDS damages and fills alveoli with exudate, leaving only a small portion of functional lung ("baby lung"). Normal tidal volumes overdistend and rupture these alveoli (volutrauma and barotrauma).',
        pitfall: '⚠️ Setting tidal volume based on actual patient weight in an obese patient causes fatal lung rupture (barotrauma).'
      },
      {
        step: 2,
        action: 'Permissive Hypercapnia',
        dosing: 'Tolerate respiratory acidosis with PaCO₂ up to 6.5–8.5 kPa (50–65 mmHg) as long as arterial pH remains ≥ 7.20.',
        why: 'Prioritizes lung protection over normal blood gas numbers. Trying to blow off all CO₂ requires destructive tidal volumes.',
        pitfall: 'Avoid permissive hypercapnia in patients with acute traumatic brain injury or severe intracranial hypertension.'
      },
      {
        step: 3,
        action: 'Titrate PEEP (Positive End-Expiratory Pressure)',
        dosing: 'Higher PEEP strategy (10–18 cmH₂O) paired with FiO₂ according to ARDSNet tables.',
        why: 'Prevents cyclic opening and collapse of alveoli at end-expiration (atelectotrauma) and recruits collapsed lung units.',
        pitfall: 'Excessive PEEP can overdistend healthy alveoli and impair venous return, dropping cardiac output.'
      },
      {
        step: 4,
        action: 'Early Prone Positioning (≥ 16 hours/day)',
        dosing: 'Prone ventilation for at least 16 consecutive hours daily if P/F ratio < 20 kPa (150 mmHg).',
        why: 'Decreases ventral-dorsal transpulmonary pressure gradients, recruits dorsal lung regions, optimizes V/Q matching, and significantly reduces mortality (PROSEVA trial).',
        pitfall: 'Delaying proning until day 3–4 reduces its mortality benefit; start early within 36 hours.'
      }
    ]
  },

  pulmonary_embolism: {
    id: 'pulmonary_embolism',
    title: 'Acute Pulmonary Embolism (High/Intermediate Risk) Protocol',
    urgency: 'Critical Emergency',
    urgencyColor: 'rose',
    category: 'Respiratory Alkalosis',
    keyConcept: 'Cautious Fluids (Avoid RV Overload) ➔ Immediate Anticoagulation ➔ Systemic Thrombolysis (if Unstable) ➔ Norepinephrine.',
    steps: [
      {
        step: 1,
        action: 'Hemodynamic Resuscitation & Cautious Fluids',
        dosing: 'Limit IV fluids to ≤ 500 mL crystalloid; use Norepinephrine immediately if hypotensive.',
        why: 'Massive PE increases pulmonary vascular resistance, causing acute right ventricular (RV) failure. Over-filling the right ventricle dilates the RV, bowing the interventricular septum into the LV, crushing LV preload and precipitating fatal obstructive cardiogenic shock!',
        pitfall: '⚠️ Giving aggressive fluid boluses (e.g. 2–3 L) in massive PE worsens acute cor pulmonale and accelerates circulatory collapse!'
      },
      {
        step: 2,
        action: 'Immediate Therapeutic Anticoagulation',
        dosing: 'Unfractionated Heparin (UFH) IV bolus 80 units/kg followed by 18 units/kg/h infusion (or LMWH Enoxaparin 1 mg/kg BID if stable).',
        why: 'Stops clot propagation and allows endogenous fibrinolysis to dissolve existing thrombi.',
        pitfall: 'Do not delay anticoagulation while waiting for CT pulmonary angiogram if clinical suspicion is high.'
      },
      {
        step: 3,
        action: 'Systemic Thrombolytic Therapy for Hemodynamically Unstable PE (High-Risk)',
        dosing: 'Alteplase (tPA) 100 mg IV over 2 hours (or 50 mg push in cardiac arrest).',
        why: 'Rapidly dissolves pulmonary arterial thrombi, relieving RV afterload and restoring cardiac output in obstructive shock.',
        pitfall: 'Screen for major bleeding contraindications (recent intracranial hemorrhage, active internal bleeding).'
      },
      {
        step: 4,
        action: 'Catheter-Directed Thrombectomy or Surgical Embolectomy',
        dosing: 'Immediate interventional radiology / cardiothoracic surgery consult.',
        why: 'For patients with absolute contraindications to thrombolysis or failed systemic thrombolysis.',
        pitfall: 'Do not withhold emergency intervention in deteriorating obstructive shock.'
      }
    ]
  },

  dka_with_vomiting: {
    id: 'dka_with_vomiting',
    title: 'Mixed Disorder: DKA + Severe Vomiting Protocol',
    urgency: 'Critical Emergency',
    urgencyColor: 'purple',
    category: 'Mixed Disorder',
    keyConcept: 'Unmask Hidden Ketoacidosis (Normal pH Trap!) ➔ IV Saline Resuscitation ➔ Early Potassium ➔ Insulin Infusion.',
    steps: [
      {
        step: 1,
        action: 'Recognize the Mixed Acid-Base Disorder',
        dosing: 'Look at the Anion Gap and Delta Ratio, not just the pH!',
        why: 'Do not be misled by the normal pH (7.38)! The massive Anion Gap (26 mmol/L) and high Delta Ratio (> 2.0) prove severe ketoacidosis is coexisting with vomiting-induced alkalosis.',
        pitfall: 'Assuming the patient is healthy because pH is 7.38 will lead to fatal ketoacidosis progression.'
      },
      {
        step: 2,
        action: 'Isotonic Saline Resuscitation with Early Potassium',
        dosing: '0.9% NaCl with 30–40 mEq KCl/L.',
        why: 'Both osmotic diuresis and vomiting waste massive amounts of potassium and chloride.',
        pitfall: 'Verify potassium before insulin administration to avoid fatal hypokalemia.'
      },
      {
        step: 3,
        action: 'Continuous Regular Insulin Infusion',
        dosing: '0.1 units/kg/h regular insulin to eliminate circulating ketoacids.',
        why: 'Suppresses lipolysis and halts hepatic ketone generation.',
        pitfall: 'Add dextrose (D5 1/2 NS) once glucose reaches ~12 mmol/L to keep insulin running.'
      }
    ]
  },

  normal_saline_overload: {
    id: 'normal_saline_overload',
    title: 'Normal Saline (0.9% NaCl) Resuscitation Acidosis Protocol',
    urgency: 'Iatrogenic Complication',
    urgencyColor: 'amber',
    category: 'Metabolic Acidosis',
    keyConcept: 'Stop 0.9% Saline ➔ Switch to Balanced Crystalloid (Plasmalyte/Ringer\'s) ➔ Allow Renal Pendrin Excretion.',
    steps: [
      {
        step: 1,
        action: 'Immediately Discontinue 0.9% Normal Saline',
        dosing: 'Stop all 0.9% NaCl infusions.',
        why: '0.9% Saline contains 154 mmol/L of Chloride (plasma normal is 104 mmol/L), with a Strong Ion Difference (SID) of zero (154 - 154 = 0). Massive saline infuses supra-physiological chloride, diluting plasma bicarbonate and creating hyperchloremic metabolic acidosis.',
        pitfall: 'Do not treat saline acidosis with sodium bicarbonate—simply stop the saline!'
      },
      {
        step: 2,
        action: 'Switch to Balanced Crystalloids (Plasmalyte or Ringer\'s Lactate)',
        dosing: 'Maintenance or replacement with Plasmalyte (Chloride 98 mmol/L, SID ~40).',
        why: 'Restores physiological SID, halts chloride loading, and allows plasma bicarbonate to recover.',
        pitfall: 'Continuing 0.9% Saline causes renal vasoconstriction and reduces GFR.'
      },
      {
        step: 3,
        action: 'Support Normal Renal Chloride Clearance',
        dosing: 'Maintain adequate urine output.',
        why: 'The kidneys will excrete excess chloride via tubular pendrin exchangers within 24–48 hours once the saline assault ceases.',
        pitfall: 'Ensure adequate volume without overloading the patient.'
      }
    ]
  },

  thiamine_pdh: {
    id: 'thiamine_pdh',
    title: 'Vitamin B₁ (Thiamine) Deficiency (PDH Failure) Protocol',
    urgency: 'Critical Medical Emergency',
    urgencyColor: 'rose',
    category: 'Biochemical Lesion',
    keyConcept: 'High-Dose IV Thiamine Immediately ➔ NEVER Glucose Alone ➔ Magnesium Repletion ➔ Hemodynamic Support.',
    steps: [
      {
        step: 1,
        action: 'Emergent High-Dose IV Thiamine (Vitamin B₁)',
        dosing: 'Thiamine 200–500 mg IV every 8 hours for 3–5 days, then 100 mg oral daily.',
        why: 'Thiamine Pyrophosphate (TPP) is the obligate prosthetic group for the E1 subunit of Pyruvate Dehydrogenase (PDH). Without TPP, PDH is paralyzed: pyruvate cannot enter the Krebs cycle as Acetyl-CoA and is shunted into lactic acid via LDH. Thiamine restores oxidative phosphorylation within hours!',
        pitfall: 'Do not delay thiamine—mitochondrial failure leads to high-output heart failure and irreversible brain damage.'
      },
      {
        step: 2,
        action: 'STRICT RULE: Never Administer Dextrose / Glucose Alone Without Thiamine!',
        dosing: 'Always give IV thiamine before any carbohydrate infusion.',
        why: 'High-carbohydrate infusions accelerate glycolysis, producing an avalanche of pyruvate that demands TPP cofactors. In a thiamine-deficient patient, this exhausts remaining trace cofactors and causes fatal lactic acidosis and acute Wernicke\'s encephalopathy!',
        pitfall: '⚠️ Infusing D5W alone in an alcoholic/malnourished patient is a fatal clinical trap.'
      },
      {
        step: 3,
        action: 'Magnesium Replacement',
        dosing: 'Replenish magnesium (target > 0.85 mmol/L).',
        why: 'The enzyme that converts dietary thiamine into active TPP (thiamine pyrophosphokinase) is strictly magnesium-dependent. Thiamine replacement fails if magnesium is low!',
        pitfall: 'Thiamine therapy is ineffective in the setting of concurrent hypomagnesemia.'
      },
      {
        step: 4,
        action: 'Hemodynamic Support for High-Output Heart Failure (Wet Beriberi)',
        dosing: 'Judicious fluid restriction; vasopressors if refractory hypotension.',
        why: 'High cardiac output and peripheral vasodilation rapidly reverse with thiamine.',
        pitfall: 'Avoid excessive fluid boluses in high-output failure to prevent acute pulmonary edema.'
      }
    ]
  },

  metformin_complex1: {
    id: 'metformin_complex1',
    title: 'Metformin-Associated Lactic Acidosis (MALA) Protocol',
    urgency: 'Critical Medical Emergency',
    urgencyColor: 'rose',
    category: 'Biochemical Lesion',
    keyConcept: 'Stop Metformin ➔ Hemodynamic Resuscitation ➔ Prolonged Hemodialysis / CRRT ➔ Bicarbonate Bath.',
    steps: [
      {
        step: 1,
        action: 'Immediate Discontinuation of Metformin',
        dosing: 'Stop metformin immediately.',
        why: 'Prevents further inhibition of mitochondrial respiratory chain Complex I.',
        pitfall: 'Ensure all home medications are reviewed and stopped.'
      },
      {
        step: 2,
        action: 'Emergent Hemodialysis or Continuous Renal Replacement Therapy (CRRT)',
        dosing: 'High-efficiency hemodialysis or continuous venovenous hemodiafiltration (CVVHDF) with bicarbonate-buffered dialysate for at least 15–24 hours.',
        why: 'Metformin has low protein binding and is readily dialyzable. Hemodialysis rapidly clears metformin from blood, removes massive accumulated lactate, and directly corrects the profound acidemia.',
        pitfall: '⚠️ Metformin slowly redistributes from erythrocyte and tissue pools. Dialysis must be prolonged to prevent post-dialysis rebound lactic acidosis!'
      },
      {
        step: 3,
        action: 'Hemodynamic and Vasopressor Support',
        dosing: 'Norepinephrine infusion for septic or distributive shock.',
        why: 'Maintains organ perfusion pressure during resuscitation.',
        pitfall: 'Metformin accumulation is almost always triggered by acute renal failure or sepsis.'
      },
      {
        step: 4,
        action: 'Identify and Treat the Triggering Event',
        dosing: 'Evaluate for sepsis, dehydration, NSAID use, or IV radiocontrast.',
        why: 'Treating the underlying cause allows renal recovery.',
        pitfall: 'Failing to identify concurrent sepsis increases mortality.'
      }
    ]
  },

  acetazolamide_ca: {
    id: 'acetazolamide_ca',
    title: 'Acetazolamide (Carbonic Anhydrase Inhibition) NAGMA Protocol',
    urgency: 'High Priority Drug Discontinuation',
    urgencyColor: 'amber',
    category: 'Biochemical Lesion',
    keyConcept: 'Stop Acetazolamide ➔ Bicarbonate Repletion ➔ Potassium Repletion.',
    steps: [
      {
        step: 1,
        action: 'Discontinue Acetazolamide (Diamox®)',
        dosing: 'Stop the medication.',
        why: 'Allows proximal renal tubular cells to resume normal reabsorption of 85% of filtered bicarbonate.',
        pitfall: 'Check if prescribed for glaucoma or altitude sickness and provide alternative therapy.'
      },
      {
        step: 2,
        action: 'Oral or IV Bicarbonate Repletion (if Symptomatic or Severe)',
        dosing: 'Sodium bicarbonate or potassium citrate supplementation.',
        why: 'Replenishes depleted alkaline buffer sponge until drug is eliminated.',
        pitfall: 'Do not overcorrect to alkalosis.'
      },
      {
        step: 3,
        action: 'Potassium Repletion',
        dosing: 'Monitor and replace potassium.',
        why: 'Acetazolamide blocks proximal sodium reabsorption, delivering high sodium downstream to ENaC, driving massive ROMK potassium wasting into urine.',
        pitfall: 'Hypokalemia is common and must be monitored.'
      }
    ]
  },

  cyanide_complex4: {
    id: 'cyanide_complex4',
    title: 'Cyanide / Smoke Poisoning (Complex IV Arrest) Protocol',
    urgency: 'Immediate Critical Emergency',
    urgencyColor: 'rose',
    category: 'Biochemical Lesion',
    keyConcept: '100% High-Flow Oxygen ➔ Hydroxocobalamin (Cyanokit) First-Line ➔ Sodium Thiosulfate ➔ Avoid Nitrites in Smoke Inhalation.',
    steps: [
      {
        step: 1,
        action: '100% High-Flow Oxygen via Non-Rebreather Mask or Intubation',
        dosing: 'Deliver high-flow oxygen immediately.',
        why: 'Maximizes dissolved oxygen in blood and facilitates antidote binding, even though oxygen alone cannot overcome Cytochrome c Oxidase arrest.',
        pitfall: 'Do not withhold oxygen because PaO₂ appears normal—tissues cannot use it!'
      },
      {
        step: 2,
        action: 'Hydroxocobalamin (Cyanokit®) — First-Line Antidote',
        dosing: 'Hydroxocobalamin 5 g IV infusion over 15 minutes (a second 5 g dose may be infused if severe).',
        why: 'The cobalt ion in hydroxocobalamin binds cyanide with higher affinity than Cytochrome c Oxidase, forming non-toxic Cyanocobalamin (Vitamin B₁₂), which is safely excreted in urine. Does not impair oxygen delivery (unlike nitrites), making it safe for smoke inhalation victims who also have carbon monoxide poisoning!',
        pitfall: 'Causes harmless reddish discoloration of skin and urine; warn clinical staff.'
      },
      {
        step: 3,
        action: 'Sodium Thiosulfate (Adjunctive Antidote)',
        dosing: 'Sodium Thiosulfate 12.5 g (50 mL of 25% solution) IV over 10–15 min.',
        why: 'Serves as a sulfur donor for the mitochondrial enzyme rhodanese, converting cyanide into non-toxic thiocyanate excreted in urine.',
        pitfall: 'Slower onset than hydroxocobalamin; use as partner or second-line.'
      },
      {
        step: 4,
        action: 'Avoid Nitrites (Sodium Nitrite / Amyl Nitrite) in Smoke Inhalation Victims!',
        dosing: 'Contraindicated in fire smoke victims.',
        why: 'Nitrites induce methemoglobinemia (Fe³⁺). In smoke inhalation, co-existing carboxyhemoglobin (from CO) combined with methemoglobin wipes out oxygen carrying capacity, causing fatal cerebral and myocardial anoxia!',
        pitfall: '⚠️ Giving nitrites to a smoke inhalation patient with CO poisoning is lethal!'
      }
    ]
  },

  paracetamol_oxoproline: {
    id: 'paracetamol_oxoproline',
    title: 'Glutathione Depletion (5-Oxoprolinuria) Protocol',
    urgency: 'High Priority Medical Care',
    urgencyColor: 'purple',
    category: 'Biochemical Lesion',
    keyConcept: 'Stop Paracetamol ➔ IV N-Acetylcysteine (NAC) ➔ Dextrose & Nutrition ➔ Monitor Anion Gap.',
    steps: [
      {
        step: 1,
        action: 'Immediately Discontinue Paracetamol / Acetaminophen',
        dosing: 'Stop all acetaminophen-containing medications.',
        why: 'Chronic therapeutic paracetamol use in malnourished, septic, or female patients depletes hepatic and renal glutathione stores. Without glutathione negative feedback, the enzyme gamma-glutamylcysteine synthetase runs uncontrolled, producing massive levels of 5-oxoproline (pyroglutamic acid).',
        pitfall: 'Often missed because paracetamol levels are normal or therapeutic!'
      },
      {
        step: 2,
        action: 'High-Dose IV N-Acetylcysteine (NAC / Acetylcysteine)',
        dosing: 'Standard IV NAC protocol (150 mg/kg IV loading over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours).',
        why: 'NAC provides cysteine, the rate-limiting substrate for glutathione synthesis. Replenishing intracellular glutathione restores negative feedback inhibition, immediately shutting down 5-oxoproline synthesis!',
        pitfall: 'Start NAC promptly even if paracetamol blood level is therapeutic.'
      },
      {
        step: 3,
        action: 'Nutritional Support & Dextrose Infusion',
        dosing: 'Dextrose and amino acid nutrition.',
        why: 'Starvation and malnutrition contribute to glutathione depletion.',
        pitfall: 'Malnutrition must be addressed to prevent recurrence.'
      },
      {
        step: 4,
        action: 'Monitor Anion Gap Resolution',
        dosing: 'Check electrolytes every 12–24 hours.',
        why: '5-oxoproline clears rapidly within 48–72 hours as glutathione pools recover.',
        pitfall: 'Confirm anion gap normalizes as patient recovers.'
      }
    ]
  }
};

// Enrich DiseasePresets if loaded
if (typeof DiseasePresets !== 'undefined') {
  DiseasePresets.forEach(preset => {
    if (TherapyProtocols[preset.id]) {
      preset.therapy = TherapyProtocols[preset.id];
    }
  });
}

// Global exposure
if (typeof window !== 'undefined') {
  window.TherapyProtocols = TherapyProtocols;
}
