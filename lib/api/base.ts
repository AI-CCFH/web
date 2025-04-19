/**
 * API Base Module
 * 
 * This module provides base functionality for API services.
 * It simulates API calls with mock data, but can easily be replaced
 * with real API calls when a backend is available.
 */

// Simulate network delay for more realistic API behavior
export const simulateDelay = async <T>(data: T): Promise<T> => {
  // Random delay between 200ms and 800ms to simulate network latency
  const delay = Math.floor(Math.random() * 600) + 200;
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Simulate API response structure
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Wrap data in standard API response format
export const wrapResponse = <T>(data: T): ApiResponse<T> => {
  return {
    data,
    success: true,
    timestamp: new Date().toISOString()
  };
};

// Simulate API error
export const createError = (message: string): ApiResponse<null> => {
  return {
    data: null,
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
};

// Generic fetch function to simulate API calls
export const fetchData = async <T>(data: T): Promise<ApiResponse<T | null>> => {
  // Simulate potential API errors (5% chance)
  if (Math.random() < 0.05) {
    return simulateDelay(createError("API Error: Could not fetch data"));
  }
  
  return simulateDelay(wrapResponse(data));
};
