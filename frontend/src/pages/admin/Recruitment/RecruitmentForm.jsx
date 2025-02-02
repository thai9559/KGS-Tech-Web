import React, { useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const RecruitmentForm = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_apply", values.position_apply);

      // Lấy file CV từ Upload component
      if (values.cv && values.cv.file) {
        formData.append("cv", values.cv.file.originFileObj);
      }

      onSubmit(formData);
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <Modal
      title={initialValues ? "Sửa ứng viên" : "Thêm ứng viên"}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Họ và Tên"
          name="fullname"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vị trí ứng tuyển"
          name="position_apply"
          rules={[
            { required: true, message: "Vui lòng nhập vị trí ứng tuyển!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tải lên CV"
          name="cv"
          rules={[{ required: true, message: "Vui lòng tải lên CV!" }]}
        >
          <Upload
            beforeUpload={() => false} // Ngăn không cho upload ngay, chỉ lưu file vào form
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />}>
              Chọn file CV (PDF, DOC, DOCX)
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecruitmentForm;
