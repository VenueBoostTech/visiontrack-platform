// app/user/security/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import SecurityTabs from "@/components/User/Security/SecurityTabs";

export const metadata: Metadata = {
  title: `Security - ${process.env.PLATFORM_NAME}`,
  description: `Security monitoring and management`,
};

export default function SecurityPage() {
  return (
    <div className="px-5">
      <Breadcrumb pageTitle='Security' />
      <SecurityTabs />
    </div>
  );
}