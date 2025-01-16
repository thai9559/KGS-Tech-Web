import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Tooltip, Select } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Sider, Content } = Layout;
const { Option } = Select;

const MenuNavigate = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Lấy ngôn ngữ từ localStorage hoặc thiết lập mặc định
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "vi"
  );

  // Cập nhật ngôn ngữ
  const handleChangeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value); // Đổi ngôn ngữ
    localStorage.setItem("lang", value); // Lưu vào localStorage
  };

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
      key: "/admin/dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/admin/dashboard">{t("dashboardAdmin")}</Link>,
    },
    {
      key: "/admin/company",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/company">{t("manageCompany")}</Link>,
    },
    {
      key: "account",
      icon: <UserOutlined />,
      label: t("accountManagement"),
      children: [
        {
          key: "/admin/users",
          label: <Link to="/admin/users">{t("users")}</Link>,
        },
        {
          key: "/admin/users/roles",
          label: <Link to="/admin/users/roles">{t("roles")}</Link>,
        },
      ],
    },
    {
      key: "blog",
      icon: <AppstoreAddOutlined />,
      label: t("blogManagement"),
      children: [
        {
          key: "/admin/bloglist",
          label: <Link to="/admin/bloglist">{t("articles")}</Link>,
        },
        {
          key: "/admin/blog/categories",
          label: <Link to="/admin/blog/categories">{t("categories")}</Link>,
        },
      ],
    },
    {
      key: "feedback",
      icon: <AppstoreAddOutlined />,
      label: t("feedbackManagement"),
      children: [
        {
          key: "/admin/feedback",
          label: <Link to="/admin/feedback">{t("articles")}</Link>,
        },
      ],
    },
  ];

  const selectedKey = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {!collapsed && t("manage")}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          style={{ flex: 1, overflowY: "auto" }}
        />

        <div style={{ padding: "16px", textAlign: "center" }}>
          {collapsed ? (
            <Tooltip title={t("logout")}>
              <Link to="/admin/login" onClick={handleLogout}>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  shape="circle"
                />
              </Link>
            </Tooltip>
          ) : (
            <Link to="/admin/login" onClick={handleLogout}>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                style={{ width: "100%" }}
              >
                {t("logout")}
              </Button>
            </Link>
          )}
        </div>

        {/* Select Language */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Select
            value={language}
            onChange={handleChangeLanguage}
            style={{ width: collapsed ? "auto" : "100%" }}
          >
            <Option value="en">English</Option>
            <Option value="ja">日本語</Option>
            <Option value="vi">Tiếng Việt</Option>
          </Select>
        </div>
      </Sider>

      <Layout className="site-layout">
        <Content
          style={{ margin: "16px", padding: "24px", background: "#fff" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuNavigate;
