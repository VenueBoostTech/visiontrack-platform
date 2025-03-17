import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const prisma = new PrismaClient();

// GET endpoint to fetch a specific business AI model
export async function GET(
  req: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelId } = params;

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

    // Get the business AI model association
    const businessModel = await prisma.businessAIModel.findFirst({
      where: {
        businessId,
        modelId,
      },
      include: {
        aiModel: true,
        cameras: {
          include: {
            camera: true,
          },
        },
      },
    });

    // If association doesn't exist, return the model with enabled = false
    if (!businessModel) {
      return NextResponse.json({
        businessModel: {
          modelId,
          aiModel: model,
          enabled: false,
          cameras: [],
        },
      });
    }

    return NextResponse.json({ businessModel });
  } catch (error) {
    console.error("Error fetching business AI model:", error);
    return NextResponse.json(
      { error: "Failed to fetch business AI model" },
      { status: 500 }
    );
  }
}

// PUT endpoint to update a business AI model association (enable/disable, update configuration)
export async function PUT(
  req: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelId } = params;
    const data = await req.json();
    const { enabled, configuration } = data;

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

    let businessModel;

    if (existingAssociation) {
      // Update existing association
      businessModel = await prisma.businessAIModel.update({
        where: {
          id: existingAssociation.id,
        },
        data: {
          enabled: enabled !== undefined ? enabled : existingAssociation.enabled,
          configuration: configuration || existingAssociation.configuration,
        },
        include: {
          aiModel: true,
          cameras: {
            include: {
              camera: true,
            },
          },
        },
      });
    } else {
      // Create new association if it doesn't exist and enabled is true
      if (enabled) {
        businessModel = await prisma.businessAIModel.create({
          data: {
            businessId,
            modelId,
            enabled: true,
            configuration: configuration || {},
          },
          include: {
            aiModel: true,
            cameras: {
              include: {
                camera: true,
              },
            },
          },
        });
      } else {
        // If the association doesn't exist and enabled is false, just return success
        return NextResponse.json({
          message: "No changes needed",
          businessModel: {
            modelId,
            aiModel: model,
            enabled: false,
            cameras: [],
          },
        });
      }
    }

    return NextResponse.json({
      message: enabled ? "AI model enabled successfully" : "AI model disabled successfully",
      businessModel,
    });
  } catch (error) {
    console.error("Error updating business AI model:", error);
    return NextResponse.json(
      { error: "Failed to update AI model status" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a business AI model association
export async function DELETE(
  req: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    // Check auth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelId } = params;

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

    // Check if the association exists
    const existingAssociation = await prisma.businessAIModel.findFirst({
      where: {
        businessId,
        modelId,
      },
    });

    if (!existingAssociation) {
      return NextResponse.json(
        { error: "This model is not associated with your business" },
        { status: 404 }
      );
    }

    // Delete all camera associations first
    await prisma.businessAIModelCamera.deleteMany({
      where: {
        businessAIModelId: existingAssociation.id,
      },
    });

    // Delete the business AI model association
    await prisma.businessAIModel.delete({
      where: {
        id: existingAssociation.id,
      },
    });

    return NextResponse.json({
      message: "AI model association removed successfully",
    });
  } catch (error) {
    console.error("Error deleting business AI model:", error);
    return NextResponse.json(
      { error: "Failed to remove AI model association" },
      { status: 500 }
    );
  }
}