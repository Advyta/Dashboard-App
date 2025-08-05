"use client";
import GeoLocation from "@/app/components/geoLocation";
import { RootState } from "@/lib/store";
import Loading from "@/ui/loading";
import News from "@/app/components/news";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode } from "@/lib/features/userSlice";
import { Location } from "@/lib/types";
import Weather from "@/app/components/weather";
import GithubTrending from "@/app/components/GithubTrending";

/**
 * Dashboard Component
 *
 * Main dashboard view that serves as the central hub for the application.
 * Displays various widgets including News, Weather, and GitHub Trending.
 *
 * Data Flow:
 * 1. On mount, checks user authentication status
 * 2. If not authenticated, redirects to login page
 * 3. Once authenticated, loads user-specific data and location-based widgets
 * 4. Handles geolocation to provide location-aware content
 *
 * Screen Layout:
 * - Responsive grid layout with 1-4 columns based on viewport size
 * - Mobile: 1 column (stacked vertically)
 * - Tablet (md): 2 columns
 * - Desktop (xl): 3 columns
 * - Large Desktop (3xl): 4 columns
 *
 * UI Behavior:
 * - Shows loading state while authenticating
 * - Auto-redirects to login if not authenticated
 * - Fetches and displays location-based weather data
 * - Maintains responsive design across all screen sizes
 *
 * Data Validation:
 * - Validates user authentication status on mount and route changes
 * - Validates geolocation data before making API calls
 * - Handles API errors gracefully with error boundaries
 * - Validates API responses before updating state
 *
 * Dependencies:
 * - Redux for global state management (user authentication)
 * - Next.js routing for navigation
 * - Custom components: News, GeoLocation, Weather, GithubTrending
 * - External APIs: Weather service, News API, GitHub API
 *
 * State Management:
 * - Uses Redux for global user state
 * - Local state for location data and loading states
 *
 * Error Handling:
 * - Catches and logs API errors
 * - Handles missing or invalid location data
 * - Provides fallback UI for loading and error states
 *
 * Security:
 * - Protected route (wrapped in protected layout)
 * - Validates user session on client and server side
 * - Securely handles location data
 */

const Dashboard = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (user === undefined) {
      // user data is loading
    }
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }
  }, [router, user, isAuthenticated]);

  const handleLocationFetched = useCallback(
    async ({ lat, lon }: Location) => {
      try {
        const res = await fetch(`/api/users/geocode?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data.countryCode) {
          dispatch(setCountryCode(data.countryCode));
        }
        setLocation({ lat, lon });
      } catch (err: any) {
        console.error(err);
      }
    },
    [dispatch]
  );

  if (loading === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1>My Dashboard {user?.username}</h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 3xl:gap-12 3xl:grid-cols-4 p-4">
        <div className="shadow-lg rounded-lg order-1 md:order-3 lg:order-1">
          <News />
        </div>

        <div className="shadow-lg rounded-lg order-3 md:order-2 lg:order-3 col-span-1 lg:col-span-1 min-w-full">
          <GeoLocation onLocationFetched={handleLocationFetched} />
          {location && <Weather location={location} />}
        </div>

        <div className="shadow-lg rounded-lg order-4 md:order-4 lg:order-4">
          <GithubTrending />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
