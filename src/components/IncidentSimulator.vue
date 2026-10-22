<template>
  <div class="space-y-6">
    
    <!-- Title Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-[#fa4d56]/15 border border-[#fa4d56]/40 flex items-center justify-center text-xl">
          ⚡
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
              {{ t.incidentTitle }}
            </h2>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-[#fa4d56]/20 text-[#fa4d56] border border-[#fa4d56]/40 font-semibold">
              CHAOS ENGINE
            </span>
          </div>
          <p class="text-xs text-[#8d8d8d] mt-0.5">
            {{ t.incidentSubtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 font-mono text-xs">
        <span v-if="state.activeScenario" class="px-3 py-1 bg-[#fa4d56] text-white font-bold rounded animate-pulse">
          {{ state.lang === 'ja' ? '障害注入中' : 'Chaos Active' }}
        </span>
        <span v-else class="px-3 py-1 bg-[#42be65]/20 text-[#42be65] border border-[#42be65]/40 rounded font-semibold">
          {{ state.lang === 'ja' ? 'システム安定' : 'System Stable' }}
        </span>
      </div>
    </div>

    <!-- Active Incident Telemetry HUD (Shown when scenario is active) -->
    <div v-if="state.activeScenario" class="bg-[#fa4d56]/10 border-2 border-[#fa4d56] rounded-lg p-5 shadow-2xl shadow-[#fa4d56]/20 relative overflow-hidden animate-glow-pulse">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#fa4d56]/30">
        <div>
          <span class="text-xs font-mono uppercase text-[#fa4d56] font-bold tracking-wider">
            🚨 {{ t.activeImpact }}
          </span>
          <h3 class="text-lg font-mono font-bold text-white mt-1">
            {{ getScenarioTitle(state.activeScenario) }}
          </h3>
          <p class="text-xs text-[#f4f4f4] mt-1 font-mono">
            {{ getScenarioDesc(state.activeScenario) }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-right font-mono">
            <span class="text-[10px] text-[#8d8d8d] uppercase block">Auto-Remediate in</span>
            <span class="text-2xl font-bold text-[#fa4d56]">{{ state.incidentTimeRemaining }}s</span>
          </div>
          <button 
            @click="triggerHeal"
            class="px-4 py-2.5 bg-[#42be65] hover:bg-[#42be65]/80 text-black font-bold font-mono text-xs rounded transition-all shadow-lg"
          >
            {{ state.lang === 'ja' ? '即時自律復旧を実行' : 'Trigger Immediate Self-Healing' }}
          </button>
        </div>
      </div>

      <!-- Live Remediation Stage Progression -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
        <div class="bg-[#111111]/80 p-3 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px]">STAGE 1: ANOMALY DETECTION</span>
          <span class="text-[#42be65] font-bold">✓ 0.04ms Telum AI Signature Match</span>
        </div>
        <div class="bg-[#111111]/80 p-3 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px]">STAGE 2: WLM DYNAMIC REBALANCE</span>
          <span class="text-[#42beef] font-bold animate-pulse">⟳ Dispatching 128 zIIP Engines</span>
        </div>
        <div class="bg-[#111111]/80 p-3 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px]">STAGE 3: GDPS CONTINUOUS AVAILABILITY</span>
          <span class="text-[#42be65] font-bold">✓ Zero Data Loss (RPO=0)</span>
        </div>
      </div>
    </div>

    <!-- Chaos Scenarios Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Scenario 1: Flash Crowd Spike -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded p-5 flex flex-col justify-between transition-all group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#42beef] flex items-center gap-1.5">
              <span>📈</span> {{ t.scenarioSpike }}
            </span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#0f62fe]/20 text-[#42beef] rounded font-semibold">HIGH LOAD</span>
          </div>
          <p class="text-xs text-[#8d8d8d] mb-4 leading-relaxed">
            {{ t.scenarioSpikeDesc }}
          </p>
        </div>
        <button 
          @click="startScenario('spike')"
          class="w-full py-2 bg-[#111111] group-hover:bg-[#0f62fe] border border-[#262626] group-hover:border-[#42beef] text-white font-mono text-xs font-semibold rounded transition-all flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>{{ t.injectChaos }}</span>
        </button>
      </div>

      <!-- Scenario 2: Coordinated Fraud Wave -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#fa4d56] rounded p-5 flex flex-col justify-between transition-all group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#fa4d56] flex items-center gap-1.5">
              <span>💳</span> {{ t.scenarioFraud }}
            </span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#fa4d56]/20 text-[#fa4d56] rounded font-semibold">SECURITY</span>
          </div>
          <p class="text-xs text-[#8d8d8d] mb-4 leading-relaxed">
            {{ t.scenarioFraudDesc }}
          </p>
        </div>
        <button 
          @click="startScenario('fraud')"
          class="w-full py-2 bg-[#111111] group-hover:bg-[#fa4d56] border border-[#262626] group-hover:border-[#fa4d56] text-white font-mono text-xs font-semibold rounded transition-all flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>{{ t.injectChaos }}</span>
        </button>
      </div>

      <!-- Scenario 3: Otemachi Substation Glitch -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#f1c21b] rounded p-5 flex flex-col justify-between transition-all group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#f1c21b] flex items-center gap-1.5">
              <span>⚡</span> {{ t.scenarioPower }}
            </span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#f1c21b]/20 text-[#f1c21b] rounded font-semibold">FAILOVER</span>
          </div>
          <p class="text-xs text-[#8d8d8d] mb-4 leading-relaxed">
            {{ t.scenarioPowerDesc }}
          </p>
        </div>
        <button 
          @click="startScenario('power')"
          class="w-full py-2 bg-[#111111] group-hover:bg-[#f1c21b] group-hover:text-black border border-[#262626] group-hover:border-[#f1c21b] text-white font-mono text-xs font-semibold rounded transition-all flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>{{ t.injectChaos }}</span>
        </button>
      </div>

      <!-- Scenario 4: Post-Quantum Decryption Attack -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#8a3ffc] rounded p-5 flex flex-col justify-between transition-all group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#8a3ffc] flex items-center gap-1.5">
              <span>🛡️</span> {{ t.scenarioCrypto }}
            </span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#8a3ffc]/20 text-[#8a3ffc] rounded font-semibold">QUANTUM SAFE</span>
          </div>
          <p class="text-xs text-[#8d8d8d] mb-4 leading-relaxed">
            {{ t.scenarioCryptoDesc }}
          </p>
        </div>
        <button 
          @click="startScenario('crypto')"
          class="w-full py-2 bg-[#111111] group-hover:bg-[#8a3ffc] border border-[#262626] group-hover:border-[#8a3ffc] text-white font-mono text-xs font-semibold rounded transition-all flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>{{ t.injectChaos }}</span>
        </button>
      </div>

    </div>

    <!-- AI Self-Healing Master Action Card -->
    <div class="bg-gradient-to-r from-[#0043ce]/30 via-[#111111] to-[#0f62fe]/20 border border-[#0f62fe]/50 rounded p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-base font-mono font-bold text-white flex items-center gap-2">
          <span>🟢</span> {{ t.scenarioHeal }}
        </h3>
        <p class="text-xs text-[#8d8d8d] mt-1 max-w-2xl leading-relaxed">
          {{ t.scenarioHealDesc }}
        </p>
      </div>
      <button 
        @click="triggerHeal"
        class="px-5 py-2.5 bg-[#42be65] hover:bg-[#42be65]/80 text-black font-bold font-mono text-xs rounded transition-all shadow-lg shrink-0"
      >
        {{ state.lang === 'ja' ? '自律修復トリガーを実行' : 'Execute Autonomous Healing' }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { state, t, injectScenario, resolveScenario } from '../stores/simulation.js'

function startScenario(id) {
  injectScenario(id)
}

function triggerHeal() {
  resolveScenario()
}

function getScenarioTitle(id) {
  if (id === 'spike') return t.value.scenarioSpike
  if (id === 'fraud') return t.value.scenarioFraud
  if (id === 'power') return t.value.scenarioPower
  if (id === 'crypto') return t.value.scenarioCrypto
  return id
}

function getScenarioDesc(id) {
  if (id === 'spike') return t.value.scenarioSpikeDesc
  if (id === 'fraud') return t.value.scenarioFraudDesc
  if (id === 'power') return t.value.scenarioPowerDesc
  if (id === 'crypto') return t.value.scenarioCryptoDesc
  return ''
}
</script>
