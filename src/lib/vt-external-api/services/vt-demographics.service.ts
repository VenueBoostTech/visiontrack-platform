// lib/vt-external-api/services/vt-properties.service.ts
import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export const VTDemographicsService = {
  getDemographics: async (zoneId: string) => {
    try {
      return await vtClient.get(
        VT_ENDPOINTS.DEMOGRAPHICS.GET(zoneId)
      );
    } catch (error) {
      console.error("Get demographics error:", error);
      throw error;
    }
  },
}
