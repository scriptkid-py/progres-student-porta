import { apiClient } from '@/lib/api-client';

export interface AuthResponse {
  expirationDate: string;
  token: string;
  userId: number;
  uuid: string;
  idIndividu: number;
  etablissementId: number;
  userName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        '/authentication/v1/',
        credentials
      );

      // Save authentication data
      apiClient.saveToken(response.token);
      apiClient.saveUuid(response.uuid);
      apiClient.saveEtablissementId(response.etablissementId.toString());

      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    apiClient.clearAuth();
    apiClient.clearCache();
  }

  isAuthenticated(): boolean {
    return apiClient.isLoggedIn();
  }

  getEtablissementId(): string | null {
    return apiClient.getEtablissementId();
  }

  getUuid(): string | null {
    return apiClient.getUuid();
  }
}

export const authService = new AuthService();

