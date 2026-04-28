import { useEffect, useState } from 'react';
import { poseIndex, type PoseIndex } from '../../game/selectors';
import { useGame } from '../hooks/useGame';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CAT_POSES } from './cat-poses';
import { LeafFall } from './LeafFall';
import { BRANCH_LEAF_ANCHORS, MOMIJI_LEAF_PATH } from './leaf-shape';
import styles from './CatScene.module.css';

type TransitionKind = 'pose' | 'fall';

interface PoseLayer {
  idx: PoseIndex;
  key: number;
  kind: TransitionKind;
}

export function CatScene() {
  const { state } = useGame();
  const reducedMotion = useReducedMotion();
  const idx = poseIndex(state);

  const [current, setCurrent] = useState<PoseLayer>(() => ({ idx, key: 0, kind: 'pose' }));
  const [previous, setPrevious] = useState<PoseLayer | null>(null);

  useEffect(() => {
    if (idx === current.idx) return;
    const kind: TransitionKind = current.idx === 5 && idx === 6 ? 'fall' : 'pose';
    setPrevious(current);
    setCurrent({ idx, key: current.key + 1, kind });
  }, [idx, current]);

  // Belt-and-braces unmount of the previous layer in case animationend doesn't
  // fire (e.g. 0ms duration under reduced motion may suppress the event).
  useEffect(() => {
    if (!previous) return;
    const id = window.setTimeout(() => setPrevious(null), 800);
    return () => window.clearTimeout(id);
  }, [previous]);

  const Current = CAT_POSES[current.idx];
  const Previous = previous ? CAT_POSES[previous.idx] : null;

  const winHop = state.status === 'won' && !reducedMotion;

  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 240 260"
        className={styles.scene}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <title>The cat and the branch.</title>
        <g
          className={styles.branch}
          fill="none"
          stroke="var(--matcha)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 6 30 C 80 20, 160 20, 234 30" strokeWidth="3.5" />
          {BRANCH_LEAF_ANCHORS.map((anchor, i) => (
            <g key={i} transform={`translate(${anchor.x} ${anchor.y})`}>
              <path d={MOMIJI_LEAF_PATH} fill="var(--matcha)" stroke="none" />
            </g>
          ))}
        </g>
        <g
          className={styles.poses}
          data-transition={current.kind}
          data-status={winHop ? 'won' : undefined}
        >
          {Previous && previous && (
            <g
              key={previous.key}
              className={styles.poseExit}
              data-transition={current.kind}
              onAnimationEnd={() => setPrevious(null)}
            >
              <Previous x={20} y={40} width={200} height={200} />
            </g>
          )}
          <g key={current.key} className={styles.poseEnter} data-transition={current.kind}>
            <Current x={20} y={40} width={200} height={200} />
          </g>
        </g>
        <LeafFall />
      </svg>
    </div>
  );
}
