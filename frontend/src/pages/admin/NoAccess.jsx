import React from "react";
import { Button, Result } from "antd";

const NoAccess = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
      extra={
        <a href="/">
          <Button type="primary">Quay lại trang chủ</Button>
        </a>
      }
    />
  );
};

export default NoAccess;
