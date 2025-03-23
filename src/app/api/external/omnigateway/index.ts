// api/external/omnigateway/index.ts
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_OMNI_GATEWAY_URL;
const API_KEY = process.env.NEXT_PUBLIC_OMNI_GATEWAY_API_KEY;
const VISIONTRACK_API_KEY = process.env.NEXT_PUBLIC_VISIONTRACK_API_KEY;

export const createOmniGateway = (apiKey: string): AxiosInstance => {
  const config = {
    baseURL: BASE_URL,
    headers: {
      "x-api-key": API_KEY,
      "client-x-api-key": apiKey || VISIONTRACK_API_KEY,
    },
  } as CreateAxiosDefaults;

  return axios.create(config);
};
