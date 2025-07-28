import { useState, useCallback } from "react";
import { CurrentWeatherResponse, Location } from "@/lib/types";

export function useWeather() {
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
}
