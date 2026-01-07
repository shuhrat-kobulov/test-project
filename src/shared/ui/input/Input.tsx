import { Input as AntInput } from 'antd';
import type { InputProps } from 'antd';
import type { FC } from 'react';

interface CustomInputProps extends InputProps {
    label?: string;
    error?: string;
}

export const Input: FC<CustomInputProps> = ({ label, error, ...props }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        color: '#262626',
                    }}
                >
                    {label}
                </label>
            )}
            <AntInput
                {...props}
                status={error ? 'error' : undefined}
                style={{ height: '40px', ...props.style }}
            />
            {error && (
                <span
                    style={{
                        display: 'block',
                        marginTop: '0.25rem',
                        fontSize: '14px',
                        color: '#ff4d4f',
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
};
