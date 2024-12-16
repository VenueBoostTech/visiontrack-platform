// app/api/cameras/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
    try {
      const session = await getAuthSession();
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const cameras = await prisma.camera.findMany({
        include: {
          zone: {
            include: {
              building: {
                include: {
                  property: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      return NextResponse.json(cameras);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch cameras' }, 
        { status: 500 }
      );
    }
  }

export async function POST(request: Request) {
    try {
      const session = await getAuthSession();
      if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const data = await request.json();
    
      const cameraData = {
        name: data.name,
        rtspUrl: data.rtspUrl,
        type: data.type,
        status: data.status,
        direction: data.direction,
        location: data.location,
        zoneId: data.zoneId,
        capabilities: data.capabilities
      };
  
      console.log('Data being sent to Prisma:', cameraData);
  
      const camera = await prisma.camera.create({
        data: cameraData,
        include: {
          zone: {
            include: {
              building: {
                include: {
                  property: true
                }
              }
            }
          }
        }
      });
      
      return NextResponse.json(camera);
    } catch (error) {
      console.error('Full error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to create camera' }, 
        { status: 500 }
      );
    }
  }