<template>
  <div v-if="state.showSimModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
    <div class="bg-[#161616] border border-[#0f62fe] rounded-lg max-w-3xl w-full p-6 lg:p-8 shadow-2xl shadow-[#0f62fe]/30 relative tech-corners">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded bg-[#0f62fe]/20 border border-[#0f62fe]/50 flex items-center justify-center text-xl">
            🚀
          </div>
          <div>
            <h3 class="text-lg font-bold font-mono text-white flex items-center gap-2">
              <span class="text-[#0f62fe]">IBM Z</span>
              <span>MISSION CONTROL SIMULATOR</span>
            </h3>
            <p class="text-xs text-[#8d8d8d] font-mono">
              {{ state.lang === 'ja' ? '次世代メインフレーム ライブシミュレーション ブリーフィング' : 'Next-Gen Mainframe Live Operations Briefing' }}
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

      <!-- Briefing Description -->
      <div class="my-5 space-y-3 text-xs font-mono text-[#f4f4f4] leading-relaxed">
        <p>
          {{ state.lang === 'ja' 
            ? '本シミュレータは、IBM z16 および Telum II プロセッサが支える日本の社会金融インフラ（全銀システム、CAFIS、メガバンク勘定系）における、AIリアルタイム不正検知と自律運用の未来を体験できる対話型管制デモです。' 
            : 'Experience the future of AI-powered mainframe operations supporting critical Japanese banking infrastructure (Zengin, CAFIS, Megabank Core Banking) with inline Telum II fraud prevention and autonomous self-healing.' 
          }}
        </p>

        <!-- 3 Feature Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div class="bg-[#111111] p-3 rounded border border-[#262626]">
            <div class="text-[#42beef] font-bold mb-1">⚡ 100% In-Flight AI</div>
            <div class="text-[#8d8d8d] text-[11px]">
              {{ state.lang === 'ja' ? 'すべての取引を1ms以内でAI不正スコアリング' : 'Sub-millisecond inference on every single transaction' }}
            </div>
          </div>

          <div class="bg-[#111111] p-3 rounded border border-[#262626]">
            <div class="text-[#42be65] font-bold mb-1">🗼 Tokyo Dual-DC</div>
            <div class="text-[#8d8d8d] text-[11px]">
              {{ state.lang === 'ja' ? '大手町 ⇄ 幕張 GDPS 無停止フェイルオーバー' : 'Otemachi ⇄ Makuhari GDPS zero-data-loss failover' }}
            </div>
          </div>

          <div class="bg-[#111111] p-3 rounded border border-[#262626]">
            <div class="text-[#8a3ffc] font-bold mb-1">🤖 watsonx for z/OS</div>
            <div class="text-[#8d8d8d] text-[11px]">
              {{ state.lang === 'ja' ? '生成AIによる障害診断とJCL自律生成' : 'Generative AI assistant for sysprog diagnostics' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Launch Presets -->
      <div class="space-y-2 mb-6">
        <span class="text-xs font-mono font-bold text-white block">
          {{ state.lang === 'ja' ? '即時実行シナリオを選択:' : 'Select Simulation Preset:' }}
        </span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
          
          <button 
            @click="launchWithScenario('spike')"
            class="p-3 bg-[#111111] hover:bg-[#0f62fe]/20 border border-[#262626] hover:border-[#0f62fe] rounded text-left transition-all"
          >
            <div class="text-[#42beef] font-bold flex items-center justify-between">
              <span>📈 50万TPS急増スパイク</span>
              <span class="text-[10px] text-[#8d8d8d]">Spike</span>
            </div>
            <div class="text-[11px] text-[#8d8d8d] mt-1">
              {{ state.lang === 'ja' ? 'WLM動的ディスパッチとzIIPオフロードを検証' : 'Test WLM dynamic CP dispatching & zIIP offload' }}
            </div>
          </button>

          <button 
            @click="launchWithScenario('fraud')"
            class="p-3 bg-[#111111] hover:bg-[#fa4d56]/20 border border-[#262626] hover:border-[#fa4d56] rounded text-left transition-all"
          >
            <div class="text-[#fa4d56] font-bold flex items-center justify-between">
              <span>💳 協調型ATM不正攻撃</span>
              <span class="text-[10px] text-[#8d8d8d]">Fraud</span>
            </div>
            <div class="text-[11px] text-[#8d8d8d] mt-1">
              {{ state.lang === 'ja' ? 'Telum AIによる全件リアルタイム自動遮断' : 'Real-time Telum AI inline auto-blocking' }}
            </div>
          </button>

          <button 
            @click="launchWithScenario('power')"
            class="p-3 bg-[#111111] hover:bg-[#f1c21b]/20 border border-[#262626] hover:border-[#f1c21b] rounded text-left transition-all"
          >
            <div class="text-[#f1c21b] font-bold flex items-center justify-between">
              <span>⚡ 大手町変電所瞬低・GDPS切替</span>
              <span class="text-[10px] text-[#8d8d8d]">GDPS</span>
            </div>
            <div class="text-[11px] text-[#8d8d8d] mt-1">
              {{ state.lang === 'ja' ? '40マイクロ秒でのデータ損失ゼロ移行' : 'Zero data loss Metro HyperSwap to Makuhari DC' }}
            </div>
          </button>

          <button 
            @click="launchWithScenario('crypto')"
            class="p-3 bg-[#111111] hover:bg-[#8a3ffc]/20 border border-[#262626] hover:border-[#8a3ffc] rounded text-left transition-all"
          >
            <div class="text-[#8a3ffc] font-bold flex items-center justify-between">
              <span>🛡️ 耐量子暗号ローテーション</span>
              <span class="text-[10px] text-[#8d8d8d]">PQC</span>
            </div>
            <div class="text-[11px] text-[#8d8d8d] mt-1">
              {{ state.lang === 'ja' ? 'NIST Kyber-1024 鍵交換を自動実行' : 'Deploy NIST Kyber-1024 lattice encryption' }}
            </div>
          </button>

        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-[#262626]">
        <button 
          @click="closeModal" 
          class="px-4 py-2 bg-[#262626] hover:bg-[#393939] text-white rounded font-mono text-xs transition-colors"
        >
          {{ state.lang === 'ja' ? '閉じる' : 'Cancel' }}
        </button>

        <button 
          @click="launchStandard"
          class="px-6 py-2.5 bg-gradient-to-r from-[#0f62fe] to-[#0043ce] hover:from-[#0043ce] hover:to-[#0f62fe] text-white font-mono text-xs font-bold rounded shadow-lg shadow-[#0f62fe]/30 transition-all flex items-center gap-2"
        >
          <span>🚀</span>
          <span>{{ state.lang === 'ja' ? '通常運用モードで開始' : 'Launch Normal Live Stream' }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { state, injectScenario } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

function closeModal() {
  state.showSimModal = false
  sound.playClick()
}

function launchStandard() {
  state.showSimModal = false
  state.simulationSpeed = 1
  sound.playSuccess()
}

function launchWithScenario(scenarioId) {
  state.showSimModal = false
  state.simulationSpeed = 1
  injectScenario(scenarioId)
}
</script>
