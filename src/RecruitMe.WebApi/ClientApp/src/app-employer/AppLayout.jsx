import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/LeftNav/SideBar";
import {Layout} from "antd";
const {Content} = Layout;

const AppLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "gray",
              borderRadius: "red",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
