// app/api/user/notes/[noteId]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";

export async function PUT(req: Request, { params }: { params: { noteId: string } }) {
 const session = await getServerSession(authOptions);
 if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 try {
   const data = await req.json();
   // @ts-ignore
   const note = await prisma.note.update({
     where: { id: params.noteId },
     data,
     include: {
       camera: true,
       zone: true,
       user: { select: { name: true } }
     }
   });
   return NextResponse.json(note);
 } catch (error) {
   return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
 }
}

export async function DELETE(req: Request, { params }: { params: { noteId: string } }) {
 const session = await getServerSession(authOptions);
 if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 try {
    // @ts-ignore
   await prisma.note.delete({
     where: { id: params.noteId }
   });
   return NextResponse.json({ success: true });
 } catch (error) {
   return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
 }
}