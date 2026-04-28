import { afterEach, describe, expect, it } from 'vitest';
import { copy, pickWrongFlavour } from './copy';

afterEach(() => {
  pickWrongFlavour.reset();
});

describe('copy lexicon', () => {
  it('has all required keys verbatim from design.md §5', () => {
    expect(copy.firstWrong).toBe('A minor mew-stake.');
    expect(copy.halfway).toBe('Things are getting hiss-tory.');
    expect(copy.thinPaws).toBe('On thin ice. The cat is on thin paws.');
    expect(copy.win).toBe('Purr-fect.');
    expect(copy.winFast).toBe('Meow-velous. Suspiciously fast.');
    expect(copy.winByAWhisker).toBe('By a whisker.');
    expect(copy.loss).toBe('Cat-astrophe.');
    expect(copy.lossNoLetters).toBe('Furr-givable. Possibly.');
    expect(copy.repeat).toBe('Already tried. The cat remembers.');
    expect(copy.invalid).toBe("Letters only, if you'd be so claw-nd.");
    expect(copy.titleHover).toBe('press to commence');
    expect(copy.quitConfirm).toBe(
      'Leaving so soon? The cat will pretend not to notice.',
    );
    expect([...copy.wrongFlavours]).toEqual(['Hmm.', 'Hiss.', '(no comment.)']);
  });

  it('contains no exclamation marks anywhere', () => {
    for (const value of Object.values(copy)) {
      const strings = Array.isArray(value) ? value : [value];
      for (const s of strings) {
        expect(s).not.toMatch(/!/);
      }
    }
  });
});

describe('pickWrongFlavour', () => {
  it('returns one of the three flavours', () => {
    const flavour = pickWrongFlavour();
    expect(copy.wrongFlavours).toContain(flavour);
  });

  it('never returns the same value twice consecutively over 100 calls', () => {
    let prev = pickWrongFlavour();
    for (let i = 0; i < 100; i++) {
      const next = pickWrongFlavour();
      expect(next).not.toBe(prev);
      prev = next;
    }
  });

  it('cycles through every flavour before repeating any (shuffled deck)', () => {
    const seen = new Set<string>();
    seen.add(pickWrongFlavour());
    seen.add(pickWrongFlavour());
    seen.add(pickWrongFlavour());
    expect(seen.size).toBe(copy.wrongFlavours.length);
  });

  it('reset() clears the deck so the next draw starts fresh', () => {
    pickWrongFlavour();
    pickWrongFlavour();
    pickWrongFlavour.reset();
    // After reset, just verify behaviour stays valid (no consecutive repeats).
    let prev = pickWrongFlavour();
    for (let i = 0; i < 20; i++) {
      const next = pickWrongFlavour();
      expect(next).not.toBe(prev);
      prev = next;
    }
  });
});
