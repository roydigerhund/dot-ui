import { motion } from 'framer-motion';
import { classNames } from '../utils/classNames';
import { hasVectorDot } from '../utils/grid-math';
import { VectorState } from '../utils/types';

export default function VectorPlayer({ state, size }: { state: VectorState; size?: 'small' }) {
  return (
    <div
      className={classNames('relative grid', size === 'small' ? 'gap-px' : 'gap-2')}
      style={{ gridTemplateColumns: `repeat(${state[0].length}, 1fr)` }}
    >
      {state.map((row, rowIndex) =>
        row.map((_, columnIndex) => {
          if (!hasVectorDot(state, [rowIndex, columnIndex]))
            return <div key={columnIndex} className={classNames(size === 'small' ? 'h-1 w-1' : 'h-4 w-4')} />;
          return (
            <motion.div
              key={columnIndex}
              className={classNames(size === 'small' ? 'h-1 w-1' : 'h-4 w-4', 'rounded-full bg-white')}
              animate={{
                translateX: [0, state[rowIndex][columnIndex][0] * (size === 'small' ? 5 : 24)],
                translateY: [0, state[rowIndex][columnIndex][1] * (size === 'small' ? 5 : 24)],
              }}
              transition={{
                duration: 1,
                repeatDelay: 2,
                ease: 'anticipate',
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            />
          );
        }),
      )}
    </div>
  );
}
