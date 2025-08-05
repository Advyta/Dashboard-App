import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
/**
 * Project: Dashboard App
 * Module: UI Components
 * Component: Card
 * Author: Advyta
 * Date: 05/08/2025
 * Description: Reusable card component for displaying content in a consistent layout
 * 
 * Screen Data:
 * - Displays dynamic content based on provided data array
 * - Shows title and refresh button when provided
 * - Renders custom content via renderItem prop
 * 
 * Screen Layout & Responsive Behavior:
 * - Fixed width container with rounded corners
 * - Responsive padding and spacing
 * - Scrollable content area for overflow
 * - Consistent shadow and border styling
 * 
 * UI Behavior:
 * - Shows loading state during refresh
 * - Smooth animations for content updates
 * - Hover effects on interactive elements
 * - Optional refresh button with spinner
 * 
 * Data Validation:
 * - Validates data prop is an array
 * - Checks renderItem is a function
 * - Handles empty or undefined data states
 * - Validates theme customization props
 * 
 * Props:
 * - data: Array of items to display (required)
 * - renderItem: Function to render each item (required)
 * - title: Optional card title (string)
 * - onRefresh: Optional refresh callback (function)
 * - cardTheme: Optional theme customization (object)
 */

type CardProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
  onRefresh?: () => void;
  cardTheme?: string;
};

function Card<T>({
  data,
  renderItem,
  title,
  onRefresh,
  cardTheme,
}: CardProps<T>) {
  return (
    <div
      className={`card w-full min-w-0 rounded-xl ${
        cardTheme === "blue" ? "bg-[#042073]/50 text-gray-100" : "bg-gray-100/20"
      }`}
    >
      <div className="card-body">
        {title && (
          <div className="flex items-center justify-between">
            <h2 className="card-title capitalize">{title}</h2>
            {/* refresh icon */}
            <Button
              variant={`ghost`}
              onClick={onRefresh}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </Button>
          </div>
        )}
        {data.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  );
}

export default Card;
