"use client";
import { RootState } from "@/lib/store";
import Button from "@/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Project: Dashboard App
// Module: Dashboard
// Component: Dashboard
// Author: Advyta
// Date: 08/07/2025
// Logic:

const Dashboard = () => {
  const router = useRouter();
  const {user, loading, isAuthenticated } = useSelector((state: RootState) => state.user);
 

  useEffect(() => {
   if(user === undefined){
    // user data is loading
   }
   if(!isAuthenticated || !user){
    router.replace("/login");
    return;
   }
  }, [router, user, isAuthenticated]);
  

  if (loading === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Welcome! {user?._id}</h1>
      <Button onClick={() => router.push("/profile")}>Profile</Button>
    </div>
  );
};

export default Dashboard;
