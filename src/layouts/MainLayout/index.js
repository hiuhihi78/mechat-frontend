import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import HeaderLayout from "~/components/HeaderLayout";
import clsx from "clsx";

import styles from "./MainLayout.module.scss"

const { Footer, Content } = Layout;


function MainLayout(props) {
    return (
        <Layout>
            <div className={clsx(styles['main-content'])}>
                <HeaderLayout></HeaderLayout>
                <Content>
                    <Outlet />
                </Content>
            </div>
            <Footer>hihi</Footer>
        </Layout>
    );
}

export default MainLayout;