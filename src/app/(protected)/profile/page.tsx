"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// User profile page - redirects to user-specific profile

// Project: Dashboard APP
// Module: Profile Page
// Component: profilePage.tsx
// Author: Advyta
// Date: 28/06/2025

//--------------------------------

export default function ProfilePage() {
  const router = useRouter();

  // Get User Details and redirect to their specific profile page
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        const userId = response.data.data._id;
        router.push(`/profile/${userId}`);
      } catch (error: any) {
        console.error(
          "Error fetching user details:",
          error.response?.data || error.message
        );
        // If there's an error, redirect to login
        router.push("/login");
      }
    };

    getUserDetails();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Redirecting...</h1>
        <p className="text-gray-600">Taking you to your profile page</p>
      </div>
    </div>
  );
}
