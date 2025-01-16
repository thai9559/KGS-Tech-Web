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
import {
  useGetFeedbacksQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackVisibilityMutation,
  useDeleteFeedbackMutation,
} from "../../../redux/api/feedbackApi";

const FeedbackManagement = () => {
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
      message.success("Feedback mới đã được thêm!");
      closeModal();
    } catch (error) {
      console.error("Error creating feedback:", error);
      message.error("Có lỗi xảy ra khi thêm feedback!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      message.success("Feedback đã được xóa!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error("Không thể xóa feedback!");
    }
  };

  const handleToggleVisibility = async (id, isVisible) => {
    try {
      await updateFeedbackVisibility({ id, is_visible: !isVisible });
      message.success("Trạng thái feedback đã được cập nhật!");
    } catch (error) {
      console.error("Error updating feedback visibility:", error);
      message.error("Không thể cập nhật trạng thái feedback!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Ngày gửi",
      dataIndex: "sent_at",
      key: "sent_at",
    },
    {
      title: "Hiển thị",
      key: "is_visible",
      render: (_, record) => (
        <Switch
          checked={record.is_visible}
          onChange={() => handleToggleVisibility(record.id, record.is_visible)}
        />
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openDetailModal(record)}>
            Xem chi tiết
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa feedback này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    console.error("Error fetching feedbacks:", error);
    message.error("Không thể tải danh sách feedback!");
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openModal}>
          Thêm Feedback
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
        title="Thêm Feedback"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chủ đề"
            name="subject"
            rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Feedback Detail Modal */}
      <Modal
        title="Chi tiết Feedback"
        open={isDetailModalOpen}
        onCancel={closeDetailModal}
        footer={null}
        width={800} // Đặt chiều rộng lớn cho bảng
      >
        {selectedFeedback && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">
              {selectedFeedback.id}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedFeedback.email}
            </Descriptions.Item>
            <Descriptions.Item label="Chủ đề">
              {selectedFeedback.subject}
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung">
              {selectedFeedback.content}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày gửi">
              {selectedFeedback.sent_at}
            </Descriptions.Item>
            <Descriptions.Item label="Hiển thị">
              {selectedFeedback.is_visible ? "Có" : "Không"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
