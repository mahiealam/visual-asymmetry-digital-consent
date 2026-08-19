# Visual Asymmetry in Digital Consent Interfaces

This repository contains the dataset, experimental code, and analytical pipelines for the manuscript: **"Visual Asymmetry Increases the Behavioral Cost of Exercising Privacy Choices in Digital Consent Interfaces."**

## 📖 Project Overview
This mixed-methods research investigates the deployment and human impact of manipulative consent architectures ("Dark Patterns"). By bridging large-scale computational auditing with high-resolution behavioral tracking, this study explores the "preference-execution gap"—how interface structure can alter the behavioral execution of an explicitly stated privacy preference.

The methodology is divided into two phases:
* **Phase 1 (Computational Audit):** An asynchronous Playwright scraper that extracted DOM/CSS payloads from the Tranco Top 5,000 global domains. Out of 1,190 successfully parsed consent interfaces, the audit identified 84 instances (7.1%) of structural Interface Interference. 
* **Phase 2 (Behavioral Experiment):** A React.js-based controlled environment (N=500) capturing millisecond-level mouse tracking and NASA-TLX psychometric workload. The experiment quantified the cognitive interaction cost imposed by visual asymmetry, demonstrating a severe spike in privacy decision latency (16.55s vs 4.50s) and a drop in task success (50.0% vs 68.8%).

## 📂 Repository Structure

* `/src`: Contains the experimental code and analysis scripts.
  * `App.js`, `bright_pattern.html`, `dark_pattern.html`: The synthetic web environment used for Phase 2.
  * `Pipeline_GIT.ipynb`: The primary Jupyter Notebook containing the statistical models (Logistic Regression, Welch's t-tests, Cohen's d) and dataset compilation.
* `/data`: Contains all anonymized tabular data.
  * `/phase1_computational`: The master scraping dataset, Tranco list, and manual human validation matrices.
  * `/phase2_behavioral`: The participant demographics, PostHog telemetry, and NASA-TLX psychometric survey results.
  * `/analysis_metadata`: Artifact manifests and JSON/MD summaries of the pipeline execution.
* `/figures`: High-resolution PNG and SVG outputs of the spatial heatmaps, violin plots, and task success charts used in the manuscript.
* `/logs`: Pipeline execution logs demonstrating error-free processing.

## 💾 Data Availability & Image Corpus
All tabular data, behavioral telemetry, and statistical outputs are fully available within the `/data` directory of this repository.

**5.2GB Screenshot Corpus:** Due to GitHub file size constraints, the complete dataset of automated cookie banner screenshots generated during the Phase 1 computational audit is hosted externally. It can be accessed and downloaded via Zenodo: 
> `[INSERT YOUR ZENODO/OSF LINK HERE]`

## ⚙️ Reproducibility
To replicate the statistical analyses and figure generation:
1. Clone this repository to your local machine.
2. Ensure you have Python 3.9+ installed along with `pandas`, `numpy`, `scipy`, `statsmodels`, and `seaborn`.
3. Open and run `src/Pipeline_GIT.ipynb`. The notebook is configured to read directly from the `/data` directory and will reproduce all odds ratios, confidence intervals, and p-values reported in the manuscript.

## 📝 License
This project is licensed under the MIT License.
