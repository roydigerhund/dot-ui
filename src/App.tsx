import { motion } from "framer-motion";

const states = {
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
      [1.1, 1.1],
      [-1.1, -1.1],
      [0, 0],
      [-1.1, 1.1],
      [1.1, -1.1],
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

function App() {
  return (
    <div className="flex flex-col justify-center items-center p-8 gap-12">
      <h1 className="text-6xl tracking-wider font-thin">Dot UI</h1>
      {Object.keys(states).map((stateKey) => {
        const state = states[stateKey as keyof typeof states];
        return (
          <div key={stateKey} className="w-16 h-16 relative">
            {state[0].map((pos, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-white rounded-full absolute"
                style={{
                  top: `calc(50% - 0.5rem)`,
                  left: `calc(50% - 0.5rem)`,
                }}
                animate={{
                  translateX: state.map((state) => state[i][0] + "rem"),
                  translateY: state.map((state) => state[i][1] + "rem"),
                }}
                transition={{
                  duration: state.length / 2,
                  repeatDelay: 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "backInOut",
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
