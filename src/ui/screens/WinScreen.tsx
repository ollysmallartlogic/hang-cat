import { useGame } from '../hooks/useGame';

interface Props {
  onAgain: () => void;
}

export function WinScreen({ onAgain }: Props) {
  const { state } = useGame();
  return (
    <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1>完璧</h1>
      <p>You saved the cat. The word was {state.targetWord}.</p>
      <button type="button" onClick={onAgain}>
        again?
      </button>
    </main>
  );
}
