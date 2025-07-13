import { NextResponse, NextRequest } from "next/server";

// Logic
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = path === "/" || path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value;

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

// Matching Paths
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/dashboard"],
};
