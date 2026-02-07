import type {
  WeatherResponse,
  SelectedCityResponse,
  CityWeather,
} from '../common/types/forecast';
import type { City } from '../common/types/City';
import { apiFetch } from './helper/ApiFetch';

export async function getSelectedCityForecast(
  city: City
): Promise<SelectedCityResponse> {
  const params = new URLSearchParams({
    name: city.city,
    country: city.country,
    lat: String(city.lat),
    lon: String(city.lng),
  });
  const response = await apiFetch<SelectedCityResponse>(
    `/weather/selected?${params}`
  );

  if (!response.success || !response.data) {
    throw new Error(`Forecast for ${city.city} not found`);
  }
  return response.data;
}

export async function getTopCitiesForecast(
  excludeCity: string,
  excludeCountry: string
): Promise<CityWeather[]> {
  const params = new URLSearchParams({
    excludeCity,
    excludeCountry,
  });
  const response = await apiFetch<CityWeather[]>(
    `/weather/top-cities?${params}`
  );

  if (!response.success || !response.data) {
    throw new Error('Top cities forecast not found');
  }

  return response.data;
}

export async function getForecast(city: City): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    name: city.city,
    country: city.country,
    lat: String(city.lat),
    lon: String(city.lng),
  });
  const response = await apiFetch<WeatherResponse>(`/weather?${params}`);

  if (!response.success || !response.data) {
    throw new Error(`Forecast for ${city.city} not found`);
  }
  return response.data;
}

export async function postForecast(city: City): Promise<WeatherResponse> {
  const response = await apiFetch<WeatherResponse>(`/weather`, {
    method: 'POST',
    body: {
      city: city.city,
      country: city.country,
      latitude: Number(city.lat),
      longitude: Number(city.lng),
    },
  });

  if (!response.success || !response.data) {
    throw new Error(`Failed to get forecast for ${city.city}`);
  }
  return response.data;
}
