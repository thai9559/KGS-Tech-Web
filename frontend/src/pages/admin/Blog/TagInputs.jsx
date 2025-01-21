import React, { useState } from "react";
import { AutoComplete, Tag, Input } from "antd";
import { useGetTagsQuery } from "../../../redux/api/TagApi";

const TagsInputs = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const { data: response = {}, isFetching } = useGetTagsQuery(inputValue);

  // Trích xuất mảng `data` từ phản hồi API
  const tagOptions = Array.isArray(response.data) ? response.data : [];

  const handleInputChange = (val) => {
    setInputValue(val);
  };

  const handleSelect = (selectedTag) => {
    if (!value.includes(selectedTag)) {
      onChange([...value, selectedTag]);
    }
    setInputValue("");
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
      <AutoComplete
        value={inputValue}
        onChange={handleInputChange}
        onSelect={handleSelect}
        options={tagOptions.map((tag) => ({ value: tag.name }))}
        style={{ width: "100%" }}
        placeholder="Nhập tag và nhấn Enter"
        notFoundContent={isFetching ? "Đang tải..." : "Không tìm thấy tag nào"}
      >
        <Input
          onKeyDown={handleInputKeyDown}
          placeholder="Nhập tag và nhấn Enter"
        />
      </AutoComplete>
    </div>
  );
};

export default TagsInputs;
