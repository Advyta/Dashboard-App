import axios from "axios";
import { NextResponse } from "next/server";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenWeather API key" },
      { status: 500 }
    );
  }

  try {
    // Fetch both current weather and forecast in parallel
    const [currentRes, forecastRes] = await Promise.all([
      axios(
        `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      ),
      axios(
        `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      ),
    ]);

    if (!currentRes.data || !forecastRes.data) {
      const error = !currentRes.data ? currentRes.data : forecastRes.data;
      console.error("OpenWeather API error:", error);
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: currentRes.status || forecastRes.status || 500 }
      );
    }

    const [current, forecast] = await Promise.all([
      currentRes.data,
      forecastRes.data,
    ]);

    return NextResponse.json({
      current,
      forecast,
      location: {
        name: current.name,
        coord: current.coord,
        country: current.sys?.country,
      },
    });
  } catch (error) {
    console.error("Weather fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
