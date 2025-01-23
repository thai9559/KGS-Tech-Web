import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
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
import { useGetActivityLogsQuery } from "../../../redux/api/activityLogApi";
const { Option } = Select;

const UserManagement = () => {
  const { t } = useTranslation();

  const {
    data: usersData = [],
    isLoading: usersLoading,
    refetch,
  } = useGetUsersQuery();
  const { refetch: refetching } = useGetActivityLogsQuery();
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
  const [filteredData, setFilteredData] = useState(users);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [form] = Form.useForm();

  // Đồng bộ dữ liệu hiển thị với danh sách người dùng
  useEffect(() => {
    setFilteredData(users);
  }, [users]);

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

      if (isEditing) {
        // Chỉnh sửa user
        const updateData = { id: currentUser.id, ...values };

        // Xử lý mật khẩu (chỉ cập nhật nếu có)
        if (!values.password) {
          delete updateData.password;
        } else {
          updateData.password_confirmation = values.password;
        }

        await updateUser(updateData).unwrap();

        // Gán quyền nếu có
        if (values.permissions?.length) {
          await assignPermissions({
            user_id: currentUser.id,
            permission_ids: values.permissions,
          });
        }

        message.success(t("userAdmin.updateSuccess"));
        refetching();
      } else {
        // Thêm mới user
        const { permissions, ...userData } = values; // Loại bỏ permissions trong payload khi thêm mới

        // Kiểm tra mật khẩu bắt buộc khi thêm mới
        if (!userData.password) {
          message.error(t("userAdmin.formErrors.passwordRequired"));
          return;
        }

        // Gửi API tạo user
        const newUser = await createUser(userData).unwrap();

        // Không xử lý permissions khi thêm user
        message.success(t("userAdmin.createSuccess"));
        refetching();
      }

      closeModal();
      refetch();
    } catch (error) {
      console.error("Error during operation:", error);
      message.error(t("error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success(t("userAdmin.deleteSuccess"));
      refetching();
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(t("deleteFail"));
    }
  };

  const handleIsActiveChange = async (checked, record) => {
    try {
      await updateUser({
        id: record.id,
        is_active: checked,
      }).unwrap();

      setFilteredData((prevData) =>
        prevData.map((user) =>
          user.id === record.id ? { ...user, is_active: checked } : user
        )
      );

      message.success(
        t("userAdmin.updateIsActiveSuccess", { name: record.name })
      );
      refetching();
    } catch (error) {
      console.error("Error updating is_active:", error);
      message.error(t("userAdmin.updateIsActiveError"));
    }
  };

  const handleFilter = (value, key) => {
    const filtered = users.filter((user) => {
      if (key === "role") {
        return user.role?.id === value;
      } else if (key === "permissions") {
        return user.permissions?.some((perm) => perm.id === value);
      } else if (key === "is_active") {
        return user.is_active === value;
      } else {
        return user[key]?.toLowerCase().includes(value.toLowerCase());
      }
    });
    setFilteredData(filtered);
  };

  const handleResetFilter = () => {
    setFilteredData(users);
  };
  const handlePermissionChange = (value) => {
    // Kiểm tra nếu chọn "Full admin privileges" (giả sử ID của quyền này là 1)
    const isFullAdminSelected = value.includes(1); // 1 là ID của quyền "Full admin privileges"

    if (isFullAdminSelected) {
      // Nếu chọn quyền cao nhất, chỉ giữ lại quyền này
      setSelectedPermissions([1]);
      form.setFieldsValue({ permissions: [1] });
    } else {
      // Nếu không chọn quyền cao nhất, cập nhật trạng thái bình thường
      setSelectedPermissions(value);
      form.setFieldsValue({ permissions: value });
    }
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("userAdmin.name"),
      dataIndex: "name",
      key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder={t("userAdmin.filterByName")}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleFilter(e.target.value, "name");
          }}
        />
      ),
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder={t("userAdmin.filterByEmail")}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleFilter(e.target.value, "email");
          }}
        />
      ),
    },
    {
      title: t("userAdmin.phone"),
      dataIndex: "phone",
      key: "phone",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder={t("userAdmin.filterByPhone")}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            handleFilter(e.target.value, "phone");
          }}
        />
      ),
    },
    {
      title: t("userAdmin.role"),
      dataIndex: "role",
      key: "role",
      render: (role) => <TagList items={role ? [role] : []} color="blue" />,
      filters: roles.map((role) => ({ text: role.name, value: role.id })),
      onFilter: (value, record) => record.role?.id === value,
    },
    {
      title: t("userAdmin.permissions"),
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => (
        <TagList items={permissions || []} color="green" isPermission={true} />
      ),
      filters: permissions.map((perm) => ({
        text: perm.name,
        value: perm.id,
      })),
      onFilter: (value, record) =>
        record.permissions?.some((perm) => perm.id === value),
    },
    {
      title: t("userAdmin.isActive"),
      dataIndex: "is_active",
      key: "is_active",
      filters: [
        { text: t("userAdmin.active"), value: 1 },
        { text: t("userAdmin.inactive"), value: 0 },
      ],
      onFilter: (value, record) => record.is_active === value,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleIsActiveChange(checked, record)}
          disabled={record.role?.name === "Master"} // Disable nếu role là Master
        />
      ),
    },
    {
      title: t("userAdmin.actions"),
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openUserModal(record)}
            disabled={record.role?.name === "Master"} // Disable nếu role là Master
          >
            {t("userAdmin.editUser")}
          </Button>
          <Popconfirm
            title={t("userAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("userAdmin.yes")}
            cancelText={t("userAdmin.no")}
            disabled={record.role?.name === "Master"} // Disable nếu role là Master
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              disabled={record.role?.name === "Master"} // Disable nếu role là Master
            >
              {t("userAdmin.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl font-bold">{t("userAdmin.userManagement")}</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openUserModal()}
        >
          {t("userAdmin.addUser")}
        </Button>
      </div>
      <Button onClick={handleResetFilter} style={{ marginBottom: 16 }}>
        {t("userAdmin.resetFilters")}
      </Button>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={usersLoading}
        rowKey="id"
      />
      <Modal
        title={isEditing ? t("userAdmin.editUser") : t("userAdmin.addUser")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={isEditing ? t("userAdmin.update") : t("userAdmin.addUser")}
        cancelText={t("userAdmin.cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={t("userAdmin.name")}
            name="name"
            rules={[
              {
                required: true,
                message: t("userAdmin.formErrors.nameRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("email")}
            name="email"
            rules={[
              {
                required: true,
                message: t("userAdmin.formErrors.emailRequired"),
              },
              {
                type: "email",
                message: t("userAdmin.formErrors.emailInvalid"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("userAdmin.password")}
            name="password"
            rules={[
              {
                required: !isEditing,
                message: t("userAdmin.formErrors.passwordRequired"),
              },
              { min: 6, message: t("userAdmin.formErrors.passwordMin") },
            ]}
          >
            <Input.Password
              placeholder={t("userAdmin.formErrors.newPassword")}
            />
          </Form.Item>
          <Form.Item
            label={t("userAdmin.phone")}
            name="phone"
            rules={[
              {
                pattern: /^[0-9]{9,15}$/,
                message: t("userAdmin.formErrors.phoneInvalid"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("userAdmin.isActive")}
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          {/* Trường role vẫn hiển thị khi thêm hoặc chỉnh sửa */}
          <Form.Item
            label={t("userAdmin.role")}
            name="role_id"
            rules={[
              {
                required: true,
                message: t("userAdmin.formErrors.roleRequired"),
              },
            ]}
          >
            <Select
              placeholder={t("userAdmin.chooseRole")}
              loading={rolesLoading}
            >
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Trường permissions chỉ hiển thị khi chỉnh sửa */}
          {isEditing && (
            <Form.Item
              label={t("userAdmin.permissions")}
              name="permissions"
              rules={[
                { required: true, message: t("userAdmin.choosePermissions") },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={t("userAdmin.choosePermissions")}
                loading={permissionsLoading}
                value={selectedPermissions}
                onChange={handlePermissionChange} // Gọi hàm xử lý
              >
                {permissions.map((perm) => (
                  <Option
                    key={perm.id}
                    value={perm.id}
                    disabled={selectedPermissions.includes(1) && perm.id !== 1} // Vô hiệu hóa quyền khác nếu "Full admin privileges" được chọn
                  >
                    {perm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </section>
  );
};

export default UserManagement;
