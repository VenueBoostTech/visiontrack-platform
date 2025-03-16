// app/api/platform/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";

export async function POST(req: Request) {
 const session = await getServerSession(authOptions);
 if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 const owner = await prisma.user.findFirst({
   where: { id: session.user.id, role: "BUSINESS_OWNER" },
   include: { ownedBusiness: true }
 });
 if (!owner?.ownedBusiness) return NextResponse.json({ error: "No business found" }, { status: 404 });

 try {
   const data = await req.json();
   // @ts-ignore
   const note = await prisma.note.create({
     data: {
       ...data,
       userId: session.user.id,
       businessId: owner.ownedBusiness.id
     },
     include: {
       camera: true,
       zone: true,
       user: { select: { name: true } }
     }
   });
   return NextResponse.json(note);
 } catch (error) {
   return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
 }
}

export async function GET() {
 const session = await getServerSession(authOptions);
 if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 const owner = await prisma.user.findFirst({
   where: { id: session.user.id, role: "BUSINESS_OWNER" },
   include: { ownedBusiness: true }
 });
 if (!owner?.ownedBusiness) return NextResponse.json({ error: "No business found" }, { status: 404 });

 // @ts-ignore
 const notes = await prisma.note.findMany({
   where: { businessId: owner.ownedBusiness.id },
   include: {
     camera: true,
     zone: true,
     user: { select: { name: true } }
   },
   orderBy: { createdAt: 'desc' }
 });

 return NextResponse.json(notes);
}