"use client";

import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Form from "../../ui/form";
import { FormField, FormData } from "@/lib/types";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";

//Project: Dashboard APP
// Module: Authentication
// Component: SignupPage.tsx
// Author: Advyta
// Date: 28/06/2025

// Logic:
// User can signup by providing username, email and password
// On submit, the form data is sent to the server and the user is redirected to their profile page
// If the signup fails, an error message is displayed
// If the signup is successful, a success message is displayed

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // Memoize the fields array so it doesn't get recreated on every render
  const signupFields: FormField[] = useMemo(
    () => [
      {
        label: "Username",
        name: "username",
        type: "text",
        required: true,
        placeholder: "Enter your username",
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        placeholder: "Enter your password",
      },
    ],
    []
  ); // Empty dependency array means this will only be created once

  // Memoize the signup function so it doesn't get recreated on every render
  const onSignup = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.post("/api/users/signup", data);
        console.log("Signup successful!", response.data);
        // Set the user in the Redux store
        dispatch(setUser(response.data.data));

        // Redirect to user's specific profile page
        router.push(`/profile/`);
      } catch (error: any) {
        setError(error.response?.data?.error || "Something went wrong!");
        console.error("Signup error:", error.message);
      } finally {
        setLoading(false);
      }
    },
    [router]
  ); // Only recreate if router changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Form
        fields={signupFields}
        title="Signup"
        submitButtonText="Sign up"
        onSubmit={onSignup}
        loading={loading}
        error={error}
      />

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <span>
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Login!
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
