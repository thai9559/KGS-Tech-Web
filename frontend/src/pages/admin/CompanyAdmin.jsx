import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Select,
  Typography,
  Space,
  message,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const SOCIAL_OPTIONS = [
  { key: "facebook", label: "Facebook", icon: <FacebookOutlined /> },
  { key: "twitter", label: "Twitter", icon: <TwitterOutlined /> },
  { key: "youtube", label: "YouTube", icon: <YoutubeOutlined /> },
  { key: "instagram", label: "Instagram", icon: <InstagramOutlined /> },
  { key: "linkedin", label: "LinkedIn", icon: <LinkedinOutlined /> },
];

const CompanyAdmin = () => {
  const [company, setCompany] = useState(null); // Thông tin công ty
  const [editingField, setEditingField] = useState(null); // Mục đang chỉnh sửa
  const [tempData, setTempData] = useState({}); // Dữ liệu tạm thời khi chỉnh sửa
  const [newSocial, setNewSocial] = useState(""); // Mạng xã hội mới được chọn

  // Giả lập API fetch thông tin công ty
  const fetchCompany = () => {
    setTimeout(() => {
      setCompany({
        name: "Công ty TNHH ABC",
        email: "contact@abccompany.com",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        website: "https://abccompany.com",
        social_links: [
          { key: "facebook", url: "https://facebook.com/abccompany" },
          { key: "twitter", url: "https://twitter.com/abccompany" },
        ],
      });
      setTempData({
        name: "Công ty TNHH ABC",
        email: "contact@abccompany.com",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        website: "https://abccompany.com",
        social_links: [
          { key: "facebook", url: "https://facebook.com/abccompany" },
          { key: "twitter", url: "https://twitter.com/abccompany" },
        ],
      });
    }, 500);
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  // Bắt đầu chỉnh sửa một mục
  const startEditing = (field) => {
    setEditingField(field);
  };

  // Lưu chỉnh sửa vào tempData
  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Lưu toàn bộ thay đổi
  const saveChanges = () => {
    setCompany(tempData); // Cập nhật thông tin hiển thị
    message.success("Thông tin công ty đã được lưu!");
    setEditingField(null);
  };

  // Thêm mạng xã hội mới
  const handleAddSocial = () => {
    if (
      newSocial &&
      !tempData.social_links.find((s) => s.key === newSocial)
    ) {
      setTempData((prev) => ({
        ...prev,
        social_links: [...prev.social_links, { key: newSocial, url: "" }],
      }));
      setNewSocial(""); // Reset lựa chọn
    } else {
      message.warning("Mạng xã hội này đã được thêm hoặc chưa được chọn!");
    }
  };

  // Cập nhật URL mạng xã hội
  const handleSocialChange = (index, value) => {
    const updatedLinks = [...tempData.social_links];
    updatedLinks[index].url = value;
    setTempData((prev) => ({
      ...prev,
      social_links: updatedLinks,
    }));
  };

  // Xóa mạng xã hội
  const handleDeleteSocial = (index) => {
    const updatedLinks = [...tempData.social_links];
    updatedLinks.splice(index, 1);
    setTempData((prev) => ({
      ...prev,
      social_links: updatedLinks,
    }));
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
          <span>{company && company[field]}</span>
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
          disabled={!editingField}
        >
          Lưu thay đổi
        </Button>
      }
    >
      {company ? (
        <>
          {renderField("Tên công ty", "name")}
          {renderField("Email", "email")}
          {renderField("Số điện thoại", "phone")}
          {renderField("Địa chỉ", "address")}
          {renderField("Website", "website")}

          {/* Mạng xã hội */}
          <Row>
            <Col span={24}>
              <Title level={5}>Mạng Xã Hội</Title>
            </Col>
          </Row>
          {tempData.social_links.map((social, index) => (
            <Row
              key={social.key}
              gutter={[16, 16]}
              align="middle"
              style={{ marginBottom: 16 }}
            >
              <Col xs={24} md={6}>
                {SOCIAL_OPTIONS.find((s) => s.key === social.key)?.icon}{" "}
                <strong>
                  {SOCIAL_OPTIONS.find((s) => s.key === social.key)?.label}
                </strong>
              </Col>
              <Col xs={24} md={12}>
                <Input
                  placeholder="Nhập liên kết"
                  value={social.url}
                  onChange={(e) => handleSocialChange(index, e.target.value)}
                />
              </Col>
              <Col xs={24} md={6} style={{ textAlign: "right" }}>
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
                    !tempData.social_links.some((social) => social.key === option.key)
                ).map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.icon} {option.label}
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
      ) : (
        <p>Đang tải thông tin công ty...</p>
      )}
    </Card>
  );
};

export default CompanyAdmin;
