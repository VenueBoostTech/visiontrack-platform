// lib/vt-external-api/services/vt-auth.service.ts
import vtClient from '../client';
import { VT_ENDPOINTS } from '../endpoints';
import { VTApiResponse } from '../types';

interface VTAuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface VTAuthRequest {
  username: string;
  password: string;
}

export const VTAuthService = {
  authenticate: async (data: VTAuthRequest): Promise<VTApiResponse<VTAuthResponse>> => {
    return await vtClient.post<VTApiResponse<VTAuthResponse>>(VT_ENDPOINTS.AUTH.AUTHENTICATE, data);
  },

  refreshToken: async (refreshToken: string): Promise<VTApiResponse<VTAuthResponse>> => {
    return await vtClient.post<VTApiResponse<VTAuthResponse>>(VT_ENDPOINTS.AUTH.REFRESH, {
      refreshToken
    });
  }
};