import { VTPropertiesService } from "@/lib/vt-external-api/services/vt-properties.service";
import vtClient from "../../../../lib/vt-external-api/client";
export async function GET(request: Request) {
    try {
        const properties = await prisma.property.findMany({
            where: {
                vtId: null
            },
            include: {
                business: {
                    include: {
                        vtCredentials: true
                    }
                }
            }
        });

        if (!properties.length) {
            return new Response(JSON.stringify({ message: "No properties found without vtId" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        let syncCount = 0
        for (const property of properties) {
            if (property.business && property.business.vtCredentials) {

                vtClient.setCredentials({
                    platform_id: property.business.vtCredentials.businessId,
                    api_key: property.business.vtCredentials.api_key,
                    business_id: property.business.vtCredentials.platform_id,
                });

                const vtProperty: any = await VTPropertiesService.createProperties({
                    name: property.name,
                    type: property.type,
                    address: property.address,
                });

                await prisma.property.update({
                    where: {
                        id: property.id
                    },
                    data: {
                        vtId: vtProperty.id
                    }
                });
                syncCount += 1
            }
        }
       
        return new Response(JSON.stringify({ message: `Successfully synced ${syncCount} properties` }), {
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
