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
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { decodeToken } from "../../../utils/decodeToken";
import { useGetActivityLogsQuery } from "../../../redux/api/activityLogApi";
import GooglePreview from "./GooglePreview";
import {
  useCreateBlogMutation,
  useUploadImageMutation,
} from "../../../redux/api/blogApi";
import { useGetCategoriesQuery } from "../../../redux/api/categoryApi";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const CreateBlog = () => {
  const { t } = useTranslation();
  const [createBlog] = useCreateBlogMutation();
  const { refetch } = useGetActivityLogsQuery();
  const [uploadImage] = useUploadImageMutation();
  const [content, setContent] = useState("");
  const [thumbnail_image, setThumbnail_image] = useState(null);
  const [slug, setSlug] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [title, setTitle] = useState(""); // Tiêu đề
  const [description, setDescription] = useState(""); // Mô tả meta

  const navigate = useNavigate();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const createSlug = (title) => {
    const vietnameseMap = {
      a: "á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ",
      e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ",
      i: "í|ì|ỉ|ĩ|ị",
      o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ",
      u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự",
      y: "ý|ỳ|ỷ|ỹ|ỵ",
      d: "đ",
    };

    let slug = title.toLowerCase().trim();

    // Loại bỏ dấu tiếng Việt
    Object.keys(vietnameseMap).forEach((key) => {
      const regex = new RegExp(vietnameseMap[key], "g");
      slug = slug.replace(regex, key);
    });

    // Loại bỏ ký tự không hợp lệ
    slug = slug.replace(/[^a-z0-9\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/-+/g, "-");

    return slug;
  };

  // Xử lý khi người dùng nhập tiêu đề
  const handleTitleChange = (e) => {
    if (e && e.target) {
      const value = e.target.value; // Lấy giá trị từ input
      setTitle(value); // Cập nhật state title
      const generatedSlug = createSlug(value); // Tạo slug từ tiêu đề
      setSlug(generatedSlug); // Cập nhật slug
      setCanonicalUrl(`https://kgstech.com/${generatedSlug}`); // Cập nhật canonical URL
    } else {
      console.error("Sự kiện không hợp lệ:", e);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Xử lý khi submit form
  const handleFinish = async (values) => {
    try {
      const token = localStorage.getItem("access_token");
      const decodedToken = decodeToken(token);

      if (!decodedToken || !decodedToken.sub) {
        message.error("Không thể xác định user_id. Vui lòng đăng nhập lại.");
        return;
      }

      const userId = decodedToken.sub;
      const images =
        content
          .match(/<img[^>]+src="([^">]+)"/g)
          ?.map((img) => img.match(/src="([^">]+)"/)[1]) || [];

      const payload = {
        ...values,
        slug,
        canonical_url: canonicalUrl,
        content,
        images,
        thumbnail_image,
        user_id: userId,
      };

      await createBlog(payload).unwrap();
      message.success("Tạo bài viết thành công!");
      refetch();
      navigate("/admin/bloglist");
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Tạo bài viết thất bại, kiểm tra lại dữ liệu!";
      message.error(errorMessage);
    }
  };

  // Xử lý upload ảnh tiêu đề
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
      message.error("Có lỗi xảy ra khi upload ảnh tiêu đề.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "22px",
        }}
      >
        <h1 className="text-black font-notoSansJP font-bold">
          {t("create_blog.header")}
        </h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Form layout="vertical" onFinish={handleFinish}>
          {/* Hàng đầu tiên: Logo hoặc Ảnh tiêu đề */}
          <Row justify="center" className="mb-4">
            <Col span={24}>
              <Form.Item
                label={t("create_blog.thumbnail_image")}
                valuePropName="file"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: t("create_blog.validation.required"),
                  },
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
                      // style={{
                      //   maxWidth: "150px",
                      //   maxHeight: "150px",
                      //   objectFit: "cover",
                      //   borderRadius: "50%",
                      // }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>
                        {t("create_blog.upload")}
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Nhóm 2: Thông tin tiêu đề và từ khóa */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label={t("create_blog.title")}
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input
                  placeholder={t("create_blog.placeholder.title")}
                  onChange={handleTitleChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="main_keyword"
                label={t("create_blog.main_keyword")}
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa chính!" },
                ]}
              >
                <Input
                  placeholder={t("create_blog.placeholder.main_keyword")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="tags"
                label={t("create_blog.tags")}
                rules={[
                  { required: true, message: "Vui lòng nhập ít nhất một tag!" },
                ]}
              >
                <TagsInputs />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={12}>
              <Form.Item
                name="meta_title"
                label="Meta Title"
                rules={[
                  { required: true, message: "Vui lòng nhập meta title!" },
                ]}
              >
                <Input placeholder="Nhập meta title cho bài viết" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={12}>
              <Form.Item
                name="focus_keyword"
                label={t("create_blog.focus_keyword")}
                rules={[
                  { required: true, message: "Vui lòng nhập focus keyword!" },
                ]}
              >
                <Input
                  placeholder={t("create_blog.placeholder.focus_keyword")}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Nhóm 3: Thông tin liên quan đến SEO */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label={t("create_blog.slug")}>
                <Input
                  value={slug}
                  placeholder={t("create_blog.placeholder.slug")}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t("create_blog.canonical_url")}>
                <Input
                  value={canonicalUrl}
                  placeholder={t("create_blog.placeholder.canonical_url")}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="secondary_keywords"
                label={t("create_blog.secondary_keywords")}
                rules={[
                  { required: true, message: "Vui lòng nhập từ khóa phụ!" },
                ]}
              >
                <Input
                  placeholder={t("create_blog.placeholder.secondary_keywords")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category_id"
                label={t("create_blog.category")}
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select
                  placeholder={
                    isLoadingCategories
                      ? t("create_blog.loading_categories")
                      : t("create_blog.category")
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
            </Col>

            <Col xs={24} md={12}>
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
                  placeholder={t("create_blog.placeholder.meta_description")}
                  rows={4}
                  onChange={handleDescriptionChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Google Preview">
                <GooglePreview
                  title={title}
                  description={description}
                  url={canonicalUrl}
                  thumbnail={thumbnail_image}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Nội dung bài viết */}
          <Row>
            <Col span={24}>
              <Form.Item label={t("create_blog.content")} required>
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
                    toolbar: `undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image imagetools media link anchor | table hr blockquote subscript superscript | code removeformat fullscreen preview`,
                    images_upload_handler: async (
                      blobInfo,
                      success,
                      failure
                    ) => {
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
            </Col>
          </Row>

          {/* Nút Lưu */}
          <Row>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t("create_blog.save_post")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
};

export default CreateBlog;
