import { useEffect, useState } from 'react';
import DotPlayer from './DotPlayer';
import Watch from './Watch';
import states from '../states/3d-cube.json';
import TextPlayer from './TextPlayer';

export default function Watch3dPlayer() {
  const [stateIndex, setStateIndex] = useState(0);
  const state = states[stateIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % states.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Watch>
      <div className="flex grow flex-col items-center justify-center gap-8">
        <DotPlayer state={state} duration={150} method="scale" />
        <TextPlayer text="3D CUBE" />
      </div>
    </Watch>
  );
}
