import React, { useState } from "react";
import { Drawer, Button, Form, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateRecruitmentMutation } from "../../redux/api/recruitmentApi";

const { Option } = Select;

const Careers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [createRecruitment, { isLoading }] = useCreateRecruitmentMutation();
  const [fileList, setFileList] = useState([]); // Lưu danh sách file đã chọn
  const [selectedPosition, setSelectedPosition] = useState(""); // Lưu vị trí đã chọn

  // Mở Drawer
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Đóng Drawer và reset form
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    form.resetFields();
    setFileList([]);
    setSelectedPosition("");
  };

  // Xử lý chọn file
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Xử lý thay đổi vị trí ứng tuyển
  const handlePositionChange = (value) => {
    setSelectedPosition(value);
    form.setFieldsValue({ technology: undefined }); // Reset công nghệ khi chọn vị trí mới
  };

  // Xử lý nộp đơn
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_apply", values.position); // Đảm bảo đúng key

      // Kiểm tra nếu `technology` bị `undefined`
      formData.append("technology", values.technology || "");

      // Kiểm tra nếu chưa có file CV
      if (!fileList[0]) {
        message.error("Vui lòng tải lên CV!");
        return;
      }

      // Lấy file CV đúng cách
      formData.append("cv", fileList[0].originFileObj);

      // Gửi API bằng RTK Mutation
      const response = await createRecruitment(formData).unwrap();
      console.log("API Response:", response);

      // Xử lý phản hồi từ API
      if (response?.success) {
        message.success("Nộp đơn thành công!");
        closeDrawer();
      } else {
        message.warning(
          response?.message || "Bạn đã ứng tuyển vị trí này rồi."
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Lỗi khi gửi yêu cầu! Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full h-[400px] flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Tuyển dụng
      </h1>
      <p className="text-xl text-gray-700 text-center mb-10">
        Tham gia đội ngũ của chúng tôi để cùng xây dựng các giải pháp công nghệ
        tiên tiến.
      </p>
      <Button
        type="primary"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-4 rounded-lg"
        onClick={showDrawer}
      >
        Ứng tuyển ngay
      </Button>

      {/* Drawer */}
      <Drawer
        title="Nộp đơn ứng tuyển"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Họ và Tên"
            name="fullname"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Vị trí ứng tuyển"
            name="position"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn vị trí" onChange={handlePositionChange}>
              <Option value="Frontend Developer">Frontend Developer</Option>
              <Option value="Backend Developer">Backend Developer</Option>
            </Select>
          </Form.Item>

          {/* Hiển thị Select công nghệ tùy theo vị trí ứng tuyển */}
          {selectedPosition === "Frontend Developer" && (
            <Form.Item
              label="Công nghệ Frontend"
              name="technology"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn công nghệ">
                <Option value="ReactJS">ReactJS</Option>
                <Option value="VueJS">VueJS</Option>
              </Select>
            </Form.Item>
          )}
          {selectedPosition === "Backend Developer" && (
            <Form.Item
              label="Công nghệ Backend"
              name="technology"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn công nghệ">
                <Option value="PHP + Laravel">PHP + Laravel</Option>
                <Option value="NodeJS - NestJS">NodeJS - NestJS</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item label="Tải lên CV" rules={[{ required: true }]}>
            <Upload
              beforeUpload={() => false} // Ngăn không cho tải lên ngay, chỉ lưu vào state
              accept=".pdf,.doc,.docx"
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>
                Chọn file CV (PDF, DOC, DOCX)
              </Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading}>
            Nộp đơn
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Careers;
