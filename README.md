# 🚀 IBM Z Mission Control (次世代メインフレーム AI運用司令センター)

An interactive, futuristic command center web application showcasing the future of **AI-powered mainframe operations** on **IBM z17™** with **Telum II Processors** and **IBM Spyre™ PCIe AI Accelerator Cards**, designed for enterprise architects and mainframe professionals from Japan.

![IBM Z Mission Control](https://img.shields.io/badge/IBM%20z17-Mission%20Control-0f62fe?style=for-the-badge&logo=ibm&logoColor=white)
![IBM Spyre AI](https://img.shields.io/badge/IBM%20Spyre-32%20Core%20PCIe-8a3ffc?style=for-the-badge)
![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![ECharts](https://img.shields.io/badge/Apache-ECharts-e43961?style=for-the-badge&logo=apacheecharts&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Bilingual](https://img.shields.io/badge/Language-日本語%20%7C%20EN-42beef?style=for-the-badge)

---

## 🌟 Key Features

### 1. 🌐 Global Operations Command (`Global Operations / 世界金融オペレーション`)
- **Interactive Global Topology Map**: Real-time connected financial hubs — **Tokyo (東京)**, **New York**, **London**, **Singapore**, **Frankfurt**, and **Sydney**.
- **Laser Arc Telemetry**: Animated transaction particle streams routed into Tokyo's IBM z17 Parallel Sysplex.
- **Node Inspector**: Click any global financial center to inspect local TPS, ping latency, active CICS regions, and Db2 data sharing groups (`DSN1PLEX`).

### 2. 🗼 Tokyo Sysplex & Japan Spotlight (`Tokyo Sysplex / 東京オペレーション`)
- **Otemachi ⇄ Makuhari Dual-Active GDPS Sysplex**: High-speed synchronous fiber link telemetry ($0.082\text{ms}$ coupling lag, $RPO=0$ zero data loss) connecting dual IBM z17 frames.
- **Japanese Critical Banking Infrastructure**:
  - **全銀システム (Zengin Net)**: Domestic interbank funds transfer clearing ($42,800\text{ TPS}$).
  - **CAFIS (NTT DATA)**: Credit card and nationwide ATM settlement gateway ($38,200\text{ TPS}$).
  - **日銀ネット (BOJ-NET)**: Bank of Japan real-time gross settlement ($¥142.8\text{ Trillion/day}$).
  - **Megabank Core Banking (メガバンク勘定系)**: CICS, IMS, and Db2 13 for z/OS core transaction engine.
- **Live Japanese Banking Stream**: Real-time transaction ticker with Japanese Yen ($¥$) amounts, bank names (三菱UFJ, 三井住友, みずほ, ゆうちょ, PayPay銀行, JCB), and instant AI inspection.

### 3. 📊 Real-Time Monitoring & Telemetry (`Real-Time Telemetry / リアルタイム性能監視`)
- Dynamic ECharts refreshing every 2 seconds:
  - **High-Frequency TPS with AI Forecast Bounds**: Real-time throughput against predictive confidence intervals ($95\%\text{ CI}$).
  - **Multi-Engine Core Utilization**: Central Processor (CP), zIIP offload ($98.4\%$), and IBM Spyre AI Accelerator cards.
  - **IBM Telum II & Spyre AI Latency Histogram**: Demonstrates $100\%$ compliance with the $<1.0\text{ms SLA}$.
  - **64TB RAIM Memory & Coupling Facility Contention**: Real-time memory allocation and lock contention rates ($0.02\%$).

### 4. 🛡️ AI Real-Time Fraud Prevention (`AI Fraud Detection / AI不正検知`)
- **IBM Telum II & Spyre On-Chip/PCIe AI Inference**: Evaluates $100\%$ of transactions in-flight without PCIe bus latency ($0.72\text{ms}$).
- **Interactive Risk Threshold Slider**: Live adjustment of model cut-off (50 to 95) with recall vs. false-positive balancing.
- **Explainable AI (XAI) Modal**: Deep-dive Shapley feature attribution analysis (Geo-velocity anomaly, nocturnal ATM withdrawal, device fingerprint risk, amount standard deviation $>4\sigma$).

### 5. 🤖 AI Operations Assistant (`AI Operations Assistant / watsonx for z/OS`)
- Fine-tuned **watsonx for z/OS** generative conversational assistant accelerated by **IBM Spyre Cards** for mainframe systems programmers and capacity planners.
- **Bilingual Prompt Chips**: Instant diagnosis of coupling facilities, Telum II & Spyre AI latency analysis, dynamic JCL generation, and quantum-safe link audits.
- **Autonomous Remediation Trigger**: Action buttons in chat directly apply fixes and trigger system self-healing.

### 6. ⚡ Incident Simulator & Chaos Engineering (`Incident Simulator / 障害・負荷シミュレータ`)
- Inject mission-critical chaos scenarios:
  - 📈 **Flash Crowd (500,000+ TPS)**: Tests WLM dynamic CP dispatching and Spyre AI thread pooling.
  - 💳 **Coordinated ATM Fraud Wave**: Tests Telum II & Spyre real-time ensemble automatic quarantine.
  - ⚡ **Otemachi Substation Power Glitch**: Triggers GDPS Metro HyperSwap to Makuhari DC with zero data loss.
  - 🛡️ **Post-Quantum Cryptanalysis Breach**: Dynamically rotates keys to NIST Kyber-1024 / Dilithium lattice cryptography.
  - 🟢 **AI Autonomous Self-Healing**: Dynamic capacity scaling and recovery countdown with celebration effects.

### 7. 🔬 IBM z17 & Spyre Architecture (`z17 & Spyre Architecture / ハードウェア構造`)
- Interactive silicon die schematic: 8 High-Performance Cores ($5.5\text{ GHz}$), 32MB private L2 caches, 256MB virtual L3/L4 cache, integrated AI accelerator ($6\text{ TFLOPS}$), **IBM Spyre™ 32-core PCIe AI accelerator cards (75W)**, Crypto Express 8S HSM, and 64TB RAIM fault-tolerant memory.

---

## 🎨 Design & Experience

- **IBM Carbon Design System**: Dark theme palette (`#0f62fe`, `#161616`, `#262626`, `#42beef`, `#111111`).
- **Typography**: IBM Plex Sans, IBM Plex Sans JP, and IBM Plex Mono.
- **Procedural Web Audio API Synthesizer**: Authentic sci-fi telemetry beeps, alerts, and chimes with mute toggle.
- **Bilingual Interface**: Seamless 1-click **English / 日本語** language switching.
- **Launch Live Simulation**: Guided briefing modal with instant scenario presets.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ / 20+ / 22+
- npm 9+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/mishaldholakia/mainframe-club.git
cd mainframe-club

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 System Architecture Explainer

See [`EXPLAINER.md`](EXPLAINER.md) for a comprehensive deep-dive into the IBM z17 dual-tier AI architecture, Tokyo Parallel Sysplex topology, and real-time fraud mitigation workflow.

---

## 📜 License

MIT License. Designed for demonstration and educational purposes showcasing IBM Z mainframe technology.
