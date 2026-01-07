/**
 * Product type definitions for the variations API
 */
export interface Product {
    id: number;
    sku: string;
    name: string;
    supplier: string;
    supplierId: number;
    barcode: string;
    lastUpdateTime: string;
    showMarket: boolean;
}

export interface ProductsResponse {
    page: number;
    items: Product[];
    total_count: number;
}

export interface ProductsQueryParams {
    size: number;
    page: number;
}

export interface ProductsError {
    message: string;
    status: number;
}
