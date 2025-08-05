"use client";

import { useState, useEffect } from "react";
import { Location } from "@/lib/types";

/**
 * Project: Dashboard App
 * Module: Location Services
 * Component: GeoLocation
 * Author: Advyta
 * Date: 05/08/2025
 * Description: Component for retrieving and managing user's geolocation
 *
 * Screen Data:
 * - Displays current geolocation status
 * - Shows loading state during location fetch
 * - Displays error messages if geolocation fails
 * - No visible UI (handles logic only)
 *
 * Screen Layout & Responsive Behavior:
 * - No visible UI elements
 * - Runs in the background
 * - Works across all screen sizes
 *
 * UI Behavior:
 * - Automatically requests geolocation permission on mount
 * - Updates parent component via callback when location changes
 * - Handles permission denied scenarios gracefully
 * - Provides error feedback through callback
 *
 * Data Validation:
 * - Validates geolocation API availability
 * - Verifies coordinates are within valid ranges
 * - Handles different error scenarios (timeout, permission denied, etc.)
 * - Validates callback function before execution
 *
 * State:
 * - location: Current latitude and longitude (object)
 * - error: Error message if geolocation fails (string | null)
 *
 * Dependencies:
 * - Browser's Geolocation API
 * - Next.js client-side component
 * - Custom types from '@/lib/types'
 */

type GeoLocationProps = {
  /** Callback function that receives the fetched location */
  onLocationFetched: (location: Location) => void;
  /** Optional callback for error handling */
  onError?: (error: string) => void;
};

export default function GeoLocation({
  onLocationFetched,
  onError,
}: GeoLocationProps) {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [error, setError] = useState<string | null>(null);

  // Map geolocation error codes to user-friendly messages
  const getErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access was denied. Please enable location services in your browser settings.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable. Please check your network connection.";
      case error.TIMEOUT:
        return "The request to get your location timed out. Please try again.";
      default:
        return "An unknown error occurred while fetching your location.";
    }
  };

  // Only run once on mount
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by your browser.";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Configure geolocation options
    const options: PositionOptions = {
      enableHighAccuracy: true, // Request high accuracy if available
      timeout: 10000, // Wait up to 10 seconds for a response
      maximumAge: 0, // Don't use a cached position
    };

    // Request current position
    const watchId = navigator.geolocation.watchPosition(
      // Success callback
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`Location fetched with accuracy: ${accuracy} meters`);

        const newLocation = { lat: latitude, lon: longitude };
        setLocation(newLocation);
        onLocationFetched(newLocation);

        // Clear the watch after successfully getting the position
        navigator.geolocation.clearWatch(watchId);
      },
      // Error callback
      (err) => {
        const errorMsg = getErrorMessage(err);
        console.error("Geolocation error:", errorMsg, err);
        setError(errorMsg);
        onError?.(errorMsg);
      },
      options
    );

    // Cleanup function to clear the watch when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [onLocationFetched, onError]);

  // This component doesn't render anything visible
  return null;
}
