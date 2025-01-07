// lib/vt-external-api/services/vt-building.service.ts

import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export interface CreateVTZones {
  name: string;
  property_id: string;
  building_id: string;
  type: string;
  floor: string;
  store_id: string;
}

export const VTZineService = {
  createZone: async (data: CreateVTZones) => {
    try {
      return await vtClient.post(
        VT_ENDPOINTS.ZONE.CREATE(data.property_id),
        data
      );
    } catch (error) {
      console.log("Create Zone error:", error);
      throw error;
    }
  },
};
