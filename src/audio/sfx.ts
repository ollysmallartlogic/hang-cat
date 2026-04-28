import { Howl } from 'howler';
import tokUrl from './assets/tok.wav?url';
import fmmUrl from './assets/fmm.wav?url';
import kotoUrl from './assets/koto.wav?url';
import furinUrl from './assets/furin.wav?url';

export type SfxName = 'tok' | 'fmm' | 'koto' | 'furin';

const MUTED_KEY = 'hang-cat:muted';

// Conservative volumes. Ambient/loss-chime sits at -24 dB per design.md §8;
// the rest are kept low so the game stays playable in a library.
const VOLUMES: Record<SfxName, number> = {
  tok: 0.45,
  fmm: 0.5,
  koto: 0.55,
  furin: 0.063, // ≈ -24 dBFS
};

const SOURCES: Record<SfxName, string> = {
  tok: tokUrl,
  fmm: fmmUrl,
  koto: kotoUrl,
  furin: furinUrl,
};

const cache: Partial<Record<SfxName, Howl>> = {};
const listeners = new Set<(muted: boolean) => void>();

let muted = readMuted();

function readMuted(): boolean {
  if (typeof localStorage === 'undefined') return true;
  try {
    const raw = localStorage.getItem(MUTED_KEY);
    // Default to muted: the game must never auto-play sound.
    if (raw === null) return true;
    return raw !== 'false';
  } catch {
    return true;
  }
}

function writeMuted(value: boolean): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(MUTED_KEY, value ? 'true' : 'false');
  } catch {
    // localStorage may be unavailable; mute state stays in-memory for the session.
  }
}

function getHowl(name: SfxName): Howl {
  let howl = cache[name];
  if (!howl) {
    howl = new Howl({
      src: [SOURCES[name]],
      // Format hint helps Howler skip the autodetect probe in some browsers.
      format: ['wav'],
      volume: VOLUMES[name],
      preload: true,
    });
    cache[name] = howl;
  }
  return howl;
}

export function getMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  if (muted === value) return;
  muted = value;
  writeMuted(value);
  listeners.forEach((fn) => fn(value));
}

export function subscribeMuted(fn: (muted: boolean) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function playSfx(name: SfxName): void {
  if (muted) return;
  const howl = getHowl(name);
  howl.play();
}

export function preloadSfx(): void {
  // Touching each Howl primes its decoded buffer. Safe to call repeatedly.
  (Object.keys(SOURCES) as SfxName[]).forEach(getHowl);
}
