import './App.css';
import {useState, useEffect} from 'react';
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
import WeatherHeader from './components/WeatherHeader';
import WeatherDetails from './components/WeatherDetails';
import CityList from './components/CityList';
import { Item } from './components/Item';
import WeatherGraph from './components/WeatherGraph';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityList, setCityList] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  let localTime = new Date().toLocaleTimeString();
  const [twilightTime, setTwilightTime] = useState<string | null>(null);

  const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
  const HOUR_MS = 60 * 60 * 1000;

  const { data: selectedCityData } = useQuery({
    queryKey: ['forecast', 'selected', selectedCity?.city, selectedCity?.country],
    queryFn: () => getSelectedCityForecast(selectedCity!),
    enabled: selectedCity !== null,
    retry: false,
    refetchInterval: FIFTEEN_MINUTES_MS,
  });

  const { data: topForecasts = [] } = useQuery({
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

  const handleCitySelect = (cityWeather: CityWeather) => {
    const found = cityList.find(
      (c) => c.city === cityWeather.city_name && c.country === cityWeather.country
    );
    if (found) {
      postForecast(found);
      setSelectedCity(found);
      setInputValue(`${found.city}, ${found.country}`);
    }
  };


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
              p: 2}}>
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

            <Grid container size={8} columns={4} sx={{
            border: '1px solid #2c2929',
            borderRadius: 1.5,
            justifyContent: "center",
            alignSelf: 'stretch'}}>
            <Grid size={4}>
              <Stack sx={{ height: '100%' }}>
                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div className="text-left text-xl">Other Countries</div>

                  <CityList cityList={topForecasts} onCitySelect={handleCitySelect}/>
                </Item>

                <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <div className="text-left text-xl">5 Day Forecast</div>
                  <WeatherGraph forecast={selectedCityForecast} />
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
