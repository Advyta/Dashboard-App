// app/api/news/route.js
import axios from "axios";
import { NextResponse } from "next/server";

// Project: Dashboard App
// Module: News
// Component: News
// Author: Advyta
// Date: 24/07/2025
// Logic:
// 1. Fetch news data from the server based on the country code
// 2. Display news data
// 3. Handle news data


export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  let country = searchParams.get("country");

  if (!country) {
    country = "us"; // Default country is US
    // return NextResponse.json({ error: 'Missing country code' }, { status: 400 });
  }
  console.log(country);
  const apiKey = process.env.NEWSDATA_API_KEY; // Store in .env.local
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&size=5&country=${country.toLowerCase()}`;

  try {
    // console.log(url);
    const response = await axios(url);
    const data = await response.data;

    if (data.status !== "success") {
      console.error("NewsData API error:", data);
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.results);
  } catch (error) {
    console.error("News fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
