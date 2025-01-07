// lib/vt-external-api/services/vt-building.service.ts

import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export interface CreateVTBuildings {
  name: string;
  property_id: string;
  below_ground_floor: number | null;
  total_floors: number | null;
}

export const VTBuildingService = {
  createBuilding: async (data: CreateVTBuildings) => {
    try {
      return await vtClient.post(VT_ENDPOINTS.BUILDING.CREATE, data);
    } catch (error) {
      console.log("Create building error:", error);
      throw error;
    }
  },
};
