import { APIResponse } from './ApiResponse';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api';

export async function apiFetch<T = any>(
  url: string,
  options: Omit<RequestInit, 'body'> & { body?: any; auth?: boolean } = {}
): Promise<APIResponse<T>> {
  const { auth = true, body, ...restOptions } = options;

  const isFormData = body instanceof FormData;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      ...(restOptions.headers || {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
    credentials: auth ? 'include' : 'omit',
  };

  const res = await fetch(baseUrl + url, config);

  if (res.ok) {
    const data = await res.json().catch(() => null);

    if (data && typeof data.success === 'boolean') {
      return APIResponse.success<T>(data.data, data.message);
    }

    return APIResponse.success<T>(data);
  }

  const rawError = await res.json().catch(() => null);
  if (rawError) {
    console.error(`API Error (${res.status} ${url}):`, rawError);
  }
  const message =
    rawError?.message || res.statusText || 'An unexpected error occurred';

  return APIResponse.failure<T>(message, rawError);
}
