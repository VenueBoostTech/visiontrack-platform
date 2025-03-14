// app/api/external/omnigateway/types/trial-registration.ts
export interface TrialRegistrationFormData {
    fullName: string;
    businessEmail: string;
    businessName: string;
}

export interface TrialRegistrationResponse {
    success: boolean;
    message: string;
    businessId?: string;
    userId?: string;
}