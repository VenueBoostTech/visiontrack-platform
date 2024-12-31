// lib/vt-external-api/services/vt-user.service.ts
import vtClient from '../client';
import { VT_ENDPOINTS } from '../endpoints';
import { VTApiResponse } from '../types';

interface VTUserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  organization?: string;
  status: 'active' | 'inactive';
}

export const VTUserService = {
  getVTProfile: async (): Promise<VTApiResponse<VTUserProfile>> => {
    return await vtClient.get<VTApiResponse<VTUserProfile>>(VT_ENDPOINTS.USER.VT_PROFILE);
  }
};