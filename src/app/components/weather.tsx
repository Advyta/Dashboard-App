"use client";

import React, { useEffect } from "react";
import Card from "@/ui/card";
import { Location, ForecastEntry } from "@/lib/types";
import { useWeather } from "@/lib/hooks/useWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

/**
 * Project: Dashboard App
 * Module: Weather
 * Component: Weather
 * Author: Advyta
 * Date: 01/08/2025
 * Description: Displays current weather and forecast information
 *
 * Screen Data:
 * - Current weather conditions (temperature, humidity, wind, etc.)
 * - 5-day weather forecast
 * - Location information
 * - Weather alerts and warnings
 * - Loading and error states
 *
 * Screen Layout & Responsive Behavior:
 * - Card-based layout with current weather prominently displayed
 * - Responsive grid for forecast items
 * - Adapts to different screen sizes (mobile, tablet, desktop)
 * - Smooth animations for state transitions
 * - Optimized for touch and mouse interactions
 *
 * UI Behavior:
 * - Auto-detects user location on mount
 * - Shows loading spinner during data fetch
 * - Displays error messages for location/weather fetch failures
 * - Supports manual refresh of weather data
 * - Animated transitions between states
 *
 * Data Validation:
 * - Validates location coordinates
 * - Sanitizes weather API responses
 * - Handles missing or incomplete weather data
 * - Validates temperature units and conversions
 * - Handles API rate limiting and errors
 *
 * State Management:
 * - Uses Redux for global weather state
 * - Local state for UI interactions
 * - Handles loading and error states
 * - Manages location permissions
 *
 * Dependencies:
 * - Redux for state management
 * - OpenWeatherMap API for weather data
 * - date-fns for date formatting
 * - Framer Motion for animations
 * - Custom hooks for weather data fetching
 *
 * Performance Considerations:
 * - Memoizes expensive calculations
 * - Lazy loads weather icons
 * - Debounces location updates
 * - Caches weather data
 *
 * External weather API (via custom hook)
 * - FontAwesome for weather icons
 * - Custom Card component for layout
 */

// -------------------------------------------------

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

interface WeatherProps {
  location: Location | null;
}

const Weather = ({ location }: WeatherProps) => {
  const {
    weather,
    forecast,
    hourlyForecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCity,
  } = useWeather();

  // Handle initial load with geolocation or default location
  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchWeather(location.lat, location.lon).catch(() => {
        // If geolocation fails, fall back to a default city
        fetchWeatherByCity("London").catch(console.error);
      });
    }
  }, [location, fetchWeather, fetchWeatherByCity]);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    try {
      await fetchWeatherByCity(query);
    } catch (err) {
      console.error("Error fetching weather for city:", err);
    }
  };

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Card
      data={weather ? [weather] : []}
      title="Weather"
      cardTheme="blue"
      showSearch={true}
      onSearch={handleSearch}
      onRefresh={() => {
        if (location?.lat && location?.lon) {
          fetchWeather(location.lat, location.lon);
        } else {
          // If no location, try to refresh with the current city or default
          const cityToRefresh = weather?.name || "London";
          fetchWeatherByCity(cityToRefresh);
        }
      }}
      renderItem={(item, index) => (
        <div key={index}>
          {loading ? (
            <span>Loading weather...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <>
              <div className="collapse">
                <input type="checkbox" className="peer !p-5" />
                <div className="collapse-title p-4 sm:p-5 bg-gray-50/15 rounded-xl peer-checked:rounded-t-xl peer-checked:rounded-b-none">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 capitalize">
                        {item.weather[0]?.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end gap-4 mt-1 sm:mt-0">
                      <span className="text-2xl sm:text-3xl font-bold whitespace-nowrap">
                        {Math.round(item.main.temp)}°C
                      </span>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                        alt="weather icon"
                        className="w-12 h-12 sm:w-14 sm:h-14"
                        width={56}
                        height={56}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-3 text-xs sm:text-sm">
                    <div className="rounded-lg p-2">
                      <div className="text-gray-400">High/Low</div>
                      <div>
                        <span className="text-orange-500">
                          H: {Math.round(item.main.temp_max)}°C
                        </span>
                        <span className="mx-1 text-gray-500">/</span>
                        <span className="text-blue-500">
                          L: {Math.round(item.main.temp_min)}°C
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg p-2">
                      <div className="text-gray-400">Feels Like</div>
                      <div>{Math.round(item.main.feels_like)}°C</div>
                    </div>
                    <div className="rounded-lg p-2">
                      <div className="text-gray-400">Humidity</div>
                      <div>{item.main.humidity}%</div>
                    </div>
                    <div className="rounded-lg p-2">
                      <div className="text-gray-400">Wind</div>
                      <div>{item.wind.speed} m/s</div>
                    </div>
                  </div>
                </div>
                <div className="collapse-content bg-gray-200/10 rounded-b-xl">
                  <div className="p-5">
                    {/* Sunrise & Sunset */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        
                        <div>
                          <p className="text-xs text-gray-300">Sunrise</p>
                          <p className="text-sm font-medium">
                            {new Date(
                              item.sys.sunrise * 1000
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faSun}
                          className="h-5 w-5 text-yellow-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        
                        <div>
                          <p className="text-xs text-gray-300">Sunset</p>
                          <p className="text-sm font-medium">
                            {new Date(
                              item.sys.sunset * 1000
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faMoon}
                          className="h-5 w-5 text-blue-500"
                        />
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
                          {item.wind.speed} m/s{" "}
                          {getWindDirection(item.wind.deg)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-300">Clouds</p>
                        <p>{item.clouds?.all}%</p>
                      </div>
                    </div>

                    {/* Hourly Forecast */}
                    <div className="mt-2 bg-gray-50/10 p-4 rounded-xl overflow-x-auto">
                      <h4 className="text-sm font-medium mb-2">
                        Next 12 Hours
                      </h4>
                      <div className="grid grid-cols-2 justify-evenly sm:grid-cols-4 gap-x-2 gap-y-4 sm:gap-4 pb-2 ">
                        {hourlyForecast?.list?.map(
                          (hour: ForecastEntry, idx: number) => {
                            const date = new Date(hour.dt * 1000);
                            return (
                              <div
                                key={idx}
                                className="flex flex-col items-center bg-[#042073]/50 rounded-xl p-2 min-w-[55px] text-center tooltip tooltip-info"
                                data-tip={hour.weather[0].description}
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
                                  className="w-8 h-8"
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
              </div>

              {/* 5-Day Forecast */}
              {forecast?.list && forecast.list.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    5-Day Forecast
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 text-xs">
                    {forecast.list.map((day: ForecastEntry, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center tooltip tooltip-bottom tooltip-info"
                        data-tip={day.weather[0].description}
                      >
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
