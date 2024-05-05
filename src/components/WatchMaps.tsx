import { motion } from 'framer-motion';
import { classNames } from '../utils/classNames';
import { RestState } from '../utils/types';

function DotPlayer({ state }: { state: RestState }) {
  const columns = state[0].length;
  const rows = state.length;
  const length = columns * rows;

  return (
    <div
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, width: `${columns * 4 + columns - 1}px` }}
    >
      {Array.from({ length: length }).map((_, i) => {
        const row = Math.floor(i / columns);
        const column = i % columns;
        const isActive = state[row][column] === 1;

        return <div key={i} className={classNames('h-1 w-1 rounded-full', isActive && 'bg-white')}></div>;
      })}
    </div>
  );
}

export default function WatchMaps() {
  return (
    <div className="relative h-[430px] w-[352px] rounded-[3.5rem] border border-white p-8">
      <div className="absolute -right-3 top-20 h-16 w-3 rounded-r-md bg-white" />
      <div className="absolute -right-1 top-56 h-24 w-1 rounded-r-sm bg-white" />
      <div className="flex items-start justify-between">
        <motion.div
          animate={{ rotate: [0, 12, 36, -12, 0] }}
          transition={{
            duration: 12,
            ease: 'anticipate',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          <DotPlayer
            state={[
              [0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0],
              [0, 0, 1, 1, 1, 0, 0],
              [0, 0, 1, 1, 1, 0, 0],
              [0, 1, 1, 1, 1, 1, 0],
              [0, 1, 1, 0, 1, 1, 0],
              [1, 1, 0, 0, 0, 1, 1],
              [1, 0, 0, 0, 0, 0, 1],
            ]}
          />
        </motion.div>
        <div className="flex justify-center">
          <DotPlayer
            state={[
              [1, 1, 1, 1, 0],
              [1, 0, 0, 1, 0],
              [1, 0, 0, 1, 0],
              [1, 1, 1, 1, 0],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 1, 0],
              [1, 1, 1, 1, 0],
            ]}
          />
          <motion.div
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          >
            <DotPlayer
              state={[
                [0, 0],
                [0, 0],
                [1, 0],
                [0, 0],
                [1, 0],
                [0, 0],
                [0, 0],
              ]}
            />
          </motion.div>
          <DotPlayer
            state={[
              [1, 0, 0, 1, 0],
              [1, 0, 0, 1, 0],
              [1, 0, 0, 1, 0],
              [1, 1, 1, 1, 0],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 1, 0],
            ]}
          />
          <DotPlayer
            state={[
              [0, 0, 1],
              [0, 1, 1],
              [1, 0, 1],
              [0, 0, 1],
              [0, 0, 1],
              [0, 0, 1],
              [0, 0, 1],
            ]}
          />
        </div>
      </div>
      <div className="mt-16 flex items-start justify-center">
        <DotPlayer
          state={[
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          ]}
        />
      </div>
      <div className="mt-16 flex justify-center">
        <DotPlayer
          state={[
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
          ]}
        />
        <DotPlayer
          state={[
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
          ]}
        />
      </div>
    </div>
  );
}
