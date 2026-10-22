<template>
  <div class="min-h-screen bg-[#0a0a0c] text-[#f4f4f4] flex flex-col font-sans selection:bg-[#0f62fe] selection:text-white relative">
    
    <!-- Top Nav Header -->
    <HeaderNav />

    <!-- Global KPIs Strip -->
    <GlobalMetricsBar />

    <!-- Navigation Tabs Bar -->
    <div class="bg-[#111111] border-b border-[#262626] px-4 lg:px-6 sticky top-16 z-40">
      <div class="max-w-[1920px] mx-auto flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
        
        <!-- Tab 1: Global Operations -->
        <button 
          @click="switchTab('global')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'global' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>🌐</span>
          <span>{{ t.tabGlobal }}</span>
        </button>

        <!-- Tab 2: Japan Spotlight -->
        <button 
          @click="switchTab('japan')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'japan' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>🗼</span>
          <span>{{ t.tabJapan }}</span>
          <span class="px-1.5 py-0.2 text-[9px] bg-[#42be65]/20 text-[#42be65] rounded font-semibold border border-[#42be65]/40">TOKYO</span>
        </button>

        <!-- Tab 3: Realtime Telemetry -->
        <button 
          @click="switchTab('telemetry')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'telemetry' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>📊</span>
          <span>{{ t.tabTelemetry }}</span>
        </button>

        <!-- Tab 4: AI Fraud Detection -->
        <button 
          @click="switchTab('fraud')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'fraud' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>🛡️</span>
          <span>{{ t.tabFraud }}</span>
          <span class="px-1.5 py-0.2 text-[9px] bg-[#fa4d56]/20 text-[#fa4d56] rounded font-semibold border border-[#fa4d56]/40">TELUM AI</span>
        </button>

        <!-- Tab 5: AI Operations Assistant -->
        <button 
          @click="switchTab('aiops')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'aiops' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>🤖</span>
          <span>{{ t.tabAiOps }}</span>
        </button>

        <!-- Tab 6: Incident Simulator -->
        <button 
          @click="switchTab('simulator')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'simulator' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>⚡</span>
          <span>{{ t.tabSimulator }}</span>
          <span v-if="state.activeScenario" class="w-2 h-2 rounded-full bg-[#fa4d56] animate-ping"></span>
        </button>

        <!-- Tab 7: z17 & Spyre Hardware -->
        <button
          @click="switchTab('hardware')"
          :class="['px-3.5 py-2 rounded text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all border', state.activeTab === 'hardware' ? 'bg-[#0f62fe] border-[#42beef] text-white shadow-[0_0_12px_rgba(15,98,254,0.4)]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d] hover:text-white hover:border-[#393939]']"
        >
          <span>🔬</span>
          <span>{{ t.tabHardware }}</span>
          <span class="px-1.5 py-0.2 text-[9px] bg-[#8a3ffc]/20 text-[#8a3ffc] rounded font-semibold border border-[#8a3ffc]/40">SPYRE™</span>
        </button>

      </div>
    </div>

    <!-- Main Dynamic Content Workspace -->
    <main class="flex-1 max-w-[1920px] w-full mx-auto p-4 lg:p-6">
      <GlobalMap v-if="state.activeTab === 'global'" />
      <JapanSpotlight v-else-if="state.activeTab === 'japan'" />
      <RealtimeMetrics v-else-if="state.activeTab === 'telemetry'" />
      <FraudDetection v-else-if="state.activeTab === 'fraud'" />
      <AiOpsAssistant v-else-if="state.activeTab === 'aiops'" />
      <IncidentSimulator v-else-if="state.activeTab === 'simulator'" />
      <HardwareTelumExplorer v-else-if="state.activeTab === 'hardware'" />
    </main>

    <!-- Modals -->
    <TransactionInspectModal />
    <SimulationModal />

    <!-- Footer -->
    <footer class="bg-[#111111] border-t border-[#262626] px-4 lg:px-6 py-4 mt-auto text-xs font-mono text-[#8d8d8d]">
      <div class="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="text-[#0f62fe] font-bold">IBM Z® Mission Control</span>
          <span>•</span>
          <span>IBM z17™ (Next-Gen Machine Type 3932)</span>
          <span>•</span>
          <span>z/OS® Version 3 Release 1</span>
          <span>•</span>
          <span class="text-[#42be65]">GDPS® Metro Active</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-[#42beef]">Telum™ II On-Chip AI & IBM Spyre™ PCIe Cards</span>
          <span>•</span>
          <span>NIST Post-Quantum Cryptography</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { state, t, initHistory, tickSimulation } from './stores/simulation.js'
import { sound } from './services/audio.js'

import HeaderNav from './components/HeaderNav.vue'
import GlobalMetricsBar from './components/GlobalMetricsBar.vue'
import GlobalMap from './components/GlobalMap.vue'
import JapanSpotlight from './components/JapanSpotlight.vue'
import RealtimeMetrics from './components/RealtimeMetrics.vue'
import FraudDetection from './components/FraudDetection.vue'
import AiOpsAssistant from './components/AiOpsAssistant.vue'
import IncidentSimulator from './components/IncidentSimulator.vue'
import HardwareTelumExplorer from './components/HardwareTelumExplorer.vue'
import TransactionInspectModal from './components/TransactionInspectModal.vue'
import SimulationModal from './components/SimulationModal.vue'

function switchTab(tabId) {
  state.activeTab = tabId
  sound.playClick()
}

let tickTimer = null

onMounted(() => {
  initHistory()
  // Start simulation loop (every 2 seconds)
  tickTimer = setInterval(() => {
    tickSimulation()
  }, 2000)
})

onUnmounted(() => {
  if (tickTimer) clearInterval(tickTimer)
})
</script>
