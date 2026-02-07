import './App.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CityWeather } from './common/types/forecast';
import {
  getSelectedCityForecast,
  getTopCitiesForecast,
  postForecast,
} from './api/WeatherApi';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Papa from 'papaparse';
import Stack from '@mui/material/Stack';
import type { City } from './common/types/City';
import BreakpointDebug from './components/BreakpointDebug';
import Greeting from './components/Greeting';
import WeatherHeader from './components/WeatherHeader';
import WeatherDetails from './components/WeatherDetails';
import CityList from './components/CityList';
import WeatherGraph from './components/WeatherGraph';
import BackgroundApplier, { getEffectFromWeather } from './components/BackgroundApplier';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityList, setCityList] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [twilightTime, setTwilightTime] = useState<string | null>(null);

  const localStorage = window.localStorage;

  const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
  const HOUR_MS = 60 * 60 * 1000;

  const { data: selectedCityData, isLoading: isSelectedCityLoading } = useQuery({
    queryKey: ['forecast', 'selected', selectedCity?.city, selectedCity?.country],
    queryFn: () => getSelectedCityForecast(selectedCity!),
    enabled: selectedCity !== null,
    retry: false,
    refetchInterval: FIFTEEN_MINUTES_MS,
  });

  const { data: topForecasts = [], isLoading: isTopCitiesLoading } = useQuery({
    queryKey: ['forecast', 'top-cities', selectedCity?.city, selectedCity?.country],
    queryFn: () =>
      getTopCitiesForecast(selectedCity!.city, selectedCity!.country),
    enabled: selectedCity !== null,
    retry: false,
    refetchInterval: HOUR_MS,
  });

  const forecast = selectedCityData?.selected_city_current;
  const selectedCityForecast = selectedCityData?.selected_city_forecast ?? [];

  useEffect(() => {
    if (forecast?.sunrise && forecast?.sunset) {
      const now = new Date();
      const sunrise = new Date(forecast.sunrise);
      const sunset = new Date(forecast.sunset);
      const timeOpts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
      const format = (d: Date) => d.toLocaleTimeString([], timeOpts);
      if (now < sunrise) {
        setTwilightTime(`Sunrise at ${format(sunrise)}`);
      } else if (now < sunset) {
        setTwilightTime(`Sunset at ${format(sunset)}`);
      } else {
        const nextSunrise = new Date(sunrise);
        nextSunrise.setDate(nextSunrise.getDate() + 1);
        setTwilightTime(`Sunrise at ${format(nextSunrise)}`);
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
          if (!selectedCity) {
            let cityToSelect: City | undefined;
            try {
              const saved = localStorage.getItem('lastSelectedCity');
              if (saved) {
                const parsed = JSON.parse(saved) as City;
                cityToSelect = result.data.find(
                  (c: City) => c.city === parsed.city && c.country === parsed.country
                );
              }
            } catch {
              console.error('Invalid stored data for last selected city');
            }
            if (cityToSelect) {
              setSelectedCity(cityToSelect);
            }
          }
        }
      })
      .catch((err) => console.error('Failed to load cities CSV:', err));
  }, []);

  const handleCitySelect = (cityWeather: CityWeather) => {
    const found = cityList.find(
      (c) => c.city === cityWeather.city_name && c.country === cityWeather.country
    );
    if (found) {
      postForecast(found);
      setSelectedCity(found);
      setInputValue(`${found.city}, ${found.country}`);
      localStorage.setItem('lastSelectedCity', JSON.stringify(found));
    }
  };


  useEffect(() => {
    if (selectedCity && !inputValue) {
      setInputValue(`${selectedCity.city}, ${selectedCity.country}`);
    }
  }, [selectedCity, inputValue]);

  return (
  <>
  <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, width: '100%', maxWidth: "120rem", maxHeight: '75rem', p: 2, mx: 'auto' }}>
    <Greeting />

    <Grid container columns={16} spacing={2} sx={{ alignItems: 'stretch', flex: 1, minHeight: 0 }}>
      <Grid container size={{ xs: 16, lg: 8 }} columns={8} sx={{
        position: 'relative',
        border: '1px solid #2c2929',
        borderRadius: 1.5,
        p: 2,
        alignItems: 'stretch'}}>
        <BackgroundApplier {...getEffectFromWeather(forecast)} fillContainer />
        <Box sx={{ position: 'relative', display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-around' }}>
          <WeatherHeader
            selectedCity={selectedCity}
            cityList={cityList}
            inputValue={inputValue}
            forecast={forecast}
            isLoading={isSelectedCityLoading}
            isEmpty={!forecast}
            onCityChange={(newValue, displayLabel) => {
              if (newValue && displayLabel) {
                const found = cityList.find((c) => `${c.city}, ${c.country}` === displayLabel);
                if (found) {
                  postForecast(found);
                  setSelectedCity(found);
                  localStorage.setItem('lastSelectedCity', JSON.stringify(found));
                }
                setInputValue(displayLabel);
              } else {
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
                  localStorage.setItem('lastSelectedCity', JSON.stringify(found));
                  e.preventDefault();
                }
              }
            }}/>

          <WeatherDetails forecast={forecast} twilightTime={twilightTime} isLoading={isSelectedCityLoading} isEmpty={!forecast} />
        </Box>
      </Grid>

      <Grid container size={{ xs: 16, lg: 8 }} columns={4} sx={{
        border: '1px solid #2c2929',
        borderRadius: 1.5,
        p: 2,
        justifyContent: "center",
        minHeight: 0}}>
        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column'}}>
          <Stack sx={{ flex: 1, minHeight: 0, flexDirection: 'column', display: 'flex' }} spacing={2}>
            <Grid size={4} sx={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 1 }}>
              <Box sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem', md: '1.9rem', lg: '2rem', xl: '2rem' }, textAlign: 'left' }}>Popular Cities</Box>

              <Box sx={{ flex: 1, minHeight: 100 }}>
                <CityList cityList={topForecasts} onCitySelect={handleCitySelect} isLoading={isTopCitiesLoading} isEmpty={topForecasts.length === 0} />
              </Box>
            </Grid>

            <Grid size={4} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem', md: '1.9rem', lg: '2rem', xl: '2rem' }, textAlign: 'left' }}>5 Day Forecast</Box>

              <Box sx={{ flex: 1, minHeight: 100, display: 'flex' }}>
                <WeatherGraph forecast={selectedCityForecast} isLoading={isSelectedCityLoading} isEmpty={selectedCityForecast.length === 0} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  </Box>
  <BreakpointDebug />
  </>
  );
}

export default App;
