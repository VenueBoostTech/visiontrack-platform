// api/external/omnigateway/submissions.ts
import { createOmniGateway } from './index';
import { SubmissionFormData } from './types/submissions';

export const createSubmissionsApi = () => {
    const api = createOmniGateway();

    return {
        createSubmission: async (submissionData: SubmissionFormData) => {
            const { data } = await api.post('/submissions', submissionData);
            return data;
        }
    };
};