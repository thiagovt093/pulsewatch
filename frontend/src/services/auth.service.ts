import api from "@/lib/api";
import { AuthResponse, User } from "@/types";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get("/users/me");
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  },
};