import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { ENPOINT } from '~/constants/Enpoint.constant.ts';


const { Sider } = Layout;
const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
};
const items = [
    {
        key: ENPOINT.SETTING_PROFILE,
        icon: <UserOutlined />,
        label: <Link to={ENPOINT.SETTING_PROFILE}>Profile</Link>
    },
    {
        key: ENPOINT.SETTING_CHANGE_PASSWORD,
        icon: <LockOutlined />,
        label: <Link to={ENPOINT.SETTING_CHANGE_PASSWORD}>Change password</Link>
    }
]

function SettingLayout() {

    const href = window.location.href;

    const [selected, setSelected] = useState(items[0].key)

    useEffect(() => {
        if (href.includes(ENPOINT.SETTING_PROFILE)) {
            setSelected(items.find((x) => x.key === ENPOINT.SETTING_PROFILE))
        } else if (href.includes(ENPOINT.SETTING_CHANGE_PASSWORD)) {
            setSelected(items.find((x) => x.key === ENPOINT.SETTING_CHANGE_PASSWORD))
        } else {
            setSelected(items[0].key)
        }
    }, [href])

    return (
        <Layout hasSider>
            <Sider style={siderStyle} theme='light'>
                <Menu theme="light" mode="vertical" defaultSelectedKeys={[selected]} items={items} />
            </Sider>
            <Layout>
                <Outlet />
            </Layout>
        </Layout>
    );
};
export default SettingLayout;