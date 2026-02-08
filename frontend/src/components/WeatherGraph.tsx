import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { FiveDayForecast } from '../common/types/forecast';
import { formatTemp } from '../common/utils/formatTemp';
import { Item } from './Item';
import WeatherIcon from './WeatherIcon';
import WeatherGraphSkeleton from './skeletons/WeatherGraphSkeleton';
import '../common/styling/weather_graph.css';

interface WeatherGraphProps {
  forecast: FiveDayForecast;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export default function WeatherGraph({ forecast, isLoading, isEmpty }: WeatherGraphProps) {
  if (isLoading || isEmpty) {
    return <WeatherGraphSkeleton />;
  }

  return (
        <Stack direction="row" spacing={1} className="weather-graph-stack">
          {forecast.map((day) => (
            <Item key={day.day} className="!p-0 weather-graph-item">
              <Box sx={{ fontSize: { xs: '1rem', sm: '1.7rem', md: '1.5rem', lg: '1.5rem', xl: '2.125rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' } }}>{day.day}</Box>
              <WeatherIcon weather_code={day.weather_code} size={{ xs: '2.5rem', sm: '2.5rem', md: '3.75rem', lg: '4.375rem', xl: '6.25rem' }}/>
              <Box sx={{ fontSize: { xs: '1rem', sm: '1.7rem', md: '1.5rem', lg: '1.5rem', xl: '2.125rem' } }}>{formatTemp(day.temp)}</Box>
            </Item>
          ))}
        </Stack>
  );
}