import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth';
import { AppRoutes } from '@/shared/config';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button
                    type="primary"
                    onClick={() =>
                        navigate(
                            isAuthenticated ? AppRoutes.HOME : AppRoutes.LOGIN
                        )
                    }
                >
                    {isAuthenticated ? 'Back to Home' : 'Go to Login'}
                </Button>
            }
        />
    );
};
