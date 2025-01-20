import React from "react";
import { Button } from "antd";

const NoAccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          403 - Không có quyền truy cập
        </h1>
        <p className="text-gray-700 mb-6">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
          viên để được hỗ trợ.
        </p>
        <a href="/">
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Quay lại trang chủ
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NoAccess;
