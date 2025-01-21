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
  Descriptions,
} from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from "../../../../redux/api/TagApi";

const TagAdmin = () => {
  const { t } = useTranslation();
  const { data: tagsData, isLoading, error, refetch } = useGetTagsQuery();
  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [form] = Form.useForm();

  // Open Add Tag Modal
  const openModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setSelectedTag(null); // Ensure selectedTag is null for adding new tag
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Open Detail Modal
  const openDetailModal = (tag) => {
    setSelectedTag(tag);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTag(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createTag(values);
      message.success(t("tagAdmin.createSuccess"));
      closeModal();
      refetch(); // Refresh the data after creation
    } catch (error) {
      console.error("Error creating tag:", error);
      message.error(t("tagAdmin.createFail"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTag(id);
      message.success(t("tagAdmin.deleteSuccess"));
      refetch(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting tag:", error);
      message.error(t("tagAdmin.deleteFail"));
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateTag({ ...selectedTag, ...values });
      message.success(t("tagAdmin.updateSuccess"));
      closeDetailModal();
      refetch(); // Refresh the data after updating
    } catch (error) {
      console.error("Error updating tag:", error);
      message.error(t("tagAdmin.updateFail"));
    }
  };

  const columns = [
    {
      title: (
        <span className="font-notoSansJP">{t("tagAdmin.tableColumns.id")}</span>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("tagAdmin.tableColumns.name")}
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("tagAdmin.tableColumns.actions")}
        </span>
      ),
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => openDetailModal(record)}
            icon={<EditOutlined />}
          >
            {t("tagAdmin.edit")}
          </Button>
          <Popconfirm
            title={t("tagAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("tagAdmin.yes")}
            cancelText={t("tagAdmin.no")}
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              {t("tagAdmin.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    console.error("Error fetching tags:", error);
    message.error(t("tagAdmin.loadingError"));
  }

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
        dataSource={tagsData?.data} // Correctly access the tags data
        loading={isLoading}
        rowKey="id"
      />

      {/* Add Tag Modal */}
      <Modal
        title={t("tagAdmin.addTag")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={t("tagAdmin.save")}
        cancelText={t("tagAdmin.cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={t("tagAdmin.form.name")}
            name="name"
            rules={[
              {
                required: true,
                message: t("tagAdmin.formErrors.nameRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Tag Detail Modal */}
      <Modal
        title={t("tagAdmin.detailModal.title")}
        open={isDetailModalOpen}
        onCancel={closeDetailModal}
        onOk={handleUpdate} // Ensure "Lưu" button works for updating
        footer={[
          <Button key="cancel" onClick={closeDetailModal} type="default">
            {t("tagAdmin.cancel")}
          </Button>,
          <Button key="save" onClick={handleUpdate} type="primary">
            {t("tagAdmin.save")}
          </Button>,
        ]}
        width={800}
      >
        {selectedTag && (
          <Form form={form} layout="vertical" initialValues={selectedTag}>
            <Form.Item
              label={t("tagAdmin.form.name")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("tagAdmin.formErrors.nameRequired"),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TagAdmin;
