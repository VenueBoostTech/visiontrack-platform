import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
const cron = require("node-cron");

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json();
    if (!type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    const isExist = await prisma.cronSetup.findFirst({
      where: {
        type: type,
      },
    });

    if (isExist == null) {
      const cronJob = cron.schedule("* */10 * * *", async () => {
        console.log("running a task every 10 minutes");
      });
      await prisma.cronSetup.create({
        data: {
          type: type,
          data: {
            name: cronJob.options.name,
          },
        },
      });
      
      return NextResponse.json({ data: "Success", status: 200 });
    } else {
      return NextResponse.json({ data: "Cron Already Exist", status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
