import { useEffect, useState } from 'react';
import NumbersPlayer from './NumbersPlayer';
import WeatherPlayer from './WeatherPlayer';

type WeatherState = [string, 'sunny' | 'cloudy' | 'rain'];

const weatherStates: Record<'celsius' | 'fahrenheit', WeatherState[]> = {
  celsius: [
    ['26°C', 'sunny'],
    ['19°C', 'cloudy'],
    ['15°C', 'rain'],
  ],
  fahrenheit: [
    ['79°F', 'sunny'],
    ['66°F', 'cloudy'],
    ['59°F', 'rain'],
  ],
};

export default function WatchWeather() {
  const [weatherIndex, setWeatherIndex] = useState(0);
  const userLang = navigator.language || 'en-US';
  const unit = userLang === 'en-US' ? 'fahrenheit' : 'celsius';
  const weather = weatherStates[unit][weatherIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherIndex((prev) => (prev + 1) % weatherStates.celsius.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[430px] w-[352px] rounded-[3.5rem] border border-white">
      <div className="absolute -right-3 top-20 h-16 w-3 rounded-r-md bg-white" />
      <div className="absolute -right-1 top-56 h-24 w-1 rounded-r-sm bg-white" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-12">
          <WeatherPlayer weather={weather[1]} />
          <NumbersPlayer number={weather[0]} size="large" />
        </div>
      </div>
    </div>
  );
}
