// Public API for shared/api layer
export { authCheck } from './auth';
export { apiRequest } from './client';
export { fetchProducts, fetchAllProducts } from './products';
export { useAuthenticatedRequest } from './useAuthenticatedRequest';
export type {
    LoginCredentials,
    AuthResponse,
    AuthError,
} from '@/shared/types/auth';
