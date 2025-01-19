import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button, Select, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";

import { useCreateBlogMutation } from "../../../redux/api/blogApi";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();
  const [content, setContent] = useState("");

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        content,
      };

      await createBlog(payload).unwrap();
      message.success("Tạo bài viết thành công!");
    } catch (error) {
      message.error("Tạo bài viết thất bại!");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "18px",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0 }}>Tạo Bài Viết Mới</h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Form layout="vertical" onFinish={handleFinish}>
          <Row gutter={[16, 16]}>
            {/* Cột trái */}
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="Tiêu Đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>
              <Form.Item
                name="main_keyword"
                label="Từ Khóa Chính"
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa chính!" },
                ]}
              >
                <Input placeholder="Nhập từ khóa chính" />
              </Form.Item>
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: "Vui lòng nhập tags!" }]}
              >
                <Input placeholder="Nhập tags, cách nhau bằng dấu phẩy" />
              </Form.Item>
            </Col>

            {/* Cột phải */}
            <Col xs={24} md={12}>
              <Form.Item
                name="slug"
                label="Slug (URL thân thiện SEO)"
                rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
              >
                <Input placeholder="Nhập slug" />
              </Form.Item>
              <Form.Item
                name="secondary_keywords"
                label="Từ Khóa Phụ"
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa phụ!" },
                ]}
              >
                <Input placeholder="Nhập từ khóa phụ, cách nhau bằng dấu phẩy" />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Danh Mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục">
                  <Option value={1}>Danh Mục 1</Option>
                  <Option value={2}>Danh Mục 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Nội dung bài viết */}
          <Form.Item label="Nội Dung" required>
            <Editor
              apiKey="9dsiwvmjoqjrozos58bg410o56uilmv29czcut6wjykwcvc1" // Thay bằng API key TinyMCE hợp lệ
              value={content}
              onEditorChange={(value) => setContent(value)}
              init={{
                height: 500,
                branding: false,
                menubar: true,
                plugins: [
                  "image", // Plugin hỗ trợ chèn ảnh
                  "imagetools", // Plugin chỉnh sửa ảnh
                  "advlist autolink lists link charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image",
                automatic_uploads: true,
                images_upload_handler: (blobInfo, success, failure) => {
                  // Xử lý upload ảnh
                  const file = blobInfo.blob(); // Lấy tệp ảnh
                  const reader = new FileReader();

                  // Chuyển ảnh thành Base64
                  reader.onload = () => {
                    try {
                      success(reader.result); // Gọi hàm success với Base64 của ảnh
                    } catch (error) {
                      failure("Không thể tải ảnh!"); // Gọi failure nếu có lỗi
                    }
                  };

                  reader.onerror = () => {
                    failure("Không thể đọc ảnh!"); // Gọi failure nếu đọc file thất bại
                  };

                  reader.readAsDataURL(file); // Đọc ảnh dưới dạng Base64
                },
              }}
            />
          </Form.Item>

          {/* Nút Lưu */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu Bài Viết
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Hệ thống quản lý Blog ©2025
      </Footer>
    </Layout>
  );
};

export default CreateBlog;
