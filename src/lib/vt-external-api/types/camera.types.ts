// lib/vt-external-api/types/camera.types.ts

export interface VTCameraStreamResponse {
  status: 'started' | 'stopped';
  stream_url?: string;
  camera_id: string;
  camera_status?: string;
  is_active?: boolean;
}

export interface VTCameraStreamStatus {
  is_active: boolean;
  stream_url: string | null;
  camera_id: string;
  camera_status: string;
}

export interface VTCamera {
  camera_id: string;
  rtsp_url: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  property_id: string;
  zone_id: string;
  capabilities: string[];
  name: string;
  location: string;
  direction: string;
  coverage_area: any;
  id: string;
  last_active: string;
  stream_status?: VTCameraStreamStatus;
}

export interface CreateVTCameraDto {
  camera_id: string;
  rtsp_url: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  property_id: string | null;
  zone_id: string | null;
  capabilities?: string[] | null;
  name: string;
  location?: string;
  direction?: string;
  coverage_area?: any;
}

export interface UpdateVTCameraDto {
  camera_id: string;
  rtsp_url: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  property_id: string | null;
  zone_id: string | null;
  capabilities?: string[] | null;
  name: string;
  location?: string;
  direction?: string;
  coverage_area?: any;
}

export interface UpdateVTCameraDto extends Partial<CreateVTCameraDto> { }

export interface VTCameraQueryParams {
  skip?: number;
  limit?: number;
}

export interface EmptyRequest {}