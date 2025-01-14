import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/userApi";

const UserManagement = () => {
  const { data: users = [], isLoading } = useGetUsersQuery(); // Lấy danh sách người dùng
  const [createUser] = useCreateUserMutation(); // Thêm người dùng mới
  const [updateUser] = useUpdateUserMutation(); // Cập nhật người dùng
  const [deleteUser] = useDeleteUserMutation(); // Xóa người dùng

  const [isModalOpen, setIsModalOpen] = useState(false); // Hiển thị modal
  const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa
  const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const userData = {
        ...values,
        password_confirmation: values.password, // Đảm bảo gửi cả password_confirmation
      };
      if (isEditing) {
        await updateUser({ id: currentUser.id, ...userData });
        message.success("Người dùng đã được cập nhật!");
      } else {
        await createUser(userData); // Gọi API /register
        message.success("Người dùng mới đã được thêm!");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  // Xử lý xóa người dùng
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Người dùng đã được xóa!");
    } catch (error) {
      message.error("Không thể xóa người dùng!");
    }
  };

  // Mở modal thêm/sửa
  const openModal = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user);
    setIsModalOpen(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  // Cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
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
      title: "Trạng thái hoạt động",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Switch checked={isActive} disabled />,
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
            title="Bạn có chắc chắn muốn xóa người dùng này?"
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
          Thêm Người Dùng
        </Button>
      </div>

      {/* Bảng người dùng */}
      <Table
        columns={columns}
        dataSource={users} // Phải là một mảng
        loading={isLoading}
        rowKey="id" // `id` là khóa duy nhất cho mỗi bản ghi
      />

      {/* Modal thêm/sửa */}
      <Modal
        title={isEditing ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={isEditing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          {!isEditing && (
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                pattern: /^[0-9]{9,15}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái hoạt động"
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
