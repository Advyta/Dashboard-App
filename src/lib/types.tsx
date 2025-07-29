//Project: Dashboard APP
// Module: Typescript Library
// Component: types.tsx
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This component is used to define the types

export type FormField = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  error?: string;
  placeholder?: string;
};

export type FormData = {
  [key: string]: string;
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";


export interface UserData {
  _id: string;
  username: string;
  email: string;
  github?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  theme?: "light" | "dark";
  isVerified?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Location = {
  lat: number | null;
  lon: number | null;
};

export type newsArticle = {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  description: string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: string;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  sentiment: string;
  sentiment_stats: string;
  ai_tag: string;
  ai_region: string;
  ai_org: string;
  ai_summary: string;
  ai_content: string;
  duplicate: boolean;
};


// -------------------------------------------------
// 🌍 Coordinates
type Coordinates = {
  lat: number;
  lon: number;
};

// 🌦️ Weather Conditions
type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// 📊 Temperature and Pressure Data
type TemperatureDetails = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number; // only in forecast
};

// 💨 Wind Info
type WindDetails = {
  speed: number;
  deg: number;
  gust?: number;
};

// ☁️ Cloud Coverage
type CloudDetails = {
  all: number;
};

// 🌄 Sun Info
type SunDetails = {
  sunrise: number;
  sunset: number;
};

// 📌 Location Metadata
type CityInfo = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type CurrentWeatherResponse = {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: TemperatureDetails;
  visibility: number;
  wind: WindDetails;
  clouds: CloudDetails;
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type ForecastEntry = {
  dt: number; // Time of data forecasted, unix, UTC
  main: TemperatureDetails;
  weather: WeatherCondition[];
  clouds: CloudDetails;
  wind: WindDetails;
  visibility: number; // Average visibility, metres. The maximum value of the visibility is 10km
  pop: number; // probability of precipitation
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: {
    pod: string; // part of day (d = day, n = night)
  };
  dt_txt: string; // Time of data forecasted, ISO, UTC
};

// 5 day / 3 hour forecast data
export interface ForecastWeatherResponse {
  cod: string;
  message: number;
  cnt: number; // A number of timestamps returned in the API response
  list: ForecastEntry[];
  city: CityInfo;
};
