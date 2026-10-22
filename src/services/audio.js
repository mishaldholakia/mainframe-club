// Web Audio API Procedural Sound Synthesizer for IBM Z Mission Control
class SoundService {
  constructor() {
    this.ctx = null
    this.enabled = true
    this.volume = 0.35
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggle() {
    this.enabled = !this.enabled
    if (this.enabled) {
      this.init()
      this.playClick()
    }
    return this.enabled
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol))
  }

  playClick() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04)

      gain.gain.setValueAtTime(this.volume * 0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {
      // Audio context error ignore
    }
  }

  playBeep(freq = 880, duration = 0.08, type = 'sine') {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = type
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(this.volume * 0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + duration)
    } catch {
      // Ignore
    }
  }

  playAlert() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'sawtooth'
      osc2.type = 'square'

      osc1.frequency.setValueAtTime(440, now)
      osc1.frequency.setValueAtTime(880, now + 0.1)
      osc1.frequency.setValueAtTime(440, now + 0.2)
      osc1.frequency.setValueAtTime(880, now + 0.3)

      osc2.frequency.setValueAtTime(445, now)
      osc2.frequency.setValueAtTime(885, now + 0.1)
      osc2.frequency.setValueAtTime(445, now + 0.2)
      osc2.frequency.setValueAtTime(885, now + 0.3)

      gain.gain.setValueAtTime(this.volume * 0.22, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.45)
      osc2.stop(now + 0.45)
    } catch {
      // Ignore
    }
  }

  playSuccess() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const noteStart = now + idx * 0.08

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, noteStart)

        gain.gain.setValueAtTime(this.volume * 0.25, noteStart)
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(noteStart)
        osc.stop(noteStart + 0.25)
      })
    } catch {
      // Ignore
    }
  }

  playFraudDetected() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2)

      gain.gain.setValueAtTime(this.volume * 0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.22)
    } catch {
      // Ignore
    }
  }

  playLaunch() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.5)

      gain.gain.setValueAtTime(this.volume * 0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.6)
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundService()
