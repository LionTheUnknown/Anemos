import type { Forecast } from '../common/types/forecast';
import { apiFetch } from './helper/ApiFetch';


export async function getForecast(cityName: string): Promise<Forecast> {
  const response = await apiFetch<Forecast>(`/weather/${cityName}`);

  if (!response.success || !response.data) {
    throw new Error(`Forecast for ${cityName} not found`);
  }

  return response.data!;
}
