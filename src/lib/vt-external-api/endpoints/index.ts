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
    UPDATE: (id: string) => `/api/camera/${id}`,
    POST: "/api/camera/",
    START_STREAM: (id: string) => `/api/camera/${id}/stream/start`,
    STOP_STREAM: (id: string) => `/api/camera/${id}/stream/stop`,
    STREAM_STATUS: (id: string) => `/api/camera/${id}/stream/status`,
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
    DELETE: (id: string) => `vt/api/v1/property/properties/${id}`,
  },
  BUILDING: {
    CREATE: "vt/api/v1/property/buildings/",
    UPDATE: (id: string) => `vt/api/v1/property/buildings/${id}`,
    DELETE: (id: string) => `vt/api/v1/property/buildings/${id}`,
  },
  ZONE: {
    CREATE: (id: string) => `vt/api/v1/zone/properties/${id}/zones`,
    UPDATE: (id: string) => `/vt/api/v1/zone/zones/${id}`,
    DELETE: (id: string) => `/vt/api/v1/zone/zones/${id}`
  },
  DEMOGRAPHICS: {
    GET: (id: string, timeRange: string) =>
      `/vt/api/v1/spaceAnalytics/analytics/demographics?filter_by=${timeRange}${id === "all" ? "" : `&zone_id=${id}`}`
  },
  HEATMAP: {
    GET: (zoneId: string, filter_by: string) =>
      `/vt/api/v1/spaceAnalytics/analytics/heatmaps?filter_by=${filter_by}${zoneId === "" ? "" : `&zone_id=${zoneId}`}`
  },
  CUSTOMER_TRAFFIC: {
    GET: (zoneId: string, timeRange: string) =>
      `/api/entrylog/summary/?filter_by=${timeRange}${zoneId === "" ? "" : `&zone_id=${zoneId}`}`
  },
} as const;
