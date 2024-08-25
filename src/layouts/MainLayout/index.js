import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import HeaderLayout from "~/components/HeaderLayout";
import clsx from "clsx";

import styles from "./MainLayout.module.scss"
import FooterLayout from "~/components/Footer";

const { Content } = Layout;


function MainLayout(props) {
    return (
        <Layout>
            <div className={clsx(styles['main-content'])}>
                <HeaderLayout></HeaderLayout>
                <Content>
                    <Outlet />
                </Content>
            </div>
            <FooterLayout />
        </Layout>
    );
}

export default MainLayout;