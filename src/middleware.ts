import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const pathname = req.nextUrl?.pathname;
        const role = req.nextauth.token?.role;

        // If logged in and accessing auth routes, redirect based on role
        if (pathname.startsWith("/auth") && role) {
            if (role === "ADMIN") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            } else {
                return NextResponse.redirect(new URL("/platform/dashboard", req.url));
            }
        }

        // Handle /platform routes
        if (pathname.startsWith("/platform")) {
            // Redirect admins away from /platform routes
            if (role === "ADMIN") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
            
            // Redirect /platform to /platform/dashboard
            if (pathname === "/platform") {
                return NextResponse.redirect(new URL("/platform/dashboard", req.url));
            }
        }

        // Handle /admin routes
        if (pathname.startsWith("/admin")) {
            // Redirect non-admins away from /admin routes
            if (role !== "ADMIN") {
                return NextResponse.redirect(new URL("/platform/dashboard", req.url));
            }
            
            // Redirect /admin to /admin/dashboard
            if (pathname === "/admin") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const publicPaths = [
                    "/",
                    "/contact",
                    // Add other public paths here
                ];
                const pathname = req.nextUrl.pathname;
                
                // Allow public paths
                if (publicPaths.some((path) => pathname.startsWith(path))) {
                    return true;
                }

                // Allow auth paths only if NOT logged in
                if (pathname.startsWith("/auth")) {
                    return !token;
                }

                // Require token for all other paths
                return !!token;
            }
        },
        secret: process.env.SECRET
    }
);

export const config = {
    matcher: [
        "/",
        "/auth/:path*",
        "/platform",
        "/platform/:path*",
        "/admin",
        "/admin/:path*"
    ]
};