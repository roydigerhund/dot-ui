import { useState } from 'react';

import RestComposer from './components/RestComposer';
import VectorComposer from './components/VectorComposer';
import Watch3dPlayer from './components/Watch3dPlayer';
import WatchMaps from './components/WatchMaps';
import WatchWeather from './components/WatchWeather';
import { classNames } from './utils/classNames';

type Selected = 'weather' | 'maps' | '3d-cube';

const selections: Record<Selected, string> = {
  weather: 'Weather',
  maps: 'Maps',
  '3d-cube': '3D Cube',
};

function App() {
  const [showComposer, setShowComposer] = useState(false);
  const [selected, setSelected] = useState<Selected>('weather');

  return (
    <div className="flex flex-col items-center justify-center gap-24 p-16">
      <div>
        <h1
          className="flex cursor-pointer items-center justify-center gap-1 text-6xl font-bold leading-none tracking-wide"
          onClick={() => setShowComposer(!showComposer)}
        >
          <span className="mt-8 block h-3 w-3 rounded-full bg-white" />
          <span className="sr-only">Dot</span>
          <span className="block bg-gradient-to-l from-blue-500 to-purple-500 bg-clip-text text-transparent">UI</span>
        </h1>
        <div
          className={classNames(
            'mt-10 rounded-xl p-px',
            'bg-gradient-to-br from-stone-800 via-stone-500 to-stone-800',
            'tracking-wider text-white/50 text-sm',
          )}
        >
          <div className="relative flex rounded-xl bg-black px-3">
            {Object.entries(selections).map(([key, value]) => (
              <button
                key={key}
                className={classNames(
                  'relative px-6 py-3 uppercase hover:text-white',
                  'transition-colors duration-200 hover:duration-300',
                  selected === key && 'text-white',
                )}
                onClick={() => setSelected(key as Selected)}
              >
                {value}
                <span
                  className={classNames(
                    'to-blue-transparent absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500',
                    'transition-opacity duration-300',
                    selected === key ? 'opacity-100' : 'opacity-0',
                  )}
                  style={{ transform: 'translateY(100%)' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {showComposer ? (
        <>
          <RestComposer />
          <VectorComposer />
        </>
      ) : (
        <>
          {selected === '3d-cube' && <Watch3dPlayer />}
          {selected === 'weather' && <WatchWeather />}
          {selected === 'maps' && <WatchMaps />}
        </>
      )}
    </div>
  );
}

export default App;
