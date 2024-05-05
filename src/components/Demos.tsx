import { motion } from 'framer-motion';
import { findNearestDot, hasDot, hasVectorDot } from '../utils/grid-math';
import { VectorStates } from '../utils/types';

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
const arrowStates = [
  [
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
  ],
];
const vectorStates: VectorStates = [
  [
    [[1, 1], [], [-1, 1]],
    [[], [0, 0], []],
    [[1, -1], [], [-1, -1]],
  ],
  [
    [[1, 0], [], [], []],
    [[], [2, 0], [], []],
    [[], [], [3, 0], []],
    [[], [2, 0], [], []],
    [[1, 0], [], [], []],
  ],
];

export default function Demos() {
  return (
    <>
      <div className="relative grid grid-cols-3 gap-2">
        {vectorStates[0].map((row, rowIndex) =>
          row.map((_, columnIndex) => {
            if (!hasVectorDot(vectorStates[0], [rowIndex, columnIndex]))
              return <div key={columnIndex} className="h-4 w-4 rounded-full bg-white/20" />;
            return (
              <motion.div
                key={columnIndex}
                className="h-4 w-4 rounded-full bg-white"
                animate={{
                  translateX: [vectorStates[0]]
                    .map((state) => {
                      const vectorX = state[rowIndex][columnIndex][0];
                      return [0, vectorX * 24];
                    })
                    .flat(),
                  translateY: [vectorStates[0]]
                    .map((state) => {
                      const vectorY = state[rowIndex][columnIndex][1];
                      return [0, vectorY * 24];
                    })
                    .flat(),
                }}
                transition={{
                  duration: 2,
                  ease: 'backInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />
            );
          }),
        )}
      </div>
      <div className="relative grid grid-cols-4 gap-2">
        {vectorStates[1].map((row, rowIndex) =>
          row.map((_, columnIndex) => {
            if (!hasVectorDot(vectorStates[1], [rowIndex, columnIndex]))
              return <div key={columnIndex} className="h-4 w-4" />;
            return (
              <motion.div
                key={columnIndex}
                className="h-4 w-4 rounded-full bg-white"
                animate={{
                  translateX: [vectorStates[1]]
                    .map((state) => {
                      const vectorX = state[rowIndex][columnIndex][0];
                      return [0, vectorX * 24];
                    })
                    .flat(),
                  translateY: [vectorStates[1]]
                    .map((state) => {
                      const vectorY = state[rowIndex][columnIndex][1];
                      return [0, vectorY * 24];
                    })
                    .flat(),
                }}
                transition={{
                  duration: 1,
                  ease: 'anticipate',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />
            );
          }),
        )}
      </div>
      <div className="relative grid grid-cols-8 gap-2">
        {arrowStates[0].map((row, rowIndex) =>
          row.map((_, columnIndex) => {
            if (!hasDot(arrowStates, [rowIndex, columnIndex])) return <div key={columnIndex} />;
            return (
              <motion.div
                key={columnIndex}
                className="h-4 w-4 rounded-full bg-white"
                animate={{
                  translateX: arrowStates.map((state) => {
                    const restingDot = findNearestDot(state, [rowIndex, columnIndex]);
                    const restingCenterXOffset = columnIndex - restingDot[1];
                    return state[rowIndex][columnIndex] ? 0 : restingCenterXOffset * -24;
                  }),
                  translateY: arrowStates.map((state) => {
                    const restingDot = findNearestDot(state, [rowIndex, columnIndex]);
                    const restingCenterYOffset = rowIndex - restingDot[0];
                    return state[rowIndex][columnIndex] ? 0 : restingCenterYOffset * -24;
                  }),
                }}
                transition={{
                  duration: arrowStates.length,
                  ease: 'backInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />
            );
          }),
        )}
      </div>
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
  );
}
