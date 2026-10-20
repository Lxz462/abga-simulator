# ArterioGas
### Arterial Blood Gas Analysis & Acid-Base Physiology Simulator
*Designed for medical students preparing for federal medical exams and board examinations (Staatsexamen, USMLE)*

---

## Overview
**ArterioGas** is a focused, interactive reference tool designed to make Arterial Blood Gas Analysis (ABGA) and acid-base pathophysiology intuitive, rigorous, and straightforward to study.

It combines real-time physiological calculations (Henderson-Hasselbalch, Winter's formula, alveolar gas equation) with clear diagnostic nomograms and clinical disease profiles.

---

## ⚡ Key Features

### 1. Primary Arterial Parameters (SI Units in kPa & Dual mmHg)
- **Arterial pH**: 6.80 to 7.80 with live Henderson-Hasselbalch auto-calculation.
- **$\text{PaCO}_2$ (in kPa & mmHg)**: Normal 4.7 – 6.0 kPa (35 – 45 mmHg).
- **$\text{PaO}_2$ (in kPa & mmHg)**: Normal 10.0 – 13.3 kPa (75 – 100 mmHg).
- **$\text{FiO}_2$**: Inspired fraction from 0.21 (Room air) to 1.0 (100% $O_2$).
- **Actual Bicarbonate $[\text{HCO}_3^-]$**: 5.0 to 50.0 mmol/L.
- **Base Excess ($\text{BE} / \text{SBE}$)**: Extracellular calculation via Van Slyke equation.
- **Electrolyte Deck**: $\text{Na}^+, \text{K}^+, \text{Cl}^-$, Albumin, Lactate, Glucose, and Temperature.

### 2. Interactive Interactive Visualizations
- **Davenport Acid-Base Nomogram**: Dynamic pH vs $[\text{HCO}_3^-]$ scatter plot with calibrated $\text{PaCO}_2$ isobars (2.7, 4.0, 5.33, 6.7, 8.0, 10.7 kPa) and highlighted diagnostic compensation zones.
- **Oxyhemoglobin Dissociation Curve ($S_aO_2$ vs $\text{PaO}_2$)**: Illustrates the **Bohr Effect** shift in real-time driven by $\text{pH}$, $\text{PaCO}_2$, temperature, and base excess.
- **Electrolyte Gamblegram**: Visualizing plasma electroneutrality and the **Albumin-Corrected Anion Gap**.
- **Horovitz Index ($\text{P/F}$ Ratio) & Alveolar Gas Equation ($\text{AaDO}_2$)**: Berlin ARDS definition thresholds (Normal, Mild, Moderate, Severe ARDS) with age-expected alveolar-arterial oxygen gradients.

### 3. Comprehensive Pathophysiology Presets & Disease Triggers
Includes 1-click clinical presets with extensive molecular and organ-level narratives:
- **Diabetic Ketoacidosis (DKA)**: Severe HAGMA, Kussmaul hyperventilation, potassium shifts.
- **Acute Hyperventilation**: Panic/anxiety, acute hypocapnia, tetany mechanism (ionized $\text{Ca}^{2+}$ binding to albumin).
- **Alcoholic Ketoacidosis (AKA) & Binge Drinking**: High $\text{NADH/NAD}^+$ ratio, $\beta$-hydroxybutyrate accumulation, starvation hypoglycemia.
- **Toxic Alcohol Ingestion**:
  - **Methanol** ($\text{GOLD MARK - M}$): Formic acid, retinal damage / snowstorm vision, high osmolal gap.
  - **Ethylene Glycol** ($\text{GOLD MARK - G}$): Oxalate crystal precipitation, acute tubular necrosis, hypocalcemia.
  - **Salicylate / Aspirin Toxicity** ($\text{GOLD MARK - A}$): Classic mixed respiratory alkalosis + HAGMA.
- **Septic Shock / Severe Lactic Acidosis** ($\text{GOLD MARK - L}$): Type A tissue hypoperfusion.
- **COPD Acute-on-Chronic Exacerbation**: Chronic renal retention of $\text{HCO}_3^-$ overwhelmed by acute $\text{CO}_2$ retention.
- **Acute Opiate / Heroin Overdose**: Pure acute alveolar hypoventilation with normal $\text{AaDO}_2$ gradient.
- **Severe Vomiting / Pyloric Stenosis**: Hypochloremic hypokalemic metabolic alkalosis with paradoxical aciduria.
- **Secretory Diarrhea**: Normal Anion Gap (Hyperchloremic) Metabolic Acidosis ($\text{NAGMA}$).
- **Severe ARDS**: Shunt physiology, refractory hypoxemia, permissive hypercapnia.
- **Acute Pulmonary Embolism (PE)**: Widened $\text{AaDO}_2$ gradient with hypocapnia.
- **DKA with Vomiting**: Masked mixed disorder with normal pH but massive Anion Gap and $\Delta\text{ Ratio} > 2.0$.
- **0.9% Normal Saline Overload**: Iatrogenic hyperchloremic dilutional acidosis.
- **Biochemical & Enzymatic Pathway Lesions**:
  - **Vitamin B₁ (Thiamine) Deficiency (PDH Failure)**: Pyruvate Dehydrogenase paralysis, TPP cofactor exhaustion, metabolic shunting of pyruvate to L-lactate, Wet Beriberi, and glucose-first clinical pitfall.
  - **Metformin Toxicity**: Mitochondrial Complex I inhibition and hepatic gluconeogenesis block.
  - **Acetazolamide Therapy**: Renal proximal Carbonic Anhydrase inhibition and bicarbonate wasting.
  - **Cyanide / Smoke Poisoning**: Cytochrome c Oxidase (Complex IV) arrest, histotoxic dysoxia, and normal PaO2 paradox.
  - **Glutathione Depletion (5-Oxoprolinuria)**: Chronic paracetamol deregulation of the $\gamma$-glutamyl cycle.

### 4. High-Yield Acronym Compendium
Full biochemical breakdowns for:
- **GOLD MARK** (Glycols, Oxoproline, L-lactate, D-lactate, Methanol, Aspirin, Renal failure, Ketoacidosis)
- **MUDPILES** comparison
- **KULT** (German Staatsexamen classic)
- **HARDUPS / USED CRAP** (Normal Anion Gap / Hyperchloremic causes)

### 5. 6-Step Clinical Algorithm & Exam Quiz
- Guaranteed step-by-step diagnostic workflow using Winter's formula and Delta-Delta ratios.
- Clinical vignettes with interactive multiple-choice questions, board-style explanations, and score tracking.

---

## 🚀 How to Share with Uni Friends via GitHub Pages (2-Minute Setup)

### Option 1: Via Git CLI (Recommended)
1. Open PowerShell or Terminal in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial release of ArterioGas Pro"
   ```
2. Create a new public repository on [GitHub](https://github.com/new) named `ABGA`.
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ABGA.git
   git branch -M main
   git push -u origin main
   ```
4. On your GitHub repository page:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Choose Branch: `main` and Folder: `/ (root)`, then click **Save**.
5. Within 60 seconds, your site is live at:
   `https://YOUR_USERNAME.github.io/ABGA`

### Option 2: Without Git (Web Upload via GitHub.com)
1. Go to [github.com/new](https://github.com/new) and create a repository called `ABGA`.
2. Click **"uploading an existing file"** or **Add file > Upload files**.
3. Drag and drop all the files (`index.html`, `css/`, `js/`, `README.md`) from this folder.
4. Click **Commit changes**.
5. Go to **Settings** -> **Pages** -> Select **main** branch -> Click **Save**.
6. Share your live link with your uni friends!

---

## 📚 Key Mathematical Formulas Used in the Engine

1. **Henderson-Hasselbalch Equation (in kPa)**:
   $$\text{pH} = 6.1 + \log_{10}\left(\frac{[\text{HCO}_3^-]}{0.2303 \times \text{PaCO}_2}\right)$$
   *(where $0.2303 \text{ mmol}/(\text{L} \cdot \text{kPa})$ is the solubility coefficient of $\text{CO}_2$)*

2. **Alveolar Gas Equation (at Sea Level in kPa)**:
   $$\text{P}_A\text{O}_2 = (101.325 - 6.27) \times \text{FiO}_2 - \frac{\text{PaCO}_2}{0.8} = 95.05 \times \text{FiO}_2 - 1.25 \times \text{PaCO}_2$$

3. **Alveolar-Arterial Gradient**:
   $$\text{AaDO}_2 = \text{P}_A\text{O}_2 - \text{PaO}_2$$
   $$\text{Expected }\text{AaDO}_2\text{ (mmHg)} \approx \frac{\text{Age}}{4} + 4$$

4. **Winter's Formula for Respiratory Compensation in Metabolic Acidosis**:
   $$\text{Expected PaCO}_2\text{ (mmHg)} = 1.5 \times [\text{HCO}_3^-] + 8 \pm 2$$
   $$\text{Expected PaCO}_2\text{ (kPa)} \approx 0.20 \times [\text{HCO}_3^-] + 1.07 \pm 0.27$$

5. **Albumin-Corrected Anion Gap**:
   $$\text{AG}_{\text{corrected}} = (\text{Na}^+ - (\text{Cl}^- + [\text{HCO}_3^-])) + 2.5 \times \left(\frac{40 - [\text{Albumin in g/L}]}{10}\right)$$

6. **Delta Ratio ($\Delta\text{ Ratio}$)**:
   $$\Delta\text{ Ratio} = \frac{\text{AG}_{\text{corrected}} - 12}{24 - [\text{HCO}_3^-]}$$

7. **Horovitz Index ($\text{P/F Ratio}$)**:
   $$\text{P/F} = \frac{\text{PaO}_2}{\text{FiO}_2}$$
   *(Normal: $> 40 \text{ kPa}$ / $> 300 \text{ mmHg}$; Severe ARDS: $< 13.3 \text{ kPa}$ / $< 100 \text{ mmHg}$)*

---
*Built for educational and examination preparation purposes.*
