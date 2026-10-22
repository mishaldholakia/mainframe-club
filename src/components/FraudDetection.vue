<template>
  <div class="space-y-6">
    
    <!-- Title & Status Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#fa4d56] animate-pulse"></span>
          <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
            {{ t.fraudTitle }}
          </h2>
        </div>
        <p class="text-xs text-[#8d8d8d] mt-0.5">
          {{ t.fraudSubtitle }}
        </p>
      </div>

      <!-- Quick Action: Trigger Fraud Wave Simulation -->
      <button 
        @click="triggerFraudAttack"
        class="px-3.5 py-1.5 bg-[#fa4d56]/15 hover:bg-[#fa4d56]/25 border border-[#fa4d56]/40 text-[#fa4d56] rounded font-mono text-xs font-semibold flex items-center gap-2 transition-all"
      >
        <span>⚡</span>
        <span>{{ state.lang === 'ja' ? '不正攻撃シナリオを注入' : 'Simulate Coordinated Fraud Wave' }}</span>
      </button>
    </div>

    <!-- KPI Metrics Strip -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Blocked Count -->
      <div class="bg-[#111111] border border-[#262626] rounded p-3.5">
        <span class="text-[11px] font-mono text-[#8d8d8d] uppercase">{{ t.fraudStatsBlocked }}</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-mono font-bold text-[#fa4d56] text-glow-alert">
            {{ state.metrics.fraudBlockedToday.toLocaleString() }}
          </span>
          <span class="text-xs text-[#8d8d8d]">tx</span>
        </div>
        <div class="text-[10px] text-[#42be65] font-mono mt-1">
          100% Autonomous Inline Block
        </div>
      </div>

      <!-- Prevented JPY Amount -->
      <div class="bg-[#111111] border border-[#262626] rounded p-3.5">
        <span class="text-[11px] font-mono text-[#8d8d8d] uppercase">{{ t.fraudAmountPrevented }}</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-mono font-bold text-white text-glow-cyan">
            ¥{{ (state.metrics.fraudPreventedJpy / 100000000).toFixed(2) }}億円
          </span>
        </div>
        <div class="text-[10px] text-[#8d8d8d] font-mono mt-1">
          Approx. ${{ ((state.metrics.fraudPreventedJpy / 150) / 1000000).toFixed(1) }}M USD
        </div>
      </div>

      <!-- Telum AI Inference Speed -->
      <div class="bg-[#111111] border border-[#262626] rounded p-3.5">
        <span class="text-[11px] font-mono text-[#8d8d8d] uppercase">{{ t.fraudAvgInference }}</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-mono font-bold text-[#42be65] text-glow-success">
            {{ state.metrics.telumInferenceTime }}
          </span>
          <span class="text-xs text-[#8d8d8d]">ms / tx</span>
        </div>
        <div class="text-[10px] text-[#42beef] font-mono mt-1">
          On-Chip L2 Direct Interconnect
        </div>
      </div>

      <!-- Accuracy / Precision -->
      <div class="bg-[#111111] border border-[#262626] rounded p-3.5">
        <span class="text-[11px] font-mono text-[#8d8d8d] uppercase">{{ t.fraudAccuracy }}</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-mono font-bold text-white">
            {{ state.metrics.fraudPrecision }}%
          </span>
        </div>
        <div class="text-[10px] text-[#42be65] font-mono mt-1">
          False Positive Rate: &lt; 0.001%
        </div>
      </div>

    </div>

    <!-- Interactive AI Sensitivity Slider Panel -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
            <span class="text-[#0f62fe]">⚙</span>
            {{ t.fraudThreshold }}
          </h3>
          <p class="text-[11px] text-[#8d8d8d]">
            {{ state.lang === 'ja' ? 'Telum II 深層学習モデルの判定カットオフ値を動的調整 (推奨: 75)' : 'Dynamic threshold for blocking vs human step-up review (Optimal: 75)' }}
          </p>
        </div>
        <div class="flex items-center gap-2 font-mono">
          <span class="text-xs text-[#8d8d8d]">Threshold:</span>
          <span class="px-2.5 py-0.5 rounded bg-[#0f62fe] text-white font-bold text-sm">
            {{ state.fraudThreshold }} / 100
          </span>
        </div>
      </div>

      <!-- Range Slider -->
      <div class="flex items-center gap-4">
        <span class="text-xs font-mono text-[#42be65]">50 (High Recall)</span>
        <input 
          type="range" 
          min="50" 
          max="95" 
          v-model.number="state.fraudThreshold"
          class="w-full h-2 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#0f62fe]"
          @input="onThresholdChange"
        />
        <span class="text-xs font-mono text-[#fa4d56]">95 (Conservative)</span>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#262626] text-center font-mono text-xs">
        <div class="text-[#42be65]">
          Score 0-49: <span class="font-bold">{{ state.lang === 'ja' ? '即時承認' : 'Instant Approve' }}</span>
        </div>
        <div class="text-[#f1c21b]">
          Score 50-{{ state.fraudThreshold - 1 }}: <span class="font-bold">{{ state.lang === 'ja' ? '2要素認証追加' : 'Step-up MFA' }}</span>
        </div>
        <div class="text-[#fa4d56]">
          Score {{ state.fraudThreshold }}-100: <span class="font-bold">{{ state.lang === 'ja' ? 'インフライト即時遮断' : 'Inline Auto-Block' }}</span>
        </div>
      </div>
    </div>

    <!-- Live Scored Transaction Stream Table -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4">
      <div class="flex items-center justify-between mb-3 pb-2 border-b border-[#262626]">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#fa4d56] animate-ping"></span>
          <h3 class="text-sm font-mono font-bold text-white">
            {{ state.lang === 'ja' ? 'Telum AI リアルタイム取引評価ストリーム' : 'Real-time Telum AI Scoring Pipeline' }}
          </h3>
        </div>
        <span class="text-xs font-mono text-[#8d8d8d]">
          {{ state.lang === 'ja' ? '各行をクリックして XAI（説明可能AI）要因分析を表示' : 'Click any transaction to open XAI Factor Breakdown' }}
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left font-mono text-xs">
          <thead>
            <tr class="text-[#8d8d8d] border-b border-[#262626] bg-[#111111]">
              <th class="p-2.5">TX ID</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '時刻' : 'Time' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '発生チャネル' : 'Channel' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '地域 / 端末' : 'Location' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '決済金額' : 'Amount' }}</th>
              <th class="p-2.5">{{ t.fraudScore }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? 'AI判定' : 'Action' }}</th>
              <th class="p-2.5 text-right">{{ state.lang === 'ja' ? 'XAI要因' : 'Diagnostics' }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#262626]">
            <tr 
              v-for="tx in state.transactions" 
              :key="tx.id"
              class="hover:bg-[#262626]/60 transition-colors cursor-pointer"
              :class="tx.status === 'blocked' ? 'bg-[#fa4d56]/5' : ''"
              @click="inspectTx(tx)"
            >
              <td class="p-2.5 text-[#42beef] font-semibold">{{ tx.id }}</td>
              <td class="p-2.5 text-[#8d8d8d]">{{ tx.time }}</td>
              <td class="p-2.5 text-white font-medium">
                {{ state.lang === 'ja' ? tx.channelJa : tx.channelEn }}
              </td>
              <td class="p-2.5 text-[#8d8d8d]">
                {{ tx.location }}
              </td>
              <td class="p-2.5 font-bold text-white">
                ¥{{ tx.amountJpy.toLocaleString() }}
              </td>
              <td class="p-2.5">
                <div class="flex items-center gap-2">
                  <div class="w-16 bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full transition-all duration-300"
                      :class="tx.score >= state.fraudThreshold ? 'bg-[#fa4d56]' : (tx.score > 50 ? 'bg-[#f1c21b]' : 'bg-[#42be65]')"
                      :style="{ width: tx.score + '%' }"
                    ></div>
                  </div>
                  <span class="font-bold" :class="tx.score >= state.fraudThreshold ? 'text-[#fa4d56]' : (tx.score > 50 ? 'text-[#f1c21b]' : 'text-[#42be65]')">
                    {{ tx.score }}
                  </span>
                </div>
              </td>
              <td class="p-2.5">
                <span 
                  v-if="tx.status === 'blocked'" 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#fa4d56]/20 text-[#fa4d56] border border-[#fa4d56]/40 font-bold flex items-center gap-1 w-max"
                >
                  <span>✕</span> {{ state.lang === 'ja' ? '自動遮断' : 'BLOCKED' }}
                </span>
                <span 
                  v-else-if="tx.status === 'review'" 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#f1c21b]/20 text-[#f1c21b] border border-[#f1c21b]/40 font-semibold flex items-center gap-1 w-max"
                >
                  <span>⚠</span> {{ state.lang === 'ja' ? '追加認証' : 'STEP-UP' }}
                </span>
                <span 
                  v-else 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#42be65]/20 text-[#42be65] border border-[#42be65]/40 flex items-center gap-1 w-max"
                >
                  <span>✓</span> {{ state.lang === 'ja' ? '承認' : 'PASS' }}
                </span>
              </td>
              <td class="p-2.5 text-right">
                <button 
                  class="px-2.5 py-1 bg-[#111111] hover:bg-[#0f62fe] border border-[#262626] hover:border-[#42beef] text-[#f4f4f4] rounded text-[11px] transition-all"
                  @click.stop="inspectTx(tx)"
                >
                  {{ state.lang === 'ja' ? 'XAI要因分析' : 'XAI Factors' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { state, t, injectScenario } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

function inspectTx(tx) {
  state.inspectedTx = tx
  sound.playClick()
}

function onThresholdChange() {
  sound.playBeep(880, 0.04)
}

function triggerFraudAttack() {
  injectScenario('fraud')
}
</script>
