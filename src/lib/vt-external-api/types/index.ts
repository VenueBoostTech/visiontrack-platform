// lib/vt-external-api/types/index.ts
export interface VTApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}
  
  export interface VTPaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  }
  
  export interface VTErrorResponse {
    success: false;
    error: string;
    message: string;
    statusCode: number;
  }