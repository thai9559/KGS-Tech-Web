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
  Switch,
  Descriptions,
} from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetFeedbacksQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackVisibilityMutation,
  useDeleteFeedbackMutation,
} from "../../../redux/api/feedbackApi";

const FeedbackManagement = () => {
  const { t } = useTranslation(); // Dùng i18n để dịch
  const { data: feedbacksData, isLoading, error } = useGetFeedbacksQuery();
  const [createFeedback] = useCreateFeedbackMutation();
  const [updateFeedbackVisibility] = useUpdateFeedbackVisibilityMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedbacks = Array.isArray(feedbacksData) ? feedbacksData : [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [form] = Form.useForm();

  // Open Add Feedback Modal
  const openModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Open Detail Modal
  const openDetailModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFeedback(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await createFeedback(values);
      message.success(t("feedbackAdmin.createSuccess"));
      closeModal();
    } catch (error) {
      console.error("Error creating feedback:", error);
      message.error(t("feedbackAdmin.createFail"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      message.success(t("feedbackAdmin.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error(t("feedbackAdmin.deleteFail"));
    }
  };

  const handleToggleVisibility = async (id, isVisible) => {
    try {
      await updateFeedbackVisibility({ id, is_visible: !isVisible });
      message.success(t("feedbackAdmin.toggleVisibility"));
    } catch (error) {
      console.error("Error updating feedback visibility:", error);
      message.error(t("feedbackAdmin.updateVisibilityFail"));
    }
  };

  const columns = [
    {
      title: (
        <span className="font-notoSansJP">
          {t("feedbackAdmin.tableColumns.id")}
        </span>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("feedbackAdmin.tableColumns.email")}
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("feedbackAdmin.tableColumns.subject")}
        </span>
      ),
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: (
        <span className="font-notoSansJP">
          {t("feedbackAdmin.tableColumns.sentAt")}
        </span>
      ),
      dataIndex: "sent_at",
      key: "sent_at",
    },

    {
      title: (
        <span className="font-notoSansJP">
          {t("feedbackAdmin.tableColumns.actions")}
        </span>
      ),
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openDetailModal(record)}>
            <span className="font-notoSansJP">
              {t("feedbackAdmin.viewDetails")}
            </span>
          </Button>
          <Popconfirm
            title={t("feedbackAdmin.deleteConfirm")}
            onConfirm={() => handleDelete(record.id)}
            okText={t("feedbackAdmin.yes")}
            cancelText={t("feedbackAdmin.no")}
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              <span className="font-notoSansJP">
                {t("feedbackAdmin.deleteFeedback")}
              </span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    console.error("Error fetching feedbacks:", error);
    message.error(t("feedbackAdmin.loadingError"));
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openModal}>
          <span className="font-notoSansJP">
            {t("feedbackAdmin.addFeedback")}
          </span>
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={feedbacks}
        loading={isLoading}
        rowKey="id"
      />

      {/* Add Feedback Modal */}
      <Modal
        title={
          <span className="font-notoSansJP">
            {t("feedbackAdmin.addFeedback")}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={
          <span className="font-notoSansJP">
            {t("feedbackAdmin.addFeedback")}
          </span>
        }
        cancelText={
          <span className="font-notoSansJP">{t("feedbackAdmin.cancel")}</span>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <span className="font-notoSansJP">
                {t("feedbackAdmin.tableColumns.email")}
              </span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: t("feedbackAdmin.formErrors.emailRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">
                {t("feedbackAdmin.tableColumns.subject")}
              </span>
            }
            name="subject"
            rules={[
              {
                required: true,
                message: t("feedbackAdmin.formErrors.subjectRequired"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-notoSansJP">
                {t("feedbackAdmin.detailModal.content")}
              </span>
            }
            name="content"
            rules={[
              {
                required: true,
                message: t("feedbackAdmin.formErrors.contentRequired"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Feedback Detail Modal */}
      <Modal
        title={
          <span className="font-notoSansJP">
            {t("feedbackAdmin.detailModal.title")}
          </span>
        }
        open={isDetailModalOpen}
        onCancel={closeDetailModal}
        footer={null}
        width={800}
      >
        {selectedFeedback && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.id")}>
              {selectedFeedback.id}
            </Descriptions.Item>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.email")}>
              {selectedFeedback.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.subject")}>
              {selectedFeedback.subject}
            </Descriptions.Item>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.content")}>
              {selectedFeedback.content}
            </Descriptions.Item>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.sentAt")}>
              {selectedFeedback.sent_at}
            </Descriptions.Item>
            <Descriptions.Item label={t("feedbackAdmin.detailModal.isVisible")}>
              {selectedFeedback.is_visible
                ? t("feedbackAdmin.yes")
                : t("feedbackAdmin.no")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
