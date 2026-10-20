/**
 * ArterioGas Suite - Clinical Lead II ECG Telemetry Monitor
 * Generates natural, crisp cardiac waveforms with a needle-sharp QRS complex.
 * Accurately demonstrates Prof. Gabutti Slide 23 & 24 (Hypokalemic U-waves, flat T-waves, Torsades risk)
 * and hyperkalemic tall peaked tented T-waves.
 */

const ElectrolyteECG = (function() {
  'use strict';

  let canvas = null;
  let ctx = null;
  let animId = null;
  let sweepX = 0;
  let lastY = 100;
  let currentParams = {
    potassium: 4.2,
    calcium: 2.35,
    magnesium: 0.85
  };

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    resize();
    window.addEventListener('resize', resize);
    startAnimation();
  }

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    drawGrid();
  }

  function updateParameters(k, ca = 2.35, mg = 0.85) {
    currentParams.potassium = k;
    currentParams.calcium = ca;
    currentParams.magnesium = mg;
  }

  function drawGrid() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#050a14';
    ctx.fillRect(0, 0, w, h);

    // Subtle medical telemetry grid
    ctx.strokeStyle = 'rgba(30, 58, 138, 0.15)';
    ctx.lineWidth = 1;
    const step = 20 * (window.devicePixelRatio || 1);

    ctx.beginPath();
    for (let x = 0; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    drawInitialWaveform();
  }

  function drawInitialWaveform() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const midY = h * 0.60;
    const scaleY = h * 0.22;
    const cycleLength = 320 * (window.devicePixelRatio || 1);

    ctx.strokeStyle = (currentParams.potassium < 2.5 || currentParams.potassium > 6.5) ? '#f43f5e' : '#38bdf8';
    ctx.lineWidth = 2.0 * (window.devicePixelRatio || 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';

    ctx.beginPath();
    for (let x = 0; x < w; x += 2) {
      const phase = (x % cycleLength) / cycleLength;
      const y = getWaveY(phase, midY, scaleY);
      if (x === 0) ctx.moveTo(0, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /**
   * Generates Y-value for phase t (0 to 1) with natural clinical morphology
   * midY: vertical center, scaleY: amplitude scaling
   */
  function getWaveY(t, midY, scaleY) {
    const k = currentParams.potassium;
    const ca = currentParams.calcium;

    let dy = 0; // 0 = isoelectric line

    // 1. P WAVE (Atrial depolarization: t = 0.08 to 0.16)
    if (t >= 0.08 && t < 0.16) {
      const pPhase = (t - 0.08) / 0.08;
      // Hyperkalemia (> 6.5) flattens P-wave
      const pAmp = k > 6.5 ? 0.04 : 0.20;
      dy = - Math.sin(pPhase * Math.PI) * pAmp;
    }

    // 2. PR SEGMENT (t = 0.16 to 0.22): flat isoelectric baseline
    
    // 3. QRS COMPLEX (Ventricular depolarization: t = 0.22 to 0.30)
    // Sharp clinical needle spike: Q dip -> Tall needle R apex -> S dip
    const isWideQRS = k > 6.5;
    const qrsStart = 0.22;
    const qrsEnd = isWideQRS ? 0.33 : 0.29; // QRS widening in severe hyperkalemia
    
    if (t >= qrsStart && t < qrsEnd) {
      const p = (t - qrsStart) / (qrsEnd - qrsStart);
      if (p < 0.15) {
        // Q-Wave: sharp tiny dip downwards
        dy = (p / 0.15) * 0.22;
      } else if (p < 0.50) {
        // R-Wave UPSTROKE: needle-sharp linear ascent to tall peak (with headroom)
        const upProg = (p - 0.15) / 0.35;
        const rPeak = isWideQRS ? -1.4 : -1.8; // Razor-sharp spike safely within bounds
        dy = 0.22 + (rPeak - 0.22) * upProg;
      } else if (p < 0.80) {
        // R-Wave DOWNSTROKE: plunge straight down into S-wave nadir
        const downProg = (p - 0.50) / 0.30;
        const rPeak = isWideQRS ? -1.4 : -1.8;
        const sNadir = 0.50; // Below baseline
        dy = rPeak + (sNadir - rPeak) * downProg;
      } else {
        // S-Wave RECOVERY: quick return back up to baseline
        const recProg = (p - 0.80) / 0.20;
        dy = 0.50 * (1 - recProg);
      }
    }

    // 4. ST SEGMENT & T WAVE (Ventricular repolarization)
    // Calcium changes ST segment duration: low Ca lengthens ST (long QT); high Ca shortens ST (short QT)
    const stShift = ca < 2.0 ? 0.06 : (ca > 2.7 ? -0.04 : 0);
    const tStart = 0.36 + stShift;
    const tWidth = isWideQRS ? 0.24 : 0.18;

    if (t >= tStart && t < tStart + tWidth) {
      const tPhase = (t - tStart) / tWidth;
      const sinShape = Math.sin(tPhase * Math.PI);

      if (k < 2.5) {
        // Severe Hypokalemia: Inverted T-wave + ST depression (Slide 24)
        dy = 0.30 * sinShape;
      } else if (k < 3.5) {
        // Moderate Hypokalemia: Flattened T-wave + slight ST depression
        dy = -0.12 * sinShape + 0.10;
      } else if (k > 6.5) {
        // Severe Hyperkalemia: Tall, tented, peaked narrow T-wave
        dy = -2.3 * Math.pow(sinShape, 3.5);
      } else if (k > 5.5) {
        // Moderate Hyperkalemia: Peaked symmetric T-wave
        dy = -1.4 * Math.pow(sinShape, 2.0);
      } else {
        // Normal T-wave
        dy = -0.65 * sinShape;
      }
    }

    // 5. U WAVE (Hallmark of Hypokalemia: Prof. Gabutti Slide 23 & 24)
    // Appears right after flattened T wave (t = 0.60 to 0.74)
    if (k < 3.5 && t >= 0.58 && t < 0.74) {
      const uPhase = (t - 0.58) / 0.16;
      const uAmp = k < 2.5 ? 0.70 : 0.32; // In severe hypokalemia, U-wave dominates!
      dy = - Math.sin(uPhase * Math.PI) * uAmp;
    }

    return midY + (dy * scaleY);
  }

  function startAnimation() {
    if (animId) cancelAnimationFrame(animId);

    const speed = 2.5 * (window.devicePixelRatio || 1);
    const cycleLength = 320 * (window.devicePixelRatio || 1);

    function step() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const midY = h * 0.60;
      const scaleY = h * 0.22;

      // Clear small leading phosphor gap
      const clearWidth = 25 * (window.devicePixelRatio || 1);
      ctx.fillStyle = '#050a14';
      ctx.fillRect(sweepX, 0, clearWidth, h);

      // Restore grid lines in cleared gap
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.2)';
      ctx.lineWidth = 1;
      const gridStep = 20 * (window.devicePixelRatio || 1);
      const startGridX = Math.floor(sweepX / gridStep) * gridStep;
      ctx.beginPath();
      for (let x = startGridX; x < sweepX + clearWidth; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.stroke();

      // Current heart cycle phase
      const currentHeartPhase = (sweepX % cycleLength) / cycleLength;
      const currentY = getWaveY(currentHeartPhase, midY, scaleY);

      // Stroke beam with subtle glow
      ctx.strokeStyle = (currentParams.potassium < 2.5 || currentParams.potassium > 6.5) ? '#f43f5e' : '#38bdf8';
      ctx.shadowColor = (currentParams.potassium < 2.5 || currentParams.potassium > 6.5) ? '#f43f5e' : '#38bdf8';
      ctx.shadowBlur = 5;
      ctx.lineWidth = 2.2 * (window.devicePixelRatio || 1);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'miter';

      ctx.beginPath();
      ctx.moveTo(sweepX === 0 ? 0 : sweepX - speed, lastY);
      ctx.lineTo(sweepX, currentY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      lastY = currentY;
      sweepX += speed;

      if (sweepX >= w) {
        sweepX = 0;
        lastY = midY;
      }

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
  }

  function stopAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  return {
    init,
    updateParameters,
    stopAnimation,
    resize
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ElectrolyteECG;
}
