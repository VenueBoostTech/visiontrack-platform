export const VTAdminBusinessService = {}; // lib/vt-external-api/services/vt-camera.service.ts
import vtClient from "../client";
import { VT_ENDPOINTS } from "../endpoints";
import { VTApiResponse } from "../types";
import { VTQueryParams, VTBusiness } from "../types/business.types";

export const VTSuperAdminService = {
  
  listBusinesses: async (
    params?: VTQueryParams
  ): Promise<VTApiResponse<VTBusiness[]>> => {
    return await vtClient.get<VTApiResponse<VTBusiness[]>>(
      VT_ENDPOINTS.SUPERADMIN.GET,
      {
        skip: params?.skip || 0,
        limit: params?.limit || 100,
      }
    );
  },

  createBusiness: async (data: {
    name: string;
    vt_platform_id: string;
    api_key: string;
    is_active: boolean;
    is_local_test: boolean;
    is_prod_test: boolean;
  }) => {
    try {
      const response = await vtClient.post(
        VT_ENDPOINTS.SUPERADMIN.CREATE,
        data
      );
      return response;
    } catch (error) {
      console.error("Create business error:", error);
      throw error;
    }
  },

  updateBusiness: async (
    business_id: string,
    data: {
      is_active: boolean;
      is_local_test: boolean;
      is_prod_test: boolean;
    }
  ) => {
    try {
      const response = await vtClient.put(
        VT_ENDPOINTS.SUPERADMIN.UPDATE(business_id),
        data
      );
      // @ts-ignore
      return response;
    } catch (error) {
      console.error("Update business error:", error);
      throw error;
    }
  },

  deleteBusiness: async (business_id: string) => {
    try {
      const response = await vtClient.delete(
        VT_ENDPOINTS.SUPERADMIN.DELETE(business_id)
      );
      // @ts-ignore
      return response;
    } catch (error) {
      console.error("Delete business error:", error);
      throw error;
    }
  },
};
