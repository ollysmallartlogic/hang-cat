export const copy = {
  firstWrong: 'A minor mew-stake.',
  halfway: 'Things are getting hiss-tory.',
  thinPaws: 'On thin ice. The cat is on thin paws.',
  win: 'Purr-fect.',
  winFast: 'Meow-velous. Suspiciously fast.',
  winByAWhisker: 'By a whisker.',
  loss: 'Cat-astrophe.',
  lossNoLetters: 'Furr-givable. Possibly.',
  repeat: 'Already tried. The cat remembers.',
  invalid: "Letters only, if you'd be so claw-nd.",
  titleHover: 'press to commence',
  quitConfirm: 'Leaving so soon? The cat will pretend not to notice.',
  wrongFlavours: ['Hmm.', 'Hiss.', '(no comment.)'] as const,
} as const;

let deck: string[] = [];
let lastDrawn: string | null = null;

function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function refillDeck(): void {
  const next = shuffle(copy.wrongFlavours);
  // Avoid the deck's first card matching the previous draw.
  if (lastDrawn !== null && next.length > 1 && next[0] === lastDrawn) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  deck = next;
}

export function pickWrongFlavour(): string {
  if (deck.length === 0) refillDeck();
  const value = deck.shift() as string;
  lastDrawn = value;
  return value;
}

pickWrongFlavour.reset = function reset(): void {
  deck = [];
  lastDrawn = null;
};
