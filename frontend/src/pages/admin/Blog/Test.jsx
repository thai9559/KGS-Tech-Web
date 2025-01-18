import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button, Select, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Giao diện

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const Test = () => {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Tiêu đề H1, H2, H3
      ["bold", "italic", "underline", "strike"], // In đậm, nghiêng, gạch chân, gạch ngang
      [{ list: "ordered" }, { list: "bullet" }], // Danh sách
      ["link", "image"], // Chèn liên kết và hình ảnh
      ["clean"], // Xóa định dạng
    ],
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
        <Form layout="vertical">
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
            <ReactQuill
              value={content}
              modules={quillModules}
              theme="snow"
              placeholder="Nhập nội dung bài viết của bạn..."
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

export default Test;
