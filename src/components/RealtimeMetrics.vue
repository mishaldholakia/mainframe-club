<template>
  <div class="space-y-6">
    
    <!-- Title Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#42be65] animate-pulse"></span>
          <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
            {{ t.telemetryTitle }}
          </h2>
        </div>
        <p class="text-xs text-[#8d8d8d] mt-0.5">
          {{ t.telemetrySubtitle }}
        </p>
      </div>

      <div class="flex items-center gap-2 font-mono text-xs">
        <span class="px-2.5 py-1 bg-[#111111] border border-[#262626] text-[#42beef] rounded">
          z/OSMF REST API v2.5
        </span>
        <span class="px-2.5 py-1 bg-[#111111] border border-[#262626] text-[#42be65] rounded">
          RMF Buffer: Synced
        </span>
      </div>
    </div>

    <!-- Top Charts Grid: TPS with Predictive Bounds + Multi-Engine Utilization -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Chart 1: TPS & AI Forecast -->
      <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
              <span class="text-[#0f62fe]">■</span> {{ t.tpsChartTitle }}
            </h3>
            <span class="text-[11px] text-[#8d8d8d]">
              {{ state.lang === 'ja' ? '実績値 + AI 予測信頼区間 (95% CI)' : 'Actual + AI Forecast Bounds (95% CI)' }}
            </span>
          </div>
          <span class="text-xs font-mono font-bold text-[#42beef]">
            {{ state.metrics.tps.toLocaleString() }} TPS
          </span>
        </div>
        <div ref="tpsChartRef" class="w-full h-[260px]"></div>
      </div>

      <!-- Chart 2: Multi-Engine Core Utilization -->
      <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
              <span class="text-[#42be65]">■</span> {{ t.engineChartTitle }}
            </h3>
            <span class="text-[11px] text-[#8d8d8d]">
              CP • zIIP (Offload) • IFL • Crypto Express 8S
            </span>
          </div>
          <span class="text-xs font-mono font-bold text-[#42be65]">
            zIIP: {{ state.metrics.ziipUtil }}%
          </span>
        </div>
        <div ref="engineChartRef" class="w-full h-[260px]"></div>
      </div>

    </div>

    <!-- Bottom Charts Grid: Telum AI Latency Histogram + 64TB RAIM Memory / Coupling Facility -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Chart 3: Telum AI Sub-millisecond Latency Distribution -->
      <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
              <span class="text-[#8a3ffc]">■</span> {{ t.aiLatencyTitle }}
            </h3>
            <span class="text-[11px] text-[#8d8d8d]">
              {{ state.lang === 'ja' ? '全件インフライト推論 • 1.0ms SLA を 100% 遵守' : '100% In-Flight Inference within 1.0ms SLA' }}
            </span>
          </div>
          <span class="text-xs font-mono font-bold text-[#8a3ffc]">
            Avg: {{ state.metrics.telumInferenceTime }}ms
          </span>
        </div>
        <div ref="aiLatencyChartRef" class="w-full h-[240px]"></div>
      </div>

      <!-- Chart 4: Coupling Facility & Memory Contention -->
      <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-sm font-mono font-bold text-white flex items-center gap-2">
              <span class="text-[#42beef]">■</span> {{ t.memoryTitle }}
            </h3>
            <span class="text-[11px] text-[#8d8d8d]">
              RAIM 64TB Pool: {{ state.metrics.memoryUsage.toFixed(1) }} TB ({{ Math.round((state.metrics.memoryUsage / 64) * 100) }}%)
            </span>
          </div>
          <span class="text-xs font-mono font-bold text-[#42be65]">
            Lock Contention: 0.02%
          </span>
        </div>
        <div ref="memoryChartRef" class="w-full h-[240px]"></div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { state, t } from '../stores/simulation.js'

const tpsChartRef = ref(null)
const engineChartRef = ref(null)
const aiLatencyChartRef = ref(null)
const memoryChartRef = ref(null)

let tpsChart = null
let engineChart = null
let aiLatencyChart = null
let memoryChart = null

function initTpsChart() {
  if (!tpsChartRef.value) return
  tpsChart = echarts.init(tpsChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#111111',
      borderColor: '#262626',
      textStyle: { color: '#f4f4f4', fontFamily: 'IBM Plex Mono', fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: state.timeLabels,
      axisLine: { lineStyle: { color: '#393939' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#393939' } },
      splitLine: { lineStyle: { color: '#262626', type: 'dashed' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    series: [
      {
        name: 'AI Upper Bound',
        type: 'line',
        data: state.tpsPredictiveUpper,
        lineStyle: { opacity: 0 },
        stack: 'confidence',
        symbol: 'none'
      },
      {
        name: 'AI Forecast Band',
        type: 'line',
        data: state.tpsPredictiveUpper.map((val, idx) => val - state.tpsPredictiveLower[idx]),
        lineStyle: { opacity: 0 },
        areaStyle: { color: 'rgba(15, 98, 254, 0.12)' },
        stack: 'confidence',
        symbol: 'none'
      },
      {
        name: 'Actual TPS',
        type: 'line',
        data: state.tpsHistory,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2.5, color: '#42beef' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(66, 190, 239, 0.4)' },
            { offset: 1, color: 'rgba(15, 98, 254, 0.0)' }
          ])
        }
      }
    ]
  }
  tpsChart.setOption(option)
}

function initEngineChart() {
  if (!engineChartRef.value) return
  engineChart = echarts.init(engineChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#111111',
      borderColor: '#262626',
      textStyle: { color: '#f4f4f4', fontFamily: 'IBM Plex Mono', fontSize: 11 }
    },
    legend: {
      data: ['CP (General)', 'zIIP Offload', 'Crypto Express 8S'],
      textStyle: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: state.timeLabels,
      axisLine: { lineStyle: { color: '#393939' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { lineStyle: { color: '#393939' } },
      splitLine: { lineStyle: { color: '#262626', type: 'dashed' } },
      axisLabel: { formatter: '{value}%', color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    series: [
      {
        name: 'zIIP Offload',
        type: 'line',
        data: state.ziipHistory,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: '#42be65' }
      },
      {
        name: 'CP (General)',
        type: 'line',
        data: state.cpuHistory,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: '#0f62fe' }
      },
      {
        name: 'Crypto Express 8S',
        type: 'line',
        data: state.cryptoHistory,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: '#8a3ffc' }
      }
    ]
  }
  engineChart.setOption(option)
}

function initAiLatencyChart() {
  if (!aiLatencyChartRef.value) return
  aiLatencyChart = echarts.init(aiLatencyChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#111111',
      borderColor: '#262626',
      textStyle: { color: '#f4f4f4', fontFamily: 'IBM Plex Mono', fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['0.2ms', '0.4ms', '0.6ms', '0.8ms', '1.0ms (SLA)', '>1.2ms'],
      axisLine: { lineStyle: { color: '#393939' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#393939' } },
      splitLine: { lineStyle: { color: '#262626', type: 'dashed' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    series: [
      {
        name: 'Inference Frequency (k/sec)',
        type: 'bar',
        data: [
          { value: 42, itemStyle: { color: '#0f62fe' } },
          { value: 88, itemStyle: { color: '#42beef' } },
          { value: 124, itemStyle: { color: '#8a3ffc' } },
          { value: 36, itemStyle: { color: '#0f62fe' } },
          { value: 2, itemStyle: { color: '#f1c21b' } },
          { value: 0, itemStyle: { color: '#fa4d56' } }
        ],
        barWidth: '45%',
        markLine: {
          data: [{ xAxis: 4, name: '1.0ms SLA Limit' }],
          lineStyle: { color: '#fa4d56', type: 'dashed', width: 2 },
          label: { color: '#fa4d56', fontFamily: 'IBM Plex Mono', fontSize: 10 }
        }
      }
    ]
  }
  aiLatencyChart.setOption(option)
}

function initMemoryChart() {
  if (!memoryChartRef.value) return
  memoryChart = echarts.init(memoryChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#111111',
      borderColor: '#262626',
      textStyle: { color: '#f4f4f4', fontFamily: 'IBM Plex Mono', fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: state.timeLabels,
      axisLine: { lineStyle: { color: '#393939' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#393939' } },
      splitLine: { lineStyle: { color: '#262626', type: 'dashed' } },
      axisLabel: { color: '#8d8d8d', fontFamily: 'IBM Plex Mono', fontSize: 10 }
    },
    series: [
      {
        name: 'PQC Exchange Keys/s',
        type: 'bar',
        data: state.pqcExchangeHistory,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#42beef' },
            { offset: 1, color: '#0f62fe' }
          ])
        },
        barWidth: '40%'
      }
    ]
  }
  memoryChart.setOption(option)
}

function updateCharts() {
  if (tpsChart) {
    tpsChart.setOption({
      xAxis: { data: state.timeLabels },
      series: [
        { data: state.tpsPredictiveUpper },
        { data: state.tpsPredictiveUpper.map((val, idx) => val - state.tpsPredictiveLower[idx]) },
        { data: state.tpsHistory }
      ]
    })
  }

  if (engineChart) {
    engineChart.setOption({
      xAxis: { data: state.timeLabels },
      series: [
        { data: state.ziipHistory },
        { data: state.cpuHistory },
        { data: state.cryptoHistory }
      ]
    })
  }

  if (memoryChart) {
    memoryChart.setOption({
      xAxis: { data: state.timeLabels },
      series: [{ data: state.pqcExchangeHistory }]
    })
  }
}

function handleResize() {
  tpsChart?.resize()
  engineChart?.resize()
  aiLatencyChart?.resize()
  memoryChart?.resize()
}

onMounted(() => {
  initTpsChart()
  initEngineChart()
  initAiLatencyChart()
  initMemoryChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  tpsChart?.dispose()
  engineChart?.dispose()
  aiLatencyChart?.dispose()
  memoryChart?.dispose()
})

// Watch state updates to refresh chart data
watch(() => state.tpsHistory.length, () => {
  updateCharts()
})
watch(() => state.metrics.tps, () => {
  updateCharts()
})
</script>
