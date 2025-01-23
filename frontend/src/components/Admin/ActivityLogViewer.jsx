import React, { useState } from "react";
import { Button, Drawer, List, Card, Tag, Typography, Divider } from "antd";
import { useGetActivityLogsQuery } from "../../redux/api/activityLogApi";
import { useGetRolesQuery } from "../../redux/api/roleApi";
import { useLocation } from "react-router-dom"; // Import useLocation
import moment from "moment";
import { EditOutlined, TableOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const ActivityLogViewer = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const location = useLocation(); // Lấy URL hiện tại

  // Kiểm tra nếu URL hiện tại là Blog hoặc Users
  const isBlogOrUsersPage =
    location.pathname.includes("/bloglist") ||
    location.pathname.includes("/userlist");

  const {
    data: logs,
    isLoading: logsLoading,
    isError: logsError,
  } = useGetActivityLogsQuery();
  const { data: rolesResponse, isLoading: rolesLoading } = useGetRolesQuery();
  const roles = rolesResponse?.data || [];

  const customFontStyle = {
    fontFamily: "Noto Sans JP, sans-serif",
  };

  const formatTime = (time) =>
    time ? moment(time).format("DD/MM/YYYY HH:mm") : t("History_view.no_data");

  const formatUpperCase = (text) => {
    return text ? text.toUpperCase() : t("History_view.no_data");
  };

  const formatTitle = (key) => {
    const rawTitle = t(`History_view.${key}`, key); // Lấy từ khóa dịch hoặc key mặc định
    return rawTitle
      .replace(/_/g, " ") // Thay dấu gạch dưới bằng khoảng trắng
      .toLowerCase() // Chuyển toàn bộ thành chữ thường
      .replace(/^\w/, (char) => char.toUpperCase()); // Chỉ viết hoa chữ cái đầu tiên
  };

  const formatValue = (key, value) => {
    if (key === "is_active") {
      return value ? t("History_view.active") : t("History_view.inactive");
    }

    if (key === "is_visible") {
      return value ? t("History_view.visible") : t("History_view.invisible");
    }

    if (key === "role_id") {
      const role = roles.find((r) => r.id === value);
      return role ? role.name : t("History_view.unknown_role");
    }

    if (key.includes("_at")) {
      return formatTime(value);
    }

    return value ?? t("History_view.no_data");
  };

  const renderLogDetails = (log) => {
    const oldData = log.old_data ? JSON.parse(log.old_data) : {};
    const newData = log.new_data ? JSON.parse(log.new_data) : {};

    const truncateValue = (value) => {
      if (!value) return t("History_view.no_data");
      if (typeof value === "string" && value.length > 50) {
        return `${value.substring(0, 50)}...`; // Cắt chuỗi dài và thêm dấu "..."
      }
      return value;
    };

    const formatComplexValue = (value) => {
      if (Array.isArray(value)) {
        return `[${value.join(", ")}]`; // Chuyển mảng thành chuỗi
      }
      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value, null, 2); // Chuyển object thành JSON dễ đọc
      }
      return value;
    };

    const changes = Object.keys(newData).map((key) => {
      const field = formatTitle(key);

      let oldValue =
        key === "is_visible"
          ? oldData[key] === true
            ? t("History_view.visible")
            : t("History_view.invisible")
          : formatValue(key, oldData[key]);

      let newValue =
        key === "is_visible"
          ? newData[key] === true
            ? t("History_view.visible")
            : t("History_view.invisible")
          : formatValue(key, newData[key]);

      oldValue = truncateValue(formatComplexValue(oldValue));
      newValue = truncateValue(formatComplexValue(newValue));

      return {
        field,
        oldValue,
        newValue,
      };
    });

    return (
      <div style={{ marginTop: "8px", ...customFontStyle }}>
        {changes.length > 0 ? (
          changes.map((change, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <Tag
                color="purple"
                style={{ fontSize: "14px", ...customFontStyle }}
              >
                {change.field}
              </Tag>{" "}
              <Text delete style={{ color: "red", ...customFontStyle }}>
                {change.oldValue}
              </Text>{" "}
              <Text strong style={{ color: "blue", ...customFontStyle }}>
                → {change.newValue}
              </Text>
            </div>
          ))
        ) : (
          <Text style={customFontStyle}>
            {t("History_view.no_data_changes")}
          </Text>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center ">
        {isBlogOrUsersPage && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setVisible(true)}
            className="inline-block relative mb-4 z-10 font-sans"
          >
            {t("History_view.view_edit_history")}
          </Button>
        )}
      </div>

      <Drawer
        title={
          <Title level={4} style={customFontStyle}>
            {t("History_view.edit_history")}
          </Title>
        }
        placement="right"
        closable
        onClose={() => setVisible(false)}
        visible={visible}
        width={800}
      >
        {logsLoading || rolesLoading ? (
          <p style={customFontStyle}>{t("History_view.loading_data")}</p>
        ) : logsError ? (
          <p style={customFontStyle}>{t("History_view.error_loading_data")}</p>
        ) : (
          <List
            dataSource={logs?.data || []}
            renderItem={(log) => (
              <List.Item>
                <Card
                  style={{
                    border: "1px solid #f0f0f0",
                    width: "100%",
                    borderRadius: "12px",
                    backgroundColor: "#fafafa",
                  }}
                  bodyStyle={{ padding: "16px", ...customFontStyle }}
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          ...customFontStyle,
                        }}
                      >
                        <UserOutlined />
                        <strong>
                          {log.user?.name || t("History_view.unknown_user")}
                        </strong>
                      </div>
                      <Tag
                        color="blue"
                        style={{ fontSize: "12px", ...customFontStyle }}
                      >
                        {formatTime(log.created_at)}
                      </Tag>
                    </div>
                  }
                >
                  <div style={{ marginBottom: "12px" }}>
                    <TableOutlined style={{ marginRight: "8px" }} />
                    <strong>{t("History_view.table")}:</strong>{" "}
                    <Text strong style={customFontStyle}>
                      {formatUpperCase(log.table_name)}
                    </Text>
                  </div>
                  <div>
                    <strong>{t("History_view.action")}:</strong>{" "}
                    <Tag
                      color={
                        log.action === "update"
                          ? "Green"
                          : log.action === "create"
                          ? "Blue"
                          : "Red"
                      }
                    >
                      {t(`History_view.${log.action.toLowerCase()}`)}
                    </Tag>
                  </div>
                  <div>
                    <strong>{t("History_view.record_id")}:</strong>{" "}
                    {log.record_id}
                  </div>
                  <Divider style={{ margin: "12px 0", ...customFontStyle }} />
                  <div>
                    <strong>{t("History_view.change_details")}:</strong>
                    {renderLogDetails(log)}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Drawer>
    </>
  );
};

export default ActivityLogViewer;
