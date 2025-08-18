// zustand store
import { create } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark', // default value
  setTheme: (theme) => set({ theme }),
}));

interface AuthState {
  address: string;
  hasAsked: boolean;
  setAddress: (val: string)=> void;
  setHasAsked: (val: boolean)=> void;
}

export const useAuthStore = create<AuthState>((set) => ({
  address: '', // default value
  hasAsked: false,
  setAddress: (address) => set({ address }),
  setHasAsked: (hasAsked) => set({ hasAsked }),
}));