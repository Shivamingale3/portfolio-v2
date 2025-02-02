import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // Check if the user is trying to access a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // If no token exists in localStorage (handled client-side), redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all pages, but let it handle protected routes dynamically
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
