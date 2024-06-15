import { useEffect, useRef, useState } from 'react';
import { RestStates } from '../utils/types';

export default function DotPlayerCanvas({ states, duration = 1000 }: { states: RestStates; duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStateIndex, setActiveStateIndex] = useState(0);

  const columns = states[0][0].length;
  const rows = states[0].length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStateIndex((prev) => (prev + 1) % states.length);
    }, duration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  useEffect(() => {
    const activeState = states[activeStateIndex];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dotSize = 4;
    const canvasWidth = columns * dotSize;
    const canvasHeight = rows * dotSize;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    activeState.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        ctx.fillStyle = column ? 'white' : 'transparent';
        ctx.beginPath();
        ctx.arc(columnIndex * dotSize, rowIndex * dotSize, dotSize, 0, 0.5 * Math.PI);
        ctx.fill();
      });
    });
  }, [columns, rows, duration, activeStateIndex, states]);

  return <canvas ref={canvasRef} />;
}
