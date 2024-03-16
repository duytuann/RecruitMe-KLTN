import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/LeftNav/SideBar";
import {Layout} from "antd";
import {useLoading} from "@/common/context/useLoading";
import LazyLoading from "../common/components/lazy-loading/LazyLoading";
const {Content} = Layout;

const AppLayout = () => {
  const {isLoading} = useLoading();

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <SideBar />
          <Layout>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: "100vh",
                background: "rgba(20, 160, 119, 0.01)",
              }}
            >
              <div className="px-3">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      {isLoading && <LazyLoading />}
    </>
  );
};

export default AppLayout;
