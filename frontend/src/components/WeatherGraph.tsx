import Stack from '@mui/material/Stack';
import type { FiveDayForecast } from '../common/types/forecast';
import { Item } from './Item';
import WeatherIcon from './WeatherIcon';

interface WeatherGraphProps {
  forecast: FiveDayForecast;
}

export default function WeatherGraph({ forecast }: WeatherGraphProps) {
  return (
        <Stack direction="row" spacing={1}>
          {forecast.map((day) => (
            <Item className="flex flex-col items-center">  
              <div className="text-sm">{day.day}</div>
              <WeatherIcon weather_code={day.weather_code} size={48}/>
              <div>{day.temp} °C</div>
            </Item>
          ))}
        </Stack>
  );
}