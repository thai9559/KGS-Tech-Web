import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../../../redux/api/roleApi";

const RoleManagement = () => {
  const { data: roles = [], isLoading } = useGetRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const [form] = Form.useForm();

  const openModal = (role = null) => {
    setIsEditing(!!role);
    setCurrentRole(role);
    setIsModalOpen(true);
    if (role) {
      form.setFieldsValue(role);
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRole(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing) {
        await updateRole({ id: currentRole.id, ...values });
        message.success("Vai trò đã được cập nhật!");
      } else {
        await createRole(values);
        message.success("Vai trò mới đã được thêm!");
      }
      closeModal();
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      message.success("Vai trò đã được xóa!");
    } catch (error) {
      message.error("Không thể xóa vai trò!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa vai trò này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Thêm Vai Trò
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={isEditing ? "Chỉnh sửa Vai Trò" : "Thêm Vai Trò"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={isEditing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên vai trò"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên vai trò!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
