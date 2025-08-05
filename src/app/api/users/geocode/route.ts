
import { NextResponse } from 'next/server';

// Project: Dashboard APP
// Module: API
// Component: geocode.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This module is used to get the country code from the latitude and longitude
// It returns the country code if the latitude and longitude are valid
// It returns an error message if the latitude and longitude are invalid


export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY; // Store in .env.local
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const countryCode = data.features[0]?.properties?.country_code?.toUpperCase();

    if (!countryCode) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    return NextResponse.json({ countryCode });
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
  }
}