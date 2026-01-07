import { createContext } from 'react';

export interface AuthData {
    username: string;
    token: string;
    tokenExpiry: number;
    subdomain: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    subdomain: string | null;
    login: (
        username: string,
        token: string,
        lifetime: number,
        subdomain: string
    ) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
