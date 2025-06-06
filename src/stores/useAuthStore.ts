import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    token: null,

    login: (token: string) => {
        localStorage.setItem('access_token', token);
        set({
            isAuthenticated: true,
            token,
        });
        console.log('Login successful, isAuthenticated:', true);
    },

    logout: () => {
        localStorage.removeItem('access_token');
        set({
            isAuthenticated: false,
            token: null,
        });
        console.log('Logout successful, isAuthenticated:', false);
    },

    initialize: () => {
        const token = localStorage.getItem('access_token');
        const isAuth = !!token;
        set({
            isAuthenticated: isAuth,
            token,
        });
        console.log('Auth initialized, isAuthenticated:', isAuth);
    },
}));
