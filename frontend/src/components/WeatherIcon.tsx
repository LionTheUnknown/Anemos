import Box from '@mui/material/Box';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';

type SizeValue = number | string;
type AdjustableSize = SizeValue | { xs?: SizeValue; sm?: SizeValue; md?: SizeValue; lg?: SizeValue; xl?: SizeValue };

interface WeatherIconProps {
  weather_code?: number | string;
  size?: AdjustableSize;
  alt?: string;
}

export default function WeatherIcon({
  weather_code,
  size = '16rem',
  alt = "Weather condition",
}: WeatherIconProps) {
  const code = typeof weather_code === 'number' ? weather_code : parseInt(String(weather_code ?? 0), 10);
  const weatherInfo = WEATHER_CODE_MAP[code] ?? WEATHER_CODE_MAP[0];
  const src = `/weather_icons/${weatherInfo.icon}.png`;

  const sizeSx = { width: size, height: size };

  return (
    <Box sx={sizeSx}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
}
