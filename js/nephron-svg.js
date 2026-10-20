/**
 * ArterioGas Suite - Anatomical Nephron & Transport Channel Visualizer
 * Re-engineered for maximum clarity, generous spatial layout, and large readable typography:
 * - Spacious Anatomical Nephron Picture (viewBox 0 0 1140 600) showing Cortex vs Medulla
 * - Smooth continuous tubule with Glomerulus, PCT, Loop of Henle (descending/ascending), DCT, CD, and Urine
 * - Every channel positioned directly at its anatomical location with large, clear, interactive cards (13-14px bold)
 * - Dynamic live cascade when diuretics are selected (status badges, voltage shifts, K+ wasting alerts)
 * - Integrated 4-segment clinical summary cards below for rapid exam study
 */

const NephronVisualizer = (function() {
  'use strict';

  let containerEl = null;
  let currentDiureticId = 'none';
  let selectedChannelId = 'nkcc2';
  let activeChannelCallback = null;

  const CHANNELS = {
    ca: {
      id: 'ca',
      name: 'Carbonic Anhydrase & NHE3',
      shortName: 'CA / NHE3',
      subtitle: 'Acetazolamide (Diamox®)',
      segment: 'Proximal Convoluted Tubule (PCT)',
      segmentKey: 'pct',
      color: '#f59e0b',
      cellularLocation: 'Apical Membrane & Cytoplasm',
      direction: 'Lumen ➔ Blood (85% filtered HCO₃⁻ reclaimed)',
      ions: 'Na⁺ / H⁺ antiport coupled to cytosolic HCO₃⁻ generation',
      blockedBy: 'acetazolamide',
      diureticName: 'Acetazolamide (Diamox®)',
      examPearl: 'Blocking CA causes bicarbonaturia (urine pH rises to 8.0) and mild Normal Anion Gap Metabolic Acidosis (NAGMA). Used in altitude sickness (stimulates respiratory drive) and acute glaucoma.',
      plainEnglish: 'The primary acid-base sponge of the kidney: reclaims 85% of filtered bicarbonate in the proximal tubule. NHE3 pumps H⁺ into the lumen to react with filtered HCO₃⁻; carbonic anhydrase turns it into CO₂ and H₂O for reabsorption. Blocking CA dumps bicarbonate straight into urine!'
    },
    sglt2: {
      id: 'sglt2',
      name: 'SGLT2 (Na⁺-Glucose Cotransporter 2)',
      shortName: 'SGLT2',
      subtitle: 'Dapagliflozin / Empagliflozin',
      segment: 'Early Proximal Tubule (PCT)',
      segmentKey: 'pct',
      color: '#10b981',
      cellularLocation: 'Apical Brush Border Membrane',
      direction: 'Lumen ➔ Blood (90% filtered glucose + Na⁺ reclaimed)',
      ions: '1 Na⁺ + 1 Glucose coupled symport',
      blockedBy: 'sglt2i',
      diureticName: 'SGLT2 Inhibitors (Dapagliflozin / Empagliflozin)',
      examPearl: 'Nephroprotection mechanism: Inhibiting SGLT2 delivers more Na⁺ to the macula densa, restoring tubuloglomerular feedback to constrict the afferent arteriole. This reduces intraglomerular pressure, slows CKD progression, and reduces heart failure hospitalizations!',
      plainEnglish: 'Reclaims 90% of filtered blood sugar together with sodium. When inhibited, glucose spills into the urine (glucosuria), dragging water and salt with it (mild osmotic diuresis). Crucially, the increased sodium delivered downstream signals the kidney to lower intraglomerular pressure, saving dying nephrons in CKD!'
    },
    nkcc2: {
      id: 'nkcc2',
      name: 'NKCC2 (Na⁺ / K⁺ / 2Cl⁻ Cotransporter)',
      shortName: 'NKCC2',
      subtitle: 'Loop Diuretics (Furosemide / Lasix®)',
      segment: 'Thick Ascending Limb (TAL - Loop of Henle)',
      segmentKey: 'tal',
      color: '#38bdf8',
      cellularLocation: 'Apical Luminal Membrane',
      direction: 'Lumen ➔ Cell (1 Na⁺ + 1 K⁺ + 2 Cl⁻ electroneutral)',
      ions: '1 Na⁺ + 1 K⁺ + 2 Cl⁻ into TAL epithelial cell',
      blockedBy: 'loop',
      diureticName: 'Loop Diuretics (Furosemide / Torasemide)',
      examPearl: 'Loops LOSE Calcium: Blocking NKCC2 stops ROMK potassium recycling, collapsing the +8 mV lumen-positive driving force. Without this charge, Calcium and Magnesium cannot be absorbed paracellularly and are wasted in urine. (Contrast with Thiazides, which save calcium!).',
      plainEnglish: 'The most powerful salt reabsorber in the kidney: handles 25% of all filtered sodium. It is completely impermeable to water, pumping pure salt into the renal medulla to create the hypertonic gradient needed to concentrate urine. When blocked by Furosemide, massive salt and water surge downstream!'
    },
    romk_tal: {
      id: 'romk_tal',
      name: 'ROMK (TAL K⁺ Recycling Channel)',
      shortName: 'ROMK (TAL)',
      subtitle: 'Generates +8 mV Lumen-Positive Driving Force',
      segment: 'Thick Ascending Limb (TAL)',
      segmentKey: 'tal',
      color: '#818cf8',
      cellularLocation: 'Apical Membrane',
      direction: 'Cell ➔ Lumen (Apical K⁺ recycling into tubule)',
      ions: 'K⁺ back-diffusion generating +8 mV transepithelial voltage',
      blockedBy: null,
      examPearl: 'Bartter Syndrome Type II is caused by loss-of-function mutations in ROMK. It clinically mimics chronic high-dose loop diuretic therapy: severe hypokalemia, metabolic alkalosis, hypercalciuria with nephrocalcinosis, and normal BP.',
      plainEnglish: 'Sits directly in the apical TAL membrane, recycling potassium back into the tubule lumen. This creates an indispensable lumen-positive electrical potential (+8 mV) that acts as an electrostatic repeller, driving positively charged Calcium (Ca²⁺) and Magnesium (Mg²⁺) through tight junctions into blood.'
    },
    ncc: {
      id: 'ncc',
      name: 'NCC (Na⁺ / Cl⁻ Cotransporter)',
      shortName: 'NCC',
      subtitle: 'Thiazides (HCTZ / Esidrex® / Chlorthalidone)',
      segment: 'Distal Convoluted Tubule (DCT)',
      segmentKey: 'dct',
      color: '#c084fc',
      cellularLocation: 'Apical Luminal Membrane',
      direction: 'Lumen ➔ Cell (Electroneutral 1 Na⁺ + 1 Cl⁻)',
      ions: '1 Na⁺ + 1 Cl⁻ reabsorption (5% of filtered load)',
      blockedBy: 'thiazide',
      diureticName: 'Thiazides (Hydrochlorothiazide / Chlorthalidone)',
      examPearl: 'Thiazides SAVE Calcium & Cause Hyponatremia: Blocking NCC stops urinary dilution in the cortical diluting segment (predisposing to severe hyponatremia). Meanwhile, intracellular sodium depletion speeds up basolateral NCX1, drawing Calcium through TRPV5 into blood (reduces urinary calcium by 40%!).',
      plainEnglish: 'Reclaims 5% of filtered sodium in the "Cortical Diluting Segment". Because this segment is impermeable to water, extracting salt without water dilutes urine down to 50 mOsm/kg. Blocking NCC disables urinary dilution and triggers severe hyponatremia if water intake continues.'
    },
    trpv5: {
      id: 'trpv5',
      name: 'TRPV5 & NCX1 (Active Calcium Reabsorption)',
      shortName: 'TRPV5 / NCX1',
      subtitle: 'PTH-Regulated Calcium Saver',
      segment: 'Late Distal Convoluted Tubule (DCT)',
      segmentKey: 'dct',
      color: '#2dd4bf',
      cellularLocation: 'Apical (TRPV5) & Basolateral (NCX1)',
      direction: 'Lumen ➔ Blood (Transcellular Ca²⁺ reabsorption)',
      ions: 'Apical Ca²⁺ influx via TRPV5; basolateral 3Na⁺/1Ca²⁺ exchange (NCX1)',
      blockedBy: null,
      examPearl: 'Gitelman Syndrome is a genetic NCC defect that mimics lifelong thiazide therapy: hypokalemic metabolic alkalosis, hypomagnesemia, and characteristic HYPOCALCIURIA (which distinguishes it from Bartter syndrome!).',
      plainEnglish: 'The fine-tuning calcium channel regulated by Parathyroid Hormone (PTH) and Calcitriol. When thiazides inhibit NCC upstream, intracellular Na⁺ drops, powering the basolateral Na⁺/Ca²⁺ exchanger (NCX1) to pull Ca²⁺ avidly through apical TRPV5 into blood!'
    },
    enac: {
      id: 'enac',
      name: 'ENaC (Epithelial Sodium Channel)',
      shortName: 'ENaC',
      subtitle: 'Amiloride & Spironolactone Target',
      segment: 'Cortical Collecting Duct (CCD - Principal Cells)',
      segmentKey: 'cd',
      color: '#fb7185',
      cellularLocation: 'Apical Membrane of Principal Cells',
      direction: 'Lumen ➔ Cell (Electrogenic Na⁺ uptake: 2-3% of load)',
      ions: 'Na⁺ entry creating -15 to -30 mV lumen-negative potential',
      blockedBy: 'amiloride',
      diureticName: 'Amiloride (direct) / Spironolactone (MR blocker)',
      examPearl: 'Liddle Syndrome is an activating mutation of ENaC (cannot be degraded). It causes severe hypertension and hypokalemia with SUPPRESSED renin and SUPPRESSED aldosterone (pseudohyperaldosteronism). Treated with Amiloride, NOT spironolactone!',
      plainEnglish: 'The master regulator of sodium vs. potassium balance! Ingests positive Na⁺ ions into principal cells without accompanying anions, generating an intense lumen-negative voltage (-15 to -30 mV) that pulls positively charged K⁺ (ROMK) and H⁺ into urine. Amiloride blocks ENaC directly; Spironolactone stops aldosterone from synthesizing ENaC.'
    },
    romk_ccd: {
      id: 'romk_ccd',
      name: 'ROMK & BK (K⁺ Excretion Channels)',
      shortName: 'ROMK / BK',
      subtitle: 'K⁺ Excretion into Urine (Plugged by Mg²⁺)',
      segment: 'Cortical Collecting Duct (CCD)',
      segmentKey: 'cd',
      color: '#e879f9',
      cellularLocation: 'Apical Membrane of Principal & Intercalated Cells',
      direction: 'Cell ➔ Urine (Active K⁺ secretion)',
      ions: 'K⁺ secretion driven by ENaC lumen-negative potential',
      blockedBy: null,
      examPearl: 'Refractory Hypokalemia & Magnesium: Intracellular Mg²⁺ acts as a physical plug inside the ROMK pore. When serum magnesium is depleted (e.g. from chronic PPIs or alcohol), the plug falls out and ROMK dumps potassium uncontrollably. You MUST replace Mg²⁺ before K⁺ will normalize!',
      plainEnglish: 'The primary exhaust gate for potassium excretion from the body. Driven by the negative electrical voltage created by ENaC. When loop or thiazide diuretics deliver high fluid and sodium loads to the collecting duct, ENaC works in overdrive, causing catastrophic urinary potassium wasting (Hypokalemia!).'
    },
    aqp2: {
      id: 'aqp2',
      name: 'Aquaporin-2 (Vasopressin Water Channel)',
      shortName: 'Aquaporin-2',
      subtitle: 'Tolvaptan (Samsca®) / ADH (Vasopressin) Regulated',
      segment: 'Medullary Collecting Duct (MCD)',
      segmentKey: 'cd',
      color: '#38bdf8',
      cellularLocation: 'Apical Membrane of Principal Cells',
      direction: 'Lumen ➔ Blood (Pure free water H₂O reabsorption)',
      ions: 'Free water (H₂O) reabsorption without electrolytes',
      blockedBy: 'tolvaptan',
      diureticName: 'Tolvaptan (V₂ Receptor Antagonist / Aquaretic)',
      examPearl: 'Tolvaptan induces "Aquaresis" (pure free water excretion) without wasting sodium or potassium. It is indicated for euvolemic hyponatremia in SIADH. Cave: Risk of over-rapid sodium correction (&gt; 8–10 mmol/L/24h) precipitating Osmotic Demyelination Syndrome (ODS)!',
      plainEnglish: 'The kidney\'s water tap. When the body is dehydrated or in SIADH, Antidiuretic Hormone (ADH / Vasopressin) binds to basolateral V₂ receptors, causing intracellular Aquaporin-2 vesicles to fuse with the apical membrane and reabsorb pure water into blood. Tolvaptan blocks this, forcing pure water out into urine.'
    }
  };

  /**
   * Determine channel dynamic status given current diuretic
   */
  function getChannelStatus(channelKey) {
    const ch = CHANNELS[channelKey];
    const isTarget = (ch.blockedBy === currentDiureticId) || 
                     (currentDiureticId === 'spironolactone' && channelKey === 'enac');

    if (isTarget) {
      return {
        state: 'inhibited',
        badgeText: '⛔ INHIBITED',
        badgeBg: '#4c0519',
        badgeBorder: '#e11d48',
        badgeTextFill: '#fecdd3',
        descText: `Blocked by ${ch.diureticName || 'Diuretic'}`
      };
    }

    // Secondary cascade effects
    if (currentDiureticId === 'loop') {
      if (channelKey === 'romk_tal') {
        return {
          state: 'voltage_lost',
          badgeText: '⚠️ VOLTAGE LOST',
          badgeBg: '#451a03',
          badgeBorder: '#d97706',
          badgeTextFill: '#fde68a',
          descText: '+8 mV gradient collapses ➔ Loops LOSE Ca²⁺ & Mg²⁺'
        };
      }
      if (channelKey === 'enac') {
        return {
          state: 'surge',
          badgeText: '🌊 +Na⁺ OVERLOAD',
          badgeBg: '#082f49',
          badgeBorder: '#0284c7',
          badgeTextFill: '#bae6fd',
          descText: 'Massive sodium & fluid delivered downstream'
        };
      }
      if (channelKey === 'romk_ccd') {
        return {
          state: 'wasting',
          badgeText: '⚡ K⁺ WASTING',
          badgeBg: '#3b0764',
          badgeBorder: '#9333ea',
          badgeTextFill: '#e9d5ff',
          descText: 'High lumen flow sucks K⁺ into urine (Hypokalemia risk)'
        };
      }
    }

    if (currentDiureticId === 'thiazide') {
      if (channelKey === 'trpv5') {
        return {
          state: 'stimulated',
          badgeText: '⚡ SAVING Ca²⁺',
          badgeBg: '#064e3b',
          badgeBorder: '#059669',
          badgeTextFill: '#a7f3d0',
          descText: 'Low cell Na⁺ speeds NCX1 ➔ Thiazides SAVE Calcium'
        };
      }
      if (channelKey === 'enac') {
        return {
          state: 'surge',
          badgeText: '🌊 +Na⁺ LOAD',
          badgeBg: '#082f49',
          badgeBorder: '#0284c7',
          badgeTextFill: '#bae6fd',
          descText: 'Increased distal Na⁺ delivery to Collecting Duct'
        };
      }
      if (channelKey === 'romk_ccd') {
        return {
          state: 'wasting',
          badgeText: '⚡ K⁺ WASTING',
          badgeBg: '#3b0764',
          badgeBorder: '#9333ea',
          badgeTextFill: '#e9d5ff',
          descText: 'ENaC sodium uptake drives potassium loss'
        };
      }
    }

    if (currentDiureticId === 'spironolactone' || currentDiureticId === 'amiloride') {
      if (channelKey === 'romk_ccd') {
        return {
          state: 'spared',
          badgeText: '🛑 K⁺ SPARED',
          badgeBg: '#064e3b',
          badgeBorder: '#059669',
          badgeTextFill: '#a7f3d0',
          descText: 'Lumen negativity extinguished ➔ K⁺ retained in blood'
        };
      }
    }

    // Default Normal Baseline
    return {
      state: 'normal',
      badgeText: '● Active',
      badgeBg: '#064e3b',
      badgeBorder: '#059669',
      badgeTextFill: '#a7f3d0',
      descText: 'Operational'
    };
  }

  /**
   * Initialize visualizer
   */
  function init(containerId, onChannelSelect) {
    containerEl = document.getElementById(containerId);
    if (!containerEl) return;
    activeChannelCallback = onChannelSelect;
    render();
  }

  /**
   * Render the complete Anatomical Picture + Segment Cards
   */
  function render() {
    if (!containerEl) return;

    // Active Diuretic Highlight Banner text
    let bannerHtml = '';
    if (currentDiureticId !== 'none') {
      let bannerMsg = '';
      if (currentDiureticId === 'loop') {
        bannerMsg = '<strong>Loop Diuretic (Furosemide) Active:</strong> Inhibiting <strong>NKCC2</strong> in the Thick Ascending Limb. Medullary gradient abolished, +8 mV voltage lost (causing Ca²⁺ & Mg²⁺ wasting: <em>"Loops LOSE Calcium"</em>), with massive distal fluid load triggering heavy K⁺ wasting.';
      } else if (currentDiureticId === 'thiazide') {
        bannerMsg = '<strong>Thiazide Diuretic (HCTZ) Active:</strong> Inhibiting <strong>NCC</strong> in the Distal Convoluted Tubule. Cortical urinary dilution impaired (severe hyponatremia risk!), while intracellular sodium depletion activates NCX1 to reclaim Calcium (<em>"Thiazides SAVE Calcium"</em>).';
      } else if (currentDiureticId === 'spironolactone' || currentDiureticId === 'amiloride') {
        bannerMsg = '<strong>K⁺-Sparing Diuretic Active:</strong> Blocking <strong>ENaC</strong> in the Collecting Duct. Extinguishes the lumen-negative charge, halting ROMK potassium excretion into urine (preserves K⁺, risks Hyperkalemia & NAGMA).';
      } else if (currentDiureticId === 'acetazolamide') {
        bannerMsg = '<strong>Acetazolamide (Diamox®) Active:</strong> Inhibiting <strong>Carbonic Anhydrase & NHE3</strong> in the Proximal Tubule. Reabsorption of 85% filtered HCO₃⁻ is blocked, causing alkaline urine (pH ~8.0) and mild metabolic acidosis.';
      } else if (currentDiureticId === 'tolvaptan') {
        bannerMsg = '<strong>Tolvaptan (Samsca®) Active:</strong> Blocking <strong>Aquaporin-2</strong> in the Collecting Duct. Pure water is excreted (aquaresis) with ZERO electrolyte loss (drug of choice for euvolemic hyponatremia in SIADH).';
      } else if (currentDiureticId === 'sglt2i') {
        bannerMsg = '<strong>SGLT2 Inhibitor Active:</strong> Inhibiting <strong>SGLT2</strong> in the Proximal Tubule. Promotes glucosuria & natriuresis, restoring tubuloglomerular feedback to relieve intraglomerular hypertension and protect CKD kidneys.';
      }

      bannerHtml = `
        <div class="p-3 rounded-lg bg-rose-950/40 border border-rose-800/70 text-rose-200 text-xs flex items-start gap-2.5 transition-all">
          <span class="text-rose-400 font-bold text-sm leading-none mt-0.5">⛔</span>
          <div class="leading-relaxed text-[11.5px] sm:text-xs">${bannerMsg}</div>
        </div>
      `;
    }

    containerEl.innerHTML = `
      <div class="space-y-4">
        
        <!-- Live Diuretic Alert Banner -->
        ${bannerHtml}

        <!-- 1. Spacious Anatomical Nephron Illustration (Where Channels Actually Sit) -->
        <div class="relative w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl select-none">
          
          <svg viewBox="0 0 1140 600" class="w-full h-auto block font-sans" style="min-height: 480px;">
            <defs>
              <!-- Zone Gradients -->
              <linearGradient id="svg-cortex-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0c1322" stop-opacity="0.95" />
                <stop offset="100%" stop-color="#080e1a" stop-opacity="0.98" />
              </linearGradient>
              <linearGradient id="svg-medulla-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#050914" stop-opacity="0.98" />
                <stop offset="100%" stop-color="#020409" stop-opacity="1" />
              </linearGradient>

              <!-- Tubule Path Gradients -->
              <linearGradient id="pct-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#d97706" />
              </linearGradient>
              <linearGradient id="tal-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#0284c7" />
                <stop offset="100%" stop-color="#38bdf8" />
              </linearGradient>
              <linearGradient id="dct-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#a855f7" />
              </linearGradient>
              <linearGradient id="cd-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f43f5e" />
                <stop offset="100%" stop-color="#e11d48" />
              </linearGradient>

              <!-- Drop Shadow Filter for Channel Badges -->
              <filter id="badge-shadow" x="-10%" y="-15%" width="120%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.75" />
              </filter>
            </defs>

            <!-- ================= ANATOMICAL BACKGROUND ZONES ================= -->
            
            <!-- Cortex Region (Top 270px) -->
            <rect x="0" y="0" width="1140" height="270" fill="url(#svg-cortex-bg)" />
            
            <!-- Medulla Region (Bottom 330px) -->
            <rect x="0" y="270" width="1140" height="330" fill="url(#svg-medulla-bg)" />

            <!-- Cortico-Medullary Junction Separator -->
            <line x1="20" y1="270" x2="1120" y2="270" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.7" />

            <!-- Anatomical Zone Badges -->
            <g transform="translate(20, 16)">
              <rect x="0" y="0" width="122" height="20" rx="3" fill="#0f172a" stroke="#1e293b" />
              <text x="8" y="14" fill="#94a3b8" font-size="9.5" font-weight="700" letter-spacing="1">RENAL CORTEX</text>
              <text x="8" y="32" fill="#64748b" font-size="9">Glomerulus · PCT · DCT</text>
            </g>

            <g transform="translate(20, 285)">
              <rect x="0" y="0" width="130" height="20" rx="3" fill="#0f172a" stroke="#1e293b" />
              <text x="8" y="14" fill="#64748b" font-size="9.5" font-weight="700" letter-spacing="1">RENAL MEDULLA</text>
              <text x="8" y="32" fill="#475569" font-size="9">Henle's Loop · TAL · Papilla</text>
            </g>


            <!-- ================= ANATOMICAL TUBULE PATHWAY ================= -->
            
            <!-- 1. Glomerulus / Bowman's Capsule at (100, 140) -->
            <g id="node-glomerulus" class="cursor-pointer" onclick="NephronVisualizer.selectChannel('ca')">
              <!-- Afferent & Efferent Arterioles -->
              <path d="M 40,115 C 65,115 75,130 90,135" stroke="#ef4444" stroke-width="4.5" fill="none" stroke-linecap="round" />
              <path d="M 90,145 C 75,150 65,165 40,165" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round" />
              <text x="32" y="108" fill="#f87171" font-size="9" font-weight="600">Afferent</text>
              <text x="32" y="178" fill="#7dd3fc" font-size="9" font-weight="600">Efferent</text>

              <!-- Bowman's Capsule Outer Cup -->
              <circle cx="102" cy="140" r="26" fill="#0f172a" stroke="#f59e0b" stroke-width="3" />
              <!-- Glomerular Capillary Tuft -->
              <circle cx="102" cy="140" r="17" fill="#b91c1c" fill-opacity="0.85" stroke="#f87171" stroke-width="1.5" />
              <text x="102" y="144" fill="#ffffff" font-size="9.5" font-weight="bold" text-anchor="middle">GLOM</text>
              <text x="102" y="180" fill="#cbd5e1" font-size="11" font-weight="700" text-anchor="middle">Glomerulus</text>
              <text x="102" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">180 L/d Plasma</text>
            </g>

            <!-- 2. Proximal Convoluted Tubule (PCT) Path -->
            <path 
              d="M 128,140 C 150,140 160,85 195,85 C 230,85 245,150 280,150 C 315,150 320,220 325,270" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="24" 
              stroke-linecap="round" 
            />
            <path 
              d="M 128,140 C 150,140 160,85 195,85 C 230,85 245,150 280,150 C 315,150 320,220 325,270" 
              fill="none" 
              stroke="url(#pct-grad)" 
              stroke-width="15" 
              stroke-linecap="round" 
            />
            <!-- PCT Flow Arrows -->
            <text x="160" y="80" fill="#fef3c7" font-size="10" font-weight="bold">➔</text>
            <text x="245" y="146" fill="#fef3c7" font-size="10" font-weight="bold">➔</text>

            <!-- 3. Descending Thin Limb of Henle (Into Medulla) -->
            <path 
              d="M 325,270 L 335,460 C 338,510 360,535 390,535 C 415,535 425,510 425,470" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="18" 
              stroke-linecap="round" 
            />
            <path 
              d="M 325,270 L 335,460 C 338,510 360,535 390,535 C 415,535 425,510 425,470" 
              fill="none" 
              stroke="#38bdf8" 
              stroke-width="9" 
              stroke-linecap="round" 
            />
            <!-- Water Reabsorption Callouts along Descending Limb -->
            <g transform="translate(265, 360)">
              <text x="0" y="0" fill="#38bdf8" font-size="11" font-weight="bold">💧 H₂O</text>
              <text x="0" y="14" fill="#94a3b8" font-size="9.5">Water reabsorption</text>
              <text x="0" y="26" fill="#64748b" font-size="9">(Aquaporin-1)</text>
              <path d="M 46,0 L 58,0" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)" />
            </g>

            <!-- Hairpin Tip Milestone -->
            <text x="390" y="555" fill="#f59e0b" font-size="10.5" font-weight="bold" font-mono text-anchor="middle">1200 mOsm/kg</text>
            <text x="390" y="568" fill="#64748b" font-size="9" text-anchor="middle">Hypertonic Tip</text>

            <!-- 4. Thick Ascending Limb (TAL - Medulla to Cortex) -->
            <path 
              d="M 425,470 L 425,270 L 425,120" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="26" 
              stroke-linecap="round" 
            />
            <path 
              d="M 425,470 L 425,270 L 425,120" 
              fill="none" 
              stroke="url(#tal-grad)" 
              stroke-width="17" 
              stroke-linecap="round" 
            />
            <!-- TAL Flow Arrow -->
            <text x="421" y="220" fill="#e0f2fe" font-size="12" font-weight="bold" text-anchor="middle">▲</text>

            <!-- Paracellular Ca2+ and Mg2+ Voltage Driver indicator -->
            <g transform="translate(365, 335)">
              <rect x="0" y="0" width="105" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1" />
              <text x="6" y="13" fill="#c7d2fe" font-size="9.5" font-weight="bold">+8 mV Lumen Voltage</text>
              <text x="6" y="24" fill="#a5b4fc" font-size="8.5">Drives Ca²⁺ &amp; Mg²⁺</text>
            </g>

            <!-- 5. Distal Convoluted Tubule (DCT) in Cortex -->
            <path 
              d="M 425,120 C 445,85 510,85 580,85 C 635,85 675,130 720,130 C 755,130 775,100 800,100" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="24" 
              stroke-linecap="round" 
            />
            <path 
              d="M 425,120 C 445,85 510,85 580,85 C 635,85 675,130 720,130 C 755,130 775,100 800,100" 
              fill="none" 
              stroke="url(#dct-grad)" 
              stroke-width="15" 
              stroke-linecap="round" 
            />
            <!-- DCT Flow Arrows -->
            <text x="560" y="80" fill="#f3e8ff" font-size="10" font-weight="bold">➔</text>
            <text x="700" y="125" fill="#f3e8ff" font-size="10" font-weight="bold">➔</text>

            <!-- 6. Collecting Duct (CD - Cortex to Medulla to Papilla) -->
            <path 
              d="M 800,55 L 800,545" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="32" 
              stroke-linecap="round" 
            />
            <path 
              d="M 800,55 L 800,545" 
              fill="none" 
              stroke="url(#cd-grad)" 
              stroke-width="22" 
              stroke-linecap="round" 
            />
            <!-- Collecting Duct Flow Arrows -->
            <text x="796" y="180" fill="#ffe4e6" font-size="14" font-weight="bold" text-anchor="middle">▼</text>
            <text x="796" y="340" fill="#ffe4e6" font-size="14" font-weight="bold" text-anchor="middle">▼</text>
            <text x="796" y="490" fill="#ffe4e6" font-size="14" font-weight="bold" text-anchor="middle">▼</text>

            <!-- Final Urine Exit Funnel at (800, 555) -->
            <g transform="translate(800, 555)">
              <polygon points="-16,-6 16,-6 0,16" fill="#f59e0b" />
              <rect x="-85" y="18" width="170" height="25" rx="5" fill="#451a03" stroke="#f59e0b" stroke-width="1.5" />
              <text x="0" y="34" fill="#fef3c7" font-size="11" font-weight="bold" text-anchor="middle">URINE EXCRETION</text>
              <text x="0" y="55" fill="#94a3b8" font-size="9.5" text-anchor="middle">1.5 L/day · 50–1200 mOsm/kg</text>
            </g>


            <!-- ================= INTERACTIVE CHANNEL STATIONS (ON THE TUBE) ================= -->

            <!-- Channel 1: CA / NHE3 (PCT) -->
            ${renderSvgChannelBadge({
              key: 'ca',
              bx: 155,
              by: 18,
              w: 165,
              h: 46,
              anchorX: 195,
              anchorY: 76,
              title: 'CA / NHE3',
              sub: 'Acetazolamide (Diamox®)',
              accentColor: '#f59e0b'
            })}

            <!-- Channel 2: SGLT2 (PCT) -->
            ${renderSvgChannelBadge({
              key: 'sglt2',
              bx: 185,
              by: 180,
              w: 165,
              h: 46,
              anchorX: 275,
              anchorY: 154,
              title: 'SGLT2',
              sub: 'Dapagliflozin (Forxiga®)',
              accentColor: '#10b981'
            })}

            <!-- Channel 3: NKCC2 (TAL Loop) -->
            ${renderSvgChannelBadge({
              key: 'nkcc2',
              bx: 460,
              by: 405,
              w: 175,
              h: 46,
              anchorX: 434,
              anchorY: 428,
              title: 'NKCC2',
              sub: 'Loop (Furosemide / Lasix®)',
              accentColor: '#38bdf8'
            })}

            <!-- Channel 4: ROMK (TAL) -->
            ${renderSvgChannelBadge({
              key: 'romk_tal',
              bx: 460,
              by: 255,
              w: 175,
              h: 46,
              anchorX: 434,
              anchorY: 278,
              title: 'ROMK (TAL)',
              sub: 'Apical K⁺ recycling (+8 mV)',
              accentColor: '#818cf8'
            })}

            <!-- Channel 5: NCC (DCT) -->
            ${renderSvgChannelBadge({
              key: 'ncc',
              bx: 515,
              by: 18,
              w: 165,
              h: 46,
              anchorX: 580,
              anchorY: 78,
              title: 'NCC',
              sub: 'Thiazides (HCTZ / Esidrex®)',
              accentColor: '#c084fc'
            })}

            <!-- Channel 6: TRPV5 / NCX1 (DCT) -->
            ${renderSvgChannelBadge({
              key: 'trpv5',
              bx: 615,
              by: 175,
              w: 170,
              h: 46,
              anchorX: 700,
              anchorY: 132,
              title: 'TRPV5 / NCX1',
              sub: 'PTH-Regulated Ca²⁺ Saver',
              accentColor: '#2dd4bf'
            })}

            <!-- Channel 7: ENaC (Collecting Duct) -->
            ${renderSvgChannelBadge({
              key: 'enac',
              bx: 825,
              by: 95,
              w: 175,
              h: 46,
              anchorX: 812,
              anchorY: 118,
              title: 'ENaC',
              sub: 'Amiloride / Spironolactone',
              accentColor: '#fb7185'
            })}

            <!-- Channel 8: ROMK / BK (Collecting Duct) -->
            ${renderSvgChannelBadge({
              key: 'romk_ccd',
              bx: 825,
              by: 215,
              w: 175,
              h: 46,
              anchorX: 812,
              anchorY: 238,
              title: 'ROMK / BK',
              sub: 'K⁺ Excretion into Urine',
              accentColor: '#e879f9'
            })}

            <!-- Channel 9: Aquaporin-2 (Medullary Collecting Duct) -->
            ${renderSvgChannelBadge({
              key: 'aqp2',
              bx: 825,
              by: 395,
              w: 175,
              h: 46,
              anchorX: 812,
              anchorY: 418,
              title: 'Aquaporin-2',
              sub: 'Tolvaptan / ADH (Vasopressin)',
              accentColor: '#38bdf8'
            })}

            <!-- ================= RIGHT COLUMN: ANATOMICAL STATS & OSMOLALITY ================= -->
            <g transform="translate(1012, 30)">
              <rect x="0" y="0" width="118" height="150" rx="6" fill="#0b1120" stroke="#1e293b" />
              <text x="10" y="18" fill="#cbd5e1" font-size="10" font-weight="bold">TUBULAR STATIONS</text>
              
              <circle cx="16" cy="38" r="4" fill="#f59e0b" />
              <text x="26" y="41" fill="#cbd5e1" font-size="9.5">1. PCT (65% Na⁺)</text>

              <circle cx="16" cy="62" r="4" fill="#38bdf8" />
              <text x="26" y="65" fill="#cbd5e1" font-size="9.5">2. TAL (25% Na⁺)</text>

              <circle cx="16" cy="86" r="4" fill="#c084fc" />
              <text x="26" y="89" fill="#cbd5e1" font-size="9.5">3. DCT (5% Na⁺)</text>

              <circle cx="16" cy="110" r="4" fill="#f43f5e" />
              <text x="26" y="113" fill="#cbd5e1" font-size="9.5">4. CD (2-3% Na⁺)</text>

              <circle cx="16" cy="134" r="4" fill="#f59e0b" />
              <text x="26" y="137" fill="#f59e0b" font-size="9.5" font-weight="bold">Urine (1.5 L/d)</text>
            </g>

          </svg>
        </div>

        <!-- 2. The 4 Primary Segment Architectural Cards (Below the Anatomical Diagram) -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <!-- ================= SEGMENT 1: PCT ================= -->
          <div class="clean-panel p-4 space-y-3 border-t-4 border-t-amber-500/80 bg-slate-900/70">
            <div class="border-b border-slate-800 pb-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-800/60 font-semibold">CORTEX · 65% REABSORPTION</span>
                <span class="text-xs text-slate-400 font-mono">Segment 1</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-slate-100 mt-1">Proximal Tubule (PCT)</h3>
              <p class="text-xs text-slate-400 leading-snug mt-0.5">
                Bulk reabsorption of 65% filtered Na⁺ &amp; H₂O, 85% HCO₃⁻, and 100% glucose.
              </p>
            </div>

            <div class="space-y-2.5">
              ${renderChannelCard('ca')}
              ${renderChannelCard('sglt2')}
            </div>

            <div class="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span class="font-mono text-slate-300 font-semibold block">Physiological Role</span>
              <p>Iso-osmotic fluid removal. Generates high tubular chloride concentration driving downstream passive forces.</p>
            </div>
          </div>

          <!-- ================= SEGMENT 2: TAL (LOOP) ================= -->
          <div class="clean-panel p-4 space-y-3 border-t-4 border-t-sky-500/80 bg-slate-900/70">
            <div class="border-b border-slate-800 pb-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/50 text-sky-300 border border-sky-800/60 font-semibold">OUTER MEDULLA · 25% Na⁺</span>
                <span class="text-xs text-slate-400 font-mono">Segment 2</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-slate-100 mt-1">Thick Ascending Limb (TAL)</h3>
              <p class="text-xs text-slate-400 leading-snug mt-0.5">
                Water-impermeable salt engine powering the medullary hypertonic gradient.
              </p>
            </div>

            <div class="space-y-2.5">
              ${renderChannelCard('nkcc2')}
              ${renderChannelCard('romk_tal')}
            </div>

            <div class="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span class="font-mono text-slate-300 font-semibold block">Paracellular Absorption</span>
              <p>Apical K⁺ recycling creates +8 mV voltage, forcing <strong>Ca²⁺</strong> and <strong>Mg²⁺</strong> through tight junctions into blood.</p>
            </div>
          </div>

          <!-- ================= SEGMENT 3: DCT ================= -->
          <div class="clean-panel p-4 space-y-3 border-t-4 border-t-purple-500/80 bg-slate-900/70">
            <div class="border-b border-slate-800 pb-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-800/60 font-semibold">CORTEX · 5% Na⁺ DILUTING</span>
                <span class="text-xs text-slate-400 font-mono">Segment 3</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-slate-100 mt-1">Distal Tubule (DCT)</h3>
              <p class="text-xs text-slate-400 leading-snug mt-0.5">
                The cortical diluting segment. Impermeable to water; regulates active Calcium.
              </p>
            </div>

            <div class="space-y-2.5">
              ${renderChannelCard('ncc')}
              ${renderChannelCard('trpv5')}
            </div>

            <div class="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span class="font-mono text-slate-300 font-semibold block">Calcium vs Sodium Paradox</span>
              <p>Inhibiting NCC depletes cell Na⁺, driving basolateral NCX1 to absorb Calcium: <em>"Thiazides SAVE Calcium"</em>.</p>
            </div>
          </div>

          <!-- ================= SEGMENT 4: COLLECTING DUCT ================= -->
          <div class="clean-panel p-4 space-y-3 border-t-4 border-t-rose-500/80 bg-slate-900/70">
            <div class="border-b border-slate-800 pb-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/50 text-rose-300 border border-rose-800/60 font-semibold">CORTEX ➔ MEDULLA · 2-3%</span>
                <span class="text-xs text-slate-400 font-mono">Segment 4</span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-slate-100 mt-1">Collecting Duct (CD)</h3>
              <p class="text-xs text-slate-400 leading-snug mt-0.5">
                Terminal fine-tuning. Regulated by Aldosterone (Na⁺/K⁺) and ADH (Water).
              </p>
            </div>

            <div class="space-y-2.5">
              ${renderChannelCard('enac')}
              ${renderChannelCard('romk_ccd')}
              ${renderChannelCard('aqp2')}
            </div>

            <div class="p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span class="font-mono text-slate-300 font-semibold block">Coupled K⁺ Excretion</span>
              <p>ENaC creates -20 mV lumen voltage sucking K⁺ out. High distal Na⁺ delivery = severe hypokalemia!</p>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  /**
   * Helper to render an SVG Channel Badge placed directly on the tubule
   */
  function renderSvgChannelBadge(opts) {
    const { key, bx, by, w, h, anchorX, anchorY, title, sub, accentColor } = opts;
    const isSelected = (selectedChannelId === key);
    const status = getChannelStatus(key);

    const strokeColor = isSelected ? '#38bdf8' : (status.state === 'inhibited' ? '#f43f5e' : '#334155');
    const strokeWidth = isSelected ? '2.5' : (status.state === 'inhibited' ? '2' : '1');
    const bgColor = isSelected ? '#1e293b' : '#090d16';

    return `
      <g 
        id="svg-badge-${key}" 
        class="cursor-pointer group" 
        onclick="NephronVisualizer.selectChannel('${key}')"
        filter="url(#badge-shadow)"
      >
        <!-- Connector line to tubule anchor -->
        <line x1="${bx + w / 2}" y1="${by + h / 2}" x2="${anchorX}" y2="${anchorY}" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.65" />
        <circle cx="${anchorX}" cy="${anchorY}" r="4" fill="${accentColor}" />

        <!-- Card Container -->
        <rect 
          x="${bx}" 
          y="${by}" 
          width="${w}" 
          height="${h}" 
          rx="6" 
          fill="${bgColor}" 
          stroke="${strokeColor}" 
          stroke-width="${strokeWidth}" 
        />

        <!-- Accent left bar -->
        <rect x="${bx}" y="${by}" width="4" height="${h}" rx="2" fill="${accentColor}" />

        <!-- Title & Status Tag -->
        <text x="${bx + 10}" y="${by + 18}" fill="#f8fafc" font-size="13" font-weight="700" font-family="monospace">${title}</text>
        
        <!-- Status Pill Box -->
        <rect x="${bx + w - 75}" y="${by + 7}" width="68" height="16" rx="3" fill="${status.badgeBg}" stroke="${status.badgeBorder}" stroke-width="0.8" />
        <text x="${bx + w - 41}" y="${by + 19}" fill="${status.badgeTextFill}" font-size="9.5" font-weight="700" font-family="monospace" text-anchor="middle">${status.badgeText}</text>

        <!-- Subtitle -->
        <text x="${bx + 10}" y="${by + 35}" fill="#94a3b8" font-size="10.5" font-weight="500">${sub}</text>
      </g>
    `;
  }

  /**
   * Helper to render an HTML Channel Card in the segment panels below
   */
  function renderChannelCard(key) {
    const ch = CHANNELS[key];
    const isSelected = (selectedChannelId === key);
    const status = getChannelStatus(key);

    const borderClass = isSelected
      ? 'border-sky-400 ring-2 ring-sky-400/40 bg-slate-800'
      : 'border-slate-800/90 hover:border-slate-600 bg-slate-950/90';

    return `
      <div 
        class="channel-box cursor-pointer p-2.5 rounded-lg border ${borderClass} transition-all space-y-1.5"
        onclick="NephronVisualizer.selectChannel('${key}')"
      >
        <div class="flex items-center justify-between gap-1">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: ${ch.color}"></span>
            <span class="text-xs sm:text-sm font-bold text-slate-100 font-mono">${ch.shortName}</span>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono border" style="background-color: ${status.badgeBg}; border-color: ${status.badgeBorder}; color: ${status.badgeTextFill};">
            ${status.badgeText}
          </span>
        </div>

        <div class="text-[11px] text-slate-300 font-medium">
          ${ch.subtitle}
        </div>

        <div class="text-[10px] text-slate-400 font-mono truncate">
          ${ch.direction}
        </div>

        ${status.state !== 'normal' ? `
          <div class="text-[10.5px] font-mono text-amber-300/90 bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-800/40">
            ${status.descText}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Select a channel, highlight it, and fire callback to update deep-dive details
   */
  function selectChannel(channelId) {
    if (!CHANNELS[channelId]) return;
    selectedChannelId = channelId;
    render();

    if (activeChannelCallback) {
      activeChannelCallback(CHANNELS[channelId]);
    }
  }

  /**
   * Apply diuretic, update state, and re-render visualizer
   */
  function applyDiuretic(diureticId) {
    currentDiureticId = diureticId;

    let targetedChannelKey = null;
    Object.keys(CHANNELS).forEach(k => {
      if (CHANNELS[k].blockedBy === diureticId) {
        targetedChannelKey = k;
      }
    });

    if (diureticId === 'spironolactone') {
      targetedChannelKey = 'enac';
    }

    if (targetedChannelKey) {
      selectedChannelId = targetedChannelKey;
    }

    render();

    if (targetedChannelKey && activeChannelCallback) {
      activeChannelCallback(CHANNELS[targetedChannelKey]);
    }
  }

  return {
    init,
    selectChannel,
    applyDiuretic,
    CHANNELS
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NephronVisualizer;
}
