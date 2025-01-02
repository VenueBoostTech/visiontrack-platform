// lib/vt-external-api/types/business.types.ts
export interface VTBusiness {
    id: string;
    name: string;
    vt_platform_id: string;
    api_key: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface VTQueryParams {
    skip?: number;
    limit?: number;
  }