export interface DailyForecastItem {
  day: string;
  temp: number;
  weather_code: number | string;
}

export type FiveDayForecast = DailyForecastItem[];

export interface CityWeather {
  city_name: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  temperature: number;
  apparent_temperature: number;
  temperature_max?: number;
  temperature_min?: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  time: string;
  sunset: string;
  sunrise: string;
  weather_code: number | string;
}

export interface SelectedCityResponse {
  selected_city_current: CityWeather;
  selected_city_forecast: DailyForecastItem[];
}

export interface WeatherResponse {
  selected_city_current: CityWeather;
  selected_city_forecast: DailyForecastItem[];
  top_cities: CityWeather[];
}
