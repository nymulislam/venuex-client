import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Better Auth session cookies check
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  let isProtectedRoute = false;

  // 1. General routes
  const privatePaths = ["/add-facility", "/my-bookings", "/manage-facilities"];
  if (privatePaths.some((route) => pathname.startsWith(route))) {
    isProtectedRoute = true;
  }

  // 2. /facilities/:id (but /facilities will be public)
  if (pathname.startsWith("/facilities/") && pathname !== "/facilities") {
    isProtectedRoute = true;
  }

  // 3. Redirect if user have no session
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-facility/:path*",
    "/my-bookings/:path*",
    "/manage-facilities/:path*",
    "/facilities/:path*", 
  ],
};