import './App.css';
import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Forecast } from './common/types/forecast';
import { getForecast, postForecast } from './api/WeatherApi';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Papa from 'papaparse';
import Stack from '@mui/material/Stack';
import type { City } from './common/types/City';
import WeatherHeader from './components/WeatherHeader';
import WeatherDetails from './components/WeatherDetails';
import CityList from './components/CityList';
import { Item } from './components/Item';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityList, setCityList] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  let localTime = new Date().toLocaleTimeString();
  const [twilightTime, setTwilightTime] = useState<string | null>(null);

  const { data: forecastList } = useQuery<Forecast[]>({
    queryKey: ['forecast', selectedCity?.city, selectedCity?.country],
    queryFn: () => getForecast(selectedCity!),
    enabled: selectedCity !== null,
    retry: false,
  });

  const forecast = forecastList?.[0];
  const topForecasts = forecastList?.slice(1) ?? [];

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
          const kaunas = result.data.find((c: City) => c.city === 'Kaunas' && c.country === 'Lithuania');
          if (kaunas && !selectedCity) {
            setSelectedCity(kaunas);
          }
        }
      })
      .catch((err) => console.error('Failed to load cities CSV:', err));
  }, []);

  useEffect(() => {
    if (selectedCity && !inputValue) {
      setInputValue(`${selectedCity.city}, ${selectedCity.country}`);
    }
  }, [selectedCity, inputValue]);

  return (
    <div style={{ display: 'flex', width: '100%', height:'100%', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: 'fit-content', alignSelf: 'center', p: 2, flexDirection: 'column' }}>
        <Stack spacing={2}>
          <div className="text-4xl">Good morning</div>

          <Grid container columns={16} spacing={2} sx={{ alignItems: 'stretch' }}>
            <Grid container size={8} columns={8} spacing={2} sx={{
              border: '1px solid #2c2929',
              borderRadius: 1.5,
              p: 2,
            }}>
              <WeatherHeader
                selectedCity={selectedCity}
                cityList={cityList}
                inputValue={inputValue}
                forecast={forecast}
                onCityChange={(newValue, displayLabel) => {
                  if (newValue && displayLabel) {
                    const found = cityList.find((c) => `${c.city}, ${c.country}` === displayLabel);
                    if (found) {
                      postForecast(found);
                      setSelectedCity(found);
                    }
                    setInputValue(displayLabel);
                  } else {
                    setSelectedCity(null);
                    setInputValue("");
                  }
                }}
                onInputChange={setInputValue}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue) {
                    const input = inputValue.toLowerCase();
                    const found = cityList.find(
                      (c) => `${c.city}, ${c.country}`.toLowerCase().startsWith(input)
                    );
                    if (found) {
                      postForecast(found);
                      setSelectedCity(found);
                      setInputValue(`${found.city}, ${found.country}`);
                      e.preventDefault();
                    }
                  }
                }}
              />

              <WeatherDetails forecast={forecast} twilightTime={twilightTime} />
            </Grid>

            <Grid container size={8} columns={4} spacing={2} sx={{
            border: '1px solid #2c2929',
            borderRadius: 1.5,
            p: 2,
            justifyContent: "center",
            alignSelf: 'stretch',
          }}>
            <Grid size={4}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div className="text-left text-xl">Other Countries</div>

                  <CityList forecastList={topForecasts} />
                </Item>

                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div>7 Day Forecast graph</div>
                </Item>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        </Stack>
      </Box>
    </div>
  );
}

export default App;
