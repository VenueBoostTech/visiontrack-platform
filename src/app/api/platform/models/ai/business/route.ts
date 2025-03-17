import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's business ID
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email || "",
      },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get business ID (either owner or staff)
    const businessId = user.ownedBusiness?.id || user.workingAt?.businessId;

    if (!businessId) {
      return NextResponse.json(
        { error: "No business associated with user" },
        { status: 404 }
      );
    }

    // Get all AI models for the business
    const businessModels = await prisma.businessAIModel.findMany({
      where: {
        businessId,
      },
      include: {
        aiModel: true,
        cameras: {
          include: {
            camera: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ businessModels });
  } catch (error) {
    console.error("Error fetching business AI models:", error);
    return NextResponse.json(
      { error: "Failed to fetch business AI models" },
      { status: 500 }
    );
  }
}

// Create a new business AI model association
export async function POST(req: NextRequest) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { modelId, configuration } = data;

    if (!modelId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user's business ID
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email || "",
      },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get business ID (either owner or staff)
    const businessId = user.ownedBusiness?.id || user.workingAt?.businessId;

    if (!businessId) {
      return NextResponse.json(
        { error: "No business associated with user" },
        { status: 404 }
      );
    }

    // Check if the model exists
    const model = await prisma.aIModel.findUnique({
      where: {
        id: modelId,
      },
    });

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    // Check if the association already exists
    const existingAssociation = await prisma.businessAIModel.findFirst({
      where: {
        businessId,
        modelId,
      },
    });

    if (existingAssociation) {
      return NextResponse.json(
        { error: "This model is already associated with your business" },
        { status: 400 }
      );
    }

    // Create the business AI model association
    const businessModel = await prisma.businessAIModel.create({
      data: {
        businessId,
        modelId,
        enabled: true,
        configuration: configuration || {},
      },
      include: {
        aiModel: true,
        cameras: true,
      },
    });

    return NextResponse.json(
      { message: "AI model enabled successfully", businessModel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating business AI model:", error);
    return NextResponse.json(
      { error: "Failed to enable AI model" },
      { status: 500 }
    );
  }
}