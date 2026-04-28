import { useEffect } from 'react';
import { useGame } from './useGame';

const LETTER_RE = /^[A-Za-z]$/;

export function useKeyboard(): void {
  const { guess } = useGame();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

      if (event.key.length !== 1 || !LETTER_RE.test(event.key)) return;

      guess(event.key);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [guess]);
}
