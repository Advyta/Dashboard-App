import React, { useEffect } from "react";
import Card from "@/ui/card";
import {
  Location,
  ForecastWeatherResponse,
  ForecastEntry,
  CurrentWeatherResponse,
} from "@/lib/types";
import { useWeather } from "@/lib/hooks/useWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// Helper function to convert wind degrees to direction
const getWindDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Project: Dashboard App
// Module: Weather
// Component: Weather
// Author: Advyta
// Date: 28/07/2025
// Logic:
// 1. Fetch weather data from the server based on the location
// 2. Display weather data
// 3. Handle weather data

// -------------------------------------------------
interface WeatherProps {
  location: Location | null;
}

const Weather = ({ location }: WeatherProps) => {
  const { weather, forecast, hourlyForecast, loading, error, fetchWeather } =
    useWeather();

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location, fetchWeather]);

  return (
    <Card
      data={weather ? [weather] : []}
      title="Weather"
      cardTheme="blue"
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
              <div className="collapse ">
                <input type="checkbox" className="peer" />
                <div className="collapse-title p-5 bg-gray-200/10 rounded-xl peer-checked:rounded-t-xl peer-checked:rounded-b-none">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{item.name}</span>
                    <span className="capitalize">
                      {item.weather[0]?.description}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
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
                    <div className="flex gap-2 text-xs text-gray-300 mt-1">
                      <span>H: {Math.round(item.main.temp_max)}°C</span>
                      <span>L: {Math.round(item.main.temp_min)}°C</span>
                    </div>
                  </div>
                  <div className="text-xs mt-2">
                    Feels like: {Math.round(item.main.feels_like)}°C | Humidity:{" "}
                    {item.main.humidity}% | Wind: {item.wind.speed} m/s
                  </div>
                </div>
                <div className="collapse-content p-5 bg-gray-200/10 ">
                  {/* Sunrise & Sunset */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">

                      <FontAwesomeIcon icon={faSun} className="h-5 w-5 text-yellow-500"/>
                      <div>
                        <p className="text-xs text-gray-300">Sunrise</p>
                        <p className="text-sm font-medium">
                          {new Date(item.sys.sunrise * 1000).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMoon} className="h-5 w-5 text-blue-500"/>
                      <div>
                        <p className="text-xs text-gray-300">Sunset</p>
                        <p className="text-sm font-medium">
                          {new Date(item.sys.sunset * 1000).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-300">Feels Like</p>
                      <p>{Math.round(item.main.feels_like)}°C</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Humidity</p>
                      <p>{item.main.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Pressure</p>
                      <p>{item.main.pressure} hPa</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Visibility</p>
                      <p>{(item.visibility / 1000).toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Wind</p>
                      <p>
                        {item.wind.speed} m/s {getWindDirection(item.wind.deg)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Clouds</p>
                      <p>{item.clouds?.all}%</p>
                    </div>
                  </div>

                  {/* Hourly Forecast */}
                  <div className="mt-6 bg-yellow-300/40 p-4 rounded-xl">
                    <h4 className="text-sm font-medium mb-2">Next 12 Hours</h4>
                    <div className="flex overflow-x-auto pb-2 gap-4">
                      {hourlyForecast?.list?.map(
                        (hour: ForecastEntry, idx: number) => {
                          const date = new Date(hour.dt * 1000);
                          return (
                            <div
                              key={idx}
                              className="flex flex-col items-center min-w-[60px] text-center"
                            >
                              <span className="text-xs font-medium">
                                {date.toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                              <img
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                alt={hour.weather[0].description}
                                className="w-8 h-8 my-1"
                              />
                              <span className="text-sm font-medium">
                                {Math.round(hour.main.temp)}°C
                              </span>
                              <span className="text-xs text-gray-300">
                                {Math.round(hour.pop * 100)}%{" "}
                                <span className="text-[10px]">rain</span>
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              {forecast?.list && forecast.list.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    5-Day Forecast
                  </h4>
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    {forecast.list.map((day: ForecastEntry, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        <span className="font-medium">
                          {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt={day.weather[0].description}
                          className="w-9 h-9"
                        />
                        <div className="flex gap-1">
                          <span className="font-medium">
                            {Math.round(day.main.temp_max)}°C -{" "}
                            {Math.round(day.main.temp_min)}°C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    />
  );
};

export default Weather;
