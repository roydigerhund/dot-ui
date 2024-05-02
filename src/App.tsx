import { motion } from 'framer-motion';
import { useState } from 'react';
import Composer from './components/Composer';
import { findNearestDot } from './utils/grid-math';

const moveStates = {
  cross: [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [1.5, 0],
      [0, 1.5],
      [0, 0],
      [0, -1.5],
      [-1.5, 0],
    ],
  ],
  x: [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [1.25, 1.25],
      [-1.25, -1.25],
      [0, 0],
      [-1.25, 1.25],
      [1.25, -1.25],
    ],
  ],
  dotLineSquare: [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    [
      [-1.5, 0],
      [-1.5, 0],
      [-1.5, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [1.5, 0],
      [1.5, 0],
      [1.5, 0],
    ],
    [
      [-1.5, 1.5],
      [-1.5, 0],
      [-1.5, -1.5],
      [0, 1.5],
      [0, 0],
      [0, -1.5],
      [1.5, 1.5],
      [1.5, 0],
      [1.5, -1.5],
    ],
  ],
};
const numberStates = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
];

function App() {
  const [showComposer, setShowComposer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-24 p-16">
      <h1
        className="flex items-center justify-center gap-1 text-6xl font-bold leading-none tracking-wide"
        onClick={() => setShowComposer(!showComposer)}
      >
        <span className="mt-8 block h-3 w-3 rounded-full bg-white" />
        <span className="sr-only">Dot</span>
        <span className="block bg-gradient-to-l from-blue-500 to-purple-500 bg-clip-text text-transparent">UI</span>
      </h1>
      {showComposer ? (
        <Composer />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-32">
            {Object.keys(moveStates).map((stateKey) => {
              const state = moveStates[stateKey as keyof typeof moveStates];
              return (
                <div key={stateKey} className="relative h-16 w-16">
                  {state[0].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-4 w-4 rounded-full bg-white"
                      style={{
                        top: `calc(50% - 0.5rem)`,
                        left: `calc(50% - 0.5rem)`,
                      }}
                      animate={{
                        translateX: state.map((state) => state[i][0] + 'rem'),
                        translateY: state.map((state) => state[i][1] + 'rem'),
                      }}
                      transition={{
                        duration: state.length * 0.5,
                        repeatDelay: 0.5,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'backInOut',
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
          <div className="relative grid grid-cols-3 gap-2">
            {numberStates[0].map((row, rowIndex) =>
              row.map((_, columnIndex) => (
                <motion.div
                  key={columnIndex}
                  className="h-4 w-4 rounded-full bg-white"
                  animate={{
                    scale: numberStates.map((state) => state[rowIndex][columnIndex]),
                  }}
                  transition={{
                    duration: 10,
                    ease: 'backInOut',
                    repeat: Infinity,
                    repeatType: 'mirror',
                  }}
                />
              )),
            )}
          </div>
          <div className="relative grid grid-cols-3 gap-2">
            {numberStates[0].map((row, rowIndex) =>
              row.map((_, columnIndex) => {
                const centerXOffset = columnIndex - 1;
                const centerYOffset = rowIndex - 2;
                // find first dot in an array of arrays of number like this [[0,1,0],[0,0,0],[1,0,0]]
                const findFirstDot = (arr: number[][]) => {
                  for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                      if (arr[i][j] === 1) {
                        return [i, j];
                      }
                    }
                  }
                  return [0, 0];
                };
                return (
                  <motion.div
                    key={columnIndex}
                    className="h-4 w-4 rounded-full bg-white"
                    animate={{
                      translateX: numberStates
                        .map((state) => {
                          const hasCenterDot = state[2][1];
                          const restingDot = hasCenterDot ? [2, 1] : findFirstDot(state);
                          const restingCenterXOffset = columnIndex - restingDot[1];
                          return [centerXOffset * -24, state[rowIndex][columnIndex] ? 0 : restingCenterXOffset * -24];
                        })
                        .flat(),
                      translateY: numberStates
                        .map((state) => {
                          const hasCenterDot = state[2][1];
                          const restingDot = hasCenterDot ? [2, 1] : findFirstDot(state);
                          const restingCenterYOffset = rowIndex - restingDot[0];
                          return [centerYOffset * -24, state[rowIndex][columnIndex] ? 0 : restingCenterYOffset * -24];
                        })
                        .flat(),
                    }}
                    transition={{
                      duration: 20,
                      ease: 'backInOut',
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }}
                  />
                );
              }),
            )}
          </div>
          <div className="relative grid grid-cols-3 gap-2">
            {numberStates[0].map((row, rowIndex) =>
              row.map((_, columnIndex) => {
                return (
                  <motion.div
                    key={columnIndex}
                    className="h-4 w-4 rounded-full bg-white"
                    animate={{
                      translateX: numberStates.map((state) => {
                        const restingDot = findNearestDot(state, [rowIndex, columnIndex]);
                        const restingCenterXOffset = columnIndex - restingDot[1];
                        return state[rowIndex][columnIndex] ? 0 : restingCenterXOffset * -24;
                      }),
                      translateY: numberStates.map((state) => {
                        const restingDot = findNearestDot(state, [rowIndex, columnIndex]);
                        const restingCenterYOffset = rowIndex - restingDot[0];
                        return state[rowIndex][columnIndex] ? 0 : restingCenterYOffset * -24;
                      }),
                    }}
                    transition={{
                      duration: 10,
                      ease: 'backInOut',
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }}
                  />
                );
              }),
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
