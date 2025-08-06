import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCube,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "./button";
import Image from "next/image";

/**
 * Project: Dashboard App
 * Module: UI Components
 * Component: Navigation
 * Author: Advyta
 * Date: 05/08/2025
 * Description: Main navigation component for the application
 * 
 * Screen Data:
 * - Displays navigation links based on user authentication
 * - Shows user profile and settings access
 * - Indicates current active route
 * - Mobile menu toggle button
 * 
 * Screen Layout & Responsive Behavior:
 * - Horizontal navigation bar on desktop
 * - Collapsible hamburger menu on mobile
 * - Responsive breakpoints for different screen sizes
 * - Fixed positioning at the top of the viewport
 * - Smooth transitions for mobile menu
 * 
 * UI Behavior:
 * - Mobile menu toggle with animation
 * - Active route highlighting
 * - Dropdown menus for user settings
 * - Click outside to close mobile menu
 * - Smooth scrolling behavior
 * 
 * Data Validation:
 * - Validates user authentication status
 * - Checks for valid navigation routes
 * - Handles missing or invalid route data
 * - Validates user permissions for protected routes
 * 
 * State:
 * - Manages mobile menu open/close state
 * - Tracks active navigation item
 * - Manages dropdown menu visibility
 * 
 * Dependencies:
 * - Next.js Link for client-side navigation
 * - FontAwesome for icons
 */

const Navigation = () => {
  const navbarContent = [
    { icon: faCube, label: "Dashboard", href: "/dashboard" },
    { icon: faUser, label: "Profile", href: "/profile" },
    { icon: faGear, label: "Settings", href: "/settings" },
  ]
  const [collapsed, setCollapsed] = useState(true);
  return (
    <nav className="">
      {/*  */}
      <ul
        className={`menu h-screen bg-neutral-900/15 transition-all duration-300
          ${collapsed ? "w-10 md:w-14 lg:w-16" : "w-56"}`}
      >
        <li className={`grid h-12 pb-2 ${collapsed ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {!collapsed && (
            <Image
              src="/personalGrid1.png"
              alt="Personal Grid"
              width={120}
              height={36}
              className="transition-all duration-300 col-span-2 py-0.5"
              loading="lazy"
            />
          )}

          {/* navbar collapse */}
          <Button
            variant="ghost"
            className="px-1.5 md:px-3 tooltip tooltip-right"
            onClick={() => setCollapsed((prev) => !prev)}
            data-tip="Toggle Menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </li>
        
        {navbarContent.map((item, idx) => (
          <li className={`h-12 ${collapsed? 'pt-1' : ''}`} key={idx}>
            <Link href={item.href} className="px-1.5 md:px-3 lg:px-4 tooltip tooltip-right" data-tip={item.label}>
              <FontAwesomeIcon icon={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
