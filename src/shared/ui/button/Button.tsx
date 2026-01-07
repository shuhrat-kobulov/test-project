import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = (props) => {
    return <AntButton {...props} />;
};
