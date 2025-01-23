import React from "react";
import { Table, Switch, Button, Space, Popconfirm, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TagList from "../../../components/Admin/Taglist";

const UserTable = ({
  users,
  roles,
  permissions,
  loading,
  onEdit,
  onDelete,
  onFilter,
  onIsActiveChange,
}) => {
  const { t } = useTranslation();

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
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("userAdmin.filterByName")}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("userAdmin.filterByEmail")}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
    },
    {
      title: t("userAdmin.phone"),
      dataIndex: "phone",
      key: "phone",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={t("userAdmin.filterByPhone")}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
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
        <TagList items={permissions || []} color="green" isPermission />
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
          onChange={(checked) => onIsActiveChange(checked, record)}
          disabled={record.role?.name === "Master"} // Không cho phép chuyển trạng thái nếu role là Master
        />
      ),
    },
    {
      title: t("userAdmin.actions"),
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            disabled={record.role?.name === "Master"} // Không cho phép chỉnh sửa nếu role là Master
          >
            {t("userAdmin.editUser")}
          </Button>
          <Popconfirm
            title={t("userAdmin.deleteConfirm")}
            onConfirm={() => onDelete(record.id)}
            okText={t("userAdmin.yes")}
            cancelText={t("userAdmin.no")}
            disabled={record.role?.name === "Master"} // Không cho phép xóa nếu role là Master
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              disabled={record.role?.name === "Master"}
            >
              {t("userAdmin.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
  );
};

export default UserTable;
