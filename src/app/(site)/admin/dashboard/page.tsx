// app/admin/page.tsx
import { Metadata } from "next";
import AdminDashboardContent from "@/components/Admin/Dashboard/AdminDashboardContent";

export const metadata: Metadata = {
  title: "Admin Dashboard - VisionTrack",
  description: "Monitor and manage your organization's statistics, users, and activities.",
  keywords: ["admin dashboard", "analytics", "management", "visiontrack"],
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}