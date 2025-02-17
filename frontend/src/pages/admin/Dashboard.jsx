import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  FormOutlined,
  CommentOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { decodeToken } from "../../utils/decodeToken";

const { Title } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Lấy và decode token từ localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = decodeToken(token);
      setPermissions(decoded.permissions || []);
    }
  }, []);

  // Hàm kiểm tra quyền
  const hasPermission = (requiredPermissions) => {
    if (permissions.includes("Full admin privileges")) {
      return true;
    }
    return requiredPermissions.some((perm) => permissions.includes(perm));
  };

  const cardStyles = {
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const hoverStyles = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="p-4 min-h-screen ">
      <Title level={2} className="text-center sm:text-left mb-6">
        {t("dashboard.title")}
      </Title>
      <Row gutter={[24, 24]}>
        {/* Quản lý công ty */}
        {hasPermission(["Company"]) && (
          <Col xs={24} md={12} lg={8}>
            <Card
              style={cardStyles}
              hoverable
              onHover={(e) => (e.target.style = hoverStyles)}
              bodyStyle={{
                backgroundColor: "#e3f2fd",
                padding: "20px",
                border: "none",
              }}
            >
              <FileTextOutlined
                style={{
                  fontSize: "48px",
                  color: "#1976d2",
                  marginBottom: "16px",
                }}
              />
              <Title level={4}>{t("dashboard.company_management")}</Title>
              <Button type="link">
                <Link to="/admin/company">{t("dashboard.company_list")}</Link>
              </Button>
            </Card>
          </Col>
        )}

        {/* Quản lý tài khoản */}
        {hasPermission(["Users", "Roles"]) && (
          <Col xs={24} md={12} lg={8}>
            <Card
              style={cardStyles}
              hoverable
              bodyStyle={{
                backgroundColor: "#e8f5e9",
                padding: "20px",
                border: "none",
              }}
            >
              <TeamOutlined
                style={{
                  fontSize: "48px",
                  color: "#43a047",
                  marginBottom: "16px",
                }}
              />
              <Title level={4}>{t("dashboard.account_management")}</Title>
              {hasPermission(["Users"]) && (
                <Button type="link">
                  <Link to="/admin/users">{t("dashboard.user_list")}</Link>
                </Button>
              )}
              {hasPermission(["Roles"]) && (
                <Button type="link">
                  <Link to="/admin/users/roles">
                    {t("dashboard.role_list")}
                  </Link>
                </Button>
              )}
            </Card>
          </Col>
        )}

        {/* Quản lý Blog */}
        {hasPermission(["Blogs"]) && (
          <Col xs={24} md={12} lg={8}>
            <Card
              style={cardStyles}
              hoverable
              bodyStyle={{
                backgroundColor: "#f3e5f5",
                padding: "20px",
                border: "none",
              }}
            >
              <FormOutlined
                style={{
                  fontSize: "48px",
                  color: "#8e24aa",
                  marginBottom: "16px",
                }}
              />
              <Title level={4}>{t("dashboard.blog_management")}</Title>
              <Button type="link">
                <Link to="/admin/bloglist">{t("dashboard.blog_list")}</Link>
              </Button>
              <Button type="link">
                <Link to="/admin/blog/categories">
                  {t("dashboard.category_list")}
                </Link>
              </Button>
            </Card>
          </Col>
        )}

        {/* Quản lý Feedback */}
        {hasPermission(["Feedback"]) && (
          <Col xs={24} md={12} lg={8}>
            <Card
              style={cardStyles}
              hoverable
              bodyStyle={{
                backgroundColor: "#fff3e0",
                padding: "20px",
                border: "none",
              }}
            >
              <CommentOutlined
                style={{
                  fontSize: "48px",
                  color: "#ff6f00",
                  marginBottom: "16px",
                }}
              />
              <Title level={4}>{t("dashboard.feedback_management")}</Title>
              <Button type="link">
                <Link to="/admin/feedback">{t("dashboard.feedback_list")}</Link>
              </Button>
            </Card>
          </Col>
        )}
        {hasPermission(["Recruiment"]) && (
          <Col xs={24} md={12} lg={8}>
            <Card
              style={cardStyles}
              hoverable
              bodyStyle={{
                backgroundColor: "#ffddff",
                padding: "20px",
                border: "none",
              }}
            >
              <AppstoreAddOutlined
                style={{
                  fontSize: "48px",
                  color: "#ff6f00",
                  marginBottom: "16px",
                }}
              />
              <Title level={4}>{t("recruitmentManagement")}</Title>
              <Button type="link">
                <Link to="/admin/recruiment">{t("recruitment")}</Link>
              </Button>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
