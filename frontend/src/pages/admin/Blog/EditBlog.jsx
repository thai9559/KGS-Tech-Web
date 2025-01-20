import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button, Select, message, Upload } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { UploadOutlined } from "@ant-design/icons";

import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/api/blogApi";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);

  useEffect(() => {
    if (!isLoading && blog) {
      form.setFieldsValue({
        title: blog.data.title,
        slug: blog.data.slug,
        main_keyword: blog.data.main_keyword,
        secondary_keywords: blog.data.secondary_keywords,
        tags: blog.data.tags,
        category_id: blog.data.category_id,
        meta_title: blog.data.meta_title,
        meta_description: blog.data.meta_description,
        focus_keyword: blog.data.focus_keyword,
        canonical_url: blog.data.canonical_url,
      });

      setContent(blog.data.content);

      // Lấy ảnh tiêu đề từ dữ liệu API
      if (blog.data.thumbnail_image) {
        setThumbnailImage(blog.data.thumbnail_image);
      }
    }
  }, [blog, isLoading, form]);

  const handleFinish = async (values) => {
    try {
      const images =
        content
          .match(/<img[^>]+src="([^">]+)"/g)
          ?.map((img) => img.match(/src="([^">]+)"/)[1]) || [];

      const payload = {
        ...values,
        content,
        images,
        thumbnail_image: thumbnailImage, // Thêm ảnh tiêu đề vào payload
      };

      await updateBlog({ id, ...payload }).unwrap();
      message.success("Cập nhật bài viết thành công!");
      navigate("/admin/bloglist");
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      message.error("Cập nhật bài viết thất bại!");
    }
  };

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        message.success("Upload ảnh thành công!");
        setThumbnailImage(data.location); // Lưu URL ảnh vào state
      } else {
        message.error("Upload ảnh thất bại!");
      }
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      message.error("Có lỗi xảy ra khi upload ảnh.");
    }
  };

  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (isError) {
    return <p>Không thể tải dữ liệu blog. Vui lòng thử lại!</p>;
  }

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
        <h1 style={{ color: "#fff", margin: 0 }}>Chỉnh Sửa Bài Viết</h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
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
            rules={[{ required: true, message: "Vui lòng nhập từ khóa phụ!" }]}
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
          <Form.Item label="Ảnh Tiêu Đề">
            <Upload
              accept="image/*"
              customRequest={handleUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Chọn Ảnh Tiêu Đề</Button>
            </Upload>
            {thumbnailImage && (
              <img
                src={thumbnailImage}
                alt="Ảnh Tiêu Đề"
                style={{ marginTop: 10, maxWidth: "100%" }}
              />
            )}
          </Form.Item>
          <Form.Item label="Nội Dung">
            <Editor
              tinymceScriptSrc="https://cdn.tiny.cloud/1/9dsiwvmjoqjrozos58bg410o56uilmv29czcut6wjykwcvc1/tinymce/5/tinymce.min.js"
              value={content}
              onEditorChange={(value) => setContent(value)}
              init={{
                height: 500,
                branding: false,
                menubar: true,
                plugins: ["image", "link", "code", "imagetools"],
                toolbar: `undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image imagetools media link anchor | table hr blockquote subscript superscript | code removeformat fullscreen preview`,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu Thay Đổi
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

export default EditBlog;
