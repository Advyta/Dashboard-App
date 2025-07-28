import React, { useEffect } from "react";
import Card from "@/ui/card";
import { Location } from "@/lib/types";
import { useWeather } from "@/lib/hooks/useWeather";

type WeatherProps = {
  location: Location | null;
};

const Weather = ({ location }: WeatherProps) => {
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location, fetchWeather]);

  return (
    <Card
      data={weather ? [weather] : []}
      title="Weather"
      cardTheme="light"
      onRefresh={() => {
        if (location?.lat && location?.lon)
          fetchWeather(location.lat, location.lon);
      }}
      renderItem={(item, index) => (
        <div key={index}>
          {loading ? (
            <span>Loading weather...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{item.name}</span>
                <span className="capitalize">
                  {item.weather[0]?.description}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold">
                  {Math.round(item.main.temp)}°C
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                  alt="icon"
                  width={48}
                  height={48}
                />
              </div>
              <div className="text-xs mt-2">
                Feels like: {Math.round(item.main.feels_like)}°C | Humidity:{" "}
                {item.main.humidity}% | Wind: {item.wind.speed} m/s
              </div>
            </>
          )}
        </div>
      )}
    />
  );
};

export default Weather;
