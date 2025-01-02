import vtClient from '../client';

export const VTBusinessService = {
 async getBusinessId(platformId: string) {
   try {
     const response = await vtClient.get(`/api/businesses/by-vt-platform-id/${platformId}`);
      // @ts-ignore
     return response.business_id;
   } catch (error: any) {
     if (error?.response?.status === 404) {
       return null; // Business not found, will trigger create
     }
     throw error; // Rethrow other errors
   }
 },

 async createBusiness(data: { name: string, vt_platform_id: string, api_key: string }) {
   try {
     const response = await vtClient.post('/api/businesses', data);
     // @ts-ignore
     return response.business_id;
   } catch (error) {
     console.error('Create business error:', error);
     throw error;
   }
 }
};