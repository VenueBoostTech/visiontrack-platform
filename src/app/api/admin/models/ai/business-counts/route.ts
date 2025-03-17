// app/api/admin/models/ai/business-counts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get counts of how many businesses use each AI model
    const businessCounts = await prisma.businessAIModel.groupBy({
      by: ['modelId'],
      _count: {
        businessId: true
      }
    });
    
    // Format the data for the frontend
    const formattedCounts = businessCounts.map(item => ({
      modelId: item.modelId,
      count: item._count.businessId
    }));
    
    return NextResponse.json({ businessCounts: formattedCounts });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}