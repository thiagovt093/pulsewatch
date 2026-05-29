export interface User {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "BLOCKED" | "PENDING";
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}

export interface MonitoredApi {
  id: string;
  name: string;
  url: string;
  currentStatus: "UP" | "DOWN" | "DEGRADED" | "PAUSED";
  createdAt: string;
}

export interface MonitoringCheck {
  status: "UP" | "DOWN" | "DEGRADED";
  statusCode: number;
  responseTime: number;
  errorMessage: string | null;
  checkedAt: string;
}

export interface CreateApiRequest {
  name: string;
  url: string;
  method: string;
  expectedStatusCode: number;
  checkInterval: number;
  timeout: number;
}

export interface ApiError {
  error: string;
  status: number;
  message: string;
  path: string;
  timestamp: string;
}