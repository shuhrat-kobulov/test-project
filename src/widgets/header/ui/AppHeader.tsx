import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Typography, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';
import { AppRoutes } from '@/shared/config';

const { Header } = Layout;

export const AppHeader = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(AppRoutes.LOGIN);
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 24px',
                background: '#001529',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {user && (
                    <Typography.Text style={{ color: 'white' }}>
                        Welcome, {user}
                    </Typography.Text>
                )}
                <Dropdown
                    menu={{ items: menuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Avatar
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#1890ff',
                        }}
                        icon={<UserOutlined />}
                    />
                </Dropdown>
            </div>
        </Header>
    );
};
