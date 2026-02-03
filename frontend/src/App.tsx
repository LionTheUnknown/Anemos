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
import type { City } from './common/types/City';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid #000000',
  }),
}));

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [cityList, setCityList] = useState<City[]>([]);
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
        const result = Papa.parse<City>(csvText, {
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
    <div style={{ display: 'flex'}}>
      <Box sx={{ width: 'fit-content', alignSelf: 'center', p: 2, flexDirection: 'column' }}>
        <Grid container size={8} columns={8} spacing={2} sx={{ alignItems: 'stretch' }}>
          <Grid container size={4} spacing={2} sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 2,
            justifyContent: "center",
            alignSelf: 'flex-start',
          }}>
            <Grid container size={8} direction="row" sx={{
            justifyContent: "space-between",
            alignItems: "center"}}>
              <Grid size={2}>
                <Autocomplete
                    autoSelect
                    disablePortal
                    options={cityList.map((c) => c.city)}
                    filterOptions={(options, state) => {
                      if (state.inputValue.length < 1) return [];
                      const input = state.inputValue.toLowerCase();
                      return options
                        .filter((option) => option.toLowerCase().startsWith(input))
                        .sort((a, b) => {
                          const aExact = a.toLowerCase() === input;
                          const bExact = b.toLowerCase() === input;
                          if (aExact && !bExact) return -1;
                          if (!aExact && bExact) return 1;
                          return a.length - b.length || a.localeCompare(b);
                        })
                        .slice(0, 10);
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputValue) {
                        const first = cityList
                          .map((c) => c.city)
                          .find((city) => city.toLowerCase().startsWith(inputValue.toLowerCase()));
                        if (first) {
                          setCity(first);
                          setInputValue(first);
                          e.preventDefault();
                        }
                      }
                    }}
                  />
              </Grid>
              <Grid size={2}>
                <Item>°C</Item>
              </Grid>
            </Grid>
          
            <Grid
              container size={8} direction="row" sx={{
                justifyContent: "flex-start",
                alignItems: "center",}}>
                <Grid size={2}>
                <Item>Sunday</Item>
                </Grid>
            </Grid>

            <Grid container columns={8} size={8}>
              <Grid size={4}>
                  <Item sx={{ height: '100%', boxSizing: 'border-box' }}>Weather ICON</Item>
              </Grid>
              <Grid size={4}>
                <Stack spacing={2}>
                  <Item>
                    <div>Current Temperature: {forecast?.temperature} °C</div>
                  </Item>
                  <Item>
                    <div>Apparent Temperature: {forecast?.apparent_temperature} °C</div>
                  </Item>
                </Stack>
              </Grid>
            </Grid>

            <Grid container columns={8} size={8}>
              <Grid size={4}>
                  <Item>
                    <div>Wind Speed: {forecast?.windSpeed} km/h</div>
                  </Item>
              </Grid>

              <Grid size={4}>
                  <Item>
                    <div>Humidity: {forecast?.humidity} %</div>
                  </Item>
              </Grid>
            </Grid>

            <Grid size={8}>
                  <Item>
                    <div>{twilightTime}</div>
                  </Item>
              </Grid>
          </Grid>

          <Grid container size={4} columns={4} spacing={2} sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 2,
            justifyContent: "center",
            alignSelf: 'stretch',
          }}>
            <Grid size={4}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div>Other Countries</div>
                </Item>

                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div>7 Day Forecast graph</div>
                </Item>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
