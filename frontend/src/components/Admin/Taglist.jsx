import React from "react";
import { Tag } from "antd";
import { formatPermission } from "../../utils/formatPermission"; // Import hàm định dạng

const TagList = ({ items, color = "blue", isPermission = false }) => {
  return (
    <>
      {items.map((item) => (
        <Tag color={color} key={item.id}>
          {isPermission ? formatPermission(item.name) : item.name}
        </Tag>
      ))}
    </>
  );
};

export default TagList;
