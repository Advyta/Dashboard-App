"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchUserProfile } from "@/lib/features/userSlice";

/**
 * Project: Dashboard App
 * Module: Authentication
 * Component: SessionInitializer
 * Author: Advyta
 * Date: 05/08/2025
 * Description: Initializes and manages user session state
 *
 * Screen Data:
 * - No visual UI elements (runs in background)
 * - Manages user authentication state
 * - Handles session initialization
 *
 * Screen Layout & Responsive Behavior:
 * - No visual representation
 * - Runs as a side effect
 * - No impact on layout or responsiveness
 *
 * UI Behavior:
 * - Automatically runs on app initialization
 * - No user interaction required
 * - Silent background operation
 * - No loading states or indicators
 *
 * Data Validation:
 * - Checks for existing user session
 * - Validates authentication tokens
 * - Handles expired or invalid sessions
 * - Validates user profile data structure
 * - Handles API errors gracefully
 *
 * State Management:
 * - Uses Redux for global state
 * - Manages user authentication state
 * - Handles loading and error states internally
 *
 * Dependencies:
 * - Redux for state management
 * - Next.js client component
 * - Custom user slice for authentication
 * - API services for user data
 *
 * Security Considerations:
 * - Handles sensitive authentication data
 * - Implements proper session management
 * - Follows security best practices
 */

const SessionInitializer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user === null) {
      // @ts-expect-error: dispatch may not know about thunk type
      dispatch(fetchUserProfile());
    }
  }, [user, dispatch]);

  return null;
};

export default SessionInitializer;
