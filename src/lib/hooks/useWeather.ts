import { useQuery } from '@tanstack/react-query';
import { CurrentWeatherResponse, ForecastWeatherResponse } from "@/lib/types";
import axios from 'axios';

interface WeatherData {
  current: CurrentWeatherResponse;
  forecast: ForecastWeatherResponse;
  location: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country?: string;
  };
}

interface UseCombinedWeatherReturn {
  weather: CurrentWeatherResponse | null;
  forecast: any[] | null;
  hourlyForecast: any[] | null;
  location: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country?: string;
  } | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeather() {
  const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const { data } = await axios.get<WeatherData>(`/api/users/weather?lat=${lat}&lon=${lon}`);
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to fetch weather data";
      throw new Error(errorMessage);
    }
  };

  const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
    if (!city.trim()) throw new Error('City name is required');
    
    try {
      const { data } = await axios.get<WeatherData>(`/api/users/weather?city=${encodeURIComponent(city)}`);
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to fetch weather data for the specified city";
      throw new Error(errorMessage);
    }
  };

  const useWeatherByCoords = (lat: number | null, lon: number | null, enabled = true) => {
    return useQuery<WeatherData, Error>({
      queryKey: ['weather', 'coords', { lat, lon }],
      queryFn: () => lat && lon ? fetchWeather(lat, lon) : Promise.reject(new Error('Missing coordinates')),
      enabled: Boolean(lat && lon && enabled),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  };

  const useWeatherByCity = (city: string, enabled = true) => {
    return useQuery<WeatherData, Error>({
      queryKey: ['weather', 'city', { city }],
      queryFn: () => fetchWeatherByCity(city),
      enabled: Boolean(city && enabled),
      refetchOnWindowFocus: false,
      retry: 1,
    });
  };

  // Helper function to get daily forecast (one entry per day)
  const getDailyForecast = (forecastData: ForecastWeatherResponse | null) => {
    if (!forecastData?.list) return [];
    
    const dailyForecast: any[] = [];
    const processedDays = new Set<string>();
    
    forecastData.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!processedDays.has(date)) {
        dailyForecast.push(entry);
        processedDays.add(date);
      }
    });
    
    return dailyForecast.slice(0, 5); // Return next 5 days
  };

  // Helper function to get hourly forecast for the next 24 hours
  const getHourlyForecast = (forecastData: ForecastWeatherResponse | null) => {
    if (!forecastData?.list) return [];
    return forecastData.list.slice(0, 4); // Next 12 hours (3-hour intervals)
  };

  // Create a hook that combines weather and forecast data
  const useCombinedWeather = (lat: number | null, lon: number | null, city?: string): UseCombinedWeatherReturn => {
    const { data, isLoading, error, refetch } = city 
      ? useWeatherByCity(city, !!city)
      : useWeatherByCoords(lat, lon, !city);

    return {
      weather: data?.current || null,
      forecast: data?.forecast ? getDailyForecast(data.forecast) : null,
      hourlyForecast: data?.forecast ? getHourlyForecast(data.forecast) : null,
      location: data?.location || null,
      loading: isLoading,
      error: error ? error.message : null,
      refetch,
    };
  };

  return {
    useWeatherByCoords,
    useWeatherByCity,
    useCombinedWeather,
  };
}
