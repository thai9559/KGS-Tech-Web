import React, { useState } from "react";
import { Button, Drawer, List, Card, Tag, Typography, Divider } from "antd";
import { useGetActivityLogsQuery } from "../../redux/api/activityLogApi";
import { useGetRolesQuery } from "../../redux/api/roleApi";
import moment from "moment";

const { Title, Text } = Typography;

const ActivityLogViewer = () => {
  const [visible, setVisible] = useState(false);
  const {
    data: logs,
    isLoading: logsLoading,
    isError: logsError,
  } = useGetActivityLogsQuery();
  const { data: rolesResponse, isLoading: rolesLoading } = useGetRolesQuery();
  const roles = rolesResponse?.data || []; // Truy cập 'data' để lấy mảng vai trò

  // Hàm format thời gian
  const formatTime = (time) =>
    time ? moment(time).format("DD/MM/YYYY HH:mm") : "N/A";

  // Hàm chuyển đổi key sang dạng Title Case
  const formatTitle = (key) => {
    return key
      .replace(/_/g, " ") // Thay dấu gạch dưới bằng khoảng trắng
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa chữ cái đầu
  };

  const formatValue = (key, value) => {
    if (key === "is_active") {
      return value ? "Active" : "Inactive";
    }

    if (key === "role_id") {
      const role = roles.find((r) => r.id === value); // Tìm vai trò theo id
      return role ? role.name : "Unknown Role";
    }

    if (key.includes("_at")) {
      return formatTime(value); // Format thời gian nếu là created_at hoặc updated_at
    }

    return value ?? "N/A";
  };

  const renderLogDetails = (log) => {
    const oldData = log.old_data ? JSON.parse(log.old_data) : {};
    const newData = log.new_data ? JSON.parse(log.new_data) : {};

    const changes = Object.keys(newData).map((key) => ({
      field: formatTitle(key), // Format key thành Title Case
      oldValue: formatValue(key, oldData[key]),
      newValue: formatValue(key, newData[key]),
    }));

    return (
      <div style={{ marginTop: "8px" }}>
        {changes.length > 0 ? (
          changes.map((change, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <Tag color="blue" style={{ fontSize: "14px" }}>
                {change.field}
              </Tag>{" "}
              <Text type="danger">{change.oldValue}</Text>{" "}
              <Text strong style={{ color: "green" }}>
                → {change.newValue}
              </Text>
            </div>
          ))
        ) : (
          <Text>Không có thay đổi dữ liệu</Text>
        )}
      </div>
    );
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setVisible(true)}
        style={{ margin: "16px" }}
      >
        Xem lịch sử chỉnh sửa
      </Button>

      <Drawer
        title={<Title level={4}>Lịch sử chỉnh sửa</Title>}
        placement="right"
        closable
        onClose={() => setVisible(false)}
        visible={visible}
        width={800}
      >
        {logsLoading || rolesLoading ? (
          <p>Đang tải dữ liệu...</p>
        ) : logsError ? (
          <p>Có lỗi xảy ra khi tải dữ liệu!</p>
        ) : (
          <List
            dataSource={logs?.data || []}
            renderItem={(log) => (
              <List.Item>
                <Card
                  style={{ border: "1px solid #f0f0f0", borderRadius: "8px" }}
                  bodyStyle={{ padding: "16px" }}
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>
                        <strong>User:</strong> {log.user?.name || "Unknown"}
                      </Text>
                      <Tag color="cyan" style={{ fontSize: "12px" }}>
                        {formatTime(log.created_at)}
                      </Tag>
                    </div>
                  }
                >
                  <p>
                    <strong>Action:</strong>{" "}
                    <Tag color={log.action === "update" ? "green" : "red"}>
                      {log.action}
                    </Tag>
                  </p>
                  <p>
                    <strong>Bảng:</strong> {log.table_name}
                  </p>
                  <p>
                    <strong>Record ID:</strong> {log.record_id}
                  </p>
                  <Divider style={{ margin: "12px 0" }} />
                  <div>
                    <strong>Chi tiết thay đổi:</strong>
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
