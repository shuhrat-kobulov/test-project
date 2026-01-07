import { Table, Card, Typography, Alert, Spin, Select } from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers/auth';
import { fetchProducts } from '@/shared/api';
import type { Product, ProductsError } from '@/shared/types';

const { Title } = Typography;
const { Option } = Select;

export const ProductsPage = () => {
    const { token, subdomain } = useAuth();

    // State for products data
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);

    const loadProducts = async () => {
        if (!token || !subdomain) {
            setError('Missing authentication data. Please log in again.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetchProducts(subdomain, token, {
                page: currentPage,
                size: pageSize,
            });

            setProducts(response.items);
            setTotalCount(response.total_count);
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

    // Fetch products when component mounts or pagination changes
    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.pageSize && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrentPage(1);
        } else if (pagination.current) {
            setCurrentPage(pagination.current);
        }
    };

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
        setCurrentPage(1);
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
            width: 200,
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
            title: 'Supplier ID',
            dataIndex: 'supplierId',
            key: 'supplierId',
            width: 120,
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            width: 150,
        },
        {
            title: 'Last Update',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            width: 180,
            render: (date: string) => {
                try {
                    return new Date(date).toLocaleString();
                } catch {
                    return date;
                }
            },
        },
        {
            title: 'Show Market',
            dataIndex: 'showMarket',
            key: 'showMarket',
            width: 120,
            render: (value: boolean) => (value ? 'Yes' : 'No'),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px',
                    }}
                >
                    <Title level={2} style={{ margin: 0 }}>
                        Products
                    </Title>

                    {/* Page size selector */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <span>Items per page:</span>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            style={{ width: 100 }}
                        >
                            <Option value={20}>20</Option>
                            <Option value={40}>40</Option>
                            <Option value={80}>80</Option>
                            <Option value={120}>120</Option>
                        </Select>
                    </div>
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
                        style={{ marginBottom: '16px' }}
                    />
                )}

                {/* Loading spinner for initial load without data */}
                {loading && products.length === 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '400px',
                            height: '100%',
                        }}
                    >
                        <Spin size="large" tip="Loading products..." />
                    </div>
                ) : (
                    <Table<Product>
                        columns={columns}
                        dataSource={products}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: totalCount,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                            showSizeChanger: false,
                        }}
                        onChange={handleTableChange}
                        scroll={{ x: 1200 }}
                        locale={{
                            emptyText: error
                                ? 'No data available due to error'
                                : 'No products found',
                        }}
                    />
                )}
            </Card>
        </div>
    );
};
