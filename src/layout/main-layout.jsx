import React from "react";
import { navData } from "./layout-data";
import {
  Button,
  Layout,
  Menu,
  Typography,
} from "antd";
import { Link, Navigate, Outlet } from "react-router-dom";
import { MenuIcon } from "../assets/icons/menu-icon";
import { loadState } from "../config/storage";
const { Header, Content, Sider } = Layout;

const item = navData.map((item) => {
  return {
    key: item.id,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: React.createElement(item.icon),
  };
});

export const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const accessToken = loadState("userData");
  if (!accessToken) {
    return <Navigate replace to={"/"} />
  }


  return (
    <div className="wrapper">
      <Layout style={{ height: "100%" }}>
        <Header>
          <Button style={{ backgroundColor: "transparent", border: "none", marginLeft: "200px" }} onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </Button>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={300}
            style={{minHeight: "calc(100vh - 64px)"}}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={item}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >


            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
