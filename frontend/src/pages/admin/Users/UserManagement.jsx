import React, { useState, useEffect } from "react";
import { Button, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import { useGetActivityLogsQuery } from "../../../redux/api/activityLogApi";
const UserManagement = () => {
  const { t } = useTranslation();

  // Queries
  const {
    data: usersData = [],
    isLoading: usersLoading,
    refetch,
  } = useGetUsersQuery();
  const { data: rolesData = [], isLoading: rolesLoading } = useGetRolesQuery();
  const { refetch: refetching } = useGetActivityLogsQuery();
  const { data: permissionsData = [], isLoading: permissionsLoading } =
    useGetAllPermissionsQuery();

  // Mutations
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [assignPermissions] = useAssignPermissionsMutation();

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [form] = Form.useForm();

  // Extract data
  const users = Array.isArray(usersData?.data) ? usersData.data : [];
  const roles = Array.isArray(rolesData) ? rolesData : [];
  const permissions = Array.isArray(permissionsData) ? permissionsData : [];

  // Sync data to state
  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  // Open modal
  const openUserModal = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(
      user
        ? {
            ...user,
            role_id: user.role?.id || null,
            permissions: user.permissions?.map((perm) => perm.id) || [],
          }
        : {}
    );
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  // Save user (add or edit)
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      if (isEditing) {
        const updateData = { id: currentUser.id, ...values };
        if (!values.password) delete updateData.password;

        await updateUser(updateData).unwrap();
        if (values.permissions?.length) {
          await assignPermissions({
            user_id: currentUser.id,
            permission_ids: values.permissions,
          });
        }

        message.success(t("userAdmin.updateSuccess"));
        refetching();
      } else {
        if (!values.password) {
          message.error(t("userAdmin.formErrors.passwordRequired"));
          return;
        }

        await createUser(values).unwrap();
        message.success(t("userAdmin.createSuccess"));
        refetching();
      }

      closeModal();
      refetch();
    } catch (error) {
      console.error(error);
      message.error(t("error"));
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success(t("userAdmin.deleteSuccess"));
      refetching();
    } catch (error) {
      console.error(error);
      message.error(t("deleteFail"));
    }
  };

  // Change active status
  const handleIsActiveChange = async (checked, record) => {
    try {
      await updateUser({ id: record.id, is_active: checked }).unwrap();
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
      console.error(error);
      message.error(t("userAdmin.updateIsActiveError"));
    }
  };

  // Handle permission change
  const handlePermissionChange = (value) => {
    const isFullAdminSelected = value.includes(1);
    if (isFullAdminSelected) {
      setSelectedPermissions([1]);
      form.setFieldsValue({ permissions: [1] });
    } else {
      setSelectedPermissions(value);
      form.setFieldsValue({ permissions: value });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("userAdmin.userManagement")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openUserModal()}
        >
          {t("userAdmin.addUser")}
        </Button>
      </div>
      <UserTable
        users={filteredData}
        roles={roles}
        permissions={permissions}
        loading={usersLoading}
        onEdit={openUserModal}
        onDelete={handleDelete}
        onFilter={(value, key) =>
          setFilteredData(
            users.filter((user) =>
              user[key]?.toLowerCase().includes(value.toLowerCase())
            )
          )
        }
        onIsActiveChange={handleIsActiveChange}
      />
      <UserModal
        isVisible={isModalOpen}
        isEditing={isEditing}
        form={form}
        roles={roles}
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        onSave={handleSave}
        onCancel={closeModal}
        onPermissionChange={handlePermissionChange}
        loading={{ rolesLoading, permissionsLoading }}
      />
    </section>
  );
};

export default UserManagement;
