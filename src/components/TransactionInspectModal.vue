<template>
  <div v-if="state.inspectedTx" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
    <div class="bg-[#161616] border border-[#0f62fe]/60 rounded-lg max-w-2xl w-full p-6 shadow-2xl shadow-[#0f62fe]/20 relative tech-corners">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-[#0f62fe]/20 border border-[#0f62fe]/40 flex items-center justify-center text-lg">
            🔍
          </div>
          <div>
            <h3 class="text-base font-bold font-mono text-white flex items-center gap-2">
              <span>{{ t.inspectModalTitle }}</span>
              <span class="text-xs text-[#42beef] font-normal">[{{ state.inspectedTx.id }}]</span>
            </h3>
            <p class="text-xs text-[#8d8d8d] font-mono">
              {{ state.inspectedTx.time }} • {{ state.inspectedTx.cryptoProtocol }}
            </p>
          </div>
        </div>

        <button 
          @click="closeModal" 
          class="text-[#8d8d8d] hover:text-white p-1 rounded hover:bg-[#262626] font-mono text-lg transition-colors"
        >
          ✕
        </button>
      </div>

      <!-- Core Transaction Summary -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 font-mono text-xs">
        <div class="bg-[#111111] p-2.5 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px] uppercase">Bank / Gateway</span>
          <span class="text-white font-bold">{{ state.lang === 'ja' ? state.inspectedTx.bankJa : state.inspectedTx.bankEn }}</span>
        </div>
        <div class="bg-[#111111] p-2.5 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px] uppercase">Amount (JPY)</span>
          <span class="text-[#42beef] font-bold">¥{{ state.inspectedTx.amountJpy.toLocaleString() }}</span>
        </div>
        <div class="bg-[#111111] p-2.5 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px] uppercase">Telum Score</span>
          <span class="font-bold" :class="state.inspectedTx.score >= state.fraudThreshold ? 'text-[#fa4d56]' : 'text-[#42be65]'">
            {{ state.inspectedTx.score }} / 100
          </span>
        </div>
        <div class="bg-[#111111] p-2.5 rounded border border-[#262626]">
          <span class="text-[#8d8d8d] block text-[10px] uppercase">AI Inference Time</span>
          <span class="text-[#42be65] font-bold">{{ state.inspectedTx.telumInferenceMs }} ms</span>
        </div>
      </div>

      <!-- Explainable AI (XAI) Feature Attribution -->
      <div class="bg-[#111111] border border-[#262626] rounded p-4 mb-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-xs font-mono font-bold text-white flex items-center gap-2">
            <span class="text-[#8a3ffc]">■</span> {{ t.xaiExplainability }} (Shapley Values)
          </h4>
          <span class="text-[10px] font-mono text-[#8a3ffc]">IBM Telum On-Chip Neural Engine</span>
        </div>

        <div class="space-y-2.5 font-mono text-xs">
          
          <!-- Factor 1: Geo-velocity -->
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-[#8d8d8d]">{{ t.geoVelocity }} ({{ state.inspectedTx.location }})</span>
              <span class="font-bold" :class="state.inspectedTx.factors.geoVelocity > 50 ? 'text-[#fa4d56]' : 'text-[#8d8d8d]'">
                +{{ state.inspectedTx.factors.geoVelocity }}%
              </span>
            </div>
            <div class="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div class="bg-[#fa4d56] h-full rounded-full transition-all" :style="{ width: state.inspectedTx.factors.geoVelocity + '%' }"></div>
            </div>
          </div>

          <!-- Factor 2: Device Risk -->
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-[#8d8d8d]">{{ t.deviceRisk }}</span>
              <span class="font-bold" :class="state.inspectedTx.factors.deviceRisk > 50 ? 'text-[#fa4d56]' : 'text-[#8d8d8d]'">
                +{{ state.inspectedTx.factors.deviceRisk }}%
              </span>
            </div>
            <div class="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div class="bg-[#f1c21b] h-full rounded-full transition-all" :style="{ width: state.inspectedTx.factors.deviceRisk + '%' }"></div>
            </div>
          </div>

          <!-- Factor 3: Amount Deviation -->
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-[#8d8d8d]">{{ t.amountDeviation }}</span>
              <span class="font-bold" :class="state.inspectedTx.factors.amountDeviation > 50 ? 'text-[#fa4d56]' : 'text-[#8d8d8d]'">
                +{{ state.inspectedTx.factors.amountDeviation }}%
              </span>
            </div>
            <div class="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div class="bg-[#0f62fe] h-full rounded-full transition-all" :style="{ width: state.inspectedTx.factors.amountDeviation + '%' }"></div>
            </div>
          </div>

        </div>

        <!-- AI Diagnostic Natural Language Reason -->
        <div class="mt-4 p-2.5 rounded bg-[#161616] border border-[#262626] text-xs font-mono text-[#f4f4f4]">
          <span class="text-[#fa4d56] font-bold">AI Flag Reason:</span>
          {{ state.lang === 'ja' ? state.inspectedTx.flagReasonJa : state.inspectedTx.flagReasonEn }}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between pt-2">
        <button 
          @click="overrideTransaction"
          class="px-3 py-1.5 bg-[#262626] hover:bg-[#393939] border border-[#393939] text-[#f4f4f4] rounded text-xs font-mono transition-colors"
        >
          {{ t.overrideBlock }}
        </button>

        <div class="flex items-center gap-2 font-mono text-xs">
          <button 
            @click="quarantineAccount"
            class="px-3.5 py-1.5 bg-[#fa4d56]/20 hover:bg-[#fa4d56]/30 border border-[#fa4d56] text-[#fa4d56] rounded font-semibold transition-colors"
          >
            {{ t.quarantineAccount }}
          </button>
          <button 
            @click="closeModal" 
            class="px-4 py-1.5 bg-[#0f62fe] hover:bg-[#0043ce] text-white rounded font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { state, t } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

function closeModal() {
  state.inspectedTx = null
  sound.playClick()
}

function overrideTransaction() {
  if (state.inspectedTx) {
    state.inspectedTx.status = 'approved'
    state.inspectedTx.score = 25
    sound.playSuccess()
    closeModal()
  }
}

function quarantineAccount() {
  if (state.inspectedTx) {
    state.inspectedTx.status = 'blocked'
    sound.playAlert()
    closeModal()
  }
}
</script>
