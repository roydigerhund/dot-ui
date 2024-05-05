import { useState } from 'react';
import { clone } from 'remeda';
import { classNames } from '../utils/classNames';
import { RestState } from '../utils/types';

const getCleanState = (rows: number, columns: number): RestState => {
  return new Array(rows).fill([]).map(() => new Array(columns).fill(0));
};

export default function RestComposer() {
  const [playground, setPlayground] = useState({ columns: 3, rows: 3, state: getCleanState(3, 3) });

  const changeRows = (change: number) => {
    setPlayground((prev) => ({
      ...prev,
      rows: Math.max(1, prev.rows + change),
      state: getCleanState(prev.rows + change, prev.columns),
    }));
  };

  [[0]];

  const changeColumns = (change: number) => {
    setPlayground((prev) => ({
      ...prev,
      columns: Math.max(1, prev.columns + change),
      state: getCleanState(prev.rows, prev.columns + change),
    }));
  };

  const isCellActive = (row: number, column: number) => {
    return playground.state[row]?.[column] === 1;
  };

  const toggleCell = (row: number, column: number) => {
    setPlayground((prev) => {
      const newState = clone(prev.state);
      newState[row][column] = newState[row][column] ? 0 : 1;
      return {
        ...prev,
        state: newState,
      };
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-x-4 text-center">
        <button onClick={() => changeColumns(-1)}>-</button>
        <span>Columns</span>
        <button onClick={() => changeColumns(1)}>+</button>
      </div>
      <div className="space-x-4 text-center">
        <button onClick={() => changeRows(-1)}>-</button>
        <span>Rows</span>
        <button onClick={() => changeRows(1)}>+</button>
      </div>
      <div className="mt-16 grid gap-4" style={{ gridTemplateColumns: `repeat(${playground.columns}, 1fr)` }}>
        {Array.from({ length: playground.columns * playground.rows }).map((_, i) => {
          const row = Math.floor(i / playground.columns);
          const column = i % playground.columns;
          return (
            <div
              key={i}
              className={classNames('relative h-8 w-8 cursor-cell rounded-full')}
              onClick={() => toggleCell(row, column)}
            >
              {isCellActive(row, column) && <div className="absolute inset-0 z-10 rounded-full bg-white" />}
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-zinc-900" />
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-zinc-900" />
            </div>
          );
        })}
      </div>
      <div className="mt-16 select-all">
        <pre>{JSON.stringify(playground.state)}</pre>
      </div>
    </div>
  );
}
