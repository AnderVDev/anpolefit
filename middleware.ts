import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// const { auth: middleware } = NextAuth(authConfig);
const { auth } = NextAuth(authConfig);

// Routes
const publicRoutes = ["/"];
const authRoutes = ["/login", "/register", "/reset", "/new-password"];
const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // console.log({ isLoggedIn, path: nextUrl.pathname });

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow all authentication API routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  // if (isApiAuthRoute) {
  //   return null;
  // }

  // Allow access to public routes regardless of authentication status
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect to /dashboard if user is logged in and tries to access authentication routes
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Redirect to /login if the user is not logged in and tries to access a protected path
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
