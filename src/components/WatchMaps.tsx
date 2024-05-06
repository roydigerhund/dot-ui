import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { numPad } from '../utils/numbers';
import ArrowPlayer from './ArrowPlayer';
import DotPlayer from './DotPlayer';
import NumbersPlayer from './NumbersPlayer';

type Direction = [number, 'up' | 'right', 'far' | 'medium' | 'near'];

const directions: Direction[] = [
  [180, 'up', 'far'],
  [120, 'up', 'medium'],
  [50, 'up', 'near'],
  [0, 'right', 'far'],
  [240, 'right', 'far'],
  [170, 'right', 'far'],
  [90, 'right', 'medium'],
  [25, 'right', 'near'],
  [0, 'up', 'far'],
];

export default function WatchMaps() {
  const [directionIndex, setDirectionIndex] = useState(0);
  const userLang = navigator.language || 'en-US';
  const currentTime = new Date().toLocaleTimeString(userLang, { hour: 'numeric', minute: '2-digit' });
  const direction = directions[directionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirectionIndex((prev) => (prev + 1) % directions.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[430px] w-[352px] rounded-[3.5rem] border border-white">
      <div className="absolute -right-3 top-20 h-16 w-3 rounded-r-md bg-white" />
      <div className="absolute -right-1 top-56 h-24 w-1 rounded-r-sm bg-white" />
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex items-start justify-between">
          <motion.div
            animate={{ rotate: [0, 12, 36, -12, 0] }}
            transition={{
              duration: 12,
              ease: 'anticipate',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            <DotPlayer
              state={[
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 0, 1, 1, 0],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
              ]}
            />
          </motion.div>
          <div className="flex justify-center">
            <NumbersPlayer number={currentTime.split(':')[0]} size="medium" />
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: [0.1], repeatDelay: 0.9, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
            >
              <DotPlayer
                state={[
                  [0, 0, 0],
                  [0, 0, 0],
                  [0, 1, 0],
                  [0, 0, 0],
                  [0, 1, 0],
                  [0, 0, 0],
                  [0, 0, 0],
                ]}
              />
            </motion.div>
            <NumbersPlayer number={currentTime.split(':')[1]} size="medium" />
          </div>
        </div>
        <div className="flex items-start justify-center">
          <ArrowPlayer arrow={direction[1]} />
        </div>
        <div className="flex justify-center">
          <NumbersPlayer number={numPad(direction[0], 3)} size="large" />
          <DotPlayer
            state={[
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 1, 1, 1, 1],
              [0, 0, 1, 0, 1, 0, 1],
              [0, 0, 1, 0, 1, 0, 1],
              [0, 0, 1, 0, 1, 0, 1],
              [0, 0, 1, 0, 1, 0, 1],
            ]}
          />
        </div>
      </div>
    </div>
  );
}
