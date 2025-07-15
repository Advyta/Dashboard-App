import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];
function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"));
}

// Verify the token and return the payload
async function verifyJWT(tocken: string){
  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const {payload} = await jwtVerify(tocken, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

// Logic for middleware
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const isPublic = isPublicRoute(path);

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if(token){
    const verifiedToken = await verifyJWT(token);

    // if the token invalid
    if(!verifiedToken){
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.set("token", "", { expires: new Date(0) });
      return res;
    }

    // token is valid but the user is on a public route
    if(isPublic){
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  // Allow request
  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/profile/:path*"],
};
