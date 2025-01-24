import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../../../redux/api/roleApi";
import RoleCard from "./RoleCard"; // Import component RoleCard

const RoleManagement = () => {
  const { t } = useTranslation();
  const { data: rolesData, isLoading } = useGetRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const roles = Array.isArray(rolesData?.data) ? rolesData.data : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [swipedCard, setSwipedCard] = useState(null); // Trạng thái vuốt

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
      console.error(error);
      message.error(t("roleAdmin.errorOccurred"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      message.success(t("roleAdmin.deleteSuccess"));
      setSwipedCard(null);
    } catch (error) {
      console.error(error);
      message.error(t("roleAdmin.deleteFail"));
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("roleAdmin.roleManagement")}</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          {t("roleAdmin.addRole")}
        </Button>
      </div>

      {/* Card Layout for Mobile */}
      {/* <div className="md:hidden grid grid-cols-1 gap-4">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onEdit={openModal}
            onDelete={handleDelete}
            swipedCard={swipedCard}
            setSwipedCard={setSwipedCard}
          />
        ))}
      </div> */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {Array.isArray(roles) ? (
          roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Không có vai trò nào để hiển thị.</p>
        )}
      </div>

      {/* Table for PC */}
      <div className="hidden md:block">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: t("roleAdmin.name"),
              dataIndex: "name",
              key: "name",
            },
            {
              title: t("roleAdmin.description"),
              dataIndex: "description",
              key: "description",
            },
            {
              title: t("roleAdmin.actions"),
              key: "action",
              render: (_, record) => (
                <Space>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => openModal(record)}
                  >
                    {t("roleAdmin.editRole")}
                  </Button>
                  <Popconfirm
                    title={t("roleAdmin.deleteConfirm")}
                    onConfirm={() => handleDelete(record.id)}
                    okText={t("roleAdmin.yes")}
                    cancelText={t("roleAdmin.no")}
                  >
                    <Button danger type="primary" icon={<DeleteOutlined />}>
                      {t("roleAdmin.delete")}
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={roles}
          loading={isLoading}
          rowKey="id"
        />
      </div>

      {/* Modal */}
      <Modal
        title={isEditing ? t("roleAdmin.editRole") : t("roleAdmin.addRole")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={t("roleAdmin.update")}
        cancelText={t("roleAdmin.cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={t("roleAdmin.name")}
            name="name"
            rules={[
              {
                required: true,
                message: t("roleAdmin.formErrors.nameRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={t("roleAdmin.description")} name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
