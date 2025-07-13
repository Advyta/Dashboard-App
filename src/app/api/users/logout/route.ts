import { NextResponse } from "next/server";

// Project: Dashboard APP
// Module: API
// Component: logout.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This module is used to logout the user
// It returns a success message if the user is logged out successfully
// It clears the token from the cookies

export async function POST(req: Request, res: Response) {
  return handleLogout();
}

async function handleLogout() {
  // Logout the user
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      {
        status: 200,
      }
    );
    // Clear the token from the cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    // Logout failed
    return NextResponse.json(
      {
        message: "Logout failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
