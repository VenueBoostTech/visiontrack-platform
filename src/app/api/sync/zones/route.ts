import { VTZoneService } from "@/lib/vt-external-api/services/vt-zone.service";
import vtClient from "../../../../lib/vt-external-api/client";
export async function GET(request: Request) {
    try {
        const zones = await prisma.zone.findMany({
            where: {
                vtId: null
            },
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
        });

        if (!zones.length) {
            return new Response(JSON.stringify({ message: `Successfully synced 0 zones` }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        let syncCount = 0;
        for (const zone of zones) {
            if (zone.building?.property?.business?.vtCredentials && zone.building.vtId) {
                vtClient.setCredentials({
                    platform_id: zone.building.property.business.vtCredentials.businessId,
                    api_key: zone.building.property.business.vtCredentials.api_key,
                    business_id: zone.building.property.business.vtCredentials.platform_id,
                });

                const vtZone: any = await VTZoneService.createZone({
                    property_id: zone.building.property.vtId,
                    building_id: zone.building.vtId,
                    name: zone.name,
                    type: zone.type,
                    ...(zone.floor ? { floor: zone.floor } : {})
                });

                await prisma.zone.update({
                    where: {
                        id: zone.id
                    },
                    data: {
                        vtId: vtZone.id
                    }
                });
                syncCount += 1;
            }
        }

        return new Response(JSON.stringify({ message: `Successfully synced ${syncCount} zones` }), {
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
