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
} from "../../../redux/api/companyApi";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

      message.success(t("successMessage"));
      setIsDirty(false);
    } catch (error) {
      message.error(t("errorMessage"));
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
      message.warning(t("socialAlreadyAdded"));
    }
  };

  const handleDeleteSocial = (index) => {
    const updatedLinks = [...tempData.social_links];
    updatedLinks.splice(index, 1);
    setTempData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const renderField = (label, field) => (
    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
      <Col xs={24} md={6}>
        <strong>{t(label)}</strong>
      </Col>
      <Col xs={24} md={15}>
        {" "}
        {/* Input dài ra */}
        {editingField === field ? (
          <Input
            value={tempData[field]}
            onChange={(e) =>
              setTempData((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
        ) : (
          <span>{tempData[field]}</span>
        )}
      </Col>
      <Col xs={24} md={3} style={{ textAlign: "right" }}>
        {" "}
        {/* Nút Chỉnh sửa */}
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setEditingField(editingField === field ? null : field)}
          style={{
            backgroundColor: "green", // Thêm màu xanh lá
            color: "white",
            width: "100%", // Đảm bảo nút có độ rộng đầy đủ
          }}
        >
          {editingField === field ? t("editing") : t("edit")}
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <Card
        title={<Title level={4}>{t("companyInformation")}</Title>}
        extra={
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={saveChanges}
            disabled={!isDirty}
          >
            {t("saveChanges")}
          </Button>
        }
        style={{ marginBottom: 24 }}
      >
        {isLoading ? (
          <p>{t("loadingCompanyInfo")}</p>
        ) : (
          <>
            {renderField("name", "name")}
            {renderField("email", "email")}
            {renderField("phone", "phone")}
            {renderField("address", "address")}
            {renderField("website", "website")}
            {renderField("description", "description")}
          </>
        )}
      </Card>

      <Card
        title={<Title level={4}>{t("companyLogo")}</Title>}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]} align="middle">
          {/* Cột chứa logo */}
          <Col xs={24} md={21} style={{ textAlign: "center" }}>
            {" "}
            {/* 75% cho logo */}
            {tempData.logo ? (
              <img
                src={tempData.logo}
                alt={t("logo")}
                style={{
                  maxHeight: "100px",
                  maxWidth: "100px",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                  padding: "4px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ) : (
              <p style={{ color: "#888" }}>{t("noLogo")}</p>
            )}
          </Col>

          {/* Cột chứa các nút */}
          <Col
            xs={24}
            md={3} /* 25% cho nút */
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end", // Đặt nút ở cuối cột
              alignItems: "right", // Căn giữa nội dung
              gap: "8px",
            }}
          >
            <Upload
              accept="image/*"
              customRequest={({ file }) =>
                setTempData((prev) => ({ ...prev, logo: file }))
              }
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  color: "white",
                  width: "163px", // Đồng nhất kích thước nút
                }}
              >
                {t("uploadLogo")}
              </Button>
            </Upload>

            {tempData.logo && (
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "163px", // Đồng nhất kích thước nút
                }}
                onClick={() => setTempData((prev) => ({ ...prev, logo: null }))}
              >
                {t("deleteLogo")}
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <Card title={<Title level={4}>{t("socialMedia")}</Title>}>
        {tempData.social_links.map((social, index) => (
          <Row
            key={index}
            gutter={[16, 16]}
            align="middle"
            style={{ marginBottom: 16 }}
          >
            <Col xs={24} md={6}>
              {" "}
              {/* Cột nhãn mạng xã hội */}
              {SOCIAL_OPTIONS.find((s) => s.key === social.key)?.label}
            </Col>
            <Col xs={24} md={15}>
              {" "}
              {/* Cột Input */}
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
            <Col xs={24} md={3} style={{ textAlign: "right" }}>
              {" "}
              {/* Cột nút Xóa */}
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "100%", // Đảm bảo nút rộng hơn và cân đối
                }}
                onClick={() => handleDeleteSocial(index)}
              >
                {t("delete")}
              </Button>
            </Col>
          </Row>
        ))}

        <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
          <Col xs={24} md={21}>
            {" "}
            {/* Cột Select để dài bằng Input */}
            <Select
              placeholder={t("selectSocialNetwork")}
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
          <Col xs={24} md={3}>
            {" "}
            {/* Cột nút Thêm, nhỏ gọn */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSocial}
              block
              style={{
                backgroundColor: "#1890ff",
              }}
            >
              {t("add")}
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CompanyAdmin;
