import { reactive, ref, computed } from 'vue'
import { translations } from '../locales/translations.js'
import { sound } from '../services/audio.js'
import confetti from 'canvas-confetti'

// Reactive Application State
export const state = reactive({
  lang: 'ja', // Default to Japanese for Japan audience
  activeTab: 'global',
  simulationSpeed: 1, // 0 = pause, 1 = 1x, 2 = 2x, 5 = 5x
  isLiveSimulationActive: false,
  showSimModal: false,
  soundEnabled: true,
  inspectedTx: null,

  // Global Realtime Mainframe Metrics
  metrics: {
    tps: 184520,
    peakTps: 198400,
    avgLatency: 0.62, // ms
    cpuUtil: 64.2, // %
    ziipUtil: 98.4, // %
    cryptoUtil: 46.8, // %
    iflUtil: 32.1, // %
    memoryUsage: 42.6, // TB out of 64TB
    memoryMax: 64, // TB
    couplingLag: 0.08, // ms
    pqcRatio: 99.98, // %
    wlmGoalMet: 100.0, // %
    telumInferenceTime: 0.72, // ms
    totalScoredToday: 1489240100,
    fraudBlockedToday: 3428,
    fraudPreventedJpy: 1482900000,
    fraudPrecision: 99.94, // %
    zenginTps: 42800,
    cafisTps: 38200,
    bojNetTps: 12400,
    tokyoLatency: 0.22, // ms
  },

  // Fraud Detection Setting
  fraudThreshold: 75, // Scores above this are blocked

  // Active Incident / Chaos State
  activeScenario: null, // null | 'spike' | 'fraud' | 'power' | 'crypto'
  incidentTimeRemaining: 0,
  incidentLogs: [],

  // Regional Financial Nodes
  nodes: [
    {
      id: 'tokyo',
      nameEn: 'Tokyo Sysplex (Otemachi / Makuhari)',
      nameJa: '東京 シスプレックス (大手町 / 幕張)',
      coords: [139.7671, 35.6812],
      geoX: 79.5, // % for SVG map
      geoY: 38.5,
      tps: 84200,
      ping: 0.22,
      cores: 128,
      status: 'optimal',
      ficonLinks: 64,
      model: 'IBM z16 A02 Dual-DC',
      cicsRegions: 48,
      db2Group: 'DSN1PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    {
      id: 'newyork',
      nameEn: 'New York (Wall St / Armonk)',
      nameJa: 'ニューヨーク (ウォール街 / アーモンク)',
      coords: [-74.006, 40.7128],
      geoX: 28.5,
      geoY: 34.0,
      tps: 48100,
      ping: 64.2,
      cores: 64,
      status: 'optimal',
      ficonLinks: 48,
      model: 'IBM z16 A01',
      cicsRegions: 32,
      db2Group: 'DSN2PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    {
      id: 'london',
      nameEn: 'London (City / Canary Wharf)',
      nameJa: 'ロンドン (シティ / カナリーワーフ)',
      coords: [-0.1278, 51.5074],
      geoX: 48.0,
      geoY: 26.0,
      tps: 31200,
      ping: 112.5,
      cores: 48,
      status: 'optimal',
      ficonLinks: 36,
      model: 'IBM z16 A01',
      cicsRegions: 24,
      db2Group: 'DSN3PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    {
      id: 'singapore',
      nameEn: 'Singapore (Marina Bay Hub)',
      nameJa: 'シンガポール (マリーナベイ)',
      coords: [103.8198, 1.3521],
      geoX: 73.0,
      geoY: 57.0,
      tps: 21900,
      ping: 38.1,
      cores: 32,
      status: 'optimal',
      ficonLinks: 24,
      model: 'IBM z16 A01',
      cicsRegions: 18,
      db2Group: 'DSN4PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    {
      id: 'frankfurt',
      nameEn: 'Frankfurt (ECB Hub)',
      nameJa: 'フランクフルト (ECB拠点)',
      coords: [8.6821, 50.1109],
      geoX: 52.0,
      geoY: 28.0,
      tps: 18400,
      ping: 120.4,
      cores: 32,
      status: 'optimal',
      ficonLinks: 24,
      model: 'IBM z16 A01',
      cicsRegions: 16,
      db2Group: 'DSN5PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    },
    {
      id: 'sydney',
      nameEn: 'Sydney (Pacific FinTech)',
      nameJa: 'シドニー (オーストラリア)',
      coords: [151.2093, -33.8688],
      geoX: 86.0,
      geoY: 78.0,
      tps: 9200,
      ping: 84.8,
      cores: 24,
      status: 'optimal',
      ficonLinks: 16,
      model: 'IBM z16 A01',
      cicsRegions: 12,
      db2Group: 'DSN6PLEX',
      encryption: 'Kyber-1024 Quantum-Safe'
    }
  ],

  // History buffer for dynamic ECharts
  timeLabels: [],
  tpsHistory: [],
  tpsPredictiveUpper: [],
  tpsPredictiveLower: [],
  cpuHistory: [],
  ziipHistory: [],
  cryptoHistory: [],
  latencyHistory: [],
  pqcExchangeHistory: [],

  // Live Transaction Stream
  transactions: [],

  // Watsonx AI Assistant Conversation
  aiMessages: [
    {
      id: 1,
      sender: 'assistant',
      time: '12:00:01 JST',
      textEn: 'IBM Z Mission Control initialized. All 6 global financial nodes connected to Tokyo Dual-Active Sysplex. Telum II AI coprocessors operating at 0.72ms inference latency. How can I assist with your z/OS environment today?',
      textJa: 'IBM Z Mission Control を起動しました。全世界6大金融拠点が東京デュアルアクティブ・シスプレックスに接続完了。Telum II AIコプロセッサは平均0.72msの超低遅延で100%全件推論を実施しています。本日の運用診断やチューニングのご指示を入力してください。',
      code: null,
      action: null
    }
  ]
})

// Translation Helper
export const t = computed(() => {
  return translations[state.lang] || translations.ja
})

// Initialize History Data Buffers
export function initHistory() {
  const now = Date.now()
  state.timeLabels = []
  state.tpsHistory = []
  state.tpsPredictiveUpper = []
  state.tpsPredictiveLower = []
  state.cpuHistory = []
  state.ziipHistory = []
  state.cryptoHistory = []
  state.latencyHistory = []
  state.pqcExchangeHistory = []

  for (let i = 24; i >= 0; i--) {
    const time = new Date(now - i * 2000)
    const timeStr = time.toTimeString().split(' ')[0]
    state.timeLabels.push(timeStr)

    const baseTps = 180000 + Math.sin(i * 0.5) * 6000 + Math.random() * 4000
    state.tpsHistory.push(Math.round(baseTps))
    state.tpsPredictiveUpper.push(Math.round(baseTps * 1.08))
    state.tpsPredictiveLower.push(Math.round(baseTps * 0.94))

    state.cpuHistory.push(parseFloat((62 + Math.random() * 6).toFixed(1)))
    state.ziipHistory.push(parseFloat((97 + Math.random() * 2.5).toFixed(1)))
    state.cryptoHistory.push(parseFloat((44 + Math.random() * 5).toFixed(1)))
    state.latencyHistory.push(parseFloat((0.58 + Math.random() * 0.08).toFixed(2)))
    state.pqcExchangeHistory.push(Math.round(12400 + Math.random() * 1200))
  }

  // Pre-populate realistic synthetic transactions
  for (let i = 0; i < 12; i++) {
    generateSyntheticTransaction()
  }
}

// Japanese Synthetic Bank Data generator
const BANKS_JA = [
  { name: '三菱UFJ銀行', en: 'MUFG Bank', code: '0005', type: 'Megabank' },
  { name: '三井住友銀行', en: 'SMBC', code: '0009', type: 'Megabank' },
  { name: 'みずほ銀行', en: 'Mizuho Bank', code: '0001', type: 'Megabank' },
  { name: 'ゆうちょ銀行', en: 'Japan Post Bank', code: '9900', type: 'National Postal' },
  { name: 'りそな銀行', en: 'Resona Bank', code: '0010', type: 'City Bank' },
  { name: 'PayPay銀行', en: 'PayPay Bank', code: '0033', type: 'Internet Bank' },
  { name: 'JCB Card Tokyo', en: 'JCB International', code: 'JCB9', type: 'Credit Gateway' },
  { name: 'Visa Japan Gateway', en: 'Visa CAFIS Net', code: 'VIS1', type: 'Payment Switch' }
]

const CHANNELS = [
  { name: '全銀ネット (Zengin)', en: 'Zengin Interbank', weight: 4 },
  { name: 'CAFIS ATM 決済', en: 'CAFIS ATM Network', weight: 3 },
  { name: '日銀ネット (BOJ-NET)', en: 'BOJ-NET RTGS', weight: 1 },
  { name: 'QR/Web API 決済', en: 'Open Banking / QR', weight: 3 },
  { name: 'SWIFT ISO 20022', en: 'SWIFT Cross-Border', weight: 2 }
]

const LOCATIONS = [
  { city: 'Tokyo (Chiyoda-ku / 大手町)', lat: 35.68, lon: 139.76, riskMul: 1 },
  { city: 'Tokyo (Shinjuku ATM / 新宿)', lat: 35.69, lon: 139.70, riskMul: 1 },
  { city: 'Osaka (Umeda Hub / 梅田)', lat: 34.70, lon: 135.49, riskMul: 1 },
  { city: 'Nagoya (Sakae / 栄)', lat: 35.17, lon: 136.90, riskMul: 1 },
  { city: 'Fukuoka (Tenjin / 天神)', lat: 33.59, lon: 130.40, riskMul: 1 },
  { city: 'London (UK ATM Overseas)', lat: 51.50, lon: -0.12, riskMul: 1.8 },
  { city: 'Singapore (Changi Terminal)', lat: 1.35, lon: 103.82, riskMul: 1.2 },
  { city: 'New York (Unknown IP Proxy)', lat: 40.71, lon: -74.00, riskMul: 2.2 }
]

let txIdCounter = 8492010

export function generateSyntheticTransaction() {
  txIdCounter++
  const bank = BANKS_JA[Math.floor(Math.random() * BANKS_JA.length)]
  const channel = CHANNELS[Math.floor(Math.random() * CHANNELS.length)]
  const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]

  // Calculate base risk score
  let baseScore = Math.floor(Math.random() * 28) + 2 // 2 to 30 normal
  const isSuspicious = state.activeScenario === 'fraud' ? Math.random() < 0.65 : Math.random() < 0.08

  if (isSuspicious) {
    baseScore = Math.floor(Math.random() * 45) + 52 // 52 to 97
  }

  // Adjust for overseas / unusual amounts
  const isOverseas = loc.city.includes('London') || loc.city.includes('New York')
  if (isOverseas) {
    baseScore += 18
  }

  const finalScore = Math.min(99, Math.max(1, baseScore))
  const isBlocked = finalScore >= state.fraudThreshold

  // Amounts in JPY
  let amount = 0
  if (channel.name.includes('日銀')) {
    amount = Math.floor(Math.random() * 500000000) + 50000000 // 50M to 550M JPY
  } else if (channel.name.includes('全銀')) {
    amount = Math.floor(Math.random() * 4800000) + 12000 // 12k to 4.8M JPY
  } else if (channel.name.includes('ATM')) {
    amount = Math.floor(Math.random() * 180000) + 10000 // 10k to 190k JPY
  } else {
    amount = Math.floor(Math.random() * 850000) + 1500
  }

  const now = new Date()
  const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0')

  // Feature attributions for Explainable AI (XAI)
  const factors = {
    geoVelocity: isOverseas ? 88 : Math.floor(Math.random() * 25),
    deviceRisk: isSuspicious ? Math.floor(Math.random() * 40) + 55 : Math.floor(Math.random() * 15),
    amountDeviation: amount > 2000000 ? Math.floor(Math.random() * 35) + 60 : Math.floor(Math.random() * 20),
    timeAnomaly: Math.floor(Math.random() * 30),
    merchantReputation: isSuspicious ? Math.floor(Math.random() * 35) + 50 : Math.floor(Math.random() * 10)
  }

  const tx = {
    id: `TX-Z16-${txIdCounter}`,
    time: timeStr,
    timestamp: Date.now(),
    bankJa: bank.name,
    bankEn: bank.en,
    bankCode: bank.code,
    channelJa: channel.name,
    channelEn: channel.en,
    location: loc.city,
    amountJpy: amount,
    score: finalScore,
    status: isBlocked ? 'blocked' : (finalScore > 50 ? 'review' : 'approved'),
    telumInferenceMs: (0.64 + Math.random() * 0.16).toFixed(2),
    cryptoProtocol: 'Kyber-1024 / AES-256-GCM',
    factors,
    accountMasked: `****-****-${Math.floor(1000 + Math.random() * 9000)}`,
    terminalId: `ATM-${Math.floor(100 + Math.random() * 899)}-TYO`,
    flagReasonEn: isBlocked ? (factors.geoVelocity > 70 ? 'Anomalous Geo-Velocity (Overseas proxy detected within 4 min of Tokyo PIN tap)' : 'Amount standard deviation >4.2σ + Unregistered device fingerprint') : 'Normal transaction profile',
    flagReasonJa: isBlocked ? (factors.geoVelocity > 70 ? '移動速度異常検知 (直近の東京ATM操作から4分後に海外IP経由でアクセス)' : '金額偏差値 >4.2σ かつ 未登録端末からのアクセスパターン') : '通常取引プロファイル'
  }

  state.transactions.unshift(tx)
  if (state.transactions.length > 25) {
    state.transactions.pop()
  }

  // Update counters
  if (isBlocked) {
    state.metrics.fraudBlockedToday++
    state.metrics.fraudPreventedJpy += amount
    if (state.soundEnabled && Math.random() < 0.3) {
      sound.playFraudDetected()
    }
  }

  return tx
}

// Main Simulation Tick Loop (Every 2 seconds)
export function tickSimulation() {
  if (state.simulationSpeed === 0) return

  const now = new Date()
  const timeStr = now.toTimeString().split(' ')[0]

  // Calculate dynamic TPS based on scenario
  let targetTps = 184000 + (Math.sin(Date.now() / 15000) * 12000) + (Math.random() * 6000 - 3000)
  let targetCpu = 62 + (Math.random() * 5)
  let targetLatency = 0.62 + (Math.random() * 0.05)
  let targetZiip = 98.4 + (Math.random() * 0.8 - 0.4)

  if (state.activeScenario === 'spike') {
    targetTps = 485000 + Math.random() * 40000
    targetCpu = 91.5 + Math.random() * 4.2
    targetLatency = 0.88 + Math.random() * 0.12
    targetZiip = 99.8
  } else if (state.activeScenario === 'fraud') {
    targetTps = 245000 + Math.random() * 20000
    targetCpu = 78.4 + Math.random() * 5.0
    state.metrics.cryptoUtil = 86.4 + Math.random() * 6.0
  } else if (state.activeScenario === 'power') {
    targetTps = 168000 + Math.random() * 8000
    targetLatency = 0.74 + Math.random() * 0.06
  } else if (state.activeScenario === 'crypto') {
    state.metrics.cryptoUtil = 94.2 + Math.random() * 3.5
    state.metrics.pqcRatio = 100.0
  }

  // Smooth updates
  state.metrics.tps = Math.round(targetTps)
  state.metrics.cpuUtil = parseFloat(targetCpu.toFixed(1))
  state.metrics.avgLatency = parseFloat(targetLatency.toFixed(2))
  state.metrics.ziipUtil = parseFloat(targetZiip.toFixed(1))
  state.metrics.totalScoredToday += Math.round(targetTps * 2)

  // Sub-breakdowns
  state.metrics.zenginTps = Math.round(targetTps * 0.23)
  state.metrics.cafisTps = Math.round(targetTps * 0.21)
  state.metrics.bojNetTps = Math.round(targetTps * 0.07)

  // Update history arrays
  state.timeLabels.push(timeStr)
  if (state.timeLabels.length > 25) state.timeLabels.shift()

  state.tpsHistory.push(state.metrics.tps)
  if (state.tpsHistory.length > 25) state.tpsHistory.shift()

  state.tpsPredictiveUpper.push(Math.round(state.metrics.tps * 1.08))
  if (state.tpsPredictiveUpper.length > 25) state.tpsPredictiveUpper.shift()

  state.tpsPredictiveLower.push(Math.round(state.metrics.tps * 0.94))
  if (state.tpsPredictiveLower.length > 25) state.tpsPredictiveLower.shift()

  state.cpuHistory.push(state.metrics.cpuUtil)
  if (state.cpuHistory.length > 25) state.cpuHistory.shift()

  state.ziipHistory.push(state.metrics.ziipUtil)
  if (state.ziipHistory.length > 25) state.ziipHistory.shift()

  state.cryptoHistory.push(parseFloat((state.metrics.cryptoUtil + (Math.random() * 4 - 2)).toFixed(1)))
  if (state.cryptoHistory.length > 25) state.cryptoHistory.shift()

  state.latencyHistory.push(state.metrics.avgLatency)
  if (state.latencyHistory.length > 25) state.latencyHistory.shift()

  state.pqcExchangeHistory.push(Math.round(12000 + targetTps * 0.08 + Math.random() * 800))
  if (state.pqcExchangeHistory.length > 25) state.pqcExchangeHistory.shift()

  // Generate 2-4 transactions per tick
  const txCount = state.activeScenario === 'fraud' || state.activeScenario === 'spike' ? 4 : 2
  for (let i = 0; i < txCount; i++) {
    generateSyntheticTransaction()
  }

  // Handle active incident countdown
  if (state.activeScenario && state.incidentTimeRemaining > 0) {
    state.incidentTimeRemaining -= 2
    if (state.incidentTimeRemaining <= 0) {
      resolveScenario(true)
    }
  }
}

// Inject Chaos Incident Scenarios
export function injectScenario(scenarioId) {
  state.activeScenario = scenarioId
  state.incidentTimeRemaining = 30 // 30 seconds default
  sound.playAlert()

  const timestamp = new Date().toTimeString().split(' ')[0]

  if (scenarioId === 'spike') {
    state.nodes[0].status = 'busy'
    state.nodes[1].status = 'busy'
    state.aiMessages.push({
      id: Date.now(),
      sender: 'assistant',
      time: timestamp,
      textEn: '🚨 [CRITICAL ALERT] Sudden 500,000+ TPS Flash Crowd detected across Tokyo & New York gateways. WLM automatically promoting CICS transactions to Importance Level 1 and allocating spare zIIP engines.',
      textJa: '🚨【緊急アラート】東京およびニューヨークのゲートウェイで 50万TPS 超のフラッシュクラウド急増を検知。z/OS Workload Manager (WLM) が自動発動し、CICSオンライントランザクションを最重要度1に昇格、zIIPプロセッサーをフル動員して遅延を0.88ms以内に抑え込んでいます。',
      code: '/* WLM Policy Dynamic Modification */\nSET WLM=SPX_PROD_PEAK\nDISPLAY WLM,SERVICE_CLASS=CICS_HOT',
      action: 'wlm_autoscale'
    })
  } else if (scenarioId === 'fraud') {
    state.nodes[0].status = 'attack'
    state.nodes[2].status = 'attack'
    state.aiMessages.push({
      id: Date.now(),
      sender: 'assistant',
      time: timestamp,
      textEn: '⚠️ [CYBER SECURITY] Coordinated global ATM spoofing attack detected targeting Tokyo Megabanks and London City ATMs. IBM Telum On-Chip AI has stepped up inline neural evaluation. 100% of anomalous payloads are being quarantined with 0ms latency impact.',
      textJa: '⚠️【セキュリティ警戒】東京メガバンクおよびロンドン拠点を標的とした協調型ATM偽造カード不正攻撃を検知。IBM Telum オンチップAIアクセラレータが全件リアルタイム照合を実施し、高リスク取引を自動遮断中。正規決済への影響はゼロです。',
      code: '/* Telum Real-Time Fraud Quarantine */\nF TELUM_AI,QUARANTINE_OVERSEAS_SIM\nF CICS_PAY,ENFORCE_MFA_STEPUP',
      action: 'fraud_quarantine'
    })
  } else if (scenarioId === 'power') {
    state.nodes[0].status = 'failover'
    state.aiMessages.push({
      id: Date.now(),
      sender: 'assistant',
      time: timestamp,
      textEn: '⚡ [INFRASTRUCTURE] Otemachi Substation voltage transient detected. GDPS Metro HyperSwap initiated in 40 microseconds. Zero data loss (RPO=0), zero transaction aborts as Makuhari DC takes primary Sysplex leadership.',
      textJa: '⚡【インフラ障害検知】大手町データセンター側で変電所瞬低を検知。GDPS Metro HyperSwap が 40マイクロ秒 で自動発動。データ損失ゼロ (RPO=0)・トランザクション中断ゼロで幕張DCへアクティブ系を瞬時移行しました。',
      code: '/* GDPS Metro HyperSwap Execution */\nGDPS HYPERSWAP EXECUTE,TARGET=MAKUHARI_DC\nDISPLAY GDPS,STATUS=COMPLETE,RPO=0',
      action: 'gdps_rebalance'
    })
  } else if (scenarioId === 'crypto') {
    state.aiMessages.push({
      id: Date.now(),
      sender: 'assistant',
      time: timestamp,
      textEn: '🛡️ [QUANTUM-SAFE DEFENSE] Harvest-Now-Decrypt-Later interception signature identified on transatlantic FICON trunks. Crypto Express 8S has rotated all session keys to NIST Kyber-1024 / Dilithium lattice cryptography.',
      textJa: '🛡️【耐量子暗号防御発動】大西洋横断FICON回線上で暗号傍受試行シグネチャを検知。Crypto Express 8S コプロセッサが即座に全セッション鍵をNIST耐量子暗号（Kyber-1024 / Dilithium）へ完全自動ローテーションしました。',
      code: '/* Crypto Express 8S PQC Key Rotation */\nMODIFY ICSF,ROTATE_KEYS,ALGO=NIST_KYBER1024\nDISPLAY ICSF,PQC_COMPLIANCE=100PCT',
      action: 'pqc_audit'
    })
  }
}

// Resolve Active Scenario / Self-Healing
export function resolveScenario(auto = false) {
  state.activeScenario = null
  state.incidentTimeRemaining = 0
  state.nodes.forEach(n => n.status = 'optimal')

  sound.playSuccess()

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0f62fe', '#42beef', '#0043ce', '#42be65', '#ffffff']
  })

  const timestamp = new Date().toTimeString().split(' ')[0]
  state.aiMessages.push({
    id: Date.now(),
    sender: 'assistant',
    time: timestamp,
    textEn: '✅ [SELF-HEALING COMPLETE] All Sysplex nodes have returned to optimal baseline parameters. Continuous continuous availability verified. SLA maintained at 99.99999%.',
    textJa: '✅【自律復旧完了】すべてのシスプレックスノードが最適基準値に復帰しました。7ナイン (99.99999%) の連続可用性を維持し、業務トランザクションの全件正常処理を確認しました。',
    code: 'DISPLAY SYSPLEX,ALL\n* IEE136I LOCAL TIME: ' + timestamp + ' SYSPLEX OPTIMAL',
    action: null
  })
}

// User send message to Watsonx Assistant
export function sendAiMessage(userText) {
  const timestamp = new Date().toTimeString().split(' ')[0]

  state.aiMessages.push({
    id: Date.now(),
    sender: 'user',
    time: timestamp,
    textEn: userText,
    textJa: userText
  })

  sound.playBeep(980, 0.06)

  // Generate intelligent response based on prompt keywords
  setTimeout(() => {
    let replyEn = ''
    let replyJa = ''
    let snippet = null

    const lower = userText.toLowerCase()
    if (lower.includes('coupling') || lower.includes('cf') || userText.includes('CF') || userText.includes('カップリング') || userText.includes('遅延')) {
      replyEn = `Current Sysplex Coupling Facility link latency is 0.08ms with 0.02% lock contention. Buffer cache hit ratio on CF01 (Otemachi) and CF02 (Makuhari) is 99.88%. Recommended action: No tuning required; link capacity is optimal.`
      replyJa = `現在のカップリング・ファシリティ (CF) リンク遅延は 0.08ms、ロック競合率は 0.02% と極めて良好です。CF01 (大手町) および CF02 (幕張) のキャッシュヒット率は 99.88% です。現時点でチューニングの必要はなく、最適なスループットを維持しています。`
      snippet = 'D XCF,STRUCTURE,STRNAME=*\nD GRS,CONTENTION'
    } else if (lower.includes('telum') || lower.includes('fraud') || userText.includes('不正') || userText.includes('推論') || userText.includes('ai')) {
      replyEn = `IBM Telum II integrated AI accelerator is processing ${state.metrics.tps.toLocaleString()} inferences/sec with average execution time of ${state.metrics.telumInferenceTime}ms. Zero PCIe bus penalty achieved via direct 256MB virtual L3/L4 cache connection.`
      replyJa = `IBM Telum II 統合オンチップAIアクセラレータは、現在 毎秒 ${state.metrics.tps.toLocaleString()} 件のインフライト推論を平均 ${state.metrics.telumInferenceTime}ms で処理中。256MB 仮想L3/L4キャッシュ直結によりPCIe遅延を完全排除しています。`
      snippet = 'F TELUM_AI,QUERY,DETAIL\nF WLM,DISPLAY_AI_ROUTING'
    } else if (lower.includes('jcl') || userText.includes('JCL') || userText.includes('ワークロード')) {
      replyEn = `Generated dynamic JCL snippet for dynamic capacity reallocation and CICS high-priority transaction routing.`
      replyJa = `動的キャパシティ再配分および CICS 高優先度トランザクションルーティング用の JCL テンプレートを生成しました。`
      snippet = `//Z16TUNE  JOB (ACCT#),'AI-OPS AUTO-TUNE',CLASS=A,MSGCLASS=X\n//STEP1    EXEC PGM=IWMWSL\n//SYSIN    DD *\n  SET SERVICE_CLASS(CICS_HOT) IMPORTANCE(1)\n  ALLOCATE ENGINES(zIIP=ALL, CP=DYNAMIC)\n/*`
    } else if (lower.includes('quantum') || lower.includes('pqc') || userText.includes('耐量子') || userText.includes('暗号') || userText.includes('ficon')) {
      replyEn = `Quantum-Safe Cryptography Audit: 100% of active FICON channels and CPACF hardware engines are running NIST FIPS 203 (ML-KEM / Kyber-1024) and FIPS 204 (ML-DSA / Dilithium). Quantum harvest risk is zero.`
      replyJa = `耐量子暗号 (PQC) 監査結果: 稼働中の全FICONチャネルおよびCPACF暗号化エンジンにおいて、NIST標準 FIPS 203 (ML-KEM / Kyber-1024) および FIPS 204 (ML-DSA / Dilithium) が 100% 有効です。将来の量子解読脅威に対して完全防御されています。`
      snippet = 'D ICSF,CRYPTOMK\nD ICSF,PQC_AUDIT'
    } else {
      replyEn = `Telemetry scan completed for query "${userText}". All z/OS 3.1 subsystems (CICS, IMS, Db2 13 for z/OS, MQ) are meeting SLA goals at 100.0%. Telum on-chip inference pipeline is synchronized.`
      replyJa = `ご質問「${userText}」に関するテレメトリ診断を実施しました。すべての z/OS 3.1 サブシステム (CICS, IMS, Db2 13 for z/OS, MQ) はサービス目標達成率 100.0% で推移しています。Telum II AIパイプラインも正常です。`
      snippet = 'D A,L\nD OPDATA,MONITOR'
    }

    state.aiMessages.push({
      id: Date.now(),
      sender: 'assistant',
      time: new Date().toTimeString().split(' ')[0],
      textEn: replyEn,
      textJa: replyJa,
      code: snippet
    })

    sound.playBeep(1200, 0.08)
  }, 450)
}
