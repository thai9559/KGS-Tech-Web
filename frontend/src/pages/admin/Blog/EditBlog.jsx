import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TagsInputs from "./TagInputs";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
  Upload,
  Spin,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { UploadOutlined } from "@ant-design/icons";

import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/api/blogApi";
import GooglePreview from "./GooglePreview";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

const EditBlog = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [googlePreviewData, setGooglePreviewData] = useState({
    title: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    if (!isLoading && blog) {
      form.setFieldsValue({
        title: blog.data.title,
        slug: blog.data.slug,
        main_keyword: blog.data.main_keyword,
        secondary_keywords: blog.data.secondary_keywords,
        tags: Array.isArray(blog.data.tags)
          ? blog.data.tags
          : JSON.parse(blog.data.tags || "[]"),
        category_id: blog.data.category_id,
        meta_title: blog.data.meta_title,
        meta_description: blog.data.meta_description,
        focus_keyword: blog.data.focus_keyword,
        canonical_url: blog.data.canonical_url,
      });

      setContent(blog.data.content);

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
        thumbnail_image: thumbnailImage,
      };

      await updateBlog({ id, ...payload }).unwrap();
      message.success(t("edit_blog.messages.success")); // Dùng i18n để dịch
      navigate("/admin/bloglist");
    } catch (error) {
      console.error(t("edit_blog.messages.error"), error); // Thông báo lỗi đã được dịch
      message.error(t("edit_blog.messages.error"));
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
        message.success(t("edit_blog.form.fields.thumbnail_image.success")); // Dùng i18n để dịch
        setThumbnailImage(data.location);
      } else {
        message.error(t("edit_blog.form.fields.thumbnail_image.error")); // Dùng i18n để dịch
      }
    } catch (error) {
      console.error(t("edit_blog.form.fields.thumbnail_image.error"), error); // Log lỗi đã được dịch
      message.error(t("edit_blog.form.fields.thumbnail_image.error"));
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (isError) {
    return <p>Không thể tải dữ liệu blog. Vui lòng thử lại!</p>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#f5f5f5",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "18px",
        }}
      >
        <h1 className="text-black font-notoSansJP font-bold">
          {t("edit_blog.header.title")}
        </h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label={t("edit_blog.form.fields.title.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.title.error"),
                  },
                ]}
              >
                <Input
                  placeholder={t("edit_blog.form.fields.title.placeholder")}
                  onChange={(e) =>
                    setGooglePreviewData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="main_keyword"
                label={t("edit_blog.form.fields.main_keyword.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.main_keyword.error"),
                  },
                ]}
              >
                <Input
                  placeholder={t(
                    "edit_blog.form.fields.main_keyword.placeholder"
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="secondary_keywords"
                label={t("edit_blog.form.fields.secondary_keywords.label")}
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa phụ!" },
                ]}
              >
                <Input
                  placeholder={t(
                    "edit_blog.form.fields.secondary_keywords.placeholder"
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="tags"
                label={t("edit_blog.form.fields.tags.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.tags.error"),
                  },
                ]}
              >
                <TagsInputs />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="slug"
                label={t("edit_blog.form.fields.slug.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.slug.error"),
                  },
                  {
                    max: 60,
                    message: t("edit_blog.form.fields.slug.error_max_length"),
                  },
                ]}
              >
                <Input
                  placeholder={t("edit_blog.form.fields.slug.placeholder")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category_id"
                label={t("edit_blog.form.fields.category_id.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.category_id.error"),
                  },
                ]}
              >
                <Select
                  placeholder={t(
                    "edit_blog.form.fields.category_id.placeholder"
                  )}
                >
                  <Option value={1}>Danh Mục 1</Option>
                  <Option value={2}>Danh Mục 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="focus_keyword"
                label={t("edit_blog.form.fields.focus_keyword.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.focus_keyword.error"),
                  },
                ]}
              >
                <Input
                  placeholder={t(
                    "edit_blog.form.fields.focus_keyword.placeholder"
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="canonical_url"
                label={t("edit_blog.form.fields.canonical_url.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.canonical_url.error"),
                  },
                  {
                    type: "url",
                    message: t(
                      "edit_blog.form.fields.canonical_url.error_format"
                    ),
                  },
                ]}
                onChange={(e) =>
                  setGooglePreviewData((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
              >
                <Input
                  placeholder={t(
                    "edit_blog.form.fields.canonical_url.placeholder"
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* <Col xs={24} md={12}>
              <Form.Item
                name="meta_title"
                label="Meta Title"
                rules={[
                  { required: true, message: "Vui lòng nhập Meta Title!" },
                ]}
              >
                <Input placeholder="Nhập Meta Title" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={12}>
              <Form.Item
                name="meta_description"
                label={t("edit_blog.form.fields.meta_description.label")}
                rules={[
                  {
                    required: true,
                    message: t("edit_blog.form.fields.meta_description.error"),
                  },
                ]}
                onChange={(e) =>
                  setGooglePreviewData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              >
                <Input.TextArea
                  placeholder={t(
                    "edit_blog.form.fields.meta_description.placeholder"
                  )}
                  rows={6}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={t("edit_blog.form.fields.google_preview.label")}
              >
                <GooglePreview
                  title={form.getFieldValue("title")}
                  description={form.getFieldValue("meta_description")}
                  url={form.getFieldValue("canonical_url")}
                  thumbnail={thumbnailImage}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("edit_blog.form.fields.thumbnail_image.label")}
              >
                <Upload
                  accept="image/*"
                  customRequest={handleUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>
                    {t("edit_blog.form.fields.thumbnail_image.button")}
                  </Button>
                </Upload>
                {thumbnailImage && (
                  <img
                    src={thumbnailImage}
                    alt={t("edit_blog.form.fields.thumbnail_image.alt")}
                    style={{ marginTop: 10, maxWidth: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label={t("edit_blog.form.fields.content.label")}>
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
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={24} md={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t("edit_blog.form.submit_button.text")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
};

export default EditBlog;
