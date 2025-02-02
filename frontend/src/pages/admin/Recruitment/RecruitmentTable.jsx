import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

const RecruitmentTable = ({ data, isLoading, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vị trí ứng tuyển",
      dataIndex: "position_apply",
      key: "position_apply",
    },
    {
      title: "Công nghệ ứng tuyển",
      dataIndex: "technology",
      key: "technology",
    },
    {
      title: "CV",
      key: "cv",
      render: (_, record) =>
        record.cv_path ? (
          <a
            href={`http://127.0.0.1:8000/storage/${record.cv_path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="link" icon={<FilePdfOutlined />} />
          </a>
        ) : (
          <span style={{ color: "red" }}>Chưa có</span>
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          {/* <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button> */}
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => onDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey="id"
    />
  );
};

export default RecruitmentTable;
