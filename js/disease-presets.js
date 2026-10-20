/**
 * ArterioGas Pro - Comprehensive Pathophysiology & Disease Presets Library
 * Designed for Federal Medical Licensing Exams (Staatsexamen, USMLE Step 1/2 CK)
 * 
 * Each preset provides exact arterial values in kPa and mmol/L,
 * together with rigorous molecular, cellular, organ-level, and clinical explanations.
 */

const DiseasePresets = [
  {
    id: 'normal',
    name: 'Normal Healthy Adult (Reference Baseline)',
    category: 'Baseline',
    badge: 'Physiological',
    badgeColor: 'emerald',
    description: 'Resting young adult breathing ambient room air at sea level.',
    values: {
      pH: 7.40,
      pco2_kPa: 5.33, // 40 mmHg
      paO2_kPa: 12.5,  // ~94 mmHg
      fio2: 0.21,
      hco3: 24.0,
      be: 0.0,
      na: 140,
      k: 4.2,
      cl: 104,
      albumin: 40,
      glucose: 5.0,
      lactate: 0.9,
      urea: 4.5,
      tempC: 37.0,
      age: 25
    },
    pearls: [
      'Normal arterial pH: 7.35 – 7.45. Below 7.35 = Acidemia; above 7.45 = Alkalemia.',
      'Normal PaCO₂ (Lungs = Acid): 4.7 – 6.0 kPa (35 – 45 mmHg). Rule of thumb: 1 kPa ≈ 7.5 mmHg.',
      'Normal HCO₃⁻ (Kidneys = Base): 22.0 – 26.0 mmol/L (Standard baseline: 24.0 mmol/L).',
      'Normal PaO₂ (Oxygen): 10.0 – 13.3 kPa (75 – 100 mmHg) on ambient room air (FiO₂ 21%).',
      'The 20:1 Ratio: In health, there are 20 bicarbonate base molecules for every 1 molecule of dissolved carbonic acid.'
    ],
    explanation: {
      summary: 'Resting healthy adult in ideal acid-base equilibrium. The lungs and kidneys work in perfect balance.',
      mechanism: 'Every second, cellular metabolism produces CO₂ gas. CO₂ dissolves into carbonic acid, but the lungs quietly breathe it all out. Meanwhile, the kidneys excrete dietary acids and reclaim every molecule of bicarbonate base sponge.',
      respiratory: 'Automatic brainstem breathing maintains PaCO₂ right at the normal target of 5.3 kPa (40 mmHg).',
      renal: 'The kidneys filter and reabsorb >99% of bicarbonate, keeping blood bicarbonate steady at 24 mmol/L.',
      anionGap: 'Normal Anion Gap of 12.0 mmol/L (reference range: 10–14 mmol/L, 12 ± 2). Sodium (140) balances Chloride (104) and Bicarbonate (24), leaving exactly 12.0 mmol/L of normal unmeasured negative charges (chiefly albumin).',
      oxygenation: 'Normal PaO₂ (12.5 kPa / 94 mmHg). Oxygen passes effortlessly across alveolar membranes with a minimal A-a gradient (< 1.5 kPa).'
    }
  },
  {
    id: 'dka',
    name: 'Diabetic Ketoacidosis (DKA)',
    category: 'Metabolic Acidosis',
    badge: 'HAGMA (GOLD MARK - K)',
    badgeColor: 'purple',
    description: 'Absolute insulin deficiency with uncontrolled lipolysis, ketone accumulation, and vigorous Kussmaul hyperventilation.',
    values: {
      pH: 7.15,
      pco2_kPa: 2.7, // ~20.3 mmHg (Kussmaul compensation)
      paO2_kPa: 15.2, // ~114 mmHg (hyperventilation washes out alveolar N2/CO2, boosting PAO2)
      fio2: 0.21,
      hco3: 6.5,
      be: -19.5,
      na: 132, // pseudohyponatremia due to hyperosmolar glucose shift
      k: 5.6,  // hyperkalemia due to transcellular H+/K+ shift & lack of insulin, despite whole-body depletion!
      cl: 98,
      albumin: 40,
      glucose: 28.5, // severe hyperglycemia
      lactate: 1.8,
      urea: 12.0, // prerenal azotemia from osmotic diuresis
      tempC: 36.8,
      age: 23
    },
    pearls: [
      'The "K" in GOLD MARK: Absolute lack of insulin forces the liver to burn body fat into acidic ketones (beta-hydroxybutyrate and acetoacetate).',
      'Kussmaul breathing: Deep, fast, sighing hyperventilation. The body is desperately blowing off CO₂ acid to prevent death!',
      'Winter\'s formula rule: With bicarbonate down to 6.5 mmol/L, expected PaCO₂ is ~2.1–2.6 kPa (16–20 mmHg). The measured 2.7 kPa shows the lungs are working near their maximum physical limit.',
      'Potassium Paradox: Blood test shows high potassium (5.6 mmol/L) because acid forces potassium out of cells. But total body potassium is dangerously depleted! Starting insulin drives potassium back inside, which can cause sudden fatal hypokalemia if not monitored.'
    ],
    explanation: {
      summary: 'Severe High Anion Gap Metabolic Acidosis (HAGMA) caused by absolute insulin deficiency in diabetes.',
      mechanism: 'Without insulin, cells cannot use sugar. The starving body breaks down fat into acidic ketone bodies. These ketoacids flood the blood, releasing millions of H⁺ acid ions that destroy the protective bicarbonate buffer, driving pH down to a dangerous 7.15.',
      respiratory: 'The brain senses life-threatening acid and triggers Kussmaul respiration—deep, rapid, panting breaths blowing PaCO₂ down to 2.7 kPa (20 mmHg). This quick response keeps the patient alive until insulin is given.',
      renal: 'High sugar in the blood spills into urine, pulling gallons of water and salts with it (osmotic diuresis), causing severe dehydration.',
      anionGap: 'Huge Anion Gap (27.5 mmol/L). The unmeasured ketoacid anions blow open the gap.',
      oxygenation: 'PaO₂ is high because deep breathing pulls in lots of fresh air. The acidic pH shifts the oxygen curve to the right (Bohr effect), helping deliver oxygen to struggling tissues.'
    }
  },
  {
    id: 'hyperventilation_acute',
    name: 'Acute Hyperventilation / Panic Attack',
    category: 'Respiratory Alkalosis',
    badge: 'Acute Hypocapnia',
    badgeColor: 'blue',
    description: 'Acute emotional distress or panic leading to tachypnea, severe hypocapnia, tingling paresthesias, and carpopedal spasm.',
    values: {
      pH: 7.62,
      pco2_kPa: 2.6, // ~19.5 mmHg
      paO2_kPa: 16.5, // ~124 mmHg (alveolar wash-in)
      fio2: 0.21,
      hco3: 20.2, // minor drop via tissue non-bicarbonate buffers only
      be: 0.5,
      na: 141,
      k: 3.3, // hypokalemia due to intracellular K+ shift
      cl: 104,
      albumin: 42,
      glucose: 5.2,
      lactate: 1.1,
      urea: 4.2,
      tempC: 37.0,
      age: 26
    },
    pearls: [
      'Why do the hands cramp and fingers tingle? Alkaline blood causes albumin to bind free calcium. Low ionized calcium makes nerves hyper-excitable, triggering tingling lips and hand cramps (carpopedal spasm / Trousseau\'s sign).',
      'Acute vs. Chronic: In acute panic hyperventilation, the kidneys haven\'t had time to react (kidneys need 2 to 3 days). That\'s why bicarbonate only drops by ~2 mmol/L (due to red blood cell buffering).',
      'Lightheadedness: Low CO₂ (PaCO₂ < 3.5 kPa) causes blood vessels in the brain to constrict, reducing cerebral blood flow.'
    ],
    explanation: {
      summary: 'Acute uncompensated respiratory alkalosis caused by rapid, deep breathing during panic, anxiety, or acute pain.',
      mechanism: 'The patient breathes faster and deeper than needed. This blows out CO₂ acid into the air much faster than cells produce it. Losing acid shifts the blood into an alkaline state (pH 7.62).',
      respiratory: 'Emotional adrenaline surge temporarily overrides normal brainstem breathing controls.',
      renal: 'Kidneys have NOT adapted yet. It takes 24 to 72 hours for kidneys to pee out bicarbonate. Bicarbonate is only slightly down (20.2 mmol/L) from instantaneous cellular buffering.',
      anionGap: 'Normal Anion Gap. There are no mystery acids.',
      oxygenation: 'High PaO₂, but the alkaline blood makes hemoglobin grip oxygen too tightly (leftward curve shift), impairing oxygen delivery to the brain and heart.'
    }
  },
  {
    id: 'alcohol_aka',
    name: 'Alcoholic Ketoacidosis (AKA) & Binge Drinking',
    category: 'Metabolic Acidosis',
    badge: 'HAGMA (GOLD MARK - K)',
    badgeColor: 'purple',
    description: 'Chronic alcohol misuse followed by cessation, protracted vomiting, and starvation resulting in ketonemia dominated by beta-hydroxybutyrate.',
    values: {
      pH: 7.22,
      pco2_kPa: 3.2, // ~24 mmHg (respiratory compensation)
      paO2_kPa: 13.8,
      fio2: 0.21,
      hco3: 9.8,
      be: -15.5,
      na: 136,
      k: 3.4, // hypokalemic from vomiting and poor nutrition
      cl: 92,  // hypochloremia from gastric HCl loss (vomiting)
      albumin: 38,
      glucose: 4.1, // often normal or low (glycogen depletion) unlike DKA!
      lactate: 2.8,
      urea: 6.5,
      tempC: 36.5,
      age: 48
    },
    pearls: [
      'Crucial Exam Difference from DKA: Blood glucose is NORMAL or LOW (< 4.5 mmol/L), unlike DKA where glucose is sky-high!',
      'The Story: A heavy drinker goes on a multi-day binge, stops eating, and then starts vomiting. Starvation + alcohol metabolism drains liver sugar and triggers massive ketone production.',
      'Urine Dipstick Trap: Standard urine dipstick only detects acetoacetate, NOT beta-hydroxybutyrate. In AKA, high NADH turns most ketones into beta-hydroxybutyrate, so urine test can look falsely mild or negative!',
      'Massive Anion Gap: Anion Gap is 34.2 mmol/L due to unmeasured ketoacids and mild lactate.'
    ],
    explanation: {
      summary: 'Severe High Anion Gap Acidosis in a patient with chronic alcohol misuse who stopped eating and has been vomiting.',
      mechanism: 'Alcohol metabolism consumes NAD⁺ and produces huge amounts of NADH. High NADH blocks the liver from making new glucose. When the patient stops eating, glycogen empties and the body starves. The liver burns fat into ketone acids, pouring H⁺ ions into the blood and dropping pH to 7.22.',
      respiratory: 'Rapid compensatory breathing lowers PaCO₂ to 3.2 kPa (~24 mmHg) to defend pH.',
      renal: 'Vomiting causes severe dehydration, loss of stomach acid (hypochloremia), and low potassium.',
      anionGap: 'Massive Anion Gap (~34 mmol/L) driven by circulating beta-hydroxybutyrate.',
      oxygenation: 'Oxygenation is preserved on room air.'
    }
  },
  {
    id: 'toxic_alcohol_methanol',
    name: 'Toxic Alcohol Ingestion: Methanol Poisoning',
    category: 'Toxicology',
    badge: 'GOLD MARK - M',
    badgeColor: 'purple',
    description: 'Ingestion of adulterated spirits, moonshine, or windshield washer fluid containing methanol; presents with severe HAGMA, visual disturbances, and high osmolal gap.',
    values: {
      pH: 7.08,
      pco2_kPa: 2.5, // ~18.8 mmHg (intense compensatory hyperventilation)
      paO2_kPa: 14.5,
      fio2: 0.21,
      hco3: 5.2,
      be: -22.8,
      na: 142,
      k: 4.8,
      cl: 101,
      albumin: 40,
      glucose: 5.6,
      lactate: 2.1,
      urea: 5.2,
      measuredOsm: 345, // elevated measured serum osmolality
      tempC: 36.7,
      age: 41
    },
    pearls: [
      'The "M" in GOLD MARK: Methanol is found in windshield wiper solvent and bootleg moonshine. The liver converts it into lethal Formic Acid.',
      'The Blindness Hallmark: Formic acid selectively poisons the optic nerve and retina, causing "snowstorm" blurry vision and sudden blindness!',
      'High Osmolal Gap: Early after drinking, methanol creates a massive Osmolal Gap (> 10 mOsm/kg). Later, as it converts to formic acid, the Anion Gap opens up massively!',
      'Antidote: Fomepizole (or ethanol) blocks alcohol dehydrogenase, stopping methanol from turning into deadly formic acid.'
    ],
    explanation: {
      summary: 'Lethal High Anion Gap Metabolic Acidosis and optic nerve damage caused by drinking methanol.',
      mechanism: 'Methanol itself is relatively non-toxic, but the liver turns it into formaldehyde and then Formic Acid. Formic acid poisons the cells\' power plants (mitochondria) and releases massive amounts of H⁺ acid, dropping the pH to 7.08.',
      respiratory: 'Intense hyperventilation blows PaCO₂ down to 2.5 kPa (19 mmHg) to prevent death from acidemia.',
      renal: 'The kidneys are completely overwhelmed by the flood of circulating organic acid.',
      anionGap: 'Enormous Anion Gap (35.8 mmol/L), driven by unmeasured circulating formate ions.',
      oxygenation: 'Blood has oxygen, but cells cannot use it because their respiratory chain is poisoned by formic acid.'
    }
  },
  {
    id: 'toxic_alcohol_ethylene_glycol',
    name: 'Toxic Ingestion: Ethylene Glycol (Antifreeze)',
    category: 'Toxicology',
    badge: 'GOLD MARK - G',
    badgeColor: 'purple',
    description: 'Ingestion of automotive antifreeze with profound HAGMA, acute kidney injury from calcium oxalate monohydrate crystals, and hypocalcemia.',
    values: {
      pH: 7.10,
      pco2_kPa: 2.6, // ~19.5 mmHg
      paO2_kPa: 14.0,
      fio2: 0.21,
      hco3: 5.8,
      be: -21.4,
      na: 139,
      k: 5.1,
      cl: 99,
      albumin: 40,
      glucose: 5.8,
      lactate: 1.9, // some blood gas analyzers report falsely elevated lactate due to glycolate cross-reactivity!
      urea: 14.5,   // acute renal failure
      measuredOsm: 340,
      tempC: 36.9,
      age: 35
    },
    pearls: [
      'The "G" in GOLD MARK: Ethylene Glycol is automotive antifreeze. The body turns it into Glycolic acid and Oxalic acid.',
      'Kidney Failure by Crystals: Oxalic acid binds calcium to form needle-shaped calcium oxalate crystals that plug and destroy kidney tubules.',
      'Exam Clues: Sweet-tasting fluid ingestion + Acute kidney failure + Urine glows under a Wood\'s UV lamp (due to dye in antifreeze).',
      'Antidote: Fomepizole blocks the enzyme, plus hemodialysis to filter out the toxins.'
    ],
    explanation: {
      summary: 'Profound High Anion Gap Acidosis and acute kidney failure following antifreeze ingestion.',
      mechanism: 'Ethylene glycol is metabolized into glycolate and oxalate. Glycolate drives the severe acidosis (pH 7.10), while oxalate steals calcium from the blood and precipitates as sharp crystals in kidney tubules, shutting down urine production.',
      respiratory: 'Reflex hyperventilation drives PaCO₂ down to 2.6 kPa (~20 mmHg).',
      renal: 'Needle-like oxalate crystals mechanically plug nephrons, causing acute tubular necrosis and shutting down the kidneys.',
      anionGap: 'Massive Anion Gap (34.2 mmol/L), driven by unmeasured glycolate and oxalate.',
      oxygenation: 'Oxygenation is preserved, but tissues are in deep metabolic crisis.'
    }
  },
  {
    id: 'salicylate_toxicity',
    name: 'Salicylate / Aspirin Overdose (Mixed Disturbance)',
    category: 'Toxicology',
    badge: 'GOLD MARK - A',
    badgeColor: 'purple',
    description: 'Classic biphasic mixed acid-base disorder: direct medullary respiratory center stimulation (respiratory alkalosis) plus uncoupling of oxidative phosphorylation (HAGMA).',
    values: {
      pH: 7.46, // near-normal or slightly alkaline due to competing opposing disturbances!
      pco2_kPa: 2.4, // ~18 mmHg (profound hyperventilation)
      paO2_kPa: 15.5,
      fio2: 0.21,
      hco3: 13.0, // marked drop due to metabolic acidosis + respiratory alkalosis
      be: -9.8,
      na: 140,
      k: 3.2,
      cl: 104,
      albumin: 41,
      glucose: 4.8,
      lactate: 3.5, // uncoupled oxidative phosphorylation increases glycolysis and lactate
      urea: 5.0,
      tempC: 38.6, // hyperthermia from uncoupled mitochondrial proton gradient!
      age: 29
    },
    pearls: [
      'The "A" in GOLD MARK: Aspirin overdose produces the classic board exam triad: Tinnitus (ear ringing) + High Fever + Rapid breathing.',
      'The Famous Mixed Disorder: Aspirin directly stimulates the brain to hyperventilate (Respiratory Alkalosis), while poisoning mitochondria to produce lactic acid and ketones (Metabolic Acidosis). The two cancel each other out on the pH meter (pH 7.46)!',
      'Why the fever? Aspirin acts as a mitochondrial "uncoupler"—cellular energy leaks away as pure heat instead of ATP, raising body temperature (38.6°C)!',
      'Treatment: IV Sodium Bicarbonate alkalinizes the urine, trapping aspirin in the urine so the kidneys can pee it out.'
    ],
    explanation: {
      summary: 'Classic mixed acid-base disorder: Brain-driven Respiratory Alkalosis combined with High Anion Gap Metabolic Acidosis.',
      mechanism: 'Aspirin acts in two places: 1) It directly irritates the brainstem breathing center, forcing rapid breathing that blows off CO₂ acid. 2) It enters mitochondria and disables ATP production, forcing cells to make lactic acid and ketones. Because both happen simultaneously, bicarbonate drops to 13.0 mmol/L, but pH looks deceptively near-normal at 7.46.',
      respiratory: 'Profound hypocapnia (PaCO₂ 2.4 kPa / 18 mmHg) is caused directly by brainstem stimulation, not just compensation.',
      renal: 'Kidneys attempt to excrete excess acid and salicylate.',
      anionGap: 'Elevated Anion Gap (23 mmol/L) due to unmeasured salicylate, lactate, and ketoacids.',
      oxygenation: 'High PaO₂ from rapid ventilation, but cells cannot use oxygen efficiently.'
    }
  },
  {
    id: 'lactic_acidosis_sepsis',
    name: 'Septic Shock / Severe Lactic Acidosis (Type A)',
    category: 'Metabolic Acidosis',
    badge: 'GOLD MARK - L',
    badgeColor: 'purple',
    description: 'Systemic vasodilation, microvascular occlusion, and tissue hypoperfusion causing anaerobic glycolysis and massive L-lactate production.',
    values: {
      pH: 7.12,
      pco2_kPa: 3.3, // ~24.8 mmHg (hyperventilation compensation)
      paO2_kPa: 8.8,  // ~66 mmHg (hypoxemia from septic lung injury / V/Q mismatch)
      fio2: 0.21,
      hco3: 8.0,
      be: -19.0,
      na: 137,
      k: 5.2,
      cl: 101,
      albumin: 28, // hypoalbuminemia of sepsis (capillary leak)
      glucose: 9.2,
      lactate: 9.5, // severe hyperlactatemia (> 4.0 mmol/L defines septic shock)
      urea: 16.0,
      tempC: 38.9,
      age: 67
    },
    pearls: [
      'The "L" in GOLD MARK: Type A Lactic Acidosis means tissues are starved of oxygen (sepsis, heart attack, shock). Type B means cellular poisoning (metformin, liver failure).',
      'Remember Albumin Correction: In sick ICU patients with low albumin (28 g/L), the measured Anion Gap looks lower than it really is. Always correct: Add 2.5 mmol/L for every 10 g/L drop in albumin below 40!',
      'Key Biomarker: Arterial lactate > 2.0 to 4.0 mmol/L is the international red flag for septic shock and organ failure.'
    ],
    explanation: {
      summary: 'Severe High Anion Gap Lactic Acidosis caused by septic shock and tissue oxygen starvation.',
      mechanism: 'Severe bacterial infection causes blood vessels throughout the body to widen and leak. Blood pressure plunges (distributive shock). Tissues and organs don\'t receive enough blood flow or oxygen. Deprived of oxygen, cells switch to emergency anaerobic metabolism, converting pyruvate into massive amounts of L-lactic acid (9.5 mmol/L) and dropping pH to 7.12.',
      respiratory: 'Rapid, deep breathing lowers PaCO₂ to 3.3 kPa to help blow out acid and keep the patient alive.',
      renal: 'Low blood pressure reduces kidney blood flow, causing acute kidney injury.',
      anionGap: 'High Anion Gap (31 mmol/L corrected for albumin), driven directly by the massive lactic acid.',
      oxygenation: 'PaO₂ is reduced (8.8 kPa) and A-a gradient is elevated because septic inflammation makes the lung air sacs leak fluid (early ARDS).'
    }
  },
  {
    id: 'copd_acute_on_chronic',
    name: 'COPD Exacerbation (Acute-on-Chronic Hypoventilation)',
    category: 'Respiratory Acidosis',
    badge: 'Chronic Hypercapnia + Acute Acidemia',
    badgeColor: 'blue',
    description: 'Severe COPD patient with chronic hypercapnia who develops acute bronchitis, respiratory muscle fatigue, and CO2 retention.',
    values: {
      pH: 7.24,
      pco2_kPa: 9.3, // ~70 mmHg (severe hypercapnia)
      paO2_kPa: 6.7, // ~50 mmHg (severe hypoxemia)
      fio2: 0.21,
      hco3: 30.5, // chronically retained renal HCO3-, unable to buffer acute CO2 surge
      be: 4.8,
      na: 141,
      k: 4.6,
      cl: 94, // hypochloremia reflecting chronic renal compensation (Cl- traded for HCO3-)
      albumin: 41,
      glucose: 5.4,
      lactate: 1.4,
      urea: 6.8,
      tempC: 37.8,
      age: 71
    },
    pearls: [
      'The Dead Giveaway for Chronic Disease: Look at bicarbonate (30.5 mmol/L)! The kidneys had already spent weeks retaining extra base sponge to balance chronic CO₂. When acute bronchitis strikes, CO₂ shoots even higher (9.3 kPa), dropping pH to 7.24.',
      'Oxygen Therapy Warning: Never put a severe COPD patient on 100% high-flow oxygen without monitoring! It removes their hypoxic breathing drive and worsens ventilation matching, risking CO₂ narcosis and coma. Target SpO₂: 88–92%!',
      'Alveolar Gas check: The severe hypoxemia (PaO₂ 6.7 kPa / 50 mmHg) is mostly driven by hypoventilation—CO₂ acid is filling the alveoli, leaving no room for oxygen!'
    ],
    explanation: {
      summary: 'Acute-on-chronic respiratory acidosis in a patient with severe COPD who developed a respiratory infection.',
      mechanism: 'In COPD, the airways are chronically narrowed. A fresh infection causes swelling and mucus plugging. Exhausted respiratory muscles fail to move air, trapping massive CO₂ acid in the blood (9.3 kPa / 70 mmHg). The chronically retained bicarbonate is overwhelmed, and pH falls to 7.24.',
      respiratory: 'Severe hypoventilation traps CO₂ acid and starves the blood of oxygen.',
      renal: 'The kidneys already retained extra bicarbonate (30.5 mmol/L) to defend against baseline chronic CO₂, but they cannot adapt to an acute hourly spike.',
      anionGap: 'Normal Anion Gap. Chloride is low because the kidneys gave up chloride to hold onto bicarbonate.',
      oxygenation: 'Severe hypoxemia on room air. Acidic pH shifts the curve right (Bohr effect) to squeeze oxygen into tissues.'
    }
  },
  {
    id: 'opiate_overdose',
    name: 'Acute Opiate / Heroin Overdose',
    category: 'Respiratory Acidosis',
    badge: 'Pure Acute Hypoventilation',
    badgeColor: 'blue',
    description: 'Central nervous system depression with bradypnea (respiratory rate 4/min), pin-point pupils (miosis), acute hypercapnia, and pure acute respiratory acidosis.',
    values: {
      pH: 7.18,
      pco2_kPa: 9.8, // ~73.5 mmHg
      paO2_kPa: 6.0, // ~45 mmHg (life-threatening hypoxemia)
      fio2: 0.21,
      hco3: 27.2, // acute physical buffer response only (+1 mmol/L per 10 mmHg pCO2)
      be: -1.2,
      na: 140,
      k: 4.4,
      cl: 102,
      albumin: 42,
      glucose: 5.1,
      lactate: 1.2,
      urea: 4.8,
      tempC: 36.2,
      age: 28
    },
    pearls: [
      'The Opioid Triad: Pinpoint pupils (miosis) + Slow breathing (< 8/min) + Unconsciousness.',
      'Pure Acute Respiratory Acidosis Rule: For every 1.3 kPa (10 mmHg) rise in PaCO₂, bicarbonate only rises by 1.0 mmol/L (from red blood cells, NOT kidneys!).',
      'Normal A-a Gradient: The lungs themselves are 100% healthy! The patient has low oxygen purely because they aren\'t breathing air into their lungs.',
      'Life-saving Antidote: IV or nasal Naloxone (Narcan) immediately kicks the opioid off brain receptors and restores spontaneous breathing.'
    ],
    explanation: {
      summary: 'Pure acute respiratory acidosis caused by opioid suppression of the brainstem breathing center.',
      mechanism: 'Heroin or morphine numbs the brain\'s breathing pacemaker in the medulla. The patient\'s breathing slows down to only 4 breaths per minute. Without ventilation, CO₂ acid quickly builds up in the blood, dropping pH to 7.18.',
      respiratory: 'Dangerous alveolar hypoventilation prevents fresh oxygen from entering and traps CO₂.',
      renal: 'The kidneys haven\'t had time to help (kidneys need 2 to 3 days). Bicarbonate is only slightly up (27.2 mmol/L) from instantaneous red blood cell buffer release.',
      anionGap: 'Normal Anion Gap (10.8 mmol/L).',
      oxygenation: 'Life-threatening low oxygen (PaO₂ 6.0 kPa / 45 mmHg). Reversing the overdose with naloxone instantly restores normal oxygen without any lung treatment.'
    }
  },
  {
    id: 'severe_vomiting',
    name: 'Severe Vomiting / Pyloric Stenosis (Metabolic Alkalosis)',
    category: 'Metabolic Alkalosis',
    badge: 'Chloride-Responsive',
    badgeColor: 'emerald',
    description: 'Loss of gastric hydrochloric acid (HCl) leading to hypochloremic hypokalemic metabolic alkalosis with volume contraction and paradoxical aciduria.',
    values: {
      pH: 7.58,
      pco2_kPa: 6.4, // ~48 mmHg (respiratory hypoventilation compensation)
      paO2_kPa: 10.5,
      fio2: 0.21,
      hco3: 44.0, // severe alkalemia
      be: 18.5,
      na: 138,
      k: 2.6, // severe hypokalemia from gastric & renal wasting
      cl: 80,  // severe hypochloremia
      albumin: 43,
      glucose: 5.3,
      lactate: 0.8,
      urea: 11.2, // prerenal azotemia from volume depletion
      tempC: 37.1,
      age: 32
    },
    pearls: [
      'Why is it an alkalosis? Stomach juice is pure hydrochloric acid (HCl). Throwing up stomach juice loses acid (H⁺) and chloride (Cl⁻). For every acid molecule lost, an equimolar bicarbonate base is left in the blood!',
      'Compensatory Slow Breathing: The brain slows down breathing (PaCO₂ 6.4 kPa / 48 mmHg) to trap CO₂ acid and drag pH down. But there is a limit: the body cannot stop breathing completely or oxygen would drop too low!',
      'Paradoxical Acidic Urine: In severe dehydration and low potassium, the kidneys desperately try to hold onto sodium. To save sodium, they are forced to pump H⁺ into the urine, making urine acidic despite severe blood alkalosis!',
      'Treatment: IV Normal Saline (0.9% NaCl) provides the missing chloride, unlocking the kidneys to pee out excess bicarbonate (Chloride-responsive alkalosis).'
    ],
    explanation: {
      summary: 'Severe metabolic alkalosis caused by losing gastric acid through persistent vomiting or pyloric stenosis.',
      mechanism: 'The stomach produces acid (HCl). When a patient vomits repeatedly, they lose protons (H⁺) and chloride (Cl⁻). The corresponding bicarbonate base remains in circulation, expanding plasma bicarbonate to 44.0 mmol/L and driving pH up to 7.58.',
      respiratory: 'The brain slows down breathing to hold onto CO₂ acid (PaCO₂ 6.4 kPa), acting as a physiological brake against extreme alkalemia.',
      renal: 'Dehydration and lack of chloride trap the kidneys in a state where they cannot excrete bicarbonate.',
      anionGap: 'Normal Anion Gap. Chloride is severely depleted (80 mmol/L).',
      oxygenation: 'Alkaline blood shifts the hemoglobin curve to the left, making hemoglobin hold onto oxygen too tightly.'
    }
  },
  {
    id: 'severe_diarrhea',
    name: 'Severe Secretory Diarrhea / Cholera (NAGMA)',
    category: 'Metabolic Acidosis',
    badge: 'NAGMA (HARDUPS - D)',
    badgeColor: 'teal',
    description: 'Massive intestinal fluid loss rich in bicarbonate and potassium, resulting in Normal Anion Gap (Hyperchloremic) Metabolic Acidosis.',
    values: {
      pH: 7.22,
      pco2_kPa: 3.5, // ~26 mmHg (respiratory compensation)
      paO2_kPa: 13.5,
      fio2: 0.21,
      hco3: 10.5,
      be: -15.0,
      na: 140,
      k: 2.9, // severe hypokalemia from fecal potassium excretion
      cl: 119, // hyperchloremia maintains electroneutrality as HCO3- is lost!
      albumin: 42,
      glucose: 4.8,
      lactate: 1.1,
      urea: 10.5,
      tempC: 37.0,
      age: 38
    },
    pearls: [
      'The "D" in HARDUPS: Severe watery diarrhea is the most common real-world cause of Normal Anion Gap (Hyperchloremic) Metabolic Acidosis (NAGMA).',
      'Why is the gap normal? Diarrhea flushes out bicarbonate base directly. To maintain electrical neutrality, the kidneys grab extra Chloride (119 mmol/L). Because Chloride goes up by the same amount Bicarbonate went down, the Gap stays normal (10–14 mmol/L)!',
      'Urine Anion Gap: Used by doctors to distinguish gut base loss (negative urine gap: healthy kidneys pumping out ammonium acid) from kidney tubular failure (positive urine gap).'
    ],
    explanation: {
      summary: 'Normal Anion Gap (Hyperchloremic) Metabolic Acidosis caused by severe diarrhea flushing out bicarbonate base.',
      mechanism: 'Intestinal secretions below the stomach are loaded with bicarbonate buffer. Severe watery diarrhea washes this base out of the bowel before it can be reabsorbed. Without base, the blood turns acidic (pH 7.22).',
      respiratory: 'Compensatory rapid breathing lowers PaCO₂ to 3.5 kPa (~26 mmHg) to blow off CO₂ acid.',
      renal: 'The kidneys reabsorb extra Chloride (119 mmol/L) to maintain electrical balance as bicarbonate is lost.',
      anionGap: 'Normal Anion Gap (10.5 mmol/L). No mystery acids are present—just lost base replaced by chloride.',
      oxygenation: 'Normal oxygenation on room air.'
    }
  },
  {
    id: 'ards_severe',
    name: 'Severe ARDS (Acute Respiratory Distress Syndrome)',
    category: 'Respiratory Failure',
    badge: 'Horovitz < 13.3 kPa (< 100 mmHg)',
    badgeColor: 'blue',
    description: 'Diffuse alveolar-capillary endothelial damage, non-cardiogenic pulmonary edema, severe right-to-left intrapulmonary shunt, and refractory hypoxemia.',
    values: {
      pH: 7.28,
      pco2_kPa: 7.2, // ~54 mmHg (permissive hypercapnia / high dead-space)
      paO2_kPa: 8.5,  // ~64 mmHg
      fio2: 0.80,    // patient is on 80% FiO2!
      hco3: 25.0,
      be: -2.0,
      na: 139,
      k: 4.4,
      cl: 103,
      albumin: 26,
      glucose: 7.5,
      lactate: 2.2,
      urea: 11.0,
      tempC: 38.2,
      age: 55
    },
    pearls: [
      'The P/F (Horovitz) Ratio: Calculated as PaO₂ divided by FiO₂. On 80% oxygen (FiO₂ 0.80), PaO₂ is only 8.5 kPa (64 mmHg). P/F ratio = 10.6 kPa (80 mmHg). The threshold for Severe ARDS is < 13.3 kPa (< 100 mmHg)!',
      'What is a "Shunt"? Blood flows past drowned, fluid-filled alveoli without picking up any oxygen. Giving 100% oxygen cannot fully fix a true shunt because the air sacs are flooded with fluid!',
      'Permissive Hypercapnia: Doctors use gentle, low-volume breathing machines to protect the fragile lungs from bursting, intentionally accepting mild CO₂ elevation (7.2 kPa).'
    ],
    explanation: {
      summary: 'Catastrophic lung failure with severe oxygen starvation caused by flooded, collapsed alveoli.',
      mechanism: 'Severe lung injury or sepsis causes alveolar capillaries to leak protein-rich fluid into the air sacs. The fluid washes away surfactant, causing alveoli to collapse. Blood passes through these collapsed, unventilated zones without picking up oxygen (intrapulmonary shunt), causing refractory hypoxemia.',
      respiratory: 'Permissive hypercapnia: Gentle mechanical ventilation is used to avoid lung trauma, tolerating elevated PaCO₂.',
      renal: 'Kidneys have not had enough time to compensate with bicarbonate retention.',
      anionGap: 'Normal Anion Gap.',
      oxygenation: 'Critically reduced Horovitz index (10.6 kPa / 80 mmHg). Massive A-a gradient.'
    }
  },
  {
    id: 'pulmonary_embolism',
    name: 'Acute Pulmonary Embolism (PE)',
    category: 'Respiratory Alkalosis',
    badge: 'Hypoxemia + Hypocapnia',
    badgeColor: 'blue',
    description: 'Sudden obstruction of pulmonary arterial bed causing acute dead space ventilation, tachypnea, severe widened AaDO2, and hypocapnia.',
    values: {
      pH: 7.51,
      pco2_kPa: 3.6, // ~27 mmHg (tachypneic hypocapnia)
      paO2_kPa: 7.6,  // ~57 mmHg (acute hypoxemia)
      fio2: 0.21,
      hco3: 21.5,
      be: -1.0,
      na: 141,
      k: 4.1,
      cl: 105,
      albumin: 41,
      glucose: 5.5,
      lactate: 2.1,
      urea: 5.0,
      tempC: 37.2,
      age: 52
    },
    pearls: [
      'The Trademark ABG Clue: Sudden Low Oxygen (PaO₂ 7.6 kPa) COMBINED WITH Low CO₂ (PaCO₂ 3.6 kPa) on room air is the textbook signature of Acute Pulmonary Embolism!',
      'Why is CO₂ low? Irritated lung stretch receptors trigger intense rapid breathing (tachypnea). Fast breathing easily blows off CO₂.',
      'Why is Oxygen low? A blood clot blocks blood flow to parts of the lung, creating a severe mismatch between air and blood flow (widened A-a gradient of 7.85 kPa / 59 mmHg).'
    ],
    explanation: {
      summary: 'Acute respiratory alkalosis with sudden hypoxemia caused by a blood clot blocking pulmonary blood flow.',
      mechanism: 'A blood clot lodges in the pulmonary arteries. Ventilated air sacs receive no blood flow (dead space), while other lung areas are flooded with excess blood flow. Irritated lung receptors trigger intense rapid breathing (tachypnea). This washes out CO₂ acid down to 3.6 kPa, but blood cannot pick up enough oxygen, resulting in acute hypoxemia.',
      respiratory: 'Fast breathing blows out CO₂, causing acute respiratory alkalosis.',
      renal: 'No time for kidney compensation.',
      anionGap: 'Normal Anion Gap.',
      oxygenation: 'Severe hypoxemia with widened A-a gradient.'
    }
  },
  {
    id: 'dka_with_vomiting',
    name: 'Mixed Disorder: DKA + Severe Vomiting',
    category: 'Mixed Disturbances',
    badge: 'HAGMA + Metabolic Alkalosis',
    badgeColor: 'purple',
    description: 'Patient with diabetic ketoacidosis who develops protracted vomiting: near-normal pH masking life-threatening dual metabolic pathology!',
    values: {
      pH: 7.38, // remarkably "NORMAL" pH!
      pco2_kPa: 4.8, // ~36 mmHg
      paO2_kPa: 12.8,
      fio2: 0.21,
      hco3: 21.0, // nearly "NORMAL" HCO3-!
      be: -3.0,
      na: 135,
      k: 3.8,
      cl: 82,  // profoundly low chloride from gastric HCl loss!
      albumin: 40,
      glucose: 25.0,
      lactate: 1.6,
      urea: 14.0,
      tempC: 37.0,
      age: 27
    },
    pearls: [
      'The Ultimate Board Exam Trap: Look at the values! pH is 7.38 (Normal!), PaCO₂ is 4.8 kPa (Normal!), Bicarbonate is 21 mmol/L (Near-normal!). A beginner might say "ABG is normal!".',
      'How to catch it: Always check the Anion Gap! Anion Gap = 135 - (82 + 21) = 32.0 mmol/L! This is a massive high-gap acidosis!',
      'The Secret: DKA adds ketoacids (dropping bicarb), while vomiting loses stomach acid (adding bicarb). The two opposite disasters cancel out on the pH meter!',
      'Delta Ratio > 2.0: Confirms a hidden metabolic alkalosis is masking the DKA.'
    ],
    explanation: {
      summary: 'Deceptive mixed acid-base disorder where severe DKA and severe vomiting cancel each other out on the pH meter!',
      mechanism: 'The diabetic patient has runaway ketoacids flooding the blood (metabolic acidosis). At the exact same time, severe vomiting is losing hydrochloric acid from the stomach (metabolic alkalosis). Because both processes operate simultaneously, circulating bicarbonate and pH look deceptively balanced, but chloride is dangerously low (82 mmol/L) and the blood is loaded with ketoacids.',
      respiratory: 'Breathing looks relatively normal because the opposing disorders cancel out on brain pH sensors.',
      renal: 'Severe dehydration and potassium depletion.',
      anionGap: 'Massive Anion Gap (32.0 mmol/L). Calculating the Anion Gap is the ONLY way to discover the patient is in life-threatening DKA!',
      oxygenation: 'Normal room air oxygen.'
    }
  },
  {
    id: 'normal_saline_overload',
    name: 'Normal Saline (0.9% NaCl) Resuscitation Acidosis',
    category: 'Metabolic Acidosis',
    badge: 'Iatrogenic NAGMA (HARDUPS - S)',
    badgeColor: 'teal',
    description: 'Rapid massive infusion of 0.9% Normal Saline causing dilutional hyperchloremic Normal Anion Gap Metabolic Acidosis.',
    values: {
      pH: 7.27,
      pco2_kPa: 4.1, // ~31 mmHg (compensatory hyperventilation)
      paO2_kPa: 13.0,
      fio2: 0.21,
      hco3: 14.0,
      be: -10.5,
      na: 142,
      k: 4.3,
      cl: 118, // severe hyperchloremia (0.9% saline has 154 mmol/L Cl-)
      albumin: 32, // hemodilution
      glucose: 5.5,
      lactate: 1.0,
      urea: 4.0,
      tempC: 36.8,
      age: 45
    },
    pearls: [
      'The "S" in HARDUPS: Giving bags and bags of "Normal" Saline (0.9% NaCl) causes hyperchloremic Normal Anion Gap Acidosis.',
      'Why? 0.9% Saline is NOT normal! It has 154 mmol/L of chloride (normal blood only has ~104 mmol/L). Flooding the body with chloride forces bicarbonate down to keep electrical balance.',
      'Normal Anion Gap: AG = 142 - (118 + 14) = 10.0 mmol/L.',
      'Clinical Pearl: Use balanced IV fluids (like Ringer\'s Lactate or Plasma-Lyte) that have physiological chloride levels.'
    ],
    explanation: {
      summary: 'Iatrogenic Normal Anion Gap Acidosis caused by large-volume resuscitation with 0.9% Normal Saline.',
      mechanism: 'Infusing liters of 0.9% sodium chloride floods the bloodstream with chloride (118 mmol/L). In the kidneys, excess chloride suppresses bicarbonate reabsorption, driving serum bicarbonate down to 14.0 mmol/L and turning the blood acidic (pH 7.27).',
      respiratory: 'Compensatory breathing lowers PaCO₂ to 4.1 kPa.',
      renal: 'Kidneys attempt to dump the chloride overload.',
      anionGap: 'Normal Anion Gap (10.0 mmol/L). Unmeasured anions are completely normal.',
      oxygenation: 'Normal oxygenation.'
    }
  },
  {
    id: 'thiamine_pdh',
    name: 'Vitamin B₁ (Thiamine) Deficiency (PDH Failure)',
    category: 'Biochemical & Enzymatic Lesion',
    badge: 'Cofactor Defect',
    badgeColor: 'purple',
    description: 'Thiamine pyrophosphate (TPP) exhaustion paralyzing Pyruvate Dehydrogenase, causing severe lactic acidosis.',
    values: {
      pH: 7.26,
      pco2_kPa: 3.7, // ~27.8 mmHg (hyperventilation compensation)
      paO2_kPa: 13.5,
      fio2: 0.21,
      hco3: 12.0,
      be: -13.0,
      na: 139,
      k: 4.1,
      cl: 101,
      albumin: 38,
      glucose: 4.5,
      lactate: 6.8, // severe lactic acidosis without hypoperfusion!
      urea: 5.0,
      tempC: 37.0,
      age: 44
    },
    biochemical: {
      enzyme: 'Pyruvate Dehydrogenase (PDH) Complex & α-Ketoglutarate Dehydrogenase',
      cofactors: 'Thiamine Pyrophosphate (TPP / active Vit. B₁), Lipoic acid, CoA (B₅), FAD (B₂), NAD⁺ (B₃)',
      reaction: 'Pyruvate + CoA + NAD⁺ ──[PDH (requires TPP)]──> Acetyl-CoA + CO₂ + NADH',
      shunt: 'Blocked PDH ──> Cytosolic Pyruvate accumulates ──[LDH]──> L-Lactate + NAD⁺',
      clinicalSyndrome: 'Wet Beriberi (high-output heart failure + lactic acidosis) & Wernicke Encephalopathy'
    },
    pearls: [
      'Enzyme Roadblock: Pyruvate Dehydrogenase (PDH) needs Vitamin B₁ (Thiamine). Without B₁, the cell cannot turn pyruvate into acetyl-CoA to enter mitochondria.',
      'The Emergency Shunt: Trapped pyruvate has only one escape route: Lactate Dehydrogenase turns it into L-Lactic Acid! This floods the blood, causing severe High Anion Gap Acidosis (26 mmol/L).',
      'CRITICAL EXAM TRAP: In a malnourished or alcoholic patient, NEVER give IV glucose/dextrose before giving IV Thiamine! The glucose rush consumes whatever tiny bit of Vitamin B₁ is left, triggering acute brain damage (Wernicke encephalopathy) and fatal lactic acidosis!'
    ],
    explanation: {
      summary: 'Severe High Anion Gap Lactic Acidosis caused by Vitamin B₁ (Thiamine) deficiency blocking the Pyruvate Dehydrogenase enzyme.',
      mechanism: 'Your cells break down sugar into pyruvate. Normally, the Pyruvate Dehydrogenase (PDH) complex uses Vitamin B₁ to convert pyruvate into acetyl-CoA for clean energy. When Vitamin B₁ is missing (malnutrition, chronic alcohol use), this enzyme stops working. Pyruvate piles up and is shunted into L-lactic acid (6.8 mmol/L). Every molecule of lactic acid releases an H⁺ acid proton, destroying bicarbonate and dropping pH to 7.26.',
      respiratory: 'Compensatory hyperventilation lowers PaCO₂ to 3.7 kPa (~28 mmHg) in accordance with Winter\'s formula.',
      renal: 'Kidneys reabsorb all available bicarbonate, but are overwhelmed until Vitamin B₁ is given.',
      anionGap: 'Elevated Anion Gap (26 mmol/L) caused by unmeasured L-lactate.',
      oxygenation: 'Arterial oxygen is normal, but the cells cannot process oxygen efficiently due to blocked metabolism.'
    }
  },
  {
    id: 'metformin_complex1',
    name: 'Metformin Toxicity (Mitochondrial Complex I Block)',
    category: 'Biochemical & Enzymatic Lesion',
    badge: 'ETC Inhibition',
    badgeColor: 'purple',
    description: 'Accumulation of metformin inhibiting Complex I of the respiratory chain, suppressing hepatic lactate clearance.',
    values: {
      pH: 7.12,
      pco2_kPa: 3.0, // ~22.5 mmHg
      paO2_kPa: 13.8,
      fio2: 0.21,
      hco3: 7.5,
      be: -19.5,
      na: 138,
      k: 5.3,
      cl: 100,
      albumin: 39,
      glucose: 6.2,
      lactate: 11.5, // profound hyperlactatemia
      urea: 18.0, // acute-on-chronic renal impairment
      tempC: 36.4,
      age: 68
    },
    biochemical: {
      enzyme: 'Mitochondrial Respiratory Chain Complex I (NADH:ubiquinone oxidoreductase)',
      cofactors: 'NADH, FMN, Iron-Sulfur (Fe-S) clusters',
      reaction: 'NADH + Ubiquinone + 5H⁺(in) ──[Complex I]──> NAD⁺ + Ubiquinol + 4H⁺(out)',
      shunt: 'Complex I inhibition ──> Massive NADH accumulation ──> Gluconeogenesis from lactate blocked ──> Severe Lactic Acidosis (MALA)',
      clinicalSyndrome: 'Metformin-Associated Lactic Acidosis (MALA)'
    },
    pearls: [
      'Target: Metformin blocks Complex I of the mitochondrial electron transport chain.',
      'Lactate Clearance Failure: Normally, the liver absorbs lactic acid from the blood and turns it back into glucose. When Metformin blocks Complex I, the liver\'s recycling factory shuts down, sending lactate skyrocketing to 11.5 mmol/L!',
      'When does it happen? Metformin is cleared 100% by the kidneys. Metformin-Associated Lactic Acidosis (MALA) strikes when a patient develops sudden kidney injury (dehydration, sepsis, or CT IV contrast).'
    ],
    explanation: {
      summary: 'Severe High Anion Gap Lactic Acidosis (MALA) caused by metformin accumulation poisoning mitochondrial Complex I.',
      mechanism: 'Metformin builds up in cells and blocks Complex I of the mitochondrial power plant. This creates a severe cellular redox backup (high NADH), which prevents the liver from clearing lactic acid. Free lactic acid floods the blood, destroying bicarbonate down to 7.5 mmol/L and causing deep acidemia (pH 7.12).',
      respiratory: 'Rapid compensatory breathing lowers PaCO₂ to 3.0 kPa.',
      renal: 'Pre-existing acute kidney failure prevents the kidneys from peeing out the drug or excreting acid.',
      anionGap: 'Elevated Anion Gap (30.5 mmol/L), driven by 11.5 mmol/L of unmeasured lactate.',
      oxygenation: 'Blood carries oxygen, but mitochondria are chemically blocked from using it.'
    }
  },
  {
    id: 'acetazolamide_ca',
    name: 'Acetazolamide (Carbonic Anhydrase Inhibition)',
    category: 'Biochemical & Enzymatic Lesion',
    badge: 'Enzyme Inhibition',
    badgeColor: 'teal',
    description: 'Pharmacologic inhibition of renal Carbonic Anhydrase causing proximal tubule bicarbonate wasting (iatrogenic Type 2 RTA).',
    values: {
      pH: 7.29,
      pco2_kPa: 4.2, // ~31.5 mmHg
      paO2_kPa: 13.2,
      fio2: 0.21,
      hco3: 15.0,
      be: -9.5,
      na: 139,
      k: 3.2, // hypokalemic from increased distal nephron flow and secondary aldosteronism
      cl: 114, // hyperchloremia maintains electroneutrality (NAGMA)
      albumin: 41,
      glucose: 5.1,
      lactate: 1.0,
      urea: 5.5,
      tempC: 37.0,
      age: 34
    },
    biochemical: {
      enzyme: 'Carbonic Anhydrase II (intracellular) & Carbonic Anhydrase IV (apical brush-border)',
      cofactors: 'Zinc (Zn²⁺) prosthetic group',
      reaction: 'H⁺ + HCO₃⁻ <──[CA IV]──> H₂O + CO₂ (lumen) & H₂O + CO₂ <──[CA II]──> H⁺ + HCO₃⁻ (cytoplasm)',
      shunt: 'Inhibition blocks proximal tubular HCO₃⁻ reclamation ──> Urinary HCO₃⁻ wasting (Alkaline urine pH > 7.0)',
      clinicalSyndrome: 'Normal Anion Gap (Hyperchloremic) Metabolic Acidosis (Iatrogenic Proximal RTA)'
    },
    pearls: [
      'Target Enzyme: Acetazolamide inhibits Carbonic Anhydrase (CA) in the kidneys.',
      'The "A" in HARDUPS: Because carbonic anhydrase normally reclaims bicarbonate, blocking it forces the kidneys to pee out bicarbonate. The urine becomes alkaline (pH > 7.0), and the blood becomes acidic!',
      'Why is the gap normal? As bicarbonate is peed out, the kidneys hold onto Chloride (114 mmol/L) to keep electrical balance. The Anion Gap remains perfectly normal (10 mmol/L)!',
      'High Altitude Medicine: Doctors give acetazolamide to climbers! By slightly acidifying the blood, it tricks the brain into breathing faster, taking in more oxygen on mountaintops.'
    ],
    explanation: {
      summary: 'Normal Anion Gap (Hyperchloremic) Metabolic Acidosis caused by acetazolamide blocking the kidney\'s bicarbonate recovery enzyme.',
      mechanism: 'In healthy kidneys, the enzyme Carbonic Anhydrase saves >80% of filtered bicarbonate. Acetazolamide blocks this enzyme. Bicarbonate spills into the urine (alkaline urine), leaving the blood deficient in base sponge (bicarbonate drops to 15.0 mmol/L, pH falls to 7.29).',
      respiratory: 'Compensatory breathing lowers PaCO₂ to 4.2 kPa.',
      renal: 'The kidneys dump bicarbonate and reabsorb extra chloride (114 mmol/L) to keep the blood electrically balanced.',
      anionGap: 'Normal Anion Gap (10.0 mmol/L). Unmeasured anions are completely normal.',
      oxygenation: 'Normal oxygenation.'
    }
  },
  {
    id: 'cyanide_complex4',
    name: 'Cyanide / Smoke Poisoning (Complex IV Arrest)',
    category: 'Biochemical & Enzymatic Lesion',
    badge: 'Histotoxic Hypoxia',
    badgeColor: 'purple',
    description: 'Cyanide binding the ferric iron of Cytochrome c Oxidase (Complex IV), arresting mitochondrial oxygen consumption.',
    values: {
      pH: 7.10,
      pco2_kPa: 3.1, // ~23.3 mmHg
      paO2_kPa: 14.5, // Arterial PaO2 is completely NORMAL!
      fio2: 0.21,
      hco3: 7.0,
      be: -20.0,
      na: 141,
      k: 4.8,
      cl: 102,
      albumin: 40,
      glucose: 6.8,
      lactate: 12.0, // massive lactic acid accumulation
      urea: 6.0,
      tempC: 37.0,
      age: 39
    },
    biochemical: {
      enzyme: 'Cytochrome c Oxidase (Complex IV / Cytochrome aa₃)',
      cofactors: 'Heme a, Heme a₃ (Fe³⁺), Copper centers (Cu_A, Cu_B)',
      reaction: '4 Cyt c(red) + O₂ + 8H⁺(in) ──[Complex IV]──> 4 Cyt c(ox) + 2H₂O + 4H⁺(out)',
      shunt: 'Fe³⁺ binding freezes electron transfer to O₂ ──> Complete histotoxic hypoxia ──> Pure anaerobic glycolysis (Severe Lactic Acidosis)',
      clinicalSyndrome: 'Histotoxic Dysoxia & Bright Red Venous Blood (High Venous Oxygen Saturation)'
    },
    pearls: [
      'Target: Cyanide binds tight as a vice to iron in Cytochrome c Oxidase (Complex IV), the final enzyme of the respiratory chain.',
      'The Great Exam Paradox: Arterial oxygen (PaO₂) is 100% normal (14.5 kPa) and saturation is 99%, yet the patient is suffocating at the cellular level!',
      'Bright Red Cherry Blood: Because cells cannot extract oxygen from hemoglobin, venous blood remains packed with oxygen (venous saturation > 90%), looking bright cherry-red!',
      'Antidote: Hydroxocobalamin (Vitamin B12a) binds cyanide to form harmless Vitamin B12, which the kidneys safely pee out.'
    ],
    explanation: {
      summary: 'Lethal High Anion Gap Lactic Acidosis caused by cyanide arresting mitochondrial oxygen consumption.',
      mechanism: 'Cyanide binds to Complex IV of the mitochondrial electron transport chain, completely halting ATP production from oxygen. Deprived of aerobic energy, cells switch to emergency anaerobic glycolysis, churning out massive L-lactic acid (12.0 mmol/L). Protons from lactic acid destroy bicarbonate, crashing pH to 7.10.',
      respiratory: 'Brain chemoreceptors drive maximal hyperventilation, blowing PaCO₂ down to 3.1 kPa.',
      renal: 'Kidneys are overwhelmed by the enormous flood of lactic acid.',
      anionGap: 'Massive Anion Gap (32.0 mmol/L) from unmeasured lactate.',
      oxygenation: 'Arterial blood is fully oxygenated, but cells cannot use it ("histotoxic hypoxia").'
    }
  },
  {
    id: 'paracetamol_oxoproline',
    name: 'Glutathione Depletion (5-Oxoprolinuria / Pyroglutamic Acid)',
    category: 'Biochemical & Enzymatic Lesion',
    badge: 'Cycle Deregulation',
    badgeColor: 'purple',
    description: 'Chronic therapeutic paracetamol consuming glutathione in malnourished patients, deregulating the γ-glutamyl cycle.',
    values: {
      pH: 7.23,
      pco2_kPa: 3.4, // ~25.5 mmHg
      paO2_kPa: 13.5,
      fio2: 0.21,
      hco3: 10.5,
      be: -15.0,
      na: 138,
      k: 4.0,
      cl: 102,
      albumin: 30, // malnourished / hypoalbuminemic
      glucose: 5.2,
      lactate: 1.2, // Lactate is completely NORMAL!
      urea: 6.5,
      tempC: 37.1,
      age: 62
    },
    biochemical: {
      enzyme: 'γ-Glutamylcysteine Synthetase & 5-Oxoprolinase (γ-Glutamyl Cycle)',
      cofactors: 'ATP, Glutathione (GSH feedback inhibitor), Cysteine',
      reaction: 'Glutamate + Cysteine ──[γ-Glutamylcysteine Synthetase]──> γ-Glutamylcysteine ──> Glutathione',
      shunt: 'Glutathione depletion removes feedback inhibition ──> Excess γ-glutamylcysteine is converted to 5-Oxoproline (Pyroglutamic acid)',
      clinicalSyndrome: 'Unexplained HAGMA in malnourished/septic patients with normal lactate and glucose'
    },
    pearls: [
      'The "O" in GOLD MARK: 5-Oxoproline (Pyroglutamic Acid) solves the mystery of unexplained high anion gap acidosis in hospitalized patients.',
      'The Classic Clinical Clue: An elderly, malnourished, or septic patient taking regular paracetamol (acetaminophen) who develops High Anion Gap Acidosis with NORMAL lactate and NORMAL glucose!',
      'How it happens: Paracetamol drains liver glutathione. Without glutathione acting as a brake, an enzyme overproduces 5-oxoproline acid.',
      'Treatment: Stop paracetamol and give N-acetylcysteine (NAC) to rebuild liver glutathione.'
    ],
    explanation: {
      summary: 'High Anion Gap Metabolic Acidosis caused by 5-oxoproline acid accumulation from chronic paracetamol in malnourished patients.',
      mechanism: 'Chronic paracetamol usage burns through liver glutathione stores. Glutathione normally acts as an inhibitory brake on the gamma-glutamyl enzyme cycle. When glutathione is depleted, the brake is released: enzymes overproduce 5-oxoproline (pyroglutamic acid). This unmeasured organic acid floods the blood, destroying bicarbonate and dropping pH to 7.23.',
      respiratory: 'Compensatory rapid breathing lowers PaCO₂ to 3.4 kPa.',
      renal: '5-oxoproline is peed out in urine.',
      anionGap: 'High Anion Gap (25.5 mmol/L) despite normal lactate (1.2 mmol/L) and normal glucose (5.2 mmol/L).',
      oxygenation: 'Normal oxygenation.'
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiseasePresets;
}
