import { useEffect, useState } from 'react';
import { GameProvider, useGame } from './hooks/useGame';
import { useReducedMotion } from './hooks/useReducedMotion';
import { GameScreen } from './screens/GameScreen';
import { LossScreen } from './screens/LossScreen';
import { TitleScreen } from './screens/TitleScreen';
import { WinScreen } from './screens/WinScreen';

type Screen = 'title' | 'game' | 'win' | 'loss';

function AppShell() {
  const [screen, setScreen] = useState<Screen>('title');
  const { state, newGame } = useGame();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (reducedMotion) {
      document.body.dataset.reducedMotion = 'true';
    } else {
      delete document.body.dataset.reducedMotion;
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (screen !== 'game') return;
    if (state.status === 'in_progress') return;
    // Hold on the GameScreen long enough for CatScene's terminal animation to
    // finish (loss-fall: 600ms, win-hop: 200ms). Reduced motion shortens both.
    const delay = reducedMotion ? 0 : state.status === 'lost' ? 750 : 350;
    const id = window.setTimeout(() => {
      setScreen(state.status === 'won' ? 'win' : 'loss');
    }, delay);
    return () => window.clearTimeout(id);
  }, [screen, state.status, reducedMotion]);

  function startGame() {
    newGame();
    setScreen('game');
  }

  switch (screen) {
    case 'title':
      return <TitleScreen onBegin={startGame} />;
    case 'game':
      return <GameScreen />;
    case 'win':
      return <WinScreen onAgain={startGame} />;
    case 'loss':
      return <LossScreen onAgain={startGame} />;
  }
}

export function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}
