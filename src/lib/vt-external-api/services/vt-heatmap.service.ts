// lib/vt-external-api/services/vt-properties.service.ts
import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export const VTHeatmapService = {
  getHeatmap: async (zoneId: string, timeRange: string) => {
    try {
      return await vtClient.get(
        VT_ENDPOINTS.HEATMAP.GET(zoneId, timeRange)
      );
    } catch (error) {
      console.error("Get demographics error:", error);
      throw error;
    }
  },
}
