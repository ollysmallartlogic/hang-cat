import { useCallback, useEffect, useState } from 'react';
import { Howler } from 'howler';
import {
  getMuted,
  playSfx,
  preloadSfx,
  setMuted,
  subscribeMuted,
  type SfxName,
} from '../../audio/sfx';

let primed = false;

function primeOnFirstInteraction(): void {
  if (primed || typeof window === 'undefined') return;
  const handler = () => {
    primed = true;
    // Touching the Howler context unlocks WebAudio on iOS. The underlying
    // .ctx may be undefined until Howler creates it; .safeXhrWithCredentials
    // is a no-op probe that ensures Howler's lazy init runs.
    try {
      Howler.ctx?.resume?.();
    } catch {
      // ignore
    }
    preloadSfx();
    window.removeEventListener('pointerdown', handler);
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('pointerdown', handler, { once: false });
  window.addEventListener('keydown', handler, { once: false });
}

export interface UseAudio {
  muted: boolean;
  toggleMuted: () => void;
  play: (name: SfxName) => void;
}

export function useAudio(): UseAudio {
  const [muted, setMutedState] = useState<boolean>(() => getMuted());

  useEffect(() => subscribeMuted(setMutedState), []);
  useEffect(() => {
    primeOnFirstInteraction();
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted(!getMuted());
  }, []);

  const play = useCallback((name: SfxName) => {
    playSfx(name);
  }, []);

  return { muted, toggleMuted, play };
}
