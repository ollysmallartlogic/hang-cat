import { useGame } from '../hooks/useGame';

interface Props {
  onAgain: () => void;
}

export function LossScreen({ onAgain }: Props) {
  const { state } = useGame();
  return (
    <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1>大惨事</h1>
      <p>The cat fell. The word was {state.targetWord}.</p>
      <button type="button" onClick={onAgain}>
        again?
      </button>
    </main>
  );
}
