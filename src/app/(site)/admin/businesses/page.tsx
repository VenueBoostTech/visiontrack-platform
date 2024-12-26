// app/admin/businesses/page.tsx
import BusinessListContainer from "@/components/Admin/Businesses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manage Businesses',
  description: 'View and manage all businesses',
};

export default function BusinessesPage() {
  return (
    <>
      <BusinessListContainer />
    </>
  );
}