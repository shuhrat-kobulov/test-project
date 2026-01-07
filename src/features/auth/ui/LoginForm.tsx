import { Button } from 'antd';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '@/shared/ui';

interface LoginFormProps {
    onSubmit: (username: string, password: string, subdomain: string) => void;
    isLoading?: boolean;
    error?: string;
}

export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
        subdomain?: string;
    }>({});

    const validateForm = () => {
        const newErrors: {
            username?: string;
            password?: string;
            subdomain?: string;
        } = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (!subdomain.trim()) {
            newErrors.subdomain = 'Subdomain is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(username, password, subdomain);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div
                    style={{
                        padding: '12px',
                        marginBottom: '16px',
                        backgroundColor: '#fff2f0',
                        border: '1px solid #ffccc7',
                        borderRadius: '6px',
                        color: '#ff4d4f',
                    }}
                >
                    {error}
                </div>
            )}

            <Input
                label="Subdomain"
                placeholder="Enter your company subdomain"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                error={errors.subdomain}
            />

            <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />

            <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoading}
                style={{ marginTop: '1rem' }}
            >
                Submit
            </Button>
        </form>
    );
};
