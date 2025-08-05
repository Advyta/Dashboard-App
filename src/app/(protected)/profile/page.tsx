"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { logout, updateUser } from "@/lib/features/userSlice";
import { FormData, FormField } from "@/lib/types";
import Button from "@/ui/button";
import Form from "@/ui/form";
import Loading from "@/ui/loading";
import {
  faArrowUpRightFromSquare,
  faCommentDots,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// User profile page - redirects to user-specific profile

// Project: Dashboard APP
// Module: Profile Page
// Component: profilePage.tsx
// Author: Advyta
// Date: 28/06/2025
// Logic:
// 1. Fetch user data on component mount
// 2. Fetch user data from the server
// 3. Display user data
// 4. Handle profile update
// 5. Handle logout
// 6. Handle form submission

//--------------------------------

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    loading: formLoading,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [bioText, setBioText] = useState("");

  // Get User Details and redirect to their specific profile page
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        const userId = response.data.data._id;
      } catch (error: any) {
        console.error(
          "Error fetching user details:",
          error.response?.data || error.message
        );
        alert(error.response?.data?.error || "Failed to fetch user details");
        // If there's an error, redirect to login
        router.push("/login");
      }
    };
    getUserDetails();
  }, [router]);

  const handleProfileUpdate = async (data: FormData) => {
    // Validate required fields
    if (!data.email?.trim()) {
      setError("Email cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      // Include bio data in the update
      const updateData = {
        ...data,
        bio: bioText,
      };
      dispatch(updateUser(updateData));
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      if (response.status === 200) {
        dispatch(logout());
        router.push("/login");
      }
    } catch (error: any) {
      setError("Logout failed. Please try again.");
    }
  };

  // Define form fields for profile editing
  const profileFields: FormField[] = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
    },
    {
      label: "GitHub Profile",
      name: "github",
      type: "url",
      required: false,
      placeholder: "https://github.com/username",
    },
    {
      label: "Website",
      name: "website",
      type: "url",
      required: false,
      placeholder: "https://yourwebsite.com",
    },
    {
      label: "Location",
      name: "location",
      type: "text",
      required: false,
      placeholder: "City, Country",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      required: false,
      placeholder: "+1 234 567 8900",
    },
  ];

  useEffect(() => {
    if (formLoading === "pending" || formLoading === "succeeded") {
      if (!isAuthenticated || !user) {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, user, router]);

  if (formLoading === "pending" || user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  // ------------------ Render Profile Page --------------------------------------------
  return (
    <div className="flex items-center justify-center w-full">
      <div className=" bg-neutral-300/15 rounded-2xl py-8 mt-4 items-center overscroll-none ">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="bg-white/10 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl text-gray-100 font-montserrat font-[700]">
                  My Profile
                </h1>
                <p className="text-gray-300 mt-1">
                  Manage your personal information
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "primary"}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Display */}
          {!isEditing && (
            <div className="bg-white/10  rounded-xl shadow-lg overflow-hidden">
              {success && (
                <div className="p-4 bg-green-50 border-l-4 border-green-400">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Header */}
              <div className="bg-[linear-gradient(315deg,_#000116_0%,_#042073_100%)] shadow-lg px-6 py-8 text-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/15  bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user?.username}</h2>
                    <p className="text-gray-100">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-5 h-5 mr-2 text-gray-300"
                      />
                      Personal Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-gray-300 w-24 ">Username:</span>
                        <span className=" text-gray-400">{user?.username}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-300 w-24">Email:</span>
                        <span className=" text-gray-400">{user?.email}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-300 w-24">Location:</span>
                        <span className=" text-gray-400">
                          {user?.location || (
                            <span className="text-gray-400 italic">
                              Not specified
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-300 w-24">Phone:</span>
                        <span className=" text-gray-400">
                          {user?.phone || (
                            <span className="text-gray-400 italic">
                              Not specified
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Online Presence */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="w-5 h-5 mr-2 text-gray-300"
                      />
                      Online Presence
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-gray-300 w-24">GitHub:</span>
                        {user?.github ? (
                          <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-600 hover:text-indigo-800 underline"
                          >
                            View Profile
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-300 w-24">Website:</span>
                        {user?.website ? (
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-600 hover:text-indigo-800 underline"
                          >
                            Visit Site
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className="w-5 h-5 mr-2 text-gray-300"
                    />
                    About Me
                  </h3>
                  <div className="bg-gray-50/20 rounded-lg p-4">
                    {user?.bio ? (
                      <p className="text-gray-600 leading-relaxed">
                        {user.bio}
                      </p>
                    ) : (
                      <p className="text-gray-300 italic">No bio added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Edit Form */}
          {isEditing && (
            <div className="bg-white/20 rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  Edit Profile
                </h2>
                <p className="text-gray-200">
                  Update your personal information below
                </p>
              </div>

              <Form
                fields={profileFields}
                title=""
                submitButtonText="Save Changes"
                onSubmit={handleProfileUpdate}
                loading={updating}
                error={error}
                className="max-w-2xl"
              />

              {/* Bio field - not included in Form component since it's a textarea */}
              <div className="max-w-2xl mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Bio
                </label>
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:border-indigo-200 focus:ring-1 focus:ring-indigo-200 resize-none"
                />
                <p className="text-xs text-gray-300 mt-1">
                  {bioText.length}/500 characters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
