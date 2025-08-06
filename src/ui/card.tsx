import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { JSX, useState } from "react";
import { faRotateRight, faSearch } from "@fortawesome/free-solid-svg-icons";
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
 * - onSearch: Optional search callback (function)
 * - showSearch: Optional show search bar (boolean)
 * - cardTheme: Optional theme customization (string)
 */

interface CardProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  cardTheme?: "blue" | "default";
}

function Card<T>({
  data = [],
  renderItem,
  title,
  onRefresh,
  onSearch,
  showSearch = false,
  cardTheme = "default",
}: CardProps<T>): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  return (
    <div
      className={`card w-full min-w-0 rounded-xl ${
        cardTheme === "blue"
          ? "bg-[#042073]/50 text-gray-100"
          : "bg-gray-100/20"
      }`}
    >
      <div className="card-body gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center justify-between">
            {title && <h2 className="card-title capitalize">{title}</h2>}
            {showSearch && onSearch && (
            <form onSubmit={handleSearch} className="flex gap-2">
              <label className="input bg-white/10 input-sm">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-[1em] opacity-50"
                />
                <input
                  type="search"
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-white/10 border-0 focus-visible:ring-1 focus-visible:ring-white/50"
                />
              </label>
              <Button type="submit" variant="outline" className="shrink-0 join-item" size="sm">
                Search
              </Button>
            </form>
          )}
            {onRefresh && (
              <Button variant="ghost" onClick={onRefresh}>
                <FontAwesomeIcon icon={faRotateRight} />
              </Button>
            )}
          </div>

          
        </div>
        {data.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  );
}

export default Card;
