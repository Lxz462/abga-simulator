/**
 * ArterioGas Pro - Federal Medical Exam Vignettes & Quiz Simulator
 * High-yield clinical board cases with step-by-step reasoning
 */

const ExamCases = [
  {
    id: 'case_1',
    title: 'Case 1: 22-Year-Old with Abdominal Pain and Rapid Breathing',
    vignette: 'A 22-year-old university student is brought to the emergency department by roommates because of progressive weakness, nausea, diffuse abdominal pain, and rapid, deep breathing. He has had polydipsia and polyuria for the past two weeks. On physical examination, breath has a fruity, sweet odor. BP 100/60 mmHg, HR 118 bpm, RR 32/min (Kussmaul breathing). Blood gas on ambient air (FiO2 0.21) shows: pH 7.14, PaCO2 2.6 kPa (19.5 mmHg), PaO2 14.8 kPa (111 mmHg), HCO3- 6.0 mmol/L, Base Excess -20.5 mmol/L. Labs: Na+ 131 mmol/L, K+ 5.4 mmol/L, Cl- 96 mmol/L, Glucose 29.2 mmol/L (526 mg/dL).',
    question: 'Which of the following best characterizes the acid-base disturbance and underlying mechanism?',
    options: [
      {
        text: 'Pure High Anion Gap Metabolic Acidosis with appropriate respiratory compensation (Kussmaul breathing)',
        isCorrect: true,
        feedback: 'Correct! Anion Gap = 131 - (96 + 6) = 29 mmol/L (Markedly elevated, normal 10–14). Winter\'s formula: Expected PaCO2 (mmHg) = 1.5 * 6.0 + 8 ± 2 = 17 ± 2 mmHg (2.0 – 2.5 kPa). The measured PaCO2 of 2.6 kPa (19.5 mmHg) indicates near-maximal compensatory hyperventilation.'
      },
      {
        text: 'Mixed High Anion Gap Metabolic Acidosis and Respiratory Acidosis',
        isCorrect: false,
        feedback: 'Incorrect. If respiratory acidosis were present, PaCO2 would be inappropriately elevated (> 2.6 kPa). Here, PaCO2 is severely decreased down to 2.6 kPa via deep Kussmaul respirations.'
      },
      {
        text: 'Normal Anion Gap Metabolic Acidosis due to renal tubular wasting',
        isCorrect: false,
        feedback: 'Incorrect. The Anion Gap is 29 mmol/L, which is profoundly elevated due to unmeasured ketoacids (beta-hydroxybutyrate and acetoacetate).'
      },
      {
        text: 'Acute Respiratory Alkalosis with secondary renal bicarbonate loss',
        isCorrect: false,
        feedback: 'Incorrect. The primary disorder is severe metabolic acidemia (pH 7.14, HCO3- 6.0). Respiratory alkalosis is the physiological compensation, not the primary cause.'
      }
    ],
    explanation: 'This is textbook Diabetic Ketoacidosis (DKA). Absolute insulin deficiency promotes lipolysis, releasing free fatty acids that are converted by hepatic CPT-1 into beta-hydroxybutyrate and acetoacetate. Each ketoacid molecule releases H+, titrating extracellular bicarbonate. The brainstem respiratory center responds to proton stimulation by driving deep, sighing Kussmaul respirations to eliminate volatile CO2.',
    pearl: 'Remember: Despite serum potassium being 5.4 mmol/L due to transcellular shift, whole-body potassium stores are severely depleted by osmotic diuresis. Initiating insulin will drive potassium into cells, risking lethal hypokalemia if not replenished!'
  },
  {
    id: 'case_2',
    title: 'Case 2: 70-Year-Old with Chronic Cough and Worsening Dyspnea',
    vignette: 'A 70-year-old man with a 50 pack-year smoking history and severe chronic obstructive pulmonary disease (COPD) presents with 3 days of productive yellow sputum, increasing somnolence, and confusion. He is lethargic and asterixis is noted. Room air ABGA reveals: pH 7.23, PaCO2 9.6 kPa (72 mmHg), PaO2 6.4 kPa (48 mmHg), HCO3- 31.0 mmol/L, Base Excess +4.5 mmol/L. Na+ 140 mmol/L, Cl- 95 mmol/L.',
    question: 'How should this arterial blood gas pattern be classified for your board examination?',
    options: [
      {
        text: 'Acute-on-chronic respiratory acidosis with hypoxemic respiratory failure',
        isCorrect: true,
        feedback: 'Correct! The elevated HCO3- (31.0 mmol/L) and hypochloremia (95 mmol/L) prove pre-existing chronic renal compensation (kidneys take days to retain HCO3-). The acute drop in pH to 7.23 with massive CO2 retention (9.6 kPa / 72 mmHg) indicates acute alveolar hypoventilation superimposed on chronic failure.'
      },
      {
        text: 'Pure acute respiratory acidosis without compensation',
        isCorrect: false,
        feedback: 'Incorrect. In pure acute respiratory acidosis, HCO3- only rises by 0.75 mmol/L per 1 kPa rise in PaCO2 (from buffer systems), which would predict an HCO3- of ~27 mmol/L, not 31 mmol/L.'
      },
      {
        text: 'Primary metabolic alkalosis with compensatory respiratory depression',
        isCorrect: false,
        feedback: 'Incorrect. The patient is severely acidemic (pH 7.23), which rules out a primary alkalosis.'
      },
      {
        text: 'Normal Anion Gap Metabolic Acidosis with respiratory compensation',
        isCorrect: false,
        feedback: 'Incorrect. PaCO2 is 9.6 kPa (severe hypercapnia, not hypocapnia).'
      }
    ],
    explanation: 'In chronic COPD, renal tubular cells chronically upregulate H+-ATPase and NH4+ excretion to elevate plasma HCO3- to ~30 mmol/L, successfully defending pH near 7.36. When an acute bronchial infection causes respiratory muscle exhaustion, PaCO2 surges acutely to 9.6 kPa (72 mmHg). Because the kidneys cannot compensate further on an hourly timescale, acute uncompensated acidemia (pH 7.23) ensues.',
    pearl: 'Caution with oxygen therapy! Titrate oxygen to a target SpO2 of 88–92% (using Venturi mask). Uncontrolled high-flow O2 increases dead-space ventilation by blunting hypoxic pulmonary vasoconstriction and causes the Haldane effect (deoxygenated Hb binds CO2 better than oxyhemoglobin).'
  },
  {
    id: 'case_3',
    title: 'Case 3: 28-Year-Old with Paresthesias and Muscle Cramping',
    vignette: 'A 28-year-old resident physician preparing for a federal licensing exam is brought to triage with palpitations, acute chest tightness, severe perioral numbness, and involuntary spasm of both hands (carpopedal spasm). RR is 34/min, shallow and rapid. ABGA on room air shows: pH 7.63, PaCO2 2.5 kPa (18.8 mmHg), PaO2 16.8 kPa (126 mmHg), HCO3- 20.0 mmol/L, Base Excess +0.8 mmol/L. Ionized Ca2+ is 0.95 mmol/L (Normal 1.15–1.33).',
    question: 'What is the physiological cause of the muscle spasms (tetany) in this patient?',
    options: [
      {
        text: 'Alkalemia increases negative charges on albumin, binding ionized calcium (hypocalcemia)',
        isCorrect: true,
        feedback: 'Correct! Acute respiratory alkalemia causes protons (H+) to dissociate from imidazole groups on plasma albumin. The exposed negative charges avidly bind free ionized Ca2+, dropping ionized calcium and causing peripheral nerve hyperexcitability (tetany, Trousseau and Chvostek signs).'
      },
      {
        text: 'Renal wasting of calcium due to high filtration rate',
        isCorrect: false,
        feedback: 'Incorrect. This happens within minutes during panic attacks; renal filtration changes cannot deplete calcium so rapidly.'
      },
      {
        text: 'Direct toxic effect of high arterial PaO2 on motor endplates',
        isCorrect: false,
        feedback: 'Incorrect. High PaO2 (16.8 kPa) is harmless in the short term and does not cause neuromuscular tetany.'
      },
      {
        text: 'Severe hypokalemia shifting calcium into sarcoplasmic reticulum',
        isCorrect: false,
        feedback: 'Incorrect. The primary culprit for tetany and carpopedal spasm in acute hyperventilation is a drop in ionized calcium.'
      }
    ],
    explanation: 'Acute hyperventilation washes out alveolar CO2 faster than metabolic production, dropping PaCO2 to 2.5 kPa (18.8 mmHg). By the Henderson-Hasselbalch equation, the drop in volatile acid raises pH to 7.63. In acute respiratory alkalosis, HCO3- decreases by only ~1.5 mmol/L per 1 kPa drop in PaCO2 (solely due to non-bicarbonate cellular buffer titration). The resulting alkalemia strips protons from albumin, which binds free Ca2+.',
    pearl: 'Notice the cerebral effects: Hypocapnia produces potent cerebral vasoconstriction, causing cerebral hypoperfusion, lightheadedness, and syncope.'
  },
  {
    id: 'case_4',
    title: 'Case 4: 31-Year-Old Found with Tinnitus and Fever',
    vignette: 'A 31-year-old woman is brought to the emergency department after ingesting a large unknown quantity of tablets. She complains of ringing in the ears (tinnitus), vertigo, and nausea. She is tachypneic (RR 30/min), flushed, and febrile with a temperature of 38.8°C (101.8°F). ABGA on ambient air demonstrates: pH 7.45, PaCO2 2.5 kPa (18.8 mmHg), PaO2 15.0 kPa (112 mmHg), HCO3- 13.0 mmol/L, Base Excess -9.5 mmol/L. Na+ 140 mmol/L, Cl- 104 mmol/L, Lactate 3.8 mmol/L.',
    question: 'Which mixed acid-base disorder is classic for this toxic ingestion?',
    options: [
      {
        text: 'Mixed Respiratory Alkalosis and High Anion Gap Metabolic Acidosis (Salicylate Toxicity)',
        isCorrect: true,
        feedback: 'Correct! Salicylates (Aspirin) directly stimulate the medullary respiratory center causing primary respiratory alkalosis, while simultaneously uncoupling oxidative phosphorylation causing accumulation of organic acids (lactic acid, ketoacids, salicylate) yielding a High Anion Gap Metabolic Acidosis (AG = 140 - [104 + 13] = 23 mmol/L). pH is near normal (7.45) due to these two competing primary disorders!'
      },
      {
        text: 'Pure Metabolic Acidosis with adequate hyperventilation compensation',
        isCorrect: false,
        feedback: 'Incorrect. In pure metabolic acidosis with HCO3- of 13 mmol/L, Winter\'s formula predicts PaCO2 = 1.5 * 13 + 8 ± 2 = 27.5 ± 2 mmHg (3.4 – 3.9 kPa). The measured PaCO2 is 2.5 kPa (18.8 mmHg), which is far lower than expected compensation, confirming a concurrent primary respiratory alkalosis.'
      },
      {
        text: 'Normal Anion Gap Metabolic Acidosis and Metabolic Alkalosis',
        isCorrect: false,
        feedback: 'Incorrect. The Anion Gap is 23 mmol/L (elevated, not normal).'
      },
      {
        text: 'Pure Respiratory Alkalosis with chronic renal compensation',
        isCorrect: false,
        feedback: 'Incorrect. Anion Gap is elevated (23 mmol/L) and lactate is 3.8 mmol/L; this is not a pure respiratory disorder.'
      }
    ],
    explanation: 'Aspirin (salicylate) poisoning produces a pathognomonic triad: Tinnitus, Hyperthermia (from mitochondrial uncoupling), and Tachypnea. Because salicylates cross the blood-brain barrier into the medulla, they stimulate breathing independently of blood pH or PaCO2. At the cellular level, salicylates act as protonophores, collapsing the mitochondrial proton gradient; energy is lost as heat (fever) and cells resort to anaerobic glycolysis, generating lactate and ketoacids.',
    pearl: 'Exam Pearl: Treatment includes IV sodium bicarbonate to alkalinize both serum and urine (pH > 7.5). Alkalinizing urine ion-traps salicylate (weak acid) as charged salicylate anions, preventing tubular reabsorption and accelerating clearance!'
  },
  {
    id: 'case_5',
    title: 'Case 5: 45-Year-Old Found Comatose with High Osmolal Gap',
    vignette: 'A 45-year-old man with a history of alcohol use disorder is found unresponsive in an abandoned warehouse. In the ED, his pupils are sluggish and fundoscopy demonstrates optic disc hyperemia and retinal edema. Blood gas: pH 7.06, PaCO2 2.4 kPa (18 mmHg), PaO2 14.0 kPa, HCO3- 5.0 mmol/L, Base Excess -23.0 mmol/L. Serum labs: Na+ 141 mmol/L, K+ 4.9 mmol/L, Cl- 100 mmol/L, Glucose 5.5 mmol/L, Urea 5.0 mmol/L. Measured serum osmolality is 348 mOsm/kg.',
    question: 'Calculate the Anion Gap and Osmolal Gap. Which substance was ingested, and what is the preferred antidote?',
    options: [
      {
        text: 'Anion Gap: 36 mmol/L; Osmolal Gap: 51.5 mOsm/kg; Methanol; Antidote: Fomepizole',
        isCorrect: true,
        feedback: 'Correct! Anion Gap = 141 - (100 + 5) = 36 mmol/L (Severe HAGMA). Calculated Osmolality = 2*141 + 5.5 + 5.0 = 292.5 mOsm/kg. Osmolal Gap = 348 - 292.5 = 55.5 mOsm/kg (> 10 is diagnostic). Optic disc edema ("snowstorm vision") is classic for methanol whose metabolite formic acid destroys the optic nerve. Fomepizole blocks alcohol dehydrogenase.'
      },
      {
        text: 'Anion Gap: 16 mmol/L; Osmolal Gap: 5 mOsm/kg; Ethanol; Antidote: Naloxone',
        isCorrect: false,
        feedback: 'Incorrect. Anion gap is 36, not 16. Ethanol does not cause optic neuritis.'
      },
      {
        text: 'Anion Gap: 36 mmol/L; Osmolal Gap: 51.5 mOsm/kg; Ethylene Glycol; Antidote: Atropine',
        isCorrect: false,
        feedback: 'Incorrect. While Ethylene glycol causes HAGMA and high osmolal gap, it targets the kidneys (calcium oxalate crystals / AKI), not optic disc hyperemia. Atropine is an antidote for organophosphates, not glycols.'
      },
      {
        text: 'Anion Gap: 24 mmol/L; Osmolal Gap: 20 mOsm/kg; Isopropanol; Antidote: N-acetylcysteine',
        isCorrect: false,
        feedback: 'Incorrect. Isopropanol is metabolized to acetone (a ketone, but NOT an acid), so it causes a high Osmolal Gap WITHOUT a metabolic acidosis!'
      }
    ],
    explanation: 'The combination of severe High Anion Gap Metabolic Acidosis (AG 36 mmol/L) + massive Osmolal Gap (> 50 mOsm/kg) + retinal edema is pathognomonic for Methanol poisoning. Methanol is oxidized by ADH to formaldehyde, then rapidly to formic acid. Formic acid inhibits cytochrome oxidase in retinal ganglion cells and basal ganglia (putaminal necrosis).',
    pearl: 'Remember the acronym GOLD MARK: G (Glycols), O (Oxoproline), L (L-lactate), D (D-lactate), M (Methanol), A (Aspirin), R (Renal failure), K (Ketoacidosis).'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExamCases;
}
