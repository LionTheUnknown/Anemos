import Grid from '@mui/material/Grid';
import type { Forecast } from '../common/types/forecast';
import Stack from '@mui/material/Stack';
import WeatherIcon from './WeatherIcon';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
import { Item } from './Item';

interface CityCardProps {
  forecast: Forecast;
}

export default function CityCard({ forecast }: CityCardProps) {
  const weatherCode = typeof forecast?.weather_code === 'number' ? forecast.weather_code : parseInt(String(forecast?.weather_code ?? 0), 10);
  const weatherInfo = WEATHER_CODE_MAP[weatherCode];
  const cityName = forecast?.city_name ?? '';
  const countryName = forecast?.country ?? '';

  return (
      <Item>
        <Grid container size={4} columns={4} spacing={1} sx={{
          justifyContent: "space-between",
          alignItems: "center"}}>
            <Grid size={2}>
              <Stack sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start"}}>
                <div>{cityName}</div>
                <div>{countryName}</div>
                <div>{weatherInfo?.label ?? ''}</div>
              </Stack>
            </Grid>
            <Grid size={1} sx={{
    alignitems: "center"}}>
              {weatherInfo && (
                <WeatherIcon weather_icon={weatherInfo.icon} size={48} alt={cityName} />
              )}
            </Grid>
          <Grid size={1} >{forecast?.temperature}°C</Grid>
        </Grid>
      </Item>
  );
}