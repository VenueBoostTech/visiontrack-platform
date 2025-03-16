// app/user/security/notes/page.tsx 
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
import NotesContent from "@/components/User/Notes/NotesContent";

export const metadata: Metadata = {
  title: `Security Notes - ${process.env.PLATFORM_NAME}`,
  description: `Manage security notes and issues`,
};

async function getNotes() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const owner = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      role: "BUSINESS_OWNER",
    },
    include: { ownedBusiness: true }
  });

  if (!owner?.ownedBusiness) return [];

  // @ts-ignore
  return prisma.note.findMany({
    where: { businessId: owner.ownedBusiness.id },
    include: {
      camera: true,
      zone: true,
      user: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export default async function SecurityNotesPage() {
  const notes = await getNotes();
  return (
    <div className="px-0">
      <NotesContent initialNotes={notes} />
    </div>
  );
}

