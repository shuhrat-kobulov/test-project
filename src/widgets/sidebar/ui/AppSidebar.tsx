import { SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config';

const { Sider } = Layout;

export const AppSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            key: AppRoutes.HOME,
            icon: <ShoppingOutlined />,
            label: 'Products',
        },
        {
            key: AppRoutes.SEARCH,
            icon: <SearchOutlined />,
            label: 'Search',
        },
    ];

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="lg"
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'sticky',
                top: 0,
                left: 0,
            }}
        >
            <div
                style={{
                    height: '64px',
                    margin: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: collapsed ? '16px' : '20px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                }}
            >
                {collapsed ? 'TT' : 'Test Task'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={handleMenuClick}
            />
        </Sider>
    );
};
