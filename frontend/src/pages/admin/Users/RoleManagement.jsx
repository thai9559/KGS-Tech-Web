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
import { useTranslation } from "react-i18next";
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../../../redux/api/roleApi";

const RoleManagement = () => {
  const { t } = useTranslation(); // Không chỉ định namespace ở đây
  const { data: rolesData, isLoading, error } = useGetRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const roles = Array.isArray(rolesData?.data) ? rolesData.data : [];
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
        message.success(t("roleAdmin.updateSuccess"));
      } else {
        await createRole(values);
        message.success(t("roleAdmin.createSuccess"));
      }
      closeModal();
    } catch (error) {
      console.error("Error handling form submission:", error);
      message.error(t("roleAdmin.error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      message.success(t("roleAdmin.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting role:", error);
      message.error(t("roleAdmin.deleteFail"));
    }
  };

  const columns = [
    {
      title: <span className="font-notoSansJP">ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span className="font-notoSansJP">{t("roleAdmin.name")}</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span className="font-notoSansJP">{t("roleAdmin.description")}</span>
      ),
      dataIndex: "description",
      key: "description",
    },
    {
      title: <span className="font-notoSansJP">{t("roleAdmin.actions")}</span>,
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            <span className="font-notoSansJP">{t("roleAdmin.editRole")}</span>
          </Button>
          <Popconfirm
            title={t("roleAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("roleAdmin.yes")}
            cancelText={t("roleAdmin.no")}
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              <span className="font-notoSansJP">{t("roleAdmin.delete")}</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    console.error("Error fetching roles:", error);
    message.error(t("roleAdmin.loadingError"));
  }

  return (
    <div>
      <div
        className="flex justify-between items-center mb-4"
        style={{ marginBottom: 16 }}
      >
        <h1 className="text-2xl text-black font-bold font-notoSansJP">
          {t("roleAdmin.roleManagement")}
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          <span className="font-notoSansJP">{t("roleAdmin.addRole")}</span>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={
          <span className="font-notoSansJP">
            {isEditing ? t("roleAdmin.editRole") : t("roleAdmin.addRole")}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={
          <span className="font-notoSansJP">{t("roleAdmin.update")}</span>
        }
        cancelText={
          <span className="font-notoSansJP">{t("roleAdmin.cancel")}</span>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("roleAdmin.name")}</span>
            }
            name="name"
            rules={[
              {
                required: true,
                message: t("roleAdmin.formErrors.nameRequired"),
                className: "font-notoSansJP",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">
                {t("roleAdmin.description")}
              </span>
            }
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
