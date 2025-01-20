import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
} from "antd";
import TagsInputs from "./TagInputs";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { decodeToken } from "../../../utils/decodeToken";
import {
  useCreateBlogMutation,
  useUploadImageMutation,
} from "../../../redux/api/blogApi";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();
  const [uploadImage] = useUploadImageMutation();
  const [content, setContent] = useState("");
  const [thumbnail_image, setThumbnail_image] = useState(null);
  const navigate = useNavigate();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const handleFinish = async (values) => {
    try {
      // Lấy access_token từ localStorage
      const token = localStorage.getItem("access_token");
      const decodedToken = decodeToken(token);

      if (!decodedToken || !decodedToken.sub) {
        message.error("Không thể xác định user_id. Vui lòng đăng nhập lại.");
        return;
      }

      const userId = decodedToken.sub;

      // Tách danh sách ảnh từ nội dung bài viết
      const images =
        content
          .match(/<img[^>]+src="([^">]+)"/g)
          ?.map((img) => img.match(/src="([^">]+)"/)[1]) || [];

      const payload = {
        ...values,
        content,
        images,
        thumbnail_image: thumbnail_image, // Ảnh tiêu đề
        user_id: userId,
      };

      console.log("Payload gửi đi:", payload);

      await createBlog(payload).unwrap();
      message.success("Tạo bài viết thành công!");
      navigate("/admin/bloglist");
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      const errorMessage =
        error?.data?.message || "Tạo bài viết thất bại, kiểm tra lại dữ liệu!";
      message.error(errorMessage);
    }
  };

  const handleThumbnailImageUpload = async (file) => {
    try {
      const response = await uploadImage(file).unwrap();
      if (response.location) {
        setThumbnail_image(response.location);
        message.success("Tải ảnh tiêu đề thành công!");
      } else {
        message.error("Không nhận được URL ảnh tiêu đề hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh tiêu đề:", error);
      message.error("Có lỗi xảy ra khi upload ảnh tiêu đề.");
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
                rules={[
                  { required: true, message: "Vui lòng nhập ít nhất một tag!" },
                ]}
              >
                <TagsInputs />
              </Form.Item>

              <Form.Item
                name="meta_title"
                label="Meta Title"
                rules={[
                  { required: true, message: "Vui lòng nhập meta title!" },
                ]}
              >
                <Input placeholder="Nhập meta title cho bài viết" />
              </Form.Item>
              <Form.Item
                name="meta_description"
                label="Meta Description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập meta description!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Nhập meta description cho bài viết"
                  rows={4}
                />
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
                <Select
                  placeholder={
                    isLoadingCategories
                      ? "Đang tải danh mục..."
                      : "Chọn danh mục"
                  }
                  loading={isLoadingCategories}
                >
                  {categories?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="focus_keyword"
                label="Focus Keyword"
                rules={[
                  { required: true, message: "Vui lòng nhập focus keyword!" },
                ]}
              >
                <Input placeholder="Nhập từ khóa tập trung (focus keyword)" />
              </Form.Item>
              <Form.Item
                name="canonical_url"
                label="Canonical URL"
                rules={[
                  { required: true, message: "Vui lòng nhập canonical URL!" },
                ]}
              >
                <Input placeholder="Nhập URL canonical cho bài viết" />
              </Form.Item>

              {/* Trường tải lên ảnh tiêu đề */}
              <Form.Item
                label="Ảnh Tiêu Đề"
                valuePropName="file"
                rules={[
                  { required: true, message: "Vui lòng upload ảnh tiêu đề!" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  customRequest={({ file }) => handleThumbnailImageUpload(file)}
                >
                  {thumbnail_image ? (
                    <img
                      src={thumbnail_image}
                      alt="Ảnh tiêu đề"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Nội dung bài viết */}
          <Form.Item label="Nội Dung" required>
            <Editor
              tinymceScriptSrc="https://cdn.tiny.cloud/1/9dsiwvmjoqjrozos58bg410o56uilmv29czcut6wjykwcvc1/tinymce/5/tinymce.min.js"
              value={content}
              onEditorChange={(value) => setContent(value)}
              init={{
                height: 500,
                branding: false,
                menubar: true,
                plugins: [
                  "image",
                  "imagetools",
                  "media",
                  "link",
                  "code",
                  "fullscreen",
                ],
                toolbar: `
                undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | 
                alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | 
                image imagetools media link anchor | table hr blockquote subscript superscript | 
                code removeformat fullscreen preview
              `,
                images_upload_handler: async (blobInfo, success, failure) => {
                  try {
                    const file = blobInfo.blob();
                    const response = await uploadImage(file).unwrap();
                    if (response.location) {
                      success(response.location);
                    } else {
                      failure("Không nhận được URL ảnh hợp lệ.");
                    }
                  } catch (error) {
                    failure("Có lỗi xảy ra khi upload ảnh.");
                  }
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
