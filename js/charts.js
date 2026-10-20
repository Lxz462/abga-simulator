/**
 * ArterioGas Pro - Interactive Chart Visualizations
 * Built with Chart.js for high-fidelity medical representation
 */

const ABGACharts = (function() {
  'use strict';

  let davenportChart = null;
  let oxyHbChart = null;
  let gamblegramChart = null;

  /**
   * Initialize Davenport Nomogram (pH vs [HCO3-] with PaCO2 isobars)
   */
  function initDavenport(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // Generate isobars for PaCO2: 2.7, 4.0, 5.33, 6.7, 8.0, 10.7 kPa (20, 30, 40, 50, 60, 80 mmHg)
    const isobars = [
      { pco2: 2.7, label: '2.7 kPa (20 mmHg)', color: 'rgba(148, 163, 184, 0.25)' },
      { pco2: 4.0, label: '4.0 kPa (30 mmHg)', color: 'rgba(148, 163, 184, 0.30)' },
      { pco2: 5.33, label: '5.33 kPa (40 mmHg - Normal)', color: 'rgba(56, 189, 248, 0.75)', borderWidth: 2, isNormal: true },
      { pco2: 6.7, label: '6.7 kPa (50 mmHg)', color: 'rgba(148, 163, 184, 0.30)' },
      { pco2: 8.0, label: '8.0 kPa (60 mmHg)', color: 'rgba(148, 163, 184, 0.25)' },
      { pco2: 10.7, label: '10.7 kPa (80 mmHg)', color: 'rgba(148, 163, 184, 0.20)' }
    ];

    const datasets = isobars.map(ib => ({
      label: `pCO2: ${ib.label}`,
      data: ABGAEngine.getDavenportIsobar(ib.pco2),
      borderColor: ib.color,
      borderWidth: ib.borderWidth || 1,
      borderDash: ib.isNormal ? [] : [4, 4],
      pointRadius: 0,
      fill: false,
      tension: 0.3
    }));

    // Normal physiological box (pH 7.35-7.45, HCO3 22-26)
    datasets.push({
      label: 'Normal Reference Box',
      data: [
        { x: 7.35, y: 22 },
        { x: 7.45, y: 22 },
        { x: 7.45, y: 26 },
        { x: 7.35, y: 26 },
        { x: 7.35, y: 22 }
      ],
      borderColor: 'rgba(56, 189, 248, 0.4)',
      backgroundColor: 'rgba(56, 189, 248, 0.06)',
      fill: true,
      pointRadius: 0,
      borderWidth: 1.5
    });

    // Current Patient Point (Dataset index = datasets.length)
    datasets.push({
      label: 'Current Patient ABGA',
      data: [{ x: 7.40, y: 24.0 }],
      borderColor: '#ffffff',
      backgroundColor: '#38bdf8',
      pointRadius: 7,
      pointHoverRadius: 9,
      pointBorderWidth: 2,
      pointBorderColor: '#ffffff',
      showLine: false
    });

    davenportChart = new Chart(ctx, {
      type: 'scatter',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === datasets.length - 1) {
                  return `Patient: pH ${context.parsed.x.toFixed(2)}, [HCO3-] ${context.parsed.y.toFixed(1)} mmol/L`;
                }
                return `${context.dataset.label}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: 6.90,
            max: 7.75,
            title: {
              display: true,
              text: 'Arterial pH',
              color: '#475569',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.15)'
            }
          },
          y: {
            min: 5,
            max: 48,
            title: {
              display: true,
              text: 'Plasma [HCO3-] (mmol/L)',
              color: '#475569',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.15)'
            }
          }
        }
      }
    });
  }

  function updateDavenport(pH, hco3) {
    if (!davenportChart) return;
    const ptIndex = davenportChart.data.datasets.length - 1;
    davenportChart.data.datasets[ptIndex].data = [{ x: Number(pH.toFixed(2)), y: Number(hco3.toFixed(1)) }];
    davenportChart.update();
  }

  /**
   * Initialize Oxyhemoglobin Dissociation Curve (SaO2 vs PaO2 with Bohr Shift)
   */
  function initOxyHb(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const initialCurves = ABGAEngine.getOxyhemoglobinCurve(7.40, 5.33, 37, 0);

    oxyHbChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Standard Curve (pH 7.40, pCO2 5.33 kPa, 37°C)',
            data: initialCurves.standard,
            borderColor: 'rgba(148, 163, 184, 0.5)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            showLine: true,
            tension: 0.2
          },
          {
            label: 'Current Patient Curve (Bohr Shifted)',
            data: initialCurves.current,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.05)',
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            showLine: true,
            tension: 0.2
          },
          {
            label: 'Current Patient PaO2 & SaO2',
            data: [{ x: 12.5, y: 98.0 }],
            borderColor: '#ffffff',
            backgroundColor: '#38bdf8',
            pointRadius: 7,
            pointHoverRadius: 9,
            pointBorderWidth: 2,
            pointBorderColor: '#ffffff',
            showLine: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const kpa = context.parsed.x;
                const mmhg = ABGAEngine.kpaToMmhg(kpa).toFixed(0);
                if (context.datasetIndex === 2) {
                  return `Patient: PaO2 = ${kpa.toFixed(1)} kPa (${mmhg} mmHg), SaO2 = ${context.parsed.y.toFixed(1)}%`;
                }
                return `${context.dataset.label}: PaO2 ${kpa.toFixed(1)} kPa -> SaO2 ${context.parsed.y.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 18,
            title: {
              display: true,
              text: 'PaO2 in kPa (Upper scale: mmHg ≈ x 7.5)',
              color: '#475569',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.15)'
            }
          },
          y: {
            min: 0,
            max: 102,
            title: {
              display: true,
              text: 'Arterial Oxygen Saturation SaO2 (%)',
              color: '#475569',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.15)'
            }
          }
        }
      }
    });
  }

  function updateOxyHb(paO2_kPa, pH, pco2_kPa, tempC = 37, be = 0) {
    if (!oxyHbChart) return;
    const curves = ABGAEngine.getOxyhemoglobinCurve(pH, pco2_kPa, tempC, be);
    const patientSaO2 = ABGAEngine.calculateSaO2(paO2_kPa, pH, pco2_kPa, tempC, be);

    oxyHbChart.data.datasets[1].data = curves.current;
    oxyHbChart.data.datasets[2].data = [{ x: Number(paO2_kPa.toFixed(1)), y: Number(patientSaO2.toFixed(1)) }];
    oxyHbChart.update();
  }

  /**
   * Initialize Gamblegram (Electrolyte & Anion Gap Stacked Bar Chart)
   * Standard Clinical Formula without Potassium:
   * Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)
   * Left Bar: Sodium (Na⁺)
   * Right Bar: Chloride (Cl⁻) + Bicarbonate (HCO₃⁻) + Anion Gap (AG)
   */
  function initGamblegram(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    gamblegramChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cations (+)', 'Anions (-)'],
        datasets: [
          // Segment 1: Sodium (Na+) on left / Chloride (Cl-) on right
          {
            label: 'Na⁺ / Cl⁻',
            data: [140, 104],
            backgroundColor: ['#3b82f6', '#0284c7'], // Blue for Na, Sky for Cl
            stack: 'Stack 0'
          },
          // Segment 2: Bicarbonate (HCO3-) on right only
          {
            label: 'HCO₃⁻',
            data: [0, 24],
            backgroundColor: ['transparent', '#10b981'], // Emerald for HCO3
            stack: 'Stack 0'
          },
          // Segment 3: Anion Gap = Na - (Cl + HCO3) on right only
          {
            label: 'Anion Gap (AG)',
            data: [0, 12], // AG goes here (normal average 12)
            backgroundColor: ['transparent', '#8b5cf6'], // Purple when normal, Rose when elevated
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                if (!tooltipItems.length) return '';
                return tooltipItems[0].label;
              },
              label: function(context) {
                const isCationBar = context.dataIndex === 0;
                const dIdx = context.datasetIndex;
                const val = context.parsed.y;
                if (val === 0) return '';
                if (isCationBar) {
                  if (dIdx === 0) return `Sodium (Na⁺): ${val} mmol/L`;
                  return '';
                } else {
                  if (dIdx === 0) return `Chloride (Cl⁻): ${val} mmol/L`;
                  if (dIdx === 1) return `Bicarbonate (HCO₃⁻): ${val} mmol/L`;
                  if (dIdx === 2) {
                    const status = val > 14.0 ? 'Elevated' : 'Normal (10–14, avg 12)';
                    return `Anion Gap (AG): ${val.toFixed(1)} mmol/L [${status}]`;
                  }
                }
                return `${context.dataset.label}: ${val} mmol/L`;
              }
            },
            filter: function(tooltipItem) {
              return tooltipItem.parsed.y > 0;
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false }
          },
          y: {
            stacked: true,
            min: 0,
            max: 165,
            title: {
              display: true,
              text: 'Concentration (mmol/L)',
              color: '#475569',
              font: { weight: 'bold', size: 11 }
            },
            grid: {
              color: 'rgba(148, 163, 184, 0.15)'
            }
          }
        }
      }
    });
  }

  function updateGamblegram(na, k, cl, hco3, ag, isHighAG) {
    if (!gamblegramChart) return;
    
    // Dataset 0: Na on Cation bar (index 0) / Cl on Anion bar (index 1)
    gamblegramChart.data.datasets[0].data = [na, cl];
    // Dataset 1: HCO3 on Anion bar only (0 on Cation bar)
    gamblegramChart.data.datasets[1].data = [0, hco3];
    // Dataset 2: Standard Anion Gap without Potassium = Na - (Cl + HCO3)
    const anionGapVal = Math.max(0, na - (cl + hco3));
    gamblegramChart.data.datasets[2].data = [0, Number(anionGapVal.toFixed(1))];
    // Color: Rose if elevated (> 14 mmol/L), Purple if normal (10–14 mmol/L)
    gamblegramChart.data.datasets[2].backgroundColor = ['transparent', isHighAG ? '#f43f5e' : '#8b5cf6'];
    gamblegramChart.update();
  }

  function resizeAll() {
    if (davenportChart) davenportChart.resize();
    if (oxyHbChart) oxyHbChart.resize();
    if (gamblegramChart) gamblegramChart.resize();
  }

  return {
    initDavenport,
    updateDavenport,
    initOxyHb,
    updateOxyHb,
    initGamblegram,
    updateGamblegram,
    resizeAll
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ABGACharts;
}
