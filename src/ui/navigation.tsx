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

// Project: Dashboard App
// Module: UI
// Component: Navigation
// Author: Advyta
// Date: 08/07/2025
// Logic:
// Side Navigation component for the dashboard app
// User can navigate to profile page and dashboard page
// User can logout

const Navigation = () => {
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
            className="px-1.5 md:px-3"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </li>
        <li className={`h-12 ${collapsed? 'pt-1' : ''}`}>
          <Link href="/dashboard" className="px-1.5 md:px-3 lg:px-4">
            <FontAwesomeIcon icon={faCube}  />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li className={`h-12 ${collapsed? 'pt-1' : ''}`}>
          <Link href="/profile" className="px-1.5 md:px-3 lg:px-4 ">
            <FontAwesomeIcon icon={faUser} />
            {!collapsed && <span>Profile</span>}
          </Link>
        </li>
        <li className={`h-12 ${collapsed? 'pt-1' : ''}`}>
          <Link href="/settings" className="px-1.5 md:px-3 lg:px-4">
            <FontAwesomeIcon icon={faGear} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
