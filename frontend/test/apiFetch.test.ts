import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch } from '../src/api/helper/ApiFetch';

describe('apiFetch', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('returns success with data on ok response', async () => {
    const mockData = { city: 'Paris', temperature: 20 };

    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiFetch('/weather/selected?name=Paris');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData);
  });

  test('returns failure on non-ok response', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({ message: 'Something broke' }),
    });

    const result = await apiFetch('/weather/selected?name=Paris');

    expect(result.success).toBe(false);
    expect(result.message).toBe('Something broke');
  });

  test('sends JSON content-type header by default', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await apiFetch('/weather', { method: 'POST', body: { city: 'Paris' } });

    const [, config] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(config.headers['Content-Type']).toBe('application/json');
    expect(config.body).toBe(JSON.stringify({ city: 'Paris' }));
  });

  test('sends credentials include by default', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await apiFetch('/weather');

    const [, config] = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(config.credentials).toBe('include');
  });
});
