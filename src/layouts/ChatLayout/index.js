import { Outlet } from "react-router-dom";
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function EmptyLayout(props) {
    return (
        <Layout>
            <Header></Header>
            <Content>
                <Outlet />
            </Content>
            <Footer></Footer>
        </Layout>
    );
}

export default EmptyLayout;