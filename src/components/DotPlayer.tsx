import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isDeepEqual } from 'remeda';
import { classNames } from '../utils/classNames';
import { findNearestDot, isEmptyState } from '../utils/grid-math';
import { RestState, RestStates } from '../utils/types';

export default function DotPlayer({
  state,
  method = 'nearest',
  duration = 1000,
}: {
  state: RestState;
  method?: 'nearest' | 'scale';
  duration?: number;
}) {
  const [transitionStates, setTransitionStates] = useState<RestStates>([state]);

  const columns = state[0].length;
  const rows = state.length;
  const length = columns * rows;

  useEffect(() => {
    if (isDeepEqual(transitionStates[0], state)) return;
    setTransitionStates((prev) => [...prev, state]);
    const interval = setInterval(() => {
      setTransitionStates([state]);
    }, duration);

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

        switch (method) {
          case 'nearest':
            return (
              <motion.div
                key={i}
                className={classNames('h-1 w-1 rounded-full bg-white')}
                animate={{
                  scale: transitionStates.map((state) => (isEmptyState(state) ? 0 : 1)),
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
                  duration: duration / 1000,
                  ease: 'backInOut',
                }}
              />
            );
          case 'scale':
            return (
              <div
                key={i}
                className={classNames('h-1 w-1 rounded-full bg-white')}
                style={{
                  transform: `scale(${state[row][column] ? 1 : 0}`,
                  transition: `transform ${duration}ms`,
                }}
              />
            );
        }
      })}
    </div>
  );
}
