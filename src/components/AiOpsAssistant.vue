<template>
  <div class="space-y-6">
    
    <!-- Title Header -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded bg-[#8a3ffc]/20 border border-[#8a3ffc]/40 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-lg lg:text-xl font-bold font-mono text-white">
              {{ t.aiOpsTitle }}
            </h2>
            <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-[#8a3ffc]/20 text-[#8a3ffc] border border-[#8a3ffc]/40 font-semibold">
              WATSONX FOR Z
            </span>
          </div>
          <p class="text-xs text-[#8d8d8d] mt-0.5">
            {{ t.aiOpsSubtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 font-mono text-xs">
        <span class="px-2.5 py-1 bg-[#111111] border border-[#262626] text-[#42be65] rounded">
          z/OS LLM Fine-Tuned
        </span>
      </div>
    </div>

    <!-- Main Chat Window & Prompt Chips -->
    <div class="bg-[#161616] border border-[#262626] rounded p-4 flex flex-col h-[580px] justify-between">
      
      <!-- Chat Messages Scroll Area -->
      <div ref="chatScrollRef" class="space-y-4 overflow-y-auto pr-2 flex-1 mb-4">
        <div 
          v-for="msg in state.aiMessages" 
          :key="msg.id"
          class="flex flex-col"
          :class="msg.sender === 'user' ? 'items-end' : 'items-start'"
        >
          <div class="flex items-center gap-2 mb-1 text-[11px] font-mono text-[#8d8d8d]">
            <span v-if="msg.sender === 'assistant'" class="text-[#8a3ffc] font-bold">watsonx for z/OS</span>
            <span v-else class="text-[#42beef] font-bold">Mainframe Sysprog</span>
            <span>• {{ msg.time }}</span>
          </div>

          <!-- Message Bubble -->
          <div 
            class="max-w-[85%] rounded p-3 text-xs font-mono leading-relaxed"
            :class="msg.sender === 'user' ? 'bg-[#0f62fe] text-white' : 'bg-[#111111] border border-[#262626] text-[#f4f4f4]'"
          >
            <p>{{ state.lang === 'ja' ? msg.textJa : msg.textEn }}</p>

            <!-- Optional Code Block / JCL Snippet -->
            <div v-if="msg.code" class="mt-3">
              <div class="flex items-center justify-between text-[10px] text-[#8d8d8d] bg-[#1a1a1a] px-2.5 py-1 rounded-t border-t border-x border-[#393939]">
                <span>z/OS Command / JCL Payload</span>
                <button 
                  @click="copyCode(msg.code)" 
                  class="text-[#42beef] hover:underline"
                >
                  Copy
                </button>
              </div>
              <pre class="bg-[#0a0a0c] p-2.5 rounded-b border border-[#393939] text-[#42beef] overflow-x-auto text-[11px] font-mono">{{ msg.code }}</pre>
            </div>

            <!-- Optional Action Button -->
            <div v-if="msg.action" class="mt-3 pt-2 border-t border-[#262626]">
              <button 
                @click="applyAiAction(msg.action)"
                class="px-3 py-1.5 bg-[#42be65]/20 hover:bg-[#42be65]/30 border border-[#42be65] text-[#42be65] rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              >
                <span>⚡</span>
                <span>{{ state.lang === 'ja' ? 'このAI推奨アクションをシスプレックスに適用' : 'Execute Autonomous Action on Sysplex' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Interactive Prompt Chips -->
      <div class="space-y-2 pt-2 border-t border-[#262626]">
        <span class="text-[11px] font-mono text-[#8d8d8d] block">{{ state.lang === 'ja' ? '推奨プロンプト' : 'Recommended Prompts' }}:</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
          <button 
            v-for="(chip, idx) in promptChips" 
            :key="idx"
            @click="sendPrompt(chip)"
            class="px-2.5 py-1.5 bg-[#111111] hover:bg-[#262626] border border-[#262626] hover:border-[#0f62fe] text-left text-[#f4f4f4] rounded transition-all truncate text-[11px]"
          >
            💬 {{ chip }}
          </button>
        </div>
      </div>

      <!-- User Chat Input Box -->
      <form @submit.prevent="handleSend" class="flex gap-2 mt-3">
        <input 
          v-model="inputQuery"
          type="text" 
          :placeholder="t.chatPlaceholder"
          class="flex-1 bg-[#111111] border border-[#262626] focus:border-[#0f62fe] rounded px-3 py-2 text-xs font-mono text-white focus:outline-none"
        />
        <button 
          type="submit" 
          class="px-5 py-2 bg-[#0f62fe] hover:bg-[#0043ce] text-white font-mono text-xs font-semibold rounded transition-colors flex items-center gap-1"
        >
          <span>{{ t.send }}</span>
          <span>↵</span>
        </button>
      </form>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { state, t, sendAiMessage, resolveScenario } from '../stores/simulation.js'
import { sound } from '../services/audio.js'

const inputQuery = ref('')
const chatScrollRef = ref(null)

const promptChips = computed(() => [
  t.value.promptChip1,
  t.value.promptChip2,
  t.value.promptChip3,
  t.value.promptChip4
])

function handleSend() {
  if (!inputQuery.value.trim()) return
  const text = inputQuery.value
  inputQuery.value = ''
  sendAiMessage(text)
  scrollToBottom()
}

function sendPrompt(promptText) {
  sendAiMessage(promptText)
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatScrollRef.value) {
      chatScrollRef.value.scrollTop = chatScrollRef.value.scrollHeight
    }
  })
}

function copyCode(code) {
  navigator.clipboard.writeText(code)
  sound.playClick()
}

function applyAiAction(action) {
  sound.playSuccess()
  resolveScenario()
}
</script>
