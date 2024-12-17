// app/user/analytics/people/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import RetailCustomerCounter from "@/components/User/Analytics/Retail/RetailCustomerCounter";
import PeopleContent from "@/components/User/Analytics/PeopleContent";

export const metadata: Metadata = {
  title: "People Counter Analytics - VisionTrack",
  description: "Monitor and analyze visitor traffic",
};

export default async function AnalyticsPeopleCounterPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  return (
    <div className="px-5">
      {businessType === 'RETAIL' ? (
        <RetailCustomerCounter />
      ) : (
        <PeopleContent />
      )}
    </div>
  );
}