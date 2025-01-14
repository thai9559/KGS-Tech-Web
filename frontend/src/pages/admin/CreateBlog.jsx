import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button, Select, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCreateBlogMutation } from "../../redux/api/blogApi";

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
              {/* Tiêu đề bài viết */}
              <Form.Item
                name="title"
                label="Tiêu Đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>

              {/* Từ khóa chính */}
              <Form.Item
                name="main_keyword"
                label="Từ Khóa Chính"
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa chính!" },
                ]}
              >
                <Input placeholder="Nhập từ khóa chính" />
              </Form.Item>

              {/* Tags */}
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
              {/* Slug */}
              <Form.Item
                name="slug"
                label="Slug (URL thân thiện SEO)"
                rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
              >
                <Input placeholder="Nhập slug" />
              </Form.Item>

              {/* Từ khóa phụ */}
              <Form.Item
                name="secondary_keywords"
                label="Từ Khóa Phụ"
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa phụ!" },
                ]}
              >
                <Input placeholder="Nhập từ khóa phụ, cách nhau bằng dấu phẩy" />
              </Form.Item>

              {/* Danh mục */}
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
              apiKey="9dsiwvmjoqjrozos58bg410o56uilmv29czcut6wjykwcvc1" // Thay bằng API key hợp lệ
              value={content}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
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
