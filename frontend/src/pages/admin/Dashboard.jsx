import React from "react";
import { Card, Row, Col } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  FormOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        {t("dashboard.title")}
      </h1>
      <Row gutter={[16, 16]}>
        {/* Quản lý công ty */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <FileTextOutlined className="mr-2 text-lg sm:text-xl text-blue-500" />
                <span className="text-base sm:text-lg font-medium">
                  {t("dashboard.company_management")}
                </span>
              </div>
            }
            className="shadow-md h-full"
          >
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/company")}
            >
              {t("dashboard.company_list")}
            </p>
          </Card>
        </Col>

        {/* Quản lý tài khoản */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <TeamOutlined className="mr-2 text-lg sm:text-xl text-green-500" />
                <span className="text-base sm:text-lg font-medium">
                  {t("dashboard.account_management")}
                </span>
              </div>
            }
            className="shadow-md h-full"
          >
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/users")}
            >
              {t("dashboard.user_list")}
            </p>
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/users/roles")}
            >
              {t("dashboard.role_list")}
            </p>
          </Card>
        </Col>

        {/* Quản lý Blog */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <FormOutlined className="mr-2 text-lg sm:text-xl text-purple-500" />
                <span className="text-base sm:text-lg font-medium">
                  {t("dashboard.blog_management")}
                </span>
              </div>
            }
            className="shadow-md h-full"
          >
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/bloglist")}
            >
              {t("dashboard.blog_list")}
            </p>
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/blog/categories")}
            >
              {t("dashboard.category_list")}
            </p>
          </Card>
        </Col>

        {/* Quản lý Feedback */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <CommentOutlined className="mr-2 text-lg sm:text-xl text-orange-500" />
                <span className="text-base sm:text-lg font-medium">
                  {t("dashboard.feedback_management")}
                </span>
              </div>
            }
            className="shadow-md h-full"
          >
            <p
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
              onClick={() => handleNavigation("/admin/feedback")}
            >
              {t("dashboard.feedback_list")}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
