// components/SearchTagInInput.js
import React from "react";
import { Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const SearchTagInInput = ({ tag, onRemove }) => (
  <Tag
    color="blue"
    closable
    onClose={() => onRemove(tag)}
    closeIcon={<CloseOutlined />}
    style={{ marginBottom: "4px" }}
  >
    {tag}
  </Tag>
);

export default SearchTagInInput;
