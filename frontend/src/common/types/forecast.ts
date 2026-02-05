export interface Forecast {
  city_name: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  temperature: number;
  apparent_temperature: number;
  windSpeed: number;
  humidity: number;
  rain: number;
  time: string;
  sunset: string;
  sunrise: string;
  weather_code: number | string;
}
