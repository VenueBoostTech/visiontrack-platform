// lib/vt-external-api/services/vt-properties.service.ts

import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";
import {
  CreateVTProperties,
  UpdateVTProperties,
} from "../types/property.types";

export const VTPropertiesService = {
  createProperties: async (data: CreateVTProperties) => {
    try {
      return await vtClient.post(VT_ENDPOINTS.PROPERTIES.CREATE, data);
    } catch (error) {
      console.log("Create property error:", error);
      throw error;
    }
  },
  updateProperties: async (data: UpdateVTProperties) => {
    try {
      const response = await vtClient.put(
        VT_ENDPOINTS.PROPERTIES.UPDATE(data.id),
        {
          name: data.name,
          type: data.type,
          address: data.address,
        }
      );
      // @ts-ignore
      return response;
    } catch (error) {
      console.error("Update business error:", error);
      throw error;
    }
  },
  deleteProperties: async (id: string) => {
    try {
      const response = await vtClient.delete(VT_ENDPOINTS.PROPERTIES.DELETE(id));
      return response;
    } catch (error) {
      console.error("Delete business error:", error);
      throw error;
    }
  },
};
