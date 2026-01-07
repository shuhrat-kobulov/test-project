import type {
    ProductsResponse,
    ProductsQueryParams,
    ProductsError,
} from '@/shared/types';
import { apiRequest } from './client';

export const fetchProducts = async (
    subdomain: string,
    token: string,
    params: ProductsQueryParams
): Promise<ProductsResponse> => {
    const { page, size } = params;

    const url = `https://${subdomain}.ox-sys.com/variations?page=${page}&size=${size}`;

    try {
        const data = await apiRequest<ProductsResponse>(url, {
            method: 'GET',
            token,
        });

        return data;
    } catch (error) {
        throw {
            message:
                (error as ProductsError).message || 'Failed to fetch products',
            status: (error as ProductsError).status || 500,
        } as ProductsError;
    }
};

export const fetchAllProducts = async (
    subdomain: string,
    token: string,
    params: ProductsQueryParams
): Promise<ProductsResponse> => {
    const { page, size } = params;

    const url = `https://${subdomain}.ox-sys.com/variations?page=${page}&size=${size}`;

    try {
        const data = await apiRequest<ProductsResponse>(url, {
            method: 'GET',
            token,
        });

        return data;
    } catch (error) {
        throw {
            message:
                (error as ProductsError).message ||
                'Failed to fetch all products',
            status: (error as ProductsError).status || 500,
        } as ProductsError;
    }
};
