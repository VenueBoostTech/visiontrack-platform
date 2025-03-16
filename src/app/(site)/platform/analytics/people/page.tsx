// app/platform/analytics/people/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import RetailCustomerCounter from "@/components/Platform/Analytics/Retail/RetailCustomerCounter";
import PeopleContent from "@/components/Platform/Analytics/PeopleContent";

export const metadata: Metadata = {
  title: "People Counter Analytics - VisionTrack",
  description: "Monitor and analyze visitor traffic",
};

export default async function AnalyticsPeopleCounterPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  return (
    <div className="px-0">
      {businessType === 'RETAIL' ? (
        <RetailCustomerCounter />
      ) : (
        <PeopleContent />
      )}
    </div>
  );
}