import {ConfigProvider, App as AntdApp} from "antd";
import Router from "@/common/router/Router";
import {routers} from "./router/RouterConfig";
import Guard from "./router/Guard";
import TableEmpty from "@/common/components/table-empty/TableEmpty";
import "@/common/assets/styles/index.scss";

const App = () => {
  const renderEmpty = (name) => {
    if (name === "Table") return <TableEmpty />;
  };

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <AntdApp style={{height: "100%"}}>
        <Router routes={routers}>
          <Guard></Guard>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
