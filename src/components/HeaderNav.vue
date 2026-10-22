<template>
  <header class="w-full bg-[#111111]/90 backdrop-blur-md border-b border-[#262626] sticky top-0 z-50">
    <div class="max-w-[1920px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
      
      <!-- Brand & Mainframe Model -->
      <div class="flex items-center gap-4">
        <!-- Animated Z16 Logo Icon -->
        <div class="relative flex items-center justify-center w-10 h-10 bg-[#161616] border border-[#0f62fe]/50 rounded cursor-pointer group hover:border-[#42beef] transition-all" @click="openHome">
          <div class="absolute inset-0 bg-[#0f62fe]/10 rounded group-hover:bg-[#0f62fe]/20"></div>
          <!-- Stylized Mainframe SVG -->
          <svg class="w-6 h-6 text-[#42beef] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="2" width="18" height="20" rx="2" />
            <line x1="7" y1="6" x2="17" y2="6" stroke="#0f62fe" stroke-width="2" />
            <line x1="7" y1="10" x2="17" y2="10" stroke="#0f62fe" stroke-width="2" />
            <line x1="7" y1="14" x2="11" y2="14" stroke="#42beef" stroke-width="2" />
            <circle cx="15.5" cy="14" r="1.5" fill="#42be65" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="#393939" />
          </svg>
          <span class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#42be65] rounded-full ring-2 ring-[#111111] animate-ping" v-if="!state.activeScenario"></span>
          <span class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#fa4d56] rounded-full ring-2 ring-[#111111] animate-ping" v-else></span>
        </div>

        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base lg:text-lg font-bold tracking-wider font-mono text-white flex items-center gap-2">
              <span class="text-[#0f62fe]">IBM</span>
              <span class="text-white">Z</span>
              <span class="text-[#42beef] text-glow-cyan font-semibold">MISSION CONTROL</span>
            </h1>
            <span class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0f62fe]/15 text-[#42beef] border border-[#0f62fe]/40">
              z/OS 3.1 • Telum II
            </span>
          </div>
          <p class="text-xs text-[#8d8d8d] hidden md:block">
            {{ state.lang === 'ja' ? '次世代メインフレーム AI運用司令センター • 東京デュアルSysplex' : 'Next-Gen Mainframe AI Operations Command Center • Tokyo Sysplex' }}
          </p>
        </div>
      </div>

      <!-- Live Incident Banner Pill -->
      <div v-if="state.activeScenario" class="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#fa4d56]/20 border border-[#fa4d56] rounded animate-pulse">
        <span class="w-2 h-2 rounded-full bg-[#fa4d56]"></span>
        <span class="text-xs font-mono font-bold text-[#fa4d56]">
          {{ state.lang === 'ja' ? '【警報発令】カオスシナリオ実行中: ' : '[ALERT] Active Scenario: ' }}
          {{ getScenarioLabel(state.activeScenario) }}
          ({{ state.incidentTimeRemaining }}s)
        </span>
        <button 
          @click="resolveScenario" 
          class="ml-2 px-2 py-0.5 text-[11px] bg-[#fa4d56] hover:bg-[#fa4d56]/80 text-white font-mono rounded transition-colors"
        >
          {{ state.lang === 'ja' ? 'AI自律復旧発動' : 'AI Self-Heal' }}
        </button>
      </div>

      <div v-else class="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#42be65]/10 border border-[#42be65]/30 rounded">
        <span class="w-2 h-2 rounded-full bg-[#42be65] animate-pulse"></span>
        <span class="text-xs font-mono text-[#42be65] font-medium tracking-wide">
          {{ state.lang === 'ja' ? 'Parallel Sysplex: 正常稼働中 (99.99999% SLA)' : 'Parallel Sysplex: Optimal (99.99999% SLA)' }}
        </span>
      </div>

      <!-- Action & Utility Controls -->
      <div class="flex items-center gap-2 lg:gap-3">
        
        <!-- Live Clocks (JST / UTC) -->
        <div class="hidden sm:flex flex-col text-right font-mono text-[11px] pr-2 border-r border-[#262626]">
          <div class="text-[#f4f4f4] flex items-center justify-end gap-1">
            <span class="text-[#42beef] font-semibold">JST</span>
            <span>{{ jstTime }}</span>
          </div>
          <div class="text-[#8d8d8d] text-[10px]">
            <span>UTC</span> {{ utcTime }}
          </div>
        </div>

        <!-- Simulation Speed Selector -->
        <div class="flex items-center bg-[#161616] border border-[#262626] rounded p-0.5">
          <button 
            @click="setSpeed(0)" 
            :class="['px-2 py-1 text-xs font-mono rounded transition-all', state.simulationSpeed === 0 ? 'bg-[#fa4d56] text-white font-bold' : 'text-[#8d8d8d] hover:text-white']"
            :title="state.lang === 'ja' ? '一時停止' : 'Pause Simulation'"
          >
            ⏸
          </button>
          <button 
            @click="setSpeed(1)" 
            :class="['px-2 py-1 text-xs font-mono rounded transition-all', state.simulationSpeed === 1 ? 'bg-[#0f62fe] text-white font-bold' : 'text-[#8d8d8d] hover:text-white']"
          >
            1x
          </button>
          <button 
            @click="setSpeed(2)" 
            :class="['px-2 py-1 text-xs font-mono rounded transition-all', state.simulationSpeed === 2 ? 'bg-[#0f62fe] text-white font-bold' : 'text-[#8d8d8d] hover:text-white']"
          >
            2x
          </button>
          <button 
            @click="setSpeed(5)" 
            :class="['px-2 py-1 text-xs font-mono rounded transition-all', state.simulationSpeed === 5 ? 'bg-[#0f62fe] text-white font-bold' : 'text-[#8d8d8d] hover:text-white']"
          >
            5x
          </button>
        </div>

        <!-- Sound FX Toggle -->
        <button 
          @click="toggleAudio" 
          :class="['p-2 rounded border transition-all text-xs font-mono flex items-center gap-1', state.soundEnabled ? 'bg-[#161616] border-[#0f62fe]/40 text-[#42beef]' : 'bg-[#161616] border-[#262626] text-[#8d8d8d]']"
          :title="state.soundEnabled ? t.soundOn : t.soundOff"
        >
          <svg v-if="state.soundEnabled" class="w-4 h-4 text-[#42beef]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" />
          </svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>

        <!-- Bilingual Language Switcher (EN / JA) -->
        <button 
          @click="toggleLanguage" 
          class="px-2.5 py-1.5 bg-[#161616] border border-[#262626] hover:border-[#0f62fe] rounded text-xs font-mono text-white flex items-center gap-1.5 transition-all"
        >
          <span class="text-xs">🌐</span>
          <span :class="state.lang === 'ja' ? 'text-[#42beef] font-bold' : 'text-[#8d8d8d]'">日本語</span>
          <span class="text-[#393939]">/</span>
          <span :class="state.lang === 'en' ? 'text-[#42beef] font-bold' : 'text-[#8d8d8d]'">EN</span>
        </button>

        <!-- Prominent Launch Live Simulation Button -->
        <button 
          @click="openLaunchModal"
          class="relative group overflow-hidden px-3.5 py-1.5 bg-gradient-to-r from-[#0f62fe] to-[#0043ce] hover:from-[#0043ce] hover:to-[#0f62fe] text-white text-xs lg:text-sm font-semibold rounded shadow-lg shadow-[#0f62fe]/25 border border-[#42beef]/40 transition-all flex items-center gap-2"
        >
          <span class="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          <span class="text-base">🚀</span>
          <span class="tracking-wide">{{ t.launchSimulation }}</span>
        </button>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { state, t, resolveScenario } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

const jstTime = ref('')
const utcTime = ref('')

function updateClocks() {
  const now = new Date()
  jstTime.value = now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false })
  utcTime.value = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false })
}

let clockInterval = null
onMounted(() => {
  updateClocks()
  clockInterval = setInterval(updateClocks, 1000)
})

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval)
})

function setSpeed(speed) {
  state.simulationSpeed = speed
  sound.playClick()
}

function toggleAudio() {
  state.soundEnabled = sound.toggle()
}

function toggleLanguage() {
  state.lang = state.lang === 'ja' ? 'en' : 'ja'
  sound.playClick()
}

function openHome() {
  state.activeTab = 'global'
  sound.playClick()
}

function openLaunchModal() {
  state.showSimModal = true
  sound.playLaunch()
}

function getScenarioLabel(id) {
  if (id === 'spike') return state.lang === 'ja' ? '50万TPS急増スパイク' : '500k TPS Flash Spike'
  if (id === 'fraud') return state.lang === 'ja' ? '協調型ATM不正攻撃' : 'Coordinated ATM Fraud Wave'
  if (id === 'power') return state.lang === 'ja' ? '大手町変電所瞬低' : 'Otemachi Substation Glitch'
  if (id === 'crypto') return state.lang === 'ja' ? '暗号傍受解読攻撃' : 'Quantum Harvest Attack'
  return id
}
</script>
