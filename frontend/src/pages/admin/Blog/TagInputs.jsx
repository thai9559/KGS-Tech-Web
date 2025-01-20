import React, { useState } from "react";
import { Input, Button, Tag } from "antd";

const TagsInputs = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (removedTag) => {
    const newTags = value.filter((tag) => tag !== removedTag);
    onChange(newTags);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        {value.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={() => handleRemoveTag(tag)}
            style={{ padding: "5px 10px", fontSize: "14px" }}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Nhập tag và nhấn Enter"
      />
    </div>
  );
};

export default TagsInputs;
