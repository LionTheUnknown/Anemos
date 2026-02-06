import Grid from '@mui/material/Grid';
import type { CityWeather } from '../common/types/forecast';
import Stack from '@mui/material/Stack';
import WeatherIcon from './WeatherIcon';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
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
        <Grid size={1}>
          <Stack sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start"}}>
            <div className="text-stone-400 text-sm">{cityName}</div>
            <div className="text-xl">{countryName}</div>
            <div className="text-sm">{weatherInfo?.label ?? ''}</div>
          </Stack>
        </Grid>
        <Grid size={1} sx={{ alignItems: "center" }}>
          {weatherInfo && (
            <WeatherIcon weather_code={cityWeather?.weather_code} size={48} alt={cityName} />
          )}
        </Grid>
        
        <Grid size={1} >
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: "flex-end"}}>
            <div className="text-lg">{cityWeather?.temperature}°</div>
            <div className="text-sm text-stone-400">/{cityWeather?.apparent_temperature}°</div>
          </Stack>
        </Grid>
      </Grid>
    </Item>
  );
}