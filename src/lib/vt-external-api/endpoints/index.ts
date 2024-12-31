// lib/vt-external-api/endpoints/index.ts
export const VT_ENDPOINTS = {
    AUTH: {
      AUTHENTICATE: '/auth/authenticate',
      REFRESH: '/auth/refresh',
    },
    USER: {
      VT_PROFILE: '/user/vt-profile',
    },
    CAMERAS: {
      BASE: '/api/camera',
      DETAIL: (id: string) => `/api/camera/${id}`,
    }
  } as const;