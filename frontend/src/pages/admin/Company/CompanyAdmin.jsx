import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Select,
  Typography,
  message,
  Upload,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteLogoMutation,
} from "../../../redux/api/CompanyApi";

const { Title } = Typography;
const { Option } = Select;

const SOCIAL_OPTIONS = [
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter" },
  { key: "youtube", label: "YouTube" },
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
];

const CompanyAdmin = () => {
  const { data: companyData, isLoading } = useGetCompanyQuery();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteLogo] = useDeleteLogoMutation();

  const [tempData, setTempData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
    logo: null,
    social_links: [],
  });
  const [isDirty, setIsDirty] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [newSocial, setNewSocial] = useState("");

  useEffect(() => {
    if (companyData?.success) {
      const company = companyData.data;

      // Parse social_links nếu cần
      const socialLinksArray = company.social_links
        ? Object.entries(
            typeof company.social_links === "string"
              ? JSON.parse(company.social_links)
              : company.social_links
          ).map(([key, url]) => ({ key, url }))
        : [];

      setTempData({
        ...company,
        social_links: socialLinksArray,
      });
    }
  }, [companyData]);

  useEffect(() => {
    if (companyData?.success) {
      const company = companyData.data;

      // Xác định thay đổi trong social_links và các trường khác
      const socialLinksChanged =
        JSON.stringify(
          tempData.social_links.reduce((acc, { key, url }) => {
            acc[key] = url;
            return acc;
          }, {})
        ) !== JSON.stringify(company.social_links || {});

      const otherFieldsChanged =
        tempData.name !== company.name ||
        tempData.email !== company.email ||
        tempData.phone !== company.phone ||
        tempData.address !== company.address ||
        tempData.website !== company.website ||
        tempData.description !== company.description ||
        tempData.logo !== company.logo;

      setIsDirty(socialLinksChanged || otherFieldsChanged);
    }
  }, [tempData, companyData]);

  const startEditing = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    try {
      const updatedSocialLinks = tempData.social_links.reduce(
        (acc, { key, url }) => {
          acc[key] = url;
          return acc;
        },
        {}
      );

      const payload = {
        name: tempData.name,
        email: tempData.email,
        phone: tempData.phone,
        address: tempData.address,
        website: tempData.website,
        description: tempData.description,
        social_links: updatedSocialLinks,
      };

      if (tempData.logo instanceof File) {
        const formData = new FormData();
        Object.keys(payload).forEach((key) => {
          if (key === "social_links") {
            formData.append(key, JSON.stringify(payload[key]));
          } else {
            formData.append(key, payload[key]);
          }
        });
        formData.append("logo", tempData.logo);
        await updateCompany(formData).unwrap();
      } else {
        await updateCompany(payload).unwrap();
      }

      message.success("Thông tin công ty đã được lưu!");
      setIsDirty(false);
    } catch (error) {
      message.error("Lưu thông tin thất bại!");
    }
  };

  const handleAddSocial = () => {
    if (newSocial && !tempData.social_links.some((s) => s.key === newSocial)) {
      setTempData((prev) => ({
        ...prev,
        social_links: [...prev.social_links, { key: newSocial, url: "" }],
      }));
      setNewSocial("");
    } else {
      message.warning("Mạng xã hội này đã được thêm hoặc chưa được chọn!");
    }
  };

  const handleDeleteSocial = (index) => {
    const updatedLinks = [...tempData.social_links];
    updatedLinks.splice(index, 1);
    setTempData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleDeleteLogo = async () => {
    try {
      await deleteLogo().unwrap();
      setTempData((prev) => ({ ...prev, logo: null }));
      message.success("Logo đã được xóa!");
    } catch (error) {
      message.error("Xóa logo thất bại!");
    }
  };

  const handleUploadLogo = async ({ file }) => {
    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await updateCompany(formData).unwrap();
      setTempData((prev) => ({ ...prev, logo: response.logo }));
      message.success("Logo đã được cập nhật!");
    } catch (error) {
      message.error("Tải lên logo thất bại!");
    }
  };

  const renderField = (label, field) => (
    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
      <Col xs={24} md={6}>
        <strong>{label}</strong>
      </Col>
      <Col xs={24} md={12}>
        {editingField === field ? (
          <Input
            value={tempData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ) : (
          <span>{tempData[field]}</span>
        )}
      </Col>
      <Col xs={24} md={6} style={{ textAlign: "right" }}>
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => startEditing(field)}
        >
          {editingField === field ? "Đang chỉnh sửa" : "Chỉnh sửa"}
        </Button>
      </Col>
    </Row>
  );

  return (
    <Card
      title={<Title level={4}>Quản lý Công ty</Title>}
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={saveChanges}
          disabled={!isDirty}
        >
          Lưu thay đổi
        </Button>
      }
    >
      {isLoading ? (
        <p>Đang tải thông tin công ty...</p>
      ) : (
        <>
          {renderField("Tên công ty", "name")}
          {renderField("Email", "email")}
          {renderField("Số điện thoại", "phone")}
          {renderField("Địa chỉ", "address")}
          {renderField("Website", "website")}
          {renderField("Mô tả", "description")}

          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
            <Col xs={24} md={6}>
              <strong>Logo</strong>
            </Col>
            <Col xs={24} md={12}>
              {tempData.logo ? (
                <img
                  src={tempData.logo}
                  alt="Company Logo"
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                />
              ) : (
                <p>Chưa có logo</p>
              )}
            </Col>
            <Col xs={24} md={6} style={{ textAlign: "right" }}>
              <Upload
                accept="image/*"
                customRequest={handleUploadLogo}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Tải lên Logo</Button>
              </Upload>
              {tempData.logo && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteLogo}
                >
                  Xóa Logo
                </Button>
              )}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Title level={5}>Mạng Xã Hội</Title>
            </Col>
          </Row>
          {tempData.social_links.map((social, index) => (
            <Row
              key={social.key || index}
              gutter={[16, 16]}
              align="middle"
              style={{ marginBottom: "16px" }}
            >
              <Col xs={24} md={6}>
                {SOCIAL_OPTIONS.find((s) => s.key === social.key)?.label}
              </Col>
              <Col xs={24} md={12}>
                <Input
                  value={social.url}
                  onChange={(e) => {
                    const updatedLinks = [...tempData.social_links];
                    updatedLinks[index].url = e.target.value;
                    setTempData((prev) => ({
                      ...prev,
                      social_links: updatedLinks,
                    }));
                  }}
                />
              </Col>
              <Col xs={24} md={6}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteSocial(index)}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          ))}

          <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
            <Col xs={24} md={18}>
              <Select
                placeholder="Chọn mạng xã hội"
                value={newSocial}
                onChange={(value) => setNewSocial(value)}
                style={{ width: "100%" }}
              >
                {SOCIAL_OPTIONS.filter(
                  (option) =>
                    !tempData.social_links.some(
                      (social) => social.key === option.key
                    )
                ).map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddSocial}
                block
              >
                Thêm
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default CompanyAdmin;
