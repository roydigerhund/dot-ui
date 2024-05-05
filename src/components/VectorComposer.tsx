import { useState } from 'react';
import { clone } from 'remeda';
import { classNames } from '../utils/classNames';
import { VectorState } from '../utils/types';
import VectorPlayer from './VectorPlayer';

const getCleanState = (rows: number, columns: number): VectorState => {
  return new Array(rows).fill([]).map(() => new Array(columns).fill([]));
};

export default function VectorComposer() {
  const [draggingPoint, setDraggingPoint] = useState<null | { x: number; y: number }>(null);
  // const [activePoint, setActivePoint] = useState<null | { x: number; y: number }>(null);
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
    return !!playground.state[row]?.[column].length;
  };

  const toggleCell = (row: number, column: number) => {
    setPlayground((prev) => {
      const newState = clone(prev.state);
      newState[row][column] = newState[row][column].length ? [] : [0, 0];
      return {
        ...prev,
        state: newState,
      };
    });
  };

  const dragStart = (position: { x: number; y: number }) => {
    setDraggingPoint(position);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnd = () => {
    setDraggingPoint(null);
  };

  const drop = ({ position }: { position: { x: number; y: number } }) => {
    if (!draggingPoint) return;
    const dragColumn = draggingPoint.x ?? 0;
    const dragRow = draggingPoint.y ?? 0;
    setPlayground((prev) => {
      const newState = clone(prev.state);
      newState[dragRow][dragColumn] = [position.x - dragColumn, position.y - dragRow];
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
          const [vectorX, vectorY] = playground.state[row][column];
          return (
            <div
              key={i}
              className={classNames('dropzone relative h-8 w-8 cursor-cell rounded-full')}
              onClick={() => !isCellActive(row, column) && toggleCell(row, column)}
              onDragOver={dragOver}
              onDrop={() => drop({ position: { x: column, y: row } })}
            >
              <div
                className={classNames(
                  'pointer-events-none absolute inset-0 z-0 rounded-full border border-dashed border-white/50 hover:border-white',
                  draggingPoint ? 'opacity-100 transition-opacity' : 'opacity-0',
                )}
              />
              {isCellActive(row, column) && (
                <div className="absolute inset-0 z-10 rounded-full bg-white" onClick={() => toggleCell(row, column)} />
              )}
              {isCellActive(row, column) && (
                <div
                  draggable
                  className="absolute z-20 h-full w-full rounded-full bg-white/50"
                  onClick={() => vectorX === 0 && vectorY === 0 && toggleCell(row, column)}
                  onDragStart={() => dragStart({ x: column, y: row })}
                  onDragEnd={dragEnd}
                  style={{
                    left: `${vectorX * 150}%`,
                    top: `${vectorY * 150}%`,
                  }}
                />
              )}
              <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-zinc-900" />
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-zinc-900" />
            </div>
          );
        })}
      </div>
      <div className="mt-16">
        <VectorPlayer key={JSON.stringify(playground.state)} state={playground.state} />
      </div>
      <div className="mt-16 select-all">
        <pre>{JSON.stringify(playground.state)}</pre>
      </div>
    </div>
  );
}
