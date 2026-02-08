import { describe, test, expect, mock, beforeEach, afterAll } from 'bun:test';
import path from 'path';

const mockWeatherRepo = {
  findByCityAndCountry: mock(() => null),
  create: mock(() => { }),
  updateCountByCityAndCountry: mock(() => { }),
  isTop3Weather: mock(() => false),
  findTop3Weather: mock(() => []),
  findTop4Weather: mock(() => []),
};

const mockOpenMeteo = {
  fetchSelectedCityWeather: mock(() => null),
  fetchCurrentWeather: mock(() => null),
  mapToCityWeather: mock(() => null),
  mapToDailyForecastList: mock(() => []),
};

const repoPath = path.join(import.meta.dir, '../src/repository/weatherRepo.js');
const utilsPath = path.join(import.meta.dir, '../src/utils/openMeteo.js');

mock.module(repoPath, () => mockWeatherRepo);
mock.module(utilsPath, () => mockOpenMeteo);

const { getSelectedCityWeather, getTopCitiesWeather, postWeather } =
  await import(`../src/services/weatherService.js?t=${Date.now()}`);

afterAll(() => { mock.restore(); });

const sampleApiData = { current: { temperature_2m: 20 }, daily: {} };
const sampleCity = { city_name: 'Paris', country: 'France', temperature: 20 };
const sampleForecast = [{ day: 'Mon', temp: 21, weather_code: '1' }];

function resetMocks() {
  Object.values(mockWeatherRepo).forEach((fn) => fn.mockReset());
  Object.values(mockOpenMeteo).forEach((fn) => fn.mockReset());
}

describe('getSelectedCityWeather', () => {
  beforeEach(resetMocks);

  test('returns current weather and forecast', async () => {
    mockOpenMeteo.fetchSelectedCityWeather.mockResolvedValue(sampleApiData);
    mockOpenMeteo.mapToCityWeather.mockReturnValue(sampleCity);
    mockOpenMeteo.mapToDailyForecastList.mockReturnValue(sampleForecast);

    const result = await getSelectedCityWeather('Paris', 'France', 48.85, 2.35);

    expect(result.selected_city_current).toEqual(sampleCity);
    expect(result.selected_city_forecast).toEqual(sampleForecast);
  });

  test('throws when API returns no data', async () => {
    mockOpenMeteo.fetchSelectedCityWeather.mockResolvedValue(null);
    await expect(getSelectedCityWeather('Paris', 'France', 48.85, 2.35)).rejects.toThrow('No weather data');
  });
});

describe('getTopCitiesWeather', () => {
  beforeEach(resetMocks);

  test('fetches top 3 cities', async () => {
    const rows = [
      { city: 'London', country: 'UK', latitude: 51.5, longitude: -0.12 },
      { city: 'Tokyo', country: 'Japan', latitude: 35.68, longitude: 139.69 },
    ];
    mockWeatherRepo.findTop3Weather.mockResolvedValue(rows);
    mockOpenMeteo.fetchCurrentWeather.mockResolvedValue(sampleApiData);
    mockOpenMeteo.mapToCityWeather.mockReturnValue(sampleCity);

    const result = await getTopCitiesWeather();

    expect(result).toHaveLength(2);
  });

  test('returns empty array when no cities in DB', async () => {
    mockWeatherRepo.findTop3Weather.mockResolvedValue([]);
    expect(await getTopCitiesWeather()).toEqual([]);
  });
});

describe('postWeather', () => {
  beforeEach(resetMocks);

  test('creates new entry when city does not exist', async () => {
    mockWeatherRepo.findByCityAndCountry.mockResolvedValue(null);
    mockOpenMeteo.fetchSelectedCityWeather.mockResolvedValue(sampleApiData);
    mockOpenMeteo.mapToCityWeather.mockReturnValue(sampleCity);
    mockOpenMeteo.mapToDailyForecastList.mockReturnValue(sampleForecast);
    mockWeatherRepo.findTop3Weather.mockResolvedValue([]);

    await postWeather('Paris', 'France', 48.85, 2.35);

    expect(mockWeatherRepo.create).toHaveBeenCalled();
    expect(mockWeatherRepo.updateCountByCityAndCountry).not.toHaveBeenCalled();
  });

  test('updates count when city already exists', async () => {
    mockWeatherRepo.findByCityAndCountry.mockResolvedValue({ id: 1 });
    mockOpenMeteo.fetchSelectedCityWeather.mockResolvedValue(sampleApiData);
    mockOpenMeteo.mapToCityWeather.mockReturnValue(sampleCity);
    mockOpenMeteo.mapToDailyForecastList.mockReturnValue(sampleForecast);
    mockWeatherRepo.findTop3Weather.mockResolvedValue([]);

    await postWeather('Paris', 'France', 48.85, 2.35);

    expect(mockWeatherRepo.updateCountByCityAndCountry).toHaveBeenCalled();
    expect(mockWeatherRepo.create).not.toHaveBeenCalled();
  });
});
