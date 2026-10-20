/**
 * ArterioGas Suite - Electrolytes & Nephron Main Application Controller
 * Coordinates the Nephron SVG visualizer, Hyponatremia decision tree,
 * Sodium Deficit & Adrogué-Madias calculators, Potassium ECG telemetry,
 * and the Federal Exam Quiz.
 */

(function() {
  'use strict';

  // Application State
  const state = {
    activeTab: 'nephron',
    selectedDiuretic: 'none',
    selectedChannel: 'nkcc2',
    // Sodium & Osmolality state
    calc: {
      actualNa: 120,
      targetNa: 126,
      durationHours: 12,
      weightKg: 70,
      gender: 'male',
      isElderly: false,
      infusateKey: 'nacl_3',
      glucose: 5.0,
      urea: 4.5
    },
    // Potassium & ECG state
    kState: {
      potassium: 4.2,
      ph: 7.40,
      baselinePH: 7.40,
      baselineK: 4.2,
      calcium: 2.35,
      magnesium: 0.85
    },
    // Exam Quiz state (Matches ABGA app.js quiz state)
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
    // Navigation Tabs
    elements.navBtns = document.querySelectorAll('.nav-tab-btn');
    elements.panels = document.querySelectorAll('.tab-content-panel');
    elements.btnReset = document.getElementById('btn-reset-normal');

    // Diuretic Buttons
    elements.diureticBtns = document.querySelectorAll('.diuretic-btn');
    elements.diureticName = document.getElementById('diuretic-name');
    elements.diureticClass = document.getElementById('diuretic-class');
    elements.diureticSegment = document.getElementById('diuretic-segment');
    elements.diureticTarget = document.getElementById('diuretic-target');
    elements.diureticMechanism = document.getElementById('diuretic-mechanism');
    elements.diureticAcidBase = document.getElementById('diuretic-acid-base');
    elements.diureticPearls = document.getElementById('diuretic-pearls');

    // Diuretic Shift Gauges
    elements.gaugeUrinaryNa = document.getElementById('gauge-u-na');
    elements.gaugeUrinaryK = document.getElementById('gauge-u-k');
    elements.gaugeUrinaryCa = document.getElementById('gauge-u-ca');
    elements.gaugeSerumK = document.getElementById('gauge-s-k');
    elements.gaugeSerumPH = document.getElementById('gauge-s-ph');

    // Channel Detail Card
    elements.channelCard = document.getElementById('channel-detail-card');
    elements.channelName = document.getElementById('channel-name');
    elements.channelSegment = document.getElementById('channel-segment');
    elements.channelIons = document.getElementById('channel-ions');
    elements.channelExplain = document.getElementById('channel-explain');

    // Hyponatremia Calculator Elements
    elements.inputActualNa = document.getElementById('input-actual-na');
    elements.inputTargetNa = document.getElementById('input-target-na');
    elements.inputDuration = document.getElementById('input-duration');
    elements.inputWeight = document.getElementById('input-weight');
    elements.selectGender = document.getElementById('select-gender');
    elements.checkElderly = document.getElementById('check-elderly');
    elements.selectInfusate = document.getElementById('select-infusate');

    // Calculator Output Badges
    elements.resDeficitMmol = document.getElementById('res-deficit-mmol');
    elements.resRatePerHour = document.getElementById('res-rate-per-hour');
    elements.resTotalMl = document.getElementById('res-total-ml');
    elements.resMlPerHour = document.getElementById('res-ml-per-hour');
    elements.resAdrogueDelta = document.getElementById('res-adrogue-delta');
    elements.resTbw = document.getElementById('res-tbw');
    elements.boxOdsWarning = document.getElementById('box-ods-warning');
    elements.boxOdsSafe = document.getElementById('box-ods-safe');

    // Potassium & ECG Elements
    elements.sliderK = document.getElementById('slider-k');
    elements.valK = document.getElementById('val-k');
    elements.sliderPH = document.getElementById('slider-ph');
    elements.valPH = document.getElementById('val-ph');
    elements.sliderMg = document.getElementById('slider-mg');
    elements.valMg = document.getElementById('val-mg');
    elements.sliderCa = document.getElementById('slider-ca');
    elements.valCa = document.getElementById('val-ca');
    elements.badgeRomkStatus = document.getElementById('badge-romk-status');
    elements.ecgTwave = document.getElementById('ecg-twave');
    elements.ecgUwave = document.getElementById('ecg-uwave');
    elements.ecgQt = document.getElementById('ecg-qt');
    elements.ecgRisk = document.getElementById('ecg-risk');
    elements.ecgEmergency = document.getElementById('ecg-emergency');
    elements.boxEmergency = document.getElementById('box-ecg-emergency');

    // Quick Shift Calculator
    elements.calcDeltaK = document.getElementById('calc-delta-k');
    elements.calcExpectedK = document.getElementById('calc-expected-k');

    // Exam Quiz Elements
    elements.quizCounter = document.getElementById('quiz-case-counter');
    elements.quizTitle = document.getElementById('quiz-case-title');
    elements.quizScoreBadge = document.getElementById('quiz-score-badge');
    elements.quizVignette = document.getElementById('quiz-case-vignette');
    elements.quizQuestion = document.getElementById('quiz-case-question');
    elements.quizOptionsContainer = document.getElementById('quiz-options-container');
    elements.quizFeedback = document.getElementById('quiz-case-feedback');
    elements.quizCategory = document.getElementById('quiz-case-category');
    elements.btnPrevCase = document.getElementById('btn-prev-case');
    elements.btnNextCase = document.getElementById('btn-next-case');

    // Exam Pearls Elements
    elements.pearlSearchInput = document.getElementById('pearl-search-input');
    elements.btnClearPearlSearch = document.getElementById('btn-clear-pearl-search');
    elements.pearlFilterBtns = document.querySelectorAll('.pearl-filter-btn');
    elements.pearlCards = document.querySelectorAll('.pearl-card');
    elements.pearlCountBadge = document.getElementById('pearl-count-badge');
    elements.sectionPearlsPart1 = document.getElementById('section-pearls-part1');
    elements.sectionPearlsPart2 = document.getElementById('section-pearls-part2');
  }

  function setupEventListeners() {
    // Top Navigation Tabs
    elements.navBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // Reset Button
    if (elements.btnReset) {
      elements.btnReset.addEventListener('click', resetToDefaults);
    }

    // Diuretic Selection Buttons
    elements.diureticBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const diureticId = e.currentTarget.getAttribute('data-diuretic');
        applyDiuretic(diureticId);
      });
    });

    // Hyponatremia Calculator Inputs
    const calcInputs = [
      elements.inputActualNa, elements.inputTargetNa, elements.inputDuration,
      elements.inputWeight, elements.selectGender, elements.checkElderly, elements.selectInfusate
    ];
    calcInputs.forEach(input => {
      if (input) {
        input.addEventListener('input', updateCalculator);
        input.addEventListener('change', updateCalculator);
      }
    });

    // Preset Button for Calculator (Clinical case: 70kg, 120 -> 126 in 12h)
    const btnPresetGabutti = document.getElementById('btn-preset-gabutti-calc');
    if (btnPresetGabutti) {
      btnPresetGabutti.addEventListener('click', () => {
        if (elements.inputActualNa) elements.inputActualNa.value = 120;
        if (elements.inputTargetNa) elements.inputTargetNa.value = 126;
        if (elements.inputDuration) elements.inputDuration.value = 12;
        if (elements.inputWeight) elements.inputWeight.value = 70;
        if (elements.selectGender) elements.selectGender.value = 'male';
        if (elements.checkElderly) elements.checkElderly.checked = false;
        if (elements.selectInfusate) elements.selectInfusate.value = 'nacl_3';
        updateCalculator();
      });
    }

    // Potassium & ECG Sliders
    if (elements.sliderK) {
      elements.sliderK.addEventListener('input', (e) => {
        state.kState.potassium = parseFloat(e.target.value);
        if (elements.valK) elements.valK.textContent = state.kState.potassium.toFixed(1);
        updateECGDisplay();
      });
    }

    if (elements.sliderPH) {
      elements.sliderPH.addEventListener('input', (e) => {
        const newPH = parseFloat(e.target.value);
        state.kState.ph = newPH;
        if (elements.valPH) elements.valPH.textContent = newPH.toFixed(2);
        
        // Calculate shift rule: 0.4 mmol/L per 0.1 pH
        const shift = ElectrolyteEngine.calculatePotassiumShift(state.kState.baselineK, state.kState.baselinePH, newPH);
        state.kState.potassium = shift.expectedK;
        if (elements.sliderK) elements.sliderK.value = shift.expectedK;
        if (elements.valK) elements.valK.textContent = shift.expectedK.toFixed(1);
        if (elements.calcDeltaK) elements.calcDeltaK.textContent = (shift.deltaK >= 0 ? '+' : '') + shift.deltaK.toFixed(2);
        if (elements.calcExpectedK) elements.calcExpectedK.textContent = shift.expectedK.toFixed(2);
        updateECGDisplay();
      });
    }

    if (elements.sliderMg) {
      elements.sliderMg.addEventListener('input', (e) => {
        state.kState.magnesium = parseFloat(e.target.value);
        if (elements.valMg) elements.valMg.textContent = state.kState.magnesium.toFixed(2);
        const romk = ElectrolyteEngine.calculateROMKActivity(state.kState.magnesium);
        if (elements.badgeRomkStatus) {
          elements.badgeRomkStatus.textContent = romk.status;
          elements.badgeRomkStatus.className = state.kState.magnesium < 0.7 
            ? 'px-2 py-0.5 rounded text-xs font-mono text-rose-300 bg-rose-950/60 border border-rose-800'
            : 'px-2 py-0.5 rounded text-xs font-mono text-teal-300 bg-teal-950/60 border border-teal-800';
        }
        updateECGDisplay();
      });
    }

    if (elements.sliderCa) {
      elements.sliderCa.addEventListener('input', (e) => {
        state.kState.calcium = parseFloat(e.target.value);
        if (elements.valCa) elements.valCa.textContent = state.kState.calcium.toFixed(2);
        updateECGDisplay();
      });
    }

    // Quiz Navigation Buttons
    if (elements.btnPrevCase) {
      elements.btnPrevCase.addEventListener('click', prevQuizCase);
    }
    if (elements.btnNextCase) {
      elements.btnNextCase.addEventListener('click', nextQuizCase);
    }

    // Exam Pearls Filter and Search Listeners
    if (elements.pearlFilterBtns) {
      elements.pearlFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filter = e.currentTarget.getAttribute('data-pearl-filter');
          setPearlCategoryFilter(filter);
        });
      });
    }

    if (elements.pearlSearchInput) {
      elements.pearlSearchInput.addEventListener('input', () => {
        filterPearlCards();
      });
    }

    if (elements.btnClearPearlSearch) {
      elements.btnClearPearlSearch.addEventListener('click', () => {
        if (elements.pearlSearchInput) elements.pearlSearchInput.value = '';
        filterPearlCards();
      });
    }
  }

  let currentPearlFilter = 'all';

  function setPearlCategoryFilter(filter) {
    currentPearlFilter = filter;
    if (elements.pearlFilterBtns) {
      elements.pearlFilterBtns.forEach(btn => {
        const isMatch = btn.getAttribute('data-pearl-filter') === filter;
        btn.className = isMatch
          ? 'pearl-filter-btn px-2.5 py-1 rounded-md bg-slate-800 text-slate-100 font-medium transition-colors'
          : 'pearl-filter-btn px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors';
      });
    }
    filterPearlCards();
  }

  function filterPearlCards() {
    const query = (elements.pearlSearchInput ? elements.pearlSearchInput.value.trim().toLowerCase() : '');
    if (elements.btnClearPearlSearch) {
      elements.btnClearPearlSearch.classList.toggle('hidden', query.length === 0);
    }

    let visibleCount = 0;
    let part1Visible = 0;
    let part2Visible = 0;

    elements.pearlCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const keywords = (card.getAttribute('data-keywords') || '') + ' ' + card.textContent.toLowerCase();
      
      const matchesCategory = currentPearlFilter === 'all' || category.includes(currentPearlFilter);
      const matchesQuery = !query || keywords.includes(query);

      const isVisible = matchesCategory && matchesQuery;
      card.classList.toggle('hidden', !isVisible);

      if (isVisible) {
        visibleCount++;
        if (card.closest('#section-pearls-part1')) part1Visible++;
        if (card.closest('#section-pearls-part2')) part2Visible++;
      }
    });

    if (elements.pearlCountBadge) {
      elements.pearlCountBadge.textContent = `Showing ${visibleCount} of 18 Pearls`;
    }

    if (elements.sectionPearlsPart1) {
      elements.sectionPearlsPart1.classList.toggle('hidden', part1Visible === 0);
    }
    if (elements.sectionPearlsPart2) {
      elements.sectionPearlsPart2.classList.toggle('hidden', part2Visible === 0);
    }
  }

  function switchTab(tabId) {
    state.activeTab = tabId;
    elements.navBtns.forEach(btn => {
      const match = btn.getAttribute('data-tab') === tabId;
      btn.className = match
        ? 'nav-tab-btn px-3 py-1 rounded-md font-medium transition-colors text-slate-100 bg-slate-800'
        : 'nav-tab-btn px-3 py-1 rounded-md font-medium transition-colors text-slate-400 hover:text-slate-200';
    });

    elements.panels.forEach(panel => {
      const match = panel.id === `panel-${tabId}`;
      panel.classList.toggle('hidden', !match);
    });

    // Trigger canvas resize when ECG panel opens
    if (tabId === 'potassium') {
      setTimeout(() => {
        ElectrolyteECG.resize();
      }, 50);
    }

    // Render Quiz Case if switching to Quiz
    if (tabId === 'quiz') {
      renderQuizCase();
    }
  }

  /**
   * Reset All Panels to Physiological Normal Baseline (matching ABGA Reset)
   */
  function resetToDefaults() {
    // 1. Reset Diuretic & Nephron
    applyDiuretic('none');
    displayChannelDetail(NephronVisualizer.CHANNELS.nkcc2);

    // 2. Reset Hyponatremia Calculator
    if (elements.inputActualNa) elements.inputActualNa.value = 120;
    if (elements.inputTargetNa) elements.inputTargetNa.value = 126;
    if (elements.inputDuration) elements.inputDuration.value = 12;
    if (elements.inputWeight) elements.inputWeight.value = 70;
    if (elements.selectGender) elements.selectGender.value = 'male';
    if (elements.checkElderly) elements.checkElderly.checked = false;
    if (elements.selectInfusate) elements.selectInfusate.value = 'nacl_3';
    updateCalculator();

    // 3. Reset Potassium & ECG Sliders
    state.kState.potassium = 4.2;
    state.kState.ph = 7.40;
    state.kState.baselinePH = 7.40;
    state.kState.baselineK = 4.2;
    state.kState.magnesium = 0.85;
    state.kState.calcium = 2.35;

    if (elements.sliderK) elements.sliderK.value = 4.2;
    if (elements.valK) elements.valK.textContent = '4.2';
    if (elements.sliderPH) elements.sliderPH.value = 7.40;
    if (elements.valPH) elements.valPH.textContent = '7.40';
    if (elements.sliderMg) elements.sliderMg.value = 0.85;
    if (elements.valMg) elements.valMg.textContent = '0.85';
    if (elements.sliderCa) elements.sliderCa.value = 2.35;
    if (elements.valCa) elements.valCa.textContent = '2.35';

    if (elements.calcDeltaK) elements.calcDeltaK.textContent = '0.00';
    if (elements.calcExpectedK) elements.calcExpectedK.textContent = '4.20';
    if (elements.badgeRomkStatus) {
      elements.badgeRomkStatus.textContent = 'Normal ROMK inhibition';
      elements.badgeRomkStatus.className = 'px-2 py-0.5 rounded text-xs font-mono text-teal-300 bg-teal-950/60 border border-teal-800';
    }

    updateECGDisplay();

    // 4. Reset Quiz
    state.quiz.currentCaseIndex = 0;
    state.quiz.score = 0;
    state.quiz.answeredCount = 0;
    state.quiz.userAnswers = {};
    if (elements.quizScoreBadge) {
      elements.quizScoreBadge.textContent = `Score: 0 / ${ElectrolyteData.examCases.length}`;
    }
    renderQuizCase();

    // 5. Reset Exam Pearls filter and search
    if (elements.pearlSearchInput) elements.pearlSearchInput.value = '';
    setPearlCategoryFilter('all');
  }

  /**
   * Apply Diuretic to the Nephron and update panel info
   */
  function applyDiuretic(diureticId) {
    state.selectedDiuretic = diureticId;

    // Highlight button
    elements.diureticBtns.forEach(btn => {
      const isSelected = btn.getAttribute('data-diuretic') === diureticId;
      btn.className = isSelected
        ? 'diuretic-btn px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-100 bg-sky-900/60 border border-sky-600 transition-colors'
        : 'diuretic-btn px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800 hover:text-slate-200 transition-colors';
    });

    // Update Nephron SVG
    NephronVisualizer.applyDiuretic(diureticId);

    // Update Data Details
    const diuretic = ElectrolyteData.diuretics.find(d => d.id === diureticId) || ElectrolyteData.diuretics[0];

    if (elements.diureticName) elements.diureticName.textContent = diuretic.name;
    if (elements.diureticClass) elements.diureticClass.textContent = diuretic.class;
    if (elements.diureticSegment) elements.diureticSegment.textContent = diuretic.segment;
    if (elements.diureticTarget) elements.diureticTarget.textContent = diuretic.targetChannel;
    if (elements.diureticMechanism) elements.diureticMechanism.textContent = diuretic.mechanism;
    if (elements.diureticAcidBase) elements.diureticAcidBase.textContent = diuretic.acidBaseImpact;

    // Update Gauges
    if (elements.gaugeUrinaryNa) elements.gaugeUrinaryNa.textContent = diuretic.effectUrinary.na;
    if (elements.gaugeUrinaryK) elements.gaugeUrinaryK.textContent = diuretic.effectUrinary.k;
    if (elements.gaugeUrinaryCa) elements.gaugeUrinaryCa.textContent = diuretic.effectUrinary.ca;
    if (elements.gaugeSerumK) elements.gaugeSerumK.textContent = diuretic.effectSerum.k;
    if (elements.gaugeSerumPH) elements.gaugeSerumPH.textContent = diuretic.effectSerum.ph;

    // Pearls
    if (elements.diureticPearls) {
      elements.diureticPearls.innerHTML = diuretic.examPearls.map(p => `
        <li class="flex items-start gap-2 text-xs text-slate-300">
          <span class="text-sky-400 font-bold">•</span>
          <span>${p}</span>
        </li>
      `).join('');
    }
  }

  /**
   * Handle Click on Channel Node in SVG
   */
  function displayChannelDetail(channel) {
    if (!channel) return;
    state.selectedChannel = channel.id;

    if (elements.channelName) elements.channelName.textContent = channel.name;
    if (elements.channelSegment) elements.channelSegment.textContent = channel.segment;
    if (elements.channelIons) elements.channelIons.textContent = channel.ions;
    if (elements.channelExplain) elements.channelExplain.textContent = channel.plainEnglish;

    const pearlEl = document.getElementById('channel-pearl');
    const pearlBox = document.getElementById('channel-pearl-box');
    if (pearlEl && channel.examPearl) {
      pearlEl.textContent = channel.examPearl;
      if (pearlBox) pearlBox.classList.remove('hidden');
    } else if (pearlBox) {
      pearlBox.classList.add('hidden');
    }

    if (elements.channelCard) {
      const rect = elements.channelCard.getBoundingClientRect();
      if (rect.top < 60) {
        elements.channelCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      elements.channelCard.classList.add('ring-2', 'ring-sky-400/50');
      setTimeout(() => {
        elements.channelCard.classList.remove('ring-2', 'ring-sky-400/50');
      }, 600);
    }
  }

  /**
   * Update Hyponatremia Sodium Deficit & Infusion Rate Calculator
   */
  function updateCalculator() {
    const actualNa = parseFloat(elements.inputActualNa ? elements.inputActualNa.value : 120) || 120;
    const targetNa = parseFloat(elements.inputTargetNa ? elements.inputTargetNa.value : 126) || 126;
    const duration = parseFloat(elements.inputDuration ? elements.inputDuration.value : 12) || 12;
    const weight = parseFloat(elements.inputWeight ? elements.inputWeight.value : 70) || 70;
    const gender = elements.selectGender ? elements.selectGender.value : 'male';
    const isElderly = elements.checkElderly ? elements.checkElderly.checked : false;
    const infusateKey = elements.selectInfusate ? elements.selectInfusate.value : 'nacl_3';

    const plan = ElectrolyteEngine.calculateInfusionPlan(actualNa, targetNa, duration, weight, gender, isElderly, infusateKey);
    const deficit = ElectrolyteEngine.calculateSodiumDeficit(actualNa, targetNa, weight, gender, isElderly);
    const adrogue = ElectrolyteEngine.calculateAdrogueMadias(actualNa, infusateKey, weight, gender, isElderly);

    if (elements.resDeficitMmol) elements.resDeficitMmol.textContent = `${deficit.deficitMmol} mmol`;
    if (elements.resRatePerHour) elements.resRatePerHour.textContent = `${plan.rateOfRisePerHour} mmol/L/h`;
    if (elements.resTotalMl) elements.resTotalMl.textContent = `${plan.totalMl} mL`;
    if (elements.resMlPerHour) elements.resMlPerHour.textContent = `${plan.mlPerHour} mL/h`;
    if (elements.resAdrogueDelta) elements.resAdrogueDelta.textContent = `+${adrogue.deltaNaPerLiter} mmol/L`;
    if (elements.resTbw) elements.resTbw.textContent = `${plan.tbw} L (${gender === 'male' ? (isElderly ? '50%' : '60%') : (isElderly ? '45%' : '50%')})`;

    // ODS Alert Handling
    if (elements.boxOdsWarning && elements.boxOdsSafe) {
      if (plan.isExceedingSafeRate) {
        elements.boxOdsWarning.classList.remove('hidden');
        elements.boxOdsSafe.classList.add('hidden');
      } else {
        elements.boxOdsWarning.classList.add('hidden');
        elements.boxOdsSafe.classList.remove('hidden');
      }
    }
  }

  /**
   * Update ECG Display and Clinical Notes
   */
  function updateECGDisplay() {
    ElectrolyteECG.updateParameters(state.kState.potassium, state.kState.calcium, state.kState.magnesium);
    const profile = ElectrolyteEngine.getECGProfile(state.kState.potassium, state.kState.calcium, state.kState.magnesium);

    if (elements.ecgTwave) elements.ecgTwave.textContent = profile.tWave;
    if (elements.ecgUwave) elements.ecgUwave.textContent = profile.uWave;
    if (elements.ecgQt) elements.ecgQt.textContent = profile.qtInterval;
    if (elements.ecgRisk) elements.ecgRisk.textContent = profile.riskLevel;

    if (elements.boxEmergency && elements.ecgEmergency) {
      if (profile.emergencyTreatment) {
        elements.boxEmergency.classList.remove('hidden');
        elements.ecgEmergency.textContent = profile.emergencyTreatment;
      } else {
        elements.boxEmergency.classList.add('hidden');
      }
    }
  }

  // -------------------------------------------------------------
  // EXAM QUIZ CONTROLLER (Exact duplicate behavior of ABGA app.js)
  // -------------------------------------------------------------

  function renderQuizCase() {
    const cases = ElectrolyteData.examCases;
    if (!cases || cases.length === 0) return;

    const caseData = cases[state.quiz.currentCaseIndex];
    if (!caseData) return;

    if (elements.quizCounter) elements.quizCounter.textContent = `Case ${state.quiz.currentCaseIndex + 1} of ${cases.length}`;
    if (elements.quizTitle) elements.quizTitle.textContent = caseData.title;
    if (elements.quizVignette) elements.quizVignette.textContent = caseData.vignette;
    if (elements.quizQuestion) elements.quizQuestion.textContent = caseData.question;
    if (elements.quizCategory) elements.quizCategory.textContent = caseData.category || '';

    if (elements.quizScoreBadge) {
      elements.quizScoreBadge.textContent = `Score: ${state.quiz.score} / ${cases.length}`;
    }

    if (elements.quizFeedback) {
      elements.quizFeedback.classList.add('hidden');
      elements.quizFeedback.innerHTML = '';
    }

    if (!elements.quizOptionsContainer) return;
    elements.quizOptionsContainer.innerHTML = '';

    const answeredIndex = state.quiz.userAnswers[caseData.id];

    caseData.options.forEach((opt, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = `w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
        answeredIndex !== undefined
          ? (opt.isCorrect 
              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' 
              : (answeredIndex === idx ? 'bg-red-950/50 border-red-500 text-red-200' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60'))
          : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-sky-500/60 text-slate-200'
      }`;

      const letterBadge = String.fromCharCode(65 + idx);
      optBtn.innerHTML = `
        <span class="w-6 h-6 rounded-md bg-slate-700/80 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${letterBadge}</span>
        <span class="text-xs font-medium leading-relaxed">${opt.text}</span>
      `;

      if (answeredIndex === undefined) {
        optBtn.addEventListener('click', () => {
          handleQuizAnswer(caseData, idx, opt);
        });
      }

      elements.quizOptionsContainer.appendChild(optBtn);
    });

    if (answeredIndex !== undefined) {
      showQuizFeedback(caseData, answeredIndex);
    }
  }

  function handleQuizAnswer(caseData, selectedIndex, selectedOption) {
    if (state.quiz.userAnswers[caseData.id] !== undefined) return;

    state.quiz.userAnswers[caseData.id] = selectedIndex;
    state.quiz.answeredCount++;
    if (selectedOption.isCorrect) {
      state.quiz.score++;
    }

    if (elements.quizScoreBadge) {
      elements.quizScoreBadge.textContent = `Score: ${state.quiz.score} / ${ElectrolyteData.examCases.length}`;
    }

    renderQuizCase();
  }

  function showQuizFeedback(caseData, selectedIndex) {
    if (!elements.quizFeedback) return;

    const opt = caseData.options[selectedIndex];
    const isCorrect = opt.isCorrect;

    elements.quizFeedback.className = `p-3.5 clean-panel-subtle mt-3 text-xs leading-relaxed`;
    elements.quizFeedback.classList.remove('hidden');

    elements.quizFeedback.innerHTML = `
      <div class="font-semibold text-xs mb-1.5 ${isCorrect ? 'text-sky-300' : 'text-rose-400'}">
        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
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

  function prevQuizCase() {
    const cases = ElectrolyteData.examCases;
    if (state.quiz.currentCaseIndex > 0) {
      state.quiz.currentCaseIndex--;
      renderQuizCase();
    }
  }

  function nextQuizCase() {
    const cases = ElectrolyteData.examCases;
    if (state.quiz.currentCaseIndex < cases.length - 1) {
      state.quiz.currentCaseIndex++;
      renderQuizCase();
    }
  }

  /**
   * Initialize Application
   */
  function init() {
    cacheDOMElements();
    setupEventListeners();

    // Initialize Nephron SVG
    NephronVisualizer.init('nephron-svg-container', (channel) => {
      displayChannelDetail(channel);
    });

    // Initialize Canvas ECG
    ElectrolyteECG.init('canvas-ecg-monitor');

    // Initial render
    applyDiuretic('none');
    displayChannelDetail(NephronVisualizer.CHANNELS.nkcc2);
    updateCalculator();
    updateECGDisplay();
    renderQuizCase();

    // Support direct hash tab navigation (e.g. #quiz, #potassium, #all-electrolytes, #pearls)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['nephron', 'hyponatremia', 'potassium', 'all-electrolytes', 'pearls', 'quiz'].includes(initialHash)) {
      switchTab(initialHash);
    }

    // Support diuretic query param (e.g. ?diuretic=loop)
    const urlParams = new URLSearchParams(window.location.search);
    const diureticParam = urlParams.get('diuretic');
    if (diureticParam) {
      applyDiuretic(diureticParam);
    }
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global exposure
  window.ElectrolyteApp = {
    state,
    applyDiuretic,
    resetToDefaults,
    switchTab
  };
})();
