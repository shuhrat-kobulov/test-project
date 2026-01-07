import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';
import { AppRoutes } from '@/shared/config';

interface PublicOnlyRouteProps {
    children: ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={AppRoutes.HOME} replace />;
    }

    return <>{children}</>;
};
