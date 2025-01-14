import React from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "../../redux/api/blogApi";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const BlogTable = () => {
  const { data: blogsData, isLoading } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Xóa bài viết thành công!");
    } catch (error) {
      message.error("Xóa bài viết thất bại!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Từ khóa chính",
      dataIndex: "main_keyword",
      key: "main_keyword",
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      key: "category_id",
      render: (category_id) =>
        category_id ? (
          <span>{`Danh mục #${category_id}`}</span>
        ) : (
          <span>Chưa có</span>
        ),
    },
    {
      title: "Người tạo",
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id) => <span>{`Người dùng #${user_id}`}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài viết này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    navigate(`/blogs/edit/${record.id}`); // Điều hướng tới trang sửa blog
  };

  const handleCreateBlog = () => {
    navigate("/blogs/create"); // Điều hướng tới trang tạo blog
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Blogs</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateBlog}
        >
          Tạo Blog
        </Button>
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
