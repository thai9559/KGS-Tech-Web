import React from "react";
import { Button, Space, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../redux/api/blogApi";

import { useGetActivityLogsQuery } from "../../../redux/api/activityLogApi";
const BlogTableActions = ({ record }) => {
  const { t } = useTranslation();
  const [deleteBlog] = useDeleteBlogMutation();
  const { refetch } = useGetBlogsQuery();
  const { refetch: refetching } = useGetActivityLogsQuery();
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      message.success(t("blog_table.messages.delete_success"));
      refetch();
      refetching();
    } catch (error) {
      message.error(t("blog_table.messages.delete_fail"));
    }
  };

  return (
    <Space>
      <Link to={`/admin/blog/edit-blog/${record.id}`}>
        <Button type="primary" icon={<EditOutlined />}>
          {t("blog_table.actions.edit")}
        </Button>
      </Link>

      <Popconfirm
        title={t("blog_table.confirm.delete_title")}
        onConfirm={() => handleDelete(record.id)}
        okText={t("blog_table.confirm.delete_ok")}
        cancelText={t("blog_table.confirm.delete_cancel")}
      >
        <Button danger type="primary" icon={<DeleteOutlined />}>
          {t("blog_table.actions.delete")}
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default BlogTableActions;
