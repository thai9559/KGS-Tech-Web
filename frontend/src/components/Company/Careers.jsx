import React, { useState } from "react";
import { Drawer, Button, Form, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateRecruitmentMutation } from "../../redux/api/recruitmentApi";
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

const { Option } = Select;

const Careers = () => {
  const { t } = useTranslation(); // Shook để lấy chuỗi từ i18n
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
        message.error(t("Careers.messages.cvRequired"));
        return;
      }

      // Lấy file CV đúng cách
      formData.append("cv", fileList[0].originFileObj);

      // Gửi API bằng RTK Mutation
      const response = await createRecruitment(formData).unwrap();
      console.log("API Response:", response);

      // Xử lý phản hồi từ API
      if (response?.success) {
        message.success(t("Careers.messages.submissionSuccess"));
        closeDrawer();
      } else {
        message.warning(
          response?.message || t("Careers.messages.submissionError")
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error(t("Careers.messages.submissionError"));
    }
  };

  return (
    <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-gray-100 px-4 sm:px-8 md:px-12 lg:px-20 text-center">
      {/* Tiêu đề */}
      <h1 className="text-3xl sm:text-4xl font-bold font-notoSansJP text-gray-800 mb-4 sm:mb-6">
        {t("Careers.title")}
      </h1>

      {/* Mô tả */}
      <p className="text-base sm:text-lg px-2 sm:px-5 w-full max-w-2xl text-gray-700 font-notoSansJP mb-6 sm:mb-10">
        {t("Careers.description")}
      </p>

      {/* Button Apply */}
      <Button
        type="primary"
        className="bg-blue-500 hover:bg-blue-600 text-base sm:text-lg text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg"
        onClick={showDrawer}
      >
        {t("Careers.applyNow")}
      </Button>

      {/* Drawer (Responsive Width) */}
      <Drawer
        title={t("Careers.drawerTitle")}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width="400" // Drawer sẽ chiếm 90% màn hình trên mobile
        className="sm:w-[400px]" // Khi màn hình sm (640px+) thì rộng 400px
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={t("Careers.form.fullname")}
            name="fullname"
            rules={[{ required: true }]}
          >
            <Input placeholder={t("Careers.form.fullname")} />
          </Form.Item>

          <Form.Item
            label={t("Careers.form.email")}
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder={t("Careers.form.email")} />
          </Form.Item>

          <Form.Item
            label={t("Careers.form.phone")}
            name="phone"
            rules={[{ required: true }]}
          >
            <Input placeholder={t("Careers.form.phone")} />
          </Form.Item>

          <Form.Item
            label={t("Careers.form.position")}
            name="position"
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t("Careers.form.selectPosition")}
              onChange={handlePositionChange}
            >
              <Option value="Frontend Developer">
                {t("Careers.form.frontend")}
              </Option>
              <Option value="Backend Developer">
                {t("Careers.form.backend")}
              </Option>
            </Select>
          </Form.Item>

          {/* Hiển thị Select công nghệ tùy theo vị trí ứng tuyển */}
          {selectedPosition === "Frontend Developer" && (
            <Form.Item
              label={t("Careers.form.technology")}
              name="technology"
              rules={[{ required: true }]}
            >
              <Select placeholder={t("Careers.form.technology")}>
                <Option value="ReactJS">ReactJS</Option>
                <Option value="VueJS">VueJS</Option>
              </Select>
            </Form.Item>
          )}
          {selectedPosition === "Backend Developer" && (
            <Form.Item
              label={t("Careers.form.technology")}
              name="technology"
              rules={[{ required: true }]}
            >
              <Select placeholder={t("Careers.form.technology")}>
                <Option value="PHP + Laravel">PHP + Laravel</Option>
                <Option value="NodeJS - NestJS">NodeJS - NestJS</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label={t("Careers.form.uploadCv")}
            rules={[{ required: true }]}
          >
            <Upload
              beforeUpload={() => false} // Ngăn không cho tải lên ngay, chỉ lưu vào state
              accept=".pdf,.doc,.docx"
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>
                {t("Careers.form.cvPlaceholder")}
              </Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full"
          >
            {t("Careers.form.submit")}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Careers;
