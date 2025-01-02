// lib/vt-external-api/endpoints/index.ts
export const VT_ENDPOINTS = {
  BUSINESS: {
    CREATE: '/api/businesses',
    GET_ID: (platformId: string) => `/api/businesses/${platformId}`,
  },
  CAMERAS: {
    BASE: '/api/camera',
    DETAIL: (id: string) => `/api/camera/${id}`,
  },
  SUPERADMIN: {
    GET: '/api/superadmin/businesses/',
  }
} as const;