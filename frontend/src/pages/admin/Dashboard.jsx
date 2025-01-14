import React, { useState } from "react";
import { Card, Col, Row, Select, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LOCAL, LOGIN } from "../../utils/config";

const { Option } = Select;

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );
  const [isLoading, setIsLoading] = useState(false); // Trạng thái Loading
  const navigate = useNavigate();

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    i18n.changeLanguage(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    message.success(t("dashboard.logout_success"));
    window.location.href = LOGIN; // Điều hướng về trang login
  };

  const handleNavigation = (path) => {
    setIsLoading(true); // Bắt đầu hiển thị Loading
    setTimeout(() => {
      navigate(path); // Chuyển hướng sau thời gian loading
      setIsLoading(false); // Tắt Loading sau khi chuyển hướng
    }, 300); // Loading tối thiểu là 300ms
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col justify-start relative">
      {/* Hiển thị Loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <Select
          defaultValue={language}
          onChange={handleLanguageChange}
          className="w-30 sm:w-40"
          style={{ minWidth: "100px" }}
        >
          <Option value="vi">Tiếng Việt</Option>
          <Option value="en">English</Option>
          <Option value="ja">日本語</Option>
        </Select>
        <Button type="primary" danger onClick={handleLogout}>
          {t("dashboard.logout")}
        </Button>
      </div>

      <div className="flex justify-center items-center px-4 py-8 mt-16 sm:mt-10">
        <div className="w-full max-w-7xl">
          <Row gutter={[16, 16]} justify="center" align="top">
            {/* Navigation Card */}
            <Col xs={24} sm={12} md={8}>
              <Card
                bordered={false}
                className="shadow-lg h-full flex flex-col justify-center"
                style={{ minHeight: "150px", cursor: "pointer" }}
                hoverable
                onClick={() => handleNavigation("/admin/company")}
              >
                <div className="flex items-center space-x-4">
                  <FileTextOutlined className="text-3xl text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t("dashboard.company_info")}
                    </h3>
                    <p>{t("dashboard.company_info_desc")}</p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* User Management */}
            <Col xs={24} sm={12} md={8}>
              <Card
                bordered={false}
                className="shadow-lg h-full flex flex-col justify-center"
                style={{ minHeight: "150px", cursor: "pointer" }}
                hoverable
                onClick={() => handleNavigation("/admin/users")}
              >
                <div className="flex items-center space-x-4">
                  <UserOutlined className="text-3xl text-green-500" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t("dashboard.account_management")}
                    </h3>
                    <p>{t("dashboard.account_management_desc")}</p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Blog Management */}
            <Col xs={24} sm={12} md={8}>
              <Card
                bordered={false}
                className="shadow-lg h-full flex flex-col justify-center"
                style={{ minHeight: "150px", cursor: "pointer" }}
                hoverable
                onClick={() => handleNavigation("/admin/bloglist")}
              >
                <div className="flex items-center space-x-4">
                  <TeamOutlined className="text-3xl text-red-500" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t("dashboard.blog_management")}
                    </h3>
                    <p>{t("dashboard.blog_management_desc")}</p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
