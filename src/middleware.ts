import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const pathname = req.nextUrl?.pathname;
        const role = req.nextauth.token?.role;

        // Check if admin trying to access user routes
        if (pathname.includes("/user") && role === "ADMIN") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        // Check if staff/business owner trying to access admin routes
        if (pathname.includes("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/user", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        secret: process.env.SECRET // THIS WAS MISSING!
    }
);

export const config = {
    matcher: ["/user/:path*", "/admin/:path*"]
};