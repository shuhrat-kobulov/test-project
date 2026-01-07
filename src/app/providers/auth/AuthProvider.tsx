import type { ReactNode } from 'react';
import { useState } from 'react';
import type { AuthData } from './AuthContext';
import { AuthContext } from './AuthContext';

const AUTH_STORAGE_KEY = 'auth_data';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    // Initialize state from localStorage
    const [authData, setAuthData] = useState<AuthData | null>(() => {
        const savedData = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedData) {
            try {
                const data: AuthData = JSON.parse(savedData);
                // Check if token is expired
                if (data.tokenExpiry > Date.now()) {
                    return data;
                } else {
                    // Token expired, clear storage
                    localStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Failed to parse auth data:', error);
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
        return null;
    });

    const login = (
        username: string,
        token: string,
        lifetime: number,
        subdomain: string
    ) => {
        const tokenExpiry = Date.now() + lifetime * 1000;
        const data: AuthData = {
            username,
            token,
            tokenExpiry,
            subdomain,
        };
        setAuthData(data);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    };

    const logout = () => {
        setAuthData(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!authData,
                user: authData?.username || null,
                token: authData?.token || null,
                subdomain: authData?.subdomain || null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
