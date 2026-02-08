import Box from '@mui/material/Box';
import type { CityWeather } from '../common/types/forecast';
import { Item } from './Item';
import Stack from '@mui/material/Stack';
import WeatherDetailsSkeleton from './skeletons/WeatherDetailsSkeleton';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';
import '../common/styling/weather_details.css';

interface WeatherDetailsProps {
  forecast: CityWeather | undefined;
  twilightTime: string | null;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export default function WeatherDetails({ forecast, twilightTime, isLoading, isEmpty }: WeatherDetailsProps) {
  if (isLoading || isEmpty) {
    return <WeatherDetailsSkeleton />;
  }

  return (
    <Stack spacing={1} className="weather-details-container">
      <Stack direction="row" spacing={1} sx={{ alignItems: 'stretch' }} className="weather-details-stack">
        <Item>
          <Stack spacing={1} className="weather-details-item-stack">
            <Box className="weather-details-label" sx={{ fontSize: 'clamp(1.1rem, 3vh, 2.5rem)' }}>
              <AirIcon className="weather-details-label-icon" sx={{ fontSize: 'clamp(1.6rem, 4vh, 3rem)' }} />
              <Box component="span" className="weather-details-label-text">Wind Status</Box>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="baseline">
              <Box sx={{ fontSize: 'clamp(1.8rem, 4vh, 3rem)' }}>{forecast?.windSpeed}</Box>
              <Box component="span"> km/h</Box>
            </Stack>
          </Stack>
        </Item>

        <Item>
          <Stack spacing={1} className="weather-details-item-stack">
            <Box className="weather-details-label" sx={{ fontSize: 'clamp(1.1rem, 3vh, 2.5rem)' }}>
              <WaterDropIcon className="weather-details-label-icon" sx={{ fontSize: 'clamp(1.6rem, 4vh, 3rem)' }} />
              <Box component="span" className="weather-details-label-text">Humidity</Box>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="baseline">
              <Box sx={{ fontSize: 'clamp(1.8rem, 4vh, 3rem)' }}>{forecast?.humidity}</Box>
              <Box component="span"> %</Box>
            </Stack>
          </Stack>
        </Item>

        <Item>
          <Stack spacing={1} className="weather-details-item-stack">
            <Box className="weather-details-label" sx={{ fontSize: 'clamp(1.1rem, 3vh, 2.5rem)' }}>
              <CloudySnowingIcon className="weather-details-label-icon" sx={{ fontSize: 'clamp(1.6rem, 4vh, 3rem)' }} />
              <Box component="span" className="weather-details-label-text">Precipitation</Box>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="baseline">
              <Box sx={{ fontSize: 'clamp(1.8rem, 4vh, 3rem)' }}>{forecast?.precipitation != null ? forecast.precipitation.toFixed(1) : '—'}</Box>
              <Box component="span"> mm</Box>
            </Stack>
          </Stack>
        </Item>
      </Stack>

      <Item className="weather-details-twilight-item">
        <Stack direction="row" spacing={1} className="weather-details-twilight-stack">
          <WbTwilightIcon sx={{ fontSize: 'clamp(2.5rem, 5.5vh, 5rem)' }} />
          <Box sx={{ fontSize: 'clamp(1.4rem, 3vh, 2.5rem)' }}>{twilightTime}</Box>
        </Stack>
      </Item>
    </Stack>
  );
}
