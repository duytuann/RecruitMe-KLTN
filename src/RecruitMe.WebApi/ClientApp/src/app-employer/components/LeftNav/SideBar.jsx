import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {
  DashboardOutlined,
  UserOutlined,
  FileAddOutlined,
  ProfileOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
  ToolOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const items = [
  {label: "Dashboard", icon: <DashboardOutlined />, key: "dashboard"},
  {label: "Profile", icon: <UserOutlined />, key: "profile"},
  {label: "Jobs", icon: <FileAddOutlined />, key: "jobs"},
  {label: "Candidates", icon: <ProfileOutlined />, key: "candidates"},
  {label: "Interviews", icon: <CalendarOutlined />, key: "interviews"},
  {label: "Analytics", icon: <BarChartOutlined />, key: "analytics"},
  {label: "Tools", icon: <ToolOutlined />, key: "tools"},
  {label: "Messages", icon: <MessageOutlined />, key: "messages"},
  {label: "Settings", icon: <TeamOutlined />, key: "settings"},
];

const SideBar = () => {
  return (
    <Sider
      width={200}
      style={{
        background: "#fff",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
