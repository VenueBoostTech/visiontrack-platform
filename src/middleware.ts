import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        try {
            const pathname = req.nextUrl?.pathname;
            const role = req.nextauth.token?.role;

            // Skip middleware for public routes
            if (pathname === "/" || pathname.startsWith("/auth")) {
                return NextResponse.next();
            }

            // Handle admin routes
            if (pathname.startsWith("/admin")) {
                return role === "ADMIN"
                    ? NextResponse.next()
                    : NextResponse.redirect(new URL("/user", req.url));
            }

            // Handle user routes
            if (pathname.startsWith("/user")) {
                return role === "ADMIN"
                    ? NextResponse.redirect(new URL("/admin", req.url))
                    : NextResponse.next();
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Middleware error:", error);
            // In case of error, allow the request to continue
            return NextResponse.next();
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Allow the request if there's a token
                return !!token;
            },
        },
        secret: process.env.SECRET,
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public|auth/signin).*)",
    ],
};