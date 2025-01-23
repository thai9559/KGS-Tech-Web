import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateVisibilityMutation,
} from "../../../redux/api/blogApi";
import BlogTableActions from "./BlogTableActions";
import BlogVisibilitySwitch from "./BlogVisibilitySwitch";

const BlogTable = () => {
  const { t } = useTranslation();
  const { data: blogsData, isLoading } = useGetBlogsQuery();

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
        <BlogVisibilitySwitch isVisible={isVisible} record={record} />
      ),
    },
    {
      title: t("blog_table.columns.actions"),
      key: "actions",
      render: (_, record) => <BlogTableActions record={record} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={blogsData?.data || []}
      rowKey="id"
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      bordered
      className="shadow-md rounded-md"
    />
  );
};

export default BlogTable;
