// Authentication types
export interface LoginCredentials {
    username: string;
    password: string;
    subdomain: string;
}

export interface AuthResponse {
    token: string;
    lifetime: number;
}

export interface AuthError {
    message: string;
    status?: number;
}
