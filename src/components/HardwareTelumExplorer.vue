<template>
  <div class="space-y-6">
    
    <!-- Title Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-[#0f62fe]/15 border border-[#0f62fe]/40 flex items-center justify-center text-xl">
          🔬
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
              {{ t.hardwareTitle }}
            </h2>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-[#0f62fe]/20 text-[#42beef] border border-[#0f62fe]/40 font-semibold">
              IBM z17 • TELUM II + SPYRE™ AI
            </span>
          </div>
          <p class="text-xs text-[#8d8d8d] mt-0.5">
            {{ t.hardwareSubtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 font-mono text-xs">
        <span class="px-2.5 py-1 bg-[#111111] border border-[#262626] text-[#42be65] rounded">
          Core Clock: 5.50 GHz
        </span>
        <span class="px-2.5 py-1 bg-[#111111] border border-[#262626] text-[#8a3ffc] rounded">
          Spyre Cluster: 24 Cards Active
        </span>
      </div>
    </div>

    <!-- Dual Architecture Layout: Telum II Die (Left) + Spyre Accelerator Drawer (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Interactive Chip Die Diagram & Spyre Card (2 Cols) -->
      <div class="lg:col-span-2 bg-[#111111] border border-[#262626] rounded p-6 relative overflow-hidden flex flex-col justify-between">
        
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-[#262626]">
          <span class="text-xs font-mono font-bold text-white flex items-center gap-2">
            <span class="text-[#0f62fe]">■</span>
            {{ state.lang === 'ja' ? 'IBM z17 Telum II ダイ ＆ Spyre™ PCIe 加速モジュール' : 'IBM z17 Telum II Die & Spyre™ PCIe AI Modules' }}
          </span>
          <span class="text-[11px] font-mono text-[#8d8d8d]">
            {{ state.lang === 'ja' ? 'ブロックをクリックして詳細テレメトリを表示' : 'Click any block to inspect hardware telemetry' }}
          </span>
        </div>

        <!-- Stylized Silicon Die Layout Grid -->
        <div class="grid grid-cols-4 gap-3 my-3 p-4 bg-[#161616] border border-[#393939] rounded relative">
          
          <!-- Core 1-4 (Top Row) -->
          <div 
            v-for="core in [1, 2, 3, 4]" 
            :key="core"
            @click="selectComponent('core', core)"
            :class="['p-3 rounded border text-center cursor-pointer transition-all', selectedComp.id === 'core' && selectedComp.num === core ? 'bg-[#0f62fe]/30 border-[#42beef] shadow-[0_0_12px_#0f62fe]' : 'bg-[#111111] border-[#262626] hover:border-[#0f62fe]']"
          >
            <div class="text-xs font-mono font-bold text-white">CORE 0{{ core }}</div>
            <div class="text-[10px] font-mono text-[#42beef]">5.5 GHz • 32MB L2</div>
            <div class="mt-1 text-[9px] font-mono text-[#42be65]">LOAD: {{ (58 + core * 3.5).toFixed(1) }}%</div>
          </div>

          <!-- Central Integrated AI Accelerator (Spans 4 columns) -->
          <div 
            @click="selectComponent('ai')"
            :class="['col-span-4 p-4 rounded border text-center cursor-pointer transition-all relative overflow-hidden', selectedComp.id === 'ai' ? 'bg-[#8a3ffc]/25 border-[#8a3ffc] shadow-[0_0_20px_#8a3ffc]' : 'bg-[#1a1128] border-[#8a3ffc]/50 hover:border-[#8a3ffc]']"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#8a3ffc]/10 to-transparent animate-scanline"></div>
            <div class="flex items-center justify-center gap-2">
              <span class="text-base">🧠</span>
              <span class="text-sm font-mono font-bold text-white tracking-wider">
                INTEGRATED ON-CHIP AI ACCELERATOR (TELUM II)
              </span>
            </div>
            <div class="text-xs font-mono text-[#8a3ffc] mt-1">
              6 TFLOPS Neural Engine • 0.72ms In-Flight Latency • 256MB Virtual L3/L4 Cache
            </div>
          </div>

          <!-- Core 5-8 (Bottom Row) -->
          <div 
            v-for="core in [5, 6, 7, 8]" 
            :key="core"
            @click="selectComponent('core', core)"
            :class="['p-3 rounded border text-center cursor-pointer transition-all', selectedComp.id === 'core' && selectedComp.num === core ? 'bg-[#0f62fe]/30 border-[#42beef] shadow-[0_0_12px_#0f62fe]' : 'bg-[#111111] border-[#262626] hover:border-[#0f62fe]']"
          >
            <div class="text-xs font-mono font-bold text-white">CORE 0{{ core }}</div>
            <div class="text-[10px] font-mono text-[#42beef]">5.5 GHz • 32MB L2</div>
            <div class="mt-1 text-[9px] font-mono text-[#42be65]">LOAD: {{ (54 + core * 2.8).toFixed(1) }}%</div>
          </div>

          <!-- Dedicated IBM Spyre PCIe Accelerator Card Block (Spans 4 columns) -->
          <div 
            @click="selectComponent('spyre')"
            :class="['col-span-4 p-4 rounded border text-center cursor-pointer transition-all relative overflow-hidden bg-gradient-to-r from-[#001141] via-[#0f62fe]/20 to-[#001141]', selectedComp.id === 'spyre' ? 'border-[#42beef] shadow-[0_0_24px_rgba(66,190,239,0.5)]' : 'border-[#0f62fe]/60 hover:border-[#42beef]']"
          >
            <div class="flex items-center justify-center gap-2">
              <span class="text-base">⚡</span>
              <span class="text-sm font-mono font-bold text-white tracking-wider">
                IBM SPYRE™ ACCELERATOR CARD (PCIe CLUSTER)
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[#42beef]/20 text-[#42beef] font-bold">32 CORES / 75W</span>
            </div>
            <div class="text-xs font-mono text-[#42beef] mt-1">
              Scalable 24-Card PCIe Drawer • Generative AI & Foundation Models (watsonx, Code Assistant, Multi-Modal)
            </div>
            <div class="flex justify-center gap-6 mt-2 text-[10px] font-mono text-[#f4f4f4]">
              <span>Cluster Cores: 768 AI Cores</span>
              <span>Power: 75W per Card</span>
              <span>Bandwidth: PCIe Gen5 Direct Link</span>
            </div>
          </div>

          <!-- Bottom Subsystems: Crypto Express 8S & RAIM Memory Controller -->
          <div 
            @click="selectComponent('crypto')"
            :class="['col-span-2 p-3 rounded border text-center cursor-pointer transition-all', selectedComp.id === 'crypto' ? 'bg-[#0f62fe]/30 border-[#42beef]' : 'bg-[#111111] border-[#262626] hover:border-[#0f62fe]']"
          >
            <div class="text-xs font-mono font-bold text-white">CRYPTO EXPRESS 8S (HSM)</div>
            <div class="text-[10px] font-mono text-[#42beef]">NIST PQC Kyber-1024 • Dilithium</div>
          </div>

          <div 
            @click="selectComponent('raim')"
            :class="['col-span-2 p-3 rounded border text-center cursor-pointer transition-all', selectedComp.id === 'raim' ? 'bg-[#0f62fe]/30 border-[#42beef]' : 'bg-[#111111] border-[#262626] hover:border-[#0f62fe]']"
          >
            <div class="text-xs font-mono font-bold text-white">64TB RAIM MEMORY FABRIC</div>
            <div class="text-[10px] font-mono text-[#42be65]">Dynamic Lane Sparing • Zero Downtime</div>
          </div>

        </div>

        <!-- Silicon Footprint Stats -->
        <div class="grid grid-cols-4 gap-2 pt-2 border-t border-[#262626] text-center font-mono text-xs">
          <div class="bg-[#161616] p-2 rounded">
            <span class="text-[#8d8d8d] text-[10px] block">Mainframe Generation</span>
            <span class="text-white font-bold">IBM z17™</span>
          </div>
          <div class="bg-[#161616] p-2 rounded">
            <span class="text-[#8d8d8d] text-[10px] block">On-Chip + PCIe AI</span>
            <span class="text-[#42beef] font-bold">Telum II + Spyre</span>
          </div>
          <div class="bg-[#161616] p-2 rounded">
            <span class="text-[#8d8d8d] text-[10px] block">Spyre Cores Total</span>
            <span class="text-white font-bold">768 Cores (24 Cards)</span>
          </div>
          <div class="bg-[#161616] p-2 rounded">
            <span class="text-[#8d8d8d] text-[10px] block">Cooling Method</span>
            <span class="text-[#42be65] font-bold">Closed-Loop Radiator</span>
          </div>
        </div>

      </div>

      <!-- Right Component Telemetry Inspector (1 Col) -->
      <div class="bg-[#161616] border border-[#262626] rounded p-5 flex flex-col justify-between">
        
        <div>
          <div class="pb-3 border-b border-[#262626]">
            <span class="text-[10px] font-mono uppercase text-[#0f62fe] font-semibold">Silicon Telemetry</span>
            <h3 class="text-base font-bold text-white font-mono mt-0.5">
              {{ selectedComp.title }}
            </h3>
            <p class="text-xs text-[#8d8d8d] mt-1 font-mono leading-relaxed">
              {{ selectedComp.desc }}
            </p>
          </div>

          <!-- Component Metrics Table -->
          <div class="space-y-3 mt-4 text-xs font-mono">
            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Operating Frequency</span>
              <span class="text-white font-bold">{{ selectedComp.freq }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Current Temperature</span>
              <span class="text-[#42be65] font-bold">{{ selectedComp.temp }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Power Consumption</span>
              <span class="text-white">{{ selectedComp.power }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Latency Profile</span>
              <span class="text-[#42beef] font-bold">{{ selectedComp.cacheLatency }}</span>
            </div>

            <div class="flex justify-between items-center py-1.5 border-b border-[#262626]">
              <span class="text-[#8d8d8d]">Key AI Workload</span>
              <span class="text-[#42be65] text-[11px]">{{ selectedComp.availability }}</span>
            </div>
          </div>
        </div>

        <!-- Hybrid AI Architecture Banner -->
        <div class="bg-[#111111] p-3 rounded border border-[#0f62fe]/40 mt-4 font-mono text-xs">
          <div class="flex items-center gap-1.5 text-[#42beef] font-bold mb-1">
            <span>⚡</span>
            <span>Telum II + Spyre Ensemble Advantage</span>
          </div>
          <div class="text-[11px] text-[#8d8d8d]">
            Telum II scores individual transactions in-flight under 1ms, while Spyre cards execute large generative AI models and multi-modal risk graphs in parallel.
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { state, t } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

const selectedComp = ref({
  id: 'spyre',
  title: 'IBM Spyre™ PCIe AI Accelerator Card',
  desc: 'Specialized 32-core AI accelerator card engineered to complement the IBM Telum II processor. Designed to serve large foundation models, Generative AI (watsonx), and ensemble neural networks directly alongside core enterprise data.',
  freq: 'PCIe Gen5 Custom Interconnect',
  temp: '41.2°C (Optimal)',
  power: '75.0 Watts per Card',
  cacheLatency: 'High-Throughput Foundation Model Pipeline',
  availability: 'Generative AI & Large Language Models'
})

function selectComponent(type, num = null) {
  sound.playClick()
  if (type === 'spyre') {
    selectedComp.value = {
      id: 'spyre',
      title: 'IBM Spyre™ PCIe AI Accelerator Card',
      desc: 'Specialized 32-core AI accelerator card engineered to complement the IBM Telum II processor. Designed to serve large foundation models, Generative AI (watsonx), and ensemble neural networks directly alongside core enterprise data.',
      freq: 'PCIe Gen5 Custom Interconnect',
      temp: '41.2°C (Optimal)',
      power: '75.0 Watts per Card',
      cacheLatency: 'High-Throughput Foundation Model Pipeline',
      availability: 'Generative AI & Large Language Models'
    }
  } else if (type === 'core') {
    selectedComp.value = {
      id: 'core',
      num,
      title: `Telum II High-Performance Core 0${num}`,
      desc: 'Out-of-order execution pipeline with branch prediction and 32MB private L2 cache per core on IBM z17.',
      freq: '5.50 GHz Boost',
      temp: `${(37.5 + (num || 1) * 0.4).toFixed(1)}°C`,
      power: '28.2 Watts',
      cacheLatency: '1.2 ns (L2 Private)',
      availability: 'Dynamic Core Sparing (CP/zIIP)'
    }
  } else if (type === 'ai') {
    selectedComp.value = {
      id: 'ai',
      title: 'IBM Telum II Integrated On-Chip AI Accelerator',
      desc: 'Dedicated on-chip neural network inferencing accelerator designed to score financial transactions in-flight without violating 1ms latency SLAs.',
      freq: '5.50 GHz Interconnect',
      temp: '38.4°C (Optimal)',
      power: '42.5 Watts',
      cacheLatency: '0.04 ms (Virtual L3/L4 Direct)',
      availability: '100% In-Flight Fraud Prevention (<1ms)'
    }
  } else if (type === 'crypto') {
    selectedComp.value = {
      id: 'crypto',
      title: 'Crypto Express 8S HSM Co-Processor',
      desc: 'Hardware cryptographic security module implementing NIST post-quantum cryptographic standards Kyber and Dilithium.',
      freq: 'Hardware PCIe Coprocessor',
      temp: '34.8°C',
      power: '18.4 Watts',
      cacheLatency: '0.12 ms',
      availability: 'FIPS 140-2 Level 4 HSM'
    }
  } else if (type === 'raim') {
    selectedComp.value = {
      id: 'raim',
      title: '64TB RAIM Redundant Memory Subsystem',
      desc: 'Redundant Array of Independent Memory protects against chip failures, channel degradation, and memory controller faults.',
      freq: 'DDR5 Custom RAIM Interface',
      temp: '32.1°C',
      power: '112.0 Watts',
      cacheLatency: '20 µs (zHyperLink)',
      availability: 'Dynamic Lane Sparing (0 Downtime)'
    }
  }
}
</script>
