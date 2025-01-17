import { prisma } from "@/libs/prismaDb";
import vtClient from "../../../../lib/vt-external-api/client";
import { VTCameraService } from "@/lib/vt-external-api/services/vt-camera.service";

export async function GET(request: Request) {
    try {
        const cameras: any = await prisma.camera.findMany({
            where: {
                vtId: null
            },
            include: {
                zone: {
                    include: {
                        building: {
                            include: {
                                property: {
                                    include: {
                                        business: {
                                            include: {
                                                vtCredentials: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!cameras.length) {
            return new Response(JSON.stringify({ message: `Successfully synced 0 cameras` }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        let syncCount = 0;
        for (const camera of cameras) {
            if (camera.zone?.building?.property?.business?.vtCredentials && camera.zone.vtId) {

                vtClient.setCredentials({
                    platform_id: camera.zone.building.property.business.vtCredentials.businessId,
                    api_key: camera.zone.building.property.business.vtCredentials.api_key,
                    business_id: camera.zone.building.property.business.vtCredentials.platform_id,
                });

                let payload: any = {
                    camera_id: camera.id,
                    rtsp_url: camera.rtspUrl,
                    property_id: camera.zone.building.property.vtId,
                    zone_id: camera.zone.vtId,
                    name: camera.name,
                    ...(camera.location ? { floor: camera.location } : {}),
                    ...(camera.direction ? { floor: camera.direction } : {}),
                    status: camera.status,
                }
                if (camera.zone.storeId) {
                    payload = {
                        ...payload,
                        store_id: camera.zone.storeId,
                    }
                }
                let cameraCapability: any = []

                if (camera.capabilities) {
                    Object.keys(camera.capabilities).forEach(key => {
                        if (camera.capabilities[key]) {
                            cameraCapability.push(key);
                        }
                    });
                }

                payload = {
                    ...payload,
                    capabilities: cameraCapability,
                }

                const vtCamera: any = await VTCameraService.createCamera(payload);

                await prisma.camera.update({
                    where: {
                        id: camera.id
                    },
                    data: {
                        vtId: vtCamera.id
                    }
                });
                syncCount += 1;
            }
        }

        return new Response(JSON.stringify({ message: `Successfully synced ${syncCount} cameras` }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message ?? "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
