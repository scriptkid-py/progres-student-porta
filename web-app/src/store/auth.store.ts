import { create } from 'zustand';
import { authService, AuthResponse } from '@/services/auth.service';
import { toast } from 'sonner';

interface AuthState {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login({ username, password });
      
      set({ 
        user: response, 
        isAuthenticated: true, 
        isLoading: false,
        error: null
      });
      
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: errorMessage
      });
      
      toast.error(errorMessage);
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    
    try {
      await authService.logout();
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null
      });
      
      toast.success('Logged out successfully');
    } catch (error: any) {
      set({ isLoading: false });
      toast.error('Logout failed');
    }
  },

  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    set({ isAuthenticated: isAuth });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

