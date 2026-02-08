import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import WeatherHeaderSkeleton from './skeletons/WeatherHeaderSkeleton';
import type { City } from '../common/types/City';
import type { CityWeather } from '../common/types/forecast';
import WeatherIcon from './WeatherIcon';
import CityAutocomplete from './CityAutocomplete';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
import { formatTemp } from '../common/utils/formatTemp';
import type { WeatherInfo } from '../common/records/weather_code';
import FormatTempButton from './FormatTempButton';
import '../common/styling/weather_header.css';

interface WeatherHeaderProps {
  selectedCity: City | null;
  cityList: City[];
  inputValue: string;
  forecast: CityWeather | undefined;
  onCityChange: (newValue: string | null, displayLabel?: string) => void;
  onInputChange: (newValue: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading?: boolean;
  isEmpty?: boolean;
}

function getInfoFromWeatherCode(code: number | string): WeatherInfo {
  const num = typeof code === 'number' ? code : parseInt(String(code ?? 0), 10);
  return WEATHER_CODE_MAP[num] ?? WEATHER_CODE_MAP[0];
}

export default function WeatherHeader({
  selectedCity,
  cityList,
  inputValue,
  forecast,
  onCityChange,
  onInputChange,
  onKeyDown,
  isLoading,
  isEmpty,
}: WeatherHeaderProps) {
  const showSkeleton = isLoading || isEmpty;
  const weatherInfo = getInfoFromWeatherCode(forecast?.weather_code ?? 0);
  let now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = days[now.getDay()];
  const dayNumber = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  return (
    <>
      <Grid container size={8} columns={8} direction="row" className="weather-header-top-grid">
        <Grid size={6}>
          <CityAutocomplete
            selectedCity={selectedCity}
            cityList={cityList}
            inputValue={inputValue}
            onCityChange={onCityChange}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
          />
        </Grid>
        <Grid container size={2} sx={{ justifyContent: "flex-end"}}>
          <FormatTempButton
            className="format-temp-button"
            size="medium"
          />
        </Grid>
      </Grid>

      <Grid size={8} className="weather-header-date-grid">
        <Stack>
          <Box sx={{ fontSize: 'clamp(1.9rem, 5vh, 4rem)' }}>{day}</Box>
          <Box className="weather-header-date" sx={{ fontSize: 'clamp(1.6rem, 3.2vh, 3rem)' }}>{dayNumber} {month}, {year}</Box>
        </Stack>
      </Grid>

      <Grid container columns={8} size={8}>
        {showSkeleton ? (
          <WeatherHeaderSkeleton />
        ) : (
          <>
            <Grid size={4}>
              <WeatherIcon
                weather_code={forecast?.weather_code}
                size={{ xs: '8.75rem', sm: '11.25rem', md: '11.25rem', lg: '12.5rem', xl: '16rem' }}
                alt="Current weather"
              />
            </Grid>
            <Grid size={4}>
              <Stack spacing={2} className="weather-header-temp-stack">
                <Stack className="weather-header-info-stack">
                  <Box sx={{ fontSize: 'clamp(2rem, 5vh, 4rem)' }}>{formatTemp(forecast?.temperature)}</Box>
                  {(forecast?.temperature_max != null || forecast?.temperature_min != null) && (
                    <Box className="weather-header-temp-sub" sx={{ fontSize: 'clamp(1.2rem, 2vh, 1.9rem)' }}>
                      {formatTemp(forecast?.temperature_max)} / {formatTemp(forecast?.temperature_min)}
                    </Box>
                  )}
                </Stack>
                <Stack className="weather-header-info-stack">
                  <Box sx={{ fontSize: 'clamp(1.8rem, 3.5vh, 3.2rem)' }}>{weatherInfo.label}</Box>
                  <Box className="weather-header-feels-like" sx={{ fontSize: 'clamp(1.2rem, 2vh, 1.9rem)' }}>Feels like {formatTemp(forecast?.apparent_temperature)}</Box>
                </Stack>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
