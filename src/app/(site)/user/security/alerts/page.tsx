import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Alerts from "@/components/User/Security/Alerts";
import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";

export const metadata: Metadata = {
  title: `Security Alerts - ${process.env.PLATFORM_NAME}`,
  description: `This is Security Alerts page for ${process.env.PLATFORM_NAME}`,
  // other discriptions
};

async function getZones() {
  const alerts = await prisma.alertRule.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return alerts;
}

const SecurityAlertsPage = async () => {
  const alerts = await getZones();

  return (
    <div className="px-5">
      <Breadcrumb pageTitle="Security Settings" />
      <Alerts initialAlerts={alerts} />
    </div>
  );
};

export default SecurityAlertsPage;
