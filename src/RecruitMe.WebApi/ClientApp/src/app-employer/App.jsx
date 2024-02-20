import {ConfigProvider, App as AntdApp} from "antd";
import Router from "@/common/router/Router";
import {routers} from "./router/RouterConfig";
import Guard from "./router/Guard";
import "@/common/assets/styles/index.scss";

const App = () => {
  return (
    <ConfigProvider>
      <AntdApp style={{height: "100%"}}>
        <Router routes={routers}>
          <Guard></Guard>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
