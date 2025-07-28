// components/GetLocation.jsx
'use client';

import { useState, useEffect } from 'react';
import {Location} from '@/lib/types';



type GeoLocationProps = {
  onLocationFetched: (location: Location) => void;
};

export default function GeoLocation({ onLocationFetched }: GeoLocationProps) {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [error, setError] = useState<string | null>(null);

  // Only run once on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          onLocationFetched({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError(err.message);
          console.error('Geolocation error:', err);
        }
      );
      console.log(location);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {/* {location.lat && location.lon ? (
        <p>
          Location: Lat {location.lat}, Lon {location.lon}
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Requesting location...</p>
      )} */}
    </div>
  );
}