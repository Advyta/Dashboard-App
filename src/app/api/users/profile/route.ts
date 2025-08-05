import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Project: Dashboard APP
// Module: Authentication
// Component: ProfileRoute.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// User can view and update their profile
// On GET request, the user's profile is fetched from the database
// On PUT request, the user's profile is updated in the database
// The user can update their profile by providing email, github, bio, location, website, phone, theme

// Error:
// If the user is not authenticated, the user is redirected to the login page
// If the user is not found, the user is redirected to the login page

connect();

// GET USER PROFILE
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// UPDATE USER PROFILE
export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const body = await request.json();

    // Fields that can be updated
    const allowedFields = [
      "email",
      "github",
      "bio",
      "location",
      "website",
      "phone",
      "theme",
    ];
    const updateData: Record<string, any> = {};

    // Only allow specific fields to be updated
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    // Validate required fields
    if (updateData.email === "") {
      return NextResponse.json(
        { error: "Email cannot be empty" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
