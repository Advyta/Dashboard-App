"use client";
import GeoLocation from "@/app/components/geoLocation";
import { RootState } from "@/lib/store";
import Loading from "@/ui/loading";
import News from "@/app/components/news";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode } from "@/lib/features/userSlice";
import { Location, CurrentWeatherResponse } from "@/lib/types";
import Weather from "@/app/components/weather";

// Project: Dashboard App
// Module: Dashboard
// Component: Dashboard
// Author: Advyta
// Date: 08/07/2025
// Logic:

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
        <Loading params="Loading" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1>My Dashboard {user?.username}</h1>
      </div>
      {/* Responsive Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 3xl:gap-12 3xl:grid-cols-4 p-4">
        {/* News section - appears first on small screens, positioned appropriately on larger screens */}
        <div className="shadow-lg order-1 md:order-3 lg:order-1">
          <News />
        </div>

        {/* Weather */}
        <div className="shadow-lg rounded-lg order-3 md:order-2 lg:order-3">
          <Weather location={location} />
        </div>

        {/* Sports News */}
        <div className="shadow-lg border border-b-amber-100 p-4 rounded-lg order-2 md:order-1 lg:order-2">
          Sports News
        </div>

        {/* Github */}
        <div className="shadow-lg border border-b-amber-100 p-4 rounded-lg order-4 md:order-4 lg:order-4">
          Github
        </div>
      </section>
      <GeoLocation onLocationFetched={handleLocationFetched} />
    </div>
  );
};

export default Dashboard;
