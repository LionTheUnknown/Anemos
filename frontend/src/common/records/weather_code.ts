export type WeatherInfo = {
  icon: string;
  label: string;      
  group: string;      
};

export const WEATHER_CODE_MAP: Record<number, WeatherInfo> = {
  0: { icon: 'day_clear', label: 'Clear sky', group: 'clear' },
  1: { icon: 'day_partial_cloud', label: 'Mainly clear', group: 'clouds' },
  2: { icon: 'day_partial_cloud', label: 'Partly cloudy', group: 'clouds' },
  3: { icon: 'overcast', label: 'Overcast', group: 'clouds' },
  45: { icon: 'fog', label: 'Fog', group: 'fog' },
  48: { icon: 'fog', label: 'Depositing rime fog', group: 'fog' },
  51: { icon: 'drizzle', label: 'Light drizzle', group: 'drizzle' },
  53: { icon: 'drizzle', label: 'Drizzle', group: 'drizzle' },
  55: { icon: 'drizzle', label: 'Dense drizzle', group: 'drizzle' },
  56: { icon: 'sleet', label: 'Freezing drizzle', group: 'drizzle' },
  57: { icon: 'sleet', label: 'Dense freezing drizzle', group: 'drizzle' },
  61: { icon: 'rain', label: 'Slight rain', group: 'rain' },
  63: { icon: 'rain', label: 'Moderate rain', group: 'rain' },
  65: { icon: 'rain', label: 'Heavy rain', group: 'rain' },
  66: { icon: 'sleet', label: 'Freezing rain', group: 'sleet' },
  67: { icon: 'sleet', label: 'Heavy freezing rain', group: 'sleet' },
  71: { icon: 'snow', label: 'Slight snow', group: 'snow' },
  73: { icon: 'snow', label: 'Moderate snow', group: 'snow' },
  75: { icon: 'snow', label: 'Heavy snow', group: 'snow' },
  77: { icon: 'snow', label: 'Snow grains', group: 'snow' },
  80: { icon: 'rain', label: 'Slight rain showers', group: 'rain' },
  81: { icon: 'rain', label: 'Moderate rain showers', group: 'rain' },
  82: { icon: 'rain', label: 'Violent rain showers', group: 'rain' },
  85: { icon: 'snow', label: 'Slight snow showers', group: 'snow' },
  86: { icon: 'snow', label: 'Heavy snow showers', group: 'snow' },
  95: { icon: 'rain_thunder', label: 'Thunderstorm', group: 'rain' },
  96: { icon: 'snow_thunder', label: 'Thunderstorm with slight hail', group: 'snow' },
  99: { icon: 'snow_thunder', label: 'Thunderstorm with heavy hail', group: 'snow' },
};