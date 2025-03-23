// Type for business form// Define interfaces
interface AIModel {
    id: string;
    name: string;
    description: string;
    type: string;
    version: string;
    active: boolean;
    capabilities: any;
    configOptions: any;
    compatibleWith?: string[];
    verticalCapabilities?: any;
    createdAt: string;
    updatedAt: string;
    source?: string;
    visionTrackId?: string;
  }
  
  interface AIModelParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    isActive?: boolean;
  }

  
  interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
  
  interface AIModelResponse {
    data: any[];
    pagination: Pagination;
  }
  
  interface SyncResponse {
    success: boolean;
    message: string;
    created: number;
    updated: number;
    unchanged: number;
    errors: number;
    modelMappings: { nextJsId: string; visionTrackId: string }[];

  }