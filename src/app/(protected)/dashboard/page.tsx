"use client";
import GeoLocation from "@/app/components/geoLocation";
import { RootState } from "@/lib/store";
import Loading from "@/ui/loading";
import News from "@/app/components/news";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCountryCode } from "@/lib/features/userSlice";
import { Location } from "@/lib/types";
import Card from "@/ui/card";

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

  useEffect(() => {
    if (user === undefined) {
      // user data is loading
    }
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }
  }, [router, user, isAuthenticated]);

  const handleLocationFetched = async ({ lat, lon }: Location) => {
    try {
      const res = await fetch(`/api/users/geocode?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data.countryCode) {
        dispatch(setCountryCode(data.countryCode));
      }
    } catch (err) {
      // Optionally handle error
    }
  };

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
      <section className="flex flex-row justify-evenly">
        <div className="border border-b-amber-100 w-1/4">Sports News</div>
        <div className="border border-b-amber-100 w-1/4">Weather/ Github</div>
        <div className="border border-b-amber-100 w-1/4">
          <News />
        </div>
      </section>
      <GeoLocation onLocationFetched={handleLocationFetched} />
    </div>
  );
};

export default Dashboard;
