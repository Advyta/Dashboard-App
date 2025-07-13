"use client"

import { UserData } from '@/lib/types';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Project: Dashboard App
// Module: Dashboard
// Component: Dashboard Page
// Author: Advyta
// Date: 08/07/2025
// Logic: 
// User can view their dashboard

interface DashboardPageProps {
  params: {
    id: string;
  };
}
const DashboardPage = ({ params }: DashboardPageProps) => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  
   // Fetch user data on component mount
   useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Fetch User Data
    try {
      setLoading(true);
      const response = await axios.get("/api/users/profile");
      const userData = response.data.data;

      // Check if the user is accessing their own profile
      if (userData._id !== id) {
        setError("You can only view your own profile");
        return;
      }
      setUser(userData);
      console.log(userData);
    } catch (error: any) {
      // Set Error
      setError(error.response?.data?.error || "Failed to fetch user data");
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Personal Dashboard</h2>
    </div>
  )
}

export default DashboardPage
