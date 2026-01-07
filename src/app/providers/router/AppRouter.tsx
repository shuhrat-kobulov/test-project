import { Layout, Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';
import { AppRoutes } from '@/shared/config';
import { AppHeader } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

// Lazy load pages
const LoginPage = lazy(() =>
    import('@/pages/login').then((module) => ({ default: module.LoginPage }))
);
const NotFoundPage = lazy(() =>
    import('@/pages/not-found').then((module) => ({
        default: module.NotFoundPage,
    }))
);
const ProductsPage = lazy(() =>
    import('@/pages/products').then((module) => ({
        default: module.ProductsPage,
    }))
);
const SearchPage = lazy(() =>
    import('@/pages/search').then((module) => ({ default: module.SearchPage }))
);

const { Content } = Layout;

// Loading fallback component
const LoadingFallback = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}
    >
        <Spin size="large" />
    </div>
);

export const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    // If not authenticated, show only login page
    if (!isAuthenticated) {
        return (
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route
                        path={AppRoutes.LOGIN}
                        element={
                            <PublicOnlyRoute>
                                <LoginPage />
                            </PublicOnlyRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        );
    }

    // If authenticated, show protected routes
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Content style={{ padding: '24px', margin: 0 }}>
                    <div
                        style={{
                            background: '#fff',
                            padding: 24,
                            minHeight: 'calc(100vh - 134px)',
                            borderRadius: '8px',
                        }}
                    >
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route
                                    path={AppRoutes.HOME}
                                    element={
                                        <ProtectedRoute>
                                            <ProductsPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path={AppRoutes.SEARCH}
                                    element={
                                        <ProtectedRoute>
                                            <SearchPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path={AppRoutes.LOGIN}
                                    element={
                                        <PublicOnlyRoute>
                                            <LoginPage />
                                        </PublicOnlyRoute>
                                    }
                                />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
