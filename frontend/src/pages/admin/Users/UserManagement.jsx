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
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetUsersQuery,
  useGetRolesQuery,
  useGetAllPermissionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignPermissionsMutation,
} from "../../../redux/api/userApi";
import TagList from "../../../components/Admin/Taglist";

const { Option } = Select;

const UserManagement = () => {
  const { data: usersData = [], isLoading: usersLoading } = useGetUsersQuery();
  const users = Array.isArray(usersData?.data) ? usersData.data : [];

  const { data: rolesData = [], isLoading: rolesLoading } = useGetRolesQuery();
  const roles = Array.isArray(rolesData) ? rolesData : [];

  const { data: permissionsData = [], isLoading: permissionsLoading } =
    useGetAllPermissionsQuery();
  const permissions = Array.isArray(permissionsData) ? permissionsData : [];

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [assignPermissions] = useAssignPermissionsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [form] = Form.useForm();

  const openUserModal = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user);
    setIsModalOpen(true);

    if (user) {
      form.setFieldsValue({
        ...user,
        role_id: user.role ? user.role.id : null,
        permissions: Array.isArray(user.permissions)
          ? user.permissions.map((perm) => perm.id)
          : [],
      });
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Payload gửi từ FE:", values); // Kiểm tra dữ liệu gửi từ form

      if (isEditing) {
        // Chỉnh sửa người dùng và gán quyền nếu có
        const updatedUser = await updateUser({
          id: currentUser.id,
          ...values,
          role_id: values.role_id,
        }).unwrap();

        if (values.permissions?.length) {
          console.log("Assign permissions:", values.permissions); // Log danh sách quyền
          await assignPermissions({
            user_id: updatedUser.id,
            permission_ids: values.permissions,
          });
        }

        message.success("Cập nhật thông tin thành công!");
      } else {
        const { role_id, permissions, ...userData } = values;

        if (permissions && permissions.length === 0) {
          message.error("Vui lòng chọn ít nhất một quyền!");
          return;
        }

        console.log("Payload tạo mới:", { ...userData, role_id, permissions });

        // Tạo người dùng mới mà không gán quyền
        const newUser = await createUser({ ...userData, role_id }).unwrap();

        message.success("Thêm người dùng mới thành công!");

        // Nếu có quyền, gán quyền cho người dùng
        if (permissions?.length) {
          console.log("Assign permissions:", permissions);
          await assignPermissions({
            user_id: newUser.id,
            permission_ids: permissions,
          });
        }
      }

      closeModal();
    } catch (error) {
      console.error("Error during operation:", error);
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Người dùng đã được xóa!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Không thể xóa người dùng!");
    }
  };

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
      render: (phone) => phone || "Chưa có số điện thoại",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <TagList items={role ? [role] : []} color="blue" />,
    },
    {
      title: "Quyền",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => (
        <TagList items={permissions || []} color="green" isPermission={true} />
      ),
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
            onClick={() => openUserModal(record)}
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
          onClick={() => openUserModal()}
        >
          Thêm Người Dùng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={usersLoading}
        rowKey="id"
      />
      <Modal
        title={isEditing ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText="Cập nhật"
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
          <Form.Item
            label="Vai trò"
            name="role_id"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò" loading={rolesLoading}>
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Hiển thị phần quyền chỉ khi chỉnh sửa người dùng */}
          {isEditing && (
            <Form.Item
              label="Quyền"
              name="permissions"
              rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn quyền"
                loading={permissionsLoading}
              >
                {permissions.map((perm) => (
                  <Option key={perm.id} value={perm.id}>
                    {perm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
