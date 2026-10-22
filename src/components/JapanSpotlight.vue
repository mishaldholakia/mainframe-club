<template>
  <div class="space-y-6">
    
    <!-- Title & Japan Banking Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-[#0f62fe]/15 border border-[#0f62fe]/40 flex items-center justify-center text-xl">
          🗼
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
              {{ t.japanTitle }}
            </h2>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-[#42be65]/15 text-[#42be65] border border-[#42be65]/40 font-semibold">
              DUAL-ACTIVE SYSPLEX
            </span>
          </div>
          <p class="text-xs text-[#8d8d8d] mt-0.5">
            {{ t.japanSubtitle }}
          </p>
        </div>
      </div>

      <!-- GDPS Status Indicator -->
      <div class="flex items-center gap-3 bg-[#111111] border border-[#262626] rounded px-3 py-2 font-mono text-xs">
        <div class="w-2.5 h-2.5 rounded-full bg-[#42be65] animate-ping"></div>
        <div>
          <div class="text-[#f4f4f4] font-semibold">{{ t.gdpsStatus }}</div>
          <div class="text-[10px] text-[#8d8d8d]">Sync Latency: 0.08ms • Coupling Lock Contention: 0.02%</div>
        </div>
      </div>
    </div>

    <!-- Tokyo Dual-DC Sysplex Topology Card -->
    <div class="bg-[#111111] border border-[#262626] rounded p-5 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#0f62fe]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex items-center justify-between mb-4 border-b border-[#262626] pb-3">
        <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
          <span class="text-[#42beef]">■</span>
          {{ state.lang === 'ja' ? '大手町 ⇄ 幕張 デュアルアクティブ GDPS 構成' : 'Otemachi ⇄ Makuhari Dual-Active GDPS Metro Topology' }}
        </h3>
        <span class="text-xs font-mono text-[#42beef] font-semibold">IBM z17™ Multi-Frame (Telum II + Spyre Cards)</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        
        <!-- DC 1: Otemachi Primary (千代田区 大手町DC) -->
        <div class="bg-[#161616] border border-[#0f62fe]/40 rounded p-4 relative group hover:border-[#42beef] transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#42beef]">DC-1: 東京・大手町 (Chiyoda DC)</span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#42be65]/20 text-[#42be65] rounded">PRIMARY ACTIVE</span>
          </div>
          <div class="space-y-2 text-xs font-mono text-[#f4f4f4]">
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">Coupling Facility</span>
              <span class="text-white">CF01 (Internal CF)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">CP / zIIP Engines</span>
              <span class="text-white">64 Cores @ 5.5 GHz</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">Telum II + Spyre Cards</span>
              <span class="text-[#42be65]">8 Chips + 24 Spyre Cards</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">CICS / IMS Subsystems</span>
              <span class="text-white">CICS01A, IMSPROD1</span>
            </div>
          </div>
        </div>

        <!-- Coupling Link Bridge (High-Speed Fiber) -->
        <div class="flex flex-col items-center justify-center p-3 text-center bg-[#161616]/50 border border-[#262626] rounded">
          <div class="flex items-center gap-2 text-xs font-mono text-[#42beef] mb-1">
            <span>◀</span>
            <span class="font-bold">zHyperLink & CF Fiber (35km)</span>
            <span>▶</span>
          </div>
          <div class="w-full h-1 bg-gradient-to-r from-[#0f62fe] via-[#42beef] to-[#0f62fe] rounded-full my-2 animate-pulse"></div>
          <div class="text-[11px] font-mono text-[#8d8d8d]">
            Synchronous Mirroring (PPRC) • RPO=0 / RTO &lt; 1s
          </div>
          <div class="mt-2 text-xs font-mono text-[#42be65]">
            Link Roundtrip: <span class="font-bold">0.082 ms</span>
          </div>
        </div>

        <!-- DC 2: Makuhari Secondary (千葉・幕張DC) -->
        <div class="bg-[#161616] border border-[#0f62fe]/40 rounded p-4 relative group hover:border-[#42beef] transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-[#42beef]">DC-2: 千葉・幕張 (Makuhari DC)</span>
            <span class="px-2 py-0.5 text-[10px] font-mono bg-[#0f62fe]/20 text-[#42beef] rounded">SECONDARY ACTIVE</span>
          </div>
          <div class="space-y-2 text-xs font-mono text-[#f4f4f4]">
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">Coupling Facility</span>
              <span class="text-white">CF02 (Internal CF)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">CP / zIIP Engines</span>
              <span class="text-white">64 Cores @ 5.5 GHz</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">Telum II + Spyre Cards</span>
              <span class="text-[#42be65]">8 Chips + 24 Spyre Cards</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8d8d8d]">CICS / IMS Subsystems</span>
              <span class="text-white">CICS02B, IMSPROD2</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 4 Major Japanese Financial Rails -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- 1. Zengin Net -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded p-4 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-mono font-bold text-[#42beef]">{{ t.zenginNet }}</span>
          <span class="w-2 h-2 rounded-full bg-[#42be65] animate-pulse"></span>
        </div>
        <p class="text-[11px] text-[#8d8d8d] mb-3">{{ t.zenginDesc }}</p>
        <div class="space-y-1.5 font-mono text-xs">
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Throughput:</span>
            <span class="text-white font-bold">{{ state.metrics.zenginTps.toLocaleString() }} TPS</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Avg Settlement:</span>
            <span class="text-[#42be65]">0.21 ms</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Member Banks:</span>
            <span class="text-white">1,142 Banks</span>
          </div>
        </div>
      </div>

      <!-- 2. CAFIS Net -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded p-4 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-mono font-bold text-[#42beef]">{{ t.cafisNet }}</span>
          <span class="w-2 h-2 rounded-full bg-[#42be65] animate-pulse"></span>
        </div>
        <p class="text-[11px] text-[#8d8d8d] mb-3">{{ t.cafisDesc }}</p>
        <div class="space-y-1.5 font-mono text-xs">
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Throughput:</span>
            <span class="text-white font-bold">{{ state.metrics.cafisTps.toLocaleString() }} TPS</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">ATM / POS Hub:</span>
            <span class="text-[#42be65]">0.28 ms</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Fraud AI Check:</span>
            <span class="text-[#8a3ffc]">100% Inline</span>
          </div>
        </div>
      </div>

      <!-- 3. BOJ-NET -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded p-4 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-mono font-bold text-[#42beef]">{{ t.bojNet }}</span>
          <span class="w-2 h-2 rounded-full bg-[#42be65] animate-pulse"></span>
        </div>
        <p class="text-[11px] text-[#8d8d8d] mb-3">{{ t.bojDesc }}</p>
        <div class="space-y-1.5 font-mono text-xs">
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">RTGS Value:</span>
            <span class="text-white font-bold">¥142.8 Trillion/day</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Execution SLA:</span>
            <span class="text-[#42be65]">100.0% Goal</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Security:</span>
            <span class="text-[#42beef]">PQC Kyber-1024</span>
          </div>
        </div>
      </div>

      <!-- 4. Megabank Core Banking -->
      <div class="bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded p-4 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-mono font-bold text-[#42beef]">{{ t.megabanks }}</span>
          <span class="w-2 h-2 rounded-full bg-[#42be65] animate-pulse"></span>
        </div>
        <p class="text-[11px] text-[#8d8d8d] mb-3">{{ t.megabankDesc }}</p>
        <div class="space-y-1.5 font-mono text-xs">
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Db2 13 Data Sharing:</span>
            <span class="text-white font-bold">DSN1PLEX</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Active Accounts:</span>
            <span class="text-white">120M+ Accts</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#8d8d8d]">Continuous Uptime:</span>
            <span class="text-[#42be65]">365d 24/7/365</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Live Tokyo Sysplex Transaction Feed (with JPY Amounts) -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4">
      <div class="flex items-center justify-between mb-3 pb-2 border-b border-[#262626]">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#42beef] animate-pulse"></span>
          <h3 class="text-sm font-mono font-bold text-white">{{ t.liveJapanFeed }}</h3>
        </div>
        <span class="text-xs font-mono text-[#8d8d8d]">
          {{ state.lang === 'ja' ? '最新25件の決済電文をリアルタイム表示中' : 'Streaming latest 25 transactions' }}
        </span>
      </div>

      <!-- Transactions Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left font-mono text-xs">
          <thead>
            <tr class="text-[#8d8d8d] border-b border-[#262626] bg-[#111111]">
              <th class="p-2.5">TX ID</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '時刻' : 'Time' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '金融機関' : 'Bank / Institution' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '決済ルート' : 'Channel' }}</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '金額 (JPY)' : 'Amount' }}</th>
              <th class="p-2.5">Telum AI</th>
              <th class="p-2.5">{{ state.lang === 'ja' ? '判定' : 'Decision' }}</th>
              <th class="p-2.5 text-right">{{ state.lang === 'ja' ? '詳細' : 'Inspect' }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#262626]">
            <tr 
              v-for="tx in state.transactions.slice(0, 10)" 
              :key="tx.id"
              class="hover:bg-[#262626]/50 transition-colors cursor-pointer"
              @click="inspectTx(tx)"
            >
              <td class="p-2.5 text-[#42beef] font-semibold">{{ tx.id }}</td>
              <td class="p-2.5 text-[#8d8d8d]">{{ tx.time }}</td>
              <td class="p-2.5 text-white">
                <span class="font-medium">{{ state.lang === 'ja' ? tx.bankJa : tx.bankEn }}</span>
              </td>
              <td class="p-2.5 text-[#8d8d8d]">
                {{ state.lang === 'ja' ? tx.channelJa : tx.channelEn }}
              </td>
              <td class="p-2.5 font-bold text-white">
                ¥{{ tx.amountJpy.toLocaleString() }}
              </td>
              <td class="p-2.5">
                <div class="flex items-center gap-1.5">
                  <div class="w-12 bg-[#262626] h-1.5 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full"
                      :class="tx.score >= state.fraudThreshold ? 'bg-[#fa4d56]' : (tx.score > 50 ? 'bg-[#f1c21b]' : 'bg-[#42be65]')"
                      :style="{ width: tx.score + '%' }"
                    ></div>
                  </div>
                  <span :class="tx.score >= state.fraudThreshold ? 'text-[#fa4d56] font-bold' : (tx.score > 50 ? 'text-[#f1c21b]' : 'text-[#42be65]')">
                    {{ tx.score }}
                  </span>
                </div>
              </td>
              <td class="p-2.5">
                <span 
                  v-if="tx.status === 'blocked'" 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#fa4d56]/20 text-[#fa4d56] border border-[#fa4d56]/40 font-bold"
                >
                  {{ state.lang === 'ja' ? '自動遮断' : 'BLOCKED' }}
                </span>
                <span 
                  v-else-if="tx.status === 'review'" 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#f1c21b]/20 text-[#f1c21b] border border-[#f1c21b]/40 font-semibold"
                >
                  {{ state.lang === 'ja' ? '要確認' : 'REVIEW' }}
                </span>
                <span 
                  v-else 
                  class="px-2 py-0.5 rounded text-[10px] bg-[#42be65]/20 text-[#42be65] border border-[#42be65]/40"
                >
                  {{ state.lang === 'ja' ? '承認' : 'PASS' }}
                </span>
              </td>
              <td class="p-2.5 text-right">
                <button 
                  class="px-2 py-1 bg-[#111111] hover:bg-[#0f62fe] border border-[#262626] hover:border-[#42beef] text-[#f4f4f4] rounded text-[11px] transition-all"
                  @click.stop="inspectTx(tx)"
                >
                  {{ state.lang === 'ja' ? 'AI診断' : 'Inspect' }}
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
import { state, t } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

function inspectTx(tx) {
  state.inspectedTx = tx
  sound.playClick()
}
</script>
