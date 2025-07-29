import { useState, useCallback } from "react";
import { CurrentWeatherResponse, ForecastWeatherResponse } from "@/lib/types";

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

interface UseWeatherReturn {
  weather: CurrentWeatherResponse | null;
  forecast: ForecastWeatherResponse | null;
  hourlyForecast: ForecastWeatherResponse | null;
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
  fetchWeather: (lat: number, lon: number) => Promise<void>;
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(null);
  const [location, setLocation] = useState<{
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch weather data");
      }
      
      const data = await res.json();
      setWeather(data.current);
      setForecast(data.forecast);
      setLocation(data.location);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
      setForecast(null);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to get daily forecast (one entry per day)
  const getDailyForecast = useCallback(() => {
    if (!forecast?.list) return null;
    
    // Return the original forecast object but with filtered list
    return {
      ...forecast,
      list: forecast.list
        .filter((_, index: number) => index % 8 === 0) // Get one forecast per day (every 24 hours / 3 hours per forecast = 8 entries)
        .slice(0, 5) // Get next 5 days
    };
  }, [forecast]);

  // Get hourly forecast (3-hour intervals)
  const getHourlyForecast = useCallback(() => {
    if (!forecast?.list) return null;
    
    // Return the first 4 entries (next 12 hours)
    return {
      ...forecast,
      list: forecast.list.slice(0, 4)
    };
  }, [forecast]);

  const dailyForecast = forecast ? getDailyForecast() : null;
  const hourlyForecast = forecast ? getHourlyForecast() : null;
  
  return { 
    weather, 
    forecast: dailyForecast, // Keep this for backward compatibility
    hourlyForecast, // New field for hourly data
    location,
    loading, 
    error, 
    fetchWeather 
  };
}
