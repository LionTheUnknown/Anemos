import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import type { CityWeather } from '../common/types/forecast';
import Stack from '@mui/material/Stack';
import WeatherIcon from './WeatherIcon';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
import { formatTemp } from '../common/utils/formatTemp';
import { Item } from './Item';

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
      sx={{
        cursor: onCitySelect ? 'pointer' : 'default',
        width: '100%',
        marginBottom: 1}}>
      <Grid container size={4} columns={4} spacing={1} sx={{
        justifyContent: "space-between",
        alignItems: "center"}}>
        <Grid size={2}>
          <Stack sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start"}}>
            <Box sx={{color: 'rgba(255,255,255, 0.6)', fontSize: { xs: '1.3rem', sm: '1.4rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem' } }}>{countryName}</Box>
            <Box sx={{ color: 'rgba(255,255,255)', fontSize: { xs: '1.7rem', sm: '1.9rem', md: '2.1rem', lg: '2.225rem', xl: '2.35rem' } }}>{cityName}</Box>
            <Box sx={{ fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.45rem', lg: '1.6rem', xl: '1.6rem' } }}>{weatherInfo?.label ?? ''}</Box>
          </Stack>
        </Grid>
        <Grid size={1} sx={{ alignItems: "center" }}>
          {weatherInfo && (
            <WeatherIcon weather_code={cityWeather?.weather_code} size={{ xs: 60, sm: 70, md: 70, lg: 70, xl: 80 }} alt={cityName} />
          )}
        </Grid>
        
        <Grid size={1} >
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: "flex-end"}}>
            <Box sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem', lg: '2.125rem', xl: '2.25rem' } }}>{formatTemp(cityWeather?.temperature)}</Box>
            <Box sx={{ fontSize: { xs: '1.4rem', sm: '1.55rem', md: '1.75rem', lg: '1.875rem', xl: '1.875rem' }, color: 'rgba(255,255,255,0.6)' }}>/{formatTemp(cityWeather?.apparent_temperature)}</Box>
          </Stack>
        </Grid>
      </Grid>
    </Item>
  );
}