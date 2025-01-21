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
  useUpdateLogoMutation,
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
  const [updateLogo] = useUpdateLogoMutation();

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
  const [originalData, setOriginalData] = useState(null); // Dữ liệu gốc từ API
  const [editingField, setEditingField] = useState(null);
  const [newSocial, setNewSocial] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  // So sánh dữ liệu hiện tại và gốc để xác định có thay đổi hay không

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

      const updatedData = {
        ...company,
        social_links: socialLinksArray,
      };

      setTempData(updatedData);
      setOriginalData(updatedData); // Lưu dữ liệu gốc từ API
    }
  }, [companyData]);

  useEffect(() => {
    if (originalData) {
      const isFieldsChanged =
        tempData.name !== originalData.name ||
        tempData.email !== originalData.email ||
        tempData.phone !== originalData.phone ||
        tempData.address !== originalData.address ||
        tempData.website !== originalData.website ||
        tempData.description !== originalData.description ||
        JSON.stringify(tempData.social_links) !==
          JSON.stringify(originalData.social_links);

      const isLogoChanged = tempData.logo !== originalData.logo;

      // Chỉ kích hoạt `isDirty` nếu có thay đổi
      setIsDirty(isFieldsChanged || isLogoChanged);
    }
  }, [tempData, originalData]);

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
        ...tempData,
        social_links: updatedSocialLinks,
      };

      // Gửi dữ liệu cập nhật lên API
      await updateCompany(payload).unwrap();

      // Cập nhật dữ liệu gốc sau khi lưu thành công
      setOriginalData(tempData);
      setEditingField(null);
      setIsDirty(false);
      message.success(t("successMessage"));
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
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setEditingField(editingField === field ? null : field)}
          style={{
            backgroundColor: "green",
            color: "white",
            width: "100%",
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
        title={<Title level={4}>{t("companyLogo")}</Title>}
        style={{ marginBottom: 24 }}
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
        <Row gutter={[16, 16]} align="middle">
          {/* Cột chứa logo */}
          <Col xs={24} md={21} style={{ textAlign: "center" }}>
            {tempData.logo ? (
              <img
                src={tempData.logo} // URL từ API
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
            md={3}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center", // Căn giữa nút ở chế độ mobile
              gap: "8px",
            }}
          >
            <Upload
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const formData = new FormData();
                  formData.append("logo", file);

                  // Gọi API tải lên logo
                  const response = await updateLogo(formData).unwrap();

                  if (response.success) {
                    setTempData((prev) => ({
                      ...prev,
                      logo: response.data.logo,
                    }));

                    setIsDirty(true); // Bật nút "Save Changes"
                    onSuccess(null, file);
                    message.success("Tải lên logo thành công!");
                  } else {
                    throw new Error("Tải lên thất bại.");
                  }
                } catch (error) {
                  onError(error);
                  message.error("Tải lên logo thất bại.");
                }
              }}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  color: "white",
                  width: "163px", // Đầy đủ chiều rộng trên mobile
                }}
              >
                Tải lên logo
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
                  width: "100%", // Đầy đủ chiều rộng trên mobile
                }}
                onClick={async () => {
                  try {
                    const response = await deleteLogo().unwrap();
                    if (response.success) {
                      setTempData((prev) => ({
                        ...prev,
                        logo: null,
                      }));
                      message.success(t("logoDeletedSuccessfully"));
                    }
                  } catch (error) {
                    message.error(t("logoDeleteFailed"));
                  }
                }}
              >
                {t("deleteLogo")}
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <Card
        title={<Title level={4}>{t("companyInformation")}</Title>}
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
