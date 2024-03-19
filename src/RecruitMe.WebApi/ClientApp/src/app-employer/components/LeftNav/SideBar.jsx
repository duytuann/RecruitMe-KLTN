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
import {useNavigate} from "react-router";
import {useState} from "react";
import styles from "./SideBar.module.scss";

const items = [
  {label: "Dashboard", icon: <DashboardOutlined />, key: "/"},
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
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState([]);

  const menuClick = (info) => {
    setSelectedKey([info.key]);
    navigate(`/${info.key}`);
  };

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
        selectedKeys={selectedKey}
        defaultOpenKeys={["sub1"]}
        className={styles.leftNav}
        items={items}
        onClick={menuClick}
      />
    </Sider>
  );
};

export default SideBar;
