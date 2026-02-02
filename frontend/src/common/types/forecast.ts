export interface Forecast {
  id: number;
  temperature: number;
  apparent_temperature: number;
  windSpeed: number;
  humidity: number;
  rain: number;
  time: string;
  sunset: string;
  sunrise: string;
}