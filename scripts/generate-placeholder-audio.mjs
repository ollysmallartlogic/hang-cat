// One-shot generator for placeholder WAV SFX. These are stand-ins for the CC0
// fūrin / shōgi-tok sources documented in src/audio/CREDITS.md — replace the
// real files when sourcing is done. Re-run with `node scripts/generate-placeholder-audio.mjs`.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'src', 'audio', 'assets');
mkdirSync(OUT_DIR, { recursive: true });

const SAMPLE_RATE = 22050;

function writeWav(name, samples) {
  const bytes = samples.length * 2;
  const buf = Buffer.alloc(44 + bytes);
  // RIFF header
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + bytes, 4);
  buf.write('WAVE', 8);
  // fmt chunk
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SAMPLE_RATE, 24);
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  // data chunk
  buf.write('data', 36);
  buf.writeUInt32LE(bytes, 40);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
  }
  writeFileSync(resolve(OUT_DIR, `${name}.wav`), buf);
}

function tone({ duration, freq, amp = 0.2, attack = 0.005, decay = 0.05, harmonic = 0 }) {
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    let env = 1;
    if (t < attack) env = t / attack;
    else env = Math.exp(-(t - attack) / decay);
    let s = Math.sin(2 * Math.PI * freq * t);
    if (harmonic > 0) s += harmonic * Math.sin(2 * Math.PI * freq * 1.5 * t);
    out[i] = amp * env * s;
  }
  return out;
}

// tok — short woody click around 900 Hz, very fast decay.
writeWav('tok', tone({ duration: 0.08, freq: 900, amp: 0.18, attack: 0.001, decay: 0.025 }));

// fmm — low dry thud around 180 Hz, longer decay, no buzz.
writeWav('fmm', tone({ duration: 0.22, freq: 180, amp: 0.14, attack: 0.004, decay: 0.09 }));

// koto — single plucked note (~A4 440 Hz with a soft fifth) decaying slowly.
writeWav('koto', tone({ duration: 0.6, freq: 440, amp: 0.16, attack: 0.005, decay: 0.35, harmonic: 0.4 }));

// furin — glassy chime around 1700 Hz, gentle decay.
writeWav('furin', tone({ duration: 0.55, freq: 1700, amp: 0.1, attack: 0.005, decay: 0.3, harmonic: 0.3 }));

console.log('wrote tok.wav, fmm.wav, koto.wav, furin.wav to', OUT_DIR);
