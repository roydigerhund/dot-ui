import { useEffect, useState } from 'react';
import TextPlayer from './TextPlayer';
import Watch from './Watch';
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
    <Watch>
      <div className="flex grow flex-col items-center justify-between">
        <div />
        <div className="flex flex-col items-center gap-12">
          <WeatherPlayer weather={weather[1]} />
          <TextPlayer text={weather[0]} size="large" />
        </div>
        <div className="mt-12 flex gap-8">
          <TextPlayer text={`H:${weatherStates[unit][0][0]}`} size="small" />
          <TextPlayer text={`L:${weatherStates[unit][2][0]}`} size="small" />
        </div>
      </div>
    </Watch>
  );
}
