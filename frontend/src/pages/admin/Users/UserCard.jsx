import React, { useEffect } from "react";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSwipeable } from "react-swipeable";

const UserCard = ({ user, onEdit, onDelete, swipedCard, setSwipedCard }) => {
  // Reset trạng thái vuốt khi chuyển sang giao diện PC
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setSwipedCard(null);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setSwipedCard]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSwipedCard(user.id), // Vuốt trái để hiển thị nút xóa
    onSwipedRight: () => setSwipedCard(null), // Vuốt phải để ẩn nút xóa
  });

  return (
    <div className="relative overflow-hidden shadow-md rounded-lg bg-white transition-all">
      {/* Swipeable container */}
      <div
        {...swipeHandlers}
        className={`flex items-center justify-between p-4 transition-transform duration-500 ease-in-out ${
          swipedCard === user.id ? "-translate-x-24" : "translate-x-0"
        }`}
      >
        {/* Nội dung người dùng */}
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Số điện thoại:</span>{" "}
            <span className="text-gray-600">{user.phone || "N/A"}</span>
          </div>
          <div className="mb-2">
            <span className="font-medium text-gray-700">Vai trò:</span>{" "}
            <span className="text-gray-600">
              {user.role ? user.role.name : "N/A"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Quyền:</span>{" "}
            <span className="text-gray-600">
              {user.permissions?.length
                ? user.permissions.map((perm) => perm.name).join(", ")
                : "Không có"}
            </span>
          </div>
        </div>

        {/* Nút Chỉnh sửa */}
        <div className="ml-auto">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="px-4 py-1 text-base font-medium"
            onClick={() => onEdit(user)}
          >
            Sửa
          </Button>
        </div>
      </div>

      {/* Nút Xóa */}
      <div
        className={`absolute right-0 top-0 h-full flex items-center bg-red-500 text-white px-6 transition-transform duration-500 ease-in-out ${
          swipedCard === user.id ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => onDelete(user.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <div className="flex items-center cursor-pointer">
            <DeleteOutlined className="text-xl" />
            <span className="ml-2 text-lg">Xóa</span>
          </div>
        </Popconfirm>
      </div>
    </div>
  );
};

export default UserCard;
