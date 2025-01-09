// lib/vt-external-api/services/vt-building.service.ts

import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export interface CreateVTBuildings {
  name: string;
  property_id: string;
  below_ground_floor: number | null;
  total_floors: number | null;
}

export interface UpdateVTBuildings {
  id: string;
  name: string;
  property_id: string | null;
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
  updateBuilding: async (data: UpdateVTBuildings) => {
    try {
      const response = await vtClient.put(
        VT_ENDPOINTS.BUILDING.UPDATE(data.id),
        {
          name: data.name,
          property_id: data.property_id,
          below_ground_floor: data.below_ground_floor,
          total_floors: data.total_floors,
        }
      );
      // @ts-ignore
      return response;
    } catch (error) {
      console.error("Update building error:", error);
      throw error;
    }
  },
  deleteBuildings: async (id: string) => {
    try {
      const response = await vtClient.delete(VT_ENDPOINTS.BUILDING.DELETE(id)); 
      return response;
    } catch (error) {
      console.error("Delete building error:", error);
      throw error;
    }
  },
};
