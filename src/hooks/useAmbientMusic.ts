import { useEffect, useRef, useState } from 'react'

/**
 * Auspicious Indian wedding instrumental (Raag Yaman santoor/harp melody + warm tanpura pad)
 * synthesized via Web Audio API so it works reliably with zero external MP3 dependencies.
 * Plays by default when the invite opens (and unlocks on first touch/scroll/click if the browser
 * initially suspends AudioContext); the guest can mute/unmute anytime.
 */
export function useAmbientMusic() {
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const melodyBusRef = useRef<GainNode | null>(null)
  const oscsRef = useRef<OscillatorNode[]>([])
  const timerRef = useRef<number | null>(null)
  const hasPlayedFirstBarRef = useRef(false)
  const userMutedRef = useRef(false)

  const playPluck = (
    ctx: AudioContext,
    dest: AudioNode,
    freq: number,
    delaySec: number,
    duration: number,
    peak = 0.22
  ) => {
    const start = ctx.currentTime + delaySec
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const noteGain = ctx.createGain()

    // Warm santoor / harp timbre: fundamental triangle + soft octave sine harmonic
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(freq, start)

    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 2, start)

    const harmonicGain = ctx.createGain()
    harmonicGain.gain.setValueAtTime(0.28, start)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2400, start)
    filter.frequency.exponentialRampToValueAtTime(650, start + duration)

    noteGain.gain.setValueAtTime(0.0001, start)
    noteGain.gain.linearRampToValueAtTime(peak, start + 0.025)
    noteGain.gain.exponentialRampToValueAtTime(0.0008, start + duration)

    osc1.connect(filter)
    osc2.connect(harmonicGain)
    harmonicGain.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(dest)

    osc1.start(start)
    osc2.start(start)
    osc1.stop(start + duration + 0.05)
    osc2.stop(start + duration + 0.05)
  }

  // Raag Yaman auspicious wedding melody phrases (in C: B3, D4, E4, F#4, G4, A4, B4, C5, D5, E5)
  const scheduleMelodyBar = (ctx: AudioContext, melodyBus: AudioNode) => {
    if (ctx.state !== 'running' || userMutedRef.current) return

    const N3 = 246.94
    const S4 = 261.63
    const R4 = 293.66
    const G4 = 329.63
    const M4 = 369.99 // Tivra Ma (F#4)
    const P4 = 392.0
    const D4 = 440.0
    const N4 = 493.88
    const S5 = 523.25
    const R5 = 587.33
    const G5 = 659.25

    const sequence: Array<[number, number, number, number]> = [
      // Phrase 1: Ni Re Ga, Ma# Dha Ni Sa'
      [N3, 0.0, 1.4, 0.2],
      [R4, 0.55, 1.4, 0.22],
      [G4, 1.1, 2.2, 0.25],
      [M4, 2.2, 1.2, 0.2],
      [D4, 2.75, 1.3, 0.22],
      [N4, 3.3, 1.4, 0.22],
      [S5, 3.85, 2.6, 0.26],

      // Phrase 2: Sa' R5 G5 R5 Sa', Ni Dha Pa
      [R5, 5.2, 1.1, 0.2],
      [G5, 5.75, 1.4, 0.22],
      [R5, 6.4, 1.2, 0.2],
      [S5, 6.95, 1.8, 0.24],
      [N4, 7.8, 1.1, 0.2],
      [D4, 8.35, 1.2, 0.21],
      [P4, 8.9, 2.4, 0.24],

      // Phrase 3: Ma# Ga Re, Ni Re Sa
      [M4, 10.2, 1.2, 0.2],
      [G4, 10.75, 1.5, 0.23],
      [R4, 11.45, 1.5, 0.21],
      [N3, 12.2, 1.1, 0.19],
      [R4, 12.75, 1.2, 0.21],
      [S4, 13.35, 2.8, 0.25],
    ]

    sequence.forEach(([freq, offset, dur, peak]) => {
      playPluck(ctx, melodyBus, freq, offset, dur, peak)
    })
  }

  const initAudio = () => {
    if (ctxRef.current && masterRef.current) return ctxRef.current

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, ctx.currentTime)
    master.connect(ctx.destination)

    // Soft echo / ambience for plucked notes
    const delay = ctx.createDelay(1.0)
    delay.delayTime.setValueAtTime(0.32, ctx.currentTime)
    const feedback = ctx.createGain()
    feedback.gain.setValueAtTime(0.28, ctx.currentTime)
    const wetFilter = ctx.createBiquadFilter()
    wetFilter.type = 'lowpass'
    wetFilter.frequency.setValueAtTime(1600, ctx.currentTime)

    delay.connect(wetFilter)
    wetFilter.connect(feedback)
    feedback.connect(delay)
    wetFilter.connect(master)

    const melodyBus = ctx.createGain()
    melodyBus.gain.setValueAtTime(1.0, ctx.currentTime)
    melodyBus.connect(master)
    melodyBus.connect(delay)

    // Warm Tanpura / Pad drone (C4, G4, C5)
    const padFilter = ctx.createBiquadFilter()
    padFilter.type = 'lowpass'
    padFilter.frequency.setValueAtTime(600, ctx.currentTime)
    padFilter.connect(master)

    const droneFreqs = [261.63, 392.0, 523.25] // Sa (C4), Pa (G4), Sa (C5)
    const droneOscs = droneFreqs.map((f, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = i === 1 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(f, ctx.currentTime)
      g.gain.setValueAtTime(i === 2 ? 0.035 : 0.06, ctx.currentTime)
      osc.connect(g)
      g.connect(padFilter)
      osc.start()
      return osc
    })

    ctxRef.current = ctx
    masterRef.current = master
    melodyBusRef.current = melodyBus
    oscsRef.current = droneOscs
    setReady(true)

    timerRef.current = window.setInterval(() => {
      scheduleMelodyBar(ctx, melodyBus)
    }, 15500)

    return ctx
  }

  const activatePlayback = async () => {
    if (userMutedRef.current) return
    const ctx = initAudio()
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch {
        // Still waiting for user gesture
        return
      }
    }
    if ((ctx.state as string) !== 'running' || userMutedRef.current) return

    const master = masterRef.current!
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
    master.gain.linearRampToValueAtTime(0.55, now + 0.6)

    if (!hasPlayedFirstBarRef.current && melodyBusRef.current) {
      hasPlayedFirstBarRef.current = true
      scheduleMelodyBar(ctx, melodyBusRef.current)
    }
  }

  useEffect(() => {
    // Attempt immediate playback on mount
    void activatePlayback()

    // Fallback unlock on first user interaction if browser suspended autoplay on load
    const unlockEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll', 'wheel'] as const

    const handleUnlock = () => {
      if (userMutedRef.current) {
        cleanupListeners()
        return
      }
      void activatePlayback().then(() => {
        if (ctxRef.current?.state === 'running') {
          cleanupListeners()
        }
      })
    }

    const cleanupListeners = () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUnlock)
      })
    }

    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, handleUnlock, { passive: true })
    })

    return () => {
      cleanupListeners()
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
      oscsRef.current.forEach((o) => {
        try {
          o.stop()
        } catch {
          /* already stopped */
        }
      })
      void ctxRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleMute = async () => {
    const nextMuted = !muted
    userMutedRef.current = nextMuted
    setMuted(nextMuted)

    const ctx = initAudio()
    if (!nextMuted && ctx.state === 'suspended') {
      await ctx.resume()
    }

    const master = masterRef.current!
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)

    if (nextMuted) {
      master.gain.linearRampToValueAtTime(0.0001, now + 0.4)
    } else {
      master.gain.linearRampToValueAtTime(0.55, now + 0.5)
      if (!hasPlayedFirstBarRef.current && melodyBusRef.current) {
        hasPlayedFirstBarRef.current = true
        scheduleMelodyBar(ctx, melodyBusRef.current)
      } else {
        playPluck(ctx, master, 261.63, 0.02, 1.8, 0.18)
        playPluck(ctx, master, 329.63, 0.12, 1.8, 0.18)
        playPluck(ctx, master, 392.0, 0.22, 2.2, 0.2)
      }
    }
  }

  return { muted, ready, toggleMute }
}

