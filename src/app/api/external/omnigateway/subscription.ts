// app/api/external/omnigateway/subscription.ts
import { createOmniGateway } from "./index";
import { BusinessDetails } from "./types/business";
import {
  SubscriptionFinalizationResponse,
  SubscriptionPlan,
  SubscriptionResponse,
} from "./types/subscription-plan";

export const createBusinessApi = () => {
  const api = createOmniGateway();

  return {
    updateBusinessAndSubscribe: async (
      businessId: string,
      businessDetails: Omit<BusinessDetails, "businessId" | "userId">,
      subscription: SubscriptionPlan
    ): Promise<SubscriptionResponse> => {
      const { data } = await api.post(`/businesses/${businessId}/subscribe`, {
        businessDetails,
        subscription,
      });
      return data;
    },

    finalizeSubscription: async (
      sessionId: string
    ): Promise<SubscriptionFinalizationResponse> => {
      const { data } = await api.get(
        `/businesses/subscription/finalize?session_id=${sessionId}`
      );
      return data;
    },
  };
};
