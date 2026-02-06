import { WEATHER_CODE_MAP } from '../common/records/weather_code';

interface WeatherIconProps {
  weather_code?: number | string;
  size?: number;
  alt?: string;
}

export default function WeatherIcon({
  weather_code,
  size = 256,
  alt = "Weather condition",
}: WeatherIconProps) {
  const code = typeof weather_code === 'number' ? weather_code : parseInt(String(weather_code ?? 0), 10);
  const weatherInfo = WEATHER_CODE_MAP[code] ?? WEATHER_CODE_MAP[0];
  const src = `/weather_icons/${weatherInfo.icon}.png`;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}
