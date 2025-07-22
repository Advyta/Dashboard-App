import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCube,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "./button";


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
  return (
    <nav className="">
      <ul className="menu w-56 min-h-screen bg-neutral-900/15">
        <li className="grid grid-cols-3">
          
          <Button variant="ghost" className="col-start-3 col-end-4"><FontAwesomeIcon icon={faBars} /></Button>
        </li>
        <li>
          <Link href="/dashboard">
            <FontAwesomeIcon icon={faCube} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <FontAwesomeIcon icon={faUser} />
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <FontAwesomeIcon icon={faGear} />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
