import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlogTable from "./BlogTable";
import { CREATEBLOG } from "../../../utils/config";

const BlogManagement = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("blog_table.header.title")}</h1>
        <Link to={CREATEBLOG}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t("blog_table.header.create_button")}
          </Button>
        </Link>
      </div>
      <BlogTable />
    </div>
  );
};

export default BlogManagement;
