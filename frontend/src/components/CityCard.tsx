import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import type { CityWeather } from '../common/types/forecast';
import Stack from '@mui/material/Stack';
import WeatherIcon from './WeatherIcon';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
import { formatTemp } from '../common/utils/formatTemp';
import { Item } from './Item';
import '../common/styling/city_card.css';

interface CityCardProps {
  cityWeather: CityWeather;
  onCitySelect?: (cityWeather: CityWeather) => void;
}

export default function CityCard({ cityWeather, onCitySelect }: CityCardProps) {
  const weatherCode = typeof cityWeather?.weather_code === 'number' ? cityWeather.weather_code : parseInt(String(cityWeather?.weather_code ?? 0), 10);
  const weatherInfo = WEATHER_CODE_MAP[weatherCode];
  const cityName = cityWeather?.city_name ?? '';
  const countryName = cityWeather?.country ?? '';

  return (
    <Item
      onClick={() => onCitySelect?.(cityWeather)}
      className="city-card-item"
      sx={{ cursor: onCitySelect ? 'pointer' : 'default' }}>
      <Grid container size={4} columns={4} className="city-card-grid">
        <Grid size={1.5}>
          <Stack className="city-card-info-stack">
            <Box className="city-card-country" sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem' } }}>{countryName}</Box>
            <Box className="city-card-city" sx={{ fontSize: { xs: '1.4rem', sm: '1.9rem', md: '2.1rem', lg: '2.225rem', xl: '2.35rem' } }}>{cityName}</Box>
            <Box sx={{ fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.3rem', lg: '1.6rem', xl: '1.6rem' } }}>{weatherInfo?.label ?? ''}</Box>
          </Stack>
        </Grid>
        <Grid size={1.5} className="city-card-icon-container">
          {weatherInfo && (
            <WeatherIcon weather_code={cityWeather?.weather_code} size={{ xs: '2.5rem', sm: '4.375rem', md: '4.375rem', lg: '4.375rem', xl: '5rem' }} alt={cityName} />
          )}
        </Grid>
        
        <Grid size={1}>
          <Stack direction="row" className="city-card-temp-stack">
            <Box sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem', lg: '2.125rem', xl: '2.25rem' } }}>{formatTemp(cityWeather?.temperature)}</Box>
            <Box className="city-card-temp-apparent" sx={{ fontSize: { xs: '1.2rem', sm: '1.55rem', md: '1.75rem', lg: '1.875rem', xl: '1.875rem' } }}>/{formatTemp(cityWeather?.apparent_temperature)}</Box>
          </Stack>
        </Grid>
      </Grid>
    </Item>
  );
}
