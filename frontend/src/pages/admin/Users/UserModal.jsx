import React from "react";
import { Modal, Form, Input, Switch, Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const UserModal = ({
  isVisible,
  isEditing,
  form,
  roles,
  permissions,
  selectedPermissions,
  onSave,
  onCancel,
  onPermissionChange,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={isEditing ? t("userAdmin.editUser") : t("userAdmin.addUser")}
      visible={isVisible}
      onOk={onSave}
      onCancel={onCancel}
      okText={isEditing ? t("userAdmin.update") : t("userAdmin.addUser")}
      cancelText={t("userAdmin.cancel")}
    >
      <Form form={form} layout="vertical">
        {/* Tên */}
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
          <Input placeholder={t("userAdmin.formErrors.nameRequired")} />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={t("userAdmin.email")}
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
          <Input placeholder={t("userAdmin.formErrors.emailRequired")} />
        </Form.Item>

        {/* Mật khẩu */}
        <Form.Item
          label={t("userAdmin.password")}
          name="password"
          rules={[
            {
              required: !isEditing, // Mật khẩu chỉ bắt buộc khi thêm mới
              message: t("userAdmin.formErrors.passwordRequired"),
            },
            { min: 6, message: t("userAdmin.formErrors.passwordMin") },
          ]}
        >
          <Input.Password placeholder={t("userAdmin.formErrors.newPassword")} />
        </Form.Item>

        {/* Số điện thoại */}
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
          <Input placeholder={t("userAdmin.formErrors.phoneRequired")} />
        </Form.Item>

        {/* Trạng thái kích hoạt */}
        <Form.Item
          label={t("userAdmin.isActive")}
          name="is_active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* Vai trò */}
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
            loading={loading.rolesLoading}
          >
            {roles.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Quyền (chỉ hiển thị khi chỉnh sửa) */}
        {isEditing && (
          <Form.Item
            label={t("userAdmin.permissions")}
            name="permissions"
            rules={[
              {
                required: true,
                message: t("userAdmin.formErrors.permissionsRequired"),
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder={t("userAdmin.choosePermissions")}
              loading={loading.permissionsLoading}
              value={selectedPermissions}
              onChange={onPermissionChange}
            >
              {permissions.map((perm) => (
                <Option
                  key={perm.id}
                  value={perm.id}
                  disabled={selectedPermissions.includes(1) && perm.id !== 1}
                >
                  {perm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserModal;
