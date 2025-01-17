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
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/api/categoryApi";

const CategoryManagement = () => {
  const { t } = useTranslation(); // Sử dụng i18n
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [form] = Form.useForm();

  const openModal = (category = null) => {
    setIsEditing(!!category);
    setCurrentCategory(category);
    setIsModalOpen(true);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing) {
        await updateCategory({ id: currentCategory.id, ...values });
        message.success(t("categoryAdmin.updateSuccess"));
      } else {
        await createCategory(values);
        message.success(t("categoryAdmin.createSuccess"));
      }
      closeModal();
    } catch (error) {
      message.error(t("categoryAdmin.error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success(t("categoryAdmin.deleteSuccess"));
    } catch (error) {
      message.error(t("categoryAdmin.deleteFail"));
    }
  };

  const columns = [
    {
      title: <span className="font-notoSansJP">{t("categoryAdmin.name")}</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span className="font-notoSansJP">{t("categoryAdmin.slug")}</span>,
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("categoryAdmin.description")}
        </span>
      ),
      dataIndex: "description",
      key: "description",
    },
    {
      title: (
        <span className="font-notoSansJP">{t("categoryAdmin.actions")}</span>
      ),
      key: "action",
      render: (_, category) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openModal(category)}
          >
            <span className="font-notoSansJP">
              {t("categoryAdmin.editCategory")}
            </span>
          </Button>
          <Popconfirm
            title={t("categoryAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(category.id)}
            okText={t("categoryAdmin.yes")}
            cancelText={t("categoryAdmin.no")}
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              <span className="font-notoSansJP">
                {t("categoryAdmin.deleteCategory")}
              </span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        className="flex justify-between items-center mb-4"
        style={{ marginBottom: 16 }}
      >
        <h1 className="text-2xl font-bold">
          {" "}
          {t("categoryAdmin.categoryManagement")}
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          <span className="font-notoSansJP">
            {t("categoryAdmin.addCategory")}
          </span>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        rowKey="id"
      />
      <Modal
        title={
          <span className="font-notoSansJP">
            {isEditing
              ? t("categoryAdmin.editCategory")
              : t("categoryAdmin.addCategory")}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={
          <span className="font-notoSansJP">{t("categoryAdmin.update")}</span>
        }
        cancelText={
          <span className="font-notoSansJP">{t("categoryAdmin.cancel")}</span>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("categoryAdmin.name")}</span>
            }
            name="name"
            rules={[
              {
                required: true,
                message: t("categoryAdmin.formErrors.nameRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">{t("categoryAdmin.slug")}</span>
            }
            name="slug"
          >
            <Input placeholder={t("categoryAdmin.autoGenerateSlug")} />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">
                {t("categoryAdmin.description")}
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

export default CategoryManagement;
