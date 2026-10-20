/**
 * ArterioGas Pro - Physiological & ABGA Calculation Engine
 * Designed for High-Rigor Federal Medical Examination Preparation
 * 
 * Supports standard SI units (kPa for PaCO2 and PaO2) and mmHg conversions.
 * Implements Henderson-Hasselbalch, Severinghaus Oxyhemoglobin curve,
 * Alveolar Gas Equation, Boston/Copenhagen acid-base compensation rules,
 * Albumin-corrected Anion Gap, Delta-Delta ratio, and Osmolal Gap.
 */

const ABGAEngine = (function() {
  'use strict';

  // Constants
  const KPA_TO_MMHG = 7.50062;
  const MMHG_TO_KPA = 1 / KPA_TO_MMHG;
  
  // Standard Normal Reference Values
  const REFERENCE = {
    pH: { min: 7.35, max: 7.45, ideal: 7.40 },
    pCO2_kPa: { min: 4.7, max: 6.0, ideal: 5.33 },   // 35 - 45 mmHg
    pCO2_mmHg: { min: 35, max: 45, ideal: 40 },
    pO2_kPa: { min: 10.0, max: 13.3, ideal: 12.0 }, // 75 - 100 mmHg
    pO2_mmHg: { min: 75, max: 100, ideal: 90 },
    hco3: { min: 22.0, max: 26.0, ideal: 24.0 },    // mmol/L
    be: { min: -2.0, max: 2.0, ideal: 0.0 },        // mmol/L
    sao2: { min: 95.0, max: 100.0, ideal: 98.0 },   // %
    na: { min: 135, max: 145, ideal: 140 },         // mmol/L
    k: { min: 3.5, max: 5.0, ideal: 4.0 },          // mmol/L
    cl: { min: 96, max: 106, ideal: 104 },          // mmol/L
    albumin: { min: 35, max: 50, ideal: 40 },       // g/L (or 3.5 - 5.0 g/dL)
    lactate: { min: 0.5, max: 2.0, ideal: 1.0 },    // mmol/L
    glucose: { min: 4.0, max: 6.0, ideal: 5.0 },    // mmol/L
    urea: { min: 2.5, max: 7.0, ideal: 4.5 },       // mmol/L (BUN approx)
    anionGap: { min: 10, max: 14, ideal: 12 },      // mmol/L (without K+)
    horovitz_kPa: { min: 40.0, ideal: 53.3 },       // > 40 kPa = > 300 mmHg
    horovitz_mmHg: { min: 300, ideal: 400 },
  };

  /**
   * Conversions
   */
  function kpaToMmhg(kpa) {
    return kpa * KPA_TO_MMHG;
  }

  function mmhgToKpa(mmhg) {
    return mmhg * MMHG_TO_KPA;
  }

  /**
   * Henderson-Hasselbalch Equation
   * pH = 6.1 + log10([HCO3-] / (alpha * PaCO2))
   * Where alpha in mmHg = 0.0307 mmol/(L * mmHg)
   * Where alpha in kPa = 0.0307 * 7.50062 = 0.2303 mmol/(L * kPa)
   */
  function calculatePH(hco3, pco2_kPa) {
    const alpha_kPa = 0.2303;
    const denominator = alpha_kPa * pco2_kPa;
    if (denominator <= 0 || hco3 <= 0) return 7.40;
    return 6.1 + Math.log10(hco3 / denominator);
  }

  function calculateHCO3(pH, pco2_kPa) {
    const alpha_kPa = 0.2303;
    return alpha_kPa * pco2_kPa * Math.pow(10, pH - 6.1);
  }

  function calculatePCO2_kPa(pH, hco3) {
    const alpha_kPa = 0.2303;
    const hRatio = Math.pow(10, pH - 6.1);
    return hco3 / (alpha_kPa * hRatio);
  }

  /**
   * Base Excess (Van Slyke / Extracellular Standard Base Excess - SBE)
   * SBE = (HCO3 - 24.8) + 16.2 * (pH - 7.40)
   */
  function calculateBaseExcess(pH, hco3) {
    return (hco3 - 24.4) + 14.8 * (pH - 7.40);
  }

  /**
   * Alveolar Gas Equation
   * PAO2 = (Patm - PH2O) * FiO2 - (PaCO2 / R)
   * Sea level: Patm = 101.3 kPa (760 mmHg), PH2O = 6.3 kPa (47 mmHg) -> Patm - PH2O = 95.0 kPa (713 mmHg)
   * R (respiratory quotient) = 0.8
   */
  function calculatePAO2(fio2, pco2_kPa, patm_kPa = 101.325, ph2o_kPa = 6.27, r = 0.8) {
    const pAO2_kPa = (patm_kPa - ph2o_kPa) * fio2 - (pco2_kPa / r);
    return Math.max(0, pAO2_kPa);
  }

  /**
   * Alveolar-Arterial Gradient: AaDO2 = PAO2 - PaO2
   * Expected AaDO2 (mmHg) ≈ (Age / 4) + 4
   * In kPa ≈ ((Age / 4) + 4) / 7.5
   */
  function calculateAaDO2(pAO2_kPa, paO2_kPa) {
    return Math.max(0, pAO2_kPa - paO2_kPa);
  }

  function expectedAaDO2_kPa(age = 40) {
    const mmhg = (age / 4) + 4;
    return mmhg * MMHG_TO_KPA;
  }

  /**
   * Horovitz Index (P/F Ratio): PaO2 / FiO2
   * Berlin Definition for ARDS (at PEEP >= 5 cmH2O):
   * - Normal: > 40 kPa (> 300 mmHg)
   * - Mild ARDS: 26.7 - 40 kPa (200 - 300 mmHg)
   * - Moderate ARDS: 13.3 - 26.7 kPa (100 - 200 mmHg)
   * - Severe ARDS: < 13.3 kPa (< 100 mmHg)
   */
  function calculateHorovitz(paO2_kPa, fio2) {
    const pf_kPa = paO2_kPa / fio2;
    const pf_mmHg = kpaToMmhg(paO2_kPa) / fio2;
    let ardsCategory = 'Normal Oxygenation';
    let severity = 'normal'; // 'normal', 'mild', 'moderate', 'severe'

    if (pf_kPa < 13.33) {
      ardsCategory = 'Severe ARDS';
      severity = 'severe';
    } else if (pf_kPa < 26.67) {
      ardsCategory = 'Moderate ARDS';
      severity = 'moderate';
    } else if (pf_kPa < 40.0) {
      ardsCategory = 'Mild ARDS / Hypoxemic Respiratory Failure';
      severity = 'mild';
    }

    return {
      pf_kPa,
      pf_mmHg,
      ardsCategory,
      severity
    };
  }

  /**
   * Oxyhemoglobin Dissociation Curve (Severinghaus / Ellis Model with Bohr Shift)
   * Temperature, pH, PaCO2, and Base Excess influence affinity.
   * Right shift (Bohr effect): lower pH, higher pCO2, higher temp, higher 2,3-DPG (unloading O2)
   * Left shift: higher pH, lower pCO2, hypothermia, fetal Hb, COHb (holding O2)
   */
  function calculateSaO2(paO2_kPa, pH = 7.40, pco2_kPa = 5.33, tempC = 37, be = 0) {
    const paO2_mmHg = kpaToMmhg(paO2_kPa);
    if (paO2_mmHg <= 0) return 0;

    // Virtual PaO2 adjusted for Bohr shift
    // log(P50/P50_norm) = -0.48*(pH-7.4) + 0.06*log10(pCO2/40) + 0.024*(T-37) + 0.0013*BE
    const pco2_mmHg = kpaToMmhg(pco2_kPa);
    const logShift = -0.48 * (pH - 7.40) + 
                     0.06 * Math.log10(pco2_mmHg / 40) + 
                     0.024 * (tempC - 37) + 
                     0.0013 * be;
    
    // Effective PaO2 on standard curve
    const pO2_eff = paO2_mmHg * Math.pow(10, -logShift);
    
    // Severinghaus formula
    const denominator = Math.pow(pO2_eff, 3) + 150 * pO2_eff;
    if (denominator <= 0) return 0;
    const sao2 = 100 / (1 + (23400 / denominator));
    return Math.min(100, Math.max(0, sao2));
  }

  /**
   * Generate points for the Oxyhemoglobin curve under current patient physiology
   * vs standard reference physiology
   */
  function getOxyhemoglobinCurve(pH, pco2_kPa, tempC = 37, be = 0) {
    const points = [];
    const standardPoints = [];
    // Range: 0 to 20 kPa (0 to 150 mmHg)
    for (let pO2_k = 0; pO2_k <= 20; pO2_k += 0.4) {
      points.push({
        x: pO2_k,
        x_mmHg: kpaToMmhg(pO2_k),
        y: calculateSaO2(pO2_k, pH, pco2_kPa, tempC, be)
      });
      standardPoints.push({
        x: pO2_k,
        x_mmHg: kpaToMmhg(pO2_k),
        y: calculateSaO2(pO2_k, 7.40, 5.33, 37, 0)
      });
    }
    return { current: points, standard: standardPoints };
  }

  /**
   * Anion Gap & Albumin Correction
   * AG = Na - (Cl + HCO3)
   * AG_corrected = AG + 2.5 * (40 - Albumin_g_L) / 10
   */
  function calculateAnionGap(na, cl, hco3, albumin_g_L = 40) {
    const rawAG = na - (cl + hco3);
    // Albumin correction: for every 10 g/L drop below 40 g/L, add 2.5 mmol/L (or 2.5 per 1 g/dL below 4.0)
    const albuminDeficit = (40 - albumin_g_L) / 10;
    const correctedAG = rawAG + (2.5 * albuminDeficit);
    
    // Delta Gap = Corrected AG - 12 (normal AG)
    const deltaAG = correctedAG - 12;
    
    // Delta Bicarb = 24 - HCO3 (expected drop in bicarb)
    const deltaHCO3 = 24 - hco3;
    
    // Delta Ratio = Delta AG / Delta HCO3
    let deltaRatio = null;
    let deltaInterpretation = 'Normal or non-HAGMA';

    if (deltaHCO3 > 1) {
      deltaRatio = deltaAG / deltaHCO3;
      if (deltaRatio < 0.4) {
        deltaInterpretation = 'Pure Normal Anion Gap (Hyperchloremic) Metabolic Acidosis (NAGMA)';
      } else if (deltaRatio < 0.8) {
        deltaInterpretation = 'Mixed HAGMA and NAGMA (e.g., DKA + Diarrhea or Saline resuscitation)';
      } else if (deltaRatio <= 1.6) {
        deltaInterpretation = 'Pure High Anion Gap Metabolic Acidosis (HAGMA)';
      } else {
        deltaInterpretation = 'HAGMA + Pre-existing Metabolic Alkalosis or Chronic Respiratory Acidosis (e.g., DKA + Vomiting)';
      }
    }

    const roundedAG = Math.round(correctedAG * 10) / 10;
    return {
      rawAG,
      correctedAG,
      deltaAG,
      deltaHCO3,
      deltaRatio,
      deltaInterpretation,
      isHighAG: roundedAG > 14.0,
      isLowAG: roundedAG < 10.0
    };
  }

  /**
   * Serum Osmolality & Osmolal Gap
   * Calc Osm = 2*Na + Glucose + Urea (all in mmol/L)
   * Normal Osmolal Gap < 10 mOsm/kg
   */
  function calculateOsmolality(na, glucose = 5.0, urea = 4.5, measuredOsm = null) {
    const calculatedOsm = (2 * na) + glucose + urea;
    let osmolalGap = null;
    let isElevated = false;

    if (measuredOsm !== null) {
      osmolalGap = measuredOsm - calculatedOsm;
      isElevated = osmolalGap > 10;
    }

    return {
      calculatedOsm,
      osmolalGap,
      isElevated
    };
  }

  /**
   * Expected Compensation Formulas (Boston & Copenhagen Rules)
   */
  function calculateCompensation(pH, pco2_kPa, hco3) {
    const pco2_mmHg = kpaToMmhg(pco2_kPa);
    const compensation = {
      primaryDisorder: 'Normal',
      type: 'normal',
      isCompensated: true,
      compensationDetails: '',
      expectedPCO2_kPa: null,
      expectedHCO3: null,
      rules: {}
    };

    const isAcidemia = pH < 7.35;
    const isAlkalemia = pH > 7.45;
    const isNormalPH = !isAcidemia && !isAlkalemia;

    const isRespiratoryAcidosis = pco2_kPa > 6.0;
    const isRespiratoryAlkalosis = pco2_kPa < 4.7;
    const isMetabolicAcidosis = hco3 < 22.0;
    const isMetabolicAlkalosis = hco3 > 26.0;

    // Winter's Formula for Metabolic Acidosis
    // Expected pCO2 (mmHg) = 1.5 * HCO3 + 8 (+/- 2)
    const wintersMin_mmHg = (1.5 * hco3 + 8) - 2;
    const wintersMax_mmHg = (1.5 * hco3 + 8) + 2;
    const wintersIdeal_mmHg = 1.5 * hco3 + 8;
    const wintersIdeal_kPa = mmhgToKpa(wintersIdeal_mmHg);
    const wintersMin_kPa = mmhgToKpa(wintersMin_mmHg);
    const wintersMax_kPa = mmhgToKpa(wintersMax_mmHg);

    // Metabolic Alkalosis expected compensation:
    // Expected pCO2 (mmHg) = 40 + 0.7 * (HCO3 - 24) (+/- 2)
    const metAlkIdeal_mmHg = 40 + (0.7 * (hco3 - 24));
    const metAlkMin_mmHg = metAlkIdeal_mmHg - 2;
    const metAlkMax_mmHg = metAlkIdeal_mmHg + 2;
    const metAlkIdeal_kPa = mmhgToKpa(metAlkIdeal_mmHg);

    // Acute Resp Acidosis: HCO3 increases by 1 mmol/L per 10 mmHg pCO2 increase (0.75 per 1 kPa)
    const deltaPCO2_mmHg_high = Math.max(0, pco2_mmHg - 40);
    const acuteRespAcidHCO3 = 24 + (1 * (deltaPCO2_mmHg_high / 10));
    // Chronic Resp Acidosis: HCO3 increases by 3.5 mmol/L per 10 mmHg pCO2 increase (2.6 per 1 kPa)
    const chronicRespAcidHCO3 = 24 + (3.5 * (deltaPCO2_mmHg_high / 10));

    // Acute Resp Alkalosis: HCO3 decreases by 2 mmol/L per 10 mmHg pCO2 decrease (1.5 per 1 kPa)
    const deltaPCO2_mmHg_low = Math.max(0, 40 - pco2_mmHg);
    const acuteRespAlkHCO3 = 24 - (2 * (deltaPCO2_mmHg_low / 10));
    // Chronic Resp Alkalosis: HCO3 decreases by 5 mmol/L per 10 mmHg pCO2 decrease (3.75 per 1 kPa)
    const chronicRespAlkHCO3 = 24 - (5 * (deltaPCO2_mmHg_low / 10));

    compensation.rules = {
      wintersIdeal_kPa,
      wintersMin_kPa,
      wintersMax_kPa,
      metAlkIdeal_kPa,
      acuteRespAcidHCO3,
      chronicRespAcidHCO3,
      acuteRespAlkHCO3,
      chronicRespAlkHCO3
    };

    // Diagnostic logic
    if (isAcidemia) {
      if (isRespiratoryAcidosis && !isMetabolicAcidosis) {
        compensation.primaryDisorder = 'Respiratory Acidosis';
        compensation.type = 'respiratory_acidosis';
        if (hco3 < acuteRespAcidHCO3 - 1) {
          compensation.compensationDetails = 'Acute Respiratory Acidosis with concurrent Metabolic Acidosis';
          compensation.isCompensated = false;
        } else if (Math.abs(hco3 - acuteRespAcidHCO3) <= 1.5) {
          compensation.compensationDetails = 'Acute Respiratory Acidosis (uncompensated renal response; requires 2-5 days)';
          compensation.isCompensated = false;
        } else if (Math.abs(hco3 - chronicRespAcidHCO3) <= 2) {
          compensation.compensationDetails = 'Chronic / Renal-Compensated Respiratory Acidosis (e.g. chronic hypercapnia in COPD)';
          compensation.isCompensated = true;
        } else if (hco3 > acuteRespAcidHCO3 && hco3 < chronicRespAcidHCO3) {
          compensation.compensationDetails = 'Partially Compensated Respiratory Acidosis (subacute renal adaptation in progress)';
          compensation.isCompensated = false;
        } else if (hco3 > chronicRespAcidHCO3 + 2) {
          compensation.compensationDetails = 'Respiratory Acidosis with superimposed Metabolic Alkalosis (e.g. COPD patient on diuretics)';
          compensation.isCompensated = false;
        }
      } else if (isMetabolicAcidosis && !isRespiratoryAcidosis) {
        compensation.primaryDisorder = 'Metabolic Acidosis';
        compensation.type = 'metabolic_acidosis';
        if (pco2_kPa < wintersMin_kPa) {
          compensation.compensationDetails = `Metabolic Acidosis with superimposed Respiratory Alkalosis (Measured PaCO2 ${pco2_kPa.toFixed(1)} kPa is below Winter's expected range ${wintersMin_kPa.toFixed(1)}–${wintersMax_kPa.toFixed(1)} kPa). Possible salicylate toxicity!`;
          compensation.isCompensated = false;
        } else if (pco2_kPa > wintersMax_kPa) {
          compensation.compensationDetails = `Metabolic Acidosis with superimposed Respiratory Acidosis (Inadequate respiratory compensation: PaCO2 ${pco2_kPa.toFixed(1)} kPa exceeds Winter's limit ${wintersMax_kPa.toFixed(1)} kPa). Exhaustion, CNS depression, or lung disease!`;
          compensation.isCompensated = false;
        } else {
          compensation.compensationDetails = `Metabolic Acidosis with appropriate Respiratory Compensation via hyperventilation (Kussmaul breathing). PaCO2 matches Winter's formula (${wintersMin_kPa.toFixed(1)}–${wintersMax_kPa.toFixed(1)} kPa).`;
          compensation.isCompensated = true;
        }
      } else if (isRespiratoryAcidosis && isMetabolicAcidosis) {
        compensation.primaryDisorder = 'Combined / Mixed Respiratory and Metabolic Acidosis';
        compensation.type = 'mixed_acidosis';
        compensation.compensationDetails = 'Severe double acidosis! PaCO2 is elevated AND HCO3 is depleted. Typical in cardiac arrest, severe septic shock with respiratory fatigue, or COPD with acute shock.';
        compensation.isCompensated = false;
      }
    } else if (isAlkalemia) {
      if (isRespiratoryAlkalosis && !isMetabolicAlkalosis) {
        compensation.primaryDisorder = 'Respiratory Alkalosis';
        compensation.type = 'respiratory_alkalosis';
        if (Math.abs(hco3 - acuteRespAlkHCO3) <= 1.5) {
          compensation.compensationDetails = 'Acute Respiratory Alkalosis (e.g., hyperventilation syndrome, pain, anxiety, pulmonary embolism). Renal bicarb wasting has not yet occurred.';
          compensation.isCompensated = false;
        } else if (Math.abs(hco3 - chronicRespAlkHCO3) <= 2) {
          compensation.compensationDetails = 'Chronic Respiratory Alkalosis with full renal compensation (e.g., high altitude adaptation, pregnancy).';
          compensation.isCompensated = true;
        } else if (hco3 < chronicRespAlkHCO3) {
          compensation.compensationDetails = 'Respiratory Alkalosis with superimposed Metabolic Acidosis.';
          compensation.isCompensated = false;
        } else {
          compensation.compensationDetails = 'Partially compensated Respiratory Alkalosis.';
          compensation.isCompensated = false;
        }
      } else if (isMetabolicAlkalosis && !isRespiratoryAlkalosis) {
        compensation.primaryDisorder = 'Metabolic Alkalosis';
        compensation.type = 'metabolic_alkalosis';
        if (pco2_kPa > metAlkIdeal_kPa + 0.3) {
          compensation.compensationDetails = `Metabolic Alkalosis with superimposed Respiratory Acidosis.`;
          compensation.isCompensated = false;
        } else if (pco2_kPa < 4.7) {
          compensation.compensationDetails = `Metabolic Alkalosis with superimposed Respiratory Alkalosis.`;
          compensation.isCompensated = false;
        } else {
          compensation.compensationDetails = `Metabolic Alkalosis with appropriate respiratory hypoventilation compensation (limited by hypoxemic drive). Expected PaCO2 ~ ${metAlkIdeal_kPa.toFixed(1)} kPa.`;
          compensation.isCompensated = true;
        }
      } else if (isRespiratoryAlkalosis && isMetabolicAlkalosis) {
        compensation.primaryDisorder = 'Combined / Mixed Respiratory and Metabolic Alkalosis';
        compensation.type = 'mixed_alkalosis';
        compensation.compensationDetails = 'Extreme alkalemia! Hyperventilation combined with vomiting, diuretic therapy, or hyperaldosteronism.';
        compensation.isCompensated = false;
      }
    } else {
      // Normal pH: could be pure normal or fully compensated mixed disorder
      if (isRespiratoryAcidosis && isMetabolicAlkalosis) {
        compensation.primaryDisorder = 'Mixed Disorder: Respiratory Acidosis + Metabolic Alkalosis';
        compensation.type = 'mixed_normal_ph';
        compensation.compensationDetails = 'Normal pH masking dual opposing disturbances! E.g. severe COPD with diuretic use or persistent vomiting.';
        compensation.isCompensated = true;
      } else if (isRespiratoryAlkalosis && isMetabolicAcidosis) {
        compensation.primaryDisorder = 'Mixed Disorder: Respiratory Alkalosis + Metabolic Acidosis';
        compensation.type = 'mixed_normal_ph';
        compensation.compensationDetails = 'Normal pH masking dual opposing disturbances! Classic presentation in Early Sepsis or Salicylate (Aspirin) poisoning.';
        compensation.isCompensated = true;
      } else if (!isRespiratoryAcidosis && !isRespiratoryAlkalosis && !isMetabolicAcidosis && !isMetabolicAlkalosis) {
        compensation.primaryDisorder = 'Normal Acid-Base Balance';
        compensation.type = 'normal';
        compensation.compensationDetails = 'All acid-base parameters are within normal physiological reference ranges.';
        compensation.isCompensated = true;
      }
    }

    return compensation;
  }

  /**
   * Davenport Nomogram coordinate & isobar helper
   * X-axis: pH (6.90 to 7.80)
   * Y-axis: [HCO3-] (0 to 50 mmol/L)
   * Isobars: curves where PaCO2 is constant.
   * [HCO3-] = alpha * PaCO2 * 10^(pH - 6.1)
   */
  function getDavenportIsobar(pco2_kPa, minPH = 6.9, maxPH = 7.8, step = 0.02) {
    const points = [];
    const alpha_kPa = 0.2303;
    for (let ph = minPH; ph <= maxPH; ph += step) {
      const hco3 = alpha_kPa * pco2_kPa * Math.pow(10, ph - 6.1);
      if (hco3 <= 60) {
        points.push({ x: Number(ph.toFixed(2)), y: Number(hco3.toFixed(1)) });
      }
    }
    return points;
  }

  /**
   * Complete Comprehensive ABGA Analysis
   */
  function analyze(input) {
    const pco2_kPa = input.pco2_kPa;
    const paO2_kPa = input.paO2_kPa;
    const fio2 = input.fio2 || 0.21;
    const age = input.age || 35;
    const tempC = input.tempC || 37.0;
    const na = input.na !== undefined ? input.na : 140;
    const k = input.k !== undefined ? input.k : 4.0;
    const cl = input.cl !== undefined ? input.cl : 104;
    const albumin = input.albumin !== undefined ? input.albumin : 40;
    const glucose = input.glucose || 5.0;
    const urea = input.urea || 4.5;
    const measuredOsm = input.measuredOsm || null;

    // Determine pH and HCO3
    let pH = input.pH;
    let hco3 = input.hco3;

    if (input.mode === 'derive_ph' && hco3 && pco2_kPa) {
      pH = calculatePH(hco3, pco2_kPa);
    } else if (input.mode === 'derive_hco3' && pH && pco2_kPa) {
      hco3 = calculateHCO3(pH, pco2_kPa);
    } else if (input.mode === 'derive_pco2' && pH && hco3) {
      // pco2 derived
    }

    const be = calculateBaseExcess(pH, hco3);
    const paO2_mmHg = kpaToMmhg(paO2_kPa);
    const pco2_mmHg = kpaToMmhg(pco2_kPa);
    const pAO2_kPa = calculatePAO2(fio2, pco2_kPa);
    const pAO2_mmHg = kpaToMmhg(pAO2_kPa);
    const aaDO2_kPa = calculateAaDO2(pAO2_kPa, paO2_kPa);
    const aaDO2_mmHg = kpaToMmhg(aaDO2_kPa);
    const expAaDO2_kPa = expectedAaDO2_kPa(age);
    const expAaDO2_mmHg = (age / 4) + 4;
    const horovitz = calculateHorovitz(paO2_kPa, fio2);
    const sao2 = calculateSaO2(paO2_kPa, pH, pco2_kPa, tempC, be);
    const anionGap = calculateAnionGap(na, cl, hco3, albumin);
    const osmolality = calculateOsmolality(na, glucose, urea, measuredOsm);
    const compensation = calculateCompensation(pH, pco2_kPa, hco3);

    return {
      inputs: {
        pH,
        pco2_kPa,
        pco2_mmHg,
        paO2_kPa,
        paO2_mmHg,
        hco3,
        be,
        fio2,
        age,
        tempC,
        na,
        k,
        cl,
        albumin,
        glucose,
        urea
      },
      oxygenation: {
        pAO2_kPa,
        pAO2_mmHg,
        aaDO2_kPa,
        aaDO2_mmHg,
        expAaDO2_kPa,
        expAaDO2_mmHg,
        isAaDO2Elevated: aaDO2_kPa > expAaDO2_kPa * 1.25,
        horovitz,
        sao2
      },
      acidBase: {
        pH,
        hco3,
        be,
        pco2_kPa,
        compensation
      },
      electrolytes: anionGap,
      osmolality
    };
  }

  return {
    REFERENCE,
    kpaToMmhg,
    mmhgToKpa,
    calculatePH,
    calculateHCO3,
    calculatePCO2_kPa,
    calculateBaseExcess,
    calculatePAO2,
    calculateAaDO2,
    expectedAaDO2_kPa,
    calculateHorovitz,
    calculateSaO2,
    getOxyhemoglobinCurve,
    calculateAnionGap,
    calculateOsmolality,
    calculateCompensation,
    getDavenportIsobar,
    analyze
  };
})();

// Export for module systems or window global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ABGAEngine;
}
