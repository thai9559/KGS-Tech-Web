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

const { Option } = Select;

const UserManagement = () => {
  const { t } = useTranslation();

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

      if (isEditing) {
        const updatedUser = await updateUser({
          id: currentUser.id,
          ...values,
          role_id: values.role_id,
        }).unwrap();

        if (values.permissions?.length) {
          await assignPermissions({
            user_id: updatedUser.id,
            permission_ids: values.permissions,
          });
        }

        message.success(t("userAdmin.updateSuccess"));
      } else {
        const { role_id, permissions, ...userData } = values;

        if (permissions && permissions.length === 0) {
          message.error(t("userAdmin.formErrors.permissionsRequired"));
          return;
        }

        const newUser = await createUser({ ...userData, role_id }).unwrap();

        message.success(t("userAdmin.createSuccess"));

        if (permissions?.length) {
          await assignPermissions({
            user_id: newUser.id,
            permission_ids: permissions,
          });
        }
      }

      closeModal();
    } catch (error) {
      console.error("Error during operation:", error);
      message.error(t("error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success(t("userAdmin.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(t("deleteFail"));
    }
  };

  const columns = [
    {
      title: <span className="font-notoSansJP">{t("userAdmin.name")}</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="font-notoSansJP">{t("email")}</span>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span className="font-notoSansJP">{t("phone")}</span>,
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <span className="font-notoSansJP">{phone || t("noPhone")}</span>
      ),
    },
    {
      title: <span className="font-notoSansJP">{t("userAdmin.role")}</span>,
      dataIndex: "role",
      key: "role",
      render: (role) => <TagList items={role ? [role] : []} color="blue" />,
    },
    {
      title: (
        <span className="font-notoSansJP">{t("userAdmin.permissions")}</span>
      ),
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => (
        <TagList items={permissions || []} color="green" isPermission={true} />
      ),
    },
    {
      title: <span className="font-notoSansJP">{t("userAdmin.isActive")}</span>,
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Switch checked={isActive} />,
    },
    {
      title: <span className="font-notoSansJP">{t("userAdmin.actions")}</span>,
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openUserModal(record)}
          >
            <span className="font-notoSansJP">{t("userAdmin.editUser")}</span>
          </Button>
          <Popconfirm
            title={t("userAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("userAdmin.yes")}
            cancelText={t("userAdmin.no")}
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              <span className="font-notoSansJP">{t("userAdmin.delete")}</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section>
      <div
        className="flex justify-between items-center mb-4"
        style={{ marginBottom: 16 }}
      >
        <h1 className="text-2xl text-black font-bold font-notoSansJP">
          {t("userAdmin.userManagement")}
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openUserModal()}
        >
          <span className="font-notoSansJP">{t("userAdmin.addUser")}</span>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={usersLoading}
        rowKey="id"
      />
      <Modal
        title={
          <span className="font-notoSansJP">
            {isEditing ? t("userAdmin.editUser") : t("userAdmin.addUser")}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={
          <span className="font-notoSansJP">{t("userAdmin.update")}</span>
        }
        cancelText={
          <span className="font-notoSansJP">{t("userAdmin.cancel")}</span>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("userAdmin.name")}</span>
            }
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
            label={<span className="font-notoSansJP">{t("email")}</span>}
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
          {!isEditing && (
            <Form.Item
              label={
                <span className="font-notoSansJP">
                  {t("userAdmin.password")}
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: t("userAdmin.formErrors.passwordRequired"),
                },
                { min: 6, message: t("userAdmin.formErrors.passwordMin") },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("userAdmin.phone")}</span>
            }
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
            label={
              <span className="font-notoSansJP">{t("userAdmin.isActive")}</span>
            }
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("userAdmin.role")}</span>
            }
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
              className="font-notoSansJP"
            >
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {isEditing && (
            <Form.Item
              label={
                <span className="font-notoSansJP">
                  {t("userAdmin.permissions")}
                </span>
              }
              name="permissions"
              rules={[
                {
                  required: true,
                  message: t("userAdmin.choosePermissions"),
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={t("userAdmin.choosePermissions")}
                loading={permissionsLoading}
                av
                className="font-notoSansJP"
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
    </section>
  );
};

export default UserManagement;
