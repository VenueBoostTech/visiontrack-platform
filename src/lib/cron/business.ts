import { prisma } from "@/libs/prismaDb";
import { VTSuperAdminService } from "../vt-external-api/services/vt-superadmin-service";

export const businessJob = {
  async updateBusiness() {
    VTSuperAdminService.listBusinesses().then(async (response: any) => {
      for (let index = 0; index < response.length; index++) {
        const vtBusiness = response[index];

        const business = await prisma.business.findUnique({
          where: {
            id: vtBusiness.vt_platform_id
          },
        });
        if (business) {
          await prisma.business.update({
            where: {
              id: vtBusiness.vt_platform_id,
            },
            data: {
              vt_connected: true,
            },
          });

          await prisma.vtBusinessConnections.create({
            data: {
              vt_business_id: vtBusiness.vt_platform_id,
              businessId: business.id,
              disconnected_at: null,
            },
          });
          console.log("Business connected");
          
        }
      }
    });
  },

  async testCron() {
    console.log(`[${new Date().toISOString()}] Business cron running`);
  },
};
