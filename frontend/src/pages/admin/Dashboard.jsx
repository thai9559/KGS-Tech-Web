import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    i18n.changeLanguage(value);
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col justify-start relative">
      {/* Select ở góc trên cùng */}
      <div className="absolute top-4 right-4 z-10">
        <Select
          defaultValue={language}
          onChange={handleLanguageChange}
          className="mb-4"
          style={{ width: 120 }}
        >
          <Option value="vi">Tiếng Việt</Option>
          <Option value="en">English</Option>
          <Option value="ja">日本語</Option>
        </Select>
      </div>

      <div className="flex justify-center items-center px-4 py-8 mt-10">
        <div className="w-full max-w-7xl">
          {/* Căn giữa và responsive */}
          <Row gutter={[16, 16]} justify="center">
            {/* Quản lý thông tin công ty */}
            <Col xs={24} sm={12} md={8}>
              <Card
                title={t("dashboard.company_info")}
                bordered={false}
                className="shadow-lg"
                hoverable
              >
                <div className="flex items-center space-x-4">
                  <FileTextOutlined className="text-4xl text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t("dashboard.company_info")}
                    </h3>
                    <p>{t("dashboard.company_info_desc")}</p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Quản lý tài khoản và quyền */}
            <Col xs={24} sm={12} md={8}>
              <Card
                title={t("dashboard.account_management")}
                bordered={false}
                className="shadow-lg"
                hoverable
              >
                <div className="flex items-center space-x-4">
                  <UserOutlined className="text-4xl text-green-500" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {t("dashboard.account_management")}
                    </h3>
                    <p>{t("dashboard.account_management_desc")}</p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Quản lý blog */}
            <Col xs={24} sm={12} md={8}>
              <Card
                title={t("dashboard.blog_management")}
                bordered={false}
                className="shadow-lg"
                hoverable
              >
                <div className="flex items-center space-x-4">
                  <TeamOutlined className="text-4xl text-red-500" />
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
