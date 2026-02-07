import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import type { FiveDayForecast } from '../common/types/forecast';
import { formatTemp } from '../common/utils/formatTemp';
import { Item } from './Item';
import WeatherIcon from './WeatherIcon';
import WeatherGraphSkeleton from './skeletons/WeatherGraphSkeleton';

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
        <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: "stretch"}}>
          {forecast.map((day) => (
            <Item key={day.day} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>  
              <Box sx={{ fontSize: { xs: '1.3rem', sm: '1.7rem', md: '1.5rem', lg: '1.5rem', xl: '2.125rem' } }}>{day.day}</Box>
              <WeatherIcon weather_code={day.weather_code} size={{ xs: 50, sm: 40, md: 60, lg: 70, xl: 100 }}/>
              <Box sx={{ fontSize: { xs: '1.3rem', sm: '1.7rem', md: '1.5rem', lg: '1.5rem', xl: '2.125rem' } }}>{formatTemp(day.temp)}</Box>
            </Item>
          ))}
        </Stack>
  );
}