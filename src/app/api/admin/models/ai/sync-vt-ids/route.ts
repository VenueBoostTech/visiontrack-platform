// app/api/admin/models/ai/sync-vt-ids/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/libs/auth";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint will update the visionTrackId for multiple AI models
export async function POST(req: Request) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get model mappings from request body
    const { modelMappings } = await req.json();

    if (!modelMappings || !Array.isArray(modelMappings)) {
      return NextResponse.json(
        { message: 'Invalid request body. Expected modelMappings array.' },
        { status: 400 }
      );
    }

    // Process each mapping
    const updateResults = await Promise.all(
      modelMappings.map(async (mapping) => {
        if (!mapping.nextJsId || !mapping.visionTrackId) {
          return { success: false, error: 'Missing IDs', mapping };
        }

        try {
          // Update the model with the visionTrackId
          const updatedModel = await prisma.aIModel.update({
            where: { id: mapping.nextJsId },
            data: { visionTrackId: mapping.visionTrackId }
          });

          return {
            success: true,
            model: updatedModel.id,
            visionTrackId: mapping.visionTrackId
          };
        } catch (error) {
          return {
            success: false,
            error: `Failed to update model: ${error instanceof Error ? error.message : 'Unknown error'}`,
            mapping
          };
        }
      })
    );

    // Count successful updates
    const successCount = updateResults.filter(result => result.success).length;

    return NextResponse.json({
      success: true,
      message: `Updated ${successCount} of ${modelMappings.length} AI models`,
      results: updateResults
    });
  } catch (error) {
    console.error('Error updating AI model visionTrackIds:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}