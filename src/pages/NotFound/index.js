import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ENPOINT } from '~/constants/Enpoint.constant';

function NotFound() {
    const navigate = useNavigate()

    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Trang khoog tồn tại"
                extra={<Button onClick={() => navigate(ENPOINT.HOME)} type="primary">Quay lại trang chủ</Button>}
            />
        </>
    );
}

export default NotFound;