import { Metadata } from "next";

// app/(site)/user/page.tsx
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "User Dashboard - VisionTrack",
    description: "VisionTrack enterprise property management and security platform.",
};

export default function UserPage() {
    redirect('/user/dashboard');

    // This won't be rendered due to redirect
    return null;
}