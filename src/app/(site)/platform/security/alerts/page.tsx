// app/(site)/user/security/alerts/page.tsx
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Alerts from "@/components/User/Security/Alerts";
import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/auth";

export const metadata: Metadata = {
  title: `Security Alerts - ${process.env.PLATFORM_NAME}`,
  description: `This is Security Alerts page for ${process.env.PLATFORM_NAME}`,
};

async function getAlertRules() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  // Get user with business info
  const user = await prisma.user.findFirst({
    where: { 
      id: session.user.id 
    },
    include: {
      ownedBusiness: true,
      workingAt: {
        include: {
          business: true
        }
      }
    }
  });

  // Get business ID based on role
  const businessId = user?.role === 'BUSINESS_OWNER' 
    ? user.ownedBusiness?.id 
    : user?.workingAt?.businessId;

  if (!businessId) {
    return [];
  }

  const alertRules = await prisma.alertRule.findMany({
    where: {
      // @ts-ignore
      businessId: businessId
    },
    include: {
      user: true,
      // @ts-ignore
      business: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return alertRules;
}

const SecurityAlertsPage = async () => {
  const alerts = await getAlertRules();

  return (
    <div className="px-0">
      <Breadcrumb pageTitle="Security Settings" />
      {/* @ts-ignore */}
      <Alerts initialAlerts={alerts} />
    </div>
  );
};

export default SecurityAlertsPage;