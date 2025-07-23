"use client";
import GeoLocation from "@/app/components/geoLocation";
import { RootState } from "@/lib/store";
import Loading from "@/ui/loading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    if (user === undefined) {
      // user data is loading
    }
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }
  }, [router, user, isAuthenticated]);

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
        <div className="border border-b-amber-100">Sports News</div>
        <div  className="border border-b-amber-100">Weather/ Github</div>
        <div  className="border border-b-amber-100">News</div>
        
      </section>
      <GeoLocation onLocationFetched={(location) => console.log(location)} />
    </div>
  );
};

export default Dashboard;
