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
  const { t } = useTranslation(); // Translation namespace

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

  const handleDeleteLogo = async () => {
    try {
      await deleteLogo().unwrap();
      setTempData((prev) => ({ ...prev, logo: null }));
      message.success(t("logoDeleted"));
    } catch (error) {
      message.error(t("logoDeleteFailed"));
    }
  };

  const handleUploadLogo = async ({ file }) => {
    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await updateCompany(formData).unwrap();
      setTempData((prev) => ({ ...prev, logo: response.logo }));
      message.success(t("logoUploaded"));
    } catch (error) {
      message.error(t("logoUploadFailed"));
    }
  };

  const renderField = (label, field) => (
    <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
      <Col xs={24} md={6}>
        <strong>{t(label)}</strong>
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
          {editingField === field ? t("editing") : t("edit")}
        </Button>
      </Col>
    </Row>
  );

  return (
    <Card
      title={<Title level={4}>{t("companyManagement")}</Title>}
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

          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
            <Col xs={24} md={6}>
              <strong>{t("logo")}</strong>
            </Col>
            <Col xs={24} md={12}>
              {tempData.logo ? (
                <img
                  src={tempData.logo}
                  alt={t("logo")}
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                />
              ) : (
                <p>{t("noLogo")}</p>
              )}
            </Col>
            <Col xs={24} md={6} style={{ textAlign: "right" }}>
              <Upload
                accept="image/*"
                customRequest={handleUploadLogo}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>{t("uploadLogo")}</Button>
              </Upload>
              {tempData.logo && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteLogo}
                >
                  {t("deleteLogo")}
                </Button>
              )}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Title level={5}>{t("socialNetworks")}</Title>
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
                  {t("delete")}
                </Button>
              </Col>
            </Row>
          ))}

          <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
            <Col xs={24} md={18}>
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
            <Col xs={24} md={6}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddSocial}
                block
              >
                {t("add")}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default CompanyAdmin;
