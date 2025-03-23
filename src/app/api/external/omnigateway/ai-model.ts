// app/api/external/omnigateway/ai-model.ts
import { createOmniGateway } from './index';


export const createOmniStackAiModelApi = (apiKey: string) => {
  const api = createOmniGateway(apiKey);

  return {
    
    
    syncAiModels: async (models: any[]) => {
      const { data } = await api.post<SyncResponse>('/ai-models/sync', { models });
      return data;
    },

  };
};