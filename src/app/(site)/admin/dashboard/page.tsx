// app/admin/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AdminDashboardContent from "@/components/Admin/Dashboard/AdminDashboardContent";

export const metadata: Metadata = {
  title: "Superadmin Dashboard - VisionTrack",
  description: "Monitor and manage your organization's statistics, users, and activities.",
};

export default function AdminDashboardPage() {

  return (
	  <>
		<Breadcrumb pageTitle="Dashboards" />
		<AdminDashboardContent />
	  </>
	);

}