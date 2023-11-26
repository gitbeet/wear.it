import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/men",
    "/women",
    "/kids",
    "/contact",
    "/products/(.*)",
    "/product/(.*)",
    "/(api|trpc)(.*)",
    "/sign-up",
    "/sign-in",
    "/forgot-password",
    "/cart",
    "/favorites",
    "/checkout",
    "/api/create-payment-intent/route",
    "/api/create-payment-intent/index",
    "/api/create-payment-intent/",
    "/successful",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
