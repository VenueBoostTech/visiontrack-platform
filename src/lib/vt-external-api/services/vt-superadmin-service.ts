export const VTAdminBusinessService = {};// lib/vt-external-api/services/vt-camera.service.ts
import vtClient from '../client';
import { VT_ENDPOINTS } from '../endpoints';
import { VTApiResponse } from '../types';
import { VTQueryParams, VTBusiness } from '../types/business.types';

export const VTSuperAdminService = {
  listBusinesses: async (params?: VTQueryParams): Promise<VTApiResponse<VTBusiness[]>> => {
    return await vtClient.get<VTApiResponse<VTBusiness[]>>(
      VT_ENDPOINTS.SUPERADMIN.GET,
      {
        skip: params?.skip || 0,
        limit: params?.limit || 100
      }
    );
  },
};