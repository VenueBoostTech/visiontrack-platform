// lib/vt-external-api/endpoints/index.ts
export const VT_ENDPOINTS = {
  BUSINESS: {
    CREATE: "/api/businesses/",
    GET_BY_PLATFORM_ID: (platformId: string) =>
      `/api/businesses/by-vt-platform-id/${platformId}`,
  },
  CAMERAS: {
    BASE: "/api/camera",
    DETAIL: (id: string) => `/api/camera/${id}`,
  },
  SUPERADMIN: {
    GET: "/api/superadmin/businesses/",
    CREATE: "/api/superadmin/businesses/",
    UPDATE: (id: string) => `/api/superadmin/businesses/${id}`,
  },
} as const;
