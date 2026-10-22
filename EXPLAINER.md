# 🚀 IBM Z Mission Control — System Explainer & Architecture Guide

## Overview

**IBM Z Mission Control** is a next-generation command center and simulation environment designed for mainframe enterprise architects, systems programmers, and IT executives from Japan. It demonstrates the operational reality of running mission-critical core banking workloads on **IBM z17™** equipped with **IBM Telum II Processors** and the newly announced **IBM Spyre™ Accelerator Card cluster**.

---

## 🏛️ System Architecture: The IBM z17 Dual-Tier AI Paradigm

Modern banking operations require two distinct AI workloads to run simultaneously without compromising 99.99999% ("seven nines") continuous availability SLAs:

```
+----------------------------------------------------------------------------------------------------+
|                                    IBM z17™ ENTERPRISE FRAME                                       |
|                                                                                                    |
|  +--------------------------------------------+    +--------------------------------------------+  |
|  |     TIER 1: IN-FLIGHT TRANSACTIONAL AI     |    |    TIER 2: GENERATIVE AI & FOUNDATION      |  |
|  |       (IBM Telum II Processor Silicon)     |    |      (IBM Spyre™ PCIe Accelerator Cards)   |  |
|  |                                            |    |                                            |  |
|  |  • 8 High-Performance Cores @ 5.50 GHz     |    |  • 32 Specialized AI Cores per Card        |  |
|  |  • 32MB Private L2 Cache per Core          |    |  • 75W Ultra-Low Power PCIe Form Factor    |  |
|  |  • Integrated On-Chip Neural Accelerator   |    |  • Clustered Drawer (up to 24–48 Cards)    |  |
|  |  • Direct 256MB Virtual L3/L4 Cache Access |    |  • watsonx for z/OS Generative Models      |  |
|  |  • < 0.8ms Sub-millisecond Inference SLA   |    |  • Multi-Modal Ensemble Fraud Analysis     |  |
|  |  • 100% In-Flight Fraud Prevention         |    |  • Automated JCL / Code Assistant          |  |
|  +--------------------------------------------+    +--------------------------------------------+  |
|                                           |            |                                           |
|                                           v            v                                           |
|                           +------------------------------------+                                   |
|                           |      z/OS® 3.1 WORKLOAD MANAGER    |                                   |
|                           |   (Intelligent AI Dispatch Engine) |                                   |
|                           +------------------------------------+                                   |
|                                           |                                                        |
|                                           v                                                        |
|       +----------------------------------------------------------------------------+               |
|       |                     JAPANESE SOCIAL & BANKING RAILS                        |               |
|       |  • 全銀ネット (Zengin Net)        • CAFIS (Card & ATM Gateway)             |               |
|       |  • 日銀ネット (BOJ-NET RTGS)      • Megabank Core Accounts (CICS/Db2 13)   |               |
|       +----------------------------------------------------------------------------+               |
+----------------------------------------------------------------------------------------------------+
```

### 1. Tier 1: Low-Latency Transactional AI (IBM Telum II)
* **On-Chip Neural Accelerator:** Built directly onto the 5.5 GHz microprocessor die with direct interconnects to the 256MB virtual cache.
* **Zero PCIe Bus Penalty:** Eliminates off-chip latency ($<1.0\text{ms}$ total roundtrip), allowing **100% of payment transactions to be evaluated before settlement**.
* **Workload:** High-frequency binary/risk classification, inline fraud scoring, AML velocity screening.

### 2. Tier 2: Foundation Models & Generative AI (IBM Spyre™ Accelerator)
* **32-Core Accelerator per Card:** Tailored compute tiles optimized for INT8/FP16 matrix math and deep neural networks at only 75W.
* **Clustered Scalability:** Up to 24–48 Spyre cards installed across IBM z17 PCIe drawers delivering hundreds of TeraFLOPS of private, sovereign AI.
* **Workload:** Generative IT operations (watsonx for z/OS), natural language incident diagnostics, automated JCL synthesis, complex multi-modal graph embeddings, and ensemble scoring.

---

## 🇯🇵 Japan Spotlight & Dual-Active GDPS Topology

```
+-----------------------------------------------------------------------------------------------+
|                            TOKYO PARALLEL SYSPLEX ARCHITECTURE                                |
|                                                                                               |
|     +-------------------------------+                  +-------------------------------+      |
|     |     DATA CENTER 1: TOKYO      |                  |    DATA CENTER 2: MAKUHARI    |      |
|     |  (Chiyoda-ku / 大手町 DC)     |                  |       (Chiba / 幕張 DC)       |      |
|     |                               |                  |                               |      |
|     |  • IBM z17 Primary Active     |  <============>  |  • IBM z17 Secondary Active   |      |
|     |  • Coupling Facility CF01     |    35km Fiber    |  • Coupling Facility CF02     |      |
|     |  • CICS01A / IMSPROD1 / Db2   |   0.082ms Sync   |  • CICS02B / IMSPROD2 / Db2   |      |
|     |  • 24x IBM Spyre AI Cards     |   PPRC Mirror    |  • 24x IBM Spyre AI Cards     |      |
|     +-------------------------------+                  +-------------------------------+      |
|                                              |                                                |
|                                              v                                                |
|                     +--------------------------------------------------+                      |
|                     |            GDPS® METRO HYPERSWAP ENGINE          |                      |
|                     |        Zero Data Loss (RPO=0) / RTO < 1 sec      |                      |
|                     +--------------------------------------------------+                      |
+-----------------------------------------------------------------------------------------------+
```

The application simulates the real-world infrastructure connecting Japan's financial center:
1. **全銀システム (Zengin Net):** Real-time funds transfer clearing for 1,100+ Japanese financial institutions ($42,800\text{ TPS}$).
2. **CAFIS:** Nationwide card and ATM transaction gateway ($38,200\text{ TPS}$).
3. **日銀ネット (BOJ-NET):** Bank of Japan Real-Time Gross Settlement system settling over $¥140\text{ Trillion}$ daily.
4. **Megabank Core Engines (メガバンク勘定系):** CICS, IMS, and Db2 13 for z/OS managing over 120 million active retail and corporate accounts.

---

## 🛡️ Real-Time Explainable AI (XAI) & Fraud Prevention

When a transaction is flagged by the Telum II + Spyre ensemble pipeline:
1. **In-Flight Evaluation:** The transaction is scored in $0.72\text{ms}$.
2. **Shapley Feature Attribution:** The Explainable AI modal breaks down exact risk contributors:
   * **Geo-Velocity Anomaly:** Detects impossible transit velocities (e.g. London proxy access 4 minutes after Tokyo ATM tap).
   * **Device Fingerprint Risk:** Unregistered hardware signature or suspicious SIM-swap velocity.
   * **Amount Standard Deviation:** Deviations exceeding $>4\sigma$ from customer historical profiles.
   * **Time & Channel Anomalies:** Nocturnal ATM cash withdrawals.
3. **Autonomous Action:** Transactions exceeding the interactive risk threshold (default 75/100) are blocked inline, preventing loss without human bottleneck.

---

## 🤖 watsonx Assistant for z/OS (Generative AIOps)

Powered by the **IBM Spyre Accelerator**, the built-in conversational AI assistant:
* **Understands Mainframe Dialects:** Contextual knowledge of z/OS console commands (`D IPLINFO`, `D WLM`, `D GRS,C`, `D XCF`).
* **Generates Valid JCL:** Formats job control language scripts for capacity reallocation and CICS service class importance tuning.
* **Interactive Remediation:** Clicking *"Execute Autonomous Action"* directly dispatches healing commands to the live simulation.

---

## ⚡ Chaos Engineering Simulator

Mainframe architects can test system resilience by injecting 5 real-world stress scenarios:
* 📈 **500k TPS Flash Crowd:** Verifies WLM dynamic dispatching and Spyre AI thread pooling.
* 💳 **Coordinated ATM Fraud Attack:** Tests inline Telum II + Spyre ensemble blocking.
* ⚡ **Otemachi Substation Power Glitch:** Triggers $40\mu\text{s}$ GDPS Metro HyperSwap to Makuhari DC with zero transaction loss ($RPO=0$).
* 🛡️ **Quantum Decryption Attempt:** Rotates FICON trunks to NIST FIPS 203 (ML-KEM / Kyber-1024) and FIPS 204 (ML-DSA / Dilithium) lattice cryptography.
* 🟢 **AI Autonomous Self-Healing:** Demonstrates automated recovery and SLA stabilization.

---

## 🛠️ Technology Stack

* **Framework:** Vue 3 (Composition API `<script setup>`)
* **Visualizations:** Apache ECharts 5 (Time series, Confidence interval bands, Histograms, Gauges)
* **Styling:** IBM Carbon Design System dark theme (`#0f62fe`, `#161616`, `#262626`, `#42beef`, `#111111`) + Tailwind CSS
* **Typography:** IBM Plex Sans, IBM Plex Sans JP, IBM Plex Mono
* **Audio Synthesis:** Web Audio API procedural sound synthesizer (zero external audio files)
* **State Management:** Reactive simulation store with bilingual English / 日本語 dictionary
* **Confetti Engine:** Canvas-confetti for incident resolution celebrations
