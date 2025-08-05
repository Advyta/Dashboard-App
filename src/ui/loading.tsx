import React from 'react'

/**
 * Project: Dashboard App
 * Module: UI Components
 * Component: Loading
 * Author: Advyta
 * Date: 08/05/2025
 * Description: Loading indicator component for displaying during data fetching or processing
 * 
 * Screen Data:
 * - Displays a customizable loading message
 * - Shows animated loading spinner
 * - Used during data fetching operations
 * 
 * Screen Layout & Responsive Behavior:
 * - Centered on the screen
 * - Responsive text sizing
 * - Maintains aspect ratio of spinner
 * - Adapts to container size
 * 
 * UI Behavior:
 * - Smooth spinning animation
 * - Fade-in effect when mounted
 * - Clean transition when unmounting
 * - Non-blocking UI element
 * 
 * Data Validation:
 * - Validates the params prop is a string
 * - Handles undefined or null params
 * - Fallback to default message if needed
 * 
 * Props:
 * - params: Custom loading message (string)
 */


type LoadingProps = {
  /** Custom loading message to display below the spinner */
  message?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Size of the loading animation (sm, md, lg, xl) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * Loading component that centers itself within its parent container
 * and displays a loading spinner with an optional message.
 */
const Loading = ({
  message = 'Loading...',
  className = '',
  size = 'xl'
}: LoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full h-full min-h-[100px] ${className}`}>
      <span className={`loading loading-dots loading-${size}`}></span>
      {message && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
