import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach token if present
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("luxe_auth_token") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle response errors gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear invalid token
        localStorage.removeItem("luxe_auth_token");
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);

// Auth API Endpoints
export const authApi = {
  login: async (email: string, password?: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password?: string) => {
    const response = await apiClient.post("/auth/register", { name, email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};

// Products API Endpoints
export const productApi = {
  getAll: async (params?: Record<string, any>) => {
    const response = await apiClient.get("/products", { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};

// Orders API Endpoints
export const orderApi = {
  create: async (orderData: Record<string, any>) => {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await apiClient.get("/orders");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },
};

// Categories API Endpoints
export const categoryApi = {
  getAll: async () => {
    const response = await apiClient.get("/categories");
    return response.data;
  },
};

export default apiClient;
