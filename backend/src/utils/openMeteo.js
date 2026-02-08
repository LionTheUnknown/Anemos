const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDay(dateStr) {
  if (!dateStr || dateStr.length < 10) return dateStr || '';
  try {
    const date = new Date(dateStr.substring(0, 10));
    return DAYS[date.getDay()];
  } catch {
    return dateStr.substring(0, 10);
  }
}

const CURRENT_FULL = 'wind_speed_10m,relative_humidity_2m,precipitation,temperature_2m,apparent_temperature,weather_code';
const DAILY_FULL = 'sunset,sunrise,temperature_2m_max,temperature_2m_min,weather_code';
const DAILY_CURRENT = 'sunset,sunrise,temperature_2m_max,temperature_2m_min';

export async function fetchSelectedCityWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: 'auto',
    forecast_days: '7',
    daily: DAILY_FULL,
    current: CURRENT_FULL,
  });
  const res = await fetch(`${OPEN_METEO_BASE}?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo API error: ${res.status}`);
  return res.json();
}

export async function fetchCurrentWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone: 'auto',
    daily: DAILY_CURRENT,
    current: CURRENT_FULL,
  });
  const res = await fetch(`${OPEN_METEO_BASE}?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo API error: ${res.status}`);
  return res.json();
}

export function mapToCityWeather(city, country, data) {
  if (!data?.current) return null;

  const { current, daily } = data;
  const sunrise = daily?.sunrise?.[0] ?? null;
  const sunset = daily?.sunset?.[0] ?? null;
  const tempMax = daily?.['temperature_2m_max']?.[0] ?? null;
  const tempMin = daily?.['temperature_2m_min']?.[0] ?? null;

  return {
    city_name: city,
    country,
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    temperature: current.temperature_2m,
    apparent_temperature: current.apparent_temperature,
    temperature_max: tempMax,
    temperature_min: tempMin,
    windSpeed: current.wind_speed_10m,
    humidity: current.relative_humidity_2m,
    precipitation: current.precipitation ?? 0,
    time: current.time,
    sunset,
    sunrise,
    weather_code: String(current.weather_code ?? 0),
  };
}

export function mapToDailyForecastList(data, count = 5) {
  const result = [];
  if (!data?.daily) return result;

  const { time, temperature_2m_max: temps, weather_code: codes } = data.daily;
  if (!time || !temps || !codes) return result;

  const n = Math.min(count, time.length - 1, temps.length - 1, codes.length - 1);
  for (let i = 1; i <= n; i++) {
    result.push({
      day: formatDay(time[i]),
      temp: temps[i],
      weather_code: String(codes[i] ?? 0),
    });
  }
  return result;
}
