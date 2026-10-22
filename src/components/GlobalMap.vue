<template>
  <div class="space-y-6">
    
    <!-- Title & Status Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161616] border border-[#262626] rounded p-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#0f62fe] animate-ping"></span>
          <h2 class="text-lg lg:text-xl font-bold font-mono text-white tracking-wide">
            {{ t.globalMapTitle }}
          </h2>
        </div>
        <p class="text-xs text-[#8d8d8d] mt-0.5">
          {{ t.globalMapSubtitle }}
        </p>
      </div>

      <!-- Quick Summary Badges -->
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
        <div class="px-3 py-1.5 bg-[#111111] border border-[#262626] rounded flex items-center gap-2">
          <span class="text-[#8d8d8d]">Active Sysplex Hub:</span>
          <span class="text-[#42beef] font-semibold">Tokyo (Otemachi / Makuhari)</span>
        </div>
        <div class="px-3 py-1.5 bg-[#111111] border border-[#262626] rounded flex items-center gap-2">
          <span class="text-[#8d8d8d]">Encryption:</span>
          <span class="text-[#42be65] font-semibold">NIST PQC Kyber-1024</span>
        </div>
      </div>
    </div>

    <!-- Main Map Canvas & Node Info Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      <!-- Interactive World Map (3 Cols) -->
      <div class="lg:col-span-3 bg-[#111111] border border-[#262626] rounded relative overflow-hidden group min-h-[460px] lg:min-h-[540px] flex flex-col justify-between p-4">
        
        <!-- HUD Grid Background Lines -->
        <div class="absolute inset-0 bg-[radial-gradient(#0f62fe_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent pointer-events-none"></div>

        <!-- Top Map Legend -->
        <div class="relative z-10 flex items-center justify-between text-xs font-mono text-[#8d8d8d]">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#42beef] shadow-[0_0_8px_#42beef]"></span> Primary Dual-Sysplex
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#0f62fe]"></span> Financial Gateway Hub
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-4 h-0.5 bg-gradient-to-r from-[#0f62fe] to-[#42beef]"></span> Encrypted FICON Flow
            </span>
          </div>
          <div class="hidden sm:block text-[#42beef]">
            GRID: 139.76° E / 35.68° N [TOKYO-Z17]
          </div>
        </div>

        <!-- SVG Map Container with Interactive Nodes & Animated Arcs -->
        <div class="relative w-full h-[360px] lg:h-[420px] my-auto">
          <svg class="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
            <defs>
              <!-- Glow Filters -->
              <filter id="glow-tokyo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <!-- Linear Gradients for Flow Lines -->
              <linearGradient id="grad-ny-tokyo" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0f62fe" stop-opacity="0.2" />
                <stop offset="50%" stop-color="#42beef" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#42be65" stop-opacity="1" />
              </linearGradient>

              <linearGradient id="grad-lon-tokyo" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0f62fe" stop-opacity="0.2" />
                <stop offset="50%" stop-color="#42beef" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#42be65" stop-opacity="1" />
              </linearGradient>
            </defs>

            <!-- Stylized World Map Continents / Geo Wireframe Paths -->
            <!-- North America -->
            <path d="M 120 80 Q 200 60 280 90 Q 320 140 290 220 Q 230 250 180 200 Q 110 160 120 80 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />
            <!-- South America -->
            <path d="M 270 250 Q 340 280 320 380 Q 290 450 250 420 Q 240 330 270 250 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />
            <!-- Europe -->
            <path d="M 440 80 Q 520 70 540 120 Q 500 170 450 150 Q 420 120 440 80 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />
            <!-- Africa -->
            <path d="M 450 170 Q 540 180 550 280 Q 510 380 470 340 Q 430 250 450 170 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />
            <!-- Asia & Japan -->
            <path d="M 550 80 Q 750 60 850 120 Q 820 220 720 240 Q 640 200 550 140 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />
            <!-- Japan Archipelago highlight -->
            <path d="M 780 160 Q 805 180 795 205 Q 780 220 770 190 Z" fill="#0f62fe" fill-opacity="0.3" stroke="#42beef" stroke-width="1.5" />
            <!-- Australia -->
            <path d="M 780 320 Q 880 320 870 400 Q 800 430 760 380 Z" fill="#18181b" stroke="#27272a" stroke-width="1.2" opacity="0.6" />

            <!-- Animated Connecting Great-Circle Arcs to Tokyo (795, 192) -->
            <!-- NY to Tokyo (285, 170) -> (795, 192) -->
            <path d="M 285 170 Q 540 40 795 192" fill="none" stroke="url(#grad-ny-tokyo)" stroke-width="2" stroke-dasharray="6 4" class="animate-pulse" filter="url(#glow-line)" />
            <!-- London to Tokyo (480, 130) -> (795, 192) -->
            <path d="M 480 130 Q 630 60 795 192" fill="none" stroke="url(#grad-lon-tokyo)" stroke-width="2" stroke-dasharray="6 4" class="animate-pulse" filter="url(#glow-line)" />
            <!-- Singapore to Tokyo (730, 285) -> (795, 192) -->
            <path d="M 730 285 Q 770 230 795 192" fill="none" stroke="#42beef" stroke-width="2" stroke-dasharray="4 3" opacity="0.8" />
            <!-- Frankfurt to Tokyo (520, 140) -> (795, 192) -->
            <path d="M 520 140 Q 660 70 795 192" fill="none" stroke="#0f62fe" stroke-width="1.8" stroke-dasharray="5 3" opacity="0.7" />
            <!-- Sydney to Tokyo (860, 390) -> (795, 192) -->
            <path d="M 860 390 Q 840 280 795 192" fill="none" stroke="#0f62fe" stroke-width="1.8" stroke-dasharray="5 3" opacity="0.7" />

            <!-- Animated Flow Particle Dots traveling toward Tokyo -->
            <circle r="4" fill="#42beef" filter="url(#glow-tokyo)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 285 170 Q 540 40 795 192" />
            </circle>
            <circle r="3.5" fill="#42be65" filter="url(#glow-tokyo)">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 480 130 Q 630 60 795 192" />
            </circle>
            <circle r="3.5" fill="#42beef" filter="url(#glow-tokyo)">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 730 285 Q 770 230 795 192" />
            </circle>
            <circle r="3" fill="#8a3ffc" filter="url(#glow-tokyo)">
              <animateMotion dur="3.1s" repeatCount="indefinite" path="M 520 140 Q 660 70 795 192" />
            </circle>
            <circle r="3" fill="#42beef" filter="url(#glow-tokyo)">
              <animateMotion dur="3.8s" repeatCount="indefinite" path="M 860 390 Q 840 280 795 192" />
            </circle>

            <!-- Global Node Markers -->
            <!-- Tokyo Node (Mainframe Center) -->
            <g transform="translate(795, 192)" class="cursor-pointer" @click="selectNode(state.nodes[0])">
              <circle r="22" fill="none" stroke="#42beef" stroke-width="1.5" opacity="0.4" class="animate-ping" />
              <circle r="14" fill="#0f62fe" fill-opacity="0.3" stroke="#42beef" stroke-width="2" filter="url(#glow-tokyo)" />
              <circle r="6" fill="#ffffff" />
              <!-- Label -->
              <rect x="18" y="-12" width="130" height="24" rx="2" fill="#111111" fill-opacity="0.9" stroke="#42beef" stroke-width="1" />
              <text x="24" y="4" fill="#ffffff" font-family="'IBM Plex Mono', monospace" font-size="11" font-weight="bold">TOKYO Z17 SYSPLEX</text>
              <text x="24" y="24" fill="#42be65" font-family="'IBM Plex Mono', monospace" font-size="10">84.2k TPS • 0.22ms</text>
            </g>

            <!-- New York Node -->
            <g transform="translate(285, 170)" class="cursor-pointer" @click="selectNode(state.nodes[1])">
              <circle r="12" fill="none" stroke="#0f62fe" stroke-width="1.5" opacity="0.6" class="animate-ping" />
              <circle r="7" fill="#0f62fe" stroke="#42beef" stroke-width="1.5" />
              <rect x="-110" y="-10" width="100" height="20" rx="2" fill="#111111" fill-opacity="0.8" stroke="#393939" stroke-width="1" />
              <text x="-104" y="4" fill="#ffffff" font-family="'IBM Plex Mono', monospace" font-size="10">NEW YORK (JFK)</text>
            </g>

            <!-- London Node -->
            <g transform="translate(480, 130)" class="cursor-pointer" @click="selectNode(state.nodes[2])">
              <circle r="10" fill="none" stroke="#0f62fe" stroke-width="1.5" opacity="0.6" class="animate-ping" />
              <circle r="6" fill="#0f62fe" stroke="#42beef" stroke-width="1.5" />
              <rect x="-85" y="-28" width="80" height="20" rx="2" fill="#111111" fill-opacity="0.8" stroke="#393939" stroke-width="1" />
              <text x="-80" y="-14" fill="#ffffff" font-family="'IBM Plex Mono', monospace" font-size="10">LONDON (LON)</text>
            </g>

            <!-- Singapore Node -->
            <g transform="translate(730, 285)" class="cursor-pointer" @click="selectNode(state.nodes[3])">
              <circle r="6" fill="#0f62fe" stroke="#42beef" stroke-width="1.5" />
              <rect x="-110" y="8" width="105" height="20" rx="2" fill="#111111" fill-opacity="0.8" stroke="#393939" stroke-width="1" />
              <text x="-104" y="22" fill="#ffffff" font-family="'IBM Plex Mono', monospace" font-size="10">SINGAPORE (SIN)</text>
            </g>

            <!-- Frankfurt Node -->
            <g transform="translate(520, 140)" class="cursor-pointer" @click="selectNode(state.nodes[4])">
              <circle r="5" fill="#0f62fe" stroke="#42beef" stroke-width="1" />
              <text x="12" y="4" fill="#8d8d8d" font-family="'IBM Plex Mono', monospace" font-size="9">FRA</text>
            </g>

            <!-- Sydney Node -->
            <g transform="translate(860, 390)" class="cursor-pointer" @click="selectNode(state.nodes[5])">
              <circle r="5" fill="#0f62fe" stroke="#42beef" stroke-width="1" />
              <text x="12" y="4" fill="#8d8d8d" font-family="'IBM Plex Mono', monospace" font-size="9">SYD</text>
            </g>
          </svg>
        </div>

        <!-- Bottom Map Status Bar -->
        <div class="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#262626] font-mono text-xs">
          <div class="bg-[#161616] p-2 rounded flex items-center justify-between">
            <span class="text-[#8d8d8d]">Global FICON Trunks:</span>
            <span class="text-[#42beef] font-semibold">212 Ch.</span>
          </div>
          <div class="bg-[#161616] p-2 rounded flex items-center justify-between">
            <span class="text-[#8d8d8d]">Data Loss (RPO):</span>
            <span class="text-[#42be65] font-semibold">0.000s</span>
          </div>
          <div class="bg-[#161616] p-2 rounded flex items-center justify-between">
            <span class="text-[#8d8d8d]">Cross-Border PQC:</span>
            <span class="text-[#42be65] font-semibold">ACTIVE</span>
          </div>
          <div class="bg-[#161616] p-2 rounded flex items-center justify-between">
            <span class="text-[#8d8d8d]">CICS Sync SLA:</span>
            <span class="text-white font-semibold">100.0%</span>
          </div>
        </div>

      </div>

      <!-- Right Telemetry Panel: Selected Node Inspector (1 Col) -->
      <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col justify-between space-y-4">
        
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div>
              <span class="text-[10px] font-mono uppercase text-[#0f62fe] font-semibold">Selected Financial Hub</span>
              <h3 class="text-base font-bold text-white font-mono">
                {{ state.lang === 'ja' ? selectedNode.nameJa : selectedNode.nameEn }}
              </h3>
            </div>
            <span class="px-2 py-0.5 text-xs font-mono rounded bg-[#42be65]/10 text-[#42be65] border border-[#42be65]/30">
              {{ selectedNode.status.toUpperCase() }}
            </span>
          </div>

          <!-- Node Metrics Specs -->
          <div class="space-y-3 mt-4 text-xs font-mono">
            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Local Throughput</span>
              <span class="text-white font-bold">{{ selectedNode.tps.toLocaleString() }} TPS</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Sysplex Ping Latency</span>
              <span class="text-[#42be65] font-bold">{{ selectedNode.ping }} ms</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Mainframe Unit</span>
              <span class="text-[#42beef]">{{ selectedNode.model }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Active CICS Regions</span>
              <span class="text-white">{{ selectedNode.cicsRegions }} Regions</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Db2 Data Sharing Group</span>
              <span class="text-[#8a3ffc]">{{ selectedNode.db2Group }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Quantum Encryption</span>
              <span class="text-[#42be65] text-[11px]">{{ selectedNode.encryption }}</span>
            </div>
          </div>
        </div>

        <!-- Hub Switcher Buttons -->
        <div class="space-y-2 pt-3 border-t border-[#262626]">
          <span class="text-[11px] font-mono text-[#8d8d8d] block">{{ state.lang === 'ja' ? '拠点切り替え' : 'Quick Node Select' }}:</span>
          <div class="grid grid-cols-3 gap-1.5 font-mono text-xs">
            <button 
              v-for="node in state.nodes" 
              :key="node.id"
              @click="selectNode(node)"
              :class="['px-2 py-1.5 rounded text-center transition-all border', selectedNode.id === node.id ? 'bg-[#0f62fe] border-[#42beef] text-white font-bold' : 'bg-[#111111] border-[#262626] text-[#8d8d8d] hover:text-white']"
            >
              {{ node.id.toUpperCase() }}
            </button>
          </div>
        </div>

        <!-- Jump to Japan Spotlight CTA -->
        <button 
          @click="goToJapanHub"
          class="w-full py-2 bg-[#0f62fe]/15 hover:bg-[#0f62fe]/30 border border-[#0f62fe]/50 text-[#42beef] rounded font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <span>🗼</span>
          <span>{{ state.lang === 'ja' ? '東京オペレーション詳細を開く' : 'View Tokyo Hub Details' }}</span>
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { state, t } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

const selectedNode = ref(state.nodes[0])

function selectNode(node) {
  selectedNode.value = node
  sound.playClick()
}

function goToJapanHub() {
  state.activeTab = 'japan'
  sound.playClick()
}
</script>
