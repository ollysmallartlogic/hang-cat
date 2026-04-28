import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useGame } from '../hooks/useGame';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BRANCH_LEAF_ANCHORS, MOMIJI_LEAF_PATH, type BranchLeafAnchor } from './leaf-shape';
import styles from './LeafFall.module.css';

const SCENE_FLOOR_Y = 248;

interface FallingLeaf {
  id: number;
  origin: BranchLeafAnchor;
  drift: number;
  fall: number;
  rotate: number;
}

let nextLeafId = 1;

function spawnLeaf(): FallingLeaf {
  const origin = BRANCH_LEAF_ANCHORS[Math.floor(Math.random() * BRANCH_LEAF_ANCHORS.length)];
  const drift = (Math.random() - 0.5) * 60;
  const fall = SCENE_FLOOR_Y - origin.y;
  const rotate = (Math.random() - 0.5) * 240;
  return { id: nextLeafId++, origin, drift, fall, rotate };
}

export function LeafFall() {
  const { state } = useGame();
  const reducedMotion = useReducedMotion();
  const [leaves, setLeaves] = useState<FallingLeaf[]>([]);
  const prevCountRef = useRef(state.wrongLetters.length);

  useEffect(() => {
    const next = state.wrongLetters.length;
    const prev = prevCountRef.current;
    prevCountRef.current = next;
    if (reducedMotion) return;
    if (next <= prev) return;
    const additions: FallingLeaf[] = [];
    for (let i = 0; i < next - prev; i++) additions.push(spawnLeaf());
    setLeaves((cur) => [...cur, ...additions]);
  }, [state.wrongLetters.length, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <g aria-hidden="true">
      {leaves.map((leaf) => {
        const style = {
          '--leaf-x0': `${leaf.origin.x}`,
          '--leaf-y0': `${leaf.origin.y}`,
          '--leaf-dx': `${leaf.drift}`,
          '--leaf-dy': `${leaf.fall}`,
          '--leaf-rot': `${leaf.rotate}deg`,
        } as CSSProperties;
        return (
          <g
            key={leaf.id}
            className={styles.leaf}
            style={style}
            onAnimationEnd={() => setLeaves((cur) => cur.filter((l) => l.id !== leaf.id))}
          >
            <path d={MOMIJI_LEAF_PATH} fill="var(--matcha)" />
          </g>
        );
      })}
    </g>
  );
}
