// app/api/external/omnigateway/verification.ts
import { createOmniGateway } from './index';

export interface VerificationResponse {
  status: 'success' | 'already_verified' | 'expired' | 'invalid';
  message: string;
  userId?: string;
  businessId?: string;
  subscriptionStatus?: 'incomplete' | 'trialing' | 'active' | 'past_due' | 'canceled';
}

export const createVerificationApi = () => {
  const api = createOmniGateway();

  return {
    verifyEmail: async (token: string): Promise<VerificationResponse> => {
      const { data } = await api.get(`/business-registration/verify-email?token=${token}`);
      return data;
    }
  };
};