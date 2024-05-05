import { RestState, RestStates, VectorState } from './types';

// find first dot in an array of arrays of number like this [[0,1,0],[0,0,0],[1,0,0]]
export const findFirstDot = (state: RestState) => {
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === 1) {
        return [i, j];
      }
    }
  }
  return [0, 0];
};

// find nearest dot in an array of arrays of number like this [[0,1,0],[0,0,0],[1,0,0]]
// input is the array and the current position of the dot
export const findNearestDot = (state: RestState, currentPos: [number, number]) => {
  let nearestPos = [0, 0];
  let minDistance = Infinity;
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === 1) {
        const distance = Math.sqrt((i - currentPos[0]) ** 2 + (j - currentPos[1]) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          nearestPos = [i, j];
        }
      }
    }
  }
  return nearestPos;
};

export const findFarthestDot = (state: RestState, currentPos: [number, number]) => {
  let farthestPos = [0, 0];
  let maxDistance = 0;
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === 1) {
        const distance = Math.sqrt((i - currentPos[0]) ** 2 + (j - currentPos[1]) ** 2);
        if (distance > maxDistance) {
          maxDistance = distance;
          farthestPos = [i, j];
        }
      }
    }
  }
  return farthestPos;
};

// check if dot position has exists (has 1 as value) in any states
export const hasDot = (states: RestStates, pos: [number, number]) => {
  return states.some((state) => state[pos[0]][pos[1]] === 1);
};
// check if dot position has exists (has 1 as value) in any states
export const hasVectorDot = (state: VectorState, pos: [number, number]) => {
  return state[pos[0]][pos[1]].length;
};

// get maximum number of dots in any states
export const maxDots = (states: RestStates) => {
  return Math.max(...states.map((state) => state.flat().filter((dot) => dot === 1).length));
};
