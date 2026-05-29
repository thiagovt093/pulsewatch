import axios from "axios";

const monitoringApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONITORING_API_URL || "http://localhost:8081",
});

monitoringApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

monitoringApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default monitoringApi;