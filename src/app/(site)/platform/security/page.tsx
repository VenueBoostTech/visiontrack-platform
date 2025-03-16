// app/user/security/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import SecurityTabs from "@/components/User/Security/SecurityTabs";
import RetailSecurityTabs from "@/components/User/Security/SecurityTabsRetail";

export const metadata: Metadata = {
  title: `Security - ${process.env.PLATFORM_NAME}`,
  description: `Security monitoring and management`,
};

export default async function SecurityPage() {
  // Get the session on the server side
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  return (
    <div className="px-5">
      <Breadcrumb pageTitle='Security' />
      {businessType === 'RETAIL' ? (
        <RetailSecurityTabs />
      ) : (
        <SecurityTabs />
      )}
    </div>
  );
}