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
    POST: "/api/camera/",
  },
  SUPERADMIN: {
    GET: "/api/superadmin/businesses/",
    CREATE: "/api/superadmin/businesses/",
    UPDATE: (id: string) => `/api/superadmin/businesses/${id}`,
    DELETE: (id: string) => `/api/superadmin/businesses/${id}`,
  },
  PROPERTIES: {
    CREATE: "vt/api/v1/property/properties/",
    UPDATE: (id: string) => `vt/api/v1/property/properties/${id}`,
  },
  BUILDING: {
    CREATE: "vt/api/v1/property/buildings/",
  },
  ZONE: {
    CREATE: (id: string) => `vt/api/v1/zone/properties/${id}/zones`,
  },
} as const;
