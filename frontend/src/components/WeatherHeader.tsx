import '../common/styling/weather_header.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import type { City } from '../common/types/City';
import type { CityWeather } from '../common/types/forecast';
import WeatherIcon from './WeatherIcon';
import CityAutocomplete from './CityAutocomplete';
import { WEATHER_CODE_MAP } from '../common/records/weather_code';
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
}: WeatherHeaderProps) {
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
              width: 50,
              height: 50,
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: '#282c34',
            }}
            size="medium"
          />
        </Grid>
      </Grid>

      <Grid size={8} direction="row" sx={{
          justifyContent: "flex-start",
          alignItems: "center"}}>
        <Stack spacing={0.5}>
          <div className="text-3xl">{day}</div>
          <div className="whitespace-nowrap">{dayNumber} {month}, {year}</div>
        </Stack>
      </Grid>

      <Grid container columns={8} size={8}>
        <Grid size={4}> 
            {forecast != null && (
              <WeatherIcon
                weather_code={forecast?.weather_code}
                size={128}
                alt="Current weather"
              />
            )}
        </Grid>
        <Grid size={4}>
          <Stack spacing={2} sx={{ justifyContent: "flex-start",alignItems: "flex-end"}}>
            <Stack sx={{alignItems: "flex-end"}}>
              <div className="text-3xl items-end">{forecast?.temperature}°C</div>
              <div className="text-stone-200">/{forecast?.apparent_temperature} °C</div>
            </Stack>
            <Stack sx={{alignItems: "flex-end"}}>
              <div className="text-3xl justify-end">{weatherInfo.label}</div>
              <div className="text-stone-200">Feels like {forecast?.apparent_temperature}°</div>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
