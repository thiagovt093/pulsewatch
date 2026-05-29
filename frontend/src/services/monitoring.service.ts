import monitoringApi from "@/lib/monitoring-api";
import { MonitoredApi, MonitoringCheck, CreateApiRequest } from "@/types";

export const monitoringService = {
  async getApis(): Promise<MonitoredApi[]> {
    const response = await monitoringApi.get("/apis");
    return response.data;
  },

  async getApiById(id: string): Promise<MonitoredApi> {
    const response = await monitoringApi.get(`/apis/${id}`);
    return response.data;
  },

  async createApi(data: CreateApiRequest): Promise<MonitoredApi> {
    const response = await monitoringApi.post("/apis", data);
    return response.data;
  },

  async deleteApi(id: string): Promise<void> {
    await monitoringApi.delete(`/apis/${id}`);
  },

  async getHistory(id: string): Promise<MonitoringCheck[]> {
    const response = await monitoringApi.get(`/apis/${id}/history`);
    return response.data;
  },
};