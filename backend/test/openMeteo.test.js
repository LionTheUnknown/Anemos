import { describe, test, expect, spyOn, beforeEach, afterEach } from 'bun:test';
import { mapToCityWeather, mapToDailyForecastList, fetchSelectedCityWeather, fetchCurrentWeather } from '../src/utils/openMeteo.js';

describe('mapToCityWeather', () => {
  const baseData = {
    latitude: 48.85,
    longitude: 2.35,
    timezone: 'Europe/Paris',
    current: {
      temperature_2m: 18.5,
      apparent_temperature: 17.2,
      wind_speed_10m: 12.3,
      relative_humidity_2m: 65,
      precipitation: 0.5,
      weather_code: 3,
      time: '2026-02-08T14:00',
    },
    daily: {
      sunrise: ['2026-02-08T07:30'],
      sunset: ['2026-02-08T18:00'],
      temperature_2m_max: [20.1],
      temperature_2m_min: [10.3],
    },
  };

  test('maps valid API data to city weather object', () => {
    const result = mapToCityWeather('Paris', 'France', baseData);

    expect(result.city_name).toBe('Paris');
    expect(result.country).toBe('France');
    expect(result.temperature).toBe(18.5);
    expect(result.weather_code).toBe('3');
    expect(result.sunrise).toBe('2026-02-08T07:30');
  });

  test('returns null for missing data', () => {
    expect(mapToCityWeather('Paris', 'France', null)).toBeNull();
    expect(mapToCityWeather('Paris', 'France', undefined)).toBeNull();
    expect(mapToCityWeather('Paris', 'France', { daily: {} })).toBeNull();
  });
});

describe('mapToDailyForecastList', () => {
  const dailyData = {
    daily: {
      time: ['2026-02-08', '2026-02-09', '2026-02-10', '2026-02-11', '2026-02-12', '2026-02-13', '2026-02-14'],
      temperature_2m_max: [20, 21, 19, 22, 18, 17, 23],
      weather_code: [0, 1, 2, 3, 45, 61, 80],
    },
  };

  test('returns 5 forecast items skipping today', () => {
    const result = mapToDailyForecastList(dailyData);
    expect(result).toHaveLength(5);
    expect(result[0].temp).toBe(21);
    expect(result[0].day).toBe('Mon');
  });

  test('returns empty array for invalid input', () => {
    expect(mapToDailyForecastList(null)).toEqual([]);
    expect(mapToDailyForecastList({})).toEqual([]);
  });
});

describe('fetchSelectedCityWeather', () => {
  let fetchSpy;

  beforeEach(() => { fetchSpy = spyOn(globalThis, 'fetch'); });
  afterEach(() => { fetchSpy.mockRestore(); });

  test('calls Open-Meteo with correct params', async () => {
    fetchSpy.mockResolvedValue({ ok: true, json: async () => ({}) });

    await fetchSelectedCityWeather(48.85, 2.35);

    const url = fetchSpy.mock.calls[0][0];
    expect(url).toContain('latitude=48.85');
    expect(url).toContain('longitude=2.35');
    expect(url).toContain('forecast_days=7');
  });

  test('throws on API error', async () => {
    fetchSpy.mockResolvedValue({ ok: false, status: 500 });
    await expect(fetchSelectedCityWeather(48.85, 2.35)).rejects.toThrow('Open-Meteo API error: 500');
  });
});

describe('fetchCurrentWeather', () => {
  let fetchSpy;

  beforeEach(() => { fetchSpy = spyOn(globalThis, 'fetch'); });
  afterEach(() => { fetchSpy.mockRestore(); });

  test('calls Open-Meteo with correct params', async () => {
    fetchSpy.mockResolvedValue({ ok: true, json: async () => ({}) });

    await fetchCurrentWeather(40.71, -74.01);

    const url = fetchSpy.mock.calls[0][0];
    expect(url).toContain('latitude=40.71');
    expect(url).toContain('longitude=-74.01');
  });

  test('throws on API error', async () => {
    fetchSpy.mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchCurrentWeather(40.71, -74.01)).rejects.toThrow('Open-Meteo API error: 404');
  });
});
