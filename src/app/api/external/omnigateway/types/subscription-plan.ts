import { AuthProps, SideLink } from "@/types/auth";

// Type for subscription plan
export interface SubscriptionPlan {
  planId: string;
  interval: "month" | "year";
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  checkoutUrl?: string;
}

export interface SubscriptionFinalizationResponse {
  success: boolean;
  message: string;
  businessId: string;
  status: string;
  auth_response: AuthProps;
  sidebarLinks: SideLink[];
  userId: string;
}
