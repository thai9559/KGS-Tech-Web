import React from "react";
import { Table, Button, Space, Popconfirm, message, Switch } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n hook
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateVisibilityMutation,
} from "../../../redux/api/blogApi";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { CREATEBLOG } from "../../../utils/config";
import { useGetActivityLogsQuery } from "../../../redux/api/activityLogApi";
const BlogTable = () => {
  const { t } = useTranslation(); // Initialize translation
  const { data: blogsData, isLoading } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [updateVisibility] = useUpdateVisibilityMutation();
  const { refetch } = useGetActivityLogsQuery();
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      message.success(t("blog_table.messages.delete_success"));
      refetch();
    } catch (error) {
      message.error(t("blog_table.messages.delete_fail"));
    }
  };

  const handleVisibilityToggle = async (id, isVisible) => {
    try {
      const response = await updateVisibility({
        id,
        is_visible: isVisible,
      }).unwrap();
      message.success(response.message);
      refetch();
    } catch (error) {
      console.error(error);
      message.error(t("blog_table.messages.update_visibility_fail"));
    }
  };

  const columns = [
    {
      title: t("blog_table.columns.id"),
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: t("blog_table.columns.title"),
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: t("blog_table.columns.main_keyword"),
      dataIndex: "main_keyword",
      key: "main_keyword",
    },
    {
      title: t("blog_table.columns.category"),
      dataIndex: "category_id",
      key: "category_id",
      render: (category_id) =>
        category_id ? (
          <span>{`${t("blog_table.columns.category")} #${category_id}`}</span>
        ) : (
          <span>{t("blog_table.messages.no_category")}</span>
        ),
    },
    {
      title: t("blog_table.columns.creator"),
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id) => (
        <span>{`${t("blog_table.columns.creator")} #${user_id}`}</span>
      ),
    },
    {
      title: t("blog_table.columns.created_date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("blog_table.columns.updated_date"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("blog_table.columns.visibility"),
      dataIndex: "is_visible",
      key: "is_visible",
      render: (isVisible, record) => (
        <Switch
          checked={isVisible}
          onChange={(checked) => handleVisibilityToggle(record.id, checked)}
        />
      ),
    },
    {
      title: t("blog_table.columns.actions"),
      key: "actions",
      render: (_, record) => (
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
      ),
    },
  ];

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
      <Table
        columns={columns}
        dataSource={blogsData?.data || []}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        bordered
        className="shadow-md rounded-md"
      />
    </div>
  );
};

export default BlogTable;
