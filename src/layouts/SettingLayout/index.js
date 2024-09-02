import React, { useLayoutEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import { Card, Layout, Menu } from 'antd';

import { ENPOINT } from '~/constants/Enpoint.constant.ts';
import styles from "./SettingLayout.module.scss"
import clsx from 'clsx';

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
        title: 'Profile',
        key: ENPOINT.SETTING_PROFILE,
        icon: <UserOutlined />,
        label: <Link to={ENPOINT.SETTING_PROFILE}>Profile</Link>,
    },
    {
        title: 'Change password',
        key: ENPOINT.SETTING_CHANGE_PASSWORD,
        icon: <LockOutlined />,
        label: <Link to={ENPOINT.SETTING_CHANGE_PASSWORD}>Change password</Link>,
    }
]

function SettingLayout({ children }) {

    const href = window.location.href;

    const [selected, setSelected] = useState(items[0].key)

    useLayoutEffect(() => {
        if (href.includes(ENPOINT.SETTING_PROFILE)) {
            setSelected(ENPOINT.SETTING_PROFILE)
        } else if (href.includes(ENPOINT.SETTING_CHANGE_PASSWORD)) {
            setSelected(ENPOINT.SETTING_CHANGE_PASSWORD)
        } else {
            setSelected(items[0].key)
        }
    }, [href])

    return (
        <>
            <Layout hasSider>
                <Sider style={siderStyle} theme='light'>
                    <Menu theme="light" mode="vertical" defaultSelectedKeys={[selected]} items={items} />
                </Sider>
                <Layout>
                    <Card className={clsx(styles.content)} title={items.find((x) => x.key === selected)?.title}>
                        {children}
                    </Card>
                </Layout>
            </Layout>
        </>

    );
};
export default SettingLayout;