"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { logout, updateUser } from '@/lib/features/userSlice';
import { FormData, FormField } from '@/lib/types';
import Button from '@/ui/button';
import Form from '@/ui/form';

const ProfileContent = ({ id }: { id: string }) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

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
      dispatch(logout());
      router.push("/login");
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
    if(user === undefined){
      // User data is not loaded yet
      // Add a spinner here
      return;
    }
    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }
    // If the user ID in the URL does not match the logged-in user, redirect
    if (user._id !== id) {
      router.replace("/login");
      return;
    }
  }, [isAuthenticated, user, id, router]);

  if (formLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading edit form...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 dark:bg-gray-900 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">
                Manage your personal information
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "secondary" : "primary"}
                disabled={formLoading}
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.username}</h2>
                  <p className="text-indigo-100">{user?.email}</p>
                  <p className="text-indigo-200 text-sm">
                    Member since{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-500 w-24 text-sm">
                        Username:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user?.username}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 w-24 text-sm">Email:</span>
                      <span className="font-medium text-gray-900">
                        {user?.email}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 w-24 text-sm">
                        Location:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user?.location || (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 w-24 text-sm">Phone:</span>
                      <span className="font-medium text-gray-900">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                    Online Presence
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-500 w-24 text-sm">
                        GitHub:
                      </span>
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
                      <span className="text-gray-500 w-24 text-sm">
                        Website:
                      </span>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  About Me
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {user?.bio ? (
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                  ) : (
                    <p className="text-gray-400 italic">No bio added yet.</p>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Member since:</span>{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Last updated:</span>{" "}
                    {user?.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Edit Profile
              </h2>
              <p className="text-gray-600">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {bioText.length}/500 characters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileContent
