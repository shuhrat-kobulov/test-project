import type { Product } from '@/shared/types';

export const searchProducts = (
    products: Product[],
    searchQuery: string
): Product[] => {
    // If search is empty, return the full list in original order
    if (!searchQuery.trim()) {
        return products;
    }

    const query = searchQuery.toLowerCase().trim();

    const matchedProducts: Array<{
        product: Product;
        startsWithQuery: boolean;
    }> = [];

    products.forEach((product) => {
        const productName = product.name?.toLowerCase();

        // Check if product name contains the search query
        if (productName && productName.includes(query)) {
            // Determine if it starts with the query (higher priority)
            const startsWithQuery = productName.startsWith(query);

            matchedProducts.push({
                product,
                startsWithQuery,
            });
        }
    });

    const sortedProducts = matchedProducts
        .sort((a, b) => {
            // If both start with query or both don't, preserve original order
            if (a.startsWithQuery === b.startsWithQuery) {
                return 0; // Maintain relative order
            }
            // Products starting with query come first
            return a.startsWithQuery ? -1 : 1;
        })
        .map((item) => item.product);

    return sortedProducts;
};

export const getSearchStats = (
    totalCount: number,
    filteredCount: number
): string => {
    if (filteredCount === totalCount) {
        return `Showing all ${totalCount} products`;
    }
    return `Found ${filteredCount} of ${totalCount} products`;
};
