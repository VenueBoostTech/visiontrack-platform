// lib/vt-external-api/services/vt-camera.service.ts
import vtClient from '../client';
import { VT_ENDPOINTS } from '../endpoints';
import { VTApiResponse } from '../types';
import { 
  VTCamera,
  VTCameraQueryParams,
  CreateVTCameraDto,
  UpdateVTCameraDto,
  VTCameraStreamResponse,
  EmptyRequest
} from '../types/camera.types';

export const VTCameraService = {
  listCameras: async (params?: VTCameraQueryParams): Promise<VTApiResponse<VTCamera[]>> => {
    return await vtClient.get<VTApiResponse<VTCamera[]>>(
      VT_ENDPOINTS.CAMERAS.BASE,
      {
        skip: params?.skip || 0,
        limit: params?.limit || 100
      }
    );
  },

  getCamera: async (cameraId: string): Promise<VTApiResponse<VTCamera>> => {
    return await vtClient.get<VTApiResponse<VTCamera>>(
      VT_ENDPOINTS.CAMERAS.DETAIL(cameraId)
    );
  },

  createCamera: async (data: CreateVTCameraDto): Promise<VTApiResponse<VTCamera>> => {

    return await vtClient.post<VTApiResponse<VTCamera>>(
      VT_ENDPOINTS.CAMERAS.POST,
      data
    );
  },

  updateCamera: async (cameraId: string, data: UpdateVTCameraDto): Promise<VTApiResponse<VTCamera>> => {
    return await vtClient.put<VTApiResponse<VTCamera>>(
      VT_ENDPOINTS.CAMERAS.UPDATE(cameraId),
      data
    );
  },

  deleteCamera: async (cameraId: string): Promise<VTApiResponse<VTCamera>> => {
    return await vtClient.delete<VTApiResponse<VTCamera>>(
      VT_ENDPOINTS.CAMERAS.DETAIL(cameraId)
    );
  },

  // Stream control endpoints
  startStream: async (cameraId: string): Promise<VTApiResponse<VTCameraStreamResponse>> => {
    return await vtClient.post<VTApiResponse<VTCameraStreamResponse>>(
      VT_ENDPOINTS.CAMERAS.START_STREAM(cameraId),
      {} as EmptyRequest
    );
  },

  stopStream: async (cameraId: string): Promise<VTApiResponse<void>> => {
    return await vtClient.post<VTApiResponse<void>>(
      VT_ENDPOINTS.CAMERAS.STOP_STREAM(cameraId),
      {} as EmptyRequest
    );
  },

  getStreamStatus: async (cameraId: string): Promise<VTApiResponse<VTCameraStreamResponse>> => {
    return await vtClient.get<VTApiResponse<VTCameraStreamResponse>>(
      VT_ENDPOINTS.CAMERAS.STREAM_STATUS(cameraId)
    );
  }
};