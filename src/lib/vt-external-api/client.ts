// lib/vt-external-api/client.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";

const VT_API_BASE_URL = 'https://coreapi.visiontrack.xyz';

interface VTCredentials {
  platform_id: string;
  api_key: string;
  business_id?: string;
}

class VTExternalClient {
  private static instance: VTExternalClient;
  private vtApi: AxiosInstance;

  private constructor() {
    this.vtApi = axios.create({
      baseURL: VT_API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.vtApi.interceptors.request.use((config) => {
      // @ts-ignore
      const credentials = config.credentials as VTCredentials;
      if (credentials) {
        if (credentials.platform_id)
          config.headers["X-VT-Platform-ID"] = credentials.platform_id;
        if (credentials.api_key)
          config.headers["X-VT-API-Key"] = credentials.api_key;
        if (credentials.business_id)
          config.headers["X-VT-Business-ID"] = credentials.business_id;
      }

      if (config.url?.includes("superadmin")) {
        config.headers["X-VT-SUPERADMIN-API-KEY"] =
          process.env.NEXT_PUBLIC_SUPER_ADMIN_API_KEY;
      }

      return config;
    });

    this.vtApi.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("VT API Error:", error?.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): VTExternalClient {
    if (!VTExternalClient.instance) {
      VTExternalClient.instance = new VTExternalClient();
    }
    return VTExternalClient.instance;
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.vtApi.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.vtApi.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.vtApi.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.vtApi.delete(url);
    return response.data;
  }

  setCredentials(credentials: VTCredentials) {
    // @ts-ignore
    this.vtApi.defaults.credentials = credentials;
  }
}

export default VTExternalClient.getInstance();
