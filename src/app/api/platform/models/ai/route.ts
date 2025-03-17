import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AIModelType } from "@prisma/client";
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

    // Get all AI models
    const models = await prisma.aIModel.findMany({
      where: {
        active: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({ models });
  } catch (error) {
    console.error("Error fetching AI models:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI models" },
      { status: 500 }
    );
  }
}

// Create a new AI model (Admin only)
export async function POST(req: NextRequest) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Validate the request
    const { name, description, type, version, capabilities, configOptions } = data;
    
    if (!name || !description || !type || !version) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the type is valid
    if (!Object.values(AIModelType).includes(type as AIModelType)) {
      return NextResponse.json(
        { error: "Invalid model type" },
        { status: 400 }
      );
    }

    // Create the AI model
    const newModel = await prisma.aIModel.create({
      data: {
        name,
        description,
        type: type as AIModelType,
        version,
        active: true,
        capabilities: capabilities || {},
        configOptions: configOptions || {}
      }
    });

    return NextResponse.json({ model: newModel }, { status: 201 });
  } catch (error) {
    console.error("Error creating AI model:", error);
    return NextResponse.json(
      { error: "Failed to create AI model" },
      { status: 500 }
    );
  }
}