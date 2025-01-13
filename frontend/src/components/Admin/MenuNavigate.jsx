import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, Tooltip } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const MenuNavigate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "company",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/company">Quản lý thông tin công ty</Link>,
    },
    {
      key: "account",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        { key: "users", label: <Link to="/admin/users">Người dùng</Link> },
        { key: "roles", label: <Link to="/admin/roles">Vai trò</Link> },
      ],
    },
    {
      key: "blog",
      icon: <AppstoreAddOutlined />,
      label: "Quản lý Blog",
      children: [
        { key: "blog-posts", label: <Link to="/admin/blog-posts">Bài viết</Link> },
        { key: "categories", label: <Link to="/admin/categories">Danh mục</Link> },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
      children: [
        { key: "general-settings", label: <Link to="/admin/general-settings">Cài đặt chung</Link> },
        { key: "branch-settings", label: <Link to="/admin/branch-settings">Cài đặt chi nhánh</Link> },
      ],
    },
    {
      key: "team",
      icon: <TeamOutlined />,
      label: <Link to="/admin/team">Quản lý đội ngũ</Link>,
    },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        style={{
          backgroundColor: "#001529",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Menu Header */}
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {!collapsed && "Quản lý"}
        </div>

        {/* Menu Items */}
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          defaultOpenKeys={["dashboard"]}
          style={{ flex: 1, overflowY: "auto" }} // Menu có thể cuộn
        />

        {/* Logout Button */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          {collapsed ? (
            <Tooltip title="Logout">
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                shape="circle"
                onClick={handleLogout}
              />
            </Tooltip>
          ) : (
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ width: "100%" }}
            >
              Logout
            </Button>
          )}
        </div>
      </Sider>

      {/* Content */}
      <Layout className="site-layout">
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuNavigate;
