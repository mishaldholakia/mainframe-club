<template>
  <div class="w-full bg-[#161616]/80 border-b border-[#262626] px-4 lg:px-6 py-2.5">
    <div class="max-w-[1920px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      
      <!-- Metric 1: Global Throughput (TPS) -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">{{ t.totalTps }}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0f62fe]/10 text-[#42beef] border border-[#0f62fe]/30">LIVE</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-white text-glow-cyan tracking-tight">
            {{ state.metrics.tps.toLocaleString() }}
          </span>
          <span class="text-[11px] font-mono text-[#42beef]">TPS</span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] font-mono mt-1">
          <span>Peak: {{ state.metrics.peakTps.toLocaleString() }}</span>
          <span class="text-[#42be65]">+14.2%</span>
        </div>
      </div>

      <!-- Metric 2: Latency (Sub-millisecond) -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">{{ t.avgLatency }}</span>
          <span class="text-[10px] font-mono text-[#42be65] font-semibold">&lt; 1.0ms SLA</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-white tracking-tight" :class="state.metrics.avgLatency > 0.8 ? 'text-[#f1c21b]' : 'text-[#42be65] text-glow-success'">
            {{ state.metrics.avgLatency.toFixed(2) }}
          </span>
          <span class="text-[11px] font-mono text-[#8d8d8d]">ms</span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] font-mono mt-1">
          <span>Tokyo DC: 0.22ms</span>
          <span class="text-[#42be65]">Optimal</span>
        </div>
      </div>

      <!-- Metric 3: Telum AI Inferences Today -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">{{ t.aiInferenceRate }}</span>
          <span class="text-[10px] font-mono px-1 py-0.2 rounded bg-[#8a3ffc]/20 text-[#8a3ffc] border border-[#8a3ffc]/40">100% IN-LINE</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-white tracking-tight">
            {{ formatBillions(state.metrics.totalScoredToday) }}
          </span>
          <span class="text-[11px] font-mono text-[#8a3ffc]">tx/day</span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] font-mono mt-1">
          <span>Telum II: {{ state.metrics.telumInferenceTime }}ms</span>
          <span class="text-[#42beef]">Zero Bus Lag</span>
        </div>
      </div>

      <!-- Metric 4: zIIP Offload Rate -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">zIIP Offload Efficiency</span>
          <span class="text-[10px] font-mono text-[#42be65]">Cost Optimized</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-[#42be65] font-mono tracking-tight">
            {{ state.metrics.ziipUtil.toFixed(1) }}%
          </span>
          <span class="text-[11px] font-mono text-[#8d8d8d]">of DB2/Java</span>
        </div>
        <!-- Progress bar -->
        <div class="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden mt-1.5">
          <div class="bg-[#42be65] h-full rounded-full transition-all duration-500" :style="{ width: state.metrics.ziipUtil + '%' }"></div>
        </div>
      </div>

      <!-- Metric 5: Quantum-Safe Cryptography -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">{{ t.quantumState }}</span>
          <span class="text-[10px] font-mono text-[#42beef]">NIST FIPS</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-white text-glow-blue tracking-tight">
            Kyber-1024
          </span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] font-mono mt-1">
          <span>CryptoExpress 8S</span>
          <span class="text-[#42be65]">100% PQC</span>
        </div>
      </div>

      <!-- Metric 6: Workload Manager (WLM) Goal Achievement -->
      <div class="bg-[#111111] border border-[#262626] hover:border-[#0f62fe]/50 rounded p-2.5 flex flex-col justify-between transition-all group">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-[#8d8d8d] uppercase tracking-wider">{{ t.wlmAchievement }}</span>
          <span class="text-[10px] font-mono text-[#42be65]">AI-Tuned</span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-1">
          <span class="text-xl lg:text-2xl font-mono font-bold text-[#42be65] tracking-tight">
            {{ state.metrics.wlmGoalMet.toFixed(1) }}%
          </span>
          <span class="text-[11px] font-mono text-[#8d8d8d]">SLA</span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] font-mono mt-1">
          <span>Sysplex Contention</span>
          <span class="text-[#42beef]">0.02% (Low)</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { state, t } from '../stores/simulation.js'

function formatBillions(val) {
  if (val > 1000000000) {
    return (val / 1000000000).toFixed(2) + 'B'
  }
  if (val > 1000000) {
    return (val / 1000000).toFixed(1) + 'M'
  }
  return val.toLocaleString()
}
</script>
