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
      <Grid container size={8} columns={8} direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "center"}}>
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
            sx={{
              width: 55,
              height: 55,
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.23)',
              backgroundColor: 'rgba(70, 69, 69, 0.2)'
            }}
            size="medium"
          />
        </Grid>
      </Grid>

      <Grid size={8} sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start"}}>
        <Stack>
          <Box sx={{ fontSize: { xs: '1.9rem', sm: '2.15rem', md: '2.4rem', lg: '2.75rem', xl: '4rem' } }}>{day}</Box>
          <Box sx={{ fontSize: { xs: '1.5rem', sm: '1.65rem', md: '1.8rem', lg: '1.9rem', xl: '1.9rem' }, whiteSpace: 'nowrap' }}>{dayNumber} {month}, {year}</Box>
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
                size={{ xs: 80, sm: 180, md: 180, lg: 200, xl: 256 }}
                alt="Current weather"
              />
            </Grid>
            <Grid size={4}>
              <Stack spacing={2} sx={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
                <Stack sx={{ alignItems: "flex-end", textAlign: 'right' }}>
                  <Box sx={{ fontSize: { xs: '2rem', sm: '2.35rem', md: '2.75rem', lg: '3.3rem', xl: '3.5rem' } }}>{formatTemp(forecast?.temperature)}</Box>
                  {(forecast?.temperature_max != null || forecast?.temperature_min != null) && (
                    <Box sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '1.5rem', sm: '1.55rem', md: '1.5rem', lg: '1.6rem', xl: '1.6rem' } }}>
                      {formatTemp(forecast?.temperature_max)} / {formatTemp(forecast?.temperature_min)}
                    </Box>
                  )}
                </Stack>
                <Stack sx={{ justifyContent: "flex-end",alignItems: "flex-end", textAlign: 'right' }}>
                  <Box sx={{ fontSize: { xs: '1.9rem', sm: '2.25rem', md: '2.2rem', lg: '2.85rem', xl: '3rem' } }}>{weatherInfo.label}</Box>
                  <Box sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '1.5rem', sm: '1.65rem', md: '1.8rem', lg: '1.9rem', xl: '1.9rem' } }}>Feels like {formatTemp(forecast?.apparent_temperature)}</Box>
                </Stack>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
