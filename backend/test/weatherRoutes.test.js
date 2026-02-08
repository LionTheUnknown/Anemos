import { describe, test, expect, mock, beforeEach, beforeAll, afterAll } from 'bun:test';
import express from 'express';

const mockWeatherService = {
  getSelectedCityWeather: mock(() => ({})),
  getTopCitiesWeather: mock(() => []),
  getWeather: mock(() => ({})),
  postWeather: mock(() => ({})),
};

mock.module('../src/services/weatherService.js', () => mockWeatherService);

const { default: weatherRouter } = await import('../src/routes/weather.js');

let server;
let baseUrl;

beforeAll(() => {
  const app = express();
  app.use(express.json());
  app.use('/api/weather', weatherRouter);
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

afterAll(() => {
  server?.close();
  mock.restore();
});

function resetMocks() {
  Object.values(mockWeatherService).forEach((fn) => fn.mockReset());
}

describe('GET /api/weather/selected', () => {
  beforeEach(resetMocks);

  test('returns 200 for valid params', async () => {
    mockWeatherService.getSelectedCityWeather.mockResolvedValue({ city: 'Paris' });
    const res = await fetch(`${baseUrl}/api/weather/selected?name=Paris&country=France&lat=48.85&lon=2.35`);
    expect(res.status).toBe(200);
  });

  test('returns 400 when params are missing', async () => {
    const res = await fetch(`${baseUrl}/api/weather/selected?name=Paris`);
    expect(res.status).toBe(400);
  });
});

describe('GET /api/weather/top-cities', () => {
  beforeEach(resetMocks);

  test('returns 200 with top cities', async () => {
    mockWeatherService.getTopCitiesWeather.mockResolvedValue([]);
    const res = await fetch(`${baseUrl}/api/weather/top-cities`);
    expect(res.status).toBe(200);
  });
});

describe('GET /api/weather', () => {
  beforeEach(resetMocks);

  test('returns 200 for valid params', async () => {
    mockWeatherService.getWeather.mockResolvedValue({});
    const res = await fetch(`${baseUrl}/api/weather?name=Paris&country=France&lat=48.85&lon=2.35`);
    expect(res.status).toBe(200);
  });

  test('returns 400 when params are missing', async () => {
    const res = await fetch(`${baseUrl}/api/weather`);
    expect(res.status).toBe(400);
  });
});

describe('POST /api/weather', () => {
  beforeEach(resetMocks);

  test('returns 200 for valid body', async () => {
    mockWeatherService.postWeather.mockResolvedValue({});
    const res = await fetch(`${baseUrl}/api/weather`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Paris', country: 'France', latitude: 48.85, longitude: 2.35 }),
    });
    expect(res.status).toBe(200);
  });

  test('returns 400 when body is incomplete', async () => {
    const res = await fetch(`${baseUrl}/api/weather`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });
});
