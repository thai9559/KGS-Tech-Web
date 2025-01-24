import React, { useState } from "react";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import Animation from "../../../components/Animation";
const RoleCard = ({ role, onEdit, onDelete }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Mở popup
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Đóng popup
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* Card */}
      <div
        className="relative flex flex-col items-center text-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
        onClick={showPopup} // Mở popup khi click vào card
      >
        {/* Icon vai trò */}
        <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
          <UserOutlined className="text-4xl text-white" />
        </div>

        {/* Nội dung vai trò */}
        <h3 className="text-lg font-bold">{role.name}</h3>
        <p className="text-sm text-white text-opacity-80">{role.description}</p>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full animate-fade-in">
            {/* Nội dung popup */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {role.name}
              </h3>
              <p className="text-gray-500 mb-4">{role.description}</p>
            </div>

            {/* Hành động */}
            <div className="flex flex-col space-y-4">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="large"
                block
                onClick={() => {
                  onEdit(role);
                  closePopup();
                }}
              >
                Sửa
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                size="large"
                block
                onClick={() => {
                  onDelete(role.id);
                  closePopup();
                }}
              >
                Xóa
              </Button>
              <Button size="large" block onClick={closePopup}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleCard;
