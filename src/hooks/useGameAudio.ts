import { useRef, useCallback, useEffect } from 'react';

export interface UseGameAudioOptions {
  soundEnabled: boolean;
}

export function useGameAudio(options: UseGameAudioOptions) {
  const { soundEnabled } = options;
  const ctxRef = useRef<AudioContext | null>(null);

  // Initialize or resume AudioContext
  const getContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;

    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        ctxRef.current = new AudioCtx();
      }
    }

    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }

    return ctxRef.current;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);

  /**
   * 1. Word Found (correct target word)
   */
  const playWordFound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Warm resonant major triad arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const freqs = [523.25, 659.25, 783.99, 1046.50];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.055);

        gain.gain.setValueAtTime(0, now + idx * 0.055);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.055 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.055);
        osc.stop(now + idx * 0.055 + 0.38);
      });
    } catch {
      // Audio fallback fail gracefully
    }
  }, [soundEnabled, getContext]);

  /**
   * Bonus Word Found (hidden biblical treasure)
   */
  const playBonusWordFound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Celestial sparkling glissando: E5, G#5, B5, E6, G#6
      const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.42);
      });
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  /**
   * 2. Incorrect Guess (drag does not form valid word)
   */
  const playIncorrectGuess = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.16);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  /**
   * 3. Lesson Complete (triumphant victory fanfare)
   */
  const playLessonComplete = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Majestic celebratory chord: C5, E5, G5, C6 with final sustained ring
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.5 },
        { freq: 659.25, time: 0.1, dur: 0.5 },
        { freq: 783.99, time: 0.2, dur: 0.6 },
        { freq: 1046.50, time: 0.32, dur: 0.8 },
        { freq: 1318.51, time: 0.45, dur: 1.0 },
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(0.22, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  /**
   * Achievement Unlocked
   */
  const playAchievementUnlocked = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.52);
      });
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  /**
   * Hint Sparkle
   */
  const playHint = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [880, 1174.66, 1760].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.28);
      });
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  /**
   * Tactile Button Click
   */
  const playButtonClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // silent
    }
  }, [soundEnabled, getContext]);

  return {
    playWordFound,
    playBonusWordFound,
    playIncorrectGuess,
    playLessonComplete,
    playAchievementUnlocked,
    playHint,
    playButtonClick,
  };
}
