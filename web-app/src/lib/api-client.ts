import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

// API Configuration
const API_BASE_URL = 'https://progres.mesrs.dz/api';
const PROXY_BASE_URL = 'https://buvfbqwsfcjiqdrqczma.supabase.co/functions/v1/proxy-progres';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  UUID: 'uuid',
  ETABLISSEMENT_ID: 'etablissement_id',
  USER_DATA: 'user_data',
  LOCALE: 'app_locale',
} as const;

class ApiClient {
  private axiosInstance: AxiosInstance;
  private isWeb: boolean;

  constructor() {
    this.isWeb = typeof window !== 'undefined';
    
    this.axiosInstance = axios.create({
      baseURL: this.isWeb ? PROXY_BASE_URL : API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        
        if (token) {
          config.headers.authorization = token;
        }

        // For web proxy, add endpoint as query parameter
        if (this.isWeb && config.url) {
          const endpoint = config.url.startsWith('/') ? config.url : `/${config.url}`;
          config.params = {
            ...config.params,
            endpoint: `api${endpoint}`,
          };
          config.url = '';
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          this.clearAuth();
          if (this.isWeb) {
            window.location.href = '/login';
          }
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
          toast.error('Incorrect credentials. Please try again.');
        }

        // Handle network errors
        if (!error.response) {
          toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
      }
    );
  }

  // Token management
  private getToken(): string | null {
    if (!this.isWeb) return null;
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  saveToken(token: string): void {
    if (this.isWeb) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  }

  saveUuid(uuid: string): void {
    if (this.isWeb) {
      localStorage.setItem(STORAGE_KEYS.UUID, uuid);
    }
  }

  saveEtablissementId(id: string): void {
    if (this.isWeb) {
      localStorage.setItem(STORAGE_KEYS.ETABLISSEMENT_ID, id);
    }
  }

  getUuid(): string | null {
    if (!this.isWeb) return null;
    return localStorage.getItem(STORAGE_KEYS.UUID);
  }

  getEtablissementId(): string | null {
    if (!this.isWeb) return null;
    return localStorage.getItem(STORAGE_KEYS.ETABLISSEMENT_ID);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  clearAuth(): void {
    if (this.isWeb) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.UUID);
      localStorage.removeItem(STORAGE_KEYS.ETABLISSEMENT_ID);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  }

  // Cache management
  saveCache(key: string, data: any): void {
    if (this.isWeb) {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    }
  }

  getCache<T>(key: string, maxAge: number = 24 * 60 * 60 * 1000): T | null {
    if (!this.isWeb) return null;
    
    const cached = localStorage.getItem(`cache_${key}`);
    if (!cached) return null;

    try {
      const { data, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age > maxAge) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return data as T;
    } catch {
      return null;
    }
  }

  clearCache(key?: string): void {
    if (!this.isWeb) return;
    
    if (key) {
      localStorage.removeItem(`cache_${key}`);
    } else {
      // Clear all cache keys
      const keys = Object.keys(localStorage);
      keys.forEach((k) => {
        if (k.startsWith('cache_')) {
          localStorage.removeItem(k);
        }
      });
    }
  }

  // API Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

