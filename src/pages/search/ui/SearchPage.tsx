import { SearchOutlined } from '@ant-design/icons';
import { Alert, Card, Input, Space, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/app/providers/auth';
import { fetchAllProducts } from '@/shared/api';
import { getSearchStats, searchProducts } from '@/shared/lib';
import type { Product, ProductsError } from '@/shared/types';

const { Title, Text } = Typography;

export const SearchPage = () => {
    const { token, subdomain } = useAuth();

    // State for all products (fetched once)
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);

    const loadAllProducts = async () => {
        if (!token || !subdomain) {
            setError('Missing authentication data. Please log in again.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const products = await fetchAllProducts(subdomain, token, {
                page: currentPage,
                size: pageSize,
            });
            setAllProducts(products.items);
            setTotalCount(products.total_count);
        } catch (err) {
            const productError = err as ProductsError;

            // Handle token expiration or authentication errors
            if (productError.status === 401 || productError.status === 403) {
                setError(
                    'Your session has expired or you are not authorized. Please log in again.'
                );
            } else {
                setError(
                    productError.message ||
                        'Failed to load products. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]);

    const filteredProducts = useMemo(() => {
        return searchProducts(allProducts, searchQuery);
    }, [allProducts, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    const columns: ColumnsType<Product> = [
        {
            title: '№',
            key: 'index',
            width: 60,
            render: (_text, _record, index) => {
                return (currentPage - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            render: (name: string) => {
                if (!searchQuery.trim()) {
                    return name;
                }

                // Case-insensitive highlighting
                const query = searchQuery.toLowerCase();
                const lowerName = name.toLowerCase();
                const startIndex = lowerName.indexOf(query);

                if (startIndex === -1) {
                    return name;
                }

                // Split the name into parts and highlight the match
                const beforeMatch = name.substring(0, startIndex);
                const match = name.substring(
                    startIndex,
                    startIndex + searchQuery.length
                );
                const afterMatch = name.substring(
                    startIndex + searchQuery.length
                );

                return (
                    <span>
                        {beforeMatch}
                        <span
                            style={{
                                backgroundColor: '#ffd666',
                                fontWeight: 'bold',
                            }}
                        >
                            {match}
                        </span>
                        {afterMatch}
                    </span>
                );
            },
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: 150,
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
            width: 200,
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            width: 150,
        },
    ];

    // Get search statistics
    const searchStats = useMemo(
        () => getSearchStats(totalCount, filteredProducts.length),
        [totalCount, filteredProducts.length]
    );

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%' }}
                >
                    {/* Header */}
                    <div>
                        <Title level={2} style={{ marginBottom: '8px' }}>
                            Product Search
                        </Title>
                        <Text type="secondary">
                            Search products by name. Results are filtered and
                            sorted instantly as you type.
                        </Text>
                    </div>

                    {/* Error message display */}
                    {error && (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            onClose={() => setError('')}
                        />
                    )}

                    {/* Search input */}
                    <div>
                        <Input
                            size="large"
                            placeholder="Search products by name (e.g., Olma, Ananas, Nok)"
                            prefix={<SearchOutlined />}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            disabled={loading || !!error}
                            allowClear
                            style={{ maxWidth: '600px' }}
                        />
                    </div>

                    {/* Search statistics */}
                    {!loading && !error && allProducts.length > 0 && (
                        <div>
                            <Text type="secondary">{searchStats}</Text>
                            {searchQuery && filteredProducts.length === 0 && (
                                <Text
                                    type="warning"
                                    style={{ marginLeft: '16px' }}
                                >
                                    No products match your search
                                </Text>
                            )}
                        </div>
                    )}

                    {/* Loading spinner for initial data load */}
                    {loading ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '400px',
                            }}
                        >
                            <Spin size="large" tip="Loading products..." />
                        </div>
                    ) : (
                        <Table<Product>
                            columns={columns}
                            dataSource={filteredProducts}
                            rowKey="id"
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: totalCount,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} of ${total} items`,
                                showSizeChanger: true,
                                pageSizeOptions: [20, 40, 80, 120],
                                onChange: (page, newPageSize) => {
                                    setCurrentPage(page);
                                    if (newPageSize !== pageSize) {
                                        setPageSize(newPageSize);
                                        setCurrentPage(1);
                                    }
                                },
                            }}
                            scroll={{ x: 1000 }}
                            locale={{
                                emptyText: error
                                    ? 'No data available due to error'
                                    : searchQuery
                                      ? 'No products match your search'
                                      : 'No products available',
                            }}
                        />
                    )}
                </Space>
            </Card>
        </div>
    );
};
