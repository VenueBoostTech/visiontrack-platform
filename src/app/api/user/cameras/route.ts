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
                        },
                        store: true
                    }
                },
                store: true
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

        // First, get the zone to check if it has an associated store
        const zone = await prisma.zone.findUnique({
            where: { id: data.zoneId },
            include: { store: true }
        });

        if (!zone) {
            return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
        }

        // Prepare the camera creation data
        const createData: any = {
            name: data.name,
            rtspUrl: data.rtspUrl,
            type: data.type,
            status: data.status,
            direction: data.direction,
            location: data.location,
            capabilities: data.capabilities,
            zone: {
                connect: { id: data.zoneId }
            }
        };

        // Only connect to store if the zone has one
        if (zone.store) {
            createData.store = {
                connect: { id: zone.store.id }
            };
        }

        const camera = await prisma.camera.create({
            data: createData,
            include: {
                zone: {
                    include: {
                        building: {
                            include: {
                                property: true
                            }
                        },
                        store: true
                    }
                },
                store: true
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