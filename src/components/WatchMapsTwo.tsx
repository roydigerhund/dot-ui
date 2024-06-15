import { useEffect, useState } from 'react';
import states from '../states/map.json';
import { RestStates } from '../utils/types';
import DotPlayer from './DotPlayer';
import Watch from './Watch';

export default function WatchMapsTwo() {
  const [stateIndex, setStateIndex] = useState(0);
  const state = (states as RestStates)[stateIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % (states as RestStates).length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Watch noPadding>
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DotPlayer state={state} duration={150} method="scale" />
        </div>
        {/* <TextPlayer text="3D CUBE" /> */}
      </div>
    </Watch>
  );
}
