// lib/vt-external-api/services/vt-building.service.ts

import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";

export interface CreateVTZones {
  name: string;
  property_id: string | null;
  building_id: string | null;
  type: string;
  floor?: number;
  store_id?: string;
}

export interface UpdateVTZones {
  id: string;
  name: string;
  property_id: string | null;
  building_id: string | null;
  type: string;
  floor?: number;
  store_id?: string;
}

export const VTZoneService = {
  createZone: async (data: CreateVTZones) => {
    try {
      return await vtClient.post(
        VT_ENDPOINTS.ZONE.CREATE(data.property_id || ''),
        data
      );
    } catch (error) {
      console.log("Create Zone error:", error);
      throw error;
    }
  },
  updateZone: async (data: UpdateVTZones) => {
    try {
      const response = await vtClient.put(
        VT_ENDPOINTS.ZONE.UPDATE(data.id),
        {
          property_id: data.property_id,
          building_id: data.building_id,
          name: data.name,
          type: data.type,
          ...(data.floor ? { floor: data.floor } : {})
        }
      );
      // @ts-ignore
      return response;
    } catch (error) {
      console.error("Update zone error:", error);
      throw error;
    }
  },
  deleteZone: async (id: string) => {
    try {
      const response = await vtClient.delete(VT_ENDPOINTS.ZONE.DELETE(id));
      return response;
    } catch (error) {
      console.error("Delete zone error:", error);
      throw error;
    }
  },
};
