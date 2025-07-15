import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Project: Dashboard APP
// Module: Authentication
// Component: LoginRoute.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// User can login by providing username and password
// On submit, the form data is sent to the server and if the user is authenticated, the user is logged in successfully

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // create token data
    const token = await jwt.sign(
      { id: user._id, username: user.username },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "12h",
      }
    );

    // create response
    const response = NextResponse.json(
      { message: "Login successful", success: true, token, user: user },
      { status: 200 }
    );

    // set token in cookie
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
