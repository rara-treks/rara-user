import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getUserProfile from "./lib/utils/server/get-user-profile";

export async function middleware(request: NextRequest) {
  const user = await getUserProfile();
  const pathname = request.nextUrl.pathname;

  if (user && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (user && pathname.startsWith("/profile")) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login/:path*", "/register/:path*"],
};
