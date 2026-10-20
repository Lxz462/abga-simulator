/**
 * ArterioGas Pro - Main Application Controller
 * Handles user interaction, reactive state updates, chart syncing,
 * and dynamic pathophysiological clinical explanations.
 */

(function() {
  'use strict';

  // Application State
  const state = {
    pH: 7.40,
    pco2_kPa: 5.33,
    paO2_kPa: 12.5,
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
    age: 30,
    measuredOsm: null,
    autoDerivePH: true,
    activeTab: 'simulator',
    currentPresetId: 'normal',
    quiz: {
      currentCaseIndex: 0,
      score: 0,
      answeredCount: 0,
      userAnswers: {}
    }
  };

  // DOM Elements Cache
  const elements = {};

  function cacheDOMElements() {
    // Sliders & Inputs
    elements.sliderPH = document.getElementById('slider-ph');
    elements.sliderPCO2 = document.getElementById('slider-pco2');
    elements.sliderPO2 = document.getElementById('slider-po2');
    elements.sliderFIO2 = document.getElementById('slider-fio2');
    elements.sliderHCO3 = document.getElementById('slider-hco3');
    elements.sliderTemp = document.getElementById('slider-temp');
    elements.sliderNa = document.getElementById('slider-na');
    elements.sliderK = document.getElementById('slider-k');
    elements.sliderCl = document.getElementById('slider-cl');
    elements.sliderAlbumin = document.getElementById('slider-albumin');
    elements.sliderLactate = document.getElementById('slider-lactate');
    elements.sliderGlucose = document.getElementById('slider-glucose');
    elements.sliderAge = document.getElementById('slider-age');

    // Value Badges
    elements.valPH = document.getElementById('val-ph');
    elements.valPCO2_kPa = document.getElementById('val-pco2-kpa');
    elements.valPCO2_mmHg = document.getElementById('val-pco2-mmhg');
    elements.valPO2_kPa = document.getElementById('val-po2-kpa');
    elements.valPO2_mmHg = document.getElementById('val-po2-mmhg');
    elements.valFIO2 = document.getElementById('val-fio2');
    elements.valHCO3 = document.getElementById('val-hco3');
    elements.valBE = document.getElementById('val-be');
    elements.valTemp = document.getElementById('val-temp');
    elements.valNa = document.getElementById('val-na');
    elements.valK = document.getElementById('val-k');
    elements.valCl = document.getElementById('val-cl');
    elements.valAlbumin = document.getElementById('val-albumin');
    elements.valLactate = document.getElementById('val-lactate');
    elements.valGlucose = document.getElementById('val-glucose');
    elements.valAge = document.getElementById('val-age');

    // Indicators & Highlights
    elements.badgePHStatus = document.getElementById('badge-ph-status');
    elements.badgePrimaryDisorder = document.getElementById('badge-primary-disorder');
    elements.badgeHorovitz = document.getElementById('badge-horovitz');
    elements.valHorovitzKpa = document.getElementById('val-horovitz-kpa');
    elements.valHorovitzMmhg = document.getElementById('val-horovitz-mmhg');
    elements.valSaO2 = document.getElementById('val-sao2');
    elements.valAaDO2 = document.getElementById('val-aado2');
    elements.valExpAaDO2 = document.getElementById('val-exp-aado2');
    elements.valAnionGap = document.getElementById('val-anion-gap');
    elements.valAnionGapTop = document.getElementById('val-anion-gap-top');
    elements.valCorrectedAG = document.getElementById('val-corrected-ag');
    elements.valDeltaRatio = document.getElementById('val-delta-ratio');
    elements.badgeAGStatus = document.getElementById('badge-ag-status');

    // Explanation Box Containers
    elements.explainSummary = document.getElementById('explain-summary');
    elements.explainWhyPH = document.getElementById('explain-why-ph');
    elements.explainRespiratory = document.getElementById('explain-respiratory');
    elements.explainRenal = document.getElementById('explain-renal');
    elements.explainAnionGap = document.getElementById('explain-anion-gap');
    elements.explainOxygenation = document.getElementById('explain-oxygenation');
    elements.explainPearls = document.getElementById('explain-pearls');

    // Top Diagnostic Row Readouts
    elements.valPH_top = document.getElementById('val-ph-top');
    elements.valPCO2_top = document.getElementById('val-pco2-top');
    elements.valPCO2_mmhg_top = document.getElementById('val-pco2-mmhg-top');
    elements.valHCO3_top = document.getElementById('val-hco3-top');
    elements.valPO2_top = document.getElementById('val-po2-top');
    elements.valPO2_mmhg_top = document.getElementById('val-po2-mmhg-top');

    // Preset Dropdown & Controls
    elements.presetSelect = document.getElementById('preset-select');
    elements.switchAutoPH = document.getElementById('switch-auto-ph');

    // Chart Tabs & Views
    elements.chartTabBtns = document.querySelectorAll('.chart-tab-btn');
    elements.chartViews = document.querySelectorAll('.chart-view');

    // Biochemical Pathway Box Elements
    elements.boxBiochemical = document.getElementById('box-biochemical');
    elements.bioSyndrome = document.getElementById('bio-syndrome');
    elements.bioEnzyme = document.getElementById('bio-enzyme');
    elements.bioCofactors = document.getElementById('bio-cofactors');
    elements.bioReaction = document.getElementById('bio-reaction');
    elements.bioShunt = document.getElementById('bio-shunt');
  }

  function renderPresets() {
    // Dropdown is rendered statically in index.html; sync current value
    if (elements.presetSelect) {
      elements.presetSelect.value = state.currentPresetId;
    }
  }

  /**
   * Apply a Disease Preset
   */
  function applyPreset(presetId) {
    const preset = DiseasePresets.find(p => p.id === presetId);
    if (!preset) return;

    state.currentPresetId = preset.id;
    const v = preset.values;

    state.pco2_kPa = v.pco2_kPa;
    state.paO2_kPa = v.paO2_kPa;
    state.fio2 = v.fio2;
    state.hco3 = v.hco3;
    state.pH = v.pH;
    state.be = v.be;
    state.na = v.na;
    state.k = v.k;
    state.cl = v.cl;
    state.albumin = v.albumin;
    state.glucose = v.glucose;
    state.lactate = v.lactate;
    state.urea = v.urea;
    state.tempC = v.tempC;
    state.age = v.age;
    state.measuredOsm = v.measuredOsm || null;

    if (elements.presetSelect && presetId !== 'custom') {
      elements.presetSelect.value = preset.id;
    }

    syncSlidersWithState();
    recalculateAndUpdateUI();
  }

  /**
   * Sync Sliders with State values
   */
  function syncSlidersWithState() {
    if (elements.sliderPH) elements.sliderPH.value = state.pH.toFixed(2);
    if (elements.sliderPCO2) elements.sliderPCO2.value = state.pco2_kPa.toFixed(1);
    if (elements.sliderPO2) elements.sliderPO2.value = state.paO2_kPa.toFixed(1);
    if (elements.sliderFIO2) elements.sliderFIO2.value = state.fio2.toFixed(2);
    if (elements.sliderHCO3) elements.sliderHCO3.value = state.hco3.toFixed(1);
    if (elements.sliderTemp) elements.sliderTemp.value = state.tempC.toFixed(1);
    if (elements.sliderNa) elements.sliderNa.value = state.na;
    if (elements.sliderK) elements.sliderK.value = state.k.toFixed(1);
    if (elements.sliderCl) elements.sliderCl.value = state.cl;
    if (elements.sliderAlbumin) elements.sliderAlbumin.value = state.albumin;
    if (elements.sliderLactate) elements.sliderLactate.value = state.lactate.toFixed(1);
    if (elements.sliderGlucose) elements.sliderGlucose.value = state.glucose.toFixed(1);
    if (elements.sliderAge) elements.sliderAge.value = state.age;
  }

  /**
   * Recalculate everything and update DOM + Charts
   */
  function recalculateAndUpdateUI() {
    // If auto-derive pH is checked, calculate pH via Henderson-Hasselbalch
    if (state.autoDerivePH) {
      state.pH = ABGAEngine.calculatePH(state.hco3, state.pco2_kPa);
      if (elements.sliderPH) elements.sliderPH.value = state.pH.toFixed(2);
    }

    state.be = ABGAEngine.calculateBaseExcess(state.pH, state.hco3);

    // Run Engine Analysis
    const analysis = ABGAEngine.analyze({
      pH: state.pH,
      pco2_kPa: state.pco2_kPa,
      paO2_kPa: state.paO2_kPa,
      fio2: state.fio2,
      hco3: state.hco3,
      age: state.age,
      tempC: state.tempC,
      na: state.na,
      k: state.k,
      cl: state.cl,
      albumin: state.albumin,
      glucose: state.glucose,
      urea: state.urea,
      measuredOsm: state.measuredOsm
    });

    // Update Top Row Readouts
    if (elements.valPH_top) elements.valPH_top.textContent = state.pH.toFixed(2);
    if (elements.valPCO2_top) elements.valPCO2_top.textContent = state.pco2_kPa.toFixed(1);
    if (elements.valPCO2_mmhg_top) elements.valPCO2_mmhg_top.textContent = ABGAEngine.kpaToMmhg(state.pco2_kPa).toFixed(1);
    if (elements.valHCO3_top) elements.valHCO3_top.textContent = state.hco3.toFixed(1);
    if (elements.valPO2_top) elements.valPO2_top.textContent = state.paO2_kPa.toFixed(1);
    if (elements.valPO2_mmhg_top) elements.valPO2_mmhg_top.textContent = ABGAEngine.kpaToMmhg(state.paO2_kPa).toFixed(1);

    // Update Slider Value Badges in DOM
    if (elements.valPH) elements.valPH.textContent = state.pH.toFixed(2);
    if (elements.valPCO2_kPa) elements.valPCO2_kPa.textContent = state.pco2_kPa.toFixed(1);
    if (elements.valPCO2_mmHg) elements.valPCO2_mmHg.textContent = ABGAEngine.kpaToMmhg(state.pco2_kPa).toFixed(1);
    if (elements.valPO2_kPa) elements.valPO2_kPa.textContent = state.paO2_kPa.toFixed(1);
    if (elements.valPO2_mmHg) elements.valPO2_mmHg.textContent = ABGAEngine.kpaToMmhg(state.paO2_kPa).toFixed(1);
    if (elements.valFIO2) elements.valFIO2.textContent = `${(state.fio2 * 100).toFixed(0)}% (${state.fio2.toFixed(2)})`;
    if (elements.valHCO3) elements.valHCO3.textContent = state.hco3.toFixed(1);
    if (elements.valBE) elements.valBE.textContent = (state.be >= 0 ? '+' : '') + state.be.toFixed(1);
    if (elements.valTemp) elements.valTemp.textContent = `${state.tempC.toFixed(1)}°C`;
    if (elements.valNa) elements.valNa.textContent = state.na;
    if (elements.valK) elements.valK.textContent = state.k.toFixed(1);
    if (elements.valCl) elements.valCl.textContent = state.cl;
    if (elements.valAlbumin) elements.valAlbumin.textContent = state.albumin;
    if (elements.valLactate) elements.valLactate.textContent = state.lactate.toFixed(1);
    if (elements.valGlucose) elements.valGlucose.textContent = state.glucose.toFixed(1);
    if (elements.valAge) elements.valAge.textContent = `${state.age} yrs`;

    // Status Badges
    updateStatusBadges(analysis);

    // Update Explanations
    updateExplanationText(analysis);

    // Update Charts
    ABGACharts.updateDavenport(state.pH, state.hco3);
    ABGACharts.updateOxyHb(state.paO2_kPa, state.pH, state.pco2_kPa, state.tempC, state.be);
    ABGACharts.updateGamblegram(state.na, state.k, state.cl, state.hco3, analysis.electrolytes.rawAG, analysis.electrolytes.isHighAG);
  }

  /**
   * Update Status Indicator Badges (pH, Primary Disorder, ARDS, Anion Gap)
   */
  function updateStatusBadges(analysis) {
    // pH Status
    let phStatus = 'Normal pH';
    let phClass = 'text-slate-300 bg-slate-900 border-slate-800';
    if (state.pH < 7.35) {
      phStatus = state.pH < 7.20 ? 'Severe Acidemia' : 'Acidemia';
      phClass = 'text-rose-400 bg-slate-900 border-slate-800';
    } else if (state.pH > 7.45) {
      phStatus = state.pH > 7.55 ? 'Severe Alkalemia' : 'Alkalemia';
      phClass = 'text-sky-400 bg-slate-900 border-slate-800';
    }
    if (elements.badgePHStatus) {
      elements.badgePHStatus.textContent = phStatus;
      elements.badgePHStatus.className = `px-2 py-0.5 rounded text-xs border ${phClass}`;
    }

    // Primary Disorder
    if (elements.badgePrimaryDisorder) {
      elements.badgePrimaryDisorder.textContent = analysis.acidBase.compensation.primaryDisorder;
    }

    // Oxygenation & Horovitz
    const horovitz = analysis.oxygenation.horovitz;
    if (elements.valHorovitzKpa) elements.valHorovitzKpa.textContent = horovitz.pf_kPa.toFixed(1);
    if (elements.valHorovitzMmhg) elements.valHorovitzMmhg.textContent = horovitz.pf_mmHg.toFixed(0);
    if (elements.badgeHorovitz) {
      elements.badgeHorovitz.textContent = horovitz.ardsCategory;
      let hClass = 'text-slate-300 bg-slate-900 border-slate-800';
      if (horovitz.severity === 'mild') hClass = 'text-amber-400 bg-slate-900 border-slate-800';
      if (horovitz.severity === 'moderate') hClass = 'text-orange-400 bg-slate-900 border-slate-800';
      if (horovitz.severity === 'severe') hClass = 'text-rose-400 bg-slate-900 border-slate-800';
      elements.badgeHorovitz.className = `px-2 py-0.5 rounded text-xs border ${hClass}`;
    }

    if (elements.valSaO2) elements.valSaO2.textContent = `${analysis.oxygenation.sao2.toFixed(1)}%`;
    if (elements.valAaDO2) elements.valAaDO2.textContent = `${analysis.oxygenation.aaDO2_kPa.toFixed(1)} kPa (${analysis.oxygenation.aaDO2_mmHg.toFixed(0)} mmHg)`;
    if (elements.valExpAaDO2) elements.valExpAaDO2.textContent = `Expected: ~${analysis.oxygenation.expAaDO2_kPa.toFixed(1)} kPa`;

    // Anion Gap & Delta
    const el = analysis.electrolytes;
    if (elements.valAnionGap) elements.valAnionGap.textContent = `${el.rawAG.toFixed(1)} mmol/L`;
    if (elements.valAnionGapTop) elements.valAnionGapTop.textContent = el.rawAG.toFixed(1);
    if (elements.valCorrectedAG) elements.valCorrectedAG.textContent = `${el.correctedAG.toFixed(1)} mmol/L (Albumin: ${state.albumin} g/L)`;
    if (elements.valDeltaRatio) {
      elements.valDeltaRatio.textContent = el.deltaRatio !== null ? el.deltaRatio.toFixed(2) : 'N/A';
    }

    if (elements.badgeAGStatus) {
      let agText = el.isHighAG ? 'Elevated AG' : (el.isLowAG ? 'Low AG' : 'Normal AG');
      let agColor = el.isHighAG 
        ? 'text-rose-400 bg-slate-900 border-slate-800' 
        : (el.isLowAG ? 'text-amber-400 bg-slate-900 border-slate-800' : 'text-slate-400 bg-slate-900 border-slate-800');
      elements.badgeAGStatus.textContent = agText;
      elements.badgeAGStatus.className = `px-2 py-0.5 rounded text-xs border ${agColor}`;
    }
  }

  /**
   * Update Dynamic Pathophysiological Explanations ("Why did pH change?")
   */
  function updateExplanationText(analysis) {
    const preset = DiseasePresets.find(p => p.id === state.currentPresetId);

    // Biochemical pathway lesion box display
    if (preset && preset.biochemical && Math.abs(preset.values.pH - state.pH) < 0.05) {
      if (elements.boxBiochemical) elements.boxBiochemical.classList.remove('hidden');
      if (elements.bioSyndrome) elements.bioSyndrome.textContent = preset.biochemical.clinicalSyndrome || '';
      if (elements.bioEnzyme) elements.bioEnzyme.textContent = preset.biochemical.enzyme || '';
      if (elements.bioCofactors) elements.bioCofactors.textContent = preset.biochemical.cofactors || '';
      if (elements.bioReaction) elements.bioReaction.textContent = preset.biochemical.reaction || '';
      if (elements.bioShunt) elements.bioShunt.textContent = preset.biochemical.shunt || '';
    } else {
      if (elements.boxBiochemical) elements.boxBiochemical.classList.add('hidden');
    }

    // If an active preset exists and matches current values, use its rich author narrative
    if (preset && Math.abs(preset.values.pH - state.pH) < 0.05 && Math.abs(preset.values.pco2_kPa - state.pco2_kPa) < 0.3) {
      if (elements.explainSummary) elements.explainSummary.textContent = preset.explanation.summary;
      if (elements.explainWhyPH) elements.explainWhyPH.textContent = preset.explanation.mechanism;
      if (elements.explainRespiratory) elements.explainRespiratory.textContent = preset.explanation.respiratory;
      if (elements.explainRenal) elements.explainRenal.textContent = preset.explanation.renal;
      if (elements.explainAnionGap) elements.explainAnionGap.textContent = preset.explanation.anionGap;
      if (elements.explainOxygenation) elements.explainOxygenation.textContent = preset.explanation.oxygenation;

      if (elements.explainPearls) {
        elements.explainPearls.innerHTML = preset.pearls.map(p => `
          <li class="flex items-start gap-2 text-xs text-slate-300">
            <span class="text-slate-500">•</span>
            <span>${p}</span>
          </li>
        `).join('');
      }
      return;
    }

    // Dynamic generation when custom sliders are adjusted:
    const comp = analysis.acidBase.compensation;
    const isAcidemia = state.pH < 7.35;
    const isAlkalemia = state.pH > 7.45;

    let summaryText = `Diagnosis: ${comp.primaryDisorder}. Blood pH is ${state.pH.toFixed(2)} (Safe zone: 7.35–7.45), with PaCO₂ at ${state.pco2_kPa.toFixed(1)} kPa (${ABGAEngine.kpaToMmhg(state.pco2_kPa).toFixed(0)} mmHg) and Bicarbonate [HCO₃⁻] at ${state.hco3.toFixed(1)} mmol/L.`;
    
    let mechanismText = '';
    if (isAcidemia) {
      mechanismText = `Arterial blood is too acidic (pH < 7.35). `;
      if (state.pco2_kPa > 6.0 && state.hco3 < 22) {
        mechanismText += `Double trouble (Mixed Acidosis): Both organs are contributing to acid buildup! The lungs are failing to breathe out CO₂ acid, and the kidneys/body have lost their protective bicarbonate base sponge.`;
      } else if (state.pco2_kPa > 6.0) {
        mechanismText += `The culprit is the lungs (Respiratory Acidosis). The patient is not breathing enough air out (hypoventilation), trapping CO₂ gas in the bloodstream. Because CO₂ dissolves into carbonic acid, holding onto CO₂ directly turns the blood acidic.`;
      } else {
        mechanismText += `The culprit is the metabolism (Metabolic Acidosis). Either the body is accumulating fixed metabolic acids (like ketones, lactic acid, or ingested toxins) or it lost bicarbonate base directly (e.g. through diarrhea). Every molecule of acid consumes bicarbonate, causing pH to drop.`;
      }
    } else if (isAlkalemia) {
      mechanismText = `Arterial blood is too basic / alkaline (pH > 7.45). `;
      if (state.pco2_kPa < 4.7 && state.hco3 > 26) {
        mechanismText += `Combined Alkalemia: The lungs are blowing off CO₂ acid (hyperventilation) while the kidneys or body have accumulated excess bicarbonate base (or lost gastric acid from vomiting).`;
      } else if (state.pco2_kPa < 4.7) {
        mechanismText += `The culprit is the lungs (Respiratory Alkalosis). Rapid breathing (hyperventilation) is blowing out CO₂ acid much faster than the body produces it. Losing acid leaves the blood in an alkaline state.`;
      } else {
        mechanismText += `The culprit is the metabolism (Metabolic Alkalosis). The body has accumulated excess bicarbonate base, often caused by losing stomach acid (vomiting) or taking diuretic medications.`;
      }
    } else {
      mechanismText = `Arterial pH is in the safe physiological window (7.35 – 7.45). The ratio of bicarbonate base to dissolved CO₂ acid is well-balanced at approximately 20 to 1.`;
    }

    let respText = `Lungs' response: ${comp.compensationDetails}`;
    if (state.hco3 < 22) {
      const wMin = comp.rules.wintersMin_kPa.toFixed(1);
      const wMax = comp.rules.wintersMax_kPa.toFixed(1);
      respText += ` Student rule of thumb (Winter's formula): For this bicarbonate level (${state.hco3.toFixed(1)} mmol/L), the lungs should breathe faster to push PaCO₂ down to ${wMin}–${wMax} kPa (${(comp.rules.wintersMin_kPa * 7.5).toFixed(0)}–${(comp.rules.wintersMax_kPa * 7.5).toFixed(0)} mmHg).`;
    }

    let renalText = '';
    if (state.pco2_kPa > 6.0) {
      renalText = `Kidneys' response: Kidneys take 2 to 3 days to help out. In acute CO₂ retention (hours), the kidneys haven't adapted yet. Over days of chronic lung disease, the kidneys retain bicarbonate to drag the pH back toward normal.`;
    } else if (state.pco2_kPa < 4.7) {
      renalText = `Kidneys' response: If hyperventilation lasts for days, the kidneys gradually pee out excess bicarbonate into the urine to balance out the lost CO₂ acid.`;
    } else {
      renalText = `Kidneys' response: Renal acid excretion and bicarbonate reabsorption are operating normally.`;
    }

    let agText = `Anion Gap is ${analysis.electrolytes.rawAG.toFixed(1)} mmol/L (Normal average: 12 mmol/L, reference: 10–14 mmol/L). `;
    agText += analysis.electrolytes.isHighAG 
      ? `High Anion Gap (> 14 mmol/L) confirms "mystery acids" (like ketones, lactic acid, or poisons from GOLD MARK) entered the blood and destroyed bicarbonate.` 
      : `Normal Anion Gap (10–14 mmol/L) indicates no mystery acid; if acidic, it's a base-loss disorder where chloride replaces bicarbonate (HARDUPS).`;

    let o2Text = `Oxygenation: PaO₂ is ${state.paO2_kPa.toFixed(1)} kPa (${ABGAEngine.kpaToMmhg(state.paO2_kPa).toFixed(0)} mmHg). `;
    o2Text += `The A-a oxygen gradient is ${analysis.oxygenation.aaDO2_kPa.toFixed(1)} kPa (expected: ~${analysis.oxygenation.expAaDO2_kPa.toFixed(1)} kPa). `;
    o2Text += analysis.oxygenation.isAaDO2Elevated 
      ? `High A-a gradient means the lung tissue itself is diseased or obstructed (e.g. pneumonia, PE, ARDS).` 
      : `Normal A-a gradient means lung tissue is healthy; low oxygen is simply due to hypoventilation (not breathing enough).`;

    if (elements.explainSummary) elements.explainSummary.textContent = summaryText;
    if (elements.explainWhyPH) elements.explainWhyPH.textContent = mechanismText;
    if (elements.explainRespiratory) elements.explainRespiratory.textContent = respText;
    if (elements.explainRenal) elements.explainRenal.textContent = renalText;
    if (elements.explainAnionGap) elements.explainAnionGap.textContent = agText;
    if (elements.explainOxygenation) elements.explainOxygenation.textContent = o2Text;

    if (elements.explainPearls) {
      elements.explainPearls.innerHTML = `
        <li class="flex items-start gap-2 text-xs text-slate-300">
          <span class="text-sky-400 font-bold">•</span>
          <span>Bohr Effect: When blood is ${isAcidemia ? 'acidic, hemoglobin lets go of oxygen more easily (curve shifts RIGHT)' : 'alkaline, hemoglobin holds onto oxygen tightly (curve shifts LEFT)'}.</span>
        </li>
        <li class="flex items-start gap-2 text-xs text-slate-300">
          <span class="text-sky-400 font-bold">•</span>
          <span>Golden Exam Rule: The body never overcompensates. If you started with an acidosis, compensation will never turn the blood alkaline!</span>
        </li>
      `;
    }
  }

  /**
   * Setup Event Listeners for Sliders & Controls
   */
  function setupEventListeners() {
    // Slider Listeners
    if (elements.sliderPH) {
      elements.sliderPH.addEventListener('input', (e) => {
        state.pH = parseFloat(e.target.value);
        state.autoDerivePH = false;
        if (elements.switchAutoPH) elements.switchAutoPH.checked = false;
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderPCO2) {
      elements.sliderPCO2.addEventListener('input', (e) => {
        state.pco2_kPa = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderPO2) {
      elements.sliderPO2.addEventListener('input', (e) => {
        state.paO2_kPa = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderFIO2) {
      elements.sliderFIO2.addEventListener('input', (e) => {
        state.fio2 = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderHCO3) {
      elements.sliderHCO3.addEventListener('input', (e) => {
        state.hco3 = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderTemp) {
      elements.sliderTemp.addEventListener('input', (e) => {
        state.tempC = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderNa) {
      elements.sliderNa.addEventListener('input', (e) => {
        state.na = parseInt(e.target.value, 10);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderK) {
      elements.sliderK.addEventListener('input', (e) => {
        state.k = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderCl) {
      elements.sliderCl.addEventListener('input', (e) => {
        state.cl = parseInt(e.target.value, 10);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderAlbumin) {
      elements.sliderAlbumin.addEventListener('input', (e) => {
        state.albumin = parseInt(e.target.value, 10);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderLactate) {
      elements.sliderLactate.addEventListener('input', (e) => {
        state.lactate = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderGlucose) {
      elements.sliderGlucose.addEventListener('input', (e) => {
        state.glucose = parseFloat(e.target.value);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    if (elements.sliderAge) {
      elements.sliderAge.addEventListener('input', (e) => {
        state.age = parseInt(e.target.value, 10);
        state.currentPresetId = 'custom';
        recalculateAndUpdateUI();
      });
    }

    // Auto derive switch
    if (elements.switchAutoPH) {
      elements.switchAutoPH.addEventListener('change', (e) => {
        state.autoDerivePH = e.target.checked;
        if (state.autoDerivePH) {
          recalculateAndUpdateUI();
        }
      });
    }

    // Preset Dropdown Listener
    if (elements.presetSelect) {
      elements.presetSelect.addEventListener('change', (e) => {
        applyPreset(e.target.value);
      });
    }

    // Chart Tabs Segmented Switcher
    if (elements.chartTabBtns) {
      elements.chartTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetChart = btn.getAttribute('data-chart');
          elements.chartTabBtns.forEach(b => {
            b.classList.remove('active', 'text-slate-200', 'bg-slate-800');
            b.classList.add('text-slate-400');
          });
          btn.classList.add('active', 'text-slate-200', 'bg-slate-800');
          btn.classList.remove('text-slate-400');

          if (elements.chartViews) {
            elements.chartViews.forEach(view => {
              view.classList.add('hidden');
            });
          }
          const targetView = document.getElementById(`chart-view-${targetChart}`);
          if (targetView) {
            targetView.classList.remove('hidden');
          }
          if (typeof ABGACharts !== 'undefined' && ABGACharts.resizeAll) {
            ABGACharts.resizeAll();
          }
        });
      });
    }

    // Navigation Tabs
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabTarget = btn.getAttribute('data-tab');
        switchTab(tabTarget);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('btn-reset-normal');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        applyPreset('normal');
      });
    }

    // Exam Quiz Case navigation
    const prevCaseBtn = document.getElementById('btn-prev-case');
    const nextCaseBtn = document.getElementById('btn-next-case');
    if (prevCaseBtn) {
      prevCaseBtn.addEventListener('click', () => {
        if (state.quiz.currentCaseIndex > 0) {
          state.quiz.currentCaseIndex--;
          renderQuizCase();
        }
      });
    }
    if (nextCaseBtn) {
      nextCaseBtn.addEventListener('click', () => {
        if (state.quiz.currentCaseIndex < ExamCases.length - 1) {
          state.quiz.currentCaseIndex++;
          renderQuizCase();
        }
      });
    }
  }

  /**
   * Switch Active Tab (Simulator vs Compendium / Acronyms vs Exam Quiz)
   */
  function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll('.tab-content-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    const activePanel = document.getElementById(`panel-${tabId}`);
    if (activePanel) {
      activePanel.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('text-slate-200', 'bg-slate-800');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-slate-200', 'bg-slate-800');
        btn.classList.add('text-slate-400');
      }
    });

    if (tabId === 'quiz') {
      renderQuizCase();
    }
  }

  /**
   * Render Federal Exam Case in Quiz Tab
   */
  function renderQuizCase() {
    const caseData = ExamCases[state.quiz.currentCaseIndex];
    if (!caseData) return;

    const titleEl = document.getElementById('quiz-case-title');
    const vignetteEl = document.getElementById('quiz-case-vignette');
    const questionEl = document.getElementById('quiz-case-question');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackEl = document.getElementById('quiz-case-feedback');
    const counterEl = document.getElementById('quiz-case-counter');
    const loadPresetBtn = document.getElementById('btn-load-case-in-sim');

    if (titleEl) titleEl.textContent = caseData.title;
    if (vignetteEl) vignetteEl.textContent = caseData.vignette;
    if (questionEl) questionEl.textContent = caseData.question;
    if (counterEl) counterEl.textContent = `Case ${state.quiz.currentCaseIndex + 1} of ${ExamCases.length}`;

    if (feedbackEl) {
      feedbackEl.classList.add('hidden');
      feedbackEl.innerHTML = '';
    }

    // Load case values into simulator button
    if (loadPresetBtn) {
      loadPresetBtn.onclick = () => {
        // Find corresponding preset
        const presetMapping = {
          case_1: 'dka',
          case_2: 'copd_acute_on_chronic',
          case_3: 'hyperventilation_acute',
          case_4: 'salicylate_toxicity',
          case_5: 'toxic_alcohol_methanol'
        };
        const presetId = presetMapping[caseData.id] || 'normal';
        applyPreset(presetId);
        switchTab('simulator');
      };
    }

    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    const answeredIndex = state.quiz.userAnswers[caseData.id];

    caseData.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = `w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
        answeredIndex !== undefined
          ? (opt.isCorrect 
              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' 
              : (answeredIndex === idx ? 'bg-red-950/50 border-red-500 text-red-200' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60'))
          : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/60 text-slate-200'
      }`;

      const letterBadge = String.fromCharCode(65 + idx);
      optBtn.innerHTML = `
        <span class="w-6 h-6 rounded-md bg-slate-700/80 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${letterBadge}</span>
        <span class="text-sm font-medium leading-relaxed">${opt.text}</span>
      `;

      if (answeredIndex === undefined) {
        optBtn.addEventListener('click', () => {
          handleQuizAnswer(caseData, idx, opt);
        });
      }

      optionsContainer.appendChild(optBtn);
    });

    if (answeredIndex !== undefined) {
      showQuizFeedback(caseData, answeredIndex);
    }
  }

  function handleQuizAnswer(caseData, selectedIndex, selectedOption) {
    state.quiz.userAnswers[caseData.id] = selectedIndex;
    state.quiz.answeredCount++;
    if (selectedOption.isCorrect) {
      state.quiz.score++;
    }

    const scoreBadge = document.getElementById('quiz-score-badge');
    if (scoreBadge) {
      scoreBadge.textContent = `Score: ${state.quiz.score} / ${ExamCases.length}`;
    }

    renderQuizCase();
  }

  function showQuizFeedback(caseData, selectedIndex) {
    const feedbackEl = document.getElementById('quiz-case-feedback');
    if (!feedbackEl) return;

    const opt = caseData.options[selectedIndex];
    const isCorrect = opt.isCorrect;

    feedbackEl.className = `p-3.5 clean-panel-subtle mt-3 text-xs leading-relaxed`;
    feedbackEl.classList.remove('hidden');

    feedbackEl.innerHTML = `
      <div class="font-semibold text-xs mb-1.5 ${isCorrect ? 'text-sky-300' : 'text-rose-400'}">
        ${isCorrect ? 'Correct' : 'Incorrect'}
      </div>
      <p class="text-slate-300 mb-2.5">${opt.feedback}</p>
      <div class="border-t border-slate-800 pt-2 space-y-1.5">
        <div>
          <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Pathophysiology</span>
          <p class="text-slate-300 mt-0.5">${caseData.explanation}</p>
        </div>
        <div class="pt-1">
          <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Exam Pearl</span>
          <p class="text-slate-300 mt-0.5">${caseData.pearl}</p>
        </div>
      </div>
    `;
  }

  /**
   * Initialize Application
   */
  function init() {
    cacheDOMElements();
    renderPresets();

    // Init Charts
    ABGACharts.initDavenport('chart-davenport');
    ABGACharts.initOxyHb('chart-oxyhb');
    ABGACharts.initGamblegram('chart-gamblegram');

    setupEventListeners();
    applyPreset('normal');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global exposure
  window.applyPreset = applyPreset;
  window.ArterioGas = {
    state,
    applyPreset,
    recalculateAndUpdateUI
  };
})();
