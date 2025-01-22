import React from "react";
import { Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSwipeable } from "react-swipeable";

const RoleCard = ({ role, onEdit, onDelete, swipedCard, setSwipedCard }) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSwipedCard(role.id), // Vuốt trái để hiển thị nút xóa
    onSwipedRight: () => setSwipedCard(null), // Vuốt phải để ẩn nút xóa
  });

  return (
    <div className="relative overflow-hidden shadow-lg rounded-lg bg-white">
      {/* Swipeable container */}
      <div
        {...swipeHandlers}
        className={`flex items-center justify-between p-4 transition-transform duration-300 ${
          swipedCard === role.id ? "-translate-x-20" : "translate-x-0"
        }`}
      >
        {/* Nội dung vai trò */}
        <div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-lg font-bold text-gray-800">{role.name}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <p className="text-gray-600">{role.description}</p>
          </div>
        </div>

        {/* Nút Chỉnh sửa */}
        <div className="ml-auto">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="px-4 py-2 text-base"
            onClick={() => onEdit(role)}
          >
            Sửa
          </Button>
        </div>
      </div>

      {/* Nút Xóa */}
      <div
        className={`absolute right-0 top-0 h-full flex items-center bg-red-500 text-white px-6 transition-transform duration-300 ${
          swipedCard === role.id ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => onDelete(role.id)}
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

export default RoleCard;
