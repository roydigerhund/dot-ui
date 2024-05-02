// find first dot in an array of arrays of number like this [[0,1,0],[0,0,0],[1,0,0]]
export const findFirstDot = (arr: number[][]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        return [i, j];
      }
    }
  }
  return [0, 0];
};

// find nearest dot in an array of arrays of number like this [[0,1,0],[0,0,0],[1,0,0]]
// input is the array and the current position of the dot
export const findNearestDot = (arr: number[][], currentPos: [number, number]) => {
  let nearestPos = [0, 0];
  let minDistance = Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
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
