import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
});

const API_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.hostname}:5001`
  : 'http://localhost:5001';

export async function apiRequest(
  url: string,
  options: RequestInit = {},
) {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    // Return demo data as fallback
    if (url === '/api/events') {
      return [];
    }
    throw error;
  }
}
