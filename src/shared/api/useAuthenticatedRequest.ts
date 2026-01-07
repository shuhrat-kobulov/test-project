import { useAuth } from '@/app/providers/auth';
import { apiRequest } from '@/shared/api';

/**
 * Hook for making authenticated API requests
 * @returns Function to make authenticated requests
 */
export const useAuthenticatedRequest = () => {
    const { token } = useAuth();

    const makeRequest = async <T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> => {
        return apiRequest<T>(url, {
            ...options,
            token: token || undefined,
        });
    };

    return { makeRequest, hasToken: !!token };
};
