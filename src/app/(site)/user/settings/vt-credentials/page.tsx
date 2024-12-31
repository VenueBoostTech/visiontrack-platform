import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
import VTCredentialsContent from "@/components/User/VTCredentialsContent";

export const metadata: Metadata = {
  title: `VisionTrack API - ${process.env.PLATFORM_NAME}`,
  description: `Manage your VisionTrack API credentials`,
};

async function getVTCredentials() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  // Get business owner and their business
  const owner = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      role: "BUSINESS_OWNER",
    },
    include: {
      ownedBusiness: true,
    },
  });

  if (!owner?.ownedBusiness) {
    return null;
  }

  // Get VT credential for this business
  // @ts-ignore
  const credential = await prisma.vTApiCredential.findFirst({
    where: {
      businessId: owner.ownedBusiness.id,
    },
  });
  
  return { credential, businessId: owner.ownedBusiness.id };
}

export default async function VTCredentialsPage() {
  const data = await getVTCredentials();


  return (
    <div className="px-5">
      <VTCredentialsContent 
        initialCredential={data?.credential} 
        businessId={data?.businessId} 
      />
    </div>
  );
}