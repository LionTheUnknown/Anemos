import './App.css';
import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Forecast } from './common/types/forecast';
import { getForecast } from './api/WeatherApi';
import { TextField, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Papa from 'papaparse';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


type WorldCity = {
  city: string;
  city_ascii: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  iso3: string;
  admin_name: string;
  capital: string;
  population: string;
  id: string;
}

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [cityList, setCityList] = useState<WorldCity[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  let localTime = new Date().toLocaleTimeString();
  const [twilightTime, setTwilightTime] = useState<String | null>(null);

  const { data: forecast, isLoading, isError, error } = useQuery<Forecast>({
    queryKey: ['forecast', city],
    queryFn: () => getForecast(city!),
    enabled: city !== null,
    retry: false,
  });

  useEffect(() => {
    if (forecast?.sunrise && forecast?.sunset) {
      if(localTime > forecast.sunrise) {
        setTwilightTime(`Sunrise at ${new Date(forecast.sunrise).toLocaleTimeString()}`);
      } else {
        setTwilightTime(`Sunset at ${new Date(forecast.sunset).toLocaleTimeString()}`);
      }
    }
  }, [forecast]);
  useEffect(() => {
    fetch('/worldcities.csv')
      .then((res) => res.text())
      .then((csvText) => {
        const result = Papa.parse<WorldCity>(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        if (result.data) {
          setCityList(result.data);
        }
      })
      .catch((err) => console.error('Failed to load cities CSV:', err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCity(city);
    }, 500);

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
    <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0, p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ minHeight: 200 }}>
          <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
          <Autocomplete
        disablePortal
        options={cityList.map((c) => c.city)}
        filterOptions={(options, state) => {
          if (state.inputValue.length < 1) {
            return [];
          }
          return options.filter((option) => option.toLowerCase().startsWith(state.inputValue.toLowerCase())).slice(0, 10);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
        value={city}
        onChange={(event: any, newValue: string | null) => {
          setCity(newValue);
          setInputValue(newValue || "");
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
            <Stack spacing={2} sx={{ height: '100%' }}>
              <div>Current Temperature: {forecast?.temperature} °C</div>
              <div>Apparent Temperature: {forecast?.apparent_temperature} °C</div>
              <div>Wind Speed: {forecast?.windSpeed} km/h</div>
              <div>Humidity: {forecast?.humidity} %</div>
              <div>{twilightTime}</div>
            </Stack>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: 200 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Item sx={{ flex: 1, boxSizing: 'border-box' }}>Column 1 - Row 1</Item>
            <Item sx={{ flex: 1, boxSizing: 'border-box' }}>Column 1 - Row 2</Item>
          </Stack>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}

export default App;
