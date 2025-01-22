import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Typography, Button, Select, Drawer } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ActivityLogViewer from "./ActivityLogViewer";
import { decodeToken } from "../../utils/decodeToken";
import { useTranslation } from "react-i18next";

const { Sider, Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const MenuNavigate = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      if (!isNowMobile) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "vi";
    i18n.changeLanguage(savedLanguage);
    setLanguage(savedLanguage);
  }, [i18n]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = decodeToken(token);
      console.log(decoded);
      setUserName(decoded?.name || "User");
      setUserPermissions(decoded?.permissions || []);
    }
  }, []);

  const handleChangeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
  };

  // Các item menu với quyền yêu cầu
  const allMenuItems = [
    {
      key: "/admin/dashboard",
      icon: <HomeOutlined />,
      label: <Link to="/admin/dashboard">{t("dashboardAdmin")}</Link>,
      requiredPermissions: ["Dashboard"],
    },
    {
      key: "/admin/company",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/company">{t("manageCompany")}</Link>,
      requiredPermissions: ["Company"],
    },
    {
      key: "account",
      icon: <UserOutlined />,
      label: t("accountManagement"),
      requiredPermissions: ["Users"],
      children: [
        {
          key: "/admin/users",
          label: <Link to="/admin/users">{t("users")}</Link>,
          requiredPermissions: ["Users"],
        },
        {
          key: "/admin/users/roles",
          label: <Link to="/admin/users/roles">{t("roles")}</Link>,
          requiredPermissions: ["Roles"],
        },
      ],
    },
    {
      key: "blog",
      icon: <AppstoreAddOutlined />,
      label: t("blogManagement"),
      requiredPermissions: ["Blogs", "Full admin privileges"],
      children: [
        {
          key: "/admin/bloglist",
          label: <Link to="/admin/bloglist">{t("articles")}</Link>,
          requiredPermissions: ["Blogs", "Full admin privileges"],
        },
        {
          key: "/admin/blog/categories",
          label: <Link to="/admin/blog/categories">{t("categories")}</Link>,
          requiredPermissions: ["Blogs", "Full admin privileges"],
        },
        {
          key: "/admin/blog/tags",
          label: <Link to="/admin/blog/tags">{t("tagManagement")}</Link>,
          requiredPermissions: ["Blogs", "Full admin privileges"],
        },
      ],
    },
    {
      key: "feedback",
      icon: <MessageOutlined />,
      label: t("feedbackManagement"),
      requiredPermissions: ["Feedback", "Full admin privileges"],
      children: [
        {
          key: "/admin/feedback",
          label: <Link to="/admin/feedback">{t("feedback")}</Link>,
          requiredPermissions: ["Feedback", "Full admin privileges"],
        },
      ],
    },
  ];

  // Lọc các item menu theo quyền người dùng
  const filterMenuItems = (items, permissions) => {
    // Kiểm tra nếu người dùng có quyền "Full admin privileges"
    if (permissions.includes("Full admin privileges")) {
      return items; // Trả về tất cả menu nếu có quyền này
    }

    // Lọc menu
    return items
      .filter((item) => {
        // Cho phép tất cả truy cập Dashboard
        if (item.key === "/admin/dashboard") return true;

        if (!item.requiredPermissions) return true; // Nếu item không yêu cầu quyền, hiển thị luôn

        return item.requiredPermissions.some((perm) =>
          permissions.includes(perm)
        ); // Kiểm tra quyền
      })
      .map((item) =>
        item.children
          ? { ...item, children: filterMenuItems(item.children, permissions) } // Lọc children của item
          : item
      );
  };

  const filteredMenuItems = filterMenuItems(allMenuItems, userPermissions);

  const renderFooter = (isMobile, collapsed) => (
    <div
      style={{
        padding: collapsed ? "8px" : "16px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column", // Sử dụng Flexbox để xếp các phần tử theo cột
        gap: "8px", // Khoảng cách giữa các phần tử
      }}
    >
      {/* Hiển thị Select với nội dung khác nhau dựa trên trạng thái collapsed */}
      <Select
        value={language}
        onChange={handleChangeLanguage}
        style={{
          width: collapsed ? "70px" : "100%",
          textAlign: "center",
          margin: "0 auto", // Giữ Select nằm giữa
        }}
      >
        {collapsed ? (
          <>
            <Option value="vi">VI</Option>
            <Option value="en">EN</Option>
            <Option value="ja">JA</Option>
          </>
        ) : (
          <>
            <Option value="vi">{t("Tiếng Việt")}</Option>
            <Option value="en">{t("English")}</Option>
            <Option value="ja">{t("日本語")}</Option>
          </>
        )}
      </Select>

      {/* Hiển thị Logout */}
      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
          width: collapsed ? "70px" : "100%",
          margin: "0 auto", // Giữ nút nằm giữa
        }}
      >
        {!collapsed && t("logout")}
      </Button>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {isMobile && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setMenuVisible(true)}
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        />
      )}
      <Drawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        placement="left"
        bodyStyle={{ padding: 0 }}
        closeIcon={null}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #e8e8e8",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="flex flex-row items-center justify-between"
            style={{ textAlign: "center", flex: 1 }}
          >
            <div className="flex flex-col">
              <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              <Text
                className="text-center"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                {userName}
              </Text>
            </div>

            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setMenuVisible(false)}
            />
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={filteredMenuItems}
          style={{
            padding: "16px 0",
            backgroundColor: "#ffffff",
          }}
        />

        {renderFooter(true)}
      </Drawer>

      {/* Hiển thị Sider trên màn hình lớn */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          width={350}
          collapsedWidth={110}
          style={{
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #e8e8e8",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: collapsed ? "8px" : "16px",
            }}
          >
            <Avatar
              size={collapsed ? 40 : 80}
              style={{
                backgroundColor: "#1890ff",
                marginBottom: "8px",
              }}
            >
              {userName.charAt(0)}
            </Avatar>
            {!collapsed && (
              <Text
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {userName}
              </Text>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={filteredMenuItems}
            style={{
              backgroundColor: "#ffffff",
            }}
          />
          {renderFooter(false, collapsed)}
        </Sider>
      )}

      <Layout>
        <Content
          style={{
            // margin: "16px",
            // padding: "24px",
            backgroundColor: "#ffffff",
          }}
        >
          <ActivityLogViewer />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuNavigate;
