import React from "react";
import { Card, Row, Col } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  FormOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 min-h-screen">
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
            <Link
              to="/admin/company"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.company_list")}
            </Link>
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
            <Link
              to="/admin/users"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.user_list")}
            </Link>
            <br />
            <Link
              to="/admin/users/roles"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.role_list")}
            </Link>
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
            <Link
              to="/admin/bloglist"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.blog_list")}
            </Link>
            <br />
            <Link
              to="/admin/blog/categories"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.category_list")}
            </Link>
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
            <Link
              to="/admin/feedback"
              className="cursor-pointer text-sm sm:text-base text-blue-500 hover:underline"
            >
              {t("dashboard.feedback_list")}
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
