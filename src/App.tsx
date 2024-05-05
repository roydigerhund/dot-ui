import { useState } from 'react';

import RestComposer from './components/RestComposer';
import VectorComposer from './components/VectorComposer';
import WatchMaps from './components/WatchMaps';

function App() {
  const [showComposer, setShowComposer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-24 p-16">
      <h1
        className="flex items-center justify-center gap-1 text-6xl font-bold leading-none tracking-wide cursor-pointer"
        onClick={() => setShowComposer(!showComposer)}
      >
        <span className="mt-8 block h-3 w-3 rounded-full bg-white" />
        <span className="sr-only">Dot</span>
        <span className="block bg-gradient-to-l from-blue-500 to-purple-500 bg-clip-text text-transparent">UI</span>
      </h1>
      {showComposer ? (
        <>
          <RestComposer />
          <VectorComposer />
        </>
      ) : (
        <WatchMaps />
      )}
    </div>
  );
}

export default App;
