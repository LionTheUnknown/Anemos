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
  61: { icon: 'rain', label: 'Rain', group: 'rain' },
  63: { icon: 'rain', label: 'Rain', group: 'rain' },
  65: { icon: 'rain', label: 'Rain', group: 'rain' },
  66: { icon: 'sleet', label: 'Sleet', group: 'sleet' },
  67: { icon: 'sleet', label: 'Sleet', group: 'sleet' },
  71: { icon: 'snow', label: 'Snow', group: 'snow' },
  73: { icon: 'snow', label: 'Snow', group: 'snow' },
  75: { icon: 'snow', label: 'Snow', group: 'snow' },
  77: { icon: 'snow', label: 'Snow', group: 'snow' },
  80: { icon: 'rain', label: 'Rain', group: 'rain' },
  81: { icon: 'rain', label: 'Rain', group: 'rain' },
  82: { icon: 'rain', label: 'Rain', group: 'rain' },
  85: { icon: 'snow', label: 'Snow', group: 'snow' },
  86: { icon: 'snow', label: 'Snow', group: 'snow' },
  95: { icon: 'rain_thunder', label: 'Rain thunder', group: 'rain' },
  96: { icon: 'snow_thunder', label: 'Snow thunder', group: 'snow' },
  99: { icon: 'snow_thunder', label: 'Snow thunder', group: 'snow' },
};