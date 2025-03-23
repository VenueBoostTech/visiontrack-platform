// hooks/useAiModels.ts
import { useState, useCallback, useMemo } from 'react';
import { createOmniStackAiModelApi } from '@/app/api/external/omnigateway/ai-model';
import { useGatewayClientApiKey } from './useGatewayClientApiKey';
import toast from 'react-hot-toast';


export const useAiModels = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const { apiKey } = useGatewayClientApiKey();
  const api = useMemo(() => apiKey ? createOmniStackAiModelApi(apiKey) : null, [apiKey]);


  // Get admin models from NextJS API
  const fetchAdminAiModels = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/models/ai");
      if (!response.ok) {
        throw new Error("Failed to fetch AI models");
      }
      const data = await response.json();
      return data.models;
    } catch (error) {
      toast.error('Failed to fetch admin AI models');
      console.error('Error fetching admin AI models:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncAiModels = useCallback(async () => {
    if (!api) return;
    try {
      setIsSyncing(true);
      
      // First, get all admin models from NextJS
      const adminModels = await fetchAdminAiModels();
      
      // Then, sync them to NestJS
      const response = await api.syncAiModels(adminModels);
      
      // If successful and we received mappings, update the visionTrackId fields in NextJS models
      if (response.success) {
        // Check if we have model mappings (these would be provided by the back-end)
        // This assumes the backend returns modelMappings in the response
        if (response.modelMappings && response.modelMappings.length > 0) {
          try {
            // Call the NextJS admin API to update VisionTrack IDs
            const updateResponse = await fetch('/api/admin/models/ai/sync-vt-ids', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                modelMappings: response.modelMappings
              }),
            });
            
            if (!updateResponse.ok) {
              console.warn('Failed to update VisionTrack IDs in NextJS models');
            } else {
              // Log success
              console.log('Successfully updated VisionTrack IDs in NextJS models');
            }
          } catch (updateError) {
            console.error('Error updating VisionTrack IDs:', updateError);
          }
        }
        
        return response;
      }
      
      return response;
    } catch (error) {
      toast.error('Failed to sync AI models');
      console.error('Error syncing AI models:', error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [api, fetchAdminAiModels]);
  
  return {
    isLoading,
    isSyncing,
    aiModels,
    totalItems,
    totalPages,
    fetchAiModels,
    syncAiModels,
    isInitialized: !!api
  };
};