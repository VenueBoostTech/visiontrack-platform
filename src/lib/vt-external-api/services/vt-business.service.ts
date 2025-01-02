import vtClient from '../client';
import { VT_ENDPOINTS } from '../endpoints';

export const VTBusinessService = {
  async getBusinessId(platformId: string) {
    try {
      const response = await vtClient.get(VT_ENDPOINTS.BUSINESS.GET_BY_PLATFORM_ID(platformId));
      // @ts-ignore
      return response.business_id;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return null; 
      }
      throw error;
    }
  },

  async createBusiness(data: { name: string, vt_platform_id: string, api_key: string }) {
    try {
      const response = await vtClient.post(VT_ENDPOINTS.BUSINESS.CREATE, data);
      // @ts-ignore
      return response.business_id;
    } catch (error) {
      console.error('Create business error:', error);
      throw error;
    }
  }
};