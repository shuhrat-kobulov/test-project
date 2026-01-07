import { Card, message, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';
import { LoginForm } from '@/features/auth';
import type { AuthError } from '@/shared/api';
import { authCheck } from '@/shared/api';
import { AppRoutes } from '@/shared/config';

const { Title } = Typography;

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleLogin = async (
        username: string,
        password: string,
        subdomain: string
    ) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await authCheck({
                username,
                password,
                subdomain,
            });

            login(username, response.token, response.lifetime, subdomain);

            message.success(`Welcome, ${username}!`);

            navigate(AppRoutes.HOME);
        } catch (err) {
            const authError = err as AuthError;
            const errorMessage =
                authError.message || 'Login failed. Please try again.';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f0f2f5',
            }}
        >
            <Card
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Title
                    level={2}
                    style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    Login
                </Title>
                <LoginForm
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    error={error}
                />
            </Card>
        </div>
    );
};
