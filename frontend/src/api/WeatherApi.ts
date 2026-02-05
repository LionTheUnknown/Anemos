import type { Forecast } from '../common/types/forecast';
import type { City } from '../common/types/City';
import { apiFetch } from './helper/ApiFetch';

export async function getForecast(city: City): Promise<Forecast[]> {
  const params = new URLSearchParams({
    name: city.city,
    country: city.country,
    lat: String(city.lat),
    lon: String(city.lng),
  });
  const response = await apiFetch<Forecast[]>(`/weather?${params}`);

  if (!response.success || !response.data) {
    throw new Error(`Forecast for ${city.city} not found`);
  }

  return response.data;
}

export async function postForecast(city: City): Promise<Forecast[]> {
  const response = await apiFetch<Forecast[]>(`/weather`, {
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
