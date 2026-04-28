type Subscriber = (message: string) => void;

const ZWSP = '​';
const subscribers = new Set<Subscriber>();
let nonce = 0;

export function announce(message: string): void {
  // Append a zero-width-space nonce so identical messages still trigger
  // a fresh ARIA announcement.
  nonce = (nonce + 1) % 8;
  const stamped = message + ZWSP.repeat(nonce);
  for (const sub of subscribers) sub(stamped);
}

export function subscribe(fn: Subscriber): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

// Test-only: clear all subscribers and reset state.
export function _resetForTests(): void {
  subscribers.clear();
  nonce = 0;
}
