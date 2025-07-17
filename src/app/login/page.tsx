"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useCallback } from "react";
import Form from "../../ui/form";
import { FormField, FormData } from "@/lib/types";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";

// Project: Dashboard APP
// Module: Authentication
// Component: LoginPage.tsx
// Author: Advyta
// Date: 28/06/2025
// Logic:
// User can login by providing username and password
// On submit, the form data is sent to the server and if the user is authenticated, the user is redirected to their profile page
// If the login fails, an error message is displayed

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // Memoized the fields array so it doesn't get recreated on every render
  const loginFields: FormField[] = useMemo(
    () => [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
        error: "Username is required",
        placeholder: "Enter your username",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        error: "Password is required",
        placeholder: "Enter your password",
      },
    ],
    []
  ); // Empty dependency array means this will only be created once

  // Memoized the login function so it doesn't get recreated on every render
  const onLogin = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.post("/api/users/login", data);
        console.log("Login successful!", response.data);
        // Set the user in the Redux store
        dispatch(setUser(response.data.user));

        // Redirect to user's specific profile page
        router.push(`/profile`);
      } catch (error: any) {
        setError(error.response?.data?.error || "Something went wrong!");
        console.log(
          "Login failed",
          error.response?.data?.error || "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  ); // Only recreate if router changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Form
        fields={loginFields}
        title="Login"
        submitButtonText="Login"
        onSubmit={onLogin}
        loading={loading}
        error={error}
      />

      <div className="text-center mt-4">
        <p>
          Don't have an account?{" "}
          <span>
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Sign up!
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
