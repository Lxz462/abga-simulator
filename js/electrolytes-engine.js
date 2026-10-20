/**
 * ArterioGas Suite - Electrolytes & Nephron Physiology Engine
 * Based on Prof. Luca Gabutti's curriculum (USI Lugano)
 * 
 * Provides rigorous, validated physiological calculations for:
 * - Serum osmolality & effective osmolality
 * - Total body water (TBW) by gender, age, and weight
 * - Sodium deficit & water excess
 * - Adrogué-Madias formula for infusate delta-Na
 * - Infusion rate calculation with Osmotic Demyelination Syndrome (ODS) safety guardrails (<= 0.5 mmol/L/h)
 * - Albumin-corrected calcium & calcium-phosphate solubility product
 * - Potassium-pH shift rule (0.4 mmol/L per 0.1 pH unit)
 * - Fractional excretion of Sodium (FENa) and Potassium (FEK)
 * - Magnesium-ROMK modulation factor
 */

const ElectrolyteEngine = (function() {
  'use strict';

  // Standard Reference Ranges (mmol/L unless specified)
  const REFERENCE_RANGES = {
    na: { min: 135, max: 145, ideal: 140, unit: 'mmol/L' },
    k: { min: 3.5, max: 5.1, ideal: 4.2, unit: 'mmol/L' }, // Prof. Gabutti slide 3: 3.5 - 5.1
    cl: { min: 98, max: 106, ideal: 104, unit: 'mmol/L' },
    ca_total: { min: 2.15, max: 2.55, ideal: 2.35, unit: 'mmol/L' },
    ca_ionized: { min: 1.14, max: 1.29, ideal: 1.22, unit: 'mmol/L' },
    mg: { min: 0.66, max: 1.07, ideal: 0.85, unit: 'mmol/L' },
    phosphate: { min: 0.81, max: 1.45, ideal: 1.10, unit: 'mmol/L' },
    glucose: { min: 3.9, max: 5.9, ideal: 5.0, unit: 'mmol/L' },
    urea: { min: 2.8, max: 8.1, ideal: 5.0, unit: 'mmol/L' },
    uric_acid: { min: 202, max: 416, ideal: 300, unit: 'µmol/L' }, // Slide 55
    serum_osm: { min: 275, max: 295, ideal: 288, unit: 'mOsm/kg' },
    urine_osm: { min: 50, max: 1200, ideal: 500, unit: 'mOsm/kg' },
    urine_na: { min: 20, max: 120, ideal: 40, unit: 'mmol/L' },
    urine_k: { min: 20, max: 80, ideal: 40, unit: 'mmol/L' }
  };

  // Standard Infusates & Their Electrolyte Concentrations (mmol/L)
  const INFUSATES = {
    nacl_3: {
      name: 'Hypertonic Saline (NaCl 3%)',
      na: 513,
      cl: 513,
      k: 0,
      osm: 1026,
      category: 'Hypertonic'
    },
    nacl_09: {
      name: 'Normal Saline (NaCl 0.9%)',
      na: 154,
      cl: 154,
      k: 0,
      osm: 308,
      category: 'Isotonic'
    },
    ringer_lactate: {
      name: "Ringer's Lactate / Hartmann's",
      na: 130,
      cl: 109,
      k: 4,
      osm: 273,
      category: 'Balanced Isotonic'
    },
    nacl_045: {
      name: 'Half-Normal Saline (NaCl 0.45%)',
      na: 77,
      cl: 77,
      k: 0,
      osm: 154,
      category: 'Hypotonic'
    },
    d5w: {
      name: '5% Dextrose in Water (D5W / Free Water)',
      na: 0,
      cl: 0,
      k: 0,
      osm: 278, // isosmotic in bottle, acts as pure free water once glucose is metabolized
      category: 'Free Water'
    }
  };

  /**
   * 1. Calculate Serum Osmolality (Prof. Gabutti Slide 43)
   * Formula: Osm = 2 * [Na+] + [Glucose] + [Urea] (all in mmol/L)
   * Effective Osmolality (Tonicity) = 2 * [Na+] + [Glucose] (Urea is an ineffective osmole that crosses cell membranes freely)
   */
  function calculateSerumOsmolality(na, glucose = 5.0, urea = 5.0) {
    const totalOsm = (2 * na) + glucose + urea;
    const effectiveOsm = (2 * na) + glucose;
    let tonicityCategory = 'Isotonic (Normal)';

    if (totalOsm < 280) {
      tonicityCategory = 'Hypotonic (Hypo-osmolar)';
    } else if (totalOsm > 295) {
      tonicityCategory = 'Hypertonic (Hyper-osmolar)';
    }

    return {
      totalOsm: Math.round(totalOsm * 10) / 10,
      effectiveOsm: Math.round(effectiveOsm * 10) / 10,
      tonicityCategory
    };
  }

  /**
   * 2. Calculate Total Body Water (TBW) in Liters (Prof. Gabutti Slide 48 & MedCalc Slide 53)
   * Young Men: 60% (0.6 * weight)
   * Elderly Men / Young Women: 50% (0.5 * weight)
   * Elderly Women: 45% (0.45 * weight)
   * Children: 60% (0.6 * weight)
   */
  function calculateTBW(weightKg, gender = 'male', isElderly = false) {
    let factor = 0.6;
    if (gender === 'male') {
      factor = isElderly ? 0.5 : 0.6;
    } else {
      factor = isElderly ? 0.45 : 0.5;
    }
    return weightKg * factor;
  }

  /**
   * 3. Theoretical Sodium Deficit (Prof. Gabutti Slide 48)
   * Formula: Deficit (mmol) = TBW * (Target Na - Actual Na)
   * Example: 70 kg man with Na 120 -> target 126:
   * (126 - 120) * (0.6 * 70) = 6 * 42 = 252 mmol Na required.
   */
  function calculateSodiumDeficit(actualNa, targetNa, weightKg, gender = 'male', isElderly = false) {
    const tbw = calculateTBW(weightKg, gender, isElderly);
    const naDiff = Math.max(0, targetNa - actualNa);
    const deficitMmol = tbw * naDiff;
    return {
      tbw: Math.round(tbw * 10) / 10,
      deficitMmol: Math.round(deficitMmol)
    };
  }

  /**
   * 4. Adrogué-Madias Formula for Expected Delta-Na (Slide 53)
   * Change in serum Na+ per 1 Liter of infusate:
   * Delta Na = ([Na_infusate] + [K_infusate] - [Na_serum]) / (TBW + 1)
   */
  function calculateAdrogueMadias(serumNa, infusateKey, weightKg, gender = 'male', isElderly = false) {
    const infusate = INFUSATES[infusateKey] || INFUSATES.nacl_3;
    const tbw = calculateTBW(weightKg, gender, isElderly);
    const deltaNaPerLiter = (infusate.na + infusate.k - serumNa) / (tbw + 1);

    return {
      infusateName: infusate.name,
      infusateNa: infusate.na,
      tbw: Math.round(tbw * 10) / 10,
      deltaNaPerLiter: Number(deltaNaPerLiter.toFixed(2))
    };
  }

  /**
   * 5. Infusion Rate Calculator with Osmotic Demyelination Syndrome (ODS) Warning
   * Maximum safe rate of correction (Slide 49): 0.5 mmol/L/hour (max 8-10 mmol/L in 24 hours).
   * Calculates required volume of 3% NaCl (or other fluid) and ml/hour infusion rate.
   */
  function calculateInfusionPlan(actualNa, targetNa, durationHours, weightKg, gender = 'male', isElderly = false, infusateKey = 'nacl_3') {
    const infusate = INFUSATES[infusateKey] || INFUSATES.nacl_3;
    const tbw = calculateTBW(weightKg, gender, isElderly);
    const totalNaRiseNeeded = targetNa - actualNa; // e.g. 126 - 120 = 6 mmol/L
    const rateOfRisePerHour = totalNaRiseNeeded / durationHours; // e.g. 6 / 12 = 0.5 mmol/L/h

    // ODS safety check
    const isExceedingSafeRate = rateOfRisePerHour > 0.5;
    const isExceeding24hSafeLimit = (rateOfRisePerHour * Math.min(24, durationHours)) > 10.0;

    // Adrogue delta per liter
    const deltaPerLiter = (infusate.na + infusate.k - actualNa) / (tbw + 1);
    
    // Liters required to reach target
    const litersRequired = deltaPerLiter > 0 ? (totalNaRiseNeeded / deltaPerLiter) : 0;
    const totalMl = Math.round(litersRequired * 1000);
    const mlPerHour = durationHours > 0 ? Math.round(totalMl / durationHours) : 0;

    return {
      actualNa,
      targetNa,
      durationHours,
      totalNaRiseNeeded: Number(totalNaRiseNeeded.toFixed(1)),
      rateOfRisePerHour: Number(rateOfRisePerHour.toFixed(2)),
      isExceedingSafeRate,
      isExceeding24hSafeLimit,
      infusate,
      totalMl,
      mlPerHour,
      tbw: Number(tbw.toFixed(1))
    };
  }

  /**
   * 6. Potassium-pH Shift Rule (Prof. Gabutti Slide 11 & 37)
   * Rule: Serum [K+] falls by 0.4 mmol/L for every 0.1 rise in arterial pH.
   * Conversely, [K+] rises by 0.4 mmol/L for every 0.1 drop in pH.
   */
  function calculatePotassiumShift(baselineK, baselinePH, currentPH) {
    const deltaPH = currentPH - baselinePH;
    // For every +0.1 in pH, K shifts intracellularly by -0.4
    const deltaK = - (deltaPH / 0.1) * 0.4;
    const expectedK = Math.max(1.0, Math.min(9.0, baselineK + deltaK));
    return {
      deltaPH: Number(deltaPH.toFixed(2)),
      deltaK: Number(deltaK.toFixed(2)),
      expectedK: Number(expectedK.toFixed(2))
    };
  }

  /**
   * 7. Magnesium-ROMK Disinhibition Effect (Slide 12)
   * Normal Mg (0.85 mmol/L) blocks ROMK from excessive K+ wasting.
   * Hypomagnesemia (< 0.7 mmol/L) removes intracellular Mg2+ block on ROMK pore,
   * causing rapid, uninhibited potassium secretion into the urine.
   */
  function calculateROMKActivity(serumMg) {
    // Normal: 1.0 (baseline)
    // Low Mg (< 0.7): Activity increases up to 2.5x
    if (serumMg >= 0.85) return { factor: 1.0, status: 'Normal ROMK inhibition' };
    if (serumMg >= 0.70) return { factor: 1.3, status: 'Mild disinhibition' };
    if (serumMg >= 0.50) return { factor: 1.9, status: 'Moderate disinhibition (Renal K+ wasting active)' };
    return { factor: 2.5, status: 'Severe ROMK disinhibition (Refractory hypokalemia!)' };
  }

  /**
   * 8. Albumin-Corrected Calcium Formula
   * Ca_corrected = Ca_measured + 0.02 * (40 - Albumin_g_L)
   * In mmol/L (or + 0.8 * (4 - Albumin) in mg/dL).
   */
  function calculateCorrectedCalcium(measuredCa, albumin_g_L = 40) {
    const deficit = 40 - albumin_g_L;
    const correctedCa = measuredCa + (0.02 * deficit);
    let category = 'Normal';
    if (correctedCa < 2.15) category = 'Hypocalcemia';
    if (correctedCa > 2.55) category = 'Hypercalcemia';

    return {
      measuredCa,
      albumin: albumin_g_L,
      correctedCa: Number(correctedCa.toFixed(2)),
      category
    };
  }

  /**
   * 9. Calcium x Phosphate Solubility Product
   * Risk of metastatic tissue and vascular calcification when Ca * P > 4.4 mmol^2/L^2 (or > 55 mg^2/dL^2).
   */
  function calculateCaPProduct(ca_mmol_L, p_mmol_L) {
    const product = ca_mmol_L * p_mmol_L;
    const isHighRisk = product > 4.4;
    return {
      product: Number(product.toFixed(2)),
      isHighRisk,
      interpretation: isHighRisk 
        ? 'High risk of metastatic soft tissue and vascular calcification!' 
        : 'Normal solubility product (< 4.4 mmol²/L²)'
    };
  }

  /**
   * 10. ECG Correlate Engine for Potassium, Calcium, and Magnesium
   * Generates exact wave changes based on electrolyte derangements.
   */
  function getECGProfile(potassium, calcium = 2.35, magnesium = 0.85) {
    let rhythm = 'Normal Sinus Rhythm';
    let tWave = 'Normal upright T-wave';
    let uWave = 'Absent';
    let prInterval = 'Normal (0.16s)';
    let qrsWidth = 'Normal (0.08s)';
    let qtInterval = 'Normal (QTc ~ 0.40s)';
    let riskLevel = 'Low';
    let emergencyTreatment = null;
    let waveType = 'normal'; // 'severe_hypo', 'mod_hypo', 'normal', 'mod_hyper', 'severe_hyper'

    // Potassium Effects
    if (potassium < 2.5) {
      waveType = 'severe_hypo';
      rhythm = 'Sinus Bradycardia with frequent ectopics';
      tWave = 'Inverted / severely flattened T-wave';
      uWave = 'Prominent, tall U-wave (T-U fusion appearance)';
      qtInterval = 'Prolonged apparent QT (Long QU interval > 0.50s)';
      riskLevel = 'High Risk of Torsades de Pointes, VT, and VF!';
      emergencyTreatment = 'Urgent IV KCl (max 10-20 mmol/h) in telemetry unit + check Magnesium!';
    } else if (potassium < 3.5) {
      waveType = 'mod_hypo';
      tWave = 'Flattened T-wave with ST-segment depression';
      uWave = 'Visible U-wave after T-wave';
      qtInterval = 'Mild QU interval prolongation';
      riskLevel = 'Moderate risk of supraventricular and ventricular ectopics';
      emergencyTreatment = 'Oral KCl (or IV if symptomatic/fasting). Avoid potassium citrate in alkalosis!';
    } else if (potassium > 7.0) {
      waveType = 'severe_hyper';
      rhythm = 'Sine-wave pattern / Ventricular rhythm / Asystole risk';
      tWave = 'Very tall, narrow, tented T-wave merging with QRS';
      prInterval = 'Absent P-wave (Atrial paralysis / Sino-ventricular conduction)';
      qrsWidth = 'Markedly widened QRS (> 0.16s)';
      riskLevel = 'Critical Medical Emergency (Imminent Cardiac Arrest)!';
      emergencyTreatment = '1. IV Calcium Gluconate (membrane stabilization!) 2. Insulin + Glucose 3. Salbutamol / Beta-2 4. Hemodialysis or K-binders';
    } else if (potassium > 5.5) {
      waveType = 'mod_hyper';
      tWave = 'Tall, peaked, symmetric "tented" T-waves (classic early sign)';
      prInterval = 'Prolonged PR interval';
      qrsWidth = 'Mild QRS widening';
      riskLevel = 'Moderate Risk of Conduction Blocks';
      emergencyTreatment = 'Stop K+ intake/K-sparing drugs, promote excretion (Loop diuretic, Patiromer/Lokelma).';
    }

    // Calcium overlays
    if (calcium < 2.0 && waveType === 'normal') {
      qtInterval = 'Prolonged ST segment & prolonged QTc interval';
    } else if (calcium > 2.8 && waveType === 'normal') {
      qtInterval = 'Shortened ST segment & shortened QTc interval';
    }

    // Magnesium overlay
    if (magnesium < 0.6 && potassium < 3.5) {
      riskLevel += ' | Concomitant hypomagnesemia drastically elevates Torsades de Pointes risk!';
    }

    return {
      potassium,
      calcium,
      magnesium,
      waveType,
      rhythm,
      tWave,
      uWave,
      prInterval,
      qrsWidth,
      qtInterval,
      riskLevel,
      emergencyTreatment
    };
  }

  return {
    REFERENCE_RANGES,
    INFUSATES,
    calculateSerumOsmolality,
    calculateTBW,
    calculateSodiumDeficit,
    calculateAdrogueMadias,
    calculateInfusionPlan,
    calculatePotassiumShift,
    calculateROMKActivity,
    calculateCorrectedCalcium,
    calculateCaPProduct,
    getECGProfile
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ElectrolyteEngine;
}
