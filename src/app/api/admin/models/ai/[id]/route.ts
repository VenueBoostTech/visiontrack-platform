// app/api/admin/models/ai/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    const model = await prisma.aIModel.findUnique({
      where: { id }
    });
    
    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ model });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    const data = await request.json();
    
    const updatedModel = await prisma.aIModel.update({
      where: { id },
      data
    });
    
    return NextResponse.json({ model: updatedModel });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Check if any businesses are using this model
    const businessCount = await prisma.businessAIModel.count({
      where: { modelId: id }
    });
    
    if (businessCount > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete model that is in use',
          details: `This model is currently used by ${businessCount} businesses`
        },
        { status: 400 }
      );
    }
    
    await prisma.aIModel.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}