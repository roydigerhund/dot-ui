import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isDeepEqual } from 'remeda';
import { classNames } from '../utils/classNames';
import { findNearestDot } from '../utils/grid-math';
import { RestState, RestStates } from '../utils/types';

const transitionDuration = 1000;

export default function DotPlayer({ state }: { state: RestState }) {
  const [transitionStates, setTransitionStates] = useState<RestStates>([state]);

  const columns = state[0].length;
  const rows = state.length;
  const length = columns * rows;

  useEffect(() => {
    if (isDeepEqual(transitionStates[0], state)) return;
    setTransitionStates((prev) => [...prev, state]);
    const interval = setInterval(() => {
      setTransitionStates([state]);
    }, transitionDuration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, width: `${columns * 4 + columns - 1}px` }}
    >
      {Array.from({ length: length }).map((_, i) => {
        const row = Math.floor(i / columns);
        const column = i % columns;

        return (
          <motion.div
            key={i}
            className={classNames('h-1 w-1 rounded-full bg-white')}
            animate={{
              translateX: transitionStates.map((state) => {
                const restingDot = findNearestDot(state, [row, column]);
                const restingCenterXOffset = column - restingDot[1];
                return state[row][column] ? 0 : restingCenterXOffset * -5;
              }),
              translateY: transitionStates.map((state) => {
                const restingDot = findNearestDot(state, [row, column]);
                const restingCenterYOffset = row - restingDot[0];
                return state[row][column] ? 0 : restingCenterYOffset * -5;
              }),
            }}
            transition={{
              duration: transitionDuration / 1000,
              ease: 'backInOut',
            }}
          />
        );
      })}
    </div>
  );
}