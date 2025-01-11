// lib/vt-external-api/services/vt-properties.service.ts
import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export const VTHeatmapService = {
  getHeatmap: async (zoneId: string, filter_by: string) => {
    try {
      return await vtClient.get(
        VT_ENDPOINTS.HEATMAP.GET(zoneId, filter_by)
      );
    } catch (error) {
      console.error("Get heatmap error:", error);
      throw error;
    }
  },
}
