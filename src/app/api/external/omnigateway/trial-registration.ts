// app/api/external/omnigateway/trial-registration.ts
import { createOmniGateway } from './index';
import { TrialRegistrationFormData, TrialRegistrationResponse } from './types/trial-registration';

export const createTrialRegistrationApi = () => {
    const api = createOmniGateway();

    return {
        registerTrial: async (data: TrialRegistrationFormData): Promise<TrialRegistrationResponse> => {
            const { data: response } = await api.post('/business-registration/trial', data);
            return response;
        }
    };
};
