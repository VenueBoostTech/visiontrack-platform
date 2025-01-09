import { VTBuildingService } from "@/lib/vt-external-api/services/vt-building.service";
import vtClient from "../../../../lib/vt-external-api/client";
export async function GET(request: Request) {
    try {
        const buildings = await prisma.building.findMany({
            where: {
                vtId: null
            },
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
        });

        if (!buildings.length) {
            return new Response(JSON.stringify({ message: "No buildings found without vtId" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        let syncCount = 0;
        for (const building of buildings) {
            if (building.property?.business?.vtCredentials && building.property.vtId) {
                console.log(building.property?.business?.vtCredentials);
                
                vtClient.setCredentials({
                    platform_id: building.property.business.vtCredentials.businessId,
                    api_key: building.property.business.vtCredentials.api_key,
                    business_id: building.property.business.vtCredentials.platform_id,
                });

                const vtBuilding: any = await VTBuildingService.createBuilding({
                    name: building.name,
                    property_id: building.property.vtId,
                    below_ground_floor: building.belowGroundFloors,
                    total_floors: building.floorCount,
                });

                await prisma.building.update({
                    where: {
                        id: building.id
                    },
                    data: {
                        vtId: vtBuilding.id
                    }
                });
                syncCount += 1;
            }
        }

        return new Response(JSON.stringify({ message: `Successfully synced ${syncCount} buildings` }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
