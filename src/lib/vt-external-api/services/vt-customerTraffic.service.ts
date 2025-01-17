// lib/vt-external-api/services/vt-customerTraffic.service.ts
import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export const VTCustomerTrafficService = {
  getCustomerTraffic: async (zoneId: string, timeRange: string) => {
    try {
      return await vtClient.get(
        VT_ENDPOINTS.CUSTOMER_TRAFFIC.GET(zoneId, timeRange)
      );
    } catch (error) {
      console.error("Get customer traffic error:", error);
      throw error;
    }
  },
}
